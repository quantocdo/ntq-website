;(function(di) {
	'use strict';

	di.factory('/home/navigator', [
		'@ractive',
		function(Ractive) {
			var container = document.createElement('div');
			var view = new Ractive({
				el: container,
				template: '#home-navigator',
				data: {
					sections: [],
					selected: 0
				},
				select: function(section) {
					view.fire('section.selected', section.index);
				}
			});

			document.body.appendChild(container);

			return view;
		}
	]);
})(__('ntq'));
