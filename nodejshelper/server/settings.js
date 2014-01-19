var settings = {}


settings.web = {};
settings.debug = {};

/**
 * Set path where socket.io is located, it can be also just socket.io
 * */
settings.socketiopath = '/usr/local/lib/node_modules/socket.io';

/**
 * Set your settings
 * */
settings.web.host = "94.23.200.91";
settings.web.port = 31129;

/**
 * Enable debug output
 * */
settings.debug.output = true;

module.exports = settings;