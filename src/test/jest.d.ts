// Type definitions for Jest test environment
// This makes import.meta available in Jest tests

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
