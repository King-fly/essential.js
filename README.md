## Essential.js

Functional JavaScript the right way.  
**License:** [MIT](http://opensource.org/licenses/MIT)  
**Support:** [ES5 compliant browsers](http://kangax.github.io/es5-compat-table/)

### Index

- [Highlights](https://github.com/elclanrs/essential.js#highlights)
- [How to](https://github.com/elclanrs/essential.js#how-to)
- [Functions](https://github.com/elclanrs/essential.js#functions):  
[id](https://github.com/elclanrs/essential.js#id) | 
[toArray](https://github.com/elclanrs/essential.js#toArray) | 
[variadic](https://github.com/elclanrs/essential.js#variadic) | 
[compose](https://github.com/elclanrs/essential.js#compose) | 
[partial](https://github.com/elclanrs/essential.js#partial) | 
[curry](https://github.com/elclanrs/essential.js#curry) | 
[flip](https://github.com/elclanrs/essential.js#flip) | 
[is](https://github.com/elclanrs/essential.js#is) | 
[isnt](https://github.com/elclanrs/essential.js#isnt) | 
[isType](https://github.com/elclanrs/essential.js#istype) | 
[not](https://github.com/elclanrs/essential.js#not) | 
[any](https://github.com/elclanrs/essential.js#any) | 
[all](https://github.com/elclanrs/essential.js#all) | 
[fold](https://github.com/elclanrs/essential.js#fold) | 
[map](https://github.com/elclanrs/essential.js#map) | 
[filter](https://github.com/elclanrs/essential.js#filter) | 
[reject](https://github.com/elclanrs/essential.js#reject) | 
[unique](https://github.com/elclanrs/essential.js#unique) | 
[flatten](https://github.com/elclanrs/essential.js#flatten) | 
[pluck](https://github.com/elclanrs/essential.js#pluck) | 
[pluckR](https://github.com/elclanrs/essential.js#pluckr) | 
[where](https://github.com/elclanrs/essential.js#where) | 
[zip](https://github.com/elclanrs/essential.js#zip) | 
[concatF](https://github.com/elclanrs/essential.js#concatf) | 
[shuffle](https://github.com/elclanrs/essential.js#shuffle) | 
[sortBy](https://github.com/elclanrs/essential.js#sortby) | 
[countBy](https://github.com/elclanrs/essential.js#countby) | 
[template](https://github.com/elclanrs/essential.js#template) | 
[format](https://github.com/elclanrs/essential.js#format) | 
[gmatch](https://github.com/elclanrs/essential.js#gmatch)

### Highlights

Essential.js is a simpler alternative to Underscore, with everything you need, and nothing you don't need. Essential.js gives you a solid base to get started with functional programming in JavaScript "the right way":

- All non-variadic functions with more than one argument are curried.
- Arguments are in proper order for better composition.
- Includes a few helpers not found in Underscore.
- Inspired by Brian Lonsdorf's talk, [Hey Underscore, You're Doing it Wrong](https://www.youtube.com/watch?v=m3svKOdZijA).

### How to

#### Browser
Include script:
```
<script src="essential.js"></script>
```
Make all functions global:
```javascript
essential.extend(window, essential);
```

#### NodeJS
```javascript
var essential = require('./essential.js');
essential.extend(global, essential);
```

### Functions

#### id
```javascript
var x = 2;
id(x); //=> 2
```

#### toArray
```javascript
function foo() {
  var args = toArray(arguments);
}
```

#### extend
Mutates target.
```javascript
var target = {a: 'foo'};
var source = {b: 'baz'};
extend(target, source); //=> {a: 'foo', b: 'baz'}
```

#### variadic
```javascript
var foo = variadic(function(x, args) {
  console.log('x:'+ x, 'args:'+ args);
});
foo(1, 2, 3); //=> x:1, args:[2,3]
```

#### compose
```javascript
var add1 = function(x){return x + 1};
var by2 = function(x){return x * 2};
var add1by2 = compose(by2, add1);
add1by2(2); //=> 6
```

#### partial
The placeholder `_` is synonymous with `undefined`.
```javascript
var add = function(x, y){return x + y};
var add1 = partial(add, 1);
add1(2); //=> 3
// placeholder
var name = function(first, last, nick) {
  return format([first, last, nick], '%1 %2 is also known as "%3"');
};
partial(name, 'Peter', _, 'Pete')('Johnson');
//^ Peter Johnson is also known as "Pete"
```

#### curry
Not bound. Don't depend on `this`.
```javascript
var add = curry(function(x, y){return x + y});
var add1 = add(1);
add1(2); //=> 3
```

#### flip
```javascript
var append = function(x, y){return x + y};
append('abc', 'def'); //=> 'abcdef'
var prepend = flip(append);
prepend('abc', 'def'); //=> 'defabc'
```

#### is
```javascript
is(1, 1); //=> true
is(1, 2); //=> false
```

#### isnt
```javascript
isnt(1, 1); //=> false
isnt(1, 2); //=> true
```

#### isType
Proper `typeof`.
```javascript
isType('Array', [1,2,3]); //=> true
isType('Object', [1,2,3]); //=> false
```

#### not
```javascript
var even = function(x){return x % 2 === 0};
var odd = not(even);
```

#### any
```javascript
var arr = [1,2,3];
var even = function(x){return x % 2 == 0};
any(even, arr); //=> true
```

#### all
```javascript
var arr = [2,4,6];
var even = function(x){return x % 2 == 0};
all(even, arr); //=> true
```

#### fold
```javascript
var arr = [1,2,3];
var sum = function(x,y){return x + y};
fold(sum, 0, arr); //=> 6
```

#### map
```javascript
var arr = [1,2,3];
var add1 = function(x){return x + 1};
map(add1, arr); //=> [2,3,4]
```

#### filter
```javascript
var arr = [1,2,3];
var even = function(x){return x % 2 == 0};
filter(even, arr); //=> [2]
```

#### reject
```javascript
var arr = [1,2,3];
var even = function(x){return x % 2 == 0};
reject(even, arr); //=> [1,3]
```

#### unique
```javascript
var arr = [1,1,2,2,3,3];
unique(arr); //=> [1,2,3]
```

#### flatten
Deep flatten.
```javascript
var arr = [[1,[2]],[3,[4]],[5,[6]]];
flatten(arr); //=> [1,2,3,4,5,6]
```

#### pluck
```javascript
var obj = {a: {ab: {aba: 'foo'}}, b: 'baz'};
// single
pluck('b', obj); //=> 'baz'
// path
pluck('a.ab.aba', obj); //=> 'foo'
```

#### pluckR
Recursive pluck.
```javascript
// given <ul> <li></li> <li></li> <li></li> </ul>
var els = toArray(document.querySelectorAll('li:first-child'));
pluckR('nextElementSibling', els); //=> [li, li]
```

#### where
```javascript
var people = [
  {name: 'Jon', age: 25},
  {name: 'Peter', age: 32},
  {name: 'Peter', age: 24}
];
where({name: 'Peter'}, people);
//^ [{name: 'Peter', age: 32}, {name: 'Peter', age: 24}]
```

#### zip
```javascript
zip([1,2,3], [4,5,6]); //=> [[1,4], [2,5], [3,6]]
```

#### concatF
Higher order concat.
```javascript
var add1 = map(function(x){return x + 1});
var by2 = map(function(x){return x * 2});
var xs = [1,2,3];
concatF(add1, by2)(xs); //=> [[2,3,4], [2,4,6]]
```

#### shuffle
Fisher-Yates shuffle. No mutation, outputs copy.
```javascript
shuffle([1,2,3,4,5]); //=> [2,5,4,1,3]
```

#### sortBy
```javascript
var xs = [{x:20}, {x:40}, {x:30}, {x:10}];
sortBy(pluck('x'), xs); //=> [{x:10}, {x:20}, {x:30}, {x:40}]
```

#### countBy
```javascript
var xs = [1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9];
countBy(Math.round, xs); //=> {1:4, 2:5}
```

#### template
```javascript
var data = {name: 'Jonh', age: 25};
var html = '<h1>#{name}</h1><h2>#{age}</h2>';
template(data, html); //=> '<h1>John</h1><h2>25</h2>'
```

#### format
```javascript
var data = ['Jonh', 25];
var html = '<h1>%1</h1><h2>%2</h2>';
format(data, html); //=> '<h1>John</h1><h2>25</h2>'
```

#### gmatch
Better `match` with capture groups.
```javascript
var regex = /\{\{(.+?)\}\}/g;
var str = 'Hello {{foo}} world {{baz}}';
gmatch(regex, str); //=> ['foo', 'baz']
```
