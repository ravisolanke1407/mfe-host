import { useEffect, useState } from "react";
import { getRemoteManifest } from "../manifestService";
import { loadRemoteModule } from "../loadRemote";

export default function Users() {
  const [Comp, setComp] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const manifest = await getRemoteManifest();
        const { url, scope, module } = manifest.remote1;
        const mod = await loadRemoteModule(url, scope, module);
        if (mounted) setComp(() => mod.default);
      } catch (e) {
        console.error(e);
        if (mounted) setErr(e.message);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (err) return <div style={{ color: "red", padding: 20 }}>Error: {err}</div>;
  return (
    <div style={{ padding: 20 }}>
      <h2>👤 Users (Remote1)</h2>
      {Comp ? <Comp /> : <p>Loading Users remote...</p>}
    </div>
  );
}
