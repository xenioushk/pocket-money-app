/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PM_API_URL: string
  readonly VITE_SEC_SITE_KEY: string
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
