export const runtimeConfig = {
  dataMode: import.meta.env.VITE_ORBITA_DATA_MODE || 'local',
  backendUrl: import.meta.env.VITE_ORBITA_BACKEND_URL || '',
  backendPublicKey: import.meta.env.VITE_ORBITA_BACKEND_PUBLIC_KEY || '',
};

export function isRemoteDataMode() {
  return runtimeConfig.dataMode === 'remote' && Boolean(runtimeConfig.backendUrl);
}

export function runtimeReadiness() {
  return {
    dataMode: runtimeConfig.dataMode,
    backendConfigured: Boolean(runtimeConfig.backendUrl && runtimeConfig.backendPublicKey),
    usingLocalDemo: !isRemoteDataMode(),
  };
}
