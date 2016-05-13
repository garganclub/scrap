var casper = require('casper').create({
	pageSettings: {
		loadImages: false,
		loadPlugins: false,
		userAgent: '[Vietnam] Chilkat/1.0.0 (+http://www.chilkatsoft.com/ChilkatHttpUA.asp)'
	},
	clientScripts: ['bootstrap-3.3.6-dist/js/jquery-2.1.4/jquery-2.1.4.min.js', 'bootstrap-3.3.6-dist/js/lodash.js']
});
var utils = require('utils');
var fs = require('fs');

var url = casper.cli.get(0);
var number = casper.cli.get('nombre');

var labels = [];
var labelsSelection = [];
var links = [];
var linksSelection = [];
var images = [];
var imagesSelection = [];
var prices = [];
var pricesSelection = [];
var shops = [];
var shopsSelection = [];
var logos = [];
var logosSelection = [];
var addresses = [];

function getLabels() {
	var nodes = $('span.clr9');
	return _.map(nodes, function(node) {
		return node.innerText;
	});
}

function getLinks() {
	var nodes = $('span.clr9');
	return _.map(nodes, function(node) {
		return node.getAttribute('data-arg');
	});
}

function getImages() {
	var nodes = $('div.a.photo.unique.blank img');
	return _.map(nodes, function(node) {
		return node.getAttribute('src');
	});
}

function getPrices() {
	var nodes = $('span.price span.a.unique.blank');
	return _.map(nodes, function(node) {
		return node.innerText;
	});
}

function getShops() {
	var nodes = $('span.a.shop.unique.blank span');
	return _.map(nodes, function(node) {
		return node.innerText;
	});
}

function getLogos() {
	var nodes = $('span.a.shop.unique.blank img');
	return _.map(nodes, function(node) {
		return node.getAttribute('src');
	});
}

function list(image, label, price, tracker, shop, logo) {
	this.image = image;
	this.label = label;
	this.price = price;
	this.tracker = tracker;
	this.shop = shop;
	this.logo = logo;
}

casper.start(url);

casper.waitForSelector('span.clr9');

casper.then(function() {
    labels = this.evaluate(getLabels);
    labelsSelection = labels.slice(0, number);
    links = this.evaluate(getLinks);
    linksSelection = links.slice(0, number);
    images = this.evaluate(getImages);
    imagesSelection = images.slice(0, number);
    prices = this.evaluate(getPrices);
    pricesSelection = prices.slice(0, number);
    shops = this.evaluate(getShops);
    shopsSelection = shops.slice(0, number);
    logos = this.evaluate(getLogos);
    logosSelection = logos.slice(0, number);
});

casper.then(function() {
	var current = 0;
    var end = number;
    for (;current < end;) {
		(function(i) {
			casper.then(function() {
				var window = new RegExp(linksSelection[i]);
				this.clickLabel(labelsSelection[i], 'span');
				casper.waitForPopup(window, function() {
				});
				casper.withPopup(window, function() {
					var image = imagesSelection[i];
					var label = labelsSelection[i];
					var price = pricesSelection[i];
					var tracker = this.getCurrentUrl();
					var shop = shopsSelection[i];
					var logo = logosSelection[i];
					var instance = new list(image, label, price, tracker, shop, logo);
					addresses.push(instance);
				});
			});
		})(current);
		current++;
	}
});

casper.run(function() {
	for(var i in addresses) {
		this.echo(addresses[i]['label']);
	}
	for(var i in addresses) {
		this.echo(addresses[i]['tracker']);
	}
	for(var i in addresses) {
		this.echo(addresses[i]['image']);
	}
	for(var i in addresses) {
		this.echo(addresses[i]['price']);
	}
	for(var i in addresses) {
		this.echo(addresses[i]['shop']);
	}
	for(var i in addresses) {
		this.echo(addresses[i]['logo']);
	}
    var data = JSON.stringify(addresses);
    fs.write('json/trackers.json', data, 'w');
	this.exit();
});
