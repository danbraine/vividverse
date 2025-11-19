/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CANISTER_ID_VIVIDVERSE_BACKEND?: string;
  readonly VITE_CANISTER_ID_COVERCE_BACKEND?: string; // Legacy support
  readonly VITE_CANISTER_ID_INTERNET_IDENTITY?: string;
  readonly VITE_DFX_NETWORK?: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}



