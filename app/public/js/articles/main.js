;(function(di) {
	'use strict';

	di.register('/view', [
		'@ractive',
		'/article',
		function(Ractive, Article) {
			var rowSize = 3;
			var pageSize = rowSize * 4;
			var local = [];
			var inProgress = false;

			var view = new Ractive({
				el: '#articles',
				template: '#articles-tpl',
				data: {
					rows: []
				}
			});

			view.on('articles.loadmore', function(event) {
				if (event && event.original) {
					event.original.preventDefault();
				}

				if (inProgress) {
					return;
				}

				var skip = local.length;

				inProgress = true;

				Article.get(pageSize, skip).then(function(articles) {
					local.push.apply(local, articles);

					var rows = [];

					local.forEach(function(article, index) {
						var rowIndex = Math.floor(index / rowSize);
						var colIndex = index % rowSize;

						rows[rowIndex] = rows[rowIndex] || {
							articles: []
						};

						rows[rowIndex].articles[colIndex] = article;
					});

					view.set('rows', rows);
				}).finally(function() {
					inProgress = false;
				});

				return false;
			});

			return view;
		}
	]);

	di.register('/article', [
		'@jquery',
		'@bluebird',
		function($, Promise) {
			var self = {};

			self.get = function(limit, skip) {
				var defer = Promise.defer();

				$.get('/api/articles', {
					limit: limit,
					skip: skip
				}).success(function(articles) {
					defer.resolve(articles);
				});

				return defer.promise;
			};

			return self;
		}
	]);

	di.register('/main', [
		'/view',
		function(view) {
			view.fire('articles.loadmore');
		}
	], true);

	di.register('@ractive', window.Ractive)
			.register('@bluebird', window.Promise)
			.register('@lodash', window._)
			.register('@jquery', window.jQuery);
})(__('ntq'));
