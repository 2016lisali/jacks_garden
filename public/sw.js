import { manifest, version } from '@parcel/service-worker';

async function install() {
  const cache = await caches.open(version);
  await cache.addAll(manifest);
}
addEventListener('install', e => e.waitUntil(install()));

async function activate() {
  const keys = await caches.keys();
  await Promise.all(
    keys.map(key => key !== version && caches.delete(key))
  );
}
addEventListener('activate', e => e.waitUntil(activate()));


self.addEventListener('fetch', e => {
  if (e.request?.method != 'GET') return;
  if (e.request?.url.startsWith('chrome-extension') ||
    e.request?.url.includes('extension') ||
    !(e.request?.url.indexOf('http') === 0)) return;
  e.respondWith(
    (async function () {
      // open and return a reference to our cache
      const cache = await caches.open(version);
      // return the matched value if the requested value exists in the cache
      const cachedResponse = await cache.match(e.request);

      // if the match resulted in a truthy value
      if (cachedResponse) {
        console.log('Cache Request: ' + e.request.url);
        // return the content from the cache
        return cachedResponse;
      }
      // If we didn't find a match in the cache, use the network and log the occurence.
      fetch(e.request)
        .then(res => {
          console.log('Network Request: ' + e.request.url);
          return res;
        })
        .catch(err => console.log(err))
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});