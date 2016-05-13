var casper = require('casper').create({
	pageSettings: {
		loadImages: false,
		loadPlugins: false,
		userAgent: '[Mexico] Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; Microsoft; Lumia 640 XL)'
	},
	clientScripts: ['bootstrap-3.3.6-dist/js/jquery-2.1.4/jquery-2.1.4.min.js', 'bootstrap-3.3.6-dist/js/lodash.js']
});
var utils = require('utils');
var addresse = '';

var webpages = require('json/trackers.json');
var numero = casper.cli.get(0);
var destination = webpages[numero]['tracker'];
var url = casper.cli.get('adresse');

casper.start(url);

casper.waitForSelector('span.clr9');

casper.thenOpen(destination, function() {	
	this.waitForSelector('title', function() {
		var cible = this.getCurrentUrl();
		addresse = cible;
	});
});

casper.run(function() {
	this.echo(addresse);
	this.exit();
});
