import {build, files, prerendered, version} from '$service-worker'

function installServiceWorker() {
    return caches.open('cache-' + version).then((cache) => {
        return cache.addAll([...files, ...build, ...prerendered]);
    }).then(() => { return self.skipWaiting()}).catch(err => console.log("err: ", err))
}

self.addEventListener('install', installServiceWorker);
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open('cache-' + version).then(cache => {
            return cache.match(event.request).then(response => {
                return response
            })
        })
    )
});