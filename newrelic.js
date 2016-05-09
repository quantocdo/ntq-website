/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
var yargs = require('yargs');

var profiles = {
	production: {
		app_name: ['NTQ Website Production'],
		license_key: '84d264f46612167e5aff0a1f0b17895ce703ee42',
	},
};

var profileArg = yargs.argv.p ||
		yargs.argv.profile ||
		process.env.NODE_ENV ||
		'development';

var profile = profiles[profileArg];

exports.config = profile && {
	/**
	 * Array of application names.
	 */
	app_name: profile.app_name,
	/**
	 * Your New Relic license key.
	 */
	license_key: profile.license_key,
	logging: {
		/**
		 * Level at which to log. 'trace' is most useful to New Relic when diagnosing
		 * issues with the agent, 'info' and higher will impose the least overhead on
		 * production applications.
		 */
		level: 'info'
	},
};
