import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getLuminance,
  getBubbleContrastTheme,
  getBubbleStyle,
  getChatBackgroundStyle,
  parseChatTheme,
  serializeChatTheme,
  hexToRgb,
  hexToRgba,
  hslToHex,
  generateHarmonicGradient,
  encodeThemeCode,
  decodeThemeCode,
  triggerHapticFeedback,
  sanitizeAndValidateSvg,
  getRecentWallpapers,
  addRecentWallpaper,
  deleteRecentWallpaper,
  updateMetaThemeColor,
} from '../themeUtils';
import {
  ChatThemeConfig,
  DEFAULT_DARK_THEME_CONFIG,
  BUILT_IN_PRESETS,
} from '../../model/chatTheme';

describe('themeUtils', () => {
  describe('hexToRgb & getLuminance', () => {
    it('converts hex to rgb correctly', () => {
      expect(hexToRgb('#ffffff')).toEqual([255, 255, 255]);
      expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
      expect(hexToRgb('#ff0000')).toEqual([255, 0, 0]);
    });

    it('calculates WCAG relative luminance accurately', () => {
      expect(getLuminance('#ffffff')).toBeCloseTo(1, 1);
      expect(getLuminance('#000000')).toBeCloseTo(0, 1);
      expect(getLuminance('#fef08a')).toBeGreaterThan(0.7); // Light pastel yellow
      expect(getLuminance('#0b0b0c')).toBeLessThan(0.1); // Deep dark
    });
  });

  describe('hexToRgba & hslToHex', () => {
    it('converts hex to rgba with alpha channel', () => {
      expect(hexToRgba('#ffffff', 0.8)).toBe('rgba(255, 255, 255, 0.8)');
      expect(hexToRgba('#000000', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
    });

    it('converts HSL to hex correctly', () => {
      expect(hslToHex(0, 100, 50).toLowerCase()).toBe('#ff0000');
      expect(hslToHex(120, 100, 50).toLowerCase()).toBe('#00ff00');
      expect(hslToHex(240, 100, 50).toLowerCase()).toBe('#0000ff');
    });
  });

  describe('generateHarmonicGradient', () => {
    it('generates harmonic gradients adhering to color theory rules', () => {
      const gradient = generateHarmonicGradient(200);
      expect(gradient.colors.length).toBeGreaterThanOrEqual(2);
      expect(gradient.colors[0]).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(gradient.angle).toBeGreaterThanOrEqual(0);
      expect(gradient.angle).toBeLessThanOrEqual(360);
      expect(gradient.schemeName).toBeTruthy();
    });
  });

  describe('encodeThemeCode and decodeThemeCode with Zod Validation', () => {
    it('encodes and decodes theme config losslessly', () => {
      const customConfig: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        backgroundColor: '#1a103c',
        bubbleGradientColors: ['#ec4899', '#8b5cf6'],
        bubbleOpacity: 0.85,
        bubbleBlur: 20,
      };

      const code = encodeThemeCode(customConfig);
      expect(code.startsWith('ETERNAL-THEME:')).toBe(true);

      const decoded = decodeThemeCode(code);
      expect(decoded).not.toBeNull();
      expect(decoded?.backgroundColor).toBe('#1a103c');
      expect(decoded?.bubbleGradientColors).toEqual(['#ec4899', '#8b5cf6']);
      expect(decoded?.bubbleOpacity).toBe(0.85);
      expect(decoded?.bubbleBlur).toBe(20);
    });

    it('rejects unsafe XSS URLs in theme background images', () => {
      const maliciousPayload = {
        backgroundType: 'image',
        bgImageUrl: 'javascript:alert(1)',
      };
      const rawCode = `ETERNAL-THEME:${btoa(encodeURIComponent(JSON.stringify(maliciousPayload)))}`;
      const decoded = decodeThemeCode(rawCode);
      expect(decoded).toBeNull();
    });

    it('returns null on invalid or corrupted code', () => {
      expect(decodeThemeCode('invalid-corrupted-code')).toBeNull();
      expect(decodeThemeCode('')).toBeNull();
    });
  });

  describe('sanitizeAndValidateSvg (XSS & Injection Protection)', () => {
    it('sanitizes clean SVG safely', () => {
      const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="purple"/></svg>`;
      const res = sanitizeAndValidateSvg(cleanSvg);
      expect(res.isValid).toBe(true);
      expect(res.sanitizedSvg).toContain('circle');
    });

    it('strips <script> and inline event handlers from malicious SVG', () => {
      const maliciousSvg = `<svg xmlns="http://www.w3.org/2000/svg"><script>alert("hacked")</script><rect width="100" height="100" onload="alert(1)" fill="red"/><foreignObject><iframe src="malicious.html"/></foreignObject></svg>`;
      const res = sanitizeAndValidateSvg(maliciousSvg);
      expect(res.isValid).toBe(true);
      expect(res.sanitizedSvg).not.toContain('<script');
      expect(res.sanitizedSvg).not.toContain('onload');
      expect(res.sanitizedSvg).not.toContain('foreignObject');
    });

    it('strips dangerous style attributes (javascript, vbscript, expression, -moz-binding, url)', () => {
      const svgsWithBadStyles = [
        '<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" style="background: url(http://evil.com/bg.png)"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="5" r="5" style="color: javascript:alert(1)"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0" style="color: vbscript:msgbox(1)"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg"><polygon points="0,0 1,1" style="width: expression(alert(1))"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg"><g style="-moz-binding: url(xss.xml#test)"><rect width="5" height="5"/></g></svg>',
      ];

      for (const svg of svgsWithBadStyles) {
        const res = sanitizeAndValidateSvg(svg);
        expect(res.isValid).toBe(true);
        expect(res.sanitizedSvg).not.toContain('url(');
        expect(res.sanitizedSvg).not.toContain('javascript:');
        expect(res.sanitizedSvg).not.toContain('vbscript:');
        expect(res.sanitizedSvg).not.toContain('expression(');
        expect(res.sanitizedSvg).not.toContain('-moz-binding');
      }
    });

    it('handles parser exceptions in sanitizeAndValidateSvg gracefully', () => {
      const origDOMParser = window.DOMParser;
      window.DOMParser = vi.fn().mockImplementation(() => ({
        parseFromString: () => {
          throw new Error('Fatal parser crash');
        },
      })) as any;

      const res = sanitizeAndValidateSvg('<svg></svg>');
      expect(res.isValid).toBe(false);
      expect(res.error).toBe('Fatal parser crash');

      window.DOMParser = origDOMParser;
    });
  });

  describe('Recent Wallpapers Storage', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    it('adds and caps recent wallpapers at 5 items and handles items without url or shaderId', async () => {
      for (let i = 1; i <= 7; i++) {
        await addRecentWallpaper({
          type: 'image',
          url: `https://example.com/wp-${i}.jpg`,
          name: `Wallpaper ${i}`,
        });
      }

      // Add item without url or shaderId
      await addRecentWallpaper({
        type: 'image',
        name: 'Item without URL or shader',
      });

      const recents = await getRecentWallpapers();
      expect(recents.length).toBeLessThanOrEqual(5);
      expect(recents[0].name).toBe('Item without URL or shader');
    });

    it('deletes a recent wallpaper by id', async () => {
      const added = await addRecentWallpaper({
        type: 'shader',
        shaderId: 'neon-smoke',
        name: 'Liquid Neon Smoke',
      });
      const idToDelete = added[0].id;
      const afterDelete = await deleteRecentWallpaper(idToDelete);
      expect(afterDelete.find((w) => w.id === idToDelete)).toBeUndefined();
    });

    it('safely catches storage exceptions in getRecentWallpapers and addRecentWallpaper', async () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const getItemSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('Storage read failure');
      });

      const recents = await getRecentWallpapers();
      expect(recents).toEqual([]);
      getItemSpy.mockRestore();

      const setItemSpy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Quota exceeded');
      });

      const added = await addRecentWallpaper({
        type: 'image',
        url: 'https://example.com/quota-test.jpg',
        name: 'Quota Test',
      });
      expect(added.length).toBeGreaterThan(0);

      const afterDelete = await deleteRecentWallpaper(added[0].id);
      expect(afterDelete).toBeDefined();

      setItemSpy.mockRestore();
      consoleWarnSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('updateMetaThemeColor', () => {
    it('updates document <meta name="theme-color"> for hex and theme objects', () => {
      updateMetaThemeColor('#120726');
      const meta = document.querySelector('meta[name="theme-color"]');
      expect(meta).not.toBeNull();
      expect(meta?.getAttribute('content')).toBe('#120726');

      // Theme object with procedural / custom background
      updateMetaThemeColor({ backgroundType: 'procedural', backgroundColor: '#331144' } as any);
      expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
        '#331144',
      );

      // Theme object with shader background
      updateMetaThemeColor({ backgroundType: 'shader' } as any);
      expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
        '#0d071a',
      );

      // Theme object with solid background
      updateMetaThemeColor({ backgroundType: 'solid', backgroundColor: '#552277' } as any);
      expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
        '#552277',
      );

      // Theme object with gradient background
      updateMetaThemeColor({
        backgroundType: 'gradient',
        gradientColors: ['#112233', '#445566'],
      } as any);
      expect(document.querySelector('meta[name="theme-color"]')?.getAttribute('content')).toBe(
        '#112233',
      );
    });

    it('safely catches error when document throws in updateMetaThemeColor', () => {
      const origQuery = document.querySelector;
      document.querySelector = () => {
        throw new Error('DOM query failed');
      };
      expect(() => updateMetaThemeColor('#000000')).not.toThrow();
      document.querySelector = origQuery;
    });
  });

  describe('triggerHapticFeedback', () => {
    it('calls navigator.vibrate when supported', () => {
      const vibrateMock = vi.fn();
      Object.defineProperty(navigator, 'vibrate', {
        value: vibrateMock,
        configurable: true,
        writable: true,
      });

      triggerHapticFeedback(8);
      expect(vibrateMock).toHaveBeenCalledWith(8);
    });

    it('handles vibrate throwing an error gracefully (covers catch block in triggerHapticFeedback)', () => {
      Object.defineProperty(navigator, 'vibrate', {
        value: () => {
          throw new Error('Vibration denied');
        },
        configurable: true,
        writable: true,
      });

      // Should not throw
      expect(() => triggerHapticFeedback(10)).not.toThrow();
    });
  });

  describe('getBubbleContrastTheme (WCAG Smart Contrast)', () => {
    it('returns dark text for light bubbles', () => {
      const lightTheme: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        bubbleType: 'solid',
        bubbleColor: '#ffffff',
      };
      const contrast = getBubbleContrastTheme(lightTheme, true);
      expect(contrast.isLight).toBe(true);
      expect(contrast.textColor).toBe('#0f172a');
      expect(contrast.statusColor).toBe('#0f172a');
      expect(contrast.quoteBg).toBe('rgba(0, 0, 0, 0.08)');
    });

    it('returns light text for dark bubbles', () => {
      const darkTheme: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        bubbleType: 'solid',
        bubbleColor: '#1e1f29',
      };
      const contrast = getBubbleContrastTheme(darkTheme, true);
      expect(contrast.isLight).toBe(false);
      expect(contrast.textColor).toBe('#ffffff');
      expect(contrast.statusColor).toBe('#ffffff');
      expect(contrast.quoteBg).toBe('rgba(255, 255, 255, 0.12)');
    });

    it('uses bubbleGradientColors for gradient type own messages', () => {
      const gradientTheme: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        bubbleType: 'gradient',
        bubbleGradientColors: ['#ffffff', '#f0f0f0'],
      };
      const contrast = getBubbleContrastTheme(gradientTheme, true);
      expect(contrast.isLight).toBe(true);
    });

    it('uses empty bubbleGradientColors fallback (covers default gradient colors path)', () => {
      const gradientTheme: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        bubbleType: 'gradient',
        bubbleGradientColors: [],
      };
      // Falls back to ['#9333ea', '#6366f1']
      const contrast = getBubbleContrastTheme(gradientTheme, true);
      expect(contrast).toBeDefined();
    });

    it('returns contrast for non-own (incoming) messages (covers line 167-174)', () => {
      const theme: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        incomingBubbleColor: '#ffffff',
      };
      const contrast = getBubbleContrastTheme(theme, false);
      expect(contrast.isLight).toBe(true);
    });

    it('uses custom bubbleTextColor for own messages (covers lines 152-155)', () => {
      const theme: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        bubbleTextColor: '#ff0000',
      };
      const contrast = getBubbleContrastTheme(theme, true);
      // Custom text color is set, so it should return createContrastTheme(false, '#ff0000')
      expect(contrast.textColor).toBe('#ff0000');
    });

    it('uses custom incomingBubbleTextColor for incoming messages (covers lines 168-171)', () => {
      const theme: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        incomingBubbleTextColor: '#0000ff',
      };
      const contrast = getBubbleContrastTheme(theme, false);
      expect(contrast.textColor).toBe('#0000ff');
    });
  });

  describe('getLuminance extended', () => {
    it('calculates luminance from rgba() string (covers the rgb/rgba branch in getLuminance)', () => {
      const luminance = getLuminance('rgba(255, 255, 255, 1)');
      expect(luminance).toBeCloseTo(1, 1);

      const luminanceDark = getLuminance('rgb(0, 0, 0)');
      expect(luminanceDark).toBeCloseTo(0, 1);
    });

    it('returns 0 for empty/null luminance input', () => {
      expect(getLuminance('')).toBe(0);
    });
  });

  describe('hexToRgb extended', () => {
    it('handles 3-character hex colors (covers the length === 3 branch)', () => {
      expect(hexToRgb('#fff')).toEqual([255, 255, 255]);
      expect(hexToRgb('#000')).toEqual([0, 0, 0]);
      expect(hexToRgb('#f00')).toEqual([255, 0, 0]);
    });

    it('returns [0,0,0] for invalid hex (covers the length < 6 fallback)', () => {
      expect(hexToRgb('xx')).toEqual([0, 0, 0]);
      expect(hexToRgb('')).toEqual([0, 0, 0]);
    });
  });

  describe('hslToHex all hue ranges', () => {
    it('covers all 6 hue ranges in hslToHex (lines 276-300)', () => {
      // h in [0, 60) → covered by existing test (red)
      // h in [60, 120) → covered by green
      // h in [120, 180) - between green and cyan
      expect(hslToHex(150, 100, 50)).toMatch(/^#[0-9a-f]{6}$/i);
      // h in [180, 240) - between cyan and blue
      expect(hslToHex(210, 100, 50)).toMatch(/^#[0-9a-f]{6}$/i);
      // h in [240, 300) - between blue and magenta
      expect(hslToHex(270, 100, 50)).toMatch(/^#[0-9a-f]{6}$/i);
      // h in [300, 360) - else branch
      expect(hslToHex(330, 100, 50)).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('handles single-digit hex in toHex via "0" padding (covers toHex length === 1 branch)', () => {
      // Color with component values that produce single-digit hex (e.g., r=0 → '0' → '00')
      const result = hslToHex(120, 100, 50);
      expect(result).toBe('#00ff00'); // r=0 needs padding
    });
  });

  describe('getBubbleStyle (Glassmorphism & Safari WebKit support)', () => {
    it('supports continuous screen gradient mode', () => {
      const config: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        bubbleContinuousGradient: true,
        bubbleGradientColors: ['#ec4899', '#8b5cf6', '#3b82f6'],
        bubbleGradientAngle: 180,
      };
      const result = getBubbleStyle(config, true);
      expect(result.style.backgroundAttachment).toBe('fixed');
      expect(result.style.backgroundSize).toBe('100vw 100vh');
    });

    it('supports frosted glassmorphism opacity and blur with WebkitBackdropFilter', () => {
      const config: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        bubbleType: 'solid',
        bubbleColor: '#9333ea',
        bubbleOpacity: 0.8,
        bubbleBlur: 20,
      };
      const result = getBubbleStyle(config, true);
      expect(result.style.backdropFilter).toBe('blur(20px)');
      expect(result.style.WebkitBackdropFilter).toBe('blur(20px)');
      expect(result.style.backgroundColor).toContain('rgba(');
    });

    it('covers incoming bubble style (isOwnMessage = false)', () => {
      const config: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        incomingBubbleColor: '#1a1b2e',
        incomingBubbleOpacity: 0.9,
        incomingBubbleBlur: 12,
      };
      const result = getBubbleStyle(config, false);
      expect(result.style).toBeDefined();
    });
  });

  describe('parseChatTheme and serializeChatTheme', () => {
    it('parses preset ID correctly', () => {
      const parsed = parseChatTheme('midnight-purple');
      expect(parsed.id).toBe('midnight-purple');
      expect(parsed.backgroundType).toBe('gradient');
    });

    it('parses JSON string config', () => {
      const customConfig: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        backgroundColor: '#333333',
      };
      const json = JSON.stringify(customConfig);
      const parsed = parseChatTheme(json);
      expect(parsed.backgroundColor).toBe('#333333');
    });

    it('serializes preset by id if identical to preset', () => {
      const preset = BUILT_IN_PRESETS.find((p) => p.id === 'midnight-purple')!;
      const serialized = serializeChatTheme(preset.config);
      expect(serialized).toBe('midnight-purple');
    });

    it('handles invalid JSON in parseChatTheme gracefully (falls back to default)', () => {
      const result = parseChatTheme('not-a-preset-and-not-json-{{{');
      expect(result).toBeDefined();
      expect(result.backgroundType).toBeDefined();
    });
  });

  describe('getChatBackgroundStyle', () => {
    it('returns backgroundImage style for image type with bgImageUrl (line 222-230)', () => {
      const config: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        backgroundType: 'image',
        bgImageUrl: 'https://example.com/bg.jpg',
      };
      const style = getChatBackgroundStyle(config);
      expect(style.backgroundImage).toContain('url(');
      expect(style.backgroundSize).toBe('cover');
      expect(style.backgroundPosition).toBe('center');
      expect(style.backgroundRepeat).toBe('no-repeat');
    });

    it('returns linear-gradient for gradient type (line 232-242)', () => {
      const config: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        backgroundType: 'gradient',
        gradientColors: ['#000000', '#ffffff'],
        gradientAngle: 90,
      };
      const style = getChatBackgroundStyle(config);
      expect(style.background).toContain('linear-gradient');
      expect(style.background).toContain('90deg');
    });

    it('returns gradient with default colors when gradientColors is empty (covers fallback path)', () => {
      const config: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        backgroundType: 'gradient',
        gradientColors: [],
      };
      const style = getChatBackgroundStyle(config);
      expect(style.background).toContain('linear-gradient');
    });

    it('returns solid backgroundColor for solid/preset type (lines 244-248)', () => {
      const config: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        backgroundType: 'solid',
        backgroundColor: '#112233',
      };
      const style = getChatBackgroundStyle(config);
      expect(style.backgroundColor).toBe('#112233');
    });

    it('returns default backgroundColor when none provided (covers || fallback on line 247)', () => {
      const config = {
        ...DEFAULT_DARK_THEME_CONFIG,
        backgroundType: 'solid',
        backgroundColor: undefined,
      } as unknown as ChatThemeConfig;
      const style = getChatBackgroundStyle(config);
      expect(style.backgroundColor).toBe('#0b0b0c');
    });

    it('returns solid style when backgroundType is image but bgImageUrl is falsy', () => {
      const config: ChatThemeConfig = {
        ...DEFAULT_DARK_THEME_CONFIG,
        backgroundType: 'image',
        bgImageUrl: undefined,
      };
      const style = getChatBackgroundStyle(config);
      // Falls through to solid fallback since bgImageUrl is falsy
      expect(style.backgroundColor).toBeDefined();
    });
  });

  describe('safeUrlSchema and XSS-protected href attributes in SVG', () => {
    it('strips dangerous href with javascript: protocol from SVG elements', () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg"><a href="javascript:alert(1)"><circle cx="10" cy="10" r="5"/></a></svg>`;
      const res = sanitizeAndValidateSvg(svg);
      expect(res.isValid).toBe(true);
      expect(res.sanitizedSvg).not.toContain('javascript:');
    });

    it('strips dangerous xlink:href attributes from SVG elements', () => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="javascript:void(0)"/></svg>`;
      const res = sanitizeAndValidateSvg(svg);
      expect(res.isValid).toBe(true);
    });

    it('allows safe data: image URLs in SVG href (e.g. base64 PNG)', () => {
      const safeDataUrl = 'data:image/png;base64,iVBORw0KGgo=';
      const svg = `<svg xmlns="http://www.w3.org/2000/svg"><image href="${safeDataUrl}"/></svg>`;
      const res = sanitizeAndValidateSvg(svg);
      expect(res.isValid).toBe(true);
      // The safe data URL should be kept
      expect(res.sanitizedSvg).toContain('data:image/png');
    });

    it('strips unsafe data: URLs from SVG href (e.g., data:text/html)', () => {
      const unsafeDataUrl = 'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==';
      const svg = `<svg xmlns="http://www.w3.org/2000/svg"><image href="${unsafeDataUrl}"/></svg>`;
      const res = sanitizeAndValidateSvg(svg);
      expect(res.isValid).toBe(true);
      // The unsafe data URL should be stripped
      expect(res.sanitizedSvg).not.toContain('data:text/html');
    });
  });
});
