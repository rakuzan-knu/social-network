/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { OpenGraphService } from '../opengraph.service';

describe('OpenGraphService', () => {
  let service: OpenGraphService;
  let mockRedis: any;

  beforeEach(() => {
    mockRedis = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue('OK'),
    };
    service = new OpenGraphService(mockRedis);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns null and caches negative result when URL fails or is non-HTML', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
      headers: new Headers({ 'content-type': 'text/html' }),
    });
    (global as any).fetch = fetchMock;

    const result = await service.extractMetadata('http://adaqweqsdasdqdq.com/');

    expect(result).toBeNull();
    expect(mockRedis.set).toHaveBeenCalledWith(
      'og:preview:http://adaqweqsdasdqdq.com/',
      expect.stringContaining('"notFound":true'),
      3600,
    );
  });

  it('returns null on negative cache hit without making outbound HTTP requests', async () => {
    mockRedis.get.mockResolvedValueOnce(
      JSON.stringify({ notFound: true, url: 'http://adaqweqsdasdqdq.com/' }),
    );
    const fetchMock = jest.fn();
    (global as any).fetch = fetchMock;

    const result = await service.extractMetadata('http://adaqweqsdasdqdq.com/');

    expect(result).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('aborts binary content (like .mp4 or .zip) immediately without downloading whole payload', async () => {
    const cancelMock = jest.fn();
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'video/mp4' }),
      body: {
        cancel: cancelMock,
      },
    });
    (global as any).fetch = fetchMock;

    const result = await service.extractMetadata('http://example.com/huge-movie.mp4');

    expect(result).toBeNull();
    expect(cancelMock).toHaveBeenCalled();
    expect(mockRedis.set).toHaveBeenCalledWith(
      'og:preview:http://example.com/huge-movie.mp4',
      expect.stringContaining('"notFound":true'),
      3600,
    );
  });
});
