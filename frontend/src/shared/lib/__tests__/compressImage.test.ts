import { describe, it, expect, vi, beforeEach } from 'vitest';
import { compressImage, compressMediaFiles } from '../compressImage';

describe('compressImage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('skips non-image files and returns original file', async () => {
    const textFile = new File(['hello'], 'doc.pdf', { type: 'application/pdf' });
    const result = await compressImage(textFile);
    expect(result).toBe(textFile);
  });

  it('skips animated GIF files to avoid losing animation', async () => {
    const gifFile = new File(['gif-bytes'], 'animation.gif', { type: 'image/gif' });
    const result = await compressImage(gifFile);
    expect(result).toBe(gifFile);
  });

  it('skips file with .gif extension even when MIME type is not image/gif (covers name.endsWith branch in line 14)', async () => {
    // This covers the second branch of isGif: name.endsWith('.gif')
    const gifByName = new File(['gif-bytes'], 'animated.gif', { type: 'application/octet-stream' });
    // size > 250KB to ensure we don't short-circuit on size
    Object.defineProperty(gifByName, 'size', { value: 500 * 1024 });
    const result = await compressImage(gifByName);
    expect(result).toBe(gifByName);
  });

  it('skips file with empty type (covers (file.type || "") branch in line 12)', async () => {
    // A file with empty type string - isGif=false, mime.startsWith('image/') = false -> return file
    const noTypeFile = new File(['data'], 'file.bin', { type: '' });
    const result = await compressImage(noTypeFile);
    expect(result).toBe(noTypeFile);
  });

  it('skips small images under 250KB', async () => {
    const smallFile = new File(['small'], 'avatar.jpg', { type: 'image/jpeg' });
    Object.defineProperty(smallFile, 'size', { value: 100 * 1024 });
    const result = await compressImage(smallFile);
    expect(result).toBe(smallFile);
  });

  it('handles image error and returns original file', async () => {
    const largeFile = new File(['corrupt data'], 'corrupt.png', { type: 'image/png' });
    Object.defineProperty(largeFile, 'size', { value: 500 * 1024 });

    const originalImage = global.Image;
    global.Image = class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      width = 3000;
      height = 2000;
      private _src = '';
      set src(val: string) {
        this._src = val;
        setTimeout(() => {
          if (this.onerror) this.onerror();
        }, 10);
      }
      get src() {
        return this._src;
      }
    } as unknown as typeof Image;

    const result = await compressImage(largeFile);
    expect(result).toBe(largeFile);

    global.Image = originalImage;
  });

  it('returns original file if canvas context is null', async () => {
    const largeFile = new File(['valid png'], 'large.png', { type: 'image/png' });
    Object.defineProperty(largeFile, 'size', { value: 500 * 1024 });

    const originalImage = global.Image;
    global.Image = class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      width = 1000;
      height = 1000;
      private _src = '';
      set src(val: string) {
        this._src = val;
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 10);
      }
      get src() {
        return this._src;
      }
    } as unknown as typeof Image;

    const origGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);

    const result = await compressImage(largeFile);
    expect(result).toBe(largeFile);

    HTMLCanvasElement.prototype.getContext = origGetContext;
    global.Image = originalImage;
  });

  it('returns original file if blob is null or compressed blob is larger than original file', async () => {
    const largeFile = new File(['valid png'], 'large.png', { type: 'image/png' });
    Object.defineProperty(largeFile, 'size', { value: 300 * 1024 });

    const biggerBlob = new Blob(['super large compressed output'], { type: 'image/webp' });
    Object.defineProperty(biggerBlob, 'size', { value: 600 * 1024 });

    const originalImage = global.Image;
    global.Image = class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      width = 500;
      height = 500;
      private _src = '';
      set src(val: string) {
        this._src = val;
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 10);
      }
      get src() {
        return this._src;
      }
    } as unknown as typeof Image;

    const origGetContext = HTMLCanvasElement.prototype.getContext;
    const origToBlob = HTMLCanvasElement.prototype.toBlob;

    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({ drawImage: vi.fn() });
    HTMLCanvasElement.prototype.toBlob = vi.fn().mockImplementation((cb) => cb(biggerBlob));

    const result = await compressImage(largeFile);
    expect(result).toBe(largeFile);

    // Test blob = null
    HTMLCanvasElement.prototype.toBlob = vi.fn().mockImplementation((cb) => cb(null));
    const resultNull = await compressImage(largeFile);
    expect(resultNull).toBe(largeFile);

    HTMLCanvasElement.prototype.getContext = origGetContext;
    HTMLCanvasElement.prototype.toBlob = origToBlob;
    global.Image = originalImage;
  });

  it('scales and compresses when canvas and toBlob succeed', async () => {
    const largeFile = new File(['valid png'], 'large.png', { type: 'image/png' });
    Object.defineProperty(largeFile, 'size', { value: 500 * 1024 });

    const mockBlob = new Blob(['compressed'], { type: 'image/webp' });
    Object.defineProperty(mockBlob, 'size', { value: 100 * 1024 });

    const originalImage = global.Image;
    global.Image = class MockImage {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      width = 3000;
      height = 2000;
      private _src = '';
      set src(val: string) {
        this._src = val;
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 10);
      }
      get src() {
        return this._src;
      }
    } as unknown as typeof Image;

    const origGetContext = HTMLCanvasElement.prototype.getContext;
    const origToBlob = HTMLCanvasElement.prototype.toBlob;

    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
      drawImage: vi.fn(),
    });
    HTMLCanvasElement.prototype.toBlob = vi.fn().mockImplementation((callback) => {
      callback(mockBlob);
    });

    const compressed = await compressImage(largeFile, 1000, 1000);
    expect(compressed.name).toBe('large.webp');
    expect(compressed.type).toBe('image/webp');

    HTMLCanvasElement.prototype.getContext = origGetContext;
    HTMLCanvasElement.prototype.toBlob = origToBlob;
    global.Image = originalImage;
  });

  it('compressMediaFiles compresses array of files', async () => {
    const file1 = new File(['a'], 'a.pdf', { type: 'application/pdf' });
    const file2 = new File(['b'], 'b.gif', { type: 'image/gif' });
    const results = await compressMediaFiles([file1, file2]);
    expect(results).toEqual([file1, file2]);
  });
});
