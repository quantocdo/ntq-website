;(function(di) {
	'use strict';

	di.register('@jquery', window.jQuery)
			.register('@lodash', window._)
			.register('@bluebird', window.Promise)
			.register('@tween', window.TWEEN)
			.register('@ractive', window.Ractive)
			.register('@hammer', window.Hammer);
})(__('ntq.home'));
