webpackJsonp([0],Array(82).concat([
/* 82 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(124)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(97),
  /* template */
  __webpack_require__(130),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 83 */,
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(36)('wks');
var uid = __webpack_require__(38);
var Symbol = __webpack_require__(3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 92 */,
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(25).f;
var has = __webpack_require__(10);
var TAG = __webpack_require__(84)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cov_touch__ = __webpack_require__(135);






var _ = {
    on: function on(el, type, handler) {
        el.addEventListener(type, handler, false);
    },
    off: function off(el, type, handler) {
        el.addEventListener(type, handler, false);
    }
};

/* harmony default export */ __webpack_exports__["default"] = ({
    props: {
        swipe: {
            type: Object,
            default: function _default() {
                return {};
            }
        }
    },
    data: function data() {
        return {
            $wrapper: null,
            $touch: null,
            timer: null,
            pagination: [],
            swiper: {
                swiping: false,
                rect: {
                    width: 0,
                    height: 0
                },
                count: 0,
                index: 0,
                options: {}
            },
            position: {
                x: 0,
                y: 0,
                z: 0
            },
            options: {
                activeIndex: 0,
                autoplay: 3000,
                pagination: true
            }
        };
    },

    computed: {
        wrapperStyle: function wrapperStyle() {
            if (this.swiper.swiping) {
                return {
                    transform: 'translate3d(-' + this.position.x + 'px, ' + this.position.y + 'px, ' + this.position.z + 'px)',
                    '-webkit-transform': 'translate3d(-' + this.position.x + 'px, ' + this.position.y + 'px, ' + this.position.z + 'px)'
                };
            } else {
                return {
                    transform: 'translate3d(-' + this.position.x + 'px, ' + this.position.y + 'px, ' + this.position.z + 'px)',
                    '-webkit-transform': 'translate3d(-' + this.position.x + 'px, ' + this.position.y + 'px, ' + this.position.z + 'px)',
                    transition: 'all .3s',
                    '-webkit-transition': 'all .3s'
                };
            }
        }
    },
    mounted: function mounted() {
        _.on(window, 'resize', this.init());
        _.on(this.$el, 'resize', this.init());
    },
    beforeDestroy: function beforeDestroy() {
        if (this.$touch) {
            this.$touch.destroy();
        }
    },

    methods: {
        init: function init() {
            this.options = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_assign___default()(this.options, this.swipe);
            this.$wrapper = this.$el.getElementsByClassName('rd-swipe-wrapper')[0];
            this.swiper.count = this.$el.getElementsByClassName('rd-swipe-item').length;
            this.swiper.rect = this.$el.getBoundingClientRect();

            if (this.options.pagination) {
                this.pagination = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_array_from___default()({ length: this.swiper.count }).map(function (item, index) {
                    return {
                        index: index,
                        active: index === 0
                    };
                });
            }

            this.initSwipe();
            if (this.swipe.autoplay) {
                this.startAutoPlay(this.swipe.autoplay);
            }
        },
        initSwipe: function initSwipe() {
            var _this = this;

            if (this.$touch) {
                this.$touch.destroy();
            }
            this.$touch = new __WEBPACK_IMPORTED_MODULE_2__cov_touch__["a" /* default */]({ el: this.$el });

            this.$touch.listen('swipe-left', null, function () {
                _this.swiper.swiping = false;
                _this.next();
            });
            this.$touch.listen('swipe-right', null, function () {
                _this.swiper.swiping = false;
                _this.pre();
            });
            var movediff = 0;

            this.$touch.listen('swiping', null, function (start, end) {
                _this.swiper.swiping = true;
                var move = start.x - end.x;
                _this.position.x += move - movediff;
                movediff = move;
            });

            this.$touch.listen('swiped', null, function (start, end) {
                movediff = 0;
                _this.swiper.swiping = false;
            });
        },
        startAutoPlay: function startAutoPlay(delay) {
            this.stopAutoPlay();
            this.timer = setInterval(this.play, delay || this.options.autoplay);
        },
        stopAutoPlay: function stopAutoPlay() {
            if (this.timer) {
                window.clearInterval(this.timer);
                window.clearTimeout(this.timer);
                this.timer = null;
            }
        },
        play: function play() {
            if (this.swiper.index === this.swiper.count - 1) {
                this.swiper.index = -1;
            }
            if (this.swiper.swiping) return;
            this.next();
        },
        next: function next() {
            if (this.swiper.index < this.swiper.count - 1) {
                this.swiper.index++;
            }
            this.position.x = this.swiper.rect.width * this.swiper.index;
            this.checkOut();
        },
        pre: function pre() {
            if (this.swiper.index > 0) {
                this.swiper.index--;
            }
            this.position.x = this.swiper.rect.width * this.swiper.index;
            this.checkOut();
        },
        turnTo: function turnTo(index) {
            var _this2 = this;

            index = Math.floor(index);
            if (index < -1 || index > this.swiper.count) return console.error('invaild index: ', index);
            this.stopAutoPlay();
            this.swiper.index = index;
            this.position.x = this.swiper.rect.width * index;
            this.checkOut();
            this.timer = setTimeout(function () {
                _this2.startAutoPlay();
            }, this.swipe.autoplay * 2);
        },
        setPaginationActive: function setPaginationActive(index) {
            this.pagination.forEach(function (item) {
                return item.active = false;
            });
            this.pagination[index].active = true;
        },
        checkOut: function checkOut() {
            this.swipe.activeIndex = this.swiper.index;
            if (this.options.pagination) {
                this.setPaginationActive(this.swiper.index);
            }
            if (this.position.x > this.swiper.rect.width * this.swiper.count) {
                this.position.x = this.swiper.rect.width * this.swiper.count;
            }
            if (this.position.x < 0) {
                this.position.x = 0;
            }
        }
    }
});

/***/ }),
/* 95 */,
/* 96 */,
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_slide_vue_slide_vue__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_slide_vue_slide_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_slide_vue_slide_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__img_img_vue__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__img_img_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__img_img_vue__);




/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      swipe: {
        activeIndex: 1,
        pagination: false
      },
      images: []
    };
  },

  components: {
    rdSwipe: __WEBPACK_IMPORTED_MODULE_0_vue_slide_vue_slide_vue___default.a,
    vImg: __WEBPACK_IMPORTED_MODULE_1__img_img_vue___default.a
  },
  mounted: function mounted() {
    this.getDetail();
  },
  beforeRouteEnter: function beforeRouteEnter(to, from, next) {
    next(function (vm) {
      vm.$store.commit('update_scroll', true);
      vm.$store.commit('update_header', false);
    });
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    this.$store.commit('update_scroll', false);
    this.$store.commit('update_header', true);
    next();
  },

  methods: {
    getDetail: function getDetail() {
      var _this = this;

      var gid = this.$route.params.gallery_id;
      this.$http.jsonp('https://tu.duowan.com/index.php?r=show/getByGallery', { params: { gid: gid } }).then(function (response) {
        _this.images = response.data.picInfo;
        _this.$nextTick(function () {
          _this.$refs.rdSwipe.init();
        });
      }, function (response) {
        console.log(response.state);
      });
    }
  }
});

