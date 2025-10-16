export const loadRemoteModule = async (remoteUrl, scope, module) => {
  // If the container not already loaded, inject script
  if (!window[scope]) {
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = remoteUrl;
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load ${remoteUrl}`));
      document.head.appendChild(script);
    });
  }

  const container = window[scope]; // the remote container
  // initialize sharing (shared scope) — __webpack_share_scopes__ injected by webpack runtime
  // eslint-disable-next-line no-undef
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  const Module = factory();
  return Module;
};
