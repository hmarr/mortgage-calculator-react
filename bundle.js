"format register";

System.register("npm:process@0.10.0/browser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  function drainQueue() {
    if (draining) {
      return ;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      var i = -1;
      while (++i < len) {
        currentQueue[i]();
      }
      len = queue.length;
    }
    draining = false;
  }
  process.nextTick = function(fun) {
    queue.push(fun);
    if (!draining) {
      setTimeout(drainQueue, 0);
    }
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/escapeTextForBrowser", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ESCAPE_LOOKUP = {
    '&': '&amp;',
    '>': '&gt;',
    '<': '&lt;',
    '"': '&quot;',
    '\'': '&#x27;'
  };
  var ESCAPE_REGEX = /[&><"']/g;
  function escaper(match) {
    return ESCAPE_LOOKUP[match];
  }
  function escapeTextForBrowser(text) {
    return ('' + text).replace(ESCAPE_REGEX, escaper);
  }
  module.exports = escapeTextForBrowser;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/memoizeStringOnly", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  function memoizeStringOnly(callback) {
    var cache = {};
    return function(string) {
      if (!cache.hasOwnProperty(string)) {
        cache[string] = callback.call(this, string);
      }
      return cache[string];
    };
  }
  module.exports = memoizeStringOnly;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/emptyFunction", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function makeEmptyFunction(arg) {
    return function() {
      return arg;
    };
  }
  function emptyFunction() {}
  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function() {
    return this;
  };
  emptyFunction.thatReturnsArgument = function(arg) {
    return arg;
  };
  module.exports = emptyFunction;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/keyMirror", ["./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var invariant = require("./invariant");
    var keyMirror = function(obj) {
      var ret = {};
      var key;
      ("production" !== process.env.NODE_ENV ? invariant(obj instanceof Object && !Array.isArray(obj), 'keyMirror(...): Argument must be an object.') : invariant(obj instanceof Object && !Array.isArray(obj)));
      for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        ret[key] = key;
      }
      return ret;
    };
    module.exports = keyMirror;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/PooledClass", ["./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var invariant = require("./invariant");
    var oneArgumentPooler = function(copyFieldsFrom) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, copyFieldsFrom);
        return instance;
      } else {
        return new Klass(copyFieldsFrom);
      }
    };
    var twoArgumentPooler = function(a1, a2) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2);
        return instance;
      } else {
        return new Klass(a1, a2);
      }
    };
    var threeArgumentPooler = function(a1, a2, a3) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3);
        return instance;
      } else {
        return new Klass(a1, a2, a3);
      }
    };
    var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3, a4, a5);
        return instance;
      } else {
        return new Klass(a1, a2, a3, a4, a5);
      }
    };
    var standardReleaser = function(instance) {
      var Klass = this;
      ("production" !== process.env.NODE_ENV ? invariant(instance instanceof Klass, 'Trying to release an instance into a pool of a different type.') : invariant(instance instanceof Klass));
      if (instance.destructor) {
        instance.destructor();
      }
      if (Klass.instancePool.length < Klass.poolSize) {
        Klass.instancePool.push(instance);
      }
    };
    var DEFAULT_POOL_SIZE = 10;
    var DEFAULT_POOLER = oneArgumentPooler;
    var addPoolingTo = function(CopyConstructor, pooler) {
      var NewKlass = CopyConstructor;
      NewKlass.instancePool = [];
      NewKlass.getPooled = pooler || DEFAULT_POOLER;
      if (!NewKlass.poolSize) {
        NewKlass.poolSize = DEFAULT_POOL_SIZE;
      }
      NewKlass.release = standardReleaser;
      return NewKlass;
    };
    var PooledClass = {
      addPoolingTo: addPoolingTo,
      oneArgumentPooler: oneArgumentPooler,
      twoArgumentPooler: twoArgumentPooler,
      threeArgumentPooler: threeArgumentPooler,
      fiveArgumentPooler: fiveArgumentPooler
    };
    module.exports = PooledClass;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/Object.assign", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  function assign(target, sources) {
    if (target == null) {
      throw new TypeError('Object.assign target cannot be null or undefined');
    }
    var to = Object(target);
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
      var nextSource = arguments[nextIndex];
      if (nextSource == null) {
        continue;
      }
      var from = Object(nextSource);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
    }
    return to;
  }
  module.exports = assign;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/emptyObject", ["process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var emptyObject = {};
    if ("production" !== process.env.NODE_ENV) {
      Object.freeze(emptyObject);
    }
    module.exports = emptyObject;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/monitorCodeUse", ["./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var invariant = require("./invariant");
    function monitorCodeUse(eventName, data) {
      ("production" !== process.env.NODE_ENV ? invariant(eventName && !/[^a-z0-9_]/.test(eventName), 'You must provide an eventName using only the characters [a-z0-9_]') : invariant(eventName && !/[^a-z0-9_]/.test(eventName)));
    }
    module.exports = monitorCodeUse;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactCurrentOwner", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ReactCurrentOwner = {current: null};
  module.exports = ReactCurrentOwner;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactRootIndex", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ReactRootIndexInjection = {injectCreateReactRootIndex: function(_createReactRootIndex) {
      ReactRootIndex.createReactRootIndex = _createReactRootIndex;
    }};
  var ReactRootIndex = {
    createReactRootIndex: null,
    injection: ReactRootIndexInjection
  };
  module.exports = ReactRootIndex;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/getIteratorFn", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]));
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  module.exports = getIteratorFn;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactLifeCycle", ["process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactLifeCycle = {
      currentlyMountingInstance: null,
      currentlyUnmountingInstance: null
    };
    module.exports = ReactLifeCycle;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactInstanceMap", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ReactInstanceMap = {
    remove: function(key) {
      key._reactInternalInstance = undefined;
    },
    get: function(key) {
      return key._reactInternalInstance;
    },
    has: function(key) {
      return key._reactInternalInstance !== undefined;
    },
    set: function(key, value) {
      key._reactInternalInstance = value;
    }
  };
  module.exports = ReactInstanceMap;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/CallbackQueue", ["./PooledClass", "./Object.assign", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var PooledClass = require("./PooledClass");
    var assign = require("./Object.assign");
    var invariant = require("./invariant");
    function CallbackQueue() {
      this._callbacks = null;
      this._contexts = null;
    }
    assign(CallbackQueue.prototype, {
      enqueue: function(callback, context) {
        this._callbacks = this._callbacks || [];
        this._contexts = this._contexts || [];
        this._callbacks.push(callback);
        this._contexts.push(context);
      },
      notifyAll: function() {
        var callbacks = this._callbacks;
        var contexts = this._contexts;
        if (callbacks) {
          ("production" !== process.env.NODE_ENV ? invariant(callbacks.length === contexts.length, 'Mismatched list of contexts in callback queue') : invariant(callbacks.length === contexts.length));
          this._callbacks = null;
          this._contexts = null;
          for (var i = 0,
              l = callbacks.length; i < l; i++) {
            callbacks[i].call(contexts[i]);
          }
          callbacks.length = 0;
          contexts.length = 0;
        }
      },
      reset: function() {
        this._callbacks = null;
        this._contexts = null;
      },
      destructor: function() {
        this.reset();
      }
    });
    PooledClass.addPoolingTo(CallbackQueue);
    module.exports = CallbackQueue;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactPerf", ["process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactPerf = {
      enableMeasure: false,
      storedMeasure: _noMeasure,
      measureMethods: function(object, objectName, methodNames) {
        if ("production" !== process.env.NODE_ENV) {
          for (var key in methodNames) {
            if (!methodNames.hasOwnProperty(key)) {
              continue;
            }
            object[key] = ReactPerf.measure(objectName, methodNames[key], object[key]);
          }
        }
      },
      measure: function(objName, fnName, func) {
        if ("production" !== process.env.NODE_ENV) {
          var measuredFunc = null;
          var wrapper = function() {
            if (ReactPerf.enableMeasure) {
              if (!measuredFunc) {
                measuredFunc = ReactPerf.storedMeasure(objName, fnName, func);
              }
              return measuredFunc.apply(this, arguments);
            }
            return func.apply(this, arguments);
          };
          wrapper.displayName = objName + '_' + fnName;
          return wrapper;
        }
        return func;
      },
      injection: {injectMeasure: function(measure) {
          ReactPerf.storedMeasure = measure;
        }}
    };
    function _noMeasure(objName, fnName, func) {
      return func;
    }
    module.exports = ReactPerf;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/Transaction", ["./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var invariant = require("./invariant");
    var Mixin = {
      reinitializeTransaction: function() {
        this.transactionWrappers = this.getTransactionWrappers();
        if (!this.wrapperInitData) {
          this.wrapperInitData = [];
        } else {
          this.wrapperInitData.length = 0;
        }
        this._isInTransaction = false;
      },
      _isInTransaction: false,
      getTransactionWrappers: null,
      isInTransaction: function() {
        return !!this._isInTransaction;
      },
      perform: function(method, scope, a, b, c, d, e, f) {
        ("production" !== process.env.NODE_ENV ? invariant(!this.isInTransaction(), 'Transaction.perform(...): Cannot initialize a transaction when there ' + 'is already an outstanding transaction.') : invariant(!this.isInTransaction()));
        var errorThrown;
        var ret;
        try {
          this._isInTransaction = true;
          errorThrown = true;
          this.initializeAll(0);
          ret = method.call(scope, a, b, c, d, e, f);
          errorThrown = false;
        } finally {
          try {
            if (errorThrown) {
              try {
                this.closeAll(0);
              } catch (err) {}
            } else {
              this.closeAll(0);
            }
          } finally {
            this._isInTransaction = false;
          }
        }
        return ret;
      },
      initializeAll: function(startIndex) {
        var transactionWrappers = this.transactionWrappers;
        for (var i = startIndex; i < transactionWrappers.length; i++) {
          var wrapper = transactionWrappers[i];
          try {
            this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
            this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
          } finally {
            if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
              try {
                this.initializeAll(i + 1);
              } catch (err) {}
            }
          }
        }
      },
      closeAll: function(startIndex) {
        ("production" !== process.env.NODE_ENV ? invariant(this.isInTransaction(), 'Transaction.closeAll(): Cannot close transaction when none are open.') : invariant(this.isInTransaction()));
        var transactionWrappers = this.transactionWrappers;
        for (var i = startIndex; i < transactionWrappers.length; i++) {
          var wrapper = transactionWrappers[i];
          var initData = this.wrapperInitData[i];
          var errorThrown;
          try {
            errorThrown = true;
            if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
              wrapper.close.call(this, initData);
            }
            errorThrown = false;
          } finally {
            if (errorThrown) {
              try {
                this.closeAll(i + 1);
              } catch (e) {}
            }
          }
        }
        this.wrapperInitData.length = 0;
      }
    };
    var Transaction = {
      Mixin: Mixin,
      OBSERVED_ERROR: {}
    };
    module.exports = Transaction;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactErrorUtils", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ReactErrorUtils = {guard: function(func, name) {
      return func;
    }};
  module.exports = ReactErrorUtils;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactPropTypeLocations", ["./keyMirror"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var keyMirror = require("./keyMirror");
  var ReactPropTypeLocations = keyMirror({
    prop: null,
    context: null,
    childContext: null
  });
  module.exports = ReactPropTypeLocations;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactPropTypeLocationNames", ["process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactPropTypeLocationNames = {};
    if ("production" !== process.env.NODE_ENV) {
      ReactPropTypeLocationNames = {
        prop: 'prop',
        context: 'context',
        childContext: 'child context'
      };
    }
    module.exports = ReactPropTypeLocationNames;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/keyOf", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var keyOf = function(oneKeyObj) {
    var key;
    for (key in oneKeyObj) {
      if (!oneKeyObj.hasOwnProperty(key)) {
        continue;
      }
      return key;
    }
    return null;
  };
  module.exports = keyOf;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactNativeComponent", ["./ReactClass", "./ReactElement", "./Object.assign", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactClass = require("./ReactClass");
    var ReactElement = require("./ReactElement");
    var assign = require("./Object.assign");
    var invariant = require("./invariant");
    var genericComponentClass = null;
    var tagToComponentClass = {};
    var textComponentClass = null;
    var ReactNativeComponentInjection = {
      injectGenericComponentClass: function(componentClass) {
        genericComponentClass = componentClass;
      },
      injectTextComponentClass: function(componentClass) {
        textComponentClass = componentClass;
      },
      injectComponentClasses: function(componentClasses) {
        assign(tagToComponentClass, componentClasses);
      }
    };
    function autoGenerateWrapperClass(type) {
      return ReactClass.createClass({
        tagName: type.toUpperCase(),
        render: function() {
          return new ReactElement(type, null, null, null, null, this.props);
        }
      });
    }
    function getComponentClassForElement(element) {
      if (typeof element.type === 'function') {
        return element.type;
      }
      var tag = element.type;
      var componentClass = tagToComponentClass[tag];
      if (componentClass == null) {
        tagToComponentClass[tag] = componentClass = autoGenerateWrapperClass(tag);
      }
      return componentClass;
    }
    function createInternalComponent(element) {
      ("production" !== process.env.NODE_ENV ? invariant(genericComponentClass, 'There is no registered component for the tag %s', element.type) : invariant(genericComponentClass));
      return new genericComponentClass(element.type, element.props);
    }
    function createInstanceForText(text) {
      return new textComponentClass(text);
    }
    function isTextComponent(component) {
      return component instanceof textComponentClass;
    }
    var ReactNativeComponent = {
      getComponentClassForElement: getComponentClassForElement,
      createInternalComponent: createInternalComponent,
      createInstanceForText: createInstanceForText,
      isTextComponent: isTextComponent,
      injection: ReactNativeComponentInjection
    };
    module.exports = ReactNativeComponent;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/mapObject", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function mapObject(object, callback, context) {
    if (!object) {
      return null;
    }
    var result = {};
    for (var name in object) {
      if (hasOwnProperty.call(object, name)) {
        result[name] = callback.call(context, object[name], name, object);
      }
    }
    return result;
  }
  module.exports = mapObject;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/CSSProperty", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var isUnitlessNumber = {
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    strokeOpacity: true
  };
  function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  }
  var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
  Object.keys(isUnitlessNumber).forEach(function(prop) {
    prefixes.forEach(function(prefix) {
      isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
    });
  });
  var shorthandPropertyExpansions = {
    background: {
      backgroundImage: true,
      backgroundPosition: true,
      backgroundRepeat: true,
      backgroundColor: true
    },
    border: {
      borderWidth: true,
      borderStyle: true,
      borderColor: true
    },
    borderBottom: {
      borderBottomWidth: true,
      borderBottomStyle: true,
      borderBottomColor: true
    },
    borderLeft: {
      borderLeftWidth: true,
      borderLeftStyle: true,
      borderLeftColor: true
    },
    borderRight: {
      borderRightWidth: true,
      borderRightStyle: true,
      borderRightColor: true
    },
    borderTop: {
      borderTopWidth: true,
      borderTopStyle: true,
      borderTopColor: true
    },
    font: {
      fontStyle: true,
      fontVariant: true,
      fontWeight: true,
      fontSize: true,
      lineHeight: true,
      fontFamily: true
    }
  };
  var CSSProperty = {
    isUnitlessNumber: isUnitlessNumber,
    shorthandPropertyExpansions: shorthandPropertyExpansions
  };
  module.exports = CSSProperty;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ExecutionEnvironment", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var canUseDOM = !!((typeof window !== 'undefined' && window.document && window.document.createElement));
  var ExecutionEnvironment = {
    canUseDOM: canUseDOM,
    canUseWorkers: typeof Worker !== 'undefined',
    canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
    canUseViewport: canUseDOM && !!window.screen,
    isInWorker: !canUseDOM
  };
  module.exports = ExecutionEnvironment;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/camelize", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var _hyphenPattern = /-(.)/g;
  function camelize(string) {
    return string.replace(_hyphenPattern, function(_, character) {
      return character.toUpperCase();
    });
  }
  module.exports = camelize;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/dangerousStyleValue", ["./CSSProperty"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var CSSProperty = require("./CSSProperty");
  var isUnitlessNumber = CSSProperty.isUnitlessNumber;
  function dangerousStyleValue(name, value) {
    var isEmpty = value == null || typeof value === 'boolean' || value === '';
    if (isEmpty) {
      return '';
    }
    var isNonNumeric = isNaN(value);
    if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
      return '' + value;
    }
    if (typeof value === 'string') {
      value = value.trim();
    }
    return value + 'px';
  }
  module.exports = dangerousStyleValue;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/hyphenate", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var _uppercasePattern = /([A-Z])/g;
  function hyphenate(string) {
    return string.replace(_uppercasePattern, '-$1').toLowerCase();
  }
  module.exports = hyphenate;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/EventPluginRegistry", ["./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var invariant = require("./invariant");
    var EventPluginOrder = null;
    var namesToPlugins = {};
    function recomputePluginOrdering() {
      if (!EventPluginOrder) {
        return ;
      }
      for (var pluginName in namesToPlugins) {
        var PluginModule = namesToPlugins[pluginName];
        var pluginIndex = EventPluginOrder.indexOf(pluginName);
        ("production" !== process.env.NODE_ENV ? invariant(pluginIndex > -1, 'EventPluginRegistry: Cannot inject event plugins that do not exist in ' + 'the plugin ordering, `%s`.', pluginName) : invariant(pluginIndex > -1));
        if (EventPluginRegistry.plugins[pluginIndex]) {
          continue;
        }
        ("production" !== process.env.NODE_ENV ? invariant(PluginModule.extractEvents, 'EventPluginRegistry: Event plugins must implement an `extractEvents` ' + 'method, but `%s` does not.', pluginName) : invariant(PluginModule.extractEvents));
        EventPluginRegistry.plugins[pluginIndex] = PluginModule;
        var publishedEvents = PluginModule.eventTypes;
        for (var eventName in publishedEvents) {
          ("production" !== process.env.NODE_ENV ? invariant(publishEventForPlugin(publishedEvents[eventName], PluginModule, eventName), 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : invariant(publishEventForPlugin(publishedEvents[eventName], PluginModule, eventName)));
        }
      }
    }
    function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
      ("production" !== process.env.NODE_ENV ? invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName), 'EventPluginHub: More than one plugin attempted to publish the same ' + 'event name, `%s`.', eventName) : invariant(!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName)));
      EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;
      var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
      if (phasedRegistrationNames) {
        for (var phaseName in phasedRegistrationNames) {
          if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
            var phasedRegistrationName = phasedRegistrationNames[phaseName];
            publishRegistrationName(phasedRegistrationName, PluginModule, eventName);
          }
        }
        return true;
      } else if (dispatchConfig.registrationName) {
        publishRegistrationName(dispatchConfig.registrationName, PluginModule, eventName);
        return true;
      }
      return false;
    }
    function publishRegistrationName(registrationName, PluginModule, eventName) {
      ("production" !== process.env.NODE_ENV ? invariant(!EventPluginRegistry.registrationNameModules[registrationName], 'EventPluginHub: More than one plugin attempted to publish the same ' + 'registration name, `%s`.', registrationName) : invariant(!EventPluginRegistry.registrationNameModules[registrationName]));
      EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
      EventPluginRegistry.registrationNameDependencies[registrationName] = PluginModule.eventTypes[eventName].dependencies;
    }
    var EventPluginRegistry = {
      plugins: [],
      eventNameDispatchConfigs: {},
      registrationNameModules: {},
      registrationNameDependencies: {},
      injectEventPluginOrder: function(InjectedEventPluginOrder) {
        ("production" !== process.env.NODE_ENV ? invariant(!EventPluginOrder, 'EventPluginRegistry: Cannot inject event plugin ordering more than ' + 'once. You are likely trying to load more than one copy of React.') : invariant(!EventPluginOrder));
        EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
        recomputePluginOrdering();
      },
      injectEventPluginsByName: function(injectedNamesToPlugins) {
        var isOrderingDirty = false;
        for (var pluginName in injectedNamesToPlugins) {
          if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
            continue;
          }
          var PluginModule = injectedNamesToPlugins[pluginName];
          if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== PluginModule) {
            ("production" !== process.env.NODE_ENV ? invariant(!namesToPlugins[pluginName], 'EventPluginRegistry: Cannot inject two different event plugins ' + 'using the same name, `%s`.', pluginName) : invariant(!namesToPlugins[pluginName]));
            namesToPlugins[pluginName] = PluginModule;
            isOrderingDirty = true;
          }
        }
        if (isOrderingDirty) {
          recomputePluginOrdering();
        }
      },
      getPluginModuleForEvent: function(event) {
        var dispatchConfig = event.dispatchConfig;
        if (dispatchConfig.registrationName) {
          return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
        }
        for (var phase in dispatchConfig.phasedRegistrationNames) {
          if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
            continue;
          }
          var PluginModule = EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
          if (PluginModule) {
            return PluginModule;
          }
        }
        return null;
      },
      _resetEventPlugins: function() {
        EventPluginOrder = null;
        for (var pluginName in namesToPlugins) {
          if (namesToPlugins.hasOwnProperty(pluginName)) {
            delete namesToPlugins[pluginName];
          }
        }
        EventPluginRegistry.plugins.length = 0;
        var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
        for (var eventName in eventNameDispatchConfigs) {
          if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
            delete eventNameDispatchConfigs[eventName];
          }
        }
        var registrationNameModules = EventPluginRegistry.registrationNameModules;
        for (var registrationName in registrationNameModules) {
          if (registrationNameModules.hasOwnProperty(registrationName)) {
            delete registrationNameModules[registrationName];
          }
        }
      }
    };
    module.exports = EventPluginRegistry;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/accumulateInto", ["./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var invariant = require("./invariant");
    function accumulateInto(current, next) {
      ("production" !== process.env.NODE_ENV ? invariant(next != null, 'accumulateInto(...): Accumulated items must not be null or undefined.') : invariant(next != null));
      if (current == null) {
        return next;
      }
      var currentIsArray = Array.isArray(current);
      var nextIsArray = Array.isArray(next);
      if (currentIsArray && nextIsArray) {
        current.push.apply(current, next);
        return current;
      }
      if (currentIsArray) {
        current.push(next);
        return current;
      }
      if (nextIsArray) {
        return [current].concat(next);
      }
      return [current, next];
    }
    module.exports = accumulateInto;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/forEachAccumulated", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var forEachAccumulated = function(arr, cb, scope) {
    if (Array.isArray(arr)) {
      arr.forEach(cb, scope);
    } else if (arr) {
      cb.call(scope, arr);
    }
  };
  module.exports = forEachAccumulated;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactEventEmitterMixin", ["./EventPluginHub"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var EventPluginHub = require("./EventPluginHub");
  function runEventQueueInBatch(events) {
    EventPluginHub.enqueueEvents(events);
    EventPluginHub.processEventQueue();
  }
  var ReactEventEmitterMixin = {handleTopLevel: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      var events = EventPluginHub.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent);
      runEventQueueInBatch(events);
    }};
  module.exports = ReactEventEmitterMixin;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ViewportMetrics", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ViewportMetrics = {
    currentScrollLeft: 0,
    currentScrollTop: 0,
    refreshScrollValues: function(scrollPosition) {
      ViewportMetrics.currentScrollLeft = scrollPosition.x;
      ViewportMetrics.currentScrollTop = scrollPosition.y;
    }
  };
  module.exports = ViewportMetrics;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/isEventSupported", ["./ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ExecutionEnvironment = require("./ExecutionEnvironment");
  var useHasFeature;
  if (ExecutionEnvironment.canUseDOM) {
    useHasFeature = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('', '') !== true;
  }
  function isEventSupported(eventNameSuffix, capture) {
    if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
      return false;
    }
    var eventName = 'on' + eventNameSuffix;
    var isSupported = eventName in document;
    if (!isSupported) {
      var element = document.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }
    if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
      isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
    }
    return isSupported;
  }
  module.exports = isEventSupported;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactEmptyComponent", ["./ReactElement", "./ReactInstanceMap", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactElement = require("./ReactElement");
    var ReactInstanceMap = require("./ReactInstanceMap");
    var invariant = require("./invariant");
    var component;
    var nullComponentIdsRegistry = {};
    var ReactEmptyComponentInjection = {injectEmptyComponent: function(emptyComponent) {
        component = ReactElement.createFactory(emptyComponent);
      }};
    var ReactEmptyComponentType = function() {};
    ReactEmptyComponentType.prototype.componentDidMount = function() {
      var internalInstance = ReactInstanceMap.get(this);
      if (!internalInstance) {
        return ;
      }
      registerNullComponentID(internalInstance._rootNodeID);
    };
    ReactEmptyComponentType.prototype.componentWillUnmount = function() {
      var internalInstance = ReactInstanceMap.get(this);
      if (!internalInstance) {
        return ;
      }
      deregisterNullComponentID(internalInstance._rootNodeID);
    };
    ReactEmptyComponentType.prototype.render = function() {
      ("production" !== process.env.NODE_ENV ? invariant(component, 'Trying to return null from a render, but no null placeholder component ' + 'was injected.') : invariant(component));
      return component();
    };
    var emptyElement = ReactElement.createElement(ReactEmptyComponentType);
    function registerNullComponentID(id) {
      nullComponentIdsRegistry[id] = true;
    }
    function deregisterNullComponentID(id) {
      delete nullComponentIdsRegistry[id];
    }
    function isNullComponentID(id) {
      return !!nullComponentIdsRegistry[id];
    }
    var ReactEmptyComponent = {
      emptyElement: emptyElement,
      injection: ReactEmptyComponentInjection,
      isNullComponentID: isNullComponentID
    };
    module.exports = ReactEmptyComponent;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/adler32", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var MOD = 65521;
  function adler32(data) {
    var a = 1;
    var b = 0;
    for (var i = 0; i < data.length; i++) {
      a = (a + data.charCodeAt(i)) % MOD;
      b = (b + a) % MOD;
    }
    return a | (b << 16);
  }
  module.exports = adler32;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactOwner", ["./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var invariant = require("./invariant");
    var ReactOwner = {
      isValidOwner: function(object) {
        return !!((object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function'));
      },
      addComponentAsRefTo: function(component, ref, owner) {
        ("production" !== process.env.NODE_ENV ? invariant(ReactOwner.isValidOwner(owner), 'addComponentAsRefTo(...): Only a ReactOwner can have refs. This ' + 'usually means that you\'re trying to add a ref to a component that ' + 'doesn\'t have an owner (that is, was not created inside of another ' + 'component\'s `render` method). Try rendering this component inside of ' + 'a new top-level component which will hold the ref.') : invariant(ReactOwner.isValidOwner(owner)));
        owner.attachRef(ref, component);
      },
      removeComponentAsRefFrom: function(component, ref, owner) {
        ("production" !== process.env.NODE_ENV ? invariant(ReactOwner.isValidOwner(owner), 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. This ' + 'usually means that you\'re trying to remove a ref to a component that ' + 'doesn\'t have an owner (that is, was not created inside of another ' + 'component\'s `render` method). Try rendering this component inside of ' + 'a new top-level component which will hold the ref.') : invariant(ReactOwner.isValidOwner(owner)));
        if (owner.getPublicInstance().refs[ref] === component.getPublicInstance()) {
          owner.detachRef(ref);
        }
      }
    };
    module.exports = ReactOwner;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/isNode", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function isNode(object) {
    return !!(object && (((typeof Node === 'function' ? object instanceof Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'))));
  }
  module.exports = isNode;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/getReactRootElementInContainer", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var DOC_NODE_TYPE = 9;
  function getReactRootElementInContainer(container) {
    if (!container) {
      return null;
    }
    if (container.nodeType === DOC_NODE_TYPE) {
      return container.documentElement;
    } else {
      return container.firstChild;
    }
  }
  module.exports = getReactRootElementInContainer;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactComponentEnvironment", ["./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var invariant = require("./invariant");
    var injected = false;
    var ReactComponentEnvironment = {
      unmountIDFromEnvironment: null,
      replaceNodeWithMarkupByID: null,
      processChildrenUpdates: null,
      injection: {injectEnvironment: function(environment) {
          ("production" !== process.env.NODE_ENV ? invariant(!injected, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : invariant(!injected));
          ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
          ReactComponentEnvironment.replaceNodeWithMarkupByID = environment.replaceNodeWithMarkupByID;
          ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
          injected = true;
        }}
    };
    module.exports = ReactComponentEnvironment;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/shouldUpdateReactComponent", ["./monitorCodeUse", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var monitorCodeUse = require("./monitorCodeUse");
    function shouldUpdateReactComponent(prevElement, nextElement) {
      if (prevElement != null && nextElement != null) {
        var prevType = typeof prevElement;
        var nextType = typeof nextElement;
        if (prevType === 'string' || prevType === 'number') {
          return (nextType === 'string' || nextType === 'number');
        } else {
          if (nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key) {
            var ownersMatch = prevElement._owner === nextElement._owner;
            var prevName = null;
            var nextName = null;
            var nextDisplayName = null;
            if ("production" !== process.env.NODE_ENV) {
              if (!ownersMatch) {
                if (prevElement._owner != null && prevElement._owner.getPublicInstance() != null && prevElement._owner.getPublicInstance().constructor != null) {
                  prevName = prevElement._owner.getPublicInstance().constructor.displayName;
                }
                if (nextElement._owner != null && nextElement._owner.getPublicInstance() != null && nextElement._owner.getPublicInstance().constructor != null) {
                  nextName = nextElement._owner.getPublicInstance().constructor.displayName;
                }
                if (nextElement.type != null && nextElement.type.displayName != null) {
                  nextDisplayName = nextElement.type.displayName;
                }
                monitorCodeUse('react_should_update_owner_is_useful', {
                  key: prevElement.key,
                  prevOwner: prevName,
                  nextOwner: nextName,
                  nextDisplayName: nextDisplayName
                });
              }
            }
            return ownersMatch;
          }
        }
      }
      return false;
    }
    module.exports = shouldUpdateReactComponent;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/setInnerHTML", ["./ExecutionEnvironment", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ExecutionEnvironment = require("./ExecutionEnvironment");
    var WHITESPACE_TEST = /^[ \r\n\t\f]/;
    var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;
    var setInnerHTML = function(node, html) {
      node.innerHTML = html;
    };
    if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
      setInnerHTML = function(node, html) {
        MSApp.execUnsafeLocalFunction(function() {
          node.innerHTML = html;
        });
      };
    }
    if (ExecutionEnvironment.canUseDOM) {
      var testElement = document.createElement('div');
      testElement.innerHTML = ' ';
      if (testElement.innerHTML === '') {
        setInnerHTML = function(node, html) {
          if (node.parentNode) {
            node.parentNode.replaceChild(node, node);
          }
          if (WHITESPACE_TEST.test(html) || html[0] === '<' && NONVISIBLE_TEST.test(html)) {
            node.innerHTML = '\uFEFF' + html;
            var textNode = node.firstChild;
            if (textNode.data.length === 1) {
              node.removeChild(textNode);
            } else {
              textNode.deleteData(0, 1);
            }
          } else {
            node.innerHTML = html;
          }
        };
      }
    }
    module.exports = setInnerHTML;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactMultiChildUpdateTypes", ["./keyMirror"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var keyMirror = require("./keyMirror");
  var ReactMultiChildUpdateTypes = keyMirror({
    INSERT_MARKUP: null,
    MOVE_EXISTING: null,
    REMOVE_NODE: null,
    TEXT_CONTENT: null
  });
  module.exports = ReactMultiChildUpdateTypes;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/flattenChildren", ["./traverseAllChildren", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var traverseAllChildren = require("./traverseAllChildren");
    var warning = require("./warning");
    function flattenSingleChildIntoContext(traverseContext, child, name) {
      var result = traverseContext;
      var keyUnique = !result.hasOwnProperty(name);
      if ("production" !== process.env.NODE_ENV) {
        ("production" !== process.env.NODE_ENV ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : null);
      }
      if (keyUnique && child != null) {
        result[name] = child;
      }
    }
    function flattenChildren(children) {
      if (children == null) {
        return children;
      }
      var result = {};
      traverseAllChildren(children, flattenSingleChildIntoContext, result);
      return result;
    }
    module.exports = flattenChildren;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/toArray", ["./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var invariant = require("./invariant");
    function toArray(obj) {
      var length = obj.length;
      ("production" !== process.env.NODE_ENV ? invariant(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function'), 'toArray: Array-like object expected') : invariant(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')));
      ("production" !== process.env.NODE_ENV ? invariant(typeof length === 'number', 'toArray: Object needs a length property') : invariant(typeof length === 'number'));
      ("production" !== process.env.NODE_ENV ? invariant(length === 0 || (length - 1) in obj, 'toArray: Object should have keys for indices') : invariant(length === 0 || (length - 1) in obj));
      if (obj.hasOwnProperty) {
        try {
          return Array.prototype.slice.call(obj);
        } catch (e) {}
      }
      var ret = Array(length);
      for (var ii = 0; ii < length; ii++) {
        ret[ii] = obj[ii];
      }
      return ret;
    }
    module.exports = toArray;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/getMarkupWrap", ["./ExecutionEnvironment", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var ExecutionEnvironment = require("./ExecutionEnvironment");
    var invariant = require("./invariant");
    var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
    var shouldWrap = {
      'circle': true,
      'defs': true,
      'ellipse': true,
      'g': true,
      'line': true,
      'linearGradient': true,
      'path': true,
      'polygon': true,
      'polyline': true,
      'radialGradient': true,
      'rect': true,
      'stop': true,
      'text': true
    };
    var selectWrap = [1, '<select multiple="true">', '</select>'];
    var tableWrap = [1, '<table>', '</table>'];
    var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
    var svgWrap = [1, '<svg>', '</svg>'];
    var markupWrap = {
      '*': [1, '?<div>', '</div>'],
      'area': [1, '<map>', '</map>'],
      'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
      'legend': [1, '<fieldset>', '</fieldset>'],
      'param': [1, '<object>', '</object>'],
      'tr': [2, '<table><tbody>', '</tbody></table>'],
      'optgroup': selectWrap,
      'option': selectWrap,
      'caption': tableWrap,
      'colgroup': tableWrap,
      'tbody': tableWrap,
      'tfoot': tableWrap,
      'thead': tableWrap,
      'td': trWrap,
      'th': trWrap,
      'circle': svgWrap,
      'defs': svgWrap,
      'ellipse': svgWrap,
      'g': svgWrap,
      'line': svgWrap,
      'linearGradient': svgWrap,
      'path': svgWrap,
      'polygon': svgWrap,
      'polyline': svgWrap,
      'radialGradient': svgWrap,
      'rect': svgWrap,
      'stop': svgWrap,
      'text': svgWrap
    };
    function getMarkupWrap(nodeName) {
      ("production" !== process.env.NODE_ENV ? invariant(!!dummyNode, 'Markup wrapping node not initialized') : invariant(!!dummyNode));
      if (!markupWrap.hasOwnProperty(nodeName)) {
        nodeName = '*';
      }
      if (!shouldWrap.hasOwnProperty(nodeName)) {
        if (nodeName === '*') {
          dummyNode.innerHTML = '<link />';
        } else {
          dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
        }
        shouldWrap[nodeName] = !dummyNode.firstChild;
      }
      return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
    }
    module.exports = getMarkupWrap;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/getTextContentAccessor", ["./ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ExecutionEnvironment = require("./ExecutionEnvironment");
  var contentKey = null;
  function getTextContentAccessor() {
    if (!contentKey && ExecutionEnvironment.canUseDOM) {
      contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
    }
    return contentKey;
  }
  module.exports = getTextContentAccessor;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/EventPropagators", ["./EventConstants", "./EventPluginHub", "./accumulateInto", "./forEachAccumulated", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var EventConstants = require("./EventConstants");
    var EventPluginHub = require("./EventPluginHub");
    var accumulateInto = require("./accumulateInto");
    var forEachAccumulated = require("./forEachAccumulated");
    var PropagationPhases = EventConstants.PropagationPhases;
    var getListener = EventPluginHub.getListener;
    function listenerAtPhase(id, event, propagationPhase) {
      var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
      return getListener(id, registrationName);
    }
    function accumulateDirectionalDispatches(domID, upwards, event) {
      if ("production" !== process.env.NODE_ENV) {
        if (!domID) {
          throw new Error('Dispatching id must not be null');
        }
      }
      var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
      var listener = listenerAtPhase(domID, event, phase);
      if (listener) {
        event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
        event._dispatchIDs = accumulateInto(event._dispatchIDs, domID);
      }
    }
    function accumulateTwoPhaseDispatchesSingle(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        EventPluginHub.injection.getInstanceHandle().traverseTwoPhase(event.dispatchMarker, accumulateDirectionalDispatches, event);
      }
    }
    function accumulateDispatches(id, ignoredDirection, event) {
      if (event && event.dispatchConfig.registrationName) {
        var registrationName = event.dispatchConfig.registrationName;
        var listener = getListener(id, registrationName);
        if (listener) {
          event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
          event._dispatchIDs = accumulateInto(event._dispatchIDs, id);
        }
      }
    }
    function accumulateDirectDispatchesSingle(event) {
      if (event && event.dispatchConfig.registrationName) {
        accumulateDispatches(event.dispatchMarker, null, event);
      }
    }
    function accumulateTwoPhaseDispatches(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
    }
    function accumulateEnterLeaveDispatches(leave, enter, fromID, toID) {
      EventPluginHub.injection.getInstanceHandle().traverseEnterLeave(fromID, toID, accumulateDispatches, leave, enter);
    }
    function accumulateDirectDispatches(events) {
      forEachAccumulated(events, accumulateDirectDispatchesSingle);
    }
    var EventPropagators = {
      accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
      accumulateDirectDispatches: accumulateDirectDispatches,
      accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
    };
    module.exports = EventPropagators;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/FallbackCompositionState", ["./PooledClass", "./Object.assign", "./getTextContentAccessor"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var PooledClass = require("./PooledClass");
  var assign = require("./Object.assign");
  var getTextContentAccessor = require("./getTextContentAccessor");
  function FallbackCompositionState(root) {
    this._root = root;
    this._startText = this.getText();
    this._fallbackText = null;
  }
  assign(FallbackCompositionState.prototype, {
    getText: function() {
      if ('value' in this._root) {
        return this._root.value;
      }
      return this._root[getTextContentAccessor()];
    },
    getData: function() {
      if (this._fallbackText) {
        return this._fallbackText;
      }
      var start;
      var startValue = this._startText;
      var startLength = startValue.length;
      var end;
      var endValue = this.getText();
      var endLength = endValue.length;
      for (start = 0; start < startLength; start++) {
        if (startValue[start] !== endValue[start]) {
          break;
        }
      }
      var minEnd = startLength - start;
      for (end = 1; end <= minEnd; end++) {
        if (startValue[startLength - end] !== endValue[endLength - end]) {
          break;
        }
      }
      var sliceTail = end > 1 ? 1 - end : undefined;
      this._fallbackText = endValue.slice(start, sliceTail);
      return this._fallbackText;
    }
  });
  PooledClass.addPoolingTo(FallbackCompositionState);
  module.exports = FallbackCompositionState;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/getEventTarget", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  function getEventTarget(nativeEvent) {
    var target = nativeEvent.target || nativeEvent.srcElement || window;
    return target.nodeType === 3 ? target.parentNode : target;
  }
  module.exports = getEventTarget;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SyntheticInputEvent", ["./SyntheticEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var SyntheticEvent = require("./SyntheticEvent");
  var InputEventInterface = {data: null};
  function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticEvent.augmentClass(SyntheticInputEvent, InputEventInterface);
  module.exports = SyntheticInputEvent;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/isTextInputElement", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var supportedInputTypes = {
    'color': true,
    'date': true,
    'datetime': true,
    'datetime-local': true,
    'email': true,
    'month': true,
    'number': true,
    'password': true,
    'range': true,
    'search': true,
    'tel': true,
    'text': true,
    'time': true,
    'url': true,
    'week': true
  };
  function isTextInputElement(elem) {
    return elem && ((elem.nodeName === 'INPUT' && supportedInputTypes[elem.type] || elem.nodeName === 'TEXTAREA'));
  }
  module.exports = isTextInputElement;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ClientReactRootIndex", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var nextReactRootIndex = 0;
  var ClientReactRootIndex = {createReactRootIndex: function() {
      return nextReactRootIndex++;
    }};
  module.exports = ClientReactRootIndex;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/DefaultEventPluginOrder", ["./keyOf"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var keyOf = require("./keyOf");
  var DefaultEventPluginOrder = [keyOf({ResponderEventPlugin: null}), keyOf({SimpleEventPlugin: null}), keyOf({TapEventPlugin: null}), keyOf({EnterLeaveEventPlugin: null}), keyOf({ChangeEventPlugin: null}), keyOf({SelectEventPlugin: null}), keyOf({BeforeInputEventPlugin: null}), keyOf({AnalyticsEventPlugin: null}), keyOf({MobileSafariClickEventPlugin: null})];
  module.exports = DefaultEventPluginOrder;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SyntheticUIEvent", ["./SyntheticEvent", "./getEventTarget"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var SyntheticEvent = require("./SyntheticEvent");
  var getEventTarget = require("./getEventTarget");
  var UIEventInterface = {
    view: function(event) {
      if (event.view) {
        return event.view;
      }
      var target = getEventTarget(event);
      if (target != null && target.window === target) {
        return target;
      }
      var doc = target.ownerDocument;
      if (doc) {
        return doc.defaultView || doc.parentWindow;
      } else {
        return window;
      }
    },
    detail: function(event) {
      return event.detail || 0;
    }
  };
  function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);
  module.exports = SyntheticUIEvent;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/getEventModifierState", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var modifierKeyToProp = {
    'Alt': 'altKey',
    'Control': 'ctrlKey',
    'Meta': 'metaKey',
    'Shift': 'shiftKey'
  };
  function modifierStateGetter(keyArg) {
    var syntheticEvent = this;
    var nativeEvent = syntheticEvent.nativeEvent;
    if (nativeEvent.getModifierState) {
      return nativeEvent.getModifierState(keyArg);
    }
    var keyProp = modifierKeyToProp[keyArg];
    return keyProp ? !!nativeEvent[keyProp] : false;
  }
  function getEventModifierState(nativeEvent) {
    return modifierStateGetter;
  }
  module.exports = getEventModifierState;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/HTMLDOMPropertyConfig", ["./DOMProperty", "./ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var DOMProperty = require("./DOMProperty");
  var ExecutionEnvironment = require("./ExecutionEnvironment");
  var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
  var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
  var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
  var HAS_SIDE_EFFECTS = DOMProperty.injection.HAS_SIDE_EFFECTS;
  var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
  var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
  var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
  var hasSVG;
  if (ExecutionEnvironment.canUseDOM) {
    var implementation = document.implementation;
    hasSVG = (implementation && implementation.hasFeature && implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1'));
  }
  var HTMLDOMPropertyConfig = {
    isCustomAttribute: RegExp.prototype.test.bind(/^(data|aria)-[a-z_][a-z\d_.\-]*$/),
    Properties: {
      accept: null,
      acceptCharset: null,
      accessKey: null,
      action: null,
      allowFullScreen: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      allowTransparency: MUST_USE_ATTRIBUTE,
      alt: null,
      async: HAS_BOOLEAN_VALUE,
      autoComplete: null,
      autoPlay: HAS_BOOLEAN_VALUE,
      cellPadding: null,
      cellSpacing: null,
      charSet: MUST_USE_ATTRIBUTE,
      checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      classID: MUST_USE_ATTRIBUTE,
      className: hasSVG ? MUST_USE_ATTRIBUTE : MUST_USE_PROPERTY,
      cols: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      colSpan: null,
      content: null,
      contentEditable: null,
      contextMenu: MUST_USE_ATTRIBUTE,
      controls: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      coords: null,
      crossOrigin: null,
      data: null,
      dateTime: MUST_USE_ATTRIBUTE,
      defer: HAS_BOOLEAN_VALUE,
      dir: null,
      disabled: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      download: HAS_OVERLOADED_BOOLEAN_VALUE,
      draggable: null,
      encType: null,
      form: MUST_USE_ATTRIBUTE,
      formAction: MUST_USE_ATTRIBUTE,
      formEncType: MUST_USE_ATTRIBUTE,
      formMethod: MUST_USE_ATTRIBUTE,
      formNoValidate: HAS_BOOLEAN_VALUE,
      formTarget: MUST_USE_ATTRIBUTE,
      frameBorder: MUST_USE_ATTRIBUTE,
      headers: null,
      height: MUST_USE_ATTRIBUTE,
      hidden: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      href: null,
      hrefLang: null,
      htmlFor: null,
      httpEquiv: null,
      icon: null,
      id: MUST_USE_PROPERTY,
      label: null,
      lang: null,
      list: MUST_USE_ATTRIBUTE,
      loop: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      manifest: MUST_USE_ATTRIBUTE,
      marginHeight: null,
      marginWidth: null,
      max: null,
      maxLength: MUST_USE_ATTRIBUTE,
      media: MUST_USE_ATTRIBUTE,
      mediaGroup: null,
      method: null,
      min: null,
      multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      name: null,
      noValidate: HAS_BOOLEAN_VALUE,
      open: null,
      pattern: null,
      placeholder: null,
      poster: null,
      preload: null,
      radioGroup: null,
      readOnly: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      rel: null,
      required: HAS_BOOLEAN_VALUE,
      role: MUST_USE_ATTRIBUTE,
      rows: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      rowSpan: null,
      sandbox: null,
      scope: null,
      scrolling: null,
      seamless: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      shape: null,
      size: MUST_USE_ATTRIBUTE | HAS_POSITIVE_NUMERIC_VALUE,
      sizes: MUST_USE_ATTRIBUTE,
      span: HAS_POSITIVE_NUMERIC_VALUE,
      spellCheck: null,
      src: null,
      srcDoc: MUST_USE_PROPERTY,
      srcSet: MUST_USE_ATTRIBUTE,
      start: HAS_NUMERIC_VALUE,
      step: null,
      style: null,
      tabIndex: null,
      target: null,
      title: null,
      type: null,
      useMap: null,
      value: MUST_USE_PROPERTY | HAS_SIDE_EFFECTS,
      width: MUST_USE_ATTRIBUTE,
      wmode: MUST_USE_ATTRIBUTE,
      autoCapitalize: null,
      autoCorrect: null,
      itemProp: MUST_USE_ATTRIBUTE,
      itemScope: MUST_USE_ATTRIBUTE | HAS_BOOLEAN_VALUE,
      itemType: MUST_USE_ATTRIBUTE,
      property: null
    },
    DOMAttributeNames: {
      acceptCharset: 'accept-charset',
      className: 'class',
      htmlFor: 'for',
      httpEquiv: 'http-equiv'
    },
    DOMPropertyNames: {
      autoCapitalize: 'autocapitalize',
      autoComplete: 'autocomplete',
      autoCorrect: 'autocorrect',
      autoFocus: 'autofocus',
      autoPlay: 'autoplay',
      encType: 'enctype',
      hrefLang: 'hreflang',
      radioGroup: 'radiogroup',
      spellCheck: 'spellcheck',
      srcDoc: 'srcdoc',
      srcSet: 'srcset'
    }
  };
  module.exports = HTMLDOMPropertyConfig;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/MobileSafariClickEventPlugin", ["./EventConstants", "./emptyFunction"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var EventConstants = require("./EventConstants");
  var emptyFunction = require("./emptyFunction");
  var topLevelTypes = EventConstants.topLevelTypes;
  var MobileSafariClickEventPlugin = {
    eventTypes: null,
    extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      if (topLevelType === topLevelTypes.topTouchStart) {
        var target = nativeEvent.target;
        if (target && !target.onclick) {
          target.onclick = emptyFunction;
        }
      }
    }
  };
  module.exports = MobileSafariClickEventPlugin;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/findDOMNode", ["./ReactInstanceMap", "./ReactMount", "./invariant", "./isNode", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactInstanceMap = require("./ReactInstanceMap");
    var ReactMount = require("./ReactMount");
    var invariant = require("./invariant");
    var isNode = require("./isNode");
    function findDOMNode(componentOrElement) {
      if (componentOrElement == null) {
        return null;
      }
      if (isNode(componentOrElement)) {
        return componentOrElement;
      }
      if (ReactInstanceMap.has(componentOrElement)) {
        return ReactMount.getNodeFromInstance(componentOrElement);
      }
      ("production" !== process.env.NODE_ENV ? invariant(componentOrElement.render == null || typeof componentOrElement.render !== 'function', 'Component (with keys: %s) contains `render` method ' + 'but is not mounted in the DOM', Object.keys(componentOrElement)) : invariant(componentOrElement.render == null || typeof componentOrElement.render !== 'function'));
      ("production" !== process.env.NODE_ENV ? invariant(false, 'Element appears to be neither ReactComponent nor DOMNode (keys: %s)', Object.keys(componentOrElement)) : invariant(false));
    }
    module.exports = findDOMNode;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDefaultBatchingStrategy", ["./ReactUpdates", "./Transaction", "./Object.assign", "./emptyFunction"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ReactUpdates = require("./ReactUpdates");
  var Transaction = require("./Transaction");
  var assign = require("./Object.assign");
  var emptyFunction = require("./emptyFunction");
  var RESET_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: function() {
      ReactDefaultBatchingStrategy.isBatchingUpdates = false;
    }
  };
  var FLUSH_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
  };
  var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
  function ReactDefaultBatchingStrategyTransaction() {
    this.reinitializeTransaction();
  }
  assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction.Mixin, {getTransactionWrappers: function() {
      return TRANSACTION_WRAPPERS;
    }});
  var transaction = new ReactDefaultBatchingStrategyTransaction();
  var ReactDefaultBatchingStrategy = {
    isBatchingUpdates: false,
    batchedUpdates: function(callback, a, b, c, d) {
      var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
      ReactDefaultBatchingStrategy.isBatchingUpdates = true;
      if (alreadyBatchingUpdates) {
        callback(a, b, c, d);
      } else {
        transaction.perform(callback, null, a, b, c, d);
      }
    }
  };
  module.exports = ReactDefaultBatchingStrategy;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/focusNode", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function focusNode(node) {
    try {
      node.focus();
    } catch (e) {}
  }
  module.exports = focusNode;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/LocalEventTrapMixin", ["./ReactBrowserEventEmitter", "./accumulateInto", "./forEachAccumulated", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactBrowserEventEmitter = require("./ReactBrowserEventEmitter");
    var accumulateInto = require("./accumulateInto");
    var forEachAccumulated = require("./forEachAccumulated");
    var invariant = require("./invariant");
    function remove(event) {
      event.remove();
    }
    var LocalEventTrapMixin = {
      trapBubbledEvent: function(topLevelType, handlerBaseName) {
        ("production" !== process.env.NODE_ENV ? invariant(this.isMounted(), 'Must be mounted to trap events') : invariant(this.isMounted()));
        var node = this.getDOMNode();
        ("production" !== process.env.NODE_ENV ? invariant(node, 'LocalEventTrapMixin.trapBubbledEvent(...): Requires node to be rendered.') : invariant(node));
        var listener = ReactBrowserEventEmitter.trapBubbledEvent(topLevelType, handlerBaseName, node);
        this._localEventListeners = accumulateInto(this._localEventListeners, listener);
      },
      componentWillUnmount: function() {
        if (this._localEventListeners) {
          forEachAccumulated(this._localEventListeners, remove);
        }
      }
    };
    module.exports = LocalEventTrapMixin;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOMImg", ["./EventConstants", "./LocalEventTrapMixin", "./ReactBrowserComponentMixin", "./ReactClass", "./ReactElement"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var EventConstants = require("./EventConstants");
  var LocalEventTrapMixin = require("./LocalEventTrapMixin");
  var ReactBrowserComponentMixin = require("./ReactBrowserComponentMixin");
  var ReactClass = require("./ReactClass");
  var ReactElement = require("./ReactElement");
  var img = ReactElement.createFactory('img');
  var ReactDOMImg = ReactClass.createClass({
    displayName: 'ReactDOMImg',
    tagName: 'IMG',
    mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],
    render: function() {
      return img(this.props);
    },
    componentDidMount: function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load');
      this.trapBubbledEvent(EventConstants.topLevelTypes.topError, 'error');
    }
  });
  module.exports = ReactDOMImg;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactPropTypes", ["./ReactElement", "./ReactPropTypeLocationNames", "./emptyFunction"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ReactElement = require("./ReactElement");
  var ReactPropTypeLocationNames = require("./ReactPropTypeLocationNames");
  var emptyFunction = require("./emptyFunction");
  var ANONYMOUS = '<<anonymous>>';
  var elementTypeChecker = createElementTypeChecker();
  var nodeTypeChecker = createNodeChecker();
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: elementTypeChecker,
    instanceOf: createInstanceTypeChecker,
    node: nodeTypeChecker,
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };
  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location) {
      componentName = componentName || ANONYMOUS;
      if (props[propName] == null) {
        var locationName = ReactPropTypeLocationNames[location];
        if (isRequired) {
          return new Error(("Required " + locationName + " `" + propName + "` was not specified in ") + ("`" + componentName + "`."));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location);
      }
    }
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }
  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        var locationName = ReactPropTypeLocationNames[location];
        var preciseType = getPreciseType(propValue);
        return new Error(("Invalid " + locationName + " `" + propName + "` of type `" + preciseType + "` ") + ("supplied to `" + componentName + "`, expected `" + expectedType + "`."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturns(null));
  }
  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var locationName = ReactPropTypeLocationNames[location];
        var propType = getPropType(propValue);
        return new Error(("Invalid " + locationName + " `" + propName + "` of type ") + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeChecker() {
    function validate(props, propName, componentName, location) {
      if (!ReactElement.isValidElement(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(("Invalid " + locationName + " `" + propName + "` supplied to ") + ("`" + componentName + "`, expected a ReactElement."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location) {
      if (!(props[propName] instanceof expectedClass)) {
        var locationName = ReactPropTypeLocationNames[location];
        var expectedClassName = expectedClass.name || ANONYMOUS;
        return new Error(("Invalid " + locationName + " `" + propName + "` supplied to ") + ("`" + componentName + "`, expected instance of `" + expectedClassName + "`."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createEnumTypeChecker(expectedValues) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (propValue === expectedValues[i]) {
          return null;
        }
      }
      var locationName = ReactPropTypeLocationNames[location];
      var valuesString = JSON.stringify(expectedValues);
      return new Error(("Invalid " + locationName + " `" + propName + "` of value `" + propValue + "` ") + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
    }
    return createChainableTypeChecker(validate);
  }
  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(("Invalid " + locationName + " `" + propName + "` of type ") + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    function validate(props, propName, componentName, location) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location) == null) {
          return null;
        }
      }
      var locationName = ReactPropTypeLocationNames[location];
      return new Error(("Invalid " + locationName + " `" + propName + "` supplied to ") + ("`" + componentName + "`."));
    }
    return createChainableTypeChecker(validate);
  }
  function createNodeChecker() {
    function validate(props, propName, componentName, location) {
      if (!isNode(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(("Invalid " + locationName + " `" + propName + "` supplied to ") + ("`" + componentName + "`, expected a ReactNode."));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error(("Invalid " + locationName + " `" + propName + "` of type `" + propType + "` ") + ("supplied to `" + componentName + "`, expected `object`."));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate, 'expected `object`');
  }
  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (ReactElement.isValidElement(propValue)) {
          return true;
        }
        for (var k in propValue) {
          if (!isNode(propValue[k])) {
            return false;
          }
        }
        return true;
      default:
        return false;
    }
  }
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      return 'object';
    }
    return propType;
  }
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }
  module.exports = ReactPropTypes;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOMOption", ["./ReactBrowserComponentMixin", "./ReactClass", "./ReactElement", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactBrowserComponentMixin = require("./ReactBrowserComponentMixin");
    var ReactClass = require("./ReactClass");
    var ReactElement = require("./ReactElement");
    var warning = require("./warning");
    var option = ReactElement.createFactory('option');
    var ReactDOMOption = ReactClass.createClass({
      displayName: 'ReactDOMOption',
      tagName: 'OPTION',
      mixins: [ReactBrowserComponentMixin],
      componentWillMount: function() {
        if ("production" !== process.env.NODE_ENV) {
          ("production" !== process.env.NODE_ENV ? warning(this.props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.') : null);
        }
      },
      render: function() {
        return option(this.props, this.props.children);
      }
    });
    module.exports = ReactDOMOption;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOMSelect", ["./AutoFocusMixin", "./LinkedValueUtils", "./ReactBrowserComponentMixin", "./ReactClass", "./ReactElement", "./ReactUpdates", "./Object.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var AutoFocusMixin = require("./AutoFocusMixin");
  var LinkedValueUtils = require("./LinkedValueUtils");
  var ReactBrowserComponentMixin = require("./ReactBrowserComponentMixin");
  var ReactClass = require("./ReactClass");
  var ReactElement = require("./ReactElement");
  var ReactUpdates = require("./ReactUpdates");
  var assign = require("./Object.assign");
  var select = ReactElement.createFactory('select');
  function updateOptionsIfPendingUpdateAndMounted() {
    if (this._pendingUpdate) {
      this._pendingUpdate = false;
      var value = LinkedValueUtils.getValue(this);
      if (value != null && this.isMounted()) {
        updateOptions(this, value);
      }
    }
  }
  function selectValueType(props, propName, componentName) {
    if (props[propName] == null) {
      return null;
    }
    if (props.multiple) {
      if (!Array.isArray(props[propName])) {
        return new Error(("The `" + propName + "` prop supplied to <select> must be an array if ") + ("`multiple` is true."));
      }
    } else {
      if (Array.isArray(props[propName])) {
        return new Error(("The `" + propName + "` prop supplied to <select> must be a scalar ") + ("value if `multiple` is false."));
      }
    }
  }
  function updateOptions(component, propValue) {
    var selectedValue,
        i,
        l;
    var options = component.getDOMNode().options;
    if (component.props.multiple) {
      selectedValue = {};
      for (i = 0, l = propValue.length; i < l; i++) {
        selectedValue['' + propValue[i]] = true;
      }
      for (i = 0, l = options.length; i < l; i++) {
        var selected = selectedValue.hasOwnProperty(options[i].value);
        if (options[i].selected !== selected) {
          options[i].selected = selected;
        }
      }
    } else {
      selectedValue = '' + propValue;
      for (i = 0, l = options.length; i < l; i++) {
        if (options[i].value === selectedValue) {
          options[i].selected = true;
          return ;
        }
      }
      options[0].selected = true;
    }
  }
  var ReactDOMSelect = ReactClass.createClass({
    displayName: 'ReactDOMSelect',
    tagName: 'SELECT',
    mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
    propTypes: {
      defaultValue: selectValueType,
      value: selectValueType
    },
    render: function() {
      var props = assign({}, this.props);
      props.onChange = this._handleChange;
      props.value = null;
      return select(props, this.props.children);
    },
    componentWillMount: function() {
      this._pendingUpdate = false;
    },
    componentDidMount: function() {
      var value = LinkedValueUtils.getValue(this);
      if (value != null) {
        updateOptions(this, value);
      } else if (this.props.defaultValue != null) {
        updateOptions(this, this.props.defaultValue);
      }
    },
    componentDidUpdate: function(prevProps) {
      var value = LinkedValueUtils.getValue(this);
      if (value != null) {
        this._pendingUpdate = false;
        updateOptions(this, value);
      } else if (!prevProps.multiple !== !this.props.multiple) {
        if (this.props.defaultValue != null) {
          updateOptions(this, this.props.defaultValue);
        } else {
          updateOptions(this, this.props.multiple ? [] : '');
        }
      }
    },
    _handleChange: function(event) {
      var returnValue;
      var onChange = LinkedValueUtils.getOnChange(this);
      if (onChange) {
        returnValue = onChange.call(this, event);
      }
      this._pendingUpdate = true;
      ReactUpdates.asap(updateOptionsIfPendingUpdateAndMounted, this);
      return returnValue;
    }
  });
  module.exports = ReactDOMSelect;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOMTextarea", ["./AutoFocusMixin", "./DOMPropertyOperations", "./LinkedValueUtils", "./ReactBrowserComponentMixin", "./ReactClass", "./ReactElement", "./ReactUpdates", "./Object.assign", "./invariant", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var AutoFocusMixin = require("./AutoFocusMixin");
    var DOMPropertyOperations = require("./DOMPropertyOperations");
    var LinkedValueUtils = require("./LinkedValueUtils");
    var ReactBrowserComponentMixin = require("./ReactBrowserComponentMixin");
    var ReactClass = require("./ReactClass");
    var ReactElement = require("./ReactElement");
    var ReactUpdates = require("./ReactUpdates");
    var assign = require("./Object.assign");
    var invariant = require("./invariant");
    var warning = require("./warning");
    var textarea = ReactElement.createFactory('textarea');
    function forceUpdateIfMounted() {
      if (this.isMounted()) {
        this.forceUpdate();
      }
    }
    var ReactDOMTextarea = ReactClass.createClass({
      displayName: 'ReactDOMTextarea',
      tagName: 'TEXTAREA',
      mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
      getInitialState: function() {
        var defaultValue = this.props.defaultValue;
        var children = this.props.children;
        if (children != null) {
          if ("production" !== process.env.NODE_ENV) {
            ("production" !== process.env.NODE_ENV ? warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.') : null);
          }
          ("production" !== process.env.NODE_ENV ? invariant(defaultValue == null, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : invariant(defaultValue == null));
          if (Array.isArray(children)) {
            ("production" !== process.env.NODE_ENV ? invariant(children.length <= 1, '<textarea> can only have at most one child.') : invariant(children.length <= 1));
            children = children[0];
          }
          defaultValue = '' + children;
        }
        if (defaultValue == null) {
          defaultValue = '';
        }
        var value = LinkedValueUtils.getValue(this);
        return {initialValue: '' + (value != null ? value : defaultValue)};
      },
      render: function() {
        var props = assign({}, this.props);
        ("production" !== process.env.NODE_ENV ? invariant(props.dangerouslySetInnerHTML == null, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : invariant(props.dangerouslySetInnerHTML == null));
        props.defaultValue = null;
        props.value = null;
        props.onChange = this._handleChange;
        return textarea(props, this.state.initialValue);
      },
      componentDidUpdate: function(prevProps, prevState, prevContext) {
        var value = LinkedValueUtils.getValue(this);
        if (value != null) {
          var rootNode = this.getDOMNode();
          DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
        }
      },
      _handleChange: function(event) {
        var returnValue;
        var onChange = LinkedValueUtils.getOnChange(this);
        if (onChange) {
          returnValue = onChange.call(this, event);
        }
        ReactUpdates.asap(forceUpdateIfMounted, this);
        return returnValue;
      }
    });
    module.exports = ReactDOMTextarea;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/EventListener", ["./emptyFunction", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var emptyFunction = require("./emptyFunction");
    var EventListener = {
      listen: function(target, eventType, callback) {
        if (target.addEventListener) {
          target.addEventListener(eventType, callback, false);
          return {remove: function() {
              target.removeEventListener(eventType, callback, false);
            }};
        } else if (target.attachEvent) {
          target.attachEvent('on' + eventType, callback);
          return {remove: function() {
              target.detachEvent('on' + eventType, callback);
            }};
        }
      },
      capture: function(target, eventType, callback) {
        if (!target.addEventListener) {
          if ("production" !== process.env.NODE_ENV) {
            console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
          }
          return {remove: emptyFunction};
        } else {
          target.addEventListener(eventType, callback, true);
          return {remove: function() {
              target.removeEventListener(eventType, callback, true);
            }};
        }
      },
      registerDefault: function() {}
    };
    module.exports = EventListener;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/getUnboundedScrollPosition", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  function getUnboundedScrollPosition(scrollable) {
    if (scrollable === window) {
      return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
      };
    }
    return {
      x: scrollable.scrollLeft,
      y: scrollable.scrollTop
    };
  }
  module.exports = getUnboundedScrollPosition;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactInjection", ["./DOMProperty", "./EventPluginHub", "./ReactComponentEnvironment", "./ReactClass", "./ReactEmptyComponent", "./ReactBrowserEventEmitter", "./ReactNativeComponent", "./ReactDOMComponent", "./ReactPerf", "./ReactRootIndex", "./ReactUpdates"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var DOMProperty = require("./DOMProperty");
  var EventPluginHub = require("./EventPluginHub");
  var ReactComponentEnvironment = require("./ReactComponentEnvironment");
  var ReactClass = require("./ReactClass");
  var ReactEmptyComponent = require("./ReactEmptyComponent");
  var ReactBrowserEventEmitter = require("./ReactBrowserEventEmitter");
  var ReactNativeComponent = require("./ReactNativeComponent");
  var ReactDOMComponent = require("./ReactDOMComponent");
  var ReactPerf = require("./ReactPerf");
  var ReactRootIndex = require("./ReactRootIndex");
  var ReactUpdates = require("./ReactUpdates");
  var ReactInjection = {
    Component: ReactComponentEnvironment.injection,
    Class: ReactClass.injection,
    DOMComponent: ReactDOMComponent.injection,
    DOMProperty: DOMProperty.injection,
    EmptyComponent: ReactEmptyComponent.injection,
    EventPluginHub: EventPluginHub.injection,
    EventEmitter: ReactBrowserEventEmitter.injection,
    NativeComponent: ReactNativeComponent.injection,
    Perf: ReactPerf.injection,
    RootIndex: ReactRootIndex.injection,
    Updates: ReactUpdates.injection
  };
  module.exports = ReactInjection;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/getNodeForCharacterOffset", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  function getLeafNode(node) {
    while (node && node.firstChild) {
      node = node.firstChild;
    }
    return node;
  }
  function getSiblingNode(node) {
    while (node) {
      if (node.nextSibling) {
        return node.nextSibling;
      }
      node = node.parentNode;
    }
  }
  function getNodeForCharacterOffset(root, offset) {
    var node = getLeafNode(root);
    var nodeStart = 0;
    var nodeEnd = 0;
    while (node) {
      if (node.nodeType === 3) {
        nodeEnd = nodeStart + node.textContent.length;
        if (nodeStart <= offset && nodeEnd >= offset) {
          return {
            node: node,
            offset: offset - nodeStart
          };
        }
        nodeStart = nodeEnd;
      }
      node = getLeafNode(getSiblingNode(node));
    }
  }
  module.exports = getNodeForCharacterOffset;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/getActiveElement", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function getActiveElement() {
    try {
      return document.activeElement || document.body;
    } catch (e) {
      return document.body;
    }
  }
  module.exports = getActiveElement;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactPutListenerQueue", ["./PooledClass", "./ReactBrowserEventEmitter", "./Object.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var PooledClass = require("./PooledClass");
  var ReactBrowserEventEmitter = require("./ReactBrowserEventEmitter");
  var assign = require("./Object.assign");
  function ReactPutListenerQueue() {
    this.listenersToPut = [];
  }
  assign(ReactPutListenerQueue.prototype, {
    enqueuePutListener: function(rootNodeID, propKey, propValue) {
      this.listenersToPut.push({
        rootNodeID: rootNodeID,
        propKey: propKey,
        propValue: propValue
      });
    },
    putListeners: function() {
      for (var i = 0; i < this.listenersToPut.length; i++) {
        var listenerToPut = this.listenersToPut[i];
        ReactBrowserEventEmitter.putListener(listenerToPut.rootNodeID, listenerToPut.propKey, listenerToPut.propValue);
      }
    },
    reset: function() {
      this.listenersToPut.length = 0;
    },
    destructor: function() {
      this.reset();
    }
  });
  PooledClass.addPoolingTo(ReactPutListenerQueue);
  module.exports = ReactPutListenerQueue;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/shallowEqual", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  function shallowEqual(objA, objB) {
    if (objA === objB) {
      return true;
    }
    var key;
    for (key in objA) {
      if (objA.hasOwnProperty(key) && (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
        return false;
      }
    }
    for (key in objB) {
      if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  module.exports = shallowEqual;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ServerReactRootIndex", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var GLOBAL_MOUNT_POINT_MAX = Math.pow(2, 53);
  var ServerReactRootIndex = {createReactRootIndex: function() {
      return Math.ceil(Math.random() * GLOBAL_MOUNT_POINT_MAX);
    }};
  module.exports = ServerReactRootIndex;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SyntheticClipboardEvent", ["./SyntheticEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var SyntheticEvent = require("./SyntheticEvent");
  var ClipboardEventInterface = {clipboardData: function(event) {
      return ('clipboardData' in event ? event.clipboardData : window.clipboardData);
    }};
  function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);
  module.exports = SyntheticClipboardEvent;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SyntheticFocusEvent", ["./SyntheticUIEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var SyntheticUIEvent = require("./SyntheticUIEvent");
  var FocusEventInterface = {relatedTarget: null};
  function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);
  module.exports = SyntheticFocusEvent;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/getEventCharCode", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  function getEventCharCode(nativeEvent) {
    var charCode;
    var keyCode = nativeEvent.keyCode;
    if ('charCode' in nativeEvent) {
      charCode = nativeEvent.charCode;
      if (charCode === 0 && keyCode === 13) {
        charCode = 13;
      }
    } else {
      charCode = keyCode;
    }
    if (charCode >= 32 || charCode === 13) {
      return charCode;
    }
    return 0;
  }
  module.exports = getEventCharCode;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/getEventKey", ["./getEventCharCode"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var getEventCharCode = require("./getEventCharCode");
  var normalizeKey = {
    'Esc': 'Escape',
    'Spacebar': ' ',
    'Left': 'ArrowLeft',
    'Up': 'ArrowUp',
    'Right': 'ArrowRight',
    'Down': 'ArrowDown',
    'Del': 'Delete',
    'Win': 'OS',
    'Menu': 'ContextMenu',
    'Apps': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'MozPrintableKey': 'Unidentified'
  };
  var translateToKey = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta'
  };
  function getEventKey(nativeEvent) {
    if (nativeEvent.key) {
      var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
      if (key !== 'Unidentified') {
        return key;
      }
    }
    if (nativeEvent.type === 'keypress') {
      var charCode = getEventCharCode(nativeEvent);
      return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
    }
    if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
      return translateToKey[nativeEvent.keyCode] || 'Unidentified';
    }
    return '';
  }
  module.exports = getEventKey;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SyntheticDragEvent", ["./SyntheticMouseEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var SyntheticMouseEvent = require("./SyntheticMouseEvent");
  var DragEventInterface = {dataTransfer: null};
  function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);
  module.exports = SyntheticDragEvent;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SyntheticTouchEvent", ["./SyntheticUIEvent", "./getEventModifierState"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var SyntheticUIEvent = require("./SyntheticUIEvent");
  var getEventModifierState = require("./getEventModifierState");
  var TouchEventInterface = {
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: getEventModifierState
  };
  function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);
  module.exports = SyntheticTouchEvent;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SyntheticWheelEvent", ["./SyntheticMouseEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var SyntheticMouseEvent = require("./SyntheticMouseEvent");
  var WheelEventInterface = {
    deltaX: function(event) {
      return ('deltaX' in event ? event.deltaX : 'wheelDeltaX' in event ? -event.wheelDeltaX : 0);
    },
    deltaY: function(event) {
      return ('deltaY' in event ? event.deltaY : 'wheelDeltaY' in event ? -event.wheelDeltaY : 'wheelDelta' in event ? -event.wheelDelta : 0);
    },
    deltaZ: null,
    deltaMode: null
  };
  function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);
  module.exports = SyntheticWheelEvent;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SVGDOMPropertyConfig", ["./DOMProperty"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var DOMProperty = require("./DOMProperty");
  var MUST_USE_ATTRIBUTE = DOMProperty.injection.MUST_USE_ATTRIBUTE;
  var SVGDOMPropertyConfig = {
    Properties: {
      cx: MUST_USE_ATTRIBUTE,
      cy: MUST_USE_ATTRIBUTE,
      d: MUST_USE_ATTRIBUTE,
      dx: MUST_USE_ATTRIBUTE,
      dy: MUST_USE_ATTRIBUTE,
      fill: MUST_USE_ATTRIBUTE,
      fillOpacity: MUST_USE_ATTRIBUTE,
      fontFamily: MUST_USE_ATTRIBUTE,
      fontSize: MUST_USE_ATTRIBUTE,
      fx: MUST_USE_ATTRIBUTE,
      fy: MUST_USE_ATTRIBUTE,
      gradientTransform: MUST_USE_ATTRIBUTE,
      gradientUnits: MUST_USE_ATTRIBUTE,
      markerEnd: MUST_USE_ATTRIBUTE,
      markerMid: MUST_USE_ATTRIBUTE,
      markerStart: MUST_USE_ATTRIBUTE,
      offset: MUST_USE_ATTRIBUTE,
      opacity: MUST_USE_ATTRIBUTE,
      patternContentUnits: MUST_USE_ATTRIBUTE,
      patternUnits: MUST_USE_ATTRIBUTE,
      points: MUST_USE_ATTRIBUTE,
      preserveAspectRatio: MUST_USE_ATTRIBUTE,
      r: MUST_USE_ATTRIBUTE,
      rx: MUST_USE_ATTRIBUTE,
      ry: MUST_USE_ATTRIBUTE,
      spreadMethod: MUST_USE_ATTRIBUTE,
      stopColor: MUST_USE_ATTRIBUTE,
      stopOpacity: MUST_USE_ATTRIBUTE,
      stroke: MUST_USE_ATTRIBUTE,
      strokeDasharray: MUST_USE_ATTRIBUTE,
      strokeLinecap: MUST_USE_ATTRIBUTE,
      strokeOpacity: MUST_USE_ATTRIBUTE,
      strokeWidth: MUST_USE_ATTRIBUTE,
      textAnchor: MUST_USE_ATTRIBUTE,
      transform: MUST_USE_ATTRIBUTE,
      version: MUST_USE_ATTRIBUTE,
      viewBox: MUST_USE_ATTRIBUTE,
      x1: MUST_USE_ATTRIBUTE,
      x2: MUST_USE_ATTRIBUTE,
      x: MUST_USE_ATTRIBUTE,
      y1: MUST_USE_ATTRIBUTE,
      y2: MUST_USE_ATTRIBUTE,
      y: MUST_USE_ATTRIBUTE
    },
    DOMAttributeNames: {
      fillOpacity: 'fill-opacity',
      fontFamily: 'font-family',
      fontSize: 'font-size',
      gradientTransform: 'gradientTransform',
      gradientUnits: 'gradientUnits',
      markerEnd: 'marker-end',
      markerMid: 'marker-mid',
      markerStart: 'marker-start',
      patternContentUnits: 'patternContentUnits',
      patternUnits: 'patternUnits',
      preserveAspectRatio: 'preserveAspectRatio',
      spreadMethod: 'spreadMethod',
      stopColor: 'stop-color',
      stopOpacity: 'stop-opacity',
      strokeDasharray: 'stroke-dasharray',
      strokeLinecap: 'stroke-linecap',
      strokeOpacity: 'stroke-opacity',
      strokeWidth: 'stroke-width',
      textAnchor: 'text-anchor',
      viewBox: 'viewBox'
    }
  };
  module.exports = SVGDOMPropertyConfig;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/createFullPageComponent", ["./ReactClass", "./ReactElement", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactClass = require("./ReactClass");
    var ReactElement = require("./ReactElement");
    var invariant = require("./invariant");
    function createFullPageComponent(tag) {
      var elementFactory = ReactElement.createFactory(tag);
      var FullPageComponent = ReactClass.createClass({
        displayName: 'ReactFullPageComponent' + tag,
        componentWillUnmount: function() {
          ("production" !== process.env.NODE_ENV ? invariant(false, '%s tried to unmount. Because of cross-browser quirks it is ' + 'impossible to unmount some top-level components (eg <html>, <head>, ' + 'and <body>) reliably and efficiently. To fix this, have a single ' + 'top-level component that never unmounts render these elements.', this.constructor.displayName) : invariant(false));
        },
        render: function() {
          return elementFactory(this.props);
        }
      });
      return FullPageComponent;
    }
    module.exports = createFullPageComponent;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDefaultPerfAnalysis", ["./Object.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var assign = require("./Object.assign");
  var DONT_CARE_THRESHOLD = 1.2;
  var DOM_OPERATION_TYPES = {
    '_mountImageIntoNode': 'set innerHTML',
    INSERT_MARKUP: 'set innerHTML',
    MOVE_EXISTING: 'move',
    REMOVE_NODE: 'remove',
    TEXT_CONTENT: 'set textContent',
    'updatePropertyByID': 'update attribute',
    'deletePropertyByID': 'delete attribute',
    'updateStylesByID': 'update styles',
    'updateInnerHTMLByID': 'set innerHTML',
    'dangerouslyReplaceNodeWithMarkupByID': 'replace'
  };
  function getTotalTime(measurements) {
    var totalTime = 0;
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      totalTime += measurement.totalTime;
    }
    return totalTime;
  }
  function getDOMSummary(measurements) {
    var items = [];
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      var id;
      for (id in measurement.writes) {
        measurement.writes[id].forEach(function(write) {
          items.push({
            id: id,
            type: DOM_OPERATION_TYPES[write.type] || write.type,
            args: write.args
          });
        });
      }
    }
    return items;
  }
  function getExclusiveSummary(measurements) {
    var candidates = {};
    var displayName;
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
      for (var id in allIDs) {
        displayName = measurement.displayNames[id].current;
        candidates[displayName] = candidates[displayName] || {
          componentName: displayName,
          inclusive: 0,
          exclusive: 0,
          render: 0,
          count: 0
        };
        if (measurement.render[id]) {
          candidates[displayName].render += measurement.render[id];
        }
        if (measurement.exclusive[id]) {
          candidates[displayName].exclusive += measurement.exclusive[id];
        }
        if (measurement.inclusive[id]) {
          candidates[displayName].inclusive += measurement.inclusive[id];
        }
        if (measurement.counts[id]) {
          candidates[displayName].count += measurement.counts[id];
        }
      }
    }
    var arr = [];
    for (displayName in candidates) {
      if (candidates[displayName].exclusive >= DONT_CARE_THRESHOLD) {
        arr.push(candidates[displayName]);
      }
    }
    arr.sort(function(a, b) {
      return b.exclusive - a.exclusive;
    });
    return arr;
  }
  function getInclusiveSummary(measurements, onlyClean) {
    var candidates = {};
    var inclusiveKey;
    for (var i = 0; i < measurements.length; i++) {
      var measurement = measurements[i];
      var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
      var cleanComponents;
      if (onlyClean) {
        cleanComponents = getUnchangedComponents(measurement);
      }
      for (var id in allIDs) {
        if (onlyClean && !cleanComponents[id]) {
          continue;
        }
        var displayName = measurement.displayNames[id];
        inclusiveKey = displayName.owner + ' > ' + displayName.current;
        candidates[inclusiveKey] = candidates[inclusiveKey] || {
          componentName: inclusiveKey,
          time: 0,
          count: 0
        };
        if (measurement.inclusive[id]) {
          candidates[inclusiveKey].time += measurement.inclusive[id];
        }
        if (measurement.counts[id]) {
          candidates[inclusiveKey].count += measurement.counts[id];
        }
      }
    }
    var arr = [];
    for (inclusiveKey in candidates) {
      if (candidates[inclusiveKey].time >= DONT_CARE_THRESHOLD) {
        arr.push(candidates[inclusiveKey]);
      }
    }
    arr.sort(function(a, b) {
      return b.time - a.time;
    });
    return arr;
  }
  function getUnchangedComponents(measurement) {
    var cleanComponents = {};
    var dirtyLeafIDs = Object.keys(measurement.writes);
    var allIDs = assign({}, measurement.exclusive, measurement.inclusive);
    for (var id in allIDs) {
      var isDirty = false;
      for (var i = 0; i < dirtyLeafIDs.length; i++) {
        if (dirtyLeafIDs[i].indexOf(id) === 0) {
          isDirty = true;
          break;
        }
      }
      if (!isDirty && measurement.counts[id] > 0) {
        cleanComponents[id] = true;
      }
    }
    return cleanComponents;
  }
  var ReactDefaultPerfAnalysis = {
    getExclusiveSummary: getExclusiveSummary,
    getInclusiveSummary: getInclusiveSummary,
    getDOMSummary: getDOMSummary,
    getTotalTime: getTotalTime
  };
  module.exports = ReactDefaultPerfAnalysis;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/performance", ["./ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var ExecutionEnvironment = require("./ExecutionEnvironment");
  var performance;
  if (ExecutionEnvironment.canUseDOM) {
    performance = window.performance || window.msPerformance || window.webkitPerformance;
  }
  module.exports = performance || {};
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactServerRenderingTransaction", ["./PooledClass", "./CallbackQueue", "./ReactPutListenerQueue", "./Transaction", "./Object.assign", "./emptyFunction"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var PooledClass = require("./PooledClass");
  var CallbackQueue = require("./CallbackQueue");
  var ReactPutListenerQueue = require("./ReactPutListenerQueue");
  var Transaction = require("./Transaction");
  var assign = require("./Object.assign");
  var emptyFunction = require("./emptyFunction");
  var ON_DOM_READY_QUEUEING = {
    initialize: function() {
      this.reactMountReady.reset();
    },
    close: emptyFunction
  };
  var PUT_LISTENER_QUEUEING = {
    initialize: function() {
      this.putListenerQueue.reset();
    },
    close: emptyFunction
  };
  var TRANSACTION_WRAPPERS = [PUT_LISTENER_QUEUEING, ON_DOM_READY_QUEUEING];
  function ReactServerRenderingTransaction(renderToStaticMarkup) {
    this.reinitializeTransaction();
    this.renderToStaticMarkup = renderToStaticMarkup;
    this.reactMountReady = CallbackQueue.getPooled(null);
    this.putListenerQueue = ReactPutListenerQueue.getPooled();
  }
  var Mixin = {
    getTransactionWrappers: function() {
      return TRANSACTION_WRAPPERS;
    },
    getReactMountReady: function() {
      return this.reactMountReady;
    },
    getPutListenerQueue: function() {
      return this.putListenerQueue;
    },
    destructor: function() {
      CallbackQueue.release(this.reactMountReady);
      this.reactMountReady = null;
      ReactPutListenerQueue.release(this.putListenerQueue);
      this.putListenerQueue = null;
    }
  };
  assign(ReactServerRenderingTransaction.prototype, Transaction.Mixin, Mixin);
  PooledClass.addPoolingTo(ReactServerRenderingTransaction);
  module.exports = ReactServerRenderingTransaction;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/onlyChild", ["./ReactElement", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactElement = require("./ReactElement");
    var invariant = require("./invariant");
    function onlyChild(children) {
      ("production" !== process.env.NODE_ENV ? invariant(ReactElement.isValidElement(children), 'onlyChild must be passed a children with exactly one child.') : invariant(ReactElement.isValidElement(children)));
      return children;
    }
    module.exports = onlyChild;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("app/numeric-input", ["react"], function (_export) {
  "use strict";

  var React, _prototypeProperties, _get, _inherits, _classCallCheck, NumericInput;
  return {
    setters: [function (_react) {
      React = _react["default"];
    }],
    execute: function () {
      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

      _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      NumericInput = _export("NumericInput", (function (_React$Component) {
        function NumericInput(props) {
          _classCallCheck(this, NumericInput);

          _get(_React$Component.prototype, "constructor", this).call(this, props);
          this.state = {
            focussed: false,
            rawValue: this.formatNumber(props.value)
          };
        }

        _inherits(NumericInput, _React$Component);

        _prototypeProperties(NumericInput, null, {
          handleFocus: {
            value: function handleFocus(event) {
              this.setState({
                focussed: true,
                rawValue: this.formatNumber(this.props.value)
              });
            },
            writable: true,
            configurable: true
          },
          handleBlur: {
            value: function handleBlur(event) {
              this.setState({
                focussed: false,
                rawValue: this.formatNumber(this.props.value)
              });
            },
            writable: true,
            configurable: true
          },
          handleChange: {
            value: function handleChange(event) {
              var value = parseFloat(event.target.value.replace(/[^\d\.]/g, ""));
              if (isNaN(value)) {
                value = 0;
              }
              this.setState({ rawValue: event.target.value });
              this.props.onChange && this.props.onChange(value);
            },
            writable: true,
            configurable: true
          },
          render: {
            value: function render() {
              var value = undefined;
              if (this.state.focussed) {
                value = this.state.rawValue;
              } else {
                value = this.formatNumber(this.props.value);
              }

              return React.createElement("input", { type: "text",
                readOnly: this.props.readOnly,
                onFocus: this.handleFocus.bind(this),
                onBlur: this.handleBlur.bind(this),
                onChange: this.handleChange.bind(this),
                value: value });
            },
            writable: true,
            configurable: true
          },
          formatNumber: {
            value: function formatNumber(number) {
              if (isNaN(number)) {
                return "-";
              }
              return number.toFixed(this.props.dp).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            writable: true,
            configurable: true
          }
        });

        return NumericInput;
      })(React.Component));
      ;
    }
  };
});
System.register("npm:react@0.13.0-beta.1/lib/ReactLink", ["./React"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var React = require("./React");
  function ReactLink(value, requestChange) {
    this.value = value;
    this.requestChange = requestChange;
  }
  function createLinkTypeChecker(linkType) {
    var shapes = {
      value: typeof linkType === 'undefined' ? React.PropTypes.any.isRequired : linkType.isRequired,
      requestChange: React.PropTypes.func.isRequired
    };
    return React.PropTypes.shape(shapes);
  }
  ReactLink.PropTypes = {link: createLinkTypeChecker};
  module.exports = ReactLink;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactStateSetters", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ReactStateSetters = {
    createStateSetter: function(component, funcReturningState) {
      return function(a, b, c, d, e, f) {
        var partialState = funcReturningState.call(component, a, b, c, d, e, f);
        if (partialState) {
          component.setState(partialState);
        }
      };
    },
    createStateKeySetter: function(component, key) {
      var cache = component.__keySetters || (component.__keySetters = {});
      return cache[key] || (cache[key] = createStateKeySetter(component, key));
    }
  };
  function createStateKeySetter(component, key) {
    var partialState = {};
    return function stateKeySetter(value) {
      partialState[key] = value;
      component.setState(partialState);
    };
  }
  ReactStateSetters.Mixin = {
    createStateSetter: function(funcReturningState) {
      return ReactStateSetters.createStateSetter(this, funcReturningState);
    },
    createStateKeySetter: function(key) {
      return ReactStateSetters.createStateKeySetter(this, key);
    }
  };
  module.exports = ReactStateSetters;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactComponentWithPureRenderMixin", ["./shallowEqual"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var shallowEqual = require("./shallowEqual");
  var ReactComponentWithPureRenderMixin = {shouldComponentUpdate: function(nextProps, nextState) {
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }};
  module.exports = ReactComponentWithPureRenderMixin;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactTransitionChildMapping", ["./ReactChildren"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ReactChildren = require("./ReactChildren");
  var ReactTransitionChildMapping = {
    getChildMapping: function(children) {
      return ReactChildren.map(children, function(child) {
        return child;
      });
    },
    mergeChildMappings: function(prev, next) {
      prev = prev || {};
      next = next || {};
      function getValueForKey(key) {
        if (next.hasOwnProperty(key)) {
          return next[key];
        } else {
          return prev[key];
        }
      }
      var nextKeysPending = {};
      var pendingKeys = [];
      for (var prevKey in prev) {
        if (next.hasOwnProperty(prevKey)) {
          if (pendingKeys.length) {
            nextKeysPending[prevKey] = pendingKeys;
            pendingKeys = [];
          }
        } else {
          pendingKeys.push(prevKey);
        }
      }
      var i;
      var childMapping = {};
      for (var nextKey in next) {
        if (nextKeysPending.hasOwnProperty(nextKey)) {
          for (i = 0; i < nextKeysPending[nextKey].length; i++) {
            var pendingNextKey = nextKeysPending[nextKey][i];
            childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
          }
        }
        childMapping[nextKey] = getValueForKey(nextKey);
      }
      for (i = 0; i < pendingKeys.length; i++) {
        childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
      }
      return childMapping;
    }
  };
  module.exports = ReactTransitionChildMapping;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/joinClasses", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  function joinClasses(className) {
    if (!className) {
      className = '';
    }
    var nextClass;
    var argLength = arguments.length;
    if (argLength > 1) {
      for (var ii = 1; ii < argLength; ii++) {
        nextClass = arguments[ii];
        if (nextClass) {
          className = (className ? className + ' ' : '') + nextClass;
        }
      }
    }
    return className;
  }
  module.exports = joinClasses;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/CSSCore", ["./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var invariant = require("./invariant");
    var CSSCore = {
      addClass: function(element, className) {
        ("production" !== process.env.NODE_ENV ? invariant(!/\s/.test(className), 'CSSCore.addClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(!/\s/.test(className)));
        if (className) {
          if (element.classList) {
            element.classList.add(className);
          } else if (!CSSCore.hasClass(element, className)) {
            element.className = element.className + ' ' + className;
          }
        }
        return element;
      },
      removeClass: function(element, className) {
        ("production" !== process.env.NODE_ENV ? invariant(!/\s/.test(className), 'CSSCore.removeClass takes only a single class name. "%s" contains ' + 'multiple classes.', className) : invariant(!/\s/.test(className)));
        if (className) {
          if (element.classList) {
            element.classList.remove(className);
          } else if (CSSCore.hasClass(element, className)) {
            element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
          }
        }
        return element;
      },
      conditionClass: function(element, className, bool) {
        return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
      },
      hasClass: function(element, className) {
        ("production" !== process.env.NODE_ENV ? invariant(!/\s/.test(className), 'CSS.hasClass takes only a single class name.') : invariant(!/\s/.test(className)));
        if (element.classList) {
          return !!className && element.classList.contains(className);
        }
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
      }
    };
    module.exports = CSSCore;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactTransitionEvents", ["./ExecutionEnvironment"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ExecutionEnvironment = require("./ExecutionEnvironment");
  var EVENT_NAME_MAP = {
    transitionend: {
      'transition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'mozTransitionEnd',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd'
    },
    animationend: {
      'animation': 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd',
      'MozAnimation': 'mozAnimationEnd',
      'OAnimation': 'oAnimationEnd',
      'msAnimation': 'MSAnimationEnd'
    }
  };
  var endEvents = [];
  function detectEvents() {
    var testEl = document.createElement('div');
    var style = testEl.style;
    if (!('AnimationEvent' in window)) {
      delete EVENT_NAME_MAP.animationend.animation;
    }
    if (!('TransitionEvent' in window)) {
      delete EVENT_NAME_MAP.transitionend.transition;
    }
    for (var baseEventName in EVENT_NAME_MAP) {
      var baseEvents = EVENT_NAME_MAP[baseEventName];
      for (var styleName in baseEvents) {
        if (styleName in style) {
          endEvents.push(baseEvents[styleName]);
          break;
        }
      }
    }
  }
  if (ExecutionEnvironment.canUseDOM) {
    detectEvents();
  }
  function addEventListener(node, eventName, eventListener) {
    node.addEventListener(eventName, eventListener, false);
  }
  function removeEventListener(node, eventName, eventListener) {
    node.removeEventListener(eventName, eventListener, false);
  }
  var ReactTransitionEvents = {
    addEndEventListener: function(node, eventListener) {
      if (endEvents.length === 0) {
        window.setTimeout(eventListener, 0);
        return ;
      }
      endEvents.forEach(function(endEvent) {
        addEventListener(node, endEvent, eventListener);
      });
    },
    removeEndEventListener: function(node, eventListener) {
      if (endEvents.length === 0) {
        return ;
      }
      endEvents.forEach(function(endEvent) {
        removeEventListener(node, endEvent, eventListener);
      });
    }
  };
  module.exports = ReactTransitionEvents;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/cx", [], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  function cx(classNames) {
    if (typeof classNames == 'object') {
      return Object.keys(classNames).filter(function(className) {
        return classNames[className];
      }).join(' ');
    } else {
      return Array.prototype.join.call(arguments, ' ');
    }
  }
  module.exports = cx;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/update", ["./Object.assign", "./keyOf", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var assign = require("./Object.assign");
    var keyOf = require("./keyOf");
    var invariant = require("./invariant");
    function shallowCopy(x) {
      if (Array.isArray(x)) {
        return x.concat();
      } else if (x && typeof x === 'object') {
        return assign(new x.constructor(), x);
      } else {
        return x;
      }
    }
    var COMMAND_PUSH = keyOf({$push: null});
    var COMMAND_UNSHIFT = keyOf({$unshift: null});
    var COMMAND_SPLICE = keyOf({$splice: null});
    var COMMAND_SET = keyOf({$set: null});
    var COMMAND_MERGE = keyOf({$merge: null});
    var COMMAND_APPLY = keyOf({$apply: null});
    var ALL_COMMANDS_LIST = [COMMAND_PUSH, COMMAND_UNSHIFT, COMMAND_SPLICE, COMMAND_SET, COMMAND_MERGE, COMMAND_APPLY];
    var ALL_COMMANDS_SET = {};
    ALL_COMMANDS_LIST.forEach(function(command) {
      ALL_COMMANDS_SET[command] = true;
    });
    function invariantArrayCase(value, spec, command) {
      ("production" !== process.env.NODE_ENV ? invariant(Array.isArray(value), 'update(): expected target of %s to be an array; got %s.', command, value) : invariant(Array.isArray(value)));
      var specValue = spec[command];
      ("production" !== process.env.NODE_ENV ? invariant(Array.isArray(specValue), 'update(): expected spec of %s to be an array; got %s. ' + 'Did you forget to wrap your parameter in an array?', command, specValue) : invariant(Array.isArray(specValue)));
    }
    function update(value, spec) {
      ("production" !== process.env.NODE_ENV ? invariant(typeof spec === 'object', 'update(): You provided a key path to update() that did not contain one ' + 'of %s. Did you forget to include {%s: ...}?', ALL_COMMANDS_LIST.join(', '), COMMAND_SET) : invariant(typeof spec === 'object'));
      if (spec.hasOwnProperty(COMMAND_SET)) {
        ("production" !== process.env.NODE_ENV ? invariant(Object.keys(spec).length === 1, 'Cannot have more than one key in an object with %s', COMMAND_SET) : invariant(Object.keys(spec).length === 1));
        return spec[COMMAND_SET];
      }
      var nextValue = shallowCopy(value);
      if (spec.hasOwnProperty(COMMAND_MERGE)) {
        var mergeObj = spec[COMMAND_MERGE];
        ("production" !== process.env.NODE_ENV ? invariant(mergeObj && typeof mergeObj === 'object', 'update(): %s expects a spec of type \'object\'; got %s', COMMAND_MERGE, mergeObj) : invariant(mergeObj && typeof mergeObj === 'object'));
        ("production" !== process.env.NODE_ENV ? invariant(nextValue && typeof nextValue === 'object', 'update(): %s expects a target of type \'object\'; got %s', COMMAND_MERGE, nextValue) : invariant(nextValue && typeof nextValue === 'object'));
        assign(nextValue, spec[COMMAND_MERGE]);
      }
      if (spec.hasOwnProperty(COMMAND_PUSH)) {
        invariantArrayCase(value, spec, COMMAND_PUSH);
        spec[COMMAND_PUSH].forEach(function(item) {
          nextValue.push(item);
        });
      }
      if (spec.hasOwnProperty(COMMAND_UNSHIFT)) {
        invariantArrayCase(value, spec, COMMAND_UNSHIFT);
        spec[COMMAND_UNSHIFT].forEach(function(item) {
          nextValue.unshift(item);
        });
      }
      if (spec.hasOwnProperty(COMMAND_SPLICE)) {
        ("production" !== process.env.NODE_ENV ? invariant(Array.isArray(value), 'Expected %s target to be an array; got %s', COMMAND_SPLICE, value) : invariant(Array.isArray(value)));
        ("production" !== process.env.NODE_ENV ? invariant(Array.isArray(spec[COMMAND_SPLICE]), 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(Array.isArray(spec[COMMAND_SPLICE])));
        spec[COMMAND_SPLICE].forEach(function(args) {
          ("production" !== process.env.NODE_ENV ? invariant(Array.isArray(args), 'update(): expected spec of %s to be an array of arrays; got %s. ' + 'Did you forget to wrap your parameters in an array?', COMMAND_SPLICE, spec[COMMAND_SPLICE]) : invariant(Array.isArray(args)));
          nextValue.splice.apply(nextValue, args);
        });
      }
      if (spec.hasOwnProperty(COMMAND_APPLY)) {
        ("production" !== process.env.NODE_ENV ? invariant(typeof spec[COMMAND_APPLY] === 'function', 'update(): expected spec of %s to be a function; got %s.', COMMAND_APPLY, spec[COMMAND_APPLY]) : invariant(typeof spec[COMMAND_APPLY] === 'function'));
        nextValue = spec[COMMAND_APPLY](nextValue);
      }
      for (var k in spec) {
        if (!(ALL_COMMANDS_SET.hasOwnProperty(k) && ALL_COMMANDS_SET[k])) {
          nextValue[k] = update(value[k], spec[k]);
        }
      }
      return nextValue;
    }
    module.exports = update;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactTestUtils", ["./EventConstants", "./EventPluginHub", "./EventPropagators", "./React", "./ReactElement", "./ReactBrowserEventEmitter", "./ReactCompositeComponent", "./ReactInstanceHandles", "./ReactInstanceMap", "./ReactMount", "./ReactUpdates", "./SyntheticEvent", "./Object.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var EventConstants = require("./EventConstants");
  var EventPluginHub = require("./EventPluginHub");
  var EventPropagators = require("./EventPropagators");
  var React = require("./React");
  var ReactElement = require("./ReactElement");
  var ReactBrowserEventEmitter = require("./ReactBrowserEventEmitter");
  var ReactCompositeComponent = require("./ReactCompositeComponent");
  var ReactInstanceHandles = require("./ReactInstanceHandles");
  var ReactInstanceMap = require("./ReactInstanceMap");
  var ReactMount = require("./ReactMount");
  var ReactUpdates = require("./ReactUpdates");
  var SyntheticEvent = require("./SyntheticEvent");
  var assign = require("./Object.assign");
  var topLevelTypes = EventConstants.topLevelTypes;
  function Event(suffix) {}
  var ReactTestUtils = {
    renderIntoDocument: function(instance) {
      var div = document.createElement('div');
      return React.render(instance, div);
    },
    isElement: function(element) {
      return ReactElement.isValidElement(element);
    },
    isElementOfType: function(inst, convenienceConstructor) {
      return (ReactElement.isValidElement(inst) && inst.type === convenienceConstructor);
    },
    isDOMComponent: function(inst) {
      return !!(inst && inst.getDOMNode && inst.tagName);
    },
    isDOMComponentElement: function(inst) {
      return !!(inst && ReactElement.isValidElement(inst) && !!inst.tagName);
    },
    isCompositeComponent: function(inst) {
      return typeof inst.render === 'function' && typeof inst.setState === 'function';
    },
    isCompositeComponentWithType: function(inst, type) {
      return !!(ReactTestUtils.isCompositeComponent(inst) && (inst.constructor === type));
    },
    isCompositeComponentElement: function(inst) {
      if (!ReactElement.isValidElement(inst)) {
        return false;
      }
      var prototype = inst.type.prototype;
      return (typeof prototype.render === 'function' && typeof prototype.setState === 'function');
    },
    isCompositeComponentElementWithType: function(inst, type) {
      return !!(ReactTestUtils.isCompositeComponentElement(inst) && (inst.constructor === type));
    },
    getRenderedChildOfCompositeComponent: function(inst) {
      if (!ReactTestUtils.isCompositeComponent(inst)) {
        return null;
      }
      var internalInstance = ReactInstanceMap.get(inst);
      return internalInstance._renderedComponent.getPublicInstance();
    },
    findAllInRenderedTree: function(inst, test) {
      if (!inst) {
        return [];
      }
      var ret = test(inst) ? [inst] : [];
      if (ReactTestUtils.isDOMComponent(inst)) {
        var internalInstance = ReactInstanceMap.get(inst);
        var renderedChildren = internalInstance._renderedComponent._renderedChildren;
        var key;
        for (key in renderedChildren) {
          if (!renderedChildren.hasOwnProperty(key)) {
            continue;
          }
          if (!renderedChildren[key].getPublicInstance) {
            continue;
          }
          ret = ret.concat(ReactTestUtils.findAllInRenderedTree(renderedChildren[key].getPublicInstance(), test));
        }
      } else if (ReactTestUtils.isCompositeComponent(inst)) {
        ret = ret.concat(ReactTestUtils.findAllInRenderedTree(ReactTestUtils.getRenderedChildOfCompositeComponent(inst), test));
      }
      return ret;
    },
    scryRenderedDOMComponentsWithClass: function(root, className) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        var instClassName = inst.props.className;
        return ReactTestUtils.isDOMComponent(inst) && ((instClassName && (' ' + instClassName + ' ').indexOf(' ' + className + ' ') !== -1));
      });
    },
    findRenderedDOMComponentWithClass: function(root, className) {
      var all = ReactTestUtils.scryRenderedDOMComponentsWithClass(root, className);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match ' + '(found: ' + all.length + ') for class:' + className);
      }
      return all[0];
    },
    scryRenderedDOMComponentsWithTag: function(root, tagName) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        return ReactTestUtils.isDOMComponent(inst) && inst.tagName === tagName.toUpperCase();
      });
    },
    findRenderedDOMComponentWithTag: function(root, tagName) {
      var all = ReactTestUtils.scryRenderedDOMComponentsWithTag(root, tagName);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match for tag:' + tagName);
      }
      return all[0];
    },
    scryRenderedComponentsWithType: function(root, componentType) {
      return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
        return ReactTestUtils.isCompositeComponentWithType(inst, componentType);
      });
    },
    findRenderedComponentWithType: function(root, componentType) {
      var all = ReactTestUtils.scryRenderedComponentsWithType(root, componentType);
      if (all.length !== 1) {
        throw new Error('Did not find exactly one match for componentType:' + componentType);
      }
      return all[0];
    },
    mockComponent: function(module, mockTagName) {
      mockTagName = mockTagName || module.mockTagName || "div";
      module.prototype.render.mockImplementation(function() {
        return React.createElement(mockTagName, null, this.props.children);
      });
      return this;
    },
    simulateNativeEventOnNode: function(topLevelType, node, fakeNativeEvent) {
      fakeNativeEvent.target = node;
      ReactBrowserEventEmitter.ReactEventListener.dispatchEvent(topLevelType, fakeNativeEvent);
    },
    simulateNativeEventOnDOMComponent: function(topLevelType, comp, fakeNativeEvent) {
      ReactTestUtils.simulateNativeEventOnNode(topLevelType, comp.getDOMNode(), fakeNativeEvent);
    },
    nativeTouchData: function(x, y) {
      return {touches: [{
          pageX: x,
          pageY: y
        }]};
    },
    createRenderer: function() {
      return new ReactShallowRenderer();
    },
    Simulate: null,
    SimulateNative: {}
  };
  var ReactShallowRenderer = function() {
    this._instance = null;
  };
  ReactShallowRenderer.prototype.getRenderOutput = function() {
    return ((this._instance && this._instance._renderedComponent && this._instance._renderedComponent._currentElement) || null);
  };
  var NoopInternalComponent = function(element) {
    this._currentElement = element;
  };
  NoopInternalComponent.prototype = {
    mountComponent: function() {},
    receiveComponent: function(element) {
      this._currentElement = element;
    },
    unmountComponent: function() {}
  };
  var ShallowComponentWrapper = function() {};
  assign(ShallowComponentWrapper.prototype, ReactCompositeComponent.Mixin, {
    _instantiateReactComponent: function(element) {
      return new NoopInternalComponent(element);
    },
    _replaceNodeWithMarkupByID: function() {},
    _renderValidatedComponent: ReactCompositeComponent.Mixin._renderValidatedComponentWithoutOwnerOrContext
  });
  ReactShallowRenderer.prototype.render = function(element, context) {
    var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    this._render(element, transaction, context);
    ReactUpdates.ReactReconcileTransaction.release(transaction);
  };
  ReactShallowRenderer.prototype._render = function(element, transaction, context) {
    if (!this._instance) {
      var rootID = ReactInstanceHandles.createReactRootID();
      var instance = new ShallowComponentWrapper(element.type);
      instance.construct(element);
      instance.mountComponent(rootID, transaction, context);
      this._instance = instance;
    } else {
      this._instance.receiveComponent(element, transaction, context);
    }
  };
  function makeSimulator(eventType) {
    return function(domComponentOrNode, eventData) {
      var node;
      if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
        node = domComponentOrNode.getDOMNode();
      } else if (domComponentOrNode.tagName) {
        node = domComponentOrNode;
      }
      var fakeNativeEvent = new Event();
      fakeNativeEvent.target = node;
      var event = new SyntheticEvent(ReactBrowserEventEmitter.eventNameDispatchConfigs[eventType], ReactMount.getID(node), fakeNativeEvent);
      assign(event, eventData);
      EventPropagators.accumulateTwoPhaseDispatches(event);
      ReactUpdates.batchedUpdates(function() {
        EventPluginHub.enqueueEvents(event);
        EventPluginHub.processEventQueue();
      });
    };
  }
  function buildSimulators() {
    ReactTestUtils.Simulate = {};
    var eventType;
    for (eventType in ReactBrowserEventEmitter.eventNameDispatchConfigs) {
      ReactTestUtils.Simulate[eventType] = makeSimulator(eventType);
    }
  }
  var oldInjectEventPluginOrder = EventPluginHub.injection.injectEventPluginOrder;
  EventPluginHub.injection.injectEventPluginOrder = function() {
    oldInjectEventPluginOrder.apply(this, arguments);
    buildSimulators();
  };
  var oldInjectEventPlugins = EventPluginHub.injection.injectEventPluginsByName;
  EventPluginHub.injection.injectEventPluginsByName = function() {
    oldInjectEventPlugins.apply(this, arguments);
    buildSimulators();
  };
  buildSimulators();
  function makeNativeSimulator(eventType) {
    return function(domComponentOrNode, nativeEventData) {
      var fakeNativeEvent = new Event(eventType);
      assign(fakeNativeEvent, nativeEventData);
      if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
        ReactTestUtils.simulateNativeEventOnDOMComponent(eventType, domComponentOrNode, fakeNativeEvent);
      } else if (!!domComponentOrNode.tagName) {
        ReactTestUtils.simulateNativeEventOnNode(eventType, domComponentOrNode, fakeNativeEvent);
      }
    };
  }
  var eventType;
  for (eventType in topLevelTypes) {
    var convenienceName = eventType.indexOf('top') === 0 ? eventType.charAt(3).toLowerCase() + eventType.substr(4) : eventType;
    ReactTestUtils.SimulateNative[convenienceName] = makeNativeSimulator(eventType);
  }
  module.exports = ReactTestUtils;
  global.define = __define;
  return module.exports;
});



System.register("app/mortgage-calculator-results", ["react", "app/numeric-input"], function (_export) {
  "use strict";

  var React, NumericInput, _prototypeProperties, _inherits, _classCallCheck, MortgageCalculatorResultsTable, MortgageCalculatorResultRow;
  return {
    setters: [function (_react) {
      React = _react["default"];
    }, function (_appNumericInput) {
      NumericInput = _appNumericInput.NumericInput;
    }],
    execute: function () {
      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      MortgageCalculatorResultsTable = _export("MortgageCalculatorResultsTable", (function (_React$Component) {
        function MortgageCalculatorResultsTable() {
          _classCallCheck(this, MortgageCalculatorResultsTable);

          if (_React$Component != null) {
            _React$Component.apply(this, arguments);
          }
        }

        _inherits(MortgageCalculatorResultsTable, _React$Component);

        _prototypeProperties(MortgageCalculatorResultsTable, null, {
          mortgageSize: {
            get: function () {
              var delta = this.props.mortgageInfo.propertyPrice - this.props.mortgageInfo.deposit;
              return Math.max(delta, 0);
            },
            configurable: true
          },
          totalRepayment: {
            get: function () {
              return this.monthlyRepayment * this.props.mortgageInfo.repaymentTerm * 12;
            },
            configurable: true
          },
          totalCost: {
            get: function () {
              return this.totalRepayment - this.mortgageSize;
            },
            configurable: true
          },
          monthlyRepayment: {
            get: function () {
              var monthlyInterest = this.props.mortgageInfo.interest / 100 / 12;
              var numPeriods = this.props.mortgageInfo.repaymentTerm * 12;
              return this.mortgageSize * (monthlyInterest * Math.pow(1 + monthlyInterest, numPeriods) / (Math.pow(1 + monthlyInterest, numPeriods) - 1));
            },
            configurable: true
          },
          ltv: {
            get: function () {
              return this.mortgageSize / this.props.mortgageInfo.propertyPrice * 100;
            },
            configurable: true
          },
          render: {
            value: function render() {
              return React.createElement(
                "tbody",
                { className: "results" },
                React.createElement(
                  "tr",
                  null,
                  React.createElement("th", { colSpan: "3" })
                ),
                React.createElement(MortgageCalculatorResultRow, { name: "Mortgage size",
                  value: this.mortgageSize, unit: "£" }),
                React.createElement(MortgageCalculatorResultRow, { name: "Total repayment",
                  value: this.totalRepayment, unit: "£" }),
                React.createElement(MortgageCalculatorResultRow, { name: "Lifetime cost",
                  value: this.totalCost, unit: "£" }),
                React.createElement(MortgageCalculatorResultRow, { name: "Monthly repayment", dp: "2",
                  value: this.monthlyRepayment, unit: "£" }),
                React.createElement(MortgageCalculatorResultRow, { name: "LTV", value: this.ltv, unit: "%" })
              );
            },
            writable: true,
            configurable: true
          }
        });

        return MortgageCalculatorResultsTable;
      })(React.Component));
      MortgageCalculatorResultRow = (function (_React$Component2) {
        function MortgageCalculatorResultRow() {
          _classCallCheck(this, MortgageCalculatorResultRow);

          if (_React$Component2 != null) {
            _React$Component2.apply(this, arguments);
          }
        }

        _inherits(MortgageCalculatorResultRow, _React$Component2);

        _prototypeProperties(MortgageCalculatorResultRow, null, {
          render: {
            value: function render() {
              return React.createElement(
                "tr",
                null,
                React.createElement(
                  "td",
                  null,
                  this.props.name
                ),
                React.createElement(
                  "td",
                  null,
                  React.createElement(NumericInput, { readOnly: true, value: this.props.value, dp: this.props.dp })
                ),
                React.createElement(
                  "td",
                  null,
                  this.props.unit
                )
              );
            },
            writable: true,
            configurable: true
          }
        });

        return MortgageCalculatorResultRow;
      })(React.Component);
    }
  };
});
System.register("npm:process@0.10.0", ["npm:process@0.10.0/browser"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:process@0.10.0/browser");
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/warning", ["./emptyFunction", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var emptyFunction = require("./emptyFunction");
    var warning = emptyFunction;
    if ("production" !== process.env.NODE_ENV) {
      warning = function(condition, format) {
        for (var args = [],
            $__0 = 2,
            $__1 = arguments.length; $__0 < $__1; $__0++)
          args.push(arguments[$__0]);
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (format.indexOf('Failed CompositeComponent proptype check. ') === 0) {
          return ;
        }
        if (!condition) {
          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function() {
            return args[argIndex++];
          });
          console.warn(message);
          try {
            throw new Error(message);
          } catch (x) {}
        }
      };
    }
    module.exports = warning;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/EventConstants", ["./keyMirror"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var keyMirror = require("./keyMirror");
  var PropagationPhases = keyMirror({
    bubbled: null,
    captured: null
  });
  var topLevelTypes = keyMirror({
    topBlur: null,
    topChange: null,
    topClick: null,
    topCompositionEnd: null,
    topCompositionStart: null,
    topCompositionUpdate: null,
    topContextMenu: null,
    topCopy: null,
    topCut: null,
    topDoubleClick: null,
    topDrag: null,
    topDragEnd: null,
    topDragEnter: null,
    topDragExit: null,
    topDragLeave: null,
    topDragOver: null,
    topDragStart: null,
    topDrop: null,
    topError: null,
    topFocus: null,
    topInput: null,
    topKeyDown: null,
    topKeyPress: null,
    topKeyUp: null,
    topLoad: null,
    topMouseDown: null,
    topMouseMove: null,
    topMouseOut: null,
    topMouseOver: null,
    topMouseUp: null,
    topPaste: null,
    topReset: null,
    topScroll: null,
    topSelectionChange: null,
    topSubmit: null,
    topTextInput: null,
    topTouchCancel: null,
    topTouchEnd: null,
    topTouchMove: null,
    topTouchStart: null,
    topWheel: null
  });
  var EventConstants = {
    topLevelTypes: topLevelTypes,
    PropagationPhases: PropagationPhases
  };
  module.exports = EventConstants;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactContext", ["./Object.assign", "./emptyObject", "./monitorCodeUse"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var assign = require("./Object.assign");
  var emptyObject = require("./emptyObject");
  var monitorCodeUse = require("./monitorCodeUse");
  var ReactContext = {
    current: emptyObject,
    withContext: function(newContext, scopedCallback) {
      monitorCodeUse('react_with_context', {newContext: newContext});
      var result;
      var previousContext = ReactContext.current;
      ReactContext.current = assign({}, previousContext, newContext);
      try {
        result = scopedCallback();
      } finally {
        ReactContext.current = previousContext;
      }
      return result;
    }
  };
  module.exports = ReactContext;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactInstanceHandles", ["./ReactRootIndex", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactRootIndex = require("./ReactRootIndex");
    var invariant = require("./invariant");
    var SEPARATOR = '.';
    var SEPARATOR_LENGTH = SEPARATOR.length;
    var MAX_TREE_DEPTH = 100;
    function getReactRootIDString(index) {
      return SEPARATOR + index.toString(36);
    }
    function isBoundary(id, index) {
      return id.charAt(index) === SEPARATOR || index === id.length;
    }
    function isValidID(id) {
      return id === '' || (id.charAt(0) === SEPARATOR && id.charAt(id.length - 1) !== SEPARATOR);
    }
    function isAncestorIDOf(ancestorID, descendantID) {
      return (descendantID.indexOf(ancestorID) === 0 && isBoundary(descendantID, ancestorID.length));
    }
    function getParentID(id) {
      return id ? id.substr(0, id.lastIndexOf(SEPARATOR)) : '';
    }
    function getNextDescendantID(ancestorID, destinationID) {
      ("production" !== process.env.NODE_ENV ? invariant(isValidID(ancestorID) && isValidID(destinationID), 'getNextDescendantID(%s, %s): Received an invalid React DOM ID.', ancestorID, destinationID) : invariant(isValidID(ancestorID) && isValidID(destinationID)));
      ("production" !== process.env.NODE_ENV ? invariant(isAncestorIDOf(ancestorID, destinationID), 'getNextDescendantID(...): React has made an invalid assumption about ' + 'the DOM hierarchy. Expected `%s` to be an ancestor of `%s`.', ancestorID, destinationID) : invariant(isAncestorIDOf(ancestorID, destinationID)));
      if (ancestorID === destinationID) {
        return ancestorID;
      }
      var start = ancestorID.length + SEPARATOR_LENGTH;
      var i;
      for (i = start; i < destinationID.length; i++) {
        if (isBoundary(destinationID, i)) {
          break;
        }
      }
      return destinationID.substr(0, i);
    }
    function getFirstCommonAncestorID(oneID, twoID) {
      var minLength = Math.min(oneID.length, twoID.length);
      if (minLength === 0) {
        return '';
      }
      var lastCommonMarkerIndex = 0;
      for (var i = 0; i <= minLength; i++) {
        if (isBoundary(oneID, i) && isBoundary(twoID, i)) {
          lastCommonMarkerIndex = i;
        } else if (oneID.charAt(i) !== twoID.charAt(i)) {
          break;
        }
      }
      var longestCommonID = oneID.substr(0, lastCommonMarkerIndex);
      ("production" !== process.env.NODE_ENV ? invariant(isValidID(longestCommonID), 'getFirstCommonAncestorID(%s, %s): Expected a valid React DOM ID: %s', oneID, twoID, longestCommonID) : invariant(isValidID(longestCommonID)));
      return longestCommonID;
    }
    function traverseParentPath(start, stop, cb, arg, skipFirst, skipLast) {
      start = start || '';
      stop = stop || '';
      ("production" !== process.env.NODE_ENV ? invariant(start !== stop, 'traverseParentPath(...): Cannot traverse from and to the same ID, `%s`.', start) : invariant(start !== stop));
      var traverseUp = isAncestorIDOf(stop, start);
      ("production" !== process.env.NODE_ENV ? invariant(traverseUp || isAncestorIDOf(start, stop), 'traverseParentPath(%s, %s, ...): Cannot traverse from two IDs that do ' + 'not have a parent path.', start, stop) : invariant(traverseUp || isAncestorIDOf(start, stop)));
      var depth = 0;
      var traverse = traverseUp ? getParentID : getNextDescendantID;
      for (var id = start; ; id = traverse(id, stop)) {
        var ret;
        if ((!skipFirst || id !== start) && (!skipLast || id !== stop)) {
          ret = cb(id, traverseUp, arg);
        }
        if (ret === false || id === stop) {
          break;
        }
        ("production" !== process.env.NODE_ENV ? invariant(depth++ < MAX_TREE_DEPTH, 'traverseParentPath(%s, %s, ...): Detected an infinite loop while ' + 'traversing the React DOM ID tree. This may be due to malformed IDs: %s', start, stop) : invariant(depth++ < MAX_TREE_DEPTH));
      }
    }
    var ReactInstanceHandles = {
      createReactRootID: function() {
        return getReactRootIDString(ReactRootIndex.createReactRootIndex());
      },
      createReactID: function(rootID, name) {
        return rootID + name;
      },
      getReactRootIDFromNodeID: function(id) {
        if (id && id.charAt(0) === SEPARATOR && id.length > 1) {
          var index = id.indexOf(SEPARATOR, 1);
          return index > -1 ? id.substr(0, index) : id;
        }
        return null;
      },
      traverseEnterLeave: function(leaveID, enterID, cb, upArg, downArg) {
        var ancestorID = getFirstCommonAncestorID(leaveID, enterID);
        if (ancestorID !== leaveID) {
          traverseParentPath(leaveID, ancestorID, cb, upArg, false, true);
        }
        if (ancestorID !== enterID) {
          traverseParentPath(ancestorID, enterID, cb, downArg, true, false);
        }
      },
      traverseTwoPhase: function(targetID, cb, arg) {
        if (targetID) {
          traverseParentPath('', targetID, cb, arg, true, false);
          traverseParentPath(targetID, '', cb, arg, false, true);
        }
      },
      traverseAncestors: function(targetID, cb, arg) {
        traverseParentPath('', targetID, cb, arg, true, false);
      },
      _getFirstCommonAncestorID: getFirstCommonAncestorID,
      _getNextDescendantID: getNextDescendantID,
      isAncestorIDOf: isAncestorIDOf,
      SEPARATOR: SEPARATOR
    };
    module.exports = ReactInstanceHandles;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactUpdates", ["./CallbackQueue", "./PooledClass", "./ReactCurrentOwner", "./ReactPerf", "./Transaction", "./Object.assign", "./invariant", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var CallbackQueue = require("./CallbackQueue");
    var PooledClass = require("./PooledClass");
    var ReactCurrentOwner = require("./ReactCurrentOwner");
    var ReactPerf = require("./ReactPerf");
    var Transaction = require("./Transaction");
    var assign = require("./Object.assign");
    var invariant = require("./invariant");
    var warning = require("./warning");
    var dirtyComponents = [];
    var asapCallbackQueue = CallbackQueue.getPooled();
    var asapEnqueued = false;
    var batchingStrategy = null;
    function ensureInjected() {
      ("production" !== process.env.NODE_ENV ? invariant(ReactUpdates.ReactReconcileTransaction && batchingStrategy, 'ReactUpdates: must inject a reconcile transaction class and batching ' + 'strategy') : invariant(ReactUpdates.ReactReconcileTransaction && batchingStrategy));
    }
    var NESTED_UPDATES = {
      initialize: function() {
        this.dirtyComponentsLength = dirtyComponents.length;
      },
      close: function() {
        if (this.dirtyComponentsLength !== dirtyComponents.length) {
          dirtyComponents.splice(0, this.dirtyComponentsLength);
          flushBatchedUpdates();
        } else {
          dirtyComponents.length = 0;
        }
      }
    };
    var UPDATE_QUEUEING = {
      initialize: function() {
        this.callbackQueue.reset();
      },
      close: function() {
        this.callbackQueue.notifyAll();
      }
    };
    var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];
    function ReactUpdatesFlushTransaction() {
      this.reinitializeTransaction();
      this.dirtyComponentsLength = null;
      this.callbackQueue = CallbackQueue.getPooled();
      this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    }
    assign(ReactUpdatesFlushTransaction.prototype, Transaction.Mixin, {
      getTransactionWrappers: function() {
        return TRANSACTION_WRAPPERS;
      },
      destructor: function() {
        this.dirtyComponentsLength = null;
        CallbackQueue.release(this.callbackQueue);
        this.callbackQueue = null;
        ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
        this.reconcileTransaction = null;
      },
      perform: function(method, scope, a) {
        return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
      }
    });
    PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);
    function batchedUpdates(callback, a, b, c, d) {
      ensureInjected();
      batchingStrategy.batchedUpdates(callback, a, b, c, d);
    }
    function mountOrderComparator(c1, c2) {
      return c1._mountOrder - c2._mountOrder;
    }
    function runBatchedUpdates(transaction) {
      var len = transaction.dirtyComponentsLength;
      ("production" !== process.env.NODE_ENV ? invariant(len === dirtyComponents.length, 'Expected flush transaction\'s stored dirty-components length (%s) to ' + 'match dirty-components array length (%s).', len, dirtyComponents.length) : invariant(len === dirtyComponents.length));
      dirtyComponents.sort(mountOrderComparator);
      for (var i = 0; i < len; i++) {
        var component = dirtyComponents[i];
        var callbacks = component._pendingCallbacks;
        component._pendingCallbacks = null;
        component.performUpdateIfNecessary(transaction.reconcileTransaction);
        if (callbacks) {
          for (var j = 0; j < callbacks.length; j++) {
            transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
          }
        }
      }
    }
    var flushBatchedUpdates = function() {
      while (dirtyComponents.length || asapEnqueued) {
        if (dirtyComponents.length) {
          var transaction = ReactUpdatesFlushTransaction.getPooled();
          transaction.perform(runBatchedUpdates, null, transaction);
          ReactUpdatesFlushTransaction.release(transaction);
        }
        if (asapEnqueued) {
          asapEnqueued = false;
          var queue = asapCallbackQueue;
          asapCallbackQueue = CallbackQueue.getPooled();
          queue.notifyAll();
          CallbackQueue.release(queue);
        }
      }
    };
    flushBatchedUpdates = ReactPerf.measure('ReactUpdates', 'flushBatchedUpdates', flushBatchedUpdates);
    function enqueueUpdate(component) {
      ensureInjected();
      ("production" !== process.env.NODE_ENV ? warning(ReactCurrentOwner.current == null, 'enqueueUpdate(): Render methods should be a pure function of props ' + 'and state; triggering nested component updates from render is not ' + 'allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate.') : null);
      if (!batchingStrategy.isBatchingUpdates) {
        batchingStrategy.batchedUpdates(enqueueUpdate, component);
        return ;
      }
      dirtyComponents.push(component);
    }
    function asap(callback, context) {
      ("production" !== process.env.NODE_ENV ? invariant(batchingStrategy.isBatchingUpdates, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context where' + 'updates are not being batched.') : invariant(batchingStrategy.isBatchingUpdates));
      asapCallbackQueue.enqueue(callback, context);
      asapEnqueued = true;
    }
    var ReactUpdatesInjection = {
      injectReconcileTransaction: function(ReconcileTransaction) {
        ("production" !== process.env.NODE_ENV ? invariant(ReconcileTransaction, 'ReactUpdates: must provide a reconcile transaction class') : invariant(ReconcileTransaction));
        ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
      },
      injectBatchingStrategy: function(_batchingStrategy) {
        ("production" !== process.env.NODE_ENV ? invariant(_batchingStrategy, 'ReactUpdates: must provide a batching strategy') : invariant(_batchingStrategy));
        ("production" !== process.env.NODE_ENV ? invariant(typeof _batchingStrategy.batchedUpdates === 'function', 'ReactUpdates: must provide a batchedUpdates() function') : invariant(typeof _batchingStrategy.batchedUpdates === 'function'));
        ("production" !== process.env.NODE_ENV ? invariant(typeof _batchingStrategy.isBatchingUpdates === 'boolean', 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : invariant(typeof _batchingStrategy.isBatchingUpdates === 'boolean'));
        batchingStrategy = _batchingStrategy;
      }
    };
    var ReactUpdates = {
      ReactReconcileTransaction: null,
      batchedUpdates: batchedUpdates,
      enqueueUpdate: enqueueUpdate,
      flushBatchedUpdates: flushBatchedUpdates,
      injection: ReactUpdatesInjection,
      asap: asap
    };
    module.exports = ReactUpdates;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactClass", ["./ReactComponent", "./ReactElement", "./ReactErrorUtils", "./ReactInstanceMap", "./ReactLifeCycle", "./ReactPropTypeLocations", "./ReactPropTypeLocationNames", "./ReactUpdateQueue", "./Object.assign", "./invariant", "./keyMirror", "./keyOf", "./monitorCodeUse", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactComponent = require("./ReactComponent");
    var ReactElement = require("./ReactElement");
    var ReactErrorUtils = require("./ReactErrorUtils");
    var ReactInstanceMap = require("./ReactInstanceMap");
    var ReactLifeCycle = require("./ReactLifeCycle");
    var ReactPropTypeLocations = require("./ReactPropTypeLocations");
    var ReactPropTypeLocationNames = require("./ReactPropTypeLocationNames");
    var ReactUpdateQueue = require("./ReactUpdateQueue");
    var assign = require("./Object.assign");
    var invariant = require("./invariant");
    var keyMirror = require("./keyMirror");
    var keyOf = require("./keyOf");
    var monitorCodeUse = require("./monitorCodeUse");
    var warning = require("./warning");
    var MIXINS_KEY = keyOf({mixins: null});
    var SpecPolicy = keyMirror({
      DEFINE_ONCE: null,
      DEFINE_MANY: null,
      OVERRIDE_BASE: null,
      DEFINE_MANY_MERGED: null
    });
    var injectedMixins = [];
    var ReactClassInterface = {
      mixins: SpecPolicy.DEFINE_MANY,
      statics: SpecPolicy.DEFINE_MANY,
      propTypes: SpecPolicy.DEFINE_MANY,
      contextTypes: SpecPolicy.DEFINE_MANY,
      childContextTypes: SpecPolicy.DEFINE_MANY,
      getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,
      getInitialState: SpecPolicy.DEFINE_MANY_MERGED,
      getChildContext: SpecPolicy.DEFINE_MANY_MERGED,
      render: SpecPolicy.DEFINE_ONCE,
      componentWillMount: SpecPolicy.DEFINE_MANY,
      componentDidMount: SpecPolicy.DEFINE_MANY,
      componentWillReceiveProps: SpecPolicy.DEFINE_MANY,
      shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,
      componentWillUpdate: SpecPolicy.DEFINE_MANY,
      componentDidUpdate: SpecPolicy.DEFINE_MANY,
      componentWillUnmount: SpecPolicy.DEFINE_MANY,
      updateComponent: SpecPolicy.OVERRIDE_BASE
    };
    var RESERVED_SPEC_KEYS = {
      displayName: function(Constructor, displayName) {
        Constructor.displayName = displayName;
      },
      mixins: function(Constructor, mixins) {
        if (mixins) {
          for (var i = 0; i < mixins.length; i++) {
            mixSpecIntoComponent(Constructor, mixins[i]);
          }
        }
      },
      childContextTypes: function(Constructor, childContextTypes) {
        if ("production" !== process.env.NODE_ENV) {
          validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
        }
        Constructor.childContextTypes = assign({}, Constructor.childContextTypes, childContextTypes);
      },
      contextTypes: function(Constructor, contextTypes) {
        if ("production" !== process.env.NODE_ENV) {
          validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
        }
        Constructor.contextTypes = assign({}, Constructor.contextTypes, contextTypes);
      },
      getDefaultProps: function(Constructor, getDefaultProps) {
        if (Constructor.getDefaultProps) {
          Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
        } else {
          Constructor.getDefaultProps = getDefaultProps;
        }
      },
      propTypes: function(Constructor, propTypes) {
        if ("production" !== process.env.NODE_ENV) {
          validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
        }
        Constructor.propTypes = assign({}, Constructor.propTypes, propTypes);
      },
      statics: function(Constructor, statics) {
        mixStaticSpecIntoComponent(Constructor, statics);
      }
    };
    function validateTypeDef(Constructor, typeDef, location) {
      for (var propName in typeDef) {
        if (typeDef.hasOwnProperty(propName)) {
          ("production" !== process.env.NODE_ENV ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : null);
        }
      }
    }
    function validateMethodOverride(proto, name) {
      var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;
      if (ReactClassMixin.hasOwnProperty(name)) {
        ("production" !== process.env.NODE_ENV ? invariant(specPolicy === SpecPolicy.OVERRIDE_BASE, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(specPolicy === SpecPolicy.OVERRIDE_BASE));
      }
      if (proto.hasOwnProperty(name)) {
        ("production" !== process.env.NODE_ENV ? invariant(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED));
      }
    }
    function mixSpecIntoComponent(Constructor, spec) {
      if (!spec) {
        return ;
      }
      ("production" !== process.env.NODE_ENV ? invariant(typeof spec !== 'function', 'ReactClass: You\'re attempting to ' + 'use a component class as a mixin. Instead, just use a regular object.') : invariant(typeof spec !== 'function'));
      ("production" !== process.env.NODE_ENV ? invariant(!ReactElement.isValidElement(spec), 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(!ReactElement.isValidElement(spec)));
      var proto = Constructor.prototype;
      if (spec.hasOwnProperty(MIXINS_KEY)) {
        RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
      }
      for (var name in spec) {
        if (!spec.hasOwnProperty(name)) {
          continue;
        }
        if (name === MIXINS_KEY) {
          continue;
        }
        var property = spec[name];
        validateMethodOverride(proto, name);
        if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
          RESERVED_SPEC_KEYS[name](Constructor, property);
        } else {
          var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
          var isAlreadyDefined = proto.hasOwnProperty(name);
          var markedDontBind = property && property.__reactDontBind;
          var isFunction = typeof property === 'function';
          var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && !markedDontBind;
          if (shouldAutoBind) {
            if (!proto.__reactAutoBindMap) {
              proto.__reactAutoBindMap = {};
            }
            proto.__reactAutoBindMap[name] = property;
            proto[name] = property;
          } else {
            if (isAlreadyDefined) {
              var specPolicy = ReactClassInterface[name];
              ("production" !== process.env.NODE_ENV ? invariant(isReactClassMethod && ((specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)), 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(isReactClassMethod && ((specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY))));
              if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
                proto[name] = createMergedResultFunction(proto[name], property);
              } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
                proto[name] = createChainedFunction(proto[name], property);
              }
            } else {
              proto[name] = property;
              if ("production" !== process.env.NODE_ENV) {
                if (typeof property === 'function' && spec.displayName) {
                  proto[name].displayName = spec.displayName + '_' + name;
                }
              }
            }
          }
        }
      }
    }
    function mixStaticSpecIntoComponent(Constructor, statics) {
      if (!statics) {
        return ;
      }
      for (var name in statics) {
        var property = statics[name];
        if (!statics.hasOwnProperty(name)) {
          continue;
        }
        var isReserved = name in RESERVED_SPEC_KEYS;
        ("production" !== process.env.NODE_ENV ? invariant(!isReserved, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(!isReserved));
        var isInherited = name in Constructor;
        ("production" !== process.env.NODE_ENV ? invariant(!isInherited, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(!isInherited));
        Constructor[name] = property;
      }
    }
    function mergeIntoWithNoDuplicateKeys(one, two) {
      ("production" !== process.env.NODE_ENV ? invariant(one && two && typeof one === 'object' && typeof two === 'object', 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(one && two && typeof one === 'object' && typeof two === 'object'));
      for (var key in two) {
        if (two.hasOwnProperty(key)) {
          ("production" !== process.env.NODE_ENV ? invariant(one[key] === undefined, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(one[key] === undefined));
          one[key] = two[key];
        }
      }
      return one;
    }
    function createMergedResultFunction(one, two) {
      return function mergedResult() {
        var a = one.apply(this, arguments);
        var b = two.apply(this, arguments);
        if (a == null) {
          return b;
        } else if (b == null) {
          return a;
        }
        var c = {};
        mergeIntoWithNoDuplicateKeys(c, a);
        mergeIntoWithNoDuplicateKeys(c, b);
        return c;
      };
    }
    function createChainedFunction(one, two) {
      return function chainedFunction() {
        one.apply(this, arguments);
        two.apply(this, arguments);
      };
    }
    function bindAutoBindMethod(component, method) {
      var boundMethod = method.bind(component);
      if ("production" !== process.env.NODE_ENV) {
        boundMethod.__reactBoundContext = component;
        boundMethod.__reactBoundMethod = method;
        boundMethod.__reactBoundArguments = null;
        var componentName = component.constructor.displayName;
        var _bind = boundMethod.bind;
        boundMethod.bind = function(newThis) {
          for (var args = [],
              $__0 = 1,
              $__1 = arguments.length; $__0 < $__1; $__0++)
            args.push(arguments[$__0]);
          if (newThis !== component && newThis !== null) {
            monitorCodeUse('react_bind_warning', {component: componentName});
            console.warn('bind(): React component methods may only be bound to the ' + 'component instance. See ' + componentName);
          } else if (!args.length) {
            monitorCodeUse('react_bind_warning', {component: componentName});
            console.warn('bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See ' + componentName);
            return boundMethod;
          }
          var reboundMethod = _bind.apply(boundMethod, arguments);
          reboundMethod.__reactBoundContext = component;
          reboundMethod.__reactBoundMethod = method;
          reboundMethod.__reactBoundArguments = args;
          return reboundMethod;
        };
      }
      return boundMethod;
    }
    function bindAutoBindMethods(component) {
      for (var autoBindKey in component.__reactAutoBindMap) {
        if (component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
          var method = component.__reactAutoBindMap[autoBindKey];
          component[autoBindKey] = bindAutoBindMethod(component, ReactErrorUtils.guard(method, component.constructor.displayName + '.' + autoBindKey));
        }
      }
    }
    var typeDeprecationDescriptor = {
      enumerable: false,
      get: function() {
        var displayName = this.displayName || this.name || 'Component';
        ("production" !== process.env.NODE_ENV ? warning(false, '%s.type is deprecated. Use %s directly to access the class.', displayName, displayName) : null);
        return this;
      }
    };
    var ReactClassMixin = {
      replaceState: function(newState, callback) {
        ReactUpdateQueue.enqueueReplaceState(this, newState);
        if (callback) {
          ReactUpdateQueue.enqueueCallback(this, callback);
        }
      },
      isMounted: function() {
        var internalInstance = ReactInstanceMap.get(this);
        return (internalInstance && internalInstance !== ReactLifeCycle.currentlyMountingInstance);
      },
      setProps: function(partialProps, callback) {
        ReactUpdateQueue.enqueueSetProps(this, partialProps);
        if (callback) {
          ReactUpdateQueue.enqueueCallback(this, callback);
        }
      },
      replaceProps: function(newProps, callback) {
        ReactUpdateQueue.enqueueReplaceProps(this, newProps);
        if (callback) {
          ReactUpdateQueue.enqueueCallback(this, callback);
        }
      }
    };
    var ReactClassComponent = function() {};
    assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);
    var ReactClass = {
      createClass: function(spec) {
        var Constructor = function(props, context) {
          if (this.__reactAutoBindMap) {
            bindAutoBindMethods(this);
          }
          this.props = props;
          this.context = context;
          this.state = null;
          var initialState = this.getInitialState ? this.getInitialState() : null;
          if ("production" !== process.env.NODE_ENV) {
            if (typeof initialState === 'undefined' && this.getInitialState._isMockFunction) {
              initialState = null;
            }
          }
          ("production" !== process.env.NODE_ENV ? invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : invariant(typeof initialState === 'object' && !Array.isArray(initialState)));
          this.state = initialState;
        };
        Constructor.prototype = new ReactClassComponent();
        Constructor.prototype.constructor = Constructor;
        injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
        mixSpecIntoComponent(Constructor, spec);
        if (Constructor.getDefaultProps) {
          Constructor.defaultProps = Constructor.getDefaultProps();
        }
        if ("production" !== process.env.NODE_ENV) {
          if (Constructor.getDefaultProps) {
            Constructor.getDefaultProps.isReactClassApproved = {};
          }
          if (Constructor.prototype.getInitialState) {
            Constructor.prototype.getInitialState.isReactClassApproved = {};
          }
        }
        ("production" !== process.env.NODE_ENV ? invariant(Constructor.prototype.render, 'createClass(...): Class specification must implement a `render` method.') : invariant(Constructor.prototype.render));
        if ("production" !== process.env.NODE_ENV) {
          if (Constructor.prototype.componentShouldUpdate) {
            monitorCodeUse('react_component_should_update_warning', {component: spec.displayName});
            console.warn((spec.displayName || 'A component') + ' has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.');
          }
        }
        for (var methodName in ReactClassInterface) {
          if (!Constructor.prototype[methodName]) {
            Constructor.prototype[methodName] = null;
          }
        }
        Constructor.type = Constructor;
        if ("production" !== process.env.NODE_ENV) {
          if (Object.defineProperty) {
            Object.defineProperty(Constructor, 'type', typeDeprecationDescriptor);
          }
        }
        return Constructor;
      },
      injection: {injectMixin: function(mixin) {
          injectedMixins.push(mixin);
        }}
    };
    module.exports = ReactClass;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactElementValidator", ["./ReactElement", "./ReactPropTypeLocations", "./ReactPropTypeLocationNames", "./ReactCurrentOwner", "./ReactNativeComponent", "./getIteratorFn", "./monitorCodeUse", "./invariant", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactElement = require("./ReactElement");
    var ReactPropTypeLocations = require("./ReactPropTypeLocations");
    var ReactPropTypeLocationNames = require("./ReactPropTypeLocationNames");
    var ReactCurrentOwner = require("./ReactCurrentOwner");
    var ReactNativeComponent = require("./ReactNativeComponent");
    var getIteratorFn = require("./getIteratorFn");
    var monitorCodeUse = require("./monitorCodeUse");
    var invariant = require("./invariant");
    var warning = require("./warning");
    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = ReactCurrentOwner.current.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }
    var ownerHasKeyUseWarning = {
      'react_key_warning': {},
      'react_numeric_key_warning': {}
    };
    var ownerHasMonitoredObjectMap = {};
    var loggedTypeFailures = {};
    var NUMERIC_PROPERTY_REGEX = /^\d+$/;
    function getName(instance) {
      var publicInstance = instance && instance.getPublicInstance();
      if (!publicInstance) {
        return undefined;
      }
      var constructor = publicInstance.constructor;
      if (!constructor) {
        return undefined;
      }
      return constructor.displayName || constructor.name || undefined;
    }
    function getCurrentOwnerDisplayName() {
      var current = ReactCurrentOwner.current;
      return (current && getName(current) || undefined);
    }
    function validateExplicitKey(element, parentType) {
      if (element._store.validated || element.key != null) {
        return ;
      }
      element._store.validated = true;
      warnAndMonitorForKeyUse('react_key_warning', 'Each child in an array or iterator should have a unique "key" prop.', element, parentType);
    }
    function validatePropertyKey(name, element, parentType) {
      if (!NUMERIC_PROPERTY_REGEX.test(name)) {
        return ;
      }
      warnAndMonitorForKeyUse('react_numeric_key_warning', 'Child objects should have non-numeric keys so ordering is preserved.', element, parentType);
    }
    function warnAndMonitorForKeyUse(warningID, message, element, parentType) {
      var ownerName = getCurrentOwnerDisplayName();
      var parentName = parentType.displayName || parentType.name;
      var useName = ownerName || parentName;
      var memoizer = ownerHasKeyUseWarning[warningID];
      if (memoizer.hasOwnProperty(useName)) {
        return ;
      }
      memoizer[useName] = true;
      message += ownerName ? (" Check the render method of " + ownerName + ".") : (" Check the React.render call using <" + parentName + ">.");
      var childOwnerName = null;
      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        childOwnerName = getName(element._owner);
        message += (" It was passed a child from " + childOwnerName + ".");
      }
      message += ' See http://fb.me/react-warning-keys for more information.';
      monitorCodeUse(warningID, {
        component: useName,
        componentOwner: childOwnerName
      });
      console.warn(message);
    }
    function monitorUseOfObjectMap() {
      var currentName = getCurrentOwnerDisplayName() || '';
      if (ownerHasMonitoredObjectMap.hasOwnProperty(currentName)) {
        return ;
      }
      ownerHasMonitoredObjectMap[currentName] = true;
      monitorCodeUse('react_object_map_children');
    }
    function validateChildKeys(node, parentType) {
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];
          if (ReactElement.isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (ReactElement.isValidElement(node)) {
        node._store.validated = true;
      } else if (node) {
        var iteratorFn = getIteratorFn(node);
        if (iteratorFn && iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;
          while (!(step = iterator.next()).done) {
            if (ReactElement.isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        } else if (typeof node === 'object') {
          monitorUseOfObjectMap();
          for (var key in node) {
            if (node.hasOwnProperty(key)) {
              validatePropertyKey(key, node[key], parentType);
            }
          }
        }
      }
    }
    function checkPropTypes(componentName, propTypes, props, location) {
      for (var propName in propTypes) {
        if (propTypes.hasOwnProperty(propName)) {
          var error;
          try {
            ("production" !== process.env.NODE_ENV ? invariant(typeof propTypes[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(typeof propTypes[propName] === 'function'));
            error = propTypes[propName](props, propName, componentName, location);
          } catch (ex) {
            error = ex;
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = true;
            var addendum = getDeclarationErrorAddendum(this);
            ("production" !== process.env.NODE_ENV ? warning(false, error.message + addendum) : null);
          }
        }
      }
    }
    var warnedPropsMutations = {};
    function warnForPropsMutation(propName, element) {
      var type = element.type;
      var elementName = typeof type === 'string' ? type : type.displayName;
      var ownerName = element._owner ? element._owner.getPublicInstance().constructor.displayName : null;
      var warningKey = propName + '|' + elementName + '|' + ownerName;
      if (warnedPropsMutations.hasOwnProperty(warningKey)) {
        return ;
      }
      warnedPropsMutations[warningKey] = true;
      var elementInfo = '';
      if (elementName) {
        elementInfo = ' <' + elementName + ' />';
      }
      var ownerInfo = '';
      if (ownerName) {
        ownerInfo = ' The element was created by ' + ownerName + '.';
      }
      ("production" !== process.env.NODE_ENV ? warning(false, 'Don\'t set .props.%s of the React component%s. ' + 'Instead, specify the correct value when ' + 'initially creating the element.%s', propName, elementInfo, ownerInfo) : null);
    }
    function checkAndWarnForMutatedProps(element) {
      if (!element._store) {
        return ;
      }
      var originalProps = element._store.originalProps;
      var props = element.props;
      for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
          if (!originalProps.hasOwnProperty(propName) || originalProps[propName] !== props[propName]) {
            warnForPropsMutation(propName, element);
            originalProps[propName] = props[propName];
          }
        }
      }
    }
    var ReactElementValidator = {
      checkAndWarnForMutatedProps: checkAndWarnForMutatedProps,
      createElement: function(type, props, children) {
        ("production" !== process.env.NODE_ENV ? warning(type != null, 'React.createElement: type should not be null or undefined. It should ' + 'be a string (for DOM elements) or a ReactClass (for composite ' + 'components).') : null);
        var element = ReactElement.createElement.apply(this, arguments);
        if (element == null) {
          return element;
        }
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
        if (type) {
          var componentClass = ReactNativeComponent.getComponentClassForElement(element);
          var name = componentClass.displayName || componentClass.name;
          if ("production" !== process.env.NODE_ENV) {
            if (componentClass.propTypes) {
              checkPropTypes(name, componentClass.propTypes, element.props, ReactPropTypeLocations.prop);
            }
          }
          if (typeof componentClass.getDefaultProps === 'function') {
            ("production" !== process.env.NODE_ENV ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : null);
          }
        }
        return element;
      },
      createFactory: function(type) {
        var validatedFactory = ReactElementValidator.createElement.bind(null, type);
        validatedFactory.type = type;
        return validatedFactory;
      }
    };
    module.exports = ReactElementValidator;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOM", ["./ReactElement", "./ReactElementValidator", "./mapObject", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactElement = require("./ReactElement");
    var ReactElementValidator = require("./ReactElementValidator");
    var mapObject = require("./mapObject");
    function createDOMFactory(tag) {
      if ("production" !== process.env.NODE_ENV) {
        return ReactElementValidator.createFactory(tag);
      }
      return ReactElement.createFactory(tag);
    }
    var ReactDOM = mapObject({
      a: 'a',
      abbr: 'abbr',
      address: 'address',
      area: 'area',
      article: 'article',
      aside: 'aside',
      audio: 'audio',
      b: 'b',
      base: 'base',
      bdi: 'bdi',
      bdo: 'bdo',
      big: 'big',
      blockquote: 'blockquote',
      body: 'body',
      br: 'br',
      button: 'button',
      canvas: 'canvas',
      caption: 'caption',
      cite: 'cite',
      code: 'code',
      col: 'col',
      colgroup: 'colgroup',
      data: 'data',
      datalist: 'datalist',
      dd: 'dd',
      del: 'del',
      details: 'details',
      dfn: 'dfn',
      dialog: 'dialog',
      div: 'div',
      dl: 'dl',
      dt: 'dt',
      em: 'em',
      embed: 'embed',
      fieldset: 'fieldset',
      figcaption: 'figcaption',
      figure: 'figure',
      footer: 'footer',
      form: 'form',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      head: 'head',
      header: 'header',
      hr: 'hr',
      html: 'html',
      i: 'i',
      iframe: 'iframe',
      img: 'img',
      input: 'input',
      ins: 'ins',
      kbd: 'kbd',
      keygen: 'keygen',
      label: 'label',
      legend: 'legend',
      li: 'li',
      link: 'link',
      main: 'main',
      map: 'map',
      mark: 'mark',
      menu: 'menu',
      menuitem: 'menuitem',
      meta: 'meta',
      meter: 'meter',
      nav: 'nav',
      noscript: 'noscript',
      object: 'object',
      ol: 'ol',
      optgroup: 'optgroup',
      option: 'option',
      output: 'output',
      p: 'p',
      param: 'param',
      picture: 'picture',
      pre: 'pre',
      progress: 'progress',
      q: 'q',
      rp: 'rp',
      rt: 'rt',
      ruby: 'ruby',
      s: 's',
      samp: 'samp',
      script: 'script',
      section: 'section',
      select: 'select',
      small: 'small',
      source: 'source',
      span: 'span',
      strong: 'strong',
      style: 'style',
      sub: 'sub',
      summary: 'summary',
      sup: 'sup',
      table: 'table',
      tbody: 'tbody',
      td: 'td',
      textarea: 'textarea',
      tfoot: 'tfoot',
      th: 'th',
      thead: 'thead',
      time: 'time',
      title: 'title',
      tr: 'tr',
      track: 'track',
      u: 'u',
      ul: 'ul',
      'var': 'var',
      video: 'video',
      wbr: 'wbr',
      circle: 'circle',
      defs: 'defs',
      ellipse: 'ellipse',
      g: 'g',
      line: 'line',
      linearGradient: 'linearGradient',
      mask: 'mask',
      path: 'path',
      pattern: 'pattern',
      polygon: 'polygon',
      polyline: 'polyline',
      radialGradient: 'radialGradient',
      rect: 'rect',
      stop: 'stop',
      svg: 'svg',
      text: 'text',
      tspan: 'tspan'
    }, createDOMFactory);
    module.exports = ReactDOM;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/camelizeStyleName", ["./camelize"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var camelize = require("./camelize");
  var msPattern = /^-ms-/;
  function camelizeStyleName(string) {
    return camelize(string.replace(msPattern, 'ms-'));
  }
  module.exports = camelizeStyleName;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/hyphenateStyleName", ["./hyphenate"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  "use strict";
  var hyphenate = require("./hyphenate");
  var msPattern = /^ms-/;
  function hyphenateStyleName(string) {
    return hyphenate(string).replace(msPattern, '-ms-');
  }
  module.exports = hyphenateStyleName;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/EventPluginHub", ["./EventPluginRegistry", "./EventPluginUtils", "./accumulateInto", "./forEachAccumulated", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var EventPluginRegistry = require("./EventPluginRegistry");
    var EventPluginUtils = require("./EventPluginUtils");
    var accumulateInto = require("./accumulateInto");
    var forEachAccumulated = require("./forEachAccumulated");
    var invariant = require("./invariant");
    var listenerBank = {};
    var eventQueue = null;
    var executeDispatchesAndRelease = function(event) {
      if (event) {
        var executeDispatch = EventPluginUtils.executeDispatch;
        var PluginModule = EventPluginRegistry.getPluginModuleForEvent(event);
        if (PluginModule && PluginModule.executeDispatch) {
          executeDispatch = PluginModule.executeDispatch;
        }
        EventPluginUtils.executeDispatchesInOrder(event, executeDispatch);
        if (!event.isPersistent()) {
          event.constructor.release(event);
        }
      }
    };
    var InstanceHandle = null;
    function validateInstanceHandle() {
      var valid = InstanceHandle && InstanceHandle.traverseTwoPhase && InstanceHandle.traverseEnterLeave;
      ("production" !== process.env.NODE_ENV ? invariant(valid, 'InstanceHandle not injected before use!') : invariant(valid));
    }
    var EventPluginHub = {
      injection: {
        injectMount: EventPluginUtils.injection.injectMount,
        injectInstanceHandle: function(InjectedInstanceHandle) {
          InstanceHandle = InjectedInstanceHandle;
          if ("production" !== process.env.NODE_ENV) {
            validateInstanceHandle();
          }
        },
        getInstanceHandle: function() {
          if ("production" !== process.env.NODE_ENV) {
            validateInstanceHandle();
          }
          return InstanceHandle;
        },
        injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,
        injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName
      },
      eventNameDispatchConfigs: EventPluginRegistry.eventNameDispatchConfigs,
      registrationNameModules: EventPluginRegistry.registrationNameModules,
      putListener: function(id, registrationName, listener) {
        ("production" !== process.env.NODE_ENV ? invariant(!listener || typeof listener === 'function', 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : invariant(!listener || typeof listener === 'function'));
        var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
        bankForRegistrationName[id] = listener;
      },
      getListener: function(id, registrationName) {
        var bankForRegistrationName = listenerBank[registrationName];
        return bankForRegistrationName && bankForRegistrationName[id];
      },
      deleteListener: function(id, registrationName) {
        var bankForRegistrationName = listenerBank[registrationName];
        if (bankForRegistrationName) {
          delete bankForRegistrationName[id];
        }
      },
      deleteAllListeners: function(id) {
        for (var registrationName in listenerBank) {
          delete listenerBank[registrationName][id];
        }
      },
      extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
        var events;
        var plugins = EventPluginRegistry.plugins;
        for (var i = 0,
            l = plugins.length; i < l; i++) {
          var possiblePlugin = plugins[i];
          if (possiblePlugin) {
            var extractedEvents = possiblePlugin.extractEvents(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent);
            if (extractedEvents) {
              events = accumulateInto(events, extractedEvents);
            }
          }
        }
        return events;
      },
      enqueueEvents: function(events) {
        if (events) {
          eventQueue = accumulateInto(eventQueue, events);
        }
      },
      processEventQueue: function() {
        var processingEventQueue = eventQueue;
        eventQueue = null;
        forEachAccumulated(processingEventQueue, executeDispatchesAndRelease);
        ("production" !== process.env.NODE_ENV ? invariant(!eventQueue, 'processEventQueue(): Additional events were enqueued while processing ' + 'an event queue. Support for this has not yet been implemented.') : invariant(!eventQueue));
      },
      __purge: function() {
        listenerBank = {};
      },
      __getListenerBank: function() {
        return listenerBank;
      }
    };
    module.exports = EventPluginHub;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactMarkupChecksum", ["./adler32"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var adler32 = require("./adler32");
  var ReactMarkupChecksum = {
    CHECKSUM_ATTR_NAME: 'data-react-checksum',
    addChecksumToMarkup: function(markup) {
      var checksum = adler32(markup);
      return markup.replace('>', ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '">');
    },
    canReuseMarkup: function(markup, element) {
      var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
      existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
      var markupChecksum = adler32(markup);
      return markupChecksum === existingChecksum;
    }
  };
  module.exports = ReactMarkupChecksum;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactRef", ["./ReactOwner", "./ReactUpdates", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactOwner = require("./ReactOwner");
    var ReactUpdates = require("./ReactUpdates");
    var ReactRef = {};
    function attachRef(ref, component, owner) {
      if (typeof ref === 'function') {
        ref(component.getPublicInstance());
      } else {
        ReactOwner.addComponentAsRefTo(component, ref, owner);
      }
    }
    function detachRef(ref, component, owner) {
      if (typeof ref === 'function') {
        ref(null);
      } else {
        ReactOwner.removeComponentAsRefFrom(component, ref, owner);
      }
    }
    ReactRef.attachRefs = function(instance, element) {
      var ref = element.ref;
      if (ref != null) {
        attachRef(ref, instance, element._owner);
      }
    };
    ReactRef.shouldUpdateRefs = function(instance, prevElement, nextElement) {
      return (nextElement._owner !== prevElement._owner || nextElement.ref !== prevElement.ref);
    };
    ReactRef.detachRefs = function(instance, element) {
      var ref = element.ref;
      if (ref != null) {
        detachRef(ref, instance, element._owner);
      }
    };
    module.exports = ReactRef;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/isTextNode", ["./isNode"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isNode = require("./isNode");
  function isTextNode(object) {
    return isNode(object) && object.nodeType == 3;
  }
  module.exports = isTextNode;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactCompositeComponent", ["./ReactComponentEnvironment", "./ReactContext", "./ReactCurrentOwner", "./ReactElement", "./ReactElementValidator", "./ReactInstanceMap", "./ReactLifeCycle", "./ReactNativeComponent", "./ReactPerf", "./ReactPropTypeLocations", "./ReactPropTypeLocationNames", "./ReactReconciler", "./ReactUpdates", "./Object.assign", "./emptyObject", "./invariant", "./shouldUpdateReactComponent", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactComponentEnvironment = require("./ReactComponentEnvironment");
    var ReactContext = require("./ReactContext");
    var ReactCurrentOwner = require("./ReactCurrentOwner");
    var ReactElement = require("./ReactElement");
    var ReactElementValidator = require("./ReactElementValidator");
    var ReactInstanceMap = require("./ReactInstanceMap");
    var ReactLifeCycle = require("./ReactLifeCycle");
    var ReactNativeComponent = require("./ReactNativeComponent");
    var ReactPerf = require("./ReactPerf");
    var ReactPropTypeLocations = require("./ReactPropTypeLocations");
    var ReactPropTypeLocationNames = require("./ReactPropTypeLocationNames");
    var ReactReconciler = require("./ReactReconciler");
    var ReactUpdates = require("./ReactUpdates");
    var assign = require("./Object.assign");
    var emptyObject = require("./emptyObject");
    var invariant = require("./invariant");
    var shouldUpdateReactComponent = require("./shouldUpdateReactComponent");
    var warning = require("./warning");
    function getDeclarationErrorAddendum(component) {
      var owner = component._currentElement._owner || null;
      if (owner) {
        var name = owner.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }
    var nextMountID = 1;
    var ReactCompositeComponentMixin = {
      construct: function(element) {
        this._currentElement = element;
        this._rootNodeID = null;
        this._instance = null;
        this._pendingElement = null;
        this._pendingState = null;
        this._pendingForceUpdate = false;
        this._renderedComponent = null;
        this._context = null;
        this._mountOrder = 0;
        this._isTopLevel = false;
        this._pendingCallbacks = null;
      },
      mountComponent: function(rootID, transaction, context) {
        this._context = context;
        this._mountOrder = nextMountID++;
        this._rootNodeID = rootID;
        var publicProps = this._processProps(this._currentElement.props);
        var publicContext = this._processContext(this._currentElement._context);
        var Component = ReactNativeComponent.getComponentClassForElement(this._currentElement);
        var inst = new Component(publicProps, publicContext);
        inst.props = publicProps;
        inst.context = publicContext;
        inst.refs = emptyObject;
        this._instance = inst;
        ReactInstanceMap.set(inst, this);
        if ("production" !== process.env.NODE_ENV) {
          this._warnIfContextsDiffer(this._currentElement._context, context);
        }
        if ("production" !== process.env.NODE_ENV) {
          ("production" !== process.env.NODE_ENV ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : null);
          ("production" !== process.env.NODE_ENV ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : null);
          ("production" !== process.env.NODE_ENV ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : null);
          ("production" !== process.env.NODE_ENV ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', (this.getName() || 'A component')) : null);
        }
        var initialState = inst.state;
        if (initialState === undefined) {
          inst.state = initialState = null;
        }
        ("production" !== process.env.NODE_ENV ? invariant(typeof initialState === 'object' && !Array.isArray(initialState), '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent') : invariant(typeof initialState === 'object' && !Array.isArray(initialState)));
        this._pendingState = null;
        this._pendingForceUpdate = false;
        if (inst.componentWillMount) {
          var previouslyMounting = ReactLifeCycle.currentlyMountingInstance;
          ReactLifeCycle.currentlyMountingInstance = this;
          try {
            inst.componentWillMount();
          } finally {
            ReactLifeCycle.currentlyMountingInstance = previouslyMounting;
          }
          if (this._pendingState) {
            inst.state = this._pendingState;
            this._pendingState = null;
          }
        }
        var renderedElement = this._renderValidatedComponent();
        this._renderedComponent = this._instantiateReactComponent(renderedElement, this._currentElement.type);
        var markup = ReactReconciler.mountComponent(this._renderedComponent, rootID, transaction, this._processChildContext(context));
        if (inst.componentDidMount) {
          transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
        }
        return markup;
      },
      unmountComponent: function() {
        var inst = this._instance;
        if (inst.componentWillUnmount) {
          var previouslyUnmounting = ReactLifeCycle.currentlyUnmountingInstance;
          ReactLifeCycle.currentlyUnmountingInstance = this;
          try {
            inst.componentWillUnmount();
          } finally {
            ReactLifeCycle.currentlyUnmountingInstance = previouslyUnmounting;
          }
        }
        ReactReconciler.unmountComponent(this._renderedComponent);
        this._renderedComponent = null;
        this._pendingState = null;
        this._pendingForceUpdate = false;
        this._pendingCallbacks = null;
        this._pendingElement = null;
        ReactComponentEnvironment.unmountIDFromEnvironment(this._rootNodeID);
        this._context = null;
        this._rootNodeID = null;
        ReactInstanceMap.remove(inst);
      },
      _setPropsInternal: function(partialProps, callback) {
        var element = this._pendingElement || this._currentElement;
        this._pendingElement = ReactElement.cloneAndReplaceProps(element, assign({}, element.props, partialProps));
        ReactUpdates.enqueueUpdate(this, callback);
      },
      _maskContext: function(context) {
        var maskedContext = null;
        if (typeof this._currentElement.type === 'string') {
          return emptyObject;
        }
        var contextTypes = this._currentElement.type.contextTypes;
        if (!contextTypes) {
          return emptyObject;
        }
        maskedContext = {};
        for (var contextName in contextTypes) {
          maskedContext[contextName] = context[contextName];
        }
        return maskedContext;
      },
      _processContext: function(context) {
        var maskedContext = this._maskContext(context);
        if ("production" !== process.env.NODE_ENV) {
          var Component = ReactNativeComponent.getComponentClassForElement(this._currentElement);
          if (Component.contextTypes) {
            this._checkPropTypes(Component.contextTypes, maskedContext, ReactPropTypeLocations.context);
          }
        }
        return maskedContext;
      },
      _processChildContext: function(currentContext) {
        var inst = this._instance;
        var childContext = inst.getChildContext && inst.getChildContext();
        if (childContext) {
          ("production" !== process.env.NODE_ENV ? invariant(typeof inst.constructor.childContextTypes === 'object', '%s.getChildContext(): childContextTypes must be defined in order to ' + 'use getChildContext().', this.getName() || 'ReactCompositeComponent') : invariant(typeof inst.constructor.childContextTypes === 'object'));
          if ("production" !== process.env.NODE_ENV) {
            this._checkPropTypes(inst.constructor.childContextTypes, childContext, ReactPropTypeLocations.childContext);
          }
          for (var name in childContext) {
            ("production" !== process.env.NODE_ENV ? invariant(name in inst.constructor.childContextTypes, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', this.getName() || 'ReactCompositeComponent', name) : invariant(name in inst.constructor.childContextTypes));
          }
          return assign({}, currentContext, childContext);
        }
        return currentContext;
      },
      _processProps: function(newProps) {
        if ("production" !== process.env.NODE_ENV) {
          var Component = ReactNativeComponent.getComponentClassForElement(this._currentElement);
          if (Component.propTypes) {
            this._checkPropTypes(Component.propTypes, newProps, ReactPropTypeLocations.prop);
          }
        }
        return newProps;
      },
      _checkPropTypes: function(propTypes, props, location) {
        var componentName = this.getName();
        for (var propName in propTypes) {
          if (propTypes.hasOwnProperty(propName)) {
            var error;
            try {
              ("production" !== process.env.NODE_ENV ? invariant(typeof propTypes[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually ' + 'from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(typeof propTypes[propName] === 'function'));
              error = propTypes[propName](props, propName, componentName, location);
            } catch (ex) {
              error = ex;
            }
            if (error instanceof Error) {
              var addendum = getDeclarationErrorAddendum(this);
              if (location === ReactPropTypeLocations.prop) {
                var preface = 'Failed CompositeComponent proptype check. ';
                ("production" !== process.env.NODE_ENV ? warning(false, preface + error.message + addendum) : null);
              } else {
                ("production" !== process.env.NODE_ENV ? warning(false, error.message + addendum) : null);
              }
            }
          }
        }
      },
      receiveComponent: function(nextElement, transaction, nextContext) {
        var prevElement = this._currentElement;
        var prevContext = this._context;
        this._pendingElement = null;
        this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
      },
      performUpdateIfNecessary: function(transaction) {
        if (this._pendingElement != null) {
          ReactReconciler.receiveComponent(this, this._pendingElement || this._currentElement, transaction, this._context);
        }
        if (this._pendingState != null || this._pendingForceUpdate) {
          if ("production" !== process.env.NODE_ENV) {
            ReactElementValidator.checkAndWarnForMutatedProps(this._currentElement);
          }
          this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
        }
      },
      _warnIfContextsDiffer: function(ownerBasedContext, parentBasedContext) {
        ownerBasedContext = this._maskContext(ownerBasedContext);
        parentBasedContext = this._maskContext(parentBasedContext);
        var parentKeys = Object.keys(parentBasedContext).sort();
        var displayName = this.getName() || 'ReactCompositeComponent';
        for (var i = 0; i < parentKeys.length; i++) {
          var key = parentKeys[i];
          ("production" !== process.env.NODE_ENV ? warning(ownerBasedContext[key] === parentBasedContext[key], 'owner-based and parent-based contexts differ ' + '(values: `%s` vs `%s`) for key (%s) while mounting %s ' + '(see: http://fb.me/react-context-by-parent)', ownerBasedContext[key], parentBasedContext[key], key, displayName) : null);
        }
      },
      updateComponent: function(transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
        var inst = this._instance;
        var prevContext = inst.context;
        var prevProps = inst.props;
        var nextContext = prevContext;
        var nextProps = prevProps;
        if (prevParentElement !== nextParentElement) {
          nextContext = this._processContext(nextParentElement._context);
          nextProps = this._processProps(nextParentElement.props);
          if ("production" !== process.env.NODE_ENV) {
            if (nextUnmaskedContext != null) {
              this._warnIfContextsDiffer(nextParentElement._context, nextUnmaskedContext);
            }
          }
          if (inst.componentWillReceiveProps) {
            inst.componentWillReceiveProps(nextProps, nextContext);
          }
        }
        var nextState = this._pendingState || inst.state;
        this._pendingState = null;
        var shouldUpdate = this._pendingForceUpdate || !inst.shouldComponentUpdate || inst.shouldComponentUpdate(nextProps, nextState, nextContext);
        if ("production" !== process.env.NODE_ENV) {
          if (typeof shouldUpdate === 'undefined') {
            console.warn((this.getName() || 'ReactCompositeComponent') + '.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.');
          }
        }
        if (shouldUpdate) {
          this._pendingForceUpdate = false;
          this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
        } else {
          this._currentElement = nextParentElement;
          this._context = nextUnmaskedContext;
          inst.props = nextProps;
          inst.state = nextState;
          inst.context = nextContext;
        }
      },
      _performComponentUpdate: function(nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
        var inst = this._instance;
        var prevElement = this._currentElement;
        var prevProps = inst.props;
        var prevState = inst.state;
        var prevContext = inst.context;
        if (inst.componentWillUpdate) {
          inst.componentWillUpdate(nextProps, nextState, nextContext);
        }
        this._currentElement = nextElement;
        this._context = unmaskedContext;
        inst.props = nextProps;
        inst.state = nextState;
        inst.context = nextContext;
        this._updateRenderedComponent(transaction, unmaskedContext);
        if (inst.componentDidUpdate) {
          transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
        }
      },
      _updateRenderedComponent: function(transaction, context) {
        var prevComponentInstance = this._renderedComponent;
        var prevRenderedElement = prevComponentInstance._currentElement;
        var nextRenderedElement = this._renderValidatedComponent();
        if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
          ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
        } else {
          var thisID = this._rootNodeID;
          var prevComponentID = prevComponentInstance._rootNodeID;
          ReactReconciler.unmountComponent(prevComponentInstance);
          this._renderedComponent = this._instantiateReactComponent(nextRenderedElement, this._currentElement.type);
          var nextMarkup = ReactReconciler.mountComponent(this._renderedComponent, thisID, transaction, context);
          this._replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
        }
      },
      _replaceNodeWithMarkupByID: function(prevComponentID, nextMarkup) {
        ReactComponentEnvironment.replaceNodeWithMarkupByID(prevComponentID, nextMarkup);
      },
      _renderValidatedComponentWithoutOwnerOrContext: function() {
        var inst = this._instance;
        var renderedComponent = inst.render();
        if ("production" !== process.env.NODE_ENV) {
          if (typeof renderedComponent === 'undefined' && inst.render._isMockFunction) {
            renderedComponent = null;
          }
        }
        return renderedComponent;
      },
      _renderValidatedComponent: function() {
        var renderedComponent;
        var previousContext = ReactContext.current;
        ReactContext.current = this._processChildContext(this._currentElement._context);
        ReactCurrentOwner.current = this;
        try {
          renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext();
        } finally {
          ReactContext.current = previousContext;
          ReactCurrentOwner.current = null;
        }
        ("production" !== process.env.NODE_ENV ? invariant(renderedComponent === null || renderedComponent === false || ReactElement.isValidElement(renderedComponent), '%s.render(): A valid ReactComponent must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', this.getName() || 'ReactCompositeComponent') : invariant(renderedComponent === null || renderedComponent === false || ReactElement.isValidElement(renderedComponent)));
        return renderedComponent;
      },
      attachRef: function(ref, component) {
        var inst = this.getPublicInstance();
        var refs = inst.refs === emptyObject ? (inst.refs = {}) : inst.refs;
        refs[ref] = component.getPublicInstance();
      },
      detachRef: function(ref) {
        var refs = this.getPublicInstance().refs;
        delete refs[ref];
      },
      getName: function() {
        var type = this._currentElement.type;
        var constructor = this._instance && this._instance.constructor;
        return (type.displayName || (constructor && constructor.displayName) || type.name || (constructor && constructor.name) || null);
      },
      getPublicInstance: function() {
        return this._instance;
      },
      _instantiateReactComponent: null
    };
    ReactPerf.measureMethods(ReactCompositeComponentMixin, 'ReactCompositeComponent', {
      mountComponent: 'mountComponent',
      updateComponent: 'updateComponent',
      _renderValidatedComponent: '_renderValidatedComponent'
    });
    var ReactCompositeComponent = {Mixin: ReactCompositeComponentMixin};
    module.exports = ReactCompositeComponent;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactChildReconciler", ["./ReactReconciler", "./flattenChildren", "./instantiateReactComponent", "./shouldUpdateReactComponent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ReactReconciler = require("./ReactReconciler");
  var flattenChildren = require("./flattenChildren");
  var instantiateReactComponent = require("./instantiateReactComponent");
  var shouldUpdateReactComponent = require("./shouldUpdateReactComponent");
  var ReactChildReconciler = {
    instantiateChildren: function(nestedChildNodes, transaction, context) {
      var children = flattenChildren(nestedChildNodes);
      for (var name in children) {
        if (children.hasOwnProperty(name)) {
          var child = children[name];
          var childInstance = instantiateReactComponent(child, null);
          children[name] = childInstance;
        }
      }
      return children;
    },
    updateChildren: function(prevChildren, nextNestedChildNodes, transaction, context) {
      var nextChildren = flattenChildren(nextNestedChildNodes);
      if (!nextChildren && !prevChildren) {
        return null;
      }
      var name;
      for (name in nextChildren) {
        if (!nextChildren.hasOwnProperty(name)) {
          continue;
        }
        var prevChild = prevChildren && prevChildren[name];
        var prevElement = prevChild && prevChild._currentElement;
        var nextElement = nextChildren[name];
        if (shouldUpdateReactComponent(prevElement, nextElement)) {
          ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);
          nextChildren[name] = prevChild;
        } else {
          if (prevChild) {
            ReactReconciler.unmountComponent(prevChild, name);
          }
          var nextChildInstance = instantiateReactComponent(nextElement, null);
          nextChildren[name] = nextChildInstance;
        }
      }
      for (name in prevChildren) {
        if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
          ReactReconciler.unmountComponent(prevChildren[name]);
        }
      }
      return nextChildren;
    },
    unmountChildren: function(renderedChildren) {
      for (var name in renderedChildren) {
        var renderedChild = renderedChildren[name];
        ReactReconciler.unmountComponent(renderedChild);
      }
    }
  };
  module.exports = ReactChildReconciler;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/createArrayFrom", ["./toArray"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var toArray = require("./toArray");
  function hasArrayNature(obj) {
    return (!!obj && (typeof obj == 'object' || typeof obj == 'function') && ('length' in obj) && !('setInterval' in obj) && (typeof obj.nodeType != 'number') && (((Array.isArray(obj) || ('callee' in obj) || 'item' in obj))));
  }
  function createArrayFrom(obj) {
    if (!hasArrayNature(obj)) {
      return [obj];
    } else if (Array.isArray(obj)) {
      return obj.slice();
    } else {
      return toArray(obj);
    }
  }
  module.exports = createArrayFrom;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SyntheticEvent", ["./PooledClass", "./Object.assign", "./emptyFunction", "./getEventTarget"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var PooledClass = require("./PooledClass");
  var assign = require("./Object.assign");
  var emptyFunction = require("./emptyFunction");
  var getEventTarget = require("./getEventTarget");
  var EventInterface = {
    type: null,
    target: getEventTarget,
    currentTarget: emptyFunction.thatReturnsNull,
    eventPhase: null,
    bubbles: null,
    cancelable: null,
    timeStamp: function(event) {
      return event.timeStamp || Date.now();
    },
    defaultPrevented: null,
    isTrusted: null
  };
  function SyntheticEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    this.dispatchConfig = dispatchConfig;
    this.dispatchMarker = dispatchMarker;
    this.nativeEvent = nativeEvent;
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      if (!Interface.hasOwnProperty(propName)) {
        continue;
      }
      var normalize = Interface[propName];
      if (normalize) {
        this[propName] = normalize(nativeEvent);
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
    var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
    if (defaultPrevented) {
      this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
    } else {
      this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
    }
    this.isPropagationStopped = emptyFunction.thatReturnsFalse;
  }
  assign(SyntheticEvent.prototype, {
    preventDefault: function() {
      this.defaultPrevented = true;
      var event = this.nativeEvent;
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
      this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
    },
    stopPropagation: function() {
      var event = this.nativeEvent;
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
      this.isPropagationStopped = emptyFunction.thatReturnsTrue;
    },
    persist: function() {
      this.isPersistent = emptyFunction.thatReturnsTrue;
    },
    isPersistent: emptyFunction.thatReturnsFalse,
    destructor: function() {
      var Interface = this.constructor.Interface;
      for (var propName in Interface) {
        this[propName] = null;
      }
      this.dispatchConfig = null;
      this.dispatchMarker = null;
      this.nativeEvent = null;
    }
  });
  SyntheticEvent.Interface = EventInterface;
  SyntheticEvent.augmentClass = function(Class, Interface) {
    var Super = this;
    var prototype = Object.create(Super.prototype);
    assign(prototype, Class.prototype);
    Class.prototype = prototype;
    Class.prototype.constructor = Class;
    Class.Interface = assign({}, Super.Interface, Interface);
    Class.augmentClass = Super.augmentClass;
    PooledClass.addPoolingTo(Class, PooledClass.threeArgumentPooler);
  };
  PooledClass.addPoolingTo(SyntheticEvent, PooledClass.threeArgumentPooler);
  module.exports = SyntheticEvent;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ChangeEventPlugin", ["./EventConstants", "./EventPluginHub", "./EventPropagators", "./ExecutionEnvironment", "./ReactUpdates", "./SyntheticEvent", "./isEventSupported", "./isTextInputElement", "./keyOf", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var EventConstants = require("./EventConstants");
    var EventPluginHub = require("./EventPluginHub");
    var EventPropagators = require("./EventPropagators");
    var ExecutionEnvironment = require("./ExecutionEnvironment");
    var ReactUpdates = require("./ReactUpdates");
    var SyntheticEvent = require("./SyntheticEvent");
    var isEventSupported = require("./isEventSupported");
    var isTextInputElement = require("./isTextInputElement");
    var keyOf = require("./keyOf");
    var topLevelTypes = EventConstants.topLevelTypes;
    var eventTypes = {change: {
        phasedRegistrationNames: {
          bubbled: keyOf({onChange: null}),
          captured: keyOf({onChangeCapture: null})
        },
        dependencies: [topLevelTypes.topBlur, topLevelTypes.topChange, topLevelTypes.topClick, topLevelTypes.topFocus, topLevelTypes.topInput, topLevelTypes.topKeyDown, topLevelTypes.topKeyUp, topLevelTypes.topSelectionChange]
      }};
    var activeElement = null;
    var activeElementID = null;
    var activeElementValue = null;
    var activeElementValueProp = null;
    function shouldUseChangeEvent(elem) {
      return (elem.nodeName === 'SELECT' || (elem.nodeName === 'INPUT' && elem.type === 'file'));
    }
    var doesChangeEventBubble = false;
    if (ExecutionEnvironment.canUseDOM) {
      doesChangeEventBubble = isEventSupported('change') && ((!('documentMode' in document) || document.documentMode > 8));
    }
    function manualDispatchChangeEvent(nativeEvent) {
      var event = SyntheticEvent.getPooled(eventTypes.change, activeElementID, nativeEvent);
      EventPropagators.accumulateTwoPhaseDispatches(event);
      ReactUpdates.batchedUpdates(runEventInBatch, event);
    }
    function runEventInBatch(event) {
      EventPluginHub.enqueueEvents(event);
      EventPluginHub.processEventQueue();
    }
    function startWatchingForChangeEventIE8(target, targetID) {
      activeElement = target;
      activeElementID = targetID;
      activeElement.attachEvent('onchange', manualDispatchChangeEvent);
    }
    function stopWatchingForChangeEventIE8() {
      if (!activeElement) {
        return ;
      }
      activeElement.detachEvent('onchange', manualDispatchChangeEvent);
      activeElement = null;
      activeElementID = null;
    }
    function getTargetIDForChangeEvent(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topChange) {
        return topLevelTargetID;
      }
    }
    function handleEventsForChangeEventIE8(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topFocus) {
        stopWatchingForChangeEventIE8();
        startWatchingForChangeEventIE8(topLevelTarget, topLevelTargetID);
      } else if (topLevelType === topLevelTypes.topBlur) {
        stopWatchingForChangeEventIE8();
      }
    }
    var isInputEventSupported = false;
    if (ExecutionEnvironment.canUseDOM) {
      isInputEventSupported = isEventSupported('input') && ((!('documentMode' in document) || document.documentMode > 9));
    }
    var newValueProp = {
      get: function() {
        return activeElementValueProp.get.call(this);
      },
      set: function(val) {
        activeElementValue = '' + val;
        activeElementValueProp.set.call(this, val);
      }
    };
    function startWatchingForValueChange(target, targetID) {
      activeElement = target;
      activeElementID = targetID;
      activeElementValue = target.value;
      activeElementValueProp = Object.getOwnPropertyDescriptor(target.constructor.prototype, 'value');
      Object.defineProperty(activeElement, 'value', newValueProp);
      activeElement.attachEvent('onpropertychange', handlePropertyChange);
    }
    function stopWatchingForValueChange() {
      if (!activeElement) {
        return ;
      }
      delete activeElement.value;
      activeElement.detachEvent('onpropertychange', handlePropertyChange);
      activeElement = null;
      activeElementID = null;
      activeElementValue = null;
      activeElementValueProp = null;
    }
    function handlePropertyChange(nativeEvent) {
      if (nativeEvent.propertyName !== 'value') {
        return ;
      }
      var value = nativeEvent.srcElement.value;
      if (value === activeElementValue) {
        return ;
      }
      activeElementValue = value;
      manualDispatchChangeEvent(nativeEvent);
    }
    function getTargetIDForInputEvent(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topInput) {
        return topLevelTargetID;
      }
    }
    function handleEventsForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topFocus) {
        stopWatchingForValueChange();
        startWatchingForValueChange(topLevelTarget, topLevelTargetID);
      } else if (topLevelType === topLevelTypes.topBlur) {
        stopWatchingForValueChange();
      }
    }
    function getTargetIDForInputEventIE(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topSelectionChange || topLevelType === topLevelTypes.topKeyUp || topLevelType === topLevelTypes.topKeyDown) {
        if (activeElement && activeElement.value !== activeElementValue) {
          activeElementValue = activeElement.value;
          return activeElementID;
        }
      }
    }
    function shouldUseClickEvent(elem) {
      return (elem.nodeName === 'INPUT' && (elem.type === 'checkbox' || elem.type === 'radio'));
    }
    function getTargetIDForClickEvent(topLevelType, topLevelTarget, topLevelTargetID) {
      if (topLevelType === topLevelTypes.topClick) {
        return topLevelTargetID;
      }
    }
    var ChangeEventPlugin = {
      eventTypes: eventTypes,
      extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
        var getTargetIDFunc,
            handleEventFunc;
        if (shouldUseChangeEvent(topLevelTarget)) {
          if (doesChangeEventBubble) {
            getTargetIDFunc = getTargetIDForChangeEvent;
          } else {
            handleEventFunc = handleEventsForChangeEventIE8;
          }
        } else if (isTextInputElement(topLevelTarget)) {
          if (isInputEventSupported) {
            getTargetIDFunc = getTargetIDForInputEvent;
          } else {
            getTargetIDFunc = getTargetIDForInputEventIE;
            handleEventFunc = handleEventsForInputEventIE;
          }
        } else if (shouldUseClickEvent(topLevelTarget)) {
          getTargetIDFunc = getTargetIDForClickEvent;
        }
        if (getTargetIDFunc) {
          var targetID = getTargetIDFunc(topLevelType, topLevelTarget, topLevelTargetID);
          if (targetID) {
            var event = SyntheticEvent.getPooled(eventTypes.change, targetID, nativeEvent);
            EventPropagators.accumulateTwoPhaseDispatches(event);
            return event;
          }
        }
        if (handleEventFunc) {
          handleEventFunc(topLevelType, topLevelTarget, topLevelTargetID);
        }
      }
    };
    module.exports = ChangeEventPlugin;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SyntheticMouseEvent", ["./SyntheticUIEvent", "./ViewportMetrics", "./getEventModifierState"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var SyntheticUIEvent = require("./SyntheticUIEvent");
  var ViewportMetrics = require("./ViewportMetrics");
  var getEventModifierState = require("./getEventModifierState");
  var MouseEventInterface = {
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: getEventModifierState,
    button: function(event) {
      var button = event.button;
      if ('which' in event) {
        return button;
      }
      return button === 2 ? 2 : button === 4 ? 1 : 0;
    },
    buttons: null,
    relatedTarget: function(event) {
      return event.relatedTarget || (((event.fromElement === event.srcElement ? event.toElement : event.fromElement)));
    },
    pageX: function(event) {
      return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics.currentScrollLeft;
    },
    pageY: function(event) {
      return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics.currentScrollTop;
    }
  };
  function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);
  module.exports = SyntheticMouseEvent;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactBrowserComponentMixin", ["./findDOMNode"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var findDOMNode = require("./findDOMNode");
  var ReactBrowserComponentMixin = {getDOMNode: function() {
      return findDOMNode(this);
    }};
  module.exports = ReactBrowserComponentMixin;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/AutoFocusMixin", ["./focusNode"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var focusNode = require("./focusNode");
  var AutoFocusMixin = {componentDidMount: function() {
      if (this.props.autoFocus) {
        focusNode(this.getDOMNode());
      }
    }};
  module.exports = AutoFocusMixin;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOMForm", ["./EventConstants", "./LocalEventTrapMixin", "./ReactBrowserComponentMixin", "./ReactClass", "./ReactElement"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var EventConstants = require("./EventConstants");
  var LocalEventTrapMixin = require("./LocalEventTrapMixin");
  var ReactBrowserComponentMixin = require("./ReactBrowserComponentMixin");
  var ReactClass = require("./ReactClass");
  var ReactElement = require("./ReactElement");
  var form = ReactElement.createFactory('form');
  var ReactDOMForm = ReactClass.createClass({
    displayName: 'ReactDOMForm',
    tagName: 'FORM',
    mixins: [ReactBrowserComponentMixin, LocalEventTrapMixin],
    render: function() {
      return form(this.props);
    },
    componentDidMount: function() {
      this.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset');
      this.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit');
    }
  });
  module.exports = ReactDOMForm;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/LinkedValueUtils", ["./ReactPropTypes", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactPropTypes = require("./ReactPropTypes");
    var invariant = require("./invariant");
    var hasReadOnlyValue = {
      'button': true,
      'checkbox': true,
      'image': true,
      'hidden': true,
      'radio': true,
      'reset': true,
      'submit': true
    };
    function _assertSingleLink(input) {
      ("production" !== process.env.NODE_ENV ? invariant(input.props.checkedLink == null || input.props.valueLink == null, 'Cannot provide a checkedLink and a valueLink. If you want to use ' + 'checkedLink, you probably don\'t want to use valueLink and vice versa.') : invariant(input.props.checkedLink == null || input.props.valueLink == null));
    }
    function _assertValueLink(input) {
      _assertSingleLink(input);
      ("production" !== process.env.NODE_ENV ? invariant(input.props.value == null && input.props.onChange == null, 'Cannot provide a valueLink and a value or onChange event. If you want ' + 'to use value or onChange, you probably don\'t want to use valueLink.') : invariant(input.props.value == null && input.props.onChange == null));
    }
    function _assertCheckedLink(input) {
      _assertSingleLink(input);
      ("production" !== process.env.NODE_ENV ? invariant(input.props.checked == null && input.props.onChange == null, 'Cannot provide a checkedLink and a checked property or onChange event. ' + 'If you want to use checked or onChange, you probably don\'t want to ' + 'use checkedLink') : invariant(input.props.checked == null && input.props.onChange == null));
    }
    function _handleLinkedValueChange(e) {
      this.props.valueLink.requestChange(e.target.value);
    }
    function _handleLinkedCheckChange(e) {
      this.props.checkedLink.requestChange(e.target.checked);
    }
    var LinkedValueUtils = {
      Mixin: {propTypes: {
          value: function(props, propName, componentName) {
            if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
              return null;
            }
            return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
          },
          checked: function(props, propName, componentName) {
            if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
              return null;
            }
            return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
          },
          onChange: ReactPropTypes.func
        }},
      getValue: function(input) {
        if (input.props.valueLink) {
          _assertValueLink(input);
          return input.props.valueLink.value;
        }
        return input.props.value;
      },
      getChecked: function(input) {
        if (input.props.checkedLink) {
          _assertCheckedLink(input);
          return input.props.checkedLink.value;
        }
        return input.props.checked;
      },
      getOnChange: function(input) {
        if (input.props.valueLink) {
          _assertValueLink(input);
          return _handleLinkedValueChange;
        } else if (input.props.checkedLink) {
          _assertCheckedLink(input);
          return _handleLinkedCheckChange;
        }
        return input.props.onChange;
      }
    };
    module.exports = LinkedValueUtils;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactEventListener", ["./EventListener", "./ExecutionEnvironment", "./PooledClass", "./ReactInstanceHandles", "./ReactMount", "./ReactUpdates", "./Object.assign", "./getEventTarget", "./getUnboundedScrollPosition", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var EventListener = require("./EventListener");
    var ExecutionEnvironment = require("./ExecutionEnvironment");
    var PooledClass = require("./PooledClass");
    var ReactInstanceHandles = require("./ReactInstanceHandles");
    var ReactMount = require("./ReactMount");
    var ReactUpdates = require("./ReactUpdates");
    var assign = require("./Object.assign");
    var getEventTarget = require("./getEventTarget");
    var getUnboundedScrollPosition = require("./getUnboundedScrollPosition");
    function findParent(node) {
      var nodeID = ReactMount.getID(node);
      var rootID = ReactInstanceHandles.getReactRootIDFromNodeID(nodeID);
      var container = ReactMount.findReactContainerForID(rootID);
      var parent = ReactMount.getFirstReactDOM(container);
      return parent;
    }
    function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
      this.topLevelType = topLevelType;
      this.nativeEvent = nativeEvent;
      this.ancestors = [];
    }
    assign(TopLevelCallbackBookKeeping.prototype, {destructor: function() {
        this.topLevelType = null;
        this.nativeEvent = null;
        this.ancestors.length = 0;
      }});
    PooledClass.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass.twoArgumentPooler);
    function handleTopLevelImpl(bookKeeping) {
      var topLevelTarget = ReactMount.getFirstReactDOM(getEventTarget(bookKeeping.nativeEvent)) || window;
      var ancestor = topLevelTarget;
      while (ancestor) {
        bookKeeping.ancestors.push(ancestor);
        ancestor = findParent(ancestor);
      }
      for (var i = 0,
          l = bookKeeping.ancestors.length; i < l; i++) {
        topLevelTarget = bookKeeping.ancestors[i];
        var topLevelTargetID = ReactMount.getID(topLevelTarget) || '';
        ReactEventListener._handleTopLevel(bookKeeping.topLevelType, topLevelTarget, topLevelTargetID, bookKeeping.nativeEvent);
      }
    }
    function scrollValueMonitor(cb) {
      var scrollPosition = getUnboundedScrollPosition(window);
      cb(scrollPosition);
    }
    var ReactEventListener = {
      _enabled: true,
      _handleTopLevel: null,
      WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,
      setHandleTopLevel: function(handleTopLevel) {
        ReactEventListener._handleTopLevel = handleTopLevel;
      },
      setEnabled: function(enabled) {
        ReactEventListener._enabled = !!enabled;
      },
      isEnabled: function() {
        return ReactEventListener._enabled;
      },
      trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
        var element = handle;
        if (!element) {
          return null;
        }
        return EventListener.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
      },
      trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
        var element = handle;
        if (!element) {
          return null;
        }
        return EventListener.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
      },
      monitorScrollValue: function(refresh) {
        var callback = scrollValueMonitor.bind(null, refresh);
        EventListener.listen(window, 'scroll', callback);
      },
      dispatchEvent: function(topLevelType, nativeEvent) {
        if (!ReactEventListener._enabled) {
          return ;
        }
        var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
        try {
          ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
        } finally {
          TopLevelCallbackBookKeeping.release(bookKeeping);
        }
      }
    };
    module.exports = ReactEventListener;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOMSelection", ["./ExecutionEnvironment", "./getNodeForCharacterOffset", "./getTextContentAccessor"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ExecutionEnvironment = require("./ExecutionEnvironment");
  var getNodeForCharacterOffset = require("./getNodeForCharacterOffset");
  var getTextContentAccessor = require("./getTextContentAccessor");
  function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
    return anchorNode === focusNode && anchorOffset === focusOffset;
  }
  function getIEOffsets(node) {
    var selection = document.selection;
    var selectedRange = selection.createRange();
    var selectedLength = selectedRange.text.length;
    var fromStart = selectedRange.duplicate();
    fromStart.moveToElementText(node);
    fromStart.setEndPoint('EndToStart', selectedRange);
    var startOffset = fromStart.text.length;
    var endOffset = startOffset + selectedLength;
    return {
      start: startOffset,
      end: endOffset
    };
  }
  function getModernOffsets(node) {
    var selection = window.getSelection && window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
    var anchorNode = selection.anchorNode;
    var anchorOffset = selection.anchorOffset;
    var focusNode = selection.focusNode;
    var focusOffset = selection.focusOffset;
    var currentRange = selection.getRangeAt(0);
    var isSelectionCollapsed = isCollapsed(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
    var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;
    var tempRange = currentRange.cloneRange();
    tempRange.selectNodeContents(node);
    tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);
    var isTempRangeCollapsed = isCollapsed(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);
    var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
    var end = start + rangeLength;
    var detectionRange = document.createRange();
    detectionRange.setStart(anchorNode, anchorOffset);
    detectionRange.setEnd(focusNode, focusOffset);
    var isBackward = detectionRange.collapsed;
    return {
      start: isBackward ? end : start,
      end: isBackward ? start : end
    };
  }
  function setIEOffsets(node, offsets) {
    var range = document.selection.createRange().duplicate();
    var start,
        end;
    if (typeof offsets.end === 'undefined') {
      start = offsets.start;
      end = start;
    } else if (offsets.start > offsets.end) {
      start = offsets.end;
      end = offsets.start;
    } else {
      start = offsets.start;
      end = offsets.end;
    }
    range.moveToElementText(node);
    range.moveStart('character', start);
    range.setEndPoint('EndToStart', range);
    range.moveEnd('character', end - start);
    range.select();
  }
  function setModernOffsets(node, offsets) {
    if (!window.getSelection) {
      return ;
    }
    var selection = window.getSelection();
    var length = node[getTextContentAccessor()].length;
    var start = Math.min(offsets.start, length);
    var end = typeof offsets.end === 'undefined' ? start : Math.min(offsets.end, length);
    if (!selection.extend && start > end) {
      var temp = end;
      end = start;
      start = temp;
    }
    var startMarker = getNodeForCharacterOffset(node, start);
    var endMarker = getNodeForCharacterOffset(node, end);
    if (startMarker && endMarker) {
      var range = document.createRange();
      range.setStart(startMarker.node, startMarker.offset);
      selection.removeAllRanges();
      if (start > end) {
        selection.addRange(range);
        selection.extend(endMarker.node, endMarker.offset);
      } else {
        range.setEnd(endMarker.node, endMarker.offset);
        selection.addRange(range);
      }
    }
  }
  var useIEOffsets = (ExecutionEnvironment.canUseDOM && 'selection' in document && !('getSelection' in window));
  var ReactDOMSelection = {
    getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,
    setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
  };
  module.exports = ReactDOMSelection;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SelectEventPlugin", ["./EventConstants", "./EventPropagators", "./ReactInputSelection", "./SyntheticEvent", "./getActiveElement", "./isTextInputElement", "./keyOf", "./shallowEqual"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var EventConstants = require("./EventConstants");
  var EventPropagators = require("./EventPropagators");
  var ReactInputSelection = require("./ReactInputSelection");
  var SyntheticEvent = require("./SyntheticEvent");
  var getActiveElement = require("./getActiveElement");
  var isTextInputElement = require("./isTextInputElement");
  var keyOf = require("./keyOf");
  var shallowEqual = require("./shallowEqual");
  var topLevelTypes = EventConstants.topLevelTypes;
  var eventTypes = {select: {
      phasedRegistrationNames: {
        bubbled: keyOf({onSelect: null}),
        captured: keyOf({onSelectCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topContextMenu, topLevelTypes.topFocus, topLevelTypes.topKeyDown, topLevelTypes.topMouseDown, topLevelTypes.topMouseUp, topLevelTypes.topSelectionChange]
    }};
  var activeElement = null;
  var activeElementID = null;
  var lastSelection = null;
  var mouseDown = false;
  function getSelection(node) {
    if ('selectionStart' in node && ReactInputSelection.hasSelectionCapabilities(node)) {
      return {
        start: node.selectionStart,
        end: node.selectionEnd
      };
    } else if (window.getSelection) {
      var selection = window.getSelection();
      return {
        anchorNode: selection.anchorNode,
        anchorOffset: selection.anchorOffset,
        focusNode: selection.focusNode,
        focusOffset: selection.focusOffset
      };
    } else if (document.selection) {
      var range = document.selection.createRange();
      return {
        parentElement: range.parentElement(),
        text: range.text,
        top: range.boundingTop,
        left: range.boundingLeft
      };
    }
  }
  function constructSelectEvent(nativeEvent) {
    if (mouseDown || activeElement == null || activeElement !== getActiveElement()) {
      return null;
    }
    var currentSelection = getSelection(activeElement);
    if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
      lastSelection = currentSelection;
      var syntheticEvent = SyntheticEvent.getPooled(eventTypes.select, activeElementID, nativeEvent);
      syntheticEvent.type = 'select';
      syntheticEvent.target = activeElement;
      EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);
      return syntheticEvent;
    }
  }
  var SelectEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      switch (topLevelType) {
        case topLevelTypes.topFocus:
          if (isTextInputElement(topLevelTarget) || topLevelTarget.contentEditable === 'true') {
            activeElement = topLevelTarget;
            activeElementID = topLevelTargetID;
            lastSelection = null;
          }
          break;
        case topLevelTypes.topBlur:
          activeElement = null;
          activeElementID = null;
          lastSelection = null;
          break;
        case topLevelTypes.topMouseDown:
          mouseDown = true;
          break;
        case topLevelTypes.topContextMenu:
        case topLevelTypes.topMouseUp:
          mouseDown = false;
          return constructSelectEvent(nativeEvent);
        case topLevelTypes.topSelectionChange:
        case topLevelTypes.topKeyDown:
        case topLevelTypes.topKeyUp:
          return constructSelectEvent(nativeEvent);
      }
    }
  };
  module.exports = SelectEventPlugin;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SyntheticKeyboardEvent", ["./SyntheticUIEvent", "./getEventCharCode", "./getEventKey", "./getEventModifierState"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var SyntheticUIEvent = require("./SyntheticUIEvent");
  var getEventCharCode = require("./getEventCharCode");
  var getEventKey = require("./getEventKey");
  var getEventModifierState = require("./getEventModifierState");
  var KeyboardEventInterface = {
    key: getEventKey,
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      if (event.type === 'keypress') {
        return getEventCharCode(event);
      }
      return 0;
    },
    keyCode: function(event) {
      if (event.type === 'keydown' || event.type === 'keyup') {
        return event.keyCode;
      }
      return 0;
    },
    which: function(event) {
      if (event.type === 'keypress') {
        return getEventCharCode(event);
      }
      if (event.type === 'keydown' || event.type === 'keyup') {
        return event.keyCode;
      }
      return 0;
    }
  };
  function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);
  module.exports = SyntheticKeyboardEvent;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/performanceNow", ["./performance"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var performance = require("./performance");
  if (!performance || !performance.now) {
    performance = Date;
  }
  var performanceNow = performance.now.bind(performance);
  module.exports = performanceNow;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactServerRendering", ["./ReactElement", "./ReactInstanceHandles", "./ReactMarkupChecksum", "./ReactServerRenderingTransaction", "./emptyObject", "./instantiateReactComponent", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactElement = require("./ReactElement");
    var ReactInstanceHandles = require("./ReactInstanceHandles");
    var ReactMarkupChecksum = require("./ReactMarkupChecksum");
    var ReactServerRenderingTransaction = require("./ReactServerRenderingTransaction");
    var emptyObject = require("./emptyObject");
    var instantiateReactComponent = require("./instantiateReactComponent");
    var invariant = require("./invariant");
    function renderToString(element) {
      ("production" !== process.env.NODE_ENV ? invariant(ReactElement.isValidElement(element), 'renderToString(): You must pass a valid ReactElement.') : invariant(ReactElement.isValidElement(element)));
      var transaction;
      try {
        var id = ReactInstanceHandles.createReactRootID();
        transaction = ReactServerRenderingTransaction.getPooled(false);
        return transaction.perform(function() {
          var componentInstance = instantiateReactComponent(element, null);
          var markup = componentInstance.mountComponent(id, transaction, emptyObject);
          return ReactMarkupChecksum.addChecksumToMarkup(markup);
        }, null);
      } finally {
        ReactServerRenderingTransaction.release(transaction);
      }
    }
    function renderToStaticMarkup(element) {
      ("production" !== process.env.NODE_ENV ? invariant(ReactElement.isValidElement(element), 'renderToStaticMarkup(): You must pass a valid ReactElement.') : invariant(ReactElement.isValidElement(element)));
      var transaction;
      try {
        var id = ReactInstanceHandles.createReactRootID();
        transaction = ReactServerRenderingTransaction.getPooled(true);
        return transaction.perform(function() {
          var componentInstance = instantiateReactComponent(element, null);
          return componentInstance.mountComponent(id, transaction, emptyObject);
        }, null);
      } finally {
        ReactServerRenderingTransaction.release(transaction);
      }
    }
    module.exports = {
      renderToString: renderToString,
      renderToStaticMarkup: renderToStaticMarkup
    };
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/LinkedStateMixin", ["./ReactLink", "./ReactStateSetters"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ReactLink = require("./ReactLink");
  var ReactStateSetters = require("./ReactStateSetters");
  var LinkedStateMixin = {linkState: function(key) {
      return new ReactLink(this.state[key], ReactStateSetters.createStateKeySetter(this, key));
    }};
  module.exports = LinkedStateMixin;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactPropTransferer", ["./Object.assign", "./emptyFunction", "./joinClasses"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var assign = require("./Object.assign");
  var emptyFunction = require("./emptyFunction");
  var joinClasses = require("./joinClasses");
  function createTransferStrategy(mergeStrategy) {
    return function(props, key, value) {
      if (!props.hasOwnProperty(key)) {
        props[key] = value;
      } else {
        props[key] = mergeStrategy(props[key], value);
      }
    };
  }
  var transferStrategyMerge = createTransferStrategy(function(a, b) {
    return assign({}, b, a);
  });
  var TransferStrategies = {
    children: emptyFunction,
    className: createTransferStrategy(joinClasses),
    style: transferStrategyMerge
  };
  function transferInto(props, newProps) {
    for (var thisKey in newProps) {
      if (!newProps.hasOwnProperty(thisKey)) {
        continue;
      }
      var transferStrategy = TransferStrategies[thisKey];
      if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
        transferStrategy(props, thisKey, newProps[thisKey]);
      } else if (!props.hasOwnProperty(thisKey)) {
        props[thisKey] = newProps[thisKey];
      }
    }
    return props;
  }
  var ReactPropTransferer = {mergeProps: function(oldProps, newProps) {
      return transferInto(assign({}, oldProps), newProps);
    }};
  module.exports = ReactPropTransferer;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactCSSTransitionGroupChild", ["./React", "./CSSCore", "./ReactTransitionEvents", "./onlyChild", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var React = require("./React");
    var CSSCore = require("./CSSCore");
    var ReactTransitionEvents = require("./ReactTransitionEvents");
    var onlyChild = require("./onlyChild");
    var TICK = 17;
    var NO_EVENT_TIMEOUT = 5000;
    var noEventListener = null;
    if ("production" !== process.env.NODE_ENV) {
      noEventListener = function() {
        console.warn('transition(): tried to perform an animation without ' + 'an animationend or transitionend event after timeout (' + NO_EVENT_TIMEOUT + 'ms). You should either disable this ' + 'transition in JS or add a CSS animation/transition.');
      };
    }
    var ReactCSSTransitionGroupChild = React.createClass({
      displayName: 'ReactCSSTransitionGroupChild',
      transition: function(animationType, finishCallback) {
        var node = this.getDOMNode();
        var className = this.props.name + '-' + animationType;
        var activeClassName = className + '-active';
        var noEventTimeout = null;
        var endListener = function(e) {
          if (e && e.target !== node) {
            return ;
          }
          if ("production" !== process.env.NODE_ENV) {
            clearTimeout(noEventTimeout);
          }
          CSSCore.removeClass(node, className);
          CSSCore.removeClass(node, activeClassName);
          ReactTransitionEvents.removeEndEventListener(node, endListener);
          if (finishCallback) {
            finishCallback();
          }
        };
        ReactTransitionEvents.addEndEventListener(node, endListener);
        CSSCore.addClass(node, className);
        this.queueClass(activeClassName);
        if ("production" !== process.env.NODE_ENV) {
          noEventTimeout = setTimeout(noEventListener, NO_EVENT_TIMEOUT);
        }
      },
      queueClass: function(className) {
        this.classNameQueue.push(className);
        if (!this.timeout) {
          this.timeout = setTimeout(this.flushClassNameQueue, TICK);
        }
      },
      flushClassNameQueue: function() {
        if (this.isMounted()) {
          this.classNameQueue.forEach(CSSCore.addClass.bind(CSSCore, this.getDOMNode()));
        }
        this.classNameQueue.length = 0;
        this.timeout = null;
      },
      componentWillMount: function() {
        this.classNameQueue = [];
      },
      componentWillUnmount: function() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
      },
      componentWillAppear: function(done) {
        if (this.props.appear) {
          this.transition('appear', done);
        } else {
          done();
        }
      },
      componentWillEnter: function(done) {
        if (this.props.enter) {
          this.transition('enter', done);
        } else {
          done();
        }
      },
      componentWillLeave: function(done) {
        if (this.props.leave) {
          this.transition('leave', done);
        } else {
          done();
        }
      },
      render: function() {
        return onlyChild(this.props.children);
      }
    });
    module.exports = ReactCSSTransitionGroupChild;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("github:jspm/nodelibs-process@0.1.1/index", ["process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = System._nodeRequire ? process : require('process');
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/EventPluginUtils", ["./EventConstants", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var EventConstants = require("./EventConstants");
    var invariant = require("./invariant");
    var injection = {
      Mount: null,
      injectMount: function(InjectedMount) {
        injection.Mount = InjectedMount;
        if ("production" !== process.env.NODE_ENV) {
          ("production" !== process.env.NODE_ENV ? invariant(InjectedMount && InjectedMount.getNode, 'EventPluginUtils.injection.injectMount(...): Injected Mount module ' + 'is missing getNode.') : invariant(InjectedMount && InjectedMount.getNode));
        }
      }
    };
    var topLevelTypes = EventConstants.topLevelTypes;
    function isEndish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseUp || topLevelType === topLevelTypes.topTouchEnd || topLevelType === topLevelTypes.topTouchCancel;
    }
    function isMoveish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseMove || topLevelType === topLevelTypes.topTouchMove;
    }
    function isStartish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseDown || topLevelType === topLevelTypes.topTouchStart;
    }
    var validateEventDispatches;
    if ("production" !== process.env.NODE_ENV) {
      validateEventDispatches = function(event) {
        var dispatchListeners = event._dispatchListeners;
        var dispatchIDs = event._dispatchIDs;
        var listenersIsArr = Array.isArray(dispatchListeners);
        var idsIsArr = Array.isArray(dispatchIDs);
        var IDsLen = idsIsArr ? dispatchIDs.length : dispatchIDs ? 1 : 0;
        var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;
        ("production" !== process.env.NODE_ENV ? invariant(idsIsArr === listenersIsArr && IDsLen === listenersLen, 'EventPluginUtils: Invalid `event`.') : invariant(idsIsArr === listenersIsArr && IDsLen === listenersLen));
      };
    }
    function forEachEventDispatch(event, cb) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchIDs = event._dispatchIDs;
      if ("production" !== process.env.NODE_ENV) {
        validateEventDispatches(event);
      }
      if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
          if (event.isPropagationStopped()) {
            break;
          }
          cb(event, dispatchListeners[i], dispatchIDs[i]);
        }
      } else if (dispatchListeners) {
        cb(event, dispatchListeners, dispatchIDs);
      }
    }
    function executeDispatch(event, listener, domID) {
      event.currentTarget = injection.Mount.getNode(domID);
      var returnValue = listener(event, domID);
      event.currentTarget = null;
      return returnValue;
    }
    function executeDispatchesInOrder(event, executeDispatch) {
      forEachEventDispatch(event, executeDispatch);
      event._dispatchListeners = null;
      event._dispatchIDs = null;
    }
    function executeDispatchesInOrderStopAtTrueImpl(event) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchIDs = event._dispatchIDs;
      if ("production" !== process.env.NODE_ENV) {
        validateEventDispatches(event);
      }
      if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
          if (event.isPropagationStopped()) {
            break;
          }
          if (dispatchListeners[i](event, dispatchIDs[i])) {
            return dispatchIDs[i];
          }
        }
      } else if (dispatchListeners) {
        if (dispatchListeners(event, dispatchIDs)) {
          return dispatchIDs;
        }
      }
      return null;
    }
    function executeDispatchesInOrderStopAtTrue(event) {
      var ret = executeDispatchesInOrderStopAtTrueImpl(event);
      event._dispatchIDs = null;
      event._dispatchListeners = null;
      return ret;
    }
    function executeDirectDispatch(event) {
      if ("production" !== process.env.NODE_ENV) {
        validateEventDispatches(event);
      }
      var dispatchListener = event._dispatchListeners;
      var dispatchID = event._dispatchIDs;
      ("production" !== process.env.NODE_ENV ? invariant(!Array.isArray(dispatchListener), 'executeDirectDispatch(...): Invalid `event`.') : invariant(!Array.isArray(dispatchListener)));
      var res = dispatchListener ? dispatchListener(event, dispatchID) : null;
      event._dispatchListeners = null;
      event._dispatchIDs = null;
      return res;
    }
    function hasDispatches(event) {
      return !!event._dispatchListeners;
    }
    var EventPluginUtils = {
      isEndish: isEndish,
      isMoveish: isMoveish,
      isStartish: isStartish,
      executeDirectDispatch: executeDirectDispatch,
      executeDispatch: executeDispatch,
      executeDispatchesInOrder: executeDispatchesInOrder,
      executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
      hasDispatches: hasDispatches,
      injection: injection,
      useTouchEvents: false
    };
    module.exports = EventPluginUtils;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactElement", ["./ReactContext", "./ReactCurrentOwner", "./Object.assign", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactContext = require("./ReactContext");
    var ReactCurrentOwner = require("./ReactCurrentOwner");
    var assign = require("./Object.assign");
    var warning = require("./warning");
    var RESERVED_PROPS = {
      key: true,
      ref: true
    };
    function defineWarningProperty(object, key) {
      Object.defineProperty(object, key, {
        configurable: false,
        enumerable: true,
        get: function() {
          if (!this._store) {
            return null;
          }
          return this._store[key];
        },
        set: function(value) {
          ("production" !== process.env.NODE_ENV ? warning(false, 'Don\'t set the %s property of the React element. Instead, ' + 'specify the correct value when initially creating the element.', key) : null);
          this._store[key] = value;
        }
      });
    }
    var useMutationMembrane = false;
    function defineMutationMembrane(prototype) {
      try {
        var pseudoFrozenProperties = {props: true};
        for (var key in pseudoFrozenProperties) {
          defineWarningProperty(prototype, key);
        }
        useMutationMembrane = true;
      } catch (x) {}
    }
    var ReactElement = function(type, key, ref, owner, context, props) {
      this.type = type;
      this.key = key;
      this.ref = ref;
      this._owner = owner;
      this._context = context;
      if ("production" !== process.env.NODE_ENV) {
        this._store = {
          props: props,
          originalProps: assign({}, props)
        };
        try {
          Object.defineProperty(this._store, 'validated', {
            configurable: false,
            enumerable: false,
            writable: true
          });
        } catch (x) {}
        this._store.validated = false;
        if (useMutationMembrane) {
          Object.freeze(this);
          return ;
        }
      }
      this.props = props;
    };
    ReactElement.prototype = {_isReactElement: true};
    if ("production" !== process.env.NODE_ENV) {
      defineMutationMembrane(ReactElement.prototype);
    }
    ReactElement.createElement = function(type, config, children) {
      var propName;
      var props = {};
      var key = null;
      var ref = null;
      if (config != null) {
        ref = config.ref === undefined ? null : config.ref;
        key = config.key === undefined ? null : '' + config.key;
        for (propName in config) {
          if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (typeof props[propName] === 'undefined') {
            props[propName] = defaultProps[propName];
          }
        }
      }
      return new ReactElement(type, key, ref, ReactCurrentOwner.current, ReactContext.current, props);
    };
    ReactElement.createFactory = function(type) {
      var factory = ReactElement.createElement.bind(null, type);
      factory.type = type;
      return factory;
    };
    ReactElement.cloneAndReplaceProps = function(oldElement, newProps) {
      var newElement = new ReactElement(oldElement.type, oldElement.key, oldElement.ref, oldElement._owner, oldElement._context, newProps);
      if ("production" !== process.env.NODE_ENV) {
        newElement._store.validated = oldElement._store.validated;
      }
      return newElement;
    };
    ReactElement.isValidElement = function(object) {
      var isElement = !!(object && object._isReactElement);
      return isElement;
    };
    module.exports = ReactElement;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactUpdateQueue", ["./ReactLifeCycle", "./ReactCurrentOwner", "./ReactElement", "./ReactInstanceMap", "./ReactUpdates", "./Object.assign", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var ReactLifeCycle = require("./ReactLifeCycle");
    var ReactCurrentOwner = require("./ReactCurrentOwner");
    var ReactElement = require("./ReactElement");
    var ReactInstanceMap = require("./ReactInstanceMap");
    var ReactUpdates = require("./ReactUpdates");
    var assign = require("./Object.assign");
    var invariant = require("./invariant");
    function enqueueUpdate(internalInstance) {
      if (internalInstance !== ReactLifeCycle.currentlyMountingInstance) {
        ReactUpdates.enqueueUpdate(internalInstance);
      }
    }
    function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
      ("production" !== process.env.NODE_ENV ? invariant(ReactCurrentOwner.current == null, '%s(...): Cannot update during an existing state transition ' + '(such as within `render`). Render methods should be a pure function ' + 'of props and state.', callerName) : invariant(ReactCurrentOwner.current == null));
      var internalInstance = ReactInstanceMap.get(publicInstance);
      ("production" !== process.env.NODE_ENV ? invariant(internalInstance, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted ' + 'component.', callerName, callerName) : invariant(internalInstance));
      ("production" !== process.env.NODE_ENV ? invariant(internalInstance !== ReactLifeCycle.currentlyUnmountingInstance, '%s(...): Cannot call %s() on an unmounting component.', callerName, callerName) : invariant(internalInstance !== ReactLifeCycle.currentlyUnmountingInstance));
      return internalInstance;
    }
    var ReactUpdateQueue = {
      enqueueCallback: function(publicInstance, callback) {
        ("production" !== process.env.NODE_ENV ? invariant(typeof callback === 'function', 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(typeof callback === 'function'));
        var internalInstance = ReactInstanceMap.get(publicInstance);
        ("production" !== process.env.NODE_ENV ? invariant(internalInstance, 'Cannot enqueue a callback on an instance that is unmounted.') : invariant(internalInstance));
        if (internalInstance === ReactLifeCycle.currentlyMountingInstance) {
          return ;
        }
        if (internalInstance._pendingCallbacks) {
          internalInstance._pendingCallbacks.push(callback);
        } else {
          internalInstance._pendingCallbacks = [callback];
        }
        enqueueUpdate(internalInstance);
      },
      enqueueCallbackInternal: function(internalInstance, callback) {
        ("production" !== process.env.NODE_ENV ? invariant(typeof callback === "function", 'enqueueCallback(...): You called `setProps`, `replaceProps`, ' + '`setState`, `replaceState`, or `forceUpdate` with a callback that ' + 'isn\'t callable.') : invariant(typeof callback === "function"));
        if (internalInstance._pendingCallbacks) {
          internalInstance._pendingCallbacks.push(callback);
        } else {
          internalInstance._pendingCallbacks = [callback];
        }
      },
      enqueueForceUpdate: function(publicInstance) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'forceUpdate');
        internalInstance._pendingForceUpdate = true;
        enqueueUpdate(internalInstance);
      },
      enqueueReplaceState: function(publicInstance, completeState) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceState');
        internalInstance._pendingState = completeState;
        enqueueUpdate(internalInstance);
      },
      enqueueSetState: function(publicInstance, partialState) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
        internalInstance._pendingState = assign({}, internalInstance._pendingState || internalInstance._instance.state, partialState);
        enqueueUpdate(internalInstance);
      },
      enqueueSetProps: function(publicInstance, partialProps) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setProps');
        ("production" !== process.env.NODE_ENV ? invariant(internalInstance._isTopLevel, 'setProps(...): You called `setProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(internalInstance._isTopLevel));
        var element = internalInstance._pendingElement || internalInstance._currentElement;
        var props = assign({}, element.props, partialProps);
        internalInstance._pendingElement = ReactElement.cloneAndReplaceProps(element, props);
        enqueueUpdate(internalInstance);
      },
      enqueueReplaceProps: function(publicInstance, props) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceProps');
        ("production" !== process.env.NODE_ENV ? invariant(internalInstance._isTopLevel, 'replaceProps(...): You called `replaceProps` on a ' + 'component with a parent. This is an anti-pattern since props will ' + 'get reactively updated when rendered. Instead, change the owner\'s ' + '`render` method to pass the correct value as props to the component ' + 'where it is created.') : invariant(internalInstance._isTopLevel));
        var element = internalInstance._pendingElement || internalInstance._currentElement;
        internalInstance._pendingElement = ReactElement.cloneAndReplaceProps(element, props);
        enqueueUpdate(internalInstance);
      },
      enqueueElementInternal: function(internalInstance, newElement) {
        internalInstance._pendingElement = newElement;
        enqueueUpdate(internalInstance);
      }
    };
    module.exports = ReactUpdateQueue;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/CSSPropertyOperations", ["./CSSProperty", "./ExecutionEnvironment", "./camelizeStyleName", "./dangerousStyleValue", "./hyphenateStyleName", "./memoizeStringOnly", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var CSSProperty = require("./CSSProperty");
    var ExecutionEnvironment = require("./ExecutionEnvironment");
    var camelizeStyleName = require("./camelizeStyleName");
    var dangerousStyleValue = require("./dangerousStyleValue");
    var hyphenateStyleName = require("./hyphenateStyleName");
    var memoizeStringOnly = require("./memoizeStringOnly");
    var warning = require("./warning");
    var processStyleName = memoizeStringOnly(function(styleName) {
      return hyphenateStyleName(styleName);
    });
    var styleFloatAccessor = 'cssFloat';
    if (ExecutionEnvironment.canUseDOM) {
      if (document.documentElement.style.cssFloat === undefined) {
        styleFloatAccessor = 'styleFloat';
      }
    }
    if ("production" !== process.env.NODE_ENV) {
      var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
      var badStyleValueWithSemicolonPattern = /;\s*$/;
      var warnedStyleNames = {};
      var warnedStyleValues = {};
      var warnHyphenatedStyleName = function(name) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return ;
        }
        warnedStyleNames[name] = true;
        ("production" !== process.env.NODE_ENV ? warning(false, 'Unsupported style property %s. Did you mean %s?', name, camelizeStyleName(name)) : null);
      };
      var warnBadVendoredStyleName = function(name) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return ;
        }
        warnedStyleNames[name] = true;
        ("production" !== process.env.NODE_ENV ? warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?', name, name.charAt(0).toUpperCase() + name.slice(1)) : null);
      };
      var warnStyleValueWithSemicolon = function(name, value) {
        if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
          return ;
        }
        warnedStyleValues[value] = true;
        ("production" !== process.env.NODE_ENV ? warning(false, 'Style property values shouldn\'t contain a semicolon. ' + 'Try "%s: %s" instead.', name, value.replace(badStyleValueWithSemicolonPattern, '')) : null);
      };
      var warnValidStyle = function(name, value) {
        if (name.indexOf('-') > -1) {
          warnHyphenatedStyleName(name);
        } else if (badVendoredStyleNamePattern.test(name)) {
          warnBadVendoredStyleName(name);
        } else if (badStyleValueWithSemicolonPattern.test(value)) {
          warnStyleValueWithSemicolon(name, value);
        }
      };
    }
    var CSSPropertyOperations = {
      createMarkupForStyles: function(styles) {
        var serialized = '';
        for (var styleName in styles) {
          if (!styles.hasOwnProperty(styleName)) {
            continue;
          }
          var styleValue = styles[styleName];
          if ("production" !== process.env.NODE_ENV) {
            warnValidStyle(styleName, styleValue);
          }
          if (styleValue != null) {
            serialized += processStyleName(styleName) + ':';
            serialized += dangerousStyleValue(styleName, styleValue) + ';';
          }
        }
        return serialized || null;
      },
      setValueForStyles: function(node, styles) {
        var style = node.style;
        for (var styleName in styles) {
          if (!styles.hasOwnProperty(styleName)) {
            continue;
          }
          if ("production" !== process.env.NODE_ENV) {
            warnValidStyle(styleName, styles[styleName]);
          }
          var styleValue = dangerousStyleValue(styleName, styles[styleName]);
          if (styleName === 'float') {
            styleName = styleFloatAccessor;
          }
          if (styleValue) {
            style[styleName] = styleValue;
          } else {
            var expansion = CSSProperty.shorthandPropertyExpansions[styleName];
            if (expansion) {
              for (var individualStyleName in expansion) {
                style[individualStyleName] = '';
              }
            } else {
              style[styleName] = '';
            }
          }
        }
      }
    };
    module.exports = CSSPropertyOperations;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactBrowserEventEmitter", ["./EventConstants", "./EventPluginHub", "./EventPluginRegistry", "./ReactEventEmitterMixin", "./ViewportMetrics", "./Object.assign", "./isEventSupported", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var EventConstants = require("./EventConstants");
    var EventPluginHub = require("./EventPluginHub");
    var EventPluginRegistry = require("./EventPluginRegistry");
    var ReactEventEmitterMixin = require("./ReactEventEmitterMixin");
    var ViewportMetrics = require("./ViewportMetrics");
    var assign = require("./Object.assign");
    var isEventSupported = require("./isEventSupported");
    var alreadyListeningTo = {};
    var isMonitoringScrollValue = false;
    var reactTopListenersCounter = 0;
    var topEventMapping = {
      topBlur: 'blur',
      topChange: 'change',
      topClick: 'click',
      topCompositionEnd: 'compositionend',
      topCompositionStart: 'compositionstart',
      topCompositionUpdate: 'compositionupdate',
      topContextMenu: 'contextmenu',
      topCopy: 'copy',
      topCut: 'cut',
      topDoubleClick: 'dblclick',
      topDrag: 'drag',
      topDragEnd: 'dragend',
      topDragEnter: 'dragenter',
      topDragExit: 'dragexit',
      topDragLeave: 'dragleave',
      topDragOver: 'dragover',
      topDragStart: 'dragstart',
      topDrop: 'drop',
      topFocus: 'focus',
      topInput: 'input',
      topKeyDown: 'keydown',
      topKeyPress: 'keypress',
      topKeyUp: 'keyup',
      topMouseDown: 'mousedown',
      topMouseMove: 'mousemove',
      topMouseOut: 'mouseout',
      topMouseOver: 'mouseover',
      topMouseUp: 'mouseup',
      topPaste: 'paste',
      topScroll: 'scroll',
      topSelectionChange: 'selectionchange',
      topTextInput: 'textInput',
      topTouchCancel: 'touchcancel',
      topTouchEnd: 'touchend',
      topTouchMove: 'touchmove',
      topTouchStart: 'touchstart',
      topWheel: 'wheel'
    };
    var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);
    function getListeningForDocument(mountAt) {
      if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
        mountAt[topListenersIDKey] = reactTopListenersCounter++;
        alreadyListeningTo[mountAt[topListenersIDKey]] = {};
      }
      return alreadyListeningTo[mountAt[topListenersIDKey]];
    }
    var ReactBrowserEventEmitter = assign({}, ReactEventEmitterMixin, {
      ReactEventListener: null,
      injection: {injectReactEventListener: function(ReactEventListener) {
          ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
          ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
        }},
      setEnabled: function(enabled) {
        if (ReactBrowserEventEmitter.ReactEventListener) {
          ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
        }
      },
      isEnabled: function() {
        return !!((ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled()));
      },
      listenTo: function(registrationName, contentDocumentHandle) {
        var mountAt = contentDocumentHandle;
        var isListening = getListeningForDocument(mountAt);
        var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];
        var topLevelTypes = EventConstants.topLevelTypes;
        for (var i = 0,
            l = dependencies.length; i < l; i++) {
          var dependency = dependencies[i];
          if (!((isListening.hasOwnProperty(dependency) && isListening[dependency]))) {
            if (dependency === topLevelTypes.topWheel) {
              if (isEventSupported('wheel')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'wheel', mountAt);
              } else if (isEventSupported('mousewheel')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'mousewheel', mountAt);
              } else {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'DOMMouseScroll', mountAt);
              }
            } else if (dependency === topLevelTypes.topScroll) {
              if (isEventSupported('scroll', true)) {
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topScroll, 'scroll', mountAt);
              } else {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topScroll, 'scroll', ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
              }
            } else if (dependency === topLevelTypes.topFocus || dependency === topLevelTypes.topBlur) {
              if (isEventSupported('focus', true)) {
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topFocus, 'focus', mountAt);
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topBlur, 'blur', mountAt);
              } else if (isEventSupported('focusin')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topFocus, 'focusin', mountAt);
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topBlur, 'focusout', mountAt);
              }
              isListening[topLevelTypes.topBlur] = true;
              isListening[topLevelTypes.topFocus] = true;
            } else if (topEventMapping.hasOwnProperty(dependency)) {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
            }
            isListening[dependency] = true;
          }
        }
      },
      trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
        return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
      },
      trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
        return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
      },
      ensureScrollValueMonitoring: function() {
        if (!isMonitoringScrollValue) {
          var refresh = ViewportMetrics.refreshScrollValues;
          ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
          isMonitoringScrollValue = true;
        }
      },
      eventNameDispatchConfigs: EventPluginHub.eventNameDispatchConfigs,
      registrationNameModules: EventPluginHub.registrationNameModules,
      putListener: EventPluginHub.putListener,
      getListener: EventPluginHub.getListener,
      deleteListener: EventPluginHub.deleteListener,
      deleteAllListeners: EventPluginHub.deleteAllListeners
    });
    module.exports = ReactBrowserEventEmitter;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactReconciler", ["./ReactRef", "./ReactElementValidator", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactRef = require("./ReactRef");
    var ReactElementValidator = require("./ReactElementValidator");
    function attachRefs() {
      ReactRef.attachRefs(this, this._currentElement);
    }
    var ReactReconciler = {
      mountComponent: function(internalInstance, rootID, transaction, context) {
        var markup = internalInstance.mountComponent(rootID, transaction, context);
        if ("production" !== process.env.NODE_ENV) {
          ReactElementValidator.checkAndWarnForMutatedProps(internalInstance._currentElement);
        }
        transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
        return markup;
      },
      unmountComponent: function(internalInstance) {
        ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
        internalInstance.unmountComponent();
      },
      receiveComponent: function(internalInstance, nextElement, transaction, context) {
        var prevElement = internalInstance._currentElement;
        if (nextElement === prevElement && nextElement._owner != null) {
          return ;
        }
        if ("production" !== process.env.NODE_ENV) {
          ReactElementValidator.checkAndWarnForMutatedProps(nextElement);
        }
        var refsChanged = ReactRef.shouldUpdateRefs(this, prevElement, nextElement);
        if (refsChanged) {
          ReactRef.detachRefs(internalInstance, prevElement);
        }
        internalInstance.receiveComponent(nextElement, transaction, context);
        if (refsChanged) {
          transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
        }
      }
    };
    module.exports = ReactReconciler;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/containsNode", ["./isTextNode"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  var isTextNode = require("./isTextNode");
  function containsNode(outerNode, innerNode) {
    if (!outerNode || !innerNode) {
      return false;
    } else if (outerNode === innerNode) {
      return true;
    } else if (isTextNode(outerNode)) {
      return false;
    } else if (isTextNode(innerNode)) {
      return containsNode(outerNode, innerNode.parentNode);
    } else if (outerNode.contains) {
      return outerNode.contains(innerNode);
    } else if (outerNode.compareDocumentPosition) {
      return !!(outerNode.compareDocumentPosition(innerNode) & 16);
    } else {
      return false;
    }
  }
  module.exports = containsNode;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/instantiateReactComponent", ["./ReactCompositeComponent", "./ReactEmptyComponent", "./ReactNativeComponent", "./Object.assign", "./invariant", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactCompositeComponent = require("./ReactCompositeComponent");
    var ReactEmptyComponent = require("./ReactEmptyComponent");
    var ReactNativeComponent = require("./ReactNativeComponent");
    var assign = require("./Object.assign");
    var invariant = require("./invariant");
    var warning = require("./warning");
    var ReactCompositeComponentWrapper = function() {};
    assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent.Mixin, {_instantiateReactComponent: instantiateReactComponent});
    function isInternalComponentType(type) {
      return (typeof type === 'function' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function');
    }
    function instantiateReactComponent(node, parentCompositeType) {
      var instance;
      if (node === null || node === false) {
        node = ReactEmptyComponent.emptyElement;
      }
      if (typeof node === 'object') {
        var element = node;
        if ("production" !== process.env.NODE_ENV) {
          ("production" !== process.env.NODE_ENV ? warning(element && (typeof element.type === 'function' || typeof element.type === 'string'), 'Only functions or strings can be mounted as React components.') : null);
        }
        if (parentCompositeType === element.type && typeof element.type === 'string') {
          instance = ReactNativeComponent.createInternalComponent(element);
        } else if (isInternalComponentType(element.type)) {
          instance = new element.type(element);
        } else {
          instance = new ReactCompositeComponentWrapper();
        }
      } else if (typeof node === 'string' || typeof node === 'number') {
        instance = ReactNativeComponent.createInstanceForText(node);
      } else {
        ("production" !== process.env.NODE_ENV ? invariant(false, 'Encountered invalid React node of type %s', typeof node) : invariant(false));
      }
      if ("production" !== process.env.NODE_ENV) {
        ("production" !== process.env.NODE_ENV ? warning(typeof instance.construct === 'function' && typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : null);
      }
      instance.construct(node);
      instance._mountIndex = 0;
      instance._mountImage = null;
      if ("production" !== process.env.NODE_ENV) {
        if (Object.preventExtensions) {
          Object.preventExtensions(instance);
        }
      }
      return instance;
    }
    module.exports = instantiateReactComponent;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactMultiChild", ["./ReactComponentEnvironment", "./ReactMultiChildUpdateTypes", "./ReactReconciler", "./ReactChildReconciler", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactComponentEnvironment = require("./ReactComponentEnvironment");
    var ReactMultiChildUpdateTypes = require("./ReactMultiChildUpdateTypes");
    var ReactReconciler = require("./ReactReconciler");
    var ReactChildReconciler = require("./ReactChildReconciler");
    var updateDepth = 0;
    var updateQueue = [];
    var markupQueue = [];
    function enqueueMarkup(parentID, markup, toIndex) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
        markupIndex: markupQueue.push(markup) - 1,
        textContent: null,
        fromIndex: null,
        toIndex: toIndex
      });
    }
    function enqueueMove(parentID, fromIndex, toIndex) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
        markupIndex: null,
        textContent: null,
        fromIndex: fromIndex,
        toIndex: toIndex
      });
    }
    function enqueueRemove(parentID, fromIndex) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.REMOVE_NODE,
        markupIndex: null,
        textContent: null,
        fromIndex: fromIndex,
        toIndex: null
      });
    }
    function enqueueTextContent(parentID, textContent) {
      updateQueue.push({
        parentID: parentID,
        parentNode: null,
        type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
        markupIndex: null,
        textContent: textContent,
        fromIndex: null,
        toIndex: null
      });
    }
    function processQueue() {
      if (updateQueue.length) {
        ReactComponentEnvironment.processChildrenUpdates(updateQueue, markupQueue);
        clearQueue();
      }
    }
    function clearQueue() {
      updateQueue.length = 0;
      markupQueue.length = 0;
    }
    var ReactMultiChild = {Mixin: {
        mountChildren: function(nestedChildren, transaction, context) {
          var children = ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
          this._renderedChildren = children;
          var mountImages = [];
          var index = 0;
          for (var name in children) {
            if (children.hasOwnProperty(name)) {
              var child = children[name];
              var rootID = this._rootNodeID + name;
              var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
              child._mountIndex = index;
              mountImages.push(mountImage);
              index++;
            }
          }
          return mountImages;
        },
        updateTextContent: function(nextContent) {
          updateDepth++;
          var errorThrown = true;
          try {
            var prevChildren = this._renderedChildren;
            ReactChildReconciler.unmountChildren(prevChildren);
            for (var name in prevChildren) {
              if (prevChildren.hasOwnProperty(name)) {
                this._unmountChildByName(prevChildren[name], name);
              }
            }
            this.setTextContent(nextContent);
            errorThrown = false;
          } finally {
            updateDepth--;
            if (!updateDepth) {
              if (errorThrown) {
                clearQueue();
              } else {
                processQueue();
              }
            }
          }
        },
        updateChildren: function(nextNestedChildren, transaction, context) {
          updateDepth++;
          var errorThrown = true;
          try {
            this._updateChildren(nextNestedChildren, transaction, context);
            errorThrown = false;
          } finally {
            updateDepth--;
            if (!updateDepth) {
              if (errorThrown) {
                clearQueue();
              } else {
                processQueue();
              }
            }
          }
        },
        _updateChildren: function(nextNestedChildren, transaction, context) {
          var prevChildren = this._renderedChildren;
          var nextChildren = ReactChildReconciler.updateChildren(prevChildren, nextNestedChildren, transaction, context);
          this._renderedChildren = nextChildren;
          if (!nextChildren && !prevChildren) {
            return ;
          }
          var name;
          var lastIndex = 0;
          var nextIndex = 0;
          for (name in nextChildren) {
            if (!nextChildren.hasOwnProperty(name)) {
              continue;
            }
            var prevChild = prevChildren && prevChildren[name];
            var nextChild = nextChildren[name];
            if (prevChild === nextChild) {
              this.moveChild(prevChild, nextIndex, lastIndex);
              lastIndex = Math.max(prevChild._mountIndex, lastIndex);
              prevChild._mountIndex = nextIndex;
            } else {
              if (prevChild) {
                lastIndex = Math.max(prevChild._mountIndex, lastIndex);
                this._unmountChildByName(prevChild, name);
              }
              this._mountChildByNameAtIndex(nextChild, name, nextIndex, transaction, context);
            }
            nextIndex++;
          }
          for (name in prevChildren) {
            if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
              this._unmountChildByName(prevChildren[name], name);
            }
          }
        },
        unmountChildren: function() {
          var renderedChildren = this._renderedChildren;
          ReactChildReconciler.unmountChildren(renderedChildren);
          this._renderedChildren = null;
        },
        moveChild: function(child, toIndex, lastIndex) {
          if (child._mountIndex < lastIndex) {
            enqueueMove(this._rootNodeID, child._mountIndex, toIndex);
          }
        },
        createChild: function(child, mountImage) {
          enqueueMarkup(this._rootNodeID, mountImage, child._mountIndex);
        },
        removeChild: function(child) {
          enqueueRemove(this._rootNodeID, child._mountIndex);
        },
        setTextContent: function(textContent) {
          enqueueTextContent(this._rootNodeID, textContent);
        },
        _mountChildByNameAtIndex: function(child, name, index, transaction, context) {
          var rootID = this._rootNodeID + name;
          var mountImage = ReactReconciler.mountComponent(child, rootID, transaction, context);
          child._mountIndex = index;
          this.createChild(child, mountImage);
        },
        _unmountChildByName: function(child, name) {
          this.removeChild(child);
          child._mountIndex = null;
        }
      }};
    module.exports = ReactMultiChild;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/createNodesFromMarkup", ["./ExecutionEnvironment", "./createArrayFrom", "./getMarkupWrap", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var ExecutionEnvironment = require("./ExecutionEnvironment");
    var createArrayFrom = require("./createArrayFrom");
    var getMarkupWrap = require("./getMarkupWrap");
    var invariant = require("./invariant");
    var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
    var nodeNamePattern = /^\s*<(\w+)/;
    function getNodeName(markup) {
      var nodeNameMatch = markup.match(nodeNamePattern);
      return nodeNameMatch && nodeNameMatch[1].toLowerCase();
    }
    function createNodesFromMarkup(markup, handleScript) {
      var node = dummyNode;
      ("production" !== process.env.NODE_ENV ? invariant(!!dummyNode, 'createNodesFromMarkup dummy not initialized') : invariant(!!dummyNode));
      var nodeName = getNodeName(markup);
      var wrap = nodeName && getMarkupWrap(nodeName);
      if (wrap) {
        node.innerHTML = wrap[1] + markup + wrap[2];
        var wrapDepth = wrap[0];
        while (wrapDepth--) {
          node = node.lastChild;
        }
      } else {
        node.innerHTML = markup;
      }
      var scripts = node.getElementsByTagName('script');
      if (scripts.length) {
        ("production" !== process.env.NODE_ENV ? invariant(handleScript, 'createNodesFromMarkup(...): Unexpected <script> element rendered.') : invariant(handleScript));
        createArrayFrom(scripts).forEach(handleScript);
      }
      var nodes = createArrayFrom(node.childNodes);
      while (node.lastChild) {
        node.removeChild(node.lastChild);
      }
      return nodes;
    }
    module.exports = createNodesFromMarkup;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SyntheticCompositionEvent", ["./SyntheticEvent"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var SyntheticEvent = require("./SyntheticEvent");
  var CompositionEventInterface = {data: null};
  function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent) {
    SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent);
  }
  SyntheticEvent.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);
  module.exports = SyntheticCompositionEvent;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/EnterLeaveEventPlugin", ["./EventConstants", "./EventPropagators", "./SyntheticMouseEvent", "./ReactMount", "./keyOf"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var EventConstants = require("./EventConstants");
  var EventPropagators = require("./EventPropagators");
  var SyntheticMouseEvent = require("./SyntheticMouseEvent");
  var ReactMount = require("./ReactMount");
  var keyOf = require("./keyOf");
  var topLevelTypes = EventConstants.topLevelTypes;
  var getFirstReactDOM = ReactMount.getFirstReactDOM;
  var eventTypes = {
    mouseEnter: {
      registrationName: keyOf({onMouseEnter: null}),
      dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
    },
    mouseLeave: {
      registrationName: keyOf({onMouseLeave: null}),
      dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
    }
  };
  var extractedEvents = [null, null];
  var EnterLeaveEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      if (topLevelType === topLevelTypes.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
        return null;
      }
      if (topLevelType !== topLevelTypes.topMouseOut && topLevelType !== topLevelTypes.topMouseOver) {
        return null;
      }
      var win;
      if (topLevelTarget.window === topLevelTarget) {
        win = topLevelTarget;
      } else {
        var doc = topLevelTarget.ownerDocument;
        if (doc) {
          win = doc.defaultView || doc.parentWindow;
        } else {
          win = window;
        }
      }
      var from,
          to;
      if (topLevelType === topLevelTypes.topMouseOut) {
        from = topLevelTarget;
        to = getFirstReactDOM(nativeEvent.relatedTarget || nativeEvent.toElement) || win;
      } else {
        from = win;
        to = topLevelTarget;
      }
      if (from === to) {
        return null;
      }
      var fromID = from ? ReactMount.getID(from) : '';
      var toID = to ? ReactMount.getID(to) : '';
      var leave = SyntheticMouseEvent.getPooled(eventTypes.mouseLeave, fromID, nativeEvent);
      leave.type = 'mouseleave';
      leave.target = from;
      leave.relatedTarget = to;
      var enter = SyntheticMouseEvent.getPooled(eventTypes.mouseEnter, toID, nativeEvent);
      enter.type = 'mouseenter';
      enter.target = to;
      enter.relatedTarget = from;
      EventPropagators.accumulateEnterLeaveDispatches(leave, enter, fromID, toID);
      extractedEvents[0] = leave;
      extractedEvents[1] = enter;
      return extractedEvents;
    }
  };
  module.exports = EnterLeaveEventPlugin;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOMButton", ["./AutoFocusMixin", "./ReactBrowserComponentMixin", "./ReactClass", "./ReactElement", "./keyMirror"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var AutoFocusMixin = require("./AutoFocusMixin");
  var ReactBrowserComponentMixin = require("./ReactBrowserComponentMixin");
  var ReactClass = require("./ReactClass");
  var ReactElement = require("./ReactElement");
  var keyMirror = require("./keyMirror");
  var button = ReactElement.createFactory('button');
  var mouseListenerNames = keyMirror({
    onClick: true,
    onDoubleClick: true,
    onMouseDown: true,
    onMouseMove: true,
    onMouseUp: true,
    onClickCapture: true,
    onDoubleClickCapture: true,
    onMouseDownCapture: true,
    onMouseMoveCapture: true,
    onMouseUpCapture: true
  });
  var ReactDOMButton = ReactClass.createClass({
    displayName: 'ReactDOMButton',
    tagName: 'BUTTON',
    mixins: [AutoFocusMixin, ReactBrowserComponentMixin],
    render: function() {
      var props = {};
      for (var key in this.props) {
        if (this.props.hasOwnProperty(key) && (!this.props.disabled || !mouseListenerNames[key])) {
          props[key] = this.props[key];
        }
      }
      return button(props, this.props.children);
    }
  });
  module.exports = ReactDOMButton;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOMInput", ["./AutoFocusMixin", "./DOMPropertyOperations", "./LinkedValueUtils", "./ReactBrowserComponentMixin", "./ReactClass", "./ReactElement", "./ReactMount", "./ReactUpdates", "./Object.assign", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var AutoFocusMixin = require("./AutoFocusMixin");
    var DOMPropertyOperations = require("./DOMPropertyOperations");
    var LinkedValueUtils = require("./LinkedValueUtils");
    var ReactBrowserComponentMixin = require("./ReactBrowserComponentMixin");
    var ReactClass = require("./ReactClass");
    var ReactElement = require("./ReactElement");
    var ReactMount = require("./ReactMount");
    var ReactUpdates = require("./ReactUpdates");
    var assign = require("./Object.assign");
    var invariant = require("./invariant");
    var input = ReactElement.createFactory('input');
    var instancesByReactID = {};
    function forceUpdateIfMounted() {
      if (this.isMounted()) {
        this.forceUpdate();
      }
    }
    var ReactDOMInput = ReactClass.createClass({
      displayName: 'ReactDOMInput',
      tagName: 'INPUT',
      mixins: [AutoFocusMixin, LinkedValueUtils.Mixin, ReactBrowserComponentMixin],
      getInitialState: function() {
        var defaultValue = this.props.defaultValue;
        return {
          initialChecked: this.props.defaultChecked || false,
          initialValue: defaultValue != null ? defaultValue : null
        };
      },
      render: function() {
        var props = assign({}, this.props);
        props.defaultChecked = null;
        props.defaultValue = null;
        var value = LinkedValueUtils.getValue(this);
        props.value = value != null ? value : this.state.initialValue;
        var checked = LinkedValueUtils.getChecked(this);
        props.checked = checked != null ? checked : this.state.initialChecked;
        props.onChange = this._handleChange;
        return input(props, this.props.children);
      },
      componentDidMount: function() {
        var id = ReactMount.getID(this.getDOMNode());
        instancesByReactID[id] = this;
      },
      componentWillUnmount: function() {
        var rootNode = this.getDOMNode();
        var id = ReactMount.getID(rootNode);
        delete instancesByReactID[id];
      },
      componentDidUpdate: function(prevProps, prevState, prevContext) {
        var rootNode = this.getDOMNode();
        if (this.props.checked != null) {
          DOMPropertyOperations.setValueForProperty(rootNode, 'checked', this.props.checked || false);
        }
        var value = LinkedValueUtils.getValue(this);
        if (value != null) {
          DOMPropertyOperations.setValueForProperty(rootNode, 'value', '' + value);
        }
      },
      _handleChange: function(event) {
        var returnValue;
        var onChange = LinkedValueUtils.getOnChange(this);
        if (onChange) {
          returnValue = onChange.call(this, event);
        }
        ReactUpdates.asap(forceUpdateIfMounted, this);
        var name = this.props.name;
        if (this.props.type === 'radio' && name != null) {
          var rootNode = this.getDOMNode();
          var queryRoot = rootNode;
          while (queryRoot.parentNode) {
            queryRoot = queryRoot.parentNode;
          }
          var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');
          for (var i = 0,
              groupLen = group.length; i < groupLen; i++) {
            var otherNode = group[i];
            if (otherNode === rootNode || otherNode.form !== rootNode.form) {
              continue;
            }
            var otherID = ReactMount.getID(otherNode);
            ("production" !== process.env.NODE_ENV ? invariant(otherID, 'ReactDOMInput: Mixing React and non-React radio inputs with the ' + 'same `name` is not supported.') : invariant(otherID));
            var otherInstance = instancesByReactID[otherID];
            ("production" !== process.env.NODE_ENV ? invariant(otherInstance, 'ReactDOMInput: Unknown radio button ID %s.', otherID) : invariant(otherInstance));
            ReactUpdates.asap(forceUpdateIfMounted, otherInstance);
          }
        }
        return returnValue;
      }
    });
    module.exports = ReactDOMInput;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactInputSelection", ["./ReactDOMSelection", "./containsNode", "./focusNode", "./getActiveElement"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var ReactDOMSelection = require("./ReactDOMSelection");
  var containsNode = require("./containsNode");
  var focusNode = require("./focusNode");
  var getActiveElement = require("./getActiveElement");
  function isInDocument(node) {
    return containsNode(document.documentElement, node);
  }
  var ReactInputSelection = {
    hasSelectionCapabilities: function(elem) {
      return elem && (((elem.nodeName === 'INPUT' && elem.type === 'text') || elem.nodeName === 'TEXTAREA' || elem.contentEditable === 'true'));
    },
    getSelectionInformation: function() {
      var focusedElem = getActiveElement();
      return {
        focusedElem: focusedElem,
        selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
      };
    },
    restoreSelection: function(priorSelectionInformation) {
      var curFocusedElem = getActiveElement();
      var priorFocusedElem = priorSelectionInformation.focusedElem;
      var priorSelectionRange = priorSelectionInformation.selectionRange;
      if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
        if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
          ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
        }
        focusNode(priorFocusedElem);
      }
    },
    getSelection: function(input) {
      var selection;
      if ('selectionStart' in input) {
        selection = {
          start: input.selectionStart,
          end: input.selectionEnd
        };
      } else if (document.selection && input.nodeName === 'INPUT') {
        var range = document.selection.createRange();
        if (range.parentElement() === input) {
          selection = {
            start: -range.moveStart('character', -input.value.length),
            end: -range.moveEnd('character', -input.value.length)
          };
        }
      } else {
        selection = ReactDOMSelection.getOffsets(input);
      }
      return selection || {
        start: 0,
        end: 0
      };
    },
    setSelection: function(input, offsets) {
      var start = offsets.start;
      var end = offsets.end;
      if (typeof end === 'undefined') {
        end = start;
      }
      if ('selectionStart' in input) {
        input.selectionStart = start;
        input.selectionEnd = Math.min(end, input.value.length);
      } else if (document.selection && input.nodeName === 'INPUT') {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveStart('character', start);
        range.moveEnd('character', end - start);
        range.select();
      } else {
        ReactDOMSelection.setOffsets(input, offsets);
      }
    }
  };
  module.exports = ReactInputSelection;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/SimpleEventPlugin", ["./EventConstants", "./EventPluginUtils", "./EventPropagators", "./SyntheticClipboardEvent", "./SyntheticEvent", "./SyntheticFocusEvent", "./SyntheticKeyboardEvent", "./SyntheticMouseEvent", "./SyntheticDragEvent", "./SyntheticTouchEvent", "./SyntheticUIEvent", "./SyntheticWheelEvent", "./getEventCharCode", "./invariant", "./keyOf", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var EventConstants = require("./EventConstants");
    var EventPluginUtils = require("./EventPluginUtils");
    var EventPropagators = require("./EventPropagators");
    var SyntheticClipboardEvent = require("./SyntheticClipboardEvent");
    var SyntheticEvent = require("./SyntheticEvent");
    var SyntheticFocusEvent = require("./SyntheticFocusEvent");
    var SyntheticKeyboardEvent = require("./SyntheticKeyboardEvent");
    var SyntheticMouseEvent = require("./SyntheticMouseEvent");
    var SyntheticDragEvent = require("./SyntheticDragEvent");
    var SyntheticTouchEvent = require("./SyntheticTouchEvent");
    var SyntheticUIEvent = require("./SyntheticUIEvent");
    var SyntheticWheelEvent = require("./SyntheticWheelEvent");
    var getEventCharCode = require("./getEventCharCode");
    var invariant = require("./invariant");
    var keyOf = require("./keyOf");
    var warning = require("./warning");
    var topLevelTypes = EventConstants.topLevelTypes;
    var eventTypes = {
      blur: {phasedRegistrationNames: {
          bubbled: keyOf({onBlur: true}),
          captured: keyOf({onBlurCapture: true})
        }},
      click: {phasedRegistrationNames: {
          bubbled: keyOf({onClick: true}),
          captured: keyOf({onClickCapture: true})
        }},
      contextMenu: {phasedRegistrationNames: {
          bubbled: keyOf({onContextMenu: true}),
          captured: keyOf({onContextMenuCapture: true})
        }},
      copy: {phasedRegistrationNames: {
          bubbled: keyOf({onCopy: true}),
          captured: keyOf({onCopyCapture: true})
        }},
      cut: {phasedRegistrationNames: {
          bubbled: keyOf({onCut: true}),
          captured: keyOf({onCutCapture: true})
        }},
      doubleClick: {phasedRegistrationNames: {
          bubbled: keyOf({onDoubleClick: true}),
          captured: keyOf({onDoubleClickCapture: true})
        }},
      drag: {phasedRegistrationNames: {
          bubbled: keyOf({onDrag: true}),
          captured: keyOf({onDragCapture: true})
        }},
      dragEnd: {phasedRegistrationNames: {
          bubbled: keyOf({onDragEnd: true}),
          captured: keyOf({onDragEndCapture: true})
        }},
      dragEnter: {phasedRegistrationNames: {
          bubbled: keyOf({onDragEnter: true}),
          captured: keyOf({onDragEnterCapture: true})
        }},
      dragExit: {phasedRegistrationNames: {
          bubbled: keyOf({onDragExit: true}),
          captured: keyOf({onDragExitCapture: true})
        }},
      dragLeave: {phasedRegistrationNames: {
          bubbled: keyOf({onDragLeave: true}),
          captured: keyOf({onDragLeaveCapture: true})
        }},
      dragOver: {phasedRegistrationNames: {
          bubbled: keyOf({onDragOver: true}),
          captured: keyOf({onDragOverCapture: true})
        }},
      dragStart: {phasedRegistrationNames: {
          bubbled: keyOf({onDragStart: true}),
          captured: keyOf({onDragStartCapture: true})
        }},
      drop: {phasedRegistrationNames: {
          bubbled: keyOf({onDrop: true}),
          captured: keyOf({onDropCapture: true})
        }},
      focus: {phasedRegistrationNames: {
          bubbled: keyOf({onFocus: true}),
          captured: keyOf({onFocusCapture: true})
        }},
      input: {phasedRegistrationNames: {
          bubbled: keyOf({onInput: true}),
          captured: keyOf({onInputCapture: true})
        }},
      keyDown: {phasedRegistrationNames: {
          bubbled: keyOf({onKeyDown: true}),
          captured: keyOf({onKeyDownCapture: true})
        }},
      keyPress: {phasedRegistrationNames: {
          bubbled: keyOf({onKeyPress: true}),
          captured: keyOf({onKeyPressCapture: true})
        }},
      keyUp: {phasedRegistrationNames: {
          bubbled: keyOf({onKeyUp: true}),
          captured: keyOf({onKeyUpCapture: true})
        }},
      load: {phasedRegistrationNames: {
          bubbled: keyOf({onLoad: true}),
          captured: keyOf({onLoadCapture: true})
        }},
      error: {phasedRegistrationNames: {
          bubbled: keyOf({onError: true}),
          captured: keyOf({onErrorCapture: true})
        }},
      mouseDown: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseDown: true}),
          captured: keyOf({onMouseDownCapture: true})
        }},
      mouseMove: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseMove: true}),
          captured: keyOf({onMouseMoveCapture: true})
        }},
      mouseOut: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseOut: true}),
          captured: keyOf({onMouseOutCapture: true})
        }},
      mouseOver: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseOver: true}),
          captured: keyOf({onMouseOverCapture: true})
        }},
      mouseUp: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseUp: true}),
          captured: keyOf({onMouseUpCapture: true})
        }},
      paste: {phasedRegistrationNames: {
          bubbled: keyOf({onPaste: true}),
          captured: keyOf({onPasteCapture: true})
        }},
      reset: {phasedRegistrationNames: {
          bubbled: keyOf({onReset: true}),
          captured: keyOf({onResetCapture: true})
        }},
      scroll: {phasedRegistrationNames: {
          bubbled: keyOf({onScroll: true}),
          captured: keyOf({onScrollCapture: true})
        }},
      submit: {phasedRegistrationNames: {
          bubbled: keyOf({onSubmit: true}),
          captured: keyOf({onSubmitCapture: true})
        }},
      touchCancel: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchCancel: true}),
          captured: keyOf({onTouchCancelCapture: true})
        }},
      touchEnd: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchEnd: true}),
          captured: keyOf({onTouchEndCapture: true})
        }},
      touchMove: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchMove: true}),
          captured: keyOf({onTouchMoveCapture: true})
        }},
      touchStart: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchStart: true}),
          captured: keyOf({onTouchStartCapture: true})
        }},
      wheel: {phasedRegistrationNames: {
          bubbled: keyOf({onWheel: true}),
          captured: keyOf({onWheelCapture: true})
        }}
    };
    var topLevelEventsToDispatchConfig = {
      topBlur: eventTypes.blur,
      topClick: eventTypes.click,
      topContextMenu: eventTypes.contextMenu,
      topCopy: eventTypes.copy,
      topCut: eventTypes.cut,
      topDoubleClick: eventTypes.doubleClick,
      topDrag: eventTypes.drag,
      topDragEnd: eventTypes.dragEnd,
      topDragEnter: eventTypes.dragEnter,
      topDragExit: eventTypes.dragExit,
      topDragLeave: eventTypes.dragLeave,
      topDragOver: eventTypes.dragOver,
      topDragStart: eventTypes.dragStart,
      topDrop: eventTypes.drop,
      topError: eventTypes.error,
      topFocus: eventTypes.focus,
      topInput: eventTypes.input,
      topKeyDown: eventTypes.keyDown,
      topKeyPress: eventTypes.keyPress,
      topKeyUp: eventTypes.keyUp,
      topLoad: eventTypes.load,
      topMouseDown: eventTypes.mouseDown,
      topMouseMove: eventTypes.mouseMove,
      topMouseOut: eventTypes.mouseOut,
      topMouseOver: eventTypes.mouseOver,
      topMouseUp: eventTypes.mouseUp,
      topPaste: eventTypes.paste,
      topReset: eventTypes.reset,
      topScroll: eventTypes.scroll,
      topSubmit: eventTypes.submit,
      topTouchCancel: eventTypes.touchCancel,
      topTouchEnd: eventTypes.touchEnd,
      topTouchMove: eventTypes.touchMove,
      topTouchStart: eventTypes.touchStart,
      topWheel: eventTypes.wheel
    };
    for (var topLevelType in topLevelEventsToDispatchConfig) {
      topLevelEventsToDispatchConfig[topLevelType].dependencies = [topLevelType];
    }
    var SimpleEventPlugin = {
      eventTypes: eventTypes,
      executeDispatch: function(event, listener, domID) {
        var returnValue = EventPluginUtils.executeDispatch(event, listener, domID);
        ("production" !== process.env.NODE_ENV ? warning(typeof returnValue !== 'boolean', 'Returning `false` from an event handler is deprecated and will be ' + 'ignored in a future release. Instead, manually call ' + 'e.stopPropagation() or e.preventDefault(), as appropriate.') : null);
        if (returnValue === false) {
          event.stopPropagation();
          event.preventDefault();
        }
      },
      extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
        var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
        if (!dispatchConfig) {
          return null;
        }
        var EventConstructor;
        switch (topLevelType) {
          case topLevelTypes.topInput:
          case topLevelTypes.topLoad:
          case topLevelTypes.topError:
          case topLevelTypes.topReset:
          case topLevelTypes.topSubmit:
            EventConstructor = SyntheticEvent;
            break;
          case topLevelTypes.topKeyPress:
            if (getEventCharCode(nativeEvent) === 0) {
              return null;
            }
          case topLevelTypes.topKeyDown:
          case topLevelTypes.topKeyUp:
            EventConstructor = SyntheticKeyboardEvent;
            break;
          case topLevelTypes.topBlur:
          case topLevelTypes.topFocus:
            EventConstructor = SyntheticFocusEvent;
            break;
          case topLevelTypes.topClick:
            if (nativeEvent.button === 2) {
              return null;
            }
          case topLevelTypes.topContextMenu:
          case topLevelTypes.topDoubleClick:
          case topLevelTypes.topMouseDown:
          case topLevelTypes.topMouseMove:
          case topLevelTypes.topMouseOut:
          case topLevelTypes.topMouseOver:
          case topLevelTypes.topMouseUp:
            EventConstructor = SyntheticMouseEvent;
            break;
          case topLevelTypes.topDrag:
          case topLevelTypes.topDragEnd:
          case topLevelTypes.topDragEnter:
          case topLevelTypes.topDragExit:
          case topLevelTypes.topDragLeave:
          case topLevelTypes.topDragOver:
          case topLevelTypes.topDragStart:
          case topLevelTypes.topDrop:
            EventConstructor = SyntheticDragEvent;
            break;
          case topLevelTypes.topTouchCancel:
          case topLevelTypes.topTouchEnd:
          case topLevelTypes.topTouchMove:
          case topLevelTypes.topTouchStart:
            EventConstructor = SyntheticTouchEvent;
            break;
          case topLevelTypes.topScroll:
            EventConstructor = SyntheticUIEvent;
            break;
          case topLevelTypes.topWheel:
            EventConstructor = SyntheticWheelEvent;
            break;
          case topLevelTypes.topCopy:
          case topLevelTypes.topCut:
          case topLevelTypes.topPaste:
            EventConstructor = SyntheticClipboardEvent;
            break;
        }
        ("production" !== process.env.NODE_ENV ? invariant(EventConstructor, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : invariant(EventConstructor));
        var event = EventConstructor.getPooled(dispatchConfig, topLevelTargetID, nativeEvent);
        EventPropagators.accumulateTwoPhaseDispatches(event);
        return event;
      }
    };
    module.exports = SimpleEventPlugin;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDefaultPerf", ["./DOMProperty", "./ReactDefaultPerfAnalysis", "./ReactMount", "./ReactPerf", "./performanceNow"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var DOMProperty = require("./DOMProperty");
  var ReactDefaultPerfAnalysis = require("./ReactDefaultPerfAnalysis");
  var ReactMount = require("./ReactMount");
  var ReactPerf = require("./ReactPerf");
  var performanceNow = require("./performanceNow");
  function roundFloat(val) {
    return Math.floor(val * 100) / 100;
  }
  function addValue(obj, key, val) {
    obj[key] = (obj[key] || 0) + val;
  }
  var ReactDefaultPerf = {
    _allMeasurements: [],
    _mountStack: [0],
    _injected: false,
    start: function() {
      if (!ReactDefaultPerf._injected) {
        ReactPerf.injection.injectMeasure(ReactDefaultPerf.measure);
      }
      ReactDefaultPerf._allMeasurements.length = 0;
      ReactPerf.enableMeasure = true;
    },
    stop: function() {
      ReactPerf.enableMeasure = false;
    },
    getLastMeasurements: function() {
      return ReactDefaultPerf._allMeasurements;
    },
    printExclusive: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getExclusiveSummary(measurements);
      console.table(summary.map(function(item) {
        return {
          'Component class name': item.componentName,
          'Total inclusive time (ms)': roundFloat(item.inclusive),
          'Exclusive mount time (ms)': roundFloat(item.exclusive),
          'Exclusive render time (ms)': roundFloat(item.render),
          'Mount time per instance (ms)': roundFloat(item.exclusive / item.count),
          'Render time per instance (ms)': roundFloat(item.render / item.count),
          'Instances': item.count
        };
      }));
    },
    printInclusive: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements);
      console.table(summary.map(function(item) {
        return {
          'Owner > component': item.componentName,
          'Inclusive time (ms)': roundFloat(item.time),
          'Instances': item.count
        };
      }));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    getMeasurementsSummaryMap: function(measurements) {
      var summary = ReactDefaultPerfAnalysis.getInclusiveSummary(measurements, true);
      return summary.map(function(item) {
        return {
          'Owner > component': item.componentName,
          'Wasted time (ms)': item.time,
          'Instances': item.count
        };
      });
    },
    printWasted: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      console.table(ReactDefaultPerf.getMeasurementsSummaryMap(measurements));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    printDOM: function(measurements) {
      measurements = measurements || ReactDefaultPerf._allMeasurements;
      var summary = ReactDefaultPerfAnalysis.getDOMSummary(measurements);
      console.table(summary.map(function(item) {
        var result = {};
        result[DOMProperty.ID_ATTRIBUTE_NAME] = item.id;
        result['type'] = item.type;
        result['args'] = JSON.stringify(item.args);
        return result;
      }));
      console.log('Total time:', ReactDefaultPerfAnalysis.getTotalTime(measurements).toFixed(2) + ' ms');
    },
    _recordWrite: function(id, fnName, totalTime, args) {
      var writes = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1].writes;
      writes[id] = writes[id] || [];
      writes[id].push({
        type: fnName,
        time: totalTime,
        args: args
      });
    },
    measure: function(moduleName, fnName, func) {
      return function() {
        for (var args = [],
            $__0 = 0,
            $__1 = arguments.length; $__0 < $__1; $__0++)
          args.push(arguments[$__0]);
        var totalTime;
        var rv;
        var start;
        if (fnName === '_renderNewRootComponent' || fnName === 'flushBatchedUpdates') {
          ReactDefaultPerf._allMeasurements.push({
            exclusive: {},
            inclusive: {},
            render: {},
            counts: {},
            writes: {},
            displayNames: {},
            totalTime: 0
          });
          start = performanceNow();
          rv = func.apply(this, args);
          ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1].totalTime = performanceNow() - start;
          return rv;
        } else if (moduleName === 'ReactDOMIDOperations' || moduleName === 'ReactComponentBrowserEnvironment') {
          start = performanceNow();
          rv = func.apply(this, args);
          totalTime = performanceNow() - start;
          if (fnName === '_mountImageIntoNode') {
            var mountID = ReactMount.getID(args[1]);
            ReactDefaultPerf._recordWrite(mountID, fnName, totalTime, args[0]);
          } else if (fnName === 'dangerouslyProcessChildrenUpdates') {
            args[0].forEach(function(update) {
              var writeArgs = {};
              if (update.fromIndex !== null) {
                writeArgs.fromIndex = update.fromIndex;
              }
              if (update.toIndex !== null) {
                writeArgs.toIndex = update.toIndex;
              }
              if (update.textContent !== null) {
                writeArgs.textContent = update.textContent;
              }
              if (update.markupIndex !== null) {
                writeArgs.markup = args[1][update.markupIndex];
              }
              ReactDefaultPerf._recordWrite(update.parentID, update.type, totalTime, writeArgs);
            });
          } else {
            ReactDefaultPerf._recordWrite(args[0], fnName, totalTime, Array.prototype.slice.call(args, 1));
          }
          return rv;
        } else if (moduleName === 'ReactCompositeComponent' && (((fnName === 'mountComponent' || fnName === 'updateComponent' || fnName === '_renderValidatedComponent')))) {
          var rootNodeID = fnName === 'mountComponent' ? args[0] : this._rootNodeID;
          var isRender = fnName === '_renderValidatedComponent';
          var isMount = fnName === 'mountComponent';
          var mountStack = ReactDefaultPerf._mountStack;
          var entry = ReactDefaultPerf._allMeasurements[ReactDefaultPerf._allMeasurements.length - 1];
          if (isRender) {
            addValue(entry.counts, rootNodeID, 1);
          } else if (isMount) {
            mountStack.push(0);
          }
          start = performanceNow();
          rv = func.apply(this, args);
          totalTime = performanceNow() - start;
          if (isRender) {
            addValue(entry.render, rootNodeID, totalTime);
          } else if (isMount) {
            var subMountTime = mountStack.pop();
            mountStack[mountStack.length - 1] += totalTime;
            addValue(entry.exclusive, rootNodeID, totalTime - subMountTime);
            addValue(entry.inclusive, rootNodeID, totalTime);
          } else {
            addValue(entry.inclusive, rootNodeID, totalTime);
          }
          var displayName = null;
          if (this._instance.constructor.displayName) {
            displayName = this._instance.constructor.displayName;
          } else if (this._currentElement.type) {
            displayName = this._currentElement.type;
          }
          entry.displayNames[rootNodeID] = {
            current: displayName,
            owner: this._currentElement._owner ? this._currentElement._owner._instance.constructor.displayName : '<root>'
          };
          return rv;
        } else {
          return func.apply(this, args);
        }
      };
    }
  };
  module.exports = ReactDefaultPerf;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/cloneWithProps", ["./ReactElement", "./ReactPropTransferer", "./keyOf", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactElement = require("./ReactElement");
    var ReactPropTransferer = require("./ReactPropTransferer");
    var keyOf = require("./keyOf");
    var warning = require("./warning");
    var CHILDREN_PROP = keyOf({children: null});
    function cloneWithProps(child, props) {
      if ("production" !== process.env.NODE_ENV) {
        ("production" !== process.env.NODE_ENV ? warning(!child.ref, 'You are calling cloneWithProps() on a child with a ref. This is ' + 'dangerous because you\'re creating a new child which will not be ' + 'added as a ref to its parent.') : null);
      }
      var newProps = ReactPropTransferer.mergeProps(props, child.props);
      if (!newProps.hasOwnProperty(CHILDREN_PROP) && child.props.hasOwnProperty(CHILDREN_PROP)) {
        newProps.children = child.props.children;
      }
      return ReactElement.createElement(child.type, newProps);
    }
    module.exports = cloneWithProps;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("github:jspm/nodelibs-process@0.1.1", ["github:jspm/nodelibs-process@0.1.1/index"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("github:jspm/nodelibs-process@0.1.1/index");
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/traverseAllChildren", ["./ReactElement", "./ReactInstanceHandles", "./getIteratorFn", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactElement = require("./ReactElement");
    var ReactInstanceHandles = require("./ReactInstanceHandles");
    var getIteratorFn = require("./getIteratorFn");
    var invariant = require("./invariant");
    var SEPARATOR = ReactInstanceHandles.SEPARATOR;
    var SUBSEPARATOR = ':';
    var userProvidedKeyEscaperLookup = {
      '=': '=0',
      '.': '=1',
      ':': '=2'
    };
    var userProvidedKeyEscapeRegex = /[=.:]/g;
    function userProvidedKeyEscaper(match) {
      return userProvidedKeyEscaperLookup[match];
    }
    function getComponentKey(component, index) {
      if (component && component.key != null) {
        return wrapUserProvidedKey(component.key);
      }
      return index.toString(36);
    }
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, userProvidedKeyEscaper);
    }
    function wrapUserProvidedKey(key) {
      return '$' + escapeUserProvidedKey(key);
    }
    function traverseAllChildrenImpl(children, nameSoFar, indexSoFar, callback, traverseContext) {
      var type = typeof children;
      if (type === 'undefined' || type === 'boolean') {
        children = null;
      }
      if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
        callback(traverseContext, children, nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar, indexSoFar);
        return 1;
      }
      var child,
          nextName,
          nextIndex;
      var subtreeCount = 0;
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = ((nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) + getComponentKey(child, i));
          nextIndex = indexSoFar + subtreeCount;
          subtreeCount += traverseAllChildrenImpl(child, nextName, nextIndex, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);
        if (iteratorFn) {
          var iterator = iteratorFn.call(children);
          var step;
          if (iteratorFn !== children.entries) {
            var ii = 0;
            while (!(step = iterator.next()).done) {
              child = step.value;
              nextName = ((nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) + getComponentKey(child, ii++));
              nextIndex = indexSoFar + subtreeCount;
              subtreeCount += traverseAllChildrenImpl(child, nextName, nextIndex, callback, traverseContext);
            }
          } else {
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                child = entry[1];
                nextName = ((nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) + wrapUserProvidedKey(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0));
                nextIndex = indexSoFar + subtreeCount;
                subtreeCount += traverseAllChildrenImpl(child, nextName, nextIndex, callback, traverseContext);
              }
            }
          }
        } else if (type === 'object') {
          ("production" !== process.env.NODE_ENV ? invariant(children.nodeType !== 1, 'traverseAllChildren(...): Encountered an invalid child; DOM ' + 'elements are not valid children of React components.') : invariant(children.nodeType !== 1));
          for (var key in children) {
            if (children.hasOwnProperty(key)) {
              child = children[key];
              nextName = ((nameSoFar !== '' ? nameSoFar + SUBSEPARATOR : SEPARATOR) + wrapUserProvidedKey(key) + SUBSEPARATOR + getComponentKey(child, 0));
              nextIndex = indexSoFar + subtreeCount;
              subtreeCount += traverseAllChildrenImpl(child, nextName, nextIndex, callback, traverseContext);
            }
          }
        }
      }
      return subtreeCount;
    }
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }
      return traverseAllChildrenImpl(children, '', 0, callback, traverseContext);
    }
    module.exports = traverseAllChildren;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactComponent", ["./ReactUpdateQueue", "./invariant", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactUpdateQueue = require("./ReactUpdateQueue");
    var invariant = require("./invariant");
    var warning = require("./warning");
    function ReactComponent(props, context) {
      this.props = props;
      this.context = context;
    }
    ReactComponent.prototype.setState = function(partialState, callback) {
      ("production" !== process.env.NODE_ENV ? invariant(typeof partialState === 'object' || partialState == null, 'setState(...): takes an object of state variables to update.') : invariant(typeof partialState === 'object' || partialState == null));
      if ("production" !== process.env.NODE_ENV) {
        ("production" !== process.env.NODE_ENV ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : null);
      }
      ReactUpdateQueue.enqueueSetState(this, partialState);
      if (callback) {
        ReactUpdateQueue.enqueueCallback(this, callback);
      }
    };
    ReactComponent.prototype.forceUpdate = function(callback) {
      ReactUpdateQueue.enqueueForceUpdate(this);
      if (callback) {
        ReactUpdateQueue.enqueueCallback(this, callback);
      }
    };
    if ("production" !== process.env.NODE_ENV) {
      if (Object.defineProperty) {
        var deprecatedAPIs = {
          getDOMNode: 'getDOMNode',
          isMounted: 'isMounted',
          replaceState: 'replaceState',
          setProps: 'setProps'
        };
        var defineDeprecationWarning = function(methodName, displayName) {
          Object.defineProperty(ReactComponent.prototype, methodName, {get: function() {
              ("production" !== process.env.NODE_ENV ? warning(false, '%s(...) is deprecated in plain JavaScript React classes.', displayName) : null);
              return undefined;
            }});
        };
        for (var methodName in deprecatedAPIs) {
          if (deprecatedAPIs.hasOwnProperty(methodName)) {
            defineDeprecationWarning(methodName, deprecatedAPIs[methodName]);
          }
        }
      }
    }
    module.exports = ReactComponent;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactMount", ["./DOMProperty", "./ReactBrowserEventEmitter", "./ReactCurrentOwner", "./ReactElement", "./ReactElementValidator", "./ReactEmptyComponent", "./ReactInstanceHandles", "./ReactInstanceMap", "./ReactMarkupChecksum", "./ReactPerf", "./ReactReconciler", "./ReactUpdateQueue", "./ReactUpdates", "./emptyObject", "./containsNode", "./getReactRootElementInContainer", "./instantiateReactComponent", "./invariant", "./setInnerHTML", "./shouldUpdateReactComponent", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var DOMProperty = require("./DOMProperty");
    var ReactBrowserEventEmitter = require("./ReactBrowserEventEmitter");
    var ReactCurrentOwner = require("./ReactCurrentOwner");
    var ReactElement = require("./ReactElement");
    var ReactElementValidator = require("./ReactElementValidator");
    var ReactEmptyComponent = require("./ReactEmptyComponent");
    var ReactInstanceHandles = require("./ReactInstanceHandles");
    var ReactInstanceMap = require("./ReactInstanceMap");
    var ReactMarkupChecksum = require("./ReactMarkupChecksum");
    var ReactPerf = require("./ReactPerf");
    var ReactReconciler = require("./ReactReconciler");
    var ReactUpdateQueue = require("./ReactUpdateQueue");
    var ReactUpdates = require("./ReactUpdates");
    var emptyObject = require("./emptyObject");
    var containsNode = require("./containsNode");
    var getReactRootElementInContainer = require("./getReactRootElementInContainer");
    var instantiateReactComponent = require("./instantiateReactComponent");
    var invariant = require("./invariant");
    var setInnerHTML = require("./setInnerHTML");
    var shouldUpdateReactComponent = require("./shouldUpdateReactComponent");
    var warning = require("./warning");
    var SEPARATOR = ReactInstanceHandles.SEPARATOR;
    var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
    var nodeCache = {};
    var ELEMENT_NODE_TYPE = 1;
    var DOC_NODE_TYPE = 9;
    var instancesByReactRootID = {};
    var containersByReactRootID = {};
    if ("production" !== process.env.NODE_ENV) {
      var rootElementsByReactRootID = {};
    }
    var findComponentRootReusableArray = [];
    function firstDifferenceIndex(string1, string2) {
      var minLen = Math.min(string1.length, string2.length);
      for (var i = 0; i < minLen; i++) {
        if (string1.charAt(i) !== string2.charAt(i)) {
          return i;
        }
      }
      return string1.length === string2.length ? -1 : minLen;
    }
    function getReactRootID(container) {
      var rootElement = getReactRootElementInContainer(container);
      return rootElement && ReactMount.getID(rootElement);
    }
    function getID(node) {
      var id = internalGetID(node);
      if (id) {
        if (nodeCache.hasOwnProperty(id)) {
          var cached = nodeCache[id];
          if (cached !== node) {
            ("production" !== process.env.NODE_ENV ? invariant(!isValid(cached, id), 'ReactMount: Two valid but unequal nodes with the same `%s`: %s', ATTR_NAME, id) : invariant(!isValid(cached, id)));
            nodeCache[id] = node;
          }
        } else {
          nodeCache[id] = node;
        }
      }
      return id;
    }
    function internalGetID(node) {
      return node && node.getAttribute && node.getAttribute(ATTR_NAME) || '';
    }
    function setID(node, id) {
      var oldID = internalGetID(node);
      if (oldID !== id) {
        delete nodeCache[oldID];
      }
      node.setAttribute(ATTR_NAME, id);
      nodeCache[id] = node;
    }
    function getNode(id) {
      if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
        nodeCache[id] = ReactMount.findReactNodeByID(id);
      }
      return nodeCache[id];
    }
    function getNodeFromInstance(instance) {
      var id = ReactInstanceMap.get(instance)._rootNodeID;
      if (ReactEmptyComponent.isNullComponentID(id)) {
        return null;
      }
      if (!nodeCache.hasOwnProperty(id) || !isValid(nodeCache[id], id)) {
        nodeCache[id] = ReactMount.findReactNodeByID(id);
      }
      return nodeCache[id];
    }
    function isValid(node, id) {
      if (node) {
        ("production" !== process.env.NODE_ENV ? invariant(internalGetID(node) === id, 'ReactMount: Unexpected modification of `%s`', ATTR_NAME) : invariant(internalGetID(node) === id));
        var container = ReactMount.findReactContainerForID(id);
        if (container && containsNode(container, node)) {
          return true;
        }
      }
      return false;
    }
    function purgeID(id) {
      delete nodeCache[id];
    }
    var deepestNodeSoFar = null;
    function findDeepestCachedAncestorImpl(ancestorID) {
      var ancestor = nodeCache[ancestorID];
      if (ancestor && isValid(ancestor, ancestorID)) {
        deepestNodeSoFar = ancestor;
      } else {
        return false;
      }
    }
    function findDeepestCachedAncestor(targetID) {
      deepestNodeSoFar = null;
      ReactInstanceHandles.traverseAncestors(targetID, findDeepestCachedAncestorImpl);
      var foundNode = deepestNodeSoFar;
      deepestNodeSoFar = null;
      return foundNode;
    }
    function mountComponentIntoNode(componentInstance, rootID, container, transaction, shouldReuseMarkup) {
      var markup = ReactReconciler.mountComponent(componentInstance, rootID, transaction, emptyObject);
      componentInstance._isTopLevel = true;
      ReactMount._mountImageIntoNode(markup, container, shouldReuseMarkup);
    }
    function batchedMountComponentIntoNode(componentInstance, rootID, container, shouldReuseMarkup) {
      var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
      transaction.perform(mountComponentIntoNode, null, componentInstance, rootID, container, transaction, shouldReuseMarkup);
      ReactUpdates.ReactReconcileTransaction.release(transaction);
    }
    var ReactMount = {
      _instancesByReactRootID: instancesByReactRootID,
      scrollMonitor: function(container, renderCallback) {
        renderCallback();
      },
      _updateRootComponent: function(prevComponent, nextElement, container, callback) {
        if ("production" !== process.env.NODE_ENV) {
          ReactElementValidator.checkAndWarnForMutatedProps(nextElement);
        }
        ReactMount.scrollMonitor(container, function() {
          ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement);
          if (callback) {
            ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
          }
        });
        if ("production" !== process.env.NODE_ENV) {
          rootElementsByReactRootID[getReactRootID(container)] = getReactRootElementInContainer(container);
        }
        return prevComponent;
      },
      _registerComponent: function(nextComponent, container) {
        ("production" !== process.env.NODE_ENV ? invariant(container && ((container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)), '_registerComponent(...): Target container is not a DOM element.') : invariant(container && ((container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE))));
        ReactBrowserEventEmitter.ensureScrollValueMonitoring();
        var reactRootID = ReactMount.registerContainer(container);
        instancesByReactRootID[reactRootID] = nextComponent;
        return reactRootID;
      },
      _renderNewRootComponent: function(nextComponent, container, shouldReuseMarkup) {
        ("production" !== process.env.NODE_ENV ? warning(ReactCurrentOwner.current == null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate.') : null);
        var componentInstance = instantiateReactComponent(nextComponent, null);
        var reactRootID = ReactMount._registerComponent(componentInstance, container);
        ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, reactRootID, container, shouldReuseMarkup);
        if ("production" !== process.env.NODE_ENV) {
          rootElementsByReactRootID[reactRootID] = getReactRootElementInContainer(container);
        }
        return componentInstance;
      },
      render: function(nextElement, container, callback) {
        ("production" !== process.env.NODE_ENV ? invariant(ReactElement.isValidElement(nextElement), 'React.render(): Invalid component element.%s', (typeof nextElement === 'string' ? ' Instead of passing an element string, make sure to instantiate ' + 'it by passing it to React.createElement.' : typeof nextElement === 'function' ? ' Instead of passing a component class, make sure to instantiate ' + 'it by passing it to React.createElement.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '')) : invariant(ReactElement.isValidElement(nextElement)));
        var prevComponent = instancesByReactRootID[getReactRootID(container)];
        if (prevComponent) {
          var prevElement = prevComponent._currentElement;
          if (shouldUpdateReactComponent(prevElement, nextElement)) {
            return ReactMount._updateRootComponent(prevComponent, nextElement, container, callback).getPublicInstance();
          } else {
            ReactMount.unmountComponentAtNode(container);
          }
        }
        var reactRootElement = getReactRootElementInContainer(container);
        var containerHasReactMarkup = reactRootElement && ReactMount.isRenderedByReact(reactRootElement);
        var shouldReuseMarkup = containerHasReactMarkup && !prevComponent;
        var component = ReactMount._renderNewRootComponent(nextElement, container, shouldReuseMarkup).getPublicInstance();
        if (callback) {
          callback.call(component);
        }
        return component;
      },
      constructAndRenderComponent: function(constructor, props, container) {
        var element = ReactElement.createElement(constructor, props);
        return ReactMount.render(element, container);
      },
      constructAndRenderComponentByID: function(constructor, props, id) {
        var domNode = document.getElementById(id);
        ("production" !== process.env.NODE_ENV ? invariant(domNode, 'Tried to get element with id of "%s" but it is not present on the page.', id) : invariant(domNode));
        return ReactMount.constructAndRenderComponent(constructor, props, domNode);
      },
      registerContainer: function(container) {
        var reactRootID = getReactRootID(container);
        if (reactRootID) {
          reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(reactRootID);
        }
        if (!reactRootID) {
          reactRootID = ReactInstanceHandles.createReactRootID();
        }
        containersByReactRootID[reactRootID] = container;
        return reactRootID;
      },
      unmountComponentAtNode: function(container) {
        ("production" !== process.env.NODE_ENV ? warning(ReactCurrentOwner.current == null, 'unmountComponentAtNode(): Render methods should be a pure function of ' + 'props and state; triggering nested component updates from render is ' + 'not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate.') : null);
        ("production" !== process.env.NODE_ENV ? invariant(container && ((container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)), 'unmountComponentAtNode(...): Target container is not a DOM element.') : invariant(container && ((container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE))));
        var reactRootID = getReactRootID(container);
        var component = instancesByReactRootID[reactRootID];
        if (!component) {
          return false;
        }
        ReactMount.unmountComponentFromNode(component, container);
        delete instancesByReactRootID[reactRootID];
        delete containersByReactRootID[reactRootID];
        if ("production" !== process.env.NODE_ENV) {
          delete rootElementsByReactRootID[reactRootID];
        }
        return true;
      },
      unmountComponentFromNode: function(instance, container) {
        ReactReconciler.unmountComponent(instance);
        if (container.nodeType === DOC_NODE_TYPE) {
          container = container.documentElement;
        }
        while (container.lastChild) {
          container.removeChild(container.lastChild);
        }
      },
      findReactContainerForID: function(id) {
        var reactRootID = ReactInstanceHandles.getReactRootIDFromNodeID(id);
        var container = containersByReactRootID[reactRootID];
        if ("production" !== process.env.NODE_ENV) {
          var rootElement = rootElementsByReactRootID[reactRootID];
          if (rootElement && rootElement.parentNode !== container) {
            ("production" !== process.env.NODE_ENV ? invariant(internalGetID(rootElement) === reactRootID, 'ReactMount: Root element ID differed from reactRootID.') : invariant(internalGetID(rootElement) === reactRootID));
            var containerChild = container.firstChild;
            if (containerChild && reactRootID === internalGetID(containerChild)) {
              rootElementsByReactRootID[reactRootID] = containerChild;
            } else {
              console.warn('ReactMount: Root element has been removed from its original ' + 'container. New container:', rootElement.parentNode);
            }
          }
        }
        return container;
      },
      findReactNodeByID: function(id) {
        var reactRoot = ReactMount.findReactContainerForID(id);
        return ReactMount.findComponentRoot(reactRoot, id);
      },
      isRenderedByReact: function(node) {
        if (node.nodeType !== 1) {
          return false;
        }
        var id = ReactMount.getID(node);
        return id ? id.charAt(0) === SEPARATOR : false;
      },
      getFirstReactDOM: function(node) {
        var current = node;
        while (current && current.parentNode !== current) {
          if (ReactMount.isRenderedByReact(current)) {
            return current;
          }
          current = current.parentNode;
        }
        return null;
      },
      findComponentRoot: function(ancestorNode, targetID) {
        var firstChildren = findComponentRootReusableArray;
        var childIndex = 0;
        var deepestAncestor = findDeepestCachedAncestor(targetID) || ancestorNode;
        firstChildren[0] = deepestAncestor.firstChild;
        firstChildren.length = 1;
        while (childIndex < firstChildren.length) {
          var child = firstChildren[childIndex++];
          var targetChild;
          while (child) {
            var childID = ReactMount.getID(child);
            if (childID) {
              if (targetID === childID) {
                targetChild = child;
              } else if (ReactInstanceHandles.isAncestorIDOf(childID, targetID)) {
                firstChildren.length = childIndex = 0;
                firstChildren.push(child.firstChild);
              }
            } else {
              firstChildren.push(child.firstChild);
            }
            child = child.nextSibling;
          }
          if (targetChild) {
            firstChildren.length = 0;
            return targetChild;
          }
        }
        firstChildren.length = 0;
        ("production" !== process.env.NODE_ENV ? invariant(false, 'findComponentRoot(..., %s): Unable to find element. This probably ' + 'means the DOM was unexpectedly mutated (e.g., by the browser), ' + 'usually due to forgetting a <tbody> when using tables, nesting tags ' + 'like <form>, <p>, or <a>, or using non-SVG elements in an <svg> ' + 'parent. ' + 'Try inspecting the child nodes of the element with React ID `%s`.', targetID, ReactMount.getID(ancestorNode)) : invariant(false));
      },
      _mountImageIntoNode: function(markup, container, shouldReuseMarkup) {
        ("production" !== process.env.NODE_ENV ? invariant(container && ((container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE)), 'mountComponentIntoNode(...): Target container is not valid.') : invariant(container && ((container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE))));
        if (shouldReuseMarkup) {
          var rootElement = getReactRootElementInContainer(container);
          if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
            return ;
          } else {
            var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
            rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
            var rootMarkup = rootElement.outerHTML;
            rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);
            var diffIndex = firstDifferenceIndex(markup, rootMarkup);
            var difference = ' (client) ' + markup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);
            ("production" !== process.env.NODE_ENV ? invariant(container.nodeType !== DOC_NODE_TYPE, 'You\'re trying to render a component to the document using ' + 'server rendering but the checksum was invalid. This usually ' + 'means you rendered a different component type or props on ' + 'the client from the one on the server, or your render() ' + 'methods are impure. React cannot handle this case due to ' + 'cross-browser quirks by rendering at the document root. You ' + 'should look for environment dependent code in your components ' + 'and ensure the props are the same client and server side:\n%s', difference) : invariant(container.nodeType !== DOC_NODE_TYPE));
            if ("production" !== process.env.NODE_ENV) {
              console.warn('React attempted to reuse markup in a container but the ' + 'checksum was invalid. This generally means that you are ' + 'using server rendering and the markup generated on the ' + 'server was not what the client was expecting. React injected ' + 'new markup to compensate which works but you have lost many ' + 'of the benefits of server rendering. Instead, figure out ' + 'why the markup being generated is different on the client ' + 'or server:\n' + difference);
            }
          }
        }
        ("production" !== process.env.NODE_ENV ? invariant(container.nodeType !== DOC_NODE_TYPE, 'You\'re trying to render a component to the document but ' + 'you didn\'t use server rendering. We can\'t do this ' + 'without using server rendering due to cross-browser quirks. ' + 'See React.renderToString() for server rendering.') : invariant(container.nodeType !== DOC_NODE_TYPE));
        setInnerHTML(container, markup);
      },
      getReactRootID: getReactRootID,
      getID: getID,
      setID: setID,
      getNode: getNode,
      getNodeFromInstance: getNodeFromInstance,
      purgeID: purgeID
    };
    ReactPerf.measureMethods(ReactMount, 'ReactMount', {
      _renderNewRootComponent: '_renderNewRootComponent',
      _mountImageIntoNode: '_mountImageIntoNode'
    });
    module.exports = ReactMount;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/Danger", ["./ExecutionEnvironment", "./createNodesFromMarkup", "./emptyFunction", "./getMarkupWrap", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ExecutionEnvironment = require("./ExecutionEnvironment");
    var createNodesFromMarkup = require("./createNodesFromMarkup");
    var emptyFunction = require("./emptyFunction");
    var getMarkupWrap = require("./getMarkupWrap");
    var invariant = require("./invariant");
    var OPEN_TAG_NAME_EXP = /^(<[^ \/>]+)/;
    var RESULT_INDEX_ATTR = 'data-danger-index';
    function getNodeName(markup) {
      return markup.substring(1, markup.indexOf(' '));
    }
    var Danger = {
      dangerouslyRenderMarkup: function(markupList) {
        ("production" !== process.env.NODE_ENV ? invariant(ExecutionEnvironment.canUseDOM, 'dangerouslyRenderMarkup(...): Cannot render markup in a worker ' + 'thread. Make sure `window` and `document` are available globally ' + 'before requiring React when unit testing or use ' + 'React.renderToString for server rendering.') : invariant(ExecutionEnvironment.canUseDOM));
        var nodeName;
        var markupByNodeName = {};
        for (var i = 0; i < markupList.length; i++) {
          ("production" !== process.env.NODE_ENV ? invariant(markupList[i], 'dangerouslyRenderMarkup(...): Missing markup.') : invariant(markupList[i]));
          nodeName = getNodeName(markupList[i]);
          nodeName = getMarkupWrap(nodeName) ? nodeName : '*';
          markupByNodeName[nodeName] = markupByNodeName[nodeName] || [];
          markupByNodeName[nodeName][i] = markupList[i];
        }
        var resultList = [];
        var resultListAssignmentCount = 0;
        for (nodeName in markupByNodeName) {
          if (!markupByNodeName.hasOwnProperty(nodeName)) {
            continue;
          }
          var markupListByNodeName = markupByNodeName[nodeName];
          var resultIndex;
          for (resultIndex in markupListByNodeName) {
            if (markupListByNodeName.hasOwnProperty(resultIndex)) {
              var markup = markupListByNodeName[resultIndex];
              markupListByNodeName[resultIndex] = markup.replace(OPEN_TAG_NAME_EXP, '$1 ' + RESULT_INDEX_ATTR + '="' + resultIndex + '" ');
            }
          }
          var renderNodes = createNodesFromMarkup(markupListByNodeName.join(''), emptyFunction);
          for (var j = 0; j < renderNodes.length; ++j) {
            var renderNode = renderNodes[j];
            if (renderNode.hasAttribute && renderNode.hasAttribute(RESULT_INDEX_ATTR)) {
              resultIndex = +renderNode.getAttribute(RESULT_INDEX_ATTR);
              renderNode.removeAttribute(RESULT_INDEX_ATTR);
              ("production" !== process.env.NODE_ENV ? invariant(!resultList.hasOwnProperty(resultIndex), 'Danger: Assigning to an already-occupied result index.') : invariant(!resultList.hasOwnProperty(resultIndex)));
              resultList[resultIndex] = renderNode;
              resultListAssignmentCount += 1;
            } else if ("production" !== process.env.NODE_ENV) {
              console.error('Danger: Discarding unexpected node:', renderNode);
            }
          }
        }
        ("production" !== process.env.NODE_ENV ? invariant(resultListAssignmentCount === resultList.length, 'Danger: Did not assign to every index of resultList.') : invariant(resultListAssignmentCount === resultList.length));
        ("production" !== process.env.NODE_ENV ? invariant(resultList.length === markupList.length, 'Danger: Expected markup to render %s nodes, but rendered %s.', markupList.length, resultList.length) : invariant(resultList.length === markupList.length));
        return resultList;
      },
      dangerouslyReplaceNodeWithMarkup: function(oldChild, markup) {
        ("production" !== process.env.NODE_ENV ? invariant(ExecutionEnvironment.canUseDOM, 'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a ' + 'worker thread. Make sure `window` and `document` are available ' + 'globally before requiring React when unit testing or use ' + 'React.renderToString for server rendering.') : invariant(ExecutionEnvironment.canUseDOM));
        ("production" !== process.env.NODE_ENV ? invariant(markup, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : invariant(markup));
        ("production" !== process.env.NODE_ENV ? invariant(oldChild.tagName.toLowerCase() !== 'html', 'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the ' + '<html> node. This is because browser quirks make this unreliable ' + 'and/or slow. If you want to render to the root you must use ' + 'server rendering. See React.renderToString().') : invariant(oldChild.tagName.toLowerCase() !== 'html'));
        var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
        oldChild.parentNode.replaceChild(newChild, oldChild);
      }
    };
    module.exports = Danger;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/BeforeInputEventPlugin", ["./EventConstants", "./EventPropagators", "./ExecutionEnvironment", "./FallbackCompositionState", "./SyntheticCompositionEvent", "./SyntheticInputEvent", "./keyOf"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var EventConstants = require("./EventConstants");
  var EventPropagators = require("./EventPropagators");
  var ExecutionEnvironment = require("./ExecutionEnvironment");
  var FallbackCompositionState = require("./FallbackCompositionState");
  var SyntheticCompositionEvent = require("./SyntheticCompositionEvent");
  var SyntheticInputEvent = require("./SyntheticInputEvent");
  var keyOf = require("./keyOf");
  var END_KEYCODES = [9, 13, 27, 32];
  var START_KEYCODE = 229;
  var canUseCompositionEvent = (ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window);
  var documentMode = null;
  if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
    documentMode = document.documentMode;
  }
  var canUseTextInputEvent = (ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto());
  var useFallbackCompositionData = (ExecutionEnvironment.canUseDOM && ((!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11)));
  function isPresto() {
    var opera = window.opera;
    return (typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12);
  }
  var SPACEBAR_CODE = 32;
  var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);
  var topLevelTypes = EventConstants.topLevelTypes;
  var eventTypes = {
    beforeInput: {
      phasedRegistrationNames: {
        bubbled: keyOf({onBeforeInput: null}),
        captured: keyOf({onBeforeInputCapture: null})
      },
      dependencies: [topLevelTypes.topCompositionEnd, topLevelTypes.topKeyPress, topLevelTypes.topTextInput, topLevelTypes.topPaste]
    },
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionEnd: null}),
        captured: keyOf({onCompositionEndCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionEnd, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionStart: null}),
        captured: keyOf({onCompositionStartCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionStart, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionUpdate: null}),
        captured: keyOf({onCompositionUpdateCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionUpdate, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    }
  };
  var fallbackBeforeInputChars = null;
  var hasSpaceKeypress = false;
  function isKeypressCommand(nativeEvent) {
    return ((nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && !(nativeEvent.ctrlKey && nativeEvent.altKey));
  }
  function getCompositionEventType(topLevelType) {
    switch (topLevelType) {
      case topLevelTypes.topCompositionStart:
        return eventTypes.compositionStart;
      case topLevelTypes.topCompositionEnd:
        return eventTypes.compositionEnd;
      case topLevelTypes.topCompositionUpdate:
        return eventTypes.compositionUpdate;
    }
  }
  function isFallbackCompositionStart(topLevelType, nativeEvent) {
    return (topLevelType === topLevelTypes.topKeyDown && nativeEvent.keyCode === START_KEYCODE);
  }
  function isFallbackCompositionEnd(topLevelType, nativeEvent) {
    switch (topLevelType) {
      case topLevelTypes.topKeyUp:
        return (END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1);
      case topLevelTypes.topKeyDown:
        return (nativeEvent.keyCode !== START_KEYCODE);
      case topLevelTypes.topKeyPress:
      case topLevelTypes.topMouseDown:
      case topLevelTypes.topBlur:
        return true;
      default:
        return false;
    }
  }
  function getDataFromCustomEvent(nativeEvent) {
    var detail = nativeEvent.detail;
    if (typeof detail === 'object' && 'data' in detail) {
      return detail.data;
    }
    return null;
  }
  var currentComposition = null;
  function extractCompositionEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
    var eventType;
    var fallbackData;
    if (canUseCompositionEvent) {
      eventType = getCompositionEventType(topLevelType);
    } else if (!currentComposition) {
      if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
        eventType = eventTypes.compositionStart;
      }
    } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionEnd;
    }
    if (!eventType) {
      return null;
    }
    if (useFallbackCompositionData) {
      if (!currentComposition && eventType === eventTypes.compositionStart) {
        currentComposition = FallbackCompositionState.getPooled(topLevelTarget);
      } else if (eventType === eventTypes.compositionEnd) {
        if (currentComposition) {
          fallbackData = currentComposition.getData();
        }
      }
    }
    var event = SyntheticCompositionEvent.getPooled(eventType, topLevelTargetID, nativeEvent);
    if (fallbackData) {
      event.data = fallbackData;
    } else {
      var customData = getDataFromCustomEvent(nativeEvent);
      if (customData !== null) {
        event.data = customData;
      }
    }
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }
  function getNativeBeforeInputChars(topLevelType, nativeEvent) {
    switch (topLevelType) {
      case topLevelTypes.topCompositionEnd:
        return getDataFromCustomEvent(nativeEvent);
      case topLevelTypes.topKeyPress:
        var which = nativeEvent.which;
        if (which !== SPACEBAR_CODE) {
          return null;
        }
        hasSpaceKeypress = true;
        return SPACEBAR_CHAR;
      case topLevelTypes.topTextInput:
        var chars = nativeEvent.data;
        if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
          return null;
        }
        return chars;
      default:
        return null;
    }
  }
  function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
    if (currentComposition) {
      if (topLevelType === topLevelTypes.topCompositionEnd || isFallbackCompositionEnd(topLevelType, nativeEvent)) {
        var chars = currentComposition.getData();
        FallbackCompositionState.release(currentComposition);
        currentComposition = null;
        return chars;
      }
      return null;
    }
    switch (topLevelType) {
      case topLevelTypes.topPaste:
        return null;
      case topLevelTypes.topKeyPress:
        if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
          return String.fromCharCode(nativeEvent.which);
        }
        return null;
      case topLevelTypes.topCompositionEnd:
        return useFallbackCompositionData ? null : nativeEvent.data;
      default:
        return null;
    }
  }
  function extractBeforeInputEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
    var chars;
    if (canUseTextInputEvent) {
      chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
    } else {
      chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
    }
    if (!chars) {
      return null;
    }
    var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, topLevelTargetID, nativeEvent);
    event.data = chars;
    fallbackBeforeInputChars = null;
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }
  var BeforeInputEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent) {
      return [extractCompositionEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent), extractBeforeInputEvent(topLevelType, topLevelTarget, topLevelTargetID, nativeEvent)];
    }
  };
  module.exports = BeforeInputEventPlugin;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactReconcileTransaction", ["./CallbackQueue", "./PooledClass", "./ReactBrowserEventEmitter", "./ReactInputSelection", "./ReactPutListenerQueue", "./Transaction", "./Object.assign"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var CallbackQueue = require("./CallbackQueue");
  var PooledClass = require("./PooledClass");
  var ReactBrowserEventEmitter = require("./ReactBrowserEventEmitter");
  var ReactInputSelection = require("./ReactInputSelection");
  var ReactPutListenerQueue = require("./ReactPutListenerQueue");
  var Transaction = require("./Transaction");
  var assign = require("./Object.assign");
  var SELECTION_RESTORATION = {
    initialize: ReactInputSelection.getSelectionInformation,
    close: ReactInputSelection.restoreSelection
  };
  var EVENT_SUPPRESSION = {
    initialize: function() {
      var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
      ReactBrowserEventEmitter.setEnabled(false);
      return currentlyEnabled;
    },
    close: function(previouslyEnabled) {
      ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
    }
  };
  var ON_DOM_READY_QUEUEING = {
    initialize: function() {
      this.reactMountReady.reset();
    },
    close: function() {
      this.reactMountReady.notifyAll();
    }
  };
  var PUT_LISTENER_QUEUEING = {
    initialize: function() {
      this.putListenerQueue.reset();
    },
    close: function() {
      this.putListenerQueue.putListeners();
    }
  };
  var TRANSACTION_WRAPPERS = [PUT_LISTENER_QUEUEING, SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];
  function ReactReconcileTransaction() {
    this.reinitializeTransaction();
    this.renderToStaticMarkup = false;
    this.reactMountReady = CallbackQueue.getPooled(null);
    this.putListenerQueue = ReactPutListenerQueue.getPooled();
  }
  var Mixin = {
    getTransactionWrappers: function() {
      return TRANSACTION_WRAPPERS;
    },
    getReactMountReady: function() {
      return this.reactMountReady;
    },
    getPutListenerQueue: function() {
      return this.putListenerQueue;
    },
    destructor: function() {
      CallbackQueue.release(this.reactMountReady);
      this.reactMountReady = null;
      ReactPutListenerQueue.release(this.putListenerQueue);
      this.putListenerQueue = null;
    }
  };
  assign(ReactReconcileTransaction.prototype, Transaction.Mixin, Mixin);
  PooledClass.addPoolingTo(ReactReconcileTransaction);
  module.exports = ReactReconcileTransaction;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactTransitionGroup", ["./React", "./ReactTransitionChildMapping", "./Object.assign", "./cloneWithProps", "./emptyFunction"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var React = require("./React");
  var ReactTransitionChildMapping = require("./ReactTransitionChildMapping");
  var assign = require("./Object.assign");
  var cloneWithProps = require("./cloneWithProps");
  var emptyFunction = require("./emptyFunction");
  var ReactTransitionGroup = React.createClass({
    displayName: 'ReactTransitionGroup',
    propTypes: {
      component: React.PropTypes.any,
      childFactory: React.PropTypes.func
    },
    getDefaultProps: function() {
      return {
        component: 'span',
        childFactory: emptyFunction.thatReturnsArgument
      };
    },
    getInitialState: function() {
      return {children: ReactTransitionChildMapping.getChildMapping(this.props.children)};
    },
    componentWillMount: function() {
      this.currentlyTransitioningKeys = {};
      this.keysToEnter = [];
      this.keysToLeave = [];
    },
    componentDidMount: function() {
      var initialChildMapping = this.state.children;
      for (var key in initialChildMapping) {
        if (initialChildMapping[key]) {
          this.performAppear(key);
        }
      }
    },
    componentWillReceiveProps: function(nextProps) {
      var nextChildMapping = ReactTransitionChildMapping.getChildMapping(nextProps.children);
      var prevChildMapping = this.state.children;
      this.setState({children: ReactTransitionChildMapping.mergeChildMappings(prevChildMapping, nextChildMapping)});
      var key;
      for (key in nextChildMapping) {
        var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
        if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
          this.keysToEnter.push(key);
        }
      }
      for (key in prevChildMapping) {
        var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
        if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
          this.keysToLeave.push(key);
        }
      }
    },
    componentDidUpdate: function() {
      var keysToEnter = this.keysToEnter;
      this.keysToEnter = [];
      keysToEnter.forEach(this.performEnter);
      var keysToLeave = this.keysToLeave;
      this.keysToLeave = [];
      keysToLeave.forEach(this.performLeave);
    },
    performAppear: function(key) {
      this.currentlyTransitioningKeys[key] = true;
      var component = this.refs[key];
      if (component.componentWillAppear) {
        component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
      } else {
        this._handleDoneAppearing(key);
      }
    },
    _handleDoneAppearing: function(key) {
      var component = this.refs[key];
      if (component.componentDidAppear) {
        component.componentDidAppear();
      }
      delete this.currentlyTransitioningKeys[key];
      var currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);
      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        this.performLeave(key);
      }
    },
    performEnter: function(key) {
      this.currentlyTransitioningKeys[key] = true;
      var component = this.refs[key];
      if (component.componentWillEnter) {
        component.componentWillEnter(this._handleDoneEntering.bind(this, key));
      } else {
        this._handleDoneEntering(key);
      }
    },
    _handleDoneEntering: function(key) {
      var component = this.refs[key];
      if (component.componentDidEnter) {
        component.componentDidEnter();
      }
      delete this.currentlyTransitioningKeys[key];
      var currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);
      if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
        this.performLeave(key);
      }
    },
    performLeave: function(key) {
      this.currentlyTransitioningKeys[key] = true;
      var component = this.refs[key];
      if (component.componentWillLeave) {
        component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
      } else {
        this._handleDoneLeaving(key);
      }
    },
    _handleDoneLeaving: function(key) {
      var component = this.refs[key];
      if (component.componentDidLeave) {
        component.componentDidLeave();
      }
      delete this.currentlyTransitioningKeys[key];
      var currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);
      if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
        this.performEnter(key);
      } else {
        var newChildren = assign({}, this.state.children);
        delete newChildren[key];
        this.setState({children: newChildren});
      }
    },
    render: function() {
      var childrenToRender = {};
      for (var key in this.state.children) {
        var child = this.state.children[key];
        if (child) {
          childrenToRender[key] = cloneWithProps(this.props.childFactory(child), {ref: key});
        }
      }
      return React.createElement(this.props.component, this.props, childrenToRender);
    }
  });
  module.exports = ReactTransitionGroup;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/invariant", ["process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    "use strict";
    var invariant = function(condition, format, a, b, c, d, e, f) {
      if ("production" !== process.env.NODE_ENV) {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      }
      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error('Invariant Violation: ' + format.replace(/%s/g, function() {
            return args[argIndex++];
          }));
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module.exports = invariant;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactChildren", ["./PooledClass", "./traverseAllChildren", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var PooledClass = require("./PooledClass");
    var traverseAllChildren = require("./traverseAllChildren");
    var warning = require("./warning");
    var twoArgumentPooler = PooledClass.twoArgumentPooler;
    var threeArgumentPooler = PooledClass.threeArgumentPooler;
    function ForEachBookKeeping(forEachFunction, forEachContext) {
      this.forEachFunction = forEachFunction;
      this.forEachContext = forEachContext;
    }
    PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);
    function forEachSingleChild(traverseContext, child, name, i) {
      var forEachBookKeeping = traverseContext;
      forEachBookKeeping.forEachFunction.call(forEachBookKeeping.forEachContext, child, i);
    }
    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }
      var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      ForEachBookKeeping.release(traverseContext);
    }
    function MapBookKeeping(mapResult, mapFunction, mapContext) {
      this.mapResult = mapResult;
      this.mapFunction = mapFunction;
      this.mapContext = mapContext;
    }
    PooledClass.addPoolingTo(MapBookKeeping, threeArgumentPooler);
    function mapSingleChildIntoContext(traverseContext, child, name, i) {
      var mapBookKeeping = traverseContext;
      var mapResult = mapBookKeeping.mapResult;
      var keyUnique = !mapResult.hasOwnProperty(name);
      if ("production" !== process.env.NODE_ENV) {
        ("production" !== process.env.NODE_ENV ? warning(keyUnique, 'ReactChildren.map(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.', name) : null);
      }
      if (keyUnique) {
        var mappedChild = mapBookKeeping.mapFunction.call(mapBookKeeping.mapContext, child, i);
        mapResult[name] = mappedChild;
      }
    }
    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }
      var mapResult = {};
      var traverseContext = MapBookKeeping.getPooled(mapResult, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      MapBookKeeping.release(traverseContext);
      return mapResult;
    }
    function forEachSingleChildDummy(traverseContext, child, name, i) {
      return null;
    }
    function countChildren(children, context) {
      return traverseAllChildren(children, forEachSingleChildDummy, null);
    }
    var ReactChildren = {
      forEach: forEachChildren,
      map: mapChildren,
      count: countChildren
    };
    module.exports = ReactChildren;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOMComponent", ["./CSSPropertyOperations", "./DOMProperty", "./DOMPropertyOperations", "./ReactBrowserEventEmitter", "./ReactMount", "./ReactMultiChild", "./ReactPerf", "./Object.assign", "./escapeTextForBrowser", "./invariant", "./isEventSupported", "./keyOf", "./monitorCodeUse", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var CSSPropertyOperations = require("./CSSPropertyOperations");
    var DOMProperty = require("./DOMProperty");
    var DOMPropertyOperations = require("./DOMPropertyOperations");
    var ReactBrowserEventEmitter = require("./ReactBrowserEventEmitter");
    var ReactMount = require("./ReactMount");
    var ReactMultiChild = require("./ReactMultiChild");
    var ReactPerf = require("./ReactPerf");
    var assign = require("./Object.assign");
    var escapeTextForBrowser = require("./escapeTextForBrowser");
    var invariant = require("./invariant");
    var isEventSupported = require("./isEventSupported");
    var keyOf = require("./keyOf");
    var monitorCodeUse = require("./monitorCodeUse");
    var warning = require("./warning");
    var deleteListener = ReactBrowserEventEmitter.deleteListener;
    var listenTo = ReactBrowserEventEmitter.listenTo;
    var registrationNameModules = ReactBrowserEventEmitter.registrationNameModules;
    var CONTENT_TYPES = {
      'string': true,
      'number': true
    };
    var STYLE = keyOf({style: null});
    var ELEMENT_NODE_TYPE = 1;
    var BackendIDOperations = null;
    function assertValidProps(props) {
      if (!props) {
        return ;
      }
      if (props.dangerouslySetInnerHTML != null) {
        ("production" !== process.env.NODE_ENV ? invariant(props.children == null, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : invariant(props.children == null));
        ("production" !== process.env.NODE_ENV ? invariant(props.dangerouslySetInnerHTML.__html != null, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. ' + 'Please visit http://fb.me/react-invariant-dangerously-set-inner-html for more information.') : invariant(props.dangerouslySetInnerHTML.__html != null));
      }
      if ("production" !== process.env.NODE_ENV) {
        ("production" !== process.env.NODE_ENV ? warning(props.innerHTML == null, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.') : null);
        if (props.contentEditable && props.children != null) {
          console.warn('A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.');
        }
      }
      ("production" !== process.env.NODE_ENV ? invariant(props.style == null || typeof props.style === 'object', 'The `style` prop expects a mapping from style properties to values, ' + 'not a string. For example, style={{marginRight: spacing + \'em\'}} when ' + 'using JSX.') : invariant(props.style == null || typeof props.style === 'object'));
    }
    function putListener(id, registrationName, listener, transaction) {
      if ("production" !== process.env.NODE_ENV) {
        if (registrationName === 'onScroll' && !isEventSupported('scroll', true)) {
          monitorCodeUse('react_no_scroll_event');
          console.warn('This browser doesn\'t support the `onScroll` event');
        }
      }
      var container = ReactMount.findReactContainerForID(id);
      if (container) {
        var doc = container.nodeType === ELEMENT_NODE_TYPE ? container.ownerDocument : container;
        listenTo(registrationName, doc);
      }
      transaction.getPutListenerQueue().enqueuePutListener(id, registrationName, listener);
    }
    var omittedCloseTags = {
      'area': true,
      'base': true,
      'br': true,
      'col': true,
      'embed': true,
      'hr': true,
      'img': true,
      'input': true,
      'keygen': true,
      'link': true,
      'meta': true,
      'param': true,
      'source': true,
      'track': true,
      'wbr': true
    };
    var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var validatedTagCache = {};
    var hasOwnProperty = {}.hasOwnProperty;
    function validateDangerousTag(tag) {
      if (!hasOwnProperty.call(validatedTagCache, tag)) {
        ("production" !== process.env.NODE_ENV ? invariant(VALID_TAG_REGEX.test(tag), 'Invalid tag: %s', tag) : invariant(VALID_TAG_REGEX.test(tag)));
        validatedTagCache[tag] = true;
      }
    }
    function ReactDOMComponent(tag) {
      validateDangerousTag(tag);
      this._tag = tag;
      this._renderedChildren = null;
      this._previousStyleCopy = null;
      this._rootNodeID = null;
    }
    ReactDOMComponent.displayName = 'ReactDOMComponent';
    ReactDOMComponent.Mixin = {
      construct: function(element) {
        this._currentElement = element;
      },
      mountComponent: function(rootID, transaction, context) {
        this._rootNodeID = rootID;
        assertValidProps(this._currentElement.props);
        var closeTag = omittedCloseTags[this._tag] ? '' : '</' + this._tag + '>';
        return (this._createOpenTagMarkupAndPutListeners(transaction) + this._createContentMarkup(transaction, context) + closeTag);
      },
      _createOpenTagMarkupAndPutListeners: function(transaction) {
        var props = this._currentElement.props;
        var ret = '<' + this._tag;
        for (var propKey in props) {
          if (!props.hasOwnProperty(propKey)) {
            continue;
          }
          var propValue = props[propKey];
          if (propValue == null) {
            continue;
          }
          if (registrationNameModules.hasOwnProperty(propKey)) {
            putListener(this._rootNodeID, propKey, propValue, transaction);
          } else {
            if (propKey === STYLE) {
              if (propValue) {
                propValue = this._previousStyleCopy = assign({}, props.style);
              }
              propValue = CSSPropertyOperations.createMarkupForStyles(propValue);
            }
            var markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
            if (markup) {
              ret += ' ' + markup;
            }
          }
        }
        if (transaction.renderToStaticMarkup) {
          return ret + '>';
        }
        var markupForID = DOMPropertyOperations.createMarkupForID(this._rootNodeID);
        return ret + ' ' + markupForID + '>';
      },
      _createContentMarkup: function(transaction, context) {
        var prefix = '';
        if (this._tag === 'listing' || this._tag === 'pre' || this._tag === 'textarea') {
          prefix = '\n';
        }
        var props = this._currentElement.props;
        var innerHTML = props.dangerouslySetInnerHTML;
        if (innerHTML != null) {
          if (innerHTML.__html != null) {
            return prefix + innerHTML.__html;
          }
        } else {
          var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
          var childrenToUse = contentToUse != null ? null : props.children;
          if (contentToUse != null) {
            return prefix + escapeTextForBrowser(contentToUse);
          } else if (childrenToUse != null) {
            var mountImages = this.mountChildren(childrenToUse, transaction, context);
            return prefix + mountImages.join('');
          }
        }
        return prefix;
      },
      receiveComponent: function(nextElement, transaction, context) {
        var prevElement = this._currentElement;
        this._currentElement = nextElement;
        this.updateComponent(transaction, prevElement, nextElement, context);
      },
      updateComponent: function(transaction, prevElement, nextElement, context) {
        assertValidProps(this._currentElement.props);
        this._updateDOMProperties(prevElement.props, transaction);
        this._updateDOMChildren(prevElement.props, transaction, context);
      },
      _updateDOMProperties: function(lastProps, transaction) {
        var nextProps = this._currentElement.props;
        var propKey;
        var styleName;
        var styleUpdates;
        for (propKey in lastProps) {
          if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey)) {
            continue;
          }
          if (propKey === STYLE) {
            var lastStyle = this._previousStyleCopy;
            for (styleName in lastStyle) {
              if (lastStyle.hasOwnProperty(styleName)) {
                styleUpdates = styleUpdates || {};
                styleUpdates[styleName] = '';
              }
            }
          } else if (registrationNameModules.hasOwnProperty(propKey)) {
            deleteListener(this._rootNodeID, propKey);
          } else if (DOMProperty.isStandardName[propKey] || DOMProperty.isCustomAttribute(propKey)) {
            BackendIDOperations.deletePropertyByID(this._rootNodeID, propKey);
          }
        }
        for (propKey in nextProps) {
          var nextProp = nextProps[propKey];
          var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps[propKey];
          if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp) {
            continue;
          }
          if (propKey === STYLE) {
            if (nextProp) {
              nextProp = this._previousStyleCopy = assign({}, nextProp);
            }
            if (lastProp) {
              for (styleName in lastProp) {
                if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
                  styleUpdates = styleUpdates || {};
                  styleUpdates[styleName] = '';
                }
              }
              for (styleName in nextProp) {
                if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
                  styleUpdates = styleUpdates || {};
                  styleUpdates[styleName] = nextProp[styleName];
                }
              }
            } else {
              styleUpdates = nextProp;
            }
          } else if (registrationNameModules.hasOwnProperty(propKey)) {
            putListener(this._rootNodeID, propKey, nextProp, transaction);
          } else if (DOMProperty.isStandardName[propKey] || DOMProperty.isCustomAttribute(propKey)) {
            BackendIDOperations.updatePropertyByID(this._rootNodeID, propKey, nextProp);
          }
        }
        if (styleUpdates) {
          BackendIDOperations.updateStylesByID(this._rootNodeID, styleUpdates);
        }
      },
      _updateDOMChildren: function(lastProps, transaction, context) {
        var nextProps = this._currentElement.props;
        var lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
        var nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;
        var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
        var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;
        var lastChildren = lastContent != null ? null : lastProps.children;
        var nextChildren = nextContent != null ? null : nextProps.children;
        var lastHasContentOrHtml = lastContent != null || lastHtml != null;
        var nextHasContentOrHtml = nextContent != null || nextHtml != null;
        if (lastChildren != null && nextChildren == null) {
          this.updateChildren(null, transaction, context);
        } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
          this.updateTextContent('');
        }
        if (nextContent != null) {
          if (lastContent !== nextContent) {
            this.updateTextContent('' + nextContent);
          }
        } else if (nextHtml != null) {
          if (lastHtml !== nextHtml) {
            BackendIDOperations.updateInnerHTMLByID(this._rootNodeID, nextHtml);
          }
        } else if (nextChildren != null) {
          this.updateChildren(nextChildren, transaction, context);
        }
      },
      unmountComponent: function() {
        this.unmountChildren();
        ReactBrowserEventEmitter.deleteAllListeners(this._rootNodeID);
        ReactMount.purgeID(this._rootNodeID);
        this._rootNodeID = null;
      }
    };
    ReactPerf.measureMethods(ReactDOMComponent, 'ReactDOMComponent', {
      mountComponent: 'mountComponent',
      updateComponent: 'updateComponent'
    });
    assign(ReactDOMComponent.prototype, ReactDOMComponent.Mixin, ReactMultiChild.Mixin);
    ReactDOMComponent.injection = {injectIDOperations: function(IDOperations) {
        ReactDOMComponent.BackendIDOperations = BackendIDOperations = IDOperations;
      }};
    module.exports = ReactDOMComponent;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/DOMChildrenOperations", ["./Danger", "./ReactMultiChildUpdateTypes", "./getTextContentAccessor", "./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var Danger = require("./Danger");
    var ReactMultiChildUpdateTypes = require("./ReactMultiChildUpdateTypes");
    var getTextContentAccessor = require("./getTextContentAccessor");
    var invariant = require("./invariant");
    var textContentAccessor = getTextContentAccessor();
    function insertChildAt(parentNode, childNode, index) {
      parentNode.insertBefore(childNode, parentNode.childNodes[index] || null);
    }
    var updateTextContent;
    if (textContentAccessor === 'textContent') {
      updateTextContent = function(node, text) {
        node.textContent = text;
      };
    } else {
      updateTextContent = function(node, text) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
        if (text) {
          var doc = node.ownerDocument || document;
          node.appendChild(doc.createTextNode(text));
        }
      };
    }
    var DOMChildrenOperations = {
      dangerouslyReplaceNodeWithMarkup: Danger.dangerouslyReplaceNodeWithMarkup,
      updateTextContent: updateTextContent,
      processUpdates: function(updates, markupList) {
        var update;
        var initialChildren = null;
        var updatedChildren = null;
        for (var i = 0; i < updates.length; i++) {
          update = updates[i];
          if (update.type === ReactMultiChildUpdateTypes.MOVE_EXISTING || update.type === ReactMultiChildUpdateTypes.REMOVE_NODE) {
            var updatedIndex = update.fromIndex;
            var updatedChild = update.parentNode.childNodes[updatedIndex];
            var parentID = update.parentID;
            ("production" !== process.env.NODE_ENV ? invariant(updatedChild, 'processUpdates(): Unable to find child %s of element. This ' + 'probably means the DOM was unexpectedly mutated (e.g., by the ' + 'browser), usually due to forgetting a <tbody> when using tables, ' + 'nesting tags like <form>, <p>, or <a>, or using non-SVG elements ' + 'in an <svg> parent. Try inspecting the child nodes of the element ' + 'with React ID `%s`.', updatedIndex, parentID) : invariant(updatedChild));
            initialChildren = initialChildren || {};
            initialChildren[parentID] = initialChildren[parentID] || [];
            initialChildren[parentID][updatedIndex] = updatedChild;
            updatedChildren = updatedChildren || [];
            updatedChildren.push(updatedChild);
          }
        }
        var renderedMarkup = Danger.dangerouslyRenderMarkup(markupList);
        if (updatedChildren) {
          for (var j = 0; j < updatedChildren.length; j++) {
            updatedChildren[j].parentNode.removeChild(updatedChildren[j]);
          }
        }
        for (var k = 0; k < updates.length; k++) {
          update = updates[k];
          switch (update.type) {
            case ReactMultiChildUpdateTypes.INSERT_MARKUP:
              insertChildAt(update.parentNode, renderedMarkup[update.markupIndex], update.toIndex);
              break;
            case ReactMultiChildUpdateTypes.MOVE_EXISTING:
              insertChildAt(update.parentNode, initialChildren[update.parentID][update.fromIndex], update.toIndex);
              break;
            case ReactMultiChildUpdateTypes.TEXT_CONTENT:
              updateTextContent(update.parentNode, update.textContent);
              break;
            case ReactMultiChildUpdateTypes.REMOVE_NODE:
              break;
          }
        }
      }
    };
    module.exports = DOMChildrenOperations;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDefaultInjection", ["./BeforeInputEventPlugin", "./ChangeEventPlugin", "./ClientReactRootIndex", "./DefaultEventPluginOrder", "./EnterLeaveEventPlugin", "./ExecutionEnvironment", "./HTMLDOMPropertyConfig", "./MobileSafariClickEventPlugin", "./ReactBrowserComponentMixin", "./ReactComponentBrowserEnvironment", "./ReactDefaultBatchingStrategy", "./ReactDOMComponent", "./ReactDOMButton", "./ReactDOMForm", "./ReactDOMImg", "./ReactDOMIDOperations", "./ReactDOMInput", "./ReactDOMOption", "./ReactDOMSelect", "./ReactDOMTextarea", "./ReactDOMTextComponent", "./ReactEventListener", "./ReactInjection", "./ReactInstanceHandles", "./ReactMount", "./ReactReconcileTransaction", "./SelectEventPlugin", "./ServerReactRootIndex", "./SimpleEventPlugin", "./SVGDOMPropertyConfig", "./createFullPageComponent", "./ReactDefaultPerf", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var BeforeInputEventPlugin = require("./BeforeInputEventPlugin");
    var ChangeEventPlugin = require("./ChangeEventPlugin");
    var ClientReactRootIndex = require("./ClientReactRootIndex");
    var DefaultEventPluginOrder = require("./DefaultEventPluginOrder");
    var EnterLeaveEventPlugin = require("./EnterLeaveEventPlugin");
    var ExecutionEnvironment = require("./ExecutionEnvironment");
    var HTMLDOMPropertyConfig = require("./HTMLDOMPropertyConfig");
    var MobileSafariClickEventPlugin = require("./MobileSafariClickEventPlugin");
    var ReactBrowserComponentMixin = require("./ReactBrowserComponentMixin");
    var ReactComponentBrowserEnvironment = require("./ReactComponentBrowserEnvironment");
    var ReactDefaultBatchingStrategy = require("./ReactDefaultBatchingStrategy");
    var ReactDOMComponent = require("./ReactDOMComponent");
    var ReactDOMButton = require("./ReactDOMButton");
    var ReactDOMForm = require("./ReactDOMForm");
    var ReactDOMImg = require("./ReactDOMImg");
    var ReactDOMIDOperations = require("./ReactDOMIDOperations");
    var ReactDOMInput = require("./ReactDOMInput");
    var ReactDOMOption = require("./ReactDOMOption");
    var ReactDOMSelect = require("./ReactDOMSelect");
    var ReactDOMTextarea = require("./ReactDOMTextarea");
    var ReactDOMTextComponent = require("./ReactDOMTextComponent");
    var ReactEventListener = require("./ReactEventListener");
    var ReactInjection = require("./ReactInjection");
    var ReactInstanceHandles = require("./ReactInstanceHandles");
    var ReactMount = require("./ReactMount");
    var ReactReconcileTransaction = require("./ReactReconcileTransaction");
    var SelectEventPlugin = require("./SelectEventPlugin");
    var ServerReactRootIndex = require("./ServerReactRootIndex");
    var SimpleEventPlugin = require("./SimpleEventPlugin");
    var SVGDOMPropertyConfig = require("./SVGDOMPropertyConfig");
    var createFullPageComponent = require("./createFullPageComponent");
    function inject() {
      ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);
      ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
      ReactInjection.EventPluginHub.injectInstanceHandle(ReactInstanceHandles);
      ReactInjection.EventPluginHub.injectMount(ReactMount);
      ReactInjection.EventPluginHub.injectEventPluginsByName({
        SimpleEventPlugin: SimpleEventPlugin,
        EnterLeaveEventPlugin: EnterLeaveEventPlugin,
        ChangeEventPlugin: ChangeEventPlugin,
        MobileSafariClickEventPlugin: MobileSafariClickEventPlugin,
        SelectEventPlugin: SelectEventPlugin,
        BeforeInputEventPlugin: BeforeInputEventPlugin
      });
      ReactInjection.NativeComponent.injectGenericComponentClass(ReactDOMComponent);
      ReactInjection.NativeComponent.injectTextComponentClass(ReactDOMTextComponent);
      ReactInjection.Class.injectMixin(ReactBrowserComponentMixin);
      ReactInjection.NativeComponent.injectComponentClasses({
        'button': ReactDOMButton,
        'form': ReactDOMForm,
        'img': ReactDOMImg,
        'input': ReactDOMInput,
        'option': ReactDOMOption,
        'select': ReactDOMSelect,
        'textarea': ReactDOMTextarea,
        'html': createFullPageComponent('html'),
        'head': createFullPageComponent('head'),
        'body': createFullPageComponent('body')
      });
      ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
      ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);
      ReactInjection.EmptyComponent.injectEmptyComponent('noscript');
      ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
      ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
      ReactInjection.RootIndex.injectCreateReactRootIndex(ExecutionEnvironment.canUseDOM ? ClientReactRootIndex.createReactRootIndex : ServerReactRootIndex.createReactRootIndex);
      ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
      ReactInjection.DOMComponent.injectIDOperations(ReactDOMIDOperations);
      if ("production" !== process.env.NODE_ENV) {
        var url = (ExecutionEnvironment.canUseDOM && window.location.href) || '';
        if ((/[?&]react_perf\b/).test(url)) {
          var ReactDefaultPerf = require("./ReactDefaultPerf");
          ReactDefaultPerf.start();
        }
      }
    }
    module.exports = {inject: inject};
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactCSSTransitionGroup", ["./React", "./Object.assign", "./ReactTransitionGroup", "./ReactCSSTransitionGroupChild"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var React = require("./React");
  var assign = require("./Object.assign");
  var ReactTransitionGroup = React.createFactory(require("./ReactTransitionGroup"));
  var ReactCSSTransitionGroupChild = React.createFactory(require("./ReactCSSTransitionGroupChild"));
  var ReactCSSTransitionGroup = React.createClass({
    displayName: 'ReactCSSTransitionGroup',
    propTypes: {
      transitionName: React.PropTypes.string.isRequired,
      transitionAppear: React.PropTypes.bool,
      transitionEnter: React.PropTypes.bool,
      transitionLeave: React.PropTypes.bool
    },
    getDefaultProps: function() {
      return {
        transitionAppear: false,
        transitionEnter: true,
        transitionLeave: true
      };
    },
    _wrapChild: function(child) {
      return ReactCSSTransitionGroupChild({
        name: this.props.transitionName,
        appear: this.props.transitionAppear,
        enter: this.props.transitionEnter,
        leave: this.props.transitionLeave
      }, child);
    },
    render: function() {
      return (ReactTransitionGroup(assign({}, this.props, {childFactory: this._wrapChild})));
    }
  });
  module.exports = ReactCSSTransitionGroup;
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/DOMProperty", ["./invariant", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var invariant = require("./invariant");
    function checkMask(value, bitmask) {
      return (value & bitmask) === bitmask;
    }
    var DOMPropertyInjection = {
      MUST_USE_ATTRIBUTE: 0x1,
      MUST_USE_PROPERTY: 0x2,
      HAS_SIDE_EFFECTS: 0x4,
      HAS_BOOLEAN_VALUE: 0x8,
      HAS_NUMERIC_VALUE: 0x10,
      HAS_POSITIVE_NUMERIC_VALUE: 0x20 | 0x10,
      HAS_OVERLOADED_BOOLEAN_VALUE: 0x40,
      injectDOMPropertyConfig: function(domPropertyConfig) {
        var Properties = domPropertyConfig.Properties || {};
        var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
        var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
        var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};
        if (domPropertyConfig.isCustomAttribute) {
          DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
        }
        for (var propName in Properties) {
          ("production" !== process.env.NODE_ENV ? invariant(!DOMProperty.isStandardName.hasOwnProperty(propName), 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property ' + '\'%s\' which has already been injected. You may be accidentally ' + 'injecting the same DOM property config twice, or you may be ' + 'injecting two configs that have conflicting property names.', propName) : invariant(!DOMProperty.isStandardName.hasOwnProperty(propName)));
          DOMProperty.isStandardName[propName] = true;
          var lowerCased = propName.toLowerCase();
          DOMProperty.getPossibleStandardName[lowerCased] = propName;
          if (DOMAttributeNames.hasOwnProperty(propName)) {
            var attributeName = DOMAttributeNames[propName];
            DOMProperty.getPossibleStandardName[attributeName] = propName;
            DOMProperty.getAttributeName[propName] = attributeName;
          } else {
            DOMProperty.getAttributeName[propName] = lowerCased;
          }
          DOMProperty.getPropertyName[propName] = DOMPropertyNames.hasOwnProperty(propName) ? DOMPropertyNames[propName] : propName;
          if (DOMMutationMethods.hasOwnProperty(propName)) {
            DOMProperty.getMutationMethod[propName] = DOMMutationMethods[propName];
          } else {
            DOMProperty.getMutationMethod[propName] = null;
          }
          var propConfig = Properties[propName];
          DOMProperty.mustUseAttribute[propName] = checkMask(propConfig, DOMPropertyInjection.MUST_USE_ATTRIBUTE);
          DOMProperty.mustUseProperty[propName] = checkMask(propConfig, DOMPropertyInjection.MUST_USE_PROPERTY);
          DOMProperty.hasSideEffects[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_SIDE_EFFECTS);
          DOMProperty.hasBooleanValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_BOOLEAN_VALUE);
          DOMProperty.hasNumericValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_NUMERIC_VALUE);
          DOMProperty.hasPositiveNumericValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_POSITIVE_NUMERIC_VALUE);
          DOMProperty.hasOverloadedBooleanValue[propName] = checkMask(propConfig, DOMPropertyInjection.HAS_OVERLOADED_BOOLEAN_VALUE);
          ("production" !== process.env.NODE_ENV ? invariant(!DOMProperty.mustUseAttribute[propName] || !DOMProperty.mustUseProperty[propName], 'DOMProperty: Cannot require using both attribute and property: %s', propName) : invariant(!DOMProperty.mustUseAttribute[propName] || !DOMProperty.mustUseProperty[propName]));
          ("production" !== process.env.NODE_ENV ? invariant(DOMProperty.mustUseProperty[propName] || !DOMProperty.hasSideEffects[propName], 'DOMProperty: Properties that have side effects must use property: %s', propName) : invariant(DOMProperty.mustUseProperty[propName] || !DOMProperty.hasSideEffects[propName]));
          ("production" !== process.env.NODE_ENV ? invariant(!!DOMProperty.hasBooleanValue[propName] + !!DOMProperty.hasNumericValue[propName] + !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1, 'DOMProperty: Value can be one of boolean, overloaded boolean, or ' + 'numeric value, but not a combination: %s', propName) : invariant(!!DOMProperty.hasBooleanValue[propName] + !!DOMProperty.hasNumericValue[propName] + !!DOMProperty.hasOverloadedBooleanValue[propName] <= 1));
        }
      }
    };
    var defaultValueCache = {};
    var DOMProperty = {
      ID_ATTRIBUTE_NAME: 'data-reactid',
      isStandardName: {},
      getPossibleStandardName: {},
      getAttributeName: {},
      getPropertyName: {},
      getMutationMethod: {},
      mustUseAttribute: {},
      mustUseProperty: {},
      hasSideEffects: {},
      hasBooleanValue: {},
      hasNumericValue: {},
      hasPositiveNumericValue: {},
      hasOverloadedBooleanValue: {},
      _isCustomAttributeFunctions: [],
      isCustomAttribute: function(attributeName) {
        for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
          var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
          if (isCustomAttributeFn(attributeName)) {
            return true;
          }
        }
        return false;
      },
      getDefaultValueForProperty: function(nodeName, prop) {
        var nodeDefaults = defaultValueCache[nodeName];
        var testElement;
        if (!nodeDefaults) {
          defaultValueCache[nodeName] = nodeDefaults = {};
        }
        if (!(prop in nodeDefaults)) {
          testElement = document.createElement(nodeName);
          nodeDefaults[prop] = testElement[prop];
        }
        return nodeDefaults[prop];
      },
      injection: DOMPropertyInjection
    };
    module.exports = DOMProperty;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOMIDOperations", ["./CSSPropertyOperations", "./DOMChildrenOperations", "./DOMPropertyOperations", "./ReactMount", "./ReactPerf", "./invariant", "./setInnerHTML", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var CSSPropertyOperations = require("./CSSPropertyOperations");
    var DOMChildrenOperations = require("./DOMChildrenOperations");
    var DOMPropertyOperations = require("./DOMPropertyOperations");
    var ReactMount = require("./ReactMount");
    var ReactPerf = require("./ReactPerf");
    var invariant = require("./invariant");
    var setInnerHTML = require("./setInnerHTML");
    var INVALID_PROPERTY_ERRORS = {
      dangerouslySetInnerHTML: '`dangerouslySetInnerHTML` must be set using `updateInnerHTMLByID()`.',
      style: '`style` must be set using `updateStylesByID()`.'
    };
    var ReactDOMIDOperations = {
      updatePropertyByID: function(id, name, value) {
        var node = ReactMount.getNode(id);
        ("production" !== process.env.NODE_ENV ? invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name), 'updatePropertyByID(...): %s', INVALID_PROPERTY_ERRORS[name]) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
        if (value != null) {
          DOMPropertyOperations.setValueForProperty(node, name, value);
        } else {
          DOMPropertyOperations.deleteValueForProperty(node, name);
        }
      },
      deletePropertyByID: function(id, name, value) {
        var node = ReactMount.getNode(id);
        ("production" !== process.env.NODE_ENV ? invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name), 'updatePropertyByID(...): %s', INVALID_PROPERTY_ERRORS[name]) : invariant(!INVALID_PROPERTY_ERRORS.hasOwnProperty(name)));
        DOMPropertyOperations.deleteValueForProperty(node, name, value);
      },
      updateStylesByID: function(id, styles) {
        var node = ReactMount.getNode(id);
        CSSPropertyOperations.setValueForStyles(node, styles);
      },
      updateInnerHTMLByID: function(id, html) {
        var node = ReactMount.getNode(id);
        setInnerHTML(node, html);
      },
      updateTextContentByID: function(id, content) {
        var node = ReactMount.getNode(id);
        DOMChildrenOperations.updateTextContent(node, content);
      },
      dangerouslyReplaceNodeWithMarkupByID: function(id, markup) {
        var node = ReactMount.getNode(id);
        DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup(node, markup);
      },
      dangerouslyProcessChildrenUpdates: function(updates, markup) {
        for (var i = 0; i < updates.length; i++) {
          updates[i].parentNode = ReactMount.getNode(updates[i].parentID);
        }
        DOMChildrenOperations.processUpdates(updates, markup);
      }
    };
    ReactPerf.measureMethods(ReactDOMIDOperations, 'ReactDOMIDOperations', {
      updatePropertyByID: 'updatePropertyByID',
      deletePropertyByID: 'deletePropertyByID',
      updateStylesByID: 'updateStylesByID',
      updateInnerHTMLByID: 'updateInnerHTMLByID',
      updateTextContentByID: 'updateTextContentByID',
      dangerouslyReplaceNodeWithMarkupByID: 'dangerouslyReplaceNodeWithMarkupByID',
      dangerouslyProcessChildrenUpdates: 'dangerouslyProcessChildrenUpdates'
    });
    module.exports = ReactDOMIDOperations;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactWithAddons", ["./LinkedStateMixin", "./React", "./ReactComponentWithPureRenderMixin", "./ReactCSSTransitionGroup", "./ReactTransitionGroup", "./ReactUpdates", "./cx", "./cloneWithProps", "./update", "./ReactDefaultPerf", "./ReactTestUtils", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var LinkedStateMixin = require("./LinkedStateMixin");
    var React = require("./React");
    var ReactComponentWithPureRenderMixin = require("./ReactComponentWithPureRenderMixin");
    var ReactCSSTransitionGroup = require("./ReactCSSTransitionGroup");
    var ReactTransitionGroup = require("./ReactTransitionGroup");
    var ReactUpdates = require("./ReactUpdates");
    var cx = require("./cx");
    var cloneWithProps = require("./cloneWithProps");
    var update = require("./update");
    React.addons = {
      CSSTransitionGroup: ReactCSSTransitionGroup,
      LinkedStateMixin: LinkedStateMixin,
      PureRenderMixin: ReactComponentWithPureRenderMixin,
      TransitionGroup: ReactTransitionGroup,
      batchedUpdates: ReactUpdates.batchedUpdates,
      classSet: cx,
      cloneWithProps: cloneWithProps,
      update: update
    };
    if ("production" !== process.env.NODE_ENV) {
      React.addons.Perf = require("./ReactDefaultPerf");
      React.addons.TestUtils = require("./ReactTestUtils");
    }
    module.exports = React;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/DOMPropertyOperations", ["./DOMProperty", "./escapeTextForBrowser", "./memoizeStringOnly", "./warning", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var DOMProperty = require("./DOMProperty");
    var escapeTextForBrowser = require("./escapeTextForBrowser");
    var memoizeStringOnly = require("./memoizeStringOnly");
    var warning = require("./warning");
    function shouldIgnoreValue(name, value) {
      return value == null || (DOMProperty.hasBooleanValue[name] && !value) || (DOMProperty.hasNumericValue[name] && isNaN(value)) || (DOMProperty.hasPositiveNumericValue[name] && (value < 1)) || (DOMProperty.hasOverloadedBooleanValue[name] && value === false);
    }
    var processAttributeNameAndPrefix = memoizeStringOnly(function(name) {
      return escapeTextForBrowser(name) + '="';
    });
    if ("production" !== process.env.NODE_ENV) {
      var reactProps = {
        children: true,
        dangerouslySetInnerHTML: true,
        key: true,
        ref: true
      };
      var warnedProperties = {};
      var warnUnknownProperty = function(name) {
        if (reactProps.hasOwnProperty(name) && reactProps[name] || warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
          return ;
        }
        warnedProperties[name] = true;
        var lowerCasedName = name.toLowerCase();
        var standardName = (DOMProperty.isCustomAttribute(lowerCasedName) ? lowerCasedName : DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty.getPossibleStandardName[lowerCasedName] : null);
        ("production" !== process.env.NODE_ENV ? warning(standardName == null, 'Unknown DOM property %s. Did you mean %s?', name, standardName) : null);
      };
    }
    var DOMPropertyOperations = {
      createMarkupForID: function(id) {
        return processAttributeNameAndPrefix(DOMProperty.ID_ATTRIBUTE_NAME) + escapeTextForBrowser(id) + '"';
      },
      createMarkupForProperty: function(name, value) {
        if (DOMProperty.isStandardName.hasOwnProperty(name) && DOMProperty.isStandardName[name]) {
          if (shouldIgnoreValue(name, value)) {
            return '';
          }
          var attributeName = DOMProperty.getAttributeName[name];
          if (DOMProperty.hasBooleanValue[name] || (DOMProperty.hasOverloadedBooleanValue[name] && value === true)) {
            return escapeTextForBrowser(attributeName);
          }
          return processAttributeNameAndPrefix(attributeName) + escapeTextForBrowser(value) + '"';
        } else if (DOMProperty.isCustomAttribute(name)) {
          if (value == null) {
            return '';
          }
          return processAttributeNameAndPrefix(name) + escapeTextForBrowser(value) + '"';
        } else if ("production" !== process.env.NODE_ENV) {
          warnUnknownProperty(name);
        }
        return null;
      },
      setValueForProperty: function(node, name, value) {
        if (DOMProperty.isStandardName.hasOwnProperty(name) && DOMProperty.isStandardName[name]) {
          var mutationMethod = DOMProperty.getMutationMethod[name];
          if (mutationMethod) {
            mutationMethod(node, value);
          } else if (shouldIgnoreValue(name, value)) {
            this.deleteValueForProperty(node, name);
          } else if (DOMProperty.mustUseAttribute[name]) {
            node.setAttribute(DOMProperty.getAttributeName[name], '' + value);
          } else {
            var propName = DOMProperty.getPropertyName[name];
            if (!DOMProperty.hasSideEffects[name] || ('' + node[propName]) !== ('' + value)) {
              node[propName] = value;
            }
          }
        } else if (DOMProperty.isCustomAttribute(name)) {
          if (value == null) {
            node.removeAttribute(name);
          } else {
            node.setAttribute(name, '' + value);
          }
        } else if ("production" !== process.env.NODE_ENV) {
          warnUnknownProperty(name);
        }
      },
      deleteValueForProperty: function(node, name) {
        if (DOMProperty.isStandardName.hasOwnProperty(name) && DOMProperty.isStandardName[name]) {
          var mutationMethod = DOMProperty.getMutationMethod[name];
          if (mutationMethod) {
            mutationMethod(node, undefined);
          } else if (DOMProperty.mustUseAttribute[name]) {
            node.removeAttribute(DOMProperty.getAttributeName[name]);
          } else {
            var propName = DOMProperty.getPropertyName[name];
            var defaultValue = DOMProperty.getDefaultValueForProperty(node.nodeName, propName);
            if (!DOMProperty.hasSideEffects[name] || ('' + node[propName]) !== defaultValue) {
              node[propName] = defaultValue;
            }
          }
        } else if (DOMProperty.isCustomAttribute(name)) {
          node.removeAttribute(name);
        } else if ("production" !== process.env.NODE_ENV) {
          warnUnknownProperty(name);
        }
      }
    };
    module.exports = DOMPropertyOperations;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactComponentBrowserEnvironment", ["./ReactDOMIDOperations", "./ReactMount", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var ReactDOMIDOperations = require("./ReactDOMIDOperations");
    var ReactMount = require("./ReactMount");
    var ReactComponentBrowserEnvironment = {
      processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,
      replaceNodeWithMarkupByID: ReactDOMIDOperations.dangerouslyReplaceNodeWithMarkupByID,
      unmountIDFromEnvironment: function(rootNodeID) {
        ReactMount.purgeID(rootNodeID);
      }
    };
    module.exports = ReactComponentBrowserEnvironment;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/addons", ["./lib/ReactWithAddons"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("./lib/ReactWithAddons");
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1/lib/ReactDOMTextComponent", ["./DOMPropertyOperations", "./ReactComponentBrowserEnvironment", "./ReactDOMComponent", "./Object.assign", "./escapeTextForBrowser", "./invariant"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  'use strict';
  var DOMPropertyOperations = require("./DOMPropertyOperations");
  var ReactComponentBrowserEnvironment = require("./ReactComponentBrowserEnvironment");
  var ReactDOMComponent = require("./ReactDOMComponent");
  var assign = require("./Object.assign");
  var escapeTextForBrowser = require("./escapeTextForBrowser");
  var invariant = require("./invariant");
  var ReactDOMTextComponent = function(props) {};
  assign(ReactDOMTextComponent.prototype, {
    construct: function(text) {
      this._currentElement = text;
      this._stringText = '' + text;
      this._rootNodeID = null;
      this._mountIndex = 0;
    },
    mountComponent: function(rootID, transaction, context) {
      this._rootNodeID = rootID;
      var escapedText = escapeTextForBrowser(this._stringText);
      if (transaction.renderToStaticMarkup) {
        return escapedText;
      }
      return ('<span ' + DOMPropertyOperations.createMarkupForID(rootID) + '>' + escapedText + '</span>');
    },
    receiveComponent: function(nextText, transaction) {
      if (nextText !== this._currentElement) {
        this._currentElement = nextText;
        var nextStringText = '' + nextText;
        if (nextStringText !== this._stringText) {
          this._stringText = nextStringText;
          ReactDOMComponent.BackendIDOperations.updateTextContentByID(this._rootNodeID, nextStringText);
        }
      }
    },
    unmountComponent: function() {
      ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
    }
  });
  module.exports = ReactDOMTextComponent;
  global.define = __define;
  return module.exports;
});



System.register("app/mortgage-calculator-inputs", ["react/addons", "app/numeric-input"], function (_export) {
  "use strict";

  var React, NumericInput, _defineProperty, _prototypeProperties, _inherits, _classCallCheck, MortgageCalculatorInputsTable, MortgageCalculatorInputRow;
  return {
    setters: [function (_reactAddons) {
      React = _reactAddons["default"];
    }, function (_appNumericInput) {
      NumericInput = _appNumericInput.NumericInput;
    }],
    execute: function () {
      _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      MortgageCalculatorInputsTable = _export("MortgageCalculatorInputsTable", (function (_React$Component) {
        function MortgageCalculatorInputsTable() {
          _classCallCheck(this, MortgageCalculatorInputsTable);

          if (_React$Component != null) {
            _React$Component.apply(this, arguments);
          }
        }

        _inherits(MortgageCalculatorInputsTable, _React$Component);

        _prototypeProperties(MortgageCalculatorInputsTable, null, {
          handleChange: {
            value: function handleChange(field, value) {
              this.props.onChange(React.addons.update(this.props.mortgageInfo, _defineProperty({}, field, { $set: value })));
            },
            writable: true,
            configurable: true
          },
          render: {
            value: function render() {
              return React.createElement(
                "tbody",
                { className: "inputs" },
                React.createElement(MortgageCalculatorInputRow, { name: "Property price", unit: "£",
                  onChange: this.handleChange.bind(this, "propertyPrice"),
                  value: this.props.mortgageInfo.propertyPrice }),
                React.createElement(MortgageCalculatorInputRow, { name: "Deposit", unit: "£",
                  onChange: this.handleChange.bind(this, "deposit"),
                  value: this.props.mortgageInfo.deposit }),
                React.createElement(MortgageCalculatorInputRow, { name: "Interest", unit: "£", dp: "3",
                  onChange: this.handleChange.bind(this, "interest"),
                  value: this.props.mortgageInfo.interest }),
                React.createElement(MortgageCalculatorInputRow, { name: "Repayment term", unit: "y",
                  onChange: this.handleChange.bind(this, "repaymentTerm"),
                  value: this.props.mortgageInfo.repaymentTerm })
              );
            },
            writable: true,
            configurable: true
          }
        });

        return MortgageCalculatorInputsTable;
      })(React.Component));
      MortgageCalculatorInputRow = (function (_React$Component2) {
        function MortgageCalculatorInputRow() {
          _classCallCheck(this, MortgageCalculatorInputRow);

          if (_React$Component2 != null) {
            _React$Component2.apply(this, arguments);
          }
        }

        _inherits(MortgageCalculatorInputRow, _React$Component2);

        _prototypeProperties(MortgageCalculatorInputRow, null, {
          render: {
            value: function render() {
              return React.createElement(
                "tr",
                null,
                React.createElement(
                  "td",
                  null,
                  this.props.name
                ),
                React.createElement(
                  "td",
                  null,
                  React.createElement(NumericInput, { value: this.props.value, dp: this.props.dp,
                    onChange: this.props.onChange })
                ),
                React.createElement(
                  "td",
                  null,
                  this.props.unit
                )
              );
            },
            writable: true,
            configurable: true
          }
        });

        return MortgageCalculatorInputRow;
      })(React.Component);
    }
  };
});
System.register("npm:react@0.13.0-beta.1/lib/React", ["./DOMPropertyOperations", "./EventPluginUtils", "./ReactChildren", "./ReactComponent", "./ReactClass", "./ReactContext", "./ReactCurrentOwner", "./ReactElement", "./ReactElementValidator", "./ReactDOM", "./ReactDOMComponent", "./ReactDOMTextComponent", "./ReactDefaultInjection", "./ReactInstanceHandles", "./ReactMount", "./ReactMultiChild", "./ReactPerf", "./ReactPropTypes", "./ReactServerRendering", "./Object.assign", "./findDOMNode", "./onlyChild", "./ExecutionEnvironment", "process"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var DOMPropertyOperations = require("./DOMPropertyOperations");
    var EventPluginUtils = require("./EventPluginUtils");
    var ReactChildren = require("./ReactChildren");
    var ReactComponent = require("./ReactComponent");
    var ReactClass = require("./ReactClass");
    var ReactContext = require("./ReactContext");
    var ReactCurrentOwner = require("./ReactCurrentOwner");
    var ReactElement = require("./ReactElement");
    var ReactElementValidator = require("./ReactElementValidator");
    var ReactDOM = require("./ReactDOM");
    var ReactDOMComponent = require("./ReactDOMComponent");
    var ReactDOMTextComponent = require("./ReactDOMTextComponent");
    var ReactDefaultInjection = require("./ReactDefaultInjection");
    var ReactInstanceHandles = require("./ReactInstanceHandles");
    var ReactMount = require("./ReactMount");
    var ReactMultiChild = require("./ReactMultiChild");
    var ReactPerf = require("./ReactPerf");
    var ReactPropTypes = require("./ReactPropTypes");
    var ReactServerRendering = require("./ReactServerRendering");
    var assign = require("./Object.assign");
    var findDOMNode = require("./findDOMNode");
    var onlyChild = require("./onlyChild");
    ReactDefaultInjection.inject();
    var createElement = ReactElement.createElement;
    var createFactory = ReactElement.createFactory;
    if ("production" !== process.env.NODE_ENV) {
      createElement = ReactElementValidator.createElement;
      createFactory = ReactElementValidator.createFactory;
    }
    var render = ReactPerf.measure('React', 'render', ReactMount.render);
    var React = {
      Children: {
        map: ReactChildren.map,
        forEach: ReactChildren.forEach,
        count: ReactChildren.count,
        only: onlyChild
      },
      Component: ReactComponent,
      DOM: ReactDOM,
      PropTypes: ReactPropTypes,
      initializeTouchEvents: function(shouldUseTouch) {
        EventPluginUtils.useTouchEvents = shouldUseTouch;
      },
      createClass: ReactClass.createClass,
      createElement: createElement,
      createFactory: createFactory,
      createMixin: function(mixin) {
        return mixin;
      },
      constructAndRenderComponent: ReactMount.constructAndRenderComponent,
      constructAndRenderComponentByID: ReactMount.constructAndRenderComponentByID,
      findDOMNode: findDOMNode,
      render: render,
      renderToString: ReactServerRendering.renderToString,
      renderToStaticMarkup: ReactServerRendering.renderToStaticMarkup,
      unmountComponentAtNode: ReactMount.unmountComponentAtNode,
      isValidElement: ReactElement.isValidElement,
      withContext: ReactContext.withContext,
      __spread: assign
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
        CurrentOwner: ReactCurrentOwner,
        DOMComponent: ReactDOMComponent,
        DOMPropertyOperations: DOMPropertyOperations,
        InstanceHandles: ReactInstanceHandles,
        Mount: ReactMount,
        MultiChild: ReactMultiChild,
        TextComponent: ReactDOMTextComponent
      });
    }
    if ("production" !== process.env.NODE_ENV) {
      var ExecutionEnvironment = require("./ExecutionEnvironment");
      if (ExecutionEnvironment.canUseDOM && window.top === window.self) {
        if (navigator.userAgent.indexOf('Chrome') > -1) {
          if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
            console.debug('Download the React DevTools for a better development experience: ' + 'http://fb.me/react-devtools');
          }
        }
        var expectedFeatures = [Array.isArray, Array.prototype.every, Array.prototype.forEach, Array.prototype.indexOf, Array.prototype.map, Date.now, Function.prototype.bind, Object.keys, String.prototype.split, String.prototype.trim, Object.create, Object.freeze];
        for (var i = 0; i < expectedFeatures.length; i++) {
          if (!expectedFeatures[i]) {
            console.error('One or more ES5 shim/shams expected by React are not available: ' + 'http://fb.me/react-warning-polyfills');
            break;
          }
        }
      }
    }
    React.version = '0.13.0-beta.1';
    module.exports = React;
  })(require("process"));
  global.define = __define;
  return module.exports;
});



System.register("app/mortgage-calculator", ["react", "app/numeric-input", "app/mortgage-calculator-inputs", "app/mortgage-calculator-results"], function (_export) {
  "use strict";

  var React, NumericInput, MortgageCalculatorInputsTable, MortgageCalculatorResultsTable, _prototypeProperties, _get, _inherits, _classCallCheck, MortgageCalculator;
  return {
    setters: [function (_react) {
      React = _react["default"];
    }, function (_appNumericInput) {
      NumericInput = _appNumericInput.NumericInput;
    }, function (_appMortgageCalculatorInputs) {
      MortgageCalculatorInputsTable = _appMortgageCalculatorInputs.MortgageCalculatorInputsTable;
    }, function (_appMortgageCalculatorResults) {
      MortgageCalculatorResultsTable = _appMortgageCalculatorResults.MortgageCalculatorResultsTable;
    }],
    execute: function () {
      _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

      _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

      _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

      MortgageCalculator = _export("MortgageCalculator", (function (_React$Component) {
        function MortgageCalculator(props) {
          _classCallCheck(this, MortgageCalculator);

          _get(_React$Component.prototype, "constructor", this).call(this, props);
          this.state = { mortgageInfo: props.mortgageInfo };
        }

        _inherits(MortgageCalculator, _React$Component);

        _prototypeProperties(MortgageCalculator, null, {
          handleMortgageInfoChange: {
            value: function handleMortgageInfoChange(value) {
              this.setState({ mortgageInfo: value });
            },
            writable: true,
            configurable: true
          },
          render: {
            value: function render() {
              return React.createElement(
                "table",
                null,
                React.createElement(
                  "thead",
                  null,
                  React.createElement(
                    "tr",
                    null,
                    React.createElement(
                      "th",
                      { colSpan: "3" },
                      "Mortgage Calculator"
                    )
                  )
                ),
                React.createElement(MortgageCalculatorInputsTable, {
                  mortgageInfo: this.state.mortgageInfo,
                  onChange: this.handleMortgageInfoChange.bind(this) }),
                React.createElement(MortgageCalculatorResultsTable, {
                  mortgageInfo: this.state.mortgageInfo })
              );
            },
            writable: true,
            configurable: true
          }
        });

        return MortgageCalculator;
      })(React.Component));
      ;
    }
  };
});
System.register("npm:react@0.13.0-beta.1/react", ["./lib/React"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("./lib/React");
  global.define = __define;
  return module.exports;
});



System.register("npm:react@0.13.0-beta.1", ["npm:react@0.13.0-beta.1/react"], true, function(require, exports, module) {
  var global = System.global,
      __define = global.define;
  global.define = undefined;
  module.exports = require("npm:react@0.13.0-beta.1/react");
  global.define = __define;
  return module.exports;
});



System.register("app/main", ["react", "app/mortgage-calculator"], function (_export) {
  "use strict";

  var React, MortgageCalculator, mortgageInfo;
  return {
    setters: [function (_react) {
      React = _react["default"];
    }, function (_appMortgageCalculator) {
      MortgageCalculator = _appMortgageCalculator.MortgageCalculator;
    }],
    execute: function () {
      mortgageInfo = {
        propertyPrice: 200000,
        deposit: 30000,
        interest: 1.38,
        repaymentTerm: 30
      };


      React.render(React.createElement(MortgageCalculator, { mortgageInfo: mortgageInfo }), document.getElementById("container"));
    }
  };
});
//# sourceMappingURL=bundle.js.map