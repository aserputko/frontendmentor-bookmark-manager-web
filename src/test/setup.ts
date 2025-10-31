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

// Mock import.meta.env for API tests
if (!('import' in globalThis)) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - assigning import.meta polyfill in test env
  (globalThis as unknown as { import: { meta: { env: { VITE_API_BASE_URL: string } } } }).import = {
    meta: {
      env: {
        VITE_API_BASE_URL: 'http://localhost:3000/api',
      },
    },
  };
}
