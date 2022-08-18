import { manifest, version } from "@parcel/service-worker";

async function install() {
    const cache = await caches.open(version);
    await cache.addAll(manifest);
}
addEventListener("install", (e) => e.waitUntil(install()));

async function activate() {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => key !== version && caches.delete(key)));
}
addEventListener("activate", (e) => e.waitUntil(activate()));

async function fetchContent(e) {
    if (e.request?.method != "GET") return;
    if (
        e.request?.url.startsWith("chrome-extension") ||
        e.request?.url.includes("extension") ||
        !(e.request?.url.indexOf("http") === 0)
    )
        return;

    e.respondWith(
        (async function () {
            const cache = await caches.open(version);
            const cachedResponse = await cache.match(e.request);
            if (cachedResponse) {
                // console.log('Cache Request: ' + e.request.url);
                return cachedResponse;
            }
            // console.log('Network Request: ' + e.request.url);
            return fetch(e.request);
        })()
    );
}

addEventListener("fetch", (e) => fetchContent(e));

addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        console.log("skip waiting");
        self.skipWaiting();
    }
});
