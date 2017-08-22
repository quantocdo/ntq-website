var VERSION = 'v1';
var CACHE_NAME = 'ntq-solution-cache';
var ASSET_PREFIXES = [
	'https://fonts.gstatic.com',
	'https://fonts.googleapis.com',
	'https://www.ntq-solution.com.vn/img',
	'https://www.ntq-solution.com.vn/css',
	'https://www.ntq-solution.com.vn/js',
	'https://jp.ntq-solution.com.vn/img',
	'https://jp.ntq-solution.com.vn/css',
	'https://jp.ntq-solution.com.vn/js',
	'https://example.com/img',
	'https://example.com/css',
	'https://example.com/js',
	'https://example.com/bower_components',
	'https://example.com/node_modules'
];
var ORIGINS = [
	'https://www.ntq-solution.com.vn',
	'https://jp.ntq-solution.com.vn',
	'https://example.com'
];

self.addEventListener('install', function(event) {
	console.debug('clear cache...');

	event.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(
				keyList.map(function(key) {
					console.debug('deleting key...', key);
					return caches.delete(key);
				})
			);
		})
	);
});

self.addEventListener('fetch', function(event) {
	var url = event.request.url;

	// filter request
	var skip = ASSET_PREFIXES.every(function(prefix) {
		return url.indexOf(prefix) !== 0;
	});

	var isSameOrigin = ORIGINS.some(function(origin) {
		return url.indexOf(origin) === 0;
	});

	console.debug('fetching... ', event.request.url, '... looking from cache', !skip, isSameOrigin);

	if (skip) {
		return;
	}

	event.respondWith(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.match(event.request.url).then(function(response) {
				if (response) {
					console.debug('from cache: ', event.request.url, response.status);

					return response;
				}

				var cloneRequest = event.request.clone();

				return fetch(cloneRequest).then(function(response) {
					console.debug('from network', event.request.url, response.status);

					if (response.type === 'opaque' || response.ok) {
						// add to cache
						cache.put(url, response.clone());
					}

					return response;
				});
			});
		})
	);
});
