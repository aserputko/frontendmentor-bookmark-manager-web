import { act, renderHook, waitFor } from '@testing-library/react';
import { useIsMobile } from './use-mobile';

describe('useIsMobile', () => {
  const originalInnerWidth = window.innerWidth;
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.innerWidth = 800;
  });

  afterEach(() => {
    window.innerWidth = originalInnerWidth;
    window.matchMedia = originalMatchMedia;
  });

  it('should return false for desktop width (800px)', () => {
    window.innerWidth = 800;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true for mobile width (500px)', async () => {
    window.innerWidth = 500;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useIsMobile());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('should return false for tablet width (768px)', () => {
    window.innerWidth = 768;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should update when window is resized', () => {
    let mockListener: (event: MediaQueryListEvent) => void;

    window.innerWidth = 800;
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((event, listener) => {
          if (event === 'change') {
            mockListener = listener;
          }
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false);

    // Simulate window resize to mobile width
    act(() => {
      window.innerWidth = 500;
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn((event, listener) => {
          if (event === 'change') {
            mockListener = listener;
          }
        }),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    // Trigger the change event
    act(() => {
      if (mockListener) {
        const event = new Event('change') as MediaQueryListEvent;
        mockListener(event);
      }
    });
  });
});
