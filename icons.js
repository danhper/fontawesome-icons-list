var css  = require('css');
var fs   = require('fs');
var path = require('path');

var fontAwesomePath = path.join(__dirname, 'node_modules', 'font-awesome', 'css', 'font-awesome.css');
var fontAwesomeCSS = fs.readFileSync(fontAwesomePath, 'utf8');

function isFASelector(selector) {
  return selector.indexOf('.fa') === 0;
}

function hasFASelector(obj) {
  for (var i in obj.selectors) {
    if (isFASelector(obj.selectors[i])) {
      return true;
    }
  }
  return false;
}

function isFAIcon(obj) {
  for (var i in obj.declarations) {
    var declaration = obj.declarations[i];
    if (declaration.type === 'declaration' && declaration.property === 'content') {
      return true;
    }
  }
  return false;
}

function isIcon (obj) {
  return obj.type === 'rule' && hasFASelector(obj) && isFAIcon(obj);
}


var fontAwesome = css.parse(fontAwesomeCSS).stylesheet.rules;
var icons = [];
fontAwesome.filter(function (obj) {
  return isIcon(obj);
}).forEach(function (obj) {
  obj.selectors.forEach(function (selector) {
    icons.push(selector.split(':')[0].substring(1));
  });
});

module.exports = icons.sort();
