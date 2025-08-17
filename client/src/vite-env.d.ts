/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // add more env variables here as you create them
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}