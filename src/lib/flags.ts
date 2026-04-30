import { useEffect, useState } from "react";

// Soft access gate for unlisted Mythos-server arcades.
// - Visit `?show=mythos` once to unlock.
// - The flag is mirrored into localStorage; subsequent visits are auto-unlocked.
// - This is a soft hide: the data is still in the JS bundle. Anyone inspecting
//   source can see Mythos arcades. The gate just keeps them out of the public UI.

const STORAGE_KEY = "maimai-show-mythos";
const URL_PARAM = "show";
const URL_VALUE = "mythos";

function readInitial(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === "1") return true;
  } catch {
    // ignore — localStorage may be unavailable (private browsing, etc.)
  }
  const params = new URLSearchParams(window.location.search);
  return params.get(URL_PARAM) === URL_VALUE;
}

export function useShowMythos(): boolean {
  const [show, setShow] = useState(readInitial);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get(URL_PARAM) !== URL_VALUE) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    // Strip the param from the visible URL so the unlock isn't pasted around accidentally.
    params.delete(URL_PARAM);
    const qs = params.toString();
    const next =
      window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash;
    window.history.replaceState({}, "", next);
    setShow(true);
  }, []);

  return show;
}
