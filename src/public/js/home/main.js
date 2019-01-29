;(function(di) {
	'use strict';

	di.register({
		name: '/main',
		requires: [
			'@lodash',
			'@jquery',
			'/layout',
			'/home/navigator'
		],
		factory: function(_, $, Layout, navigator) {
			var layout = new Layout({
				paddingTop: $('.site-header').height(),
				sections: $('.page-full .page-section'),
				container: $('.page-full'),
				remain: $('.page-remain')[0],
				minHeight: 775
			});

			layout.live();

			var sections = _.map(layout.sections, function(section, index) {
				return {
					index: index,
					title: section.getAttribute('data-title')
				};
			});

			sections.push({
				index: sections.length,
				title: 'Footer'
			});

			navigator.set('sections', sections);

			navigator.on('section.selected', function(index) {
				layout.select(index);
			});
		},
		activations: [
			'/frame'
		]
	});

	alert('abc');

})(__('ntq'));

alert('abc');
