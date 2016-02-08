var fs   = require('fs');
var icons = require('./icons');

fs.writeFileSync('icons.json', JSON.stringify(icons));

fs.writeFileSync('index.js', ['(function (root, factory) {',
'  if(typeof define === "function" && define.amd) {',
'    define([], function(){',
'      return (root.fontawesomeIconsList = factory());',
'    });',
'  } else if(typeof module === "object" && module.exports) {',
'    module.exports = (root.fontawesomeIconsList = factory());',
'  } else {',
'    root.fontawesomeIconsList = factory();',
'  }',
'}(this, function() {',
'  return ' + JSON.stringify(icons) + ';',
'}));'].join('\n'));
