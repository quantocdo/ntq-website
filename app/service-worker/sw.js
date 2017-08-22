var CACHE_NAME = 'ntq-solution-cache-v1';
var ASSET_PREFIXES = [
	'https://www.ntq-solution.com.vn',
	'https://jp.ntq-solution.com.vn',
	'https://example.com',
];

self.addEventListener('install', function(event) {
});

self.addEventListener('fetch', function(event) {
	var url = event.request.url;

	// filter request
	var skip = ASSET_PREFIXES.every(function(prefix) {
		return url.indexOf(prefix) !== 0;
	})

	if (skip) {
		return;
	}

	event.respondWith(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.match(event.request.url).then(function(response) {
				if (response) {
					return response;
				}

				var cloneRequest = event.request.clone();

				return fetch(cloneRequest).then(function(response) {
					// add to cache
					cache.put(url, response.clone());

					return response;
				});
			});
		})
	);
});
