/// <reference  types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_BACKEND_API: string
  readonly VITE_BACKEND_GOOGLE_AUTH_CALLBACK: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
