/*jshint bitwise:false */

/*!
 * Essential.js
 * Functional JavaScript "the right way"
 * @author Cedric Ruiz
 * @license MIT
 */
!function(exports) {
  'use strict';

  var id = function(x) {
    return x;
  };

  /**
   * @param {Pseudo} xs A pseudo-array
   * @returns {Array} A real array
   */
  var toArray = function(xs) {
    return Array.prototype.slice.call(xs);
  };

  /**
   * @param {Function} f A function
   * @returns {Function} A variadic function
   */
  var variadic = function(f) {
    return function() {
      var args = toArray(arguments);
      var given = args.slice(0, f.length-1);
      var extra = args.slice(f.length-1);
      return f.apply(this, given.concat([extra]));
    };
  };

  /**
   * @param {...Function} Functions to compose
   * @returns {Function} A composed function
   */
  var compose = variadic(function(fs) {
    return fs.reduce(function(f, g) {
      return function() {
        return f(g.apply(this, arguments));
      };
    });
  });

  /**
   * @param {Function} f A function
   * @param {...*} Arguments to partially apply
   * @returns {Function} A partially applied function
   */
  var partial = variadic(function(f, as) {
    return variadic(function(bs) {
      var args = as.concat(bs);
      for (var i=args.length; i>=0; i--) {
        if (args[i] === undefined) {
          args[i] = args.splice(-1)[0]; //!
        }
      }
      return f.apply(this, args);
    });
  });

  /**
   * @param {Function} f A function
   * @returns {Function} A curried function
   */
  var curry = function(f) {
    return function _curry(as) {
      var next = variadic(function(bs) {
        var args = (as||[]).slice(0);
        if (args.push.apply(args, bs) < f.length && bs.length) { //!
          return _curry(args);
        }
        return f.apply(null, args);
      });
      return f.length > 1 ? next : f;
    }();
  };

  /**
   * @param {Function} f A function
   * @returns {Function} Function with arguments flipped
   */
  var flip = function(f) {
    return variadic(function(as) {
      return f.apply(this, as.reverse());
    });
  };

  /**
   * @param {Object} x The target object
   * @param {Object} y The source object
   * @returns {Object} The extended target object
   */
  var extend = curry(function(x, y) {
    Object.keys(y).forEach(function(k) {
      x[k] = y[k]; //!
    });
    return x;
  });

  /**
   * @param {*} x A value
   * @param {*} y Another value
   * @returns {Boolean}
   */
  var is = curry(function(x, y) {
    return x === y;
  });

  /**
   * @param {*} x A value
   * @param {*} y Another value
   * @returns {Boolean}
   */
  var isnt = curry(function(x, y) {
    return x !== y;
  });

  /**
   * @param {String} x A type
   * @param {x} y A value
   * @returns {Boolean}
   */
  var isType = curry(function(type, x) {
    return Object.prototype.toString.call(x).slice(8,-1) == type;
  });

  /**
   * @param {Function} x f(*) -> Bool A function
   * @returns {Function} Negated function
   */
  var not = function(f) {
    return function() {
      return !f.apply(this, arguments);
    };
  };

  /**
   * @param {Function} xs A predicate function
   * @param {Array} y An array
   * @returns {Boolean} Does at least one element satisfy the predicate?
   */
  var any = curry(function(f, xs) {
    return xs.some(f);
  });

  /**
   * @param {Function} xs A predicate function
   * @param {Array} y An array
   * @returns {Boolean} Do all elements satisfy the predicate?
   */
  var all = curry(function(f, xs) {
    return xs.every(f);
  });

  /**
   * @param {Function} f f(accumulator, element) -> accumulator, A callback function
   * @param {*} acc The intial accumulator
   * @param {Array} xs The array to fold
   * @returns {*} The result of folding the array
   */
  var fold = curry(function(f, acc, xs) {
    return xs.reduce(f, acc);
  });

  /**
   * @param {Function} f f(element, index) -> *, A callback function
   * @param {Array} xs The array to map
   * @returns {Array} The result of applying the function to each element of the array
   */
  var map = curry(function(f, xs) {
    return xs.map(f);
  });

  /**
   * @param {Function} f f(element, index) -> Bool, A predicate function
   * @param {Array} xs The array to filter
   * @returns {Array} The result of testing each element against the predicate
   */
  var filter = curry(function(f, xs) {
    return xs.filter(f);
  });

  var reject = not(filter);

  /**
   * @param {Array} xs An array
   * @returns {Array} The array without duplicates
   */
  var unique = function(xs) {
    return xs.filter(function(x, i) {
      return xs.indexOf(x) == i;
    });
  };

  /**
   * @param {Array} xs A multidimensional array
   * @returns {Array} Deep flattened array
   */
  var flatten = function(xs) {
    return xs.reduce(function(acc, x) {
      if ([].concat(x).some(Array.isArray)) {
        return acc.concat(flatten(x));
      }
      return acc.concat(x);
    },[]);
  };

  /**
   * @param {String} x A property or property path to look up
   * @param {Object|Array} xs The object or array to extract the property from
   * @returns {*} The property value
   */
  var pluck = curry(function(x, xs) {
    return String(x).split('.').reduce(function(acc, x) {
      return acc[x] != null ? acc[x] : null;
    }, xs);
  });

  /**
   * @param {String} x A property to look up recursively
   * @param {Object} xs The object to lookup properties in
   * @returns {Array} Array containing all properties
   */
  var pluckR = curry(function(x, xs) {
    var result = [];
    while (xs = pluck(x, xs)) {
      result.push(xs);
    }
    return result;
  });

  /**
   * @param {Object} x Properties to match
   * @param {Array} xs A collection (array of objects)
   * @returns {Array} Filtered collection
   */
  var where = curry(function(obj, xs) {
    return xs.filter(function(x) {
      return Object.keys(obj).every(function(k) {
        return obj[k] == x[k];
      });
    });
  });

  /**
   * @param {...Array} Arrays to zip
   * @returns {Array} Multidimensional array of zipped values
   */
  var zip = variadic(function(xss) {
    return xss[0].map(function(_, i) {
      return xss.map(pluck(i));
    });
  });

  /**
   * @param {...Function} f(x) -> Array, Functions that return an array
   * @returns {Function} f(x) -> *, Concatenates arrays resulting from applying each function to the given argument
   */
  var concatF = variadic(function(fs) {
    return function(x) {
      return fs.reduce(function(acc, f, i) {
        return acc[i] = f(x), acc;
      },[]);
    };
  });

  /**
   * @param {Array} xs An array
   * @returns {Array} A shuffled array copy
   */
  var shuffle = function(xs) {
    var ys = xs.slice(0);
    for (var i=0, j; i<ys.length; i++) {
      j = Math.random() * (i + 1) |0;
      ys[j] = [ys[i], ys[i] = ys[j]][0]; //!
    }
    return ys;
  };

  /**
   * @param {Function} f A function iterator
   * @param {Array} f An array
   * @returns {Array} Sorted array
   */
  var sortBy = curry(function(f, xs) {
    var compare = function(x, y) {
      return typeof x == 'number' ? x - y
        : x > y ? 1
        : x < y ? -1
        : 0;
    };
    return xs.sort(function(x, y) {
      return compare(f(x), f(y));
    });
  });

  /**
   * @param {Function} f A function iterator
   * @param {Array} f An array
   * @returns {Object} Result of applying function to each item and counting ocurrences
   */
  var countBy = curry(function(f, xs) {
    return xs.reduce(function(acc, x) {
      var fx = f(x);
      return acc[fx] = ++acc[fx]||1, acc;
    },{});
  });

  /**
   * @param {Object} obj Data
   * @param {String} x A template
   * @returns {String} A string with the data filled in
   */
  var template = curry(function(obj, x) {
    return x.replace(/#\{(.+?)\}/g, function(_, k) {
      return obj[k] || '';
    });
  });

  /**
   * @param {Array} obj Data
   * @param {String} x A template
   * @returns {String} A string with the data filled in
   */
  var format = curry(function(xs, x) {
    return x.replace(/%(\d+)/g, function(_, i) {
      return xs[--i] || '';
    });
  });

  /**
   * @param {RegExp} re A pattern with capture group
   * @param {String} x A string to match
   * @returns {Array} All matches
   */
  var gmatch = curry(function(re, x) {
    var res = [];
    x.replace(re, variadic(function(as) {
      res.push.apply(res, as.slice(1,-2)); //!
    }));
    return res;
  });

  extend(exports, {
    _: undefined,
    toArray: toArray,
    extend: extend,
    variadic: variadic,
    compose: compose,
    partial: partial,
    curry: curry,
    flip: flip,
    is: is,
    isnt: isnt,
    isType: isType,
    not: not,
    any: any,
    all: all,
    fold: fold,
    map: map,
    filter: filter,
    reject: reject,
    unique: unique,
    flatten: flatten,
    pluck: pluck,
    pluckR: pluckR,
    where: where,
    zip: zip,
    concatF: concatF,
    shuffle: shuffle,
    sortBy: sortBy,
    countBy: countBy,
    template: template,
    format: format,
    gmatch: gmatch
  });
}(typeof exports === 'undefined' ? window.essential={} : exports);
