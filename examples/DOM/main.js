'use strict';

essential.extend(window, essential);

var query = curry(function(el, sel) {
  return toArray(el.querySelectorAll(sel));
});

var queryAll = query(document);
var qMap = compose(filter(Boolean), unique, flatten, map);

var parent = pluck('parentNode');
var parents = pluckR('parentNode');
var children = compose(toArray, pluck('children'));
var next = pluck('nextElementSibling');
var prev = pluck('previousElementSibling');
var nextAll = pluckR('nextElementSibling');
var prevAll = pluckR('previousElementSibling');
var siblings = concatF(prevAll, nextAll);

var text = pluck('textContent');
var html = pluck('innerHTML');
var tag = pluck('tagName');

// Examples:

var els;

// $('li').parent()
els = qMap(parent, queryAll('li'));

// $('ul').children().filter(function(){ return $(this).text() == 'A' })
els = filter(compose(is('A'), text), qMap(children, queryAll('ul')));

// $('li').parents('ul')
els = filter(compose(is('UL'), tag), qMap(parents, queryAll('li')));

// $('li').siblings()
els = qMap(siblings, queryAll('li:first-child'));
