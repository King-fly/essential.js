var essential = require('./../../lib/essential.js');
essential.extend(global, essential);

//- Comparison

// Instead of
var a = 1;
if (a == 1 || a == 2 || a == 3 || a == 4) {

}
// Do
if (any(is(a), [1,2,3,4])) {

}

// Instead of
var a, b, c;
a = b = c = 1;
if (a == 1 && b == 1 && c == 1) {

}
// Do
if (all(is(1), [a,b,c])) {

}

//- Higher-order & currying

// Instead of
function add(xs) {
  var sum = 0;
  for (var i=0; i<xs.length; i++) {
    sum += xs[i];
  }
  return sum;
}
// Do
var add = fold(function(x,y){return x + y}, 0);

//- Built-ins

// Instead of
var re = /\{\{(.+?)\}\}/g;
var str = "hello {{one}} world {{two}}";
var result = [];
var tmp;
while ((tmp = re.exec(str)) != null) {
  result.push(tmp[1]);
}
// Do
var result = gmatch(re, str);

// Instead of
var obj = {a: {b: {c: 'foo'}}};
if (obj.a && obj.a.b && obj.a.b.c) {

}
// Do
if (pluck('a.b.c', obj)) {

}
