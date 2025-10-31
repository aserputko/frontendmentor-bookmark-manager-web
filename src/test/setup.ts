import '@testing-library/jest-dom';

// Polyfill TextEncoder/TextDecoder for react-router in Jest
import { TextDecoder as UtilTextDecoder, TextEncoder as UtilTextEncoder } from 'util';

if (!('TextEncoder' in globalThis)) {
  (globalThis as unknown as { TextEncoder: typeof UtilTextEncoder }).TextEncoder = UtilTextEncoder;
}

if (!('TextDecoder' in globalThis)) {
  (globalThis as unknown as { TextDecoder: typeof UtilTextDecoder }).TextDecoder = UtilTextDecoder;
}

// Polyfill matchMedia for use-mobile hook
if (!('matchMedia' in window)) {
  // @ts-expect-error - assigning polyfill in test env
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

// Polyfill IntersectionObserver for infinite scroll components
if (!('IntersectionObserver' in window)) {
  global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
    return {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
    };
  }) as unknown as typeof IntersectionObserver;
}
