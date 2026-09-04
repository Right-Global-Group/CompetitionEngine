import { ref, computed, mergeProps, useSSRContext, unref, onMounted, inject, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useModel, withModifiers, createCommentVNode, defineComponent, withDirectives, vModelText, onUnmounted, renderSlot, watch, shallowRef, defineAsyncComponent, nextTick, onBeforeUnmount, resolveDynamicComponent, reactive, withKeys, createSSRApp, h as h$1 } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrGetDynamicModelProps, ssrLooseContain, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderVNode, ssrRenderTeleport, renderToString } from "vue/server-renderer";
import { usePage, Head, Link, useForm, router, createInertiaApp } from "@inertiajs/vue3";
import * as THREE from "three";
import axios from "axios";
import createServer from "@inertiajs/vue3/server";
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var _config = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, _defaults$1 = {
  duration: 0.5,
  overwrite: false,
  delay: 0
}, _suppressOverwrites$1, _reverting$1, _context$2, _bigNum$1 = 1e8, _tinyNum = 1 / _bigNum$1, _2PI = Math.PI * 2, _HALF_PI = _2PI / 4, _gsID = 0, _sqrt = Math.sqrt, _cos = Math.cos, _sin = Math.sin, _isString$1 = function _isString(value) {
  return typeof value === "string";
}, _isFunction$1 = function _isFunction(value) {
  return typeof value === "function";
}, _isNumber$1 = function _isNumber(value) {
  return typeof value === "number";
}, _isUndefined = function _isUndefined2(value) {
  return typeof value === "undefined";
}, _isObject$1 = function _isObject(value) {
  return typeof value === "object";
}, _isNotFalse = function _isNotFalse2(value) {
  return value !== false;
}, _windowExists$2 = function _windowExists() {
  return typeof window !== "undefined";
}, _isFuncOrString = function _isFuncOrString2(value) {
  return _isFunction$1(value) || _isString$1(value);
}, _isTypedArray = typeof ArrayBuffer === "function" && ArrayBuffer.isView || function() {
}, _isArray = Array.isArray, _strictNumExp = /(?:-?\.?\d|\.)+/gi, _numExp = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, _numWithUnitExp = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, _complexStringNumExp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, _relExp = /[+-]=-?[.\d]+/, _delimitedValueExp = /[^,'"\[\]\s]+/gi, _unitExp = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, _globalTimeline, _win$3, _coreInitted$2, _doc$3, _globals = {}, _installScope = {}, _coreReady, _install = function _install2(scope) {
  return (_installScope = _merge(scope, _globals)) && gsap$2;
}, _missingPlugin = function _missingPlugin2(property, value) {
  return console.warn("Invalid property", property, "set to", value, "Missing plugin? gsap.registerPlugin()");
}, _warn = function _warn2(message, suppress) {
  return !suppress && console.warn(message);
}, _addGlobal = function _addGlobal2(name, obj) {
  return name && (_globals[name] = obj) && _installScope && (_installScope[name] = obj) || _globals;
}, _emptyFunc = function _emptyFunc2() {
  return 0;
}, _startAtRevertConfig = {
  suppressEvents: true,
  isStart: true,
  kill: false
}, _revertConfigNoKill = {
  suppressEvents: true,
  kill: false
}, _revertConfig = {
  suppressEvents: true
}, _reservedProps = {}, _lazyTweens = [], _lazyLookup = {}, _lastRenderedFrame, _plugins = {}, _effects = {}, _nextGCFrame = 30, _harnessPlugins = [], _callbackNames = "", _harness = function _harness2(targets) {
  var target = targets[0], harnessPlugin, i2;
  _isObject$1(target) || _isFunction$1(target) || (targets = [targets]);
  if (!(harnessPlugin = (target._gsap || {}).harness)) {
    i2 = _harnessPlugins.length;
    while (i2-- && !_harnessPlugins[i2].targetTest(target)) {
    }
    harnessPlugin = _harnessPlugins[i2];
  }
  i2 = targets.length;
  while (i2--) {
    targets[i2] && (targets[i2]._gsap || (targets[i2]._gsap = new GSCache(targets[i2], harnessPlugin))) || targets.splice(i2, 1);
  }
  return targets;
}, _getCache = function _getCache2(target) {
  return target._gsap || _harness(toArray(target))[0]._gsap;
}, _getProperty = function _getProperty2(target, property, v2) {
  return (v2 = target[property]) && _isFunction$1(v2) ? target[property]() : _isUndefined(v2) && target.getAttribute && target.getAttribute(property) || v2;
}, _forEachName = function _forEachName2(names, func) {
  return (names = names.split(",")).forEach(func) || names;
}, _round$1 = function _round(value) {
  return Math.round(value * 1e5) / 1e5 || 0;
}, _roundPrecise = function _roundPrecise2(value) {
  return Math.round(value * 1e7) / 1e7 || 0;
}, _parseRelative = function _parseRelative2(start, value) {
  var operator = value.charAt(0), end = parseFloat(value.substr(2));
  start = parseFloat(start);
  return operator === "+" ? start + end : operator === "-" ? start - end : operator === "*" ? start * end : start / end;
}, _arrayContainsAny = function _arrayContainsAny2(toSearch, toFind) {
  var l2 = toFind.length, i2 = 0;
  for (; toSearch.indexOf(toFind[i2]) < 0 && ++i2 < l2; ) {
  }
  return i2 < l2;
}, _lazyRender = function _lazyRender2() {
  var l2 = _lazyTweens.length, a2 = _lazyTweens.slice(0), i2, tween;
  _lazyLookup = {};
  _lazyTweens.length = 0;
  for (i2 = 0; i2 < l2; i2++) {
    tween = a2[i2];
    tween && tween._lazy && (tween.render(tween._lazy[0], tween._lazy[1], true)._lazy = 0);
  }
}, _isRevertWorthy = function _isRevertWorthy2(animation) {
  return !!(animation._initted || animation._startAt || animation.add);
}, _lazySafeRender = function _lazySafeRender2(animation, time, suppressEvents, force) {
  _lazyTweens.length && !_reverting$1 && _lazyRender();
  animation.render(time, suppressEvents, !!(_reverting$1 && time < 0 && _isRevertWorthy(animation)));
  _lazyTweens.length && !_reverting$1 && _lazyRender();
}, _numericIfPossible = function _numericIfPossible2(value) {
  var n2 = parseFloat(value);
  return (n2 || n2 === 0) && (value + "").match(_delimitedValueExp).length < 2 ? n2 : _isString$1(value) ? value.trim() : value;
}, _passThrough$1 = function _passThrough(p2) {
  return p2;
}, _setDefaults$1 = function _setDefaults(obj, defaults2) {
  for (var p2 in defaults2) {
    p2 in obj || (obj[p2] = defaults2[p2]);
  }
  return obj;
}, _setKeyframeDefaults = function _setKeyframeDefaults2(excludeDuration) {
  return function(obj, defaults2) {
    for (var p2 in defaults2) {
      p2 in obj || p2 === "duration" && excludeDuration || p2 === "ease" || (obj[p2] = defaults2[p2]);
    }
  };
}, _merge = function _merge2(base, toMerge) {
  for (var p2 in toMerge) {
    base[p2] = toMerge[p2];
  }
  return base;
}, _mergeDeep = function _mergeDeep2(base, toMerge) {
  for (var p2 in toMerge) {
    p2 !== "__proto__" && p2 !== "constructor" && p2 !== "prototype" && (base[p2] = _isObject$1(toMerge[p2]) ? _mergeDeep2(base[p2] || (base[p2] = {}), toMerge[p2]) : toMerge[p2]);
  }
  return base;
}, _copyExcluding = function _copyExcluding2(obj, excluding) {
  var copy = {}, p2;
  for (p2 in obj) {
    p2 in excluding || (copy[p2] = obj[p2]);
  }
  return copy;
}, _inheritDefaults = function _inheritDefaults2(vars) {
  var parent = vars.parent || _globalTimeline, func = vars.keyframes ? _setKeyframeDefaults(_isArray(vars.keyframes)) : _setDefaults$1;
  if (_isNotFalse(vars.inherit)) {
    while (parent) {
      func(vars, parent.vars.defaults);
      parent = parent.parent || parent._dp;
    }
  }
  return vars;
}, _arraysMatch = function _arraysMatch2(a1, a2) {
  var i2 = a1.length, match = i2 === a2.length;
  while (match && i2-- && a1[i2] === a2[i2]) {
  }
  return i2 < 0;
}, _addLinkedListItem = function _addLinkedListItem2(parent, child, firstProp, lastProp, sortBy) {
  var prev = parent[lastProp], t3;
  if (sortBy) {
    t3 = child[sortBy];
    while (prev && prev[sortBy] > t3) {
      prev = prev._prev;
    }
  }
  if (prev) {
    child._next = prev._next;
    prev._next = child;
  } else {
    child._next = parent[firstProp];
    parent[firstProp] = child;
  }
  if (child._next) {
    child._next._prev = child;
  } else {
    parent[lastProp] = child;
  }
  child._prev = prev;
  child.parent = child._dp = parent;
  return child;
}, _removeLinkedListItem = function _removeLinkedListItem2(parent, child, firstProp, lastProp) {
  if (firstProp === void 0) {
    firstProp = "_first";
  }
  if (lastProp === void 0) {
    lastProp = "_last";
  }
  var prev = child._prev, next = child._next;
  if (prev) {
    prev._next = next;
  } else if (parent[firstProp] === child) {
    parent[firstProp] = next;
  }
  if (next) {
    next._prev = prev;
  } else if (parent[lastProp] === child) {
    parent[lastProp] = prev;
  }
  child._next = child._prev = child.parent = null;
}, _removeFromParent = function _removeFromParent2(child, onlyIfParentHasAutoRemove) {
  child.parent && (!onlyIfParentHasAutoRemove || child.parent.autoRemoveChildren) && child.parent.remove && child.parent.remove(child);
  child._act = 0;
}, _uncache = function _uncache2(animation, child) {
  if (animation && (!child || child._end > animation._dur || child._start < 0)) {
    var a2 = animation;
    while (a2) {
      a2._dirty = 1;
      a2 = a2.parent;
    }
  }
  return animation;
}, _recacheAncestors = function _recacheAncestors2(animation) {
  var parent = animation.parent;
  while (parent && parent.parent) {
    parent._dirty = 1;
    parent.totalDuration();
    parent = parent.parent;
  }
  return animation;
}, _rewindStartAt = function _rewindStartAt2(tween, totalTime, suppressEvents, force) {
  return tween._startAt && (_reverting$1 ? tween._startAt.revert(_revertConfigNoKill) : tween.vars.immediateRender && !tween.vars.autoRevert || tween._startAt.render(totalTime, true, force));
}, _hasNoPausedAncestors = function _hasNoPausedAncestors2(animation) {
  return !animation || animation._ts && _hasNoPausedAncestors2(animation.parent);
}, _elapsedCycleDuration = function _elapsedCycleDuration2(animation) {
  return animation._repeat ? _animationCycle(animation._tTime, animation = animation.duration() + animation._rDelay) * animation : 0;
}, _animationCycle = function _animationCycle2(tTime, cycleDuration) {
  var whole = Math.floor(tTime = _roundPrecise(tTime / cycleDuration));
  return tTime && whole === tTime ? whole - 1 : whole;
}, _parentToChildTotalTime = function _parentToChildTotalTime2(parentTime, child) {
  return (parentTime - child._start) * child._ts + (child._ts >= 0 ? 0 : child._dirty ? child.totalDuration() : child._tDur);
}, _setEnd = function _setEnd2(animation) {
  return animation._end = _roundPrecise(animation._start + (animation._tDur / Math.abs(animation._ts || animation._rts || _tinyNum) || 0));
}, _alignPlayhead = function _alignPlayhead2(animation, totalTime) {
  var parent = animation._dp;
  if (parent && parent.smoothChildTiming && animation._ts) {
    animation._start = _roundPrecise(parent._time - (animation._ts > 0 ? totalTime / animation._ts : ((animation._dirty ? animation.totalDuration() : animation._tDur) - totalTime) / -animation._ts));
    _setEnd(animation);
    parent._dirty || _uncache(parent, animation);
  }
  return animation;
}, _postAddChecks = function _postAddChecks2(timeline2, child) {
  var t3;
  if (child._time || !child._dur && child._initted || child._start < timeline2._time && (child._dur || !child.add)) {
    t3 = _parentToChildTotalTime(timeline2.rawTime(), child);
    if (!child._dur || _clamp$1(0, child.totalDuration(), t3) - child._tTime > _tinyNum) {
      child.render(t3, true);
    }
  }
  if (_uncache(timeline2, child)._dp && timeline2._initted && timeline2._time >= timeline2._dur && timeline2._ts) {
    if (timeline2._dur < timeline2.duration()) {
      t3 = timeline2;
      while (t3._dp) {
        t3.rawTime() >= 0 && t3.totalTime(t3._tTime);
        t3 = t3._dp;
      }
    }
    timeline2._zTime = -_tinyNum;
  }
}, _addToTimeline = function _addToTimeline2(timeline2, child, position, skipChecks) {
  child.parent && _removeFromParent(child);
  child._start = _roundPrecise((_isNumber$1(position) ? position : position || timeline2 !== _globalTimeline ? _parsePosition$1(timeline2, position, child) : timeline2._time) + child._delay);
  child._end = _roundPrecise(child._start + (child.totalDuration() / Math.abs(child.timeScale()) || 0));
  _addLinkedListItem(timeline2, child, "_first", "_last", timeline2._sort ? "_start" : 0);
  _isFromOrFromStart(child) || (timeline2._recent = child);
  skipChecks || _postAddChecks(timeline2, child);
  timeline2._ts < 0 && _alignPlayhead(timeline2, timeline2._tTime);
  return timeline2;
}, _scrollTrigger = function _scrollTrigger2(animation, trigger) {
  return (_globals.ScrollTrigger || _missingPlugin("scrollTrigger", trigger)) && _globals.ScrollTrigger.create(trigger, animation);
}, _attemptInitTween = function _attemptInitTween2(tween, time, force, suppressEvents, tTime) {
  _initTween(tween, time, tTime);
  if (!tween._initted) {
    return 1;
  }
  if (!force && tween._pt && !_reverting$1 && (tween._dur && tween.vars.lazy !== false || !tween._dur && tween.vars.lazy) && _lastRenderedFrame !== _ticker.frame) {
    _lazyTweens.push(tween);
    tween._lazy = [tTime, suppressEvents];
    return 1;
  }
}, _parentPlayheadIsBeforeStart = function _parentPlayheadIsBeforeStart2(_ref) {
  var parent = _ref.parent;
  return parent && parent._ts && parent._initted && !parent._lock && (parent.rawTime() < 0 || _parentPlayheadIsBeforeStart2(parent));
}, _isFromOrFromStart = function _isFromOrFromStart2(_ref2) {
  var data = _ref2.data;
  return data === "isFromStart" || data === "isStart";
}, _renderZeroDurationTween = function _renderZeroDurationTween2(tween, totalTime, suppressEvents, force) {
  var prevRatio = tween.ratio, ratio = totalTime < 0 || !totalTime && (!tween._start && _parentPlayheadIsBeforeStart(tween) && !(!tween._initted && _isFromOrFromStart(tween)) || (tween._ts < 0 || tween._dp._ts < 0) && !_isFromOrFromStart(tween)) ? 0 : 1, repeatDelay = tween._rDelay, tTime = 0, pt, iteration, prevIteration;
  if (repeatDelay && tween._repeat) {
    tTime = _clamp$1(0, tween._tDur, totalTime);
    iteration = _animationCycle(tTime, repeatDelay);
    tween._yoyo && iteration & 1 && (ratio = 1 - ratio);
    if (iteration !== _animationCycle(tween._tTime, repeatDelay)) {
      prevRatio = 1 - ratio;
      tween.vars.repeatRefresh && tween._initted && tween.invalidate();
    }
  }
  if (ratio !== prevRatio || _reverting$1 || force || tween._zTime === _tinyNum || !totalTime && tween._zTime) {
    if (!tween._initted && _attemptInitTween(tween, totalTime, force, suppressEvents, tTime)) {
      return;
    }
    prevIteration = tween._zTime;
    tween._zTime = totalTime || (suppressEvents ? _tinyNum : 0);
    suppressEvents || (suppressEvents = totalTime && !prevIteration);
    tween.ratio = ratio;
    tween._from && (ratio = 1 - ratio);
    tween._time = 0;
    tween._tTime = tTime;
    pt = tween._pt;
    while (pt) {
      pt.r(ratio, pt.d);
      pt = pt._next;
    }
    totalTime < 0 && _rewindStartAt(tween, totalTime, suppressEvents, true);
    tween._onUpdate && !suppressEvents && _callback$1(tween, "onUpdate");
    tTime && tween._repeat && !suppressEvents && tween.parent && _callback$1(tween, "onRepeat");
    if ((totalTime >= tween._tDur || totalTime < 0) && tween.ratio === ratio) {
      ratio && _removeFromParent(tween, 1);
      if (!suppressEvents && !_reverting$1) {
        _callback$1(tween, ratio ? "onComplete" : "onReverseComplete", true);
        tween._prom && tween._prom();
      }
    }
  } else if (!tween._zTime) {
    tween._zTime = totalTime;
  }
}, _findNextPauseTween = function _findNextPauseTween2(animation, prevTime, time) {
  var child;
  if (time > prevTime) {
    child = animation._first;
    while (child && child._start <= time) {
      if (child.data === "isPause" && child._start > prevTime) {
        return child;
      }
      child = child._next;
    }
  } else {
    child = animation._last;
    while (child && child._start >= time) {
      if (child.data === "isPause" && child._start < prevTime) {
        return child;
      }
      child = child._prev;
    }
  }
}, _setDuration = function _setDuration2(animation, duration, skipUncache, leavePlayhead) {
  var repeat = animation._repeat, dur = _roundPrecise(duration) || 0, totalProgress = animation._tTime / animation._tDur;
  totalProgress && !leavePlayhead && (animation._time *= dur / animation._dur);
  animation._dur = dur;
  animation._tDur = !repeat ? dur : repeat < 0 ? 1e10 : _roundPrecise(dur * (repeat + 1) + animation._rDelay * repeat);
  totalProgress > 0 && !leavePlayhead && _alignPlayhead(animation, animation._tTime = animation._tDur * totalProgress);
  animation.parent && _setEnd(animation);
  skipUncache || _uncache(animation.parent, animation);
  return animation;
}, _onUpdateTotalDuration = function _onUpdateTotalDuration2(animation) {
  return animation instanceof Timeline ? _uncache(animation) : _setDuration(animation, animation._dur);
}, _zeroPosition = {
  _start: 0,
  endTime: _emptyFunc,
  totalDuration: _emptyFunc
}, _parsePosition$1 = function _parsePosition(animation, position, percentAnimation) {
  var labels = animation.labels, recent = animation._recent || _zeroPosition, clippedDuration = animation.duration() >= _bigNum$1 ? recent.endTime(false) : animation._dur, i2, offset, isPercent;
  if (_isString$1(position) && (isNaN(position) || position in labels)) {
    offset = position.charAt(0);
    isPercent = position.substr(-1) === "%";
    i2 = position.indexOf("=");
    if (offset === "<" || offset === ">") {
      i2 >= 0 && (position = position.replace(/=/, ""));
      return (offset === "<" ? recent._start : recent.endTime(recent._repeat >= 0)) + (parseFloat(position.substr(1)) || 0) * (isPercent ? (i2 < 0 ? recent : percentAnimation).totalDuration() / 100 : 1);
    }
    if (i2 < 0) {
      position in labels || (labels[position] = clippedDuration);
      return labels[position];
    }
    offset = parseFloat(position.charAt(i2 - 1) + position.substr(i2 + 1));
    if (isPercent && percentAnimation) {
      offset = offset / 100 * (_isArray(percentAnimation) ? percentAnimation[0] : percentAnimation).totalDuration();
    }
    return i2 > 1 ? _parsePosition(animation, position.substr(0, i2 - 1), percentAnimation) + offset : clippedDuration + offset;
  }
  return position == null ? clippedDuration : +position;
}, _createTweenType = function _createTweenType2(type, params, timeline2) {
  var isLegacy = _isNumber$1(params[1]), varsIndex = (isLegacy ? 2 : 1) + (type < 2 ? 0 : 1), vars = params[varsIndex], irVars, parent;
  isLegacy && (vars.duration = params[1]);
  vars.parent = timeline2;
  if (type) {
    irVars = vars;
    parent = timeline2;
    while (parent && !("immediateRender" in irVars)) {
      irVars = parent.vars.defaults || {};
      parent = _isNotFalse(parent.vars.inherit) && parent.parent;
    }
    vars.immediateRender = _isNotFalse(irVars.immediateRender);
    type < 2 ? vars.runBackwards = 1 : vars.startAt = params[varsIndex - 1];
  }
  return new Tween(params[0], vars, params[varsIndex + 1]);
}, _conditionalReturn = function _conditionalReturn2(value, func) {
  return value || value === 0 ? func(value) : func;
}, _clamp$1 = function _clamp(min, max, value) {
  return value < min ? min : value > max ? max : value;
}, getUnit = function getUnit2(value, v2) {
  return !_isString$1(value) || !(v2 = _unitExp.exec(value)) ? "" : v2[1];
}, clamp = function clamp2(min, max, value) {
  return _conditionalReturn(value, function(v2) {
    return _clamp$1(min, max, v2);
  });
}, _slice = [].slice, _isArrayLike = function _isArrayLike2(value, nonEmpty) {
  return value && _isObject$1(value) && "length" in value && (!nonEmpty && !value.length || value.length - 1 in value && _isObject$1(value[0])) && !value.nodeType && value !== _win$3;
}, _flatten = function _flatten2(ar, leaveStrings, accumulator) {
  if (accumulator === void 0) {
    accumulator = [];
  }
  return ar.forEach(function(value) {
    var _accumulator;
    return _isString$1(value) && !leaveStrings || _isArrayLike(value, 1) ? (_accumulator = accumulator).push.apply(_accumulator, toArray(value)) : accumulator.push(value);
  }) || accumulator;
}, toArray = function toArray2(value, scope, leaveStrings) {
  return _context$2 && !scope && _context$2.selector ? _context$2.selector(value) : _isString$1(value) && !leaveStrings && (_coreInitted$2 || !_wake()) ? _slice.call((scope || _doc$3).querySelectorAll(value), 0) : _isArray(value) ? _flatten(value, leaveStrings) : _isArrayLike(value) ? _slice.call(value, 0) : value ? [value] : [];
}, selector = function selector2(value) {
  value = toArray(value)[0] || _warn("Invalid scope") || {};
  return function(v2) {
    var el = value.current || value.nativeElement || value;
    return toArray(v2, el.querySelectorAll ? el : el === value ? _warn("Invalid scope") || _doc$3.createElement("div") : value);
  };
}, shuffle = function shuffle2(a2) {
  return a2.sort(function() {
    return 0.5 - Math.random();
  });
}, distribute = function distribute2(v2) {
  if (_isFunction$1(v2)) {
    return v2;
  }
  var vars = _isObject$1(v2) ? v2 : {
    each: v2
  }, ease = _parseEase(vars.ease), from = vars.from || 0, base = parseFloat(vars.base) || 0, cache = {}, isDecimal = from > 0 && from < 1, ratios = isNaN(from) || isDecimal, axis = vars.axis, ratioX = from, ratioY = from;
  if (_isString$1(from)) {
    ratioX = ratioY = {
      center: 0.5,
      edges: 0.5,
      end: 1
    }[from] || 0;
  } else if (!isDecimal && ratios) {
    ratioX = from[0];
    ratioY = from[1];
  }
  return function(i2, target, a2) {
    var l2 = (a2 || vars).length, distances = cache[l2], originX, originY, x, y2, d2, j2, max, min, wrapAt;
    if (!distances) {
      wrapAt = vars.grid === "auto" ? 0 : (vars.grid || [1, _bigNum$1])[1];
      if (!wrapAt) {
        max = -_bigNum$1;
        while (max < (max = a2[wrapAt++].getBoundingClientRect().left) && wrapAt < l2) {
        }
        wrapAt < l2 && wrapAt--;
      }
      distances = cache[l2] = [];
      originX = ratios ? Math.min(wrapAt, l2) * ratioX - 0.5 : from % wrapAt;
      originY = wrapAt === _bigNum$1 ? 0 : ratios ? l2 * ratioY / wrapAt - 0.5 : from / wrapAt | 0;
      max = 0;
      min = _bigNum$1;
      for (j2 = 0; j2 < l2; j2++) {
        x = j2 % wrapAt - originX;
        y2 = originY - (j2 / wrapAt | 0);
        distances[j2] = d2 = !axis ? _sqrt(x * x + y2 * y2) : Math.abs(axis === "y" ? y2 : x);
        d2 > max && (max = d2);
        d2 < min && (min = d2);
      }
      from === "random" && shuffle(distances);
      distances.max = max - min;
      distances.min = min;
      distances.v = l2 = (parseFloat(vars.amount) || parseFloat(vars.each) * (wrapAt > l2 ? l2 - 1 : !axis ? Math.max(wrapAt, l2 / wrapAt) : axis === "y" ? l2 / wrapAt : wrapAt) || 0) * (from === "edges" ? -1 : 1);
      distances.b = l2 < 0 ? base - l2 : base;
      distances.u = getUnit(vars.amount || vars.each) || 0;
      ease = ease && l2 < 0 ? _invertEase(ease) : ease;
    }
    l2 = (distances[i2] - distances.min) / distances.max || 0;
    return _roundPrecise(distances.b + (ease ? ease(l2) : l2) * distances.v) + distances.u;
  };
}, _roundModifier = function _roundModifier2(v2) {
  var p2 = Math.pow(10, ((v2 + "").split(".")[1] || "").length);
  return function(raw) {
    var n2 = _roundPrecise(Math.round(parseFloat(raw) / v2) * v2 * p2);
    return (n2 - n2 % 1) / p2 + (_isNumber$1(raw) ? 0 : getUnit(raw));
  };
}, snap = function snap2(snapTo, value) {
  var isArray = _isArray(snapTo), radius, is2D;
  if (!isArray && _isObject$1(snapTo)) {
    radius = isArray = snapTo.radius || _bigNum$1;
    if (snapTo.values) {
      snapTo = toArray(snapTo.values);
      if (is2D = !_isNumber$1(snapTo[0])) {
        radius *= radius;
      }
    } else {
      snapTo = _roundModifier(snapTo.increment);
    }
  }
  return _conditionalReturn(value, !isArray ? _roundModifier(snapTo) : _isFunction$1(snapTo) ? function(raw) {
    is2D = snapTo(raw);
    return Math.abs(is2D - raw) <= radius ? is2D : raw;
  } : function(raw) {
    var x = parseFloat(is2D ? raw.x : raw), y2 = parseFloat(is2D ? raw.y : 0), min = _bigNum$1, closest = 0, i2 = snapTo.length, dx, dy;
    while (i2--) {
      if (is2D) {
        dx = snapTo[i2].x - x;
        dy = snapTo[i2].y - y2;
        dx = dx * dx + dy * dy;
      } else {
        dx = Math.abs(snapTo[i2] - x);
      }
      if (dx < min) {
        min = dx;
        closest = i2;
      }
    }
    closest = !radius || min <= radius ? snapTo[closest] : raw;
    return is2D || closest === raw || _isNumber$1(raw) ? closest : closest + getUnit(raw);
  });
}, random = function random2(min, max, roundingIncrement, returnFunction) {
  return _conditionalReturn(_isArray(min) ? !max : roundingIncrement === true ? !!(roundingIncrement = 0) : !returnFunction, function() {
    return _isArray(min) ? min[~~(Math.random() * min.length)] : (roundingIncrement = roundingIncrement || 1e-5) && (returnFunction = roundingIncrement < 1 ? Math.pow(10, (roundingIncrement + "").length - 2) : 1) && Math.floor(Math.round((min - roundingIncrement / 2 + Math.random() * (max - min + roundingIncrement * 0.99)) / roundingIncrement) * roundingIncrement * returnFunction) / returnFunction;
  });
}, pipe = function pipe2() {
  for (var _len = arguments.length, functions = new Array(_len), _key = 0; _key < _len; _key++) {
    functions[_key] = arguments[_key];
  }
  return function(value) {
    return functions.reduce(function(v2, f2) {
      return f2(v2);
    }, value);
  };
}, unitize = function unitize2(func, unit) {
  return function(value) {
    return func(parseFloat(value)) + (unit || getUnit(value));
  };
}, normalize = function normalize2(min, max, value) {
  return mapRange(min, max, 0, 1, value);
}, _wrapArray = function _wrapArray2(a2, wrapper, value) {
  return _conditionalReturn(value, function(index) {
    return a2[~~wrapper(index)];
  });
}, wrap = function wrap2(min, max, value) {
  var range = max - min;
  return _isArray(min) ? _wrapArray(min, wrap2(0, min.length), max) : _conditionalReturn(value, function(value2) {
    return (range + (value2 - min) % range) % range + min;
  });
}, wrapYoyo = function wrapYoyo2(min, max, value) {
  var range = max - min, total = range * 2;
  return _isArray(min) ? _wrapArray(min, wrapYoyo2(0, min.length - 1), max) : _conditionalReturn(value, function(value2) {
    value2 = (total + (value2 - min) % total) % total || 0;
    return min + (value2 > range ? total - value2 : value2);
  });
}, _replaceRandom = function _replaceRandom2(value) {
  var prev = 0, s2 = "", i2, nums, end, isArray;
  while (~(i2 = value.indexOf("random(", prev))) {
    end = value.indexOf(")", i2);
    isArray = value.charAt(i2 + 7) === "[";
    nums = value.substr(i2 + 7, end - i2 - 7).match(isArray ? _delimitedValueExp : _strictNumExp);
    s2 += value.substr(prev, i2 - prev) + random(isArray ? nums : +nums[0], isArray ? 0 : +nums[1], +nums[2] || 1e-5);
    prev = end + 1;
  }
  return s2 + value.substr(prev, value.length - prev);
}, mapRange = function mapRange2(inMin, inMax, outMin, outMax, value) {
  var inRange = inMax - inMin, outRange = outMax - outMin;
  return _conditionalReturn(value, function(value2) {
    return outMin + ((value2 - inMin) / inRange * outRange || 0);
  });
}, interpolate = function interpolate2(start, end, progress, mutate) {
  var func = isNaN(start + end) ? 0 : function(p3) {
    return (1 - p3) * start + p3 * end;
  };
  if (!func) {
    var isString = _isString$1(start), master = {}, p2, i2, interpolators, l2, il;
    progress === true && (mutate = 1) && (progress = null);
    if (isString) {
      start = {
        p: start
      };
      end = {
        p: end
      };
    } else if (_isArray(start) && !_isArray(end)) {
      interpolators = [];
      l2 = start.length;
      il = l2 - 2;
      for (i2 = 1; i2 < l2; i2++) {
        interpolators.push(interpolate2(start[i2 - 1], start[i2]));
      }
      l2--;
      func = function func2(p3) {
        p3 *= l2;
        var i3 = Math.min(il, ~~p3);
        return interpolators[i3](p3 - i3);
      };
      progress = end;
    } else if (!mutate) {
      start = _merge(_isArray(start) ? [] : {}, start);
    }
    if (!interpolators) {
      for (p2 in end) {
        _addPropTween.call(master, start, p2, "get", end[p2]);
      }
      func = function func2(p3) {
        return _renderPropTweens(p3, master) || (isString ? start.p : start);
      };
    }
  }
  return _conditionalReturn(progress, func);
}, _getLabelInDirection = function _getLabelInDirection2(timeline2, fromTime, backward) {
  var labels = timeline2.labels, min = _bigNum$1, p2, distance, label;
  for (p2 in labels) {
    distance = labels[p2] - fromTime;
    if (distance < 0 === !!backward && distance && min > (distance = Math.abs(distance))) {
      label = p2;
      min = distance;
    }
  }
  return label;
}, _callback$1 = function _callback(animation, type, executeLazyFirst) {
  var v2 = animation.vars, callback = v2[type], prevContext = _context$2, context3 = animation._ctx, params, scope, result;
  if (!callback) {
    return;
  }
  params = v2[type + "Params"];
  scope = v2.callbackScope || animation;
  executeLazyFirst && _lazyTweens.length && _lazyRender();
  context3 && (_context$2 = context3);
  result = params ? callback.apply(scope, params) : callback.call(scope);
  _context$2 = prevContext;
  return result;
}, _interrupt = function _interrupt2(animation) {
  _removeFromParent(animation);
  animation.scrollTrigger && animation.scrollTrigger.kill(!!_reverting$1);
  animation.progress() < 1 && _callback$1(animation, "onInterrupt");
  return animation;
}, _quickTween, _registerPluginQueue = [], _createPlugin = function _createPlugin2(config3) {
  if (!config3) return;
  config3 = !config3.name && config3["default"] || config3;
  if (_windowExists$2() || config3.headless) {
    var name = config3.name, isFunc = _isFunction$1(config3), Plugin = name && !isFunc && config3.init ? function() {
      this._props = [];
    } : config3, instanceDefaults = {
      init: _emptyFunc,
      render: _renderPropTweens,
      add: _addPropTween,
      kill: _killPropTweensOf,
      modifier: _addPluginModifier,
      rawVars: 0
    }, statics = {
      targetTest: 0,
      get: 0,
      getSetter: _getSetter,
      aliases: {},
      register: 0
    };
    _wake();
    if (config3 !== Plugin) {
      if (_plugins[name]) {
        return;
      }
      _setDefaults$1(Plugin, _setDefaults$1(_copyExcluding(config3, instanceDefaults), statics));
      _merge(Plugin.prototype, _merge(instanceDefaults, _copyExcluding(config3, statics)));
      _plugins[Plugin.prop = name] = Plugin;
      if (config3.targetTest) {
        _harnessPlugins.push(Plugin);
        _reservedProps[name] = 1;
      }
      name = (name === "css" ? "CSS" : name.charAt(0).toUpperCase() + name.substr(1)) + "Plugin";
    }
    _addGlobal(name, Plugin);
    config3.register && config3.register(gsap$2, Plugin, PropTween);
  } else {
    _registerPluginQueue.push(config3);
  }
}, _255 = 255, _colorLookup = {
  aqua: [0, _255, _255],
  lime: [0, _255, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, _255],
  navy: [0, 0, 128],
  white: [_255, _255, _255],
  olive: [128, 128, 0],
  yellow: [_255, _255, 0],
  orange: [_255, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [_255, 0, 0],
  pink: [_255, 192, 203],
  cyan: [0, _255, _255],
  transparent: [_255, _255, _255, 0]
}, _hue = function _hue2(h2, m1, m2) {
  h2 += h2 < 0 ? 1 : h2 > 1 ? -1 : 0;
  return (h2 * 6 < 1 ? m1 + (m2 - m1) * h2 * 6 : h2 < 0.5 ? m2 : h2 * 3 < 2 ? m1 + (m2 - m1) * (2 / 3 - h2) * 6 : m1) * _255 + 0.5 | 0;
}, splitColor = function splitColor2(v2, toHSL, forceAlpha) {
  var a2 = !v2 ? _colorLookup.black : _isNumber$1(v2) ? [v2 >> 16, v2 >> 8 & _255, v2 & _255] : 0, r2, g2, b2, h2, s2, l2, max, min, d2, wasHSL;
  if (!a2) {
    if (v2.substr(-1) === ",") {
      v2 = v2.substr(0, v2.length - 1);
    }
    if (_colorLookup[v2]) {
      a2 = _colorLookup[v2];
    } else if (v2.charAt(0) === "#") {
      if (v2.length < 6) {
        r2 = v2.charAt(1);
        g2 = v2.charAt(2);
        b2 = v2.charAt(3);
        v2 = "#" + r2 + r2 + g2 + g2 + b2 + b2 + (v2.length === 5 ? v2.charAt(4) + v2.charAt(4) : "");
      }
      if (v2.length === 9) {
        a2 = parseInt(v2.substr(1, 6), 16);
        return [a2 >> 16, a2 >> 8 & _255, a2 & _255, parseInt(v2.substr(7), 16) / 255];
      }
      v2 = parseInt(v2.substr(1), 16);
      a2 = [v2 >> 16, v2 >> 8 & _255, v2 & _255];
    } else if (v2.substr(0, 3) === "hsl") {
      a2 = wasHSL = v2.match(_strictNumExp);
      if (!toHSL) {
        h2 = +a2[0] % 360 / 360;
        s2 = +a2[1] / 100;
        l2 = +a2[2] / 100;
        g2 = l2 <= 0.5 ? l2 * (s2 + 1) : l2 + s2 - l2 * s2;
        r2 = l2 * 2 - g2;
        a2.length > 3 && (a2[3] *= 1);
        a2[0] = _hue(h2 + 1 / 3, r2, g2);
        a2[1] = _hue(h2, r2, g2);
        a2[2] = _hue(h2 - 1 / 3, r2, g2);
      } else if (~v2.indexOf("=")) {
        a2 = v2.match(_numExp);
        forceAlpha && a2.length < 4 && (a2[3] = 1);
        return a2;
      }
    } else {
      a2 = v2.match(_strictNumExp) || _colorLookup.transparent;
    }
    a2 = a2.map(Number);
  }
  if (toHSL && !wasHSL) {
    r2 = a2[0] / _255;
    g2 = a2[1] / _255;
    b2 = a2[2] / _255;
    max = Math.max(r2, g2, b2);
    min = Math.min(r2, g2, b2);
    l2 = (max + min) / 2;
    if (max === min) {
      h2 = s2 = 0;
    } else {
      d2 = max - min;
      s2 = l2 > 0.5 ? d2 / (2 - max - min) : d2 / (max + min);
      h2 = max === r2 ? (g2 - b2) / d2 + (g2 < b2 ? 6 : 0) : max === g2 ? (b2 - r2) / d2 + 2 : (r2 - g2) / d2 + 4;
      h2 *= 60;
    }
    a2[0] = ~~(h2 + 0.5);
    a2[1] = ~~(s2 * 100 + 0.5);
    a2[2] = ~~(l2 * 100 + 0.5);
  }
  forceAlpha && a2.length < 4 && (a2[3] = 1);
  return a2;
}, _colorOrderData = function _colorOrderData2(v2) {
  var values = [], c2 = [], i2 = -1;
  v2.split(_colorExp).forEach(function(v3) {
    var a2 = v3.match(_numWithUnitExp) || [];
    values.push.apply(values, a2);
    c2.push(i2 += a2.length + 1);
  });
  values.c = c2;
  return values;
}, _formatColors = function _formatColors2(s2, toHSL, orderMatchData) {
  var result = "", colors = (s2 + result).match(_colorExp), type = toHSL ? "hsla(" : "rgba(", i2 = 0, c2, shell, d2, l2;
  if (!colors) {
    return s2;
  }
  colors = colors.map(function(color) {
    return (color = splitColor(color, toHSL, 1)) && type + (toHSL ? color[0] + "," + color[1] + "%," + color[2] + "%," + color[3] : color.join(",")) + ")";
  });
  if (orderMatchData) {
    d2 = _colorOrderData(s2);
    c2 = orderMatchData.c;
    if (c2.join(result) !== d2.c.join(result)) {
      shell = s2.replace(_colorExp, "1").split(_numWithUnitExp);
      l2 = shell.length - 1;
      for (; i2 < l2; i2++) {
        result += shell[i2] + (~c2.indexOf(i2) ? colors.shift() || type + "0,0,0,0)" : (d2.length ? d2 : colors.length ? colors : orderMatchData).shift());
      }
    }
  }
  if (!shell) {
    shell = s2.split(_colorExp);
    l2 = shell.length - 1;
    for (; i2 < l2; i2++) {
      result += shell[i2] + colors[i2];
    }
  }
  return result + shell[l2];
}, _colorExp = (function() {
  var s2 = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", p2;
  for (p2 in _colorLookup) {
    s2 += "|" + p2 + "\\b";
  }
  return new RegExp(s2 + ")", "gi");
})(), _hslExp = /hsl[a]?\(/, _colorStringFilter = function _colorStringFilter2(a2) {
  var combined = a2.join(" "), toHSL;
  _colorExp.lastIndex = 0;
  if (_colorExp.test(combined)) {
    toHSL = _hslExp.test(combined);
    a2[1] = _formatColors(a2[1], toHSL);
    a2[0] = _formatColors(a2[0], toHSL, _colorOrderData(a2[1]));
    return true;
  }
}, _tickerActive, _ticker = (function() {
  var _getTime2 = Date.now, _lagThreshold = 500, _adjustedLag = 33, _startTime = _getTime2(), _lastUpdate = _startTime, _gap = 1e3 / 240, _nextTime = _gap, _listeners2 = [], _id, _req, _raf, _self, _delta, _i2, _tick = function _tick2(v2) {
    var elapsed = _getTime2() - _lastUpdate, manual = v2 === true, overlap, dispatch, time, frame;
    (elapsed > _lagThreshold || elapsed < 0) && (_startTime += elapsed - _adjustedLag);
    _lastUpdate += elapsed;
    time = _lastUpdate - _startTime;
    overlap = time - _nextTime;
    if (overlap > 0 || manual) {
      frame = ++_self.frame;
      _delta = time - _self.time * 1e3;
      _self.time = time = time / 1e3;
      _nextTime += overlap + (overlap >= _gap ? 4 : _gap - overlap);
      dispatch = 1;
    }
    manual || (_id = _req(_tick2));
    if (dispatch) {
      for (_i2 = 0; _i2 < _listeners2.length; _i2++) {
        _listeners2[_i2](time, _delta, frame, v2);
      }
    }
  };
  _self = {
    time: 0,
    frame: 0,
    tick: function tick() {
      _tick(true);
    },
    deltaRatio: function deltaRatio(fps) {
      return _delta / (1e3 / (fps || 60));
    },
    wake: function wake() {
      if (_coreReady) {
        if (!_coreInitted$2 && _windowExists$2()) {
          _win$3 = _coreInitted$2 = window;
          _doc$3 = _win$3.document || {};
          _globals.gsap = gsap$2;
          (_win$3.gsapVersions || (_win$3.gsapVersions = [])).push(gsap$2.version);
          _install(_installScope || _win$3.GreenSockGlobals || !_win$3.gsap && _win$3 || {});
          _registerPluginQueue.forEach(_createPlugin);
        }
        _raf = typeof requestAnimationFrame !== "undefined" && requestAnimationFrame;
        _id && _self.sleep();
        _req = _raf || function(f2) {
          return setTimeout(f2, _nextTime - _self.time * 1e3 + 1 | 0);
        };
        _tickerActive = 1;
        _tick(2);
      }
    },
    sleep: function sleep() {
      (_raf ? cancelAnimationFrame : clearTimeout)(_id);
      _tickerActive = 0;
      _req = _emptyFunc;
    },
    lagSmoothing: function lagSmoothing(threshold, adjustedLag) {
      _lagThreshold = threshold || Infinity;
      _adjustedLag = Math.min(adjustedLag || 33, _lagThreshold);
    },
    fps: function fps(_fps) {
      _gap = 1e3 / (_fps || 240);
      _nextTime = _self.time * 1e3 + _gap;
    },
    add: function add(callback, once, prioritize) {
      var func = once ? function(t3, d2, f2, v2) {
        callback(t3, d2, f2, v2);
        _self.remove(func);
      } : callback;
      _self.remove(callback);
      _listeners2[prioritize ? "unshift" : "push"](func);
      _wake();
      return func;
    },
    remove: function remove(callback, i2) {
      ~(i2 = _listeners2.indexOf(callback)) && _listeners2.splice(i2, 1) && _i2 >= i2 && _i2--;
    },
    _listeners: _listeners2
  };
  return _self;
})(), _wake = function _wake2() {
  return !_tickerActive && _ticker.wake();
}, _easeMap = {}, _customEaseExp = /^[\d.\-M][\d.\-,\s]/, _quotesExp = /["']/g, _parseObjectInString = function _parseObjectInString2(value) {
  var obj = {}, split = value.substr(1, value.length - 3).split(":"), key = split[0], i2 = 1, l2 = split.length, index, val, parsedVal;
  for (; i2 < l2; i2++) {
    val = split[i2];
    index = i2 !== l2 - 1 ? val.lastIndexOf(",") : val.length;
    parsedVal = val.substr(0, index);
    obj[key] = isNaN(parsedVal) ? parsedVal.replace(_quotesExp, "").trim() : +parsedVal;
    key = val.substr(index + 1).trim();
  }
  return obj;
}, _valueInParentheses = function _valueInParentheses2(value) {
  var open = value.indexOf("(") + 1, close = value.indexOf(")"), nested = value.indexOf("(", open);
  return value.substring(open, ~nested && nested < close ? value.indexOf(")", close + 1) : close);
}, _configEaseFromString = function _configEaseFromString2(name) {
  var split = (name + "").split("("), ease = _easeMap[split[0]];
  return ease && split.length > 1 && ease.config ? ease.config.apply(null, ~name.indexOf("{") ? [_parseObjectInString(split[1])] : _valueInParentheses(name).split(",").map(_numericIfPossible)) : _easeMap._CE && _customEaseExp.test(name) ? _easeMap._CE("", name) : ease;
}, _invertEase = function _invertEase2(ease) {
  return function(p2) {
    return 1 - ease(1 - p2);
  };
}, _propagateYoyoEase = function _propagateYoyoEase2(timeline2, isYoyo) {
  var child = timeline2._first, ease;
  while (child) {
    if (child instanceof Timeline) {
      _propagateYoyoEase2(child, isYoyo);
    } else if (child.vars.yoyoEase && (!child._yoyo || !child._repeat) && child._yoyo !== isYoyo) {
      if (child.timeline) {
        _propagateYoyoEase2(child.timeline, isYoyo);
      } else {
        ease = child._ease;
        child._ease = child._yEase;
        child._yEase = ease;
        child._yoyo = isYoyo;
      }
    }
    child = child._next;
  }
}, _parseEase = function _parseEase2(ease, defaultEase) {
  return !ease ? defaultEase : (_isFunction$1(ease) ? ease : _easeMap[ease] || _configEaseFromString(ease)) || defaultEase;
}, _insertEase = function _insertEase2(names, easeIn, easeOut, easeInOut) {
  if (easeOut === void 0) {
    easeOut = function easeOut2(p2) {
      return 1 - easeIn(1 - p2);
    };
  }
  if (easeInOut === void 0) {
    easeInOut = function easeInOut2(p2) {
      return p2 < 0.5 ? easeIn(p2 * 2) / 2 : 1 - easeIn((1 - p2) * 2) / 2;
    };
  }
  var ease = {
    easeIn,
    easeOut,
    easeInOut
  }, lowercaseName;
  _forEachName(names, function(name) {
    _easeMap[name] = _globals[name] = ease;
    _easeMap[lowercaseName = name.toLowerCase()] = easeOut;
    for (var p2 in ease) {
      _easeMap[lowercaseName + (p2 === "easeIn" ? ".in" : p2 === "easeOut" ? ".out" : ".inOut")] = _easeMap[name + "." + p2] = ease[p2];
    }
  });
  return ease;
}, _easeInOutFromOut = function _easeInOutFromOut2(easeOut) {
  return function(p2) {
    return p2 < 0.5 ? (1 - easeOut(1 - p2 * 2)) / 2 : 0.5 + easeOut((p2 - 0.5) * 2) / 2;
  };
}, _configElastic = function _configElastic2(type, amplitude, period) {
  var p1 = amplitude >= 1 ? amplitude : 1, p2 = (period || (type ? 0.3 : 0.45)) / (amplitude < 1 ? amplitude : 1), p3 = p2 / _2PI * (Math.asin(1 / p1) || 0), easeOut = function easeOut2(p4) {
    return p4 === 1 ? 1 : p1 * Math.pow(2, -10 * p4) * _sin((p4 - p3) * p2) + 1;
  }, ease = type === "out" ? easeOut : type === "in" ? function(p4) {
    return 1 - easeOut(1 - p4);
  } : _easeInOutFromOut(easeOut);
  p2 = _2PI / p2;
  ease.config = function(amplitude2, period2) {
    return _configElastic2(type, amplitude2, period2);
  };
  return ease;
}, _configBack = function _configBack2(type, overshoot) {
  if (overshoot === void 0) {
    overshoot = 1.70158;
  }
  var easeOut = function easeOut2(p2) {
    return p2 ? --p2 * p2 * ((overshoot + 1) * p2 + overshoot) + 1 : 0;
  }, ease = type === "out" ? easeOut : type === "in" ? function(p2) {
    return 1 - easeOut(1 - p2);
  } : _easeInOutFromOut(easeOut);
  ease.config = function(overshoot2) {
    return _configBack2(type, overshoot2);
  };
  return ease;
};
_forEachName("Linear,Quad,Cubic,Quart,Quint,Strong", function(name, i2) {
  var power = i2 < 5 ? i2 + 1 : i2;
  _insertEase(name + ",Power" + (power - 1), i2 ? function(p2) {
    return Math.pow(p2, power);
  } : function(p2) {
    return p2;
  }, function(p2) {
    return 1 - Math.pow(1 - p2, power);
  }, function(p2) {
    return p2 < 0.5 ? Math.pow(p2 * 2, power) / 2 : 1 - Math.pow((1 - p2) * 2, power) / 2;
  });
});
_easeMap.Linear.easeNone = _easeMap.none = _easeMap.Linear.easeIn;
_insertEase("Elastic", _configElastic("in"), _configElastic("out"), _configElastic());
(function(n2, c2) {
  var n1 = 1 / c2, n22 = 2 * n1, n3 = 2.5 * n1, easeOut = function easeOut2(p2) {
    return p2 < n1 ? n2 * p2 * p2 : p2 < n22 ? n2 * Math.pow(p2 - 1.5 / c2, 2) + 0.75 : p2 < n3 ? n2 * (p2 -= 2.25 / c2) * p2 + 0.9375 : n2 * Math.pow(p2 - 2.625 / c2, 2) + 0.984375;
  };
  _insertEase("Bounce", function(p2) {
    return 1 - easeOut(1 - p2);
  }, easeOut);
})(7.5625, 2.75);
_insertEase("Expo", function(p2) {
  return Math.pow(2, 10 * (p2 - 1)) * p2 + p2 * p2 * p2 * p2 * p2 * p2 * (1 - p2);
});
_insertEase("Circ", function(p2) {
  return -(_sqrt(1 - p2 * p2) - 1);
});
_insertEase("Sine", function(p2) {
  return p2 === 1 ? 1 : -_cos(p2 * _HALF_PI) + 1;
});
_insertEase("Back", _configBack("in"), _configBack("out"), _configBack());
_easeMap.SteppedEase = _easeMap.steps = _globals.SteppedEase = {
  config: function config(steps, immediateStart) {
    if (steps === void 0) {
      steps = 1;
    }
    var p1 = 1 / steps, p2 = steps + (immediateStart ? 0 : 1), p3 = immediateStart ? 1 : 0, max = 1 - _tinyNum;
    return function(p4) {
      return ((p2 * _clamp$1(0, max, p4) | 0) + p3) * p1;
    };
  }
};
_defaults$1.ease = _easeMap["quad.out"];
_forEachName("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(name) {
  return _callbackNames += name + "," + name + "Params,";
});
var GSCache = function GSCache2(target, harness) {
  this.id = _gsID++;
  target._gsap = this;
  this.target = target;
  this.harness = harness;
  this.get = harness ? harness.get : _getProperty;
  this.set = harness ? harness.getSetter : _getSetter;
};
var Animation = /* @__PURE__ */ (function() {
  function Animation2(vars) {
    this.vars = vars;
    this._delay = +vars.delay || 0;
    if (this._repeat = vars.repeat === Infinity ? -2 : vars.repeat || 0) {
      this._rDelay = vars.repeatDelay || 0;
      this._yoyo = !!vars.yoyo || !!vars.yoyoEase;
    }
    this._ts = 1;
    _setDuration(this, +vars.duration, 1, 1);
    this.data = vars.data;
    if (_context$2) {
      this._ctx = _context$2;
      _context$2.data.push(this);
    }
    _tickerActive || _ticker.wake();
  }
  var _proto = Animation2.prototype;
  _proto.delay = function delay(value) {
    if (value || value === 0) {
      this.parent && this.parent.smoothChildTiming && this.startTime(this._start + value - this._delay);
      this._delay = value;
      return this;
    }
    return this._delay;
  };
  _proto.duration = function duration(value) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? value + (value + this._rDelay) * this._repeat : value) : this.totalDuration() && this._dur;
  };
  _proto.totalDuration = function totalDuration(value) {
    if (!arguments.length) {
      return this._tDur;
    }
    this._dirty = 0;
    return _setDuration(this, this._repeat < 0 ? value : (value - this._repeat * this._rDelay) / (this._repeat + 1));
  };
  _proto.totalTime = function totalTime(_totalTime, suppressEvents) {
    _wake();
    if (!arguments.length) {
      return this._tTime;
    }
    var parent = this._dp;
    if (parent && parent.smoothChildTiming && this._ts) {
      _alignPlayhead(this, _totalTime);
      !parent._dp || parent.parent || _postAddChecks(parent, this);
      while (parent && parent.parent) {
        if (parent.parent._time !== parent._start + (parent._ts >= 0 ? parent._tTime / parent._ts : (parent.totalDuration() - parent._tTime) / -parent._ts)) {
          parent.totalTime(parent._tTime, true);
        }
        parent = parent.parent;
      }
      if (!this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && _totalTime < this._tDur || this._ts < 0 && _totalTime > 0 || !this._tDur && !_totalTime)) {
        _addToTimeline(this._dp, this, this._start - this._delay);
      }
    }
    if (this._tTime !== _totalTime || !this._dur && !suppressEvents || this._initted && Math.abs(this._zTime) === _tinyNum || !_totalTime && !this._initted && (this.add || this._ptLookup)) {
      this._ts || (this._pTime = _totalTime);
      _lazySafeRender(this, _totalTime, suppressEvents);
    }
    return this;
  };
  _proto.time = function time(value, suppressEvents) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), value + _elapsedCycleDuration(this)) % (this._dur + this._rDelay) || (value ? this._dur : 0), suppressEvents) : this._time;
  };
  _proto.totalProgress = function totalProgress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.totalDuration() * value, suppressEvents) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  };
  _proto.progress = function progress(value, suppressEvents) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - value : value) + _elapsedCycleDuration(this), suppressEvents) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  };
  _proto.iteration = function iteration(value, suppressEvents) {
    var cycleDuration = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (value - 1) * cycleDuration, suppressEvents) : this._repeat ? _animationCycle(this._tTime, cycleDuration) + 1 : 1;
  };
  _proto.timeScale = function timeScale(value, suppressEvents) {
    if (!arguments.length) {
      return this._rts === -_tinyNum ? 0 : this._rts;
    }
    if (this._rts === value) {
      return this;
    }
    var tTime = this.parent && this._ts ? _parentToChildTotalTime(this.parent._time, this) : this._tTime;
    this._rts = +value || 0;
    this._ts = this._ps || value === -_tinyNum ? 0 : this._rts;
    this.totalTime(_clamp$1(-Math.abs(this._delay), this.totalDuration(), tTime), suppressEvents !== false);
    _setEnd(this);
    return _recacheAncestors(this);
  };
  _proto.paused = function paused(value) {
    if (!arguments.length) {
      return this._ps;
    }
    if (this._ps !== value) {
      this._ps = value;
      if (value) {
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime());
        this._ts = this._act = 0;
      } else {
        _wake();
        this._ts = this._rts;
        this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== _tinyNum && (this._tTime -= _tinyNum));
      }
    }
    return this;
  };
  _proto.startTime = function startTime(value) {
    if (arguments.length) {
      this._start = value;
      var parent = this.parent || this._dp;
      parent && (parent._sort || !this.parent) && _addToTimeline(parent, this, value - this._delay);
      return this;
    }
    return this._start;
  };
  _proto.endTime = function endTime(includeRepeats) {
    return this._start + (_isNotFalse(includeRepeats) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  };
  _proto.rawTime = function rawTime(wrapRepeats) {
    var parent = this.parent || this._dp;
    return !parent ? this._tTime : wrapRepeats && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : !this._ts ? this._tTime : _parentToChildTotalTime(parent.rawTime(wrapRepeats), this);
  };
  _proto.revert = function revert(config3) {
    if (config3 === void 0) {
      config3 = _revertConfig;
    }
    var prevIsReverting = _reverting$1;
    _reverting$1 = config3;
    if (_isRevertWorthy(this)) {
      this.timeline && this.timeline.revert(config3);
      this.totalTime(-0.01, config3.suppressEvents);
    }
    this.data !== "nested" && config3.kill !== false && this.kill();
    _reverting$1 = prevIsReverting;
    return this;
  };
  _proto.globalTime = function globalTime(rawTime) {
    var animation = this, time = arguments.length ? rawTime : animation.rawTime();
    while (animation) {
      time = animation._start + time / (Math.abs(animation._ts) || 1);
      animation = animation._dp;
    }
    return !this.parent && this._sat ? this._sat.globalTime(rawTime) : time;
  };
  _proto.repeat = function repeat(value) {
    if (arguments.length) {
      this._repeat = value === Infinity ? -2 : value;
      return _onUpdateTotalDuration(this);
    }
    return this._repeat === -2 ? Infinity : this._repeat;
  };
  _proto.repeatDelay = function repeatDelay(value) {
    if (arguments.length) {
      var time = this._time;
      this._rDelay = value;
      _onUpdateTotalDuration(this);
      return time ? this.time(time) : this;
    }
    return this._rDelay;
  };
  _proto.yoyo = function yoyo(value) {
    if (arguments.length) {
      this._yoyo = value;
      return this;
    }
    return this._yoyo;
  };
  _proto.seek = function seek(position, suppressEvents) {
    return this.totalTime(_parsePosition$1(this, position), _isNotFalse(suppressEvents));
  };
  _proto.restart = function restart(includeDelay, suppressEvents) {
    this.play().totalTime(includeDelay ? -this._delay : 0, _isNotFalse(suppressEvents));
    this._dur || (this._zTime = -_tinyNum);
    return this;
  };
  _proto.play = function play(from, suppressEvents) {
    from != null && this.seek(from, suppressEvents);
    return this.reversed(false).paused(false);
  };
  _proto.reverse = function reverse(from, suppressEvents) {
    from != null && this.seek(from || this.totalDuration(), suppressEvents);
    return this.reversed(true).paused(false);
  };
  _proto.pause = function pause(atTime, suppressEvents) {
    atTime != null && this.seek(atTime, suppressEvents);
    return this.paused(true);
  };
  _proto.resume = function resume() {
    return this.paused(false);
  };
  _proto.reversed = function reversed(value) {
    if (arguments.length) {
      !!value !== this.reversed() && this.timeScale(-this._rts || (value ? -_tinyNum : 0));
      return this;
    }
    return this._rts < 0;
  };
  _proto.invalidate = function invalidate() {
    this._initted = this._act = 0;
    this._zTime = -_tinyNum;
    return this;
  };
  _proto.isActive = function isActive() {
    var parent = this.parent || this._dp, start = this._start, rawTime;
    return !!(!parent || this._ts && this._initted && parent.isActive() && (rawTime = parent.rawTime(true)) >= start && rawTime < this.endTime(true) - _tinyNum);
  };
  _proto.eventCallback = function eventCallback(type, callback, params) {
    var vars = this.vars;
    if (arguments.length > 1) {
      if (!callback) {
        delete vars[type];
      } else {
        vars[type] = callback;
        params && (vars[type + "Params"] = params);
        type === "onUpdate" && (this._onUpdate = callback);
      }
      return this;
    }
    return vars[type];
  };
  _proto.then = function then(onFulfilled) {
    var self = this;
    return new Promise(function(resolve) {
      var f2 = _isFunction$1(onFulfilled) ? onFulfilled : _passThrough$1, _resolve = function _resolve2() {
        var _then = self.then;
        self.then = null;
        _isFunction$1(f2) && (f2 = f2(self)) && (f2.then || f2 === self) && (self.then = _then);
        resolve(f2);
        self.then = _then;
      };
      if (self._initted && self.totalProgress() === 1 && self._ts >= 0 || !self._tTime && self._ts < 0) {
        _resolve();
      } else {
        self._prom = _resolve;
      }
    });
  };
  _proto.kill = function kill() {
    _interrupt(this);
  };
  return Animation2;
})();
_setDefaults$1(Animation.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: false,
  parent: null,
  _initted: false,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -_tinyNum,
  _prom: 0,
  _ps: false,
  _rts: 1
});
var Timeline = /* @__PURE__ */ (function(_Animation) {
  _inheritsLoose(Timeline2, _Animation);
  function Timeline2(vars, position) {
    var _this;
    if (vars === void 0) {
      vars = {};
    }
    _this = _Animation.call(this, vars) || this;
    _this.labels = {};
    _this.smoothChildTiming = !!vars.smoothChildTiming;
    _this.autoRemoveChildren = !!vars.autoRemoveChildren;
    _this._sort = _isNotFalse(vars.sortChildren);
    _globalTimeline && _addToTimeline(vars.parent || _globalTimeline, _assertThisInitialized(_this), position);
    vars.reversed && _this.reverse();
    vars.paused && _this.paused(true);
    vars.scrollTrigger && _scrollTrigger(_assertThisInitialized(_this), vars.scrollTrigger);
    return _this;
  }
  var _proto2 = Timeline2.prototype;
  _proto2.to = function to(targets, vars, position) {
    _createTweenType(0, arguments, this);
    return this;
  };
  _proto2.from = function from(targets, vars, position) {
    _createTweenType(1, arguments, this);
    return this;
  };
  _proto2.fromTo = function fromTo(targets, fromVars, toVars, position) {
    _createTweenType(2, arguments, this);
    return this;
  };
  _proto2.set = function set(targets, vars, position) {
    vars.duration = 0;
    vars.parent = this;
    _inheritDefaults(vars).repeatDelay || (vars.repeat = 0);
    vars.immediateRender = !!vars.immediateRender;
    new Tween(targets, vars, _parsePosition$1(this, position), 1);
    return this;
  };
  _proto2.call = function call(callback, params, position) {
    return _addToTimeline(this, Tween.delayedCall(0, callback, params), position);
  };
  _proto2.staggerTo = function staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.duration = duration;
    vars.stagger = vars.stagger || stagger;
    vars.onComplete = onCompleteAll;
    vars.onCompleteParams = onCompleteAllParams;
    vars.parent = this;
    new Tween(targets, vars, _parsePosition$1(this, position));
    return this;
  };
  _proto2.staggerFrom = function staggerFrom(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams) {
    vars.runBackwards = 1;
    _inheritDefaults(vars).immediateRender = _isNotFalse(vars.immediateRender);
    return this.staggerTo(targets, duration, vars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.staggerFromTo = function staggerFromTo(targets, duration, fromVars, toVars, stagger, position, onCompleteAll, onCompleteAllParams) {
    toVars.startAt = fromVars;
    _inheritDefaults(toVars).immediateRender = _isNotFalse(toVars.immediateRender);
    return this.staggerTo(targets, duration, toVars, stagger, position, onCompleteAll, onCompleteAllParams);
  };
  _proto2.render = function render3(totalTime, suppressEvents, force) {
    var prevTime = this._time, tDur = this._dirty ? this.totalDuration() : this._tDur, dur = this._dur, tTime = totalTime <= 0 ? 0 : _roundPrecise(totalTime), crossingStart = this._zTime < 0 !== totalTime < 0 && (this._initted || !dur), time, child, next, iteration, cycleDuration, prevPaused, pauseTween, timeScale, prevStart, prevIteration, yoyo, isYoyo;
    this !== _globalTimeline && tTime > tDur && totalTime >= 0 && (tTime = tDur);
    if (tTime !== this._tTime || force || crossingStart) {
      if (prevTime !== this._time && dur) {
        tTime += this._time - prevTime;
        totalTime += this._time - prevTime;
      }
      time = tTime;
      prevStart = this._start;
      timeScale = this._ts;
      prevPaused = !timeScale;
      if (crossingStart) {
        dur || (prevTime = this._zTime);
        (totalTime || !suppressEvents) && (this._zTime = totalTime);
      }
      if (this._repeat) {
        yoyo = this._yoyo;
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && totalTime < 0) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration);
        if (tTime === tDur) {
          iteration = this._repeat;
          time = dur;
        } else {
          prevIteration = _roundPrecise(tTime / cycleDuration);
          iteration = ~~prevIteration;
          if (iteration && iteration === prevIteration) {
            time = dur;
            iteration--;
          }
          time > dur && (time = dur);
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        !prevTime && this._tTime && prevIteration !== iteration && this._tTime - prevIteration * cycleDuration - this._dur <= 0 && (prevIteration = iteration);
        if (yoyo && iteration & 1) {
          time = dur - time;
          isYoyo = 1;
        }
        if (iteration !== prevIteration && !this._lock) {
          var rewinding = yoyo && prevIteration & 1, doesWrap = rewinding === (yoyo && iteration & 1);
          iteration < prevIteration && (rewinding = !rewinding);
          prevTime = rewinding ? 0 : tTime % dur ? dur : tTime;
          this._lock = 1;
          this.render(prevTime || (isYoyo ? 0 : _roundPrecise(iteration * cycleDuration)), suppressEvents, !dur)._lock = 0;
          this._tTime = tTime;
          !suppressEvents && this.parent && _callback$1(this, "onRepeat");
          this.vars.repeatRefresh && !isYoyo && (this.invalidate()._lock = 1);
          if (prevTime && prevTime !== this._time || prevPaused !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) {
            return this;
          }
          dur = this._dur;
          tDur = this._tDur;
          if (doesWrap) {
            this._lock = 2;
            prevTime = rewinding ? dur : -1e-4;
            this.render(prevTime, true);
            this.vars.repeatRefresh && !isYoyo && this.invalidate();
          }
          this._lock = 0;
          if (!this._ts && !prevPaused) {
            return this;
          }
          _propagateYoyoEase(this, isYoyo);
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2) {
        pauseTween = _findNextPauseTween(this, _roundPrecise(prevTime), _roundPrecise(time));
        if (pauseTween) {
          tTime -= time - (time = pauseTween._start);
        }
      }
      this._tTime = tTime;
      this._time = time;
      this._act = !timeScale;
      if (!this._initted) {
        this._onUpdate = this.vars.onUpdate;
        this._initted = 1;
        this._zTime = totalTime;
        prevTime = 0;
      }
      if (!prevTime && tTime && !suppressEvents && !prevIteration) {
        _callback$1(this, "onStart");
        if (this._tTime !== tTime) {
          return this;
        }
      }
      if (time >= prevTime && totalTime >= 0) {
        child = this._first;
        while (child) {
          next = child._next;
          if ((child._act || time >= child._start) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (time - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (time - child._start) * child._ts, suppressEvents, force);
            if (time !== this._time || !this._ts && !prevPaused) {
              pauseTween = 0;
              next && (tTime += this._zTime = -_tinyNum);
              break;
            }
          }
          child = next;
        }
      } else {
        child = this._last;
        var adjustedTime = totalTime < 0 ? totalTime : time;
        while (child) {
          next = child._prev;
          if ((child._act || adjustedTime <= child._end) && child._ts && pauseTween !== child) {
            if (child.parent !== this) {
              return this.render(totalTime, suppressEvents, force);
            }
            child.render(child._ts > 0 ? (adjustedTime - child._start) * child._ts : (child._dirty ? child.totalDuration() : child._tDur) + (adjustedTime - child._start) * child._ts, suppressEvents, force || _reverting$1 && _isRevertWorthy(child));
            if (time !== this._time || !this._ts && !prevPaused) {
              pauseTween = 0;
              next && (tTime += this._zTime = adjustedTime ? -_tinyNum : _tinyNum);
              break;
            }
          }
          child = next;
        }
      }
      if (pauseTween && !suppressEvents) {
        this.pause();
        pauseTween.render(time >= prevTime ? 0 : -_tinyNum)._zTime = time >= prevTime ? 1 : -1;
        if (this._ts) {
          this._start = prevStart;
          _setEnd(this);
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._onUpdate && !suppressEvents && _callback$1(this, "onUpdate", true);
      if (tTime === tDur && this._tTime >= this.totalDuration() || !tTime && prevTime) {
        if (prevStart === this._start || Math.abs(timeScale) !== Math.abs(this._ts)) {
          if (!this._lock) {
            (totalTime || !dur) && (tTime === tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
            if (!suppressEvents && !(totalTime < 0 && !prevTime) && (tTime || prevTime || !tDur)) {
              _callback$1(this, tTime === tDur && totalTime >= 0 ? "onComplete" : "onReverseComplete", true);
              this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
            }
          }
        }
      }
    }
    return this;
  };
  _proto2.add = function add(child, position) {
    var _this2 = this;
    _isNumber$1(position) || (position = _parsePosition$1(this, position, child));
    if (!(child instanceof Animation)) {
      if (_isArray(child)) {
        child.forEach(function(obj) {
          return _this2.add(obj, position);
        });
        return this;
      }
      if (_isString$1(child)) {
        return this.addLabel(child, position);
      }
      if (_isFunction$1(child)) {
        child = Tween.delayedCall(0, child);
      } else {
        return this;
      }
    }
    return this !== child ? _addToTimeline(this, child, position) : this;
  };
  _proto2.getChildren = function getChildren(nested, tweens, timelines, ignoreBeforeTime) {
    if (nested === void 0) {
      nested = true;
    }
    if (tweens === void 0) {
      tweens = true;
    }
    if (timelines === void 0) {
      timelines = true;
    }
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = -_bigNum$1;
    }
    var a2 = [], child = this._first;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        if (child instanceof Tween) {
          tweens && a2.push(child);
        } else {
          timelines && a2.push(child);
          nested && a2.push.apply(a2, child.getChildren(true, tweens, timelines));
        }
      }
      child = child._next;
    }
    return a2;
  };
  _proto2.getById = function getById2(id) {
    var animations = this.getChildren(1, 1, 1), i2 = animations.length;
    while (i2--) {
      if (animations[i2].vars.id === id) {
        return animations[i2];
      }
    }
  };
  _proto2.remove = function remove(child) {
    if (_isString$1(child)) {
      return this.removeLabel(child);
    }
    if (_isFunction$1(child)) {
      return this.killTweensOf(child);
    }
    child.parent === this && _removeLinkedListItem(this, child);
    if (child === this._recent) {
      this._recent = this._last;
    }
    return _uncache(this);
  };
  _proto2.totalTime = function totalTime(_totalTime2, suppressEvents) {
    if (!arguments.length) {
      return this._tTime;
    }
    this._forcing = 1;
    if (!this._dp && this._ts) {
      this._start = _roundPrecise(_ticker.time - (this._ts > 0 ? _totalTime2 / this._ts : (this.totalDuration() - _totalTime2) / -this._ts));
    }
    _Animation.prototype.totalTime.call(this, _totalTime2, suppressEvents);
    this._forcing = 0;
    return this;
  };
  _proto2.addLabel = function addLabel(label, position) {
    this.labels[label] = _parsePosition$1(this, position);
    return this;
  };
  _proto2.removeLabel = function removeLabel(label) {
    delete this.labels[label];
    return this;
  };
  _proto2.addPause = function addPause(position, callback, params) {
    var t3 = Tween.delayedCall(0, callback || _emptyFunc, params);
    t3.data = "isPause";
    this._hasPause = 1;
    return _addToTimeline(this, t3, _parsePosition$1(this, position));
  };
  _proto2.removePause = function removePause(position) {
    var child = this._first;
    position = _parsePosition$1(this, position);
    while (child) {
      if (child._start === position && child.data === "isPause") {
        _removeFromParent(child);
      }
      child = child._next;
    }
  };
  _proto2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    var tweens = this.getTweensOf(targets, onlyActive), i2 = tweens.length;
    while (i2--) {
      _overwritingTween !== tweens[i2] && tweens[i2].kill(targets, props);
    }
    return this;
  };
  _proto2.getTweensOf = function getTweensOf2(targets, onlyActive) {
    var a2 = [], parsedTargets = toArray(targets), child = this._first, isGlobalTime = _isNumber$1(onlyActive), children;
    while (child) {
      if (child instanceof Tween) {
        if (_arrayContainsAny(child._targets, parsedTargets) && (isGlobalTime ? (!_overwritingTween || child._initted && child._ts) && child.globalTime(0) <= onlyActive && child.globalTime(child.totalDuration()) > onlyActive : !onlyActive || child.isActive())) {
          a2.push(child);
        }
      } else if ((children = child.getTweensOf(parsedTargets, onlyActive)).length) {
        a2.push.apply(a2, children);
      }
      child = child._next;
    }
    return a2;
  };
  _proto2.tweenTo = function tweenTo(position, vars) {
    vars = vars || {};
    var tl = this, endTime = _parsePosition$1(tl, position), _vars = vars, startAt = _vars.startAt, _onStart = _vars.onStart, onStartParams = _vars.onStartParams, immediateRender = _vars.immediateRender, initted, tween = Tween.to(tl, _setDefaults$1({
      ease: vars.ease || "none",
      lazy: false,
      immediateRender: false,
      time: endTime,
      overwrite: "auto",
      duration: vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale()) || _tinyNum,
      onStart: function onStart() {
        tl.pause();
        if (!initted) {
          var duration = vars.duration || Math.abs((endTime - (startAt && "time" in startAt ? startAt.time : tl._time)) / tl.timeScale());
          tween._dur !== duration && _setDuration(tween, duration, 0, 1).render(tween._time, true, true);
          initted = 1;
        }
        _onStart && _onStart.apply(tween, onStartParams || []);
      }
    }, vars));
    return immediateRender ? tween.render(0) : tween;
  };
  _proto2.tweenFromTo = function tweenFromTo(fromPosition, toPosition, vars) {
    return this.tweenTo(toPosition, _setDefaults$1({
      startAt: {
        time: _parsePosition$1(this, fromPosition)
      }
    }, vars));
  };
  _proto2.recent = function recent() {
    return this._recent;
  };
  _proto2.nextLabel = function nextLabel(afterTime) {
    if (afterTime === void 0) {
      afterTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition$1(this, afterTime));
  };
  _proto2.previousLabel = function previousLabel(beforeTime) {
    if (beforeTime === void 0) {
      beforeTime = this._time;
    }
    return _getLabelInDirection(this, _parsePosition$1(this, beforeTime), 1);
  };
  _proto2.currentLabel = function currentLabel(value) {
    return arguments.length ? this.seek(value, true) : this.previousLabel(this._time + _tinyNum);
  };
  _proto2.shiftChildren = function shiftChildren(amount, adjustLabels, ignoreBeforeTime) {
    if (ignoreBeforeTime === void 0) {
      ignoreBeforeTime = 0;
    }
    var child = this._first, labels = this.labels, p2;
    while (child) {
      if (child._start >= ignoreBeforeTime) {
        child._start += amount;
        child._end += amount;
      }
      child = child._next;
    }
    if (adjustLabels) {
      for (p2 in labels) {
        if (labels[p2] >= ignoreBeforeTime) {
          labels[p2] += amount;
        }
      }
    }
    return _uncache(this);
  };
  _proto2.invalidate = function invalidate(soft) {
    var child = this._first;
    this._lock = 0;
    while (child) {
      child.invalidate(soft);
      child = child._next;
    }
    return _Animation.prototype.invalidate.call(this, soft);
  };
  _proto2.clear = function clear(includeLabels) {
    if (includeLabels === void 0) {
      includeLabels = true;
    }
    var child = this._first, next;
    while (child) {
      next = child._next;
      this.remove(child);
      child = next;
    }
    this._dp && (this._time = this._tTime = this._pTime = 0);
    includeLabels && (this.labels = {});
    return _uncache(this);
  };
  _proto2.totalDuration = function totalDuration(value) {
    var max = 0, self = this, child = self._last, prevStart = _bigNum$1, prev, start, parent;
    if (arguments.length) {
      return self.timeScale((self._repeat < 0 ? self.duration() : self.totalDuration()) / (self.reversed() ? -value : value));
    }
    if (self._dirty) {
      parent = self.parent;
      while (child) {
        prev = child._prev;
        child._dirty && child.totalDuration();
        start = child._start;
        if (start > prevStart && self._sort && child._ts && !self._lock) {
          self._lock = 1;
          _addToTimeline(self, child, start - child._delay, 1)._lock = 0;
        } else {
          prevStart = start;
        }
        if (start < 0 && child._ts) {
          max -= start;
          if (!parent && !self._dp || parent && parent.smoothChildTiming) {
            self._start += start / self._ts;
            self._time -= start;
            self._tTime -= start;
          }
          self.shiftChildren(-start, false, -Infinity);
          prevStart = 0;
        }
        child._end > max && child._ts && (max = child._end);
        child = prev;
      }
      _setDuration(self, self === _globalTimeline && self._time > max ? self._time : max, 1, 1);
      self._dirty = 0;
    }
    return self._tDur;
  };
  Timeline2.updateRoot = function updateRoot(time) {
    if (_globalTimeline._ts) {
      _lazySafeRender(_globalTimeline, _parentToChildTotalTime(time, _globalTimeline));
      _lastRenderedFrame = _ticker.frame;
    }
    if (_ticker.frame >= _nextGCFrame) {
      _nextGCFrame += _config.autoSleep || 120;
      var child = _globalTimeline._first;
      if (!child || !child._ts) {
        if (_config.autoSleep && _ticker._listeners.length < 2) {
          while (child && !child._ts) {
            child = child._next;
          }
          child || _ticker.sleep();
        }
      }
    }
  };
  return Timeline2;
})(Animation);
_setDefaults$1(Timeline.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var _addComplexStringPropTween = function _addComplexStringPropTween2(target, prop, start, end, setter, stringFilter, funcParam) {
  var pt = new PropTween(this._pt, target, prop, 0, 1, _renderComplexString, null, setter), index = 0, matchIndex = 0, result, startNums, color, endNum, chunk, startNum, hasRandom, a2;
  pt.b = start;
  pt.e = end;
  start += "";
  end += "";
  if (hasRandom = ~end.indexOf("random(")) {
    end = _replaceRandom(end);
  }
  if (stringFilter) {
    a2 = [start, end];
    stringFilter(a2, target, prop);
    start = a2[0];
    end = a2[1];
  }
  startNums = start.match(_complexStringNumExp) || [];
  while (result = _complexStringNumExp.exec(end)) {
    endNum = result[0];
    chunk = end.substring(index, result.index);
    if (color) {
      color = (color + 1) % 5;
    } else if (chunk.substr(-5) === "rgba(") {
      color = 1;
    }
    if (endNum !== startNums[matchIndex++]) {
      startNum = parseFloat(startNums[matchIndex - 1]) || 0;
      pt._pt = {
        _next: pt._pt,
        p: chunk || matchIndex === 1 ? chunk : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: startNum,
        c: endNum.charAt(1) === "=" ? _parseRelative(startNum, endNum) - startNum : parseFloat(endNum) - startNum,
        m: color && color < 4 ? Math.round : 0
      };
      index = _complexStringNumExp.lastIndex;
    }
  }
  pt.c = index < end.length ? end.substring(index, end.length) : "";
  pt.fp = funcParam;
  if (_relExp.test(end) || hasRandom) {
    pt.e = 0;
  }
  this._pt = pt;
  return pt;
}, _addPropTween = function _addPropTween2(target, prop, start, end, index, targets, modifier, stringFilter, funcParam, optional) {
  _isFunction$1(end) && (end = end(index || 0, target, targets));
  var currentValue = target[prop], parsedStart = start !== "get" ? start : !_isFunction$1(currentValue) ? currentValue : funcParam ? target[prop.indexOf("set") || !_isFunction$1(target["get" + prop.substr(3)]) ? prop : "get" + prop.substr(3)](funcParam) : target[prop](), setter = !_isFunction$1(currentValue) ? _setterPlain : funcParam ? _setterFuncWithParam : _setterFunc, pt;
  if (_isString$1(end)) {
    if (~end.indexOf("random(")) {
      end = _replaceRandom(end);
    }
    if (end.charAt(1) === "=") {
      pt = _parseRelative(parsedStart, end) + (getUnit(parsedStart) || 0);
      if (pt || pt === 0) {
        end = pt;
      }
    }
  }
  if (!optional || parsedStart !== end || _forceAllPropTweens) {
    if (!isNaN(parsedStart * end) && end !== "") {
      pt = new PropTween(this._pt, target, prop, +parsedStart || 0, end - (parsedStart || 0), typeof currentValue === "boolean" ? _renderBoolean : _renderPlain, 0, setter);
      funcParam && (pt.fp = funcParam);
      modifier && pt.modifier(modifier, this, target);
      return this._pt = pt;
    }
    !currentValue && !(prop in target) && _missingPlugin(prop, end);
    return _addComplexStringPropTween.call(this, target, prop, parsedStart, end, setter, stringFilter || _config.stringFilter, funcParam);
  }
}, _processVars = function _processVars2(vars, index, target, targets, tween) {
  _isFunction$1(vars) && (vars = _parseFuncOrString(vars, tween, index, target, targets));
  if (!_isObject$1(vars) || vars.style && vars.nodeType || _isArray(vars) || _isTypedArray(vars)) {
    return _isString$1(vars) ? _parseFuncOrString(vars, tween, index, target, targets) : vars;
  }
  var copy = {}, p2;
  for (p2 in vars) {
    copy[p2] = _parseFuncOrString(vars[p2], tween, index, target, targets);
  }
  return copy;
}, _checkPlugin = function _checkPlugin2(property, vars, tween, index, target, targets) {
  var plugin, pt, ptLookup, i2;
  if (_plugins[property] && (plugin = new _plugins[property]()).init(target, plugin.rawVars ? vars[property] : _processVars(vars[property], index, target, targets, tween), tween, index, targets) !== false) {
    tween._pt = pt = new PropTween(tween._pt, target, property, 0, 1, plugin.render, plugin, 0, plugin.priority);
    if (tween !== _quickTween) {
      ptLookup = tween._ptLookup[tween._targets.indexOf(target)];
      i2 = plugin._props.length;
      while (i2--) {
        ptLookup[plugin._props[i2]] = pt;
      }
    }
  }
  return plugin;
}, _overwritingTween, _forceAllPropTweens, _initTween = function _initTween2(tween, time, tTime) {
  var vars = tween.vars, ease = vars.ease, startAt = vars.startAt, immediateRender = vars.immediateRender, lazy = vars.lazy, onUpdate = vars.onUpdate, runBackwards = vars.runBackwards, yoyoEase = vars.yoyoEase, keyframes = vars.keyframes, autoRevert = vars.autoRevert, dur = tween._dur, prevStartAt = tween._startAt, targets = tween._targets, parent = tween.parent, fullTargets = parent && parent.data === "nested" ? parent.vars.targets : targets, autoOverwrite = tween._overwrite === "auto" && !_suppressOverwrites$1, tl = tween.timeline, cleanVars, i2, p2, pt, target, hasPriority, gsData, harness, plugin, ptLookup, index, harnessVars, overwritten;
  tl && (!keyframes || !ease) && (ease = "none");
  tween._ease = _parseEase(ease, _defaults$1.ease);
  tween._yEase = yoyoEase ? _invertEase(_parseEase(yoyoEase === true ? ease : yoyoEase, _defaults$1.ease)) : 0;
  if (yoyoEase && tween._yoyo && !tween._repeat) {
    yoyoEase = tween._yEase;
    tween._yEase = tween._ease;
    tween._ease = yoyoEase;
  }
  tween._from = !tl && !!vars.runBackwards;
  if (!tl || keyframes && !vars.stagger) {
    harness = targets[0] ? _getCache(targets[0]).harness : 0;
    harnessVars = harness && vars[harness.prop];
    cleanVars = _copyExcluding(vars, _reservedProps);
    if (prevStartAt) {
      prevStartAt._zTime < 0 && prevStartAt.progress(1);
      time < 0 && runBackwards && immediateRender && !autoRevert ? prevStartAt.render(-1, true) : prevStartAt.revert(runBackwards && dur ? _revertConfigNoKill : _startAtRevertConfig);
      prevStartAt._lazy = 0;
    }
    if (startAt) {
      _removeFromParent(tween._startAt = Tween.set(targets, _setDefaults$1({
        data: "isStart",
        overwrite: false,
        parent,
        immediateRender: true,
        lazy: !prevStartAt && _isNotFalse(lazy),
        startAt: null,
        delay: 0,
        onUpdate: onUpdate && function() {
          return _callback$1(tween, "onUpdate");
        },
        stagger: 0
      }, startAt)));
      tween._startAt._dp = 0;
      tween._startAt._sat = tween;
      time < 0 && (_reverting$1 || !immediateRender && !autoRevert) && tween._startAt.revert(_revertConfigNoKill);
      if (immediateRender) {
        if (dur && time <= 0 && tTime <= 0) {
          time && (tween._zTime = time);
          return;
        }
      }
    } else if (runBackwards && dur) {
      if (!prevStartAt) {
        time && (immediateRender = false);
        p2 = _setDefaults$1({
          overwrite: false,
          data: "isFromStart",
          //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
          lazy: immediateRender && !prevStartAt && _isNotFalse(lazy),
          immediateRender,
          //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
          stagger: 0,
          parent
          //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
        }, cleanVars);
        harnessVars && (p2[harness.prop] = harnessVars);
        _removeFromParent(tween._startAt = Tween.set(targets, p2));
        tween._startAt._dp = 0;
        tween._startAt._sat = tween;
        time < 0 && (_reverting$1 ? tween._startAt.revert(_revertConfigNoKill) : tween._startAt.render(-1, true));
        tween._zTime = time;
        if (!immediateRender) {
          _initTween2(tween._startAt, _tinyNum, _tinyNum);
        } else if (!time) {
          return;
        }
      }
    }
    tween._pt = tween._ptCache = 0;
    lazy = dur && _isNotFalse(lazy) || lazy && !dur;
    for (i2 = 0; i2 < targets.length; i2++) {
      target = targets[i2];
      gsData = target._gsap || _harness(targets)[i2]._gsap;
      tween._ptLookup[i2] = ptLookup = {};
      _lazyLookup[gsData.id] && _lazyTweens.length && _lazyRender();
      index = fullTargets === targets ? i2 : fullTargets.indexOf(target);
      if (harness && (plugin = new harness()).init(target, harnessVars || cleanVars, tween, index, fullTargets) !== false) {
        tween._pt = pt = new PropTween(tween._pt, target, plugin.name, 0, 1, plugin.render, plugin, 0, plugin.priority);
        plugin._props.forEach(function(name) {
          ptLookup[name] = pt;
        });
        plugin.priority && (hasPriority = 1);
      }
      if (!harness || harnessVars) {
        for (p2 in cleanVars) {
          if (_plugins[p2] && (plugin = _checkPlugin(p2, cleanVars, tween, index, target, fullTargets))) {
            plugin.priority && (hasPriority = 1);
          } else {
            ptLookup[p2] = pt = _addPropTween.call(tween, target, p2, "get", cleanVars[p2], index, fullTargets, 0, vars.stringFilter);
          }
        }
      }
      tween._op && tween._op[i2] && tween.kill(target, tween._op[i2]);
      if (autoOverwrite && tween._pt) {
        _overwritingTween = tween;
        _globalTimeline.killTweensOf(target, ptLookup, tween.globalTime(time));
        overwritten = !tween.parent;
        _overwritingTween = 0;
      }
      tween._pt && lazy && (_lazyLookup[gsData.id] = 1);
    }
    hasPriority && _sortPropTweensByPriority(tween);
    tween._onInit && tween._onInit(tween);
  }
  tween._onUpdate = onUpdate;
  tween._initted = (!tween._op || tween._pt) && !overwritten;
  keyframes && time <= 0 && tl.render(_bigNum$1, true, true);
}, _updatePropTweens = function _updatePropTweens2(tween, property, value, start, startIsRelative, ratio, time, skipRecursion) {
  var ptCache = (tween._pt && tween._ptCache || (tween._ptCache = {}))[property], pt, rootPT, lookup, i2;
  if (!ptCache) {
    ptCache = tween._ptCache[property] = [];
    lookup = tween._ptLookup;
    i2 = tween._targets.length;
    while (i2--) {
      pt = lookup[i2][property];
      if (pt && pt.d && pt.d._pt) {
        pt = pt.d._pt;
        while (pt && pt.p !== property && pt.fp !== property) {
          pt = pt._next;
        }
      }
      if (!pt) {
        _forceAllPropTweens = 1;
        tween.vars[property] = "+=0";
        _initTween(tween, time);
        _forceAllPropTweens = 0;
        return skipRecursion ? _warn(property + " not eligible for reset") : 1;
      }
      ptCache.push(pt);
    }
  }
  i2 = ptCache.length;
  while (i2--) {
    rootPT = ptCache[i2];
    pt = rootPT._pt || rootPT;
    pt.s = (start || start === 0) && !startIsRelative ? start : pt.s + (start || 0) + ratio * pt.c;
    pt.c = value - pt.s;
    rootPT.e && (rootPT.e = _round$1(value) + getUnit(rootPT.e));
    rootPT.b && (rootPT.b = pt.s + getUnit(rootPT.b));
  }
}, _addAliasesToVars = function _addAliasesToVars2(targets, vars) {
  var harness = targets[0] ? _getCache(targets[0]).harness : 0, propertyAliases = harness && harness.aliases, copy, p2, i2, aliases;
  if (!propertyAliases) {
    return vars;
  }
  copy = _merge({}, vars);
  for (p2 in propertyAliases) {
    if (p2 in copy) {
      aliases = propertyAliases[p2].split(",");
      i2 = aliases.length;
      while (i2--) {
        copy[aliases[i2]] = copy[p2];
      }
    }
  }
  return copy;
}, _parseKeyframe = function _parseKeyframe2(prop, obj, allProps, easeEach) {
  var ease = obj.ease || easeEach || "power1.inOut", p2, a2;
  if (_isArray(obj)) {
    a2 = allProps[prop] || (allProps[prop] = []);
    obj.forEach(function(value, i2) {
      return a2.push({
        t: i2 / (obj.length - 1) * 100,
        v: value,
        e: ease
      });
    });
  } else {
    for (p2 in obj) {
      a2 = allProps[p2] || (allProps[p2] = []);
      p2 === "ease" || a2.push({
        t: parseFloat(prop),
        v: obj[p2],
        e: ease
      });
    }
  }
}, _parseFuncOrString = function _parseFuncOrString2(value, tween, i2, target, targets) {
  return _isFunction$1(value) ? value.call(tween, i2, target, targets) : _isString$1(value) && ~value.indexOf("random(") ? _replaceRandom(value) : value;
}, _staggerTweenProps = _callbackNames + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", _staggerPropsToSkip = {};
_forEachName(_staggerTweenProps + ",id,stagger,delay,duration,paused,scrollTrigger", function(name) {
  return _staggerPropsToSkip[name] = 1;
});
var Tween = /* @__PURE__ */ (function(_Animation2) {
  _inheritsLoose(Tween2, _Animation2);
  function Tween2(targets, vars, position, skipInherit) {
    var _this3;
    if (typeof vars === "number") {
      position.duration = vars;
      vars = position;
      position = null;
    }
    _this3 = _Animation2.call(this, skipInherit ? vars : _inheritDefaults(vars)) || this;
    var _this3$vars = _this3.vars, duration = _this3$vars.duration, delay = _this3$vars.delay, immediateRender = _this3$vars.immediateRender, stagger = _this3$vars.stagger, overwrite = _this3$vars.overwrite, keyframes = _this3$vars.keyframes, defaults2 = _this3$vars.defaults, scrollTrigger = _this3$vars.scrollTrigger, yoyoEase = _this3$vars.yoyoEase, parent = vars.parent || _globalTimeline, parsedTargets = (_isArray(targets) || _isTypedArray(targets) ? _isNumber$1(targets[0]) : "length" in vars) ? [targets] : toArray(targets), tl, i2, copy, l2, p2, curTarget, staggerFunc, staggerVarsToMerge;
    _this3._targets = parsedTargets.length ? _harness(parsedTargets) : _warn("GSAP target " + targets + " not found. https://gsap.com", !_config.nullTargetWarn) || [];
    _this3._ptLookup = [];
    _this3._overwrite = overwrite;
    if (keyframes || stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
      vars = _this3.vars;
      tl = _this3.timeline = new Timeline({
        data: "nested",
        defaults: defaults2 || {},
        targets: parent && parent.data === "nested" ? parent.vars.targets : parsedTargets
      });
      tl.kill();
      tl.parent = tl._dp = _assertThisInitialized(_this3);
      tl._start = 0;
      if (stagger || _isFuncOrString(duration) || _isFuncOrString(delay)) {
        l2 = parsedTargets.length;
        staggerFunc = stagger && distribute(stagger);
        if (_isObject$1(stagger)) {
          for (p2 in stagger) {
            if (~_staggerTweenProps.indexOf(p2)) {
              staggerVarsToMerge || (staggerVarsToMerge = {});
              staggerVarsToMerge[p2] = stagger[p2];
            }
          }
        }
        for (i2 = 0; i2 < l2; i2++) {
          copy = _copyExcluding(vars, _staggerPropsToSkip);
          copy.stagger = 0;
          yoyoEase && (copy.yoyoEase = yoyoEase);
          staggerVarsToMerge && _merge(copy, staggerVarsToMerge);
          curTarget = parsedTargets[i2];
          copy.duration = +_parseFuncOrString(duration, _assertThisInitialized(_this3), i2, curTarget, parsedTargets);
          copy.delay = (+_parseFuncOrString(delay, _assertThisInitialized(_this3), i2, curTarget, parsedTargets) || 0) - _this3._delay;
          if (!stagger && l2 === 1 && copy.delay) {
            _this3._delay = delay = copy.delay;
            _this3._start += delay;
            copy.delay = 0;
          }
          tl.to(curTarget, copy, staggerFunc ? staggerFunc(i2, curTarget, parsedTargets) : 0);
          tl._ease = _easeMap.none;
        }
        tl.duration() ? duration = delay = 0 : _this3.timeline = 0;
      } else if (keyframes) {
        _inheritDefaults(_setDefaults$1(tl.vars.defaults, {
          ease: "none"
        }));
        tl._ease = _parseEase(keyframes.ease || vars.ease || "none");
        var time = 0, a2, kf, v2;
        if (_isArray(keyframes)) {
          keyframes.forEach(function(frame) {
            return tl.to(parsedTargets, frame, ">");
          });
          tl.duration();
        } else {
          copy = {};
          for (p2 in keyframes) {
            p2 === "ease" || p2 === "easeEach" || _parseKeyframe(p2, keyframes[p2], copy, keyframes.easeEach);
          }
          for (p2 in copy) {
            a2 = copy[p2].sort(function(a3, b2) {
              return a3.t - b2.t;
            });
            time = 0;
            for (i2 = 0; i2 < a2.length; i2++) {
              kf = a2[i2];
              v2 = {
                ease: kf.e,
                duration: (kf.t - (i2 ? a2[i2 - 1].t : 0)) / 100 * duration
              };
              v2[p2] = kf.v;
              tl.to(parsedTargets, v2, time);
              time += v2.duration;
            }
          }
          tl.duration() < duration && tl.to({}, {
            duration: duration - tl.duration()
          });
        }
      }
      duration || _this3.duration(duration = tl.duration());
    } else {
      _this3.timeline = 0;
    }
    if (overwrite === true && !_suppressOverwrites$1) {
      _overwritingTween = _assertThisInitialized(_this3);
      _globalTimeline.killTweensOf(parsedTargets);
      _overwritingTween = 0;
    }
    _addToTimeline(parent, _assertThisInitialized(_this3), position);
    vars.reversed && _this3.reverse();
    vars.paused && _this3.paused(true);
    if (immediateRender || !duration && !keyframes && _this3._start === _roundPrecise(parent._time) && _isNotFalse(immediateRender) && _hasNoPausedAncestors(_assertThisInitialized(_this3)) && parent.data !== "nested") {
      _this3._tTime = -_tinyNum;
      _this3.render(Math.max(0, -delay) || 0);
    }
    scrollTrigger && _scrollTrigger(_assertThisInitialized(_this3), scrollTrigger);
    return _this3;
  }
  var _proto3 = Tween2.prototype;
  _proto3.render = function render3(totalTime, suppressEvents, force) {
    var prevTime = this._time, tDur = this._tDur, dur = this._dur, isNegative = totalTime < 0, tTime = totalTime > tDur - _tinyNum && !isNegative ? tDur : totalTime < _tinyNum ? 0 : totalTime, time, pt, iteration, cycleDuration, prevIteration, isYoyo, ratio, timeline2, yoyoEase;
    if (!dur) {
      _renderZeroDurationTween(this, totalTime, suppressEvents, force);
    } else if (tTime !== this._tTime || !totalTime || force || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== isNegative || this._lazy) {
      time = tTime;
      timeline2 = this.timeline;
      if (this._repeat) {
        cycleDuration = dur + this._rDelay;
        if (this._repeat < -1 && isNegative) {
          return this.totalTime(cycleDuration * 100 + totalTime, suppressEvents, force);
        }
        time = _roundPrecise(tTime % cycleDuration);
        if (tTime === tDur) {
          iteration = this._repeat;
          time = dur;
        } else {
          prevIteration = _roundPrecise(tTime / cycleDuration);
          iteration = ~~prevIteration;
          if (iteration && iteration === prevIteration) {
            time = dur;
            iteration--;
          } else if (time > dur) {
            time = dur;
          }
        }
        isYoyo = this._yoyo && iteration & 1;
        if (isYoyo) {
          yoyoEase = this._yEase;
          time = dur - time;
        }
        prevIteration = _animationCycle(this._tTime, cycleDuration);
        if (time === prevTime && !force && this._initted && iteration === prevIteration) {
          this._tTime = tTime;
          return this;
        }
        if (iteration !== prevIteration) {
          timeline2 && this._yEase && _propagateYoyoEase(timeline2, isYoyo);
          if (this.vars.repeatRefresh && !isYoyo && !this._lock && time !== cycleDuration && this._initted) {
            this._lock = force = 1;
            this.render(_roundPrecise(cycleDuration * iteration), true).invalidate()._lock = 0;
          }
        }
      }
      if (!this._initted) {
        if (_attemptInitTween(this, isNegative ? totalTime : time, force, suppressEvents, tTime)) {
          this._tTime = 0;
          return this;
        }
        if (prevTime !== this._time && !(force && this.vars.repeatRefresh && iteration !== prevIteration)) {
          return this;
        }
        if (dur !== this._dur) {
          return this.render(totalTime, suppressEvents, force);
        }
      }
      this._tTime = tTime;
      this._time = time;
      if (!this._act && this._ts) {
        this._act = 1;
        this._lazy = 0;
      }
      this.ratio = ratio = (yoyoEase || this._ease)(time / dur);
      if (this._from) {
        this.ratio = ratio = 1 - ratio;
      }
      if (!prevTime && tTime && !suppressEvents && !prevIteration) {
        _callback$1(this, "onStart");
        if (this._tTime !== tTime) {
          return this;
        }
      }
      pt = this._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
      timeline2 && timeline2.render(totalTime < 0 ? totalTime : timeline2._dur * timeline2._ease(time / this._dur), suppressEvents, force) || this._startAt && (this._zTime = totalTime);
      if (this._onUpdate && !suppressEvents) {
        isNegative && _rewindStartAt(this, totalTime, suppressEvents, force);
        _callback$1(this, "onUpdate");
      }
      this._repeat && iteration !== prevIteration && this.vars.onRepeat && !suppressEvents && this.parent && _callback$1(this, "onRepeat");
      if ((tTime === this._tDur || !tTime) && this._tTime === tTime) {
        isNegative && !this._onUpdate && _rewindStartAt(this, totalTime, true, true);
        (totalTime || !dur) && (tTime === this._tDur && this._ts > 0 || !tTime && this._ts < 0) && _removeFromParent(this, 1);
        if (!suppressEvents && !(isNegative && !prevTime) && (tTime || prevTime || isYoyo)) {
          _callback$1(this, tTime === tDur ? "onComplete" : "onReverseComplete", true);
          this._prom && !(tTime < tDur && this.timeScale() > 0) && this._prom();
        }
      }
    }
    return this;
  };
  _proto3.targets = function targets() {
    return this._targets;
  };
  _proto3.invalidate = function invalidate(soft) {
    (!soft || !this.vars.runBackwards) && (this._startAt = 0);
    this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0;
    this._ptLookup = [];
    this.timeline && this.timeline.invalidate(soft);
    return _Animation2.prototype.invalidate.call(this, soft);
  };
  _proto3.resetTo = function resetTo(property, value, start, startIsRelative, skipRecursion) {
    _tickerActive || _ticker.wake();
    this._ts || this.play();
    var time = Math.min(this._dur, (this._dp._time - this._start) * this._ts), ratio;
    this._initted || _initTween(this, time);
    ratio = this._ease(time / this._dur);
    if (_updatePropTweens(this, property, value, start, startIsRelative, ratio, time, skipRecursion)) {
      return this.resetTo(property, value, start, startIsRelative, 1);
    }
    _alignPlayhead(this, 0);
    this.parent || _addLinkedListItem(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0);
    return this.render(0);
  };
  _proto3.kill = function kill(targets, vars) {
    if (vars === void 0) {
      vars = "all";
    }
    if (!targets && (!vars || vars === "all")) {
      this._lazy = this._pt = 0;
      this.parent ? _interrupt(this) : this.scrollTrigger && this.scrollTrigger.kill(!!_reverting$1);
      return this;
    }
    if (this.timeline) {
      var tDur = this.timeline.totalDuration();
      this.timeline.killTweensOf(targets, vars, _overwritingTween && _overwritingTween.vars.overwrite !== true)._first || _interrupt(this);
      this.parent && tDur !== this.timeline.totalDuration() && _setDuration(this, this._dur * this.timeline._tDur / tDur, 0, 1);
      return this;
    }
    var parsedTargets = this._targets, killingTargets = targets ? toArray(targets) : parsedTargets, propTweenLookup = this._ptLookup, firstPT = this._pt, overwrittenProps, curLookup, curOverwriteProps, props, p2, pt, i2;
    if ((!vars || vars === "all") && _arraysMatch(parsedTargets, killingTargets)) {
      vars === "all" && (this._pt = 0);
      return _interrupt(this);
    }
    overwrittenProps = this._op = this._op || [];
    if (vars !== "all") {
      if (_isString$1(vars)) {
        p2 = {};
        _forEachName(vars, function(name) {
          return p2[name] = 1;
        });
        vars = p2;
      }
      vars = _addAliasesToVars(parsedTargets, vars);
    }
    i2 = parsedTargets.length;
    while (i2--) {
      if (~killingTargets.indexOf(parsedTargets[i2])) {
        curLookup = propTweenLookup[i2];
        if (vars === "all") {
          overwrittenProps[i2] = vars;
          props = curLookup;
          curOverwriteProps = {};
        } else {
          curOverwriteProps = overwrittenProps[i2] = overwrittenProps[i2] || {};
          props = vars;
        }
        for (p2 in props) {
          pt = curLookup && curLookup[p2];
          if (pt) {
            if (!("kill" in pt.d) || pt.d.kill(p2) === true) {
              _removeLinkedListItem(this, pt, "_pt");
            }
            delete curLookup[p2];
          }
          if (curOverwriteProps !== "all") {
            curOverwriteProps[p2] = 1;
          }
        }
      }
    }
    this._initted && !this._pt && firstPT && _interrupt(this);
    return this;
  };
  Tween2.to = function to(targets, vars) {
    return new Tween2(targets, vars, arguments[2]);
  };
  Tween2.from = function from(targets, vars) {
    return _createTweenType(1, arguments);
  };
  Tween2.delayedCall = function delayedCall(delay, callback, params, scope) {
    return new Tween2(callback, 0, {
      immediateRender: false,
      lazy: false,
      overwrite: false,
      delay,
      onComplete: callback,
      onReverseComplete: callback,
      onCompleteParams: params,
      onReverseCompleteParams: params,
      callbackScope: scope
    });
  };
  Tween2.fromTo = function fromTo(targets, fromVars, toVars) {
    return _createTweenType(2, arguments);
  };
  Tween2.set = function set(targets, vars) {
    vars.duration = 0;
    vars.repeatDelay || (vars.repeat = 0);
    return new Tween2(targets, vars);
  };
  Tween2.killTweensOf = function killTweensOf(targets, props, onlyActive) {
    return _globalTimeline.killTweensOf(targets, props, onlyActive);
  };
  return Tween2;
})(Animation);
_setDefaults$1(Tween.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
_forEachName("staggerTo,staggerFrom,staggerFromTo", function(name) {
  Tween[name] = function() {
    var tl = new Timeline(), params = _slice.call(arguments, 0);
    params.splice(name === "staggerFromTo" ? 5 : 4, 0, 0);
    return tl[name].apply(tl, params);
  };
});
var _setterPlain = function _setterPlain2(target, property, value) {
  return target[property] = value;
}, _setterFunc = function _setterFunc2(target, property, value) {
  return target[property](value);
}, _setterFuncWithParam = function _setterFuncWithParam2(target, property, value, data) {
  return target[property](data.fp, value);
}, _setterAttribute = function _setterAttribute2(target, property, value) {
  return target.setAttribute(property, value);
}, _getSetter = function _getSetter2(target, property) {
  return _isFunction$1(target[property]) ? _setterFunc : _isUndefined(target[property]) && target.setAttribute ? _setterAttribute : _setterPlain;
}, _renderPlain = function _renderPlain2(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e6) / 1e6, data);
}, _renderBoolean = function _renderBoolean2(ratio, data) {
  return data.set(data.t, data.p, !!(data.s + data.c * ratio), data);
}, _renderComplexString = function _renderComplexString2(ratio, data) {
  var pt = data._pt, s2 = "";
  if (!ratio && data.b) {
    s2 = data.b;
  } else if (ratio === 1 && data.e) {
    s2 = data.e;
  } else {
    while (pt) {
      s2 = pt.p + (pt.m ? pt.m(pt.s + pt.c * ratio) : Math.round((pt.s + pt.c * ratio) * 1e4) / 1e4) + s2;
      pt = pt._next;
    }
    s2 += data.c;
  }
  data.set(data.t, data.p, s2, data);
}, _renderPropTweens = function _renderPropTweens2(ratio, data) {
  var pt = data._pt;
  while (pt) {
    pt.r(ratio, pt.d);
    pt = pt._next;
  }
}, _addPluginModifier = function _addPluginModifier2(modifier, tween, target, property) {
  var pt = this._pt, next;
  while (pt) {
    next = pt._next;
    pt.p === property && pt.modifier(modifier, tween, target);
    pt = next;
  }
}, _killPropTweensOf = function _killPropTweensOf2(property) {
  var pt = this._pt, hasNonDependentRemaining, next;
  while (pt) {
    next = pt._next;
    if (pt.p === property && !pt.op || pt.op === property) {
      _removeLinkedListItem(this, pt, "_pt");
    } else if (!pt.dep) {
      hasNonDependentRemaining = 1;
    }
    pt = next;
  }
  return !hasNonDependentRemaining;
}, _setterWithModifier = function _setterWithModifier2(target, property, value, data) {
  data.mSet(target, property, data.m.call(data.tween, value, data.mt), data);
}, _sortPropTweensByPriority = function _sortPropTweensByPriority2(parent) {
  var pt = parent._pt, next, pt2, first, last;
  while (pt) {
    next = pt._next;
    pt2 = first;
    while (pt2 && pt2.pr > pt.pr) {
      pt2 = pt2._next;
    }
    if (pt._prev = pt2 ? pt2._prev : last) {
      pt._prev._next = pt;
    } else {
      first = pt;
    }
    if (pt._next = pt2) {
      pt2._prev = pt;
    } else {
      last = pt;
    }
    pt = next;
  }
  parent._pt = first;
};
var PropTween = /* @__PURE__ */ (function() {
  function PropTween2(next, target, prop, start, change, renderer, data, setter, priority) {
    this.t = target;
    this.s = start;
    this.c = change;
    this.p = prop;
    this.r = renderer || _renderPlain;
    this.d = data || this;
    this.set = setter || _setterPlain;
    this.pr = priority || 0;
    this._next = next;
    if (next) {
      next._prev = this;
    }
  }
  var _proto4 = PropTween2.prototype;
  _proto4.modifier = function modifier(func, tween, target) {
    this.mSet = this.mSet || this.set;
    this.set = _setterWithModifier;
    this.m = func;
    this.mt = target;
    this.tween = tween;
  };
  return PropTween2;
})();
_forEachName(_callbackNames + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(name) {
  return _reservedProps[name] = 1;
});
_globals.TweenMax = _globals.TweenLite = Tween;
_globals.TimelineLite = _globals.TimelineMax = Timeline;
_globalTimeline = new Timeline({
  sortChildren: false,
  defaults: _defaults$1,
  autoRemoveChildren: true,
  id: "root",
  smoothChildTiming: true
});
_config.stringFilter = _colorStringFilter;
var _media = [], _listeners$1 = {}, _emptyArray$1 = [], _lastMediaTime = 0, _contextID = 0, _dispatch$1 = function _dispatch(type) {
  return (_listeners$1[type] || _emptyArray$1).map(function(f2) {
    return f2();
  });
}, _onMediaChange = function _onMediaChange2() {
  var time = Date.now(), matches = [];
  if (time - _lastMediaTime > 2) {
    _dispatch$1("matchMediaInit");
    _media.forEach(function(c2) {
      var queries = c2.queries, conditions = c2.conditions, match, p2, anyMatch, toggled;
      for (p2 in queries) {
        match = _win$3.matchMedia(queries[p2]).matches;
        match && (anyMatch = 1);
        if (match !== conditions[p2]) {
          conditions[p2] = match;
          toggled = 1;
        }
      }
      if (toggled) {
        c2.revert();
        anyMatch && matches.push(c2);
      }
    });
    _dispatch$1("matchMediaRevert");
    matches.forEach(function(c2) {
      return c2.onMatch(c2, function(func) {
        return c2.add(null, func);
      });
    });
    _lastMediaTime = time;
    _dispatch$1("matchMedia");
  }
};
var Context = /* @__PURE__ */ (function() {
  function Context2(func, scope) {
    this.selector = scope && selector(scope);
    this.data = [];
    this._r = [];
    this.isReverted = false;
    this.id = _contextID++;
    func && this.add(func);
  }
  var _proto5 = Context2.prototype;
  _proto5.add = function add(name, func, scope) {
    if (_isFunction$1(name)) {
      scope = func;
      func = name;
      name = _isFunction$1;
    }
    var self = this, f2 = function f3() {
      var prev = _context$2, prevSelector = self.selector, result;
      prev && prev !== self && prev.data.push(self);
      scope && (self.selector = selector(scope));
      _context$2 = self;
      result = func.apply(self, arguments);
      _isFunction$1(result) && self._r.push(result);
      _context$2 = prev;
      self.selector = prevSelector;
      self.isReverted = false;
      return result;
    };
    self.last = f2;
    return name === _isFunction$1 ? f2(self, function(func2) {
      return self.add(null, func2);
    }) : name ? self[name] = f2 : f2;
  };
  _proto5.ignore = function ignore(func) {
    var prev = _context$2;
    _context$2 = null;
    func(this);
    _context$2 = prev;
  };
  _proto5.getTweens = function getTweens() {
    var a2 = [];
    this.data.forEach(function(e2) {
      return e2 instanceof Context2 ? a2.push.apply(a2, e2.getTweens()) : e2 instanceof Tween && !(e2.parent && e2.parent.data === "nested") && a2.push(e2);
    });
    return a2;
  };
  _proto5.clear = function clear() {
    this._r.length = this.data.length = 0;
  };
  _proto5.kill = function kill(revert, matchMedia2) {
    var _this4 = this;
    if (revert) {
      (function() {
        var tweens = _this4.getTweens(), i3 = _this4.data.length, t3;
        while (i3--) {
          t3 = _this4.data[i3];
          if (t3.data === "isFlip") {
            t3.revert();
            t3.getChildren(true, true, false).forEach(function(tween) {
              return tweens.splice(tweens.indexOf(tween), 1);
            });
          }
        }
        tweens.map(function(t4) {
          return {
            g: t4._dur || t4._delay || t4._sat && !t4._sat.vars.immediateRender ? t4.globalTime(0) : -Infinity,
            t: t4
          };
        }).sort(function(a2, b2) {
          return b2.g - a2.g || -Infinity;
        }).forEach(function(o2) {
          return o2.t.revert(revert);
        });
        i3 = _this4.data.length;
        while (i3--) {
          t3 = _this4.data[i3];
          if (t3 instanceof Timeline) {
            if (t3.data !== "nested") {
              t3.scrollTrigger && t3.scrollTrigger.revert();
              t3.kill();
            }
          } else {
            !(t3 instanceof Tween) && t3.revert && t3.revert(revert);
          }
        }
        _this4._r.forEach(function(f2) {
          return f2(revert, _this4);
        });
        _this4.isReverted = true;
      })();
    } else {
      this.data.forEach(function(e2) {
        return e2.kill && e2.kill();
      });
    }
    this.clear();
    if (matchMedia2) {
      var i2 = _media.length;
      while (i2--) {
        _media[i2].id === this.id && _media.splice(i2, 1);
      }
    }
  };
  _proto5.revert = function revert(config3) {
    this.kill(config3 || {});
  };
  return Context2;
})();
var MatchMedia = /* @__PURE__ */ (function() {
  function MatchMedia2(scope) {
    this.contexts = [];
    this.scope = scope;
    _context$2 && _context$2.data.push(this);
  }
  var _proto6 = MatchMedia2.prototype;
  _proto6.add = function add(conditions, func, scope) {
    _isObject$1(conditions) || (conditions = {
      matches: conditions
    });
    var context3 = new Context(0, scope || this.scope), cond = context3.conditions = {}, mq, p2, active;
    _context$2 && !context3.selector && (context3.selector = _context$2.selector);
    this.contexts.push(context3);
    func = context3.add("onMatch", func);
    context3.queries = conditions;
    for (p2 in conditions) {
      if (p2 === "all") {
        active = 1;
      } else {
        mq = _win$3.matchMedia(conditions[p2]);
        if (mq) {
          _media.indexOf(context3) < 0 && _media.push(context3);
          (cond[p2] = mq.matches) && (active = 1);
          mq.addListener ? mq.addListener(_onMediaChange) : mq.addEventListener("change", _onMediaChange);
        }
      }
    }
    active && func(context3, function(f2) {
      return context3.add(null, f2);
    });
    return this;
  };
  _proto6.revert = function revert(config3) {
    this.kill(config3 || {});
  };
  _proto6.kill = function kill(revert) {
    this.contexts.forEach(function(c2) {
      return c2.kill(revert, true);
    });
  };
  return MatchMedia2;
})();
var _gsap = {
  registerPlugin: function registerPlugin() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    args.forEach(function(config3) {
      return _createPlugin(config3);
    });
  },
  timeline: function timeline(vars) {
    return new Timeline(vars);
  },
  getTweensOf: function getTweensOf(targets, onlyActive) {
    return _globalTimeline.getTweensOf(targets, onlyActive);
  },
  getProperty: function getProperty(target, property, unit, uncache) {
    _isString$1(target) && (target = toArray(target)[0]);
    var getter = _getCache(target || {}).get, format = unit ? _passThrough$1 : _numericIfPossible;
    unit === "native" && (unit = "");
    return !target ? target : !property ? function(property2, unit2, uncache2) {
      return format((_plugins[property2] && _plugins[property2].get || getter)(target, property2, unit2, uncache2));
    } : format((_plugins[property] && _plugins[property].get || getter)(target, property, unit, uncache));
  },
  quickSetter: function quickSetter(target, property, unit) {
    target = toArray(target);
    if (target.length > 1) {
      var setters = target.map(function(t3) {
        return gsap$2.quickSetter(t3, property, unit);
      }), l2 = setters.length;
      return function(value) {
        var i2 = l2;
        while (i2--) {
          setters[i2](value);
        }
      };
    }
    target = target[0] || {};
    var Plugin = _plugins[property], cache = _getCache(target), p2 = cache.harness && (cache.harness.aliases || {})[property] || property, setter = Plugin ? function(value) {
      var p3 = new Plugin();
      _quickTween._pt = 0;
      p3.init(target, unit ? value + unit : value, _quickTween, 0, [target]);
      p3.render(1, p3);
      _quickTween._pt && _renderPropTweens(1, _quickTween);
    } : cache.set(target, p2);
    return Plugin ? setter : function(value) {
      return setter(target, p2, unit ? value + unit : value, cache, 1);
    };
  },
  quickTo: function quickTo(target, property, vars) {
    var _setDefaults22;
    var tween = gsap$2.to(target, _setDefaults$1((_setDefaults22 = {}, _setDefaults22[property] = "+=0.1", _setDefaults22.paused = true, _setDefaults22.stagger = 0, _setDefaults22), vars || {})), func = function func2(value, start, startIsRelative) {
      return tween.resetTo(property, value, start, startIsRelative);
    };
    func.tween = tween;
    return func;
  },
  isTweening: function isTweening(targets) {
    return _globalTimeline.getTweensOf(targets, true).length > 0;
  },
  defaults: function defaults(value) {
    value && value.ease && (value.ease = _parseEase(value.ease, _defaults$1.ease));
    return _mergeDeep(_defaults$1, value || {});
  },
  config: function config2(value) {
    return _mergeDeep(_config, value || {});
  },
  registerEffect: function registerEffect(_ref3) {
    var name = _ref3.name, effect = _ref3.effect, plugins = _ref3.plugins, defaults2 = _ref3.defaults, extendTimeline = _ref3.extendTimeline;
    (plugins || "").split(",").forEach(function(pluginName) {
      return pluginName && !_plugins[pluginName] && !_globals[pluginName] && _warn(name + " effect requires " + pluginName + " plugin.");
    });
    _effects[name] = function(targets, vars, tl) {
      return effect(toArray(targets), _setDefaults$1(vars || {}, defaults2), tl);
    };
    if (extendTimeline) {
      Timeline.prototype[name] = function(targets, vars, position) {
        return this.add(_effects[name](targets, _isObject$1(vars) ? vars : (position = vars) && {}, this), position);
      };
    }
  },
  registerEase: function registerEase(name, ease) {
    _easeMap[name] = _parseEase(ease);
  },
  parseEase: function parseEase(ease, defaultEase) {
    return arguments.length ? _parseEase(ease, defaultEase) : _easeMap;
  },
  getById: function getById(id) {
    return _globalTimeline.getById(id);
  },
  exportRoot: function exportRoot(vars, includeDelayedCalls) {
    if (vars === void 0) {
      vars = {};
    }
    var tl = new Timeline(vars), child, next;
    tl.smoothChildTiming = _isNotFalse(vars.smoothChildTiming);
    _globalTimeline.remove(tl);
    tl._dp = 0;
    tl._time = tl._tTime = _globalTimeline._time;
    child = _globalTimeline._first;
    while (child) {
      next = child._next;
      if (includeDelayedCalls || !(!child._dur && child instanceof Tween && child.vars.onComplete === child._targets[0])) {
        _addToTimeline(tl, child, child._start - child._delay);
      }
      child = next;
    }
    _addToTimeline(_globalTimeline, tl, 0);
    return tl;
  },
  context: function context(func, scope) {
    return func ? new Context(func, scope) : _context$2;
  },
  matchMedia: function matchMedia(scope) {
    return new MatchMedia(scope);
  },
  matchMediaRefresh: function matchMediaRefresh() {
    return _media.forEach(function(c2) {
      var cond = c2.conditions, found, p2;
      for (p2 in cond) {
        if (cond[p2]) {
          cond[p2] = false;
          found = 1;
        }
      }
      found && c2.revert();
    }) || _onMediaChange();
  },
  addEventListener: function addEventListener(type, callback) {
    var a2 = _listeners$1[type] || (_listeners$1[type] = []);
    ~a2.indexOf(callback) || a2.push(callback);
  },
  removeEventListener: function removeEventListener(type, callback) {
    var a2 = _listeners$1[type], i2 = a2 && a2.indexOf(callback);
    i2 >= 0 && a2.splice(i2, 1);
  },
  utils: {
    wrap,
    wrapYoyo,
    distribute,
    random,
    snap,
    normalize,
    getUnit,
    clamp,
    splitColor,
    toArray,
    selector,
    mapRange,
    pipe,
    unitize,
    interpolate,
    shuffle
  },
  install: _install,
  effects: _effects,
  ticker: _ticker,
  updateRoot: Timeline.updateRoot,
  plugins: _plugins,
  globalTimeline: _globalTimeline,
  core: {
    PropTween,
    globals: _addGlobal,
    Tween,
    Timeline,
    Animation,
    getCache: _getCache,
    _removeLinkedListItem,
    reverting: function reverting() {
      return _reverting$1;
    },
    context: function context2(toAdd) {
      if (toAdd && _context$2) {
        _context$2.data.push(toAdd);
        toAdd._ctx = _context$2;
      }
      return _context$2;
    },
    suppressOverwrites: function suppressOverwrites(value) {
      return _suppressOverwrites$1 = value;
    }
  }
};
_forEachName("to,from,fromTo,delayedCall,set,killTweensOf", function(name) {
  return _gsap[name] = Tween[name];
});
_ticker.add(Timeline.updateRoot);
_quickTween = _gsap.to({}, {
  duration: 0
});
var _getPluginPropTween = function _getPluginPropTween2(plugin, prop) {
  var pt = plugin._pt;
  while (pt && pt.p !== prop && pt.op !== prop && pt.fp !== prop) {
    pt = pt._next;
  }
  return pt;
}, _addModifiers = function _addModifiers2(tween, modifiers) {
  var targets = tween._targets, p2, i2, pt;
  for (p2 in modifiers) {
    i2 = targets.length;
    while (i2--) {
      pt = tween._ptLookup[i2][p2];
      if (pt && (pt = pt.d)) {
        if (pt._pt) {
          pt = _getPluginPropTween(pt, p2);
        }
        pt && pt.modifier && pt.modifier(modifiers[p2], tween, targets[i2], p2);
      }
    }
  }
}, _buildModifierPlugin = function _buildModifierPlugin2(name, modifier) {
  return {
    name,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function init4(target, vars, tween) {
      tween._onInit = function(tween2) {
        var temp, p2;
        if (_isString$1(vars)) {
          temp = {};
          _forEachName(vars, function(name2) {
            return temp[name2] = 1;
          });
          vars = temp;
        }
        if (modifier) {
          temp = {};
          for (p2 in vars) {
            temp[p2] = modifier(vars[p2]);
          }
          vars = temp;
        }
        _addModifiers(tween2, vars);
      };
    }
  };
};
var gsap$2 = _gsap.registerPlugin({
  name: "attr",
  init: function init(target, vars, tween, index, targets) {
    var p2, pt, v2;
    this.tween = tween;
    for (p2 in vars) {
      v2 = target.getAttribute(p2) || "";
      pt = this.add(target, "setAttribute", (v2 || 0) + "", vars[p2], index, targets, 0, 0, p2);
      pt.op = p2;
      pt.b = v2;
      this._props.push(p2);
    }
  },
  render: function render(ratio, data) {
    var pt = data._pt;
    while (pt) {
      _reverting$1 ? pt.set(pt.t, pt.p, pt.b, pt) : pt.r(ratio, pt.d);
      pt = pt._next;
    }
  }
}, {
  name: "endArray",
  headless: 1,
  init: function init2(target, value) {
    var i2 = value.length;
    while (i2--) {
      this.add(target, i2, target[i2] || 0, value[i2], 0, 0, 0, 0, 0, 1);
    }
  }
}, _buildModifierPlugin("roundProps", _roundModifier), _buildModifierPlugin("modifiers"), _buildModifierPlugin("snap", snap)) || _gsap;
Tween.version = Timeline.version = gsap$2.version = "3.13.0";
_coreReady = 1;
_windowExists$2() && _wake();
_easeMap.Power0;
_easeMap.Power1;
_easeMap.Power2;
_easeMap.Power3;
_easeMap.Power4;
_easeMap.Linear;
_easeMap.Quad;
_easeMap.Cubic;
_easeMap.Quart;
_easeMap.Quint;
_easeMap.Strong;
_easeMap.Elastic;
_easeMap.Back;
_easeMap.SteppedEase;
_easeMap.Bounce;
_easeMap.Sine;
_easeMap.Expo;
_easeMap.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var _win$2, _doc$2, _docElement, _pluginInitted, _tempDiv, _recentSetterPlugin, _reverting, _windowExists$1 = function _windowExists2() {
  return typeof window !== "undefined";
}, _transformProps = {}, _RAD2DEG = 180 / Math.PI, _DEG2RAD = Math.PI / 180, _atan2 = Math.atan2, _bigNum = 1e8, _capsExp$1 = /([A-Z])/g, _horizontalExp = /(left|right|width|margin|padding|x)/i, _complexExp = /[\s,\(]\S/, _propertyAliases = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, _renderCSSProp = function _renderCSSProp2(ratio, data) {
  return data.set(data.t, data.p, Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
}, _renderPropWithEnd = function _renderPropWithEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio === 1 ? data.e : Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u, data);
}, _renderCSSPropWithBeginning = function _renderCSSPropWithBeginning2(ratio, data) {
  return data.set(data.t, data.p, ratio ? Math.round((data.s + data.c * ratio) * 1e4) / 1e4 + data.u : data.b, data);
}, _renderRoundedCSSProp = function _renderRoundedCSSProp2(ratio, data) {
  var value = data.s + data.c * ratio;
  data.set(data.t, data.p, ~~(value + (value < 0 ? -0.5 : 0.5)) + data.u, data);
}, _renderNonTweeningValue = function _renderNonTweeningValue2(ratio, data) {
  return data.set(data.t, data.p, ratio ? data.e : data.b, data);
}, _renderNonTweeningValueOnlyAtEnd = function _renderNonTweeningValueOnlyAtEnd2(ratio, data) {
  return data.set(data.t, data.p, ratio !== 1 ? data.b : data.e, data);
}, _setterCSSStyle = function _setterCSSStyle2(target, property, value) {
  return target.style[property] = value;
}, _setterCSSProp = function _setterCSSProp2(target, property, value) {
  return target.style.setProperty(property, value);
}, _setterTransform = function _setterTransform2(target, property, value) {
  return target._gsap[property] = value;
}, _setterScale = function _setterScale2(target, property, value) {
  return target._gsap.scaleX = target._gsap.scaleY = value;
}, _setterScaleWithRender = function _setterScaleWithRender2(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache.scaleX = cache.scaleY = value;
  cache.renderTransform(ratio, cache);
}, _setterTransformWithRender = function _setterTransformWithRender2(target, property, value, data, ratio) {
  var cache = target._gsap;
  cache[property] = value;
  cache.renderTransform(ratio, cache);
}, _transformProp$1 = "transform", _transformOriginProp = _transformProp$1 + "Origin", _saveStyle = function _saveStyle2(property, isNotCSS) {
  var _this = this;
  var target = this.target, style = target.style, cache = target._gsap;
  if (property in _transformProps && style) {
    this.tfm = this.tfm || {};
    if (property !== "transform") {
      property = _propertyAliases[property] || property;
      ~property.indexOf(",") ? property.split(",").forEach(function(a2) {
        return _this.tfm[a2] = _get(target, a2);
      }) : this.tfm[property] = cache.x ? cache[property] : _get(target, property);
      property === _transformOriginProp && (this.tfm.zOrigin = cache.zOrigin);
    } else {
      return _propertyAliases.transform.split(",").forEach(function(p2) {
        return _saveStyle2.call(_this, p2, isNotCSS);
      });
    }
    if (this.props.indexOf(_transformProp$1) >= 0) {
      return;
    }
    if (cache.svg) {
      this.svgo = target.getAttribute("data-svg-origin");
      this.props.push(_transformOriginProp, isNotCSS, "");
    }
    property = _transformProp$1;
  }
  (style || isNotCSS) && this.props.push(property, isNotCSS, style[property]);
}, _removeIndependentTransforms = function _removeIndependentTransforms2(style) {
  if (style.translate) {
    style.removeProperty("translate");
    style.removeProperty("scale");
    style.removeProperty("rotate");
  }
}, _revertStyle = function _revertStyle2() {
  var props = this.props, target = this.target, style = target.style, cache = target._gsap, i2, p2;
  for (i2 = 0; i2 < props.length; i2 += 3) {
    if (!props[i2 + 1]) {
      props[i2 + 2] ? style[props[i2]] = props[i2 + 2] : style.removeProperty(props[i2].substr(0, 2) === "--" ? props[i2] : props[i2].replace(_capsExp$1, "-$1").toLowerCase());
    } else if (props[i2 + 1] === 2) {
      target[props[i2]](props[i2 + 2]);
    } else {
      target[props[i2]] = props[i2 + 2];
    }
  }
  if (this.tfm) {
    for (p2 in this.tfm) {
      cache[p2] = this.tfm[p2];
    }
    if (cache.svg) {
      cache.renderTransform();
      target.setAttribute("data-svg-origin", this.svgo || "");
    }
    i2 = _reverting();
    if ((!i2 || !i2.isStart) && !style[_transformProp$1]) {
      _removeIndependentTransforms(style);
      if (cache.zOrigin && style[_transformOriginProp]) {
        style[_transformOriginProp] += " " + cache.zOrigin + "px";
        cache.zOrigin = 0;
        cache.renderTransform();
      }
      cache.uncache = 1;
    }
  }
}, _getStyleSaver = function _getStyleSaver2(target, properties) {
  var saver = {
    target,
    props: [],
    revert: _revertStyle,
    save: _saveStyle
  };
  target._gsap || gsap$2.core.getCache(target);
  properties && target.style && target.nodeType && properties.split(",").forEach(function(p2) {
    return saver.save(p2);
  });
  return saver;
}, _supports3D, _createElement = function _createElement2(type, ns) {
  var e2 = _doc$2.createElementNS ? _doc$2.createElementNS((ns || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), type) : _doc$2.createElement(type);
  return e2 && e2.style ? e2 : _doc$2.createElement(type);
}, _getComputedProperty = function _getComputedProperty2(target, property, skipPrefixFallback) {
  var cs = getComputedStyle(target);
  return cs[property] || cs.getPropertyValue(property.replace(_capsExp$1, "-$1").toLowerCase()) || cs.getPropertyValue(property) || !skipPrefixFallback && _getComputedProperty2(target, _checkPropPrefix(property) || property, 1) || "";
}, _prefixes = "O,Moz,ms,Ms,Webkit".split(","), _checkPropPrefix = function _checkPropPrefix2(property, element, preferPrefix) {
  var e2 = element || _tempDiv, s2 = e2.style, i2 = 5;
  if (property in s2 && !preferPrefix) {
    return property;
  }
  property = property.charAt(0).toUpperCase() + property.substr(1);
  while (i2-- && !(_prefixes[i2] + property in s2)) {
  }
  return i2 < 0 ? null : (i2 === 3 ? "ms" : i2 >= 0 ? _prefixes[i2] : "") + property;
}, _initCore$1 = function _initCore() {
  if (_windowExists$1() && window.document) {
    _win$2 = window;
    _doc$2 = _win$2.document;
    _docElement = _doc$2.documentElement;
    _tempDiv = _createElement("div") || {
      style: {}
    };
    _createElement("div");
    _transformProp$1 = _checkPropPrefix(_transformProp$1);
    _transformOriginProp = _transformProp$1 + "Origin";
    _tempDiv.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0";
    _supports3D = !!_checkPropPrefix("perspective");
    _reverting = gsap$2.core.reverting;
    _pluginInitted = 1;
  }
}, _getReparentedCloneBBox = function _getReparentedCloneBBox2(target) {
  var owner = target.ownerSVGElement, svg = _createElement("svg", owner && owner.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), clone = target.cloneNode(true), bbox;
  clone.style.display = "block";
  svg.appendChild(clone);
  _docElement.appendChild(svg);
  try {
    bbox = clone.getBBox();
  } catch (e2) {
  }
  svg.removeChild(clone);
  _docElement.removeChild(svg);
  return bbox;
}, _getAttributeFallbacks = function _getAttributeFallbacks2(target, attributesArray) {
  var i2 = attributesArray.length;
  while (i2--) {
    if (target.hasAttribute(attributesArray[i2])) {
      return target.getAttribute(attributesArray[i2]);
    }
  }
}, _getBBox = function _getBBox2(target) {
  var bounds, cloned;
  try {
    bounds = target.getBBox();
  } catch (error) {
    bounds = _getReparentedCloneBBox(target);
    cloned = 1;
  }
  bounds && (bounds.width || bounds.height) || cloned || (bounds = _getReparentedCloneBBox(target));
  return bounds && !bounds.width && !bounds.x && !bounds.y ? {
    x: +_getAttributeFallbacks(target, ["x", "cx", "x1"]) || 0,
    y: +_getAttributeFallbacks(target, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : bounds;
}, _isSVG = function _isSVG2(e2) {
  return !!(e2.getCTM && (!e2.parentNode || e2.ownerSVGElement) && _getBBox(e2));
}, _removeProperty = function _removeProperty2(target, property) {
  if (property) {
    var style = target.style, first2Chars;
    if (property in _transformProps && property !== _transformOriginProp) {
      property = _transformProp$1;
    }
    if (style.removeProperty) {
      first2Chars = property.substr(0, 2);
      if (first2Chars === "ms" || property.substr(0, 6) === "webkit") {
        property = "-" + property;
      }
      style.removeProperty(first2Chars === "--" ? property : property.replace(_capsExp$1, "-$1").toLowerCase());
    } else {
      style.removeAttribute(property);
    }
  }
}, _addNonTweeningPT = function _addNonTweeningPT2(plugin, target, property, beginning, end, onlySetAtEnd) {
  var pt = new PropTween(plugin._pt, target, property, 0, 1, onlySetAtEnd ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue);
  plugin._pt = pt;
  pt.b = beginning;
  pt.e = end;
  plugin._props.push(property);
  return pt;
}, _nonConvertibleUnits = {
  deg: 1,
  rad: 1,
  turn: 1
}, _nonStandardLayouts = {
  grid: 1,
  flex: 1
}, _convertToUnit = function _convertToUnit2(target, property, value, unit) {
  var curValue = parseFloat(value) || 0, curUnit = (value + "").trim().substr((curValue + "").length) || "px", style = _tempDiv.style, horizontal = _horizontalExp.test(property), isRootSVG = target.tagName.toLowerCase() === "svg", measureProperty = (isRootSVG ? "client" : "offset") + (horizontal ? "Width" : "Height"), amount = 100, toPixels = unit === "px", toPercent = unit === "%", px, parent, cache, isSVG;
  if (unit === curUnit || !curValue || _nonConvertibleUnits[unit] || _nonConvertibleUnits[curUnit]) {
    return curValue;
  }
  curUnit !== "px" && !toPixels && (curValue = _convertToUnit2(target, property, value, "px"));
  isSVG = target.getCTM && _isSVG(target);
  if ((toPercent || curUnit === "%") && (_transformProps[property] || ~property.indexOf("adius"))) {
    px = isSVG ? target.getBBox()[horizontal ? "width" : "height"] : target[measureProperty];
    return _round$1(toPercent ? curValue / px * amount : curValue / 100 * px);
  }
  style[horizontal ? "width" : "height"] = amount + (toPixels ? curUnit : unit);
  parent = unit !== "rem" && ~property.indexOf("adius") || unit === "em" && target.appendChild && !isRootSVG ? target : target.parentNode;
  if (isSVG) {
    parent = (target.ownerSVGElement || {}).parentNode;
  }
  if (!parent || parent === _doc$2 || !parent.appendChild) {
    parent = _doc$2.body;
  }
  cache = parent._gsap;
  if (cache && toPercent && cache.width && horizontal && cache.time === _ticker.time && !cache.uncache) {
    return _round$1(curValue / cache.width * amount);
  } else {
    if (toPercent && (property === "height" || property === "width")) {
      var v2 = target.style[property];
      target.style[property] = amount + unit;
      px = target[measureProperty];
      v2 ? target.style[property] = v2 : _removeProperty(target, property);
    } else {
      (toPercent || curUnit === "%") && !_nonStandardLayouts[_getComputedProperty(parent, "display")] && (style.position = _getComputedProperty(target, "position"));
      parent === target && (style.position = "static");
      parent.appendChild(_tempDiv);
      px = _tempDiv[measureProperty];
      parent.removeChild(_tempDiv);
      style.position = "absolute";
    }
    if (horizontal && toPercent) {
      cache = _getCache(parent);
      cache.time = _ticker.time;
      cache.width = parent[measureProperty];
    }
  }
  return _round$1(toPixels ? px * curValue / amount : px && curValue ? amount / px * curValue : 0);
}, _get = function _get2(target, property, unit, uncache) {
  var value;
  _pluginInitted || _initCore$1();
  if (property in _propertyAliases && property !== "transform") {
    property = _propertyAliases[property];
    if (~property.indexOf(",")) {
      property = property.split(",")[0];
    }
  }
  if (_transformProps[property] && property !== "transform") {
    value = _parseTransform(target, uncache);
    value = property !== "transformOrigin" ? value[property] : value.svg ? value.origin : _firstTwoOnly(_getComputedProperty(target, _transformOriginProp)) + " " + value.zOrigin + "px";
  } else {
    value = target.style[property];
    if (!value || value === "auto" || uncache || ~(value + "").indexOf("calc(")) {
      value = _specialProps[property] && _specialProps[property](target, property, unit) || _getComputedProperty(target, property) || _getProperty(target, property) || (property === "opacity" ? 1 : 0);
    }
  }
  return unit && !~(value + "").trim().indexOf(" ") ? _convertToUnit(target, property, value, unit) + unit : value;
}, _tweenComplexCSSString = function _tweenComplexCSSString2(target, prop, start, end) {
  if (!start || start === "none") {
    var p2 = _checkPropPrefix(prop, target, 1), s2 = p2 && _getComputedProperty(target, p2, 1);
    if (s2 && s2 !== start) {
      prop = p2;
      start = s2;
    } else if (prop === "borderColor") {
      start = _getComputedProperty(target, "borderTopColor");
    }
  }
  var pt = new PropTween(this._pt, target.style, prop, 0, 1, _renderComplexString), index = 0, matchIndex = 0, a2, result, startValues, startNum, color, startValue, endValue, endNum, chunk, endUnit, startUnit, endValues;
  pt.b = start;
  pt.e = end;
  start += "";
  end += "";
  if (end.substring(0, 6) === "var(--") {
    end = _getComputedProperty(target, end.substring(4, end.indexOf(")")));
  }
  if (end === "auto") {
    startValue = target.style[prop];
    target.style[prop] = end;
    end = _getComputedProperty(target, prop) || end;
    startValue ? target.style[prop] = startValue : _removeProperty(target, prop);
  }
  a2 = [start, end];
  _colorStringFilter(a2);
  start = a2[0];
  end = a2[1];
  startValues = start.match(_numWithUnitExp) || [];
  endValues = end.match(_numWithUnitExp) || [];
  if (endValues.length) {
    while (result = _numWithUnitExp.exec(end)) {
      endValue = result[0];
      chunk = end.substring(index, result.index);
      if (color) {
        color = (color + 1) % 5;
      } else if (chunk.substr(-5) === "rgba(" || chunk.substr(-5) === "hsla(") {
        color = 1;
      }
      if (endValue !== (startValue = startValues[matchIndex++] || "")) {
        startNum = parseFloat(startValue) || 0;
        startUnit = startValue.substr((startNum + "").length);
        endValue.charAt(1) === "=" && (endValue = _parseRelative(startNum, endValue) + startUnit);
        endNum = parseFloat(endValue);
        endUnit = endValue.substr((endNum + "").length);
        index = _numWithUnitExp.lastIndex - endUnit.length;
        if (!endUnit) {
          endUnit = endUnit || _config.units[prop] || startUnit;
          if (index === end.length) {
            end += endUnit;
            pt.e += endUnit;
          }
        }
        if (startUnit !== endUnit) {
          startNum = _convertToUnit(target, prop, startValue, endUnit) || 0;
        }
        pt._pt = {
          _next: pt._pt,
          p: chunk || matchIndex === 1 ? chunk : ",",
          //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
          s: startNum,
          c: endNum - startNum,
          m: color && color < 4 || prop === "zIndex" ? Math.round : 0
        };
      }
    }
    pt.c = index < end.length ? end.substring(index, end.length) : "";
  } else {
    pt.r = prop === "display" && end === "none" ? _renderNonTweeningValueOnlyAtEnd : _renderNonTweeningValue;
  }
  _relExp.test(end) && (pt.e = 0);
  this._pt = pt;
  return pt;
}, _keywordToPercent = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, _convertKeywordsToPercentages = function _convertKeywordsToPercentages2(value) {
  var split = value.split(" "), x = split[0], y2 = split[1] || "50%";
  if (x === "top" || x === "bottom" || y2 === "left" || y2 === "right") {
    value = x;
    x = y2;
    y2 = value;
  }
  split[0] = _keywordToPercent[x] || x;
  split[1] = _keywordToPercent[y2] || y2;
  return split.join(" ");
}, _renderClearProps = function _renderClearProps2(ratio, data) {
  if (data.tween && data.tween._time === data.tween._dur) {
    var target = data.t, style = target.style, props = data.u, cache = target._gsap, prop, clearTransforms, i2;
    if (props === "all" || props === true) {
      style.cssText = "";
      clearTransforms = 1;
    } else {
      props = props.split(",");
      i2 = props.length;
      while (--i2 > -1) {
        prop = props[i2];
        if (_transformProps[prop]) {
          clearTransforms = 1;
          prop = prop === "transformOrigin" ? _transformOriginProp : _transformProp$1;
        }
        _removeProperty(target, prop);
      }
    }
    if (clearTransforms) {
      _removeProperty(target, _transformProp$1);
      if (cache) {
        cache.svg && target.removeAttribute("transform");
        style.scale = style.rotate = style.translate = "none";
        _parseTransform(target, 1);
        cache.uncache = 1;
        _removeIndependentTransforms(style);
      }
    }
  }
}, _specialProps = {
  clearProps: function clearProps(plugin, target, property, endValue, tween) {
    if (tween.data !== "isFromStart") {
      var pt = plugin._pt = new PropTween(plugin._pt, target, property, 0, 0, _renderClearProps);
      pt.u = endValue;
      pt.pr = -10;
      pt.tween = tween;
      plugin._props.push(property);
      return 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, _identity2DMatrix = [1, 0, 0, 1, 0, 0], _rotationalProperties = {}, _isNullTransform = function _isNullTransform2(value) {
  return value === "matrix(1, 0, 0, 1, 0, 0)" || value === "none" || !value;
}, _getComputedTransformMatrixAsArray = function _getComputedTransformMatrixAsArray2(target) {
  var matrixString = _getComputedProperty(target, _transformProp$1);
  return _isNullTransform(matrixString) ? _identity2DMatrix : matrixString.substr(7).match(_numExp).map(_round$1);
}, _getMatrix = function _getMatrix2(target, force2D) {
  var cache = target._gsap || _getCache(target), style = target.style, matrix = _getComputedTransformMatrixAsArray(target), parent, nextSibling, temp, addedToDOM;
  if (cache.svg && target.getAttribute("transform")) {
    temp = target.transform.baseVal.consolidate().matrix;
    matrix = [temp.a, temp.b, temp.c, temp.d, temp.e, temp.f];
    return matrix.join(",") === "1,0,0,1,0,0" ? _identity2DMatrix : matrix;
  } else if (matrix === _identity2DMatrix && !target.offsetParent && target !== _docElement && !cache.svg) {
    temp = style.display;
    style.display = "block";
    parent = target.parentNode;
    if (!parent || !target.offsetParent && !target.getBoundingClientRect().width) {
      addedToDOM = 1;
      nextSibling = target.nextElementSibling;
      _docElement.appendChild(target);
    }
    matrix = _getComputedTransformMatrixAsArray(target);
    temp ? style.display = temp : _removeProperty(target, "display");
    if (addedToDOM) {
      nextSibling ? parent.insertBefore(target, nextSibling) : parent ? parent.appendChild(target) : _docElement.removeChild(target);
    }
  }
  return force2D && matrix.length > 6 ? [matrix[0], matrix[1], matrix[4], matrix[5], matrix[12], matrix[13]] : matrix;
}, _applySVGOrigin = function _applySVGOrigin2(target, origin, originIsAbsolute, smooth, matrixArray, pluginToAddPropTweensTo) {
  var cache = target._gsap, matrix = matrixArray || _getMatrix(target, true), xOriginOld = cache.xOrigin || 0, yOriginOld = cache.yOrigin || 0, xOffsetOld = cache.xOffset || 0, yOffsetOld = cache.yOffset || 0, a2 = matrix[0], b2 = matrix[1], c2 = matrix[2], d2 = matrix[3], tx = matrix[4], ty = matrix[5], originSplit = origin.split(" "), xOrigin = parseFloat(originSplit[0]) || 0, yOrigin = parseFloat(originSplit[1]) || 0, bounds, determinant, x, y2;
  if (!originIsAbsolute) {
    bounds = _getBBox(target);
    xOrigin = bounds.x + (~originSplit[0].indexOf("%") ? xOrigin / 100 * bounds.width : xOrigin);
    yOrigin = bounds.y + (~(originSplit[1] || originSplit[0]).indexOf("%") ? yOrigin / 100 * bounds.height : yOrigin);
  } else if (matrix !== _identity2DMatrix && (determinant = a2 * d2 - b2 * c2)) {
    x = xOrigin * (d2 / determinant) + yOrigin * (-c2 / determinant) + (c2 * ty - d2 * tx) / determinant;
    y2 = xOrigin * (-b2 / determinant) + yOrigin * (a2 / determinant) - (a2 * ty - b2 * tx) / determinant;
    xOrigin = x;
    yOrigin = y2;
  }
  if (smooth || smooth !== false && cache.smooth) {
    tx = xOrigin - xOriginOld;
    ty = yOrigin - yOriginOld;
    cache.xOffset = xOffsetOld + (tx * a2 + ty * c2) - tx;
    cache.yOffset = yOffsetOld + (tx * b2 + ty * d2) - ty;
  } else {
    cache.xOffset = cache.yOffset = 0;
  }
  cache.xOrigin = xOrigin;
  cache.yOrigin = yOrigin;
  cache.smooth = !!smooth;
  cache.origin = origin;
  cache.originIsAbsolute = !!originIsAbsolute;
  target.style[_transformOriginProp] = "0px 0px";
  if (pluginToAddPropTweensTo) {
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOrigin", xOriginOld, xOrigin);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOrigin", yOriginOld, yOrigin);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "xOffset", xOffsetOld, cache.xOffset);
    _addNonTweeningPT(pluginToAddPropTweensTo, cache, "yOffset", yOffsetOld, cache.yOffset);
  }
  target.setAttribute("data-svg-origin", xOrigin + " " + yOrigin);
}, _parseTransform = function _parseTransform2(target, uncache) {
  var cache = target._gsap || new GSCache(target);
  if ("x" in cache && !uncache && !cache.uncache) {
    return cache;
  }
  var style = target.style, invertedScaleX = cache.scaleX < 0, px = "px", deg = "deg", cs = getComputedStyle(target), origin = _getComputedProperty(target, _transformOriginProp) || "0", x, y2, z, scaleX, scaleY, rotation, rotationX, rotationY, skewX, skewY, perspective, xOrigin, yOrigin, matrix, angle, cos, sin, a2, b2, c2, d2, a12, a22, t1, t22, t3, a13, a23, a33, a42, a43, a32;
  x = y2 = z = rotation = rotationX = rotationY = skewX = skewY = perspective = 0;
  scaleX = scaleY = 1;
  cache.svg = !!(target.getCTM && _isSVG(target));
  if (cs.translate) {
    if (cs.translate !== "none" || cs.scale !== "none" || cs.rotate !== "none") {
      style[_transformProp$1] = (cs.translate !== "none" ? "translate3d(" + (cs.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (cs.rotate !== "none" ? "rotate(" + cs.rotate + ") " : "") + (cs.scale !== "none" ? "scale(" + cs.scale.split(" ").join(",") + ") " : "") + (cs[_transformProp$1] !== "none" ? cs[_transformProp$1] : "");
    }
    style.scale = style.rotate = style.translate = "none";
  }
  matrix = _getMatrix(target, cache.svg);
  if (cache.svg) {
    if (cache.uncache) {
      t22 = target.getBBox();
      origin = cache.xOrigin - t22.x + "px " + (cache.yOrigin - t22.y) + "px";
      t1 = "";
    } else {
      t1 = !uncache && target.getAttribute("data-svg-origin");
    }
    _applySVGOrigin(target, t1 || origin, !!t1 || cache.originIsAbsolute, cache.smooth !== false, matrix);
  }
  xOrigin = cache.xOrigin || 0;
  yOrigin = cache.yOrigin || 0;
  if (matrix !== _identity2DMatrix) {
    a2 = matrix[0];
    b2 = matrix[1];
    c2 = matrix[2];
    d2 = matrix[3];
    x = a12 = matrix[4];
    y2 = a22 = matrix[5];
    if (matrix.length === 6) {
      scaleX = Math.sqrt(a2 * a2 + b2 * b2);
      scaleY = Math.sqrt(d2 * d2 + c2 * c2);
      rotation = a2 || b2 ? _atan2(b2, a2) * _RAD2DEG : 0;
      skewX = c2 || d2 ? _atan2(c2, d2) * _RAD2DEG + rotation : 0;
      skewX && (scaleY *= Math.abs(Math.cos(skewX * _DEG2RAD)));
      if (cache.svg) {
        x -= xOrigin - (xOrigin * a2 + yOrigin * c2);
        y2 -= yOrigin - (xOrigin * b2 + yOrigin * d2);
      }
    } else {
      a32 = matrix[6];
      a42 = matrix[7];
      a13 = matrix[8];
      a23 = matrix[9];
      a33 = matrix[10];
      a43 = matrix[11];
      x = matrix[12];
      y2 = matrix[13];
      z = matrix[14];
      angle = _atan2(a32, a33);
      rotationX = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a12 * cos + a13 * sin;
        t22 = a22 * cos + a23 * sin;
        t3 = a32 * cos + a33 * sin;
        a13 = a12 * -sin + a13 * cos;
        a23 = a22 * -sin + a23 * cos;
        a33 = a32 * -sin + a33 * cos;
        a43 = a42 * -sin + a43 * cos;
        a12 = t1;
        a22 = t22;
        a32 = t3;
      }
      angle = _atan2(-c2, a33);
      rotationY = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(-angle);
        sin = Math.sin(-angle);
        t1 = a2 * cos - a13 * sin;
        t22 = b2 * cos - a23 * sin;
        t3 = c2 * cos - a33 * sin;
        a43 = d2 * sin + a43 * cos;
        a2 = t1;
        b2 = t22;
        c2 = t3;
      }
      angle = _atan2(b2, a2);
      rotation = angle * _RAD2DEG;
      if (angle) {
        cos = Math.cos(angle);
        sin = Math.sin(angle);
        t1 = a2 * cos + b2 * sin;
        t22 = a12 * cos + a22 * sin;
        b2 = b2 * cos - a2 * sin;
        a22 = a22 * cos - a12 * sin;
        a2 = t1;
        a12 = t22;
      }
      if (rotationX && Math.abs(rotationX) + Math.abs(rotation) > 359.9) {
        rotationX = rotation = 0;
        rotationY = 180 - rotationY;
      }
      scaleX = _round$1(Math.sqrt(a2 * a2 + b2 * b2 + c2 * c2));
      scaleY = _round$1(Math.sqrt(a22 * a22 + a32 * a32));
      angle = _atan2(a12, a22);
      skewX = Math.abs(angle) > 2e-4 ? angle * _RAD2DEG : 0;
      perspective = a43 ? 1 / (a43 < 0 ? -a43 : a43) : 0;
    }
    if (cache.svg) {
      t1 = target.getAttribute("transform");
      cache.forceCSS = target.setAttribute("transform", "") || !_isNullTransform(_getComputedProperty(target, _transformProp$1));
      t1 && target.setAttribute("transform", t1);
    }
  }
  if (Math.abs(skewX) > 90 && Math.abs(skewX) < 270) {
    if (invertedScaleX) {
      scaleX *= -1;
      skewX += rotation <= 0 ? 180 : -180;
      rotation += rotation <= 0 ? 180 : -180;
    } else {
      scaleY *= -1;
      skewX += skewX <= 0 ? 180 : -180;
    }
  }
  uncache = uncache || cache.uncache;
  cache.x = x - ((cache.xPercent = x && (!uncache && cache.xPercent || (Math.round(target.offsetWidth / 2) === Math.round(-x) ? -50 : 0))) ? target.offsetWidth * cache.xPercent / 100 : 0) + px;
  cache.y = y2 - ((cache.yPercent = y2 && (!uncache && cache.yPercent || (Math.round(target.offsetHeight / 2) === Math.round(-y2) ? -50 : 0))) ? target.offsetHeight * cache.yPercent / 100 : 0) + px;
  cache.z = z + px;
  cache.scaleX = _round$1(scaleX);
  cache.scaleY = _round$1(scaleY);
  cache.rotation = _round$1(rotation) + deg;
  cache.rotationX = _round$1(rotationX) + deg;
  cache.rotationY = _round$1(rotationY) + deg;
  cache.skewX = skewX + deg;
  cache.skewY = skewY + deg;
  cache.transformPerspective = perspective + px;
  if (cache.zOrigin = parseFloat(origin.split(" ")[2]) || !uncache && cache.zOrigin || 0) {
    style[_transformOriginProp] = _firstTwoOnly(origin);
  }
  cache.xOffset = cache.yOffset = 0;
  cache.force3D = _config.force3D;
  cache.renderTransform = cache.svg ? _renderSVGTransforms : _supports3D ? _renderCSSTransforms : _renderNon3DTransforms;
  cache.uncache = 0;
  return cache;
}, _firstTwoOnly = function _firstTwoOnly2(value) {
  return (value = value.split(" "))[0] + " " + value[1];
}, _addPxTranslate = function _addPxTranslate2(target, start, value) {
  var unit = getUnit(start);
  return _round$1(parseFloat(start) + parseFloat(_convertToUnit(target, "x", value + "px", unit))) + unit;
}, _renderNon3DTransforms = function _renderNon3DTransforms2(ratio, cache) {
  cache.z = "0px";
  cache.rotationY = cache.rotationX = "0deg";
  cache.force3D = 0;
  _renderCSSTransforms(ratio, cache);
}, _zeroDeg = "0deg", _zeroPx = "0px", _endParenthesis = ") ", _renderCSSTransforms = function _renderCSSTransforms2(ratio, cache) {
  var _ref = cache || this, xPercent = _ref.xPercent, yPercent = _ref.yPercent, x = _ref.x, y2 = _ref.y, z = _ref.z, rotation = _ref.rotation, rotationY = _ref.rotationY, rotationX = _ref.rotationX, skewX = _ref.skewX, skewY = _ref.skewY, scaleX = _ref.scaleX, scaleY = _ref.scaleY, transformPerspective = _ref.transformPerspective, force3D = _ref.force3D, target = _ref.target, zOrigin = _ref.zOrigin, transforms = "", use3D = force3D === "auto" && ratio && ratio !== 1 || force3D === true;
  if (zOrigin && (rotationX !== _zeroDeg || rotationY !== _zeroDeg)) {
    var angle = parseFloat(rotationY) * _DEG2RAD, a13 = Math.sin(angle), a33 = Math.cos(angle), cos;
    angle = parseFloat(rotationX) * _DEG2RAD;
    cos = Math.cos(angle);
    x = _addPxTranslate(target, x, a13 * cos * -zOrigin);
    y2 = _addPxTranslate(target, y2, -Math.sin(angle) * -zOrigin);
    z = _addPxTranslate(target, z, a33 * cos * -zOrigin + zOrigin);
  }
  if (transformPerspective !== _zeroPx) {
    transforms += "perspective(" + transformPerspective + _endParenthesis;
  }
  if (xPercent || yPercent) {
    transforms += "translate(" + xPercent + "%, " + yPercent + "%) ";
  }
  if (use3D || x !== _zeroPx || y2 !== _zeroPx || z !== _zeroPx) {
    transforms += z !== _zeroPx || use3D ? "translate3d(" + x + ", " + y2 + ", " + z + ") " : "translate(" + x + ", " + y2 + _endParenthesis;
  }
  if (rotation !== _zeroDeg) {
    transforms += "rotate(" + rotation + _endParenthesis;
  }
  if (rotationY !== _zeroDeg) {
    transforms += "rotateY(" + rotationY + _endParenthesis;
  }
  if (rotationX !== _zeroDeg) {
    transforms += "rotateX(" + rotationX + _endParenthesis;
  }
  if (skewX !== _zeroDeg || skewY !== _zeroDeg) {
    transforms += "skew(" + skewX + ", " + skewY + _endParenthesis;
  }
  if (scaleX !== 1 || scaleY !== 1) {
    transforms += "scale(" + scaleX + ", " + scaleY + _endParenthesis;
  }
  target.style[_transformProp$1] = transforms || "translate(0, 0)";
}, _renderSVGTransforms = function _renderSVGTransforms2(ratio, cache) {
  var _ref2 = cache || this, xPercent = _ref2.xPercent, yPercent = _ref2.yPercent, x = _ref2.x, y2 = _ref2.y, rotation = _ref2.rotation, skewX = _ref2.skewX, skewY = _ref2.skewY, scaleX = _ref2.scaleX, scaleY = _ref2.scaleY, target = _ref2.target, xOrigin = _ref2.xOrigin, yOrigin = _ref2.yOrigin, xOffset = _ref2.xOffset, yOffset = _ref2.yOffset, forceCSS = _ref2.forceCSS, tx = parseFloat(x), ty = parseFloat(y2), a11, a21, a12, a22, temp;
  rotation = parseFloat(rotation);
  skewX = parseFloat(skewX);
  skewY = parseFloat(skewY);
  if (skewY) {
    skewY = parseFloat(skewY);
    skewX += skewY;
    rotation += skewY;
  }
  if (rotation || skewX) {
    rotation *= _DEG2RAD;
    skewX *= _DEG2RAD;
    a11 = Math.cos(rotation) * scaleX;
    a21 = Math.sin(rotation) * scaleX;
    a12 = Math.sin(rotation - skewX) * -scaleY;
    a22 = Math.cos(rotation - skewX) * scaleY;
    if (skewX) {
      skewY *= _DEG2RAD;
      temp = Math.tan(skewX - skewY);
      temp = Math.sqrt(1 + temp * temp);
      a12 *= temp;
      a22 *= temp;
      if (skewY) {
        temp = Math.tan(skewY);
        temp = Math.sqrt(1 + temp * temp);
        a11 *= temp;
        a21 *= temp;
      }
    }
    a11 = _round$1(a11);
    a21 = _round$1(a21);
    a12 = _round$1(a12);
    a22 = _round$1(a22);
  } else {
    a11 = scaleX;
    a22 = scaleY;
    a21 = a12 = 0;
  }
  if (tx && !~(x + "").indexOf("px") || ty && !~(y2 + "").indexOf("px")) {
    tx = _convertToUnit(target, "x", x, "px");
    ty = _convertToUnit(target, "y", y2, "px");
  }
  if (xOrigin || yOrigin || xOffset || yOffset) {
    tx = _round$1(tx + xOrigin - (xOrigin * a11 + yOrigin * a12) + xOffset);
    ty = _round$1(ty + yOrigin - (xOrigin * a21 + yOrigin * a22) + yOffset);
  }
  if (xPercent || yPercent) {
    temp = target.getBBox();
    tx = _round$1(tx + xPercent / 100 * temp.width);
    ty = _round$1(ty + yPercent / 100 * temp.height);
  }
  temp = "matrix(" + a11 + "," + a21 + "," + a12 + "," + a22 + "," + tx + "," + ty + ")";
  target.setAttribute("transform", temp);
  forceCSS && (target.style[_transformProp$1] = temp);
}, _addRotationalPropTween = function _addRotationalPropTween2(plugin, target, property, startNum, endValue) {
  var cap = 360, isString = _isString$1(endValue), endNum = parseFloat(endValue) * (isString && ~endValue.indexOf("rad") ? _RAD2DEG : 1), change = endNum - startNum, finalValue = startNum + change + "deg", direction, pt;
  if (isString) {
    direction = endValue.split("_")[1];
    if (direction === "short") {
      change %= cap;
      if (change !== change % (cap / 2)) {
        change += change < 0 ? cap : -cap;
      }
    }
    if (direction === "cw" && change < 0) {
      change = (change + cap * _bigNum) % cap - ~~(change / cap) * cap;
    } else if (direction === "ccw" && change > 0) {
      change = (change - cap * _bigNum) % cap - ~~(change / cap) * cap;
    }
  }
  plugin._pt = pt = new PropTween(plugin._pt, target, property, startNum, change, _renderPropWithEnd);
  pt.e = finalValue;
  pt.u = "deg";
  plugin._props.push(property);
  return pt;
}, _assign = function _assign2(target, source) {
  for (var p2 in source) {
    target[p2] = source[p2];
  }
  return target;
}, _addRawTransformPTs = function _addRawTransformPTs2(plugin, transforms, target) {
  var startCache = _assign({}, target._gsap), exclude = "perspective,force3D,transformOrigin,svgOrigin", style = target.style, endCache, p2, startValue, endValue, startNum, endNum, startUnit, endUnit;
  if (startCache.svg) {
    startValue = target.getAttribute("transform");
    target.setAttribute("transform", "");
    style[_transformProp$1] = transforms;
    endCache = _parseTransform(target, 1);
    _removeProperty(target, _transformProp$1);
    target.setAttribute("transform", startValue);
  } else {
    startValue = getComputedStyle(target)[_transformProp$1];
    style[_transformProp$1] = transforms;
    endCache = _parseTransform(target, 1);
    style[_transformProp$1] = startValue;
  }
  for (p2 in _transformProps) {
    startValue = startCache[p2];
    endValue = endCache[p2];
    if (startValue !== endValue && exclude.indexOf(p2) < 0) {
      startUnit = getUnit(startValue);
      endUnit = getUnit(endValue);
      startNum = startUnit !== endUnit ? _convertToUnit(target, p2, startValue, endUnit) : parseFloat(startValue);
      endNum = parseFloat(endValue);
      plugin._pt = new PropTween(plugin._pt, endCache, p2, startNum, endNum - startNum, _renderCSSProp);
      plugin._pt.u = endUnit || 0;
      plugin._props.push(p2);
    }
  }
  _assign(endCache, startCache);
};
_forEachName("padding,margin,Width,Radius", function(name, index) {
  var t3 = "Top", r2 = "Right", b2 = "Bottom", l2 = "Left", props = (index < 3 ? [t3, r2, b2, l2] : [t3 + l2, t3 + r2, b2 + r2, b2 + l2]).map(function(side) {
    return index < 2 ? name + side : "border" + side + name;
  });
  _specialProps[index > 1 ? "border" + name : name] = function(plugin, target, property, endValue, tween) {
    var a2, vars;
    if (arguments.length < 4) {
      a2 = props.map(function(prop) {
        return _get(plugin, prop, property);
      });
      vars = a2.join(" ");
      return vars.split(a2[0]).length === 5 ? a2[0] : vars;
    }
    a2 = (endValue + "").split(" ");
    vars = {};
    props.forEach(function(prop, i2) {
      return vars[prop] = a2[i2] = a2[i2] || a2[(i2 - 1) / 2 | 0];
    });
    plugin.init(target, vars, tween);
  };
});
var CSSPlugin = {
  name: "css",
  register: _initCore$1,
  targetTest: function targetTest(target) {
    return target.style && target.nodeType;
  },
  init: function init3(target, vars, tween, index, targets) {
    var props = this._props, style = target.style, startAt = tween.vars.startAt, startValue, endValue, endNum, startNum, type, specialProp, p2, startUnit, endUnit, relative, isTransformRelated, transformPropTween, cache, smooth, hasPriority, inlineProps;
    _pluginInitted || _initCore$1();
    this.styles = this.styles || _getStyleSaver(target);
    inlineProps = this.styles.props;
    this.tween = tween;
    for (p2 in vars) {
      if (p2 === "autoRound") {
        continue;
      }
      endValue = vars[p2];
      if (_plugins[p2] && _checkPlugin(p2, vars, tween, index, target, targets)) {
        continue;
      }
      type = typeof endValue;
      specialProp = _specialProps[p2];
      if (type === "function") {
        endValue = endValue.call(tween, index, target, targets);
        type = typeof endValue;
      }
      if (type === "string" && ~endValue.indexOf("random(")) {
        endValue = _replaceRandom(endValue);
      }
      if (specialProp) {
        specialProp(this, target, p2, endValue, tween) && (hasPriority = 1);
      } else if (p2.substr(0, 2) === "--") {
        startValue = (getComputedStyle(target).getPropertyValue(p2) + "").trim();
        endValue += "";
        _colorExp.lastIndex = 0;
        if (!_colorExp.test(startValue)) {
          startUnit = getUnit(startValue);
          endUnit = getUnit(endValue);
        }
        endUnit ? startUnit !== endUnit && (startValue = _convertToUnit(target, p2, startValue, endUnit) + endUnit) : startUnit && (endValue += startUnit);
        this.add(style, "setProperty", startValue, endValue, index, targets, 0, 0, p2);
        props.push(p2);
        inlineProps.push(p2, 0, style[p2]);
      } else if (type !== "undefined") {
        if (startAt && p2 in startAt) {
          startValue = typeof startAt[p2] === "function" ? startAt[p2].call(tween, index, target, targets) : startAt[p2];
          _isString$1(startValue) && ~startValue.indexOf("random(") && (startValue = _replaceRandom(startValue));
          getUnit(startValue + "") || startValue === "auto" || (startValue += _config.units[p2] || getUnit(_get(target, p2)) || "");
          (startValue + "").charAt(1) === "=" && (startValue = _get(target, p2));
        } else {
          startValue = _get(target, p2);
        }
        startNum = parseFloat(startValue);
        relative = type === "string" && endValue.charAt(1) === "=" && endValue.substr(0, 2);
        relative && (endValue = endValue.substr(2));
        endNum = parseFloat(endValue);
        if (p2 in _propertyAliases) {
          if (p2 === "autoAlpha") {
            if (startNum === 1 && _get(target, "visibility") === "hidden" && endNum) {
              startNum = 0;
            }
            inlineProps.push("visibility", 0, style.visibility);
            _addNonTweeningPT(this, style, "visibility", startNum ? "inherit" : "hidden", endNum ? "inherit" : "hidden", !endNum);
          }
          if (p2 !== "scale" && p2 !== "transform") {
            p2 = _propertyAliases[p2];
            ~p2.indexOf(",") && (p2 = p2.split(",")[0]);
          }
        }
        isTransformRelated = p2 in _transformProps;
        if (isTransformRelated) {
          this.styles.save(p2);
          if (type === "string" && endValue.substring(0, 6) === "var(--") {
            endValue = _getComputedProperty(target, endValue.substring(4, endValue.indexOf(")")));
            endNum = parseFloat(endValue);
          }
          if (!transformPropTween) {
            cache = target._gsap;
            cache.renderTransform && !vars.parseTransform || _parseTransform(target, vars.parseTransform);
            smooth = vars.smoothOrigin !== false && cache.smooth;
            transformPropTween = this._pt = new PropTween(this._pt, style, _transformProp$1, 0, 1, cache.renderTransform, cache, 0, -1);
            transformPropTween.dep = 1;
          }
          if (p2 === "scale") {
            this._pt = new PropTween(this._pt, cache, "scaleY", cache.scaleY, (relative ? _parseRelative(cache.scaleY, relative + endNum) : endNum) - cache.scaleY || 0, _renderCSSProp);
            this._pt.u = 0;
            props.push("scaleY", p2);
            p2 += "X";
          } else if (p2 === "transformOrigin") {
            inlineProps.push(_transformOriginProp, 0, style[_transformOriginProp]);
            endValue = _convertKeywordsToPercentages(endValue);
            if (cache.svg) {
              _applySVGOrigin(target, endValue, 0, smooth, 0, this);
            } else {
              endUnit = parseFloat(endValue.split(" ")[2]) || 0;
              endUnit !== cache.zOrigin && _addNonTweeningPT(this, cache, "zOrigin", cache.zOrigin, endUnit);
              _addNonTweeningPT(this, style, p2, _firstTwoOnly(startValue), _firstTwoOnly(endValue));
            }
            continue;
          } else if (p2 === "svgOrigin") {
            _applySVGOrigin(target, endValue, 1, smooth, 0, this);
            continue;
          } else if (p2 in _rotationalProperties) {
            _addRotationalPropTween(this, cache, p2, startNum, relative ? _parseRelative(startNum, relative + endValue) : endValue);
            continue;
          } else if (p2 === "smoothOrigin") {
            _addNonTweeningPT(this, cache, "smooth", cache.smooth, endValue);
            continue;
          } else if (p2 === "force3D") {
            cache[p2] = endValue;
            continue;
          } else if (p2 === "transform") {
            _addRawTransformPTs(this, endValue, target);
            continue;
          }
        } else if (!(p2 in style)) {
          p2 = _checkPropPrefix(p2) || p2;
        }
        if (isTransformRelated || (endNum || endNum === 0) && (startNum || startNum === 0) && !_complexExp.test(endValue) && p2 in style) {
          startUnit = (startValue + "").substr((startNum + "").length);
          endNum || (endNum = 0);
          endUnit = getUnit(endValue) || (p2 in _config.units ? _config.units[p2] : startUnit);
          startUnit !== endUnit && (startNum = _convertToUnit(target, p2, startValue, endUnit));
          this._pt = new PropTween(this._pt, isTransformRelated ? cache : style, p2, startNum, (relative ? _parseRelative(startNum, relative + endNum) : endNum) - startNum, !isTransformRelated && (endUnit === "px" || p2 === "zIndex") && vars.autoRound !== false ? _renderRoundedCSSProp : _renderCSSProp);
          this._pt.u = endUnit || 0;
          if (startUnit !== endUnit && endUnit !== "%") {
            this._pt.b = startValue;
            this._pt.r = _renderCSSPropWithBeginning;
          }
        } else if (!(p2 in style)) {
          if (p2 in target) {
            this.add(target, p2, startValue || target[p2], relative ? relative + endValue : endValue, index, targets);
          } else if (p2 !== "parseTransform") {
            _missingPlugin(p2, endValue);
            continue;
          }
        } else {
          _tweenComplexCSSString.call(this, target, p2, startValue, relative ? relative + endValue : endValue);
        }
        isTransformRelated || (p2 in style ? inlineProps.push(p2, 0, style[p2]) : typeof target[p2] === "function" ? inlineProps.push(p2, 2, target[p2]()) : inlineProps.push(p2, 1, startValue || target[p2]));
        props.push(p2);
      }
    }
    hasPriority && _sortPropTweensByPriority(this);
  },
  render: function render2(ratio, data) {
    if (data.tween._time || !_reverting()) {
      var pt = data._pt;
      while (pt) {
        pt.r(ratio, pt.d);
        pt = pt._next;
      }
    } else {
      data.styles.revert();
    }
  },
  get: _get,
  aliases: _propertyAliases,
  getSetter: function getSetter(target, property, plugin) {
    var p2 = _propertyAliases[property];
    p2 && p2.indexOf(",") < 0 && (property = p2);
    return property in _transformProps && property !== _transformOriginProp && (target._gsap.x || _get(target, "x")) ? plugin && _recentSetterPlugin === plugin ? property === "scale" ? _setterScale : _setterTransform : (_recentSetterPlugin = plugin || {}) && (property === "scale" ? _setterScaleWithRender : _setterTransformWithRender) : target.style && !_isUndefined(target.style[property]) ? _setterCSSStyle : ~property.indexOf("-") ? _setterCSSProp : _getSetter(target, property);
  },
  core: {
    _removeProperty,
    _getMatrix
  }
};
gsap$2.utils.checkPrefix = _checkPropPrefix;
gsap$2.core.getStyleSaver = _getStyleSaver;
(function(positionAndScale, rotation, others, aliases) {
  var all = _forEachName(positionAndScale + "," + rotation + "," + others, function(name) {
    _transformProps[name] = 1;
  });
  _forEachName(rotation, function(name) {
    _config.units[name] = "deg";
    _rotationalProperties[name] = 1;
  });
  _propertyAliases[all[13]] = positionAndScale + "," + rotation;
  _forEachName(aliases, function(name) {
    var split = name.split(":");
    _propertyAliases[split[1]] = all[split[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
_forEachName("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(name) {
  _config.units[name] = "px";
});
gsap$2.registerPlugin(CSSPlugin);
var gsapWithCSS = gsap$2.registerPlugin(CSSPlugin) || gsap$2;
gsapWithCSS.core.Tween;
const _sfc_main$11 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    const userMenuOpen = ref(false);
    const page = usePage();
    const isAdmin = computed(() => {
      var _a, _b;
      return ((_b = (_a = page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.is_admin) || false;
    });
    const isLoggedIn = computed(() => {
      var _a;
      return !!((_a = page.props.auth) == null ? void 0 : _a.user);
    });
    const userName = computed(() => {
      var _a, _b;
      return ((_b = (_a = page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.name) || "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 right-0 z-50 glass-effect" }, _attrs))}><div class="w-full px-4 sm:px-6 py-4"><div class="flex items-center justify-between"><div class="flex items-center cursor-pointer group"><img src="/images/logo.png" alt="Competition Engine" class="h-[4.5rem] md:h-15"></div><nav class="hidden md:flex items-center justify-center space-x-8 absolute left-1/2 -translate-x-1/2"><a href="/" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Home</a><button class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Games</button><button class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Features</button><button class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Pricing</button><button class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">FAQ</button><a href="/about" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">About</a><a href="/blog" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Blog</a><a href="/contact" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Contact</a></nav><div class="flex justify-end items-center gap-3">`);
      if (isLoggedIn.value) {
        _push(`<div class="hidden md:block relative"><button class="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"><svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg><span class="text-sm text-gray-300">${ssrInterpolate(userName.value)}</span><svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div class="absolute right-0 mt-2 w-48 rounded-lg bg-gray-900 border border-gray-700 shadow-xl z-50" style="${ssrRenderStyle(userMenuOpen.value ? null : { display: "none" })}"><div class="py-2"><button class="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition"> Logout </button></div></div></div>`);
      } else {
        _push(`<a href="/login" class="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50"><svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg><span class="text-sm text-gray-300">Login</span></a>`);
      }
      if (isLoggedIn.value && isAdmin.value) {
        _push(`<button class="hidden md:flex items-center justify-center w-10 h-10 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/60" title="Admin Panel"><svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button class="hidden md:inline-block bg-accent-purple text-white font-semibold px-5 py-2 rounded-lg hover:bg-accent-orange transition glow-button whitespace-nowrap"> Book a Demo </button><button class="md:hidden relative w-10 h-10 flex items-center justify-center text-white focus:outline-none" aria-label="Toggle menu"><div class="w-6 flex flex-col items-center justify-center"><span class="${ssrRenderClass([mobileMenuOpen.value ? "rotate-45 translate-y-1" : "-translate-y-0.5", "bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm"])}"></span><span class="${ssrRenderClass([mobileMenuOpen.value ? "opacity-0" : "opacity-100", "bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5"])}"></span><span class="${ssrRenderClass([mobileMenuOpen.value ? "-rotate-45 -translate-y-1" : "translate-y-0.5", "bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm"])}"></span></div></button></div></div></div><div class="md:hidden glass-effect border-t border-gray-700" style="${ssrRenderStyle(mobileMenuOpen.value ? null : { display: "none" })}"><nav class="w-full px-4 py-4 space-y-1"><a href="/" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Home</a><button class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Games</button><button class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Features</button><button class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Pricing</button><button class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">FAQ</button><a href="/about" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">About</a><a href="/blog" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Blog</a><a href="/contact" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Contact</a>`);
      if (isLoggedIn.value) {
        _push(`<div class="border-t border-gray-700 pt-3 space-y-2"><div class="flex items-center gap-2 px-3 py-2 text-gray-300"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg><span class="text-sm font-semibold">${ssrInterpolate(userName.value)}</span></div>`);
        if (isAdmin.value) {
          _push(`<button class="block w-full text-left text-purple-400 hover:text-purple-300 transition py-2 px-3 font-semibold">⚙️ Admin Panel</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="block w-full text-left text-red-400 hover:text-red-300 transition py-2 px-3">Logout</button></div>`);
      } else {
        _push(`<a href="/login" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2 border-t border-gray-700 pt-3"> 👤 Login </a>`);
      }
      _push(`<button class="bg-accent-purple text-white font-semibold px-5 py-2 rounded-lg hover:bg-accent-orange transition w-full mt-2">Book a Demo</button></nav></div></header>`);
    };
  }
};
const _sfc_setup$11 = _sfc_main$11.setup;
_sfc_main$11.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Layout/Header.vue");
  return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$10 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(_attrs)} data-v-114c6461><div class="for-entrants" data-v-114c6461><strong data-v-114c6461>Entering a competition powered by CompEngine?</strong> Every draw is GLI-certified. Every winner is verifiable. Every order runs through a UK-licensed payment gateway. If something goes wrong, the operator has a real platform behind them — not a stack of plugins. </div><div data-v-114c6461>© ${ssrInterpolate(unref(year))} CompEngine. Built quietly in the UK.</div></footer>`);
    };
  }
};
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Layout/Footer.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$10, [["__scopeId", "data-v-114c6461"]]);
const _sfc_main$$ = {
  __name: "AppLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const mouseFollower = ref(null);
    onMounted(() => {
      window.addEventListener("mousemove", (e2) => {
        if (mouseFollower.value) {
          gsapWithCSS.to(mouseFollower.value, {
            x: e2.clientX,
            y: e2.clientY,
            duration: 0.7,
            ease: "power3.out"
          });
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))} data-v-6218a5cc><div id="mouse-follower" data-v-6218a5cc></div>`);
      _push(ssrRenderComponent(_sfc_main$11, null, null, _parent));
      _push(`<main data-v-6218a5cc>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AppLayout.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const AppLayout = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["__scopeId", "data-v-6218a5cc"]]);
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  return Constructor;
}
/*!
 * Observer 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var gsap$1, _coreInitted$1, _win$1, _doc$1, _docEl$1, _body$1, _isTouch, _pointerType, ScrollTrigger$1, _root$1, _normalizer$1, _eventTypes, _context$1, _getGSAP$1 = function _getGSAP() {
  return gsap$1 || typeof window !== "undefined" && (gsap$1 = window.gsap) && gsap$1.registerPlugin && gsap$1;
}, _startup$1 = 1, _observers = [], _scrollers = [], _proxies = [], _getTime$1 = Date.now, _bridge = function _bridge2(name, value) {
  return value;
}, _integrate = function _integrate2() {
  var core = ScrollTrigger$1.core, data = core.bridge || {}, scrollers = core._scrollers, proxies = core._proxies;
  scrollers.push.apply(scrollers, _scrollers);
  proxies.push.apply(proxies, _proxies);
  _scrollers = scrollers;
  _proxies = proxies;
  _bridge = function _bridge3(name, value) {
    return data[name](value);
  };
}, _getProxyProp = function _getProxyProp2(element, property) {
  return ~_proxies.indexOf(element) && _proxies[_proxies.indexOf(element) + 1][property];
}, _isViewport$1 = function _isViewport(el) {
  return !!~_root$1.indexOf(el);
}, _addListener$1 = function _addListener(element, type, func, passive, capture) {
  return element.addEventListener(type, func, {
    passive: passive !== false,
    capture: !!capture
  });
}, _removeListener$1 = function _removeListener(element, type, func, capture) {
  return element.removeEventListener(type, func, !!capture);
}, _scrollLeft = "scrollLeft", _scrollTop = "scrollTop", _onScroll$1 = function _onScroll() {
  return _normalizer$1 && _normalizer$1.isPressed || _scrollers.cache++;
}, _scrollCacheFunc = function _scrollCacheFunc2(f2, doNotCache) {
  var cachingFunc = function cachingFunc2(value) {
    if (value || value === 0) {
      _startup$1 && (_win$1.history.scrollRestoration = "manual");
      var isNormalizing = _normalizer$1 && _normalizer$1.isPressed;
      value = cachingFunc2.v = Math.round(value) || (_normalizer$1 && _normalizer$1.iOS ? 1 : 0);
      f2(value);
      cachingFunc2.cacheID = _scrollers.cache;
      isNormalizing && _bridge("ss", value);
    } else if (doNotCache || _scrollers.cache !== cachingFunc2.cacheID || _bridge("ref")) {
      cachingFunc2.cacheID = _scrollers.cache;
      cachingFunc2.v = f2();
    }
    return cachingFunc2.v + cachingFunc2.offset;
  };
  cachingFunc.offset = 0;
  return f2 && cachingFunc;
}, _horizontal = {
  s: _scrollLeft,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: _scrollCacheFunc(function(value) {
    return arguments.length ? _win$1.scrollTo(value, _vertical.sc()) : _win$1.pageXOffset || _doc$1[_scrollLeft] || _docEl$1[_scrollLeft] || _body$1[_scrollLeft] || 0;
  })
}, _vertical = {
  s: _scrollTop,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: _horizontal,
  sc: _scrollCacheFunc(function(value) {
    return arguments.length ? _win$1.scrollTo(_horizontal.sc(), value) : _win$1.pageYOffset || _doc$1[_scrollTop] || _docEl$1[_scrollTop] || _body$1[_scrollTop] || 0;
  })
}, _getTarget = function _getTarget2(t3, self) {
  return (self && self._ctx && self._ctx.selector || gsap$1.utils.toArray)(t3)[0] || (typeof t3 === "string" && gsap$1.config().nullTargetWarn !== false ? console.warn("Element not found:", t3) : null);
}, _isWithin = function _isWithin2(element, list) {
  var i2 = list.length;
  while (i2--) {
    if (list[i2] === element || list[i2].contains(element)) {
      return true;
    }
  }
  return false;
}, _getScrollFunc = function _getScrollFunc2(element, _ref) {
  var s2 = _ref.s, sc = _ref.sc;
  _isViewport$1(element) && (element = _doc$1.scrollingElement || _docEl$1);
  var i2 = _scrollers.indexOf(element), offset = sc === _vertical.sc ? 1 : 2;
  !~i2 && (i2 = _scrollers.push(element) - 1);
  _scrollers[i2 + offset] || _addListener$1(element, "scroll", _onScroll$1);
  var prev = _scrollers[i2 + offset], func = prev || (_scrollers[i2 + offset] = _scrollCacheFunc(_getProxyProp(element, s2), true) || (_isViewport$1(element) ? sc : _scrollCacheFunc(function(value) {
    return arguments.length ? element[s2] = value : element[s2];
  })));
  func.target = element;
  prev || (func.smooth = gsap$1.getProperty(element, "scrollBehavior") === "smooth");
  return func;
}, _getVelocityProp = function _getVelocityProp2(value, minTimeRefresh, useDelta) {
  var v1 = value, v2 = value, t1 = _getTime$1(), t22 = t1, min = minTimeRefresh || 50, dropToZeroTime = Math.max(500, min * 3), update = function update2(value2, force) {
    var t3 = _getTime$1();
    if (force || t3 - t1 > min) {
      v2 = v1;
      v1 = value2;
      t22 = t1;
      t1 = t3;
    } else if (useDelta) {
      v1 += value2;
    } else {
      v1 = v2 + (value2 - v2) / (t3 - t22) * (t1 - t22);
    }
  }, reset = function reset2() {
    v2 = v1 = useDelta ? 0 : v1;
    t22 = t1 = 0;
  }, getVelocity = function getVelocity2(latestValue) {
    var tOld = t22, vOld = v2, t3 = _getTime$1();
    (latestValue || latestValue === 0) && latestValue !== v1 && update(latestValue);
    return t1 === t22 || t3 - t22 > dropToZeroTime ? 0 : (v1 + (useDelta ? vOld : -vOld)) / ((useDelta ? t3 : t1) - tOld) * 1e3;
  };
  return {
    update,
    reset,
    getVelocity
  };
}, _getEvent = function _getEvent2(e2, preventDefault) {
  preventDefault && !e2._gsapAllow && e2.preventDefault();
  return e2.changedTouches ? e2.changedTouches[0] : e2;
}, _getAbsoluteMax = function _getAbsoluteMax2(a2) {
  var max = Math.max.apply(Math, a2), min = Math.min.apply(Math, a2);
  return Math.abs(max) >= Math.abs(min) ? max : min;
}, _setScrollTrigger = function _setScrollTrigger2() {
  ScrollTrigger$1 = gsap$1.core.globals().ScrollTrigger;
  ScrollTrigger$1 && ScrollTrigger$1.core && _integrate();
}, _initCore2 = function _initCore3(core) {
  gsap$1 = core || _getGSAP$1();
  if (!_coreInitted$1 && gsap$1 && typeof document !== "undefined" && document.body) {
    _win$1 = window;
    _doc$1 = document;
    _docEl$1 = _doc$1.documentElement;
    _body$1 = _doc$1.body;
    _root$1 = [_win$1, _doc$1, _docEl$1, _body$1];
    gsap$1.utils.clamp;
    _context$1 = gsap$1.core.context || function() {
    };
    _pointerType = "onpointerenter" in _body$1 ? "pointer" : "mouse";
    _isTouch = Observer.isTouch = _win$1.matchMedia && _win$1.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in _win$1 || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0;
    _eventTypes = Observer.eventTypes = ("ontouchstart" in _docEl$1 ? "touchstart,touchmove,touchcancel,touchend" : !("onpointerdown" in _docEl$1) ? "mousedown,mousemove,mouseup,mouseup" : "pointerdown,pointermove,pointercancel,pointerup").split(",");
    setTimeout(function() {
      return _startup$1 = 0;
    }, 500);
    _setScrollTrigger();
    _coreInitted$1 = 1;
  }
  return _coreInitted$1;
};
_horizontal.op = _vertical;
_scrollers.cache = 0;
var Observer = /* @__PURE__ */ (function() {
  function Observer2(vars) {
    this.init(vars);
  }
  var _proto = Observer2.prototype;
  _proto.init = function init4(vars) {
    _coreInitted$1 || _initCore2(gsap$1) || console.warn("Please gsap.registerPlugin(Observer)");
    ScrollTrigger$1 || _setScrollTrigger();
    var tolerance = vars.tolerance, dragMinimum = vars.dragMinimum, type = vars.type, target = vars.target, lineHeight = vars.lineHeight, debounce = vars.debounce, preventDefault = vars.preventDefault, onStop = vars.onStop, onStopDelay = vars.onStopDelay, ignore = vars.ignore, wheelSpeed = vars.wheelSpeed, event = vars.event, onDragStart = vars.onDragStart, onDragEnd = vars.onDragEnd, onDrag = vars.onDrag, onPress = vars.onPress, onRelease = vars.onRelease, onRight = vars.onRight, onLeft = vars.onLeft, onUp = vars.onUp, onDown = vars.onDown, onChangeX = vars.onChangeX, onChangeY = vars.onChangeY, onChange = vars.onChange, onToggleX = vars.onToggleX, onToggleY = vars.onToggleY, onHover = vars.onHover, onHoverEnd = vars.onHoverEnd, onMove = vars.onMove, ignoreCheck = vars.ignoreCheck, isNormalizer = vars.isNormalizer, onGestureStart = vars.onGestureStart, onGestureEnd = vars.onGestureEnd, onWheel = vars.onWheel, onEnable = vars.onEnable, onDisable = vars.onDisable, onClick = vars.onClick, scrollSpeed = vars.scrollSpeed, capture = vars.capture, allowClicks = vars.allowClicks, lockAxis = vars.lockAxis, onLockAxis = vars.onLockAxis;
    this.target = target = _getTarget(target) || _docEl$1;
    this.vars = vars;
    ignore && (ignore = gsap$1.utils.toArray(ignore));
    tolerance = tolerance || 1e-9;
    dragMinimum = dragMinimum || 0;
    wheelSpeed = wheelSpeed || 1;
    scrollSpeed = scrollSpeed || 1;
    type = type || "wheel,touch,pointer";
    debounce = debounce !== false;
    lineHeight || (lineHeight = parseFloat(_win$1.getComputedStyle(_body$1).lineHeight) || 22);
    var id, onStopDelayedCall, dragged, moved, wheeled, locked, axis, self = this, prevDeltaX = 0, prevDeltaY = 0, passive = vars.passive || !preventDefault && vars.passive !== false, scrollFuncX = _getScrollFunc(target, _horizontal), scrollFuncY = _getScrollFunc(target, _vertical), scrollX = scrollFuncX(), scrollY = scrollFuncY(), limitToTouch = ~type.indexOf("touch") && !~type.indexOf("pointer") && _eventTypes[0] === "pointerdown", isViewport = _isViewport$1(target), ownerDoc = target.ownerDocument || _doc$1, deltaX = [0, 0, 0], deltaY = [0, 0, 0], onClickTime = 0, clickCapture = function clickCapture2() {
      return onClickTime = _getTime$1();
    }, _ignoreCheck = function _ignoreCheck2(e2, isPointerOrTouch) {
      return (self.event = e2) && ignore && _isWithin(e2.target, ignore) || isPointerOrTouch && limitToTouch && e2.pointerType !== "touch" || ignoreCheck && ignoreCheck(e2, isPointerOrTouch);
    }, onStopFunc = function onStopFunc2() {
      self._vx.reset();
      self._vy.reset();
      onStopDelayedCall.pause();
      onStop && onStop(self);
    }, update = function update2() {
      var dx = self.deltaX = _getAbsoluteMax(deltaX), dy = self.deltaY = _getAbsoluteMax(deltaY), changedX = Math.abs(dx) >= tolerance, changedY = Math.abs(dy) >= tolerance;
      onChange && (changedX || changedY) && onChange(self, dx, dy, deltaX, deltaY);
      if (changedX) {
        onRight && self.deltaX > 0 && onRight(self);
        onLeft && self.deltaX < 0 && onLeft(self);
        onChangeX && onChangeX(self);
        onToggleX && self.deltaX < 0 !== prevDeltaX < 0 && onToggleX(self);
        prevDeltaX = self.deltaX;
        deltaX[0] = deltaX[1] = deltaX[2] = 0;
      }
      if (changedY) {
        onDown && self.deltaY > 0 && onDown(self);
        onUp && self.deltaY < 0 && onUp(self);
        onChangeY && onChangeY(self);
        onToggleY && self.deltaY < 0 !== prevDeltaY < 0 && onToggleY(self);
        prevDeltaY = self.deltaY;
        deltaY[0] = deltaY[1] = deltaY[2] = 0;
      }
      if (moved || dragged) {
        onMove && onMove(self);
        if (dragged) {
          onDragStart && dragged === 1 && onDragStart(self);
          onDrag && onDrag(self);
          dragged = 0;
        }
        moved = false;
      }
      locked && !(locked = false) && onLockAxis && onLockAxis(self);
      if (wheeled) {
        onWheel(self);
        wheeled = false;
      }
      id = 0;
    }, onDelta = function onDelta2(x, y2, index) {
      deltaX[index] += x;
      deltaY[index] += y2;
      self._vx.update(x);
      self._vy.update(y2);
      debounce ? id || (id = requestAnimationFrame(update)) : update();
    }, onTouchOrPointerDelta = function onTouchOrPointerDelta2(x, y2) {
      if (lockAxis && !axis) {
        self.axis = axis = Math.abs(x) > Math.abs(y2) ? "x" : "y";
        locked = true;
      }
      if (axis !== "y") {
        deltaX[2] += x;
        self._vx.update(x, true);
      }
      if (axis !== "x") {
        deltaY[2] += y2;
        self._vy.update(y2, true);
      }
      debounce ? id || (id = requestAnimationFrame(update)) : update();
    }, _onDrag = function _onDrag2(e2) {
      if (_ignoreCheck(e2, 1)) {
        return;
      }
      e2 = _getEvent(e2, preventDefault);
      var x = e2.clientX, y2 = e2.clientY, dx = x - self.x, dy = y2 - self.y, isDragging = self.isDragging;
      self.x = x;
      self.y = y2;
      if (isDragging || (dx || dy) && (Math.abs(self.startX - x) >= dragMinimum || Math.abs(self.startY - y2) >= dragMinimum)) {
        dragged = isDragging ? 2 : 1;
        isDragging || (self.isDragging = true);
        onTouchOrPointerDelta(dx, dy);
      }
    }, _onPress = self.onPress = function(e2) {
      if (_ignoreCheck(e2, 1) || e2 && e2.button) {
        return;
      }
      self.axis = axis = null;
      onStopDelayedCall.pause();
      self.isPressed = true;
      e2 = _getEvent(e2);
      prevDeltaX = prevDeltaY = 0;
      self.startX = self.x = e2.clientX;
      self.startY = self.y = e2.clientY;
      self._vx.reset();
      self._vy.reset();
      _addListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, passive, true);
      self.deltaX = self.deltaY = 0;
      onPress && onPress(self);
    }, _onRelease = self.onRelease = function(e2) {
      if (_ignoreCheck(e2, 1)) {
        return;
      }
      _removeListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
      var isTrackingDrag = !isNaN(self.y - self.startY), wasDragging = self.isDragging, isDragNotClick = wasDragging && (Math.abs(self.x - self.startX) > 3 || Math.abs(self.y - self.startY) > 3), eventData = _getEvent(e2);
      if (!isDragNotClick && isTrackingDrag) {
        self._vx.reset();
        self._vy.reset();
        if (preventDefault && allowClicks) {
          gsap$1.delayedCall(0.08, function() {
            if (_getTime$1() - onClickTime > 300 && !e2.defaultPrevented) {
              if (e2.target.click) {
                e2.target.click();
              } else if (ownerDoc.createEvent) {
                var syntheticEvent = ownerDoc.createEvent("MouseEvents");
                syntheticEvent.initMouseEvent("click", true, true, _win$1, 1, eventData.screenX, eventData.screenY, eventData.clientX, eventData.clientY, false, false, false, false, 0, null);
                e2.target.dispatchEvent(syntheticEvent);
              }
            }
          });
        }
      }
      self.isDragging = self.isGesturing = self.isPressed = false;
      onStop && wasDragging && !isNormalizer && onStopDelayedCall.restart(true);
      dragged && update();
      onDragEnd && wasDragging && onDragEnd(self);
      onRelease && onRelease(self, isDragNotClick);
    }, _onGestureStart = function _onGestureStart2(e2) {
      return e2.touches && e2.touches.length > 1 && (self.isGesturing = true) && onGestureStart(e2, self.isDragging);
    }, _onGestureEnd = function _onGestureEnd2() {
      return (self.isGesturing = false) || onGestureEnd(self);
    }, onScroll = function onScroll2(e2) {
      if (_ignoreCheck(e2)) {
        return;
      }
      var x = scrollFuncX(), y2 = scrollFuncY();
      onDelta((x - scrollX) * scrollSpeed, (y2 - scrollY) * scrollSpeed, 1);
      scrollX = x;
      scrollY = y2;
      onStop && onStopDelayedCall.restart(true);
    }, _onWheel = function _onWheel2(e2) {
      if (_ignoreCheck(e2)) {
        return;
      }
      e2 = _getEvent(e2, preventDefault);
      onWheel && (wheeled = true);
      var multiplier = (e2.deltaMode === 1 ? lineHeight : e2.deltaMode === 2 ? _win$1.innerHeight : 1) * wheelSpeed;
      onDelta(e2.deltaX * multiplier, e2.deltaY * multiplier, 0);
      onStop && !isNormalizer && onStopDelayedCall.restart(true);
    }, _onMove = function _onMove2(e2) {
      if (_ignoreCheck(e2)) {
        return;
      }
      var x = e2.clientX, y2 = e2.clientY, dx = x - self.x, dy = y2 - self.y;
      self.x = x;
      self.y = y2;
      moved = true;
      onStop && onStopDelayedCall.restart(true);
      (dx || dy) && onTouchOrPointerDelta(dx, dy);
    }, _onHover = function _onHover2(e2) {
      self.event = e2;
      onHover(self);
    }, _onHoverEnd = function _onHoverEnd2(e2) {
      self.event = e2;
      onHoverEnd(self);
    }, _onClick = function _onClick2(e2) {
      return _ignoreCheck(e2) || _getEvent(e2, preventDefault) && onClick(self);
    };
    onStopDelayedCall = self._dc = gsap$1.delayedCall(onStopDelay || 0.25, onStopFunc).pause();
    self.deltaX = self.deltaY = 0;
    self._vx = _getVelocityProp(0, 50, true);
    self._vy = _getVelocityProp(0, 50, true);
    self.scrollX = scrollFuncX;
    self.scrollY = scrollFuncY;
    self.isDragging = self.isGesturing = self.isPressed = false;
    _context$1(this);
    self.enable = function(e2) {
      if (!self.isEnabled) {
        _addListener$1(isViewport ? ownerDoc : target, "scroll", _onScroll$1);
        type.indexOf("scroll") >= 0 && _addListener$1(isViewport ? ownerDoc : target, "scroll", onScroll, passive, capture);
        type.indexOf("wheel") >= 0 && _addListener$1(target, "wheel", _onWheel, passive, capture);
        if (type.indexOf("touch") >= 0 && _isTouch || type.indexOf("pointer") >= 0) {
          _addListener$1(target, _eventTypes[0], _onPress, passive, capture);
          _addListener$1(ownerDoc, _eventTypes[2], _onRelease);
          _addListener$1(ownerDoc, _eventTypes[3], _onRelease);
          allowClicks && _addListener$1(target, "click", clickCapture, true, true);
          onClick && _addListener$1(target, "click", _onClick);
          onGestureStart && _addListener$1(ownerDoc, "gesturestart", _onGestureStart);
          onGestureEnd && _addListener$1(ownerDoc, "gestureend", _onGestureEnd);
          onHover && _addListener$1(target, _pointerType + "enter", _onHover);
          onHoverEnd && _addListener$1(target, _pointerType + "leave", _onHoverEnd);
          onMove && _addListener$1(target, _pointerType + "move", _onMove);
        }
        self.isEnabled = true;
        self.isDragging = self.isGesturing = self.isPressed = moved = dragged = false;
        self._vx.reset();
        self._vy.reset();
        scrollX = scrollFuncX();
        scrollY = scrollFuncY();
        e2 && e2.type && _onPress(e2);
        onEnable && onEnable(self);
      }
      return self;
    };
    self.disable = function() {
      if (self.isEnabled) {
        _observers.filter(function(o2) {
          return o2 !== self && _isViewport$1(o2.target);
        }).length || _removeListener$1(isViewport ? ownerDoc : target, "scroll", _onScroll$1);
        if (self.isPressed) {
          self._vx.reset();
          self._vy.reset();
          _removeListener$1(isNormalizer ? target : ownerDoc, _eventTypes[1], _onDrag, true);
        }
        _removeListener$1(isViewport ? ownerDoc : target, "scroll", onScroll, capture);
        _removeListener$1(target, "wheel", _onWheel, capture);
        _removeListener$1(target, _eventTypes[0], _onPress, capture);
        _removeListener$1(ownerDoc, _eventTypes[2], _onRelease);
        _removeListener$1(ownerDoc, _eventTypes[3], _onRelease);
        _removeListener$1(target, "click", clickCapture, true);
        _removeListener$1(target, "click", _onClick);
        _removeListener$1(ownerDoc, "gesturestart", _onGestureStart);
        _removeListener$1(ownerDoc, "gestureend", _onGestureEnd);
        _removeListener$1(target, _pointerType + "enter", _onHover);
        _removeListener$1(target, _pointerType + "leave", _onHoverEnd);
        _removeListener$1(target, _pointerType + "move", _onMove);
        self.isEnabled = self.isPressed = self.isDragging = false;
        onDisable && onDisable(self);
      }
    };
    self.kill = self.revert = function() {
      self.disable();
      var i2 = _observers.indexOf(self);
      i2 >= 0 && _observers.splice(i2, 1);
      _normalizer$1 === self && (_normalizer$1 = 0);
    };
    _observers.push(self);
    isNormalizer && _isViewport$1(target) && (_normalizer$1 = self);
    self.enable(event);
  };
  _createClass(Observer2, [{
    key: "velocityX",
    get: function get() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function get() {
      return this._vy.getVelocity();
    }
  }]);
  return Observer2;
})();
Observer.version = "3.13.0";
Observer.create = function(vars) {
  return new Observer(vars);
};
Observer.register = _initCore2;
Observer.getAll = function() {
  return _observers.slice();
};
Observer.getById = function(id) {
  return _observers.filter(function(o2) {
    return o2.vars.id === id;
  })[0];
};
_getGSAP$1() && gsap$1.registerPlugin(Observer);
/*!
 * ScrollTrigger 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var gsap, _coreInitted, _win, _doc, _docEl, _body, _root, _resizeDelay, _toArray, _clamp2, _time2, _syncInterval, _refreshing, _pointerIsDown, _transformProp, _i, _prevWidth, _prevHeight, _autoRefresh, _sort, _suppressOverwrites, _ignoreResize, _normalizer, _ignoreMobileResize, _baseScreenHeight, _baseScreenWidth, _fixIOSBug, _context, _scrollRestoration, _div100vh, _100vh, _isReverted, _clampingMax, _limitCallbacks, _startup = 1, _getTime = Date.now, _time1 = _getTime(), _lastScrollTime = 0, _enabled = 0, _parseClamp = function _parseClamp2(value, type, self) {
  var clamp3 = _isString2(value) && (value.substr(0, 6) === "clamp(" || value.indexOf("max") > -1);
  self["_" + type + "Clamp"] = clamp3;
  return clamp3 ? value.substr(6, value.length - 7) : value;
}, _keepClamp = function _keepClamp2(value, clamp3) {
  return clamp3 && (!_isString2(value) || value.substr(0, 6) !== "clamp(") ? "clamp(" + value + ")" : value;
}, _rafBugFix = function _rafBugFix2() {
  return _enabled && requestAnimationFrame(_rafBugFix2);
}, _pointerDownHandler = function _pointerDownHandler2() {
  return _pointerIsDown = 1;
}, _pointerUpHandler = function _pointerUpHandler2() {
  return _pointerIsDown = 0;
}, _passThrough2 = function _passThrough3(v2) {
  return v2;
}, _round2 = function _round3(value) {
  return Math.round(value * 1e5) / 1e5 || 0;
}, _windowExists3 = function _windowExists4() {
  return typeof window !== "undefined";
}, _getGSAP2 = function _getGSAP3() {
  return gsap || _windowExists3() && (gsap = window.gsap) && gsap.registerPlugin && gsap;
}, _isViewport2 = function _isViewport3(e2) {
  return !!~_root.indexOf(e2);
}, _getViewportDimension = function _getViewportDimension2(dimensionProperty) {
  return (dimensionProperty === "Height" ? _100vh : _win["inner" + dimensionProperty]) || _docEl["client" + dimensionProperty] || _body["client" + dimensionProperty];
}, _getBoundsFunc = function _getBoundsFunc2(element) {
  return _getProxyProp(element, "getBoundingClientRect") || (_isViewport2(element) ? function() {
    _winOffsets.width = _win.innerWidth;
    _winOffsets.height = _100vh;
    return _winOffsets;
  } : function() {
    return _getBounds(element);
  });
}, _getSizeFunc = function _getSizeFunc2(scroller, isViewport, _ref) {
  var d2 = _ref.d, d22 = _ref.d2, a2 = _ref.a;
  return (a2 = _getProxyProp(scroller, "getBoundingClientRect")) ? function() {
    return a2()[d2];
  } : function() {
    return (isViewport ? _getViewportDimension(d22) : scroller["client" + d22]) || 0;
  };
}, _getOffsetsFunc = function _getOffsetsFunc2(element, isViewport) {
  return !isViewport || ~_proxies.indexOf(element) ? _getBoundsFunc(element) : function() {
    return _winOffsets;
  };
}, _maxScroll = function _maxScroll2(element, _ref2) {
  var s2 = _ref2.s, d2 = _ref2.d2, d3 = _ref2.d, a2 = _ref2.a;
  return Math.max(0, (s2 = "scroll" + d2) && (a2 = _getProxyProp(element, s2)) ? a2() - _getBoundsFunc(element)()[d3] : _isViewport2(element) ? (_docEl[s2] || _body[s2]) - _getViewportDimension(d2) : element[s2] - element["offset" + d2]);
}, _iterateAutoRefresh = function _iterateAutoRefresh2(func, events) {
  for (var i2 = 0; i2 < _autoRefresh.length; i2 += 3) {
    (!events || ~events.indexOf(_autoRefresh[i2 + 1])) && func(_autoRefresh[i2], _autoRefresh[i2 + 1], _autoRefresh[i2 + 2]);
  }
}, _isString2 = function _isString3(value) {
  return typeof value === "string";
}, _isFunction2 = function _isFunction3(value) {
  return typeof value === "function";
}, _isNumber2 = function _isNumber3(value) {
  return typeof value === "number";
}, _isObject2 = function _isObject3(value) {
  return typeof value === "object";
}, _endAnimation = function _endAnimation2(animation, reversed, pause) {
  return animation && animation.progress(reversed ? 0 : 1) && pause && animation.pause();
}, _callback2 = function _callback3(self, func) {
  if (self.enabled) {
    var result = self._ctx ? self._ctx.add(function() {
      return func(self);
    }) : func(self);
    result && result.totalTime && (self.callbackAnimation = result);
  }
}, _abs = Math.abs, _left = "left", _top = "top", _right = "right", _bottom = "bottom", _width = "width", _height = "height", _Right = "Right", _Left = "Left", _Top = "Top", _Bottom = "Bottom", _padding = "padding", _margin = "margin", _Width = "Width", _Height = "Height", _px = "px", _getComputedStyle = function _getComputedStyle2(element) {
  return _win.getComputedStyle(element);
}, _makePositionable = function _makePositionable2(element) {
  var position = _getComputedStyle(element).position;
  element.style.position = position === "absolute" || position === "fixed" ? position : "relative";
}, _setDefaults2 = function _setDefaults3(obj, defaults2) {
  for (var p2 in defaults2) {
    p2 in obj || (obj[p2] = defaults2[p2]);
  }
  return obj;
}, _getBounds = function _getBounds2(element, withoutTransforms) {
  var tween = withoutTransforms && _getComputedStyle(element)[_transformProp] !== "matrix(1, 0, 0, 1, 0, 0)" && gsap.to(element, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), bounds = element.getBoundingClientRect();
  tween && tween.progress(0).kill();
  return bounds;
}, _getSize = function _getSize2(element, _ref3) {
  var d2 = _ref3.d2;
  return element["offset" + d2] || element["client" + d2] || 0;
}, _getLabelRatioArray = function _getLabelRatioArray2(timeline2) {
  var a2 = [], labels = timeline2.labels, duration = timeline2.duration(), p2;
  for (p2 in labels) {
    a2.push(labels[p2] / duration);
  }
  return a2;
}, _getClosestLabel = function _getClosestLabel2(animation) {
  return function(value) {
    return gsap.utils.snap(_getLabelRatioArray(animation), value);
  };
}, _snapDirectional = function _snapDirectional2(snapIncrementOrArray) {
  var snap3 = gsap.utils.snap(snapIncrementOrArray), a2 = Array.isArray(snapIncrementOrArray) && snapIncrementOrArray.slice(0).sort(function(a3, b2) {
    return a3 - b2;
  });
  return a2 ? function(value, direction, threshold) {
    if (threshold === void 0) {
      threshold = 1e-3;
    }
    var i2;
    if (!direction) {
      return snap3(value);
    }
    if (direction > 0) {
      value -= threshold;
      for (i2 = 0; i2 < a2.length; i2++) {
        if (a2[i2] >= value) {
          return a2[i2];
        }
      }
      return a2[i2 - 1];
    } else {
      i2 = a2.length;
      value += threshold;
      while (i2--) {
        if (a2[i2] <= value) {
          return a2[i2];
        }
      }
    }
    return a2[0];
  } : function(value, direction, threshold) {
    if (threshold === void 0) {
      threshold = 1e-3;
    }
    var snapped = snap3(value);
    return !direction || Math.abs(snapped - value) < threshold || snapped - value < 0 === direction < 0 ? snapped : snap3(direction < 0 ? value - snapIncrementOrArray : value + snapIncrementOrArray);
  };
}, _getLabelAtDirection = function _getLabelAtDirection2(timeline2) {
  return function(value, st) {
    return _snapDirectional(_getLabelRatioArray(timeline2))(value, st.direction);
  };
}, _multiListener = function _multiListener2(func, element, types, callback) {
  return types.split(",").forEach(function(type) {
    return func(element, type, callback);
  });
}, _addListener2 = function _addListener3(element, type, func, nonPassive, capture) {
  return element.addEventListener(type, func, {
    passive: !nonPassive,
    capture: !!capture
  });
}, _removeListener2 = function _removeListener3(element, type, func, capture) {
  return element.removeEventListener(type, func, !!capture);
}, _wheelListener = function _wheelListener2(func, el, scrollFunc) {
  scrollFunc = scrollFunc && scrollFunc.wheelHandler;
  if (scrollFunc) {
    func(el, "wheel", scrollFunc);
    func(el, "touchmove", scrollFunc);
  }
}, _markerDefaults = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, _defaults = {
  toggleActions: "play",
  anticipatePin: 0
}, _keywords = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, _offsetToPx = function _offsetToPx2(value, size) {
  if (_isString2(value)) {
    var eqIndex = value.indexOf("="), relative = ~eqIndex ? +(value.charAt(eqIndex - 1) + 1) * parseFloat(value.substr(eqIndex + 1)) : 0;
    if (~eqIndex) {
      value.indexOf("%") > eqIndex && (relative *= size / 100);
      value = value.substr(0, eqIndex - 1);
    }
    value = relative + (value in _keywords ? _keywords[value] * size : ~value.indexOf("%") ? parseFloat(value) * size / 100 : parseFloat(value) || 0);
  }
  return value;
}, _createMarker = function _createMarker2(type, name, container, direction, _ref4, offset, matchWidthEl, containerAnimation) {
  var startColor = _ref4.startColor, endColor = _ref4.endColor, fontSize = _ref4.fontSize, indent = _ref4.indent, fontWeight = _ref4.fontWeight;
  var e2 = _doc.createElement("div"), useFixedPosition = _isViewport2(container) || _getProxyProp(container, "pinType") === "fixed", isScroller = type.indexOf("scroller") !== -1, parent = useFixedPosition ? _body : container, isStart = type.indexOf("start") !== -1, color = isStart ? startColor : endColor, css = "border-color:" + color + ";font-size:" + fontSize + ";color:" + color + ";font-weight:" + fontWeight + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  css += "position:" + ((isScroller || containerAnimation) && useFixedPosition ? "fixed;" : "absolute;");
  (isScroller || containerAnimation || !useFixedPosition) && (css += (direction === _vertical ? _right : _bottom) + ":" + (offset + parseFloat(indent)) + "px;");
  matchWidthEl && (css += "box-sizing:border-box;text-align:left;width:" + matchWidthEl.offsetWidth + "px;");
  e2._isStart = isStart;
  e2.setAttribute("class", "gsap-marker-" + type + (name ? " marker-" + name : ""));
  e2.style.cssText = css;
  e2.innerText = name || name === 0 ? type + "-" + name : type;
  parent.children[0] ? parent.insertBefore(e2, parent.children[0]) : parent.appendChild(e2);
  e2._offset = e2["offset" + direction.op.d2];
  _positionMarker(e2, 0, direction, isStart);
  return e2;
}, _positionMarker = function _positionMarker2(marker, start, direction, flipped) {
  var vars = {
    display: "block"
  }, side = direction[flipped ? "os2" : "p2"], oppositeSide = direction[flipped ? "p2" : "os2"];
  marker._isFlipped = flipped;
  vars[direction.a + "Percent"] = flipped ? -100 : 0;
  vars[direction.a] = flipped ? "1px" : 0;
  vars["border" + side + _Width] = 1;
  vars["border" + oppositeSide + _Width] = 0;
  vars[direction.p] = start + "px";
  gsap.set(marker, vars);
}, _triggers = [], _ids = {}, _rafID, _sync = function _sync2() {
  return _getTime() - _lastScrollTime > 34 && (_rafID || (_rafID = requestAnimationFrame(_updateAll)));
}, _onScroll2 = function _onScroll3() {
  if (!_normalizer || !_normalizer.isPressed || _normalizer.startX > _body.clientWidth) {
    _scrollers.cache++;
    if (_normalizer) {
      _rafID || (_rafID = requestAnimationFrame(_updateAll));
    } else {
      _updateAll();
    }
    _lastScrollTime || _dispatch2("scrollStart");
    _lastScrollTime = _getTime();
  }
}, _setBaseDimensions = function _setBaseDimensions2() {
  _baseScreenWidth = _win.innerWidth;
  _baseScreenHeight = _win.innerHeight;
}, _onResize = function _onResize2(force) {
  _scrollers.cache++;
  (force === true || !_refreshing && !_ignoreResize && !_doc.fullscreenElement && !_doc.webkitFullscreenElement && (!_ignoreMobileResize || _baseScreenWidth !== _win.innerWidth || Math.abs(_win.innerHeight - _baseScreenHeight) > _win.innerHeight * 0.25)) && _resizeDelay.restart(true);
}, _listeners = {}, _emptyArray = [], _softRefresh = function _softRefresh2() {
  return _removeListener2(ScrollTrigger, "scrollEnd", _softRefresh2) || _refreshAll(true);
}, _dispatch2 = function _dispatch3(type) {
  return _listeners[type] && _listeners[type].map(function(f2) {
    return f2();
  }) || _emptyArray;
}, _savedStyles = [], _revertRecorded = function _revertRecorded2(media) {
  for (var i2 = 0; i2 < _savedStyles.length; i2 += 5) {
    if (!media || _savedStyles[i2 + 4] && _savedStyles[i2 + 4].query === media) {
      _savedStyles[i2].style.cssText = _savedStyles[i2 + 1];
      _savedStyles[i2].getBBox && _savedStyles[i2].setAttribute("transform", _savedStyles[i2 + 2] || "");
      _savedStyles[i2 + 3].uncache = 1;
    }
  }
}, _revertAll = function _revertAll2(kill, media) {
  var trigger;
  for (_i = 0; _i < _triggers.length; _i++) {
    trigger = _triggers[_i];
    if (trigger && (!media || trigger._ctx === media)) {
      if (kill) {
        trigger.kill(1);
      } else {
        trigger.revert(true, true);
      }
    }
  }
  _isReverted = true;
  media && _revertRecorded(media);
  media || _dispatch2("revert");
}, _clearScrollMemory = function _clearScrollMemory2(scrollRestoration, force) {
  _scrollers.cache++;
  (force || !_refreshingAll) && _scrollers.forEach(function(obj) {
    return _isFunction2(obj) && obj.cacheID++ && (obj.rec = 0);
  });
  _isString2(scrollRestoration) && (_win.history.scrollRestoration = _scrollRestoration = scrollRestoration);
}, _refreshingAll, _refreshID = 0, _queueRefreshID, _queueRefreshAll = function _queueRefreshAll2() {
  if (_queueRefreshID !== _refreshID) {
    var id = _queueRefreshID = _refreshID;
    requestAnimationFrame(function() {
      return id === _refreshID && _refreshAll(true);
    });
  }
}, _refresh100vh = function _refresh100vh2() {
  _body.appendChild(_div100vh);
  _100vh = !_normalizer && _div100vh.offsetHeight || _win.innerHeight;
  _body.removeChild(_div100vh);
}, _hideAllMarkers = function _hideAllMarkers2(hide) {
  return _toArray(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(el) {
    return el.style.display = hide ? "none" : "block";
  });
}, _refreshAll = function _refreshAll2(force, skipRevert) {
  _docEl = _doc.documentElement;
  _body = _doc.body;
  _root = [_win, _doc, _docEl, _body];
  if (_lastScrollTime && !force && !_isReverted) {
    _addListener2(ScrollTrigger, "scrollEnd", _softRefresh);
    return;
  }
  _refresh100vh();
  _refreshingAll = ScrollTrigger.isRefreshing = true;
  _scrollers.forEach(function(obj) {
    return _isFunction2(obj) && ++obj.cacheID && (obj.rec = obj());
  });
  var refreshInits = _dispatch2("refreshInit");
  _sort && ScrollTrigger.sort();
  skipRevert || _revertAll();
  _scrollers.forEach(function(obj) {
    if (_isFunction2(obj)) {
      obj.smooth && (obj.target.style.scrollBehavior = "auto");
      obj(0);
    }
  });
  _triggers.slice(0).forEach(function(t3) {
    return t3.refresh();
  });
  _isReverted = false;
  _triggers.forEach(function(t3) {
    if (t3._subPinOffset && t3.pin) {
      var prop = t3.vars.horizontal ? "offsetWidth" : "offsetHeight", original = t3.pin[prop];
      t3.revert(true, 1);
      t3.adjustPinSpacing(t3.pin[prop] - original);
      t3.refresh();
    }
  });
  _clampingMax = 1;
  _hideAllMarkers(true);
  _triggers.forEach(function(t3) {
    var max = _maxScroll(t3.scroller, t3._dir), endClamp = t3.vars.end === "max" || t3._endClamp && t3.end > max, startClamp = t3._startClamp && t3.start >= max;
    (endClamp || startClamp) && t3.setPositions(startClamp ? max - 1 : t3.start, endClamp ? Math.max(startClamp ? max : t3.start + 1, max) : t3.end, true);
  });
  _hideAllMarkers(false);
  _clampingMax = 0;
  refreshInits.forEach(function(result) {
    return result && result.render && result.render(-1);
  });
  _scrollers.forEach(function(obj) {
    if (_isFunction2(obj)) {
      obj.smooth && requestAnimationFrame(function() {
        return obj.target.style.scrollBehavior = "smooth";
      });
      obj.rec && obj(obj.rec);
    }
  });
  _clearScrollMemory(_scrollRestoration, 1);
  _resizeDelay.pause();
  _refreshID++;
  _refreshingAll = 2;
  _updateAll(2);
  _triggers.forEach(function(t3) {
    return _isFunction2(t3.vars.onRefresh) && t3.vars.onRefresh(t3);
  });
  _refreshingAll = ScrollTrigger.isRefreshing = false;
  _dispatch2("refresh");
}, _lastScroll = 0, _direction = 1, _primary, _updateAll = function _updateAll2(force) {
  if (force === 2 || !_refreshingAll && !_isReverted) {
    ScrollTrigger.isUpdating = true;
    _primary && _primary.update(0);
    var l2 = _triggers.length, time = _getTime(), recordVelocity = time - _time1 >= 50, scroll = l2 && _triggers[0].scroll();
    _direction = _lastScroll > scroll ? -1 : 1;
    _refreshingAll || (_lastScroll = scroll);
    if (recordVelocity) {
      if (_lastScrollTime && !_pointerIsDown && time - _lastScrollTime > 200) {
        _lastScrollTime = 0;
        _dispatch2("scrollEnd");
      }
      _time2 = _time1;
      _time1 = time;
    }
    if (_direction < 0) {
      _i = l2;
      while (_i-- > 0) {
        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
      }
      _direction = 1;
    } else {
      for (_i = 0; _i < l2; _i++) {
        _triggers[_i] && _triggers[_i].update(0, recordVelocity);
      }
    }
    ScrollTrigger.isUpdating = false;
  }
  _rafID = 0;
}, _propNamesToCopy = [_left, _top, _bottom, _right, _margin + _Bottom, _margin + _Right, _margin + _Top, _margin + _Left, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], _stateProps = _propNamesToCopy.concat([_width, _height, "boxSizing", "max" + _Width, "max" + _Height, "position", _margin, _padding, _padding + _Top, _padding + _Right, _padding + _Bottom, _padding + _Left]), _swapPinOut = function _swapPinOut2(pin, spacer, state) {
  _setState(state);
  var cache = pin._gsap;
  if (cache.spacerIsNative) {
    _setState(cache.spacerState);
  } else if (pin._gsap.swappedIn) {
    var parent = spacer.parentNode;
    if (parent) {
      parent.insertBefore(pin, spacer);
      parent.removeChild(spacer);
    }
  }
  pin._gsap.swappedIn = false;
}, _swapPinIn = function _swapPinIn2(pin, spacer, cs, spacerState) {
  if (!pin._gsap.swappedIn) {
    var i2 = _propNamesToCopy.length, spacerStyle = spacer.style, pinStyle = pin.style, p2;
    while (i2--) {
      p2 = _propNamesToCopy[i2];
      spacerStyle[p2] = cs[p2];
    }
    spacerStyle.position = cs.position === "absolute" ? "absolute" : "relative";
    cs.display === "inline" && (spacerStyle.display = "inline-block");
    pinStyle[_bottom] = pinStyle[_right] = "auto";
    spacerStyle.flexBasis = cs.flexBasis || "auto";
    spacerStyle.overflow = "visible";
    spacerStyle.boxSizing = "border-box";
    spacerStyle[_width] = _getSize(pin, _horizontal) + _px;
    spacerStyle[_height] = _getSize(pin, _vertical) + _px;
    spacerStyle[_padding] = pinStyle[_margin] = pinStyle[_top] = pinStyle[_left] = "0";
    _setState(spacerState);
    pinStyle[_width] = pinStyle["max" + _Width] = cs[_width];
    pinStyle[_height] = pinStyle["max" + _Height] = cs[_height];
    pinStyle[_padding] = cs[_padding];
    if (pin.parentNode !== spacer) {
      pin.parentNode.insertBefore(spacer, pin);
      spacer.appendChild(pin);
    }
    pin._gsap.swappedIn = true;
  }
}, _capsExp = /([A-Z])/g, _setState = function _setState2(state) {
  if (state) {
    var style = state.t.style, l2 = state.length, i2 = 0, p2, value;
    (state.t._gsap || gsap.core.getCache(state.t)).uncache = 1;
    for (; i2 < l2; i2 += 2) {
      value = state[i2 + 1];
      p2 = state[i2];
      if (value) {
        style[p2] = value;
      } else if (style[p2]) {
        style.removeProperty(p2.replace(_capsExp, "-$1").toLowerCase());
      }
    }
  }
}, _getState = function _getState2(element) {
  var l2 = _stateProps.length, style = element.style, state = [], i2 = 0;
  for (; i2 < l2; i2++) {
    state.push(_stateProps[i2], style[_stateProps[i2]]);
  }
  state.t = element;
  return state;
}, _copyState = function _copyState2(state, override, omitOffsets) {
  var result = [], l2 = state.length, i2 = omitOffsets ? 8 : 0, p2;
  for (; i2 < l2; i2 += 2) {
    p2 = state[i2];
    result.push(p2, p2 in override ? override[p2] : state[i2 + 1]);
  }
  result.t = state.t;
  return result;
}, _winOffsets = {
  left: 0,
  top: 0
}, _parsePosition2 = function _parsePosition3(value, trigger, scrollerSize, direction, scroll, marker, markerScroller, self, scrollerBounds, borderWidth, useFixedPosition, scrollerMax, containerAnimation, clampZeroProp) {
  _isFunction2(value) && (value = value(self));
  if (_isString2(value) && value.substr(0, 3) === "max") {
    value = scrollerMax + (value.charAt(4) === "=" ? _offsetToPx("0" + value.substr(3), scrollerSize) : 0);
  }
  var time = containerAnimation ? containerAnimation.time() : 0, p1, p2, element;
  containerAnimation && containerAnimation.seek(0);
  isNaN(value) || (value = +value);
  if (!_isNumber2(value)) {
    _isFunction2(trigger) && (trigger = trigger(self));
    var offsets = (value || "0").split(" "), bounds, localOffset, globalOffset, display;
    element = _getTarget(trigger, self) || _body;
    bounds = _getBounds(element) || {};
    if ((!bounds || !bounds.left && !bounds.top) && _getComputedStyle(element).display === "none") {
      display = element.style.display;
      element.style.display = "block";
      bounds = _getBounds(element);
      display ? element.style.display = display : element.style.removeProperty("display");
    }
    localOffset = _offsetToPx(offsets[0], bounds[direction.d]);
    globalOffset = _offsetToPx(offsets[1] || "0", scrollerSize);
    value = bounds[direction.p] - scrollerBounds[direction.p] - borderWidth + localOffset + scroll - globalOffset;
    markerScroller && _positionMarker(markerScroller, globalOffset, direction, scrollerSize - globalOffset < 20 || markerScroller._isStart && globalOffset > 20);
    scrollerSize -= scrollerSize - globalOffset;
  } else {
    containerAnimation && (value = gsap.utils.mapRange(containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, 0, scrollerMax, value));
    markerScroller && _positionMarker(markerScroller, scrollerSize, direction, true);
  }
  if (clampZeroProp) {
    self[clampZeroProp] = value || -1e-3;
    value < 0 && (value = 0);
  }
  if (marker) {
    var position = value + scrollerSize, isStart = marker._isStart;
    p1 = "scroll" + direction.d2;
    _positionMarker(marker, position, direction, isStart && position > 20 || !isStart && (useFixedPosition ? Math.max(_body[p1], _docEl[p1]) : marker.parentNode[p1]) <= position + 1);
    if (useFixedPosition) {
      scrollerBounds = _getBounds(markerScroller);
      useFixedPosition && (marker.style[direction.op.p] = scrollerBounds[direction.op.p] - direction.op.m - marker._offset + _px);
    }
  }
  if (containerAnimation && element) {
    p1 = _getBounds(element);
    containerAnimation.seek(scrollerMax);
    p2 = _getBounds(element);
    containerAnimation._caScrollDist = p1[direction.p] - p2[direction.p];
    value = value / containerAnimation._caScrollDist * scrollerMax;
  }
  containerAnimation && containerAnimation.seek(time);
  return containerAnimation ? value : Math.round(value);
}, _prefixExp = /(webkit|moz|length|cssText|inset)/i, _reparent = function _reparent2(element, parent, top, left) {
  if (element.parentNode !== parent) {
    var style = element.style, p2, cs;
    if (parent === _body) {
      element._stOrig = style.cssText;
      cs = _getComputedStyle(element);
      for (p2 in cs) {
        if (!+p2 && !_prefixExp.test(p2) && cs[p2] && typeof style[p2] === "string" && p2 !== "0") {
          style[p2] = cs[p2];
        }
      }
      style.top = top;
      style.left = left;
    } else {
      style.cssText = element._stOrig;
    }
    gsap.core.getCache(element).uncache = 1;
    parent.appendChild(element);
  }
}, _interruptionTracker = function _interruptionTracker2(getValueFunc, initialValue, onInterrupt) {
  var last1 = initialValue, last2 = last1;
  return function(value) {
    var current = Math.round(getValueFunc());
    if (current !== last1 && current !== last2 && Math.abs(current - last1) > 3 && Math.abs(current - last2) > 3) {
      value = current;
      onInterrupt && onInterrupt();
    }
    last2 = last1;
    last1 = Math.round(value);
    return last1;
  };
}, _shiftMarker = function _shiftMarker2(marker, direction, value) {
  var vars = {};
  vars[direction.p] = "+=" + value;
  gsap.set(marker, vars);
}, _getTweenCreator = function _getTweenCreator2(scroller, direction) {
  var getScroll = _getScrollFunc(scroller, direction), prop = "_scroll" + direction.p2, getTween = function getTween2(scrollTo, vars, initialValue, change1, change2) {
    var tween = getTween2.tween, onComplete = vars.onComplete, modifiers = {};
    initialValue = initialValue || getScroll();
    var checkForInterruption = _interruptionTracker(getScroll, initialValue, function() {
      tween.kill();
      getTween2.tween = 0;
    });
    change2 = change1 && change2 || 0;
    change1 = change1 || scrollTo - initialValue;
    tween && tween.kill();
    vars[prop] = scrollTo;
    vars.inherit = false;
    vars.modifiers = modifiers;
    modifiers[prop] = function() {
      return checkForInterruption(initialValue + change1 * tween.ratio + change2 * tween.ratio * tween.ratio);
    };
    vars.onUpdate = function() {
      _scrollers.cache++;
      getTween2.tween && _updateAll();
    };
    vars.onComplete = function() {
      getTween2.tween = 0;
      onComplete && onComplete.call(tween);
    };
    tween = getTween2.tween = gsap.to(scroller, vars);
    return tween;
  };
  scroller[prop] = getScroll;
  getScroll.wheelHandler = function() {
    return getTween.tween && getTween.tween.kill() && (getTween.tween = 0);
  };
  _addListener2(scroller, "wheel", getScroll.wheelHandler);
  ScrollTrigger.isTouch && _addListener2(scroller, "touchmove", getScroll.wheelHandler);
  return getTween;
};
var ScrollTrigger = /* @__PURE__ */ (function() {
  function ScrollTrigger2(vars, animation) {
    _coreInitted || ScrollTrigger2.register(gsap) || console.warn("Please gsap.registerPlugin(ScrollTrigger)");
    _context(this);
    this.init(vars, animation);
  }
  var _proto = ScrollTrigger2.prototype;
  _proto.init = function init4(vars, animation) {
    this.progress = this.start = 0;
    this.vars && this.kill(true, true);
    if (!_enabled) {
      this.update = this.refresh = this.kill = _passThrough2;
      return;
    }
    vars = _setDefaults2(_isString2(vars) || _isNumber2(vars) || vars.nodeType ? {
      trigger: vars
    } : vars, _defaults);
    var _vars = vars, onUpdate = _vars.onUpdate, toggleClass = _vars.toggleClass, id = _vars.id, onToggle = _vars.onToggle, onRefresh = _vars.onRefresh, scrub = _vars.scrub, trigger = _vars.trigger, pin = _vars.pin, pinSpacing = _vars.pinSpacing, invalidateOnRefresh = _vars.invalidateOnRefresh, anticipatePin = _vars.anticipatePin, onScrubComplete = _vars.onScrubComplete, onSnapComplete = _vars.onSnapComplete, once = _vars.once, snap3 = _vars.snap, pinReparent = _vars.pinReparent, pinSpacer = _vars.pinSpacer, containerAnimation = _vars.containerAnimation, fastScrollEnd = _vars.fastScrollEnd, preventOverlaps = _vars.preventOverlaps, direction = vars.horizontal || vars.containerAnimation && vars.horizontal !== false ? _horizontal : _vertical, isToggle = !scrub && scrub !== 0, scroller = _getTarget(vars.scroller || _win), scrollerCache = gsap.core.getCache(scroller), isViewport = _isViewport2(scroller), useFixedPosition = ("pinType" in vars ? vars.pinType : _getProxyProp(scroller, "pinType") || isViewport && "fixed") === "fixed", callbacks = [vars.onEnter, vars.onLeave, vars.onEnterBack, vars.onLeaveBack], toggleActions = isToggle && vars.toggleActions.split(" "), markers = "markers" in vars ? vars.markers : _defaults.markers, borderWidth = isViewport ? 0 : parseFloat(_getComputedStyle(scroller)["border" + direction.p2 + _Width]) || 0, self = this, onRefreshInit = vars.onRefreshInit && function() {
      return vars.onRefreshInit(self);
    }, getScrollerSize = _getSizeFunc(scroller, isViewport, direction), getScrollerOffsets = _getOffsetsFunc(scroller, isViewport), lastSnap = 0, lastRefresh = 0, prevProgress = 0, scrollFunc = _getScrollFunc(scroller, direction), tweenTo, pinCache, snapFunc, scroll1, scroll2, start, end, markerStart, markerEnd, markerStartTrigger, markerEndTrigger, markerVars, executingOnRefresh, change, pinOriginalState, pinActiveState, pinState, spacer, offset, pinGetter, pinSetter, pinStart, pinChange, spacingStart, spacerState, markerStartSetter, pinMoves, markerEndSetter, cs, snap1, snap22, scrubTween, scrubSmooth, snapDurClamp, snapDelayedCall, prevScroll, prevAnimProgress, caMarkerSetter, customRevertReturn;
    self._startClamp = self._endClamp = false;
    self._dir = direction;
    anticipatePin *= 45;
    self.scroller = scroller;
    self.scroll = containerAnimation ? containerAnimation.time.bind(containerAnimation) : scrollFunc;
    scroll1 = scrollFunc();
    self.vars = vars;
    animation = animation || vars.animation;
    if ("refreshPriority" in vars) {
      _sort = 1;
      vars.refreshPriority === -9999 && (_primary = self);
    }
    scrollerCache.tweenScroll = scrollerCache.tweenScroll || {
      top: _getTweenCreator(scroller, _vertical),
      left: _getTweenCreator(scroller, _horizontal)
    };
    self.tweenTo = tweenTo = scrollerCache.tweenScroll[direction.p];
    self.scrubDuration = function(value) {
      scrubSmooth = _isNumber2(value) && value;
      if (!scrubSmooth) {
        scrubTween && scrubTween.progress(1).kill();
        scrubTween = 0;
      } else {
        scrubTween ? scrubTween.duration(value) : scrubTween = gsap.to(animation, {
          ease: "expo",
          totalProgress: "+=0",
          inherit: false,
          duration: scrubSmooth,
          paused: true,
          onComplete: function onComplete() {
            return onScrubComplete && onScrubComplete(self);
          }
        });
      }
    };
    if (animation) {
      animation.vars.lazy = false;
      animation._initted && !self.isReverted || animation.vars.immediateRender !== false && vars.immediateRender !== false && animation.duration() && animation.render(0, true, true);
      self.animation = animation.pause();
      animation.scrollTrigger = self;
      self.scrubDuration(scrub);
      snap1 = 0;
      id || (id = animation.vars.id);
    }
    if (snap3) {
      if (!_isObject2(snap3) || snap3.push) {
        snap3 = {
          snapTo: snap3
        };
      }
      "scrollBehavior" in _body.style && gsap.set(isViewport ? [_body, _docEl] : scroller, {
        scrollBehavior: "auto"
      });
      _scrollers.forEach(function(o2) {
        return _isFunction2(o2) && o2.target === (isViewport ? _doc.scrollingElement || _docEl : scroller) && (o2.smooth = false);
      });
      snapFunc = _isFunction2(snap3.snapTo) ? snap3.snapTo : snap3.snapTo === "labels" ? _getClosestLabel(animation) : snap3.snapTo === "labelsDirectional" ? _getLabelAtDirection(animation) : snap3.directional !== false ? function(value, st) {
        return _snapDirectional(snap3.snapTo)(value, _getTime() - lastRefresh < 500 ? 0 : st.direction);
      } : gsap.utils.snap(snap3.snapTo);
      snapDurClamp = snap3.duration || {
        min: 0.1,
        max: 2
      };
      snapDurClamp = _isObject2(snapDurClamp) ? _clamp2(snapDurClamp.min, snapDurClamp.max) : _clamp2(snapDurClamp, snapDurClamp);
      snapDelayedCall = gsap.delayedCall(snap3.delay || scrubSmooth / 2 || 0.1, function() {
        var scroll = scrollFunc(), refreshedRecently = _getTime() - lastRefresh < 500, tween = tweenTo.tween;
        if ((refreshedRecently || Math.abs(self.getVelocity()) < 10) && !tween && !_pointerIsDown && lastSnap !== scroll) {
          var progress = (scroll - start) / change, totalProgress = animation && !isToggle ? animation.totalProgress() : progress, velocity = refreshedRecently ? 0 : (totalProgress - snap22) / (_getTime() - _time2) * 1e3 || 0, change1 = gsap.utils.clamp(-progress, 1 - progress, _abs(velocity / 2) * velocity / 0.185), naturalEnd = progress + (snap3.inertia === false ? 0 : change1), endValue, endScroll, _snap = snap3, onStart = _snap.onStart, _onInterrupt = _snap.onInterrupt, _onComplete = _snap.onComplete;
          endValue = snapFunc(naturalEnd, self);
          _isNumber2(endValue) || (endValue = naturalEnd);
          endScroll = Math.max(0, Math.round(start + endValue * change));
          if (scroll <= end && scroll >= start && endScroll !== scroll) {
            if (tween && !tween._initted && tween.data <= _abs(endScroll - scroll)) {
              return;
            }
            if (snap3.inertia === false) {
              change1 = endValue - progress;
            }
            tweenTo(endScroll, {
              duration: snapDurClamp(_abs(Math.max(_abs(naturalEnd - totalProgress), _abs(endValue - totalProgress)) * 0.185 / velocity / 0.05 || 0)),
              ease: snap3.ease || "power3",
              data: _abs(endScroll - scroll),
              // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
              onInterrupt: function onInterrupt() {
                return snapDelayedCall.restart(true) && _onInterrupt && _onInterrupt(self);
              },
              onComplete: function onComplete() {
                self.update();
                lastSnap = scrollFunc();
                if (animation && !isToggle) {
                  scrubTween ? scrubTween.resetTo("totalProgress", endValue, animation._tTime / animation._tDur) : animation.progress(endValue);
                }
                snap1 = snap22 = animation && !isToggle ? animation.totalProgress() : self.progress;
                onSnapComplete && onSnapComplete(self);
                _onComplete && _onComplete(self);
              }
            }, scroll, change1 * change, endScroll - scroll - change1 * change);
            onStart && onStart(self, tweenTo.tween);
          }
        } else if (self.isActive && lastSnap !== scroll) {
          snapDelayedCall.restart(true);
        }
      }).pause();
    }
    id && (_ids[id] = self);
    trigger = self.trigger = _getTarget(trigger || pin !== true && pin);
    customRevertReturn = trigger && trigger._gsap && trigger._gsap.stRevert;
    customRevertReturn && (customRevertReturn = customRevertReturn(self));
    pin = pin === true ? trigger : _getTarget(pin);
    _isString2(toggleClass) && (toggleClass = {
      targets: trigger,
      className: toggleClass
    });
    if (pin) {
      pinSpacing === false || pinSpacing === _margin || (pinSpacing = !pinSpacing && pin.parentNode && pin.parentNode.style && _getComputedStyle(pin.parentNode).display === "flex" ? false : _padding);
      self.pin = pin;
      pinCache = gsap.core.getCache(pin);
      if (!pinCache.spacer) {
        if (pinSpacer) {
          pinSpacer = _getTarget(pinSpacer);
          pinSpacer && !pinSpacer.nodeType && (pinSpacer = pinSpacer.current || pinSpacer.nativeElement);
          pinCache.spacerIsNative = !!pinSpacer;
          pinSpacer && (pinCache.spacerState = _getState(pinSpacer));
        }
        pinCache.spacer = spacer = pinSpacer || _doc.createElement("div");
        spacer.classList.add("pin-spacer");
        id && spacer.classList.add("pin-spacer-" + id);
        pinCache.pinState = pinOriginalState = _getState(pin);
      } else {
        pinOriginalState = pinCache.pinState;
      }
      vars.force3D !== false && gsap.set(pin, {
        force3D: true
      });
      self.spacer = spacer = pinCache.spacer;
      cs = _getComputedStyle(pin);
      spacingStart = cs[pinSpacing + direction.os2];
      pinGetter = gsap.getProperty(pin);
      pinSetter = gsap.quickSetter(pin, direction.a, _px);
      _swapPinIn(pin, spacer, cs);
      pinState = _getState(pin);
    }
    if (markers) {
      markerVars = _isObject2(markers) ? _setDefaults2(markers, _markerDefaults) : _markerDefaults;
      markerStartTrigger = _createMarker("scroller-start", id, scroller, direction, markerVars, 0);
      markerEndTrigger = _createMarker("scroller-end", id, scroller, direction, markerVars, 0, markerStartTrigger);
      offset = markerStartTrigger["offset" + direction.op.d2];
      var content = _getTarget(_getProxyProp(scroller, "content") || scroller);
      markerStart = this.markerStart = _createMarker("start", id, content, direction, markerVars, offset, 0, containerAnimation);
      markerEnd = this.markerEnd = _createMarker("end", id, content, direction, markerVars, offset, 0, containerAnimation);
      containerAnimation && (caMarkerSetter = gsap.quickSetter([markerStart, markerEnd], direction.a, _px));
      if (!useFixedPosition && !(_proxies.length && _getProxyProp(scroller, "fixedMarkers") === true)) {
        _makePositionable(isViewport ? _body : scroller);
        gsap.set([markerStartTrigger, markerEndTrigger], {
          force3D: true
        });
        markerStartSetter = gsap.quickSetter(markerStartTrigger, direction.a, _px);
        markerEndSetter = gsap.quickSetter(markerEndTrigger, direction.a, _px);
      }
    }
    if (containerAnimation) {
      var oldOnUpdate = containerAnimation.vars.onUpdate, oldParams = containerAnimation.vars.onUpdateParams;
      containerAnimation.eventCallback("onUpdate", function() {
        self.update(0, 0, 1);
        oldOnUpdate && oldOnUpdate.apply(containerAnimation, oldParams || []);
      });
    }
    self.previous = function() {
      return _triggers[_triggers.indexOf(self) - 1];
    };
    self.next = function() {
      return _triggers[_triggers.indexOf(self) + 1];
    };
    self.revert = function(revert, temp) {
      if (!temp) {
        return self.kill(true);
      }
      var r2 = revert !== false || !self.enabled, prevRefreshing = _refreshing;
      if (r2 !== self.isReverted) {
        if (r2) {
          prevScroll = Math.max(scrollFunc(), self.scroll.rec || 0);
          prevProgress = self.progress;
          prevAnimProgress = animation && animation.progress();
        }
        markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m2) {
          return m2.style.display = r2 ? "none" : "block";
        });
        if (r2) {
          _refreshing = self;
          self.update(r2);
        }
        if (pin && (!pinReparent || !self.isActive)) {
          if (r2) {
            _swapPinOut(pin, spacer, pinOriginalState);
          } else {
            _swapPinIn(pin, spacer, _getComputedStyle(pin), spacerState);
          }
        }
        r2 || self.update(r2);
        _refreshing = prevRefreshing;
        self.isReverted = r2;
      }
    };
    self.refresh = function(soft, force, position, pinOffset) {
      if ((_refreshing || !self.enabled) && !force) {
        return;
      }
      if (pin && soft && _lastScrollTime) {
        _addListener2(ScrollTrigger2, "scrollEnd", _softRefresh);
        return;
      }
      !_refreshingAll && onRefreshInit && onRefreshInit(self);
      _refreshing = self;
      if (tweenTo.tween && !position) {
        tweenTo.tween.kill();
        tweenTo.tween = 0;
      }
      scrubTween && scrubTween.pause();
      if (invalidateOnRefresh && animation) {
        animation.revert({
          kill: false
        }).invalidate();
        animation.getChildren && animation.getChildren(true, true, false).forEach(function(t3) {
          return t3.vars.immediateRender && t3.render(0, true, true);
        });
      }
      self.isReverted || self.revert(true, true);
      self._subPinOffset = false;
      var size = getScrollerSize(), scrollerBounds = getScrollerOffsets(), max = containerAnimation ? containerAnimation.duration() : _maxScroll(scroller, direction), isFirstRefresh = change <= 0.01 || !change, offset2 = 0, otherPinOffset = pinOffset || 0, parsedEnd = _isObject2(position) ? position.end : vars.end, parsedEndTrigger = vars.endTrigger || trigger, parsedStart = _isObject2(position) ? position.start : vars.start || (vars.start === 0 || !trigger ? 0 : pin ? "0 0" : "0 100%"), pinnedContainer = self.pinnedContainer = vars.pinnedContainer && _getTarget(vars.pinnedContainer, self), triggerIndex = trigger && Math.max(0, _triggers.indexOf(self)) || 0, i2 = triggerIndex, cs2, bounds, scroll, isVertical, override, curTrigger, curPin, oppositeScroll, initted, revertedPins, forcedOverflow, markerStartOffset, markerEndOffset;
      if (markers && _isObject2(position)) {
        markerStartOffset = gsap.getProperty(markerStartTrigger, direction.p);
        markerEndOffset = gsap.getProperty(markerEndTrigger, direction.p);
      }
      while (i2-- > 0) {
        curTrigger = _triggers[i2];
        curTrigger.end || curTrigger.refresh(0, 1) || (_refreshing = self);
        curPin = curTrigger.pin;
        if (curPin && (curPin === trigger || curPin === pin || curPin === pinnedContainer) && !curTrigger.isReverted) {
          revertedPins || (revertedPins = []);
          revertedPins.unshift(curTrigger);
          curTrigger.revert(true, true);
        }
        if (curTrigger !== _triggers[i2]) {
          triggerIndex--;
          i2--;
        }
      }
      _isFunction2(parsedStart) && (parsedStart = parsedStart(self));
      parsedStart = _parseClamp(parsedStart, "start", self);
      start = _parsePosition2(parsedStart, trigger, size, direction, scrollFunc(), markerStart, markerStartTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._startClamp && "_startClamp") || (pin ? -1e-3 : 0);
      _isFunction2(parsedEnd) && (parsedEnd = parsedEnd(self));
      if (_isString2(parsedEnd) && !parsedEnd.indexOf("+=")) {
        if (~parsedEnd.indexOf(" ")) {
          parsedEnd = (_isString2(parsedStart) ? parsedStart.split(" ")[0] : "") + parsedEnd;
        } else {
          offset2 = _offsetToPx(parsedEnd.substr(2), size);
          parsedEnd = _isString2(parsedStart) ? parsedStart : (containerAnimation ? gsap.utils.mapRange(0, containerAnimation.duration(), containerAnimation.scrollTrigger.start, containerAnimation.scrollTrigger.end, start) : start) + offset2;
          parsedEndTrigger = trigger;
        }
      }
      parsedEnd = _parseClamp(parsedEnd, "end", self);
      end = Math.max(start, _parsePosition2(parsedEnd || (parsedEndTrigger ? "100% 0" : max), parsedEndTrigger, size, direction, scrollFunc() + offset2, markerEnd, markerEndTrigger, self, scrollerBounds, borderWidth, useFixedPosition, max, containerAnimation, self._endClamp && "_endClamp")) || -1e-3;
      offset2 = 0;
      i2 = triggerIndex;
      while (i2--) {
        curTrigger = _triggers[i2];
        curPin = curTrigger.pin;
        if (curPin && curTrigger.start - curTrigger._pinPush <= start && !containerAnimation && curTrigger.end > 0) {
          cs2 = curTrigger.end - (self._startClamp ? Math.max(0, curTrigger.start) : curTrigger.start);
          if ((curPin === trigger && curTrigger.start - curTrigger._pinPush < start || curPin === pinnedContainer) && isNaN(parsedStart)) {
            offset2 += cs2 * (1 - curTrigger.progress);
          }
          curPin === pin && (otherPinOffset += cs2);
        }
      }
      start += offset2;
      end += offset2;
      self._startClamp && (self._startClamp += offset2);
      if (self._endClamp && !_refreshingAll) {
        self._endClamp = end || -1e-3;
        end = Math.min(end, _maxScroll(scroller, direction));
      }
      change = end - start || (start -= 0.01) && 1e-3;
      if (isFirstRefresh) {
        prevProgress = gsap.utils.clamp(0, 1, gsap.utils.normalize(start, end, prevScroll));
      }
      self._pinPush = otherPinOffset;
      if (markerStart && offset2) {
        cs2 = {};
        cs2[direction.a] = "+=" + offset2;
        pinnedContainer && (cs2[direction.p] = "-=" + scrollFunc());
        gsap.set([markerStart, markerEnd], cs2);
      }
      if (pin && !(_clampingMax && self.end >= _maxScroll(scroller, direction))) {
        cs2 = _getComputedStyle(pin);
        isVertical = direction === _vertical;
        scroll = scrollFunc();
        pinStart = parseFloat(pinGetter(direction.a)) + otherPinOffset;
        if (!max && end > 1) {
          forcedOverflow = (isViewport ? _doc.scrollingElement || _docEl : scroller).style;
          forcedOverflow = {
            style: forcedOverflow,
            value: forcedOverflow["overflow" + direction.a.toUpperCase()]
          };
          if (isViewport && _getComputedStyle(_body)["overflow" + direction.a.toUpperCase()] !== "scroll") {
            forcedOverflow.style["overflow" + direction.a.toUpperCase()] = "scroll";
          }
        }
        _swapPinIn(pin, spacer, cs2);
        pinState = _getState(pin);
        bounds = _getBounds(pin, true);
        oppositeScroll = useFixedPosition && _getScrollFunc(scroller, isVertical ? _horizontal : _vertical)();
        if (pinSpacing) {
          spacerState = [pinSpacing + direction.os2, change + otherPinOffset + _px];
          spacerState.t = spacer;
          i2 = pinSpacing === _padding ? _getSize(pin, direction) + change + otherPinOffset : 0;
          if (i2) {
            spacerState.push(direction.d, i2 + _px);
            spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i2 + _px);
          }
          _setState(spacerState);
          if (pinnedContainer) {
            _triggers.forEach(function(t3) {
              if (t3.pin === pinnedContainer && t3.vars.pinSpacing !== false) {
                t3._subPinOffset = true;
              }
            });
          }
          useFixedPosition && scrollFunc(prevScroll);
        } else {
          i2 = _getSize(pin, direction);
          i2 && spacer.style.flexBasis !== "auto" && (spacer.style.flexBasis = i2 + _px);
        }
        if (useFixedPosition) {
          override = {
            top: bounds.top + (isVertical ? scroll - start : oppositeScroll) + _px,
            left: bounds.left + (isVertical ? oppositeScroll : scroll - start) + _px,
            boxSizing: "border-box",
            position: "fixed"
          };
          override[_width] = override["max" + _Width] = Math.ceil(bounds.width) + _px;
          override[_height] = override["max" + _Height] = Math.ceil(bounds.height) + _px;
          override[_margin] = override[_margin + _Top] = override[_margin + _Right] = override[_margin + _Bottom] = override[_margin + _Left] = "0";
          override[_padding] = cs2[_padding];
          override[_padding + _Top] = cs2[_padding + _Top];
          override[_padding + _Right] = cs2[_padding + _Right];
          override[_padding + _Bottom] = cs2[_padding + _Bottom];
          override[_padding + _Left] = cs2[_padding + _Left];
          pinActiveState = _copyState(pinOriginalState, override, pinReparent);
          _refreshingAll && scrollFunc(0);
        }
        if (animation) {
          initted = animation._initted;
          _suppressOverwrites(1);
          animation.render(animation.duration(), true, true);
          pinChange = pinGetter(direction.a) - pinStart + change + otherPinOffset;
          pinMoves = Math.abs(change - pinChange) > 1;
          useFixedPosition && pinMoves && pinActiveState.splice(pinActiveState.length - 2, 2);
          animation.render(0, true, true);
          initted || animation.invalidate(true);
          animation.parent || animation.totalTime(animation.totalTime());
          _suppressOverwrites(0);
        } else {
          pinChange = change;
        }
        forcedOverflow && (forcedOverflow.value ? forcedOverflow.style["overflow" + direction.a.toUpperCase()] = forcedOverflow.value : forcedOverflow.style.removeProperty("overflow-" + direction.a));
      } else if (trigger && scrollFunc() && !containerAnimation) {
        bounds = trigger.parentNode;
        while (bounds && bounds !== _body) {
          if (bounds._pinOffset) {
            start -= bounds._pinOffset;
            end -= bounds._pinOffset;
          }
          bounds = bounds.parentNode;
        }
      }
      revertedPins && revertedPins.forEach(function(t3) {
        return t3.revert(false, true);
      });
      self.start = start;
      self.end = end;
      scroll1 = scroll2 = _refreshingAll ? prevScroll : scrollFunc();
      if (!containerAnimation && !_refreshingAll) {
        scroll1 < prevScroll && scrollFunc(prevScroll);
        self.scroll.rec = 0;
      }
      self.revert(false, true);
      lastRefresh = _getTime();
      if (snapDelayedCall) {
        lastSnap = -1;
        snapDelayedCall.restart(true);
      }
      _refreshing = 0;
      animation && isToggle && (animation._initted || prevAnimProgress) && animation.progress() !== prevAnimProgress && animation.progress(prevAnimProgress || 0, true).render(animation.time(), true, true);
      if (isFirstRefresh || prevProgress !== self.progress || containerAnimation || invalidateOnRefresh || animation && !animation._initted) {
        animation && !isToggle && (animation._initted || prevProgress || animation.vars.immediateRender !== false) && animation.totalProgress(containerAnimation && start < -1e-3 && !prevProgress ? gsap.utils.normalize(start, end, 0) : prevProgress, true);
        self.progress = isFirstRefresh || (scroll1 - start) / change === prevProgress ? 0 : prevProgress;
      }
      pin && pinSpacing && (spacer._pinOffset = Math.round(self.progress * pinChange));
      scrubTween && scrubTween.invalidate();
      if (!isNaN(markerStartOffset)) {
        markerStartOffset -= gsap.getProperty(markerStartTrigger, direction.p);
        markerEndOffset -= gsap.getProperty(markerEndTrigger, direction.p);
        _shiftMarker(markerStartTrigger, direction, markerStartOffset);
        _shiftMarker(markerStart, direction, markerStartOffset - (pinOffset || 0));
        _shiftMarker(markerEndTrigger, direction, markerEndOffset);
        _shiftMarker(markerEnd, direction, markerEndOffset - (pinOffset || 0));
      }
      isFirstRefresh && !_refreshingAll && self.update();
      if (onRefresh && !_refreshingAll && !executingOnRefresh) {
        executingOnRefresh = true;
        onRefresh(self);
        executingOnRefresh = false;
      }
    };
    self.getVelocity = function() {
      return (scrollFunc() - scroll2) / (_getTime() - _time2) * 1e3 || 0;
    };
    self.endAnimation = function() {
      _endAnimation(self.callbackAnimation);
      if (animation) {
        scrubTween ? scrubTween.progress(1) : !animation.paused() ? _endAnimation(animation, animation.reversed()) : isToggle || _endAnimation(animation, self.direction < 0, 1);
      }
    };
    self.labelToScroll = function(label) {
      return animation && animation.labels && (start || self.refresh() || start) + animation.labels[label] / animation.duration() * change || 0;
    };
    self.getTrailing = function(name) {
      var i2 = _triggers.indexOf(self), a2 = self.direction > 0 ? _triggers.slice(0, i2).reverse() : _triggers.slice(i2 + 1);
      return (_isString2(name) ? a2.filter(function(t3) {
        return t3.vars.preventOverlaps === name;
      }) : a2).filter(function(t3) {
        return self.direction > 0 ? t3.end <= start : t3.start >= end;
      });
    };
    self.update = function(reset, recordVelocity, forceFake) {
      if (containerAnimation && !forceFake && !reset) {
        return;
      }
      var scroll = _refreshingAll === true ? prevScroll : self.scroll(), p2 = reset ? 0 : (scroll - start) / change, clipped = p2 < 0 ? 0 : p2 > 1 ? 1 : p2 || 0, prevProgress2 = self.progress, isActive, wasActive, toggleState, action, stateChanged, toggled, isAtMax, isTakingAction;
      if (recordVelocity) {
        scroll2 = scroll1;
        scroll1 = containerAnimation ? scrollFunc() : scroll;
        if (snap3) {
          snap22 = snap1;
          snap1 = animation && !isToggle ? animation.totalProgress() : clipped;
        }
      }
      if (anticipatePin && pin && !_refreshing && !_startup && _lastScrollTime) {
        if (!clipped && start < scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin) {
          clipped = 1e-4;
        } else if (clipped === 1 && end > scroll + (scroll - scroll2) / (_getTime() - _time2) * anticipatePin) {
          clipped = 0.9999;
        }
      }
      if (clipped !== prevProgress2 && self.enabled) {
        isActive = self.isActive = !!clipped && clipped < 1;
        wasActive = !!prevProgress2 && prevProgress2 < 1;
        toggled = isActive !== wasActive;
        stateChanged = toggled || !!clipped !== !!prevProgress2;
        self.direction = clipped > prevProgress2 ? 1 : -1;
        self.progress = clipped;
        if (stateChanged && !_refreshing) {
          toggleState = clipped && !prevProgress2 ? 0 : clipped === 1 ? 1 : prevProgress2 === 1 ? 2 : 3;
          if (isToggle) {
            action = !toggled && toggleActions[toggleState + 1] !== "none" && toggleActions[toggleState + 1] || toggleActions[toggleState];
            isTakingAction = animation && (action === "complete" || action === "reset" || action in animation);
          }
        }
        preventOverlaps && (toggled || isTakingAction) && (isTakingAction || scrub || !animation) && (_isFunction2(preventOverlaps) ? preventOverlaps(self) : self.getTrailing(preventOverlaps).forEach(function(t3) {
          return t3.endAnimation();
        }));
        if (!isToggle) {
          if (scrubTween && !_refreshing && !_startup) {
            scrubTween._dp._time - scrubTween._start !== scrubTween._time && scrubTween.render(scrubTween._dp._time - scrubTween._start);
            if (scrubTween.resetTo) {
              scrubTween.resetTo("totalProgress", clipped, animation._tTime / animation._tDur);
            } else {
              scrubTween.vars.totalProgress = clipped;
              scrubTween.invalidate().restart();
            }
          } else if (animation) {
            animation.totalProgress(clipped, !!(_refreshing && (lastRefresh || reset)));
          }
        }
        if (pin) {
          reset && pinSpacing && (spacer.style[pinSpacing + direction.os2] = spacingStart);
          if (!useFixedPosition) {
            pinSetter(_round2(pinStart + pinChange * clipped));
          } else if (stateChanged) {
            isAtMax = !reset && clipped > prevProgress2 && end + 1 > scroll && scroll + 1 >= _maxScroll(scroller, direction);
            if (pinReparent) {
              if (!reset && (isActive || isAtMax)) {
                var bounds = _getBounds(pin, true), _offset = scroll - start;
                _reparent(pin, _body, bounds.top + (direction === _vertical ? _offset : 0) + _px, bounds.left + (direction === _vertical ? 0 : _offset) + _px);
              } else {
                _reparent(pin, spacer);
              }
            }
            _setState(isActive || isAtMax ? pinActiveState : pinState);
            pinMoves && clipped < 1 && isActive || pinSetter(pinStart + (clipped === 1 && !isAtMax ? pinChange : 0));
          }
        }
        snap3 && !tweenTo.tween && !_refreshing && !_startup && snapDelayedCall.restart(true);
        toggleClass && (toggled || once && clipped && (clipped < 1 || !_limitCallbacks)) && _toArray(toggleClass.targets).forEach(function(el) {
          return el.classList[isActive || once ? "add" : "remove"](toggleClass.className);
        });
        onUpdate && !isToggle && !reset && onUpdate(self);
        if (stateChanged && !_refreshing) {
          if (isToggle) {
            if (isTakingAction) {
              if (action === "complete") {
                animation.pause().totalProgress(1);
              } else if (action === "reset") {
                animation.restart(true).pause();
              } else if (action === "restart") {
                animation.restart(true);
              } else {
                animation[action]();
              }
            }
            onUpdate && onUpdate(self);
          }
          if (toggled || !_limitCallbacks) {
            onToggle && toggled && _callback2(self, onToggle);
            callbacks[toggleState] && _callback2(self, callbacks[toggleState]);
            once && (clipped === 1 ? self.kill(false, 1) : callbacks[toggleState] = 0);
            if (!toggled) {
              toggleState = clipped === 1 ? 1 : 3;
              callbacks[toggleState] && _callback2(self, callbacks[toggleState]);
            }
          }
          if (fastScrollEnd && !isActive && Math.abs(self.getVelocity()) > (_isNumber2(fastScrollEnd) ? fastScrollEnd : 2500)) {
            _endAnimation(self.callbackAnimation);
            scrubTween ? scrubTween.progress(1) : _endAnimation(animation, action === "reverse" ? 1 : !clipped, 1);
          }
        } else if (isToggle && onUpdate && !_refreshing) {
          onUpdate(self);
        }
      }
      if (markerEndSetter) {
        var n2 = containerAnimation ? scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0) : scroll;
        markerStartSetter(n2 + (markerStartTrigger._isFlipped ? 1 : 0));
        markerEndSetter(n2);
      }
      caMarkerSetter && caMarkerSetter(-scroll / containerAnimation.duration() * (containerAnimation._caScrollDist || 0));
    };
    self.enable = function(reset, refresh) {
      if (!self.enabled) {
        self.enabled = true;
        _addListener2(scroller, "resize", _onResize);
        isViewport || _addListener2(scroller, "scroll", _onScroll2);
        onRefreshInit && _addListener2(ScrollTrigger2, "refreshInit", onRefreshInit);
        if (reset !== false) {
          self.progress = prevProgress = 0;
          scroll1 = scroll2 = lastSnap = scrollFunc();
        }
        refresh !== false && self.refresh();
      }
    };
    self.getTween = function(snap4) {
      return snap4 && tweenTo ? tweenTo.tween : scrubTween;
    };
    self.setPositions = function(newStart, newEnd, keepClamp, pinOffset) {
      if (containerAnimation) {
        var st = containerAnimation.scrollTrigger, duration = containerAnimation.duration(), _change = st.end - st.start;
        newStart = st.start + _change * newStart / duration;
        newEnd = st.start + _change * newEnd / duration;
      }
      self.refresh(false, false, {
        start: _keepClamp(newStart, keepClamp && !!self._startClamp),
        end: _keepClamp(newEnd, keepClamp && !!self._endClamp)
      }, pinOffset);
      self.update();
    };
    self.adjustPinSpacing = function(amount) {
      if (spacerState && amount) {
        var i2 = spacerState.indexOf(direction.d) + 1;
        spacerState[i2] = parseFloat(spacerState[i2]) + amount + _px;
        spacerState[1] = parseFloat(spacerState[1]) + amount + _px;
        _setState(spacerState);
      }
    };
    self.disable = function(reset, allowAnimation) {
      if (self.enabled) {
        reset !== false && self.revert(true, true);
        self.enabled = self.isActive = false;
        allowAnimation || scrubTween && scrubTween.pause();
        prevScroll = 0;
        pinCache && (pinCache.uncache = 1);
        onRefreshInit && _removeListener2(ScrollTrigger2, "refreshInit", onRefreshInit);
        if (snapDelayedCall) {
          snapDelayedCall.pause();
          tweenTo.tween && tweenTo.tween.kill() && (tweenTo.tween = 0);
        }
        if (!isViewport) {
          var i2 = _triggers.length;
          while (i2--) {
            if (_triggers[i2].scroller === scroller && _triggers[i2] !== self) {
              return;
            }
          }
          _removeListener2(scroller, "resize", _onResize);
          isViewport || _removeListener2(scroller, "scroll", _onScroll2);
        }
      }
    };
    self.kill = function(revert, allowAnimation) {
      self.disable(revert, allowAnimation);
      scrubTween && !allowAnimation && scrubTween.kill();
      id && delete _ids[id];
      var i2 = _triggers.indexOf(self);
      i2 >= 0 && _triggers.splice(i2, 1);
      i2 === _i && _direction > 0 && _i--;
      i2 = 0;
      _triggers.forEach(function(t3) {
        return t3.scroller === self.scroller && (i2 = 1);
      });
      i2 || _refreshingAll || (self.scroll.rec = 0);
      if (animation) {
        animation.scrollTrigger = null;
        revert && animation.revert({
          kill: false
        });
        allowAnimation || animation.kill();
      }
      markerStart && [markerStart, markerEnd, markerStartTrigger, markerEndTrigger].forEach(function(m2) {
        return m2.parentNode && m2.parentNode.removeChild(m2);
      });
      _primary === self && (_primary = 0);
      if (pin) {
        pinCache && (pinCache.uncache = 1);
        i2 = 0;
        _triggers.forEach(function(t3) {
          return t3.pin === pin && i2++;
        });
        i2 || (pinCache.spacer = 0);
      }
      vars.onKill && vars.onKill(self);
    };
    _triggers.push(self);
    self.enable(false, false);
    customRevertReturn && customRevertReturn(self);
    if (animation && animation.add && !change) {
      var updateFunc = self.update;
      self.update = function() {
        self.update = updateFunc;
        _scrollers.cache++;
        start || end || self.refresh();
      };
      gsap.delayedCall(0.01, self.update);
      change = 0.01;
      start = end = 0;
    } else {
      self.refresh();
    }
    pin && _queueRefreshAll();
  };
  ScrollTrigger2.register = function register(core) {
    if (!_coreInitted) {
      gsap = core || _getGSAP2();
      _windowExists3() && window.document && ScrollTrigger2.enable();
      _coreInitted = _enabled;
    }
    return _coreInitted;
  };
  ScrollTrigger2.defaults = function defaults2(config3) {
    if (config3) {
      for (var p2 in config3) {
        _defaults[p2] = config3[p2];
      }
    }
    return _defaults;
  };
  ScrollTrigger2.disable = function disable(reset, kill) {
    _enabled = 0;
    _triggers.forEach(function(trigger) {
      return trigger[kill ? "kill" : "disable"](reset);
    });
    _removeListener2(_win, "wheel", _onScroll2);
    _removeListener2(_doc, "scroll", _onScroll2);
    clearInterval(_syncInterval);
    _removeListener2(_doc, "touchcancel", _passThrough2);
    _removeListener2(_body, "touchstart", _passThrough2);
    _multiListener(_removeListener2, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);
    _multiListener(_removeListener2, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);
    _resizeDelay.kill();
    _iterateAutoRefresh(_removeListener2);
    for (var i2 = 0; i2 < _scrollers.length; i2 += 3) {
      _wheelListener(_removeListener2, _scrollers[i2], _scrollers[i2 + 1]);
      _wheelListener(_removeListener2, _scrollers[i2], _scrollers[i2 + 2]);
    }
  };
  ScrollTrigger2.enable = function enable() {
    _win = window;
    _doc = document;
    _docEl = _doc.documentElement;
    _body = _doc.body;
    if (gsap) {
      _toArray = gsap.utils.toArray;
      _clamp2 = gsap.utils.clamp;
      _context = gsap.core.context || _passThrough2;
      _suppressOverwrites = gsap.core.suppressOverwrites || _passThrough2;
      _scrollRestoration = _win.history.scrollRestoration || "auto";
      _lastScroll = _win.pageYOffset || 0;
      gsap.core.globals("ScrollTrigger", ScrollTrigger2);
      if (_body) {
        _enabled = 1;
        _div100vh = document.createElement("div");
        _div100vh.style.height = "100vh";
        _div100vh.style.position = "absolute";
        _refresh100vh();
        _rafBugFix();
        Observer.register(gsap);
        ScrollTrigger2.isTouch = Observer.isTouch;
        _fixIOSBug = Observer.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent);
        _ignoreMobileResize = Observer.isTouch === 1;
        _addListener2(_win, "wheel", _onScroll2);
        _root = [_win, _doc, _docEl, _body];
        if (gsap.matchMedia) {
          ScrollTrigger2.matchMedia = function(vars) {
            var mm = gsap.matchMedia(), p2;
            for (p2 in vars) {
              mm.add(p2, vars[p2]);
            }
            return mm;
          };
          gsap.addEventListener("matchMediaInit", function() {
            return _revertAll();
          });
          gsap.addEventListener("matchMediaRevert", function() {
            return _revertRecorded();
          });
          gsap.addEventListener("matchMedia", function() {
            _refreshAll(0, 1);
            _dispatch2("matchMedia");
          });
          gsap.matchMedia().add("(orientation: portrait)", function() {
            _setBaseDimensions();
            return _setBaseDimensions;
          });
        } else {
          console.warn("Requires GSAP 3.11.0 or later");
        }
        _setBaseDimensions();
        _addListener2(_doc, "scroll", _onScroll2);
        var bodyHasStyle = _body.hasAttribute("style"), bodyStyle = _body.style, border = bodyStyle.borderTopStyle, AnimationProto = gsap.core.Animation.prototype, bounds, i2;
        AnimationProto.revert || Object.defineProperty(AnimationProto, "revert", {
          value: function value() {
            return this.time(-0.01, true);
          }
        });
        bodyStyle.borderTopStyle = "solid";
        bounds = _getBounds(_body);
        _vertical.m = Math.round(bounds.top + _vertical.sc()) || 0;
        _horizontal.m = Math.round(bounds.left + _horizontal.sc()) || 0;
        border ? bodyStyle.borderTopStyle = border : bodyStyle.removeProperty("border-top-style");
        if (!bodyHasStyle) {
          _body.setAttribute("style", "");
          _body.removeAttribute("style");
        }
        _syncInterval = setInterval(_sync, 250);
        gsap.delayedCall(0.5, function() {
          return _startup = 0;
        });
        _addListener2(_doc, "touchcancel", _passThrough2);
        _addListener2(_body, "touchstart", _passThrough2);
        _multiListener(_addListener2, _doc, "pointerdown,touchstart,mousedown", _pointerDownHandler);
        _multiListener(_addListener2, _doc, "pointerup,touchend,mouseup", _pointerUpHandler);
        _transformProp = gsap.utils.checkPrefix("transform");
        _stateProps.push(_transformProp);
        _coreInitted = _getTime();
        _resizeDelay = gsap.delayedCall(0.2, _refreshAll).pause();
        _autoRefresh = [_doc, "visibilitychange", function() {
          var w2 = _win.innerWidth, h2 = _win.innerHeight;
          if (_doc.hidden) {
            _prevWidth = w2;
            _prevHeight = h2;
          } else if (_prevWidth !== w2 || _prevHeight !== h2) {
            _onResize();
          }
        }, _doc, "DOMContentLoaded", _refreshAll, _win, "load", _refreshAll, _win, "resize", _onResize];
        _iterateAutoRefresh(_addListener2);
        _triggers.forEach(function(trigger) {
          return trigger.enable(0, 1);
        });
        for (i2 = 0; i2 < _scrollers.length; i2 += 3) {
          _wheelListener(_removeListener2, _scrollers[i2], _scrollers[i2 + 1]);
          _wheelListener(_removeListener2, _scrollers[i2], _scrollers[i2 + 2]);
        }
      }
    }
  };
  ScrollTrigger2.config = function config3(vars) {
    "limitCallbacks" in vars && (_limitCallbacks = !!vars.limitCallbacks);
    var ms = vars.syncInterval;
    ms && clearInterval(_syncInterval) || (_syncInterval = ms) && setInterval(_sync, ms);
    "ignoreMobileResize" in vars && (_ignoreMobileResize = ScrollTrigger2.isTouch === 1 && vars.ignoreMobileResize);
    if ("autoRefreshEvents" in vars) {
      _iterateAutoRefresh(_removeListener2) || _iterateAutoRefresh(_addListener2, vars.autoRefreshEvents || "none");
      _ignoreResize = (vars.autoRefreshEvents + "").indexOf("resize") === -1;
    }
  };
  ScrollTrigger2.scrollerProxy = function scrollerProxy(target, vars) {
    var t3 = _getTarget(target), i2 = _scrollers.indexOf(t3), isViewport = _isViewport2(t3);
    if (~i2) {
      _scrollers.splice(i2, isViewport ? 6 : 2);
    }
    if (vars) {
      isViewport ? _proxies.unshift(_win, vars, _body, vars, _docEl, vars) : _proxies.unshift(t3, vars);
    }
  };
  ScrollTrigger2.clearMatchMedia = function clearMatchMedia(query) {
    _triggers.forEach(function(t3) {
      return t3._ctx && t3._ctx.query === query && t3._ctx.kill(true, true);
    });
  };
  ScrollTrigger2.isInViewport = function isInViewport(element, ratio, horizontal) {
    var bounds = (_isString2(element) ? _getTarget(element) : element).getBoundingClientRect(), offset = bounds[horizontal ? _width : _height] * ratio || 0;
    return horizontal ? bounds.right - offset > 0 && bounds.left + offset < _win.innerWidth : bounds.bottom - offset > 0 && bounds.top + offset < _win.innerHeight;
  };
  ScrollTrigger2.positionInViewport = function positionInViewport(element, referencePoint, horizontal) {
    _isString2(element) && (element = _getTarget(element));
    var bounds = element.getBoundingClientRect(), size = bounds[horizontal ? _width : _height], offset = referencePoint == null ? size / 2 : referencePoint in _keywords ? _keywords[referencePoint] * size : ~referencePoint.indexOf("%") ? parseFloat(referencePoint) * size / 100 : parseFloat(referencePoint) || 0;
    return horizontal ? (bounds.left + offset) / _win.innerWidth : (bounds.top + offset) / _win.innerHeight;
  };
  ScrollTrigger2.killAll = function killAll(allowListeners) {
    _triggers.slice(0).forEach(function(t3) {
      return t3.vars.id !== "ScrollSmoother" && t3.kill();
    });
    if (allowListeners !== true) {
      var listeners = _listeners.killAll || [];
      _listeners = {};
      listeners.forEach(function(f2) {
        return f2();
      });
    }
  };
  return ScrollTrigger2;
})();
ScrollTrigger.version = "3.13.0";
ScrollTrigger.saveStyles = function(targets) {
  return targets ? _toArray(targets).forEach(function(target) {
    if (target && target.style) {
      var i2 = _savedStyles.indexOf(target);
      i2 >= 0 && _savedStyles.splice(i2, 5);
      _savedStyles.push(target, target.style.cssText, target.getBBox && target.getAttribute("transform"), gsap.core.getCache(target), _context());
    }
  }) : _savedStyles;
};
ScrollTrigger.revert = function(soft, media) {
  return _revertAll(!soft, media);
};
ScrollTrigger.create = function(vars, animation) {
  return new ScrollTrigger(vars, animation);
};
ScrollTrigger.refresh = function(safe) {
  return safe ? _onResize(true) : (_coreInitted || ScrollTrigger.register()) && _refreshAll(true);
};
ScrollTrigger.update = function(force) {
  return ++_scrollers.cache && _updateAll(force === true ? 2 : 0);
};
ScrollTrigger.clearScrollMemory = _clearScrollMemory;
ScrollTrigger.maxScroll = function(element, horizontal) {
  return _maxScroll(element, horizontal ? _horizontal : _vertical);
};
ScrollTrigger.getScrollFunc = function(element, horizontal) {
  return _getScrollFunc(_getTarget(element), horizontal ? _horizontal : _vertical);
};
ScrollTrigger.getById = function(id) {
  return _ids[id];
};
ScrollTrigger.getAll = function() {
  return _triggers.filter(function(t3) {
    return t3.vars.id !== "ScrollSmoother";
  });
};
ScrollTrigger.isScrolling = function() {
  return !!_lastScrollTime;
};
ScrollTrigger.snapDirectional = _snapDirectional;
ScrollTrigger.addEventListener = function(type, callback) {
  var a2 = _listeners[type] || (_listeners[type] = []);
  ~a2.indexOf(callback) || a2.push(callback);
};
ScrollTrigger.removeEventListener = function(type, callback) {
  var a2 = _listeners[type], i2 = a2 && a2.indexOf(callback);
  i2 >= 0 && a2.splice(i2, 1);
};
ScrollTrigger.batch = function(targets, vars) {
  var result = [], varsCopy = {}, interval = vars.interval || 0.016, batchMax = vars.batchMax || 1e9, proxyCallback = function proxyCallback2(type, callback) {
    var elements = [], triggers = [], delay = gsap.delayedCall(interval, function() {
      callback(elements, triggers);
      elements = [];
      triggers = [];
    }).pause();
    return function(self) {
      elements.length || delay.restart(true);
      elements.push(self.trigger);
      triggers.push(self);
      batchMax <= elements.length && delay.progress(1);
    };
  }, p2;
  for (p2 in vars) {
    varsCopy[p2] = p2.substr(0, 2) === "on" && _isFunction2(vars[p2]) && p2 !== "onRefreshInit" ? proxyCallback(p2, vars[p2]) : vars[p2];
  }
  if (_isFunction2(batchMax)) {
    batchMax = batchMax();
    _addListener2(ScrollTrigger, "refresh", function() {
      return batchMax = vars.batchMax();
    });
  }
  _toArray(targets).forEach(function(target) {
    var config3 = {};
    for (p2 in varsCopy) {
      config3[p2] = varsCopy[p2];
    }
    config3.trigger = target;
    result.push(ScrollTrigger.create(config3));
  });
  return result;
};
var _clampScrollAndGetDurationMultiplier = function _clampScrollAndGetDurationMultiplier2(scrollFunc, current, end, max) {
  current > max ? scrollFunc(max) : current < 0 && scrollFunc(0);
  return end > max ? (max - current) / (end - current) : end < 0 ? current / (current - end) : 1;
}, _allowNativePanning = function _allowNativePanning2(target, direction) {
  if (direction === true) {
    target.style.removeProperty("touch-action");
  } else {
    target.style.touchAction = direction === true ? "auto" : direction ? "pan-" + direction + (Observer.isTouch ? " pinch-zoom" : "") : "none";
  }
  target === _docEl && _allowNativePanning2(_body, direction);
}, _overflow = {
  auto: 1,
  scroll: 1
}, _nestedScroll = function _nestedScroll2(_ref5) {
  var event = _ref5.event, target = _ref5.target, axis = _ref5.axis;
  var node = (event.changedTouches ? event.changedTouches[0] : event).target, cache = node._gsap || gsap.core.getCache(node), time = _getTime(), cs;
  if (!cache._isScrollT || time - cache._isScrollT > 2e3) {
    while (node && node !== _body && (node.scrollHeight <= node.clientHeight && node.scrollWidth <= node.clientWidth || !(_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]))) {
      node = node.parentNode;
    }
    cache._isScroll = node && node !== target && !_isViewport2(node) && (_overflow[(cs = _getComputedStyle(node)).overflowY] || _overflow[cs.overflowX]);
    cache._isScrollT = time;
  }
  if (cache._isScroll || axis === "x") {
    event.stopPropagation();
    event._gsapAllow = true;
  }
}, _inputObserver = function _inputObserver2(target, type, inputs, nested) {
  return Observer.create({
    target,
    capture: true,
    debounce: false,
    lockAxis: true,
    type,
    onWheel: nested = nested && _nestedScroll,
    onPress: nested,
    onDrag: nested,
    onScroll: nested,
    onEnable: function onEnable() {
      return inputs && _addListener2(_doc, Observer.eventTypes[0], _captureInputs, false, true);
    },
    onDisable: function onDisable() {
      return _removeListener2(_doc, Observer.eventTypes[0], _captureInputs, true);
    }
  });
}, _inputExp = /(input|label|select|textarea)/i, _inputIsFocused, _captureInputs = function _captureInputs2(e2) {
  var isInput = _inputExp.test(e2.target.tagName);
  if (isInput || _inputIsFocused) {
    e2._gsapAllow = true;
    _inputIsFocused = isInput;
  }
}, _getScrollNormalizer = function _getScrollNormalizer2(vars) {
  _isObject2(vars) || (vars = {});
  vars.preventDefault = vars.isNormalizer = vars.allowClicks = true;
  vars.type || (vars.type = "wheel,touch");
  vars.debounce = !!vars.debounce;
  vars.id = vars.id || "normalizer";
  var _vars2 = vars, normalizeScrollX = _vars2.normalizeScrollX, momentum = _vars2.momentum, allowNestedScroll = _vars2.allowNestedScroll, onRelease = _vars2.onRelease, self, maxY, target = _getTarget(vars.target) || _docEl, smoother = gsap.core.globals().ScrollSmoother, smootherInstance = smoother && smoother.get(), content = _fixIOSBug && (vars.content && _getTarget(vars.content) || smootherInstance && vars.content !== false && !smootherInstance.smooth() && smootherInstance.content()), scrollFuncY = _getScrollFunc(target, _vertical), scrollFuncX = _getScrollFunc(target, _horizontal), scale = 1, initialScale = (Observer.isTouch && _win.visualViewport ? _win.visualViewport.scale * _win.visualViewport.width : _win.outerWidth) / _win.innerWidth, wheelRefresh = 0, resolveMomentumDuration = _isFunction2(momentum) ? function() {
    return momentum(self);
  } : function() {
    return momentum || 2.8;
  }, lastRefreshID, skipTouchMove, inputObserver = _inputObserver(target, vars.type, true, allowNestedScroll), resumeTouchMove = function resumeTouchMove2() {
    return skipTouchMove = false;
  }, scrollClampX = _passThrough2, scrollClampY = _passThrough2, updateClamps = function updateClamps2() {
    maxY = _maxScroll(target, _vertical);
    scrollClampY = _clamp2(_fixIOSBug ? 1 : 0, maxY);
    normalizeScrollX && (scrollClampX = _clamp2(0, _maxScroll(target, _horizontal)));
    lastRefreshID = _refreshID;
  }, removeContentOffset = function removeContentOffset2() {
    content._gsap.y = _round2(parseFloat(content._gsap.y) + scrollFuncY.offset) + "px";
    content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(content._gsap.y) + ", 0, 1)";
    scrollFuncY.offset = scrollFuncY.cacheID = 0;
  }, ignoreDrag = function ignoreDrag2() {
    if (skipTouchMove) {
      requestAnimationFrame(resumeTouchMove);
      var offset = _round2(self.deltaY / 2), scroll = scrollClampY(scrollFuncY.v - offset);
      if (content && scroll !== scrollFuncY.v + scrollFuncY.offset) {
        scrollFuncY.offset = scroll - scrollFuncY.v;
        var y2 = _round2((parseFloat(content && content._gsap.y) || 0) - scrollFuncY.offset);
        content.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + y2 + ", 0, 1)";
        content._gsap.y = y2 + "px";
        scrollFuncY.cacheID = _scrollers.cache;
        _updateAll();
      }
      return true;
    }
    scrollFuncY.offset && removeContentOffset();
    skipTouchMove = true;
  }, tween, startScrollX, startScrollY, onStopDelayedCall, onResize = function onResize2() {
    updateClamps();
    if (tween.isActive() && tween.vars.scrollY > maxY) {
      scrollFuncY() > maxY ? tween.progress(1) && scrollFuncY(maxY) : tween.resetTo("scrollY", maxY);
    }
  };
  content && gsap.set(content, {
    y: "+=0"
  });
  vars.ignoreCheck = function(e2) {
    return _fixIOSBug && e2.type === "touchmove" && ignoreDrag() || scale > 1.05 && e2.type !== "touchstart" || self.isGesturing || e2.touches && e2.touches.length > 1;
  };
  vars.onPress = function() {
    skipTouchMove = false;
    var prevScale = scale;
    scale = _round2((_win.visualViewport && _win.visualViewport.scale || 1) / initialScale);
    tween.pause();
    prevScale !== scale && _allowNativePanning(target, scale > 1.01 ? true : normalizeScrollX ? false : "x");
    startScrollX = scrollFuncX();
    startScrollY = scrollFuncY();
    updateClamps();
    lastRefreshID = _refreshID;
  };
  vars.onRelease = vars.onGestureStart = function(self2, wasDragging) {
    scrollFuncY.offset && removeContentOffset();
    if (!wasDragging) {
      onStopDelayedCall.restart(true);
    } else {
      _scrollers.cache++;
      var dur = resolveMomentumDuration(), currentScroll, endScroll;
      if (normalizeScrollX) {
        currentScroll = scrollFuncX();
        endScroll = currentScroll + dur * 0.05 * -self2.velocityX / 0.227;
        dur *= _clampScrollAndGetDurationMultiplier(scrollFuncX, currentScroll, endScroll, _maxScroll(target, _horizontal));
        tween.vars.scrollX = scrollClampX(endScroll);
      }
      currentScroll = scrollFuncY();
      endScroll = currentScroll + dur * 0.05 * -self2.velocityY / 0.227;
      dur *= _clampScrollAndGetDurationMultiplier(scrollFuncY, currentScroll, endScroll, _maxScroll(target, _vertical));
      tween.vars.scrollY = scrollClampY(endScroll);
      tween.invalidate().duration(dur).play(0.01);
      if (_fixIOSBug && tween.vars.scrollY >= maxY || currentScroll >= maxY - 1) {
        gsap.to({}, {
          onUpdate: onResize,
          duration: dur
        });
      }
    }
    onRelease && onRelease(self2);
  };
  vars.onWheel = function() {
    tween._ts && tween.pause();
    if (_getTime() - wheelRefresh > 1e3) {
      lastRefreshID = 0;
      wheelRefresh = _getTime();
    }
  };
  vars.onChange = function(self2, dx, dy, xArray, yArray) {
    _refreshID !== lastRefreshID && updateClamps();
    dx && normalizeScrollX && scrollFuncX(scrollClampX(xArray[2] === dx ? startScrollX + (self2.startX - self2.x) : scrollFuncX() + dx - xArray[1]));
    if (dy) {
      scrollFuncY.offset && removeContentOffset();
      var isTouch = yArray[2] === dy, y2 = isTouch ? startScrollY + self2.startY - self2.y : scrollFuncY() + dy - yArray[1], yClamped = scrollClampY(y2);
      isTouch && y2 !== yClamped && (startScrollY += yClamped - y2);
      scrollFuncY(yClamped);
    }
    (dy || dx) && _updateAll();
  };
  vars.onEnable = function() {
    _allowNativePanning(target, normalizeScrollX ? false : "x");
    ScrollTrigger.addEventListener("refresh", onResize);
    _addListener2(_win, "resize", onResize);
    if (scrollFuncY.smooth) {
      scrollFuncY.target.style.scrollBehavior = "auto";
      scrollFuncY.smooth = scrollFuncX.smooth = false;
    }
    inputObserver.enable();
  };
  vars.onDisable = function() {
    _allowNativePanning(target, true);
    _removeListener2(_win, "resize", onResize);
    ScrollTrigger.removeEventListener("refresh", onResize);
    inputObserver.kill();
  };
  vars.lockAxis = vars.lockAxis !== false;
  self = new Observer(vars);
  self.iOS = _fixIOSBug;
  _fixIOSBug && !scrollFuncY() && scrollFuncY(1);
  _fixIOSBug && gsap.ticker.add(_passThrough2);
  onStopDelayedCall = self._dc;
  tween = gsap.to(self, {
    ease: "power4",
    paused: true,
    inherit: false,
    scrollX: normalizeScrollX ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: _interruptionTracker(scrollFuncY, scrollFuncY(), function() {
        return tween.pause();
      })
    },
    onUpdate: _updateAll,
    onComplete: onStopDelayedCall.vars.onComplete
  });
  return self;
};
ScrollTrigger.sort = function(func) {
  if (_isFunction2(func)) {
    return _triggers.sort(func);
  }
  var scroll = _win.pageYOffset || 0;
  ScrollTrigger.getAll().forEach(function(t3) {
    return t3._sortY = t3.trigger ? scroll + t3.trigger.getBoundingClientRect().top : t3.start + _win.innerHeight;
  });
  return _triggers.sort(func || function(a2, b2) {
    return (a2.vars.refreshPriority || 0) * -1e6 + (a2.vars.containerAnimation ? 1e6 : a2._sortY) - ((b2.vars.containerAnimation ? 1e6 : b2._sortY) + (b2.vars.refreshPriority || 0) * -1e6);
  });
};
ScrollTrigger.observe = function(vars) {
  return new Observer(vars);
};
ScrollTrigger.normalizeScroll = function(vars) {
  if (typeof vars === "undefined") {
    return _normalizer;
  }
  if (vars === true && _normalizer) {
    return _normalizer.enable();
  }
  if (vars === false) {
    _normalizer && _normalizer.kill();
    _normalizer = vars;
    return;
  }
  var normalizer = vars instanceof Observer ? vars : _getScrollNormalizer(vars);
  _normalizer && _normalizer.target === normalizer.target && _normalizer.kill();
  _isViewport2(normalizer.target) && (_normalizer = normalizer);
  return normalizer;
};
ScrollTrigger.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp,
  _inputObserver,
  _scrollers,
  _proxies,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function ss() {
      _lastScrollTime || _dispatch2("scrollStart");
      _lastScrollTime = _getTime();
    },
    // a way to get the _refreshing value in Observer
    ref: function ref2() {
      return _refreshing;
    }
  }
};
_getGSAP2() && gsap.registerPlugin(ScrollTrigger);
const _sfc_main$_ = {
  __name: "About",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    inject("siteTexts");
    gsapWithCSS.registerPlugin(ScrollTrigger);
    const heroHeadingParts = computed(() => {
      const parts = [];
      const before = getText("about.hero_heading_before", "Unique");
      const keyword = getText("about.hero_heading_keyword", "By Design");
      const after = getText("about.hero_heading_after", "");
      if (before && before.trim()) {
        parts.push({ text: before + " ", isKeyword: false });
      }
      if (keyword && keyword.trim()) {
        parts.push({ text: keyword, isKeyword: true });
      }
      if (after && after.trim()) {
        parts.push({ text: " " + after, isKeyword: false });
      }
      return parts;
    });
    const visionHeadingParts = computed(() => {
      const parts = [];
      const before = getText("about.vision_heading_before", "Our Vision for");
      const keyword = getText("about.vision_heading_keyword", "Individuality");
      const after = getText("about.vision_heading_after", "");
      if (before && before.trim()) {
        parts.push({ text: before + " ", isKeyword: false });
      }
      if (keyword && keyword.trim()) {
        parts.push({ text: keyword, isKeyword: true });
      }
      if (after && after.trim()) {
        parts.push({ text: " " + after, isKeyword: false });
      }
      return parts;
    });
    onMounted(() => {
      const canvas = document.getElementById("hero-canvas");
      if (!canvas) return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      for (let i2 = 0; i2 < 1200; i2++) {
        vertices.push(Math.random() * 2e3 - 1e3, Math.random() * 2e3 - 1e3, Math.random() * 2e3 - 1e3);
      }
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
      const material = new THREE.PointsMaterial({ color: 6963188, size: 2, transparent: true, opacity: 0.4 });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      camera.position.z = 600;
      function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 4e-4;
        particles.rotation.x += 1e-4;
        renderer.render(scene, camera);
      }
      animate();
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
      const mouseFollower = document.getElementById("mouse-follower");
      if (mouseFollower) {
        window.addEventListener("mousemove", (e2) => {
          gsapWithCSS.to(mouseFollower, {
            x: e2.clientX,
            y: e2.clientY,
            duration: 1,
            ease: "power2.out"
          });
        });
      }
      gsapWithCSS.utils.toArray(".reveal").forEach((el) => {
        gsapWithCSS.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%"
          }
        });
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-65ee555d${_scopeId}>About Us - Competition Engine</title><meta name="description" content="Meet the team behind Competition Engine — building next-generation ultimate competition software for operators worldwide." head-key="description" data-v-65ee555d${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "About Us - Competition Engine"),
              createVNode("meta", {
                name: "description",
                content: "Meet the team behind Competition Engine — building next-generation ultimate competition software for operators worldwide.",
                "head-key": "description"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="about-page" data-v-65ee555d${_scopeId}><div class="blob-container" data-v-65ee555d${_scopeId}><div class="blob blob1" data-v-65ee555d${_scopeId}></div><div class="blob blob2" data-v-65ee555d${_scopeId}></div></div><div id="mouse-follower" data-v-65ee555d${_scopeId}></div><main class="pt-32 pb-20" data-v-65ee555d${_scopeId}><canvas id="hero-canvas" class="hero-bg" data-v-65ee555d${_scopeId}></canvas><div class="container mx-auto px-6 relative z-10" data-v-65ee555d${_scopeId}><div class="text-center mb-24 reveal" data-v-65ee555d${_scopeId}><h1 class="text-6xl md:text-8xl font-extrabold text-white mb-6" data-v-65ee555d${_scopeId}><!--[-->`);
            ssrRenderList(heroHeadingParts.value, (part, index) => {
              _push2(`<!--[-->`);
              if (part.isKeyword) {
                _push2(`<span class="keyword-animate" data-v-65ee555d${_scopeId}>${ssrInterpolate(part.text)}</span>`);
              } else {
                _push2(`<!--[-->${ssrInterpolate(part.text)}<!--]-->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></h1><p class="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.hero_description", "Manchester-born, globally focused. Our vision is simple: every competition site deserves its own Unique Identity."))}</p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24" data-v-65ee555d${_scopeId}><div class="liquid-glass p-8 rounded-3xl reveal" data-v-65ee555d${_scopeId}><div class="text-[#FF9900] text-4xl mb-4 font-bold" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.value1_number", "01"))}</div><h3 class="text-2xl font-bold text-white mb-4" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.value1_title", "Zero Repetition"))}</h3><p class="text-gray-400 leading-relaxed" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.value1_description", 'We reject the "plugin-and-play" culture. Your brand is unique, and your platform should be a bespoke reflection of that vision.'))}</p></div><div class="liquid-glass p-8 rounded-3xl reveal" data-v-65ee555d${_scopeId}><div class="text-[#6A3FF4] text-4xl mb-4 font-bold" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.value2_number", "02"))}</div><h3 class="text-2xl font-bold text-white mb-4" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.value2_title", "Identity as Logic"))}</h3><p class="text-gray-400 leading-relaxed" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.value2_description", "Customisation isn't just skin deep. We build unique workflows, logic, and prize systems tailored specifically to your audience."))}</p></div><div class="liquid-glass p-8 rounded-3xl reveal" data-v-65ee555d${_scopeId}><div class="text-[#FF9900] text-4xl mb-4 font-bold" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.value3_number", "03"))}</div><h3 class="text-2xl font-bold text-white mb-4" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.value3_title", "Elite Experience"))}</h3><p class="text-gray-400 leading-relaxed" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.value3_description", "Every pixel is an opportunity to engage. We provide the tools to build immersive worlds, not just raffle listings."))}</p></div></div><div class="liquid-glass p-12 rounded-3xl mb-24 reveal" data-v-65ee555d${_scopeId}><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" data-v-65ee555d${_scopeId}><div data-v-65ee555d${_scopeId}><h2 class="text-4xl font-extrabold text-white mb-6" data-v-65ee555d${_scopeId}><!--[-->`);
            ssrRenderList(visionHeadingParts.value, (part, index) => {
              _push2(`<!--[-->`);
              if (part.isKeyword) {
                _push2(`<span class="text-[#FF9900]" data-v-65ee555d${_scopeId}>${ssrInterpolate(part.text)}</span>`);
              } else {
                _push2(`<!--[-->${ssrInterpolate(part.text)}<!--]-->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></h2><p class="text-gray-300 text-lg mb-6 leading-relaxed" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.vision_paragraph1", "The internet is becoming a sea of sameness. Competition Engine was founded to break the cycle of identical WordPress sites that all look, feel, and fail in the same way."))}</p><p class="text-gray-300 text-lg leading-relaxed" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.vision_paragraph2", "We give creators the power of elite-tier engineering while maintaining complete creative freedom. Our vision is to empower every site owner to stand out with a distinct digital footprint that is impossible to copy and hard to forget."))}</p></div><div class="relative h-64 lg:h-full bg-gradient-to-br from-[#6A3FF4]/20 to-transparent rounded-2xl overflow-hidden flex items-center justify-center border border-white/10" data-v-65ee555d${_scopeId}><div class="flex flex-col items-center" data-v-65ee555d${_scopeId}><div class="w-24 h-24 border-4 border-[#FF9900] rounded-full flex items-center justify-center animate-spin-slow mb-4" data-v-65ee555d${_scopeId}><div class="w-16 h-16 border-4 border-[#6A3FF4] rounded-full" data-v-65ee555d${_scopeId}></div></div><span class="text-xs font-mono text-gray-500 uppercase tracking-widest text-center" data-v-65ee555d${_scopeId}>Uniquely Crafted // 1 of 1</span></div></div></div></div><div class="text-center reveal" data-v-65ee555d${_scopeId}><h2 class="text-4xl md:text-5xl font-bold text-white mb-8" data-v-65ee555d${_scopeId}>${ssrInterpolate(unref(getText)("about.cta_heading", "Ready to build your identity?"))}</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/contact",
              class: "inline-block bg-[#6A3FF4] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#FF9900] transition-all duration-300 transform hover:scale-105 glow-button"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(getText)("about.cta_button", "Work With Us"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(getText)("about.cta_button", "Work With Us")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></main></div>`);
          } else {
            return [
              createVNode("div", { class: "about-page" }, [
                createVNode("div", { class: "blob-container" }, [
                  createVNode("div", { class: "blob blob1" }),
                  createVNode("div", { class: "blob blob2" })
                ]),
                createVNode("div", { id: "mouse-follower" }),
                createVNode("main", { class: "pt-32 pb-20" }, [
                  createVNode("canvas", {
                    id: "hero-canvas",
                    class: "hero-bg"
                  }),
                  createVNode("div", { class: "container mx-auto px-6 relative z-10" }, [
                    createVNode("div", { class: "text-center mb-24 reveal" }, [
                      createVNode("h1", { class: "text-6xl md:text-8xl font-extrabold text-white mb-6" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(heroHeadingParts.value, (part, index) => {
                          return openBlock(), createBlock(Fragment, {
                            key: `hero-heading-${index}`
                          }, [
                            part.isKeyword ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "keyword-animate"
                            }, toDisplayString(part.text), 1)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(part.text), 1)
                            ], 64))
                          ], 64);
                        }), 128))
                      ]),
                      createVNode("p", { class: "text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed" }, toDisplayString(unref(getText)("about.hero_description", "Manchester-born, globally focused. Our vision is simple: every competition site deserves its own Unique Identity.")), 1)
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-24" }, [
                      createVNode("div", { class: "liquid-glass p-8 rounded-3xl reveal" }, [
                        createVNode("div", { class: "text-[#FF9900] text-4xl mb-4 font-bold" }, toDisplayString(unref(getText)("about.value1_number", "01")), 1),
                        createVNode("h3", { class: "text-2xl font-bold text-white mb-4" }, toDisplayString(unref(getText)("about.value1_title", "Zero Repetition")), 1),
                        createVNode("p", { class: "text-gray-400 leading-relaxed" }, toDisplayString(unref(getText)("about.value1_description", 'We reject the "plugin-and-play" culture. Your brand is unique, and your platform should be a bespoke reflection of that vision.')), 1)
                      ]),
                      createVNode("div", { class: "liquid-glass p-8 rounded-3xl reveal" }, [
                        createVNode("div", { class: "text-[#6A3FF4] text-4xl mb-4 font-bold" }, toDisplayString(unref(getText)("about.value2_number", "02")), 1),
                        createVNode("h3", { class: "text-2xl font-bold text-white mb-4" }, toDisplayString(unref(getText)("about.value2_title", "Identity as Logic")), 1),
                        createVNode("p", { class: "text-gray-400 leading-relaxed" }, toDisplayString(unref(getText)("about.value2_description", "Customisation isn't just skin deep. We build unique workflows, logic, and prize systems tailored specifically to your audience.")), 1)
                      ]),
                      createVNode("div", { class: "liquid-glass p-8 rounded-3xl reveal" }, [
                        createVNode("div", { class: "text-[#FF9900] text-4xl mb-4 font-bold" }, toDisplayString(unref(getText)("about.value3_number", "03")), 1),
                        createVNode("h3", { class: "text-2xl font-bold text-white mb-4" }, toDisplayString(unref(getText)("about.value3_title", "Elite Experience")), 1),
                        createVNode("p", { class: "text-gray-400 leading-relaxed" }, toDisplayString(unref(getText)("about.value3_description", "Every pixel is an opportunity to engage. We provide the tools to build immersive worlds, not just raffle listings.")), 1)
                      ])
                    ]),
                    createVNode("div", { class: "liquid-glass p-12 rounded-3xl mb-24 reveal" }, [
                      createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-4xl font-extrabold text-white mb-6" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(visionHeadingParts.value, (part, index) => {
                              return openBlock(), createBlock(Fragment, {
                                key: `vision-heading-${index}`
                              }, [
                                part.isKeyword ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-[#FF9900]"
                                }, toDisplayString(part.text), 1)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(toDisplayString(part.text), 1)
                                ], 64))
                              ], 64);
                            }), 128))
                          ]),
                          createVNode("p", { class: "text-gray-300 text-lg mb-6 leading-relaxed" }, toDisplayString(unref(getText)("about.vision_paragraph1", "The internet is becoming a sea of sameness. Competition Engine was founded to break the cycle of identical WordPress sites that all look, feel, and fail in the same way.")), 1),
                          createVNode("p", { class: "text-gray-300 text-lg leading-relaxed" }, toDisplayString(unref(getText)("about.vision_paragraph2", "We give creators the power of elite-tier engineering while maintaining complete creative freedom. Our vision is to empower every site owner to stand out with a distinct digital footprint that is impossible to copy and hard to forget.")), 1)
                        ]),
                        createVNode("div", { class: "relative h-64 lg:h-full bg-gradient-to-br from-[#6A3FF4]/20 to-transparent rounded-2xl overflow-hidden flex items-center justify-center border border-white/10" }, [
                          createVNode("div", { class: "flex flex-col items-center" }, [
                            createVNode("div", { class: "w-24 h-24 border-4 border-[#FF9900] rounded-full flex items-center justify-center animate-spin-slow mb-4" }, [
                              createVNode("div", { class: "w-16 h-16 border-4 border-[#6A3FF4] rounded-full" })
                            ]),
                            createVNode("span", { class: "text-xs font-mono text-gray-500 uppercase tracking-widest text-center" }, "Uniquely Crafted // 1 of 1")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "text-center reveal" }, [
                      createVNode("h2", { class: "text-4xl md:text-5xl font-bold text-white mb-8" }, toDisplayString(unref(getText)("about.cta_heading", "Ready to build your identity?")), 1),
                      createVNode(unref(Link), {
                        href: "/contact",
                        class: "inline-block bg-[#6A3FF4] text-white font-bold px-10 py-4 rounded-xl hover:bg-[#FF9900] transition-all duration-300 transform hover:scale-105 glow-button"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(getText)("about.cta_button", "Work With Us")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/About.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const About = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-65ee555d"]]);
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$Z = {};
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 316 316",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path d="M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.875 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.185 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z"></path></svg>`);
}
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const ApplicationLogo = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["ssrRender", _sfc_ssrRender$d]]);
const _sfc_main$Y = {
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0" }, _attrs))}><div>`);
      _push(ssrRenderComponent(unref(Link), { href: "/" }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "h-20 w-20 fill-current text-gray-500" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ApplicationLogo, { class: "h-20 w-20 fill-current text-gray-500" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const _sfc_main$X = {
  __name: "InputError",
  __ssrInlineRender: true,
  props: {
    message: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps(_attrs, {
        style: __props.message ? null : { display: "none" }
      }))}><p class="text-sm text-red-600">${ssrInterpolate(__props.message)}</p></div>`);
    };
  }
};
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputError.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const _sfc_main$W = {
  __name: "InputLabel",
  __ssrInlineRender: true,
  props: {
    value: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "block text-sm font-medium text-gray-700" }, _attrs))}>`);
      if (__props.value) {
        _push(`<span>${ssrInterpolate(__props.value)}</span>`);
      } else {
        _push(`<span>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</span>`);
      }
      _push(`</label>`);
    };
  }
};
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputLabel.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const _sfc_main$V = {};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</button>`);
}
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PrimaryButton.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const PrimaryButton = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["ssrRender", _sfc_ssrRender$c]]);
const _sfc_main$U = {
  __name: "TextInput",
  __ssrInlineRender: true,
  props: {
    "modelValue": {
      type: String,
      required: true
    },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    const model = useModel(__props, "modelValue");
    const input = ref(null);
    onMounted(() => {
      if (input.value.hasAttribute("autofocus")) {
        input.value.focus();
      }
    });
    __expose({ focus: () => input.value.focus() });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        class: "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500",
        ref_key: "input",
        ref: input
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, model.value))))}>`);
    };
  }
};
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextInput.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const _sfc_main$T = {
  __name: "ConfirmPassword",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      password: ""
    });
    const submit = () => {
      form.post(route("password.confirm"), {
        onFinish: () => form.reset()
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$Y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Confirm Password" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> This is a secure area of the application. Please confirm your password before continuing. </div><form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              class: ["ms-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Confirm `);
                } else {
                  return [
                    createTextVNode(" Confirm ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Confirm Password" }),
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " This is a secure area of the application. Please confirm your password before continuing. "),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$W, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4 flex justify-end" }, [
                  createVNode(PrimaryButton, {
                    class: ["ms-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Confirm ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$T
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$S = {
  __name: "ForgotPassword",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    const form = useForm({
      email: ""
    });
    const submit = () => {
      form.post(route("password.email"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$Y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Forgot Password" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. </div>`);
            if (__props.status) {
              _push2(`<div class="mb-4 text-sm font-medium text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 flex items-center justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Email Password Reset Link `);
                } else {
                  return [
                    createTextVNode(" Email Password Reset Link ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Forgot Password" }),
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one. "),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-sm font-medium text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$W, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                  createVNode(PrimaryButton, {
                    class: { "opacity-25": unref(form).processing },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Email Password Reset Link ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$S
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$R = {
  __name: "Checkbox",
  __ssrInlineRender: true,
  props: {
    checked: {
      type: [Array, Boolean],
      required: true
    },
    value: {
      default: null
    }
  },
  emits: ["update:checked"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const proxyChecked = computed({
      get() {
        return props.checked;
      },
      set(val) {
        emit("update:checked", val);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        type: "checkbox",
        value: __props.value,
        checked: Array.isArray(proxyChecked.value) ? ssrLooseContain(proxyChecked.value, __props.value) : proxyChecked.value,
        class: "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, proxyChecked.value))))}>`);
    };
  }
};
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const _sfc_main$Q = {
  __name: "Login",
  __ssrInlineRender: true,
  props: {
    canResetPassword: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  setup(__props) {
    const form = useForm({
      email: "",
      password: "",
      remember: false
    });
    const submit = () => {
      form.post(route("login"), {
        onFinish: () => form.reset("password")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$Y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Log in" }, null, _parent2, _scopeId));
            if (__props.status) {
              _push2(`<div class="mb-4 text-sm font-medium text-green-600"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/",
              class: "inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId2}></path></svg> Back to Homepage `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ])),
                    createTextVNode(" Back to Homepage ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full text-gray-900",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              class: "mt-2",
              message: (_a = unref(form).errors) == null ? void 0 : _a.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full text-gray-900",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              class: "mt-2",
              message: (_b = unref(form).errors) == null ? void 0 : _b.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 block"${_scopeId}><label class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$R, {
              name: "remember",
              checked: unref(form).remember,
              "onUpdate:checked": ($event) => unref(form).remember = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="ms-2 text-sm text-gray-600"${_scopeId}>Remember me</span></label></div><div class="mt-4 flex items-center justify-end"${_scopeId}>`);
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request"),
                class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Forgot your password? `);
                  } else {
                    return [
                      createTextVNode(" Forgot your password? ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(PrimaryButton, {
              class: ["ms-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log in `);
                } else {
                  return [
                    createTextVNode(" Log in ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Log in" }),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-sm font-medium text-green-600"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("div", { class: "mb-4" }, [
                createVNode(unref(Link), {
                  href: "/",
                  class: "inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ])),
                    createTextVNode(" Back to Homepage ")
                  ]),
                  _: 1
                })
              ]),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$W, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full text-gray-900",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    class: "mt-2",
                    message: (_c = unref(form).errors) == null ? void 0 : _c.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$W, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full text-gray-900",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    class: "mt-2",
                    message: (_d = unref(form).errors) == null ? void 0 : _d.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4 block" }, [
                  createVNode("label", { class: "flex items-center" }, [
                    createVNode(_sfc_main$R, {
                      name: "remember",
                      checked: unref(form).remember,
                      "onUpdate:checked": ($event) => unref(form).remember = $event
                    }, null, 8, ["checked", "onUpdate:checked"]),
                    createVNode("span", { class: "ms-2 text-sm text-gray-600" }, "Remember me")
                  ])
                ]),
                createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                  __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("password.request"),
                    class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Forgot your password? ")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true),
                  createVNode(PrimaryButton, {
                    class: ["ms-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Log in ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$Q
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$P = {
  __name: "Register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("register"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$Y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Register" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "name",
              value: "Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "name",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              autofocus: "",
              autocomplete: "name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 flex items-center justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("login"),
              class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Already registered? `);
                } else {
                  return [
                    createTextVNode(" Already registered? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(PrimaryButton, {
              class: ["ms-4", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Register `);
                } else {
                  return [
                    createTextVNode(" Register ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Register" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$W, {
                    for: "name",
                    value: "Name"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "name",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    class: "mt-2",
                    message: unref(form).errors.name
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$W, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$W, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$W, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "password_confirmation",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    class: "mt-2",
                    message: unref(form).errors.password_confirmation
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                  createVNode(unref(Link), {
                    href: _ctx.route("login"),
                    class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Already registered? ")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode(PrimaryButton, {
                    class: ["ms-4", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Register ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$P
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$O = {
  __name: "ResetPassword",
  __ssrInlineRender: true,
  props: {
    email: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      token: props.token,
      email: props.email,
      password: "",
      password_confirmation: ""
    });
    const submit = () => {
      form.post(route("password.store"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$Y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Reset Password" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              class: "mt-2",
              message: unref(form).errors.password_confirmation
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 flex items-center justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Reset Password `);
                } else {
                  return [
                    createTextVNode(" Reset Password ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Reset Password" }),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode(_sfc_main$W, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$W, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$W, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "password_confirmation",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    class: "mt-2",
                    message: unref(form).errors.password_confirmation
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4 flex items-center justify-end" }, [
                  createVNode(PrimaryButton, {
                    class: { "opacity-25": unref(form).processing },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Reset Password ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$O
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$N = {
  __name: "VerifyEmail",
  __ssrInlineRender: true,
  props: {
    status: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    const submit = () => {
      form.post(route("verification.send"));
    };
    const verificationLinkSent = computed(
      () => props.status === "verification-link-sent"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$Y, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Email Verification" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn&#39;t receive the email, we will gladly send you another. </div>`);
            if (verificationLinkSent.value) {
              _push2(`<div class="mb-4 text-sm font-medium text-green-600"${_scopeId}> A new verification link has been sent to the email address you provided during registration. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form${_scopeId}><div class="mt-4 flex items-center justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(PrimaryButton, {
              class: { "opacity-25": unref(form).processing },
              disabled: unref(form).processing
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Resend Verification Email `);
                } else {
                  return [
                    createTextVNode(" Resend Verification Email ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Log Out`);
                } else {
                  return [
                    createTextVNode("Log Out")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Email Verification" }),
              createVNode("div", { class: "mb-4 text-sm text-gray-600" }, " Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another. "),
              verificationLinkSent.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 text-sm font-medium text-green-600"
              }, " A new verification link has been sent to the email address you provided during registration. ")) : createCommentVNode("", true),
              createVNode("form", {
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", { class: "mt-4 flex items-center justify-between" }, [
                  createVNode(PrimaryButton, {
                    class: { "opacity-25": unref(form).processing },
                    disabled: unref(form).processing
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Resend Verification Email ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"]),
                  createVNode(unref(Link), {
                    href: _ctx.route("logout"),
                    method: "post",
                    as: "button",
                    class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Log Out")
                    ]),
                    _: 1
                  }, 8, ["href"])
                ])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$N
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$M = {
  __name: "Blog",
  __ssrInlineRender: true,
  props: {
    posts: Array
  },
  setup(__props) {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Blog - Competition Engine</title><meta name="description" content="Insights, updates, and guides from the Competition Engine team." head-key="description"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Blog - Competition Engine"),
              createVNode("meta", {
                name: "description",
                content: "Insights, updates, and guides from the Competition Engine team.",
                "head-key": "description"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="min-h-screen pt-32 pb-20"${_scopeId}><div class="container mx-auto px-4 sm:px-6 max-w-4xl"${_scopeId}><div class="text-center mb-16"${_scopeId}><h1 class="text-4xl sm:text-5xl font-extrabold text-white mb-4"${_scopeId}>Blog</h1><p class="text-lg text-gray-400"${_scopeId}>Insights, updates, and guides from the Competition Engine team.</p></div>`);
            if (__props.posts.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-20"${_scopeId}> No posts published yet. </div>`);
            } else {
              _push2(`<div class="space-y-8"${_scopeId}><!--[-->`);
              ssrRenderList(__props.posts, (post) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: post.id,
                  href: `/blog/${post.slug}`,
                  class: "block liquid-glass rounded-2xl p-8 hover:border-accent-purple/50 transition-all duration-300 group"
                }, {
                  default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="text-sm text-gray-500 mb-2"${_scopeId2}>${ssrInterpolate(formatDate(post.published_at))}</p><h2 class="text-2xl font-bold text-white mb-3 group-hover:text-accent-purple transition-colors"${_scopeId2}>${ssrInterpolate(post.title)}</h2>`);
                      if (post.excerpt) {
                        _push3(`<p class="text-gray-400 leading-relaxed"${_scopeId2}>${ssrInterpolate(post.excerpt)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<span class="inline-block mt-4 text-accent-purple text-sm font-medium"${_scopeId2}>Read more →</span>`);
                    } else {
                      return [
                        createVNode("p", { class: "text-sm text-gray-500 mb-2" }, toDisplayString(formatDate(post.published_at)), 1),
                        createVNode("h2", { class: "text-2xl font-bold text-white mb-3 group-hover:text-accent-purple transition-colors" }, toDisplayString(post.title), 1),
                        post.excerpt ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-gray-400 leading-relaxed"
                        }, toDisplayString(post.excerpt), 1)) : createCommentVNode("", true),
                        createVNode("span", { class: "inline-block mt-4 text-accent-purple text-sm font-medium" }, "Read more →")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("section", { class: "min-h-screen pt-32 pb-20" }, [
                createVNode("div", { class: "container mx-auto px-4 sm:px-6 max-w-4xl" }, [
                  createVNode("div", { class: "text-center mb-16" }, [
                    createVNode("h1", { class: "text-4xl sm:text-5xl font-extrabold text-white mb-4" }, "Blog"),
                    createVNode("p", { class: "text-lg text-gray-400" }, "Insights, updates, and guides from the Competition Engine team.")
                  ]),
                  __props.posts.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center text-gray-500 py-20"
                  }, " No posts published yet. ")) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-8"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.posts, (post) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: post.id,
                        href: `/blog/${post.slug}`,
                        class: "block liquid-glass rounded-2xl p-8 hover:border-accent-purple/50 transition-all duration-300 group"
                      }, {
                        default: withCtx(() => [
                          createVNode("p", { class: "text-sm text-gray-500 mb-2" }, toDisplayString(formatDate(post.published_at)), 1),
                          createVNode("h2", { class: "text-2xl font-bold text-white mb-3 group-hover:text-accent-purple transition-colors" }, toDisplayString(post.title), 1),
                          post.excerpt ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-gray-400 leading-relaxed"
                          }, toDisplayString(post.excerpt), 1)) : createCommentVNode("", true),
                          createVNode("span", { class: "inline-block mt-4 text-accent-purple text-sm font-medium" }, "Read more →")
                        ]),
                        _: 2
                      }, 1032, ["href"]);
                    }), 128))
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Blog.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$M
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$L = {
  __name: "BlogShow",
  __ssrInlineRender: true,
  props: {
    post: Object
  },
  setup(__props) {
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(__props.post.title)} - Competition Engine Blog</title><meta name="description"${ssrRenderAttr("content", __props.post.excerpt || __props.post.title)} head-key="description"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.post.title) + " - Competition Engine Blog", 1),
              createVNode("meta", {
                name: "description",
                content: __props.post.excerpt || __props.post.title,
                "head-key": "description"
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="min-h-screen pt-32 pb-20"${_scopeId}><div class="container mx-auto px-4 sm:px-6 max-w-3xl"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/blog",
              class: "inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-10 text-sm"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` ← Back to Blog `);
                } else {
                  return [
                    createTextVNode(" ← Back to Blog ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<article${_scopeId}><p class="text-sm text-gray-500 mb-3"${_scopeId}>${ssrInterpolate(formatDate(__props.post.published_at))}</p><h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight"${_scopeId}>${ssrInterpolate(__props.post.title)}</h1>`);
            if (__props.post.excerpt) {
              _push2(`<p class="text-lg text-gray-400 mb-10 pb-10 border-b border-gray-800"${_scopeId}>${ssrInterpolate(__props.post.excerpt)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="blog-content"${_scopeId}>${__props.post.content ?? ""}</div></article></div></section>`);
          } else {
            return [
              createVNode("section", { class: "min-h-screen pt-32 pb-20" }, [
                createVNode("div", { class: "container mx-auto px-4 sm:px-6 max-w-3xl" }, [
                  createVNode(unref(Link), {
                    href: "/blog",
                    class: "inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-10 text-sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" ← Back to Blog ")
                    ]),
                    _: 1
                  }),
                  createVNode("article", null, [
                    createVNode("p", { class: "text-sm text-gray-500 mb-3" }, toDisplayString(formatDate(__props.post.published_at)), 1),
                    createVNode("h1", { class: "text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight" }, toDisplayString(__props.post.title), 1),
                    __props.post.excerpt ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-lg text-gray-400 mb-10 pb-10 border-b border-gray-800"
                    }, toDisplayString(__props.post.excerpt), 1)) : createCommentVNode("", true),
                    createVNode("div", {
                      class: "blog-content",
                      innerHTML: __props.post.content
                    }, null, 8, ["innerHTML"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/BlogShow.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$L
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "Changelog",
  __ssrInlineRender: true,
  props: {
    initialMonths: {},
    categories: {},
    isAdmin: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const entries = ref([]);
    const months = ref(props.initialMonths);
    const loading = ref(false);
    const activeMonth = ref(props.initialMonths[0] ?? "");
    const activeCategory = ref("all");
    const categoryOptions = computed(() => {
      const base = [
        { value: "all", label: "All" },
        { value: "feature", label: "Features" },
        { value: "improvement", label: "Improvements" }
      ];
      if (!props.isAdmin) return base;
      return [
        ...base,
        { value: "hub", label: "Hub Messages" }
      ];
    });
    const monthHeading = computed(() => {
      if (!activeMonth.value) return "";
      const [y2, m2] = activeMonth.value.split("-");
      const d2 = new Date(Number(y2), Number(m2) - 1, 1);
      return d2.toLocaleString("en-GB", { month: "short" }).toUpperCase() + " " + y2;
    });
    function fmtMonthLabel(ym) {
      const [y2, m2] = ym.split("-");
      const d2 = new Date(Number(y2), Number(m2) - 1, 1);
      return d2.toLocaleString("en-GB", { month: "short" }) + " " + y2;
    }
    function pillStyle(meta) {
      return {
        background: `rgba(${meta.bg},0.15)`,
        color: meta.color,
        border: `1px solid rgba(${meta.bg},0.3)`
      };
    }
    async function load() {
      loading.value = true;
      const params = {};
      if (activeMonth.value) {
        const [y2, m2] = activeMonth.value.split("-");
        params.year = y2;
        params.month = m2;
      }
      if (activeCategory.value && activeCategory.value !== "all") {
        params.category = activeCategory.value;
      }
      try {
        const { data } = await axios.get("/changelog/data", { params });
        entries.value = data.entries;
        months.value = data.months;
        if (!activeMonth.value && data.months.length) {
          activeMonth.value = data.months[0];
        }
      } catch {
        entries.value = [];
      } finally {
        loading.value = false;
      }
    }
    function selectMonth(ym) {
      activeMonth.value = ym;
      load();
    }
    function selectCategory(val) {
      activeCategory.value = val;
      load();
    }
    onMounted(() => load());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Contact Us - Competition Engine" }, null, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen" style="${ssrRenderStyle({ "background": "#0d0d0f", "color": "#ededed", "font-family": "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" })}" data-v-caebb0c0${_scopeId}><div class="max-w-3xl mx-auto px-5 pb-24 pt-10" data-v-caebb0c0${_scopeId}><div class="text-center pt-20 pb-12" data-v-caebb0c0${_scopeId}><h1 class="text-5xl font-black tracking-tight mb-3" data-v-caebb0c0${_scopeId}><span style="${ssrRenderStyle({ "background": "linear-gradient(90deg,#818cf8,rgb(139,107,191),#f4bc72)", "-webkit-background-clip": "text", "-webkit-text-fill-color": "transparent" })}" data-v-caebb0c0${_scopeId}> Changelog </span></h1></div><div class="flex flex-wrap items-center gap-2 mb-8" data-v-caebb0c0${_scopeId}><!--[-->`);
            ssrRenderList(months.value, (ym) => {
              _push2(`<button class="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors" style="${ssrRenderStyle(activeMonth.value === ym ? { background: "rgb(139,107,191)", color: "#0d0d0f" } : { background: "#1a1a1f", color: "#9ca3af" })}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(fmtMonthLabel(ym))}</button>`);
            });
            _push2(`<!--]--><div class="w-px h-5 hidden sm:block" style="${ssrRenderStyle({ "background": "rgba(255,255,255,0.1)" })}" data-v-caebb0c0${_scopeId}></div><!--[-->`);
            ssrRenderList(categoryOptions.value, (opt) => {
              _push2(`<button class="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border" style="${ssrRenderStyle(activeCategory.value === opt.value ? { background: "rgba(139,107,191,0.2)", color: "rgb(139,107,191)", borderColor: "rgba(139,107,191,0.4)" } : { background: "transparent", color: "#6b7280", borderColor: "rgba(255,255,255,0.08)" })}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(opt.label)}</button>`);
            });
            _push2(`<!--]--></div><div class="flex items-baseline justify-between mb-5" data-v-caebb0c0${_scopeId}><h2 class="text-xs font-bold tracking-widest uppercase" style="${ssrRenderStyle({ "color": "#6b7280" })}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(monthHeading.value)}</h2><span class="text-xs" style="${ssrRenderStyle({ "color": "#4b5563" })}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(entries.value.length)} updates</span></div>`);
            if (loading.value) {
              _push2(`<div class="flex justify-center py-16" data-v-caebb0c0${_scopeId}><div class="w-5 h-5 rounded-full animate-spin" style="${ssrRenderStyle({ "border": "2px solid rgba(255,255,255,0.1)", "border-top-color": "white" })}" data-v-caebb0c0${_scopeId}></div></div>`);
            } else if (!entries.value.length) {
              _push2(`<div class="text-center py-20" style="${ssrRenderStyle({ "color": "#4b5563" })}" data-v-caebb0c0${_scopeId}> No updates yet. </div>`);
            } else {
              _push2(`<div class="relative pl-8" data-v-caebb0c0${_scopeId}><div class="absolute left-0 top-0 bottom-0 w-px" style="${ssrRenderStyle({ "background": "rgba(255,255,255,0.06)" })}" data-v-caebb0c0${_scopeId}></div><!--[-->`);
              ssrRenderList(entries.value, (entry, i2) => {
                _push2(`<!--[-->`);
                if (entry.source === "authored") {
                  _push2(`<div style="${ssrRenderStyle([{ "background": "#111317", "border-color": "rgba(255,255,255,0.07)" }, { animationDelay: `${i2 * 25}ms` }])}" class="${ssrRenderClass([i2 < 10 ? "fade-up" : "", "mb-4 p-5 rounded-2xl border changelog-card"])}" data-v-caebb0c0${_scopeId}><div class="flex flex-wrap items-center gap-2 mb-3" data-v-caebb0c0${_scopeId}><span class="pill" style="${ssrRenderStyle({ "background": "rgba(139,107,191,0.15)", "color": "rgb(139,107,191)", "border": "1px solid rgba(139,107,191,0.3)" })}" data-v-caebb0c0${_scopeId}>Notice</span><span class="pill" style="${ssrRenderStyle(pillStyle(entry.meta))}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(entry.meta.label)}</span>`);
                  if (entry.resolved) {
                    _push2(`<span class="pill" style="${ssrRenderStyle({ "background": "rgba(34,197,94,0.12)", "color": "#4ade80", "border": "1px solid rgba(34,197,94,0.25)" })}" data-v-caebb0c0${_scopeId}>Resolved</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="flex-1" data-v-caebb0c0${_scopeId}></span><span class="text-xs" style="${ssrRenderStyle({ "color": "#6b7280" })}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(entry.date_label)}</span></div><h3 class="text-base font-semibold mb-1.5 leading-snug" style="${ssrRenderStyle({ "color": "#ededed" })}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(entry.title)}</h3>`);
                  if (entry.body) {
                    _push2(`<p class="text-sm leading-relaxed" style="${ssrRenderStyle({ "color": "#9ca3af" })}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(entry.body)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else if (entry.source === "commit") {
                  _push2(`<div style="${ssrRenderStyle([{ "background": "#111317", "border-color": "rgba(255,255,255,0.07)" }, { animationDelay: `${i2 * 25}ms` }])}" class="${ssrRenderClass([i2 < 10 ? "fade-up" : "", "mb-4 p-5 rounded-2xl border changelog-card"])}" data-v-caebb0c0${_scopeId}><div class="flex flex-wrap items-center gap-2 mb-3" data-v-caebb0c0${_scopeId}><span class="pill" style="${ssrRenderStyle(pillStyle(entry.meta))}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(entry.meta.label)}</span>`);
                  if (entry.tenants) {
                    _push2(`<!--[-->`);
                    ssrRenderList(entry.tenants.filter((t3) => t3 !== "all"), (t3) => {
                      _push2(`<span class="pill" style="${ssrRenderStyle({ "background": "rgba(91,141,238,0.1)", "color": "#7fa8f5", "border": "1px solid rgba(91,141,238,0.22)" })}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(t3)}</span>`);
                    });
                    _push2(`<!--]-->`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span class="flex-1" data-v-caebb0c0${_scopeId}></span><span class="text-xs" style="${ssrRenderStyle({ "color": "#6b7280" })}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(entry.date_label)}</span></div><h3 class="text-base font-semibold mb-1.5 leading-snug" style="${ssrRenderStyle({ "color": "#ededed" })}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(entry.title)}</h3>`);
                  if (entry.body) {
                    _push2(`<p class="text-sm leading-relaxed" style="${ssrRenderStyle({ "color": "#9ca3af" })}" data-v-caebb0c0${_scopeId}>${ssrInterpolate(entry.body)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", {
                class: "min-h-screen",
                style: { "background": "#0d0d0f", "color": "#ededed", "font-family": "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }
              }, [
                createVNode("div", { class: "max-w-3xl mx-auto px-5 pb-24 pt-10" }, [
                  createVNode("div", { class: "text-center pt-20 pb-12" }, [
                    createVNode("h1", { class: "text-5xl font-black tracking-tight mb-3" }, [
                      createVNode("span", { style: { "background": "linear-gradient(90deg,#818cf8,rgb(139,107,191),#f4bc72)", "-webkit-background-clip": "text", "-webkit-text-fill-color": "transparent" } }, " Changelog ")
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-wrap items-center gap-2 mb-8" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(months.value, (ym) => {
                      return openBlock(), createBlock("button", {
                        key: ym,
                        class: "px-4 py-1.5 rounded-full text-sm font-semibold transition-colors",
                        style: activeMonth.value === ym ? { background: "rgb(139,107,191)", color: "#0d0d0f" } : { background: "#1a1a1f", color: "#9ca3af" },
                        onClick: ($event) => selectMonth(ym)
                      }, toDisplayString(fmtMonthLabel(ym)), 13, ["onClick"]);
                    }), 128)),
                    createVNode("div", {
                      class: "w-px h-5 hidden sm:block",
                      style: { "background": "rgba(255,255,255,0.1)" }
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(categoryOptions.value, (opt) => {
                      return openBlock(), createBlock("button", {
                        key: opt.value,
                        class: "px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border",
                        style: activeCategory.value === opt.value ? { background: "rgba(139,107,191,0.2)", color: "rgb(139,107,191)", borderColor: "rgba(139,107,191,0.4)" } : { background: "transparent", color: "#6b7280", borderColor: "rgba(255,255,255,0.08)" },
                        onClick: ($event) => selectCategory(opt.value)
                      }, toDisplayString(opt.label), 13, ["onClick"]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "flex items-baseline justify-between mb-5" }, [
                    createVNode("h2", {
                      class: "text-xs font-bold tracking-widest uppercase",
                      style: { "color": "#6b7280" }
                    }, toDisplayString(monthHeading.value), 1),
                    createVNode("span", {
                      class: "text-xs",
                      style: { "color": "#4b5563" }
                    }, toDisplayString(entries.value.length) + " updates", 1)
                  ]),
                  loading.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-16"
                  }, [
                    createVNode("div", {
                      class: "w-5 h-5 rounded-full animate-spin",
                      style: { "border": "2px solid rgba(255,255,255,0.1)", "border-top-color": "white" }
                    })
                  ])) : !entries.value.length ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-20",
                    style: { "color": "#4b5563" }
                  }, " No updates yet. ")) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "relative pl-8"
                  }, [
                    createVNode("div", {
                      class: "absolute left-0 top-0 bottom-0 w-px",
                      style: { "background": "rgba(255,255,255,0.06)" }
                    }),
                    (openBlock(true), createBlock(Fragment, null, renderList(entries.value, (entry, i2) => {
                      return openBlock(), createBlock(Fragment, {
                        key: "sha" in entry ? entry.sha : entry.id
                      }, [
                        entry.source === "authored" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: ["mb-4 p-5 rounded-2xl border changelog-card", i2 < 10 ? "fade-up" : ""],
                          style: [{ "background": "#111317", "border-color": "rgba(255,255,255,0.07)" }, { animationDelay: `${i2 * 25}ms` }]
                        }, [
                          createVNode("div", { class: "flex flex-wrap items-center gap-2 mb-3" }, [
                            createVNode("span", {
                              class: "pill",
                              style: { "background": "rgba(139,107,191,0.15)", "color": "rgb(139,107,191)", "border": "1px solid rgba(139,107,191,0.3)" }
                            }, "Notice"),
                            createVNode("span", {
                              class: "pill",
                              style: pillStyle(entry.meta)
                            }, toDisplayString(entry.meta.label), 5),
                            entry.resolved ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "pill",
                              style: { "background": "rgba(34,197,94,0.12)", "color": "#4ade80", "border": "1px solid rgba(34,197,94,0.25)" }
                            }, "Resolved")) : createCommentVNode("", true),
                            createVNode("span", { class: "flex-1" }),
                            createVNode("span", {
                              class: "text-xs",
                              style: { "color": "#6b7280" }
                            }, toDisplayString(entry.date_label), 1)
                          ]),
                          createVNode("h3", {
                            class: "text-base font-semibold mb-1.5 leading-snug",
                            style: { "color": "#ededed" }
                          }, toDisplayString(entry.title), 1),
                          entry.body ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm leading-relaxed",
                            style: { "color": "#9ca3af" }
                          }, toDisplayString(entry.body), 1)) : createCommentVNode("", true)
                        ], 6)) : entry.source === "commit" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: ["mb-4 p-5 rounded-2xl border changelog-card", i2 < 10 ? "fade-up" : ""],
                          style: [{ "background": "#111317", "border-color": "rgba(255,255,255,0.07)" }, { animationDelay: `${i2 * 25}ms` }]
                        }, [
                          createVNode("div", { class: "flex flex-wrap items-center gap-2 mb-3" }, [
                            createVNode("span", {
                              class: "pill",
                              style: pillStyle(entry.meta)
                            }, toDisplayString(entry.meta.label), 5),
                            entry.tenants ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(entry.tenants.filter((t3) => t3 !== "all"), (t3) => {
                              return openBlock(), createBlock("span", {
                                key: t3,
                                class: "pill",
                                style: { "background": "rgba(91,141,238,0.1)", "color": "#7fa8f5", "border": "1px solid rgba(91,141,238,0.22)" }
                              }, toDisplayString(t3), 1);
                            }), 128)) : createCommentVNode("", true),
                            createVNode("span", { class: "flex-1" }),
                            createVNode("span", {
                              class: "text-xs",
                              style: { "color": "#6b7280" }
                            }, toDisplayString(entry.date_label), 1)
                          ]),
                          createVNode("h3", {
                            class: "text-base font-semibold mb-1.5 leading-snug",
                            style: { "color": "#ededed" }
                          }, toDisplayString(entry.title), 1),
                          entry.body ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm leading-relaxed",
                            style: { "color": "#9ca3af" }
                          }, toDisplayString(entry.body), 1)) : createCommentVNode("", true)
                        ], 6)) : createCommentVNode("", true)
                      ], 64);
                    }), 128))
                  ]))
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Changelog.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const Changelog = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["__scopeId", "data-v-caebb0c0"]]);
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Changelog
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$J = {
  __name: "Password",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({ password: "" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Changelog" }, null, _parent));
      _push(`<div class="min-h-screen flex items-center justify-center" style="${ssrRenderStyle({ "background-color": "#1B142C" })}"><div class="w-full max-w-sm px-6"><div class="text-center mb-8"><h1 class="text-2xl font-bold text-white">Changelog</h1><p class="text-gray-400 mt-2 text-sm">Enter the password to view the changelog.</p></div><form class="space-y-4"><div><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="Password" autofocus class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">`);
      if (unref(form).errors.password) {
        _push(`<p class="text-red-400 text-sm mt-2">${ssrInterpolate(unref(form).errors.password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} style="${ssrRenderStyle({ "background-color": "#6A3FF4" })}" class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": unref(form).processing }, "w-full py-3 px-4 rounded-lg font-semibold text-white transition"])}">${ssrInterpolate(unref(form).processing ? "Checking..." : "Continue")}</button></form></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Changelog/Password.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$J
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$I = {
  __name: "Contact",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    inject("siteTexts");
    const heroHeadingParts = computed(() => {
      const parts = [];
      const before = getText("contact.hero_heading_before", "Let's");
      const keyword = getText("contact.hero_heading_keyword", "Connect");
      const after = getText("contact.hero_heading_after", "");
      if (before && before.trim()) {
        parts.push({ text: before + " ", isKeyword: false });
      }
      if (keyword && keyword.trim()) {
        parts.push({ text: keyword, isKeyword: true });
      }
      if (after && after.trim()) {
        parts.push({ text: " " + after, isKeyword: false });
      }
      return parts;
    });
    const form = ref({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: ""
    });
    const showSuccess = ref(false);
    const isSubmitting = ref(false);
    const errorMessage = ref("");
    const submitForm = async () => {
      var _a, _b;
      if (isSubmitting.value) return;
      errorMessage.value = "";
      isSubmitting.value = true;
      try {
        const response = await axios.post("/api/contact", form.value);
        if (response.data.success) {
          showSuccess.value = true;
          form.value = {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            message: ""
          };
          setTimeout(() => {
            showSuccess.value = false;
          }, 5e3);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        errorMessage.value = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "There was an error submitting your message. Please try again.";
      } finally {
        isSubmitting.value = false;
      }
    };
    onMounted(() => {
      const canvas = document.getElementById("hero-canvas");
      if (!canvas) return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1e3);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      for (let i2 = 0; i2 < 1e3; i2++) {
        vertices.push(Math.random() * 2e3 - 1e3, Math.random() * 2e3 - 1e3, Math.random() * 2e3 - 1e3);
      }
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
      const material = new THREE.PointsMaterial({ color: 6963188, size: 2, transparent: true, opacity: 0.5 });
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      camera.position.z = 500;
      function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 5e-4;
        renderer.render(scene, camera);
      }
      animate();
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
      const mouseFollower = document.getElementById("mouse-follower");
      if (mouseFollower) {
        window.addEventListener("mousemove", (e2) => {
          gsapWithCSS.to(mouseFollower, {
            x: e2.clientX,
            y: e2.clientY,
            duration: 0.8,
            ease: "power2.out"
          });
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title data-v-7e550bc2${_scopeId}>Contact Us - Competition Engine</title><meta name="description" content="Get in touch with the Competition Engine team. Book a demo or ask how our competition platform can work for your business." head-key="description" data-v-7e550bc2${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Contact Us - Competition Engine"),
              createVNode("meta", {
                name: "description",
                content: "Get in touch with the Competition Engine team. Book a demo or ask how our competition platform can work for your business.",
                "head-key": "description"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(AppLayout, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="contact-page" data-v-7e550bc2${_scopeId}><div class="blob-container" data-v-7e550bc2${_scopeId}><div class="blob blob1" data-v-7e550bc2${_scopeId}></div><div class="blob blob2" data-v-7e550bc2${_scopeId}></div></div><div id="mouse-follower" data-v-7e550bc2${_scopeId}></div><main class="pt-32 pb-20" data-v-7e550bc2${_scopeId}><canvas id="hero-canvas" class="hero-bg" data-v-7e550bc2${_scopeId}></canvas><div class="container mx-auto px-6 relative z-10" data-v-7e550bc2${_scopeId}><div class="text-center mb-16" data-v-7e550bc2${_scopeId}><h1 class="text-5xl md:text-7xl font-extrabold text-white mb-4" data-v-7e550bc2${_scopeId}><!--[-->`);
            ssrRenderList(heroHeadingParts.value, (part, index) => {
              _push2(`<!--[-->`);
              if (part.isKeyword) {
                _push2(`<span class="keyword-animate" data-v-7e550bc2${_scopeId}>${ssrInterpolate(part.text)}</span>`);
              } else {
                _push2(`<!--[-->${ssrInterpolate(part.text)}<!--]-->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></h1><p class="text-xl text-gray-400 max-w-2xl mx-auto" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.hero_description", "Have questions about scaling your competition? Our experts are here to help you build the ultimate engagement machine."))}</p></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" data-v-7e550bc2${_scopeId}><div class="space-y-6" data-v-7e550bc2${_scopeId}><div class="liquid-glass p-8 rounded-2xl flex items-start space-x-6" data-v-7e550bc2${_scopeId}><div class="bg-[#6A3FF4]/20 p-4 rounded-xl flex-shrink-0" data-v-7e550bc2${_scopeId}><svg class="w-8 h-8 text-[#6A3FF4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7e550bc2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-7e550bc2${_scopeId}></path></svg></div><div data-v-7e550bc2${_scopeId}><h3 class="text-xl font-bold text-white mb-1" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.email_title", "Email Us"))}</h3><p class="text-gray-400" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.email_subtitle", "for all enquires please use the below email"))}</p><a${ssrRenderAttr("href", `mailto:${unref(getText)("contact.email_address", "contact@compengine.io")}`)} class="text-[#FF9900] font-semibold hover:underline block mt-2" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.email_address", "contact@compengine.io"))}</a></div></div><div class="liquid-glass p-8 rounded-2xl flex items-start space-x-6" data-v-7e550bc2${_scopeId}><div class="bg-[#FF9900]/20 p-4 rounded-xl flex-shrink-0" data-v-7e550bc2${_scopeId}><svg class="w-8 h-8 text-[#FF9900]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7e550bc2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-7e550bc2${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-7e550bc2${_scopeId}></path></svg></div><div data-v-7e550bc2${_scopeId}><h3 class="text-xl font-bold text-white mb-1" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.location_title", "Location"))}</h3><p class="text-gray-400" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.location_subtitle", "Visit us for a coffee and a demo"))}</p><address class="not-italic text-white mt-2" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.location_city", "Manchester"))}</address></div></div><div class="liquid-glass p-8 rounded-2xl flex items-start space-x-6" data-v-7e550bc2${_scopeId}><div class="bg-[#6A3FF4]/20 p-4 rounded-xl flex-shrink-0" data-v-7e550bc2${_scopeId}><svg class="w-8 h-8 text-[#6A3FF4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7e550bc2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" data-v-7e550bc2${_scopeId}></path></svg></div><div data-v-7e550bc2${_scopeId}><h3 class="text-xl font-bold text-white mb-1" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.chat_title", "Live Chat"))}</h3><p class="text-gray-400" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.chat_subtitle", "Available Mon-Fri, 9am - 6pm"))}</p><button class="text-[#FF9900] font-semibold hover:underline block mt-2" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.chat_button", "Start a conversation"))}</button></div></div></div><div class="liquid-glass p-8 md:p-12 rounded-3xl relative overflow-hidden" data-v-7e550bc2${_scopeId}>`);
            if (showSuccess.value) {
              _push2(`<div class="bg-green-500/20 border border-green-500 text-green-200 p-4 rounded-xl mb-6 text-center" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.form_success", "Thanks for reaching out! We'll be in touch shortly."))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (errorMessage.value) {
              _push2(`<div class="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-xl mb-6 text-center" data-v-7e550bc2${_scopeId}>${ssrInterpolate(errorMessage.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="space-y-6" data-v-7e550bc2${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-7e550bc2${_scopeId}><div class="space-y-2" data-v-7e550bc2${_scopeId}><label class="text-sm font-medium text-gray-400" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.form_first_name", "First Name"))} <span class="text-pink-500" data-v-7e550bc2${_scopeId}>*</span></label><input${ssrRenderAttr("value", form.value.first_name)} type="text" required${ssrRenderAttr("placeholder", unref(getText)("contact.form_first_name_placeholder", "John"))} class="contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all" data-v-7e550bc2${_scopeId}></div><div class="space-y-2" data-v-7e550bc2${_scopeId}><label class="text-sm font-medium text-gray-400" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.form_last_name", "Last Name"))} <span class="text-pink-500" data-v-7e550bc2${_scopeId}>*</span></label><input${ssrRenderAttr("value", form.value.last_name)} type="text" required${ssrRenderAttr("placeholder", unref(getText)("contact.form_last_name_placeholder", "Doe"))} class="contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all" data-v-7e550bc2${_scopeId}></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-7e550bc2${_scopeId}><div class="space-y-2" data-v-7e550bc2${_scopeId}><label class="text-sm font-medium text-gray-400" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.form_email", "Email Address"))} <span class="text-pink-500" data-v-7e550bc2${_scopeId}>*</span></label><input${ssrRenderAttr("value", form.value.email)} type="email" required${ssrRenderAttr("placeholder", unref(getText)("contact.form_email_placeholder", "john@company.com"))} class="contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all" data-v-7e550bc2${_scopeId}></div><div class="space-y-2" data-v-7e550bc2${_scopeId}><label class="text-sm font-medium text-gray-400" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.form_phone", "Phone Number"))} <span class="text-pink-500" data-v-7e550bc2${_scopeId}>*</span></label><input${ssrRenderAttr("value", form.value.phone)} type="tel" required${ssrRenderAttr("placeholder", unref(getText)("contact.form_phone_placeholder", "+44 0000 000000"))} class="contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all" data-v-7e550bc2${_scopeId}></div></div><div class="space-y-2" data-v-7e550bc2${_scopeId}><label class="text-sm font-medium text-gray-400" data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.form_message", "Message"))} <span class="text-pink-500" data-v-7e550bc2${_scopeId}>*</span></label><textarea rows="5" required${ssrRenderAttr("placeholder", unref(getText)("contact.form_message_placeholder", "How can we help your competition business grow?"))} class="contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all" data-v-7e550bc2${_scopeId}>${ssrInterpolate(form.value.message)}</textarea></div><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="w-full bg-[#6A3FF4] text-white font-bold py-4 rounded-xl hover:bg-[#FF9900] transition-all duration-300 transform hover:scale-[1.02] glow-button flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed" data-v-7e550bc2${_scopeId}>`);
            if (!isSubmitting.value) {
              _push2(`<span data-v-7e550bc2${_scopeId}>${ssrInterpolate(unref(getText)("contact.form_button", "Send Message"))}</span>`);
            } else {
              _push2(`<span data-v-7e550bc2${_scopeId}>Sending...</span>`);
            }
            if (!isSubmitting.value) {
              _push2(`<svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-7e550bc2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" data-v-7e550bc2${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</button></form></div></div></div></main></div>`);
          } else {
            return [
              createVNode("div", { class: "contact-page" }, [
                createVNode("div", { class: "blob-container" }, [
                  createVNode("div", { class: "blob blob1" }),
                  createVNode("div", { class: "blob blob2" })
                ]),
                createVNode("div", { id: "mouse-follower" }),
                createVNode("main", { class: "pt-32 pb-20" }, [
                  createVNode("canvas", {
                    id: "hero-canvas",
                    class: "hero-bg"
                  }),
                  createVNode("div", { class: "container mx-auto px-6 relative z-10" }, [
                    createVNode("div", { class: "text-center mb-16" }, [
                      createVNode("h1", { class: "text-5xl md:text-7xl font-extrabold text-white mb-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(heroHeadingParts.value, (part, index) => {
                          return openBlock(), createBlock(Fragment, {
                            key: `hero-heading-${index}`
                          }, [
                            part.isKeyword ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "keyword-animate"
                            }, toDisplayString(part.text), 1)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(toDisplayString(part.text), 1)
                            ], 64))
                          ], 64);
                        }), 128))
                      ]),
                      createVNode("p", { class: "text-xl text-gray-400 max-w-2xl mx-auto" }, toDisplayString(unref(getText)("contact.hero_description", "Have questions about scaling your competition? Our experts are here to help you build the ultimate engagement machine.")), 1)
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" }, [
                      createVNode("div", { class: "space-y-6" }, [
                        createVNode("div", { class: "liquid-glass p-8 rounded-2xl flex items-start space-x-6" }, [
                          createVNode("div", { class: "bg-[#6A3FF4]/20 p-4 rounded-xl flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-8 h-8 text-[#6A3FF4]",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              })
                            ]))
                          ]),
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-xl font-bold text-white mb-1" }, toDisplayString(unref(getText)("contact.email_title", "Email Us")), 1),
                            createVNode("p", { class: "text-gray-400" }, toDisplayString(unref(getText)("contact.email_subtitle", "for all enquires please use the below email")), 1),
                            createVNode("a", {
                              href: `mailto:${unref(getText)("contact.email_address", "contact@compengine.io")}`,
                              class: "text-[#FF9900] font-semibold hover:underline block mt-2"
                            }, toDisplayString(unref(getText)("contact.email_address", "contact@compengine.io")), 9, ["href"])
                          ])
                        ]),
                        createVNode("div", { class: "liquid-glass p-8 rounded-2xl flex items-start space-x-6" }, [
                          createVNode("div", { class: "bg-[#FF9900]/20 p-4 rounded-xl flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-8 h-8 text-[#FF9900]",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              }),
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              })
                            ]))
                          ]),
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-xl font-bold text-white mb-1" }, toDisplayString(unref(getText)("contact.location_title", "Location")), 1),
                            createVNode("p", { class: "text-gray-400" }, toDisplayString(unref(getText)("contact.location_subtitle", "Visit us for a coffee and a demo")), 1),
                            createVNode("address", { class: "not-italic text-white mt-2" }, toDisplayString(unref(getText)("contact.location_city", "Manchester")), 1)
                          ])
                        ]),
                        createVNode("div", { class: "liquid-glass p-8 rounded-2xl flex items-start space-x-6" }, [
                          createVNode("div", { class: "bg-[#6A3FF4]/20 p-4 rounded-xl flex-shrink-0" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-8 h-8 text-[#6A3FF4]",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              })
                            ]))
                          ]),
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-xl font-bold text-white mb-1" }, toDisplayString(unref(getText)("contact.chat_title", "Live Chat")), 1),
                            createVNode("p", { class: "text-gray-400" }, toDisplayString(unref(getText)("contact.chat_subtitle", "Available Mon-Fri, 9am - 6pm")), 1),
                            createVNode("button", { class: "text-[#FF9900] font-semibold hover:underline block mt-2" }, toDisplayString(unref(getText)("contact.chat_button", "Start a conversation")), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "liquid-glass p-8 md:p-12 rounded-3xl relative overflow-hidden" }, [
                        showSuccess.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-green-500/20 border border-green-500 text-green-200 p-4 rounded-xl mb-6 text-center"
                        }, toDisplayString(unref(getText)("contact.form_success", "Thanks for reaching out! We'll be in touch shortly.")), 1)) : createCommentVNode("", true),
                        errorMessage.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-xl mb-6 text-center"
                        }, toDisplayString(errorMessage.value), 1)) : createCommentVNode("", true),
                        createVNode("form", {
                          onSubmit: withModifiers(submitForm, ["prevent"]),
                          class: "space-y-6"
                        }, [
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-400" }, [
                                createTextVNode(toDisplayString(unref(getText)("contact.form_first_name", "First Name")) + " ", 1),
                                createVNode("span", { class: "text-pink-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => form.value.first_name = $event,
                                type: "text",
                                required: "",
                                placeholder: unref(getText)("contact.form_first_name_placeholder", "John"),
                                class: "contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all"
                              }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                                [vModelText, form.value.first_name]
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-400" }, [
                                createTextVNode(toDisplayString(unref(getText)("contact.form_last_name", "Last Name")) + " ", 1),
                                createVNode("span", { class: "text-pink-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => form.value.last_name = $event,
                                type: "text",
                                required: "",
                                placeholder: unref(getText)("contact.form_last_name_placeholder", "Doe"),
                                class: "contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all"
                              }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                                [vModelText, form.value.last_name]
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-400" }, [
                                createTextVNode(toDisplayString(unref(getText)("contact.form_email", "Email Address")) + " ", 1),
                                createVNode("span", { class: "text-pink-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => form.value.email = $event,
                                type: "email",
                                required: "",
                                placeholder: unref(getText)("contact.form_email_placeholder", "john@company.com"),
                                class: "contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all"
                              }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                                [vModelText, form.value.email]
                              ])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-400" }, [
                                createTextVNode(toDisplayString(unref(getText)("contact.form_phone", "Phone Number")) + " ", 1),
                                createVNode("span", { class: "text-pink-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => form.value.phone = $event,
                                type: "tel",
                                required: "",
                                placeholder: unref(getText)("contact.form_phone_placeholder", "+44 0000 000000"),
                                class: "contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all"
                              }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                                [vModelText, form.value.phone]
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-400" }, [
                              createTextVNode(toDisplayString(unref(getText)("contact.form_message", "Message")) + " ", 1),
                              createVNode("span", { class: "text-pink-500" }, "*")
                            ]),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => form.value.message = $event,
                              rows: "5",
                              required: "",
                              placeholder: unref(getText)("contact.form_message_placeholder", "How can we help your competition business grow?"),
                              class: "contact-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#6A3FF4] transition-all"
                            }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                              [vModelText, form.value.message]
                            ])
                          ]),
                          createVNode("button", {
                            type: "submit",
                            disabled: isSubmitting.value,
                            class: "w-full bg-[#6A3FF4] text-white font-bold py-4 rounded-xl hover:bg-[#FF9900] transition-all duration-300 transform hover:scale-[1.02] glow-button flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                          }, [
                            !isSubmitting.value ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(unref(getText)("contact.form_button", "Send Message")), 1)) : (openBlock(), createBlock("span", { key: 1 }, "Sending...")),
                            !isSubmitting.value ? (openBlock(), createBlock("svg", {
                              key: 2,
                              class: "w-5 h-5 ml-2",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M14 5l7 7m0 0l-7 7m7-7H3"
                              })
                            ])) : createCommentVNode("", true)
                          ], 8, ["disabled"])
                        ], 32)
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Contact.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const Contact = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-7e550bc2"]]);
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contact
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$H = {
  __name: "Dropdown",
  __ssrInlineRender: true,
  props: {
    align: {
      type: String,
      default: "right"
    },
    width: {
      type: String,
      default: "48"
    },
    contentClasses: {
      type: String,
      default: "py-1 bg-white"
    }
  },
  setup(__props) {
    const props = __props;
    const closeOnEscape = (e2) => {
      if (open.value && e2.key === "Escape") {
        open.value = false;
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => document.removeEventListener("keydown", closeOnEscape));
    const widthClass = computed(() => {
      return {
        48: "w-48"
      }[props.width.toString()];
    });
    const alignmentClasses = computed(() => {
      if (props.align === "left") {
        return "ltr:origin-top-left rtl:origin-top-right start-0";
      } else if (props.align === "right") {
        return "ltr:origin-top-right rtl:origin-top-left end-0";
      } else {
        return "origin-top";
      }
    });
    const open = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><div>`);
      ssrRenderSlot(_ctx.$slots, "trigger", {}, null, _push, _parent);
      _push(`</div><div class="fixed inset-0 z-40" style="${ssrRenderStyle(open.value ? null : { display: "none" })}"></div><div class="${ssrRenderClass([[widthClass.value, alignmentClasses.value], "absolute z-50 mt-2 rounded-md shadow-lg"])}" style="${ssrRenderStyle([
        { "display": "none" },
        open.value ? null : { display: "none" }
      ])}"><div class="${ssrRenderClass([__props.contentClasses, "rounded-md ring-1 ring-black ring-opacity-5"])}">`);
      ssrRenderSlot(_ctx.$slots, "content", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const _sfc_main$G = {
  __name: "DropdownLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const _sfc_main$F = {
  __name: "NavLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => props.active ? "inline-flex items-center px-1 pt-1 border-b-2 border-indigo-400 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out" : "inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavLink.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const _sfc_main$E = {
  __name: "ResponsiveNavLink",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      required: true
    },
    active: {
      type: Boolean
    }
  },
  setup(__props) {
    const props = __props;
    const classes = computed(
      () => props.active ? "block w-full ps-3 pe-4 py-2 border-l-4 border-indigo-400 text-start text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out" : "block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Link), mergeProps({
        href: __props.href,
        class: classes.value
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResponsiveNavLink.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const _sfc_main$D = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const showingNavigationDropdown = ref(false);
    const page = usePage();
    const isAdmin = computed(() => {
      var _a, _b;
      return ((_b = (_a = page.props.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.is_admin) || false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="min-h-screen bg-gray-100"><nav class="border-b border-gray-100 bg-white"><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-16 justify-between"><div class="flex"><div class="flex shrink-0 items-center">`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("dashboard")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(ApplicationLogo, { class: "block h-9 w-auto fill-current text-gray-800" }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(ApplicationLogo, { class: "block h-9 w-auto fill-current text-gray-800" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">`);
      _push(ssrRenderComponent(_sfc_main$F, {
        href: _ctx.route("dashboard"),
        active: _ctx.route().current("dashboard")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="hidden sm:ms-6 sm:flex sm:items-center space-x-3">`);
      if (isAdmin.value) {
        _push(`<a href="/admin" class="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" title="Admin Panel"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span class="ml-2 hidden lg:inline">Admin</span></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative ms-3">`);
      _push(ssrRenderComponent(_sfc_main$H, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="inline-flex rounded-md"${_scopeId}><button type="button" class="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"${_scopeId}>${ssrInterpolate(_ctx.$page.props.auth.user.name)} <svg class="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button></span>`);
          } else {
            return [
              createVNode("span", { class: "inline-flex rounded-md" }, [
                createVNode("button", {
                  type: "button",
                  class: "inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                }, [
                  createTextVNode(toDisplayString(_ctx.$page.props.auth.user.name) + " ", 1),
                  (openBlock(), createBlock("svg", {
                    class: "-me-0.5 ms-2 h-4 w-4",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])
              ])
            ];
          }
        }),
        content: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$G, {
              href: _ctx.route("profile.edit")
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Profile `);
                } else {
                  return [
                    createTextVNode(" Profile ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$G, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button"
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Log Out `);
                } else {
                  return [
                    createTextVNode(" Log Out ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$G, {
                href: _ctx.route("profile.edit")
              }, {
                default: withCtx(() => [
                  createTextVNode(" Profile ")
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(_sfc_main$G, {
                href: _ctx.route("logout"),
                method: "post",
                as: "button"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Log Out ")
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="-me-2 flex items-center sm:hidden"><button class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"><svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24"><path class="${ssrRenderClass({
        hidden: showingNavigationDropdown.value,
        "inline-flex": !showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path><path class="${ssrRenderClass({
        hidden: !showingNavigationDropdown.value,
        "inline-flex": showingNavigationDropdown.value
      })}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div><div class="${ssrRenderClass([{
        block: showingNavigationDropdown.value,
        hidden: !showingNavigationDropdown.value
      }, "sm:hidden"])}"><div class="space-y-1 pb-3 pt-2">`);
      _push(ssrRenderComponent(_sfc_main$E, {
        href: _ctx.route("dashboard"),
        active: _ctx.route().current("dashboard")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (isAdmin.value) {
        _push(ssrRenderComponent(_sfc_main$E, { href: "/admin" }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ⚙️ Admin Panel `);
            } else {
              return [
                createTextVNode(" ⚙️ Admin Panel ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="border-t border-gray-200 pb-1 pt-4"><div class="px-4"><div class="text-base font-medium text-gray-800">${ssrInterpolate(_ctx.$page.props.auth.user.name)}</div><div class="text-sm font-medium text-gray-500">${ssrInterpolate(_ctx.$page.props.auth.user.email)}</div></div><div class="mt-3 space-y-1">`);
      _push(ssrRenderComponent(_sfc_main$E, {
        href: _ctx.route("profile.edit")
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Profile `);
          } else {
            return [
              createTextVNode(" Profile ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$E, {
        href: _ctx.route("logout"),
        method: "post",
        as: "button"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Log Out `);
          } else {
            return [
              createTextVNode(" Log Out ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav>`);
      if (_ctx.$slots.header) {
        _push(`<header class="bg-white shadow"><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push, _parent);
        _push(`</div></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const _sfc_main$C = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        header: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Dashboard </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Dashboard ")
            ];
          }
        }),
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl sm:px-6 lg:px-8"${_scopeId}><div class="overflow-hidden bg-white shadow-sm sm:rounded-lg"${_scopeId}><div class="p-6 text-gray-900"${_scopeId}> You&#39;re logged in! </div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "overflow-hidden bg-white shadow-sm sm:rounded-lg" }, [
                    createVNode("div", { class: "p-6 text-gray-900" }, " You're logged in! ")
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$C
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$B = {
  __name: "Password",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({ password: "" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Developer Docs" }, null, _parent));
      _push(`<div class="min-h-screen flex items-center justify-center" style="${ssrRenderStyle({ "background-color": "#f6f8fb" })}"><div class="w-full max-w-sm px-6"><div class="text-center mb-8"><div style="${ssrRenderStyle({ "font-size": "2rem", "margin-bottom": "12px" })}">🔒</div><h1 class="text-2xl font-bold" style="${ssrRenderStyle({ "color": "#1c2530" })}">Developer Docs</h1><p style="${ssrRenderStyle({ "color": "#5b6776", "margin-top": "8px", "font-size": "0.9rem" })}"> This area is restricted to super-super-admins.<br>Enter the developer docs password to continue. </p></div><form class="space-y-4"><div><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="Password" autofocus style="${ssrRenderStyle([{ "width": "100%", "padding": "12px 16px", "border-radius": "8px", "border": "1px solid #e3e8ef", "background": "#fff", "color": "#1c2530", "font-size": "1rem", "outline": "none", "transition": "border 0.2s" }, unref(form).errors.password ? "border-color:#ef4444;" : ""])}">`);
      if (unref(form).errors.password) {
        _push(`<p style="${ssrRenderStyle({ "color": "#ef4444", "font-size": "0.85rem", "margin-top": "6px" })}">${ssrInterpolate(unref(form).errors.password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} style="${ssrRenderStyle([{ "width": "100%", "padding": "12px 16px", "border-radius": "8px", "background": "#2f6df6", "color": "#fff", "font-size": "1rem", "font-weight": "600", "border": "none", "cursor": "pointer", "transition": "opacity 0.2s" }, unref(form).processing ? "opacity:0.5; cursor:not-allowed;" : ""])}">${ssrInterpolate(unref(form).processing ? "Checking…" : "Continue")}</button></form></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/DevDocs/Password.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$B
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$A = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    html: String,
    nav: Array,
    currentSlug: String,
    title: String
  },
  setup(__props) {
    const props = __props;
    const tocItems = ref([]);
    const activeHeading = ref("");
    const handleScroll = (e2) => {
      const headings = tocItems.value.map((item) => document.getElementById(item.id)).filter(Boolean);
      let current = "";
      for (const h2 of headings) {
        if (h2.getBoundingClientRect().top <= 120) current = h2.id;
      }
      if (current) activeHeading.value = current;
    };
    const buildToc = () => {
      const container = document.querySelector(".dev-docs-content");
      if (!container) return;
      const headings = container.querySelectorAll("h2, h3");
      if (headings.length === 0) {
        setTimeout(buildToc, 100);
        return;
      }
      tocItems.value = Array.from(headings).map((h2, i2) => {
        if (!h2.id) h2.id = `h-${i2}`;
        return { id: h2.id, text: h2.textContent, level: h2.tagName === "H2" ? 2 : 3 };
      });
    };
    onMounted(() => {
      setTimeout(buildToc, 200);
      const main = document.querySelector(".dev-docs-main");
      if (main) main.addEventListener("scroll", handleScroll);
    });
    watch(() => props.html, () => {
      tocItems.value = [];
      setTimeout(buildToc, 200);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${__props.title} — Developer Docs`
      }, null, _parent));
      _push(`<div class="dev-docs-shell"><header class="dev-docs-header"><div class="dev-docs-header-left"><span class="dev-docs-logo">🔒 Developer Docs</span><span style="${ssrRenderStyle({ "padding-top": "0.3rem", "font-size": "0.75rem", "color": "#6b7280", "line-height": "1" })}">Last updated: 17th July 2026</span></div><div class="dev-docs-header-right"><a href="/admin" class="dev-docs-nav-link">← Admin panel</a><a href="/" class="dev-docs-nav-link">Back to site</a></div></header><div class="dev-docs-body"><aside class="dev-docs-sidebar"><p class="dev-docs-sidebar-title">Developer Docs</p><ul><!--[-->`);
      ssrRenderList(__props.nav, (item) => {
        _push(`<li>`);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("dev-docs.show", { slug: item.slug }),
          class: ["dev-docs-sidebar-link", { active: __props.currentSlug === item.slug }]
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></aside><main class="dev-docs-main"><div class="dev-docs-content">${__props.html ?? ""}</div></main>`);
      if (tocItems.value.length > 0) {
        _push(`<aside class="dev-docs-toc"><p class="dev-docs-toc-title">On this page</p><ul><!--[-->`);
        ssrRenderList(tocItems.value, (item) => {
          _push(`<li><button class="${ssrRenderClass([[item.level === 3 ? "pl-3" : "", activeHeading.value === item.id ? "active" : ""], "dev-docs-toc-link"])}">${ssrInterpolate(item.text)}</button></li>`);
        });
        _push(`<!--]--></ul></aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/DevDocs/Show.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$A
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$z = {
  __name: "Password",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({ password: "" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Documentation" }, null, _parent));
      _push(`<div class="min-h-screen flex items-center justify-center" style="${ssrRenderStyle({ "background-color": "#1B142C" })}"><div class="w-full max-w-sm px-6"><div class="text-center mb-8"><h1 class="text-2xl font-bold text-white">Documentation</h1><p class="text-gray-400 mt-2 text-sm">Enter the password to access the help center.</p></div><form class="space-y-4"><div><input${ssrRenderAttr("value", unref(form).password)} type="password" placeholder="Password" autofocus class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500">`);
      if (unref(form).errors.password) {
        _push(`<p class="text-red-400 text-sm mt-2">${ssrInterpolate(unref(form).errors.password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} style="${ssrRenderStyle({ "background-color": "#6A3FF4" })}" class="${ssrRenderClass([{ "opacity-50 cursor-not-allowed": unref(form).processing }, "w-full py-3 px-4 rounded-lg font-semibold text-white transition"])}">${ssrInterpolate(unref(form).processing ? "Checking..." : "Continue")}</button></form></div></div><!--]-->`);
    };
  }
};
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Documentation/Password.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$z
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$y = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    html: String,
    nav: Array,
    currentSlug: String,
    title: String,
    isAdmin: Boolean,
    isSuperSuperAdmin: Boolean
  },
  setup(__props) {
    const props = __props;
    const sidebarOpen = ref(false);
    const tocItems = ref([]);
    const activeHeading = ref("");
    const handleScroll = () => {
      const headings = tocItems.value.map((item) => document.getElementById(item.id)).filter(Boolean);
      let current = "";
      for (const h2 of headings) {
        if (h2.getBoundingClientRect().top <= 120) current = h2.id;
      }
      if (current) activeHeading.value = current;
    };
    const buildToc = () => {
      const container = document.querySelector(".docs-content");
      if (!container) return;
      const headings = container.querySelectorAll("h2, h3");
      if (headings.length === 0) {
        setTimeout(buildToc, 100);
        return;
      }
      tocItems.value = Array.from(headings).map((h2, i2) => {
        if (!h2.id) h2.id = `heading-${i2}`;
        return { id: h2.id, text: h2.textContent, level: h2.tagName === "H2" ? 2 : 3 };
      });
    };
    onMounted(() => {
      setTimeout(buildToc, 200);
      const main = document.querySelector("main");
      if (main) main.addEventListener("scroll", handleScroll);
      document.addEventListener("keydown", handleSearchKey);
    });
    watch(() => props.html, () => {
      tocItems.value = [];
      setTimeout(buildToc, 200);
    });
    const searchQuery = ref("");
    const searchResults = ref([]);
    const searchOpen = ref(false);
    const searchActive = ref(-1);
    const searchInput = ref(null);
    ref(null);
    let searchTimer = null;
    watch(searchQuery, (val) => {
      searchActive.value = -1;
      clearTimeout(searchTimer);
      if (val.trim().length < 2) {
        searchResults.value = [];
        searchOpen.value = false;
        return;
      }
      searchTimer = setTimeout(async () => {
        try {
          const res = await fetch(`/docs/search?q=${encodeURIComponent(val.trim())}`);
          const data = await res.json();
          searchResults.value = data;
          searchOpen.value = data.length > 0;
        } catch {
          searchResults.value = [];
          searchOpen.value = false;
        }
      }, 200);
    });
    function handleSearchKey(e2) {
      var _a;
      if ((e2.metaKey || e2.ctrlKey) && e2.key === "k") {
        e2.preventDefault();
        (_a = searchInput.value) == null ? void 0 : _a.focus();
        return;
      }
      if (!searchOpen.value) return;
      if (e2.key === "ArrowDown") {
        e2.preventDefault();
        searchActive.value = Math.min(searchActive.value + 1, searchResults.value.length - 1);
      } else if (e2.key === "ArrowUp") {
        e2.preventDefault();
        searchActive.value = Math.max(searchActive.value - 1, 0);
      } else if (e2.key === "Enter" && searchActive.value >= 0) {
        e2.preventDefault();
        navigateToResult(searchResults.value[searchActive.value]);
      } else if (e2.key === "Escape") {
        closeSearch();
      }
    }
    function navigateToResult(item) {
      closeSearch();
      router.visit(route("docs.show", { section: item.section, slug: item.page }));
    }
    function closeSearch() {
      searchOpen.value = false;
      searchActive.value = -1;
      searchQuery.value = "";
      searchResults.value = [];
    }
    function highlightQuery(text) {
      if (!text || !searchQuery.value.trim()) return text;
      const terms = searchQuery.value.trim().split(/\s+/).map((t3) => t3.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      const re = new RegExp(`(${terms.join("|")})`, "gi");
      return text.replace(re, "<mark>$1</mark>");
    }
    function sectionLabel(section) {
      return section === "admin" ? "Admin" : "Customers";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), {
        title: `${__props.title} — Docs`
      }, null, _parent));
      _push(`<div class="min-h-screen flex flex-col" style="${ssrRenderStyle({ "background-color": "#0f0a1e", "color": "#e5e7eb" })}"><header class="sticky top-0 z-30 flex items-center gap-4 px-6 py-3 border-b border-white/10" style="${ssrRenderStyle({ "background-color": "rgba(15, 10, 30, 0.95)", "backdrop-filter": "blur(10px)" })}"><div class="flex items-center gap-4 flex-shrink-0"><button class="lg:hidden text-gray-400 hover:text-white"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("docs.index"),
        class: "text-white font-bold text-lg whitespace-nowrap"
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Help Center `);
          } else {
            return [
              createTextVNode(" Help Center ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="max-w-3xl" style="${ssrRenderStyle({ "padding-top": "0.3rem", "font-size": "0.75rem", "color": "#6b7280!important", "line-height": "1!important", "margin-bottom": "0!important" })}">Last updated: 17th July 2026</p></div><div class="relative flex-1 max-w-md mx-auto"><div class="relative"><svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"></path></svg><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search docs…" autocomplete="off" spellcheck="false" class="w-full pl-9 pr-14 py-1.5 rounded-md text-sm border border-white/10 bg-white/5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"><kbd class="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] text-gray-500 border border-white/10 font-mono pointer-events-none"> ⌘K </kbd></div>`);
      if (searchOpen.value && searchResults.value.length) {
        _push(`<div class="absolute left-0 right-0 top-full mt-2 z-50 rounded-lg border border-white/10 shadow-2xl overflow-hidden" style="${ssrRenderStyle({ "background-color": "#1a1030" })}"><ul><!--[-->`);
        ssrRenderList(searchResults.value, (result, i2) => {
          _push(`<li class="${ssrRenderClass([searchActive.value === i2 ? "bg-purple-600/20" : "hover:bg-white/5", "flex items-start gap-3 px-4 py-3 cursor-pointer border-b border-white/5 last:border-0 transition-colors"])}"><svg class="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><div class="min-w-0 flex-1"><div class="flex items-center gap-2 mb-0.5"><span class="text-sm font-medium text-gray-100">${highlightQuery(result.title) ?? ""}</span><span class="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-600/20 text-purple-400 flex-shrink-0">${ssrInterpolate(sectionLabel(result.section))}</span></div><p class="text-xs text-gray-500 line-clamp-1">${highlightQuery(result.excerpt) ?? ""}</p></div><svg class="w-3 h-3 text-gray-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></li>`);
        });
        _push(`<!--]--></ul><div class="px-4 py-2 border-t border-white/5 flex gap-3 text-[11px] text-gray-600"><span><kbd class="font-mono">↑↓</kbd> navigate</span><span><kbd class="font-mono">↵</kbd> open</span><span><kbd class="font-mono">esc</kbd> close</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center gap-3 flex-shrink-0">`);
      if (__props.isSuperSuperAdmin) {
        _push(`<a href="/dev-docs/unlock" class="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition px-2.5 py-1.5 rounded border border-white/10 hover:border-white/20 whitespace-nowrap"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg> Dev Docs </a>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.isAdmin) {
        _push(`<a href="/admin" class="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition px-2.5 py-1.5 rounded border border-white/10 hover:border-white/20 whitespace-nowrap"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> Admin </a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<a href="/" class="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition px-2.5 py-1.5 rounded border border-white/10 hover:border-white/20 whitespace-nowrap"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg> Back to site </a></div></header><div class="flex flex-1 overflow-hidden"><aside class="w-72 flex-shrink-0 overflow-y-auto border-r border-white/10 px-4 py-6 hidden lg:block sticky top-[57px] self-start h-[calc(100vh-57px)] scrollbar-hide" style="${ssrRenderStyle({ "background-color": "#0f0a1e" })}"><nav class="space-y-6"><!--[-->`);
      ssrRenderList(__props.nav, (section) => {
        _push(`<div><p class="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 px-2">${ssrInterpolate(section.title)}</p><ul class="space-y-0.5"><!--[-->`);
        ssrRenderList(section.items, (item) => {
          _push(`<li>`);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("docs.show", { section: item.slug.split("/")[0], slug: item.slug.split("/")[1] }),
            class: ["block px-3 py-1.5 rounded-md text-sm transition", __props.currentSlug === item.slug ? "bg-purple-600/20 text-purple-300 font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"]
          }, {
            default: withCtx((_2, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.title)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.title), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div>`);
      });
      _push(`<!--]--></nav></aside>`);
      if (sidebarOpen.value) {
        _push(`<div class="fixed inset-0 z-20 lg:hidden"><div class="absolute inset-0 bg-black/60"></div><aside class="absolute left-0 top-0 bottom-0 w-72 overflow-y-auto px-4 py-6 z-30 border-r border-white/10" style="${ssrRenderStyle({ "background-color": "#0f0a1e" })}"><div class="flex gap-2 mb-6">`);
        if (__props.isAdmin) {
          _push(`<a href="/admin/dashboard" class="flex-1 text-center text-xs text-gray-400 hover:text-white border border-white/10 rounded px-2 py-1.5"> Admin panel </a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<a href="/" class="flex-1 text-center text-xs text-gray-400 hover:text-white border border-white/10 rounded px-2 py-1.5"> ← Back to site </a></div><nav class="space-y-6"><!--[-->`);
        ssrRenderList(__props.nav, (section) => {
          _push(`<div><p class="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2 px-2">${ssrInterpolate(section.title)}</p><ul class="space-y-0.5"><!--[-->`);
          ssrRenderList(section.items, (item) => {
            _push(`<li>`);
            _push(ssrRenderComponent(unref(Link), {
              href: _ctx.route("docs.show", { section: item.slug.split("/")[0], slug: item.slug.split("/")[1] }),
              class: ["block px-3 py-1.5 rounded-md text-sm transition", __props.currentSlug === item.slug ? "bg-purple-600/20 text-purple-300 font-medium" : "text-gray-400 hover:text-white hover:bg-white/5"],
              onClick: ($event) => sidebarOpen.value = false
            }, {
              default: withCtx((_2, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(item.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(item.title), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul></div>`);
        });
        _push(`<!--]--></nav></aside></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="flex-1 min-w-0 overflow-y-auto px-6 py-10 lg:px-16 h-[calc(100vh-57px)] scrollbar-hide"><div class="docs-content max-w-3xl">${__props.html ?? ""}</div></main>`);
      if (tocItems.value.length > 0) {
        _push(`<aside class="w-56 flex-shrink-0 hidden xl:block sticky top-[57px] self-start h-[calc(100vh-57px)] overflow-y-auto px-4 py-6 border-l border-white/10 scrollbar-hide" style="${ssrRenderStyle({ "background-color": "#0f0a1e" })}"><p class="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">On this page</p><ul class="space-y-1"><!--[-->`);
        ssrRenderList(tocItems.value, (item) => {
          _push(`<li><button class="${ssrRenderClass([[
            item.level === 3 ? "pl-3" : "",
            activeHeading.value === item.id ? "text-purple-400" : "text-gray-500"
          ], "text-left w-full text-xs leading-snug transition py-0.5 hover:text-white"])}">${ssrInterpolate(item.text)}</button></li>`);
        });
        _push(`<!--]--></ul></aside>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!--]-->`);
    };
  }
};
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Documentation/Show.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$y
}, Symbol.toStringTag, { value: "Module" }));
const calendly = "https://calendly.com/contact-compengine/30min";
const _sfc_main$x = {
  __name: "UltraNav",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const user = computed(() => {
      var _a;
      return ((_a = page.props.auth) == null ? void 0 : _a.user) || null;
    });
    const accountHref = computed(() => {
      var _a;
      return ((_a = user.value) == null ? void 0 : _a.is_admin) ? "/admin" : "/dashboard";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: "ce-nav",
        "aria-label": "Main"
      }, _attrs))}><div class="wrap"><a href="#hero" class="logo" aria-label="CompEngine home"><span class="gear"><img src="/images/logo.svg" alt=""><span class="gear-svg" data-gear></span></span><span class="grad">COMPENGINE</span></a><div class="nav-links"><a href="#hero">Home</a><a href="#game-studio">Games</a><a href="#ecosystem">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="/about">About</a><a href="/blog">Blog</a><a href="#booking">Contact</a></div><div class="nav-cta">`);
      if (user.value) {
        _push(`<a${ssrRenderAttr("href", accountHref.value)} class="btn btn-ghost btn-sm nav-login" data-track="nav_account">${ssrInterpolate(user.value.name)}</a>`);
      } else {
        _push(`<a href="/login" class="btn btn-ghost btn-sm nav-login" data-track="nav_login">Login</a>`);
      }
      _push(`<a${ssrRenderAttr("href", calendly)} target="_blank" rel="noopener" class="btn btn-sm btn-book" data-track="nav_book_demo" data-calendly>Book a Demo</a><button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><i class="ic" data-i="menu"></i></button></div></div><div class="mobile-menu" id="mobile-menu"><a href="#hero">Home</a><a href="#game-studio">Games</a><a href="#ecosystem">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="/about">About</a><a href="/blog">Blog</a><a href="#booking">Contact</a>`);
      if (user.value) {
        _push(`<a${ssrRenderAttr("href", accountHref.value)}>${ssrInterpolate(user.value.name)}</a>`);
      } else {
        _push(`<a href="/login">Login</a>`);
      }
      _push(`</div></nav>`);
    };
  }
};
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraNav.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const _sfc_main$w = {
  __name: "UltraHero",
  __ssrInlineRender: true,
  props: { orders: { type: Number, default: 15e5 }, tickets: { type: Number, default: 12e7 } },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ id: "hero" }, _attrs))}><canvas class="tickets" id="tickets" aria-hidden="true"></canvas><div class="wrap"><div class="hero-grid"><div class="hero-copy"><span class="eyebrow"><i class="dot"></i>Proven. Certified. UK Voluntary Code Signatory.</span><h1 id="hero-h1">The <span class="grad">Ultimate Competition</span> Platform</h1><p class="sub" id="hero-sub">Build Competitions beyond presets. Create unique competition experiences for your customers.</p><div class="cta-row"><a href="https://calendly.com/contact-compengine/30min" target="_blank" rel="noopener" class="btn btn-primary btn-lg" id="hero-cta" data-track="hero_book_demo" data-calendly>Book a Demo</a><a href="#game-studio" class="btn btn-ghost btn-lg" data-track="hero_game_studio">Game Studio</a></div><div class="cta-note hand"><svg viewBox="0 0 30 34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 2c2 10 6 18 20 22"></path><path d="M18 20l6 4-1 6"></path></svg>30 mins. No sales deck.</div><div class="proof"><i class="ic" data-i="trend"></i><span>Operators on CompEngine grow revenue <b>+47%</b> on average in their first 90 days</span></div><div class="mini-trust"><span><i class="ic" data-i="shield"></i>GLI certified</span><span><i class="ic" data-i="shield"></i>Pen tested</span><span><i class="ic" data-i="shield"></i>VCOC signatory</span></div></div><div class="hero-visual" id="hero-visual"><div class="mesh" aria-hidden="true"></div><canvas class="aurora" id="aurora" width="160" height="160" aria-hidden="true"></canvas><div class="big-gear" id="big-gear" aria-hidden="true"><span class="gear-svg" data-gear></span></div><div class="phone-wrap"><div class="phone" id="phone"><span class="glare"></span><div class="push" id="push" aria-hidden="true"><span class="ic"></span><div><b>New order</b><span id="push-txt"></span></div></div><span class="btn-side"></span><span class="btn-side l"></span><span class="btn-side l2"></span><div class="phone-bar"><span>9:41</span><span>yourbrand.co.uk</span><span>●●●</span></div><div class="site" id="site" aria-hidden="true"><div class="site-head"><b>YOUR<span>BRAND</span></b><span class="site-menu"><i></i><i></i><i></i></span></div><div class="site-carousel" id="site-carousel"><div class="slide on"><img src="/images/draws/bmw.jpg" alt="" loading="lazy"><div class="cap"><small>Win this week</small><b>BMW M3 Competition Pack</b><span>£2.99 a ticket · draws Friday 8pm</span><em>Enter now</em></div></div><div class="slide"><img src="/images/draws/tesla.jpg" alt="" loading="lazy"><div class="cap"><small>Win this week</small><b>Tesla Model Y</b><span>£3.49 a ticket · 71% sold</span><em>Enter now</em></div></div><div class="slide"><img src="/images/draws/cash.jpg" alt="" loading="lazy"><div class="cap"><small>Win this week</small><b>£25,000 Tax-Free Cash</b><span>£0.99 a ticket · draws tonight</span><em>Enter now</em></div></div><div class="dots"><i class="on"></i><i></i><i></i></div></div><div class="site-sec"><b>Live competitions</b><span>View all</span></div><div class="site-grid"><div class="comp"><img src="/images/draws/rolex.jpg" alt="" loading="lazy"><b>Rolex Submariner Date</b><span>£1.49 · <em>37% sold</em></span><i style="${ssrRenderStyle({ "--p": "37%" })}"></i></div><div class="comp"><img src="/images/draws/imac.jpg" alt="" loading="lazy"><b>Apple iMac Pro 32&quot;</b><span>£0.79 · <em>58% sold</em></span><i style="${ssrRenderStyle({ "--p": "58%" })}"></i></div><div class="comp"><img src="/images/draws/maldives.jpg" alt="" loading="lazy"><b>Maldives Trip for Two</b><span>£2.49 · <em>81% sold</em></span><i style="${ssrRenderStyle({ "--p": "81%" })}"></i></div><div class="comp"><img src="/images/draws/cash.jpg" alt="" loading="lazy"><b>£10,000 Cash</b><span>£0.99 · <em>64% sold</em></span><i style="${ssrRenderStyle({ "--p": "64%" })}"></i></div></div><div class="site-sec"><b>Instant wins</b><span>Play now</span></div><div class="site-iw"><span>🎰 Slots</span><span>🎫 Scratch</span><span>🎡 Spinny</span><span>🪙 Coin Drop</span><span>⚽ Football</span></div><div class="site-sec"><b>Recent winners</b></div><div class="site-win"><div><i>SK</i><span><b>Sarah K.</b> won the BMW M3</span><small>2h ago</small></div><div><i>JP</i><span><b>James P.</b> won £500 cash</span><small>5h ago</small></div><div><i>AH</i><span><b>Amira H.</b> won a Rolex Submariner</span><small>1d ago</small></div></div><div class="site-foot">GLI-certified draws · UK-licensed payments · free entry route</div></div></div><div class="phone-shadow" aria-hidden="true"></div></div></div></div><div class="counters" id="counters"><div class="counter"><b class="tnum" data-live="orders_30d"${ssrRenderAttr("data-target", __props.orders)} data-format="num">0</b><span>orders · last 30d</span></div><div class="counter"><b class="tnum" data-live="tickets_30d"${ssrRenderAttr("data-target", __props.tickets)} data-format="num">0</b><span>tickets · last 30d</span></div><div class="counter"><b class="tnum" data-live="years" data-target="5" data-format="plus">0</b><span>yrs operating</span></div></div><div class="feed card" id="feed" aria-live="polite" aria-label="Live orders"><div class="feed-head"><span class="tag green"><i class="dot green"></i>Live orders</span><span class="muted small" id="feed-rate">across CompEngine sites</span></div><div class="feed-list" id="feed-list"></div></div></div></section>`);
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraHero.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = {};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><section class="ce-logowall" aria-label="Operators on CompEngine"><div class="wrap" style="${ssrRenderStyle({ "text-align": "center" })}"><span class="eyebrow"><i class="dot green"></i>Powering some of the UK&#39;s leading competition operators<span style="${ssrRenderStyle({ "margin-left": "6px", "color": "var(--green)" })}">LIVE</span></span></div><div class="marquee" style="${ssrRenderStyle({ "margin-top": "24px" })}"><div class="track" id="marquee-a"></div></div><div class="marquee rev"><div class="track" id="marquee-b"></div></div><div class="wrap"><p class="plus"><b>+ 200</b> more UK operators trust CompEngine with their draws</p><div class="trust"><div class="card"><i class="ic" data-i="cert"></i><div><b>GLI Certified</b><span>RNG independently verified</span></div></div><div class="card"><i class="ic" data-i="lock"></i><div><b>Pen Tested</b><span>By an independent firm</span></div></div><div class="card"><i class="ic" data-i="doc"></i><div><b>VCOC Signatory</b><span>UK Voluntary Code, May 2026</span></div></div><div class="card"><i class="ic" data-i="award"></i><div><b>Industry Recognised</b><span>Industry proven</span></div></div></div><p class="hand" style="${ssrRenderStyle({ "text-align": "center", "margin-top": "28px" })}">the fun bit&#39;s below ↓</p></div></section><div class="kinetic" aria-hidden="true"><div class="k-track" id="k-track"></div></div><!--]-->`);
}
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraLogoWall.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const UltraLogoWall = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["ssrRender", _sfc_ssrRender$b]]);
const gamePlayers = {
  slots: () => import("./assets/SlotsModal-wswDreW4.js"),
  scratchy: () => import("./assets/ScratchyModal-D1CkCzpl.js"),
  spinny: () => import("./assets/SpinnyModal-COVDxCXm.js"),
  bingo: () => import("./assets/BingoModal-BvrWLnZJ.js"),
  coindrop: () => import("./assets/CoinDropModal-3H0gaBbU.js"),
  popgame: () => import("./assets/PopGameModal-BuT_tcuE.js"),
  football: () => import("./assets/FootballModal-Bl6Ev3Y6.js"),
  fishing: () => import("./assets/FishingModal-CBI7qq-o.js"),
  ticketeater: () => import("./assets/TicketEaterModal-BvuwjVCL.js")
};
const PRIZE_IMG = (symbol, bg) => "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" rx="22" fill="${bg}"/><text x="60" y="80" font-size="60" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" fill="#ffffff">${symbol}</text></svg>`
);
const demoCategories = [
  { id: 1, name: "£500 Cash", value: 500, image_path: PRIZE_IMG("£", "#16a34a"), available: 2 },
  { id: 2, name: "Gift Voucher", value: 50, image_path: PRIZE_IMG("★", "#7c3aed"), available: 5 },
  { id: 3, name: "Free Entry", value: 10, image_path: PRIZE_IMG("✓", "#0ea5e9"), available: 9 }
];
function makeDemoTickets(count = 10) {
  return Array.from({ length: count }, (_2, i2) => {
    const hasPrize = i2 % 3 === 0;
    const cat = demoCategories[(i2 / 3 | 0) % demoCategories.length];
    return {
      id: i2 + 1,
      number: String(i2 + 1).padStart(3, "0"),
      competition_id: 0,
      instant_win: hasPrize ? { id: i2 + 1, prize: cat.name, category_id: cat.id, value: cat.value } : false
    };
  });
}
const STUDIO_SCHEMAS = {
  "slots": {
    "key": "slots",
    "label": "Slots",
    "schema": [
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Intro Video / Background",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "video",
          "help": "Video plays 5s intro, then freezes as background"
        }
      },
      {
        "key": "title_image",
        "prop": "titleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Game logo (PNG with transparency)"
        }
      },
      {
        "key": "spin_button_image",
        "prop": "spinButtonImage",
        "type": "media",
        "label": "Spin Button",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Custom button graphic"
        }
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when the game opens"
        }
      },
      {
        "key": "spin_sound",
        "prop": "spinSound",
        "type": "media",
        "label": "Spin Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when the reels spin"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when a prize is revealed"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when no win is revealed"
        }
      },
      {
        "key": "machine_bg_color",
        "prop": "machineBgColor",
        "type": "color",
        "label": "Modal Background",
        "group": "Colors & Style",
        "default": "#1a5a7a",
        "meta": {
          "help": "Supports alpha (8-digit hex)"
        }
      },
      {
        "key": "inventory_emoji",
        "prop": "inventoryEmoji",
        "type": "text",
        "label": "Inventory Emoji",
        "group": "Colors & Style",
        "default": "🎣",
        "meta": []
      },
      {
        "key": "inventory_button_color",
        "prop": "inventoryButtonColor",
        "type": "color",
        "label": "Inventory Button Color",
        "group": "Colors & Style",
        "default": "#FFD700",
        "meta": []
      },
      {
        "key": "match_text_color",
        "prop": "matchTextColor",
        "type": "color",
        "label": "Match Text Color",
        "group": "Colors & Style",
        "default": "#7FDBFF",
        "meta": []
      },
      {
        "key": "win_glow_color",
        "prop": "winGlowColor",
        "type": "color",
        "label": "Win Glow Color",
        "group": "Colors & Style",
        "default": "#FFD700",
        "meta": {
          "help": 'Payline, win flames, symbol highlight, and "YOU WON" text'
        }
      },
      {
        "key": "machine_border_color",
        "prop": "machineBorderColor",
        "type": "color",
        "label": "Machine Border Color",
        "group": "Colors & Style",
        "default": "#00BFFF",
        "meta": {
          "help": "Slot machine frame, reel borders, and balance box"
        }
      },
      {
        "key": "prizes_modal_bg_color",
        "prop": "prizesModalBgColor",
        "type": "color",
        "label": "Modal Background",
        "group": "Prizes Modal",
        "default": "#1F2937",
        "meta": []
      },
      {
        "key": "prizes_title_color",
        "prop": "prizesTitleColor",
        "type": "color",
        "label": "Title Color",
        "group": "Prizes Modal",
        "default": "#FFD700",
        "meta": []
      },
      {
        "key": "prizes_card_border_color",
        "prop": "prizesCardBorderColor",
        "type": "color",
        "label": "Card Border",
        "group": "Prizes Modal",
        "default": "#FFD700",
        "meta": []
      },
      {
        "key": "prizes_card_bg_color",
        "prop": "prizesCardBgColor",
        "type": "color",
        "label": "Card Background",
        "group": "Prizes Modal",
        "default": "#374151",
        "meta": []
      },
      {
        "key": "prizes_value_color",
        "prop": "prizesValueColor",
        "type": "color",
        "label": "Prize Value",
        "group": "Prizes Modal",
        "default": "#10B981",
        "meta": []
      }
    ]
  },
  "scratchy": {
    "key": "scratchy",
    "label": "Scratchy",
    "schema": [
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Background Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Full-screen backdrop behind the game"
        }
      },
      {
        "key": "overlay",
        "prop": "overlay",
        "type": "media",
        "label": "Overlay Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Scratch surface layer (if empty, uses metallic gradient)"
        }
      },
      {
        "key": "header",
        "prop": "header",
        "type": "media",
        "label": "Header Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Logo/banner shown above the cards"
        }
      },
      {
        "key": "scratchy_intro_video",
        "prop": "scratchyIntroVideo",
        "type": "media",
        "label": "Intro Video / Animation",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "video",
          "help": "MP4, WebM or animated WebP — plays for 3 seconds before the lobby"
        }
      },
      {
        "key": "scratchy_layout",
        "prop": "scratchyLayout",
        "type": "select",
        "label": "Layout",
        "group": "Layout",
        "default": "single",
        "meta": {
          "options": [
            {
              "value": "single",
              "label": "Single"
            },
            {
              "value": "grid",
              "label": "Grid"
            }
          ]
        }
      },
      {
        "key": "scratchy_card_bg",
        "prop": "scratchyCardBg",
        "type": "color",
        "label": "Card Background",
        "group": "Card Styling",
        "default": "",
        "meta": []
      },
      {
        "key": "scratchy_card_border",
        "prop": "scratchyCardBorder",
        "type": "color",
        "label": "Card Border",
        "group": "Card Styling",
        "default": "",
        "meta": []
      },
      {
        "key": "accentColour",
        "prop": "accentColour",
        "type": "color",
        "label": "Accent / Glow",
        "group": "Card Styling",
        "default": "#52b77b",
        "meta": []
      },
      {
        "key": "scratchy_surface_color",
        "prop": "scratchySurfaceColor",
        "type": "color",
        "label": "Scratch Surface",
        "group": "Card Styling",
        "default": "",
        "meta": {
          "help": "Empty = silver metallic"
        }
      },
      {
        "key": "scratchy_button_color",
        "prop": "scratchyButtonColor",
        "type": "color",
        "label": "Button Color",
        "group": "Card Styling",
        "default": "",
        "meta": {
          "help": "Empty = theme secondary"
        }
      },
      {
        "key": "scratchy_container_bg",
        "prop": "scratchyContainerBg",
        "type": "color",
        "label": "Container Background",
        "group": "Card Styling",
        "default": "",
        "meta": []
      },
      {
        "key": "scratchy_title_text",
        "prop": "scratchyTitleText",
        "type": "text",
        "label": "Title Text",
        "group": "Card Styling",
        "default": "",
        "meta": []
      },
      {
        "key": "scratchy_title_color",
        "prop": "scratchyTitleColor",
        "type": "color",
        "label": "Title Color",
        "group": "Card Styling",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "textColour",
        "prop": "textColour",
        "type": "color",
        "label": "Overlay Text",
        "group": "Text Colors",
        "default": "#eeeeee",
        "meta": {
          "help": "Ticket # on scratch surface"
        }
      },
      {
        "key": "wonTextColour",
        "prop": "wonTextColour",
        "type": "color",
        "label": "Win Text",
        "group": "Text Colors",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "loseTextColour",
        "prop": "loseTextColour",
        "type": "color",
        "label": "Lose Text",
        "group": "Text Colors",
        "default": "#000000",
        "meta": []
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when the game opens"
        }
      },
      {
        "key": "scratch_sound",
        "prop": "scratchSound",
        "type": "media",
        "label": "Scratch Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Loops while scratching"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when a prize is revealed"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": 'Plays when "NO WIN" is revealed'
        }
      },
      {
        "key": "scratchy_show_top_prize",
        "prop": "scratchyShowTopPrize",
        "type": "toggle",
        "label": "Show Top Prize Banner",
        "group": "Display Options",
        "default": true,
        "meta": {
          "help": "Displays the highest prize on the lobby and game screen"
        }
      }
    ]
  },
  "spinny": {
    "key": "spinny",
    "label": "Spinny",
    "schema": [
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Background Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image"
        }
      },
      {
        "key": "header",
        "prop": "header",
        "type": "media",
        "label": "Header Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image"
        }
      },
      {
        "key": "logo",
        "prop": "logo",
        "type": "media",
        "label": "Winner Segment Logo",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Small icon for wheel segments"
        }
      },
      {
        "key": "title_text",
        "prop": "titleText",
        "type": "text",
        "label": "Wheel Title",
        "group": "Text & Colors",
        "default": "SPIN WHEEL",
        "meta": []
      },
      {
        "key": "title_color",
        "prop": "titleColor",
        "type": "color",
        "label": "Title Color",
        "group": "Text & Colors",
        "default": "#793181",
        "meta": []
      },
      {
        "key": "wallet_text",
        "prop": "walletText",
        "type": "text",
        "label": "Wallet Card Text",
        "group": "Text & Colors",
        "default": "SPIN WALLET",
        "meta": {
          "help": "Text on floating credit card"
        }
      },
      {
        "key": "wallet_color",
        "prop": "walletColor",
        "type": "color",
        "label": "Wallet Card Color",
        "group": "Text & Colors",
        "default": "#8b5cf6",
        "meta": {
          "help": "Primary card color"
        }
      },
      {
        "key": "wheel_edge_color",
        "prop": "wheelEdgeColor",
        "type": "color",
        "label": "Wheel Edge Glow",
        "group": "Text & Colors",
        "default": "#00aeffff",
        "meta": {
          "help": "Gradient glow around wheel"
        }
      }
    ]
  },
  "bingo": {
    "key": "bingo",
    "label": "Bingo",
    "schema": [
      {
        "key": "diamond_emoji",
        "prop": "diamondEmoji",
        "type": "text",
        "label": "Diamond / Emoji Symbol",
        "group": "Symbol",
        "default": "💎",
        "meta": {
          "help": "Shown on winning squares (💎 🌟 ⭐ 🎯)"
        }
      },
      {
        "key": "bg_start",
        "prop": "bgStart",
        "type": "color",
        "label": "Modal BG (Start)",
        "group": "Theme Colors",
        "default": "#1e3a8a",
        "meta": []
      },
      {
        "key": "bg_end",
        "prop": "bgEnd",
        "type": "color",
        "label": "Modal BG (End)",
        "group": "Theme Colors",
        "default": "#1e40af",
        "meta": []
      },
      {
        "key": "frame_color",
        "prop": "frameColor",
        "type": "color",
        "label": "Card Border",
        "group": "Theme Colors",
        "default": "#3b82f6",
        "meta": []
      },
      {
        "key": "frame_glow",
        "prop": "frameGlow",
        "type": "color",
        "label": "Border Glow",
        "group": "Theme Colors",
        "default": "#60a5fa",
        "meta": []
      },
      {
        "key": "square_bg",
        "prop": "squareBg",
        "type": "color",
        "label": "Square BG",
        "group": "Theme Colors",
        "default": "#374151",
        "meta": []
      },
      {
        "key": "square_text",
        "prop": "squareText",
        "type": "color",
        "label": "Square Text",
        "group": "Theme Colors",
        "default": "#e5e7eb",
        "meta": []
      },
      {
        "key": "diamond_1",
        "prop": "diamond1",
        "type": "color",
        "label": "Diamond Color 1",
        "group": "Theme Colors",
        "default": "#06b6d4",
        "meta": []
      },
      {
        "key": "diamond_2",
        "prop": "diamond2",
        "type": "color",
        "label": "Diamond Color 2",
        "group": "Theme Colors",
        "default": "#67e8f9",
        "meta": []
      },
      {
        "key": "winner_glow",
        "prop": "winnerGlow",
        "type": "color",
        "label": "Winner Glow",
        "group": "Theme Colors",
        "default": "#10b981",
        "meta": []
      },
      {
        "key": "winner_bg",
        "prop": "winnerBg",
        "type": "color",
        "label": "Winner BG",
        "group": "Theme Colors",
        "default": "#059669",
        "meta": []
      },
      {
        "key": "popup_start",
        "prop": "popupStart",
        "type": "color",
        "label": "Popup Start",
        "group": "Theme Colors",
        "default": "#10b981",
        "meta": []
      },
      {
        "key": "popup_end",
        "prop": "popupEnd",
        "type": "color",
        "label": "Popup End",
        "group": "Theme Colors",
        "default": "#059669",
        "meta": []
      },
      {
        "key": "pattern_rules",
        "prop": "patternRules",
        "type": "pattern_rules",
        "label": "Pattern Rules",
        "group": "Pattern Rules",
        "default": [],
        "meta": {
          "help": "Set patterns based on prize value ranges. Leave empty for random patterns.",
          "patternNames": [
            "Top Row",
            "Middle Row",
            "Bottom Row",
            "Left Column",
            "Middle Column",
            "Right Column",
            "Diagonal TL-BR",
            "Diagonal TR-BL",
            "Cross Pattern (5 Squares)",
            "Full House (All 9)"
          ],
          "itemRules": {
            "pattern_rules.*.from": [
              "required_with:pattern_rules",
              "numeric",
              "min:0"
            ],
            "pattern_rules.*.to": [
              "required_with:pattern_rules",
              "numeric",
              "min:0"
            ],
            "pattern_rules.*.pattern": [
              "required_with:pattern_rules",
              "integer",
              "min:0",
              "max:9"
            ]
          },
          "itemDefault": {
            "from": 0,
            "to": 99.99,
            "pattern": 0
          }
        }
      },
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Background Image",
        "group": "Images",
        "default": "",
        "meta": {
          "accept": "image"
        }
      },
      {
        "key": "header",
        "prop": "header",
        "type": "media",
        "label": "Header / Banner",
        "group": "Images",
        "default": "",
        "meta": {
          "accept": "image"
        }
      },
      {
        "key": "card_cover",
        "prop": "cardCover",
        "type": "media",
        "label": "Card Cover",
        "group": "Images",
        "default": "",
        "meta": {
          "accept": "image"
        }
      },
      {
        "key": "reveal_sound",
        "prop": "revealSound",
        "type": "media",
        "label": "Reveal Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      }
    ]
  },
  "coindrop": {
    "key": "coindrop",
    "label": "Coin Drop",
    "schema": [
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Intro Video / Background",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "video",
          "help": "Video plays 5s intro, then freezes as background"
        }
      },
      {
        "key": "title_image",
        "prop": "titleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Game logo (PNG with transparency)"
        }
      },
      {
        "key": "game_background",
        "prop": "gameBackground",
        "type": "media",
        "label": "Game Background",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Background image for the game board area"
        }
      },
      {
        "key": "drop_button_image",
        "prop": "dropButtonImage",
        "type": "media",
        "label": "Drop Button",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Custom button graphic"
        }
      },
      {
        "key": "ball_image",
        "prop": "ballImage",
        "type": "media",
        "label": "Ball/Coin Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Custom coin/ball graphic (PNG with transparency recommended)"
        }
      },
      {
        "key": "tube_image",
        "prop": "tubeImage",
        "type": "media",
        "label": "Drop Tube Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Custom tube/dispenser image where coins drop from"
        }
      },
      {
        "key": "win_bucket_image",
        "prop": "winBucketImage",
        "type": "media",
        "label": "Win Bucket Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Image for winning buckets (replaces green color)"
        }
      },
      {
        "key": "lose_bucket_image",
        "prop": "loseBucketImage",
        "type": "media",
        "label": "Lose Bucket Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Image for losing buckets (replaces red color)"
        }
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "drop_sound",
        "prop": "dropSound",
        "type": "media",
        "label": "Drop Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "peg_shape",
        "prop": "pegShape",
        "type": "select",
        "label": "Peg Shape",
        "group": "Colors & Style",
        "default": "hexagon",
        "meta": {
          "options": [
            {
              "value": "hexagon",
              "label": "Hexagon"
            },
            {
              "value": "circle",
              "label": "Circle"
            },
            {
              "value": "square",
              "label": "Square"
            }
          ]
        }
      },
      {
        "key": "board_bg_color",
        "prop": "boardBgColor",
        "type": "color",
        "label": "Board Background",
        "group": "Colors & Style",
        "default": "#1a1a2e",
        "meta": []
      },
      {
        "key": "peg_color",
        "prop": "pegColor",
        "type": "color",
        "label": "Peg Border Color",
        "group": "Colors & Style",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "peg_glow_color",
        "prop": "pegGlowColor",
        "type": "color",
        "label": "Peg Glow Color",
        "group": "Colors & Style",
        "default": "#e94560",
        "meta": []
      },
      {
        "key": "ball_color",
        "prop": "ballColor",
        "type": "color",
        "label": "Ball Color",
        "group": "Colors & Style",
        "default": "#ffd700",
        "meta": []
      },
      {
        "key": "ball_glow_color",
        "prop": "ballGlowColor",
        "type": "color",
        "label": "Ball Glow Color",
        "group": "Colors & Style",
        "default": "#ffaa00",
        "meta": []
      },
      {
        "key": "win_bucket_color",
        "prop": "winBucketColor",
        "type": "color",
        "label": "Win Bucket Color",
        "group": "Colors & Style",
        "default": "#00ff88",
        "meta": []
      },
      {
        "key": "lose_bucket_color",
        "prop": "loseBucketColor",
        "type": "color",
        "label": "Lose Bucket Color",
        "group": "Colors & Style",
        "default": "#ff4444",
        "meta": []
      },
      {
        "key": "primary_color",
        "prop": "primaryColor",
        "type": "color",
        "label": "Primary Color",
        "group": "Colors & Style",
        "default": "#e94560",
        "meta": []
      },
      {
        "key": "secondary_color",
        "prop": "secondaryColor",
        "type": "color",
        "label": "Secondary Color",
        "group": "Colors & Style",
        "default": "#1a1a2e",
        "meta": []
      },
      {
        "key": "accent_color",
        "prop": "accentColor",
        "type": "color",
        "label": "Accent Color",
        "group": "Colors & Style",
        "default": "#ffd700",
        "meta": []
      },
      {
        "key": "trail_color",
        "prop": "trailColor",
        "type": "color",
        "label": "Ball Trail Glow",
        "group": "Colors & Style",
        "default": "#e94560",
        "meta": []
      }
    ]
  },
  "popgame": {
    "key": "popgame",
    "label": "Pop Game",
    "schema": [
      {
        "key": "pop_subtitle_text",
        "prop": "popSubtitleText",
        "type": "text",
        "label": "Lobby Subtitle Text",
        "group": "Lobby",
        "default": "",
        "meta": {
          "help": "Text shown below the title on the lobby screen (leave empty for default)"
        }
      },
      {
        "key": "pop_item_label",
        "prop": "popItemLabel",
        "type": "text",
        "label": "Pop Item Label",
        "group": "Lobby",
        "default": "",
        "meta": {
          "help": 'What to call the items (e.g. "gifts", "boxes", "stars"). Used in How to Play text. Leave empty for auto-detect from item type.'
        }
      },
      {
        "key": "title_text",
        "prop": "titleText",
        "type": "text",
        "label": "Title Text",
        "group": "Lobby Title",
        "default": "POP TO WIN!",
        "meta": []
      },
      {
        "key": "title_color",
        "prop": "titleColor",
        "type": "color",
        "label": "Title Color",
        "group": "Lobby Title",
        "default": "#FFD700",
        "meta": []
      },
      {
        "key": "text_color",
        "prop": "textColor",
        "type": "color",
        "label": "Text Color",
        "group": "Lobby Title",
        "default": "#FFFFFF",
        "meta": []
      },
      {
        "key": "pop_item_type",
        "prop": "popItemType",
        "type": "select",
        "label": "Pop Item Type",
        "group": "Pop Item Type",
        "default": "balloon",
        "meta": {
          "help": "Choose what users will pop",
          "options": [
            {
              "value": "balloon",
              "label": "Balloon"
            },
            {
              "value": "present",
              "label": "Present"
            },
            {
              "value": "egg",
              "label": "Egg"
            }
          ]
        }
      },
      {
        "key": "title_image",
        "prop": "titleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Game logo (PNG with transparency)"
        }
      },
      {
        "key": "background",
        "prop": "background",
        "type": "media",
        "label": "Background Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Background for lobby and game board (uses background color as fallback)"
        }
      },
      {
        "key": "header",
        "prop": "header",
        "type": "media",
        "label": "Header Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Banner shown above the game"
        }
      },
      {
        "key": "pop_item_image",
        "prop": "popItemImage",
        "type": "media",
        "label": "Custom Pop Item Image",
        "group": "Visual Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Replaces default balloon/present with custom image"
        }
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "pop_sound",
        "prop": "popSound",
        "type": "media",
        "label": "Pop Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "pop_item_colors",
        "prop": "popItemColors",
        "type": "json",
        "label": "Item Colors",
        "group": "Item Colors",
        "default": [
          "#FF4C4C",
          "#FFEB3B",
          "#64B5F6",
          "#81C784",
          "#9575CD",
          "#FF8A80",
          "#FFB74D",
          "#4DD0E1",
          "#F06292",
          "#FFD700"
        ],
        "meta": {
          "help": "Colors for balloons/presents (1-15)",
          "itemDefault": "#FF4C4C",
          "min": 1,
          "max": 15
        }
      },
      {
        "key": "pop_confetti_colors",
        "prop": "popConfettiColors",
        "type": "json",
        "label": "Confetti Colors",
        "group": "Confetti Colors",
        "default": [
          "#FFD700",
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#96CEB4",
          "#FFEAA7"
        ],
        "meta": {
          "help": "Win celebration colors (1-10)",
          "itemDefault": "#FFD700",
          "min": 1,
          "max": 10
        }
      },
      {
        "key": "pop_bg_color",
        "prop": "popBgColor",
        "type": "color",
        "label": "Background Color",
        "group": "Theme Colors",
        "default": "#1a1a2e",
        "meta": []
      },
      {
        "key": "pop_win_color",
        "prop": "popWinColor",
        "type": "color",
        "label": "Win Color",
        "group": "Theme Colors",
        "default": "#00ff88",
        "meta": []
      },
      {
        "key": "pop_lose_color",
        "prop": "popLoseColor",
        "type": "color",
        "label": "Lose Color",
        "group": "Theme Colors",
        "default": "#ff4444",
        "meta": []
      },
      {
        "key": "primary_color",
        "prop": "primaryColor",
        "type": "color",
        "label": "Primary Color",
        "group": "Theme Colors",
        "default": "#e94560",
        "meta": []
      },
      {
        "key": "secondary_color",
        "prop": "secondaryColor",
        "type": "color",
        "label": "Secondary Color",
        "group": "Theme Colors",
        "default": "#1a1a2e",
        "meta": []
      },
      {
        "key": "accent_color",
        "prop": "accentColor",
        "type": "color",
        "label": "Accent Color",
        "group": "Theme Colors",
        "default": "#ffd700",
        "meta": []
      }
    ]
  },
  "football": {
    "key": "football",
    "label": "Football",
    "schema": [
      {
        "key": "intro_enabled",
        "prop": "introEnabled",
        "type": "toggle",
        "label": "Show Intro Screen",
        "group": "Intro",
        "default": true,
        "meta": []
      },
      {
        "key": "intro_title_image",
        "prop": "introTitleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Shown on the intro screen — your logo / brand art (PNG with transparency)"
        }
      },
      {
        "key": "intro_welcome_text",
        "prop": "introWelcomeText",
        "type": "text",
        "label": "Welcome Message",
        "group": "Intro",
        "default": "Welcome to {name}",
        "meta": {
          "help": 'Use {name} to insert the game name, e.g. "Welcome to {name}"'
        }
      },
      {
        "key": "intro_subtitle",
        "prop": "introSubtitle",
        "type": "text",
        "label": "Subtitle",
        "group": "Intro",
        "default": "Beat the keeper to win instant prizes",
        "meta": []
      },
      {
        "key": "intro_button_text",
        "prop": "introButtonText",
        "type": "text",
        "label": "Start Button Text",
        "group": "Intro",
        "default": "Kick Off ⚽",
        "meta": []
      },
      {
        "key": "intro_voice_enabled",
        "prop": "introVoiceEnabled",
        "type": "toggle",
        "label": "Speak welcome aloud (auto voice)",
        "group": "Intro",
        "default": true,
        "meta": {
          "help": "Reads the welcome message using the device voice when no Welcome Sound is uploaded"
        }
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Optional — plays on the intro and overrides the spoken welcome"
        }
      },
      {
        "key": "theme",
        "prop": "theme",
        "type": "select",
        "label": "Theme",
        "group": "Look",
        "default": "classic",
        "meta": {
          "help": "Restyles the pitch, stadium and sky",
          "options": [
            {
              "value": "classic",
              "label": "Classic (Daytime)"
            },
            {
              "value": "night",
              "label": "Night Match"
            },
            {
              "value": "retro",
              "label": "Retro"
            },
            {
              "value": "neon",
              "label": "Neon Arcade"
            }
          ]
        }
      },
      {
        "key": "ball_image",
        "prop": "ballImage",
        "type": "media",
        "label": "Ball Image",
        "group": "Assets",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional custom football art (PNG with transparency)"
        }
      },
      {
        "key": "ball_color",
        "prop": "ballColor",
        "type": "color",
        "label": "Ball Color",
        "group": "Assets",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "goal_color",
        "prop": "goalColor",
        "type": "color",
        "label": "Goal / Net Color",
        "group": "Assets",
        "default": "#eeeeee",
        "meta": []
      },
      {
        "key": "keeper_sheet",
        "prop": "keeperSheet",
        "type": "media",
        "label": "Goalkeeper Sprite Sheet",
        "group": "Animated Characters",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — a horizontal PNG strip of equal frames. Frame order: 1) ready, 2) dive LEFT, 3) dive RIGHT. Leave blank for the drawn keeper."
        }
      },
      {
        "key": "keeper_frames",
        "prop": "keeperFrames",
        "type": "number",
        "label": "Keeper Frames",
        "group": "Animated Characters",
        "default": 0,
        "meta": {
          "help": "Leave at 0 to auto-detect (single image = 1 frame, strip = its real frame count). Set a number only to force it. For an animated strip the last two frames should be dive-left and dive-right; the rest are the walk cycle."
        }
      },
      {
        "key": "striker_sheet",
        "prop": "strikerSheet",
        "type": "media",
        "label": "Striker Sprite Sheet",
        "group": "Animated Characters",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — a horizontal PNG strip of equal frames. Frame order: 1) stand, 2) run, 3) kick. Leave blank for the drawn striker."
        }
      },
      {
        "key": "striker_frames",
        "prop": "strikerFrames",
        "type": "number",
        "label": "Striker Frames",
        "group": "Animated Characters",
        "default": 0,
        "meta": {
          "help": "Leave at 0 to auto-detect (single image = 1 frame, strip = its real frame count). Set a number only to force it. For an animated strip use 3 frames: 1) stand, 2) run, 3) kick."
        }
      },
      {
        "key": "sprite_chroma",
        "prop": "spriteChroma",
        "type": "toggle",
        "label": "Auto-remove sprite background",
        "group": "Animated Characters",
        "default": false,
        "meta": {
          "help": "Turn on for AI-generated sheets (e.g. Gemini) that come with a solid or checkerboard background instead of real transparency — the game strips it automatically."
        }
      },
      {
        "key": "title_text",
        "prop": "titleText",
        "type": "text",
        "label": "Title",
        "group": "Text",
        "default": "Take Your Shot!",
        "meta": []
      },
      {
        "key": "win_text",
        "prop": "winText",
        "type": "text",
        "label": "Win Message",
        "group": "Text",
        "default": "GOAL! You scored!",
        "meta": []
      },
      {
        "key": "lose_text",
        "prop": "loseText",
        "type": "text",
        "label": "Lose Message",
        "group": "Text",
        "default": "Saved! Unlucky…",
        "meta": []
      },
      {
        "key": "primary_color",
        "prop": "primaryColor",
        "type": "color",
        "label": "Primary",
        "group": "Colors",
        "default": "#1b5e20",
        "meta": []
      },
      {
        "key": "accent_color",
        "prop": "accentColor",
        "type": "color",
        "label": "Accent",
        "group": "Colors",
        "default": "#ffeb3b",
        "meta": []
      },
      {
        "key": "text_color",
        "prop": "textColor",
        "type": "color",
        "label": "Text",
        "group": "Colors",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "kick_sound",
        "prop": "kickSound",
        "type": "media",
        "label": "Kick Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "whistle_sound",
        "prop": "whistleSound",
        "type": "media",
        "label": "Whistle Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "crowd_sound",
        "prop": "crowdSound",
        "type": "media",
        "label": "Crowd Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound (cheer)",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "show_top_prize",
        "prop": "showTopPrize",
        "type": "toggle",
        "label": "Show Top Prize Banner",
        "group": "Display Options",
        "default": true,
        "meta": []
      },
      {
        "key": "host_enabled",
        "prop": "hostEnabled",
        "type": "toggle",
        "label": "Show Commentator (host + mic)",
        "group": "Display Options",
        "default": true,
        "meta": []
      },
      {
        "key": "host_image",
        "prop": "hostImage",
        "type": "media",
        "label": "Commentator Image",
        "group": "Display Options",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — upload your own host / mascot (PNG, transparent). Defaults to a drawn pundit."
        }
      }
    ]
  },
  "fishing": {
    "key": "fishing",
    "label": "Fishing",
    "schema": [
      {
        "key": "intro_enabled",
        "prop": "introEnabled",
        "type": "toggle",
        "label": "Show Intro Screen",
        "group": "Intro",
        "default": true,
        "meta": []
      },
      {
        "key": "intro_title_image",
        "prop": "introTitleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Shown on the intro screen — your logo / brand art (PNG with transparency)"
        }
      },
      {
        "key": "intro_welcome_text",
        "prop": "introWelcomeText",
        "type": "text",
        "label": "Welcome Message",
        "group": "Intro",
        "default": "Welcome to {name}",
        "meta": {
          "help": "Use {name} to insert the game name"
        }
      },
      {
        "key": "intro_subtitle",
        "prop": "introSubtitle",
        "type": "text",
        "label": "Subtitle",
        "group": "Intro",
        "default": "Cast your line to reel in instant prizes",
        "meta": []
      },
      {
        "key": "intro_button_text",
        "prop": "introButtonText",
        "type": "text",
        "label": "Start Button Text",
        "group": "Intro",
        "default": "Cast Off 🎣",
        "meta": []
      },
      {
        "key": "intro_voice_enabled",
        "prop": "introVoiceEnabled",
        "type": "toggle",
        "label": "Speak welcome aloud (auto voice)",
        "group": "Intro",
        "default": false,
        "meta": {
          "help": "OFF by default. When ON, reads the welcome message aloud using the device voice if no Welcome Sound is uploaded. The uploaded Welcome Sound always plays regardless."
        }
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Optional — plays on the intro and overrides the spoken welcome"
        }
      },
      {
        "key": "theme",
        "prop": "theme",
        "type": "select",
        "label": "Theme",
        "group": "Look",
        "default": "stormy",
        "meta": {
          "help": "Restyles the sky, sea and lighting",
          "options": [
            {
              "value": "chill",
              "label": "Chill"
            },
            {
              "value": "sunset",
              "label": "Sunset"
            },
            {
              "value": "night",
              "label": "Night Time"
            },
            {
              "value": "stormy",
              "label": "Stormy"
            }
          ]
        }
      },
      {
        "key": "sun_enabled",
        "prop": "sunEnabled",
        "type": "toggle",
        "label": "Show Sun",
        "group": "Look",
        "default": true,
        "meta": []
      },
      {
        "key": "sun_image",
        "prop": "sunImage",
        "type": "media",
        "label": "Sun Image",
        "group": "Look",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — your own sun / moon art (PNG, transparent). Defaults to a drawn sun."
        }
      },
      {
        "key": "clouds_enabled",
        "prop": "cloudsEnabled",
        "type": "toggle",
        "label": "Show Clouds",
        "group": "Look",
        "default": true,
        "meta": []
      },
      {
        "key": "underwater_image",
        "prop": "underwaterImage",
        "type": "media",
        "label": "Underwater Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — a full backdrop for the underwater world (reef, deep sea, treasure…). Fish + line animate on top, with a light shimmer over it. The drawn seabed is used when blank."
        }
      },
      {
        "key": "boat_image",
        "prop": "boatImage",
        "type": "media",
        "label": "Boat Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — your own boat art (PNG, transparent). Side-on, hull flat along the bottom edge, no rod/people. Defaults to a drawn boat."
        }
      },
      {
        "key": "boat_waterline",
        "prop": "boatWaterline",
        "type": "number",
        "label": "Boat Waterline (nudge up / down)",
        "group": "Scene Art",
        "default": 0,
        "meta": {
          "help": "Fine-tune where the boat sits on the water. Increase to sink it LOWER into the sea (closes any gap under the hull); decrease to LIFT it. A tightly-cropped boat PNG usually sits right at 0."
        }
      },
      {
        "key": "fisherman_sheet",
        "prop": "fishermanSheet",
        "type": "media",
        "label": "Fisherman Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — fisherman art or a horizontal sprite strip (idle, cast, reel). Defaults to a drawn fisherman."
        }
      },
      {
        "key": "fisherman_frames",
        "prop": "fishermanFrames",
        "type": "number",
        "label": "Fisherman Frames",
        "group": "Scene Art",
        "default": 0,
        "meta": {
          "help": "Leave 0 to auto-detect (single image = 1 frame, strip = its frame count). For an animated strip use 3: 1) idle, 2) cast, 3) reel."
        }
      },
      {
        "key": "fish_image",
        "prop": "fishImage",
        "type": "media",
        "label": "Caught Fish Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — the fish shown on a winning catch. Defaults to a drawn fish."
        }
      },
      {
        "key": "sprite_chroma",
        "prop": "spriteChroma",
        "type": "toggle",
        "label": "Auto-remove image background",
        "group": "Scene Art",
        "default": false,
        "meta": {
          "help": "Turn on for AI-generated art (e.g. Gemini) that has a solid/checkerboard background instead of real transparency."
        }
      },
      {
        "key": "title_text",
        "prop": "titleText",
        "type": "text",
        "label": "Title",
        "group": "Text",
        "default": "Cast to Win!",
        "meta": []
      },
      {
        "key": "win_text",
        "prop": "winText",
        "type": "text",
        "label": "Win Message",
        "group": "Text",
        "default": "Reeled in a winner! 🎣",
        "meta": []
      },
      {
        "key": "lose_text",
        "prop": "loseText",
        "type": "text",
        "label": "Lose Message",
        "group": "Text",
        "default": "The one that got away…",
        "meta": []
      },
      {
        "key": "primary_color",
        "prop": "primaryColor",
        "type": "color",
        "label": "Primary",
        "group": "Colors",
        "default": "#0277bd",
        "meta": []
      },
      {
        "key": "accent_color",
        "prop": "accentColor",
        "type": "color",
        "label": "Accent",
        "group": "Colors",
        "default": "#ffd54f",
        "meta": []
      },
      {
        "key": "text_color",
        "prop": "textColor",
        "type": "color",
        "label": "Text",
        "group": "Colors",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "cast_sound",
        "prop": "castSound",
        "type": "media",
        "label": "Cast Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "splash_sound",
        "prop": "splashSound",
        "type": "media",
        "label": "Splash Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "reel_sound",
        "prop": "reelSound",
        "type": "media",
        "label": "Reel Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound (catch)",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "show_top_prize",
        "prop": "showTopPrize",
        "type": "toggle",
        "label": "Show Top Prize Banner",
        "group": "Display Options",
        "default": false,
        "meta": []
      }
    ]
  },
  "ticketeater": {
    "key": "ticketeater",
    "label": "Ticket Eater",
    "schema": [
      {
        "key": "intro_enabled",
        "prop": "introEnabled",
        "type": "toggle",
        "label": "Show Intro Screen",
        "group": "Intro",
        "default": true,
        "meta": []
      },
      {
        "key": "intro_title_image",
        "prop": "introTitleImage",
        "type": "media",
        "label": "Title Image",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Shown on the intro screen — your logo / brand art (PNG with transparency)"
        }
      },
      {
        "key": "intro_welcome_text",
        "prop": "introWelcomeText",
        "type": "text",
        "label": "Welcome Message",
        "group": "Intro",
        "default": "Welcome to {name}",
        "meta": {
          "help": "Use {name} to insert the game name"
        }
      },
      {
        "key": "intro_subtitle",
        "prop": "introSubtitle",
        "type": "text",
        "label": "Subtitle",
        "group": "Intro",
        "default": "Feed your tickets to the monster",
        "meta": []
      },
      {
        "key": "intro_button_text",
        "prop": "introButtonText",
        "type": "text",
        "label": "Start Button Text",
        "group": "Intro",
        "default": "Feed the Eater 👹",
        "meta": []
      },
      {
        "key": "welcome_sound",
        "prop": "welcomeSound",
        "type": "media",
        "label": "Welcome Sound",
        "group": "Intro",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Optional — plays on the intro"
        }
      },
      {
        "key": "theme",
        "prop": "theme",
        "type": "select",
        "label": "Theme",
        "group": "Look",
        "default": "arcade",
        "meta": {
          "help": "Restyles the room, conveyor and lighting",
          "options": [
            {
              "value": "arcade",
              "label": "Arcade (neon)"
            },
            {
              "value": "cave",
              "label": "Cave (lair)"
            },
            {
              "value": "candy",
              "label": "Candy"
            },
            {
              "value": "spooky",
              "label": "Spooky"
            }
          ]
        }
      },
      {
        "key": "mascot_image",
        "prop": "mascotImage",
        "type": "media",
        "label": "Mascot Frame 1 (normal)",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — a mascot / character (PNG, transparent) that sits above the tickets. This is the normal state (before any win). It lights up + wiggles as wins come in. Separate from the Title image."
        }
      },
      {
        "key": "mascot_image_2",
        "prop": "mascotImage2",
        "type": "media",
        "label": "Mascot Frame 2 (after 1st win)",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — swaps in once the first win lands. Falls back to Frame 1 if blank."
        }
      },
      {
        "key": "mascot_image_3",
        "prop": "mascotImage3",
        "type": "media",
        "label": "Mascot Frame 3 (3+ wins)",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — swaps in once 3 wins land in the same game. Falls back to Frame 2 if blank."
        }
      },
      {
        "key": "ticket_image",
        "prop": "ticketImage",
        "type": "media",
        "label": "Main Ticket Image (the reader)",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — the big reader ticket in the middle (PNG, transparent). The rolling number is drawn on top. Defaults to a clean drawn ticket."
        }
      },
      {
        "key": "rising_ticket_image",
        "prop": "risingTicketImage",
        "type": "media",
        "label": "Rising Ticket Image (the ones going in)",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — the small tickets that flow up into the reader (PNG, transparent). Shown rotated vertical. Defaults to a drawn ticket. Use a different design from the main ticket."
        }
      },
      {
        "key": "background_image",
        "prop": "backgroundImage",
        "type": "media",
        "label": "Background Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — a full backdrop behind the ticket. The drawn themed background is used when blank."
        }
      },
      {
        "key": "pouch_image",
        "prop": "pouchImage",
        "type": "media",
        "label": "Pouch / Inventory Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Optional — the pouch that won prizes drop into (PNG, transparent). Defaults to a drawn pouch."
        }
      },
      {
        "key": "prize_image",
        "prop": "prizeImage",
        "type": "media",
        "label": "Fallback Prize Image",
        "group": "Scene Art",
        "default": "",
        "meta": {
          "accept": "image",
          "help": "Only used if a winning instant-win has NO image of its own — the win reveal normally shows the real competition instant-win image. Defaults to a trophy."
        }
      },
      {
        "key": "title_text",
        "prop": "titleText",
        "type": "text",
        "label": "Title",
        "group": "Text",
        "default": "Feed the Eater!",
        "meta": []
      },
      {
        "key": "win_text",
        "prop": "winText",
        "type": "text",
        "label": "Win Message",
        "group": "Text",
        "default": "Yum! It coughed up a prize! 🎉",
        "meta": []
      },
      {
        "key": "lose_text",
        "prop": "loseText",
        "type": "text",
        "label": "Lose Message",
        "group": "Text",
        "default": "Gulp… nothing that time",
        "meta": []
      },
      {
        "key": "primary_color",
        "prop": "primaryColor",
        "type": "color",
        "label": "Primary",
        "group": "Colors",
        "default": "#6c5ce7",
        "meta": []
      },
      {
        "key": "accent_color",
        "prop": "accentColor",
        "type": "color",
        "label": "Accent",
        "group": "Colors",
        "default": "#ffd54f",
        "meta": []
      },
      {
        "key": "number_color",
        "prop": "numberColor",
        "type": "color",
        "label": "Ticket Number Colour",
        "group": "Colors",
        "default": "",
        "meta": {
          "help": "Colour of the rolling ticket number. Leave blank to use the theme colour."
        }
      },
      {
        "key": "text_color",
        "prop": "textColor",
        "type": "color",
        "label": "Text",
        "group": "Colors",
        "default": "#ffffff",
        "meta": []
      },
      {
        "key": "feed_sound",
        "prop": "feedSound",
        "type": "media",
        "label": "Feed Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "chomp_sound",
        "prop": "chompSound",
        "type": "media",
        "label": "Chomp Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "gulp_sound",
        "prop": "gulpSound",
        "type": "media",
        "label": "Gulp Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "win_sound",
        "prop": "winSound",
        "type": "media",
        "label": "Win Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "collect_sound",
        "prop": "collectSound",
        "type": "media",
        "label": "Collect Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio",
          "help": "Plays when a won prize is collected into the pouch"
        }
      },
      {
        "key": "loss_sound",
        "prop": "lossSound",
        "type": "media",
        "label": "Loss Sound",
        "group": "Sound Effects",
        "default": "",
        "meta": {
          "accept": "audio"
        }
      },
      {
        "key": "show_top_prize",
        "prop": "showTopPrize",
        "type": "toggle",
        "label": "Show Top Prize Banner",
        "group": "Display Options",
        "default": false,
        "meta": []
      }
    ]
  }
};
function schemaFor(key) {
  return STUDIO_SCHEMAS[key] && STUDIO_SCHEMAS[key].schema || [];
}
function defaultsFor(key) {
  const out = {};
  for (const f2 of schemaFor(key)) out[f2.key] = f2.default;
  return out;
}
function assetsFor(key, config3) {
  const out = {};
  const cfg = config3 || {};
  for (const f2 of schemaFor(key)) out[f2.prop] = cfg[f2.key] !== void 0 ? cfg[f2.key] : f2.default;
  return out;
}
const visible = (el) => !!el && el.offsetParent !== null && !el.disabled;
const click = (root, sel) => {
  const el = root.querySelector(sel);
  if (visible(el)) {
    el.click();
    return true;
  }
  return false;
};
const clickText = (root, re) => {
  const el = [...root.querySelectorAll("button")].find((b2) => re.test(b2.textContent || "") && visible(b2));
  if (el) {
    el.click();
    return true;
  }
  return false;
};
const pointer = (el, type, x, y2) => el.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y2, pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0 }));
const PLANS = {
  slots: { every: 5200, tick: (r2) => {
    click(r2, ".controls button");
  } },
  spinny: { every: 7500, tick: (r2) => {
    click(r2, ".static-highlight-segment") || click(r2, "svg");
  } },
  scratchy: { every: 7e3, tick: (r2, n2) => {
    if (n2 % 2 === 0) clickText(r2, /reveal all/i);
    else clickText(r2, /replay/i);
  } },
  bingo: { every: 6e3, tick: (r2, n2) => {
    if (!clickText(r2, /reveal/i)) return n2 > 1 ? "done" : void 0;
  } },
  coindrop: { every: 4200, tick: (r2) => {
    if (!click(r2, ".drop-button:not([disabled])")) return "done";
  } },
  popgame: { every: 1100, tick: (r2) => {
    if (!click(r2, ".pop-item-container:not(.popped)")) return "done";
  } },
  football: {
    every: 1300,
    tick: (r2, n2, state) => {
      if (click(r2, ".fbg-intro-cta")) return;
      if (clickText(r2, /step up/i)) {
        state.aimed = false;
        return;
      }
      if (click(r2, ".fbg-shoot")) {
        state.aimed = false;
        return;
      }
      const rect = r2.querySelector('rect[style*="crosshair"]');
      if (rect && !state.aimed) {
        const b2 = rect.closest("svg").getBoundingClientRect();
        const x = b2.left + b2.width * (0.3 + Math.random() * 0.4), y2 = b2.top + b2.height * (0.2 + Math.random() * 0.25);
        pointer(rect, "pointerdown", x, y2);
        pointer(rect, "pointerup", x, y2);
        state.aimed = true;
        return;
      }
      if (clickText(r2, /next penalty|collect/i)) {
        state.aimed = false;
        return;
      }
      if (clickText(r2, /^close$/i)) return "done";
    }
  },
  fishing: { every: 0 },
  // plays itself in demo mode
  ticketeater: { every: 2500, tick: (r2) => {
    click(r2, ".te-intro-start") || click(r2, ".te-release");
  } }
};
function startAutopilot(rootEl, gameKey, onDone) {
  const plan = PLANS[gameKey];
  if (!plan || !plan.every) return () => {
  };
  let n2 = 0, timer = null, stopped = false;
  const state = {};
  const loop = () => {
    if (stopped) return;
    let result;
    try {
      result = plan.tick(rootEl, n2++, state);
    } catch (e2) {
    }
    if (result === "done") {
      onDone && onDone();
      return;
    }
    timer = setTimeout(loop, plan.every);
  };
  timer = setTimeout(loop, 1200 + Math.random() * 800);
  return () => {
    stopped = true;
    clearTimeout(timer);
  };
}
const FRAME_W = 440;
const FRAME_H = 700;
const _sfc_main$u = {
  __name: "GameEmbed",
  __ssrInlineRender: true,
  props: {
    game: { type: String, required: true },
    config: { type: Object, default: () => ({}) },
    mode: { type: String, default: "tile" },
    // 'tile' | 'preview'
    autoplay: { type: Boolean, default: true },
    active: { type: Boolean, default: true }
    // mount only when true (lazy)
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const box = ref(null);
    const play = ref(null);
    const zoom = ref(1);
    const epoch = ref(0);
    const Player = shallowRef(null);
    let ro = null, stopPilot = null, remountTimer = null;
    const assets = computed(() => assetsFor(props.game, props.config));
    const tickets = makeDemoTickets(props.game === "popgame" ? 30 : 10);
    function fit() {
      var _a;
      const host = (_a = box.value) == null ? void 0 : _a.parentElement;
      if (!host || props.mode !== "tile") {
        zoom.value = 1;
        return;
      }
      const r2 = host.getBoundingClientRect();
      if (!r2.width) return;
      zoom.value = Math.max(0.25, Math.min(1.1, Math.min(r2.width / FRAME_W, r2.height / FRAME_H)));
    }
    function stop() {
      if (stopPilot) stopPilot();
      stopPilot = null;
      clearTimeout(remountTimer);
    }
    async function arm() {
      stop();
      if (!props.autoplay || props.mode !== "tile" || !Player.value) return;
      await nextTick();
      remountTimer = setTimeout(() => {
        if (!play.value) return;
        stopPilot = startAutopilot(play.value, props.game, () => {
          remountTimer = setTimeout(() => {
            epoch.value++;
            arm();
          }, 3500);
        });
      }, 900);
    }
    watch(() => props.active, async (on) => {
      if (on && !Player.value) {
        const loader = gamePlayers[props.game];
        if (loader) Player.value = defineAsyncComponent(loader);
        await nextTick();
        arm();
      }
    }, { immediate: true });
    onMounted(() => {
      var _a;
      fit();
      ro = new ResizeObserver(fit);
      if ((_a = box.value) == null ? void 0 : _a.parentElement) ro.observe(box.value.parentElement);
    });
    onBeforeUnmount(() => {
      stop();
      ro == null ? void 0 : ro.disconnect();
    });
    __expose({ restart: () => {
      epoch.value++;
      arm();
    } });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "box",
        ref: box,
        class: ["gbox", "gbox-" + __props.mode],
        style: { "--gw": FRAME_W + "px", zoom: zoom.value }
      }, _attrs))}><div class="${ssrRenderClass([[__props.mode === "tile" ? "embed-tile" : "embed-preview"], "gplay"])}">`);
      if (Player.value) {
        ssrRenderVNode(_push, createVNode(resolveDynamicComponent(Player.value), {
          key: epoch.value,
          modelValue: true,
          demoMode: true,
          assets: assets.value,
          tickets: unref(tickets),
          instant_win_categories: unref(demoCategories)
        }, null), _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/GameEmbed.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "TextField",
  __ssrInlineRender: true,
  props: {
    field: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white/5 rounded-xl p-4 border border-white/10" }, _attrs))}><label class="block mb-2 font-semibold text-white text-sm">${ssrInterpolate(__props.field.label)}</label><input type="text"${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", ((_a = __props.field.meta) == null ? void 0 : _a.placeholder) || "")} class="w-full px-3 py-2 bg-white/5 text-white text-sm border border-white/10 rounded-lg outline-none">`);
      if ((_b = __props.field.meta) == null ? void 0 : _b.help) {
        _push(`<p class="text-gray-500 text-xs mt-1">${ssrInterpolate(__props.field.meta.help)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Studio/fields/TextField.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "ColorField",
  __ssrInlineRender: true,
  props: {
    field: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white/5 rounded-xl p-4 border border-white/10" }, _attrs))}><label class="block mb-2 font-semibold text-white text-xs">${ssrInterpolate(__props.field.label)}</label><div class="flex flex-col gap-2"><input type="color"${ssrRenderAttr("value", __props.modelValue || "#000000")} class="w-full h-12 cursor-pointer rounded-lg border-2 border-white/20"><input type="text"${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", ((_a = __props.field.meta) == null ? void 0 : _a.placeholder) || "")} class="px-3 py-1.5 bg-white/5 text-white text-xs border border-white/10 rounded-lg outline-none"></div>`);
      if ((_b = __props.field.meta) == null ? void 0 : _b.help) {
        _push(`<p class="text-gray-500 text-xs mt-1">${ssrInterpolate(__props.field.meta.help)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Studio/fields/ColorField.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "MediaField",
  __ssrInlineRender: true,
  props: {
    field: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    ref(null);
    const fileName = ref("");
    const accept = (() => {
      var _a, _b;
      const a2 = (_b = (_a = props.field) == null ? void 0 : _a.meta) == null ? void 0 : _b.accept;
      if (a2 === "image") return "image/*";
      if (a2 === "video") return "video/*,image/*";
      if (a2 === "audio") return "audio/*";
      return "image/*,video/*,audio/*";
    })();
    onBeforeUnmount(() => {
    });
    const isVideo = (u2) => /\.(mp4|webm|ogg|mov)$/i.test(u2) || fileName.value && /\.(mp4|webm|ogg|mov)$/i.test(fileName.value);
    const isAudio = (u2) => {
      var _a;
      return /\.(mp3|wav|m4a)$/i.test(u2) || fileName.value && /\.(mp3|wav|m4a)$/i.test(fileName.value) || ((_a = props.field.meta) == null ? void 0 : _a.accept) === "audio";
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white/5 rounded-xl p-4 border border-white/10" }, _attrs))}><label class="block mb-2 font-semibold text-white text-sm">${ssrInterpolate(__props.field.label)}</label><label class="flex items-center justify-between gap-3 px-3 py-2 rounded-lg border border-dashed border-white/20 bg-white/5 hover:bg-white/10 cursor-pointer text-sm text-white/80 transition"><span class="truncate">${ssrInterpolate(fileName.value || `Upload ${((_a = __props.field.meta) == null ? void 0 : _a.accept) || "file"}`)}</span><span class="shrink-0 px-2 py-1 rounded-md bg-gradient-to-r from-pink-600 to-purple-600 text-white text-xs font-bold">Choose</span><input type="file"${ssrRenderAttr("accept", unref(accept))} class="hidden"></label>`);
      if ((_b = __props.field.meta) == null ? void 0 : _b.help) {
        _push(`<p class="text-gray-400 text-xs mt-2">${ssrInterpolate(__props.field.meta.help)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.modelValue) {
        _push(`<div class="mt-3 space-y-2">`);
        if (isVideo(__props.modelValue)) {
          _push(`<video${ssrRenderAttr("src", __props.modelValue)} class="w-full h-32 object-cover rounded-lg border border-pink-500/50" muted autoplay loop playsinline></video>`);
        } else if (isAudio(__props.modelValue)) {
          _push(`<audio${ssrRenderAttr("src", __props.modelValue)} controls class="w-full"></audio>`);
        } else {
          _push(`<img${ssrRenderAttr("src", __props.modelValue)} class="w-full h-32 object-cover rounded-lg border border-pink-500/50" alt="">`);
        }
        _push(`<button type="button" class="w-full px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 text-sm font-semibold rounded-lg transition-all">Remove</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Studio/fields/MediaField.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "SelectField",
  __ssrInlineRender: true,
  props: {
    field: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white/5 rounded-xl p-4 border border-white/10" }, _attrs))}><label class="block mb-2 font-semibold text-white text-sm">${ssrInterpolate(__props.field.label)}</label><select${ssrRenderAttr("value", __props.modelValue)} class="w-full px-3 py-2 bg-[#2a3154] text-white text-sm border border-white/10 rounded-lg outline-none"><!--[-->`);
      ssrRenderList(((_a = __props.field.meta) == null ? void 0 : _a.options) || [], (opt) => {
        _push(`<option${ssrRenderAttr("value", opt.value)}>${ssrInterpolate(opt.label)}</option>`);
      });
      _push(`<!--]--></select>`);
      if ((_b = __props.field.meta) == null ? void 0 : _b.help) {
        _push(`<p class="text-gray-500 text-xs mt-1">${ssrInterpolate(__props.field.meta.help)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Studio/fields/SelectField.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "ToggleField",
  __ssrInlineRender: true,
  props: {
    field: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<label${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between gap-4 bg-white/5 rounded-xl p-4 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors" }, _attrs))}><div><span class="text-white font-semibold text-sm block">${ssrInterpolate(__props.field.label)}</span>`);
      if ((_a = __props.field.meta) == null ? void 0 : _a.help) {
        _push(`<span class="text-gray-400 text-xs">${ssrInterpolate(__props.field.meta.help)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative flex-shrink-0"><input type="checkbox"${ssrIncludeBooleanAttr(!!__props.modelValue) ? " checked" : ""} class="sr-only peer"><div class="w-11 h-6 bg-gray-600 peer-checked:bg-teal-500 rounded-full transition-colors"></div><div class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div></div></label>`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Studio/fields/ToggleField.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "NumberField",
  __ssrInlineRender: true,
  props: {
    field: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white/5 rounded-xl p-4 border border-white/10" }, _attrs))}><label class="block mb-2 font-semibold text-white text-sm">${ssrInterpolate(__props.field.label)}</label><input type="number"${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("min", (_a = __props.field.meta) == null ? void 0 : _a.min)}${ssrRenderAttr("max", (_b = __props.field.meta) == null ? void 0 : _b.max)}${ssrRenderAttr("step", ((_c = __props.field.meta) == null ? void 0 : _c.step) || 1)} class="w-full px-3 py-2 bg-white/5 text-white text-sm border border-white/10 rounded-lg outline-none">`);
      if ((_d = __props.field.meta) == null ? void 0 : _d.help) {
        _push(`<p class="text-gray-500 text-xs mt-1">${ssrInterpolate(__props.field.meta.help)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Studio/fields/NumberField.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "SchemaForm",
  __ssrInlineRender: true,
  props: {
    schema: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const componentFor = {
      text: _sfc_main$t,
      textarea: _sfc_main$t,
      color: _sfc_main$s,
      media: _sfc_main$r,
      select: _sfc_main$q,
      toggle: _sfc_main$p,
      number: _sfc_main$o
    };
    const visible2 = (f2) => {
      var _a;
      const cond = (_a = f2.meta) == null ? void 0 : _a.visibleIf;
      if (!(cond == null ? void 0 : cond.field)) return true;
      const raw = props.modelValue[cond.field];
      const ctrl = (Array.isArray(props.schema) ? props.schema : []).find((x) => x.key === cond.field);
      const val = raw === void 0 || raw === null || raw === "" ? Number((ctrl == null ? void 0 : ctrl.default) ?? 0) : Number(raw);
      return cond.gte === void 0 || val >= cond.gte;
    };
    const groups = computed(() => {
      const map = /* @__PURE__ */ new Map();
      for (const f2 of Array.isArray(props.schema) ? props.schema : []) {
        if (!visible2(f2)) continue;
        if (!map.has(f2.group)) map.set(f2.group, []);
        map.get(f2.group).push(f2);
      }
      return Array.from(map.entries()).map(([name, fields]) => ({ name, fields }));
    });
    const update = (key, value) => {
      emit("update:modelValue", { ...props.modelValue, [key]: value });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><!--[-->`);
      ssrRenderList(groups.value, (group) => {
        _push(`<div class="space-y-4"><h3 class="text-white font-bold text-lg border-b border-white/10 pb-2">${ssrInterpolate(group.name)}</h3><div class="${ssrRenderClass([group.fields.every((f2) => f2.type === "color") ? "sm:grid-cols-2" : "", "grid grid-cols-1 gap-4"])}"><!--[-->`);
        ssrRenderList(group.fields, (f2) => {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(componentFor[f2.type] || _sfc_main$t), {
            key: f2.key,
            field: f2,
            modelValue: __props.modelValue[f2.key],
            "onUpdate:modelValue": (v2) => update(f2.key, v2)
          }, null), _parent);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Studio/SchemaForm.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const CALENDLY$1 = "https://calendly.com/contact-compengine/30min";
const _sfc_main$m = {
  __name: "UltraStudioModal",
  __ssrInlineRender: true,
  props: { modelValue: { type: Boolean, default: false }, game: { type: String, default: "slots" } },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const games = Object.values(STUDIO_SCHEMAS).map((g2) => ({ key: g2.key, label: g2.label }));
    const current = ref(props.game);
    const configs = reactive({});
    const config3 = computed(() => {
      if (!configs[current.value]) configs[current.value] = defaultsFor(current.value);
      return configs[current.value];
    });
    const schema = computed(() => schemaFor(current.value));
    const label = computed(() => {
      var _a;
      return ((_a = STUDIO_SCHEMAS[current.value]) == null ? void 0 : _a.label) || "";
    });
    function onUpdate(next) {
      Object.assign(config3.value, next);
      emit("change", { game: current.value, config: { ...config3.value } });
    }
    function close() {
      emit("update:modelValue", false);
    }
    watch(() => props.game, (g2) => {
      if (g2) current.value = g2;
    });
    watch(() => props.modelValue, (open) => {
      document.body.style.overflow = open ? "hidden" : "";
      if (open && typeof window.ceTrack === "function") window.ceTrack("studio_open", { game: current.value });
    });
    const onKey = (e2) => {
      if (e2.key === "Escape" && props.modelValue) close();
    };
    if (typeof window !== "undefined") window.addEventListener("keydown", onKey);
    onBeforeUnmount(() => {
      if (typeof window !== "undefined") window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="studio" role="dialog" aria-modal="true" aria-label="Build your own game"><div class="studio-backdrop"></div><div class="studio-dialog"><header class="studio-head"><div><small>Game Studio · try it yourself</small><b>Build your own ${ssrInterpolate(label.value)}</b></div><div class="studio-games"><!--[-->`);
          ssrRenderList(unref(games), (g2) => {
            _push2(`<button type="button" class="${ssrRenderClass({ on: g2.key === current.value })}">${ssrInterpolate(g2.label)}</button>`);
          });
          _push2(`<!--]--></div><button type="button" class="studio-x" aria-label="Close">×</button></header><div class="studio-body"><aside class="studio-form"><p class="studio-hint">These are the same settings operators get. Change a colour, type a title, upload your own logo, background or sound — the game on the right updates instantly. Nothing is saved.</p>`);
          _push2(ssrRenderComponent(_sfc_main$n, {
            schema: schema.value,
            modelValue: config3.value,
            "onUpdate:modelValue": onUpdate
          }, null, _parent));
          _push2(`</aside><section class="studio-preview"><div class="studio-stage">`);
          _push2(ssrRenderComponent(_sfc_main$u, {
            key: current.value,
            game: current.value,
            config: config3.value,
            mode: "preview",
            autoplay: false
          }, null, _parent));
          _push2(`</div><div class="studio-cta"><a${ssrRenderAttr("href", CALENDLY$1)} target="_blank" rel="noopener" class="studio-btn" data-calendly data-track="studio_book_demo">Ship this on my site →</a><span>Live in 1–2 weeks. No developers. Every game included.</span></div></section></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraStudioModal.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const CALENDLY = "https://calendly.com/contact-compengine/30min";
const CYCLE_MS = 4200;
const _sfc_main$l = {
  __name: "UltraGameStudio",
  __ssrInlineRender: true,
  setup(__props) {
    const GAMES = [
      { key: "slots", name: "Slots", tag: "Match 3 to win", icon: "spark" },
      { key: "scratchy", name: "Scratch", tag: "Scratch to reveal", icon: "gift" },
      { key: "spinny", name: "Spinny", tag: "Spin the wheel", icon: "target" },
      { key: "bingo", name: "Bingo", tag: "Complete the line", icon: "dice" },
      { key: "coindrop", name: "Coin Drop", tag: "Drop and bounce", icon: "cash" },
      { key: "popgame", name: "Balloon Pop", tag: "Pop to win", icon: "star" },
      { key: "football", name: "Football", tag: "Take the shot", icon: "target" },
      { key: "fishing", name: "Fishing", tag: "Cast and reel", icon: "fish" },
      { key: "ticketeater", name: "Ticket Eater", tag: "Feed the machine", icon: "doc" }
    ];
    const configs = reactive(Object.fromEntries(GAMES.map((g2) => [g2.key, defaultsFor(g2.key)])));
    const wallEl = ref(null);
    ref(null);
    const tileEls = ref([]);
    const active = ref(GAMES.map(() => false));
    const cur = ref(-1);
    const studioOpen = ref(false);
    const studioGame = ref("slots");
    let cycleTimer = null, visible2 = false, tileIo = null, wallIo = null;
    const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isPhone = () => window.matchMedia("(max-width: 639px)").matches;
    function focus(i2) {
      var _a;
      cur.value = i2;
      clearTimeout(cycleTimer);
      if (isPhone() && !studioOpen.value) (_a = tileEls.value[i2]) == null ? void 0 : _a.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "nearest", inline: "center" });
      if (visible2 && !reduced()) cycleTimer = setTimeout(() => focus((cur.value + 1) % GAMES.length), CYCLE_MS);
    }
    function onStudioChange({ game, config: config3 }) {
      Object.assign(configs[game], config3);
    }
    onMounted(() => {
      tileIo = new IntersectionObserver((entries) => {
        entries.forEach((e2) => {
          if (e2.isIntersecting) {
            active.value[+e2.target.dataset.i] = true;
            tileIo.unobserve(e2.target);
          }
        });
      }, { rootMargin: "360px 0px" });
      tileEls.value.forEach((el) => el && tileIo.observe(el));
      wallIo = new IntersectionObserver((entries) => {
        entries.forEach((e2) => {
          visible2 = e2.isIntersecting;
          if (visible2) focus(cur.value > -1 ? cur.value : 0);
          else clearTimeout(cycleTimer);
        });
      }, { threshold: 0.15 });
      if (wallEl.value) wallIo.observe(wallEl.value);
    });
    onBeforeUnmount(() => {
      clearTimeout(cycleTimer);
      tileIo == null ? void 0 : tileIo.disconnect();
      wallIo == null ? void 0 : wallIo.disconnect();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ id: "game-studio" }, _attrs))}><div class="wrap"><div class="sec-head center"><span class="eyebrow"><i class="dot"></i>✦ Only on CompEngine ✦</span><h2>Game Studio. <span class="grad">Built by you.</span></h2><p class="lead">Other UK competition platforms give operators a handful of fixed game presets. We give a studio. Pick a game, theme it, brand it, preview every change live.</p></div></div><div class="wrap gamewall" id="gamewall" style="${ssrRenderStyle({ "--sc-dur": CYCLE_MS + "ms" })}"><div class="gw-head"><span class="tag" id="gw-live"><i class="dot green"></i>All nine games, playing live</span><div class="gw-build"><span class="pb-clickme"><span class="cm-txt">Click me!</span><svg class="cm-arrow" viewBox="0 0 56 58" aria-hidden="true"><path d="M6 8 C34 10, 46 24, 40 46" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"></path><path d="M32 37 L40 49 L48 36" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><button type="button" class="pb-open" id="gw-build" data-track="game_studio_build_own">Build your own game <span class="arw">→</span></button></div></div><div class="gw-grid" id="gw-grid"><!--[-->`);
      ssrRenderList(GAMES, (g2, i2) => {
        _push(`<div role="button" tabindex="0"${ssrRenderAttr("data-i", i2)} class="${ssrRenderClass([{ on: cur.value === i2 }, "g-tile"])}"${ssrRenderAttr("aria-label", "Customise " + g2.name)}${ssrRenderAttr("data-track", "gamewall_" + g2.key)}><span class="lbl"><span class="lbl-name"><i class="ic"${ssrRenderAttr("data-i", g2.icon)}></i>${ssrInterpolate(g2.name)}</span><small>${ssrInterpolate(g2.tag)}</small></span><div class="gv">`);
        _push(ssrRenderComponent(_sfc_main$u, {
          game: g2.key,
          config: configs[g2.key],
          mode: "tile",
          active: active.value[i2]
        }, null, _parent));
        _push(`</div><span class="play"><i class="ic" data-i="pen"></i><b>Customise</b></span><i class="bar"></i></div>`);
      });
      _push(`<!--]--></div><p class="gw-note hand">every one of these is yours to theme — tap a square to make it your own</p></div><div class="wrap gs-cta"><a${ssrRenderAttr("href", CALENDLY)} target="_blank" rel="noopener" class="btn btn-ghost" data-track="game_studio_book_demo" data-calendly>Book a Demo</a><button type="button" class="btn btn-primary" data-track="game_studio_build_cta">Build your own game</button></div>`);
      _push(ssrRenderComponent(_sfc_main$m, {
        modelValue: studioOpen.value,
        "onUpdate:modelValue": ($event) => studioOpen.value = $event,
        game: studioGame.value,
        onChange: onStudioChange
      }, null, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraGameStudio.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = {
  __name: "UltraEcosystem",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "ecosystem",
        class: "cv"
      }, _attrs))}><div class="wrap"><div class="sec-head"><span class="eyebrow"><i class="dot"></i>Your complete raffle ecosystem</span><h2>Everything you need. <span class="grad">Nine modules. Zero plugins.</span></h2></div><div class="bento" id="bento"><div class="card b-gs"><span class="only">Only on CompEngine</span><h3>Game Studio</h3><div class="viz viz-game">`);
      _push(ssrRenderComponent(_sfc_main$u, {
        game: "slots",
        mode: "tile"
      }, null, _parent));
      _push(`</div><p>Theme it, brand it, preview it live. No developers, no presets.</p><a href="#game-studio" class="link" data-track="ecosystem_try_it">Try it live ↑</a></div><div class="card"><span class="only">Only on CompEngine</span><h3>Separate Cash &amp; Site-Credit Wallets</h3><div class="viz"><div class="wal-bar"><i class="cash"></i><i class="cred"></i></div><div class="wal-lbl"><span><b>Cash 68%</b>Withdrawable · Cash wallet</span><span style="${ssrRenderStyle({ "text-align": "right" })}"><b>Credit 32%</b>Non-withdrawable · Site credit</span></div></div><p>Cash players can withdraw. Site credit they can&#39;t. Both tracked, both usable for instant wins.</p></div><div class="card"><span class="only">Only on CompEngine</span><h3>Free Entry Compliance &amp; Management</h3><div class="viz"><div class="vcoc"><span class="ring"><i class="ic" data-i="check"></i></span><span><b style="${ssrRenderStyle({ "color": "var(--text-0)" })}">UK Voluntary Code</b><br>Mapped end-to-end · since May 2026</span></div></div><p>UK free-entry route, tracked and audited end-to-end. No manual handling.</p><a href="#comparison" class="link" data-track="ecosystem_vcoc">See VCOC alignment →</a></div><div class="card"><h3>Smart Upsell — built into every checkout</h3><div class="viz" style="${ssrRenderStyle({ "padding": "0", "min-height": "130px" })}"><div class="ups"><img src="/images/upsell/upsell.png" alt="" loading="lazy"><div class="modal"><b>Add 10 more tickets for £8?</b><span class="muted">Boost your odds before checkout</span><span class="mbtn">Yes, add them</span></div></div></div><p>Fires at the right point in checkout. +£23 average per order. 87% take it.</p></div><div class="card"><h3>Best-in-class reporting</h3><div class="viz"><svg class="spark" viewBox="0 0 200 64" preserveAspectRatio="none" aria-hidden="true"><path class="area" d="M0 52 L25 46 L50 48 L75 38 L100 34 L125 26 L150 22 L175 14 L200 6 L200 64 L0 64 Z"></path><path d="M0 52 L25 46 L50 48 L75 38 L100 34 L125 26 L150 22 L175 14 L200 6"></path></svg><span class="tag green" style="${ssrRenderStyle({ "justify-self": "start" })}"><i class="ic" data-i="trend"></i>+34% MoM growth</span></div><p>Order patterns, customer LTV, prize cost, P&amp;L per competition.</p><a href="#convert" class="link" data-track="ecosystem_dashboard">See the dashboard →</a></div><div class="card"><h3>Competition Builder</h3><div class="viz"><div class="brows"><div class="brow"><i><span class="ic" data-i="check"></span></i>Prize, price, ticket cap</div><div class="brow"><i><span class="ic" data-i="check"></span></i>Instant wins — no CSV upload</div><div class="brow"><i><span class="ic" data-i="check"></span></i>Promotions, discounts, addons</div><div class="brow"><i><span class="ic" data-i="check"></span></i>Publish</div></div></div><p>Instant wins without CSVs. Promotions, discounts and addons other sites can&#39;t do.</p></div><div class="card"><h3>Automated Payouts &amp; Prize Management</h3><div class="viz"><div class="flow"><span>Winner picks</span><i class="ic" data-i="chev-r"></i><span>Cash · Credit · Prize</span><i class="ic" data-i="chev-r"></i><span>Paid &amp; tracked</span></div></div><p>Winner picks cash, credit or prize. Paid and tracked automatically.</p><a href="#certified-draws" class="link" data-track="ecosystem_prize_flow">See the prize flow →</a></div><div class="card b-scratch"><h3>Scratch to Win</h3><div class="viz"><div class="scratch" id="scratch"><div class="bar"><span>Scratch off <b>50%</b> to reveal your prize</span><button class="btn btn-ghost btn-sm" type="button" id="scratch-reveal">Reveal All</button><button class="btn btn-ghost btn-sm" type="button" id="scratch-reset" style="${ssrRenderStyle({ "margin-left": "0" })}">Reset</button></div><div class="grid" id="scratch-grid"></div></div></div></div><div class="card"><h3>GLI RNG Certified</h3><div class="viz"><a class="gli" href="#certified-draws" data-track="ecosystem_gli"><img src="/images/gli-rng-certified.png" alt="GLI RNG Certified" loading="lazy"><span class="seal">GLI<br>RNG<br>CERTIFIED</span><span>Draws and ticket distribution certified by an independent third party.</span></a></div><p>Draws and ticket distribution certified by an independent third party.</p></div><div class="card"><h3>Built-in Notifications</h3><div class="viz"><div class="toasts"><div class="toast"><i class="ic" data-i="bell"></i>You won! £250 site credit added</div><div class="toast"><i class="ic" data-i="bell"></i>Draw closes in 2 hours — 84% sold</div><div class="toast"><i class="ic" data-i="bell"></i>New: Rolex Submariner, £1.49 a ticket</div></div></div><p>Winner alerts, updates and marketing, built in — no app required.</p></div></div></div></section>`);
    };
  }
};
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraEcosystem.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = {};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "easy",
    class: "cv"
  }, _attrs))}><div class="wrap"><div class="sec-head"><span class="eyebrow"><i class="dot"></i>Easy to learn. Easier to run.</span><h2>Launch a competition in <span class="grad">three steps.</span></h2><p class="lead">If you can post on Facebook, you can run CompEngine. One onboarding call, then it&#39;s yours.</p></div><div class="easy-grid"><div class="card admin" id="admin" aria-label="Admin walkthrough demo"><div class="ad-bar"><i></i><i></i><i></i><span>admin.yourbrand.co.uk</span></div><div class="ad-body"><div class="ad-side"><b class="grad">COMPENGINE</b><span class="on">Competitions</span><span>Games</span><span>Wallets</span><span>Reports</span><span>Customers</span></div><div class="ad-main"><div class="ad-steps"><span class="on" data-s="0">1 · Create</span><span data-s="1">2 · Prize</span><span data-s="2">3 · Publish</span></div><div class="ad-form"><div class="ad-field"><label>Competition title</label><div class="ad-input" id="ad-title"></div></div><div class="ad-row"><div class="ad-field"><label>Ticket price</label><div class="ad-input" id="ad-price"></div></div><div class="ad-field"><label>Tickets</label><div class="ad-input" id="ad-qty"></div></div></div><div class="ad-field"><label>Instant wins</label><div class="ad-toggle" id="ad-toggle"><i></i><span>Add 250 instant wins — no CSV</span></div></div><div class="ad-field"><label>Prize</label><div class="ad-prize" id="ad-prize"><span class="ic" data-i="car"></span><span>BMW M3 Competition Pack · £75,000</span><b>Cash alt: £60,000</b></div></div><button type="button" class="btn btn-primary ad-publish" id="ad-publish" tabindex="-1">Publish competition</button></div><div class="ad-live" id="ad-live"><span class="ic" data-i="check-c"></span><div><b>Live on yourbrand.co.uk</b><span>/bmw-m3-competition-pack · tickets on sale</span></div></div></div></div><div class="cursor" id="ad-cursor" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 3l14 8-6 2-3 6z" fill="#fff" stroke="#14082e" stroke-width="1.5" stroke-linejoin="round"></path></svg></div><div class="confetti" id="ad-confetti" aria-hidden="true"></div><button type="button" class="ad-replay" id="ad-replay" data-track="easy_replay">Replay</button></div><div class="timeline"><div class="tl-step"><span class="tl-dot"></span><small>Day 0</small><b>Book a 30-min demo</b><span>Tell us your prize and game type. That&#39;s the brief.</span></div><div class="tl-step"><span class="tl-dot"></span><small>Week 1</small><b>We set it up</b><span>Domain, payment gateway, game configuration — and a free migration of users, wallets and competitions.</span></div><div class="tl-step"><span class="tl-dot"></span><small>Week 2</small><b>You&#39;re live</b><span>Draws, payouts, reporting and notifications from one dashboard. We&#39;ve done it in 4 days when it mattered.</span></div><div class="tl-pills"><span class="tag green"><i class="ic" data-i="check"></i>Live in 1–2 weeks</span><span class="tag green"><i class="ic" data-i="check"></i>One onboarding call</span><span class="tag green"><i class="ic" data-i="check"></i>Free site migration</span></div></div></div></div></section>`);
}
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraEasy.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const UltraEasy = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["ssrRender", _sfc_ssrRender$a]]);
const _sfc_main$i = {};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "convert",
    class: "cv"
  }, _attrs))}><div class="wrap"><div class="sec-head"><span class="eyebrow"><i class="dot"></i>Built by marketers, not just developers</span><h2>Pretty doesn&#39;t pay your prize fund. <span class="grad">Conversion does.</span></h2><p class="lead">Every flow — checkout, upsell, free entry, cart-abandonment — is tested for sell-through, not just speed.</p></div><div class="stack" id="stack"><div class="card cvf" data-reveal style="${ssrRenderStyle({ "--i": "0" })}"><div class="txt"><span class="num">01</span><h3>A/B-tested Checkout Flows</h3><p class="stat"><b class="grad">+23%</b>conversion — &quot;Buy 10 tickets&quot; vs &quot;Add to cart&quot;, across our last 4M orders</p></div><div class="viz"><div class="bars"><div class="bar-row"><span>&quot;Add to cart&quot;</span><span class="bar"><i style="${ssrRenderStyle({ "width": "83%" })}"></i></span><b>1.9%</b></div><div class="bar-row win"><span>&quot;Buy 10 tickets&quot;</span><span class="bar"><i style="${ssrRenderStyle({ "width": "100%" })}"></i></span><b>2.3%</b></div></div></div></div><div class="card cvf" data-reveal style="${ssrRenderStyle({ "--i": "1" })}"><div class="txt"><span class="num">02</span><h3>Smart Upsell Modals</h3><p class="stat"><b class="grad">+£23</b>average per order · ~38% of buyers accept at least one upsell</p></div><div class="viz"><div class="uplift"><span class="tnum" data-count="42" data-prefix="£">£0</span><i class="ic" data-i="arrow-r"></i><span class="tnum" data-count="65" data-prefix="£">£0</span></div><div class="cvchips"><span class="chip on">Add 10 more tickets for £8</span><span class="chip">Try our instant win</span><span class="chip">Upgrade to bundle</span></div></div></div><div class="card cvf" data-reveal style="${ssrRenderStyle({ "--i": "2" })}"><div class="txt"><span class="num">03</span><h3>Cart-Abandonment Automation</h3><p class="stat"><b class="grad">~14%</b>of abandoned carts complete within 24h · ~£18k/month recovered for an average operator</p></div><div class="viz"><div class="ring-wrap"><svg class="ring" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" class="bg"></circle><circle cx="60" cy="60" r="50" class="fg" style="${ssrRenderStyle({ "--v": "0.14" })}"></circle></svg><div class="ring-lbl"><b><span class="tnum" data-count="14" data-suffix="%">0%</span></b><span>recovered</span></div><div class="flow"><span>Cart left</span><i class="ic" data-i="chev-r"></i><span>Email + push</span><i class="ic" data-i="chev-r"></i><span>Paid</span></div></div></div></div><div class="card cvf" data-reveal style="${ssrRenderStyle({ "--i": "3" })}"><div class="txt"><span class="num">04</span><h3>Facebook-Ad-Compliant Landing Pages</h3><p class="stat"><b class="grad">14/14</b>compliance flags passed by default — the largest paid channel, without the account bans</p></div><div class="viz"><div class="checks" id="fb-checks"></div><div class="checks-lbl"><span>Compliance flags</span><b><span class="tnum" data-count="14">0</span>/14 passing</b></div></div></div><div class="card cvf" data-reveal style="${ssrRenderStyle({ "--i": "4" })}"><div class="txt"><span class="num">05</span><h3>Referral &amp; Affiliate Engine</h3><p class="stat"><b class="grad">+41%</b>first-90-day spend from referred customers · 2.1× faster first order</p></div><div class="viz"><svg class="tree" viewBox="0 0 300 170" aria-hidden="true"><g class="ln"><line x1="150" y1="38" x2="54" y2="105"></line><line x1="150" y1="38" x2="102" y2="136"></line><line x1="150" y1="38" x2="150" y2="112"></line><line x1="150" y1="38" x2="198" y2="140"></line><line x1="150" y1="38" x2="246" y2="102"></line></g><g class="nd"><circle cx="54" cy="105" r="15"></circle><circle cx="102" cy="136" r="15"></circle><circle cx="150" cy="112" r="15"></circle><circle cx="198" cy="140" r="15"></circle><circle cx="246" cy="102" r="15"></circle></g><circle class="rt" cx="150" cy="38" r="22"></circle><text x="150" y="43" text-anchor="middle" font-size="13" font-weight="800" fill="#14082e" font-family="Inter, sans-serif">YOU</text><g class="tags"><text x="54" y="109" text-anchor="middle">+£</text><text x="102" y="140" text-anchor="middle">+£</text><text x="150" y="116" text-anchor="middle">+£</text><text x="198" y="144" text-anchor="middle">+£</text><text x="246" y="106" text-anchor="middle">+£</text></g></svg></div></div><div class="card cvf" data-reveal style="${ssrRenderStyle({ "--i": "5" })}"><div class="txt"><span class="num">06</span><h3>Conversion-Rate Dashboard</h3><p class="stat"><b class="grad">Every step</b>which competitions convert, where users drop off, which source pays back</p></div><div class="viz"><div class="mini-dash"><div class="tiles"><div class="tile">Revenue<b>+34%</b></div><div class="tile">Conversion<b>2.3%</b></div><div class="tile">Avg order<b>£65</b></div></div><div class="funnel"><i style="${ssrRenderStyle({ "width": "100%" })}"></i><i></i><i></i><i></i></div><div class="funnel-lbl"><span>Visit</span><span>Comp page</span><span>Checkout</span><span>Paid</span></div></div></div></div></div><div class="card chart" id="rev-chart"><div class="chart-head"><h3>Avg operator revenue, month-on-month</h3><div class="legend"><span><i style="${ssrRenderStyle({ "background": "var(--orange)" })}"></i>CompEngine operators</span><span><i style="${ssrRenderStyle({ "background": "var(--text-3)" })}"></i>Typical WordPress operator</span></div></div><svg viewBox="0 0 640 260" role="img" aria-label="Line chart: CompEngine operators reach +247% by month 12 versus a typical WordPress operator"><g class="grid-l"><line x1="40" y1="30" x2="600" y2="30"></line><line x1="40" y1="90" x2="600" y2="90"></line><line x1="40" y1="150" x2="600" y2="150"></line><line x1="40" y1="210" x2="600" y2="210"></line></g><text class="axis" x="52" y="238">Month 1</text><text class="axis" x="300" y="238" text-anchor="middle">Month 6</text><text class="axis" x="580" y="238" text-anchor="end">Month 12</text><path class="area-ce" d="M60 210 C 160 205, 250 190, 330 150 S 500 70, 580 34 L580 210 Z"></path><path class="l-wp" d="M60 210 C 160 206, 250 200, 330 192 S 500 178, 580 172"></path><path class="l-ce" d="M60 210 C 160 205, 250 190, 330 150 S 500 70, 580 34"></path><circle class="dot-ce" cx="580" cy="34" r="5"></circle><g class="end-tag"><rect x="506" y="8" width="66" height="22" rx="11" fill="#f4a558"></rect><text x="539" y="23" text-anchor="middle" font-size="12" font-weight="800" fill="#14082e" font-family="Inter, sans-serif">+247%</text></g></svg><p class="chart-note">Indexed to month 1. Illustrative curve shape; the +247% end point is the figure we publish.</p></div><div class="closing"><p class="quote">&quot;Most &#39;raffle website builders&#39; are designers. We&#39;re operators with our own conversion data — and we ship the winning patterns to every site we power.&quot;</p><div class="tiles2"><div class="card"><b class="grad">+23%</b><span>avg checkout conversion vs a typical WordPress raffle stack</span></div><div class="card"><b class="grad">+£23</b><span>avg ticket value uplift via smart upsell modals</span></div></div></div></div></section>`);
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraConvert.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const UltraConvert = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$9]]);
const _sfc_main$h = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "certified-draws",
    class: "cv"
  }, _attrs))}><div class="wrap"><div class="sec-head"><span class="eyebrow"><i class="dot"></i>Independently verifiable · GLI-certified RNG · UK VCOC compliant</span><h2>Every winner, <span class="grad">provably fair.</span></h2><p class="lead">Drawn by a GLI-certified RNG. Logged to a SHA-256 hash chain you can verify yourself.</p></div><div class="card theatre" id="theatre"><div class="th-head"><div><small class="muted">Live draw · demo</small><b id="th-prize">BMW M3 Competition Pack</b><span class="muted small">75,000 tickets · STAR DRAWS · 18 May 2026</span></div><span class="tag green" id="th-status"><i class="dot green"></i>GLI RNG ready</span></div><div class="th-stage"><div class="ticket-big" id="ticket-big"><span class="tk-l">TICKET</span><div class="tumblers" id="tumblers"></div><span class="tk-r">STAR DRAWS</span></div><div class="confetti" id="th-confetti" aria-hidden="true"></div><div class="th-winner" id="th-winner"><i class="ic" data-i="check-c"></i><b>Winner: J. T***</b><span>Ticket #4,182 · Drawn 18 May 2026 14:02</span></div></div><div class="chain" id="chain" aria-label="Hash chain"><div class="blk"><small>Block 1</small><code>9c1e…a04b</code></div><i></i><div class="blk"><small>Block 2</small><code>4f77…2be1</code></div><i></i><div class="blk"><small>Block 3</small><code>b30d…7c9f</code></div><i></i><div class="blk"><small>Block 4</small><code>e2a8…51d3</code></div><i></i><div class="blk now"><small>This draw</small><code id="th-hash">sha256: …</code></div></div><div class="th-foot"><button type="button" class="btn btn-primary" id="th-draw" data-track="draws_run_demo">Run the draw</button><button type="button" class="btn btn-ghost" id="th-verify-toggle" aria-expanded="false" aria-controls="verify-wrap" data-track="draws_open_verify">Verify a real draw yourself</button></div></div><div class="verify-wrap" id="verify-wrap" hidden><p class="lead" style="${ssrRenderStyle({ "margin": "28px 0 18px" })}">Each card lists the hashes recorded against a real draw. Click Copy on any hash, paste it into that card&#39;s Verify box, and we&#39;ll reveal the exact winner, ticket number, prize, and draw timestamp it was recorded against. Or click any hash row to auto-fill the verifier.</p><div class="draws" id="draws"></div></div></div></section>`);
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraCertifiedDraws.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const UltraCertifiedDraws = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$g = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "why-fee",
    class: "cv"
  }, _attrs))}><div class="wrap"><div class="sec-head center"><h2>Why our pricing is what it is.</h2><p class="sub">The cheapest platform isn&#39;t the best deal. The most expensive isn&#39;t either.</p></div><div class="gauge-wrap" id="gauge"><svg class="gauge" viewBox="0 0 400 230" role="img" aria-label="Per-order fee gauge: suspiciously cheap at £0, CompEngine at 5 to 10p, overpaying at 17p and above"><defs><linearGradient id="ce-gauge" x1="0" x2="1"><stop offset="0" stop-color="#8978b1"></stop><stop offset=".35" stop-color="#f4a558"></stop><stop offset=".65" stop-color="#ec8a82"></stop><stop offset="1" stop-color="#8978b1"></stop></linearGradient></defs><path class="track" d="M40 200 A160 160 0 0 1 360 200"></path><path class="fill" d="M40 200 A160 160 0 0 1 360 200"></path><path class="sweet" d="M126 87 A160 160 0 0 1 274 87"></path><text class="gl" x="40" y="226" text-anchor="start">£0 / order</text><text class="gl" x="200" y="34" text-anchor="middle">5–10p</text><text class="gl" x="360" y="226" text-anchor="end">17p+</text><g class="needle" id="needle"><line x1="200" y1="200" x2="200" y2="70"></line><circle cx="200" cy="200" r="9"></circle></g><text class="gv" x="200" y="178" text-anchor="middle">per order</text></svg><div class="gauge-legend"><span><i style="${ssrRenderStyle({ "background": "#8978b1" })}"></i>Suspiciously cheap</span><span><i style="${ssrRenderStyle({ "background": "var(--orange)" })}"></i>CompEngine</span><span><i style="${ssrRenderStyle({ "background": "#8978b1" })}"></i>Overpaying</span></div></div><div class="fee-cols"><div class="card fee warn"><h3><i class="ic" data-i="warn"></i>Suspiciously cheap</h3><p class="intro">When £0-per-order is the headline… ask where the engineering budget comes from.</p><ul><li><i class="ic" data-i="minus"></i>Venture-funded burn — fine until the runway ends</li><li><i class="ic" data-i="minus"></i>RNG certification renewals skipped</li><li><i class="ic" data-i="minus"></i>Changelog stalls 12 months after launch</li></ul><p class="close">Cheap is expensive when the platform stops shipping.</p></div><div class="card fee mid"><h3><i class="ic" data-i="spark"></i>CompEngine — priced to keep shipping</h3><p class="intro">Your fee funds the next feature. And the one after that.</p><ul><li><i class="ic" data-i="check"></i><span><b>24 features shipped</b> in the last 12 months, included for everyone</span></li><li><i class="ic" data-i="check"></i>Never an upcharge, never a &quot;Pro tier&quot;</li><li><i class="ic" data-i="check"></i>GLI recertification and pen tests funded</li><li><i class="ic" data-i="check"></i>Fixed-fee options when you scale</li></ul><p class="close">Your fee pays for the platform getting better while you sleep.</p></div><div class="card fee over"><h3><i class="ic" data-i="arrow-up"></i>Overpaying</h3><p class="intro">When the headline is a high per-order fee… you&#39;re funding agency overhead.</p><ul><li><i class="ic" data-i="minus"></i>Per-order rates that scale painfully with success</li><li><i class="ic" data-i="minus"></i>Game library locked to fixed presets</li><li><i class="ic" data-i="minus"></i>Per-customer onboarding overhead baked into your bill</li></ul><p class="close">You&#39;re paying for their growth, not yours.</p></div></div></div></section>`);
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraWhyFee.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const UltraWhyFee = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$f = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "comparison",
    class: "cv"
  }, _attrs))}><div class="wrap"><div class="sec-head"><h2>Side by side.</h2><p class="sub">What actually moves the needle when you pick a platform — and where we win it.</p></div><div class="seg" role="group" aria-label="Compare against"><button type="button" data-cmp="saas" aria-pressed="true" data-track="comparison_vs_saas">vs Other SaaS</button><button type="button" data-cmp="wp" aria-pressed="false" data-track="comparison_vs_wordpress">vs WordPress + plugins</button></div><div class="cmp" id="cmp"><table><thead><tr><th>What matters</th><th class="ce">CompEngine</th><th id="cmp-other-head">Other SaaS</th></tr></thead><tbody id="cmp-body"></tbody></table></div><p class="assume" id="cmp-assume"></p><div class="card verdict"><div class="verdict-copy"><span class="eyebrow"><i class="dot"></i>Why operators switch</span><h3>Lower fee. Your own games. Draws you can prove. Everything included.</h3><p>You pay 5–10p an order instead of 17p, run nine games nobody else has, show customers a hash they can verify, and never get upsold to a &quot;Pro tier&quot; — every feature ships to every operator the day it goes live.</p></div><div class="verdict-cta"><a href="https://calendly.com/contact-compengine/30min" target="_blank" rel="noopener" class="btn btn-primary" data-calendly data-track="comparison_book_demo">Book a 30-min demo</a><button type="button" class="btn btn-ghost" id="cmp-pkg" data-track="comparison_open_builder">See the packages</button></div></div></div></section>`);
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraComparison.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const UltraComparison = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$e = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    class: "ce-roadmap cv",
    "aria-labelledby": "roadmap-h"
  }, _attrs))}><div class="wrap"><div class="sec-head"><span class="eyebrow"><i class="dot"></i>What&#39;s coming next</span><h2 id="roadmap-h">The AI roadmap is <span class="grad">already being built.</span></h2><p class="lead">We&#39;re integrating machine learning into the parts of your business that move money: demand forecasting, customer segmentation, revenue attribution. Public release in phases — existing operators get every feature automatically.</p></div><div class="road"><div class="card"><i class="ic" data-i="forecast"></i><h3>Demand Forecasting</h3><p>Predict ticket demand per draw type, adjusting prize structures before you publish.</p><span class="tag">Coming soon — included for all operators</span></div><div class="card"><i class="ic" data-i="target"></i><h3>Smart Targeting</h3><p>Segment customers by lifetime value and re-engage with dynamically generated offers.</p><span class="tag">Coming soon — included for all operators</span></div><div class="card"><i class="ic" data-i="insight"></i><h3>Revenue Insights</h3><p>ML-attributed revenue per game type, acquisition channel, and promotional mechanic.</p><span class="tag">Coming soon — included for all operators</span></div><div class="card"><i class="ic" data-i="pen"></i><h3>AI Content Assist</h3><p>Competition titles, rules copy, and email subject lines — generated and A/B tested automatically.</p><span class="tag">Coming soon — included for all operators</span></div></div></div></section>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraRoadmap.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const UltraRoadmap = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$5]]);
function initPackageBuilder() {
  const root = document.getElementById("pb");
  const modal = document.getElementById("pb-modal");
  if (!root || !modal) return null;
  const CONFIG = {
    flatMonthly: 2e3,
    // £/month Enterprise flat fee
    zeroUpfrontRate: 20,
    // pence per order, £0 build fee (template only)
    paygRange: "5–10p",
    // the Pay As You Go per-order range
    templateSetup: 999,
    // £ + VAT, template build on the 5–10p plans
    customSetup: 6e3,
    // £ + VAT, custom build (all plans)
    serverSupport: 200
    // £ + VAT / month — applies to EVERY plan
  };
  const state = { build: null, plan: null };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const dialog = modal.querySelector(".pb-dialog");
  const panels = root.querySelectorAll(".pb-panel");
  const steps = root.querySelectorAll(".pb-step");
  const restart = document.getElementById("pb-restart");
  const plansEl = document.getElementById("pb-plans");
  const sub2 = document.getElementById("pb-step2-sub");
  const sumCard = document.getElementById("pb-sum-card");
  const book = document.getElementById("pb-book");
  const cleanups = [];
  const on = (target, ev, fn, opts) => {
    target.addEventListener(ev, fn, opts);
    cleanups.push(() => target.removeEventListener(ev, fn, opts));
  };
  const gbp = (n2) => "£" + Math.round(n2).toLocaleString("en-GB");
  const setupFor = () => state.build === "custom" ? CONFIG.customSetup : CONFIG.templateSetup;
  const announce = (text) => document.dispatchEvent(new CustomEvent("ce:package", { detail: text }));
  function goTo(n2) {
    panels.forEach((p2) => p2.classList.toggle("on", +p2.dataset.panel === n2));
    steps.forEach((s2) => {
      const i2 = +s2.dataset.step;
      s2.classList.toggle("active", i2 === n2);
      s2.classList.toggle("done", i2 < n2);
    });
    restart.hidden = n2 === 1;
    if (n2 > 1) modal.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }
  root.querySelectorAll("[data-build]").forEach((btn) => {
    on(btn, "click", () => {
      state.build = btn.dataset.build;
      root.querySelectorAll("[data-build]").forEach((b2) => b2.classList.toggle("sel", b2 === btn));
      renderPlans();
      goTo(2);
    });
  });
  function planList() {
    const list = [{
      id: "payg",
      title: "Pay As You Go",
      icon: "📈",
      blurb: "Your platform cost is charged per paid order, so it rises and falls with your sales. No minimum spend.",
      rate: CONFIG.paygRange,
      rateSub: " per order",
      upfront: setupFor(),
      upfrontLabel: gbp(setupFor()) + " + VAT build fee",
      bullets: [
        "Platform cost tracks your sales, up or down",
        "No per-order minimum and no tie-in",
        "Charged on paid orders only, never free entries"
      ],
      flag: "Most operators start here"
    }];
    if (state.build === "template") {
      list.push({
        id: "zero",
        title: "Zero Upfront",
        icon: "🚀",
        blurb: "No build fee to get started. You pay 20p on each paid order instead, so the build is covered as you sell.",
        rate: CONFIG.zeroUpfrontRate + "p",
        rateSub: " per order",
        upfront: 0,
        upfrontLabel: "£0 build fee",
        zero: true,
        bullets: [
          "£0 build fee to get started",
          "The same platform and features as every plan",
          "We carry the risk with you"
        ],
        flag: "Launching with no budget"
      });
    }
    list.push({
      id: "flat",
      title: "Enterprise Flat",
      icon: "🏆",
      blurb: "A fixed platform fee with no per-order charges, however much you sell. Your platform cost stops moving.",
      rate: gbp(CONFIG.flatMonthly),
      rateSub: " / month",
      upfront: setupFor(),
      upfrontLabel: gbp(setupFor()) + " + VAT build fee",
      highlight: "No per-order fees at all",
      bullets: [
        "Your platform cost never rises with volume",
        "Dedicated account manager",
        "Priority support and onboarding"
      ],
      flag: "Best value at scale"
    });
    return list;
  }
  function renderPlans() {
    sub2.textContent = state.build === "custom" ? "Your custom design is a one-off " + gbp(CONFIG.customSetup) + " + VAT. After that, choose how the platform itself is charged." : "Two of these carry a " + gbp(CONFIG.templateSetup) + " + VAT build fee. One has a £0 build fee. Your call.";
    const plans = planList();
    plansEl.className = "pb-choices" + (plans.length > 2 ? " three" : "");
    plansEl.innerHTML = plans.map((p2) => `
        <button class="pb-choice" type="button" data-plan="${p2.id}">
          ${p2.flag ? `<span class="pb-flag ${p2.id === "payg" ? "" : "quiet"}">${p2.flag}</span>` : ""}
          <div class="pb-ico">${p2.icon}</div>
          <h4>${p2.title}</h4>
          <div class="pb-blurb">${p2.blurb}</div>
          <div class="pb-rate">${p2.rate}<small>${p2.rateSub}</small></div>
          <span class="pb-up${p2.zero ? " zero" : ""}">${p2.upfrontLabel}</span>
          ${p2.highlight ? `<span class="pb-hi">${p2.highlight}</span>` : ""}
          <ul>${p2.bullets.map((b2) => `<li>${b2}</li>`).join("")}</ul>
          <span class="pb-go">Choose ${p2.title} <span class="arw">&rarr;</span></span>
        </button>`).join("");
    plansEl.querySelectorAll("[data-plan]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.plan = btn.dataset.plan;
        plansEl.querySelectorAll("[data-plan]").forEach((b2) => b2.classList.toggle("sel", b2 === btn));
        renderSummary();
        goTo(3);
      });
    });
  }
  function renderSummary() {
    const plan = planList().find((p2) => p2.id === state.plan);
    const upfront = plan.upfront;
    const buildTxt = state.build === "custom" ? "Custom Design" : "Template Build";
    const rateTxt = state.plan === "flat" ? gbp(CONFIG.flatMonthly) + " + VAT / month" : state.plan === "zero" ? CONFIG.zeroUpfrontRate + "p + VAT per paid order" : CONFIG.paygRange + " + VAT per paid order";
    const rateSub = state.plan === "flat" ? "no per-order charges at all" : "charged on paid orders only";
    sumCard.innerHTML = `
        <div class="pb-sum-rows">
          <div class="pb-sum-row"><span class="k">Your build</span><span class="v">${buildTxt}<em>${state.build === "custom" ? "A fully unique design, 4–6 weeks" : "Proven layout, live in 1–2 weeks — lowest cost to launch"}</em></span></div>
          <div class="pb-sum-row"><span class="k">Your plan</span><span class="v">${plan.title}</span></div>
          <div class="pb-sum-row"><span class="k">Platform rate</span><span class="v">${rateTxt}<em>${rateSub}</em></span></div>
          <div class="pb-sum-row"><span class="k">Server &amp; support</span><span class="v">${gbp(CONFIG.serverSupport)} + VAT / month<em>hosting, monitoring and support — all plans</em></span></div>
          <div class="pb-sum-row total"><span class="k">Build fee</span><span class="v">${upfront === 0 ? "£0 build fee" : gbp(upfront) + " + VAT"}<em>${upfront === 0 ? "covered by your per-order rate" : "one-off, paid before we start"}</em></span></div>
        </div>`;
    const summary = `${buildTxt} · ${plan.title} · ${rateTxt}`;
    const tag = document.getElementById("pb-cta-tag");
    if (tag) {
      tag.innerHTML = `Your package: <strong>${summary}</strong> — mention it when you book and we'll have the numbers ready.`;
      tag.hidden = false;
    }
    announce(summary);
  }
  root.querySelectorAll("[data-back]").forEach((b2) => on(b2, "click", () => goTo(+b2.dataset.back)));
  function reset() {
    state.build = null;
    state.plan = null;
    root.querySelectorAll(".pb-choice").forEach((c2) => c2.classList.remove("sel"));
    const tag = document.getElementById("pb-cta-tag");
    if (tag) tag.hidden = true;
    announce("");
    goTo(1);
  }
  on(restart, "click", reset);
  let lastFocus = null;
  function openModal() {
    lastFocus = document.activeElement;
    reset();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    dialog.scrollTop = 0;
    modal.scrollTop = 0;
    const exit = document.getElementById("exit");
    if (exit) {
      exit.classList.remove("on");
      exit.setAttribute("aria-hidden", "true");
    }
    const first = dialog.querySelector("[data-build]");
    (first || dialog).focus({ preventScroll: true });
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  ["pb-open", "sticky-pkg", "exit-open", "float-pkg-btn", "cmp-pkg"].forEach((id) => {
    const b2 = document.getElementById(id);
    if (b2) on(b2, "click", openModal);
  });
  modal.querySelectorAll("[data-pb-close]").forEach((el) => on(el, "click", closeModal));
  on(document, "keydown", (e2) => {
    if (e2.key === "Escape" && !modal.hidden) closeModal();
  });
  on(dialog, "keydown", (e2) => {
    if (e2.key !== "Tab") return;
    const f2 = [...dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter((el) => el.offsetParent !== null);
    if (!f2.length) return;
    const first = f2[0], last = f2[f2.length - 1];
    if (e2.shiftKey && document.activeElement === first) {
      e2.preventDefault();
      last.focus();
    } else if (!e2.shiftKey && document.activeElement === last) {
      e2.preventDefault();
      first.focus();
    }
  });
  if (book) {
    on(book, "click", (e2) => {
      e2.preventDefault();
      closeModal();
      const target = document.getElementById("booking");
      if (target) target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      setTimeout(() => {
        const f2 = document.getElementById("f-name");
        if (f2) f2.focus({ preventScroll: true });
      }, reduced ? 0 : 700);
    });
  }
  dialog.querySelectorAll('a[href^="#"]').forEach((a2) => {
    if (a2 === book) return;
    on(a2, "click", () => setTimeout(closeModal, 0));
  });
  return {
    open: openModal,
    close: closeModal,
    destroy() {
      cleanups.forEach((c2) => c2());
      document.body.style.overflow = "";
    }
  };
}
const _sfc_main$d = {
  __name: "UltraPricing",
  __ssrInlineRender: true,
  setup(__props) {
    const clientReady = ref(false);
    let builder = null;
    onMounted(async () => {
      clientReady.value = true;
      await nextTick();
      builder = initPackageBuilder();
    });
    onBeforeUnmount(() => {
      if (builder) builder.destroy();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="kinetic alt" aria-hidden="true"><div class="k-track" id="k-track2"></div></div><section id="pricing" class="cv"><div class="wrap"><div class="sec-head center"><span class="eyebrow"><i class="dot"></i>Simple, transparent pricing</span><h2>Packages from <span class="grad">5p per order.</span></h2><p class="lead">Template builds and fully custom designs. Build your package in under a minute and see every number — build fee, per-order rate, what runs monthly. No &quot;call us for pricing&quot;.</p><p class="price-intro">Pay 5–10p per order while you&#39;re growing. Switch to flat-rate Enterprise when volume makes it cheaper. Most operators make that switch at around 20,000 orders per month.</p><div class="pb-launch"><span class="pb-clickme"><span class="cm-txt">Click me!</span><svg class="cm-arrow" viewBox="0 0 56 58" aria-hidden="true"><path d="M6 8 C34 10, 46 24, 40 46" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"></path><path d="M32 37 L40 49 L48 36" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><button class="pb-open" type="button" id="pb-open" data-track="pricing_open_builder">Click here to view packages <span class="arw">→</span></button></div><p class="pb-hint">No sign-up and no details needed — you&#39;ll see the full package before you speak to anyone.</p></div><div class="card includes"><b>Every package includes:</b><ul><li><i class="ic" data-i="check"></i>All game types and instant wins</li><li><i class="ic" data-i="check"></i>Entry lists</li><li><i class="ic" data-i="check"></i>Upsells</li><li><i class="ic" data-i="check"></i>Responsible Play options</li><li><i class="ic" data-i="check"></i>Legal compliance — Terms &amp; Conditions</li><li><i class="ic" data-i="check"></i>All future games and features</li><li><i class="ic" data-i="check"></i>Gateway integration</li><li><i class="ic" data-i="check"></i>Website notifications</li><li><i class="ic" data-i="check"></i>Free site migration — users, wallets and competitions</li><li><i class="ic" data-i="check"></i>No limits</li></ul></div></div></section>`);
      if (clientReady.value) {
        ssrRenderTeleport(_push, (_push2) => {
          _push2(`<div class="pb-modal" id="pb-modal" hidden><div class="pb-backdrop" data-pb-close></div><div class="pb-dialog" role="dialog" aria-modal="true" aria-labelledby="pb-dialog-title" tabindex="-1"><h2 class="pb-sr" id="pb-dialog-title">Build your package</h2><button class="pb-x" type="button" data-pb-close aria-label="Close">×</button><div class="pb-includes"><div class="inc-statement"><p class="inc-big">Every package includes <span class="grad-text">every feature and game</span>.</p><p class="inc-sub">Every game type, every instant win, every tool in the platform — plus everything we build from here. No tiers, no locked features, nothing to upgrade to. The only differences between the packages below are the design and how you pay.</p></div><div class="pb-wrap" id="pb"><div class="pb-head"><div class="pb-steps"><div class="pb-step active" data-step="1"><span class="n">1</span> Your build</div><span class="pb-sep">→</span><div class="pb-step" data-step="2"><span class="n">2</span> How you pay</div><span class="pb-sep">→</span><div class="pb-step" data-step="3"><span class="n">3</span> Your package</div></div><button class="pb-restart" id="pb-restart" type="button" hidden>Start over</button></div><div class="pb-body"><div class="pb-panel on" data-panel="1"><h3 class="pb-q">First — how do you want your site built?</h3><p class="pb-sub">Same engine, same games, same support either way. The difference is whether you&#39;re keeping your costs down or standing entirely apart.</p><div class="pb-allinc"><span class="tick">✓</span> Every package includes <strong>every feature and game</strong></div><div class="pb-choices pb-lean"><button class="pb-choice" type="button" data-build="template"><div class="pb-ico">⚡</div><h4>Template Build</h4><div class="pb-rate">From 5–10p<small> + VAT per order</small></div><div class="pb-blurb">To keep your costs down. A proven competition layout in your branding and colours — live in 1–2 weeks, without paying for design work from scratch.</div><span class="pb-cta"><span class="pb-clickme"><span class="cm-txt">Click me!</span><svg class="cm-arrow" viewBox="0 0 56 58" aria-hidden="true"><path d="M6 8 C34 10, 46 24, 40 46" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"></path><path d="M32 37 L40 49 L48 36" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><span class="pb-go">Choose Template Build <span class="arw">→</span></span></span></button><button class="pb-choice" type="button" data-build="custom"><div class="pb-ico">🎨</div><h4>Custom Design</h4><div class="pb-rate">From £6,000<small> + VAT</small></div><div class="pb-plus">+ 5–10p + VAT per order</div><div class="pb-blurb">For operators who want a fully unique design. Drawn from a blank page around your brand, so your site looks like nobody else&#39;s.</div><span class="pb-cta"><span class="pb-clickme"><span class="cm-txt">Click me!</span><svg class="cm-arrow" viewBox="0 0 56 58" aria-hidden="true"><path d="M6 8 C34 10, 46 24, 40 46" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"></path><path d="M32 37 L40 49 L48 36" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><span class="pb-go">Choose Custom Design <span class="arw">→</span></span></span></button></div><span class="pb-hint">No sign-up and no details needed — you&#39;ll see the full package before you speak to anyone.</span></div><div class="pb-panel" data-panel="2"><h3 class="pb-q">How do you want to pay for the platform?</h3><p class="pb-sub" id="pb-step2-sub"></p><div class="pb-allinc"><span class="tick">✓</span> Every package includes <strong>every feature and game</strong></div><div class="pb-choices three" id="pb-plans"></div><p class="pb-note" style="${ssrRenderStyle({ "text-align": "center", "max-width": "640px", "margin": "22px auto 0" })}">Every plan also carries a £200 + VAT a month server &amp; support fee — hosting, monitoring, updates and a real person to call.</p><div class="pb-backwrap"><button class="pb-back" type="button" data-back="1">← Change build type</button></div></div><div class="pb-panel" data-panel="3"><h3 class="pb-q">Your package</h3><p class="pb-sub">Build fee, platform rate and support — the lot. Nothing new appears on the call.</p><div class="pb-summary"><div class="pb-sum-card" id="pb-sum-card"></div><div class="pb-actions"><a href="#booking" class="btn btn-primary btn-large" id="pb-book" data-track="pricing_builder_book">Book my call with this package →</a><a href="#game-studio" class="btn btn-ghost btn-large">Try Game Studio first</a></div><p class="pb-note">All fees exclude VAT. The £200 a month server &amp; support fee starts when your site goes live, not when you sign. Per-order fees are charged on paid orders only — free postal entries are never charged for. Your exact per-order rate is confirmed in writing before you sign; nothing is taken until you do.</p></div><div class="pb-backwrap"><button class="pb-back" type="button" data-back="2">← Change plan</button></div></div></div></div></div></div></div>`);
        }, "body", false, _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraPricing.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "faq",
    class: "cv"
  }, _attrs))}><div class="wrap"><div class="sec-head"><h2>Questions we get before every call.</h2><p class="lead">If yours isn&#39;t here, it&#39;ll be answered in the first five minutes of the demo.</p></div><div class="faq" id="faq-list"></div></div></section>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraFaq.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const UltraFaq = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$4]]);
const _sfc_main$b = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({
    id: "booking",
    class: "cv"
  }, _attrs))}><div class="wrap"><div class="book"><div class="copy"><h2>Get started today.</h2><p class="sub">Ready to launch your competition on the UK&#39;s most intelligent platform?</p><p>30 minutes. A live demo on your brief. No sales deck, no NDAs, no obligation. Just the platform running with your prize, your game type, your brand — so you can see exactly what you&#39;d be launching.</p><div class="ticks"><span><i class="ic" data-i="check-c"></i>Live in 1–2 weeks</span><span><i class="ic" data-i="check-c"></i>Free site migration</span><span><i class="ic" data-i="check-c"></i>Every feature included</span></div><p id="pb-cta-tag" aria-live="polite"></p></div><form class="card form" id="lead-form" novalidate><div class="fields" style="${ssrRenderStyle({ "display": "grid", "gap": "12px" })}"><div class="field"><label for="f-name">Name</label><input id="f-name" name="name" type="text" autocomplete="name" required><span class="msg"></span></div><div class="field"><label for="f-biz">Business / site name</label><input id="f-biz" name="business" type="text" autocomplete="organization" required><span class="msg"></span></div><div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" inputmode="email" required><span class="msg"></span></div><div class="field"><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="07xxx xxxxxx" required><span class="msg"></span></div><div class="field"><label for="f-platform">Current platform</label><select id="f-platform" name="current_platform" required><option value="">Choose one</option><option>WordPress + plugins</option><option>Another SaaS platform</option><option>Agency-built site</option><option>Nothing yet</option></select><span class="msg"></span></div><div class="field"><label for="f-orders">Monthly orders</label><select id="f-orders" name="monthly_orders" required><option value="">Choose one</option><option>Not live yet</option><option>Under 1,000</option><option>1,000–5,000</option><option>5,000–20,000</option><option>20,000+</option></select><span class="msg"></span></div><input type="hidden" name="utm_source"><input type="hidden" name="utm_medium"><input type="hidden" name="utm_campaign"><input type="hidden" name="utm_content"><input type="hidden" name="utm_term"><input type="hidden" name="gclid"><input type="hidden" name="fbclid"><input type="hidden" name="landing_variant"><input type="hidden" name="package" id="f-package"><button type="submit" class="btn btn-primary btn-lg" data-track="booking_form_submit">Book my 30-min demo →</button><p class="alt">Prefer to pick a time now? <a href="https://calendly.com/contact-compengine/30min" target="_blank" rel="noopener" data-calendly data-track="booking_open_calendar">Open the calendar</a></p><div class="mini-trust"><span><i class="ic" data-i="shield"></i>GLI certified</span><span><i class="ic" data-i="shield"></i>Pen tested</span><span><i class="ic" data-i="shield"></i>VCOC signatory</span></div></div><div class="thanks"><i class="ic" data-i="check-c"></i><h3>Got it. Pick your slot.</h3><p class="muted">We&#39;ve saved your details — choose a 30-minute time that suits you.</p><a href="https://calendly.com/contact-compengine/30min" target="_blank" rel="noopener" class="btn btn-primary btn-lg" data-calendly data-track="booking_thanks_calendly">Choose a time on Calendly</a></div></form></div><p class="trust-note">Entering a competition powered by CompEngine? Every draw is GLI-certified. Every winner is verifiable. Every order runs through a UK-licensed payment gateway. If something goes wrong, the operator has a real platform behind them — not a stack of plugins.</p></div></section>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraBooking.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const UltraBooking = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$a = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "ce-footer" }, _attrs))}><div class="wrap"><a href="#hero" class="logo"><span class="gear"><img src="/images/logo.svg" alt=""><span class="gear-svg" data-gear></span></span><span>© 2026 CompEngine. Built quietly in the UK.</span></a><div class="links"><a href="#game-studio">Games</a><a href="#ecosystem">Features</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="/about">About</a><a href="/blog">Blog</a><a href="#booking">Contact</a></div><div class="links"><a href="https://calendly.com/contact-compengine/30min" target="_blank" rel="noopener" data-calendly data-track="footer_book_demo">Book a demo</a><a href="#booking" data-track="footer_launch">Launch your platform</a></div></div></footer>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraFooter.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const UltraFooter = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$9 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><div class="ce-sticky" id="sticky" aria-hidden="true"><div class="row"><a href="https://calendly.com/contact-compengine/30min" target="_blank" rel="noopener" class="btn btn-primary" data-calendly data-track="sticky_book_demo">Book a Demo</a><button type="button" class="btn btn-ghost" id="sticky-pkg" data-track="sticky_open_builder">Packages</button></div><div class="mini-trust"><span><i class="ic" data-i="shield"></i>GLI</span><span><i class="ic" data-i="shield"></i>Pen tested</span><span><i class="ic" data-i="shield"></i>VCOC</span></div></div><div class="ce-float" id="float-pkg" aria-hidden="true"><span class="pb-clickme"><span class="cm-txt">Click me!</span><svg class="cm-arrow" viewBox="0 0 56 58" aria-hidden="true"><path d="M6 8 C34 10, 46 24, 40 46" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"></path><path d="M32 37 L40 49 L48 36" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><button type="button" class="pb-open" id="float-pkg-btn" data-track="float_open_builder">Click here to view packages <span class="arw">→</span></button></div><div class="ce-exit" id="exit" role="dialog" aria-label="Before you go" aria-hidden="true"><button type="button" class="x" id="exit-x" aria-label="Dismiss"><i class="ic" data-i="x"></i></button><b>Before you go — see the full package price in 60 seconds</b><span class="muted small">Three questions. No email required.</span><button type="button" class="btn btn-primary" id="exit-open" data-track="exit_open_builder">Open the package builder</button></div><!--]-->`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ultra/UltraSticky.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const UltraSticky = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$1]]);
function initUltraHome(opts) {
  opts = opts || {};
  opts.orders = +opts.orders || 15e5;
  opts.tickets = +opts.tickets || 12e7;
  var alive = true, cleanups = [];
  function on(t3, ev, fn, o2) {
    t3.addEventListener(ev, fn, o2);
    cleanups.push(function() {
      t3.removeEventListener(ev, fn, o2);
    });
  }
  function compact(n2) {
    n2 = +n2 || 0;
    if (n2 >= 1e6) return String(Math.round(n2 / 1e5) / 10).replace(/\.0$/, "") + "M";
    if (n2 >= 1e3) return Math.round(n2 / 1e3) + "k";
    return String(n2);
  }
  var HERO_VARIANTS = {
    A: { h1: 'The <span class="grad">Ultimate Competition</span> Platform' },
    B: { h1: 'Launch a competition site that <span class="grad">actually converts.</span>' }
  };
  var CALENDLY2 = "https://calendly.com/contact-compengine/30min";
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid", "landing_variant", "package"];
  var OPERATORS = [["Top Banana", "topbanana"], ["WestCoast", "westcoast"], ["Jolly", "jolly"], ["Vincere", "vincere"], ["Podium", "podium"], ["S2A", "s2a"], ["Auwins", "auwins"], ["MixItUp", "mixitup"], ["MadMac", "madmac"], ["MPComps", "mpower"], ["Wrights", "wrights"], ["MsMoneyPenny", "msmoneypenny"], ["AutoComps", "autocomps"], ["Prize Hunter", "prizehunter"], ["Vortex", "vortex"], ["Padel Comps", "padel"], ["Luxsy Wins", "luxsy"], ["LuckyDucky", "luckyducky"], ["Karma", "karma"], ["WinThisNow", "winthisnow"], ["Deluxe Comps", "deluxe"], ["CrazyCat", "crazycat"], ["Lightning", "lightning"], ["SunnyGiveaways", "sunnygiveaways"], ["SmashDrop", "smashdrop"], ["Winner Winner", "winnerwinner"], ["Ritas", "ritas"], ["Belter Competition", "belter"], ["House of Hope", "hope"], ["Prize Party", "prizeparty"]];
  var $2 = function(s2, r2) {
    return (r2 || document).querySelector(s2);
  };
  var $$ = function(s2, r2) {
    return Array.prototype.slice.call((r2 || document).querySelectorAll(s2));
  };
  var root = $2("#ce-home");
  var RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isDesktop = function() {
    return window.matchMedia("(min-width: 1024px)").matches;
  };
  var hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  function once(el, cb, opts2) {
    if (!("IntersectionObserver" in window)) {
      cb(el);
      return;
    }
    var io = new IntersectionObserver(function(es) {
      es.forEach(function(e2) {
        if (e2.isIntersecting) {
          io.unobserve(e2.target);
          cb(e2.target);
        }
      });
    }, opts2 || { threshold: 0.25 });
    io.observe(el);
  }
  function fmt(n2) {
    return Math.round(n2).toLocaleString("en-GB");
  }
  function esc(s2) {
    return String(s2).replace(/[&<>"]/g, function(c2) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c2];
    });
  }
  var S2 = function(d2, extra) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d2 + "</svg>";
  };
  var ICONS = {
    menu: S2('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    x: S2('<path d="M6 6l12 12M18 6L6 18"/>'),
    check: S2('<path d="M5 12.5l4.5 4.5L19 7"/>'),
    "check-c": S2('<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 5-5"/>'),
    shield: S2('<path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z"/><path d="M9.5 12l2 2 3.5-4"/>'),
    trend: S2('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),
    cert: S2('<circle cx="12" cy="9" r="5.5"/><path d="M9 13.5L7.5 21l4.5-2.5L16.5 21 15 13.5"/><path d="M10 9l1.5 1.5L14 7.5"/>'),
    lock: S2('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>'),
    doc: S2('<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>'),
    award: S2('<path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.4 6.7 19.1l1-5.8L3.5 9.2l5.9-.9z"/>'),
    "chev-l": S2('<path d="M15 5l-7 7 7 7"/>'),
    "chev-r": S2('<path d="M9 5l7 7-7 7"/>'),
    "arrow-r": S2('<path d="M4 12h16M13 5l7 7-7 7"/>'),
    "arrow-up": S2('<path d="M12 20V4M5 11l7-7 7 7"/>'),
    bell: S2('<path d="M6 16V11a6 6 0 0112 0v5l2 2H4z"/><path d="M10 21h4"/>'),
    warn: S2('<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18.5v.5"/>'),
    minus: S2('<path d="M6 12h12"/>'),
    spark: S2('<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>'),
    forecast: S2('<path d="M3 20h18"/><path d="M5 16l4-5 4 3 6-8"/><path d="M15 6h4v4"/>'),
    target: S2('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>'),
    insight: S2('<rect x="3" y="12" width="4" height="8"/><rect x="10" y="7" width="4" height="13"/><rect x="17" y="3" width="4" height="17"/>'),
    pen: S2('<path d="M4 20l4-1L19 8l-3-3L5 16z"/><path d="M14 7l3 3"/>'),
    car: S2('<path d="M4 15l2-6h12l2 6"/><rect x="3" y="15" width="18" height="4" rx="1"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="16.5" cy="19" r="1.5"/>'),
    monitor: S2('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>'),
    plane: S2('<path d="M3 13l18-9-5 17-4-6z"/><path d="M12 15l9-11"/>'),
    watch: S2('<circle cx="12" cy="12" r="6"/><path d="M12 9v3l2 1M9 6l.5-3h5l.5 3M9 18l.5 3h5l.5-3"/>'),
    cash: S2('<rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9h.01M18 15h.01"/>'),
    gift: S2('<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M12 9v12M12 9c-2-4-6-4-6-1s4 1 6 1zm0 0c2-4 6-4 6-1s-4 1-6 1z"/>'),
    trophy: S2('<path d="M7 4h10v5a5 5 0 01-10 0z"/><path d="M7 6H4a3 3 0 003 3M17 6h3a3 3 0 01-3 3M12 14v4M8 20h8"/>'),
    diamond: S2('<path d="M6 4h12l4 5-10 12L2 9z"/><path d="M2 9h20M9 4l3 5 3-5M9 9l3 12 3-12"/>'),
    star: S2('<path d="M12 3l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.4 6.7 19.1l1-5.8L3.5 9.2l5.9-.9z"/>'),
    fish: S2('<path d="M3 12c3-4 7-6 11-6 3 2 5 4 7 6-2 2-4 4-7 6-4 0-8-2-11-6z"/><path d="M14 12h.01M3 12l3-4M3 12l3 4"/>'),
    tent: S2('<path d="M3 20L12 4l9 16z"/><path d="M12 4v16M8 20l4-7 4 7"/>'),
    dice: S2('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01"/>'),
    copy: S2('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 011-1h10"/>'),
    gear: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9 4l-2.3-1.2.5-2.5-2.2-1.4-1.9 1.7L13 7.5 12 5l-1 2.5-2.1 1.1L7 6.9 4.8 8.3l.5 2.5L3 12l2.3 1.2-.5 2.5 2.2 1.4 1.9-1.7 2.1 1.1L12 19l1-2.5 2.1-1.1 1.9 1.7 2.2-1.4-.5-2.5z" fill-rule="evenodd"/></svg>'
  };
  $$(".ic[data-i]").forEach(function(el) {
    el.innerHTML = ICONS[el.getAttribute("data-i")] || "";
  });
  function gearPath(cx, cy, rOut, rIn, teeth) {
    var pts = [], n2 = teeth * 2, i2, a2, r2;
    for (i2 = 0; i2 < n2 * 2; i2++) {
      a2 = Math.PI * 2 * i2 / (n2 * 2);
      r2 = Math.floor(i2 / 2) % 2 === 0 ? rOut : rIn;
      pts.push((cx + r2 * Math.cos(a2)).toFixed(2) + " " + (cy + r2 * Math.sin(a2)).toFixed(2));
    }
    return "M" + pts.join("L") + "Z";
  }
  var GEAR_SVG = '<svg viewBox="0 0 100 100" aria-hidden="true"><path d="' + gearPath(50, 50, 46, 38, 10) + '" fill="none" stroke="url(#ce-gg)" stroke-width="5" stroke-linejoin="round"/><circle cx="50" cy="50" r="17" fill="none" stroke="url(#ce-gg)" stroke-width="5"/></svg>';
  $$("[data-gear]").forEach(function(el) {
    el.innerHTML = GEAR_SVG;
    el.style.display = "block";
    el.style.width = "100%";
    el.style.height = "100%";
  });
  var SYM = {
    cherry: '<svg viewBox="0 0 40 40"><path d="M14 22c-2-7 4-13 12-15" fill="none" stroke="#7ad37a" stroke-width="3" stroke-linecap="round"/><circle cx="13" cy="27" r="8" fill="#ff4d6d"/><circle cx="26" cy="29" r="7" fill="#ff6b81"/><circle cx="10.5" cy="24.5" r="2" fill="#fff" opacity=".6"/></svg>',
    lemon: '<svg viewBox="0 0 40 40"><ellipse cx="20" cy="22" rx="14" ry="10" fill="#ffd93b"/><path d="M6 22h28" stroke="#f4a558" stroke-width="1.5" opacity=".5"/><circle cx="12" cy="18" r="2" fill="#fff" opacity=".6"/></svg>',
    seven: '<svg viewBox="0 0 40 40"><path d="M9 9h22l-12 24h-7l10-18H9z" fill="#ff5a6b" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    star: '<svg viewBox="0 0 40 40"><path d="M20 4l4.7 9.6 10.6 1.5-7.7 7.5 1.8 10.5L20 28.1l-9.4 5 1.8-10.5-7.7-7.5 10.6-1.5z" fill="#f4a558"/></svg>',
    bell: '<svg viewBox="0 0 40 40"><path d="M10 28V19a10 10 0 0120 0v9l3 3H7z" fill="#ffcf5c"/><path d="M16 33h8" stroke="#ffcf5c" stroke-width="4" stroke-linecap="round"/></svg>',
    diamond: '<svg viewBox="0 0 40 40"><path d="M11 8h18l7 9-16 17L4 17z" fill="#8fd3ff"/><path d="M4 17h32M11 8l9 9 9-9M20 17l-5 17M20 17l5 17" stroke="#fff" stroke-width="1.5" opacity=".7" fill="none"/></svg>'
  };
  var SYMS = ["cherry", "lemon", "seven", "star", "bell", "diamond"];
  window.ceTrack = function(name, payload) {
    payload = payload || {};
    try {
      if (typeof window.gtag === "function") window.gtag("event", name, payload);
      if (typeof window.fbq === "function") window.fbq("trackCustom", name, payload);
      if (typeof window.gtag !== "function" && typeof window.fbq !== "function") console.debug("[ceTrack]", name, payload);
    } catch (e2) {
    }
  };
  document.addEventListener("click", function(e2) {
    var t3 = e2.target.closest("[data-track]");
    if (t3) window.ceTrack(t3.getAttribute("data-track"), { href: t3.getAttribute("href") || void 0 });
  });
  var depthFired = {};
  function scrollDepth() {
    var h2 = document.documentElement.scrollHeight - window.innerHeight;
    if (h2 <= 0) return;
    var p2 = window.scrollY / h2 * 100;
    [25, 50, 75, 100].forEach(function(m2) {
      if (p2 >= m2 - 0.5 && !depthFired[m2]) {
        depthFired[m2] = true;
        window.ceTrack("scroll_" + m2);
      }
    });
  }
  var params = new URLSearchParams(window.location.search);
  var utm = {};
  try {
    utm = JSON.parse(sessionStorage.getItem("ce_utm") || "{}");
  } catch (e2) {
    utm = {};
  }
  UTM_KEYS.forEach(function(k) {
    if (params.get(k)) utm[k] = params.get(k);
  });
  var variant = (params.get("v") || "A").toUpperCase();
  if (!HERO_VARIANTS[variant]) variant = "A";
  utm.landing_variant = variant;
  try {
    sessionStorage.setItem("ce_utm", JSON.stringify(utm));
  } catch (e2) {
  }
  function fillHidden() {
    UTM_KEYS.forEach(function(k) {
      var f2 = $2('#lead-form [name="' + k + '"]');
      if (f2 && utm[k]) f2.value = utm[k];
    });
  }
  function calendlyUrl() {
    var u2 = new URL(CALENDLY2);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(function(k) {
      if (utm[k]) u2.searchParams.set(k, utm[k]);
    });
    if (utm.gclid) u2.searchParams.set("gclid", utm.gclid);
    if (utm.fbclid) u2.searchParams.set("fbclid", utm.fbclid);
    if (utm.landing_variant) u2.searchParams.set("utm_content", utm.utm_content ? utm.utm_content + "_" + utm.landing_variant : "v" + utm.landing_variant);
    if (utm.package) u2.searchParams.set("a1", utm.package);
    return u2.toString();
  }
  function refreshCalendly() {
    var url = calendlyUrl();
    $$("[data-calendly]").forEach(function(a2) {
      a2.href = url;
    });
  }
  fillHidden();
  refreshCalendly();
  (function hero() {
    var h1 = $2("#hero-h1");
    h1.innerHTML = HERO_VARIANTS[variant].h1;
    h1.setAttribute("data-variant", variant);
    if (params.get("cta")) $2("#hero-cta").textContent = params.get("cta").slice(0, 40);
    var frag = document.createDocumentFragment();
    Array.prototype.slice.call(h1.childNodes).forEach(function(node) {
      var grad = node.nodeType === 1 && node.classList.contains("grad");
      var text = node.textContent;
      text.split(/(\s+)/).forEach(function(part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(" "));
          return;
        }
        var w2 = document.createElement("span");
        w2.className = "w" + (grad ? " grad" : "");
        w2.textContent = part;
        frag.appendChild(w2);
      });
    });
    h1.innerHTML = "";
    h1.appendChild(frag);
    if (!RM) {
      var words = $$(".w", h1);
      words.forEach(function(w2, i2) {
        w2.style.opacity = "0";
        w2.style.transform = "translateY(14px)";
        w2.style.transition = "opacity .5s ease " + i2 * 70 + "ms, transform .5s cubic-bezier(.2,.8,.2,1) " + i2 * 70 + "ms";
      });
      requestAnimationFrame(function() {
        requestAnimationFrame(function() {
          words.forEach(function(w2) {
            w2.style.opacity = "1";
            w2.style.transform = "none";
          });
        });
      });
    }
  })();
  function makeSlot(el, opts2) {
    opts2 = opts2 || {};
    var strip = "";
    for (var r2 = 0; r2 < 8; r2++) SYMS.forEach(function(s2) {
      strip += '<div class="sym">' + SYM[s2] + "</div>";
    });
    el.innerHTML = '<div class="slot-head"><span class="slot-logo">' + ICONS.gear + '</span><div style="min-width:0"><div class="slot-title">LUCKY SLOTS</div><div class="slot-sub">Match 3 in a row to win!</div></div></div><div class="reels">' + [0, 1, 2].map(function() {
      return '<div class="reel"><div class="strip">' + strip + "</div></div>";
    }).join("") + '</div><div class="slot-foot"><button type="button" class="slot-btn">Spin</button><span class="slot-inv">' + ICONS.gift + '</span></div><div class="slot-msg"></div>';
    var reels = $$(".reel .strip", el), btn = $2(".slot-btn", el), msg = $2(".slot-msg", el), title = $2(".slot-title", el), sub = $2(".slot-sub", el), inv = $2(".slot-inv", el), logo = $2(".slot-logo", el);
    var pos = [0, 1, 2], busy = false, spins = 0;
    reels.forEach(function(s2, i2) {
      s2.style.transform = "translateY(" + -pos[i2] * 100 / 48 + "%)";
    });
    function setPos(i2, p2, animate, dur) {
      var st = reels[i2];
      st.style.transition = animate ? "transform " + dur + "ms cubic-bezier(.15,.85,.25,1)" : "none";
      st.style.transform = "translateY(" + -p2 * 100 / 48 + "%)";
    }
    function spin() {
      if (busy) return;
      busy = true;
      spins++;
      btn.disabled = true;
      msg.classList.remove("on");
      var win = spins % 3 === 0 || Math.random() < 0.3;
      var target = win ? [1, 1, 1].map(function() {
        return Math.floor(Math.random() * 6);
      }) : [0, 1, 2].map(function() {
        return Math.floor(Math.random() * 6);
      });
      if (win) {
        var t3 = Math.floor(Math.random() * 6);
        target = [t3, t3, t3];
      } else if (target[0] === target[1] && target[1] === target[2]) target[2] = (target[2] + 1) % 6;
      reels.forEach(function(st, i2) {
        var cur = pos[i2] % 6;
        setPos(i2, cur, false, 0);
        void st.offsetHeight;
        var dist = ((target[i2] - cur) % 6 + 6) % 6 + 6 * (3 + i2);
        var np = cur + dist;
        pos[i2] = np;
        if (RM) {
          setPos(i2, np, false, 0);
        } else {
          setPos(i2, np, true, 1100 + i2 * 350);
        }
      });
      var total = RM ? 50 : 1100 + 2 * 350 + 100;
      setTimeout(function() {
        msg.textContent = win ? "You win!" : "So close";
        msg.style.color = win ? "var(--slot-primary)" : "var(--slot-title)";
        msg.classList.add("on");
        setTimeout(function() {
          msg.classList.remove("on");
        }, 1400);
        busy = false;
        btn.disabled = false;
        if (opts2.onSpin) opts2.onSpin(win);
      }, total);
    }
    btn.addEventListener("click", function() {
      spin();
      window.ceTrack((opts2.track || "slot") + "_spin");
    });
    return {
      el,
      spin,
      setTheme: function(t3) {
        el.style.setProperty("--slot-primary", t3.primary);
        el.style.setProperty("--slot-accent", t3.accent);
        el.style.setProperty("--slot-machine", t3.machine);
        el.style.setProperty("--slot-title", t3.title);
      },
      setTitle: function(s2) {
        title.textContent = s2;
      },
      setSub: function(s2) {
        sub.textContent = s2;
      },
      setBtn: function(s2) {
        btn.textContent = s2;
      },
      setIcon: function(n2) {
        inv.innerHTML = ICONS[n2] || ICONS.gift;
      },
      logo: function(on2) {
        logo.classList.toggle("on", !!on2);
      }
    };
  }
  $$("[data-slot]").forEach(function(el) {
    makeSlot(el, { track: el.getAttribute("data-slot") + "_slot" });
  });
  (function demoSite() {
    var site = $2("#site"), car = $2("#site-carousel");
    if (!site) return;
    if (car) {
      var slides = $$(".slide", car), dots = $$(".dots i", car), k = 0;
      var iv = setInterval(function() {
        if (document.hidden) return;
        k = (k + 1) % slides.length;
        slides.forEach(function(s2, i2) {
          s2.classList.toggle("on", i2 === k);
        });
        dots.forEach(function(d2, i2) {
          d2.classList.toggle("on", i2 === k);
        });
      }, 3200);
      cleanups.push(function() {
        clearInterval(iv);
      });
    }
    if (RM) return;
    var dir = 1, pause = 120, raf, on2 = false;
    function step() {
      if (!alive || !on2) return;
      var max = site.scrollHeight - site.clientHeight;
      if (max > 0) {
        if (pause > 0) pause--;
        else {
          site.scrollTop += dir * 0.5;
          if (dir > 0 && site.scrollTop >= max - 0.5) {
            dir = -1;
            pause = 100;
          } else if (dir < 0 && site.scrollTop <= 0.5) {
            dir = 1;
            pause = 150;
          }
        }
      }
      raf = requestAnimationFrame(step);
    }
    if ("IntersectionObserver" in window) new IntersectionObserver(function(es) {
      es.forEach(function(e2) {
        on2 = e2.isIntersecting;
        cancelAnimationFrame(raf);
        if (on2) raf = requestAnimationFrame(step);
      });
    }).observe(site);
    else {
      on2 = true;
      raf = requestAnimationFrame(step);
    }
  })();
  (function tilt() {
    var vis = $2("#hero-visual"), phone = $2("#phone");
    if (!hasHover || RM) return;
    vis.addEventListener("mousemove", function(e2) {
      var r2 = vis.getBoundingClientRect();
      var x = (e2.clientX - r2.left) / r2.width - 0.5;
      var y2 = (e2.clientY - r2.top) / r2.height - 0.5;
      phone.style.transform = "perspective(1100px) rotateY(" + (-18 + x * 22) + "deg) rotateX(" + (7 - y2 * 16) + "deg) rotateZ(-2deg)";
    });
    vis.addEventListener("mouseleave", function() {
      phone.style.transform = "";
    });
  })();
  (function scrollFx() {
    var prog = $2("#progress");
    $2("#big-gear");
    var sticky = $2("#sticky"), hero = $2("#hero"), ticking = false;
    function update() {
      ticking = false;
      var y2 = window.scrollY, h2 = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.transform = "scaleX(" + (h2 > 0 ? Math.min(1, y2 / h2) : 0) + ")";
      var past = y2 > hero.offsetTop + hero.offsetHeight - 80;
      root.classList.toggle("scrolled", past);
      sticky.classList.toggle("on", past);
      sticky.setAttribute("aria-hidden", past ? "false" : "true");
      var fl = $2("#float-pkg");
      if (fl) {
        var pr = $2("#pricing"), prIn = false;
        if (pr) {
          var pb = pr.getBoundingClientRect();
          prIn = pb.top < window.innerHeight * 0.85 && pb.bottom > 0;
        }
        var showFl = past && !prIn;
        fl.classList.toggle("on", showFl);
        fl.setAttribute("aria-hidden", showFl ? "false" : "true");
      }
      scrollDepth();
    }
    window.addEventListener("scroll", function() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  })();
  (function engine() {
    var gear = $2("#big-gear"), hero = $2("#hero");
    if (!gear || RM) return;
    var angle = 0, vel = 0.9, lastY = window.scrollY, last = performance.now(), on2 = true, raf;
    function frame(now) {
      var dt = Math.min(64, now - last);
      last = now;
      var dy = window.scrollY - lastY;
      lastY = window.scrollY;
      vel += Math.abs(dy) * 0.015;
      vel += (0.9 - vel) * 0.03;
      angle = (angle + vel * dt * 0.06) % 360;
      gear.style.transform = "rotate(" + angle.toFixed(2) + "deg)";
      if (on2 && alive) raf = requestAnimationFrame(frame);
    }
    if ("IntersectionObserver" in window) new IntersectionObserver(function(es) {
      es.forEach(function(e2) {
        on2 = e2.isIntersecting;
        if (on2) {
          cancelAnimationFrame(raf);
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      });
    }).observe(hero);
    else raf = requestAnimationFrame(frame);
  })();
  function countUp(el, target, format, dur) {
    var start = performance.now();
    dur = dur || 1600;
    var render3 = function(v2) {
      var s2 = format === "plus" ? fmt(v2) + "+" : format === "money" ? "£" + fmt(v2) : fmt(v2);
      if (el.dataset.prefix) s2 = el.dataset.prefix + s2;
      if (el.dataset.suffix) s2 = s2 + el.dataset.suffix;
      el.textContent = s2;
    };
    if (RM) {
      render3(target);
      return;
    }
    (function step(now) {
      var p2 = Math.min(1, (now - start) / dur);
      var e2 = 1 - Math.pow(1 - p2, 3);
      render3(target * e2);
      if (p2 < 1) requestAnimationFrame(step);
    })(start);
  }
  $$("#counters [data-target]").forEach(function(el) {
    once(el, function() {
      countUp(el, +el.dataset.target, el.dataset.format);
    });
  });
  (function marquee() {
    var mk = function(o2) {
      var name = o2[0], slug = o2[1];
      var initials = name.split(/\s+/).map(function(w2) {
        return w2[0];
      }).join("").slice(0, 2).toUpperCase();
      return '<span class="op"><img src="/images/tenant-icons/' + slug + '.png" alt="" loading="lazy" onerror="this.remove()"><i>' + initials + "</i>" + esc(name) + "</span>";
    };
    var a2 = OPERATORS.slice(0, 15).map(mk).join(""), b2 = OPERATORS.slice(15).map(mk).join("");
    $2("#marquee-a").innerHTML = a2 + a2;
    $2("#marquee-b").innerHTML = b2 + b2;
  })();
  (function bento() {
    var grid = $2("#bento"), cards = $$(".card", grid);
    if (!RM) grid.classList.add("armed");
    var i2 = 0;
    cards.forEach(function(c2) {
      once(c2, function(el) {
        var d2 = i2++ % 4 * 90;
        setTimeout(function() {
          el.classList.add("in");
        }, RM ? 0 : d2);
      }, { threshold: 0.2 });
    });
    var gridEl = $2("#scratch-grid"), TILES = [["cash", "Cash prize"], ["gift", "Site credit"], ["x", "No luck"], ["star", "Free entry"], ["cash", "Cash prize"], ["dice", "Spin again"]];
    function build() {
      gridEl.innerHTML = TILES.map(function(t3) {
        return '<div class="tile' + (t3[0] === "cash" ? " win" : "") + '"><span><span class="ic" style="width:22px;height:22px;display:block;margin:0 auto 2px">' + ICONS[t3[0]] + "</span>" + t3[1] + "</span><canvas></canvas></div>";
      }).join("");
      $$(".tile", gridEl).forEach(initTile);
    }
    function initTile(tile) {
      var cv = $2("canvas", tile), ctx = cv.getContext("2d"), down = false, cleared = false;
      function size() {
        var r2 = tile.getBoundingClientRect();
        if (!r2.width) return;
        cv.width = Math.round(r2.width);
        cv.height = Math.round(r2.height);
        var g2 = ctx.createLinearGradient(0, 0, cv.width, cv.height);
        g2.addColorStop(0, "#8a5fb8");
        g2.addColorStop(1, "#4839a0");
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.font = "700 11px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("SCRATCH", cv.width / 2, cv.height / 2 + 4);
      }
      size();
      if (!cv.width) once(tile, size, { threshold: 0.01 });
      function pt(e2) {
        var r2 = cv.getBoundingClientRect();
        var p2 = e2.touches ? e2.touches[0] : e2;
        return [(p2.clientX - r2.left) * (cv.width / r2.width), (p2.clientY - r2.top) * (cv.height / r2.height)];
      }
      function scratch(e2) {
        if (!down || cleared) return;
        e2.preventDefault();
        var p2 = pt(e2);
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(p2[0], p2[1], 14, 0, Math.PI * 2);
        ctx.fill();
      }
      function check() {
        if (cleared || !cv.width) return;
        var d2 = ctx.getImageData(0, 0, cv.width, cv.height).data, n2 = 0, t3 = 0;
        for (var i3 = 3; i3 < d2.length; i3 += 32) {
          t3++;
          if (d2[i3] === 0) n2++;
        }
        if (n2 / t3 > 0.5) {
          cleared = true;
          cv.style.transition = "opacity .4s";
          cv.style.opacity = "0";
          setTimeout(function() {
            cv.remove();
          }, 400);
          window.ceTrack("ecosystem_scratch_reveal");
        }
      }
      var start = function(e2) {
        down = true;
        scratch(e2);
      }, endp = function() {
        if (down) {
          down = false;
          check();
        }
      };
      cv.addEventListener("mousedown", start);
      cv.addEventListener("mousemove", scratch);
      window.addEventListener("mouseup", endp);
      cv.addEventListener("touchstart", start, { passive: false });
      cv.addEventListener("touchmove", scratch, { passive: false });
      cv.addEventListener("touchend", endp);
      tile.revealAll = function() {
        cleared = true;
        cv.remove();
      };
    }
    $2("#scratch-reveal").addEventListener("click", function() {
      $$(".tile", gridEl).forEach(function(t3) {
        t3.revealAll && t3.revealAll();
      });
      window.ceTrack("ecosystem_scratch_reveal_all");
    });
    $2("#scratch-reset").addEventListener("click", function() {
      build();
      window.ceTrack("ecosystem_scratch_reset");
    });
    build();
  })();
  (function convert() {
    $2("#fb-checks").innerHTML = Array.apply(null, Array(14)).map(function(_2, i2) {
      return '<i style="--n:' + i2 + '"><span class="ic">' + ICONS.check + "</span></i>";
    }).join("");
    $$("[data-reveal]").forEach(function(c2) {
      once(c2, function(el) {
        el.classList.add("in");
        $$("[data-count]", el).forEach(function(n2) {
          countUp(n2, +n2.dataset.count, "num", 1400);
        });
      }, { threshold: 0.35 });
    });
    once($2("#rev-chart"), function(el) {
      el.classList.add("in");
    }, { threshold: 0.4 });
  })();
  (function draws() {
    var W = function(name, ticket, prize, ts, block) {
      return { name, ticket, prize, timestamp: ts, block };
    };
    var DRAWS = [
      { slug: "bmw", prize: "BMW M3 Competition Pack", value: "£75k", type: "STAR DRAWS", date: "18 May 2026", icon: "car", ph: "linear-gradient(135deg,#1e3a8a,#4839a0)", hashes: [
        { full: "a3f9b2c47e1d8f053a9c6b8d2e4f1a5c7d9b3e6f8c2a4d6e1f3b5a7c9d8e2f4c", winner: W("Sarah K.", "#04827", "BMW M3 Competition Pack", "18 May 2026 · 21:02:14 UTC", "#4,201") },
        { full: "b1e2c8d4a5f3e7b9c1d6f2e8a4b7c9d5e3f1a8b6c4d2e9f7a3b5c8d1e6f4a2cd", winner: W("James P.", "#00193", "£500 cash (instant win)", "18 May 2026 · 21:03:02 UTC", "#4,202") },
        { full: "c8d4e2f6a1b3c5d7e9f2a4b6c8d1e3f5a7b9c2d4e6f8a1b3c5d7e9f2a4b6c8e1", winner: W("Amira H.", "#11240", "£250 site credit", "18 May 2026 · 21:04:48 UTC", "#4,203") }
      ] },
      { slug: "imac", prize: 'Apple iMac Pro 32"', value: "£4,999", type: "BLAZE", date: "14 May 2026", icon: "monitor", ph: "linear-gradient(135deg,#3b3b5c,#4839a0)", hashes: [
        { full: "f4a8c2e6b9d3f5a7c1b4e6d8f2a5c7b3e9d1f4a8c6b2e5d7f1a4c8b6e3d5f9a2", winner: W("Tom R.", "#08312", 'Apple iMac Pro 32"', "14 May 2026 · 19:30:11 UTC", "#3,847") },
        { full: "b7d3f5a1c4e8b2d6f3a5c7b1e9d4f6a2c8b5e7d1f3a9c4b6e2d8f5a1c7b3e9d4", winner: W("Lia M.", "#02541", "£200 cash", "14 May 2026 · 19:31:02 UTC", "#3,848") },
        { full: "c2e5b8d4f1a7c3e6b9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4", winner: W("Daniel B.", "#19874", "12-month £200 site credit", "14 May 2026 · 19:31:48 UTC", "#3,849") }
      ] },
      { slug: "maldives", prize: "Maldives Trip for Two", value: "£12k", type: "KINGS", date: "10 May 2026", icon: "plane", ph: "linear-gradient(135deg,#0e7490,#4839a0)", hashes: [
        { full: "3d7f9a2c5e8b1d4f6a3c9e2b5d8f1a4c7e0b3d6f9a2c5e8b1d4f6a3c9e2b5d8f", winner: W("Sofia G.", "#07631", "Maldives Trip for 2", "10 May 2026 · 20:00:42 UTC", "#3,612") },
        { full: "7b2e5d8a3c6f9b1d4e7a2c5f8b3d6e9a4c7f1b4e7d2a5c8f3b6e9d2a5c8f3b6e", winner: W("Marcus T.", "#03210", "£1,000 cash", "10 May 2026 · 20:01:33 UTC", "#3,613") },
        { full: "4a8c1e5b2d7f3a6c9e4b1d8f5a2c7e0b3d6f9a4c7e2b5d8f1a4c7e0b3d6f9a4c", winner: W("Aisha N.", "#15893", "£250 site credit", "10 May 2026 · 20:02:21 UTC", "#3,614") }
      ] },
      { slug: "tesla", prize: "Tesla Model Y", value: "£52k", type: "APEX", date: "06 May 2026", icon: "car", ph: "linear-gradient(135deg,#7f1d1d,#4839a0)", hashes: [
        { full: "9e3b7a1d5f8c2b6e4a9d7f1c3b8e2a5d6f9c4b1e7a3d8f5c2b6e9a4d1f7c3b8e", winner: W("Ben C.", "#23015", "Tesla Model Y Long Range", "06 May 2026 · 21:15:08 UTC", "#3,401") },
        { full: "5c8a2f4d7b1e9c3a6f2d5b8e1c4a7f9d3b6e2c5a8f4d1b7e3c6a9f2d5b8e1c4a", winner: W("Holly W.", "#11402", "£750 cash", "06 May 2026 · 21:16:00 UTC", "#3,402") }
      ] },
      { slug: "rolex", prize: "Rolex Submariner Date", value: "£10,950", type: "LUXE", date: "02 May 2026", icon: "watch", ph: "linear-gradient(135deg,#065f46,#4839a0)", hashes: [
        { full: "e2a5b9c8d1f3a7b4e6c2d9f5a8b1c4e7d3f6a2b5c8e1d4f7a3b6c9e2d5f8a1b4", winner: W("Connor F.", "#06294", "Rolex Submariner Date", "02 May 2026 · 20:30:11 UTC", "#3,188") },
        { full: "8f1d4a7b2e5c8d3f6a9b4e1c7d2f5a8b3e6c9d4f1a7b2e5c8d3f6a9b4e1c7d2f", winner: W("Zara K.", "#18027", "£500 site credit", "02 May 2026 · 20:31:04 UTC", "#3,189") }
      ] },
      { slug: "cash", prize: "£25,000 Tax-Free Cash", value: "£25k", type: "BIG WINS", date: "28 Apr 2026", icon: "cash", ph: "linear-gradient(135deg,#92400e,#4839a0)", hashes: [
        { full: "d6f3a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5", winner: W("Owen H.", "#09146", "£25,000 tax-free", "28 Apr 2026 · 21:00:18 UTC", "#3,002") },
        { full: "a8b3e6c9d2f5a8b1c4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2", winner: W("Maddie L.", "#21477", "£200 cash", "28 Apr 2026 · 21:01:05 UTC", "#3,003") },
        { full: "c4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9", winner: W("Charlie R.", "#14820", "£100 site credit", "28 Apr 2026 · 21:01:52 UTC", "#3,004") }
      ] }
    ];
    var LABELS = ["Main", "Instant", "Instant"];
    var host = $2("#draws");
    if (!host) return;
    host.innerHTML = DRAWS.map(function(d2, i2) {
      return '<div class="card draw" data-i="' + i2 + '"><div class="photo" style="--ph:' + d2.ph + '"><img src="/images/draws/' + d2.slug + '.jpg" alt="" loading="lazy" onerror="this.remove()"><span class="ic">' + ICONS[d2.icon] + '</span><span class="tag type">' + d2.type + '</span><div class="prize">' + esc(d2.prize) + "<small>" + d2.value + '</small></div></div><div class="body"><div class="meta"><span>Drawn ' + d2.date + '</span><span>GLI RNG · SHA-256</span></div><div class="hashes">' + d2.hashes.map(function(h2, k) {
        return '<div class="hrow" data-h="' + h2.full + '" role="button" tabindex="0" title="Click to fill the verifier"><span class="lbl">' + LABELS[k] + "</span><code>" + h2.full.slice(0, 8) + "…" + h2.full.slice(-5) + '</code><button type="button" class="copy" data-copy="' + h2.full + '">Copy</button></div>';
      }).join("") + '</div><form class="verify"><input type="text" placeholder="Paste a hash to verify" aria-label="Paste a hash to verify" autocomplete="off" spellcheck="false"><button type="submit" class="btn btn-ghost btn-sm" data-track="draws_verify">Verify</button></form><span class="vmsg" aria-live="polite"></span><div class="reveal"><span class="ic">' + ICONS["check-c"] + '</span><b class="rv-name"></b><span class="rv-ticket"></span><span class="rv-time"></span><span class="tnum" data-full></span><button type="button" class="btn btn-ghost btn-sm close">Close</button></div></div></div>';
    }).join("");
    on(host, "click", function(e2) {
      var copy = e2.target.closest(".copy");
      if (copy) {
        e2.stopPropagation();
        var h2 = copy.dataset.copy;
        var done = function() {
          copy.textContent = "Copied";
          copy.classList.add("done");
          setTimeout(function() {
            copy.textContent = "Copy";
            copy.classList.remove("done");
          }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(h2).then(done, done);
        else done();
        window.ceTrack("draws_copy_hash");
        return;
      }
      var row = e2.target.closest(".hrow");
      if (row) {
        var card = row.closest(".draw");
        var inp = $2(".verify input", card);
        inp.value = row.dataset.h;
        inp.focus();
        return;
      }
      var close = e2.target.closest(".reveal .close");
      if (close) {
        var c2 = close.closest(".draw");
        c2.classList.remove("ok");
        $2(".verify input", c2).value = "";
      }
    });
    on(host, "keydown", function(e2) {
      var row = e2.target.closest(".hrow");
      if (row && (e2.key === "Enter" || e2.key === " ")) {
        e2.preventDefault();
        row.click();
      }
    });
    on(host, "submit", function(e2) {
      e2.preventDefault();
      var card = e2.target.closest(".draw"), d2 = DRAWS[+card.dataset.i], inp = $2("input", e2.target), v2 = inp.value.trim().toLowerCase(), msg = $2(".vmsg", card);
      card.classList.remove("bad");
      void card.offsetWidth;
      var hit = d2.hashes.filter(function(h2) {
        return h2.full === v2;
      })[0];
      if (hit) {
        var w2 = hit.winner;
        $2(".rv-name", card).textContent = "Winner: " + w2.name;
        $2(".rv-ticket", card).textContent = "Ticket " + w2.ticket + " · " + w2.prize;
        $2(".rv-time", card).textContent = "Drawn " + w2.timestamp + " · block " + w2.block;
        $2("[data-full]", card).textContent = v2;
        msg.textContent = "";
        card.classList.add("ok");
        window.ceTrack("draws_verify_ok");
      } else {
        card.classList.add("bad");
        msg.textContent = v2 ? "No draw matches that hash. Copy one from this card and try again." : "Paste a hash first.";
        window.ceTrack("draws_verify_fail");
      }
    });
  })();
  (function comparison() {
    var ROWS = [
      { l: "Per-order fee", why: "The number that compounds every month", ce: ["5–10p", 1], saas: ["17p", 0], wp: ["Plugin licences + hosting + a developer on call", 0] },
      { l: "Your own games", why: "Nine games you theme, brand and preview live", ce: ["Game Studio — build your own", 1], saas: ["7+ fixed presets, same as every other site", 0], wp: ["Whatever the theme ships with", 0] },
      { l: "Years operating in this category", why: "Draw nights are where platforms break", ce: ["5+ years", 1], saas: ["4+ years", 2], wp: ["Depends on the agency", 0] },
      { l: "Independent penetration test", why: "Your customers' card data rides on this", ce: ["Yes — published", 1], saas: ["Not published", 0], wp: ["Your responsibility", 0] },
      { l: "Separate cash and site-credit wallets", why: "Clean accounting and compliance by design", ce: ["Built in", 1], saas: ["Not advertised", 0], wp: ["Plugin-dependent", 0] },
      { l: "RNG / draw certification", why: "Provably fair draws your customers can verify", ce: ["GLI certified + SHA-256 hash chain", 1], saas: ["GLI verified", 2], wp: ["None", 0] },
      { l: "UK Voluntary Code alignment", why: "Free entry, age checks and wallet rules, automatically", ce: ["Built in from launch", 1], saas: ["Added recently", 2], wp: ["Manual", 0] },
      { l: "Every feature included", why: 'No "Pro tier" appearing once you are locked in', ce: ["Always — 24 features shipped this year", 1], saas: ["Depends on plan", 2], wp: ["Every plugin is another licence", 0] },
      { l: "Public order / ticket numbers (30d)", why: "Proof it runs at scale", ce: ["LIVE", 1], saas: ["Not published", 0], wp: ["n/a", 0] }
    ];
    var body = $2("#cmp-body"), head = $2("#cmp-other-head"), wrap3 = $2("#cmp"), note = $2("#cmp-assume");
    if (!body) return;
    var live = function() {
      return fmt(opts.orders) + " orders · " + fmt(opts.tickets) + " tickets";
    };
    var mark = function(st) {
      return st === 1 ? '<span class="ic ok">' + ICONS.check + "</span>" : st === 2 ? '<span class="ic mid">' + ICONS.minus + "</span>" : '<span class="ic no">' + ICONS.x + "</span>";
    };
    function render3(mode) {
      body.innerHTML = ROWS.map(function(r2) {
        var ce = r2.ce[0] === "LIVE" ? live() : r2.ce[0];
        var other = mode === "saas" ? r2.saas : r2.wp;
        return "<tr><td><b>" + r2.l + "</b><small>" + r2.why + '</small></td><td class="ce">' + mark(r2.ce[1]) + ce + '</td><td class="other st' + other[1] + '">' + mark(other[1]) + other[0] + "</td></tr>";
      }).join("");
      head.textContent = mode === "saas" ? "Other SaaS" : "WordPress + plugins";
      note.textContent = mode === "saas" ? "CompEngine figures are rolling 30-day numbers; Other SaaS values are taken from public pricing and marketing pages." : "WordPress + plugins varies by theme, plugin stack and developer, so no figures are stated.";
    }
    $$(".seg button").forEach(function(b2) {
      on(b2, "click", function() {
        $$(".seg button").forEach(function(x) {
          x.setAttribute("aria-pressed", x === b2 ? "true" : "false");
        });
        wrap3.classList.add("swap");
        setTimeout(function() {
          render3(b2.dataset.cmp);
          wrap3.classList.remove("swap");
        }, RM ? 0 : 220);
      });
    });
    render3("saas");
  })();
  (function faq() {
    var Q = [
      ["How do I start a competition website?", "Book a 30-minute demo and tell us your prize and game type. We handle domain setup, payment gateway connection, and game configuration from there — most operators are live within 1–2 weeks."],
      ["What types of competitions do you offer?", "Raffles, instant-win games (Slots, Scratch Cards, Spin-the-Wheel, Bingo, Coin Drop, Ticket Eater, Fishing, Football, Balloon Pop), and compliant free-entry competitions — all configurable in Game Studio."],
      ["How do I stay compliant?", "CompEngine is built around UK VCOC compliance — free-entry routes, age verification, and separate Cash/Site Credit wallets are enforced at the platform level, and compliance updates ship automatically to every operator."],
      ["How quickly can I launch?", "Most operators are live within 1–2 weeks of their onboarding call. We've done it in 4 days for operators with an urgent deadline."],
      ["Can I export my data?", "Yes — your analytics dashboard shows orders, revenue, ticket counts, and customer lifetime value in real time, and you can export everything. You own your data; we never aggregate or sell it."],
      ["Do you integrate a payment gateway that accepts Apple & Google Pay?", "Yes — our UK-licensed payment gateway integration supports Apple Pay and Google Pay alongside standard card payments, so customers can check out in one tap."],
      ["Is the website secure?", "Yes — built on enterprise-grade infrastructure with a UK-licensed payment gateway, continuous security monitoring, and independent penetration testing on a defined cycle."],
      ["Are there any limits on tickets or instant wins?", "No — CompEngine has no hard limits on ticket volume or instant-win prize counts, so your competitions can scale with demand."],
      ["Can you build a mobile app?", "Yes — native iOS and Android apps are available, complete with push notifications to keep your audience engaged."]
    ];
    var list = $2("#faq-list");
    list.innerHTML = Q.map(function(q, i2) {
      return '<div class="faq-item' + (i2 === 0 ? " open" : "") + '"><h3><button type="button" class="faq-q" aria-expanded="' + (i2 === 0) + '" aria-controls="faq-a-' + i2 + '" id="faq-q-' + i2 + '">' + esc(q[0]) + '<span class="ic">' + ICONS.x.replace("M6 6l12 12M18 6L6 18", "M12 5v14M5 12h14") + '</span></button></h3><div class="faq-a" id="faq-a-' + i2 + '" role="region" aria-labelledby="faq-q-' + i2 + '"><div><p>' + esc(q[1]) + "</p></div></div></div>";
    }).join("");
    list.addEventListener("click", function(e2) {
      var b2 = e2.target.closest(".faq-q");
      if (!b2) return;
      var item = b2.closest(".faq-item"), open = item.classList.contains("open");
      $$(".faq-item", list).forEach(function(it) {
        it.classList.remove("open");
        $2(".faq-q", it).setAttribute("aria-expanded", "false");
      });
      if (!open) {
        item.classList.add("open");
        b2.setAttribute("aria-expanded", "true");
        window.ceTrack("faq_open", { q: b2.textContent.trim() });
      }
    });
  })();
  (function lead() {
    var form = $2("#lead-form"), busy = false;
    function setErr(input, msg) {
      var f2 = input.closest(".field");
      f2.classList.toggle("err", !!msg);
      $2(".msg", f2).textContent = msg || "";
    }
    function validate() {
      var ok = true;
      var rules = [
        ["#f-name", function(v2) {
          return v2.length >= 2;
        }, "Add your name."],
        ["#f-biz", function(v2) {
          return v2.length >= 2;
        }, "Add your business or site name."],
        ["#f-email", function(v2) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v2);
        }, "Enter a valid email so we can send the invite."],
        ["#f-phone", function(v2) {
          var d2 = v2.replace(/[\s\-().]/g, "");
          return /^(\+44\d{9,10}|0\d{9,10})$/.test(d2);
        }, "Enter a UK number, e.g. 07xxx xxxxxx or +44."],
        ["#f-platform", function(v2) {
          return !!v2;
        }, "Pick the closest option."],
        ["#f-orders", function(v2) {
          return !!v2;
        }, "Pick a rough volume."]
      ];
      rules.forEach(function(r2) {
        var el = $2(r2[0]);
        var v2 = el.value.trim();
        var pass = r2[1](v2);
        setErr(el, pass ? "" : r2[2]);
        if (!pass && ok) {
          ok = false;
          el.focus();
        }
      });
      return ok;
    }
    $$("input, select", form).forEach(function(el) {
      el.addEventListener("input", function() {
        if (el.closest(".field").classList.contains("err")) validate();
      });
    });
    form.addEventListener("submit", function(e2) {
      e2.preventDefault();
      if (busy || !validate()) return;
      busy = true;
      var btn = $2('button[type="submit"]', form);
      btn.disabled = true;
      btn.textContent = "Sending…";
      var data = {};
      $$("input, select", form).forEach(function(el) {
        if (el.name) data[el.name] = el.value;
      });
      data.page = location.href;
      data.submitted_at = (/* @__PURE__ */ new Date()).toISOString();
      var finish = function(ok) {
        busy = false;
        btn.disabled = false;
        btn.textContent = "Book my 30-min demo →";
        form.classList.add("done");
        refreshCalendly();
        window.ceTrack(ok ? "booking_lead_saved" : "booking_lead_fallback", { orders: data.monthly_orders });
        if (!ok) {
          var w2 = window.open(calendlyUrl(), "_blank", "noopener");
          if (!w2) $2(".thanks .btn", form).focus();
        } else $2(".thanks .btn", form).focus();
      };
      axios.post("/api/leads", data).then(function() {
        finish(true);
      }).catch(function() {
        finish(false);
      });
    });
  })();
  on(document, "ce:package", function(e2) {
    var s2 = e2 && e2.detail || "";
    var f2 = $2("#f-package");
    if (f2) f2.value = s2;
    if (s2) utm.package = s2;
    else delete utm.package;
    try {
      sessionStorage.setItem("ce_utm", JSON.stringify(utm));
    } catch (err) {
    }
    refreshCalendly();
  });
  (function exitIntent() {
    var box = $2("#exit");
    if (!hasHover) return;
    var shown = false;
    try {
      shown = sessionStorage.getItem("ce_exit") === "1";
    } catch (e2) {
    }
    if (shown) return;
    function show() {
      if (shown || !isDesktop() || $2("#pb-modal").classList.contains("open")) return;
      var h2 = document.documentElement.scrollHeight - window.innerHeight;
      if (h2 <= 0 || window.scrollY / h2 < 0.4) return;
      shown = true;
      try {
        sessionStorage.setItem("ce_exit", "1");
      } catch (e2) {
      }
      box.classList.add("on");
      box.setAttribute("aria-hidden", "false");
      window.ceTrack("exit_intent_shown");
    }
    document.addEventListener("mouseleave", function(e2) {
      if (e2.clientY <= 0) show();
    });
    $2("#exit-x").addEventListener("click", function() {
      box.classList.remove("on");
      box.setAttribute("aria-hidden", "true");
    });
  })();
  (function nav() {
    var b2 = $2("#burger"), m2 = $2("#mobile-menu");
    b2.addEventListener("click", function() {
      var o2 = m2.classList.toggle("open");
      b2.setAttribute("aria-expanded", o2 ? "true" : "false");
    });
    m2.addEventListener("click", function(e2) {
      if (e2.target.tagName === "A") {
        m2.classList.remove("open");
        b2.setAttribute("aria-expanded", "false");
      }
    });
  })();
  $$(".more-btn").forEach(function(b2) {
    b2.addEventListener("click", function() {
      var c2 = b2.closest(".card"), open = c2.classList.toggle("expanded");
      b2.textContent = open ? "Less" : "More";
      b2.setAttribute("aria-expanded", open ? "true" : "false");
      window.ceTrack("ecosystem_more", { card: $2("h3", c2).textContent });
    });
  });
  (function fx() {
    if (!hasHover || RM) return;
    $$(".card").forEach(function(c2) {
      c2.addEventListener("pointerenter", function() {
        c2.classList.add("lit");
      });
      c2.addEventListener("pointerleave", function() {
        c2.classList.remove("lit");
      });
      c2.addEventListener("pointermove", function(e2) {
        var r2 = c2.getBoundingClientRect();
        c2.style.setProperty("--mx", e2.clientX - r2.left + "px");
        c2.style.setProperty("--my", e2.clientY - r2.top + "px");
      });
    });
    $$(".btn-primary").forEach(function(b2) {
      if (b2.closest(".ce-sticky")) return;
      b2.classList.add("mag");
      if (!b2.querySelector("span")) {
        var s2 = document.createElement("span");
        while (b2.firstChild) s2.appendChild(b2.firstChild);
        b2.appendChild(s2);
      }
      var inner = b2.querySelector("span");
      b2.addEventListener("pointermove", function(e2) {
        var r2 = b2.getBoundingClientRect();
        var dx = e2.clientX - (r2.left + r2.width / 2), dy = e2.clientY - (r2.top + r2.height / 2);
        b2.style.transform = "translate(" + dx * 0.18 + "px," + dy * 0.25 + "px)";
        inner.style.transform = "translate(" + dx * 0.08 + "px," + dy * 0.1 + "px)";
      });
      b2.addEventListener("pointerleave", function() {
        b2.style.transform = "";
        inner.style.transform = "";
      });
    });
  })();
  (function aurora() {
    var cv = $2("#aurora");
    if (!cv || RM) return;
    var ctx = cv.getContext("2d"), W = cv.width, H = cv.height, t3 = 0, on2 = false, raf;
    var blobs = [
      { c: [244, 165, 88], r: 62, sx: 0.9, sy: 0.7, ox: 0.28, oy: 0.3, a: 0.95 },
      { c: [217, 122, 168], r: 58, sx: 0.6, sy: 1.1, ox: 0.7, oy: 0.35, a: 0.9 },
      { c: [91, 127, 196], r: 66, sx: 0.8, sy: 0.5, ox: 0.6, oy: 0.75, a: 0.95 },
      { c: [178, 151, 219], r: 50, sx: 1.2, sy: 0.9, ox: 0.3, oy: 0.7, a: 0.8 }
    ];
    function frame() {
      t3 += 8e-3;
      ctx.clearRect(0, 0, W, H);
      blobs.forEach(function(b2, i2) {
        var x = W * (b2.ox + 0.18 * Math.sin(t3 * b2.sx + i2)), y2 = H * (b2.oy + 0.16 * Math.cos(t3 * b2.sy + i2 * 1.7));
        var g2 = ctx.createRadialGradient(x, y2, 0, x, y2, b2.r);
        g2.addColorStop(0, "rgba(" + b2.c.join(",") + "," + b2.a + ")");
        g2.addColorStop(1, "rgba(" + b2.c.join(",") + ",0)");
        ctx.fillStyle = g2;
        ctx.beginPath();
        ctx.arc(x, y2, b2.r, 0, Math.PI * 2);
        ctx.fill();
      });
      if (on2) raf = requestAnimationFrame(frame);
    }
    if ("IntersectionObserver" in window) new IntersectionObserver(function(es) {
      es.forEach(function(e2) {
        on2 = e2.isIntersecting;
        if (on2) {
          cancelAnimationFrame(raf);
          frame();
        }
      });
    }).observe(cv);
    else {
      on2 = true;
      frame();
    }
    $2(".mesh").style.display = "none";
  })();
  (function livePulse() {
    var DEMO_DRIFT = true;
    var COMPS = ["BMW M3 Competition Pack", 'Apple iMac Pro 32"', "Maldives Trip for Two", "Tesla Model Y", "Rolex Submariner Date", "£25,000 Tax-Free Cash", "£500 Site Credit", "10× Instant Wins"];
    var WHERE = ["Manchester", "Leeds", "Glasgow", "Birmingham", "Cardiff", "Liverpool", "Bristol", "Newcastle", "Belfast", "Sheffield", "Nottingham", "Southampton"];
    var QTY = [5, 10, 10, 15, 20, 25, 30, 50, 100];
    var list = $2("#feed-list"), push = $2("#push"), pushTxt = $2("#push-txt"), ordersEl = $2('[data-live="orders_30d"]'), ticketsEl = $2('[data-live="tickets_30d"]');
    $2("#push .ic").innerHTML = ICONS.bell;
    var rows = [], pushTimer, heroVisible = true, LIVE = [];
    axios.get("/api/activity/recent").then(function(r2) {
      var ev = r2 && r2.data && r2.data.events;
      if (ev && ev.length) LIVE = ev.filter(function(e2) {
        return e2 && e2.brand;
      });
    }).catch(function() {
    });
    function pick(a2) {
      return a2[Math.floor(Math.random() * a2.length)];
    }
    function ago(ts) {
      var s2 = Math.max(0, Math.round((Date.now() - ts) / 1e3));
      return s2 < 4 ? "just now" : s2 < 60 ? s2 + "s ago" : Math.round(s2 / 60) + "m ago";
    }
    function render3() {
      rows.forEach(function(r2) {
        r2.el.querySelector(".when").textContent = ago(r2.ts);
      });
    }
    function addRow(o2) {
      var el = document.createElement("div");
      el.className = "feed-row";
      el.innerHTML = '<span class="qty"><span class="ic">' + ICONS.doc + "</span>" + o2.tickets + ' tickets</span><span class="what"><b>' + esc(o2.comp) + "</b> · " + esc(o2.where) + '</span><span class="when">just now</span>';
      list.insertBefore(el, list.firstChild);
      rows.unshift({ el, ts: o2.ts || Date.now() });
      while (rows.length > 3) {
        var old = rows.pop();
        old.el.classList.add("out");
        (function(x) {
          setTimeout(function() {
            x.remove();
          }, 400);
        })(old.el);
      }
    }
    function showPush(o2) {
      pushTxt.textContent = o2.tickets + " tickets · " + o2.comp;
      push.classList.add("on");
      clearTimeout(pushTimer);
      pushTimer = setTimeout(function() {
        push.classList.remove("on");
      }, 2600);
    }
    window.ceLiveOrder = function(o2) {
      o2 = o2 || {};
      if (LIVE.length && !o2.comp) {
        var ev = pick(LIVE);
        var n2 = parseInt(String(ev.val || "").replace(/[^0-9]/g, ""), 10);
        if (/ticket/i.test(ev.suffix || "") && n2) o2.tickets = n2;
        o2.comp = String(ev.brand || "").replace(/\w\S*/g, function(w2) {
          return w2.charAt(0) + w2.slice(1).toLowerCase();
        });
        o2.where = [ev.verb, ev.val, ev.suffix].filter(Boolean).join(" ");
      }
      o2.tickets = o2.tickets || pick(QTY);
      o2.comp = o2.comp || pick(COMPS);
      o2.where = o2.where || pick(WHERE);
      o2.ts = Date.now();
      addRow(o2);
      if (heroVisible && !RM) showPush(o2);
      window.ceTrack("live_order_shown", { demo: DEMO_DRIFT });
    };
    var seed = [{ tickets: 25, comp: "BMW M3 Competition Pack", where: "Leeds", ts: Date.now() - 9e3 }, { tickets: 10, comp: "Rolex Submariner Date", where: "Glasgow", ts: Date.now() - 27e3 }, { tickets: 50, comp: "£25,000 Tax-Free Cash", where: "Manchester", ts: Date.now() - 51e3 }];
    seed.reverse().forEach(addRow);
    render3();
    var feedIv = setInterval(render3, 5e3);
    cleanups.push(function() {
      clearInterval(feedIv);
    });
    setTimeout(function() {
      +ordersEl.dataset.target;
      +ticketsEl.dataset.target;
    }, 2600);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function(es) {
        es.forEach(function(e2) {
          heroVisible = e2.isIntersecting;
        });
      }, { threshold: 0.2 }).observe($2("#hero-visual"));
    }
    if (!RM) {
      (function loop() {
        var wait = 3500 + Math.random() * 4500;
        setTimeout(function() {
          if (!alive) return;
          if (!document.hidden) window.ceLiveOrder();
          loop();
        }, wait);
      })();
      setTimeout(function() {
        window.ceLiveOrder();
      }, 1800);
    }
  })();
  (function ticketStorm() {
    var cv = $2("#tickets");
    if (!cv || RM) return;
    var ctx = cv.getContext("2d"), W = 0, H = 0, DPR = Math.min(2, window.devicePixelRatio || 1), on2 = false, raf, mx = 0, my = 0;
    var COLS = [[244, 165, 88], [236, 138, 130], [217, 122, 168], [178, 151, 219], [91, 127, 196]];
    var N = isDesktop() ? 12 : 5, T2 = [], F = 700;
    function reset(t3, far) {
      t3.x = (Math.random() - 0.5) * 1.6;
      t3.y = (Math.random() - 0.5) * 1.4;
      t3.z = far ? 900 + Math.random() * 500 : Math.random() * 1400;
      t3.r = Math.random() * Math.PI * 2;
      t3.vr = (Math.random() - 0.5) * 0.01;
      t3.vz = 0.6 + Math.random() * 1.1;
      t3.c = COLS[Math.floor(Math.random() * COLS.length)];
      t3.w = 120 + Math.random() * 60;
      return t3;
    }
    for (var i2 = 0; i2 < N; i2++) T2.push(reset({}, false));
    function size() {
      var r2 = cv.getBoundingClientRect();
      W = r2.width;
      H = r2.height;
      cv.width = W * DPR;
      cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    function ticket(x, y2, w2, h2, r2, a2, c2) {
      ctx.save();
      ctx.translate(x, y2);
      ctx.rotate(r2);
      ctx.globalAlpha = a2;
      var g2 = ctx.createLinearGradient(-w2 / 2, 0, w2 / 2, 0);
      g2.addColorStop(0, "rgb(" + c2.join(",") + ")");
      g2.addColorStop(1, "rgba(" + c2.join(",") + ",0.55)");
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.roundRect(-w2 / 2, -h2 / 2, w2, h2, h2 * 0.18);
      ctx.fill();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(-w2 / 2, 0, h2 * 0.16, 0, Math.PI * 2);
      ctx.arc(w2 / 2, 0, h2 * 0.16, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = "rgba(20,8,46,0.45)";
      ctx.lineWidth = Math.max(1, h2 * 0.03);
      ctx.setLineDash([h2 * 0.08, h2 * 0.08]);
      ctx.beginPath();
      ctx.moveTo(w2 * 0.22, -h2 / 2 + h2 * 0.1);
      ctx.lineTo(w2 * 0.22, h2 / 2 - h2 * 0.1);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "rgba(20,8,46,0.5)";
      ctx.fillRect(-w2 * 0.36, -h2 * 0.12, w2 * 0.42, h2 * 0.08);
      ctx.fillRect(-w2 * 0.36, h2 * 0.06, w2 * 0.28, h2 * 0.08);
      ctx.restore();
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      T2.sort(function(a3, b2) {
        return b2.z - a3.z;
      });
      for (var i3 = 0; i3 < T2.length; i3++) {
        var t3 = T2[i3];
        t3.z -= t3.vz;
        t3.r += t3.vr;
        if (t3.z < -80) reset(t3, true);
        var s2 = F / (F + t3.z), px = W / 2 + (t3.x * W * 0.9 + mx * 40) * s2, py = H / 2 + (t3.y * H * 0.9 + my * 30) * s2;
        var a2 = Math.max(0, Math.min(0.55, s2 * 0.75)) * (t3.z < 60 ? Math.max(0, (t3.z + 80) / 140) : 1);
        if (a2 <= 0.01) continue;
        ticket(px, py, t3.w * s2, t3.w * 0.45 * s2, t3.r, a2, t3.c);
      }
      if (on2) raf = requestAnimationFrame(frame);
    }
    size();
    window.addEventListener("resize", size);
    if (hasHover) window.addEventListener("mousemove", function(e2) {
      mx = (e2.clientX / window.innerWidth - 0.5) * 2;
      my = (e2.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    if ("IntersectionObserver" in window) new IntersectionObserver(function(es) {
      es.forEach(function(e2) {
        on2 = e2.isIntersecting && !document.hidden;
        if (on2) {
          cancelAnimationFrame(raf);
          frame();
        }
      });
    }).observe(cv);
    else {
      on2 = true;
      frame();
    }
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) on2 = false;
      else if (!on2) {
        on2 = true;
        frame();
      }
    });
  })();
  (function kinetic() {
    var ITEMS = ["GLI Certified", "200+ Operators", compact(opts.tickets) + " Tickets / 30d", "Live in 1–2 Weeks", "VCOC Signatory", "5+ Years", "Nine Games", "One Onboarding Call", compact(opts.orders) + " Orders / 30d", "Pen Tested"];
    function build(id, offset) {
      var el = $2(id);
      if (!el) return;
      var html = "";
      for (var k = 0; k < 2; k++) ITEMS.forEach(function(t3, i2) {
        var f2 = (i2 + offset) % 2 === 0;
        html += "<span>" + (f2 ? "<b>" + t3 + "</b>" : t3) + "<i></i></span>";
      });
      el.innerHTML = html;
    }
    build("#k-track", 0);
    build("#k-track2", 1);
  })();
  (function theatre() {
    var th = $2("#theatre");
    if (!th) return;
    var tum = $2("#tumblers"), status = $2("#th-status"), winner = $2("#th-winner"), hashEl = $2("#th-hash"), conf = $2("#th-confetti"), btn = $2("#th-draw");
    var DIGITS = "04182", FULL = "a3f9b2c4d17e8f0a5b6c9d2e4f1a7b3c8d5e2f9a0b4c6d1e7f3a9b5c2d8e4f1c", busy = false, timers = [];
    var strip = "";
    for (var r2 = 0; r2 < 3; r2++) for (var d2 = 0; d2 < 10; d2++) strip += "<i>" + d2 + "</i>";
    tum.innerHTML = DIGITS.split("").map(function() {
      return '<div class="tumbler"><div class="strip">' + strip + "</div></div>";
    }).join("");
    var tumblers = $$(".tumbler", tum), blocks = $$(".chain .blk", th), links = $$(".chain > i", th);
    function later(fn, ms) {
      timers.push(setTimeout(fn, RM ? 0 : ms));
    }
    function setStrip(t3, idx, animate, dur) {
      var s2 = $2(".strip", t3);
      s2.style.transition = animate ? "transform " + dur + "ms cubic-bezier(.15,.85,.25,1)" : "none";
      s2.style.transform = "translateY(" + -idx * 100 / 30 + "%)";
    }
    function burst() {
      if (RM) return;
      var cols = ["#f4a558", "#ec8a82", "#d97aa8", "#b297db", "#5b7fc4", "#4fd18b"], html = "";
      for (var i2 = 0; i2 < 70; i2++) {
        var a2 = Math.random() * Math.PI * 2, d3 = 120 + Math.random() * 260;
        html += '<i style="background:' + cols[i2 % 6] + ";--dx:" + (Math.cos(a2) * d3).toFixed(0) + "px;--dy:" + (Math.sin(a2) * d3 - 80).toFixed(0) + "px;--r:" + (Math.random() * 720 - 360).toFixed(0) + "deg;animation-delay:" + (Math.random() * 150).toFixed(0) + 'ms"></i>';
      }
      conf.innerHTML = html;
      conf.classList.remove("go");
      void conf.offsetWidth;
      conf.classList.add("go");
    }
    function reset() {
      timers.forEach(clearTimeout);
      timers = [];
      tumblers.forEach(function(t3) {
        t3.classList.remove("lock");
        setStrip(t3, 0, false, 0);
      });
      winner.classList.remove("on");
      hashEl.textContent = "sha256: …";
      blocks.forEach(function(b2) {
        b2.classList.remove("lit");
      });
      links.forEach(function(l2) {
        l2.classList.remove("lit");
      });
      status.innerHTML = '<i class="dot green"></i>GLI RNG ready';
      status.className = "tag green";
    }
    function run() {
      if (busy) return;
      busy = true;
      reset();
      btn.disabled = true;
      status.innerHTML = '<i class="dot"></i>Seeding GLI RNG…';
      status.className = "tag";
      tumblers.forEach(function(t3, i2) {
        var target = +DIGITS[i2] + 20;
        later(function() {
          setStrip(t3, target, !RM, 1500 + i2 * 380);
        }, 200);
        later(function() {
          t3.classList.add("lock");
        }, 200 + 1500 + i2 * 380);
      });
      var end = 200 + 1500 + (tumblers.length - 1) * 380 + 150;
      later(function() {
        status.innerHTML = '<i class="dot green"></i>Winner drawn · ticket #4,182';
        status.className = "tag green";
        burst();
        winner.classList.add("on");
      }, end);
      later(function() {
        var i2 = 0;
        (function type() {
          if (i2 <= FULL.length) {
            hashEl.textContent = "sha256: " + FULL.slice(0, i2);
            i2 += 3;
            timers.push(setTimeout(type, RM ? 0 : 18));
          }
        })();
      }, end + 500);
      blocks.forEach(function(b2, k) {
        later(function() {
          b2.classList.add("lit");
          if (links[k]) links[k].classList.add("lit");
        }, end + 900 + k * 260);
      });
      later(function() {
        busy = false;
        btn.disabled = false;
        btn.textContent = "Run it again";
      }, end + 900 + blocks.length * 260 + 400);
      window.ceTrack("draws_demo_run");
    }
    btn.addEventListener("click", run);
    once(th, function() {
      later(run, 500);
    }, { threshold: 0.45 });
    $2("#th-verify-toggle").addEventListener("click", function() {
      var w2 = $2("#verify-wrap"), open = w2.hidden;
      w2.hidden = !open;
      this.setAttribute("aria-expanded", open ? "true" : "false");
      this.textContent = open ? "Hide the verifier" : "Verify a real draw yourself";
      if (open) setTimeout(function() {
        w2.scrollIntoView({ behavior: RM ? "auto" : "smooth", block: "start" });
      }, 50);
    });
  })();
  (function() {
    var g2 = $2("#gauge");
    if (g2) once(g2, function(el) {
      el.classList.add("in");
    }, { threshold: 0.5 });
  })();
  (function adminDemo() {
    var box = $2("#admin");
    if (!box) return;
    var cur = $2("#ad-cursor"), steps = $$(".ad-steps span", box), title = $2("#ad-title"), price = $2("#ad-price"), qty = $2("#ad-qty"), tog = $2("#ad-toggle"), prize = $2("#ad-prize"), pub = $2("#ad-publish"), live = $2("#ad-live"), conf = $2("#ad-confetti");
    var timers = [], running = false, visible2 = false, loopT;
    function later(fn, ms) {
      timers.push(setTimeout(fn, RM ? 0 : ms));
    }
    function moveTo(el, dx, dy) {
      var b2 = box.getBoundingClientRect(), r2 = el.getBoundingClientRect();
      cur.style.transform = "translate(" + (r2.left - b2.left + (dx || r2.width / 2)) + "px," + (r2.top - b2.top + (dy || r2.height / 2)) + "px)";
    }
    function click2() {
      cur.classList.remove("click");
      void cur.offsetWidth;
      cur.classList.add("click");
    }
    function type(el, text, t0, cb) {
      el.classList.add("typing");
      el.textContent = "";
      text.split("").forEach(function(ch, i2) {
        later(function() {
          el.textContent += ch;
        }, t0 + i2 * 45);
      });
      later(function() {
        el.classList.remove("typing");
      }, t0 + text.length * 45 + 200);
    }
    function step(n2) {
      steps.forEach(function(s2, i2) {
        s2.classList.toggle("on", i2 === n2);
        s2.classList.toggle("done", i2 < n2);
      });
    }
    function burst() {
      if (RM) return;
      var cols = ["#f4a558", "#ec8a82", "#d97aa8", "#b297db", "#5b7fc4", "#4fd18b"], html = "";
      for (var i2 = 0; i2 < 40; i2++) {
        var a2 = Math.random() * Math.PI * 2, d2 = 80 + Math.random() * 160;
        html += '<i style="background:' + cols[i2 % 6] + ";--dx:" + (Math.cos(a2) * d2).toFixed(0) + "px;--dy:" + (Math.sin(a2) * d2 - 60).toFixed(0) + "px;--r:" + (Math.random() * 720 - 360).toFixed(0) + "deg;animation-delay:" + (Math.random() * 120).toFixed(0) + 'ms"></i>';
      }
      conf.innerHTML = html;
      conf.classList.remove("go");
      void conf.offsetWidth;
      conf.classList.add("go");
    }
    function reset() {
      timers.forEach(clearTimeout);
      timers = [];
      step(0);
      [title, price, qty].forEach(function(e2) {
        e2.textContent = "";
        e2.classList.remove("typing");
      });
      tog.classList.remove("on");
      prize.classList.remove("on");
      live.classList.remove("on");
      pub.classList.remove("pressed");
      cur.classList.remove("on");
    }
    function run() {
      if (running) return;
      running = true;
      reset();
      if (RM) {
        title.textContent = "BMW M3 Competition Pack";
        price.textContent = "£2.99";
        qty.textContent = "75,000";
        tog.classList.add("on");
        prize.classList.add("on");
        live.classList.add("on");
        step(2);
        running = false;
        return;
      }
      later(function() {
        cur.classList.add("on");
        moveTo(title, 24, 20);
      }, 100);
      later(function() {
        click2();
      }, 800);
      type(title, "BMW M3 Competition Pack", 950);
      later(function() {
        moveTo(price, 24, 20);
      }, 2300);
      later(function() {
        click2();
      }, 2900);
      type(price, "£2.99", 3e3);
      later(function() {
        moveTo(qty, 24, 20);
      }, 3500);
      later(function() {
        click2();
      }, 4100);
      type(qty, "75,000", 4200);
      later(function() {
        step(1);
        moveTo(tog, 19, 11);
      }, 4800);
      later(function() {
        click2();
        tog.classList.add("on");
      }, 5400);
      later(function() {
        moveTo(prize);
      }, 5800);
      later(function() {
        click2();
        prize.classList.add("on");
      }, 6400);
      later(function() {
        step(2);
        moveTo(pub);
      }, 6900);
      later(function() {
        click2();
        pub.classList.add("pressed");
      }, 7600);
      later(function() {
        pub.classList.remove("pressed");
        live.classList.add("on");
        burst();
        cur.classList.remove("on");
      }, 7900);
      later(function() {
        running = false;
        if (visible2) loopT = setTimeout(run, 4e3);
      }, 8400);
    }
    $2("#ad-replay").addEventListener("click", function() {
      clearTimeout(loopT);
      running = false;
      run();
    });
    if ("IntersectionObserver" in window) new IntersectionObserver(function(es) {
      es.forEach(function(e2) {
        visible2 = e2.isIntersecting;
        if (visible2 && !running) {
          clearTimeout(loopT);
          loopT = setTimeout(run, 400);
        }
        if (!visible2) clearTimeout(loopT);
      });
    }, { threshold: 0.4 }).observe(box);
    else run();
  })();
  return function destroy() {
    alive = false;
    cleanups.forEach(function(c2) {
      try {
        c2();
      } catch (e2) {
      }
    });
    document.body.style.overflow = "";
  };
}
const _sfc_main$8 = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    const orders = parseInt(getText("stats.value_orders", "1500000"), 10) || 15e5;
    const tickets = parseInt(getText("stats.value_tickets", "120000000"), 10) || 12e7;
    let destroyFx = null;
    onMounted(() => {
      destroyFx = initUltraHome({ orders, tickets });
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash.substring(1));
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    });
    onBeforeUnmount(() => {
      if (destroyFx) destroyFx();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Competition Engine - Ultimate Competition Platform</title><meta name="description" content="CompEngine — the UK competition platform. Game Studio, GLI-certified draws, separate wallets, compliant free entry. Book a 30-min demo." head-key="description"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Competition Engine - Ultimate Competition Platform"),
              createVNode("meta", {
                name: "description",
                content: "CompEngine — the UK competition platform. Game Studio, GLI-certified draws, separate wallets, compliant free entry. Book a 30-min demo.",
                "head-key": "description"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="ce-home" id="ce-home"><div class="haze" aria-hidden="true"></div><div class="progress" id="progress" aria-hidden="true"></div><svg width="0" height="0" style="${ssrRenderStyle({ "position": "absolute" })}" aria-hidden="true"><defs><linearGradient id="ce-gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b7fc4"></stop><stop offset=".25" stop-color="#8a5fb8"></stop><stop offset=".5" stop-color="#b297db"></stop><stop offset=".72" stop-color="#d97aa8"></stop><stop offset=".88" stop-color="#ec8a82"></stop><stop offset="1" stop-color="#f4a558"></stop></linearGradient><linearGradient id="ce-spark-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4a558" stop-opacity=".35"></stop><stop offset="1" stop-color="#f4a558" stop-opacity="0"></stop></linearGradient><linearGradient id="ce-chart-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4a558" stop-opacity=".28"></stop><stop offset="1" stop-color="#f4a558" stop-opacity="0"></stop></linearGradient></defs></svg><div class="page">`);
      _push(ssrRenderComponent(_sfc_main$x, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$w, {
        orders: unref(orders),
        tickets: unref(tickets)
      }, null, _parent));
      _push(ssrRenderComponent(UltraLogoWall, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$l, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$k, null, null, _parent));
      _push(ssrRenderComponent(UltraEasy, null, null, _parent));
      _push(ssrRenderComponent(UltraConvert, null, null, _parent));
      _push(ssrRenderComponent(UltraCertifiedDraws, null, null, _parent));
      _push(ssrRenderComponent(UltraWhyFee, null, null, _parent));
      _push(ssrRenderComponent(UltraComparison, null, null, _parent));
      _push(ssrRenderComponent(UltraRoadmap, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d, null, null, _parent));
      _push(ssrRenderComponent(UltraFaq, null, null, _parent));
      _push(ssrRenderComponent(UltraBooking, null, null, _parent));
      _push(ssrRenderComponent(UltraFooter, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(UltraSticky, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</button>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DangerButton.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const DangerButton = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$6 = {
  __name: "Modal",
  __ssrInlineRender: true,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: "2xl"
    },
    closeable: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const dialog = ref();
    const showSlot = ref(props.show);
    watch(
      () => props.show,
      () => {
        var _a;
        if (props.show) {
          document.body.style.overflow = "hidden";
          showSlot.value = true;
          (_a = dialog.value) == null ? void 0 : _a.showModal();
        } else {
          document.body.style.overflow = "";
          setTimeout(() => {
            var _a2;
            (_a2 = dialog.value) == null ? void 0 : _a2.close();
            showSlot.value = false;
          }, 200);
        }
      }
    );
    const close = () => {
      if (props.closeable) {
        emit("close");
      }
    };
    const closeOnEscape = (e2) => {
      if (e2.key === "Escape") {
        e2.preventDefault();
        if (props.show) {
          close();
        }
      }
    };
    onMounted(() => document.addEventListener("keydown", closeOnEscape));
    onUnmounted(() => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    });
    const maxWidthClass = computed(() => {
      return {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl"
      }[props.maxWidth];
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<dialog${ssrRenderAttrs(mergeProps({
        class: "z-50 m-0 min-h-full min-w-full overflow-y-auto bg-transparent backdrop:bg-transparent",
        ref_key: "dialog",
        ref: dialog
      }, _attrs))}><div class="fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0" scroll-region><div class="fixed inset-0 transform transition-all" style="${ssrRenderStyle(__props.show ? null : { display: "none" })}"><div class="absolute inset-0 bg-gray-500 opacity-75"></div></div><div class="${ssrRenderClass([maxWidthClass.value, "mb-6 transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:mx-auto sm:w-full"])}" style="${ssrRenderStyle(__props.show ? null : { display: "none" })}">`);
      if (showSlot.value) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></dialog>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "SecondaryButton",
  __ssrInlineRender: true,
  props: {
    type: {
      type: String,
      default: "button"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: "inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25"
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SecondaryButton.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "DeleteUserForm",
  __ssrInlineRender: true,
  setup(__props) {
    const confirmingUserDeletion = ref(false);
    const passwordInput = ref(null);
    const form = useForm({
      password: ""
    });
    const confirmUserDeletion = () => {
      confirmingUserDeletion.value = true;
      nextTick(() => passwordInput.value.focus());
    };
    const deleteUser = () => {
      form.delete(route("profile.destroy"), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset()
      });
    };
    const closeModal = () => {
      confirmingUserDeletion.value = false;
      form.clearErrors();
      form.reset();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><header><h2 class="text-lg font-medium text-gray-900"> Delete Account </h2><p class="mt-1 text-sm text-gray-600"> Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. </p></header>`);
      _push(ssrRenderComponent(DangerButton, { onClick: confirmUserDeletion }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Delete Account`);
          } else {
            return [
              createTextVNode("Delete Account")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$6, {
        show: confirmingUserDeletion.value,
        onClose: closeModal
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h2 class="text-lg font-medium text-gray-900"${_scopeId}> Are you sure you want to delete your account? </h2><p class="mt-1 text-sm text-gray-600"${_scopeId}> Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. </p><div class="mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$W, {
              for: "password",
              value: "Password",
              class: "sr-only"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              id: "password",
              ref_key: "passwordInput",
              ref: passwordInput,
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              type: "password",
              class: "mt-1 block w-3/4",
              placeholder: "Password",
              onKeyup: deleteUser
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$X, {
              message: unref(form).errors.password,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, { onClick: closeModal }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(DangerButton, {
              class: ["ms-3", { "opacity-25": unref(form).processing }],
              disabled: unref(form).processing,
              onClick: deleteUser
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Delete Account `);
                } else {
                  return [
                    createTextVNode(" Delete Account ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h2", { class: "text-lg font-medium text-gray-900" }, " Are you sure you want to delete your account? "),
                createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. "),
                createVNode("div", { class: "mt-6" }, [
                  createVNode(_sfc_main$W, {
                    for: "password",
                    value: "Password",
                    class: "sr-only"
                  }),
                  createVNode(_sfc_main$U, {
                    id: "password",
                    ref_key: "passwordInput",
                    ref: passwordInput,
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    class: "mt-1 block w-3/4",
                    placeholder: "Password",
                    onKeyup: withKeys(deleteUser, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$X, {
                    message: unref(form).errors.password,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$5, { onClick: closeModal }, {
                    default: withCtx(() => [
                      createTextVNode(" Cancel ")
                    ]),
                    _: 1
                  }),
                  createVNode(DangerButton, {
                    class: ["ms-3", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing,
                    onClick: deleteUser
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Delete Account ")
                    ]),
                    _: 1
                  }, 8, ["class", "disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DeleteUserForm.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = {
  __name: "UpdatePasswordForm",
  __ssrInlineRender: true,
  setup(__props) {
    const passwordInput = ref(null);
    const currentPasswordInput = ref(null);
    const form = useForm({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-medium text-gray-900"> Update Password </h2><p class="mt-1 text-sm text-gray-600"> Ensure your account is using a long, random password to stay secure. </p></header><form class="mt-6 space-y-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$W, {
        for: "current_password",
        value: "Current Password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$U, {
        id: "current_password",
        ref_key: "currentPasswordInput",
        ref: currentPasswordInput,
        modelValue: unref(form).current_password,
        "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
        type: "password",
        class: "mt-1 block w-full",
        autocomplete: "current-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$X, {
        message: unref(form).errors.current_password,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$W, {
        for: "password",
        value: "New Password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$U, {
        id: "password",
        ref_key: "passwordInput",
        ref: passwordInput,
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        type: "password",
        class: "mt-1 block w-full",
        autocomplete: "new-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$X, {
        message: unref(form).errors.password,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$W, {
        for: "password_confirmation",
        value: "Confirm Password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$U, {
        id: "password_confirmation",
        modelValue: unref(form).password_confirmation,
        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
        type: "password",
        class: "mt-1 block w-full",
        autocomplete: "new-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$X, {
        message: unref(form).errors.password_confirmation,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(PrimaryButton, {
        disabled: unref(form).processing
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Save`);
          } else {
            return [
              createTextVNode("Save")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(form).recentlySuccessful) {
        _push(`<p class="text-sm text-gray-600"> Saved. </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdatePasswordForm.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __vite_glob_0_20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "UpdateProfileInformationForm",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  setup(__props) {
    const user = usePage().props.auth.user;
    const form = useForm({
      name: user.name,
      email: user.email
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><header><h2 class="text-lg font-medium text-gray-900"> Profile Information </h2><p class="mt-1 text-sm text-gray-600"> Update your account&#39;s profile information and email address. </p></header><form class="mt-6 space-y-6"><div>`);
      _push(ssrRenderComponent(_sfc_main$W, {
        for: "name",
        value: "Name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$U, {
        id: "name",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(form).name,
        "onUpdate:modelValue": ($event) => unref(form).name = $event,
        required: "",
        autofocus: "",
        autocomplete: "name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$X, {
        class: "mt-2",
        message: unref(form).errors.name
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$W, {
        for: "email",
        value: "Email"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$U, {
        id: "email",
        type: "email",
        class: "mt-1 block w-full",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        required: "",
        autocomplete: "username"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$X, {
        class: "mt-2",
        message: unref(form).errors.email
      }, null, _parent));
      _push(`</div>`);
      if (__props.mustVerifyEmail && unref(user).email_verified_at === null) {
        _push(`<div><p class="mt-2 text-sm text-gray-800"> Your email address is unverified. `);
        _push(ssrRenderComponent(unref(Link), {
          href: _ctx.route("verification.send"),
          method: "post",
          as: "button",
          class: "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        }, {
          default: withCtx((_2, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Click here to re-send the verification email. `);
            } else {
              return [
                createTextVNode(" Click here to re-send the verification email. ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p><div class="mt-2 text-sm font-medium text-green-600" style="${ssrRenderStyle(__props.status === "verification-link-sent" ? null : { display: "none" })}"> A new verification link has been sent to your email address. </div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(PrimaryButton, {
        disabled: unref(form).processing
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Save`);
          } else {
            return [
              createTextVNode("Save")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(form).recentlySuccessful) {
        _push(`<p class="text-sm text-gray-600"> Saved. </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></form></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __vite_glob_0_21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    mustVerifyEmail: {
      type: Boolean
    },
    status: {
      type: String
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Profile" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$D, null, {
        header: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-xl font-semibold leading-tight text-gray-800"${_scopeId}> Profile </h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-xl font-semibold leading-tight text-gray-800" }, " Profile ")
            ];
          }
        }),
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8"${_scopeId}><div class="bg-white p-4 shadow sm:rounded-lg sm:p-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              "must-verify-email": __props.mustVerifyEmail,
              status: __props.status,
              class: "max-w-xl"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="bg-white p-4 shadow sm:rounded-lg sm:p-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { class: "max-w-xl" }, null, _parent2, _scopeId));
            _push2(`</div><div class="bg-white p-4 shadow sm:rounded-lg sm:p-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, { class: "max-w-xl" }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [
                    createVNode(_sfc_main$2, {
                      "must-verify-email": __props.mustVerifyEmail,
                      status: __props.status,
                      class: "max-w-xl"
                    }, null, 8, ["must-verify-email", "status"])
                  ]),
                  createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [
                    createVNode(_sfc_main$3, { class: "max-w-xl" })
                  ]),
                  createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [
                    createVNode(_sfc_main$4, { class: "max-w-xl" })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
function t() {
  return t = Object.assign ? Object.assign.bind() : function(t3) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var o2 = arguments[e2];
      for (var n2 in o2) ({}).hasOwnProperty.call(o2, n2) && (t3[n2] = o2[n2]);
    }
    return t3;
  }, t.apply(null, arguments);
}
const e = String.prototype.replace, o = /%20/g, n = { RFC1738: function(t3) {
  return e.call(t3, o, "+");
}, RFC3986: function(t3) {
  return String(t3);
} };
var r = "RFC3986";
const i = Object.prototype.hasOwnProperty, s = Array.isArray, u = (function() {
  const t3 = [];
  for (let e2 = 0; e2 < 256; ++e2) t3.push("%" + ((e2 < 16 ? "0" : "") + e2.toString(16)).toUpperCase());
  return t3;
})(), l = function t2(e2, o2, n2) {
  if (!o2) return e2;
  if ("object" != typeof o2) {
    if (s(e2)) e2.push(o2);
    else {
      if (!e2 || "object" != typeof e2) return [e2, o2];
      (n2 && (n2.plainObjects || n2.allowPrototypes) || !i.call(Object.prototype, o2)) && (e2[o2] = true);
    }
    return e2;
  }
  if (!e2 || "object" != typeof e2) return [e2].concat(o2);
  let r2 = e2;
  return s(e2) && !s(o2) && (r2 = (function(t3, e3) {
    const o3 = e3 && e3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
    for (let e4 = 0; e4 < t3.length; ++e4) void 0 !== t3[e4] && (o3[e4] = t3[e4]);
    return o3;
  })(e2, n2)), s(e2) && s(o2) ? (o2.forEach(function(o3, r3) {
    if (i.call(e2, r3)) {
      const i2 = e2[r3];
      i2 && "object" == typeof i2 && o3 && "object" == typeof o3 ? e2[r3] = t2(i2, o3, n2) : e2.push(o3);
    } else e2[r3] = o3;
  }), e2) : Object.keys(o2).reduce(function(e3, r3) {
    const s2 = o2[r3];
    return e3[r3] = i.call(e3, r3) ? t2(e3[r3], s2, n2) : s2, e3;
  }, r2);
}, c = 1024, a = function(t3, e2) {
  return [].concat(t3, e2);
}, f = function(t3, e2) {
  if (s(t3)) {
    const o2 = [];
    for (let n2 = 0; n2 < t3.length; n2 += 1) o2.push(e2(t3[n2]));
    return o2;
  }
  return e2(t3);
}, p = Object.prototype.hasOwnProperty, y = { brackets: function(t3) {
  return t3 + "[]";
}, comma: "comma", indices: function(t3, e2) {
  return t3 + "[" + e2 + "]";
}, repeat: function(t3) {
  return t3;
} }, d = Array.isArray, h = Array.prototype.push, b = function(t3, e2) {
  h.apply(t3, d(e2) ? e2 : [e2]);
}, m = Date.prototype.toISOString, g = { addQueryPrefix: false, allowDots: false, allowEmptyArrays: false, arrayFormat: "indices", charset: "utf-8", charsetSentinel: false, delimiter: "&", encode: true, encodeDotInKeys: false, encoder: function(t3, e2, o2, n2, r2) {
  if (0 === t3.length) return t3;
  let i2 = t3;
  if ("symbol" == typeof t3 ? i2 = Symbol.prototype.toString.call(t3) : "string" != typeof t3 && (i2 = String(t3)), "iso-8859-1" === o2) return escape(i2).replace(/%u[0-9a-f]{4}/gi, function(t4) {
    return "%26%23" + parseInt(t4.slice(2), 16) + "%3B";
  });
  let s2 = "";
  for (let t4 = 0; t4 < i2.length; t4 += c) {
    const e3 = i2.length >= c ? i2.slice(t4, t4 + c) : i2, o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      let n3 = e3.charCodeAt(t5);
      45 === n3 || 46 === n3 || 95 === n3 || 126 === n3 || n3 >= 48 && n3 <= 57 || n3 >= 65 && n3 <= 90 || n3 >= 97 && n3 <= 122 || "RFC1738" === r2 && (40 === n3 || 41 === n3) ? o3[o3.length] = e3.charAt(t5) : n3 < 128 ? o3[o3.length] = u[n3] : n3 < 2048 ? o3[o3.length] = u[192 | n3 >> 6] + u[128 | 63 & n3] : n3 < 55296 || n3 >= 57344 ? o3[o3.length] = u[224 | n3 >> 12] + u[128 | n3 >> 6 & 63] + u[128 | 63 & n3] : (t5 += 1, n3 = 65536 + ((1023 & n3) << 10 | 1023 & e3.charCodeAt(t5)), o3[o3.length] = u[240 | n3 >> 18] + u[128 | n3 >> 12 & 63] + u[128 | n3 >> 6 & 63] + u[128 | 63 & n3]);
    }
    s2 += o3.join("");
  }
  return s2;
}, encodeValuesOnly: false, format: r, formatter: n[r], indices: false, serializeDate: function(t3) {
  return m.call(t3);
}, skipNulls: false, strictNullHandling: false }, w = {}, v = function(t3, e2, o2, n2, r2, i2, s2, u2, l2, c2, a2, p2, y2, h2, m2, j2, $2, E2) {
  let O2 = t3, T2 = E2, R2 = 0, S2 = false;
  for (; void 0 !== (T2 = T2.get(w)) && !S2; ) {
    const e3 = T2.get(t3);
    if (R2 += 1, void 0 !== e3) {
      if (e3 === R2) throw new RangeError("Cyclic object value");
      S2 = true;
    }
    void 0 === T2.get(w) && (R2 = 0);
  }
  if ("function" == typeof c2 ? O2 = c2(e2, O2) : O2 instanceof Date ? O2 = y2(O2) : "comma" === o2 && d(O2) && (O2 = f(O2, function(t4) {
    return t4 instanceof Date ? y2(t4) : t4;
  })), null === O2) {
    if (i2) return l2 && !j2 ? l2(e2, g.encoder, $2, "key", h2) : e2;
    O2 = "";
  }
  if ("string" == typeof (I2 = O2) || "number" == typeof I2 || "boolean" == typeof I2 || "symbol" == typeof I2 || "bigint" == typeof I2 || (function(t4) {
    return !(!t4 || "object" != typeof t4 || !(t4.constructor && t4.constructor.isBuffer && t4.constructor.isBuffer(t4)));
  })(O2)) return l2 ? [m2(j2 ? e2 : l2(e2, g.encoder, $2, "key", h2)) + "=" + m2(l2(O2, g.encoder, $2, "value", h2))] : [m2(e2) + "=" + m2(String(O2))];
  var I2;
  const A2 = [];
  if (void 0 === O2) return A2;
  let D2;
  if ("comma" === o2 && d(O2)) j2 && l2 && (O2 = f(O2, l2)), D2 = [{ value: O2.length > 0 ? O2.join(",") || null : void 0 }];
  else if (d(c2)) D2 = c2;
  else {
    const t4 = Object.keys(O2);
    D2 = a2 ? t4.sort(a2) : t4;
  }
  const _2 = u2 ? e2.replace(/\./g, "%2E") : e2, k = n2 && d(O2) && 1 === O2.length ? _2 + "[]" : _2;
  if (r2 && d(O2) && 0 === O2.length) return k + "[]";
  for (let e3 = 0; e3 < D2.length; ++e3) {
    const f2 = D2[e3], g2 = "object" == typeof f2 && void 0 !== f2.value ? f2.value : O2[f2];
    if (s2 && null === g2) continue;
    const T3 = p2 && u2 ? f2.replace(/\./g, "%2E") : f2, S3 = d(O2) ? "function" == typeof o2 ? o2(k, T3) : k : k + (p2 ? "." + T3 : "[" + T3 + "]");
    E2.set(t3, R2);
    const I3 = /* @__PURE__ */ new WeakMap();
    I3.set(w, E2), b(A2, v(g2, S3, o2, n2, r2, i2, s2, u2, "comma" === o2 && j2 && d(O2) ? null : l2, c2, a2, p2, y2, h2, m2, j2, $2, I3));
  }
  return A2;
}, j = Object.prototype.hasOwnProperty, $ = Array.isArray, E = { allowDots: false, allowEmptyArrays: false, allowPrototypes: false, allowSparse: false, arrayLimit: 20, charset: "utf-8", charsetSentinel: false, comma: false, decodeDotInKeys: false, decoder: function(t3, e2, o2) {
  const n2 = t3.replace(/\+/g, " ");
  if ("iso-8859-1" === o2) return n2.replace(/%[0-9a-f]{2}/gi, unescape);
  try {
    return decodeURIComponent(n2);
  } catch (t4) {
    return n2;
  }
}, delimiter: "&", depth: 5, duplicates: "combine", ignoreQueryPrefix: false, interpretNumericEntities: false, parameterLimit: 1e3, parseArrays: true, plainObjects: false, strictNullHandling: false }, O = function(t3) {
  return t3.replace(/&#(\d+);/g, function(t4, e2) {
    return String.fromCharCode(parseInt(e2, 10));
  });
}, T = function(t3, e2) {
  return t3 && "string" == typeof t3 && e2.comma && t3.indexOf(",") > -1 ? t3.split(",") : t3;
}, R = function(t3, e2, o2, n2) {
  if (!t3) return;
  const r2 = o2.allowDots ? t3.replace(/\.([^.[]+)/g, "[$1]") : t3, i2 = /(\[[^[\]]*])/g;
  let s2 = o2.depth > 0 && /(\[[^[\]]*])/.exec(r2);
  const u2 = s2 ? r2.slice(0, s2.index) : r2, l2 = [];
  if (u2) {
    if (!o2.plainObjects && j.call(Object.prototype, u2) && !o2.allowPrototypes) return;
    l2.push(u2);
  }
  let c2 = 0;
  for (; o2.depth > 0 && null !== (s2 = i2.exec(r2)) && c2 < o2.depth; ) {
    if (c2 += 1, !o2.plainObjects && j.call(Object.prototype, s2[1].slice(1, -1)) && !o2.allowPrototypes) return;
    l2.push(s2[1]);
  }
  return s2 && l2.push("[" + r2.slice(s2.index) + "]"), (function(t4, e3, o3, n3) {
    let r3 = n3 ? e3 : T(e3, o3);
    for (let e4 = t4.length - 1; e4 >= 0; --e4) {
      let n4;
      const i3 = t4[e4];
      if ("[]" === i3 && o3.parseArrays) n4 = o3.allowEmptyArrays && "" === r3 ? [] : [].concat(r3);
      else {
        n4 = o3.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
        const t5 = "[" === i3.charAt(0) && "]" === i3.charAt(i3.length - 1) ? i3.slice(1, -1) : i3, e5 = o3.decodeDotInKeys ? t5.replace(/%2E/g, ".") : t5, s3 = parseInt(e5, 10);
        o3.parseArrays || "" !== e5 ? !isNaN(s3) && i3 !== e5 && String(s3) === e5 && s3 >= 0 && o3.parseArrays && s3 <= o3.arrayLimit ? (n4 = [], n4[s3] = r3) : "__proto__" !== e5 && (n4[e5] = r3) : n4 = { 0: r3 };
      }
      r3 = n4;
    }
    return r3;
  })(l2, e2, o2, n2);
};
function S(t3, e2) {
  const o2 = /* @__PURE__ */ (function(t4) {
    return E;
  })();
  if ("" === t3 || null == t3) return o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const n2 = "string" == typeof t3 ? (function(t4, e3) {
    const o3 = { __proto__: null }, n3 = (e3.ignoreQueryPrefix ? t4.replace(/^\?/, "") : t4).split(e3.delimiter, Infinity === e3.parameterLimit ? void 0 : e3.parameterLimit);
    let r3, i3 = -1, s2 = e3.charset;
    if (e3.charsetSentinel) for (r3 = 0; r3 < n3.length; ++r3) 0 === n3[r3].indexOf("utf8=") && ("utf8=%E2%9C%93" === n3[r3] ? s2 = "utf-8" : "utf8=%26%2310003%3B" === n3[r3] && (s2 = "iso-8859-1"), i3 = r3, r3 = n3.length);
    for (r3 = 0; r3 < n3.length; ++r3) {
      if (r3 === i3) continue;
      const t5 = n3[r3], u2 = t5.indexOf("]="), l2 = -1 === u2 ? t5.indexOf("=") : u2 + 1;
      let c2, p2;
      -1 === l2 ? (c2 = e3.decoder(t5, E.decoder, s2, "key"), p2 = e3.strictNullHandling ? null : "") : (c2 = e3.decoder(t5.slice(0, l2), E.decoder, s2, "key"), p2 = f(T(t5.slice(l2 + 1), e3), function(t6) {
        return e3.decoder(t6, E.decoder, s2, "value");
      })), p2 && e3.interpretNumericEntities && "iso-8859-1" === s2 && (p2 = O(p2)), t5.indexOf("[]=") > -1 && (p2 = $(p2) ? [p2] : p2);
      const y2 = j.call(o3, c2);
      y2 && "combine" === e3.duplicates ? o3[c2] = a(o3[c2], p2) : y2 && "last" !== e3.duplicates || (o3[c2] = p2);
    }
    return o3;
  })(t3, o2) : t3;
  let r2 = o2.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  const i2 = Object.keys(n2);
  for (let e3 = 0; e3 < i2.length; ++e3) {
    const s2 = i2[e3], u2 = R(s2, n2[s2], o2, "string" == typeof t3);
    r2 = l(r2, u2, o2);
  }
  return true === o2.allowSparse ? r2 : (function(t4) {
    const e3 = [{ obj: { o: t4 }, prop: "o" }], o3 = [];
    for (let t5 = 0; t5 < e3.length; ++t5) {
      const n3 = e3[t5], r3 = n3.obj[n3.prop], i3 = Object.keys(r3);
      for (let t6 = 0; t6 < i3.length; ++t6) {
        const n4 = i3[t6], s2 = r3[n4];
        "object" == typeof s2 && null !== s2 && -1 === o3.indexOf(s2) && (e3.push({ obj: r3, prop: n4 }), o3.push(s2));
      }
    }
    return (function(t5) {
      for (; t5.length > 1; ) {
        const e4 = t5.pop(), o4 = e4.obj[e4.prop];
        if (s(o4)) {
          const t6 = [];
          for (let e5 = 0; e5 < o4.length; ++e5) void 0 !== o4[e5] && t6.push(o4[e5]);
          e4.obj[e4.prop] = t6;
        }
      }
    })(e3), t4;
  })(r2);
}
class I {
  constructor(t3, e2, o2) {
    var n2, r2;
    this.name = t3, this.definition = e2, this.bindings = null != (n2 = e2.bindings) ? n2 : {}, this.wheres = null != (r2 = e2.wheres) ? r2 : {}, this.config = o2;
  }
  get template() {
    const t3 = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, "");
    return "" === t3 ? "/" : t3;
  }
  get origin() {
    return this.config.absolute ? this.definition.domain ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ""}` : this.config.url : "";
  }
  get parameterSegments() {
    var t3, e2;
    return null != (t3 = null == (e2 = this.template.match(/{[^}?]+\??}/g)) ? void 0 : e2.map((t4) => ({ name: t4.replace(/{|\??}/g, ""), required: !/\?}$/.test(t4) }))) ? t3 : [];
  }
  matchesUrl(t3) {
    var e2;
    if (!this.definition.methods.includes("GET")) return false;
    const o2 = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, (t4, e3, o3, n3) => {
      var r3;
      const i3 = `(?<${o3}>${(null == (r3 = this.wheres[o3]) ? void 0 : r3.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+"})`;
      return n3 ? `(${e3}${i3})?` : `${e3}${i3}`;
    }).replace(/^\w+:\/\//, ""), [n2, r2] = t3.replace(/^\w+:\/\//, "").split("?"), i2 = null != (e2 = new RegExp(`^${o2}/?$`).exec(n2)) ? e2 : new RegExp(`^${o2}/?$`).exec(decodeURI(n2));
    if (i2) {
      for (const t4 in i2.groups) i2.groups[t4] = "string" == typeof i2.groups[t4] ? decodeURIComponent(i2.groups[t4]) : i2.groups[t4];
      return { params: i2.groups, query: S(r2) };
    }
    return false;
  }
  compile(t3) {
    return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, (e2, o2, n2) => {
      var r2, i2;
      if (!n2 && [null, void 0].includes(t3[o2])) throw new Error(`Ziggy error: '${o2}' parameter is required for route '${this.name}'.`);
      if (this.wheres[o2] && !new RegExp(`^${n2 ? `(${this.wheres[o2]})?` : this.wheres[o2]}$`).test(null != (i2 = t3[o2]) ? i2 : "")) throw new Error(`Ziggy error: '${o2}' parameter '${t3[o2]}' does not match required format '${this.wheres[o2]}' for route '${this.name}'.`);
      return encodeURI(null != (r2 = t3[o2]) ? r2 : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24");
    }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template;
  }
}
class A extends String {
  constructor(e2, o2, n2 = true, r2) {
    if (super(), this.t = null != r2 ? r2 : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, !this.t && "undefined" != typeof document && document.getElementById("ziggy-routes-json") && (globalThis.Ziggy = JSON.parse(document.getElementById("ziggy-routes-json").textContent), this.t = globalThis.Ziggy), this.t = t({}, this.t, { absolute: n2 }), e2) {
      if (!this.t.routes[e2]) throw new Error(`Ziggy error: route '${e2}' is not in the route list.`);
      this.i = new I(e2, this.t.routes[e2], this.t), this.u = this.l(o2);
    }
  }
  toString() {
    const e2 = Object.keys(this.u).filter((t3) => !this.i.parameterSegments.some(({ name: e3 }) => e3 === t3)).filter((t3) => "_query" !== t3).reduce((e3, o2) => t({}, e3, { [o2]: this.u[o2] }), {});
    return this.i.compile(this.u) + (function(t3, e3) {
      let o2 = t3;
      const i2 = (function(t4) {
        if (!t4) return g;
        if (void 0 !== t4.allowEmptyArrays && "boolean" != typeof t4.allowEmptyArrays) throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        if (void 0 !== t4.encodeDotInKeys && "boolean" != typeof t4.encodeDotInKeys) throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
        if (null != t4.encoder && "function" != typeof t4.encoder) throw new TypeError("Encoder has to be a function.");
        const e4 = t4.charset || g.charset;
        if (void 0 !== t4.charset && "utf-8" !== t4.charset && "iso-8859-1" !== t4.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        let o3 = r;
        if (void 0 !== t4.format) {
          if (!p.call(n, t4.format)) throw new TypeError("Unknown format option provided.");
          o3 = t4.format;
        }
        const i3 = n[o3];
        let s3, u3 = g.filter;
        if (("function" == typeof t4.filter || d(t4.filter)) && (u3 = t4.filter), s3 = t4.arrayFormat in y ? t4.arrayFormat : "indices" in t4 ? t4.indices ? "indices" : "repeat" : g.arrayFormat, "commaRoundTrip" in t4 && "boolean" != typeof t4.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        return { addQueryPrefix: "boolean" == typeof t4.addQueryPrefix ? t4.addQueryPrefix : g.addQueryPrefix, allowDots: void 0 === t4.allowDots ? true === t4.encodeDotInKeys || g.allowDots : !!t4.allowDots, allowEmptyArrays: "boolean" == typeof t4.allowEmptyArrays ? !!t4.allowEmptyArrays : g.allowEmptyArrays, arrayFormat: s3, charset: e4, charsetSentinel: "boolean" == typeof t4.charsetSentinel ? t4.charsetSentinel : g.charsetSentinel, commaRoundTrip: t4.commaRoundTrip, delimiter: void 0 === t4.delimiter ? g.delimiter : t4.delimiter, encode: "boolean" == typeof t4.encode ? t4.encode : g.encode, encodeDotInKeys: "boolean" == typeof t4.encodeDotInKeys ? t4.encodeDotInKeys : g.encodeDotInKeys, encoder: "function" == typeof t4.encoder ? t4.encoder : g.encoder, encodeValuesOnly: "boolean" == typeof t4.encodeValuesOnly ? t4.encodeValuesOnly : g.encodeValuesOnly, filter: u3, format: o3, formatter: i3, serializeDate: "function" == typeof t4.serializeDate ? t4.serializeDate : g.serializeDate, skipNulls: "boolean" == typeof t4.skipNulls ? t4.skipNulls : g.skipNulls, sort: "function" == typeof t4.sort ? t4.sort : null, strictNullHandling: "boolean" == typeof t4.strictNullHandling ? t4.strictNullHandling : g.strictNullHandling };
      })(e3);
      let s2, u2;
      "function" == typeof i2.filter ? (u2 = i2.filter, o2 = u2("", o2)) : d(i2.filter) && (u2 = i2.filter, s2 = u2);
      const l2 = [];
      if ("object" != typeof o2 || null === o2) return "";
      const c2 = y[i2.arrayFormat], a2 = "comma" === c2 && i2.commaRoundTrip;
      s2 || (s2 = Object.keys(o2)), i2.sort && s2.sort(i2.sort);
      const f2 = /* @__PURE__ */ new WeakMap();
      for (let t4 = 0; t4 < s2.length; ++t4) {
        const e4 = s2[t4];
        i2.skipNulls && null === o2[e4] || b(l2, v(o2[e4], e4, c2, a2, i2.allowEmptyArrays, i2.strictNullHandling, i2.skipNulls, i2.encodeDotInKeys, i2.encode ? i2.encoder : null, i2.filter, i2.sort, i2.allowDots, i2.serializeDate, i2.format, i2.formatter, i2.encodeValuesOnly, i2.charset, f2));
      }
      const h2 = l2.join(i2.delimiter);
      let m2 = true === i2.addQueryPrefix ? "?" : "";
      return i2.charsetSentinel && (m2 += "iso-8859-1" === i2.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), h2.length > 0 ? m2 + h2 : "";
    })(t({}, e2, this.u._query), { addQueryPrefix: true, arrayFormat: "indices", encodeValuesOnly: true, skipNulls: true, encoder: (t3, e3) => "boolean" == typeof t3 ? Number(t3) : e3(t3) });
  }
  p(e2) {
    e2 ? this.t.absolute && e2.startsWith("/") && (e2 = this.h().host + e2) : e2 = this.m();
    let o2 = {};
    const [n2, r2] = Object.entries(this.t.routes).find(([t3, n3]) => o2 = new I(t3, n3, this.t).matchesUrl(e2)) || [void 0, void 0];
    return t({ name: n2 }, o2, { route: r2 });
  }
  m() {
    const { host: t3, pathname: e2, search: o2 } = this.h();
    return (this.t.absolute ? t3 + e2 : e2.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + o2;
  }
  current(e2, o2) {
    const { name: n2, params: r2, query: i2, route: s2 } = this.p();
    if (!e2) return n2;
    const u2 = new RegExp(`^${e2.replace(/\./g, "\\.").replace(/\*/g, ".*")}$`).test(n2);
    if ([null, void 0].includes(o2) || !u2) return u2;
    const l2 = new I(n2, s2, this.t);
    o2 = this.l(o2, l2);
    const c2 = t({}, r2, i2);
    if (Object.values(o2).every((t3) => !t3) && !Object.values(c2).some((t3) => void 0 !== t3)) return true;
    const a2 = (t3, e3) => Object.entries(t3).every(([t4, o3]) => Array.isArray(o3) && Array.isArray(e3[t4]) ? o3.every((o4) => e3[t4].includes(o4) || e3[t4].includes(decodeURIComponent(o4))) : "object" == typeof o3 && "object" == typeof e3[t4] && null !== o3 && null !== e3[t4] ? a2(o3, e3[t4]) : e3[t4] == o3 || e3[t4] == decodeURIComponent(o3));
    return a2(o2, c2);
  }
  h() {
    var t3, e2, o2, n2, r2, i2;
    const { host: s2 = "", pathname: u2 = "", search: l2 = "" } = "undefined" != typeof window ? window.location : {};
    return { host: null != (t3 = null == (e2 = this.t.location) ? void 0 : e2.host) ? t3 : s2, pathname: null != (o2 = null == (n2 = this.t.location) ? void 0 : n2.pathname) ? o2 : u2, search: null != (r2 = null == (i2 = this.t.location) ? void 0 : i2.search) ? r2 : l2 };
  }
  get params() {
    const { params: e2, query: o2 } = this.p();
    return t({}, e2, o2);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t3) {
    return this.t.routes.hasOwnProperty(t3);
  }
  l(e2 = {}, o2 = this.i) {
    null != e2 || (e2 = {}), e2 = ["string", "number"].includes(typeof e2) ? [e2] : e2;
    const n2 = o2.parameterSegments.filter(({ name: t3 }) => !this.t.defaults[t3]);
    return Array.isArray(e2) ? e2 = e2.reduce((e3, o3, r2) => t({}, e3, n2[r2] ? { [n2[r2].name]: o3 } : "object" == typeof o3 ? o3 : { [o3]: "" }), {}) : 1 !== n2.length || e2[n2[0].name] || !e2.hasOwnProperty(Object.values(o2.bindings)[0]) && !e2.hasOwnProperty("id") || (e2 = { [n2[0].name]: e2 }), t({}, this.v(o2), this.j(e2, o2));
  }
  v(e2) {
    return e2.parameterSegments.filter(({ name: t3 }) => this.t.defaults[t3]).reduce((e3, { name: o2 }, n2) => t({}, e3, { [o2]: this.t.defaults[o2] }), {});
  }
  j(e2, { bindings: o2, parameterSegments: n2 }) {
    return Object.entries(e2).reduce((e3, [r2, i2]) => {
      if (!i2 || "object" != typeof i2 || Array.isArray(i2) || !n2.some(({ name: t3 }) => t3 === r2)) return t({}, e3, { [r2]: i2 });
      if (!i2.hasOwnProperty(o2[r2])) {
        if (!i2.hasOwnProperty("id")) throw new Error(`Ziggy error: object passed as '${r2}' parameter is missing route model binding key '${o2[r2]}'.`);
        o2[r2] = "id";
      }
      return t({}, e3, { [r2]: i2[o2[r2]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function D(t3, e2, o2, n2) {
  const r2 = new A(t3, e2, o2, n2);
  return t3 ? r2.toString() : r2;
}
const _ = { install(t3, e2) {
  const o2 = (t4, o3, n2, r2 = e2) => D(t4, o3, n2, r2);
  parseInt(t3.version) > 2 ? (t3.config.globalProperties.route = o2, t3.provide("route", o2)) : t3.mixin({ methods: { route: o2 } });
} };
const _sfc_main = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: { type: String, default: "default" },
    size: { type: String, default: "default" },
    type: { type: String, default: "button" },
    disabled: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const VARIANTS = {
      default: "bg-pink-600 text-white hover:bg-pink-500",
      secondary: "bg-white/10 text-white border border-white/15 hover:bg-white/20",
      outline: "border border-white/25 text-white hover:bg-white/10",
      ghost: "text-white hover:bg-white/10",
      destructive: "bg-red-600 text-white hover:bg-red-500",
      colourless: ""
    };
    const SIZES = { default: "h-10 px-4 py-2", sm: "h-9 px-3", lg: "h-11 px-8", icon: "h-10 w-10" };
    const classes = computed(() => [
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 disabled:pointer-events-none disabled:opacity-50",
      VARIANTS[props.variant] ?? VARIANTS.default,
      SIZES[props.size] ?? SIZES.default
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        disabled: __props.disabled,
        class: classes.value
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ui/Button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/About.vue": __vite_glob_0_0, "./Pages/Auth/ConfirmPassword.vue": __vite_glob_0_1, "./Pages/Auth/ForgotPassword.vue": __vite_glob_0_2, "./Pages/Auth/Login.vue": __vite_glob_0_3, "./Pages/Auth/Register.vue": __vite_glob_0_4, "./Pages/Auth/ResetPassword.vue": __vite_glob_0_5, "./Pages/Auth/VerifyEmail.vue": __vite_glob_0_6, "./Pages/Blog.vue": __vite_glob_0_7, "./Pages/BlogShow.vue": __vite_glob_0_8, "./Pages/Changelog.vue": __vite_glob_0_9, "./Pages/Changelog/Password.vue": __vite_glob_0_10, "./Pages/Contact.vue": __vite_glob_0_11, "./Pages/Dashboard.vue": __vite_glob_0_12, "./Pages/DevDocs/Password.vue": __vite_glob_0_13, "./Pages/DevDocs/Show.vue": __vite_glob_0_14, "./Pages/Documentation/Password.vue": __vite_glob_0_15, "./Pages/Documentation/Show.vue": __vite_glob_0_16, "./Pages/Home.vue": __vite_glob_0_17, "./Pages/Profile/Edit.vue": __vite_glob_0_18, "./Pages/Profile/Partials/DeleteUserForm.vue": __vite_glob_0_19, "./Pages/Profile/Partials/UpdatePasswordForm.vue": __vite_glob_0_20, "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": __vite_glob_0_21 });
      return pages[`./Pages/${name}.vue`];
    },
    setup({ App, props, plugin }) {
      const siteTextData = props.initialPage.props.siteTexts || {};
      const SiteTextPluginSSR = {
        install(app) {
          const getText = (key, fallback = "") => {
            var _a;
            const parts = key.split(".");
            if (parts.length >= 2) {
              return ((_a = siteTextData[parts[0]]) == null ? void 0 : _a[key]) || fallback;
            }
            return fallback;
          };
          app.config.globalProperties.$siteTexts = { data: siteTextData, loading: false, error: null };
          app.config.globalProperties.$getText = getText;
          app.provide("siteTexts", { data: siteTextData, loading: false, error: null });
          app.provide("getText", getText);
        }
      };
      return createSSRApp({
        render: () => h$1(App, props)
      }).use(plugin).use(_).component("UiButton", _sfc_main).use(SiteTextPluginSSR);
    }
  })
);
export {
  _export_sfc as _,
  gsapWithCSS as g
};
