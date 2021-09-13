// Service Worker Hook
const register = () => {
  (async () => {
    try {
      if ("serviceWorker" in navigator) {
        const register = await navigator.serviceWorker.register(
          "/serviceWorker.js"
        );
        console.log(
          `ServiceWorker registration successful with scope: ${register.scope}`
        );
      }
    } catch (err) {
      console.log(`ServiceWorker registration failed: ${err}`);
    }
  })();
};

export default register;
