let cache = null;

export async function getRemoteManifest() {
  if (cache) return cache;

  const manifestFile = process.env.REMOTE_MANIFEST || "dev.json";
  console.log("Fetching remote manifest:", manifestFile);

  const res = await fetch(`/manifests/${manifestFile}`);
  if (!res.ok) {
    console.error(`Failed to load manifest at /manifests/${manifestFile}`);
    throw new Error(`Failed to load manifest: ${manifestFile}`);
  }

  cache = await res.json();
  return cache;
}
