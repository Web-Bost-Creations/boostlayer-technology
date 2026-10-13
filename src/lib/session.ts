const storageKey = "boostlayer.session";
const changeEvent = "boostlayer-session";

export function saveSession(token: string) {
  localStorage.setItem(storageKey, token);
  window.dispatchEvent(new Event(changeEvent));
}

export function readSession() {
  return localStorage.getItem(storageKey);
}

export function clearSession() {
  localStorage.removeItem(storageKey);
  window.dispatchEvent(new Event(changeEvent));
}

export function onSessionChange(listener: () => void) {
  window.addEventListener(changeEvent, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener("storage", listener);
  };
}
