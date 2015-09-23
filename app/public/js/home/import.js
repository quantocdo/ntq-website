;(function(di) {
	'use strict';

	di.register('@jquery', window.jQuery)
			.register('@tween', window.TWEEN)
			.register('@ractive', [
				function() {
					window.Ractive.DEBUG = false;
					return window.Ractive;
				}
			])
			.register('@hammer', window.Hammer);
})(__('ntq'));
