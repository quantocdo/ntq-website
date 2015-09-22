;(function(di) {
	'use strict';

	di.register('/home/navigator', [
		'@ractive',
		function(Ractive) {
			var container = document.createElement('div');
			document.body.appendChild(container);

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

			return view;
		}
	]);
})(__('ntq.home'));