/***/ }),
/* 98 */,
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ }),
/* 100 */,
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(118);
__webpack_require__(117);
module.exports = __webpack_require__(9).Array.from;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(31);
var TAG = __webpack_require__(84)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(25);
var createDesc = __webpack_require__(27);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;
module.exports = document && document.documentElement;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(91);
var ITERATOR = __webpack_require__(84)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(23);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(111);
var descriptor = __webpack_require__(27);
var setToStringTag = __webpack_require__(93);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(24)(IteratorPrototype, __webpack_require__(84)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(110);
var $export = __webpack_require__(26);
var redefine = __webpack_require__(114);
var hide = __webpack_require__(24);
var Iterators = __webpack_require__(91);
var $iterCreate = __webpack_require__(107);
var setToStringTag = __webpack_require__(93);
var getPrototypeOf = __webpack_require__(113);
var ITERATOR = __webpack_require__(84)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(84)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(23);
var dPs = __webpack_require__(112);
var enumBugKeys = __webpack_require__(34);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(33)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(104).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(25);
var anObject = __webpack_require__(23);
var getKeys = __webpack_require__(35);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(10);
var toObject = __webpack_require__(29);
var IE_PROTO = __webpack_require__(28)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(24);


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(12);
var defined = __webpack_require__(11);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(102);
var ITERATOR = __webpack_require__(84)('iterator');
var Iterators = __webpack_require__(91);
module.exports = __webpack_require__(9).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(32);
var $export = __webpack_require__(26);
var toObject = __webpack_require__(29);
var call = __webpack_require__(106);
var isArrayIter = __webpack_require__(105);
var toLength = __webpack_require__(37);
var createProperty = __webpack_require__(103);
var getIterFn = __webpack_require__(116);

$export($export.S + $export.F * !__webpack_require__(109)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(115)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(108)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(78)();
// imports


// module
exports.push([module.i, "\n.swipe-body {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: #333;\n  z-index: 10;\n}\n.rd-swipe {\n  width: 100% !important;\n  height: 100% !important;\n}\n", "", {"version":3,"sources":["D:/code/vue-study/src/components/wallpaper/detail.vue"],"names":[],"mappings":";AACA;EACE,gBAAgB;EAChB,OAAO;EACP,QAAQ;EACR,UAAU;EACV,SAAS;EACT,uBAAuB;EACvB,YAAY;CACb;AACD;EACE,uBAAuB;EACvB,wBAAwB;CACzB","file":"detail.vue","sourcesContent":["\n.swipe-body {\n  position: fixed;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: #333;\n  z-index: 10;\n}\n.rd-swipe {\n  width: 100% !important;\n  height: 100% !important;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(78)();
// imports


// module
exports.push([module.i, "\n.rd-swipe {\n    height: 400px;\n    width: 600px;\n    margin: 0 auto;\n    position: relative;\n    overflow: hidden;\n    z-index: 1;\n}\n.rd-swipe-wrapper {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    display: -ms-flexbox;\n    display: flex;\n    transition-property: transform;\n    box-sizing: content-box;\n}\n.rd-swipe-item {\n    width: 100%;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    height: 100%;\n    background-size: cover;\n    background-position: 50%;\n}\n.rd-swipe-pagination {\n    position: absolute;\n    bottom: .5rem;\n    width: 100%;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: center;\n        justify-content: center;\n}\n.rd-swipe-pagination-item {\n    width: 8px;\n    height: 8px;\n    background: rgba(0, 0, 0, .5);\n    z-index: 1;\n    margin: 4px;\n    border-radius: 50%;\n}\n.rd-swipe-pagination-item.active {\n    background: rgba(0, 0, 0, .8);\n}\n.rd-swipe-pagination-item:hover {\n    background: rgba(0, 0, 0, .3);\n}\n", "", {"version":3,"sources":["D:/code/vue-study/node_modules/_vue-slide@1.1.1@vue-slide/vue-slide.vue"],"names":[],"mappings":";AACA;IACI,cAAc;IACd,aAAa;IACb,eAAe;IACf,mBAAmB;IACnB,iBAAiB;IACjB,WAAW;CACd;AACD;IACI,mBAAmB;IACnB,YAAY;IACZ,aAAa;IACb,WAAW;IACX,qBAAqB;IACrB,cAAc;IACd,+BAA+B;IAC/B,wBAAwB;CAC3B;AACD;IACI,YAAY;IACZ,qBAAqB;QACjB,eAAe;IACnB,aAAa;IACb,uBAAuB;IACvB,yBAAyB;CAC5B;AACD;IACI,mBAAmB;IACnB,cAAc;IACd,YAAY;IACZ,qBAAqB;IACrB,cAAc;IACd,sBAAsB;QAClB,wBAAwB;CAC/B;AACD;IACI,WAAW;IACX,YAAY;IACZ,8BAA8B;IAC9B,WAAW;IACX,YAAY;IACZ,mBAAmB;CACtB;AACD;IACI,8BAA8B;CACjC;AACD;IACI,8BAA8B;CACjC","file":"vue-slide.vue","sourcesContent":["\n.rd-swipe {\n    height: 400px;\n    width: 600px;\n    margin: 0 auto;\n    position: relative;\n    overflow: hidden;\n    z-index: 1;\n}\n.rd-swipe-wrapper {\n    position: relative;\n    width: 100%;\n    height: 100%;\n    z-index: 1;\n    display: -ms-flexbox;\n    display: flex;\n    transition-property: transform;\n    box-sizing: content-box;\n}\n.rd-swipe-item {\n    width: 100%;\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n    height: 100%;\n    background-size: cover;\n    background-position: 50%;\n}\n.rd-swipe-pagination {\n    position: absolute;\n    bottom: .5rem;\n    width: 100%;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: center;\n        justify-content: center;\n}\n.rd-swipe-pagination-item {\n    width: 8px;\n    height: 8px;\n    background: rgba(0, 0, 0, .5);\n    z-index: 1;\n    margin: 4px;\n    border-radius: 50%;\n}\n.rd-swipe-pagination-item.active {\n    background: rgba(0, 0, 0, .8);\n}\n.rd-swipe-pagination-item:hover {\n    background: rgba(0, 0, 0, .3);\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(119);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(79)("ac743a12", content, true);

/***/ }),
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(123);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(79)("6437ce1a", content, true);

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(128)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(94),
  /* template */
  __webpack_require__(134),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "swipe-body"
  }, [_c('rd-swipe', {
    ref: "rdSwipe",
    attrs: {
      "swipe": _vm.swipe
    }
  }, _vm._l((_vm.images), function(img, index) {
    return _c('div', {
      staticClass: "rd-swipe-item"
    }, [_c('v-img', {
      attrs: {
        "imageUrl": img.url,
        "size": 'contain'
      }
    })], 1)
  }))], 1)
},staticRenderFns: []}

/***/ }),
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "rd-swipe"
  }, [_c('div', {
    staticClass: "rd-swipe-wrapper",
    style: (_vm.wrapperStyle)
  }, [_vm._t("default")], 2), _vm._v(" "), (_vm.options.pagination) ? _c('div', {
    staticClass: "rd-swipe-pagination"
  }, _vm._l((_vm.pagination), function(item, index) {
    return _c('div', {
      staticClass: "rd-swipe-pagination-item",
      class: {
        'active': item.active
      },
      on: {
        "click": function($event) {
          _vm.turnTo(index)
        }
      }
    })
  })) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const TOUCH_EVENT_MAP = {
    'touchstart': 1,
    'touchmove': 1,
    'touchend': 1
}

const MOUSE_EVENT_MAP = {
    'mousedown': 1,
    'mousemove': 1,
    'mouseup': 1
}

const _ = {
    on (el, type, func) {
        el.addEventListener(type, func, false)
    },
    off (el, type, func) {
        el.removeEventListener(type, func, false)
    }
}

class CovTouch {
    constructor ({ el }) {
        this._hasTouch = ('ontouchstart' in window)
        this.$el = el
        this.init()
        this.touch = {
            start: null,
            end: null
        }
        this.state = {
            swiping: false,
            global: false
        }
        this.queue = {
            'swiping': [],
            'swiped': [],
            'swipe-left': [],
            'swipe-right': [],
            'swipe-up': [],
            'swipe-down': []
        }
    }

    init () {
        if (this._hasTouch) {
            _.on(this.$el, 'touchstart', this.touchStart.bind(this))
            _.on(window, 'touchmove', this.touchMove.bind(this))
            _.on(window, 'touchend', this.touchEnd.bind(this))
            _.on(window, 'touchcancel', this.touchCancel.bind(this))
        } else {
            _.on(this.$el, 'mousedown', this.touchStart.bind(this))
            _.on(window, 'mousemove', this.touchMove.bind(this))
            _.on(window, 'mouseup', this.touchEnd.bind(this))
        }
    }

    destroy () {
        if (this.$el) {
            _.off(this.$el, 'touchstart', this.touchStart.bind(this))
            _.off(this.$el, 'mousedown', this.touchStart.bind(this))
        }

        _.off(window, 'touchmove', this.touchMove.bind(this))
        _.off(window, 'touchend', this.touchEnd.bind(this))
        _.off(window, 'touchcancel', this.touchCancel.bind(this))
        _.off(window, 'mousemove', this.touchMove.bind(this))
        _.off(window, 'mouseup', this.touchEnd.bind(this))

        this.queue = {
            'swiping': [],
            'swiped': [],
            'swipe-left': [],
            'swipe-right': [],
            'swipe-up': [],
            'swipe-down': []
        }
    }

    setGlobal () {
        this.state.global = true
    }

    cancelGlobal () {
        this.state.global = false
    }

    listen (type, $el, func) {
        let rect
        if (!$el) {
            rect = null
        } else {
            let tmp = $el.getBoundingClientRect()
            rect = {
                x: tmp.left,
                y: tmp.top,
                width: tmp.width,
                height: tmp.height
            }
        }

        let token = Math.random() * 9999 + type
        this.queue[type].push({
            $el: $el,
            token: token,
            func: func,
            rect: rect
        })
    }

    leave (type, token) {
        if (!this.queue[type]) return false
        for (let i = 0, len = this.queue[type].length; i < len; i++) {
            if (this.queue[type].token === token) {
                this.queue[type].splice(i - 1, 1)
                return true
            }
        }
        return false
    }

    update () {
        let keys = Object.keys(this.queue)
        let tmp
        for (let key of keys) {
            this.queue[key].forEach(item => {
                if (item.$el) {
                    tmp = item.$el.getBoundingClientRect()
                    item.rect = {
                        x: tmp.left,
                        y: tmp.top,
                        width: tmp.width,
                        height: tmp.height
                    }
                }
            })
        }
    }

    clear () {
        let keys = Object.keys(this.queue)
        for (let key of keys) {
            this.queue[key].length = 0
        }
    }

    notice (type, rect) {
        let rectTmp = {}
        let once = true
        let tmpFunc = null
        for (let i = 0, len = this.queue[type].length; i < len; i++) {
            rectTmp = this.queue[type][i].rect
            if (!rectTmp) {
                tmpFunc = this.queue[type][i].func
            } else {
                if (this.rectIn(rect, rectTmp) && !this.state.global) {
                    this.queue[type][i].func(this.touch.start, this.touch.end)
                    once = false
                }
            }
        }
        if (once && tmpFunc) {
            tmpFunc(this.touch.start, this.touch.end)
        }
    }

    rectIn (small, big) {
        if (small.x > big.x &&
            small.x + small.width < big.x + big.width &&
            small.y > big.y &&
            small.y + small.height < big.y + big.height
        ) {
            return true
        }
        return false
    }

    getRect (dot1, dot2) {
        let rect = {}

        if (dot1.x < dot2.x) {
            rect.x = dot1.x
            rect.width = dot2.x - dot1.x
        } else {
            rect.x = dot2.x
            rect.width = dot1.x - dot2.x
        }

        if (dot1.y < dot2.y) {
            rect.y = dot1.y
            rect.height = dot2.y - dot1.y
        } else {
            rect.y = dot2.y
            rect.height = dot1.y - dot2.y
        }
        return rect
    }

    getPosition (e) {
        if (TOUCH_EVENT_MAP[e.type]) {
            let poss = []
            const len = e.touches.length
            for (let i = 0; i < len; i++) {
                poss.push({
                    x: e.touches[i].pageX,
                    y: e.touches[i].pageY
                })
            }
            return poss
        } else if (MOUSE_EVENT_MAP[e.type]){
            return [{
                x: e.pageX,
                y: e.pageY
            }]
        }
    }

    getDistance (dot1, dot2) {
        return Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2))
    }

    getAngle (dot1, dot2) {
        return Math.atan2(dot2.y - dot1.y, dot2.x - dot1.x) * 180 / Math.PI
    }

    touchStart (e) {
        this.state.swiping = true
        this.touch.start = this.getPosition(e)[0]
    }

    touchMove (e) {
        if (!this.touch.start) return
        this.touch.end = this.getPosition(e)[0]
        this.notice('swiping', this.getRect(this.touch.end, this.touch.start))
    }

    touchEnd (e) {
        if (!this.touch.start) return
        if (e.type === 'mouseup') {
            this.touch.end = this.getPosition(e)[0]
        }
        let angle = this.getAngle(this.touch.end, this.touch.start)
        if (angle > -45 && angle < 45) {
            this.notice('swipe-left', this.getRect(this.touch.end, this.touch.start))
        }
        if (angle < -135 || angle > 135) {
            this.notice('swipe-right', this.getRect(this.touch.end, this.touch.start))
        }
        if (angle > 45 && angle < 135) {
            this.notice('swipe-up', this.getRect(this.touch.end, this.touch.start))
        }
        if (angle < -45 && angle > -135) {
            this.notice('swipe-down', this.getRect(this.touch.end, this.touch.start))
        }
        this.notice('swiped', this.getRect(this.touch.end, this.touch.start))
        this.state.swiping = false
        this.touch.start = null
    }

    touchCancel (e) {
        e.preventDefault()
        console.log(e)
    }
}

/* harmony default export */ __webpack_exports__["a"] = (CovTouch);

/***/ })
]));
//# sourceMappingURL=0.288375ad8874bd78f537.js.map