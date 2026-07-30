import { ref, computed, mergeProps, useSSRContext, unref, onMounted, inject, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useModel, withModifiers, createCommentVNode, defineComponent, withDirectives, vModelText, onUnmounted, renderSlot, watch, nextTick, onBeforeUnmount, reactive, withKeys, createSSRApp, h as h$1 } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrGetDynamicModelProps, ssrLooseContain, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderTeleport, renderToString } from "vue/server-renderer";
import { usePage, Head, Link, useForm, router, createInertiaApp } from "@inertiajs/vue3";
import * as THREE from "three";
import axios from "axios";
import { Chart } from "chart.js/auto";
import "canvas-confetti";
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
const _sfc_main$_ = {
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
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "fixed top-0 left-0 right-0 z-50 glass-effect" }, _attrs))}><div class="w-full px-4 sm:px-6 py-4"><div class="flex items-center justify-between"><div class="flex items-center cursor-pointer group"><img src="/images/logo.png" alt="Competition Engine" class="h-[4.5rem] md:h-12"></div><nav class="hidden md:flex items-center justify-center space-x-8 absolute left-1/2 -translate-x-1/2"><a href="/" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Home</a><button class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Features</button><button class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Comparison</button><button class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Pricing</button><button class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">FAQ</button><a href="/about" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">About</a><a href="/blog" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Blog</a><a href="/contact" class="text-gray-300 hover:text-accent-purple transition whitespace-nowrap">Contact</a></nav><div class="flex justify-end items-center gap-3">`);
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
      _push(`<button class="hidden md:inline-block bg-accent-purple text-white font-semibold px-5 py-2 rounded-lg hover:bg-accent-orange transition glow-button whitespace-nowrap"> Book a Demo </button><button class="md:hidden relative w-10 h-10 flex items-center justify-center text-white focus:outline-none" aria-label="Toggle menu"><div class="w-6 flex flex-col items-center justify-center"><span class="${ssrRenderClass([mobileMenuOpen.value ? "rotate-45 translate-y-1" : "-translate-y-0.5", "bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm"])}"></span><span class="${ssrRenderClass([mobileMenuOpen.value ? "opacity-0" : "opacity-100", "bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5"])}"></span><span class="${ssrRenderClass([mobileMenuOpen.value ? "-rotate-45 -translate-y-1" : "translate-y-0.5", "bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm"])}"></span></div></button></div></div></div><div class="md:hidden glass-effect border-t border-gray-700" style="${ssrRenderStyle(mobileMenuOpen.value ? null : { display: "none" })}"><nav class="w-full px-4 py-4 space-y-1"><a href="/" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Home</a><button class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Features</button><button class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Comparison</button><button class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Pricing</button><button class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">FAQ</button><a href="/about" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">About</a><a href="/blog" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Blog</a><a href="/contact" class="block w-full text-left text-gray-300 hover:text-accent-purple transition py-2">Contact</a>`);
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
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Layout/Header.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$Z = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(_attrs)} data-v-5c10ff80><div class="for-entrants" data-v-5c10ff80><strong data-v-5c10ff80>Entering a competition powered by CompEngine?</strong> Every draw is GLI-certified. Every winner is verifiable. Every order runs through a UK-licensed payment gateway. Every site we power is signed up to the UK Voluntary Code of Good Practice for Prize Draw Operators. If something goes wrong, the operator has a real platform behind them — not a stack of plugins. </div><div data-v-5c10ff80>© ${ssrInterpolate(unref(year))} CompEngine. Built quietly in the UK.</div></footer>`);
    };
  }
};
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Layout/Footer.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-5c10ff80"]]);
const _sfc_main$Y = {
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
      _push(ssrRenderComponent(_sfc_main$_, null, null, _parent));
      _push(`<main data-v-6218a5cc>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AppLayout.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const AppLayout = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-6218a5cc"]]);
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
const _sfc_main$X = {
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
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/About.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const About = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-65ee555d"]]);
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: About
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$W = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    viewBox: "0 0 316 316",
    xmlns: "http://www.w3.org/2000/svg"
  }, _attrs))}><path d="M305.8 81.125C305.77 80.995 305.69 80.885 305.65 80.755C305.56 80.525 305.49 80.285 305.37 80.075C305.29 79.935 305.17 79.815 305.07 79.685C304.94 79.515 304.83 79.325 304.68 79.175C304.55 79.045 304.39 78.955 304.25 78.845C304.09 78.715 303.95 78.575 303.77 78.475L251.32 48.275C249.97 47.495 248.31 47.495 246.96 48.275L194.51 78.475C194.33 78.575 194.19 78.725 194.03 78.845C193.89 78.955 193.73 79.045 193.6 79.175C193.45 79.325 193.34 79.515 193.21 79.685C193.11 79.815 192.99 79.935 192.91 80.075C192.79 80.285 192.71 80.525 192.63 80.755C192.58 80.875 192.51 80.995 192.48 81.125C192.38 81.495 192.33 81.875 192.33 82.265V139.625L148.62 164.795V52.575C148.62 52.185 148.57 51.805 148.47 51.435C148.44 51.305 148.36 51.195 148.32 51.065C148.23 50.835 148.16 50.595 148.04 50.385C147.96 50.245 147.84 50.125 147.74 49.995C147.61 49.825 147.5 49.635 147.35 49.485C147.22 49.355 147.06 49.265 146.92 49.155C146.76 49.025 146.62 48.885 146.44 48.785L93.99 18.585C92.64 17.805 90.98 17.805 89.63 18.585L37.18 48.785C37 48.885 36.86 49.035 36.7 49.155C36.56 49.265 36.4 49.355 36.27 49.485C36.12 49.635 36.01 49.825 35.88 49.995C35.78 50.125 35.66 50.245 35.58 50.385C35.46 50.595 35.38 50.835 35.3 51.065C35.25 51.185 35.18 51.305 35.15 51.435C35.05 51.805 35 52.185 35 52.575V232.235C35 233.795 35.84 235.245 37.19 236.025L142.1 296.425C142.33 296.555 142.58 296.635 142.82 296.725C142.93 296.765 143.04 296.835 143.16 296.865C143.53 296.965 143.9 297.015 144.28 297.015C144.66 297.015 145.03 296.965 145.4 296.865C145.5 296.835 145.59 296.775 145.69 296.745C145.95 296.655 146.21 296.565 146.45 296.435L251.36 236.035C252.72 235.255 253.55 233.815 253.55 232.245V174.885L303.81 145.945C305.17 145.165 306 143.725 306 142.155V82.265C305.95 81.875 305.89 81.495 305.8 81.125ZM144.2 227.205L100.57 202.515L146.39 176.135L196.66 147.195L240.33 172.335L208.29 190.625L144.2 227.205ZM244.75 114.995V164.795L226.39 154.225L201.03 139.625V89.825L219.39 100.395L244.75 114.995ZM249.12 57.105L292.81 82.265L249.12 107.425L205.43 82.265L249.12 57.105ZM114.49 184.425L96.13 194.995V85.305L121.49 70.705L139.85 60.135V169.815L114.49 184.425ZM91.76 27.425L135.45 52.585L91.76 77.745L48.07 52.585L91.76 27.425ZM43.67 60.135L62.03 70.705L87.39 85.305V202.545V202.555V202.565C87.39 202.735 87.44 202.895 87.46 203.055C87.49 203.265 87.49 203.485 87.55 203.695V203.705C87.6 203.875 87.69 204.035 87.76 204.195C87.84 204.375 87.89 204.575 87.99 204.745C87.99 204.745 87.99 204.755 88 204.755C88.09 204.905 88.22 205.035 88.33 205.175C88.45 205.335 88.55 205.495 88.69 205.635L88.7 205.645C88.82 205.765 88.98 205.855 89.12 205.965C89.28 206.085 89.42 206.225 89.59 206.325C89.6 206.325 89.6 206.325 89.61 206.335C89.62 206.335 89.62 206.345 89.63 206.345L139.87 234.775V285.065L43.67 229.705V60.135ZM244.75 229.705L148.58 285.075V234.775L219.8 194.115L244.75 179.875V229.705ZM297.2 139.625L253.49 164.795V114.995L278.85 100.395L297.21 89.825V139.625H297.2Z"></path></svg>`);
}
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const ApplicationLogo = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$V = {
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
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const _sfc_main$U = {
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
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputError.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const _sfc_main$T = {
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
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/InputLabel.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const _sfc_main$S = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</button>`);
}
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/PrimaryButton.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const PrimaryButton = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$R = {
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
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/TextInput.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const _sfc_main$Q = {
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
      _push(ssrRenderComponent(_sfc_main$V, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Confirm Password" }, null, _parent2, _scopeId));
            _push2(`<div class="mb-4 text-sm text-gray-600"${_scopeId}> This is a secure area of the application. Please confirm your password before continuing. </div><form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password",
              autofocus: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
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
                  createVNode(_sfc_main$T, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$R, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password",
                    autofocus: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$U, {
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
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ConfirmPassword.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$Q
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$P = {
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
      _push(ssrRenderComponent(_sfc_main$V, _attrs, {
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
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
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
                  createVNode(_sfc_main$T, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$R, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$U, {
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
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ForgotPassword.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$P
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$O = {
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
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Checkbox.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const _sfc_main$N = {
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
      _push(ssrRenderComponent(_sfc_main$V, _attrs, {
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
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full text-gray-900",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              class: "mt-2",
              message: (_a = unref(form).errors) == null ? void 0 : _a.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full text-gray-900",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "current-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              class: "mt-2",
              message: (_b = unref(form).errors) == null ? void 0 : _b.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4 block"${_scopeId}><label class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$O, {
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
                  createVNode(_sfc_main$T, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$R, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full text-gray-900",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$U, {
                    class: "mt-2",
                    message: (_c = unref(form).errors) == null ? void 0 : _c.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$T, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$R, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full text-gray-900",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "current-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$U, {
                    class: "mt-2",
                    message: (_d = unref(form).errors) == null ? void 0 : _d.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4 block" }, [
                  createVNode("label", { class: "flex items-center" }, [
                    createVNode(_sfc_main$O, {
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
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$N
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$M = {
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
      _push(ssrRenderComponent(_sfc_main$V, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Register" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "name",
              value: "Name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              id: "name",
              type: "text",
              class: "mt-1 block w-full",
              modelValue: unref(form).name,
              "onUpdate:modelValue": ($event) => unref(form).name = $event,
              required: "",
              autofocus: "",
              autocomplete: "name"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              class: "mt-2",
              message: unref(form).errors.name
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
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
                  createVNode(_sfc_main$T, {
                    for: "name",
                    value: "Name"
                  }),
                  createVNode(_sfc_main$R, {
                    id: "name",
                    type: "text",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "name"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$U, {
                    class: "mt-2",
                    message: unref(form).errors.name
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$T, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$R, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$U, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$T, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$R, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$U, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$T, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  createVNode(_sfc_main$R, {
                    id: "password_confirmation",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$U, {
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
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$M
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$L = {
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
      _push(ssrRenderComponent(_sfc_main$V, _attrs, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Reset Password" }, null, _parent2, _scopeId));
            _push2(`<form${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "email",
              value: "Email"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              id: "email",
              type: "email",
              class: "mt-1 block w-full",
              modelValue: unref(form).email,
              "onUpdate:modelValue": ($event) => unref(form).email = $event,
              required: "",
              autofocus: "",
              autocomplete: "username"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              class: "mt-2",
              message: unref(form).errors.email
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "password",
              value: "Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              id: "password",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password,
              "onUpdate:modelValue": ($event) => unref(form).password = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
              class: "mt-2",
              message: unref(form).errors.password
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "password_confirmation",
              value: "Confirm Password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
              id: "password_confirmation",
              type: "password",
              class: "mt-1 block w-full",
              modelValue: unref(form).password_confirmation,
              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
              required: "",
              autocomplete: "new-password"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$U, {
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
                  createVNode(_sfc_main$T, {
                    for: "email",
                    value: "Email"
                  }),
                  createVNode(_sfc_main$R, {
                    id: "email",
                    type: "email",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    required: "",
                    autofocus: "",
                    autocomplete: "username"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$U, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$T, {
                    for: "password",
                    value: "Password"
                  }),
                  createVNode(_sfc_main$R, {
                    id: "password",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$U, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-4" }, [
                  createVNode(_sfc_main$T, {
                    for: "password_confirmation",
                    value: "Confirm Password"
                  }),
                  createVNode(_sfc_main$R, {
                    id: "password_confirmation",
                    type: "password",
                    class: "mt-1 block w-full",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    required: "",
                    autocomplete: "new-password"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_sfc_main$U, {
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
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/ResetPassword.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$L
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$K = {
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
      _push(ssrRenderComponent(_sfc_main$V, _attrs, {
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
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/VerifyEmail.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$K
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$J = {
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
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Blog.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const __vite_glob_0_7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$J
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$I = {
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
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/BlogShow.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const __vite_glob_0_8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$I
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$H = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Changelog.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const Changelog = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["__scopeId", "data-v-caebb0c0"]]);
const __vite_glob_0_9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Changelog
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$G = {
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
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Changelog/Password.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const __vite_glob_0_10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$G
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$F = {
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
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Contact.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const Contact = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-7e550bc2"]]);
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Contact
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$E = {
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
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Dropdown.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const _sfc_main$D = {
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
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DropdownLink.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const _sfc_main$C = {
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
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/NavLink.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const _sfc_main$B = {
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
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ResponsiveNavLink.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const _sfc_main$A = {
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
      _push(ssrRenderComponent(_sfc_main$C, {
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
      _push(ssrRenderComponent(_sfc_main$E, {
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
            _push2(ssrRenderComponent(_sfc_main$D, {
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
            _push2(ssrRenderComponent(_sfc_main$D, {
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
              createVNode(_sfc_main$D, {
                href: _ctx.route("profile.edit")
              }, {
                default: withCtx(() => [
                  createTextVNode(" Profile ")
                ]),
                _: 1
              }, 8, ["href"]),
              createVNode(_sfc_main$D, {
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
      _push(ssrRenderComponent(_sfc_main$B, {
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
        _push(ssrRenderComponent(_sfc_main$B, { href: "/admin" }, {
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
      _push(ssrRenderComponent(_sfc_main$B, {
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
      _push(ssrRenderComponent(_sfc_main$B, {
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
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const _sfc_main$z = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$A, null, {
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
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const __vite_glob_0_12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$z
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$y = {
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
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Documentation/Password.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const __vite_glob_0_13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$y
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$x = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    html: String,
    nav: Array,
    currentSlug: String,
    title: String,
    isAdmin: Boolean
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
      _push(`<p class="max-w-3xl" style="${ssrRenderStyle({ "padding-top": "0.3rem", "font-size": "0.75rem", "color": "#6b7280!important", "line-height": "1!important", "margin-bottom": "0!important" })}">Last updated: 11th June 2026</p></div><div class="relative flex-1 max-w-md mx-auto"><div class="relative"><svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"></path></svg><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search docs…" autocomplete="off" spellcheck="false" class="w-full pl-9 pr-14 py-1.5 rounded-md text-sm border border-white/10 bg-white/5 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"><kbd class="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] text-gray-500 border border-white/10 font-mono pointer-events-none"> ⌘K </kbd></div>`);
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
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Documentation/Show.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const __vite_glob_0_14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$x
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$w = {
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    const siteTexts = inject("siteTexts");
    const eyebrow = computed(() => getText("hero.eyebrow", "Proven. Certified. UK Voluntary Code Signatory."));
    const titleBefore = computed(() => getText("hero.title_before", "Don't Blend In."));
    const titleKeyword = computed(() => getText("hero.title_keyword", "Stand Out."));
    const subtitle = computed(() => getText("hero.subtitle", `The UK competition platform that's already survived <strong style="color:var(--text-0)">five years</strong> of draw nights. Powered by the only <strong style="color:var(--text-0)">Game Studio</strong> in the category. Built for operators who want to look nothing like the last raffle site you saw.`));
    const buttonPrimary = computed(() => getText("hero.button_primary", "Book a draw-night demo"));
    const buttonSecondary = computed(() => getText("hero.button_secondary", "Try Game Studio →"));
    const growthPromise = computed(() => getText("hero.growth_promise", "Operators on CompEngine grow revenue <strong>+47%</strong>&nbsp;on average in their first 90 days"));
    const ordersTarget = computed(() => parseInt(getText("stats.value_orders", "245000"), 10) || 0);
    const ticketsTarget = computed(() => parseInt(getText("stats.value_tickets", "13250000"), 10) || 0);
    const ordersDisplay = ref("0");
    const ticketsDisplay = ref("0");
    let countersStarted = false;
    function animateCount(displayRef, target, dur = 1600) {
      const start = performance.now();
      function tick(now) {
        const t3 = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t3, 3);
        displayRef.value = Math.round(target * eased).toLocaleString();
        if (t3 < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    function startCounters() {
      if (countersStarted) return;
      countersStarted = true;
      animateCount(ordersDisplay, ordersTarget.value);
      animateCount(ticketsDisplay, ticketsTarget.value);
    }
    onMounted(() => {
      if (!siteTexts.loading) {
        startCounters();
      }
    });
    watch(() => siteTexts.loading, (loading) => {
      if (!loading) {
        startCounters();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "hero",
        class: "hero"
      }, _attrs))}><svg class="hero-logo-big spin-slow" aria-hidden="true"><use href="#gear-logo"></use></svg><div class="eyebrow"><span class="dot"></span>${ssrInterpolate(eyebrow.value)}</div><h1 class="h1">${ssrInterpolate(titleBefore.value)} <span class="grad-text">${ssrInterpolate(titleKeyword.value)}</span></h1><p class="lead" style="${ssrRenderStyle({ "margin": "28px auto 0" })}">${subtitle.value ?? ""}</p><div class="hero-cta"><button class="btn btn-primary btn-large">${ssrInterpolate(buttonPrimary.value)}</button><a href="#game-studio" class="btn btn-ghost btn-large">${ssrInterpolate(buttonSecondary.value)}</a></div><div class="growth-promise"><span class="arr">↗</span><span>${growthPromise.value ?? ""}</span></div><div class="hero-mini-stats"><div class="mini-stat"><strong>${ssrInterpolate(ordersDisplay.value)}</strong> orders <span class="pill">last 30d</span></div><div class="mini-stat"><strong>${ssrInterpolate(ticketsDisplay.value)}</strong> tickets <span class="pill">last 30d</span></div><div class="mini-stat"><strong>5+ yrs</strong> operating</div></div><div class="trust-bar"><div class="trust-item" title="Gaming Laboratories International — certifies regulated casino systems in 480+ jurisdictions."><svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="#f4a558" stroke-width="1.5"><path d="M12 2L3 7v5c0 5.5 3.8 10.6 9 12 5.2-1.4 9-6.5 9-12V7l-9-5z"></path><path d="M9 12l2 2 4-4" stroke="#ec8a82"></path></svg><div class="trust-title">GLI Certified</div><div class="trust-sub">RNG independently verified</div></div><div class="trust-item" title="Penetration tested by an independent UK firm. Findings closed, re-tested on cycle."><svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="#f4a558" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg><div class="trust-title">Pen Tested</div><div class="trust-sub">By an independent firm</div></div><div class="trust-item" title="Signed up from day one to the UK Voluntary Code of Good Practice for Prize Draw Operators (20 May 2026)."><svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="#f4a558" stroke-width="1.5"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><div class="trust-title">VCOC Signatory</div><div class="trust-sub">UK Voluntary Code, May 2026</div></div><div class="trust-item" title="5+ years operating in the UK competition category — the most experienced independent platform."><svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="#f4a558" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg><div class="trust-title">5+ Years Live</div><div class="trust-sub">Longest-running indie platform</div></div></div><div class="scroll-hint"> The fun bit&#39;s below <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div></section>`);
    };
  }
};
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Hero/HeroSection.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = {
  __name: "LogoWall",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText");
    const eyebrowBefore = computed(() => getText("logowall.eyebrow_before", "Powering some of the UK's"));
    const eyebrowAccent = computed(() => getText("logowall.eyebrow_accent", "leading competition operators"));
    const footerText = computed(() => getText("logowall.footer_text", "more UK operators trust CompEngine with their draws"));
    const tenants = [
      { label: "S2A · Competitions" },
      { label: "Lust Raffles", emoji: "💋 ", cls: "bl-condensed" },
      { label: "AutoComps", cls: "bl-stack", color: "#FFD700" },
      { label: "Auwins", cls: "bl-mono", color: "#ff0000" },
      { label: "WestCoast", emoji: "🌊", color: "#eab308" },
      { label: "LuckyDucky", emoji: "🦆", color: "#FFDD00" },
      { label: "Lightning ⚡", cls: "bl-condensed", color: "#c8920a" },
      { label: "MsMoneyPenny", emoji: "💰", color: "#7c3aed" },
      { label: "Vortex", img: "/images/tenant-icons/vortexfavicon.png", color: "#793181", large: true, imgSize: 52, fontSize: "2.5em", height: "58px" },
      { label: "Jolly", img: "/images/tenant-icons/jolly.png", color: "#D4AF37" },
      { label: "MadMac", img: "/images/tenant-icons/madmac.png", color: "#FF00FF", alt: "UK" },
      { label: "Ritas", img: "/images/tenant-icons/ritas.png", color: "#D4AF37", cls: "bl-condensed", large: true },
      { label: "Winner Winner", emoji: "🏆 ", color: "#FF1F1F" },
      { label: "Prize Party", emoji: "🎊", cls: "bl-spaced", color: "#FF6B00" },
      { label: "Karma", emoji: "✨", color: "#D4AF37" },
      { label: "Deluxe Comps", emoji: "⭐", color: "#c9a227" },
      { label: "Luxsy Wins", emoji: "✨", cls: "bl-mono", color: "#ec4899" },
      { label: "WinThisNow", img: "/images/tenant-icons/winthisnow.png", color: "#0ea5e9" },
      { label: "Top Banana", emoji: "🍌", cls: "bl-serif" },
      { label: "Oche Prizes" },
      { label: "SmashDrop", cls: "bl-condensed" },
      { label: "Wrights", cls: "bl-serif" },
      { label: "SunnyGiveaways", emoji: "☀️", color: "#f59e0b" },
      { label: "House of Hope Comps", emoji: "🏠", cls: "bl-mono" },
      { label: "Vincere", emoji: "🏅", cls: "bl-spaced" },
      { label: "MPComps", color: "#0ea5e9" },
      { label: "Podium", emoji: "🏆", cls: "bl-rounded" },
      { label: "CrazyCat", cls: "bl-script" },
      { label: "Padel Comps" },
      { label: "Belter Competition", color: "#ffffff" },
      { label: "Prize Hunter Competitions", color: "#ffffff" }
    ];
    const shuffle3 = (arr) => {
      const a2 = [...arr];
      for (let i2 = a2.length - 1; i2 > 0; i2--) {
        const j2 = Math.floor(Math.random() * (i2 + 1));
        [a2[i2], a2[j2]] = [a2[j2], a2[i2]];
      }
      return a2;
    };
    const tenantsRow1 = shuffle3(tenants);
    const tenantsRow2 = shuffle3(tenants);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "logo-wall",
        id: "logo-wall"
      }, _attrs))}><div class="logo-wall-eyebrow">${ssrInterpolate(eyebrowBefore.value)} <span class="accent">${ssrInterpolate(eyebrowAccent.value)}</span><span class="live-pill">Live</span></div><div class="logo-rail"><div class="logo-track"><!--[-->`);
      ssrRenderList(2, (n2) => {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(unref(tenantsRow1), (tenant, i2) => {
          _push(`<div class="${ssrRenderClass([tenant.cls, "brand-logo"])}" style="${ssrRenderStyle({ color: tenant.color, fontSize: tenant.fontSize || (tenant.large ? "2em" : void 0), gap: tenant.img ? "7px" : void 0, height: tenant.height || void 0 })}">`);
          if (tenant.img) {
            _push(`<img${ssrRenderAttr("src", tenant.img)}${ssrRenderAttr("width", tenant.imgSize || 40)}${ssrRenderAttr("height", tenant.imgSize || 40)}${ssrRenderAttr("alt", tenant.label)}>`);
          } else if (tenant.emoji) {
            _push(`<!--[-->${ssrInterpolate(tenant.emoji)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`${ssrInterpolate(tenant.label)}`);
          if (tenant.alt) {
            _push(`<span class="alt">${ssrInterpolate(tenant.alt)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]--></div></div><div class="logo-rail reverse"><div class="logo-track"><!--[-->`);
      ssrRenderList(2, (n2) => {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(unref(tenantsRow2), (tenant, i2) => {
          _push(`<div class="${ssrRenderClass([tenant.cls, "brand-logo"])}" style="${ssrRenderStyle({ color: tenant.color, fontSize: tenant.fontSize || (tenant.large ? "2em" : void 0), gap: tenant.img ? "7px" : void 0, height: tenant.height || void 0 })}">`);
          if (tenant.img) {
            _push(`<img${ssrRenderAttr("src", tenant.img)}${ssrRenderAttr("width", tenant.imgSize || 40)}${ssrRenderAttr("height", tenant.imgSize || 40)}${ssrRenderAttr("alt", tenant.label)}>`);
          } else if (tenant.emoji) {
            _push(`<!--[-->${ssrInterpolate(tenant.emoji)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`${ssrInterpolate(tenant.label)}`);
          if (tenant.alt) {
            _push(`<span class="alt">${ssrInterpolate(tenant.alt)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--><!--]-->`);
      });
      _push(`<!--]--></div></div><div style="${ssrRenderStyle({ "text-align": "center", "margin-top": "22px", "font-size": "12px", "color": "var(--text-3)", "letter-spacing": "0.08em" })}"><span style="${ssrRenderStyle({ "color": "var(--orange)", "font-weight": "700" })}">+ 200</span>  ${ssrInterpolate(footerText.value)}</div></section>`);
    };
  }
};
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/LogoWall/LogoWall.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
function useReveal() {
  const sectionRef = ref(null);
  const revealed = ref(false);
  let observer = null;
  onMounted(() => {
    if (!sectionRef.value) return;
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealed.value = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(sectionRef.value);
  });
  onUnmounted(() => {
    if (observer) observer.disconnect();
  });
  return { sectionRef, revealed };
}
const _sfc_main$u = {
  __name: "StatsSection",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    const { sectionRef, revealed } = useReveal();
    const eyebrow = computed(() => getText("stats.eyebrow", "Trusted by the operators who chose proven over promised"));
    const titleBefore = computed(() => getText("stats.title_before", "The numbers that other platforms"));
    const titleKeyword = computed(() => getText("stats.title_keyword", "don't publish."));
    const lead = computed(() => getText("stats.lead", "Every stat below is real, rolling-30-day data from operators running on CompEngine right now. Click any segment of the chart to drill into where your revenue actually flows."));
    const blockTitle = computed(() => getText("stats.block_title", "A real Tuesday on CompEngine"));
    const blockSubtitle = computed(() => getText("stats.block_subtitle", "Not a load test. Not a sales deck. Just a 30-day rolling snapshot."));
    const ordersTarget = computed(() => parseInt(getText("stats.value_orders", "245000"), 10) || 0);
    const ticketsTarget = computed(() => parseInt(getText("stats.value_tickets", "13250000"), 10) || 0);
    const ordersDisplay = ref("0");
    const ticketsDisplay = ref("0");
    let countersStarted = false;
    function animateCount(displayRef, target, dur = 1600) {
      const start = performance.now();
      function tick(now) {
        const t3 = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t3, 3);
        displayRef.value = Math.round(target * eased).toLocaleString();
        if (t3 < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    function startCounters() {
      if (countersStarted) return;
      countersStarted = true;
      animateCount(ordersDisplay, ordersTarget.value);
      animateCount(ticketsDisplay, ticketsTarget.value);
    }
    watch(revealed, (isRevealed) => {
      if (isRevealed) startCounters();
    });
    const pieCanvas = ref(null);
    let pieChart = null;
    const activeKey = ref(null);
    const lureOn = ref(true);
    const REVENUE = computed(() => [
      { key: "card", label: getText("stats.pie_card_label", "Card payments"), value: parseInt(getText("stats.pie_card_value", "980000"), 10), color: "#f4a558", detail: getText("stats.pie_card_detail", "69% of GMV — 3DS-authenticated, full chargeback evidence pack on every order.") },
      { key: "wallet", label: getText("stats.pie_wallet_label", "Cash Wallet"), value: parseInt(getText("stats.pie_wallet_value", "285000"), 10), color: "#d97aa8", detail: getText("stats.pie_wallet_detail", "20% of GMV — withdrawable funds, kept separate from credit by design.") },
      { key: "credit", label: getText("stats.pie_credit_label", "Site Credit"), value: parseInt(getText("stats.pie_credit_value", "110000"), 10), color: "#b297db", detail: getText("stats.pie_credit_detail", "8% of GMV — promo, referral and prize credit. Non-withdrawable, never lumped with cash.") },
      { key: "free", label: getText("stats.pie_free_label", "Free Entry"), value: parseInt(getText("stats.pie_free_value", "45000"), 10), color: "#5b7fc4", detail: getText("stats.pie_free_detail", "3% of entries — fully compliant, automated tracking, no manual handling.") }
    ]);
    const total = computed(() => REVENUE.value.reduce((s2, r2) => s2 + r2.value, 0));
    function fmtMoney(v2) {
      if (v2 >= 1e6) return "£" + (v2 / 1e6).toFixed(2) + "M";
      if (v2 >= 1e3) return "£" + Math.round(v2 / 1e3) + "k";
      return "£" + v2.toLocaleString();
    }
    const pieCenterValue = computed(() => {
      const r2 = REVENUE.value.find((x) => x.key === activeKey.value);
      return r2 ? fmtMoney(r2.value) : fmtMoney(total.value);
    });
    const pieCenterLabel = computed(() => {
      const r2 = REVENUE.value.find((x) => x.key === activeKey.value);
      return r2 ? r2.label.toUpperCase() : "Total Processed";
    });
    const pieDesc = computed(() => {
      const r2 = REVENUE.value.find((x) => x.key === activeKey.value);
      return r2 ? r2.detail : getText("stats.pie_desc_default", "Where the money actually goes. Click a segment to see the operator-side breakdown.");
    });
    function setActiveLegend(key) {
      activeKey.value = key;
      lureOn.value = false;
    }
    function buildChart() {
      if (!pieCanvas.value) return;
      if (pieChart) pieChart.destroy();
      pieChart = new Chart(pieCanvas.value, {
        type: "doughnut",
        data: {
          labels: REVENUE.value.map((r2) => r2.label),
          datasets: [{
            data: REVENUE.value.map((r2) => r2.value),
            backgroundColor: REVENUE.value.map((r2) => r2.color),
            borderColor: "#1d1042",
            borderWidth: 3,
            hoverOffset: 14,
            hoverBorderColor: "#1d1042"
          }]
        },
        options: {
          cutout: "64%",
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#1d1042",
              borderColor: "#f4a558",
              borderWidth: 1,
              callbacks: { label: (ctx) => `${ctx.label}: £${ctx.parsed.toLocaleString()} (${Math.round(ctx.parsed / total.value * 100)}%)` }
            }
          },
          onClick: (evt, els) => {
            setActiveLegend(els.length ? REVENUE.value[els[0].index].key : activeKey.value);
          },
          onHover: (evt, els) => {
            evt.native.target.style.cursor = els.length ? "pointer" : "default";
          }
        }
      });
    }
    onMounted(async () => {
      await nextTick();
      buildChart();
    });
    onUnmounted(() => {
      if (pieChart) pieChart.destroy();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        class: ["section reveal", { visible: unref(revealed) }],
        id: "stats"
      }, _attrs))}><div class="center" style="${ssrRenderStyle({ "margin-bottom": "36px" })}"><div class="eyebrow"><span class="dot"></span>${ssrInterpolate(eyebrow.value)}</div><h2 class="h2">${ssrInterpolate(titleBefore.value)} <span class="grad-text">${ssrInterpolate(titleKeyword.value)}</span></h2><p class="lead center" style="${ssrRenderStyle({ "margin": "18px auto 0" })}">${ssrInterpolate(lead.value)}</p></div><div class="stats-block"><div><h3 class="h3">${ssrInterpolate(blockTitle.value)}</h3><p style="${ssrRenderStyle({ "color": "var(--text-2)", "margin-top": "8px", "font-size": "15px" })}">${ssrInterpolate(blockSubtitle.value)}</p><div class="big-stats"><div class="big-stat highlight"><div class="num">${ssrInterpolate(ordersDisplay.value)}</div><div class="label">Orders processed</div></div><div class="big-stat highlight"><div class="num">${ssrInterpolate(ticketsDisplay.value)}</div><div class="label">Tickets sold</div></div><div class="big-stat"><div class="num">5<small style="${ssrRenderStyle({ "font-size": "24px" })}">+ yrs</small></div><div class="label">In this exact category</div></div></div></div><div class="pie-card"><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "justify-content": "space-between", "flex-wrap": "wrap", "gap": "8px", "margin-bottom": "6px" })}"><h4 style="${ssrRenderStyle({ "margin": "0" })}">Revenue Flow — last 30 days</h4><span class="live-pill">Live data</span></div><div class="desc">${ssrInterpolate(pieDesc.value)}</div><div class="${ssrRenderClass([{ "lure-on": lureOn.value }, "pie-wrap"])}" style="${ssrRenderStyle({ "position": "relative" })}"><canvas></canvas><div class="pie-center"><div class="v">${ssrInterpolate(pieCenterValue.value)}</div><div class="k">${ssrInterpolate(pieCenterLabel.value)}</div></div><div class="${ssrRenderClass([{ "lure-dismissed": !lureOn.value }, "lure"])}" style="${ssrRenderStyle({ "top": "-10px", "right": "-8px" })}"><span class="arr">👆</span> Click a slice</div></div><div class="pie-legend"><!--[-->`);
      ssrRenderList(REVENUE.value, (r2) => {
        _push(`<div class="${ssrRenderClass([{ active: activeKey.value === r2.key }, "legend-item"])}"><div class="legend-dot" style="${ssrRenderStyle({ background: r2.color })}"></div><div class="legend-label">${ssrInterpolate(r2.label)}</div><div class="legend-val">${ssrInterpolate(Math.round(r2.value / total.value * 100))}%</div></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
};
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Stats/StatsSection.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "SlotsReels",
  __ssrInlineRender: true,
  props: {
    isSpinning: { type: Boolean },
    prizes: { default: () => [] },
    winningPrize: { default: null },
    demoMode: { type: Boolean, default: false },
    previewMode: { default: "desktop" },
    canSpin: { type: Boolean, default: true },
    colors: { default: () => ({
      primary: "#00CED1",
      secondary: "#1a5a7a",
      accent: "#00FFFF",
      text: "#FFFFFF"
    }) },
    lastWin: { default: 0 },
    spinsLeft: { default: 0 },
    spinButtonImage: { default: "" },
    titleImage: { default: "" },
    titleText: { default: "LUCKY SLOTS" },
    titleColor: { default: "#00FFFF" },
    background: { default: "" },
    animateTitle: { type: Boolean, default: false },
    showMachine: { type: Boolean, default: true },
    machineBgColor: { default: "#1a5a7a" },
    inventoryEmoji: { default: "🎣" },
    inventoryButtonColor: { default: "#FFD700" },
    matchTextColor: { default: "#7FDBFF" },
    prizesModalBgColor: { default: "#1F2937" },
    prizesTitleColor: { default: "#FFD700" },
    prizesCardBorderColor: { default: "#FFD700" },
    prizesCardBgColor: { default: "#374151" },
    prizesValueColor: { default: "#10B981" }
  },
  emits: ["spin-complete", "spin"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isMobile = computed(() => props.previewMode === "mobile");
    const reel1 = ref(null);
    const reel2 = ref(null);
    const reel3 = ref(null);
    const isAnimating = ref(false);
    const bubblesContainer = ref(null);
    const showPrizesModal = ref(false);
    const showWinReveal = ref(false);
    const showGoldFlames = ref(false);
    let audioCtx = null;
    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }
    function playSound(freq, dur, type = "sine", vol = 0.3) {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = freq;
      osc.type = type;
      gain.gain.setValueAtTime(vol, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
      osc.start();
      osc.stop(audioCtx.currentTime + dur);
    }
    function playTick() {
      playSound(300 + Math.random() * 200, 0.05, "square", 0.1);
    }
    function playStop() {
      playSound(200, 0.15, "triangle", 0.2);
    }
    const luckyFishTheme = computed(() => ({
      bg: `linear-gradient(180deg, ${props.colors.secondary} 0%, ${adjustColor(props.colors.secondary, -30)} 50%, ${adjustColor(props.colors.secondary, -60)} 100%)`,
      title: props.titleText,
      machine: props.machineBgColor,
      border: props.titleColor || props.colors.accent,
      reelBg: "linear-gradient(180deg, #000 0%, #0a1929 50%, #000 100%)"
    }));
    function adjustColor(color, amount) {
      if (!color || !color.startsWith("#")) return color;
      const hex = color.replace("#", "");
      const num = parseInt(hex, 16);
      const r2 = Math.max(0, Math.min(255, (num >> 16) + amount));
      const g2 = Math.max(0, Math.min(255, (num >> 8 & 255) + amount));
      const b2 = Math.max(0, Math.min(255, (num & 255) + amount));
      return `#${(r2 << 16 | g2 << 8 | b2).toString(16).padStart(6, "0")}`;
    }
    const demoEmojis = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍓", "💎", "⭐", "🔔", "7️⃣", "💰", "🎰"];
    function getRandomPrize() {
      if (props.demoMode && (!props.prizes || props.prizes.length === 0)) {
        const emoji = demoEmojis[Math.floor(Math.random() * demoEmojis.length)];
        return {
          id: Math.random(),
          name: emoji,
          image: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${emoji}</text></svg>`,
          value: 0
        };
      }
      const prize = props.prizes[Math.floor(Math.random() * props.prizes.length)];
      if (!prize.image || prize.image.trim() === "") {
        const emoji = demoEmojis[Math.floor(Math.random() * demoEmojis.length)];
        return {
          ...prize,
          image: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${emoji}</text></svg>`
        };
      }
      return prize;
    }
    async function spin() {
      if (isAnimating.value || props.prizes.length === 0) {
        return;
      }
      initAudio();
      isAnimating.value = true;
      document.querySelectorAll(".symbol.winner").forEach((s2) => s2.classList.remove("winner"));
      showGoldFlames.value = false;
      let reel1Target;
      let reel2Target;
      let reel3Target;
      if (props.winningPrize) {
        reel1Target = props.winningPrize;
        reel2Target = props.winningPrize;
        reel3Target = props.winningPrize;
      } else {
        const availablePrizes = [...props.prizes];
        const rand = Math.random();
        if (rand < 0.166) {
          const matchingPrize = availablePrizes[Math.floor(Math.random() * availablePrizes.length)];
          reel1Target = matchingPrize;
          reel2Target = matchingPrize;
          const reel3Options = availablePrizes.filter((p2) => p2.id !== matchingPrize.id);
          reel3Target = reel3Options.length > 0 ? reel3Options[Math.floor(Math.random() * reel3Options.length)] : availablePrizes[0];
        } else if (rand < 0.332) {
          const matchingPrize = availablePrizes[Math.floor(Math.random() * availablePrizes.length)];
          reel2Target = matchingPrize;
          reel3Target = matchingPrize;
          const reel1Options = availablePrizes.filter((p2) => p2.id !== matchingPrize.id);
          reel1Target = reel1Options.length > 0 ? reel1Options[Math.floor(Math.random() * reel1Options.length)] : availablePrizes[0];
        } else if (rand < 0.5) {
          const matchingPrize = availablePrizes[Math.floor(Math.random() * availablePrizes.length)];
          reel1Target = matchingPrize;
          reel3Target = matchingPrize;
          const reel2Options = availablePrizes.filter((p2) => p2.id !== matchingPrize.id);
          reel2Target = reel2Options.length > 0 ? reel2Options[Math.floor(Math.random() * reel2Options.length)] : availablePrizes[0];
        } else {
          reel1Target = availablePrizes[Math.floor(Math.random() * availablePrizes.length)];
          const reel2Options = availablePrizes.filter((p2) => p2.id !== reel1Target.id);
          reel2Target = reel2Options.length > 0 ? reel2Options[Math.floor(Math.random() * reel2Options.length)] : availablePrizes[0];
          const reel3Options = availablePrizes.filter((p2) => p2.id !== reel1Target.id && p2.id !== reel2Target.id);
          reel3Target = reel3Options.length > 0 ? reel3Options[Math.floor(Math.random() * reel3Options.length)] : availablePrizes[Math.min(1, availablePrizes.length - 1)];
        }
      }
      const spinPromises = [
        spinReel(1, 2e3, reel1Target),
        // Stops first
        spinReel(2, 2800, reel2Target),
        // Stops second (800ms later)
        spinReel(3, 3600, reel3Target)
        // Stops last (1600ms after first)
      ];
      await Promise.all(spinPromises);
      if (props.winningPrize) {
        showGoldFlames.value = true;
        setTimeout(() => {
          showWinReveal.value = true;
          setTimeout(() => {
            showWinReveal.value = false;
          }, 3e3);
        }, 500);
      } else {
        showGoldFlames.value = false;
      }
      isAnimating.value = false;
      emit("spin-complete");
    }
    function spinReel(reelNum, duration, targetPrize) {
      return new Promise((resolve) => {
        var _a;
        const inner = reelNum === 1 ? reel1.value : reelNum === 2 ? reel2.value : reel3.value;
        if (!inner) return resolve(getRandomPrize());
        const SYMBOL_HEIGHT = isMobile.value ? 50 : window.innerWidth <= 550 ? 75 : 100;
        const currentTransform = inner.style.transform;
        let currentY = currentTransform ? parseInt(((_a = currentTransform.match(/-?\d+/)) == null ? void 0 : _a[0]) || `-${SYMBOL_HEIGHT}`) : -SYMBOL_HEIGHT;
        const RESET_THRESHOLD = 150;
        const currentIndex = Math.abs(Math.floor(currentY / SYMBOL_HEIGHT));
        let didReset = false;
        if (currentIndex > RESET_THRESHOLD) {
          currentY = -(20 * SYMBOL_HEIGHT);
          didReset = true;
        }
        const symbolsToSpin = 19;
        const resetCurrentIndex = Math.abs(Math.floor(currentY / SYMBOL_HEIGHT));
        const targetIndex = resetCurrentIndex + 1 + symbolsToSpin;
        const existingSymbols = Array.from(inner.querySelectorAll(".symbol img"));
        const existingCount = existingSymbols.length;
        let newSymbols = [];
        let shouldReplaceHTML = false;
        if (didReset || existingCount === 0) {
          shouldReplaceHTML = true;
          const symbolsNeeded = 300;
          for (let j2 = 0; j2 < symbolsNeeded; j2++) {
            newSymbols.push(getRandomPrize());
          }
        } else {
          for (let i2 = 0; i2 < existingCount; i2++) {
            const img = existingSymbols[i2];
            const prizeName = img.alt;
            const prize = props.prizes.find((p2) => p2.name === prizeName) || getRandomPrize();
            newSymbols.push(prize);
          }
        }
        const RESULT_INDEX = targetIndex;
        newSymbols[RESULT_INDEX] = targetPrize;
        const resultPrize = newSymbols[RESULT_INDEX];
        inner.style.transition = "none";
        if (didReset) {
          inner.style.transform = `translateY(${currentY}px)`;
        }
        if (shouldReplaceHTML) {
          let html = "";
          for (const prize of newSymbols) {
            html += `<div class="symbol"><img src="${prize.image}" alt="${prize.name}" /></div>`;
          }
          inner.innerHTML = html;
        } else {
          if (RESULT_INDEX < existingCount) {
            const targetSymbolImg = existingSymbols[RESULT_INDEX];
            if (targetSymbolImg) {
              targetSymbolImg.src = targetPrize.image;
              targetSymbolImg.alt = targetPrize.name;
            }
          }
          newSymbols.length - existingCount;
          let appendHTML = "";
          for (let i2 = existingCount; i2 < newSymbols.length; i2++) {
            const prize = newSymbols[i2];
            appendHTML += `<div class="symbol"><img src="${prize.image}" alt="${prize.name}" /></div>`;
          }
          inner.insertAdjacentHTML("beforeend", appendHTML);
        }
        const symbolElements = inner.querySelectorAll(".symbol");
        if (shouldReplaceHTML) {
          symbolElements.forEach((el) => {
            const symbol = el;
            symbol.style.height = `${SYMBOL_HEIGHT}px`;
            symbol.style.minHeight = `${SYMBOL_HEIGHT}px`;
            symbol.style.maxHeight = `${SYMBOL_HEIGHT}px`;
            symbol.style.width = `${SYMBOL_HEIGHT}px`;
            symbol.style.display = "block";
            symbol.style.overflow = "hidden";
            symbol.style.margin = "0";
            symbol.style.padding = "0";
            symbol.style.boxSizing = "border-box";
          });
        } else {
          symbolElements.length - existingCount;
          for (let i2 = existingCount; i2 < symbolElements.length; i2++) {
            const symbol = symbolElements[i2];
            symbol.style.height = `${SYMBOL_HEIGHT}px`;
            symbol.style.minHeight = `${SYMBOL_HEIGHT}px`;
            symbol.style.maxHeight = `${SYMBOL_HEIGHT}px`;
            symbol.style.width = `${SYMBOL_HEIGHT}px`;
            symbol.style.display = "block";
            symbol.style.overflow = "hidden";
            symbol.style.margin = "0";
            symbol.style.padding = "0";
            symbol.style.boxSizing = "border-box";
          }
        }
        inner.offsetHeight;
        const tickInterval = setInterval(playTick, 70);
        const spinDistance = symbolsToSpin * SYMBOL_HEIGHT;
        const newPosition = currentY - spinDistance;
        inner.style.transition = `transform ${duration}ms cubic-bezier(0.33, 0.0, 0.2, 1)`;
        inner.style.transform = `translateY(${newPosition}px)`;
        setTimeout(() => {
          var _a2;
          clearInterval(tickInterval);
          playStop();
          inner.style.transition = "none";
          const symbols = inner.querySelectorAll(".symbol");
          (_a2 = symbols[RESULT_INDEX]) == null ? void 0 : _a2.classList.add("winner");
          resolve(resultPrize);
        }, duration);
      });
    }
    function createBubbles() {
      if (!bubblesContainer.value) return;
      for (let i2 = 0; i2 < 15; i2++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        const size = 8 + Math.random() * 25;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        bubble.style.left = Math.random() * 100 + "%";
        bubble.style.animationDuration = 6 + Math.random() * 8 + "s";
        bubble.style.animationDelay = -Math.random() * 8 + "s";
        bubblesContainer.value.appendChild(bubble);
      }
    }
    watch(() => props.isSpinning, (newVal) => {
      if (newVal && !isAnimating.value) {
        spin();
      }
    });
    const reelsInitialized = ref(false);
    function initializeReels() {
      if (reelsInitialized.value) return;
      const SYMBOL_HEIGHT = isMobile.value ? 50 : window.innerWidth <= 550 ? 75 : 100;
      const reels = [reel1, reel2, reel3];
      for (let i2 = 0; i2 < 3; i2++) {
        const inner = reels[i2].value;
        if (!inner) continue;
        let html = "";
        const initialSymbols = [];
        for (let j2 = 0; j2 < 200; j2++) {
          const prize = getRandomPrize();
          html += `<div class="symbol"><img src="${prize.image}" alt="${prize.name}" /></div>`;
          initialSymbols.push(prize.name);
        }
        inner.innerHTML = html;
        const symbolElements = inner.querySelectorAll(".symbol");
        symbolElements.forEach((el) => {
          const symbol = el;
          symbol.style.height = `${SYMBOL_HEIGHT}px`;
          symbol.style.minHeight = `${SYMBOL_HEIGHT}px`;
          symbol.style.maxHeight = `${SYMBOL_HEIGHT}px`;
          symbol.style.width = `${SYMBOL_HEIGHT}px`;
          symbol.style.display = "block";
          symbol.style.overflow = "hidden";
          symbol.style.margin = "0";
          symbol.style.padding = "0";
          symbol.style.boxSizing = "border-box";
        });
        inner.style.transform = `translateY(-${SYMBOL_HEIGHT}px)`;
      }
      reelsInitialized.value = true;
    }
    watch(() => props.showMachine, (newVal) => {
      if (newVal && !reelsInitialized.value) {
        setTimeout(() => {
          initializeReels();
        }, 100);
      }
    });
    watch(() => props.prizes, (newPrizes, oldPrizes) => {
      if (props.showMachine && reelsInitialized.value && newPrizes && newPrizes.length > 0) {
        if (!oldPrizes || oldPrizes.length === 0 || oldPrizes.length !== newPrizes.length) {
          reelsInitialized.value = false;
          setTimeout(() => {
            initializeReels();
          }, 100);
        }
      }
    });
    onMounted(() => {
      createBubbles();
      if (props.showMachine) {
        initializeReels();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["slots-container", { "slots-container-demo": __props.demoMode, "slots-container-mobile": isMobile.value }],
        style: {
          backgroundImage: __props.background ? `url(${__props.background})` : "none",
          backgroundColor: __props.background ? "transparent" : luckyFishTheme.value.bg,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }
      }, _attrs))} data-v-8e1c7f96>`);
      if (!__props.background) {
        _push(`<div class="bubbles" data-v-8e1c7f96></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!__props.showMachine) {
        _push(`<div class="title title-floating-only" data-v-8e1c7f96>`);
        if (__props.titleImage) {
          _push(`<img${ssrRenderAttr("src", __props.titleImage)} alt="Game Title" class="${ssrRenderClass(["title-image", { "title-zoom-animation": __props.animateTitle }])}" data-v-8e1c7f96>`);
        } else {
          _push(`<h1 style="${ssrRenderStyle({ color: luckyFishTheme.value.border })}" class="${ssrRenderClass({ "title-zoom-animation": __props.animateTitle })}" data-v-8e1c7f96>${ssrInterpolate(luckyFishTheme.value.title)}</h1>`);
        }
        _push(`<p style="${ssrRenderStyle({ color: __props.matchTextColor })}" data-v-8e1c7f96>Match 3 in a row to win!</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showMachine) {
        _push(`<div class="${ssrRenderClass([{ "slot-machine-win": showGoldFlames.value, "slot-machine-demo": __props.demoMode, "slot-machine-mobile": isMobile.value }, "slot-machine"])}" style="${ssrRenderStyle({ background: __props.machineBgColor, border: isMobile.value ? `3px solid ${luckyFishTheme.value.border}` : `5px solid ${luckyFishTheme.value.border}` })}" data-v-8e1c7f96><div class="title" data-v-8e1c7f96>`);
        if (__props.titleImage) {
          _push(`<img${ssrRenderAttr("src", __props.titleImage)} alt="Game Title" class="title-image" data-v-8e1c7f96>`);
        } else {
          _push(`<h1 style="${ssrRenderStyle({ color: luckyFishTheme.value.border })}" data-v-8e1c7f96>${ssrInterpolate(luckyFishTheme.value.title)}</h1>`);
        }
        _push(`<p style="${ssrRenderStyle({ color: __props.matchTextColor })}" data-v-8e1c7f96>Match 3 in a row to win!</p></div>`);
        if (__props.showMachine) {
          _push(`<div data-v-8e1c7f96><div class="balance-bar" data-v-8e1c7f96><div class="balance-box" data-v-8e1c7f96><div class="label" data-v-8e1c7f96>Spins Left</div><div class="value" data-v-8e1c7f96>${ssrInterpolate(__props.spinsLeft)}</div></div><div class="balance-box" data-v-8e1c7f96><div class="label" data-v-8e1c7f96>Last Win</div><div class="value win-value" data-v-8e1c7f96>${ssrInterpolate(__props.lastWin)}</div></div><button class="chest-btn" title="View all prizes" style="${ssrRenderStyle({ background: `linear-gradient(180deg, ${__props.inventoryButtonColor} 0%, ${__props.inventoryButtonColor}dd 100%)` })}" data-v-8e1c7f96>${ssrInterpolate(__props.inventoryEmoji)}</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="slot-window" style="${ssrRenderStyle({
          background: luckyFishTheme.value.reelBg,
          border: `4px solid ${luckyFishTheme.value.border}`,
          opacity: __props.showMachine ? 1 : 0,
          transform: __props.showMachine ? "scale(1)" : "scale(0.95)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          pointerEvents: __props.showMachine ? "auto" : "none"
        })}" data-v-8e1c7f96><div class="payline-indicator" data-v-8e1c7f96></div><div class="${ssrRenderClass([{ "reels-spinning": isAnimating.value, "reels-winning": showGoldFlames.value }, "reels-container"])}" data-v-8e1c7f96><div class="${ssrRenderClass([{ "reel-winning": showGoldFlames.value }, "reel"])}" data-v-8e1c7f96><div class="reel-inner" data-v-8e1c7f96></div></div><div class="${ssrRenderClass([{ "reel-winning": showGoldFlames.value }, "reel"])}" data-v-8e1c7f96><div class="reel-inner" data-v-8e1c7f96></div></div><div class="${ssrRenderClass([{ "reel-winning": showGoldFlames.value }, "reel"])}" data-v-8e1c7f96><div class="reel-inner" data-v-8e1c7f96></div></div></div></div>`);
        if (__props.showMachine) {
          _push(`<div data-v-8e1c7f96><div class="controls" data-v-8e1c7f96><button${ssrIncludeBooleanAttr(!__props.canSpin || isAnimating.value) ? " disabled" : ""} class="${ssrRenderClass([{ "spin-btn-image": __props.spinButtonImage, "btn-spinning": isAnimating.value }, "spin-btn spin-btn-full"])}" style="${ssrRenderStyle({
            background: isAnimating.value ? "linear-gradient(180deg, #555 0%, #333 100%)" : `linear-gradient(180deg, ${__props.colors.primary} 0%, ${__props.colors.secondary} 50%, #006666 100%)`,
            borderColor: luckyFishTheme.value.border
          })}" data-v-8e1c7f96>`);
          if (__props.spinButtonImage) {
            _push(`<img${ssrRenderAttr("src", __props.spinButtonImage)} alt="Spin" class="spin-btn-img" data-v-8e1c7f96>`);
          } else {
            _push(`<span data-v-8e1c7f96>${ssrInterpolate(isAnimating.value ? "🌊 SPINNING... 🌊" : "🌊 SPIN 🌊")}</span>`);
          }
          _push(`</button></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showPrizesModal.value) {
        _push(`<div class="modal-overlay" data-v-8e1c7f96><div class="modal-content" style="${ssrRenderStyle({
          background: `linear-gradient(180deg, ${__props.prizesModalBgColor} 0%, ${__props.prizesModalBgColor}dd 100%)`,
          border: `4px solid ${__props.prizesCardBorderColor}`,
          boxShadow: `0 0 50px ${__props.prizesCardBorderColor}80, 0 20px 60px rgba(0,0,0,0.8)`
        })}" data-v-8e1c7f96><button class="modal-close" data-v-8e1c7f96>✕</button><h2 class="modal-title" style="${ssrRenderStyle({
          color: __props.prizesTitleColor,
          textShadow: `0 0 20px ${__props.prizesTitleColor}80`
        })}" data-v-8e1c7f96>${ssrInterpolate(__props.inventoryEmoji)} Available Prizes ${ssrInterpolate(__props.inventoryEmoji)}</h2><div class="prizes-grid" data-v-8e1c7f96><!--[-->`);
        ssrRenderList(__props.prizes, (prize) => {
          _push(`<div class="prize-card" style="${ssrRenderStyle({
            background: `${__props.prizesCardBgColor}cc`,
            border: `3px solid ${__props.prizesCardBorderColor}99`
          })}" data-v-8e1c7f96><img${ssrRenderAttr("src", prize.image)}${ssrRenderAttr("alt", prize.name)} class="prize-image" data-v-8e1c7f96><div class="prize-name" data-v-8e1c7f96>${ssrInterpolate(prize.name)}</div><div class="prize-value" style="${ssrRenderStyle({ color: __props.prizesValueColor })}" data-v-8e1c7f96>£${ssrInterpolate(prize.value)}</div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showWinReveal.value && __props.winningPrize) {
        _push(`<div class="win-reveal-overlay" data-v-8e1c7f96><div class="win-reveal-content" data-v-8e1c7f96><div class="reels-merge" data-v-8e1c7f96><div class="merge-reel merge-reel-1" data-v-8e1c7f96></div><div class="merge-reel merge-reel-2" data-v-8e1c7f96></div><div class="merge-reel merge-reel-3" data-v-8e1c7f96></div></div><div class="prize-reveal" data-v-8e1c7f96><div class="win-text" data-v-8e1c7f96>🎉 YOU WON! 🎉</div><div class="prize-image-container" data-v-8e1c7f96><img${ssrRenderAttr("src", __props.winningPrize.image)}${ssrRenderAttr("alt", __props.winningPrize.name)} class="prize-reveal-image" data-v-8e1c7f96></div><div class="prize-reveal-name" data-v-8e1c7f96>${ssrInterpolate(__props.winningPrize.name)}</div><div class="prize-reveal-value" data-v-8e1c7f96>£${ssrInterpolate(__props.winningPrize.value)}</div></div><div class="explosion-particles" data-v-8e1c7f96><!--[-->`);
        ssrRenderList(20, (i2) => {
          _push(`<div class="particle" style="${ssrRenderStyle({ "--angle": i2 * 18 + "deg" })}" data-v-8e1c7f96>💥</div>`);
        });
        _push(`<!--]--></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/SlotsReels.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const SlotsReels = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-8e1c7f96"]]);
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "SlotsInventoryModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    wonPrizes: { default: () => [] },
    availablePrizes: { default: () => [] },
    slotsAssets: { default: () => ({
      inventoryEmoji: "🎣",
      prizesModalBgColor: "#1F2937",
      prizesTitleColor: "#FFD700",
      prizesCardBorderColor: "#FFD700",
      prizesCardBgColor: "#374151",
      prizesValueColor: "#10B981"
    }) }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const totalWonValue = computed(() => {
      return props.wonPrizes.reduce((sum, prize) => sum + prize.value, 0);
    });
    const formattedTotalValue = computed(() => {
      return `£${totalWonValue.value.toLocaleString()}`;
    });
    const modalBgColor = computed(() => props.slotsAssets.prizesModalBgColor || "#1F2937");
    const titleColor = computed(() => props.slotsAssets.prizesTitleColor || "#FFD700");
    const cardBorderColor = computed(() => props.slotsAssets.prizesCardBorderColor || "#FFD700");
    const cardBgColor = computed(() => props.slotsAssets.prizesCardBgColor || "#374151");
    const valueColor = computed(() => props.slotsAssets.prizesValueColor || "#10B981");
    const emoji = computed(() => props.slotsAssets.inventoryEmoji || "🎣");
    const containerStyle = computed(() => ({
      background: `linear-gradient(to bottom right, ${modalBgColor.value}, ${modalBgColor.value}DD, ${modalBgColor.value})`,
      borderColor: `${cardBorderColor.value}80`,
      boxShadow: `0 0 40px ${cardBorderColor.value}4D`
    }));
    const titleDividerStyle = computed(() => ({
      background: `linear-gradient(to right, transparent, ${titleColor.value}80, transparent)`
    }));
    const titleTextStyle = computed(() => ({
      color: titleColor.value,
      fontFamily: "Impact, sans-serif",
      textShadow: `0 0 10px ${titleColor.value}`
    }));
    const prizeCardStyle = computed(() => ({
      background: `linear-gradient(to bottom right, ${cardBgColor.value}DD, ${cardBgColor.value}, ${cardBgColor.value}DD)`,
      borderColor: cardBorderColor.value
    }));
    const valueTextStyle = computed(() => ({
      color: valueColor.value,
      fontFamily: "Impact, sans-serif",
      textShadow: `0 0 8px ${valueColor.value}`
    }));
    const contentStyle = computed(() => ({
      backgroundColor: `${modalBgColor.value}DD`
    }));
    const headerStyle = computed(() => ({
      background: `linear-gradient(to right, ${cardBorderColor.value}40, ${modalBgColor.value}40, ${cardBorderColor.value}40)`,
      borderColor: `${cardBorderColor.value}30`
    }));
    const footerStyle = computed(() => ({
      background: `linear-gradient(to right, ${cardBorderColor.value}40, ${modalBgColor.value}40, ${cardBorderColor.value}40)`,
      borderColor: `${cardBorderColor.value}30`
    }));
    const scanningLineStyle = computed(() => ({
      background: `linear-gradient(to right, transparent, ${cardBorderColor.value}, transparent)`
    }));
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="fixed inset-0 z-[80] flex items-center justify-center p-4" style="${ssrRenderStyle({ backgroundColor: `${modalBgColor.value}1A` })}" data-v-d0f61d96><div class="relative w-full max-w-4xl max-h-[90vh] rounded-xl border-2 shadow-2xl overflow-hidden" style="${ssrRenderStyle(containerStyle.value)}" data-v-d0f61d96><div class="absolute top-0 left-0 right-0 h-px animate-scan-horizontal" style="${ssrRenderStyle(scanningLineStyle.value)}" data-v-d0f61d96></div><div class="relative border-b-2 px-6 py-4" style="${ssrRenderStyle(headerStyle.value)}" data-v-d0f61d96><div class="flex items-center justify-between" data-v-d0f61d96><div class="flex items-center gap-3" data-v-d0f61d96><div class="text-3xl animate-pulse" data-v-d0f61d96>${ssrInterpolate(emoji.value)}</div><div data-v-d0f61d96><h2 class="text-2xl font-black uppercase tracking-wider" style="${ssrRenderStyle({
            color: titleColor.value,
            fontFamily: "Impact, sans-serif",
            textShadow: `0 0 15px ${titleColor.value}, 2px 2px 0 ${modalBgColor.value}`
          })}" data-v-d0f61d96> PRIZE INVENTORY </h2><p class="text-xs uppercase tracking-widest" style="${ssrRenderStyle({
            color: titleColor.value,
            fontFamily: "Courier New, monospace",
            textShadow: `0 0 5px ${titleColor.value}`
          })}" data-v-d0f61d96> YOUR WINS &amp; AVAILABLE PRIZES </p></div></div><button class="rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 border-2 group" style="${ssrRenderStyle({
            backgroundColor: `${cardBgColor.value}80`,
            borderColor: `${cardBorderColor.value}30`,
            color: titleColor.value
          })}" aria-label="Close inventory" data-v-d0f61d96><span class="text-xl group-hover:rotate-90 transition-transform duration-300" data-v-d0f61d96>✕</span></button></div>`);
          if (__props.wonPrizes.length > 0) {
            _push2(`<div class="mt-3 border rounded-lg px-4 py-2 flex items-center justify-between" style="${ssrRenderStyle({
              background: `linear-gradient(to right, ${cardBgColor.value}66, ${cardBgColor.value}99, ${cardBgColor.value}66)`,
              borderColor: `${cardBorderColor.value}80`
            })}" data-v-d0f61d96><span class="text-sm font-bold uppercase tracking-wider" style="${ssrRenderStyle({
              color: titleColor.value,
              fontFamily: "Courier New, monospace",
              textShadow: `0 0 8px ${titleColor.value}`
            })}" data-v-d0f61d96> 💰 TOTAL WINNINGS </span><span class="text-xl font-black" style="${ssrRenderStyle({
              color: valueColor.value,
              fontFamily: "Impact, sans-serif",
              textShadow: `0 0 12px ${valueColor.value}, 2px 2px 0 ${valueColor.value}DD`
            })}" data-v-d0f61d96>${ssrInterpolate(formattedTotalValue.value)}</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="relative overflow-y-auto max-h-[calc(90vh-200px)] px-6 py-4 custom-scrollbar" style="${ssrRenderStyle(contentStyle.value)}" data-v-d0f61d96>`);
          if (__props.wonPrizes.length > 0) {
            _push2(`<div class="mb-6" data-v-d0f61d96><div class="flex items-center gap-2 mb-3" data-v-d0f61d96><div class="h-px flex-1" style="${ssrRenderStyle(titleDividerStyle.value)}" data-v-d0f61d96></div><h3 class="text-lg font-black uppercase tracking-wider flex items-center gap-2" style="${ssrRenderStyle(titleTextStyle.value)}" data-v-d0f61d96><span class="text-2xl" data-v-d0f61d96>${ssrInterpolate(emoji.value)}</span> YOUR WINS (${ssrInterpolate(__props.wonPrizes.length)}) <span class="text-2xl" data-v-d0f61d96>${ssrInterpolate(emoji.value)}</span></h3><div class="h-px flex-1" style="${ssrRenderStyle(titleDividerStyle.value)}" data-v-d0f61d96></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-d0f61d96><!--[-->`);
            ssrRenderList(__props.wonPrizes, (prize) => {
              _push2(`<div class="group relative border-2 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300" style="${ssrRenderStyle(prizeCardStyle.value)}" data-v-d0f61d96><div class="absolute top-2 right-2 z-10 text-xs font-black px-2 py-1 rounded-full uppercase tracking-wider animate-pulse" style="${ssrRenderStyle({
                backgroundColor: valueColor.value,
                color: "#FFFFFF"
              })}" data-v-d0f61d96> ✓ WON </div>`);
              if (prize.ticketNumber) {
                _push2(`<div class="absolute top-2 left-2 z-10 text-xs font-black px-2 py-1 rounded border-2 uppercase tracking-wider" style="${ssrRenderStyle({
                  backgroundColor: `${cardBorderColor.value}E6`,
                  color: "#FFFFFF",
                  borderColor: cardBorderColor.value,
                  fontFamily: "Courier New, monospace"
                })}" data-v-d0f61d96> 🎫 ${ssrInterpolate(prize.ticketNumber)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="relative h-40 overflow-hidden" style="${ssrRenderStyle({ backgroundColor: `${cardBgColor.value}66` })}" data-v-d0f61d96>`);
              if (prize.image) {
                _push2(`<img${ssrRenderAttr("src", prize.image)}${ssrRenderAttr("alt", prize.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-v-d0f61d96>`);
              } else {
                _push2(`<div class="w-full h-full flex items-center justify-center" style="${ssrRenderStyle({
                  background: `linear-gradient(to bottom right, ${cardBgColor.value}, ${cardBgColor.value}DD)`
                })}" data-v-d0f61d96><span class="text-xs font-bold uppercase text-center px-2" style="${ssrRenderStyle({ color: "#FFFFFF" })}" data-v-d0f61d96>${ssrInterpolate(prize.name)}</span></div>`);
              }
              _push2(`<div class="absolute inset-0" style="${ssrRenderStyle({
                background: `linear-gradient(to top, ${cardBgColor.value}CC, transparent, transparent)`
              })}" data-v-d0f61d96></div></div><div class="p-3" data-v-d0f61d96><h4 class="font-bold text-sm mb-1 line-clamp-2" style="${ssrRenderStyle({ color: "#FFFFFF" })}" data-v-d0f61d96>${ssrInterpolate(prize.name)}</h4>`);
              if (prize.description) {
                _push2(`<p class="text-xs mb-2 line-clamp-1" style="${ssrRenderStyle({ color: "#FFFFFF99" })}" data-v-d0f61d96>${ssrInterpolate(prize.description)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex items-center justify-between" data-v-d0f61d96><span class="text-xs font-bold uppercase tracking-wider" style="${ssrRenderStyle({
                color: titleColor.value,
                fontFamily: "Courier New, monospace",
                textShadow: `0 0 5px ${titleColor.value}`
              })}" data-v-d0f61d96> Value </span><span class="font-black text-lg" style="${ssrRenderStyle(valueTextStyle.value)}" data-v-d0f61d96> £${ssrInterpolate(prize.value.toLocaleString())}</span></div></div><div style="${ssrRenderStyle({
                backgroundColor: `${cardBorderColor.value}00`
              })}" class="${ssrRenderClass([{ "group-hover:bg-opacity-10": true }, "absolute inset-0 transition-all duration-300 pointer-events-none"])}" data-v-d0f61d96></div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass(__props.wonPrizes.length > 0 ? "" : "mt-0")}" data-v-d0f61d96><div class="flex items-center gap-2 mb-3" data-v-d0f61d96><div class="h-px flex-1" style="${ssrRenderStyle(titleDividerStyle.value)}" data-v-d0f61d96></div><h3 class="text-lg font-black uppercase tracking-wider flex items-center gap-2" style="${ssrRenderStyle(titleTextStyle.value)}" data-v-d0f61d96><span class="text-2xl" data-v-d0f61d96>${ssrInterpolate(emoji.value)}</span> AVAILABLE PRIZES (${ssrInterpolate(__props.availablePrizes.length)}) <span class="text-2xl" data-v-d0f61d96>${ssrInterpolate(emoji.value)}</span></h3><div class="h-px flex-1" style="${ssrRenderStyle(titleDividerStyle.value)}" data-v-d0f61d96></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-d0f61d96><!--[-->`);
          ssrRenderList(__props.availablePrizes, (prize) => {
            _push2(`<div class="group relative border-2 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300" style="${ssrRenderStyle(prizeCardStyle.value)}" data-v-d0f61d96><div class="relative h-40 overflow-hidden" style="${ssrRenderStyle({ backgroundColor: `${cardBgColor.value}66` })}" data-v-d0f61d96>`);
            if (prize.image) {
              _push2(`<img${ssrRenderAttr("src", prize.image)}${ssrRenderAttr("alt", prize.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" data-v-d0f61d96>`);
            } else {
              _push2(`<div class="w-full h-full flex items-center justify-center" style="${ssrRenderStyle({
                background: `linear-gradient(to bottom right, ${cardBgColor.value}, ${cardBgColor.value}DD)`
              })}" data-v-d0f61d96><span class="text-xs font-bold uppercase text-center px-2" style="${ssrRenderStyle({ color: "#FFFFFF" })}" data-v-d0f61d96>${ssrInterpolate(prize.name)}</span></div>`);
            }
            _push2(`<div class="absolute inset-0" style="${ssrRenderStyle({
              background: `linear-gradient(to top, ${cardBgColor.value}CC, transparent, transparent)`
            })}" data-v-d0f61d96></div></div><div class="p-3" data-v-d0f61d96><h4 class="font-bold text-sm mb-1 line-clamp-2" style="${ssrRenderStyle({ color: "#FFFFFF" })}" data-v-d0f61d96>${ssrInterpolate(prize.name)}</h4>`);
            if (prize.description) {
              _push2(`<p class="text-xs mb-2 line-clamp-1" style="${ssrRenderStyle({ color: "#FFFFFF99" })}" data-v-d0f61d96>${ssrInterpolate(prize.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-between" data-v-d0f61d96><span class="text-xs font-bold uppercase tracking-wider" style="${ssrRenderStyle({
              color: titleColor.value,
              fontFamily: "Courier New, monospace",
              textShadow: `0 0 5px ${titleColor.value}`
            })}" data-v-d0f61d96> Value </span><span class="font-black text-lg" style="${ssrRenderStyle(valueTextStyle.value)}" data-v-d0f61d96> £${ssrInterpolate(prize.value.toLocaleString())}</span></div></div><div style="${ssrRenderStyle({
              backgroundColor: `${cardBorderColor.value}00`
            })}" class="${ssrRenderClass([{ "group-hover:bg-opacity-10": true }, "absolute inset-0 transition-all duration-300 pointer-events-none"])}" data-v-d0f61d96></div></div>`);
          });
          _push2(`<!--]--></div></div></div><div class="relative border-t-2 px-6 py-3" style="${ssrRenderStyle(footerStyle.value)}" data-v-d0f61d96><div class="flex items-center justify-between" data-v-d0f61d96><p class="text-xs uppercase tracking-widest" style="${ssrRenderStyle({
            color: titleColor.value,
            fontFamily: "Courier New, monospace",
            textShadow: `0 0 5px ${titleColor.value}`
          })}" data-v-d0f61d96>${ssrInterpolate(emoji.value)} KEEP SPINNING TO WIN MORE PRIZES! </p><button class="px-4 py-2 font-bold text-sm uppercase tracking-wider rounded border-2 transition-all duration-300 shadow-lg" style="${ssrRenderStyle({
            background: `linear-gradient(to right, ${cardBorderColor.value}, ${cardBorderColor.value}DD)`,
            color: "#FFFFFF",
            borderColor: `${cardBorderColor.value}80`,
            fontFamily: "Impact, sans-serif",
            boxShadow: `0 0 15px ${cardBorderColor.value}66`
          })}" data-v-d0f61d96> CLOSE </button></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/SlotsInventoryModal.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const SlotsInventoryModal = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-d0f61d96"]]);
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "SlotsGame",
  __ssrInlineRender: true,
  props: {
    demoMode: { type: Boolean },
    previewMode: {},
    slotsAssets: {},
    tickets: {},
    playedTickets: {},
    instant_win_categories: {},
    animateTitle: { type: Boolean },
    showMachine: { type: Boolean }
  },
  emits: ["ticket-played", "prize-won"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isSpinning = ref(false);
    const winCounter = ref(0);
    const showInventory = ref(false);
    const availablePrizes = ref([]);
    const wonPrizes = ref([]);
    const currentWinningPrize = ref(null);
    const lastWin = ref(0);
    const spinSound = ref(null);
    const winSound = ref(null);
    const lossSound = ref(null);
    let audioCtx = null;
    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }
    function playWin() {
      initAudio();
      if (!audioCtx) return;
      const notes = [523, 659, 784, 1047];
      notes.forEach((freq, i2) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.value = freq;
          osc.type = "sine";
          gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.3);
        }, i2 * 100);
      });
    }
    function playBigWin() {
      initAudio();
      if (!audioCtx) return;
      const notes = [523, 587, 659, 784, 880, 988, 1047, 1319];
      notes.forEach((freq, i2) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.value = freq;
          osc.type = "sine";
          gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.35);
        }, i2 * 80);
      });
    }
    const spinsLeft = computed(() => {
      var _a;
      if (props.demoMode) {
        return 9;
      }
      if (!props.tickets) {
        return 0;
      }
      return props.tickets.length - (((_a = props.playedTickets) == null ? void 0 : _a.length) || 0);
    });
    const jackpot = computed(() => {
      if (props.demoMode) {
        return { value: 1e4, name: "MEGA JACKPOT" };
      }
      if (availablePrizes.value.length === 0) {
        return { value: 0, name: "NO PRIZE" };
      }
      const highestPrize = availablePrizes.value.reduce(
        (max, prize) => prize.value > max.value ? prize : max
      );
      return { value: highestPrize.value, name: highestPrize.name };
    });
    const canSpin = computed(() => spinsLeft.value > 0 && !isSpinning.value);
    computed(() => {
      if (props.demoMode) {
        return "DEMO";
      }
      const nextTicket = getNextTicket();
      return nextTicket ? nextTicket.number : null;
    });
    const isMobile = computed(() => props.previewMode === "mobile");
    computed(() => ({
      color: props.slotsAssets.titleColor,
      textShadow: `0 0 10px ${props.slotsAssets.titleColor}, 0 0 20px ${props.slotsAssets.titleColor}`
    }));
    computed(() => {
      const baseClasses = "font-black uppercase tracking-widest drop-shadow-lg text-center";
      return isMobile.value ? `${baseClasses} text-2xl` : `${baseClasses} text-4xl animate-pulse`;
    });
    const extractPrizesFromTickets = () => {
      if (props.instant_win_categories && props.instant_win_categories.length > 0) {
        return props.instant_win_categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          image: cat.image_path,
          value: cat.value
        }));
      }
      if (!props.tickets || props.tickets.length === 0) {
        return generateDemoPrizes();
      }
      const uniquePrizes = /* @__PURE__ */ new Map();
      props.tickets.forEach((ticket) => {
        if (ticket.instant_win && ticket.instant_win !== false) {
          const instantWin = ticket.instant_win;
          const categoryId = instantWin.category_id;
          if (categoryId && !uniquePrizes.has(categoryId)) {
            uniquePrizes.set(categoryId, {
              id: categoryId,
              name: instantWin.name || instantWin.prize,
              image: instantWin.image_path || "",
              value: parseFloat(String(instantWin.value)) || 0
            });
          }
        }
      });
      const prizesArray = Array.from(uniquePrizes.values());
      const prizesWithImages = prizesArray.filter((p2) => p2.image && p2.image.trim() !== "");
      if (prizesWithImages.length > 0) {
        return prizesWithImages;
      }
      if (prizesArray.length > 0) {
        return prizesArray;
      }
      return generateDemoPrizes();
    };
    const generateDemoPrizes = () => {
      const emojiPrizes = [
        { emoji: "💎", name: "Diamond", value: 1e3 },
        { emoji: "🍒", name: "Cherry", value: 100 },
        { emoji: "⭐", name: "Star", value: 250 },
        { emoji: "7️⃣", name: "Lucky Seven", value: 777 },
        { emoji: "🔔", name: "Bell", value: 300 },
        { emoji: "🍋", name: "Lemon", value: 150 },
        { emoji: "🍊", name: "Orange", value: 200 },
        { emoji: "🍉", name: "Watermelon", value: 350 },
        { emoji: "🍇", name: "Grapes", value: 180 },
        { emoji: "💰", name: "Money Bag", value: 500 },
        { emoji: "🎰", name: "Jackpot", value: 5e3 },
        { emoji: "🍓", name: "Strawberry", value: 220 }
      ];
      return emojiPrizes.map((prize, index) => ({
        id: index + 1,
        name: prize.name,
        // Use SVG data URL to render emoji as image
        image: `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">${prize.emoji}</text></svg>`)}`,
        value: prize.value
      }));
    };
    const getNextTicket = () => {
      if (!props.tickets || props.demoMode) {
        return null;
      }
      const playedIds = props.playedTickets || [];
      const unplayedTickets = props.tickets.filter((ticket) => !playedIds.includes(ticket.id));
      return unplayedTickets.length > 0 ? unplayedTickets[0] : null;
    };
    const handleSpin = () => {
      if (!canSpin.value || isSpinning.value) {
        return;
      }
      isSpinning.value = true;
      currentWinningPrize.value = null;
      if (spinSound.value) {
        spinSound.value.currentTime = 0;
        spinSound.value.play().catch(() => {
        });
      }
      const currentTicket = getNextTicket();
      if (props.demoMode) {
        const isWinner = Math.random() > 0.5;
        if (isWinner) {
          const demoPrizes = generateDemoPrizes();
          const randomPrize = demoPrizes[Math.floor(Math.random() * demoPrizes.length)];
          currentWinningPrize.value = randomPrize;
        }
      } else if (currentTicket) {
        const instantWinData = currentTicket.instant_win;
        const hasInstantWin = instantWinData !== false && instantWinData !== null;
        const prizeText = hasInstantWin ? instantWinData.prize : null;
        const isWinner = hasInstantWin && prizeText !== "NO WIN";
        if (isWinner && hasInstantWin) {
          const instantWin = instantWinData;
          let matchingPrize = availablePrizes.value.find(
            (p2) => p2.id === instantWin.category_id
          );
          if (!matchingPrize) {
            matchingPrize = {
              id: instantWin.category_id || instantWin.id,
              name: instantWin.prize || "Winner!",
              image: instantWin.image_path || "",
              value: parseFloat(String(instantWin.value)) || 0
            };
          }
          currentWinningPrize.value = matchingPrize;
        }
        emit("ticket-played", currentTicket.id);
      } else {
        isSpinning.value = false;
        return;
      }
    };
    const handleSpinComplete = () => {
      var _a;
      if (currentWinningPrize.value) {
        const playedTickets = props.playedTickets || [];
        const lastPlayedTicketId = playedTickets[playedTickets.length - 1];
        const ticket = (_a = props.tickets) == null ? void 0 : _a.find((t3) => t3.id === lastPlayedTicketId);
        const ticketNumber = (ticket == null ? void 0 : ticket.number) || "UNKNOWN";
        const winAmount = currentWinningPrize.value.value;
        lastWin.value = winAmount;
        const prizeWithTicket = {
          ...currentWinningPrize.value,
          ticketNumber
        };
        wonPrizes.value.push(prizeWithTicket);
        winCounter.value++;
        emit("prize-won", currentWinningPrize.value);
        if (winSound.value && props.slotsAssets.winSound) {
          winSound.value.currentTime = 0;
          winSound.value.play().catch(() => {
          });
        } else if (winAmount >= 100) {
          playBigWin();
        } else {
          playWin();
        }
        setTimeout(() => {
          highlightWinners();
        }, 100);
      } else {
        lastWin.value = 0;
        if (lossSound.value && props.slotsAssets.lossSound) {
          lossSound.value.currentTime = 0;
          lossSound.value.play().catch(() => {
          });
        }
      }
      isSpinning.value = false;
      if (currentWinningPrize.value) {
        setTimeout(() => {
          currentWinningPrize.value = null;
        }, 3e3);
      }
    };
    function highlightWinners() {
      for (let i2 = 1; i2 <= 3; i2++) {
        const reel = document.querySelector(`#reel${i2} .reel-inner`);
        if (reel) {
          const symbols = reel.querySelectorAll(".symbol");
          if (symbols[1]) {
            symbols[1].classList.add("winner");
          }
        }
      }
    }
    watch(() => props.tickets, () => {
      if (props.tickets && props.tickets.length > 0) {
        availablePrizes.value = extractPrizesFromTickets();
      }
    }, { immediate: true });
    onMounted(() => {
      availablePrizes.value = extractPrizesFromTickets();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex-1 flex flex-col relative", __props.demoMode ? "" : "overflow-hidden"]
      }, _attrs))} data-v-721e497f>`);
      _push(ssrRenderComponent(SlotsReels, {
        isSpinning: isSpinning.value,
        prizes: availablePrizes.value,
        winningPrize: currentWinningPrize.value,
        demoMode: props.demoMode,
        previewMode: props.previewMode,
        canSpin: canSpin.value,
        colors: {
          primary: __props.slotsAssets.primaryColor || "#00CED1",
          secondary: __props.slotsAssets.secondaryColor || "#1a5a7a",
          accent: __props.slotsAssets.accentColor || "#00FFFF",
          text: __props.slotsAssets.textColor || "#FFFFFF"
        },
        spinsLeft: spinsLeft.value,
        lastWin: lastWin.value,
        spinButtonImage: __props.slotsAssets.spinButtonImage,
        titleImage: __props.slotsAssets.titleImage,
        titleText: __props.slotsAssets.titleText,
        titleColor: __props.slotsAssets.titleColor,
        background: __props.slotsAssets.background,
        animateTitle: props.animateTitle,
        showMachine: props.showMachine,
        machineBgColor: __props.slotsAssets.machineBgColor,
        inventoryEmoji: __props.slotsAssets.inventoryEmoji,
        inventoryButtonColor: __props.slotsAssets.inventoryButtonColor,
        matchTextColor: __props.slotsAssets.matchTextColor,
        prizesModalBgColor: __props.slotsAssets.prizesModalBgColor,
        prizesTitleColor: __props.slotsAssets.prizesTitleColor,
        prizesCardBorderColor: __props.slotsAssets.prizesCardBorderColor,
        prizesCardBgColor: __props.slotsAssets.prizesCardBgColor,
        prizesValueColor: __props.slotsAssets.prizesValueColor,
        walletText: __props.slotsAssets.walletText,
        walletColor: __props.slotsAssets.walletColor,
        onSpinComplete: handleSpinComplete,
        onSpin: handleSpin
      }, null, _parent));
      _push(`<div class="hidden absolute bottom-0 left-0 right-0 z-20 border-t-4 px-4 py-4 shadow-2xl" style="${ssrRenderStyle({
        background: "linear-gradient(to top, rgba(101, 67, 33, 0.95), rgba(101, 67, 33, 0.85), transparent)",
        borderColor: "#DAA520",
        boxShadow: "0 -10px 40px rgba(218,165,32,0.4), inset 0 2px 10px rgba(255,255,255,0.1)"
      })}" data-v-721e497f><div class="max-w-4xl mx-auto flex items-center justify-between gap-4" data-v-721e497f><div class="flex flex-col items-center transform transition-all duration-300 hover:scale-110" data-v-721e497f><span class="text-xs sm:text-sm font-bold uppercase tracking-wide" style="${ssrRenderStyle({ color: "#DAA520" })}" data-v-721e497f>Spins</span><span class="text-2xl sm:text-3xl font-black transition-all duration-300" style="${ssrRenderStyle({
        color: __props.slotsAssets.primaryColor,
        textShadow: `0 0 20px ${__props.slotsAssets.primaryColor}, 0 4px 12px ${__props.slotsAssets.primaryColor}60`
      })}" data-v-721e497f>${ssrInterpolate(spinsLeft.value)}</span></div><div class="flex flex-col items-center transform transition-all duration-300 hover:scale-110" data-v-721e497f><span class="text-xs sm:text-sm font-bold uppercase tracking-wide" style="${ssrRenderStyle({ color: "#DAA520" })}" data-v-721e497f>Wins</span><span class="text-2xl sm:text-3xl font-black transition-all duration-300" style="${ssrRenderStyle({
        color: __props.slotsAssets.accentColor,
        textShadow: `0 0 20px ${__props.slotsAssets.accentColor}, 0 4px 12px ${__props.slotsAssets.accentColor}60`
      })}" data-v-721e497f>${ssrInterpolate(winCounter.value)}</span></div><div class="flex flex-col items-center flex-1 relative overflow-hidden rounded-lg p-2 transform transition-all duration-300 hover:scale-105" data-v-721e497f><span class="text-xs sm:text-sm font-bold uppercase tracking-wide" style="${ssrRenderStyle({ color: "#DAA520" })}" data-v-721e497f>Top Prize</span><span class="text-xl sm:text-2xl font-black relative z-10" style="${ssrRenderStyle({
        background: `linear-gradient(135deg, ${__props.slotsAssets.primaryColor}, ${__props.slotsAssets.accentColor}, ${__props.slotsAssets.primaryColor})`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: "shimmer 3s ease-in-out infinite"
      })}" data-v-721e497f> £${ssrInterpolate(jackpot.value.value.toLocaleString())}</span></div><button class="relative flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg" style="${ssrRenderStyle({
        background: `linear-gradient(135deg, ${__props.slotsAssets.primaryColor}30, ${__props.slotsAssets.accentColor}30)`,
        color: __props.slotsAssets.primaryColor,
        border: `2px solid ${__props.slotsAssets.primaryColor}`,
        boxShadow: `0 0 20px ${__props.slotsAssets.primaryColor}40`
      })}" data-v-721e497f>`);
      if (wonPrizes.value.length > 0) {
        _push(`<span class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg" style="${ssrRenderStyle({
          background: `linear-gradient(135deg, ${__props.slotsAssets.accentColor}, ${__props.slotsAssets.primaryColor})`
        })}" data-v-721e497f>${ssrInterpolate(wonPrizes.value.length)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-721e497f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-721e497f></path></svg><span class="text-xs font-black mt-1" data-v-721e497f>PRIZES</span></button></div></div>`);
      _push(ssrRenderComponent(SlotsInventoryModal, {
        modelValue: showInventory.value,
        "onUpdate:modelValue": ($event) => showInventory.value = $event,
        wonPrizes: wonPrizes.value,
        availablePrizes: availablePrizes.value,
        slotsAssets: __props.slotsAssets
      }, null, _parent));
      if (__props.slotsAssets.spinSound) {
        _push(`<audio${ssrRenderAttr("src", __props.slotsAssets.spinSound)} preload="auto" data-v-721e497f></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.slotsAssets.winSound) {
        _push(`<audio${ssrRenderAttr("src", __props.slotsAssets.winSound)} preload="auto" data-v-721e497f></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.slotsAssets.lossSound) {
        _push(`<audio${ssrRenderAttr("src", __props.slotsAssets.lossSound)} preload="auto" data-v-721e497f></audio>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/SlotsGame.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const SlotsGame = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-721e497f"]]);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "SpinGame",
  __ssrInlineRender: true,
  props: {
    demoMode: { type: Boolean },
    previewMode: {},
    spinAssets: {},
    tickets: {},
    playedTickets: {}
  },
  emits: ["ticket-played", "prize-won"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isSpinning = ref(false);
    const isAnimating = ref(false);
    ref(null);
    ref(null);
    const staticSegmentText = ref("TAP TO SPIN");
    const showResult = ref(false);
    const currentTicketNumber = ref("");
    const resultComplete = ref(false);
    const showWinnerCard = ref(false);
    const hideFloatingCard = ref(false);
    const isCardAnimatingToCorner = ref(false);
    const currentPrizeAmount = ref("");
    const segments = [
      { index: 0, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 1, color: "#f3e8ff", text: "WINNER", isWin: true },
      { index: 2, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 3, color: "#f3e8ff", text: "LUCKY", isWin: true },
      { index: 4, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 5, color: "#f3e8ff", text: "WINNER", isWin: true },
      { index: 6, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 7, color: "#f3e8ff", text: "LUCKY", isWin: true },
      { index: 8, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 9, color: "#f3e8ff", text: "WINNER", isWin: true },
      { index: 10, color: "#ffffff", text: "UNLUCKY", isWin: false },
      { index: 11, color: "#ffffff", text: "UNLUCKY", isWin: false }
    ];
    const spinsLeft = computed(() => {
      var _a;
      if (props.demoMode) {
        return 9;
      }
      if (!props.tickets) {
        return 0;
      }
      return props.tickets.length - (((_a = props.playedTickets) == null ? void 0 : _a.length) || 0);
    });
    const canSpin = computed(() => spinsLeft.value > 0 && !isSpinning.value && !isAnimating.value && !showResult.value && resultComplete.value);
    const maskSize = computed(() => props.previewMode === "mobile" ? "70%" : "70%");
    const maskEdge = computed(() => props.previewMode === "mobile" ? "75%" : "75%");
    const isDesktop = computed(() => props.previewMode === "desktop");
    const isMobile = computed(() => props.previewMode === "mobile");
    const getStaticSegmentFill = computed(() => {
      if (showResult.value) {
        if (staticSegmentText.value === "UNLUCKY") {
          return "#ff0000";
        } else if (staticSegmentText.value === "WINNER" || staticSegmentText.value === "LUCKY") {
          return "#00ff00";
        }
      }
      return props.spinAssets.wheelEdgeColor || "#00aeffff";
    });
    const titleStyle = computed(() => ({
      color: props.spinAssets.titleColor,
      textShadow: `0 0 5px ${props.spinAssets.titleColor}, 0 0 10px ${props.spinAssets.titleColor}, 0 0 15px ${props.spinAssets.titleColor}, 0 0 20px ${props.spinAssets.wheelEdgeColor || "#00aeffff"}`
    }));
    const titleClasses = computed(() => {
      const baseClasses = isMobile.value ? "" : "animate-pulse";
      return isDesktop.value ? `${baseClasses} desktop-title` : `${baseClasses} mobile-title`;
    });
    const walletGradient = computed(() => {
      const color = props.spinAssets.walletColor || "#8b5cf6";
      return `linear-gradient(135deg, ${color} 0%, ${color}dd 50%, ${color}bb 100%)`;
    });
    onMounted(() => {
      resultComplete.value = true;
      if (canSpin.value) {
        setTimeout(animateTapToSpin, 200);
      }
    });
    const animateText = () => {
      if (isSpinning.value || isAnimating.value || showResult.value || !canSpin.value || isMobile.value) {
        return;
      }
      const tapToSpinText = document.querySelector(".tap-to-spin-text");
      const tapToSpinLetters = document.querySelectorAll(".tap-to-spin-letter");
      const trianglePointer = document.querySelector(".triangle-pointer");
      const centerHub = document.querySelector('circle[cx="90"], circle[cx="75"]');
      const centerDiamond = document.querySelector('g:has(path[d*="M90 150"], path[d*="M75 125"])');
      if (tapToSpinText || tapToSpinLetters.length > 0) {
        const textElements = tapToSpinText ? [tapToSpinText] : Array.from(tapToSpinLetters);
        const pointerElements = [trianglePointer, centerHub, centerDiamond].filter(Boolean);
        gsapWithCSS.killTweensOf([...textElements, ...pointerElements]);
        gsapWithCSS.fromTo(
          textElements,
          {
            opacity: 0,
            y: 15,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            stagger: 0.1,
            onComplete: () => startPulseAnimation(textElements, pointerElements)
          }
        );
      }
    };
    const startPulseAnimation = (textElements, pointerElements) => {
      if (isMobile.value) {
        return;
      }
      const casinoPulse = () => {
        if (isSpinning.value || isAnimating.value || showResult.value || !canSpin.value) {
          return;
        }
        const tl = gsapWithCSS.timeline();
        tl.to([...textElements, ...pointerElements], {
          scale: 1.2,
          duration: 0.25,
          ease: "power2.out",
          transformOrigin: "center center"
        }).to(
          [...textElements, ...pointerElements],
          {
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
            transformOrigin: "center center"
          },
          "-=0.1"
        );
        setTimeout(() => {
          if (!isSpinning.value && !isAnimating.value && !showResult.value && canSpin.value) {
            casinoPulse();
          }
        }, 2e3);
      };
      setTimeout(casinoPulse, 1e3);
      gsapWithCSS.to(textElements, {
        y: -3,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.1
      });
    };
    const animateTapToSpin = () => {
      if (resultComplete.value && canSpin.value && staticSegmentText.value === "TAP TO SPIN") {
        animateText();
      }
    };
    const generateSvgWheel = () => {
      const segmentCount = segments.length;
      const anglePerSegment = 360 / segmentCount;
      return segments.map((segment, index) => ({
        ...segment,
        startAngle: index * anglePerSegment,
        endAngle: index * anglePerSegment + anglePerSegment,
        centerAngle: index * anglePerSegment + anglePerSegment / 2
      }));
    };
    const createSvgPath = (segment, cx, cy, r2, anglePerSegment) => {
      const deg2rad = (deg) => deg * Math.PI / 180;
      const startRad = deg2rad(segment.startAngle);
      const endRad = deg2rad(segment.endAngle);
      const x1 = cx + r2 * Math.cos(startRad);
      const y1 = cy + r2 * Math.sin(startRad);
      const x2 = cx + r2 * Math.cos(endRad);
      const y2 = cy + r2 * Math.sin(endRad);
      const arcFlag = anglePerSegment <= 180 ? 0 : 1;
      return [`M ${cx},${cy}`, `L ${x1},${y1}`, `A ${r2},${r2} 0 ${arcFlag},1 ${x2},${y2}`, "Z"].join(" ");
    };
    const getSegmentTextPosition = (segment, cx, cy, r2) => {
      const deg2rad = (deg) => deg * Math.PI / 180;
      const centerAngleRad = deg2rad(segment.centerAngle);
      const textRadius = r2 * 0.7;
      return {
        x: cx + textRadius * Math.cos(centerAngleRad),
        y: cy + textRadius * Math.sin(centerAngleRad)
      };
    };
    const createStaticSegmentPath = (cx, cy, r2, anglePerSegment) => {
      const deg2rad = (deg) => deg * Math.PI / 180;
      const extendedRadius = r2 + 3;
      const startAngle = 270 - anglePerSegment / 2;
      const endAngle = 270 + anglePerSegment / 2;
      const startRad = deg2rad(startAngle);
      const endRad = deg2rad(endAngle);
      const x1 = cx + extendedRadius * Math.cos(startRad);
      const y1 = cy + extendedRadius * Math.sin(startRad);
      const x2 = cx + extendedRadius * Math.cos(endRad);
      const y2 = cy + extendedRadius * Math.sin(endRad);
      const arcFlag = anglePerSegment <= 180 ? 0 : 1;
      return [`M ${cx},${cy}`, `L ${x1},${y1}`, `A ${extendedRadius},${extendedRadius} 0 ${arcFlag},1 ${x2},${y2}`, "Z"].join(" ");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "spin-game-wrapper",
        style: {
          backgroundImage: __props.spinAssets.background ? `url(${__props.spinAssets.background})` : "none",
          backgroundColor: __props.spinAssets.background ? "transparent" : "#0a0a1a",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }
      }, _attrs))} data-v-9d548857><div class="flex-1 flex flex-col relative overflow-hidden" data-v-9d548857><div class="flex-1 flex flex-col justify-center items-center relative z-20" style="${ssrRenderStyle({ marginTop: isDesktop.value ? "40px" : "30px" })}" data-v-9d548857><div class="wheel-title mb-4" data-v-9d548857><span class="${ssrRenderClass(titleClasses.value)}" style="${ssrRenderStyle(titleStyle.value)}" data-v-9d548857>${ssrInterpolate(__props.spinAssets.titleText)}</span></div></div><div class="relative w-full h-3/5 overflow-hidden" style="${ssrRenderStyle({ marginTop: isMobile.value ? "80px" : "0" })}" data-v-9d548857><div class="absolute left-1/2 transform -translate-x-1/2 overflow-hidden rounded-full" style="${ssrRenderStyle(`bottom: -70%; width: 180%; height: 160%; mask: radial-gradient(circle at center, white ${maskSize.value}, transparent ${maskEdge.value}); -webkit-mask: radial-gradient(circle at center, white ${maskSize.value}, transparent ${maskEdge.value});`)}" data-v-9d548857>`);
      if (isMobile.value) {
        _push(`<div class="absolute inset-0 rounded-full" style="${ssrRenderStyle(`background: radial-gradient(circle, transparent 35%, ${__props.spinAssets.wheelEdgeColor || "#00aeffff"} 65%, transparent 80%); opacity: 0.5;`)}" data-v-9d548857></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative w-full h-full overflow-hidden rounded-full" data-v-9d548857><div class="relative w-full h-full rounded-full shadow-2xl overflow-hidden" style="${ssrRenderStyle(`transform-origin: 50% 50%; mask: radial-gradient(circle, white ${maskSize.value === "70%" ? "65%" : "45%"}, transparent ${maskSize.value === "70%" ? "70%" : "50%"}); -webkit-mask: radial-gradient(circle, white ${maskSize.value === "70%" ? "65%" : "45%"}, transparent ${maskSize.value === "70%" ? "70%" : "50%"});`)}" data-v-9d548857><svg viewBox="0 0 264 264" class="w-full h-full absolute inset-0 z-10" xmlns="http://www.w3.org/2000/svg" style="${ssrRenderStyle(`mask: radial-gradient(circle, white ${maskSize.value === "70%" ? "65%" : "45%"}, transparent ${maskSize.value === "70%" ? "70%" : "50%"}); -webkit-mask: radial-gradient(circle, white ${maskSize.value === "70%" ? "65%" : "45%"}, transparent ${maskSize.value === "70%" ? "70%" : "50%"});`)}" data-v-9d548857><defs data-v-9d548857><clipPath id="wheelClip" data-v-9d548857><circle cx="132" cy="132" r="120" data-v-9d548857></circle></clipPath>`);
      if (!isMobile.value) {
        _push(`<linearGradient id="neonPurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%" data-v-9d548857><stop offset="0%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#db07f2"}`)}" data-v-9d548857></stop><stop offset="50%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#a855f7"}`)}" data-v-9d548857></stop><stop offset="100%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#7c3aed"}`)}" data-v-9d548857></stop></linearGradient>`);
      } else {
        _push(`<!---->`);
      }
      if (!isMobile.value) {
        _push(`<filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%" data-v-9d548857><feGaussianBlur stdDeviation="3" result="coloredBlur" data-v-9d548857></feGaussianBlur><feMerge data-v-9d548857><feMergeNode in="coloredBlur" data-v-9d548857></feMergeNode><feMergeNode in="SourceGraphic" data-v-9d548857></feMergeNode></feMerge></filter>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<radialGradient id="explosiveRim" data-v-9d548857><stop offset="75%" style="${ssrRenderStyle({ "stop-color": "transparent" })}" data-v-9d548857></stop><stop offset="88%" style="${ssrRenderStyle(isMobile.value ? `stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}; stop-opacity: 0.7` : `stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}; stop-opacity: 0.6`)}" data-v-9d548857></stop><stop offset="95%" style="${ssrRenderStyle(isMobile.value ? `stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}; stop-opacity: 0.9` : "stop-color: #ffffff; stop-opacity: 1")}" data-v-9d548857></stop><stop offset="100%" style="${ssrRenderStyle(isMobile.value ? "stop-color: #ffffff; stop-opacity: 0.8" : "stop-color: #ffffff; stop-opacity: 1")}" data-v-9d548857></stop></radialGradient></defs><g clip-path="url(#wheelClip)" data-v-9d548857><circle cx="132" cy="132" r="120" fill="#ffffff" stroke="none" data-v-9d548857></circle><g class="wheel-segments" data-v-9d548857><!--[-->`);
      ssrRenderList(generateSvgWheel(), (segment) => {
        _push(`<g data-v-9d548857><path${ssrRenderAttr("d", createSvgPath(segment, 132, 132, 120, 360 / segments.length))}${ssrRenderAttr("fill", segment.color)} stroke="#ffffff"${ssrRenderAttr("stroke-width", isDesktop.value ? "2" : "1")} opacity="1" data-v-9d548857></path>`);
        if (segment.isWin) {
          _push(`<g data-v-9d548857>`);
          if (__props.spinAssets.logo) {
            _push(`<g data-v-9d548857><defs data-v-9d548857><clipPath${ssrRenderAttr("id", `logoClip${segment.index}`)} data-v-9d548857><circle${ssrRenderAttr("cx", getSegmentTextPosition(segment, 132, 132, 120).x - 8)}${ssrRenderAttr("cy", getSegmentTextPosition(segment, 132, 132, 120).y)}${ssrRenderAttr("r", isDesktop.value ? "4" : "3")} data-v-9d548857></circle></clipPath></defs><image${ssrRenderAttr("x", getSegmentTextPosition(segment, 132, 132, 120).x - 12)}${ssrRenderAttr("y", getSegmentTextPosition(segment, 132, 132, 120).y - 4)}${ssrRenderAttr("width", isDesktop.value ? "8" : "6")}${ssrRenderAttr("height", isDesktop.value ? "8" : "6")}${ssrRenderAttr("href", __props.spinAssets.logo)}${ssrRenderAttr("clip-path", `url(#logoClip${segment.index})`)}${ssrRenderAttr("transform", `rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x - 8}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`)} data-v-9d548857></image></g>`);
          } else {
            _push(`<g data-v-9d548857><circle${ssrRenderAttr("cx", getSegmentTextPosition(segment, 132, 132, 120).x - 8)}${ssrRenderAttr("cy", getSegmentTextPosition(segment, 132, 132, 120).y)}${ssrRenderAttr("r", isDesktop.value ? "4" : "3")}${ssrRenderAttr("fill", isMobile.value ? __props.spinAssets.wheelEdgeColor || "#00aeffff" : "url(#neonPurpleGradient)")}${ssrRenderAttr("filter", isMobile.value ? "none" : "url(#neonGlow)")}${ssrRenderAttr("transform", `rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x - 8}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`)} data-v-9d548857></circle><path${ssrRenderAttr("d", `M${getSegmentTextPosition(segment, 132, 132, 120).x - 8} ${getSegmentTextPosition(segment, 132, 132, 120).y - 2}
                                  L${getSegmentTextPosition(segment, 132, 132, 120).x - 6} ${getSegmentTextPosition(segment, 132, 132, 120).y}
                                  L${getSegmentTextPosition(segment, 132, 132, 120).x - 8} ${getSegmentTextPosition(segment, 132, 132, 120).y + 2}
                                  L${getSegmentTextPosition(segment, 132, 132, 120).x - 10} ${getSegmentTextPosition(segment, 132, 132, 120).y} Z`)} fill="#ffffff"${ssrRenderAttr("transform", `rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x - 8}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`)} data-v-9d548857></path></g>`);
          }
          _push(`<text${ssrRenderAttr("x", getSegmentTextPosition(segment, 132, 132, 120).x + 4)}${ssrRenderAttr("y", getSegmentTextPosition(segment, 132, 132, 120).y)} text-anchor="middle" dominant-baseline="central"${ssrRenderAttr("font-size", isDesktop.value ? "7" : "5")} font-family="Arial Black, sans-serif" font-weight="900"${ssrRenderAttr("fill", isMobile.value ? __props.spinAssets.wheelEdgeColor || "#00aeffff" : "url(#neonPurpleGradient)")}${ssrRenderAttr("filter", isMobile.value ? "none" : "url(#neonGlow)")} stroke="#ffffff"${ssrRenderAttr("stroke-width", isDesktop.value ? "0.3" : "0.2")}${ssrRenderAttr("transform", `rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x + 4}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`)} data-v-9d548857>${ssrInterpolate(segment.text)}</text></g>`);
        } else {
          _push(`<g data-v-9d548857><text${ssrRenderAttr("x", getSegmentTextPosition(segment, 132, 132, 120).x)}${ssrRenderAttr("y", getSegmentTextPosition(segment, 132, 132, 120).y)} text-anchor="middle" dominant-baseline="central"${ssrRenderAttr("font-size", isDesktop.value ? "7" : "5")} font-family="Arial, sans-serif" font-weight="400" fill="#9ca3af" stroke="#ffffff"${ssrRenderAttr("stroke-width", isDesktop.value ? "0.2" : "0.1")}${ssrRenderAttr("transform", `rotate(${segment.centerAngle}, ${getSegmentTextPosition(segment, 132, 132, 120).x}, ${getSegmentTextPosition(segment, 132, 132, 120).y})`)} data-v-9d548857>${ssrInterpolate(segment.text)}</text></g>`);
        }
        _push(`</g>`);
      });
      _push(`<!--]--></g><circle cx="132" cy="132" r="120" fill="url(#explosiveRim)" stroke="none" data-v-9d548857></circle></g></svg></div></div><svg viewBox="0 0 264 264" class="w-full h-full absolute inset-0 z-30 rounded-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" data-v-9d548857><defs data-v-9d548857><clipPath id="staticClip" data-v-9d548857><circle cx="132" cy="132" r="125" data-v-9d548857></circle></clipPath></defs><g clip-path="url(#staticClip)" data-v-9d548857><path${ssrRenderAttr("d", createStaticSegmentPath(132, 132, 120, 360 / segments.length))}${ssrRenderAttr("fill", isSpinning.value ? "rgba(255, 255, 255, 0.1)" : getStaticSegmentFill.value)} stroke="#ffffff"${ssrRenderAttr("stroke-width", isSpinning.value ? isDesktop.value ? "4" : "3" : isDesktop.value ? "3" : "2")}${ssrRenderAttr("stroke-opacity", isSpinning.value ? "0.8" : "1")} class="${ssrRenderClass([{
        "clickable-segment": canSpin.value && resultComplete.value,
        "disabled-segment": !canSpin.value || !resultComplete.value || isSpinning.value || isAnimating.value || showResult.value,
        "spinning-fade": isSpinning.value
      }, "static-highlight-segment"])}" style="${ssrRenderStyle({ "pointer-events": "all" })}" data-v-9d548857></path><rect x="102" y="12" width="60" height="60" fill="transparent" class="${ssrRenderClass({ "clickable-overlay": canSpin.value && resultComplete.value && !isSpinning.value && !isAnimating.value && !showResult.value })}" style="${ssrRenderStyle({
        pointerEvents: "all",
        cursor: canSpin.value && resultComplete.value && !isSpinning.value && !isAnimating.value && !showResult.value ? "pointer" : "not-allowed"
      })}" data-v-9d548857></rect><g transform="translate(132, 30)" class="static-text-container" data-v-9d548857>`);
      if (staticSegmentText.value === "TAP TO SPIN") {
        _push(`<text text-anchor="middle" class="tap-to-spin-text" style="${ssrRenderStyle({
          fontSize: isDesktop.value ? "11px" : "9px",
          fontFamily: "Arial Black, sans-serif",
          fontWeight: 900,
          perspective: "100px"
        })}" fill="#ffffff" transform="rotate(-8)" data-v-9d548857><tspan x="0" dy="2" class="tap-to-spin-letter tap-to-line" data-v-9d548857>TAP TO</tspan><tspan x="0" dy="10" class="tap-to-spin-letter spin-word-main" data-v-9d548857>SPIN</tspan></text>`);
      } else if (staticSegmentText.value === "NO SPINS") {
        _push(`<text text-anchor="middle" style="${ssrRenderStyle({
          fontSize: isDesktop.value ? "9px" : "7px",
          fontFamily: "Arial Black, sans-serif",
          fontWeight: 900
        })}" fill="#ff6b6b" data-v-9d548857><tspan x="0" dy="0" data-v-9d548857>NO</tspan><tspan x="0" dy="10" data-v-9d548857>SPINS</tspan><tspan x="0" dy="20" data-v-9d548857>LEFT</tspan></text>`);
      } else if (staticSegmentText.value && showResult.value) {
        _push(`<text text-anchor="middle" class="${ssrRenderClass([[staticSegmentText.value === "WINNER" || staticSegmentText.value === "LUCKY" ? "winner-text" : staticSegmentText.value === "UNLUCKY" ? "unlucky-text" : "", showResult.value ? "result-reveal" : ""], "result-text"])}" style="${ssrRenderStyle({
          fontSize: isDesktop.value ? "9px" : "7px",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold"
        })}" fill="#ffffff" data-v-9d548857><tspan x="0" dy="6" data-v-9d548857>${ssrInterpolate(staticSegmentText.value)}</tspan>`);
        if (currentTicketNumber.value) {
          _push(`<tspan x="0" dy="12" style="${ssrRenderStyle({ fontSize: isDesktop.value ? "7px" : "5px" })}" class="ticket-number" data-v-9d548857>${ssrInterpolate(currentTicketNumber.value)}</tspan>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</text>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</g></g></svg><div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40" data-v-9d548857><div class="flex flex-col items-center pointer-container" data-v-9d548857><svg${ssrRenderAttr("width", isDesktop.value ? "180" : "150")}${ssrRenderAttr("height", isDesktop.value ? "288" : "240")}${ssrRenderAttr("viewBox", isDesktop.value ? "0 0 180 288" : "0 0 150 240")} class="${ssrRenderClass(isMobile.value ? "" : "drop-shadow-2xl filter brightness-125")}" data-v-9d548857><defs data-v-9d548857>`);
      if (isDesktop.value) {
        _push(`<linearGradient id="ultimateTriangle" x1="0%" y1="0%" x2="0%" y2="100%" data-v-9d548857><stop offset="0%" style="${ssrRenderStyle({ "stop-color": "#ffffff", "stop-opacity": "1" })}" data-v-9d548857></stop><stop offset="10%" style="${ssrRenderStyle({ "stop-color": "#ffff00", "stop-opacity": "1" })}" data-v-9d548857></stop><stop offset="30%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}; stop-opacity: 1`)}" data-v-9d548857></stop><stop offset="60%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}; stop-opacity: 1`)}" data-v-9d548857></stop><stop offset="100%" style="${ssrRenderStyle({ "stop-color": "#000000", "stop-opacity": "1" })}" data-v-9d548857></stop></linearGradient>`);
      } else {
        _push(`<linearGradient id="ultimateTriangle" x1="0%" y1="0%" x2="0%" y2="100%" data-v-9d548857><stop offset="0%" style="${ssrRenderStyle({ "stop-color": "#ffffff" })}" data-v-9d548857></stop><stop offset="50%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-9d548857></stop><stop offset="100%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-9d548857></stop></linearGradient>`);
      }
      if (isDesktop.value) {
        _push(`<radialGradient id="ultimateCircle" data-v-9d548857><stop offset="0%" style="${ssrRenderStyle({ "stop-color": "#ffffff" })}" data-v-9d548857></stop><stop offset="20%" style="${ssrRenderStyle({ "stop-color": "#ffff00" })}" data-v-9d548857></stop><stop offset="50%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-9d548857></stop><stop offset="80%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-9d548857></stop><stop offset="100%" style="${ssrRenderStyle({ "stop-color": "#000000" })}" data-v-9d548857></stop></radialGradient>`);
      } else {
        _push(`<radialGradient id="ultimateCircle" data-v-9d548857><stop offset="0%" style="${ssrRenderStyle({ "stop-color": "#ffffff" })}" data-v-9d548857></stop><stop offset="50%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-9d548857></stop><stop offset="100%" style="${ssrRenderStyle(`stop-color: ${__props.spinAssets.wheelEdgeColor || "#00aeffff"}`)}" data-v-9d548857></stop></radialGradient>`);
      }
      if (!isMobile.value) {
        _push(`<filter id="ultimateShadow" x="-50%" y="-50%" width="200%" height="200%" data-v-9d548857><feDropShadow${ssrRenderAttr("dx", isDesktop.value ? "8" : "2")}${ssrRenderAttr("dy", isDesktop.value ? "10" : "3")}${ssrRenderAttr("stdDeviation", isDesktop.value ? "15" : "4")} flood-color="#000000"${ssrRenderAttr("flood-opacity", isDesktop.value ? "0.9" : "0.5")} data-v-9d548857></feDropShadow></filter>`);
      } else {
        _push(`<!---->`);
      }
      if (isDesktop.value) {
        _push(`<filter id="ultimateGlow" x="-100%" y="-100%" width="300%" height="300%" data-v-9d548857><feGaussianBlur stdDeviation="8" result="coloredBlur" data-v-9d548857></feGaussianBlur><feMerge data-v-9d548857><feMergeNode in="coloredBlur" data-v-9d548857></feMergeNode><feMergeNode in="SourceGraphic" data-v-9d548857></feMergeNode></feMerge></filter>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</defs><path${ssrRenderAttr("d", isDesktop.value ? "M90 -12 Q74 50 55 108 Q82 96 90 100 Q98 96 125 108 Q106 50 90 -12 Z" : "M75 -10 Q62 42 46 90 Q68 80 75 83 Q82 80 104 90 Q88 42 75 -10 Z")} fill="url(#ultimateTriangle)" stroke="#000000"${ssrRenderAttr("stroke-width", isDesktop.value ? "4" : "2")} stroke-linejoin="round" stroke-linecap="round"${ssrRenderAttr("filter", isMobile.value ? "none" : "url(#ultimateShadow)")}${ssrRenderAttr("transform", isDesktop.value ? "translate(0, 42)" : "translate(0, 35)")} class="triangle-pointer" data-v-9d548857></path><circle${ssrRenderAttr("cx", isDesktop.value ? "90" : "75")}${ssrRenderAttr("cy", isDesktop.value ? "168" : "140")}${ssrRenderAttr("r", isDesktop.value ? "48" : "40")} fill="url(#ultimateCircle)" stroke="#000000"${ssrRenderAttr("stroke-width", isDesktop.value ? "5" : "2")}${ssrRenderAttr("filter", isMobile.value ? "none" : "url(#ultimateShadow)")} data-v-9d548857></circle>`);
      if (isDesktop.value) {
        _push(`<circle${ssrRenderAttr("cx", 90)}${ssrRenderAttr("cy", 168)}${ssrRenderAttr("r", 38)} fill="url(#ultimateTriangle)" opacity="0.9" filter="url(#ultimateGlow)" data-v-9d548857></circle>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<g${ssrRenderAttr("filter", isDesktop.value && !isMobile.value ? "url(#ultimateGlow)" : "none")} data-v-9d548857><path${ssrRenderAttr("d", isDesktop.value ? "M90 150 L106 168 L90 186 L74 168 Z" : "M75 125 L88 140 L75 155 L62 140 Z")} fill="#ffffff" opacity="1" data-v-9d548857></path><path${ssrRenderAttr("d", isDesktop.value ? "M90 156 L100 168 L90 180 L80 168 Z" : "M75 130 L83 140 L75 150 L67 140 Z")} fill="#ffff00" opacity="0.9" data-v-9d548857></path><circle${ssrRenderAttr("cx", isDesktop.value ? "90" : "75")}${ssrRenderAttr("cy", isDesktop.value ? "168" : "140")}${ssrRenderAttr("r", isDesktop.value ? "4" : "3")}${ssrRenderAttr("fill", __props.spinAssets.wheelEdgeColor || "#00aeffff")} data-v-9d548857></circle></g>`);
      if (!isMobile.value) {
        _push(`<g class="static-sparkles" data-v-9d548857><circle${ssrRenderAttr("cx", isDesktop.value ? "48" : "40")}${ssrRenderAttr("cy", isDesktop.value ? "144" : "120")}${ssrRenderAttr("r", isDesktop.value ? "4" : "3")} fill="#ffff00" opacity="0.6" data-v-9d548857></circle><circle${ssrRenderAttr("cx", isDesktop.value ? "132" : "110")}${ssrRenderAttr("cy", isDesktop.value ? "150" : "125")}${ssrRenderAttr("r", isDesktop.value ? "3" : "2")}${ssrRenderAttr("fill", __props.spinAssets.wheelEdgeColor || "#00aeffff")} opacity="0.5" data-v-9d548857></circle><circle${ssrRenderAttr("cx", isDesktop.value ? "54" : "45")}${ssrRenderAttr("cy", isDesktop.value ? "186" : "155")}${ssrRenderAttr("r", isDesktop.value ? "4" : "3.5")} fill="#ffffff" opacity="0.7" data-v-9d548857></circle><circle${ssrRenderAttr("cx", isDesktop.value ? "126" : "105")}${ssrRenderAttr("cy", isDesktop.value ? "180" : "150")}${ssrRenderAttr("r", isDesktop.value ? "3" : "2.5")} fill="#00ff88" opacity="0.4" data-v-9d548857></circle></g>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</svg></div></div></div></div>`);
      if (__props.spinAssets.walletText && !hideFloatingCard.value) {
        _push(`<div class="${ssrRenderClass([{ "floating-wallet-demo": __props.demoMode }, "floating-wallet-container"])}" data-v-9d548857><div class="floating-credit-card" data-v-9d548857><div class="credit-card-3d" data-v-9d548857><div class="credit-card-front" data-v-9d548857><div class="card-gradient" style="${ssrRenderStyle({ background: walletGradient.value })}" data-v-9d548857><div class="card-header-section" data-v-9d548857><div class="brand-title" data-v-9d548857><p class="brand-text" data-v-9d548857>${ssrInterpolate(__props.spinAssets.walletText)}</p></div><div class="card-chip" data-v-9d548857></div></div><div class="card-body" data-v-9d548857><p class="prize-message" data-v-9d548857>SPIN TO WIN</p></div><div class="card-footer" data-v-9d548857><span class="card-number" data-v-9d548857>**** **** **** ****</span></div><div class="card-shine-effect" data-v-9d548857></div></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showWinnerCard.value) {
        _push(`<div class="${ssrRenderClass([{ "winner-card-demo": __props.demoMode }, "winner-card-overlay"])}" data-v-9d548857><div class="${ssrRenderClass([{
          "slide-to-corner": isCardAnimatingToCorner.value && !isMobile.value,
          "slide-to-corner-mobile": isCardAnimatingToCorner.value && isMobile.value
        }, "winner-card-container"])}" data-v-9d548857><div class="winner-card" data-v-9d548857><div class="card-inner" data-v-9d548857><div class="card-front" data-v-9d548857><div class="card-content" style="${ssrRenderStyle({ background: walletGradient.value })}" data-v-9d548857><div class="card-header" data-v-9d548857><div class="brand-section" data-v-9d548857><p class="brand-text" data-v-9d548857>${ssrInterpolate(__props.spinAssets.walletText || "WINNER")}</p></div><div class="card-chip" data-v-9d548857></div></div><div class="prize-section" data-v-9d548857><p class="prize-amount" data-v-9d548857>${ssrInterpolate(currentPrizeAmount.value)}</p></div><div class="card-footer" data-v-9d548857><span class="card-number" data-v-9d548857>**** **** **** ****</span></div><div class="card-shine-effect" data-v-9d548857></div></div></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/SpinGame.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const SpinGame = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__scopeId", "data-v-9d548857"]]);
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "ScratchGame",
  __ssrInlineRender: true,
  props: {
    demoMode: { type: Boolean, default: false },
    previewMode: { default: "desktop" },
    scratchAssets: { default: () => ({
      background: "",
      overlay: "",
      header: "",
      textColour: "#FFFFFF",
      wonTextColour: "#00FF00",
      loseTextColour: "#FF4444",
      accentColour: "#FFD700"
    }) },
    tickets: { default: () => [] }
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g;
    const props = __props;
    const isMobile = computed(() => props.previewMode === "mobile");
    const scratchOverlay = ref(((_a = props.scratchAssets) == null ? void 0 : _a.overlay) || "");
    const textColour = ref(((_b = props.scratchAssets) == null ? void 0 : _b.textColour) || "#FFFFFF");
    const wonTextColour = ref(((_c = props.scratchAssets) == null ? void 0 : _c.wonTextColour) || "#00FF00");
    const loseTextColour = ref(((_d = props.scratchAssets) == null ? void 0 : _d.loseTextColour) || "#FF4444");
    const accentColour = ref(((_e = props.scratchAssets) == null ? void 0 : _e.accentColour) || "#FFD700");
    const backgroundImage = ref(((_f = props.scratchAssets) == null ? void 0 : _f.background) || "");
    const headerImage = ref(((_g = props.scratchAssets) == null ? void 0 : _g.header) || "");
    watch(
      () => props.scratchAssets,
      (newVal) => {
        if (newVal) {
          scratchOverlay.value = newVal.overlay || "";
          textColour.value = newVal.textColour || "#FFFFFF";
          wonTextColour.value = newVal.wonTextColour || "#00FF00";
          loseTextColour.value = newVal.loseTextColour || "#FF4444";
          accentColour.value = newVal.accentColour || "#FFD700";
          backgroundImage.value = newVal.background || "";
          headerImage.value = newVal.header || "";
        }
      },
      { deep: true }
    );
    const ticketsData = ref([]);
    const isRevealing = ref(false);
    const ticketsGrid = ref(null);
    const demoTickets = computed(() => {
      if (props.tickets && props.tickets.length > 0) {
        return props.tickets;
      }
      const demoPrizes = ["£50 WINNER!", "NO WIN", "£100 PRIZE!", "NO WIN", "£25 BONUS!", "NO WIN"];
      return demoPrizes.map((prize, i2) => ({
        id: i2,
        number: (i2 + 1).toString(),
        instant_win: { prize }
      }));
    });
    function createTicketElement(id, prize) {
      var _a2, _b2;
      const wrapper = document.createElement("div");
      wrapper.className = "scratch-card-wrapper";
      const container = document.createElement("div");
      container.className = "scratch-card-container";
      const prizeContent = document.createElement("div");
      const prizeTextColour = prize.text !== "NO WIN" ? wonTextColour.value : loseTextColour.value;
      const glowEffect = `0px 0px 8px ${accentColour.value}, 0 0 20px ${accentColour.value}`;
      prizeContent.className = "scratch-card-prize";
      prizeContent.style.color = prizeTextColour;
      prizeContent.style.textShadow = glowEffect;
      prizeContent.style.opacity = "0";
      prizeContent.style.visibility = "hidden";
      const ticketNumber = ((_a2 = demoTickets.value[id]) == null ? void 0 : _a2.number) || (id + 1).toString();
      const prizeString = prize.text.replace("<br>", " ");
      prizeContent.innerHTML = `
        <span class="ticket-number">#${ticketNumber}</span>
        <span class="prize-text" style="text-shadow: ${glowEffect}">${prizeString}</span>`;
      const canvas = document.createElement("canvas");
      canvas.className = "scratch-canvas";
      container.appendChild(prizeContent);
      container.appendChild(canvas);
      wrapper.appendChild(container);
      (_b2 = ticketsGrid.value) == null ? void 0 : _b2.appendChild(wrapper);
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const ticketState = {
        id,
        prize,
        isScratched: false,
        isRevealed: false,
        canvas,
        ctx,
        wrapper,
        prizeContent,
        container
      };
      requestAnimationFrame(() => {
        initCanvas(ticketState);
      });
      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;
      let checkProgressRAF = null;
      function getCoords(e2) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        let clientX, clientY;
        if (e2 instanceof MouseEvent) {
          clientX = e2.clientX;
          clientY = e2.clientY;
        } else if (e2 instanceof TouchEvent && e2.touches.length > 0) {
          clientX = e2.touches[0].clientX;
          clientY = e2.touches[0].clientY;
        } else {
          clientX = 0;
          clientY = 0;
        }
        return [(clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY];
      }
      function checkScratchProgress() {
        if (ticketState.isRevealed || !ctx || !canvas) {
          return;
        }
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let transparentPixels = 0;
        for (let i2 = 3; i2 < pixels.length; i2 += 4) {
          if (pixels[i2] === 0) {
            transparentPixels++;
          }
        }
        const scratchedArea = transparentPixels / (pixels.length / 4);
        if (scratchedArea > 0.5) {
          revealTicket(ticketState);
        }
      }
      function scratchOnWindow(e2) {
        if (!isDrawing || ticketState.isRevealed || !ctx || !canvas) {
          return;
        }
        e2.preventDefault();
        const [currentX, currentY] = getCoords(e2);
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = canvas.width * 0.2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
        lastX = currentX;
        lastY = currentY;
        if (checkProgressRAF) {
          cancelAnimationFrame(checkProgressRAF);
        }
        checkProgressRAF = requestAnimationFrame(checkScratchProgress);
      }
      function endScratchOnWindow() {
        if (!isDrawing) {
          return;
        }
        isDrawing = false;
        if (container) {
          container.style.cursor = "grab";
        }
        window.removeEventListener("mousemove", scratchOnWindow);
        window.removeEventListener("mouseup", endScratchOnWindow);
        window.removeEventListener("touchmove", scratchOnWindow);
        window.removeEventListener("touchend", endScratchOnWindow);
        window.removeEventListener("touchcancel", endScratchOnWindow);
        if (checkProgressRAF) {
          cancelAnimationFrame(checkProgressRAF);
        }
        checkScratchProgress();
      }
      function startScratch(e2) {
        if (ticketState.isRevealed) {
          return;
        }
        e2.preventDefault();
        isDrawing = true;
        if (container) {
          container.style.cursor = "grabbing";
        }
        [lastX, lastY] = getCoords(e2);
        window.addEventListener("mousemove", scratchOnWindow);
        window.addEventListener("mouseup", endScratchOnWindow);
        window.addEventListener("touchmove", scratchOnWindow, { passive: false });
        window.addEventListener("touchend", endScratchOnWindow);
        window.addEventListener("touchcancel", endScratchOnWindow);
      }
      canvas.addEventListener("mousedown", startScratch);
      canvas.addEventListener("touchstart", startScratch, { passive: false });
      return ticketState;
    }
    function initCanvas(ticket) {
      if (!ticket.canvas || !ticket.ctx || !ticket.prizeContent) {
        return;
      }
      const { canvas, ctx, prizeContent } = ticket;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      ctx.fillStyle = "#666666";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = textColour.value;
      ctx.font = `900 ${canvas.width / 3}px Inter, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText((ticket.id + 1).toString(), canvas.width / 2, canvas.height / 2);
      if (scratchOverlay.value) {
        const overlayImage = new Image();
        overlayImage.crossOrigin = "anonymous";
        overlayImage.src = scratchOverlay.value;
        overlayImage.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.globalCompositeOperation = "source-over";
          ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);
          ctx.fillStyle = textColour.value;
          ctx.font = `900 ${canvas.width / 3}px Inter, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText((ticket.id + 1).toString(), canvas.width / 2, canvas.height / 2);
          prizeContent.style.opacity = "1";
          prizeContent.style.visibility = "visible";
        };
        overlayImage.onerror = () => {
          drawFallbackOverlay(ctx, canvas, ticket.id, prizeContent);
        };
        setTimeout(() => {
          if (prizeContent.style.opacity === "0") {
            drawFallbackOverlay(ctx, canvas, ticket.id, prizeContent);
          }
        }, 3e3);
      } else {
        drawFallbackOverlay(ctx, canvas, ticket.id, prizeContent);
      }
    }
    function drawFallbackOverlay(ctx, canvas, ticketId, prizeContent) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#4B5563");
      gradient.addColorStop(0.5, "#6B7280");
      gradient.addColorStop(1, "#4B5563");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.width * 0.3, 0);
      ctx.lineTo(0, canvas.height * 0.3);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = textColour.value;
      ctx.font = `900 ${canvas.width / 3}px Inter, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText((ticketId + 1).toString(), canvas.width / 2, canvas.height / 2);
      prizeContent.style.opacity = "1";
      prizeContent.style.visibility = "visible";
    }
    function setupGame() {
      isRevealing.value = false;
      ticketsData.value = [];
      if (ticketsGrid.value) {
        ticketsGrid.value.innerHTML = "";
      }
      const tickets = demoTickets.value;
      const mappedTickets = tickets.map(
        (ticket, index) => {
          var _a2;
          return createTicketElement(index, {
            text: ((_a2 = ticket.instant_win) == null ? void 0 : _a2.prize) ?? "NO WIN"
          });
        }
      );
      ticketsData.value = mappedTickets;
    }
    function revealTicket(ticket, _instant) {
      if (ticket.isRevealed) {
        return;
      }
      ticket.isRevealed = true;
      if (!ticket.canvas) {
        return;
      }
      ticket.canvas.style.transition = "opacity 0.5s";
      ticket.canvas.style.opacity = "0";
      setTimeout(() => {
        if (ticket.canvas && ticket.canvas.parentNode) {
          ticket.canvas.parentNode.removeChild(ticket.canvas);
        }
      }, 500);
      if (!ticket.isScratched) {
        ticket.isScratched = true;
      }
    }
    const gameKey = computed(() => {
      return `${scratchOverlay.value}-${textColour.value}-${wonTextColour.value}-${loseTextColour.value}-${accentColour.value}`;
    });
    watch(gameKey, () => {
      setupGame();
    });
    onMounted(() => {
      setupGame();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "scratch-game-container",
        style: {
          backgroundImage: backgroundImage.value ? `url(${backgroundImage.value})` : "none",
          backgroundColor: backgroundImage.value ? "transparent" : "#1a1a2e"
        }
      }, _attrs))} data-v-b780eac5><div class="scratch-game-content" data-v-b780eac5>`);
      if (headerImage.value) {
        _push(`<img${ssrRenderAttr("src", headerImage.value)} alt="Scratch Game" class="scratch-header-image" data-v-b780eac5>`);
      } else {
        _push(`<h2 class="scratch-title" style="${ssrRenderStyle({ color: accentColour.value, textShadow: `0 0 20px ${accentColour.value}80` })}" data-v-b780eac5> 🎫 Scratch to Win! 🎫 </h2>`);
      }
      _push(`<p class="scratch-subtitle" data-v-b780eac5>Scratch off 50% to reveal your prize</p><div class="${ssrRenderClass(["scratch-grid", { "scratch-grid-mobile": isMobile.value }])}" data-v-b780eac5></div><div class="scratch-controls" data-v-b780eac5><button${ssrIncludeBooleanAttr(isRevealing.value) ? " disabled" : ""} class="scratch-btn reveal-btn" style="${ssrRenderStyle({
        background: `linear-gradient(135deg, ${accentColour.value}, ${accentColour.value}aa)`,
        boxShadow: `0 4px 15px ${accentColour.value}40`
      })}" data-v-b780eac5>${ssrInterpolate(isRevealing.value ? "Revealing..." : "Reveal All")}</button><button${ssrIncludeBooleanAttr(isRevealing.value) ? " disabled" : ""} class="scratch-btn reset-btn" data-v-b780eac5> Reset </button></div></div></div>`);
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/ScratchGame.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const ScratchGame = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-b780eac5"]]);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "BingoGame",
  __ssrInlineRender: true,
  props: {
    assets: {},
    prizes: {},
    tickets: {},
    demoMode: { type: Boolean, default: false },
    previewMode: { default: "mobile" }
  },
  emits: ["ticket-played"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const WINNING_PATTERNS = [
      [0, 1, 2],
      // 0: Top row
      [3, 4, 5],
      // 1: Middle row
      [6, 7, 8],
      // 2: Bottom row
      [0, 3, 6],
      // 3: Left column
      [1, 4, 7],
      // 4: Middle column
      [2, 5, 8],
      // 5: Right column
      [0, 4, 8],
      // 6: Diagonal TL-BR
      [2, 4, 6],
      // 7: Diagonal TR-BL
      [0, 2, 4, 6, 8],
      // 8: Cross Pattern (5 squares)
      [0, 1, 2, 3, 4, 5, 6, 7, 8]
      // 9: Full House (all 9)
    ];
    const cards = ref([]);
    const totalWinnings = ref(0);
    const totalPrizes = ref(0);
    const showPopup = ref(false);
    const popupPrize = ref(null);
    ref(/* @__PURE__ */ new Set());
    const modalContentRef = ref(null);
    const colors = computed(() => ({
      bgStart: props.assets.bgStart || "#1e3a8a",
      bgEnd: props.assets.bgEnd || "#1e40af",
      frameColor: props.assets.frameColor || "#3b82f6",
      frameGlow: props.assets.frameGlow || "#60a5fa",
      squareBg: props.assets.squareBg || "#374151",
      squareText: props.assets.squareText || "#e5e7eb",
      diamond1: props.assets.diamond1 || "#06b6d4",
      diamond2: props.assets.diamond2 || "#67e8f9",
      winnerGlow: props.assets.winnerGlow || "#10b981",
      winnerBg: props.assets.winnerBg || "#059669",
      popupStart: props.assets.popupStart || "#10b981",
      popupEnd: props.assets.popupEnd || "#059669"
    }));
    const diamondEmoji = computed(() => props.assets.diamondEmoji || "💎");
    const generateCardNumbers = () => {
      const numbers = [];
      const used = /* @__PURE__ */ new Set();
      while (numbers.length < 9) {
        const num = Math.floor(Math.random() * 90) + 1;
        if (!used.has(num)) {
          used.add(num);
          numbers.push(num);
        }
      }
      return numbers;
    };
    const generateLoserDiamonds = () => {
      const safePatterns = [
        [0, 4, 6],
        [1, 3, 8],
        [2, 4, 7],
        [0, 5, 7],
        [1, 6, 8]
      ];
      for (let attempt = 0; attempt < 100; attempt++) {
        const positions = [];
        while (positions.length < 3) {
          const pos = Math.floor(Math.random() * 9);
          if (!positions.includes(pos)) positions.push(pos);
        }
        const formsLine = WINNING_PATTERNS.some(
          (pattern) => pattern.every((pos) => positions.includes(pos))
        );
        if (!formsLine) return positions;
      }
      return safePatterns[Math.floor(Math.random() * safePatterns.length)];
    };
    const generateWinnerDiamonds = (prizeValue) => {
      let patternIndex = -1;
      if (props.assets.patternRules && props.assets.patternRules.length > 0) {
        for (const rule of props.assets.patternRules) {
          if (prizeValue >= rule.from && prizeValue <= rule.to) {
            patternIndex = rule.pattern;
            break;
          }
        }
      }
      if (patternIndex === -1) {
        patternIndex = Math.floor(Math.random() * WINNING_PATTERNS.length);
      }
      if (patternIndex < 0 || patternIndex >= WINNING_PATTERNS.length) {
        patternIndex = Math.floor(Math.random() * WINNING_PATTERNS.length);
      }
      return [...WINNING_PATTERNS[patternIndex]];
    };
    const initializeCards = () => {
      if (props.demoMode) {
        cards.value = [
          {
            ticket: { id: 1, number: "001", competition_id: 1, instant_win: false },
            numbers: generateCardNumbers(),
            diamondPositions: generateLoserDiamonds(),
            revealed: false,
            isWinner: false,
            prizeValue: 0,
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          },
          {
            ticket: { id: 2, number: "002", competition_id: 1, instant_win: { id: 1, name: "Demo Prize", prize: "£25.00", value: 25, claimed: false, image_path: null, category_id: 1 } },
            numbers: generateCardNumbers(),
            diamondPositions: generateWinnerDiamonds(25),
            revealed: false,
            isWinner: true,
            prizeValue: 25,
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          },
          {
            ticket: { id: 3, number: "003", competition_id: 1, instant_win: false },
            numbers: generateCardNumbers(),
            diamondPositions: generateLoserDiamonds(),
            revealed: false,
            isWinner: false,
            prizeValue: 0,
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          },
          {
            ticket: { id: 4, number: "004", competition_id: 1, instant_win: { id: 2, name: "Big Prize", prize: "£100.00", value: 100, claimed: false, image_path: null, category_id: 2 } },
            numbers: generateCardNumbers(),
            diamondPositions: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            // Full house demo
            revealed: false,
            isWinner: true,
            prizeValue: 100,
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          },
          {
            ticket: { id: 5, number: "005", competition_id: 1, instant_win: false },
            numbers: generateCardNumbers(),
            diamondPositions: generateLoserDiamonds(),
            revealed: false,
            isWinner: false,
            prizeValue: 0,
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          },
          {
            ticket: { id: 6, number: "006", competition_id: 1, instant_win: false },
            numbers: generateCardNumbers(),
            diamondPositions: generateLoserDiamonds(),
            revealed: false,
            isWinner: false,
            prizeValue: 0,
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          }
        ];
      } else {
        cards.value = props.tickets.map((ticket) => {
          const isWinner = ticket.instant_win !== false;
          const prizeValue = isWinner ? Number(ticket.instant_win.value) || 0 : 0;
          return {
            ticket,
            numbers: generateCardNumbers(),
            diamondPositions: isWinner ? generateWinnerDiamonds(prizeValue) : generateLoserDiamonds(),
            revealed: false,
            isWinner,
            prizeValue,
            revealedSquares: /* @__PURE__ */ new Set(),
            animating: false
          };
        });
        cards.value.sort(() => Math.random() - 0.5);
      }
    };
    const isWinningSquare = (card, index) => {
      return card.revealed && card.isWinner && card.diamondPositions.includes(index) && card.revealedSquares.has(index);
    };
    const showDiamond = (card, index) => {
      return card.revealedSquares.has(index) && card.diamondPositions.includes(index);
    };
    onMounted(() => {
      initializeCards();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "modalContentRef",
        ref: modalContentRef,
        class: "bingo-modal-content relative flex flex-col",
        style: {
          background: __props.assets.background ? `url(${__props.assets.background}) center/cover no-repeat` : `linear-gradient(135deg, ${colors.value.bgStart} 0%, ${colors.value.bgEnd} 50%, ${colors.value.bgStart} 100%)`,
          height: "100%",
          padding: __props.demoMode ? "8px" : "20px 10px",
          overflow: "auto"
        }
      }, _attrs))} data-v-1f5cbe26>`);
      if (__props.assets.header) {
        _push(`<div class="text-center mb-4 flex-shrink-0" data-v-1f5cbe26><img${ssrRenderAttr("src", __props.assets.header)} alt="Header" class="${ssrRenderClass([__props.demoMode ? "max-h-[60px] object-contain" : "", "max-w-[280px] mx-auto"])}" data-v-1f5cbe26></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-wrap justify-center gap-2 mb-4 flex-shrink-0" data-v-1f5cbe26><div class="${ssrRenderClass([__props.demoMode ? "text-sm" : "text-lg", "total-winnings-display px-4 py-2 rounded-full backdrop-blur-md text-white font-bold"])}" style="${ssrRenderStyle({
        background: "rgba(0, 0, 0, 0.5)",
        border: "2px solid rgba(255, 255, 255, 0.3)"
      })}" data-v-1f5cbe26> Total Winnings: £${ssrInterpolate(totalWinnings.value.toFixed(2))}</div>`);
      if (totalPrizes.value > 0) {
        _push(`<div class="${ssrRenderClass([__props.demoMode ? "text-sm" : "text-lg", "px-4 py-2 rounded-full backdrop-blur-md text-white font-bold"])}" style="${ssrRenderStyle({
          background: "rgba(0, 0, 0, 0.5)",
          border: "2px solid rgba(255, 255, 255, 0.3)"
        })}" data-v-1f5cbe26> Prizes: ${ssrInterpolate(totalPrizes.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bingo-grid grid grid-cols-3 gap-1.5 w-full mx-auto" data-v-1f5cbe26><!--[-->`);
      ssrRenderList(cards.value, (card, cardIndex) => {
        _push(`<div${ssrRenderAttr("data-card-index", cardIndex)} class="bingo-card relative rounded-lg overflow-hidden" style="${ssrRenderStyle({
          border: `2px solid ${colors.value.frameColor}`,
          boxShadow: `0 0 6px ${colors.value.frameGlow}40`,
          background: colors.value.squareBg
        })}" data-v-1f5cbe26><div class="bingo-caption text-center py-0.5 px-1 font-bold text-[10px] leading-tight" style="${ssrRenderStyle({
          background: card.revealed ? card.isWinner ? `linear-gradient(145deg, ${colors.value.winnerGlow}, ${colors.value.winnerBg})` : `linear-gradient(145deg, ${colors.value.bgEnd}, ${colors.value.bgStart})` : `linear-gradient(145deg, ${colors.value.bgEnd}, ${colors.value.bgStart})`,
          color: colors.value.squareText,
          borderBottom: `1px solid ${colors.value.frameColor}`,
          height: "28px"
        })}" data-v-1f5cbe26>`);
        if (card.revealed && card.isWinner) {
          _push(`<!--[--><div class="text-[9px]" data-v-1f5cbe26>WIN!</div><div data-v-1f5cbe26>£${ssrInterpolate(Number(card.prizeValue).toFixed(0))}</div><!--]-->`);
        } else {
          _push(`<div class="pt-0.5" data-v-1f5cbe26>#${ssrInterpolate(card.ticket.number)}</div>`);
        }
        _push(`</div><div class="relative p-1" data-v-1f5cbe26><div class="grid grid-cols-3 gap-0.5" data-v-1f5cbe26><!--[-->`);
        ssrRenderList(card.numbers, (num, idx) => {
          _push(`<div class="bingo-square bingo-square-tall flex items-center justify-center rounded font-bold text-xs md:text-sm" style="${ssrRenderStyle({
            background: showDiamond(card, idx) ? isWinningSquare(card, idx) ? `linear-gradient(145deg, ${colors.value.winnerGlow}, ${colors.value.winnerBg})` : `linear-gradient(145deg, ${colors.value.diamond1}, ${colors.value.diamond2})` : colors.value.squareBg,
            color: showDiamond(card, idx) ? "#fff" : colors.value.squareText,
            border: `1px solid ${colors.value.frameColor}40`
          })}" data-v-1f5cbe26>`);
          if (showDiamond(card, idx)) {
            _push(`<span class="diamond-emoji text-sm md:text-base" data-v-1f5cbe26>${ssrInterpolate(diamondEmoji.value)}</span>`);
          } else if (card.revealed) {
            _push(`<span data-v-1f5cbe26>${ssrInterpolate(num)}</span>`);
          } else {
            _push(`<span data-v-1f5cbe26>${ssrInterpolate(num)}</span>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
        if (card.revealed && card.isWinner && card.diamondPositions.length === 9 && card.revealedSquares.size === 9) {
          _push(`<div class="absolute inset-0.5 flex flex-col items-center justify-center rounded pointer-events-none" style="${ssrRenderStyle({ "background": "rgba(0,0,0,0.85)", "z-index": "10" })}" data-v-1f5cbe26><span class="text-yellow-400 font-black text-sm md:text-xl drop-shadow-lg animate-pulse" data-v-1f5cbe26>FULL HOUSE!</span><span class="text-white font-semibold text-xs md:text-base" data-v-1f5cbe26>£${ssrInterpolate(Number(card.prizeValue).toFixed(2))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (!card.revealed && __props.assets.cardCover) {
          _push(`<div class="bingo-cover-overlay absolute inset-0 cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center rounded-lg z-20" style="${ssrRenderStyle({
            background: `url(${__props.assets.cardCover}) center/cover no-repeat`
          })}" data-v-1f5cbe26><span class="sr-only" data-v-1f5cbe26>Tap to reveal</span></div>`);
        } else if (!card.revealed) {
          _push(`<div class="bingo-cover-overlay absolute left-0 right-0 bottom-0 cursor-pointer flex items-center justify-center text-white font-bold text-[10px] z-20" style="${ssrRenderStyle([{ "top": "28px" }, {
            background: `linear-gradient(145deg, ${colors.value.bgStart}, ${colors.value.bgEnd})`
          }])}" data-v-1f5cbe26><span class="tap-text" data-v-1f5cbe26>TAP TO REVEAL</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showPopup.value && popupPrize.value) {
          _push2(`<div class="fixed inset-0 flex items-center justify-center z-[100000] pointer-events-none" data-v-1f5cbe26><div class="win-popup-content text-center p-8 rounded-2xl shadow-2xl" style="${ssrRenderStyle({
            background: `linear-gradient(135deg, ${colors.value.popupStart}, ${colors.value.popupEnd})`,
            boxShadow: `0 10px 40px rgba(0,0,0,0.3), 0 0 80px ${colors.value.popupStart}80`,
            border: "3px solid rgba(255,255,255,0.3)"
          })}" data-v-1f5cbe26><div class="text-white text-2xl font-black tracking-wider mb-2" data-v-1f5cbe26>${ssrInterpolate(popupPrize.value.isFullHouse ? "FULL HOUSE!" : "YOU WON!")}</div><div class="text-5xl font-black prize-amount" data-v-1f5cbe26> £${ssrInterpolate(popupPrize.value.value.toFixed(2))}</div><div class="sparkle-container absolute inset-0 pointer-events-none overflow-hidden" data-v-1f5cbe26><!--[-->`);
          ssrRenderList(6, (i2) => {
            _push2(`<div class="sparkle" style="${ssrRenderStyle({ "--delay": `${i2 * 0.1}s`, "--angle": `${i2 * 60}deg` })}" data-v-1f5cbe26></div>`);
          });
          _push2(`<!--]--></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/BingoGame.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const BingoGame = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__scopeId", "data-v-1f5cbe26"]]);
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "CoinDropInventoryModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    wonPrizes: { default: () => [
      {
        id: 1,
        name: "Gold Coin",
        image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">🪙</text></svg>')}`,
        value: 500,
        won: true,
        ticketNumber: "CD-0042"
      },
      {
        id: 2,
        name: "Diamond Drop",
        image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">💎</text></svg>')}`,
        value: 1e3,
        won: true,
        ticketNumber: "CD-0137"
      },
      {
        id: 3,
        name: "Money Bag",
        image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">💰</text></svg>')}`,
        value: 750,
        won: true,
        ticketNumber: "CD-0289"
      }
    ] },
    availablePrizes: { default: () => [
      {
        id: 102,
        name: "Diamond Drop",
        image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">💎</text></svg>')}`,
        value: 1e3
      },
      {
        id: 103,
        name: "Lucky Seven",
        image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">7️⃣</text></svg>')}`,
        value: 777
      },
      {
        id: 104,
        name: "Money Bag",
        image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">💰</text></svg>')}`,
        value: 500
      },
      {
        id: 105,
        name: "Gold Coin",
        image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">🪙</text></svg>')}`,
        value: 500
      },
      {
        id: 106,
        name: "Golden Bell",
        image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">🔔</text></svg>')}`,
        value: 300
      },
      {
        id: 107,
        name: "Star Prize",
        image: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="60">⭐</text></svg>')}`,
        value: 250
      }
    ] },
    coinDropAssets: { default: () => ({
      inventoryEmoji: "🪙",
      prizesModalBgColor: "#1a1a2e",
      prizesTitleColor: "#ffd700",
      prizesCardBorderColor: "#ffd700",
      prizesCardBgColor: "#16213e",
      prizesValueColor: "#00ff88",
      primaryColor: "#e94560",
      accentColor: "#ffd700",
      winBucketColor: "#00ff88"
    }) }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const totalWonValue = computed(() => {
      return props.wonPrizes.reduce((sum, prize) => sum + prize.value, 0);
    });
    computed(() => {
      return `£${totalWonValue.value.toLocaleString()}`;
    });
    const modalBgColor = computed(() => props.coinDropAssets.prizesModalBgColor || "#1a1a2e");
    const titleColor = computed(() => props.coinDropAssets.prizesTitleColor || "#ffd700");
    const cardBorderColor = computed(() => props.coinDropAssets.prizesCardBorderColor || "#ffd700");
    const cardBgColor = computed(() => props.coinDropAssets.prizesCardBgColor || "#16213e");
    const valueColor = computed(() => props.coinDropAssets.prizesValueColor || "#00ff88");
    computed(() => props.coinDropAssets.primaryColor || "#e94560");
    const accentColor = computed(() => props.coinDropAssets.accentColor || "#ffd700");
    const emoji = computed(() => props.coinDropAssets.inventoryEmoji || "🪙");
    const containerStyle = computed(() => ({
      background: modalBgColor.value,
      borderColor: cardBorderColor.value,
      boxShadow: `0 0 40px ${cardBorderColor.value}4D`
    }));
    const titleDividerStyle = computed(() => ({
      background: `linear-gradient(to right, transparent, ${cardBorderColor.value}80, transparent)`
    }));
    const titleTextStyle = computed(() => ({
      color: titleColor.value,
      fontFamily: "Impact, sans-serif",
      textShadow: `0 0 10px ${titleColor.value}`
    }));
    const prizeCardStyle = computed(() => ({
      background: cardBgColor.value,
      borderColor: cardBorderColor.value
    }));
    const valueTextStyle = computed(() => ({
      color: valueColor.value,
      fontFamily: "Impact, sans-serif",
      textShadow: `0 0 8px ${valueColor.value}`
    }));
    const contentStyle = computed(() => ({
      backgroundColor: modalBgColor.value
    }));
    const headerStyle = computed(() => ({
      background: `linear-gradient(to right, ${cardBorderColor.value}40, ${modalBgColor.value}40, ${cardBorderColor.value}40)`,
      borderColor: `${cardBorderColor.value}30`
    }));
    const footerStyle = computed(() => ({
      background: `linear-gradient(to right, ${cardBorderColor.value}40, ${modalBgColor.value}40, ${cardBorderColor.value}40)`,
      borderColor: `${cardBorderColor.value}30`
    }));
    const scanningLineStyle = computed(() => ({
      background: `linear-gradient(to right, transparent, ${cardBorderColor.value}, transparent)`
    }));
    computed(() => ({
      filter: `drop-shadow(0 0 8px ${accentColor.value}) drop-shadow(0 0 15px ${accentColor.value}80)`
    }));
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="fixed inset-0 z-[80] flex items-center justify-center p-4" style="${ssrRenderStyle({ backgroundColor: `${modalBgColor.value}33` })}" data-v-e9709567><div class="relative w-full max-w-4xl max-h-[90vh] rounded-xl border-2 shadow-2xl overflow-hidden" style="${ssrRenderStyle(containerStyle.value)}" data-v-e9709567><div class="absolute top-0 left-0 right-0 h-px animate-scan-horizontal" style="${ssrRenderStyle(scanningLineStyle.value)}" data-v-e9709567></div><div class="relative border-b-2 px-6 py-4" style="${ssrRenderStyle(headerStyle.value)}" data-v-e9709567><div class="flex items-center justify-between" data-v-e9709567><div class="flex items-center gap-3" data-v-e9709567><div class="text-3xl animate-pulse" data-v-e9709567>${ssrInterpolate(emoji.value)}</div><div data-v-e9709567><h2 class="text-2xl font-black uppercase tracking-wider" style="${ssrRenderStyle({
            color: titleColor.value,
            fontFamily: "Impact, sans-serif",
            textShadow: `0 0 15px ${titleColor.value}, 2px 2px 0 ${modalBgColor.value}`
          })}" data-v-e9709567> PRIZE INVENTORY </h2><p class="text-xs uppercase tracking-widest" style="${ssrRenderStyle({
            color: titleColor.value,
            fontFamily: "Courier New, monospace",
            textShadow: `0 0 5px ${titleColor.value}`
          })}" data-v-e9709567> YOUR WINS &amp; AVAILABLE PRIZES </p></div></div><button class="rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 border-2 group" style="${ssrRenderStyle({
            backgroundColor: `${cardBgColor.value}80`,
            borderColor: `${cardBorderColor.value}30`,
            color: titleColor.value
          })}" aria-label="Close inventory" data-v-e9709567><span class="text-xl group-hover:rotate-90 transition-transform duration-300" data-v-e9709567>✕</span></button></div></div><div class="relative overflow-y-auto max-h-[calc(90vh-200px)] px-6 py-4 custom-scrollbar" style="${ssrRenderStyle(contentStyle.value)}" data-v-e9709567><div class="${ssrRenderClass(__props.wonPrizes.length > 0 ? "" : "mt-0")}" data-v-e9709567><div class="flex items-center gap-2 mb-3" data-v-e9709567><div class="h-px flex-1" style="${ssrRenderStyle(titleDividerStyle.value)}" data-v-e9709567></div><h3 class="text-lg font-black uppercase tracking-wider flex items-center gap-2" style="${ssrRenderStyle(titleTextStyle.value)}" data-v-e9709567><span class="text-2xl" data-v-e9709567>${ssrInterpolate(emoji.value)}</span> AVAILABLE PRIZES (${ssrInterpolate(__props.availablePrizes.length)}) <span class="text-2xl" data-v-e9709567>${ssrInterpolate(emoji.value)}</span></h3><div class="h-px flex-1" style="${ssrRenderStyle(titleDividerStyle.value)}" data-v-e9709567></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-e9709567><!--[-->`);
          ssrRenderList(__props.availablePrizes, (prize) => {
            _push2(`<div class="group relative border-2 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300" style="${ssrRenderStyle(prizeCardStyle.value)}" data-v-e9709567><div class="relative h-40 overflow-hidden" style="${ssrRenderStyle({ backgroundColor: `${cardBgColor.value}66` })}" data-v-e9709567>`);
            if (prize.image) {
              _push2(`<img${ssrRenderAttr("src", prize.image)}${ssrRenderAttr("alt", prize.name)} class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" data-v-e9709567>`);
            } else {
              _push2(`<div class="w-full h-full flex items-center justify-center" style="${ssrRenderStyle({
                background: `linear-gradient(to bottom right, ${cardBgColor.value}, ${cardBgColor.value}DD)`
              })}" data-v-e9709567><span class="text-xs font-bold uppercase text-center px-2" style="${ssrRenderStyle({ color: "#FFFFFF" })}" data-v-e9709567>${ssrInterpolate(prize.name)}</span></div>`);
            }
            _push2(`<div class="absolute inset-0" style="${ssrRenderStyle({
              background: `linear-gradient(to top, ${cardBgColor.value}CC, transparent, transparent)`
            })}" data-v-e9709567></div></div><div class="p-3" data-v-e9709567><h4 class="font-bold text-sm mb-1 line-clamp-2" style="${ssrRenderStyle({ color: "#FFFFFF" })}" data-v-e9709567>${ssrInterpolate(prize.name)}</h4>`);
            if (prize.description) {
              _push2(`<p class="text-xs mb-2 line-clamp-1" style="${ssrRenderStyle({ color: "#FFFFFF99" })}" data-v-e9709567>${ssrInterpolate(prize.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-between" data-v-e9709567><span class="text-xs font-bold uppercase tracking-wider" style="${ssrRenderStyle({
              color: titleColor.value,
              fontFamily: "Courier New, monospace",
              textShadow: `0 0 5px ${titleColor.value}`
            })}" data-v-e9709567> Value </span><span class="font-black text-lg" style="${ssrRenderStyle(valueTextStyle.value)}" data-v-e9709567> £${ssrInterpolate(prize.value.toLocaleString())}</span></div></div><div style="${ssrRenderStyle({
              backgroundColor: `${cardBorderColor.value}00`
            })}" class="${ssrRenderClass([{ "group-hover:bg-opacity-10": true }, "absolute inset-0 transition-all duration-300 pointer-events-none"])}" data-v-e9709567></div></div>`);
          });
          _push2(`<!--]--></div></div></div><div class="relative border-t-2 px-6 py-3" style="${ssrRenderStyle(footerStyle.value)}" data-v-e9709567><div class="flex items-center justify-between" data-v-e9709567><p class="text-xs uppercase tracking-widest" style="${ssrRenderStyle({
            color: titleColor.value,
            fontFamily: "Courier New, monospace",
            textShadow: `0 0 5px ${titleColor.value}`
          })}" data-v-e9709567>${ssrInterpolate(emoji.value)} KEEP DROPPING TO WIN MORE PRIZES! </p><button class="px-4 py-2 font-bold text-sm uppercase tracking-wider rounded border-2 transition-all duration-300 shadow-lg" style="${ssrRenderStyle({
            background: `linear-gradient(to right, ${cardBorderColor.value}, ${cardBorderColor.value}DD)`,
            color: "#FFFFFF",
            borderColor: `${cardBorderColor.value}80`,
            fontFamily: "Impact, sans-serif",
            boxShadow: `0 0 15px ${cardBorderColor.value}66`
          })}" data-v-e9709567> CLOSE </button></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/CoinDropInventoryModal.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const CoinDropInventoryModal = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__scopeId", "data-v-e9709567"]]);
const GRAVITY = 0.15;
const FRICTION = 0.995;
const BOUNCE = 0.45;
const PEG_RADIUS = 4.5;
const MIN_BOUNCE_VELOCITY = 0.8;
const TERMINAL_VELOCITY = 5;
const PEG_SOUND_COOLDOWN = 100;
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "CoinDropGame",
  __ssrInlineRender: true,
  props: {
    demoMode: { type: Boolean },
    previewMode: {},
    coinDropAssets: {},
    tickets: {},
    playedTickets: {},
    instant_win_categories: {},
    animateTitle: { type: Boolean },
    showGameBoard: { type: Boolean }
  },
  emits: ["ticket-played", "prize-won"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const canvasRef = ref(null);
    const containerRef = ref(null);
    const isDropping = ref(false);
    const winCounter = ref(0);
    const showWinReveal = ref(false);
    const currentWinningPrize = ref(null);
    const lastWin = ref(0);
    const gameInitialized = ref(false);
    const hasClickedDrop = ref(false);
    ref(null);
    const winSound = ref(null);
    const lossSound = ref(null);
    const ballImageLoaded = ref(null);
    const winBucketImageLoaded = ref(null);
    const loseBucketImageLoaded = ref(null);
    const tubeImageLoaded = ref(null);
    let pegs = [];
    let balls = [];
    let buckets = [];
    let particles = [];
    let animationFrameId = null;
    let ctx = null;
    let canvasWidth = 420;
    let canvasHeight = 620;
    const dropsLeft = computed(() => {
      var _a;
      if (props.demoMode) {
        return 10;
      }
      if (!props.tickets) {
        return 0;
      }
      return props.tickets.length - (((_a = props.playedTickets) == null ? void 0 : _a.length) || 0);
    });
    const canDrop = computed(() => dropsLeft.value > 0);
    const isMobile = computed(() => props.previewMode === "mobile");
    const topPrize = computed(() => {
      if (!props.instant_win_categories || props.instant_win_categories.length === 0) {
        return null;
      }
      return props.instant_win_categories.reduce((max, cat) => cat.value > ((max == null ? void 0 : max.value) || 0) ? cat : max, props.instant_win_categories[0]);
    });
    const showInventory = ref(false);
    const showPrizesModal = ref(false);
    const showRevealWinsModal = ref(false);
    function initPegs() {
      pegs = [];
      const isSmallMobile = isMobile.value && canvasWidth <= 365;
      const startY = isSmallMobile ? 50 : 70;
      const rows = isSmallMobile ? 8 : isMobile.value ? 10 : 14;
      const spacing = isSmallMobile ? 24 : isMobile.value ? 28 : 32;
      const rowSpacing = isSmallMobile ? 32 : isMobile.value ? 40 : 42;
      for (let row = 0; row < rows; row++) {
        const pegsInRow = row + 3;
        const rowWidth = (pegsInRow - 1) * spacing;
        const startX = (canvasWidth - rowWidth) / 2;
        for (let col = 0; col < pegsInRow; col++) {
          pegs.push({
            x: startX + col * spacing,
            y: startY + row * rowSpacing,
            radius: PEG_RADIUS,
            hit: false,
            hitTime: 0
          });
        }
      }
    }
    function initBuckets() {
      buckets = [];
      const numBuckets = 7;
      const bucketWidth = canvasWidth / numBuckets;
      const bucketHeight = isMobile.value ? 40 : 45;
      const bucketY = canvasHeight - bucketHeight - 5;
      for (let i2 = 0; i2 < numBuckets; i2++) {
        const isWin = i2 === 0 || i2 === 6;
        buckets.push({
          x: i2 * bucketWidth,
          y: bucketY,
          width: bucketWidth,
          height: bucketHeight,
          isWin,
          label: isWin ? "WIN" : "",
          color: isWin ? props.coinDropAssets.winBucketColor || "#00ff88" : props.coinDropAssets.loseBucketColor || "#ff4444",
          bounceOffset: 0,
          bounceTime: 0
        });
      }
    }
    function createParticles(x, y2, color, count = 10) {
      for (let i2 = 0; i2 < count; i2++) {
        particles.push({
          x,
          y: y2,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10 - 3,
          radius: Math.random() * 4 + 2,
          color,
          life: 1
        });
      }
    }
    let audioCtx = null;
    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
    }
    let lastPegSoundTime = 0;
    function playPegSound() {
      const now = performance.now();
      if (now - lastPegSoundTime < PEG_SOUND_COOLDOWN) return;
      lastPegSoundTime = now;
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = 800 + Math.random() * 400;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.03);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.03);
    }
    function playWinSound() {
      if (winSound.value && props.coinDropAssets.winSound) {
        winSound.value.currentTime = 0;
        winSound.value.play().catch(() => {
        });
      } else {
        initAudio();
        if (!audioCtx) return;
        const notes = [523, 659, 784, 1047];
        notes.forEach((freq, i2) => {
          setTimeout(() => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = freq;
            osc.type = "sine";
            gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
          }, i2 * 100);
        });
      }
    }
    function playLossSound() {
      if (lossSound.value && props.coinDropAssets.lossSound) {
        lossSound.value.currentTime = 0;
        lossSound.value.play().catch(() => {
        });
      }
    }
    function shadeColor(color, percent) {
      const num = parseInt(color.replace("#", ""), 16);
      const amt = Math.round(2.55 * percent);
      const R2 = Math.max(0, Math.min(255, (num >> 16) + amt));
      const G = Math.max(0, Math.min(255, (num >> 8 & 255) + amt));
      const B = Math.max(0, Math.min(255, (num & 255) + amt));
      return "#" + (16777216 + R2 * 65536 + G * 256 + B).toString(16).slice(1);
    }
    function lightenColor(color, percent) {
      return shadeColor(color, percent);
    }
    function update() {
      var _a;
      const now = Date.now();
      for (let i2 = balls.length - 1; i2 >= 0; i2--) {
        const ball = balls[i2];
        ball.trail.push({ x: ball.x, y: ball.y });
        if (ball.trail.length > 30) ball.trail.shift();
        ball.vy += GRAVITY;
        ball.vx *= FRICTION;
        if (ball.vy > TERMINAL_VELOCITY) ball.vy = TERMINAL_VELOCITY;
        if (ball.lastY === void 0) ball.lastY = ball.y;
        if (ball.stuckFrames === void 0) ball.stuckFrames = 0;
        if (ball.maxYReached === void 0) ball.maxYReached = ball.y;
        const bucketAreaY = canvasHeight - 80;
        if (ball.y > ball.maxYReached) {
          ball.maxYReached = ball.y;
          ball.stuckFrames = 0;
        } else {
          ball.stuckFrames++;
          if (ball.y >= bucketAreaY) {
            if (ball.stuckFrames >= 20) {
              const bucketWidth = canvasWidth / 7;
              const currentBucketIndex = Math.floor(ball.x / bucketWidth);
              const targetBucketCenter = (currentBucketIndex + 0.5) * bucketWidth;
              ball.vx = (targetBucketCenter - ball.x) * 0.3;
              ball.vy = 3;
              ball.stuckFrames = 0;
            }
          } else {
            if (ball.stuckFrames === 30) {
              ball.vy = Math.max(ball.vy, 2);
              ball.vx += (Math.random() - 0.5) * 2;
            }
            if (ball.stuckFrames === 60) {
              ball.vy = 4 + Math.random() * 2;
              ball.vx = (Math.random() - 0.5) * 4;
            }
            if (ball.stuckFrames >= 90) {
              ball.y = ball.maxYReached + 30;
              ball.vy = TERMINAL_VELOCITY;
              ball.vx = (Math.random() - 0.5) * 2;
              ball.stuckFrames = 0;
              ball.maxYReached = ball.y;
            }
          }
        }
        ball.lastY = ball.y;
        const targetBucket = buckets[ball.targetBucketIndex];
        if (targetBucket) {
          const targetX = targetBucket.x + targetBucket.width / 2;
          const dx = targetX - ball.x;
          const progressDown = ball.y / canvasHeight;
          const distanceToTarget = Math.abs(dx);
          const bucketHalfWidth = targetBucket.width / 2;
          if (ball.isWinner) {
            const remainingDrop = 1 - progressDown;
            const framesRemaining = remainingDrop * canvasHeight / TERMINAL_VELOCITY;
            const velocityNeeded = framesRemaining > 0 ? distanceToTarget / framesRemaining : 4;
            ball.vx += Math.sign(dx) * 0.06;
            if (progressDown > 0.3 && distanceToTarget > 100) {
              ball.vx += Math.sign(dx) * 0.05;
            }
            if (progressDown > 0.45 && distanceToTarget > 80) {
              ball.vx += Math.sign(dx) * 0.07;
            }
            if (progressDown > 0.6 && distanceToTarget > 60) {
              ball.vx += Math.sign(dx) * 0.1;
              const targetVx = Math.sign(dx) * Math.min(3.5, velocityNeeded * 0.9);
              ball.vx = ball.vx * 0.6 + targetVx * 0.4;
            }
            if (progressDown > 0.7 && distanceToTarget > bucketHalfWidth) {
              const targetVx = Math.sign(dx) * Math.min(5, velocityNeeded * 1.1);
              ball.vx = ball.vx * 0.2 + targetVx * 0.8;
            }
            if (progressDown > 0.8 && distanceToTarget > bucketHalfWidth * 0.5) {
              ball.vx = Math.sign(dx) * Math.min(6, velocityNeeded * 1.2);
            }
            if (progressDown > 0.9 && distanceToTarget > bucketHalfWidth * 0.3) {
              ball.vx = Math.sign(dx) * Math.min(8, distanceToTarget * 0.12);
            }
          } else {
            const bucket0RightEdge = buckets[0].x + buckets[0].width;
            const bucket6LeftEdge = buckets[6].x;
            const distToLeftWin = ball.x - bucket0RightEdge;
            const distToRightWin = bucket6LeftEdge - ball.x;
            const winBucketSafeZone = 40;
            ball.vx += Math.sign(dx) * 0.025;
            if (distToLeftWin < winBucketSafeZone && distToLeftWin > -30) {
              ball.vx += 0.15;
            }
            if (distToRightWin < winBucketSafeZone && distToRightWin > -30) {
              ball.vx -= 0.15;
            }
            if (progressDown > 0.5 && distanceToTarget > bucketHalfWidth * 0.5) {
              ball.vx += Math.sign(dx) * 0.05;
            }
            if (progressDown > 0.65 && distanceToTarget > bucketHalfWidth * 0.4) {
              ball.vx += Math.sign(dx) * 0.07;
            }
            if (progressDown > 0.8 && distanceToTarget > bucketHalfWidth * 0.3) {
              const nudge = Math.sign(dx) * Math.min(2.5, distanceToTarget * 0.06);
              ball.vx = ball.vx * 0.5 + nudge * 0.5;
            }
            if (progressDown > 0.88) {
              if (distToLeftWin < winBucketSafeZone * 2) {
                ball.vx = Math.max(ball.vx, 2.5);
              }
              if (distToRightWin < winBucketSafeZone * 2) {
                ball.vx = Math.min(ball.vx, -2.5);
              }
            }
          }
        }
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.rotation += ball.vx * 0.1;
        if (ball.x - ball.radius < 5) {
          ball.x = ball.radius + 6;
          ball.vx = Math.abs(ball.vx) * 0.5 + 1;
        }
        if (ball.x + ball.radius > canvasWidth - 5) {
          ball.x = canvasWidth - ball.radius - 6;
          ball.vx = -Math.abs(ball.vx) * 0.5 - 1;
        }
        for (const peg of pegs) {
          const dx = ball.x - peg.x;
          const dy = ball.y - peg.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = ball.radius + peg.radius + 1;
          if (dist < minDist && dist > 0) {
            const angle = Math.atan2(dy, dx);
            ball.x = peg.x + Math.cos(angle) * (minDist + 0.5);
            ball.y = peg.y + Math.sin(angle) * (minDist + 0.5);
            const nx = dx / dist;
            const ny = dy / dist;
            const dot = ball.vx * nx + ball.vy * ny;
            ball.vx = (ball.vx - 2 * dot * nx) * BOUNCE;
            ball.vy = (ball.vy - 2 * dot * ny) * BOUNCE;
            ball.vx += (Math.random() - 0.5) * 0.8;
            if (ball.vy < MIN_BOUNCE_VELOCITY) {
              ball.vy = MIN_BOUNCE_VELOCITY;
            }
            peg.hit = true;
            peg.hitTime = now;
            playPegSound();
            createParticles(peg.x, peg.y, props.coinDropAssets.pegGlowColor || "#e94560", 2);
          }
        }
        const bucketDetectY = isMobile.value ? canvasHeight - 60 : canvasHeight - 70;
        if (ball.y > bucketDetectY) {
          for (let bucketIdx = 0; bucketIdx < buckets.length; bucketIdx++) {
            const bucket = buckets[bucketIdx];
            if (ball.x > bucket.x && ball.x < bucket.x + bucket.width) {
              if (ball.isWinner) {
                winCounter.value++;
                lastWin.value = ((_a = ball.prize) == null ? void 0 : _a.value) || 100;
                currentWinningPrize.value = ball.prize || null;
                showWinReveal.value = true;
                setTimeout(() => {
                  showWinReveal.value = false;
                }, 2500);
                if (ball.prize) {
                  emit("prize-won", ball.prize);
                }
                playWinSound();
                createParticles(ball.x, ball.y, props.coinDropAssets.winBucketColor || "#00ff88", 15);
              } else {
                lastWin.value = 0;
                playLossSound();
                createParticles(ball.x, ball.y, props.coinDropAssets.loseBucketColor || "#ff4444", 10);
              }
              bucket.bounceOffset = -15;
              bucket.bounceTime = now;
              balls.splice(i2, 1);
              break;
            }
          }
        }
        if (ball.y > canvasHeight + 50) {
          balls.splice(i2, 1);
        }
      }
      for (let i2 = particles.length - 1; i2 >= 0; i2--) {
        const p2 = particles[i2];
        p2.x += p2.vx;
        p2.y += p2.vy;
        p2.vy += 0.2;
        p2.life -= 0.08;
        if (p2.life <= 0) {
          particles.splice(i2, 1);
        }
      }
      if (particles.length > 50) {
        particles.splice(0, particles.length - 50);
      }
      for (const peg of pegs) {
        if (peg.hit && now - peg.hitTime > 150) {
          peg.hit = false;
        }
      }
      for (const bucket of buckets) {
        if (bucket.bounceOffset !== 0) {
          const elapsed = now - bucket.bounceTime;
          if (elapsed > 400) {
            bucket.bounceOffset = 0;
          } else {
            bucket.bounceOffset = -20 * Math.cos(elapsed / 400 * Math.PI * 2.5) * Math.exp(-elapsed / 200);
          }
        }
      }
    }
    function draw() {
      if (!ctx) return;
      const pegGlowColor = props.coinDropAssets.pegGlowColor || "#e94560";
      const ballColor = props.coinDropAssets.ballColor || "#ffd700";
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const tubeWidth = tubeImageLoaded.value ? 60 : 40;
      const tubeHeight = tubeImageLoaded.value ? 45 : 30;
      const tubeX = (canvasWidth - tubeWidth) / 2;
      const tubeY = 0;
      if (tubeImageLoaded.value) {
        ctx.drawImage(tubeImageLoaded.value, tubeX, tubeY, tubeWidth, tubeHeight);
      } else {
        ctx.fillStyle = "rgba(80, 80, 100, 0.8)";
        ctx.beginPath();
        ctx.roundRect(tubeX, tubeY, tubeWidth, tubeHeight, [0, 0, 8, 8]);
        ctx.fill();
        ctx.fillStyle = "rgba(120, 120, 140, 0.6)";
        ctx.fillRect(tubeX + 4, tubeY, tubeWidth - 8, 4);
        ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
        ctx.fillRect(tubeX + 8, tubeHeight - 10, tubeWidth - 16, 10);
      }
      for (const bucket of buckets) {
        const bounceY = bucket.y + bucket.bounceOffset;
        const bucketImg = bucket.isWin ? winBucketImageLoaded.value : loseBucketImageLoaded.value;
        if (bucketImg) {
          ctx.drawImage(
            bucketImg,
            bucket.x + 2,
            bounceY,
            bucket.width - 4,
            bucket.height
          );
        } else {
          ctx.fillStyle = bucket.color;
          ctx.fillRect(bucket.x + 1, bounceY, bucket.width - 2, bucket.height);
          ctx.fillStyle = lightenColor(bucket.color, 40);
          ctx.fillRect(bucket.x + 1, bounceY, bucket.width - 2, 4);
          if (bucket.isWin) {
            ctx.fillStyle = "#fff";
            ctx.font = "bold 12px Arial, sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("WIN", bucket.x + bucket.width / 2, bounceY + 35);
          }
        }
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(bucket.x, bounceY, 2, bucket.height);
      }
      const pegBorderColor = props.coinDropAssets.pegColor || "#00ffff";
      const pegCenterColor = "#000000";
      const pegShape = props.coinDropAssets.pegShape || "hexagon";
      for (const peg of pegs) {
        const size = peg.radius * 1.8;
        const isHit = peg.hit;
        const borderColor = isHit ? pegGlowColor : pegBorderColor;
        const lineWidth = isHit ? 3.5 : 3;
        if (isHit) {
          ctx.save();
          ctx.shadowColor = pegGlowColor;
          ctx.shadowBlur = 12;
        }
        ctx.beginPath();
        if (pegShape === "hexagon") {
          for (let i2 = 0; i2 < 6; i2++) {
            const angle = Math.PI / 3 * i2 - Math.PI / 2;
            const x = peg.x + size * Math.cos(angle);
            const y2 = peg.y + size * Math.sin(angle);
            if (i2 === 0) ctx.moveTo(x, y2);
            else ctx.lineTo(x, y2);
          }
          ctx.closePath();
        } else if (pegShape === "circle") {
          ctx.arc(peg.x, peg.y, size, 0, Math.PI * 2);
        } else {
          const halfSize = size * 0.85;
          ctx.rect(peg.x - halfSize, peg.y - halfSize, halfSize * 2, halfSize * 2);
        }
        ctx.fillStyle = borderColor;
        ctx.fill();
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        if (isHit) ctx.restore();
        const innerSize = size * 0.65;
        ctx.beginPath();
        if (pegShape === "hexagon") {
          for (let i2 = 0; i2 < 6; i2++) {
            const angle = Math.PI / 3 * i2 - Math.PI / 2;
            const x = peg.x + innerSize * Math.cos(angle);
            const y2 = peg.y + innerSize * Math.sin(angle);
            if (i2 === 0) ctx.moveTo(x, y2);
            else ctx.lineTo(x, y2);
          }
          ctx.closePath();
        } else if (pegShape === "circle") {
          ctx.arc(peg.x, peg.y, innerSize, 0, Math.PI * 2);
        } else {
          const halfInner = innerSize * 0.85;
          ctx.rect(peg.x - halfInner, peg.y - halfInner, halfInner * 2, halfInner * 2);
        }
        ctx.fillStyle = pegCenterColor;
        ctx.fill();
      }
      const trailColor = props.coinDropAssets.trailColor || props.coinDropAssets.primaryColor || "#e94560";
      for (const ball of balls) {
        for (let i2 = 0; i2 < ball.trail.length; i2 += 2) {
          const t3 = ball.trail[i2];
          const progress = i2 / ball.trail.length;
          const alpha = progress * 0.7;
          const radius = progress * ball.radius * 1.2;
          ctx.beginPath();
          ctx.arc(t3.x, t3.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `${trailColor}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
          ctx.fill();
        }
      }
      for (const ball of balls) {
        ctx.save();
        if (ballImageLoaded.value) {
          ctx.translate(ball.x, ball.y);
          ctx.rotate(ball.rotation);
          const imgSize = ball.radius * 2.2;
          ctx.drawImage(
            ballImageLoaded.value,
            -imgSize / 2,
            -imgSize / 2,
            imgSize,
            imgSize
          );
        } else {
          ctx.beginPath();
          ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
          ctx.fillStyle = ballColor;
          ctx.fill();
          ctx.strokeStyle = shadeColor(ballColor, -30);
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(ball.x - ball.radius * 0.3, ball.y - ball.radius * 0.3, ball.radius * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.6)";
          ctx.fill();
        }
        ctx.restore();
      }
      for (const p2 of particles) {
        ctx.globalAlpha = p2.life;
        ctx.beginPath();
        ctx.arc(p2.x, p2.y, p2.radius, 0, Math.PI * 2);
        ctx.fillStyle = p2.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    function gameLoop() {
      update();
      draw();
      animationFrameId = requestAnimationFrame(gameLoop);
    }
    function initGame() {
      if (!canvasRef.value) return;
      ctx = canvasRef.value.getContext("2d");
      if (!ctx) return;
      const container = containerRef.value;
      if (container) {
        const isSmallMobile = window.innerWidth <= 380;
        const availableHeight = window.innerHeight * (isSmallMobile ? 0.65 : 0.75);
        canvasWidth = Math.min(container.clientWidth - 10, isSmallMobile ? 360 : isMobile.value ? 420 : 520);
        canvasHeight = Math.min(availableHeight, isSmallMobile ? 420 : isMobile.value ? 550 : 700);
        canvasRef.value.width = canvasWidth;
        canvasRef.value.height = canvasHeight;
      }
      initPegs();
      initBuckets();
      gameInitialized.value = true;
      if (animationFrameId === null) {
        gameLoop();
      }
    }
    function loadBallImage(src) {
      if (!src) {
        ballImageLoaded.value = null;
        return;
      }
      const img = new Image();
      img.onload = () => {
        ballImageLoaded.value = img;
      };
      img.onerror = () => {
        ballImageLoaded.value = null;
      };
      img.src = src;
    }
    watch(() => props.coinDropAssets.ballImage, (newVal) => {
      loadBallImage(newVal || "");
    }, { immediate: true });
    function loadBucketImage(src, isWin) {
      if (!src) {
        if (isWin) {
          winBucketImageLoaded.value = null;
        } else {
          loseBucketImageLoaded.value = null;
        }
        return;
      }
      const img = new Image();
      img.onload = () => {
        if (isWin) {
          winBucketImageLoaded.value = img;
        } else {
          loseBucketImageLoaded.value = img;
        }
      };
      img.onerror = () => {
        if (isWin) {
          winBucketImageLoaded.value = null;
        } else {
          loseBucketImageLoaded.value = null;
        }
      };
      img.src = src;
    }
    watch(() => props.coinDropAssets.winBucketImage, (newVal) => {
      loadBucketImage(newVal || "", true);
    }, { immediate: true });
    watch(() => props.coinDropAssets.loseBucketImage, (newVal) => {
      loadBucketImage(newVal || "", false);
    }, { immediate: true });
    function loadTubeImage(src) {
      if (!src) {
        tubeImageLoaded.value = null;
        return;
      }
      const img = new Image();
      img.onload = () => {
        tubeImageLoaded.value = img;
      };
      img.onerror = () => {
        tubeImageLoaded.value = null;
      };
      img.src = src;
    }
    watch(() => props.coinDropAssets.tubeImage, (newVal) => {
      loadTubeImage(newVal || "");
    }, { immediate: true });
    watch(() => props.showGameBoard, (newVal) => {
      if (newVal && !gameInitialized.value) {
        nextTick(() => {
          setTimeout(() => {
            initGame();
          }, 100);
        });
      }
    }, { immediate: true });
    onMounted(() => {
      if (props.showGameBoard) {
        nextTick(() => {
          initGame();
        });
      }
    });
    onUnmounted(() => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "containerRef",
        ref: containerRef,
        class: ["coin-drop-container", { "coin-drop-container-demo": __props.demoMode, "video-intro-active": __props.animateTitle && !__props.showGameBoard }],
        style: __props.coinDropAssets.gameBackground ? { backgroundImage: `url(${__props.coinDropAssets.gameBackground})`, backgroundSize: "cover", backgroundPosition: "center" } : {}
      }, _attrs))} data-v-d0cbb709>`);
      if (!__props.showGameBoard) {
        _push(`<div class="title-floating" data-v-d0cbb709>`);
        if (__props.coinDropAssets.titleImage) {
          _push(`<img${ssrRenderAttr("src", __props.coinDropAssets.titleImage)} alt="Game Title" class="${ssrRenderClass(["title-image", { "title-zoom-animation": __props.animateTitle }])}" data-v-d0cbb709>`);
        } else {
          _push(`<h1 style="${ssrRenderStyle({ color: __props.coinDropAssets.titleColor })}" class="${ssrRenderClass(["title-text", { "title-zoom-animation": __props.animateTitle }])}" data-v-d0cbb709>${ssrInterpolate(__props.coinDropAssets.titleText)}</h1>`);
        }
        _push(`<p class="title-subtitle" style="${ssrRenderStyle({ color: __props.coinDropAssets.accentColor })}" data-v-d0cbb709>Drop the coin to win!</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showGameBoard) {
        _push(`<div class="game-wrapper" style="${ssrRenderStyle({ "--primary-color": __props.coinDropAssets.primaryColor, "--secondary-color": __props.coinDropAssets.secondaryColor, "--accent-color": __props.coinDropAssets.accentColor })}" data-v-d0cbb709>`);
        if (__props.coinDropAssets.machineImage) {
          _push(`<div class="machine-frame" data-v-d0cbb709><img${ssrRenderAttr("src", __props.coinDropAssets.machineImage)} alt="" class="machine-bg" data-v-d0cbb709></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="game-content" data-v-d0cbb709><div class="game-header" data-v-d0cbb709>`);
        if (__props.coinDropAssets.titleImage) {
          _push(`<img${ssrRenderAttr("src", __props.coinDropAssets.titleImage)} alt="Game Title" class="header-title-image" data-v-d0cbb709>`);
        } else {
          _push(`<h2 class="header-title" style="${ssrRenderStyle({ color: __props.coinDropAssets.titleColor })}" data-v-d0cbb709>${ssrInterpolate(__props.coinDropAssets.titleText)}</h2>`);
        }
        _push(`</div><div class="stats-bar" data-v-d0cbb709><div class="stat-item" data-v-d0cbb709><span class="stat-label" data-v-d0cbb709>DROPS</span><span class="stat-value" style="${ssrRenderStyle({ color: __props.coinDropAssets.accentColor })}" data-v-d0cbb709>${ssrInterpolate(dropsLeft.value)}</span></div><div class="stat-item" data-v-d0cbb709><span class="stat-label" data-v-d0cbb709>WINS</span><span class="stat-value stat-wins" style="${ssrRenderStyle({ color: __props.coinDropAssets.winBucketColor })}" data-v-d0cbb709>${ssrInterpolate(winCounter.value)}</span></div><div class="stat-item" data-v-d0cbb709><span class="stat-label" data-v-d0cbb709>LAST WIN</span><span class="stat-value" style="${ssrRenderStyle({ color: __props.coinDropAssets.accentColor })}" data-v-d0cbb709>${ssrInterpolate(lastWin.value > 0 ? `£${lastWin.value}` : "---")}</span></div></div><div class="canvas-container" style="${ssrRenderStyle({ "--board-bg": __props.coinDropAssets.boardBgColor || "#1a1a2e" })}" data-v-d0cbb709>`);
        if (__props.tickets && __props.tickets.length > 0) {
          _push(`<button class="reveal-wins-corner-btn" style="${ssrRenderStyle({ "--btn-accent": __props.coinDropAssets.winBucketColor || "#00ff88" })}" data-v-d0cbb709><span data-v-d0cbb709>REVEAL</span></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="prizes-inventory-btn" style="${ssrRenderStyle({
          "--btn-primary": __props.coinDropAssets.primaryColor || "#e94560",
          "--btn-accent": __props.coinDropAssets.accentColor || "#ffd700",
          "--btn-win": __props.coinDropAssets.winBucketColor || "#00ff88"
        })}" data-v-d0cbb709><span class="prizes-icon" data-v-d0cbb709>🏆</span><span class="prizes-text" data-v-d0cbb709>PRIZES</span></button><canvas class="game-canvas" data-v-d0cbb709></canvas></div><div class="button-container" data-v-d0cbb709>`);
        if (!hasClickedDrop.value && canDrop.value) {
          _push(`<div class="drop-arrow-hint" data-v-d0cbb709><svg viewBox="0 0 24 24" fill="currentColor" class="arrow-icon" data-v-d0cbb709><path d="M12 16l-6-6h12l-6 6z" data-v-d0cbb709></path></svg><span class="arrow-text" data-v-d0cbb709>TAP HERE!</span></div>`);
        } else {
          _push(`<div class="arrow-placeholder" data-v-d0cbb709></div>`);
        }
        _push(`<button${ssrIncludeBooleanAttr(!canDrop.value) ? " disabled" : ""} class="${ssrRenderClass([{ "is-dropping": isDropping.value, "has-image": __props.coinDropAssets.dropButtonImage }, "drop-button"])}" style="${ssrRenderStyle({
          "--btn-color": __props.coinDropAssets.primaryColor,
          "--btn-glow": __props.coinDropAssets.accentColor
        })}" data-v-d0cbb709>`);
        if (__props.coinDropAssets.dropButtonImage) {
          _push(`<img${ssrRenderAttr("src", __props.coinDropAssets.dropButtonImage)} alt="Drop" class="drop-btn-img" data-v-d0cbb709>`);
        } else {
          _push(`<span class="btn-label" data-v-d0cbb709>${ssrInterpolate(isDropping.value ? "DROPPING..." : "DROP COIN")}</span>`);
        }
        _push(`</button>`);
        if (topPrize.value) {
          _push(`<div class="top-prize-display" data-v-d0cbb709><div class="top-prize-label" data-v-d0cbb709>TOP PRIZE</div><div class="top-prize-content" data-v-d0cbb709>`);
          if (topPrize.value.image_path) {
            _push(`<img${ssrRenderAttr("src", topPrize.value.image_path)}${ssrRenderAttr("alt", topPrize.value.name)} class="top-prize-img" data-v-d0cbb709>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="top-prize-info" data-v-d0cbb709><span class="top-prize-name" data-v-d0cbb709>${ssrInterpolate(topPrize.value.name)}</span><span class="top-prize-value" style="${ssrRenderStyle({ color: __props.coinDropAssets.accentColor })}" data-v-d0cbb709>£${ssrInterpolate(topPrize.value.value)}</span></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (__props.coinDropAssets.footerImage) {
          _push(`<div class="machine-footer" data-v-d0cbb709><img${ssrRenderAttr("src", __props.coinDropAssets.footerImage)} alt="" class="footer-bg" data-v-d0cbb709></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showWinReveal.value && currentWinningPrize.value) {
        _push(`<div class="win-toast" style="${ssrRenderStyle({ "--accent": __props.coinDropAssets.accentColor })}" data-v-d0cbb709><div class="win-toast-content" data-v-d0cbb709><div class="win-toast-title" data-v-d0cbb709>WINNER!</div><div class="win-toast-prize" data-v-d0cbb709>${ssrInterpolate(currentWinningPrize.value.name)}</div><div class="win-toast-value" data-v-d0cbb709>£${ssrInterpolate(currentWinningPrize.value.value)}</div></div>`);
        if (currentWinningPrize.value.image) {
          _push(`<img${ssrRenderAttr("src", currentWinningPrize.value.image)}${ssrRenderAttr("alt", currentWinningPrize.value.name)} class="win-toast-img" data-v-d0cbb709>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (showPrizesModal.value) {
        _push(`<div class="prizes-modal-overlay" data-v-d0cbb709><div class="prizes-modal" style="${ssrRenderStyle({ "--modal-accent": __props.coinDropAssets.accentColor, "--modal-primary": __props.coinDropAssets.primaryColor })}" data-v-d0cbb709><button class="prizes-modal-close" data-v-d0cbb709>✕</button><h2 class="prizes-modal-title" data-v-d0cbb709>INSTANT WINS</h2><p class="reveal-wins-subtitle" data-v-d0cbb709>These prizes can be won!</p>`);
        if (__props.instant_win_categories && __props.instant_win_categories.length > 0) {
          _push(`<div class="prizes-grid" data-v-d0cbb709><!--[-->`);
          ssrRenderList(__props.instant_win_categories, (prize) => {
            _push(`<div class="${ssrRenderClass([{ "top-prize-card": topPrize.value && prize.id === topPrize.value.id }, "prize-card"])}" data-v-d0cbb709>`);
            if (topPrize.value && prize.id === topPrize.value.id) {
              _push(`<div class="top-badge" data-v-d0cbb709>TOP PRIZE</div>`);
            } else {
              _push(`<!---->`);
            }
            if (prize.image_path) {
              _push(`<img${ssrRenderAttr("src", prize.image_path)}${ssrRenderAttr("alt", prize.name)} class="prize-card-img" data-v-d0cbb709>`);
            } else {
              _push(`<div class="prize-card-placeholder" data-v-d0cbb709>?</div>`);
            }
            _push(`<div class="prize-card-name" data-v-d0cbb709>${ssrInterpolate(prize.name)}</div><div class="prize-card-value" style="${ssrRenderStyle({ color: __props.coinDropAssets.accentColor })}" data-v-d0cbb709>£${ssrInterpolate(prize.value)}</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="no-tickets-message" data-v-d0cbb709><p data-v-d0cbb709>No instant win prizes available</p></div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showRevealWinsModal.value) {
        _push(`<div class="prizes-modal-overlay" data-v-d0cbb709><div class="prizes-modal reveal-wins-modal" style="${ssrRenderStyle({ "--modal-accent": __props.coinDropAssets.winBucketColor || "#00ff88", "--modal-primary": __props.coinDropAssets.primaryColor })}" data-v-d0cbb709><button class="prizes-modal-close" data-v-d0cbb709>✕</button><h2 class="prizes-modal-title" style="${ssrRenderStyle({ "color": "#00ff88" })}" data-v-d0cbb709>YOUR INSTANT WINS</h2><p class="reveal-wins-subtitle" data-v-d0cbb709>These are the prizes waiting for you!</p>`);
        if (__props.tickets && __props.tickets.length > 0) {
          _push(`<div class="prizes-grid" data-v-d0cbb709><!--[-->`);
          ssrRenderList(__props.tickets, (ticket) => {
            var _a, _b;
            _push(`<div class="${ssrRenderClass([{
              "winner-card": ticket.instant_win !== false && ticket.instant_win && ticket.instant_win.prize !== "NO WIN",
              "played-card": (_a = __props.playedTickets) == null ? void 0 : _a.includes(ticket.id)
            }, "prize-card"])}" data-v-d0cbb709>`);
            if ((_b = __props.playedTickets) == null ? void 0 : _b.includes(ticket.id)) {
              _push(`<div class="played-badge" data-v-d0cbb709>PLAYED</div>`);
            } else {
              _push(`<!---->`);
            }
            if (ticket.instant_win !== false && ticket.instant_win && ticket.instant_win.prize !== "NO WIN") {
              _push(`<!--[--><div class="winner-badge" data-v-d0cbb709>WINNER!</div>`);
              if (ticket.instant_win.image_path) {
                _push(`<img${ssrRenderAttr("src", ticket.instant_win.image_path)}${ssrRenderAttr("alt", ticket.instant_win.prize)} class="prize-card-img" data-v-d0cbb709>`);
              } else {
                _push(`<div class="prize-card-placeholder winner-placeholder" data-v-d0cbb709>WIN</div>`);
              }
              _push(`<div class="prize-card-name" data-v-d0cbb709>${ssrInterpolate(ticket.instant_win.prize)}</div><div class="prize-card-value" style="${ssrRenderStyle({ "color": "#00ff88" })}" data-v-d0cbb709>£${ssrInterpolate(ticket.instant_win.value)}</div><!--]-->`);
            } else {
              _push(`<!--[--><div class="prize-card-placeholder" data-v-d0cbb709>X</div><div class="prize-card-name" style="${ssrRenderStyle({ "opacity": "0.5" })}" data-v-d0cbb709>No Win</div><!--]-->`);
            }
            _push(`<div class="ticket-number" data-v-d0cbb709>Ticket #${ssrInterpolate(ticket.number)}</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="no-tickets-message" data-v-d0cbb709><p data-v-d0cbb709>No tickets available</p></div>`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(CoinDropInventoryModal, {
        modelValue: showInventory.value,
        "onUpdate:modelValue": ($event) => showInventory.value = $event,
        coinDropAssets: __props.coinDropAssets
      }, null, _parent));
      if (__props.coinDropAssets.dropSound) {
        _push(`<audio${ssrRenderAttr("src", __props.coinDropAssets.dropSound)} preload="auto" data-v-d0cbb709></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.coinDropAssets.winSound) {
        _push(`<audio${ssrRenderAttr("src", __props.coinDropAssets.winSound)} preload="auto" data-v-d0cbb709></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.coinDropAssets.lossSound) {
        _push(`<audio${ssrRenderAttr("src", __props.coinDropAssets.lossSound)} preload="auto" data-v-d0cbb709></audio>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/CoinDropGame.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const CoinDropGame = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-d0cbb709"]]);
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "PopGame",
  __ssrInlineRender: true,
  props: {
    popGameAssets: {},
    demoMode: { type: Boolean, default: false },
    previewMode: { default: "mobile" },
    tickets: {},
    playedTickets: { default: () => [] },
    instant_win_categories: {}
  },
  emits: ["ticket-played", "prize-won"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    ref(null);
    ref(null);
    ref(null);
    const popItems = ref([]);
    const totalWins = ref(0);
    const totalPopped = ref(0);
    const confettiParticles = ref([]);
    const showWinToast = ref(false);
    const winToastAmount = ref(0);
    const allPopped = ref(false);
    const demoTickets = computed(() => {
      if (!props.demoMode) return [];
      const tickets = [];
      for (let i2 = 1; i2 <= 30; i2++) {
        const isWinner = i2 % 5 === 0;
        tickets.push({
          id: i2,
          number: `DEMO-${String(i2).padStart(4, "0")}`,
          competition_id: 1,
          instant_win: isWinner ? {
            id: i2,
            name: "Demo Prize",
            prize: `£${(Math.random() * 50 + 5).toFixed(2)}`,
            value: Math.random() * 50 + 5,
            claimed: false,
            image_path: null,
            won_date: null,
            category_id: 1
          } : false
        });
      }
      return tickets;
    });
    const activeTickets = computed(() => {
      return props.demoMode ? demoTickets.value : props.tickets || [];
    });
    const displayedItems = computed(() => popItems.value);
    const itemColors = computed(() => {
      return props.popGameAssets.popItemColors || [
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
      ];
    });
    computed(() => {
      return props.popGameAssets.popConfettiColors || [
        "#FFD700",
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7"
      ];
    });
    const initializeItems = () => {
      var _a;
      const colors = itemColors.value;
      popItems.value = activeTickets.value.map((ticket, index) => {
        var _a2;
        const instantWin = ticket.instant_win;
        const isWinner = instantWin !== false && instantWin.prize !== "NO WIN";
        const prizeValue = isWinner && instantWin ? extractAmount(instantWin.prize) : 0;
        return {
          id: index,
          ticketId: ticket.id,
          ticketNumber: ticket.number,
          color: colors[index % colors.length],
          isWinner,
          prize: isWinner && instantWin ? instantWin.prize : null,
          prizeValue,
          popped: ((_a2 = props.playedTickets) == null ? void 0 : _a2.includes(ticket.id)) || false,
          animating: false,
          floatDelay: Math.random() * 2,
          shakeX: Math.random() * 5 - 2.5,
          shakeY: Math.random() * 5 - 2.5
        };
      });
      popItems.value = shuffleArray([...popItems.value]);
      totalPopped.value = ((_a = props.playedTickets) == null ? void 0 : _a.length) || 0;
      allPopped.value = false;
    };
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i2 = shuffled.length - 1; i2 > 0; i2--) {
        const j2 = Math.floor(Math.random() * (i2 + 1));
        [shuffled[i2], shuffled[j2]] = [shuffled[j2], shuffled[i2]];
      }
      return shuffled;
    };
    const extractAmount = (text) => {
      if (!text) return 0;
      const penceMatch = text.match(/([\d.]+)\s*p\b/i);
      if (penceMatch) {
        return parseFloat(penceMatch[1]) / 100;
      }
      const match = text.match(/[\d.]+/);
      return match ? parseFloat(match[0]) : 0;
    };
    watch(() => activeTickets.value, () => {
      initializeItems();
    }, { immediate: true });
    onMounted(() => {
      initializeItems();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "pop-game-board",
        style: {
          "--bg-color": __props.popGameAssets.popBgColor || "#1a1a2e",
          "--bg-image": __props.popGameAssets.background ? `url(${__props.popGameAssets.background})` : "none",
          "--primary-color": __props.popGameAssets.primaryColor || "#e94560",
          "--accent-color": __props.popGameAssets.accentColor || "#ffd700",
          "--win-color": __props.popGameAssets.popWinColor || "#00ff88",
          "--lose-color": __props.popGameAssets.popLoseColor || "#ff4444"
        }
      }, _attrs))} data-v-1bddc6ee><div class="game-header" data-v-1bddc6ee><div class="stat-card" data-v-1bddc6ee><span class="stat-label" data-v-1bddc6ee>Total Wins</span><span class="stat-value win-value" data-v-1bddc6ee>${ssrInterpolate(totalWins.value.toFixed(2))}</span></div><div class="stat-card" data-v-1bddc6ee><span class="stat-label" data-v-1bddc6ee>Popped</span><span class="stat-value" data-v-1bddc6ee>${ssrInterpolate(totalPopped.value)} / ${ssrInterpolate(popItems.value.length)}</span></div></div><div class="game-grid-container" data-v-1bddc6ee><div class="${ssrRenderClass([{ "mobile-grid": __props.previewMode === "mobile" }, "game-grid"])}" data-v-1bddc6ee><!--[-->`);
      ssrRenderList(displayedItems.value, (item) => {
        _push(`<div class="${ssrRenderClass([{
          "popped": item.popped,
          "animating": item.animating,
          "winner": item.popped && item.isWinner,
          "loser": item.popped && !item.isWinner
        }, "pop-item-container"])}" data-v-1bddc6ee>`);
        if (!item.popped) {
          _push(`<div class="pop-item" style="${ssrRenderStyle({
            "--item-color": item.color,
            "--float-delay": item.floatDelay + "s",
            "--shake-x": item.shakeX + "px",
            "--shake-y": item.shakeY + "px"
          })}" data-v-1bddc6ee>`);
          if (__props.popGameAssets.popItemImage) {
            _push(`<img${ssrRenderAttr("src", __props.popGameAssets.popItemImage)} class="custom-item-image" alt="Pop item" data-v-1bddc6ee>`);
          } else if (__props.popGameAssets.popItemType === "balloon" || !__props.popGameAssets.popItemType) {
            _push(`<svg class="balloon-svg" viewBox="0 0 100 150" xmlns="http://www.w3.org/2000/svg" data-v-1bddc6ee><ellipse cx="50" cy="55" rx="40" ry="50"${ssrRenderAttr("fill", item.color)} class="balloon-body" data-v-1bddc6ee></ellipse><ellipse cx="35" cy="40" rx="12" ry="18" fill="rgba(255,255,255,0.3)" class="balloon-highlight" data-v-1bddc6ee></ellipse><polygon points="45,105 55,105 50,115"${ssrRenderAttr("fill", item.color)} data-v-1bddc6ee></polygon><path d="M50 115 Q45 125 50 135 Q55 145 50 150" stroke="#666" stroke-width="2" fill="none" class="balloon-string" data-v-1bddc6ee></path></svg>`);
          } else if (__props.popGameAssets.popItemType === "bubble") {
            _push(`<svg class="bubble-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" data-v-1bddc6ee><circle cx="50" cy="50" r="45"${ssrRenderAttr("fill", item.color)} fill-opacity="0.4" class="bubble-body" data-v-1bddc6ee></circle><circle cx="50" cy="50" r="45" fill="none"${ssrRenderAttr("stroke", item.color)} stroke-width="3" stroke-opacity="0.6" data-v-1bddc6ee></circle><ellipse cx="35" cy="30" rx="15" ry="20" fill="rgba(255,255,255,0.6)" class="bubble-highlight" data-v-1bddc6ee></ellipse><ellipse cx="65" cy="65" rx="8" ry="12" fill="rgba(255,255,255,0.3)" class="bubble-highlight-small" data-v-1bddc6ee></ellipse></svg>`);
          } else if (__props.popGameAssets.popItemType === "present") {
            _push(`<div class="present-box" style="${ssrRenderStyle({ "--box-color": item.color })}" data-v-1bddc6ee><div class="present-ribbon" data-v-1bddc6ee></div><div class="present-bow" data-v-1bddc6ee></div></div>`);
          } else if (__props.popGameAssets.popItemType === "egg") {
            _push(`<div class="egg" style="${ssrRenderStyle({ background: item.color })}" data-v-1bddc6ee><div class="egg-pattern" data-v-1bddc6ee></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="${ssrRenderClass([{ "is-winner": item.isWinner }, "popped-result"])}" data-v-1bddc6ee><div class="ticket-number" data-v-1bddc6ee>${ssrInterpolate(item.ticketNumber)}</div>`);
          if (item.isWinner && item.prize) {
            _push(`<div class="prize-amount" data-v-1bddc6ee>${ssrInterpolate(item.prize)}</div>`);
          } else {
            _push(`<div class="no-win-text" data-v-1bddc6ee> NO WIN </div>`);
          }
          _push(`</div>`);
        }
        if (item.animating) {
          _push(`<div class="pop-explosion" data-v-1bddc6ee><!--[-->`);
          ssrRenderList(8, (n2) => {
            _push(`<div class="explosion-particle" style="${ssrRenderStyle({
              "--rotation": n2 * 45 + "deg",
              "--color": item.color
            })}" data-v-1bddc6ee></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="confetti-container" data-v-1bddc6ee><!--[-->`);
      ssrRenderList(confettiParticles.value, (particle) => {
        _push(`<div class="confetti-particle" style="${ssrRenderStyle({
          left: particle.x + "%",
          top: particle.y + "%",
          backgroundColor: particle.color,
          transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`
        })}" data-v-1bddc6ee></div>`);
      });
      _push(`<!--]--></div></div><div class="actions" data-v-1bddc6ee>`);
      if (!allPopped.value && displayedItems.value.some((i2) => !i2.popped)) {
        _push(`<button class="pop-all-btn" data-v-1bddc6ee> Pop All </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (allPopped.value) {
        _push(`<div class="all-popped-message" data-v-1bddc6ee><h3 data-v-1bddc6ee>All Done!</h3><p data-v-1bddc6ee>You won a total of <strong data-v-1bddc6ee>${ssrInterpolate(totalWins.value.toFixed(2))}</strong></p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showWinToast.value) {
        _push(`<div class="win-toast" data-v-1bddc6ee><span class="toast-icon" data-v-1bddc6ee>+</span><span class="toast-amount" data-v-1bddc6ee>${ssrInterpolate(winToastAmount.value.toFixed(2))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.popGameAssets.popSound) {
        _push(`<audio${ssrRenderAttr("src", __props.popGameAssets.popSound)} preload="auto" data-v-1bddc6ee></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.popGameAssets.winSound) {
        _push(`<audio${ssrRenderAttr("src", __props.popGameAssets.winSound)} preload="auto" data-v-1bddc6ee></audio>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.popGameAssets.lossSound) {
        _push(`<audio${ssrRenderAttr("src", __props.popGameAssets.lossSound)} preload="auto" data-v-1bddc6ee></audio>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/PopGame.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const BalloonPopGame = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-1bddc6ee"]]);
function createFootballSfx() {
  let ctx = null;
  let master = null;
  let crowd = null;
  function ac() {
    if (typeof window === "undefined") return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 1;
      master.connect(ctx.destination);
    }
    return ctx;
  }
  function resume() {
    try {
      const c2 = ac();
      if (c2 && c2.state === "suspended") void c2.resume();
    } catch {
    }
  }
  function noise(c2, seconds) {
    const len = Math.max(1, Math.floor(c2.sampleRate * seconds));
    const buf = c2.createBuffer(1, len, c2.sampleRate);
    const d2 = buf.getChannelData(0);
    for (let i2 = 0; i2 < len; i2++) d2[i2] = Math.random() * 2 - 1;
    return buf;
  }
  function whistle(vol = 0.45) {
    const c2 = ac();
    if (!c2 || !master) return;
    const t3 = c2.currentTime;
    const o2 = c2.createOscillator();
    o2.type = "triangle";
    o2.frequency.setValueAtTime(2300, t3);
    o2.frequency.linearRampToValueAtTime(2520, t3 + 0.14);
    const lfo = c2.createOscillator();
    lfo.frequency.value = 26;
    const lfoGain = c2.createGain();
    lfoGain.gain.value = 110;
    lfo.connect(lfoGain).connect(o2.frequency);
    const g2 = c2.createGain();
    g2.gain.setValueAtTime(0, t3);
    g2.gain.linearRampToValueAtTime(vol, t3 + 0.02);
    g2.gain.setValueAtTime(vol, t3 + 0.18);
    g2.gain.linearRampToValueAtTime(0, t3 + 0.27);
    o2.connect(g2).connect(master);
    o2.start(t3);
    lfo.start(t3);
    o2.stop(t3 + 0.28);
    lfo.stop(t3 + 0.28);
  }
  function kick(vol = 0.7) {
    const c2 = ac();
    if (!c2 || !master) return;
    const t3 = c2.currentTime;
    const o2 = c2.createOscillator();
    o2.type = "sine";
    o2.frequency.setValueAtTime(190, t3);
    o2.frequency.exponentialRampToValueAtTime(58, t3 + 0.13);
    const g2 = c2.createGain();
    g2.gain.setValueAtTime(vol, t3);
    g2.gain.exponentialRampToValueAtTime(1e-3, t3 + 0.2);
    o2.connect(g2).connect(master);
    o2.start(t3);
    o2.stop(t3 + 0.22);
    const n2 = c2.createBufferSource();
    n2.buffer = noise(c2, 0.05);
    const hp = c2.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 1400;
    const ng = c2.createGain();
    ng.gain.setValueAtTime(vol * 0.5, t3);
    ng.gain.exponentialRampToValueAtTime(1e-3, t3 + 0.05);
    n2.connect(hp).connect(ng).connect(master);
    n2.start(t3);
    n2.stop(t3 + 0.06);
  }
  function cheer(vol = 0.9) {
    const c2 = ac();
    if (!c2 || !master) return;
    const t3 = c2.currentTime;
    const n2 = c2.createBufferSource();
    n2.buffer = noise(c2, 2.4);
    const bp = c2.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 0.7;
    bp.frequency.setValueAtTime(360, t3);
    bp.frequency.linearRampToValueAtTime(1150, t3 + 0.55);
    const g2 = c2.createGain();
    g2.gain.setValueAtTime(0, t3);
    g2.gain.linearRampToValueAtTime(vol, t3 + 0.28);
    g2.gain.setValueAtTime(vol, t3 + 1.2);
    g2.gain.linearRampToValueAtTime(0, t3 + 2.3);
    n2.connect(bp).connect(g2).connect(master);
    n2.start(t3);
    n2.stop(t3 + 2.4);
    const o2 = c2.createOscillator();
    o2.type = "sawtooth";
    o2.frequency.setValueAtTime(170, t3);
    o2.frequency.linearRampToValueAtTime(300, t3 + 0.45);
    const lp = c2.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    const og = c2.createGain();
    og.gain.setValueAtTime(0, t3);
    og.gain.linearRampToValueAtTime(vol * 0.22, t3 + 0.3);
    og.gain.linearRampToValueAtTime(0, t3 + 1.7);
    o2.connect(lp).connect(og).connect(master);
    o2.start(t3);
    o2.stop(t3 + 1.8);
  }
  function save(vol = 0.8) {
    const c2 = ac();
    if (!c2 || !master) return;
    const t3 = c2.currentTime;
    const o2 = c2.createOscillator();
    o2.type = "triangle";
    o2.frequency.setValueAtTime(190, t3);
    o2.frequency.exponentialRampToValueAtTime(60, t3 + 0.1);
    const g2 = c2.createGain();
    g2.gain.setValueAtTime(vol, t3);
    g2.gain.exponentialRampToValueAtTime(1e-3, t3 + 0.16);
    o2.connect(g2).connect(master);
    o2.start(t3);
    o2.stop(t3 + 0.18);
    const ns = c2.createBufferSource();
    ns.buffer = noise(c2, 0.09);
    const bp = c2.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 700;
    bp.Q.value = 1.2;
    const ng = c2.createGain();
    ng.gain.setValueAtTime(vol * 0.6, t3);
    ng.gain.exponentialRampToValueAtTime(1e-3, t3 + 0.1);
    ns.connect(bp).connect(ng).connect(master);
    ns.start(t3);
    ns.stop(t3 + 0.11);
    const gr = c2.createBufferSource();
    gr.buffer = noise(c2, 1);
    const lp2 = c2.createBiquadFilter();
    lp2.type = "lowpass";
    lp2.frequency.value = 650;
    const gg = c2.createGain();
    gg.gain.setValueAtTime(0, t3 + 0.05);
    gg.gain.linearRampToValueAtTime(vol * 0.3, t3 + 0.2);
    gg.gain.linearRampToValueAtTime(0, t3 + 1);
    gr.connect(lp2).connect(gg).connect(master);
    gr.start(t3 + 0.05);
    gr.stop(t3 + 1.05);
  }
  function startCrowd(vol = 0.1) {
    const c2 = ac();
    if (!c2 || !master || crowd) return;
    const src = c2.createBufferSource();
    src.buffer = noise(c2, 4);
    src.loop = true;
    const lp = c2.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 680;
    lp.Q.value = 0.3;
    const g2 = c2.createGain();
    g2.gain.value = 0;
    g2.gain.linearRampToValueAtTime(vol, c2.currentTime + 1.2);
    src.connect(lp).connect(g2).connect(master);
    src.start();
    crowd = { src, gain: g2 };
  }
  function stopCrowd() {
    if (!ctx || !crowd) return;
    try {
      const t3 = ctx.currentTime;
      crowd.gain.gain.cancelScheduledValues(t3);
      crowd.gain.gain.linearRampToValueAtTime(0, t3 + 0.4);
      crowd.src.stop(t3 + 0.5);
    } catch {
    }
    crowd = null;
  }
  function dispose() {
    stopCrowd();
    try {
      void (ctx == null ? void 0 : ctx.close());
    } catch {
    }
    ctx = null;
    master = null;
  }
  return { resume, whistle, kick, cheer, save, startCrowd, stopCrowd, dispose };
}
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "SpriteCharacter",
  __ssrInlineRender: true,
  props: {
    sheet: {},
    frames: { default: 1 },
    frame: { default: 0 },
    flipX: { type: Boolean, default: false },
    chromaKey: { type: Boolean, default: false }
  },
  emits: ["error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const bgSize = computed(() => `${Math.max(1, props.frames) * 100}% 100%`);
    const bgPos = computed(() => {
      const n2 = Math.max(1, props.frames);
      if (n2 <= 1) return "0% 0%";
      const pct = Math.min(props.frame, n2 - 1) / (n2 - 1) * 100;
      return `${pct}% 0%`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: {
          width: "100%",
          height: "100%",
          backgroundImage: `url('${__props.sheet}')`,
          backgroundSize: bgSize.value,
          backgroundPosition: bgPos.value,
          backgroundRepeat: "no-repeat",
          transform: __props.flipX ? "scaleX(-1)" : void 0,
          mixBlendMode: __props.chromaKey ? "screen" : void 0,
          imageRendering: "auto",
          display: "block"
        }
      }, _attrs))}><img${ssrRenderAttr("src", __props.sheet)} style="${ssrRenderStyle({ "display": "none", "width": "0", "height": "0", "position": "absolute" })}" alt=""></div>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/SpriteCharacter.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "FootballModal",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean, default: false },
    demoMode: { type: Boolean, default: false },
    previewMode: { default: "mobile" },
    assets: { default: () => ({}) },
    tickets: { default: () => [] },
    instant_win_categories: { default: () => [] },
    ads: { default: () => [] }
  },
  emits: ["update:modelValue", "wins-collected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const demoPreviewMode = ref("mobile");
    const actualPreviewMode = computed(() => props.demoMode ? demoPreviewMode.value : props.previewMode || "desktop");
    const frameClass = computed(() => props.demoMode ? actualPreviewMode.value === "mobile" ? "is-mobile" : "is-desktop" : "");
    const frameStyle = computed(() => actualPreviewMode.value === "mobile" ? { width: "420px", maxWidth: "100%", height: "650px", border: "1px solid #444", borderRadius: "12px" } : { width: "700px", maxWidth: "100%", height: "650px", border: "1px solid #444", borderRadius: "4px" });
    const a2 = computed(() => props.assets || {});
    const titleText = computed(() => a2.value.titleText || "Step up to the spot");
    const winText = computed(() => a2.value.winText || "GOAL! Back of the net!");
    const loseText = computed(() => a2.value.loseText || "Saved! So close…");
    const ballImage = computed(() => a2.value.ballImage || "");
    const strikerFlag = computed(() => a2.value.strikerFlag || "");
    const keeperFlag = computed(() => a2.value.keeperFlag || "");
    const keeperSheet = computed(() => a2.value.keeperSheet || "/games/football/keeper-default.png?v=12");
    const strikerSheet = computed(() => a2.value.strikerSheet || "/games/football/striker-default.png?v=4");
    const spriteChroma = computed(() => a2.value.spriteChroma === true);
    const keeperSheetOk = ref(true);
    const strikerSheetOk = ref(true);
    const keeperAutoFrames = ref(1);
    const strikerAutoFrames = ref(1);
    function detectFrames(url, target) {
      if (!url || typeof Image === "undefined") {
        target.value = 1;
        return;
      }
      const im = new Image();
      im.onload = () => {
        const ar = im.naturalWidth / Math.max(1, im.naturalHeight);
        target.value = ar < 1.4 ? 1 : Math.max(1, Math.round(ar));
      };
      im.onerror = () => {
        target.value = 1;
      };
      im.src = url;
    }
    watch(() => a2.value.keeperSheet, (u2) => detectFrames(u2 || "", keeperAutoFrames), { immediate: true });
    watch(strikerSheet, (u2) => detectFrames(u2, strikerAutoFrames), { immediate: true });
    const keeperFrames = computed(() => {
      if (!a2.value.keeperSheet) return 5;
      const set = Number(a2.value.keeperFrames) || 0;
      return set > 0 ? set : keeperAutoFrames.value;
    });
    const strikerFrames = computed(() => {
      if (!a2.value.strikerSheet) return 3;
      const set = Number(a2.value.strikerFrames) || 0;
      return set > 0 ? set : strikerAutoFrames.value;
    });
    const keeperImage = computed(() => a2.value.keeperImage || "");
    const strikerImage = computed(() => a2.value.strikerImage || "");
    const kitColor = computed(() => a2.value.primaryColor || "#e11d48");
    const accent = computed(() => a2.value.accentColor || "#22e1b3");
    const keeperKit = computed(() => a2.value.goalColor && a2.value.goalColor !== "#eeeeee" ? a2.value.goalColor : "#f59e0b");
    const textColor = computed(() => a2.value.textColor || "#ffffff");
    const THEMES = {
      // glowA/glowB = the two neon-glow colours (cyan for ball/goal/lines, magenta for keeper/striker);
      // only used when the Neon theme is on, but defined on every theme so the bindings never go empty.
      // Bright sunny afternoon — vivid blue sky, natural green pitch, gentle daytime light.
      classic: { skyTop: "#3f8fd6", skyMid: "#79bef0", skyBot: "#bfe3fb", backdrop: "#1f4f86", standTop: "#275595", standBot: "#5083bd", grassTop: "#3fb866", grassBot: "#207a42", glow: "#ffffff", glowOp: "0.26", line: "#ffffff", glowA: "#ffffff", glowB: "#ffffff" },
      // Floodlit night — deep navy stadium, cooler pitch, bright cold floodlight glow.
      night: { skyTop: "#04061a", skyMid: "#0a1838", skyBot: "#11214a", backdrop: "#080f24", standTop: "#050a1c", standBot: "#131f40", grassTop: "#2aa055", grassBot: "#125a2e", glow: "#cfeaff", glowOp: "0.5", line: "#ffffff", glowA: "#cfeaff", glowB: "#cfeaff" },
      // Retro sepia dusk — warm amber sky, faded olive turf, golden-hour wash.
      retro: { skyTop: "#7c3d0e", skyMid: "#e08a24", skyBot: "#f6cf72", backdrop: "#4a3416", standTop: "#3f2a12", standBot: "#785322", grassTop: "#7d9c38", grassBot: "#4a661f", glow: "#ffb13a", glowOp: "0.42", line: "#fff4dc", glowA: "#ffd27a", glowB: "#ffb13a" },
      // Neon arcade — electric purple stadium, DARK pitch so the glow pops, hot magenta wash. The
      // ball/goal/lines glow cyan and the keeper/striker glow magenta (see glowA/glowB).
      neon: { skyTop: "#16052e", skyMid: "#4a0f86", skyBot: "#8c1fc4", backdrop: "#1d063c", standTop: "#120428", standBot: "#430f7a", grassTop: "#0c5a3c", grassBot: "#04301f", glow: "#ff2fe0", glowOp: "0.6", line: "#bafff4", glowA: "#3df5ff", glowB: "#ff3df0" }
    };
    const pal = computed(() => THEMES[String(a2.value.theme || "classic")] || THEMES.classic);
    const isNeon = computed(() => String(a2.value.theme || "classic") === "neon");
    const introEnabled = computed(() => a2.value.introEnabled !== false);
    const introTitleImage = computed(() => a2.value.introTitleImage || "");
    const introSubtitle = computed(() => a2.value.introSubtitle || "");
    const introButtonText = computed(() => a2.value.introButtonText || "Kick Off ⚽");
    const introVoiceEnabled = computed(() => a2.value.introVoiceEnabled !== false);
    const gameName = computed(() => a2.value.name || "");
    const welcomeMsg = computed(() => (a2.value.introWelcomeText || "Welcome to {name}").replace("{name}", gameName.value || "the Shootout"));
    const showIntro = ref(false);
    const showTopPrize = computed(() => a2.value.showTopPrize !== false);
    const topPrize = computed(() => {
      const list = (props.instant_win_categories || []).filter(
        (c2) => c2 && Number(c2.value) > 0 && (c2.available === void 0 || c2.available > 0)
      );
      if (!list.length) return null;
      const nonBundle = list.filter((c2) => c2.prize_type !== "ticket_bundle");
      const pool = nonBundle.length ? nonBundle : list;
      return pool.reduce((best, c2) => Number(c2.value) > Number(best.value) ? c2 : best);
    });
    const topPrizeLabel = computed(() => {
      const p2 = topPrize.value;
      if (!p2) return "";
      const name = String(p2.name || "").trim();
      const v2 = Number(p2.value);
      if (p2.prize_type === "ticket_bundle") {
        if (!v2 || /ticket/i.test(name)) return name;
        return `${name ? name + " · " : ""}${Math.floor(v2)} Free Ticket${v2 == 1 ? "" : "s"}`;
      }
      const money = v2 ? `£${v2 % 1 === 0 ? v2 : v2.toFixed(2)}` : "";
      return !money || /£\s*\d/.test(name) ? name : `${name} · ${money}`;
    });
    const sfx = createFootballSfx();
    const GOAL = { x1: 300, y1: 120, x2: 700, y2: 330 };
    const SPOT = { x: 545, y: 705 };
    const KEEP = { x: 500, y: 268 };
    const sceneViewBox = computed(() => actualPreviewMode.value === "mobile" ? "0 0 1000 880" : "0 0 1000 600");
    const fans = (() => {
      const out = [];
      const pal2 = ["#2f3a57", "#3b4a6b", "#4a5578", "#586079", "#6b7280", "#8a93a8", "#b9c0d0", "#7a3b46", "#a05a64", "#3b5a7a", "#c9b27a", "#d6dae3"];
      const bright = [accent.value, "#ffd54f", "#ff6fae", "#5b7cff", "#26c6da", "#ffffff"];
      let i2 = 0;
      for (let y2 = 16; y2 <= 116; y2 += 8) {
        const depth = (y2 - 16) / 100;
        for (let x = 6; x < 994; x += 12) {
          const jx = i2 * 13 % 6 - 3;
          const jy = i2 * 7 % 5 - 2;
          const isBright = i2 * 17 % 19 === 0;
          const col = isBright ? bright[i2 * 3 % bright.length] : pal2[i2 * 5 % pal2.length];
          out.push({ x: +(x + jx).toFixed(1), y: +(y2 + jy).toFixed(1), c: col, r: +(1.05 + i2 * 11 % 3 * 0.2 + depth * 0.35).toFixed(2) });
          i2++;
        }
      }
      return out;
    })();
    const flashes = (() => {
      const out = [];
      for (let i2 = 0; i2 < 95; i2++) {
        const mega = i2 % 6 === 0;
        out.push({
          x: +(6 + i2 * 137 % 988).toFixed(1),
          y: +(14 + i2 * 53 % 104).toFixed(1),
          r: +((mega ? 8 : 3.6) + i2 * 7 % 4 * 1.2).toFixed(2),
          delay: -(i2 * 0.37 % 5).toFixed(2),
          dur: (2 + i2 * 0.19 % 2.4).toFixed(2)
        });
      }
      return out;
    })();
    const ads = computed(() => props.ads && props.ads.length ? props.ads.slice(0, 3) : []);
    const adCopies = computed(() => {
      const w2 = ads.value.length * 224;
      return w2 > 0 ? Math.max(2, Math.ceil(1200 / w2) + 1) : 0;
    });
    const adStrip = computed(() => Array.from({ length: adCopies.value }, () => ads.value).flat());
    const adSetWidth = computed(() => ads.value.length * 224);
    const trunc = (s2, n2 = 20) => s2 && s2.length > n2 ? s2.slice(0, n2 - 1) + "…" : s2 || "";
    const adLed = ["#0b3d91", "#9b1c1c", "#0f766e", "#6d28d9", "#b45309", "#1d4ed8", "#be123c"];
    const ledColor = (i2) => adLed[i2 % adLed.length];
    const pens = ref([]);
    const index = ref(0);
    const phase = ref("ready");
    const showPrize = ref(false);
    const aim = ref({ x: 500, y: 210 });
    const shotTarget = ref({ x: 500, y: 210 });
    const shotPower = ref(50);
    const power = ref(0);
    const flash = ref(false);
    const shake = ref(false);
    const roar = ref(false);
    const netHit = ref(false);
    const saved = ref(false);
    const kicked = ref(false);
    const particles = ref([]);
    const wow = ref(false);
    const goalFlashes = (() => {
      const out = [];
      for (let i2 = 0; i2 < 30; i2++) {
        out.push({ x: i2 * 47 % 100, y: i2 * 71 % 98, size: 60 + i2 * 13 % 5 * 16, delay: +(i2 * 0.11 % 1.5).toFixed(2), dur: +(0.7 + i2 * 0.07 % 0.7).toFixed(2) });
      }
      return out;
    })();
    let rafId = 0;
    const isWin = (t3) => !!((t3 == null ? void 0 : t3.instant_win) && t3.instant_win.prize && t3.instant_win.prize !== "NO WIN");
    function categoryFor(iw) {
      const cats = props.instant_win_categories || [];
      if (!iw) return null;
      return (iw.category_id != null ? cats.find((c2) => c2.id === iw.category_id) : null) || cats.find((c2) => c2.name && (c2.name === iw.prize || c2.name === iw.name)) || null;
    }
    function buildPens() {
      pens.value = (props.tickets || []).map((t3) => {
        const iw = t3 == null ? void 0 : t3.instant_win;
        const won = isWin(t3);
        const cat = won ? categoryFor(iw) : null;
        return {
          id: t3.id ?? t3.number,
          number: String(t3.number ?? t3.id ?? ""),
          win: won,
          prize: won ? String(iw.prize) : "",
          value: Number((iw == null ? void 0 : iw.value) || (cat == null ? void 0 : cat.value) || 0),
          image: (iw == null ? void 0 : iw.image_path) || (cat == null ? void 0 : cat.image_path) || "",
          // Ticket bundles carry a ticket count, not a £ value — flagged so the reveal never shows £.
          isBundle: won && ((iw == null ? void 0 : iw.prize_type) ?? (cat == null ? void 0 : cat.prize_type)) === "ticket_bundle"
        };
      });
      index.value = 0;
      resetShot();
    }
    function resetShot() {
      phase.value = "ready";
      showPrize.value = false;
      aim.value = { x: 500, y: 210 };
      shotTarget.value = { x: 500, y: 210 };
      power.value = 0;
      flash.value = shake.value = roar.value = netHit.value = saved.value = kicked.value = false;
      particles.value = [];
    }
    watch(() => props.tickets, buildPens, { immediate: true, deep: true });
    watch(() => props.modelValue, (o2) => {
      if (o2) buildPens();
      else stopPower();
    });
    watch(() => props.modelValue, (o2) => {
      if (o2) {
        showIntro.value = introEnabled.value;
        if (showIntro.value && !props.demoMode) playWelcome();
      } else {
        showIntro.value = false;
        cancelSpeech();
        sfx.stopCrowd();
      }
    }, { immediate: true });
    watch(introEnabled, (on) => {
      if (props.demoMode) {
        showIntro.value = on;
        if (on) playWelcome();
      }
    });
    watch(introTitleImage, () => {
      if (props.demoMode && introEnabled.value) showIntro.value = true;
    });
    const current = computed(() => pens.value[index.value] ?? null);
    const total = computed(() => pens.value.length);
    const scored = computed(() => pens.value.slice(0, phase.value === "done" ? total.value : index.value + (phase.value === "result" ? 1 : 0)).filter((p2) => p2.win).length);
    const wins = computed(() => pens.value.filter((p2) => p2.win));
    const totalWon = computed(() => wins.value.filter((w2) => !w2.isBundle).reduce((sum, w2) => sum + (Number(w2.value) || 0), 0));
    const playedCount = computed(() => phase.value === "done" ? total.value : index.value + (phase.value === "result" ? 1 : 0));
    const playedPens = computed(() => pens.value.slice(0, playedCount.value));
    computed(() => playedPens.value.filter((p2) => p2.win && !p2.isBundle).reduce((sum, p2) => sum + (Number(p2.value) || 0), 0));
    const trackerView = computed(() => playedPens.value.map((p2, gi) => ({ p: p2, gi })).slice(-9));
    const trackLabel = (p2) => {
      if (p2.isBundle && p2.value && !/ticket/i.test(p2.prize)) return `${Math.floor(p2.value)} FT`;
      if (p2.value && !p2.isBundle) return `£${p2.value % 1 === 0 ? p2.value : Number(p2.value).toFixed(2)}`;
      return "WON";
    };
    const prompt = computed(() => {
      var _a;
      return phase.value === "ready" ? titleText.value : phase.value === "aim" ? "Pick your corner 🎯" : phase.value === "power" ? "Time your power…" : phase.value === "shooting" ? "" : ((_a = current.value) == null ? void 0 : _a.win) ? winText.value : loseText.value;
    });
    const currentValueLabel = computed(() => {
      const p2 = current.value;
      const v2 = Number((p2 == null ? void 0 : p2.value) || 0);
      if (!v2) return "";
      if (p2 == null ? void 0 : p2.isBundle) return /ticket/i.test((p2 == null ? void 0 : p2.prize) || "") ? "" : `${Math.floor(v2)} Free Ticket${v2 == 1 ? "" : "s"}`;
      if (/£\s*\d/.test((p2 == null ? void 0 : p2.prize) || "")) return "";
      return `£${v2 % 1 === 0 ? v2 : v2.toFixed(2)}`;
    });
    const hostEnabled = computed(() => a2.value.hostEnabled !== false);
    const hostImage = computed(() => a2.value.hostImage || "/games/football/commentator-default.png?v=1");
    const hostImageOk = ref(true);
    watch(() => a2.value.hostImage, () => {
      hostImageOk.value = true;
    });
    const hostLine = computed(() => {
      var _a;
      if (showIntro.value) return "";
      switch (phase.value) {
        case "ready":
          return index.value === 0 ? "Big moment — step up!" : "Next one… keep your nerve!";
        case "aim":
          return "Pick your corner…";
        case "power":
          return "Time the power just right!";
        case "shooting":
          return "He strikes it…";
        case "result":
          return ((_a = current.value) == null ? void 0 : _a.win) ? "GOAL! Get in there! 🎉" : "Saved! Oh so close!";
        case "done":
          return scored.value > 0 ? `Full time — ${scored.value} in the net!` : "Full time! Unlucky that time.";
        default:
          return "";
      }
    });
    const keepLand = ref({ x: 500, y: 268 });
    const moving = computed(() => phase.value === "shooting" || phase.value === "result");
    const ballTf = computed(() => {
      if (!kicked.value) return `translate(${SPOT.x}px, ${SPOT.y}px) scale(0.66)`;
      const t3 = current.value && !current.value.win ? keepLand.value : shotTarget.value;
      return `translate(${t3.x}px, ${t3.y}px) scale(0.5)`;
    });
    const ballDurMs = computed(() => Math.round(920 - shotPower.value / 100 * 460));
    const ballDur = computed(() => (ballDurMs.value / 1e3).toFixed(2));
    const keepTf = computed(() => {
      if (!kicked.value) return "translate(0px, 0px)";
      const raw = keepLand.value.x - KEEP.x;
      const glove = raw < -25 ? 46 : raw > 25 ? -46 : 0;
      const dx = raw + glove, dy = keepLand.value.y - KEEP.y - 20;
      return `translate(${dx}px, ${dy}px)`;
    });
    const keepShadowTf = computed(() => kicked.value ? `translate(${keepLand.value.x - KEEP.x}px, 0px)` : `translate(${(Math.sin(keeperPhase.value) * 65).toFixed(1)}px, 0px)`);
    const keepArmLTf = computed(() => kicked.value ? "rotate(58deg)" : "");
    const keepArmRTf = computed(() => kicked.value ? "rotate(-58deg)" : "");
    const keeperWalk = ref(0);
    let keeperRaf = 0, keeperT0 = 0;
    const keeperPhase = ref(2.5);
    function keeperLoop(t3) {
      if (!keeperT0) keeperT0 = t3;
      const elapsed = (t3 - keeperT0) / 1e3;
      keeperPhase.value = 2.5 + elapsed * 0.9;
      if (!kicked.value) keeperWalk.value = Math.floor(elapsed * 7);
      keeperRaf = requestAnimationFrame(keeperLoop);
    }
    keeperRaf = requestAnimationFrame(keeperLoop);
    const keeperMovingRight = computed(() => Math.cos(keeperPhase.value) >= 0);
    const keeperShuffleTf = computed(() => kicked.value ? "translate3d(0,0,0)" : `translate3d(${(Math.sin(keeperPhase.value) * 65).toFixed(1)}px,0,0)`);
    const keeperFrame = computed(() => {
      const n2 = Math.max(2, keeperFrames.value);
      if (kicked.value) return n2 - 1;
      return keeperWalk.value % Math.max(1, n2 - 1);
    });
    const keeperFlip = computed(() => kicked.value ? keepLand.value.x - KEEP.x > 25 : keeperMovingRight.value);
    const strikerFrame = computed(() => !moving.value ? 0 : !kicked.value ? Math.min(1, strikerFrames.value - 1) : Math.min(2, strikerFrames.value - 1));
    computed(() => kicked.value ? `translate(${SPOT.x}px, ${SPOT.y}px)` : "");
    const strikerSvgTf = computed(() => moving.value ? "translate(395px, 385px) scale(2.25, 3.2)" : "translate(308px, 502px) scale(1.95, 2.85)");
    const strikerShadowTf = computed(() => moving.value ? "translate(485px, 769px)" : "translate(386px, 844px)");
    function play(u2) {
      if (!u2) return;
      try {
        const x = new Audio(u2);
        x.volume = props.demoMode ? 0.35 : 0.75;
        void x.play().catch(() => {
        });
      } catch {
      }
    }
    function speak(text) {
      try {
        const synth = window.speechSynthesis;
        if (!synth || !text) return;
        synth.cancel();
        const u2 = new SpeechSynthesisUtterance(text);
        u2.rate = 0.98;
        u2.pitch = 1.05;
        u2.volume = props.demoMode ? 0.6 : 0.95;
        synth.speak(u2);
      } catch {
      }
    }
    function cancelSpeech() {
      var _a;
      try {
        (_a = window.speechSynthesis) == null ? void 0 : _a.cancel();
      } catch {
      }
    }
    function playWelcome() {
      if (a2.value.welcomeSound) {
        play(a2.value.welcomeSound);
        return;
      }
      if (introVoiceEnabled.value) speak(welcomeMsg.value);
    }
    function stopPower() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }
    onBeforeUnmount(() => {
      stopPower();
      cancelSpeech();
      sfx.dispose();
      cancelAnimationFrame(keeperRaf);
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.modelValue) {
          _push2(`<div class="${ssrRenderClass([__props.demoMode ? "fbg-demo" : "fbg-fixed", "fbg-root"])}" data-v-0118d44e>`);
          if (__props.demoMode) {
            _push2(`<div class="fbg-demo-bar" data-v-0118d44e><span class="fbg-demo-bar-label" data-v-0118d44e>Preview Mode:</span><button class="${ssrRenderClass([actualPreviewMode.value === "mobile" ? "is-on" : "is-off", "fbg-demo-btn"])}" data-v-0118d44e>📱 Mobile</button><button class="${ssrRenderClass([actualPreviewMode.value === "desktop" ? "is-on" : "is-off", "fbg-demo-btn"])}" data-v-0118d44e>💻 Desktop</button></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass(__props.demoMode ? "fbg-demo-device fbg-modal-zoom" : "contents")}" style="${ssrRenderStyle(__props.demoMode ? frameStyle.value : void 0)}" data-v-0118d44e>`);
          if (__props.demoMode && actualPreviewMode.value === "mobile") {
            _push2(`<div class="fbg-demo-statusbar" data-v-0118d44e><span data-v-0118d44e>9:41</span><span class="fbg-demo-sigs" data-v-0118d44e><span class="fbg-demo-sig-a" data-v-0118d44e></span><span class="fbg-demo-sig-b" data-v-0118d44e></span></span></div>`);
          } else if (__props.demoMode) {
            _push2(`<div class="fbg-demo-browserbar" data-v-0118d44e><span class="fbg-demo-dots" data-v-0118d44e><span data-v-0118d44e></span><span data-v-0118d44e></span><span data-v-0118d44e></span></span><span class="fbg-demo-url" data-v-0118d44e>⚽ Football — Take Your Shot</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass(__props.demoMode ? "fbg-demo-scroll" : "contents")}" data-v-0118d44e><div class="${ssrRenderClass([frameClass.value, "fbg"])}" style="${ssrRenderStyle({ "--ac": accent.value })}" data-v-0118d44e>`);
          if (!__props.demoMode) {
            _push2(`<button class="fbg-x" style="${ssrRenderStyle({ color: textColor.value })}" aria-label="Close" data-v-0118d44e>×</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="fbg-top" data-v-0118d44e><p class="fbg-eyebrow" style="${ssrRenderStyle({ color: accent.value })}" data-v-0118d44e>Penalty Shootout</p><p class="fbg-prompt" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0118d44e>${ssrInterpolate(prompt.value)}</p>`);
          if (showTopPrize.value && topPrize.value) {
            _push2(`<div class="fbg-topprize" style="${ssrRenderStyle({ borderColor: accent.value, color: textColor.value })}" data-v-0118d44e>`);
            if (topPrize.value.image_path) {
              _push2(`<img${ssrRenderAttr("src", topPrize.value.image_path)} class="fbg-topprize-img" alt="" data-v-0118d44e>`);
            } else {
              _push2(`<span class="fbg-topprize-emoji" data-v-0118d44e>🏆</span>`);
            }
            _push2(`<span style="${ssrRenderStyle({ color: accent.value })}" data-v-0118d44e>TOP PRIZE</span><span class="fbg-topprize-val" data-v-0118d44e>${ssrInterpolate(topPrizeLabel.value)}</span></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div><div class="${ssrRenderClass([{ shake: shake.value, megashake: wow.value }, "fbg-stage"])}" data-v-0118d44e><svg class="fbg-svg"${ssrRenderAttr("viewBox", sceneViewBox.value)} preserveAspectRatio="xMidYMid slice" data-v-0118d44e><defs data-v-0118d44e><linearGradient id="fbg-sky" x1="0" y1="0" x2="0" y2="1" data-v-0118d44e><stop offset="0"${ssrRenderAttr("stop-color", pal.value.skyTop)} data-v-0118d44e></stop><stop offset="0.6"${ssrRenderAttr("stop-color", pal.value.skyMid)} data-v-0118d44e></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.skyBot)} data-v-0118d44e></stop></linearGradient><linearGradient id="fbg-stand" x1="0" y1="0" x2="0" y2="1" data-v-0118d44e><stop offset="0"${ssrRenderAttr("stop-color", pal.value.standTop)} data-v-0118d44e></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.standBot)} data-v-0118d44e></stop></linearGradient><linearGradient id="fbg-grass" x1="0" y1="0" x2="0" y2="1" data-v-0118d44e><stop offset="0"${ssrRenderAttr("stop-color", pal.value.grassTop)} data-v-0118d44e></stop><stop offset="1"${ssrRenderAttr("stop-color", pal.value.grassBot)} data-v-0118d44e></stop></linearGradient><radialGradient id="fbg-flood" cx="0.5" cy="0.5" r="0.5" data-v-0118d44e><stop offset="0"${ssrRenderAttr("stop-color", pal.value.glow)}${ssrRenderAttr("stop-opacity", pal.value.glowOp)} data-v-0118d44e></stop><stop offset="1" stop-opacity="0" data-v-0118d44e></stop></radialGradient><radialGradient id="fbg-ball" cx="0.36" cy="0.3" r="0.9" data-v-0118d44e><stop offset="0" stop-color="#fff" data-v-0118d44e></stop><stop offset="0.7" stop-color="#eef1f6" data-v-0118d44e></stop><stop offset="1" stop-color="#c4cad6" data-v-0118d44e></stop></radialGradient><radialGradient id="fbg-ball-edge" cx="0.4" cy="0.34" r="0.66" data-v-0118d44e><stop offset="0.5" stop-color="#000" stop-opacity="0" data-v-0118d44e></stop><stop offset="1" stop-color="#0a0e16" stop-opacity="0.36" data-v-0118d44e></stop></radialGradient><linearGradient id="fbg-trail" x1="0" y1="0" x2="1" y2="0" data-v-0118d44e><stop offset="0"${ssrRenderAttr("stop-color", accent.value)} stop-opacity="0" data-v-0118d44e></stop><stop offset="1"${ssrRenderAttr("stop-color", accent.value)} stop-opacity="0.8" data-v-0118d44e></stop></linearGradient><pattern id="fbg-net" width="14" height="14" patternUnits="userSpaceOnUse" data-v-0118d44e><path d="M0 0H14M0 0V14" stroke="rgba(214,230,255,.55)" stroke-width="1.3" fill="none" data-v-0118d44e></path></pattern><radialGradient id="fbg-flashglow" cx="0.5" cy="0.5" r="0.5" data-v-0118d44e><stop offset="0" stop-color="#ffffff" data-v-0118d44e></stop><stop offset="0.35" stop-color="#fdfeff" stop-opacity="0.82" data-v-0118d44e></stop><stop offset="1" stop-color="#dfe8ff" stop-opacity="0" data-v-0118d44e></stop></radialGradient><filter id="fbg-glow" x="-60%" y="-60%" width="220%" height="220%" data-v-0118d44e><feGaussianBlur stdDeviation="5" result="b" data-v-0118d44e></feGaussianBlur><feMerge data-v-0118d44e><feMergeNode in="b" data-v-0118d44e></feMergeNode><feMergeNode in="SourceGraphic" data-v-0118d44e></feMergeNode></feMerge></filter><filter id="fbg-soft" x="-60%" y="-60%" width="220%" height="220%" data-v-0118d44e><feGaussianBlur stdDeviation="3.5" data-v-0118d44e></feGaussianBlur></filter><filter id="fbg-neonC" x="-70%" y="-70%" width="240%" height="240%" data-v-0118d44e><feDropShadow dx="0" dy="0" stdDeviation="6"${ssrRenderAttr("flood-color", pal.value.glowA)} flood-opacity="0.95" data-v-0118d44e></feDropShadow></filter><filter id="fbg-neonM" x="-70%" y="-70%" width="240%" height="240%" data-v-0118d44e><feDropShadow dx="0" dy="0" stdDeviation="6"${ssrRenderAttr("flood-color", pal.value.glowB)} flood-opacity="0.95" data-v-0118d44e></feDropShadow></filter></defs><rect x="0" y="0" width="1000" height="200" fill="url(#fbg-sky)" data-v-0118d44e></rect><ellipse cx="150" cy="14" rx="320" ry="160" fill="url(#fbg-flood)" data-v-0118d44e></ellipse><ellipse cx="850" cy="14" rx="320" ry="160" fill="url(#fbg-flood)" data-v-0118d44e></ellipse><rect x="0" y="0" width="1000" height="146" fill="url(#fbg-grass)" opacity="0" data-v-0118d44e></rect><rect x="0" y="0" width="1000" height="146"${ssrRenderAttr("fill", pal.value.backdrop)} data-v-0118d44e></rect><rect x="0" y="0" width="1000" height="13" fill="#000" opacity="0.4" data-v-0118d44e></rect><g stroke="rgba(0,0,0,.28)" stroke-width="2.4" data-v-0118d44e><line x1="0" y1="34" x2="1000" y2="34" data-v-0118d44e></line><line x1="0" y1="60" x2="1000" y2="60" data-v-0118d44e></line><line x1="0" y1="88" x2="1000" y2="88" data-v-0118d44e></line><line x1="0" y1="118" x2="1000" y2="118" data-v-0118d44e></line></g><rect x="0" y="14" width="1000" height="104" fill="url(#fbg-stand)" opacity="0.9" data-v-0118d44e></rect><g class="${ssrRenderClass([{ roar: roar.value }, "fbg-crowd"])}" data-v-0118d44e><!--[-->`);
          ssrRenderList(unref(fans), (f2, i2) => {
            _push2(`<circle${ssrRenderAttr("cx", f2.x)}${ssrRenderAttr("cy", f2.y)}${ssrRenderAttr("r", f2.r)}${ssrRenderAttr("fill", f2.c)} data-v-0118d44e></circle>`);
          });
          _push2(`<!--]--></g><rect x="0" y="13" width="1000" height="34" fill="#000" opacity="0.3" data-v-0118d44e></rect><rect x="0" y="13" width="1000" height="4" fill="#000" opacity="0.55" data-v-0118d44e></rect><g class="fbg-camflashes" data-v-0118d44e><!--[-->`);
          ssrRenderList(unref(flashes), (cf, i2) => {
            _push2(`<circle class="fbg-camflash" fill="url(#fbg-flashglow)"${ssrRenderAttr("cx", cf.x)}${ssrRenderAttr("cy", cf.y)}${ssrRenderAttr("r", cf.r)} style="${ssrRenderStyle({ animationDelay: cf.delay + "s", animationDuration: cf.dur + "s" })}" data-v-0118d44e></circle>`);
          });
          _push2(`<!--]--></g>`);
          if (ads.value.length) {
            _push2(`<g data-v-0118d44e><clipPath id="fbg-hoard" data-v-0118d44e><rect x="0" y="120" width="1000" height="26" data-v-0118d44e></rect></clipPath><rect x="0" y="118" width="1000" height="3" fill="#000" opacity="0.55" data-v-0118d44e></rect><rect x="0" y="120" width="1000" height="26" fill="#04060d" data-v-0118d44e></rect><g clip-path="url(#fbg-hoard)" data-v-0118d44e><g data-v-0118d44e><!--[-->`);
            ssrRenderList(adStrip.value, (ad, i2) => {
              _push2(`<g${ssrRenderAttr("transform", `translate(${i2 * 224}, 121)`)} data-v-0118d44e><rect width="216" height="24" rx="2"${ssrRenderAttr("fill", ledColor(i2))} data-v-0118d44e></rect><rect width="216" height="11" rx="2" fill="#fff" opacity="0.13" data-v-0118d44e></rect><rect x="0.5" y="0.5" width="215" height="23" rx="2" fill="none" stroke="#fff" stroke-opacity="0.16" data-v-0118d44e></rect>`);
              if (ad.image) {
                _push2(`<rect x="4" y="3" width="20" height="18" rx="2" fill="#000" opacity="0.28" data-v-0118d44e></rect>`);
              } else {
                _push2(`<!---->`);
              }
              if (ad.image) {
                _push2(`<image${ssrRenderAttr("href", ad.image)} x="5" y="4" width="18" height="16" preserveAspectRatio="xMidYMid slice" data-v-0118d44e></image>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<text${ssrRenderAttr("x", ad.image ? 30 : 11)} y="16" fill="#fff" font-size="11" font-weight="800" letter-spacing="0.4" data-v-0118d44e>${ssrInterpolate(trunc(ad.name))}</text></g>`);
            });
            _push2(`<!--]--><animateTransform attributeName="transform" type="translate" from="0 0"${ssrRenderAttr("to", `-${adSetWidth.value} 0`)}${ssrRenderAttr("dur", `${Math.max(14, ads.value.length * 4)}s`)} repeatCount="indefinite" data-v-0118d44e></animateTransform></g></g><rect x="0" y="145" width="1000" height="2"${ssrRenderAttr("fill", accent.value)} opacity="0.22" data-v-0118d44e></rect></g>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<rect x="0" y="146" width="1000" height="860" fill="url(#fbg-grass)" data-v-0118d44e></rect><!--[-->`);
          ssrRenderList(9, (s2) => {
            _push2(`<rect${ssrRenderAttr("x", (s2 - 1) * 112)} y="146" width="56" height="860" fill="#fff" opacity="0.03" data-v-0118d44e></rect>`);
          });
          _push2(`<!--]--><g fill="none"${ssrRenderAttr("stroke", pal.value.line)} stroke-width="3.5" opacity="0.7"${ssrRenderAttr("filter", isNeon.value ? "url(#fbg-neonC)" : void 0)} data-v-0118d44e><path d="M110 600 L110 430 L890 430 L890 600" data-v-0118d44e></path><path d="M360 430 A150 56 0 0 0 640 430" data-v-0118d44e></path></g><rect${ssrRenderAttr("x", GOAL.x1 + 7)}${ssrRenderAttr("y", GOAL.y1 + 7)}${ssrRenderAttr("width", GOAL.x2 - GOAL.x1 - 14)}${ssrRenderAttr("height", GOAL.y2 - GOAL.y1 - 7)} fill="url(#fbg-net)" class="${ssrRenderClass({ ripple: netHit.value })}" data-v-0118d44e></rect><g fill="none"${ssrRenderAttr("stroke", textColor.value)} stroke-width="8" stroke-linejoin="round" style="${ssrRenderStyle(netHit.value ? { filter: "url(#fbg-glow)" } : isNeon.value ? { filter: "url(#fbg-neonC)" } : {})}" data-v-0118d44e><path${ssrRenderAttr("d", `M${GOAL.x1} ${GOAL.y2} L${GOAL.x1} ${GOAL.y1} L${GOAL.x2} ${GOAL.y1} L${GOAL.x2} ${GOAL.y2}`)} data-v-0118d44e></path></g><ellipse cx="500" cy="350" rx="46" ry="10" fill="#000" opacity="0.34" filter="url(#fbg-soft)" style="${ssrRenderStyle({ transform: keepShadowTf.value, transformBox: "view-box", transformOrigin: "500px 350px", transition: kicked.value ? "transform .5s cubic-bezier(.3,.7,.4,1)" : "none" })}" data-v-0118d44e></ellipse><g${ssrRenderAttr("filter", isNeon.value ? "url(#fbg-neonM)" : void 0)} style="${ssrRenderStyle({ transform: keepTf.value, transformBox: "view-box", transformOrigin: "500px 268px", transition: kicked.value ? "transform .5s cubic-bezier(.3,.7,.4,1)" : "none" })}" data-v-0118d44e>`);
          if (keeperSheet.value && keeperSheetOk.value) {
            _push2(`<g style="${ssrRenderStyle({ transform: keeperShuffleTf.value, willChange: "transform" })}" data-v-0118d44e><foreignObject x="425" y="160" width="150" height="190" data-v-0118d44e>`);
            _push2(ssrRenderComponent(_sfc_main$k, {
              sheet: keeperSheet.value,
              frames: keeperFrames.value,
              frame: keeperFrame.value,
              "flip-x": keeperFlip.value,
              "chroma-key": spriteChroma.value,
              onError: ($event) => keeperSheetOk.value = false
            }, null, _parent));
            _push2(`</foreignObject></g>`);
          } else if (keeperImage.value) {
            _push2(`<image${ssrRenderAttr("href", keeperImage.value)} x="448" y="196" width="104" height="140" data-v-0118d44e></image>`);
          } else {
            _push2(`<g class="fbg-keeper-tall" data-v-0118d44e><g class="${ssrRenderClass({ "fbg-keeper-idle": !kicked.value })}" data-v-0118d44e><path d="M490 300 q-6 18 -10 30" stroke="#222a3f" stroke-width="13" stroke-linecap="round" fill="none" data-v-0118d44e></path><path d="M510 300 q6 18 10 30" stroke="#222a3f" stroke-width="13" stroke-linecap="round" fill="none" data-v-0118d44e></path><g class="${ssrRenderClass([{ "arm-idle-l": !kicked.value }, "fbg-arm"])}" style="${ssrRenderStyle(kicked.value ? { transform: keepArmLTf.value, transformBox: "view-box", transformOrigin: "484px 276px", transition: "transform .35s ease" } : void 0)}" data-v-0118d44e><path d="M483 274 q-24 2 -40 18"${ssrRenderAttr("stroke", keeperKit.value)} stroke-width="12" stroke-linecap="round" fill="none" data-v-0118d44e></path><circle cx="441" cy="294" r="11"${ssrRenderAttr("fill", accent.value)} filter="url(#fbg-glow)" data-v-0118d44e></circle></g><g class="${ssrRenderClass([{ "arm-idle-r": !kicked.value }, "fbg-arm"])}" style="${ssrRenderStyle(kicked.value ? { transform: keepArmRTf.value, transformBox: "view-box", transformOrigin: "516px 276px", transition: "transform .35s ease" } : void 0)}" data-v-0118d44e><path d="M517 274 q24 2 40 18"${ssrRenderAttr("stroke", keeperKit.value)} stroke-width="12" stroke-linecap="round" fill="none" data-v-0118d44e></path><circle cx="559" cy="294" r="11"${ssrRenderAttr("fill", accent.value)} filter="url(#fbg-glow)" data-v-0118d44e></circle></g><path d="M478 262 q22 -12 44 0 l-3 42 q-19 8 -38 0 z"${ssrRenderAttr("fill", keeperKit.value)} data-v-0118d44e></path><path d="M478 262 q22 -12 44 0 l-2 12 q-20 -8 -40 0 z"${ssrRenderAttr("fill", accent.value)} opacity="0.9" data-v-0118d44e></path><clipPath id="fbg-keeper-shirt" data-v-0118d44e><path d="M478 262 q22 -12 44 0 l-3 42 q-19 8 -38 0 z" data-v-0118d44e></path></clipPath>`);
            if (keeperFlag.value) {
              _push2(`<image${ssrRenderAttr("href", keeperFlag.value)} x="477" y="258" width="46" height="48" preserveAspectRatio="xMidYMid slice" clip-path="url(#fbg-keeper-shirt)" data-v-0118d44e></image>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<circle cx="500" cy="248" r="16" fill="#e9b489" data-v-0118d44e></circle><path d="M485 244 q15 -16 30 0 q-15 -8 -30 0z" fill="#2b2016" data-v-0118d44e></path></g></g>`);
          }
          _push2(`</g>`);
          if (phase.value === "aim" || phase.value === "power") {
            _push2(`<g${ssrRenderAttr("stroke", accent.value)} stroke-width="3" fill="none" filter="url(#fbg-glow)" data-v-0118d44e><circle${ssrRenderAttr("cx", aim.value.x)}${ssrRenderAttr("cy", aim.value.y)} r="6"${ssrRenderAttr("fill", accent.value)} data-v-0118d44e></circle><circle${ssrRenderAttr("cx", aim.value.x)}${ssrRenderAttr("cy", aim.value.y)} r="22" opacity="0.8" data-v-0118d44e></circle><line${ssrRenderAttr("x1", aim.value.x - 34)}${ssrRenderAttr("y1", aim.value.y)}${ssrRenderAttr("x2", aim.value.x - 24)}${ssrRenderAttr("y2", aim.value.y)} data-v-0118d44e></line><line${ssrRenderAttr("x1", aim.value.x + 24)}${ssrRenderAttr("y1", aim.value.y)}${ssrRenderAttr("x2", aim.value.x + 34)}${ssrRenderAttr("y2", aim.value.y)} data-v-0118d44e></line><line${ssrRenderAttr("x1", aim.value.x)}${ssrRenderAttr("y1", aim.value.y - 34)}${ssrRenderAttr("x2", aim.value.x)}${ssrRenderAttr("y2", aim.value.y - 24)} data-v-0118d44e></line><line${ssrRenderAttr("x1", aim.value.x)}${ssrRenderAttr("y1", aim.value.y + 24)}${ssrRenderAttr("x2", aim.value.x)}${ssrRenderAttr("y2", aim.value.y + 34)} data-v-0118d44e></line></g>`);
          } else {
            _push2(`<!---->`);
          }
          if (kicked.value) {
            _push2(`<line${ssrRenderAttr("x1", SPOT.x)}${ssrRenderAttr("y1", SPOT.y)}${ssrRenderAttr("x2", current.value && !current.value.win ? keepLand.value.x : shotTarget.value.x)}${ssrRenderAttr("y2", current.value && !current.value.win ? keepLand.value.y : shotTarget.value.y)} stroke="url(#fbg-trail)" stroke-width="6" stroke-linecap="round" opacity="0.55" class="fbg-trail" data-v-0118d44e></line>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<ellipse cx="0" cy="0" rx="44" ry="11" fill="#000" opacity="0.3" filter="url(#fbg-soft)" style="${ssrRenderStyle({ transform: strikerShadowTf.value, transformBox: "view-box", transformOrigin: "0px 0px", transition: "transform .5s cubic-bezier(.4,.1,.3,1)" })}" data-v-0118d44e></ellipse><g class="${ssrRenderClass([{ run: moving.value }, "fbg-striker-svg"])}"${ssrRenderAttr("filter", isNeon.value ? "url(#fbg-neonM)" : void 0)} style="${ssrRenderStyle({ transform: strikerSvgTf.value, transformBox: "view-box", transformOrigin: "0px 0px", transition: "transform .5s cubic-bezier(.4,.1,.3,1)" })}" data-v-0118d44e>`);
          if (strikerSheet.value && strikerSheetOk.value) {
            _push2(`<foreignObject x="0" y="0" width="80" height="120" data-v-0118d44e>`);
            _push2(ssrRenderComponent(_sfc_main$k, {
              sheet: strikerSheet.value,
              frames: strikerFrames.value,
              frame: strikerFrame.value,
              "chroma-key": spriteChroma.value,
              onError: ($event) => strikerSheetOk.value = false
            }, null, _parent));
            _push2(`</foreignObject>`);
          } else if (strikerImage.value) {
            _push2(`<image${ssrRenderAttr("href", strikerImage.value)} x="0" y="0" width="80" height="120" data-v-0118d44e></image>`);
          } else {
            _push2(`<g data-v-0118d44e><path d="M40 60 q-4 22 -10 40" stroke="#e9b489" stroke-width="9" stroke-linecap="round" fill="none" data-v-0118d44e></path><g class="kick" data-v-0118d44e><path d="M44 60 q14 6 26 2" stroke="#e9b489" stroke-width="9" stroke-linecap="round" fill="none" data-v-0118d44e></path><rect x="66" y="56" width="14" height="7" rx="3" fill="#111" data-v-0118d44e></rect></g><rect x="26" y="80" width="14" height="7" rx="3" fill="#111" data-v-0118d44e></rect><path d="M30 52 l22 0 l-3 12 l-16 0 z" fill="#fff" data-v-0118d44e></path><path d="M30 26 q11 -7 22 0 l1 28 l-24 0 z"${ssrRenderAttr("fill", kitColor.value)} data-v-0118d44e></path><path d="M38 22 l7 1 l1 31 l-9 0 z"${ssrRenderAttr("fill", accent.value)} opacity="0.9" data-v-0118d44e></path><clipPath id="fbg-striker-shirt" data-v-0118d44e><path d="M30 26 q11 -7 22 0 l1 28 l-24 0 z" data-v-0118d44e></path></clipPath>`);
            if (strikerFlag.value) {
              _push2(`<image${ssrRenderAttr("href", strikerFlag.value)} x="29" y="24" width="24" height="33" preserveAspectRatio="xMidYMid slice" clip-path="url(#fbg-striker-shirt)" data-v-0118d44e></image>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<path d="M32 30 q-12 6 -16 18" stroke="#e9b489" stroke-width="7" stroke-linecap="round" fill="none" data-v-0118d44e></path><path d="M50 30 q12 4 16 12" stroke="#e9b489" stroke-width="7" stroke-linecap="round" fill="none" data-v-0118d44e></path><circle cx="41" cy="15" r="10" fill="#e9b489" data-v-0118d44e></circle><path d="M31 13 q10 -11 20 0 q-10 -6 -20 0z" fill="#241608" data-v-0118d44e></path></g>`);
          }
          _push2(`</g><g style="${ssrRenderStyle({ transform: ballTf.value, transformBox: "view-box", transition: kicked.value ? `transform ${ballDur.value}s cubic-bezier(.2,.55,.3,1)` : "none" })}" data-v-0118d44e>`);
          if (netHit.value) {
            _push2(`<circle class="fbg-ball-glow" r="42"${ssrRenderAttr("fill", accent.value)} filter="url(#fbg-glow)" data-v-0118d44e></circle>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<ellipse cx="0" cy="31" rx="30" ry="7" fill="#000" opacity="0.32" filter="url(#fbg-soft)" data-v-0118d44e></ellipse><g class="${ssrRenderClass({ "fbg-ball-arc": kicked.value })}" style="${ssrRenderStyle({ animationDuration: ballDur.value + "s" })}" data-v-0118d44e><g class="${ssrRenderClass({ "fbg-ball-impact": netHit.value || saved.value })}" data-v-0118d44e><g class="${ssrRenderClass({ spin: kicked.value })}"${ssrRenderAttr("filter", isNeon.value ? "url(#fbg-neonC)" : void 0)} data-v-0118d44e>`);
          if (ballImage.value) {
            _push2(`<image${ssrRenderAttr("href", ballImage.value)} x="-32" y="-32" width="64" height="64" data-v-0118d44e></image>`);
          } else {
            _push2(`<g data-v-0118d44e><circle r="32" fill="url(#fbg-ball)" stroke="#aab0bd" stroke-width="1.3" data-v-0118d44e></circle><path d="M0 -13 L12.4 -4 L7.6 10.5 L-7.6 10.5 L-12.4 -4 Z" fill="#1b1e25" data-v-0118d44e></path><g fill="#1b1e25" data-v-0118d44e><path d="M0 -31 L8 -24.5 L4 -16 L-4 -16 L-8 -24.5 Z" data-v-0118d44e></path><path d="M29.5 -9.6 L24.5 -2.5 L16 -4 L19 -12 L27 -15 Z" data-v-0118d44e></path><path d="M18.2 25.1 L9.5 22.5 L8 13.5 L17.5 14.5 L22 21.5 Z" data-v-0118d44e></path><path d="M-18.2 25.1 L-9.5 22.5 L-8 13.5 L-17.5 14.5 L-22 21.5 Z" data-v-0118d44e></path><path d="M-29.5 -9.6 L-24.5 -2.5 L-16 -4 L-19 -12 L-27 -15 Z" data-v-0118d44e></path></g><path d="M0 -13 L0 -24.5 M12.4 -4 L24 -9.6 M7.6 10.5 L14.5 21 M-7.6 10.5 L-14.5 21 M-12.4 -4 L-24 -9.6" stroke="#1b1e25" stroke-width="1.8" fill="none" opacity="0.85" data-v-0118d44e></path><circle r="32" fill="url(#fbg-ball-edge)" data-v-0118d44e></circle><ellipse cx="-11" cy="-13" rx="10" ry="6.5" fill="#fff" opacity="0.6" data-v-0118d44e></ellipse></g>`);
          }
          _push2(`</g></g></g></g>`);
          if (particles.value.length) {
            _push2(`<g${ssrRenderAttr("transform", `translate(${aim.value.x}, ${aim.value.y})`)} data-v-0118d44e><!--[-->`);
            ssrRenderList(particles.value, (p2, i2) => {
              _push2(`<rect class="fbg-particle" x="-3" y="-3" width="6" height="9"${ssrRenderAttr("fill", p2.col)} style="${ssrRenderStyle({ "--dx": p2.dx + "px", "--dy": p2.dy + "px", "--rot": p2.rot + "deg", animationDelay: p2.delay + "s" })}" data-v-0118d44e></rect>`);
            });
            _push2(`<!--]--></g>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "aim") {
            _push2(`<rect x="-3000" y="-3000" width="7000" height="7000" fill="transparent" style="${ssrRenderStyle({ "cursor": "crosshair" })}" data-v-0118d44e></rect>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</svg><div class="fbg-hud" data-v-0118d44e>PENALTY ${ssrInterpolate(Math.min(index.value + 1, total.value))}/${ssrInterpolate(total.value)} <span style="${ssrRenderStyle({ color: accent.value })}" data-v-0118d44e>·</span> ⚽ ${ssrInterpolate(scored.value)}</div><div class="${ssrRenderClass([{ on: flash.value }, "fbg-flash"])}" data-v-0118d44e></div></div>`);
          if (trackerView.value.length) {
            _push2(`<div class="fbg-tracker" data-v-0118d44e><div${ssrRenderAttrs({
              name: "fbg-track",
              class: "fbg-tracker-list"
            })} data-v-0118d44e>`);
            ssrRenderList(trackerView.value, (item) => {
              _push2(`<div class="fbg-track" data-v-0118d44e><span class="${ssrRenderClass([item.p.win ? "won" : "miss", "fbg-track-dot"])}" data-v-0118d44e>`);
              if (!item.p.win) {
                _push2(`<!--[-->✗<!--]-->`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span>`);
              if (item.p.win) {
                _push2(`<span class="fbg-track-box" style="${ssrRenderStyle({ borderColor: accent.value, color: accent.value })}" data-v-0118d44e>${ssrInterpolate(trackLabel(item.p))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`</div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "power") {
            _push2(`<div class="fbg-vmeter" data-v-0118d44e><span class="fbg-vmeter-label" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0118d44e>POWER</span><div class="fbg-vmeter-bar" data-v-0118d44e><div class="fbg-vmeter-grad" data-v-0118d44e></div><div class="fbg-vmeter-marker" style="${ssrRenderStyle({ bottom: power.value + "%" })}" data-v-0118d44e></div></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="fbg-lower" data-v-0118d44e>`);
          if (phase.value === "ready") {
            _push2(`<button class="fbg-cta" style="${ssrRenderStyle({ background: kitColor.value, color: textColor.value })}" data-v-0118d44e>Step up ⚽</button>`);
          } else if (phase.value === "aim") {
            _push2(`<p class="fbg-hint" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0118d44e>Tap where you want to place it 🎯</p>`);
          } else if (phase.value === "power") {
            _push2(`<button class="fbg-cta fbg-shoot" style="${ssrRenderStyle({ background: accent.value, color: "#04231b" })}" data-v-0118d44e>SHOOT! 💥</button>`);
          } else if (phase.value === "shooting") {
            _push2(`<button class="fbg-cta" disabled style="${ssrRenderStyle({ color: textColor.value })}" data-v-0118d44e>Striking…</button>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "ready" && total.value > 1) {
            _push2(`<button class="fbg-skip" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0118d44e>Skip remaining</button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
          if (hostEnabled.value && !showIntro.value) {
            _push2(`<div class="fbg-host" data-v-0118d44e>`);
            if (hostLine.value) {
              _push2(`<div class="fbg-host-bubble" data-v-0118d44e>${ssrInterpolate(hostLine.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (hostImage.value && hostImageOk.value) {
              _push2(`<img${ssrRenderAttr("src", hostImage.value)} class="fbg-host-avatar fbg-host-img" alt="" data-v-0118d44e>`);
            } else {
              _push2(`<svg class="fbg-host-avatar" viewBox="0 0 64 70" aria-hidden="true" data-v-0118d44e><path d="M16 32 a16 16 0 0 1 32 0" fill="none" stroke="#1f2937" stroke-width="4" data-v-0118d44e></path><circle cx="32" cy="36" r="15" fill="#e9b489" data-v-0118d44e></circle><path d="M18 32 q14 -16 28 0 q-14 -7 -28 0z" fill="#3a2a18" data-v-0118d44e></path><rect x="13" y="31" width="7" height="12" rx="3" fill="#111827" data-v-0118d44e></rect><rect x="44" y="31" width="7" height="12" rx="3" fill="#111827" data-v-0118d44e></rect><circle cx="27" cy="36" r="1.8" fill="#1b1b1b" data-v-0118d44e></circle><circle cx="37" cy="36" r="1.8" fill="#1b1b1b" data-v-0118d44e></circle><path d="M27 42 q5 4 10 0" stroke="#1b1b1b" stroke-width="2" fill="none" stroke-linecap="round" data-v-0118d44e></path><path d="M17 41 q-6 9 2 18" stroke="#111827" stroke-width="3" fill="none" data-v-0118d44e></path><circle cx="21" cy="59" r="5"${ssrRenderAttr("fill", accent.value)} stroke="#0b1220" stroke-width="2" data-v-0118d44e></circle></svg>`);
            }
            _push2(`</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showIntro.value) {
            _push2(`<div class="fbg-overlay fbg-intro" data-v-0118d44e><div class="fbg-intro-inner" data-v-0118d44e>`);
            if (introTitleImage.value) {
              _push2(`<img${ssrRenderAttr("src", introTitleImage.value)} class="fbg-intro-logo" alt="" data-v-0118d44e>`);
            } else {
              _push2(`<div class="fbg-intro-ball" data-v-0118d44e>⚽</div>`);
            }
            _push2(`<h2 class="fbg-intro-title" style="${ssrRenderStyle({ color: accent.value })}" data-v-0118d44e>${ssrInterpolate(welcomeMsg.value)}</h2>`);
            if (introSubtitle.value) {
              _push2(`<p class="fbg-intro-sub" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0118d44e>${ssrInterpolate(introSubtitle.value)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="fbg-cta fbg-intro-cta" style="${ssrRenderStyle({ background: kitColor.value, color: textColor.value })}" data-v-0118d44e>${ssrInterpolate(introButtonText.value)}</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (wow.value) {
            _push2(`<div class="fbg-wow" data-v-0118d44e></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (wow.value) {
            _push2(`<div class="fbg-goalflashes" data-v-0118d44e><!--[-->`);
            ssrRenderList(unref(goalFlashes), (gf, i2) => {
              _push2(`<span class="fbg-goalflash" style="${ssrRenderStyle({ left: gf.x + "%", top: gf.y + "%", width: gf.size + "px", height: gf.size + "px", animationDelay: gf.delay + "s", animationDuration: gf.dur + "s" })}" data-v-0118d44e></span>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (wow.value && !showPrize.value) {
            _push2(`<div class="fbg-goalshout" style="${ssrRenderStyle({ color: accent.value })}" data-v-0118d44e>GOAAL!!</div>`);
          } else {
            _push2(`<!---->`);
          }
          if (showPrize.value && current.value) {
            _push2(`<div class="fbg-overlay" data-v-0118d44e><div class="fbg-card" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-0118d44e><div class="fbg-goal" style="${ssrRenderStyle({ color: accent.value })}" data-v-0118d44e>GOAL! ⚽��</div><div class="fbg-visual" data-v-0118d44e>`);
            if (current.value.image) {
              _push2(`<img${ssrRenderAttr("src", current.value.image)} alt="prize" data-v-0118d44e>`);
            } else if (introTitleImage.value) {
              _push2(`<img${ssrRenderAttr("src", introTitleImage.value)} alt="logo" data-v-0118d44e>`);
            } else {
              _push2(`<span data-v-0118d44e>🏆</span>`);
            }
            _push2(`</div><div class="fbg-won" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0118d44e>${ssrInterpolate(winText.value)}</div><div class="fbg-name" style="${ssrRenderStyle({ color: accent.value })}" data-v-0118d44e>${ssrInterpolate(current.value.prize)}</div>`);
            if (currentValueLabel.value) {
              _push2(`<div class="fbg-value" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0118d44e>${ssrInterpolate(currentValueLabel.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="fbg-cta" style="${ssrRenderStyle({ background: kitColor.value, color: textColor.value })}" data-v-0118d44e>${ssrInterpolate(index.value < total.value - 1 ? "Next penalty →" : "Collect 🎉")}</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          if (phase.value === "done") {
            _push2(`<div class="fbg-overlay" data-v-0118d44e><div class="fbg-card" style="${ssrRenderStyle({ borderColor: accent.value })}" data-v-0118d44e><div class="fbg-goal" style="${ssrRenderStyle({ color: accent.value })}" data-v-0118d44e>Full time! ⚽</div><div class="fbg-won" style="${ssrRenderStyle({ color: textColor.value })}" data-v-0118d44e>You scored ${ssrInterpolate(scored.value)} of ${ssrInterpolate(total.value)}</div>`);
            if (totalWon.value) {
              _push2(`<div class="fbg-fulltotal" style="${ssrRenderStyle({ color: accent.value })}" data-v-0118d44e>Total won: £${ssrInterpolate(totalWon.value % 1 === 0 ? totalWon.value : totalWon.value.toFixed(2))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="fbg-scorecard" data-v-0118d44e><!--[-->`);
            ssrRenderList(pens.value, (p2, i2) => {
              _push2(`<span class="${ssrRenderClass([p2.win ? "goal" : "miss", "fbg-scoredot"])}" style="${ssrRenderStyle(p2.win ? { background: accent.value, color: "#04231b", borderColor: accent.value } : {})}" data-v-0118d44e>${ssrInterpolate(p2.win ? "⚽" : "✗")}</span>`);
            });
            _push2(`<!--]--></div><ul class="fbg-history" data-v-0118d44e><!--[-->`);
            ssrRenderList(pens.value, (p2, i2) => {
              _push2(`<li class="${ssrRenderClass(p2.win ? "win" : "miss")}" data-v-0118d44e><span class="fbg-hist-n" data-v-0118d44e>${ssrInterpolate(i2 + 1)}</span>`);
              if (p2.win) {
                _push2(`<span class="fbg-hist-res" data-v-0118d44e><b style="${ssrRenderStyle({ color: accent.value })}" data-v-0118d44e>GOAL</b> · ${ssrInterpolate(p2.prize)}`);
                if (p2.isBundle && p2.value && !/ticket/i.test(p2.prize)) {
                  _push2(`<span data-v-0118d44e> (${ssrInterpolate(Math.floor(p2.value))} Free Ticket${ssrInterpolate(p2.value == 1 ? "" : "s")})</span>`);
                } else if (p2.value && !p2.isBundle) {
                  _push2(`<span data-v-0118d44e> · £${ssrInterpolate(p2.value)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<span class="fbg-hist-res fbg-hist-miss" data-v-0118d44e>Saved — no win</span>`);
              }
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul><button class="fbg-cta" style="${ssrRenderStyle({ background: kitColor.value, color: textColor.value })}" data-v-0118d44e>Close</button></div></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div></div></div>`);
          if (__props.demoMode) {
            _push2(`<div class="fbg-demo-info" data-v-0118d44e>${ssrInterpolate(actualPreviewMode.value === "mobile" ? "📱 Mobile Preview (420×650)" : "💻 Desktop Preview (700×650)")}</div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", __props.demoMode, _parent);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Games/FootballModal.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const FootballModal = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-0118d44e"]]);
const _sfc_main$i = {
  __name: "GameConfigurator",
  __ssrInlineRender: true,
  setup(__props) {
    const activeTab = ref("slots");
    const getText = inject("getText", (key, fallback = "") => fallback);
    inject("siteTexts");
    const { sectionRef, revealed } = useReveal();
    const badgeText = computed(() => getText("gamestudio.badge", "Only on CompEngine"));
    const titleBefore = computed(() => getText("gamestudio.title_before", "Game Studio."));
    const titleKeyword = computed(() => getText("gamestudio.title_keyword", "Built by you."));
    const lead = computed(() => getText("gamestudio.lead", "Other UK competition platforms give operators a handful of fixed game presets. We give a studio. Pick a game, theme it, brand it, preview every change live."));
    const tryMeText = computed(() => getText("gamestudio.try_me", "🎮 Try it — no signup needed"));
    const tabs = [
      { id: "slots", name: "Slots", icon: "🎰" },
      { id: "scratch", name: "Scratch", icon: "🎫" },
      { id: "spin", name: "Spinny", icon: "🎡" },
      { id: "bingo", name: "Bingo", icon: "🎱" },
      { id: "coindrop", name: "Coin Drop", icon: "🪙" },
      { id: "balloonpop", name: "Balloon Pop", icon: "🎈" },
      { id: "football", name: "Football", icon: "⚽" }
    ];
    const slotsImages = ref({
      titleImage: "",
      background: "",
      spinButtonImage: ""
    });
    const spinImages = ref({
      background: ""
    });
    const scratchImages = ref({
      overlay: "",
      background: "",
      header: ""
    });
    const bingoImages = ref({
      background: "",
      header: "",
      cardCover: ""
    });
    const coinDropImages = ref({
      background: "",
      header: "",
      titleImage: "",
      dropButtonImage: "",
      ballImage: "",
      winBucketImage: "",
      loseBucketImage: "",
      tubeImage: "",
      machineImage: "",
      footerImage: ""
    });
    const balloonPopImages = ref({
      background: "",
      header: "",
      titleImage: "",
      popItemImage: ""
    });
    const slotsConfig = ref({
      titleText: "LUCKY SLOTS",
      titleColor: "#00FFFF",
      primaryColor: "#00CED1",
      secondaryColor: "#1a5a7a",
      accentColor: "#00FFFF",
      textColor: "#FFFFFF",
      machineBgColor: "#1a5a7a",
      matchTextColor: "#7FDBFF",
      inventoryEmoji: "🎣",
      inventoryButtonColor: "#FFD700",
      prizesModalBgColor: "#1F2937",
      prizesTitleColor: "#FFD700",
      prizesCardBorderColor: "#FFD700",
      prizesCardBgColor: "#374151",
      prizesValueColor: "#10B981"
    });
    const scratchConfig = ref({
      textColour: "#FFFFFF",
      wonTextColour: "#00FF00",
      loseTextColour: "#FF4444",
      accentColour: "#FFD700"
    });
    const spinConfig = ref({
      titleText: "SPIN TO WIN",
      titleColor: "#FFD700",
      wheelEdgeColor: "#00aeff",
      walletText: "",
      walletColor: "#8b5cf6"
    });
    const bingoConfig = ref({
      bgStart: "#1e3a8a",
      bgEnd: "#1e40af",
      frameColor: "#3b82f6",
      frameGlow: "#60a5fa",
      squareBg: "#374151",
      squareText: "#e5e7eb",
      diamond1: "#06b6d4",
      diamond2: "#67e8f9",
      winnerGlow: "#10b981",
      winnerBg: "#059669",
      popupStart: "#10b981",
      popupEnd: "#059669",
      diamondEmoji: "💎"
    });
    const coinDropConfig = ref({
      titleText: "COIN DROP!",
      titleColor: "#FFD700",
      primaryColor: "#e94560",
      secondaryColor: "#1a1a2e",
      accentColor: "#ffd700",
      boardBgColor: "#1a1a2e",
      pegColor: "#ffffff",
      pegGlowColor: "#e94560",
      ballColor: "#ffd700",
      ballGlowColor: "#ffaa00",
      winBucketColor: "#00ff88",
      loseBucketColor: "#ff4444",
      trailColor: "#e94560",
      pegShape: "hexagon"
    });
    const balloonPopConfig = ref({
      titleText: "POP TO WIN!",
      titleColor: "#FFD700",
      primaryColor: "#e94560",
      secondaryColor: "#1a1a2e",
      accentColor: "#ffd700",
      popBgColor: "#1a1a2e",
      popItemType: "balloon",
      popWinColor: "#00ff88",
      popLoseColor: "#ff4444",
      popSubtitleText: "Pop balloons to reveal your prize!"
    });
    const footballConfig = ref({
      theme: "classic",
      titleText: "Take Your Shot!",
      primaryColor: "#1b5e20",
      accentColor: "#ffeb3b",
      goalColor: "#f59e0b"
    });
    const footballDemoTickets = [
      { id: 1, number: "001", instant_win: { id: 1, prize: "£50 Cash", value: 50, claimed: false, image_path: null } },
      { id: 2, number: "002", instant_win: false }
    ];
    const slotsAssets = computed(() => ({
      titleText: slotsConfig.value.titleText,
      titleColor: slotsConfig.value.titleColor,
      primaryColor: slotsConfig.value.primaryColor,
      secondaryColor: slotsConfig.value.secondaryColor,
      accentColor: slotsConfig.value.accentColor,
      textColor: slotsConfig.value.textColor,
      machineBgColor: slotsConfig.value.machineBgColor,
      matchTextColor: slotsConfig.value.matchTextColor,
      inventoryEmoji: slotsConfig.value.inventoryEmoji,
      inventoryButtonColor: slotsConfig.value.inventoryButtonColor,
      prizesModalBgColor: slotsConfig.value.prizesModalBgColor,
      prizesTitleColor: slotsConfig.value.prizesTitleColor,
      prizesCardBorderColor: slotsConfig.value.prizesCardBorderColor,
      prizesCardBgColor: slotsConfig.value.prizesCardBgColor,
      prizesValueColor: slotsConfig.value.prizesValueColor,
      // Images
      titleImage: slotsImages.value.titleImage,
      background: slotsImages.value.background,
      spinButtonImage: slotsImages.value.spinButtonImage,
      machineImage: "",
      footerImage: "",
      header: ""
    }));
    const spinAssets = computed(() => ({
      titleText: spinConfig.value.titleText,
      titleColor: spinConfig.value.titleColor,
      wheelEdgeColor: spinConfig.value.wheelEdgeColor,
      walletText: spinConfig.value.walletText,
      walletColor: spinConfig.value.walletColor,
      background: spinImages.value.background
    }));
    const scratchAssets = computed(() => ({
      background: scratchImages.value.background,
      overlay: scratchImages.value.overlay,
      header: scratchImages.value.header,
      textColour: scratchConfig.value.textColour,
      wonTextColour: scratchConfig.value.wonTextColour,
      loseTextColour: scratchConfig.value.loseTextColour,
      accentColour: scratchConfig.value.accentColour
    }));
    const bingoAssets = computed(() => ({
      background: bingoImages.value.background,
      header: bingoImages.value.header,
      cardCover: bingoImages.value.cardCover,
      bgStart: bingoConfig.value.bgStart,
      bgEnd: bingoConfig.value.bgEnd,
      frameColor: bingoConfig.value.frameColor,
      frameGlow: bingoConfig.value.frameGlow,
      squareBg: bingoConfig.value.squareBg,
      squareText: bingoConfig.value.squareText,
      diamond1: bingoConfig.value.diamond1,
      diamond2: bingoConfig.value.diamond2,
      winnerGlow: bingoConfig.value.winnerGlow,
      winnerBg: bingoConfig.value.winnerBg,
      popupStart: bingoConfig.value.popupStart,
      popupEnd: bingoConfig.value.popupEnd,
      diamondEmoji: bingoConfig.value.diamondEmoji
    }));
    const coinDropAssets = computed(() => ({
      name: "Coin Drop",
      titleText: coinDropConfig.value.titleText,
      titleColor: coinDropConfig.value.titleColor,
      primaryColor: coinDropConfig.value.primaryColor,
      secondaryColor: coinDropConfig.value.secondaryColor,
      accentColor: coinDropConfig.value.accentColor,
      textColor: "#FFFFFF",
      boardBgColor: coinDropConfig.value.boardBgColor,
      pegColor: coinDropConfig.value.pegColor,
      pegGlowColor: coinDropConfig.value.pegGlowColor,
      ballColor: coinDropConfig.value.ballColor,
      ballGlowColor: coinDropConfig.value.ballGlowColor,
      winBucketColor: coinDropConfig.value.winBucketColor,
      loseBucketColor: coinDropConfig.value.loseBucketColor,
      trailColor: coinDropConfig.value.trailColor,
      pegShape: coinDropConfig.value.pegShape,
      background: coinDropImages.value.background || "",
      header: coinDropImages.value.header || "",
      titleImage: coinDropImages.value.titleImage || "",
      dropButtonImage: coinDropImages.value.dropButtonImage || "",
      ballImage: coinDropImages.value.ballImage || "",
      winBucketImage: coinDropImages.value.winBucketImage || "",
      loseBucketImage: coinDropImages.value.loseBucketImage || "",
      tubeImage: coinDropImages.value.tubeImage || "",
      machineImage: "",
      footerImage: "",
      gameBackground: coinDropImages.value.background || "",
      welcomeSound: "",
      dropSound: "",
      winSound: "",
      lossSound: ""
    }));
    const balloonPopAssets = computed(() => ({
      name: "Balloon Pop",
      titleText: balloonPopConfig.value.titleText,
      titleColor: balloonPopConfig.value.titleColor,
      primaryColor: balloonPopConfig.value.primaryColor,
      secondaryColor: balloonPopConfig.value.secondaryColor,
      accentColor: balloonPopConfig.value.accentColor,
      textColor: "#FFFFFF",
      popBgColor: balloonPopConfig.value.popBgColor,
      popItemType: balloonPopConfig.value.popItemType,
      popWinColor: balloonPopConfig.value.popWinColor,
      popLoseColor: balloonPopConfig.value.popLoseColor,
      popSubtitleText: balloonPopConfig.value.popSubtitleText,
      background: balloonPopImages.value.background || "",
      header: balloonPopImages.value.header || "",
      titleImage: balloonPopImages.value.titleImage || "",
      popItemImage: balloonPopImages.value.popItemImage || "",
      popItemColors: ["#FF4C4C", "#FFEB3B", "#64B5F6", "#81C784", "#9575CD", "#FF8A80", "#FFB74D", "#4DD0E1", "#F06292", "#FFD700"],
      popConfettiColors: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"],
      popSound: "",
      welcomeSound: "",
      winSound: "",
      lossSound: "",
      popItemLabel: ""
    }));
    const emojiOptions = ["🎣", "🎁", "🏆", "💎", "⭐", "🎯", "🎪", "🎲"];
    const colorPresets = {
      slots: [
        { name: "Ocean", primary: "#00CED1", secondary: "#1a5a7a", accent: "#00FFFF", machine: "#1a5a7a" },
        { name: "Royal", primary: "#9333EA", secondary: "#581C87", accent: "#A855F7", machine: "#581C87" },
        { name: "Fire", primary: "#EF4444", secondary: "#7F1D1D", accent: "#F97316", machine: "#7F1D1D" },
        { name: "Forest", primary: "#22C55E", secondary: "#14532D", accent: "#4ADE80", machine: "#14532D" },
        { name: "Gold", primary: "#F59E0B", secondary: "#78350F", accent: "#FCD34D", machine: "#78350F" }
      ],
      spin: [
        { name: "Neon Blue", edge: "#00aeff", title: "#FFD700" },
        { name: "Purple Glow", edge: "#9333EA", title: "#F0ABFC" },
        { name: "Fire Red", edge: "#EF4444", title: "#FCD34D" },
        { name: "Emerald", edge: "#10B981", title: "#FFFFFF" },
        { name: "Sunset", edge: "#F97316", title: "#FEF3C7" }
      ],
      coindrop: [
        { name: "Classic", primary: "#e94560", accent: "#ffd700", ball: "#ffd700" },
        { name: "Emerald", primary: "#10B981", accent: "#34D399", ball: "#6EE7B7" },
        { name: "Purple", primary: "#9333EA", accent: "#C084FC", ball: "#E9D5FF" },
        { name: "Fire", primary: "#EF4444", accent: "#F97316", ball: "#FBBF24" }
      ],
      balloonpop: [
        { name: "Classic", primary: "#e94560", accent: "#ffd700" },
        { name: "Ocean", primary: "#06B6D4", accent: "#67E8F9" },
        { name: "Forest", primary: "#22C55E", accent: "#86EFAC" },
        { name: "Sunset", primary: "#F97316", accent: "#FCD34D" }
      ],
      football: [
        { name: "Classic", theme: "classic", primary: "#1b5e20", accent: "#ffeb3b" },
        { name: "Night", theme: "night", primary: "#1b5e20", accent: "#cfeaff" },
        { name: "Retro", theme: "retro", primary: "#4a3416", accent: "#ffd27a" },
        { name: "Neon", theme: "neon", primary: "#0c5a3c", accent: "#3df5ff" }
      ]
    };
    const footballAssets = computed(() => ({
      theme: footballConfig.value.theme,
      titleText: footballConfig.value.titleText,
      primaryColor: footballConfig.value.primaryColor,
      accentColor: footballConfig.value.accentColor,
      goalColor: footballConfig.value.goalColor
    }));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        id: "game-studio",
        class: ["section reveal", { visible: unref(revealed) }],
        style: { "position": "relative" }
      }, _attrs))} data-v-5760dace><div class="center" style="${ssrRenderStyle({ "margin-bottom": "24px", "position": "relative" })}" data-v-5760dace><div class="mega-badge" data-v-5760dace><span class="spark" data-v-5760dace>✦</span> ${ssrInterpolate(badgeText.value)} <span class="spark" data-v-5760dace>✦</span></div><h2 class="h2" data-v-5760dace>${ssrInterpolate(titleBefore.value)} <span class="grad-text" data-v-5760dace>${ssrInterpolate(titleKeyword.value)}</span></h2><p class="lead center" style="${ssrRenderStyle({ "margin": "18px auto 0" })}" data-v-5760dace>${ssrInterpolate(lead.value)}</p><div style="${ssrRenderStyle({ "margin-top": "22px" })}" data-v-5760dace><a href="#game-studio" class="try-me" data-v-5760dace>${ssrInterpolate(tryMeText.value)}</a></div></div><div class="gs-block" data-v-5760dace><div class="grid lg:grid-cols-12 gap-5 max-w-[1400px] mx-auto" data-v-5760dace><div class="lg:col-span-5 xl:col-span-4" data-v-5760dace><div class="config-card" data-v-5760dace><div class="tab-container" data-v-5760dace><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass(["tab-pill", activeTab.value === tab.id ? "active" : ""])}" data-v-5760dace><span class="tab-icon" data-v-5760dace>${ssrInterpolate(tab.icon)}</span><span class="tab-label" data-v-5760dace>${ssrInterpolate(tab.name)}</span></button>`);
      });
      _push(`<!--]--></div><div class="config-content custom-scrollbar" data-v-5760dace>`);
      if (activeTab.value === "slots") {
        _push(`<div class="config-sections" data-v-5760dace><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Theme</span></div><div class="preset-grid" data-v-5760dace><!--[-->`);
        ssrRenderList(colorPresets.slots, (preset) => {
          _push(`<button class="preset-btn" style="${ssrRenderStyle({ "--preset-color": preset.primary })}" data-v-5760dace><span class="preset-dot" style="${ssrRenderStyle({ background: preset.primary })}" data-v-5760dace></span> ${ssrInterpolate(preset.name)}</button>`);
        });
        _push(`<!--]--></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Branding</span></div><div class="input-group" data-v-5760dace><label data-v-5760dace>Title</label><input type="text"${ssrRenderAttr("value", slotsConfig.value.titleText)} class="text-input" data-v-5760dace></div><div class="upload-row" data-v-5760dace><label class="${ssrRenderClass([{ "has-image": slotsImages.value.titleImage }, "upload-box"])}" data-v-5760dace>`);
        if (slotsImages.value.titleImage) {
          _push(`<img${ssrRenderAttr("src", slotsImages.value.titleImage)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ Logo</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label><label class="${ssrRenderClass([{ "has-image": slotsImages.value.background }, "upload-box"])}" data-v-5760dace>`);
        if (slotsImages.value.background) {
          _push(`<img${ssrRenderAttr("src", slotsImages.value.background)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ BG</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label><label class="${ssrRenderClass([{ "has-image": slotsImages.value.spinButtonImage }, "upload-box"])}" data-v-5760dace>`);
        if (slotsImages.value.spinButtonImage) {
          _push(`<img${ssrRenderAttr("src", slotsImages.value.spinButtonImage)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ Btn</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Colors</span></div><div class="color-grid" data-v-5760dace><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", slotsConfig.value.primaryColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Primary</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", slotsConfig.value.accentColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Accent</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", slotsConfig.value.titleColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Title</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", slotsConfig.value.machineBgColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Machine</span></div></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Inventory Button</span></div><div class="emoji-row" data-v-5760dace><!--[-->`);
        ssrRenderList(emojiOptions, (emoji) => {
          _push(`<button class="${ssrRenderClass(["emoji-btn", slotsConfig.value.inventoryEmoji === emoji ? "active" : ""])}" data-v-5760dace>${ssrInterpolate(emoji)}</button>`);
        });
        _push(`<!--]--></div><div class="color-item inline-color" data-v-5760dace><input type="color"${ssrRenderAttr("value", slotsConfig.value.inventoryButtonColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Button Color</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "scratch") {
        _push(`<div class="config-sections" data-v-5760dace><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Images</span></div><div class="upload-row" data-v-5760dace><label class="${ssrRenderClass([{ "has-image": scratchImages.value.header }, "upload-box"])}" data-v-5760dace>`);
        if (scratchImages.value.header) {
          _push(`<img${ssrRenderAttr("src", scratchImages.value.header)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ Header</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label><label class="${ssrRenderClass([{ "has-image": scratchImages.value.background }, "upload-box"])}" data-v-5760dace>`);
        if (scratchImages.value.background) {
          _push(`<img${ssrRenderAttr("src", scratchImages.value.background)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ BG</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label><label class="${ssrRenderClass([{ "has-image": scratchImages.value.overlay }, "upload-box"])}" data-v-5760dace>`);
        if (scratchImages.value.overlay) {
          _push(`<img${ssrRenderAttr("src", scratchImages.value.overlay)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ Overlay</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Colors</span></div><div class="color-grid" data-v-5760dace><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", scratchConfig.value.wonTextColour)} class="color-picker" data-v-5760dace><span data-v-5760dace>Win</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", scratchConfig.value.loseTextColour)} class="color-picker" data-v-5760dace><span data-v-5760dace>Lose</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", scratchConfig.value.accentColour)} class="color-picker" data-v-5760dace><span data-v-5760dace>Accent</span></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "spin") {
        _push(`<div class="config-sections" data-v-5760dace><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Theme</span></div><div class="preset-grid" data-v-5760dace><!--[-->`);
        ssrRenderList(colorPresets.spin, (preset) => {
          _push(`<button class="preset-btn" style="${ssrRenderStyle({ "--preset-color": preset.edge })}" data-v-5760dace><span class="preset-dot" style="${ssrRenderStyle({ background: preset.edge })}" data-v-5760dace></span> ${ssrInterpolate(preset.name)}</button>`);
        });
        _push(`<!--]--></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Branding</span></div><div class="input-group" data-v-5760dace><label data-v-5760dace>Title</label><input type="text"${ssrRenderAttr("value", spinConfig.value.titleText)} class="text-input" data-v-5760dace></div><div class="upload-row single" data-v-5760dace><label class="${ssrRenderClass([{ "has-image": spinImages.value.background }, "upload-box wide"])}" data-v-5760dace>`);
        if (spinImages.value.background) {
          _push(`<img${ssrRenderAttr("src", spinImages.value.background)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ Background Image</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Colors</span></div><div class="color-grid" data-v-5760dace><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", spinConfig.value.titleColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Title</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", spinConfig.value.wheelEdgeColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Wheel</span></div></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Wallet Card</span><span class="section-hint" data-v-5760dace>Leave empty to hide</span></div><div class="input-group" data-v-5760dace><label data-v-5760dace>Brand Text</label><input type="text"${ssrRenderAttr("value", spinConfig.value.walletText)} placeholder="YOUR BRAND" class="text-input" data-v-5760dace></div><div class="color-item inline-color" data-v-5760dace><input type="color"${ssrRenderAttr("value", spinConfig.value.walletColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Card Color</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "bingo") {
        _push(`<div class="config-sections" data-v-5760dace><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Images</span></div><div class="upload-row" data-v-5760dace><label class="${ssrRenderClass([{ "has-image": bingoImages.value.header }, "upload-box"])}" data-v-5760dace>`);
        if (bingoImages.value.header) {
          _push(`<img${ssrRenderAttr("src", bingoImages.value.header)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ Header</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label><label class="${ssrRenderClass([{ "has-image": bingoImages.value.cardCover }, "upload-box"])}" data-v-5760dace>`);
        if (bingoImages.value.cardCover) {
          _push(`<img${ssrRenderAttr("src", bingoImages.value.cardCover)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ Card</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label><label class="${ssrRenderClass([{ "has-image": bingoImages.value.background }, "upload-box"])}" data-v-5760dace>`);
        if (bingoImages.value.background) {
          _push(`<img${ssrRenderAttr("src", bingoImages.value.background)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ BG</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Icon</span></div><div class="input-group" data-v-5760dace><label data-v-5760dace>Diamond Emoji</label><input type="text"${ssrRenderAttr("value", bingoConfig.value.diamondEmoji)} class="text-input text-center text-2xl" data-v-5760dace></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Colors</span></div><div class="color-grid" data-v-5760dace><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", bingoConfig.value.bgStart)} class="color-picker" data-v-5760dace><span data-v-5760dace>BG Start</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", bingoConfig.value.bgEnd)} class="color-picker" data-v-5760dace><span data-v-5760dace>BG End</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", bingoConfig.value.frameColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Frame</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", bingoConfig.value.diamond1)} class="color-picker" data-v-5760dace><span data-v-5760dace>Diamond 1</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", bingoConfig.value.diamond2)} class="color-picker" data-v-5760dace><span data-v-5760dace>Diamond 2</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", bingoConfig.value.winnerGlow)} class="color-picker" data-v-5760dace><span data-v-5760dace>Winner</span></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "coindrop") {
        _push(`<div class="config-sections" data-v-5760dace><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Theme</span></div><div class="preset-grid" data-v-5760dace><!--[-->`);
        ssrRenderList(colorPresets.coindrop, (preset) => {
          _push(`<button class="preset-btn" style="${ssrRenderStyle({ "--preset-color": preset.primary })}" data-v-5760dace><span class="preset-dot" style="${ssrRenderStyle({ background: preset.primary })}" data-v-5760dace></span> ${ssrInterpolate(preset.name)}</button>`);
        });
        _push(`<!--]--></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Branding</span></div><div class="input-group" data-v-5760dace><label data-v-5760dace>Title</label><input type="text"${ssrRenderAttr("value", coinDropConfig.value.titleText)} class="text-input" data-v-5760dace></div><div class="upload-row" data-v-5760dace><label class="${ssrRenderClass([{ "has-image": coinDropImages.value.header }, "upload-box"])}" data-v-5760dace>`);
        if (coinDropImages.value.header) {
          _push(`<img${ssrRenderAttr("src", coinDropImages.value.header)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ Header</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label><label class="${ssrRenderClass([{ "has-image": coinDropImages.value.background }, "upload-box"])}" data-v-5760dace>`);
        if (coinDropImages.value.background) {
          _push(`<img${ssrRenderAttr("src", coinDropImages.value.background)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ BG</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label><label class="${ssrRenderClass([{ "has-image": coinDropImages.value.titleImage }, "upload-box"])}" data-v-5760dace>`);
        if (coinDropImages.value.titleImage) {
          _push(`<img${ssrRenderAttr("src", coinDropImages.value.titleImage)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ Logo</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Colors</span></div><div class="color-grid" data-v-5760dace><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", coinDropConfig.value.titleColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Title</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", coinDropConfig.value.ballColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Ball</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", coinDropConfig.value.pegColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Pegs</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", coinDropConfig.value.winBucketColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Win Bucket</span></div></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Peg Shape</span></div><div class="preset-grid" data-v-5760dace><button class="${ssrRenderClass([{ "active": coinDropConfig.value.pegShape === "circle" }, "preset-btn"])}" data-v-5760dace> Circle </button><button class="${ssrRenderClass([{ "active": coinDropConfig.value.pegShape === "hexagon" }, "preset-btn"])}" data-v-5760dace> Hexagon </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "football") {
        _push(`<div class="config-sections" data-v-5760dace><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Theme</span></div><div class="preset-grid" data-v-5760dace><!--[-->`);
        ssrRenderList(colorPresets.football, (preset) => {
          _push(`<button class="${ssrRenderClass([{ "active": footballConfig.value.theme === preset.theme }, "preset-btn"])}" data-v-5760dace>${ssrInterpolate(preset.name)}</button>`);
        });
        _push(`<!--]--></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Branding</span></div><div class="input-group" data-v-5760dace><label data-v-5760dace>Title</label><input type="text"${ssrRenderAttr("value", footballConfig.value.titleText)} class="text-input" data-v-5760dace></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Colors</span></div><div class="color-grid" data-v-5760dace><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", footballConfig.value.primaryColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Kit</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", footballConfig.value.accentColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Accent</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", footballConfig.value.goalColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Keeper Kit</span></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "balloonpop") {
        _push(`<div class="config-sections" data-v-5760dace><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Theme</span></div><div class="preset-grid" data-v-5760dace><!--[-->`);
        ssrRenderList(colorPresets.balloonpop, (preset) => {
          _push(`<button class="preset-btn" style="${ssrRenderStyle({ "--preset-color": preset.primary })}" data-v-5760dace><span class="preset-dot" style="${ssrRenderStyle({ background: preset.primary })}" data-v-5760dace></span> ${ssrInterpolate(preset.name)}</button>`);
        });
        _push(`<!--]--></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Branding</span></div><div class="input-group" data-v-5760dace><label data-v-5760dace>Title</label><input type="text"${ssrRenderAttr("value", balloonPopConfig.value.titleText)} class="text-input" data-v-5760dace></div><div class="input-group" data-v-5760dace><label data-v-5760dace>Subtitle</label><input type="text"${ssrRenderAttr("value", balloonPopConfig.value.popSubtitleText)} class="text-input" placeholder="Pop balloons to reveal your prize!" data-v-5760dace></div><div class="upload-row" data-v-5760dace><label class="${ssrRenderClass([{ "has-image": balloonPopImages.value.header }, "upload-box"])}" data-v-5760dace>`);
        if (balloonPopImages.value.header) {
          _push(`<img${ssrRenderAttr("src", balloonPopImages.value.header)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ Header</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label><label class="${ssrRenderClass([{ "has-image": balloonPopImages.value.background }, "upload-box"])}" data-v-5760dace>`);
        if (balloonPopImages.value.background) {
          _push(`<img${ssrRenderAttr("src", balloonPopImages.value.background)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ BG</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label><label class="${ssrRenderClass([{ "has-image": balloonPopImages.value.titleImage }, "upload-box"])}" data-v-5760dace>`);
        if (balloonPopImages.value.titleImage) {
          _push(`<img${ssrRenderAttr("src", balloonPopImages.value.titleImage)} data-v-5760dace>`);
        } else {
          _push(`<span class="upload-placeholder" data-v-5760dace>+ Logo</span>`);
        }
        _push(`<input type="file" accept="image/*" data-v-5760dace></label></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Colors</span></div><div class="color-grid" data-v-5760dace><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", balloonPopConfig.value.titleColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Title</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", balloonPopConfig.value.primaryColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Primary</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", balloonPopConfig.value.popWinColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Win</span></div><div class="color-item" data-v-5760dace><input type="color"${ssrRenderAttr("value", balloonPopConfig.value.popLoseColor)} class="color-picker" data-v-5760dace><span data-v-5760dace>Lose</span></div></div></div><div class="config-section" data-v-5760dace><div class="section-header" data-v-5760dace><span class="section-title" data-v-5760dace>Item Type</span></div><div class="preset-grid" data-v-5760dace><button class="${ssrRenderClass([{ "active": balloonPopConfig.value.popItemType === "balloon" }, "preset-btn"])}" data-v-5760dace> 🎈 Balloon </button><button class="${ssrRenderClass([{ "active": balloonPopConfig.value.popItemType === "bubble" }, "preset-btn"])}" data-v-5760dace> 🫧 Bubble </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div><div class="lg:col-span-7 xl:col-span-8" data-v-5760dace><div class="preview-card" data-v-5760dace><div class="preview-header" data-v-5760dace><span class="preview-title" data-v-5760dace>Preview</span><span class="preview-badge" data-v-5760dace>${ssrInterpolate((_a = tabs.find((t3) => t3.id === activeTab.value)) == null ? void 0 : _a.icon)} ${ssrInterpolate((_b = tabs.find((t3) => t3.id === activeTab.value)) == null ? void 0 : _b.name)}</span></div><div class="preview-container" data-v-5760dace>`);
      if (activeTab.value === "slots") {
        _push(`<div class="preview-game" data-v-5760dace>`);
        _push(ssrRenderComponent(SlotsGame, {
          demoMode: true,
          previewMode: "desktop",
          slotsAssets: slotsAssets.value,
          showMachine: true
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "scratch") {
        _push(`<div class="preview-game" data-v-5760dace>`);
        _push(ssrRenderComponent(ScratchGame, {
          demoMode: true,
          previewMode: "desktop",
          scratchAssets: scratchAssets.value
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "spin") {
        _push(`<div class="preview-game" data-v-5760dace>`);
        _push(ssrRenderComponent(SpinGame, {
          demoMode: true,
          previewMode: "desktop",
          spinAssets: spinAssets.value
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "bingo") {
        _push(`<div class="preview-game" data-v-5760dace>`);
        _push(ssrRenderComponent(BingoGame, {
          demoMode: true,
          previewMode: "desktop",
          assets: bingoAssets.value,
          prizes: [],
          tickets: []
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "coindrop") {
        _push(`<div class="preview-game" data-v-5760dace>`);
        _push(ssrRenderComponent(CoinDropGame, {
          demoMode: true,
          previewMode: "desktop",
          coinDropAssets: coinDropAssets.value,
          tickets: [],
          showGameBoard: true
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "balloonpop") {
        _push(`<div class="preview-game" data-v-5760dace>`);
        _push(ssrRenderComponent(BalloonPopGame, {
          demoMode: true,
          previewMode: "desktop",
          popGameAssets: balloonPopAssets.value,
          tickets: [],
          showGameBoard: true
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "football") {
        _push(`<div class="preview-game-football" data-v-5760dace>`);
        _push(ssrRenderComponent(FootballModal, {
          "model-value": true,
          demoMode: true,
          previewMode: "desktop",
          assets: footballAssets.value,
          tickets: footballDemoTickets
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Configurator/GameConfigurator.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const GameConfigurator = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-5760dace"]]);
const _sfc_main$h = {
  __name: "EcosystemFeatures",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    const { sectionRef, revealed } = useReveal();
    const eyebrow = computed(() => getText("ecosystem.eyebrow", "Your complete raffle ecosystem"));
    const titleBefore = computed(() => getText("ecosystem.title_before", "Everything you need."));
    const titleKeyword = computed(() => getText("ecosystem.title_keyword", "Nine modules. Zero plugins."));
    const lead = computed(() => getText("ecosystem.lead", "Built ground-up over five years of operating — not duct-taped from generic e-commerce plugins. Click any module for the operator-side detail."));
    const gridLureText = computed(() => getText("ecosystem.grid_lure_text", "Tap any card for more detail"));
    const badgeHero = computed(() => getText("ecosystem.badge_hero", "✦ Only on CompEngine ✦"));
    const badgeInteractive = computed(() => getText("ecosystem.badge_interactive", "✦ Hands-on demo ✦"));
    const badgeStandard = computed(() => getText("ecosystem.badge_standard", "Only on CompEngine"));
    const features = computed(() => [
      {
        size: "hero",
        mini: "slot",
        featured: true,
        badge: badgeHero.value,
        icon: getText("ecosystem.feat_gamestudio_icon", "🎮"),
        title: getText("ecosystem.feat_gamestudio_title", "Game Studio — design your own instant-win games"),
        text: getText("ecosystem.feat_gamestudio_text", "Build and preview competition games in real time. Theme, brand, inventory, button text — every detail, live. No developers, no delays, no limits. The only studio of its kind in the UK competition category."),
        more: getText("ecosystem.feat_gamestudio_more", "🎮 Try it live below")
      },
      {
        size: "wide",
        mini: "wallet",
        featured: true,
        badge: badgeStandard.value,
        icon: getText("ecosystem.feat_wallets_icon", "💵"),
        title: getText("ecosystem.feat_wallets_title", "Separate Cash & Site-Credit Wallets"),
        text: getText("ecosystem.feat_wallets_text", "Two wallets, not one. Cash on one side. Site credit on the other. Clearer for operators, cleaner for compliance, simpler for chargebacks. Single-wallet platforms quietly mix everything together."),
        more: getText("ecosystem.feat_wallets_more", "Why we built it this way →")
      },
      {
        size: "wide",
        mini: "compliance",
        featured: true,
        badge: badgeStandard.value,
        icon: getText("ecosystem.feat_compliance_icon", "📝"),
        title: getText("ecosystem.feat_compliance_title", "Free Entry Compliance & Management"),
        text: getText("ecosystem.feat_compliance_text", "Built-in free-entry system designed to meet UK compliance requirements end-to-end. Full tracking, full management, full audit trail. No manual handling. No workarounds."),
        more: getText("ecosystem.feat_compliance_more", "See VCOC alignment →")
      },
      {
        size: "interactive",
        mini: "upsell",
        featured: true,
        badge: badgeInteractive.value,
        icon: getText("ecosystem.feat_upsell_icon", "📱🚀"),
        title: getText("ecosystem.feat_upsell_title", "Smart Upsell — built into every checkout"),
        text: getText("ecosystem.feat_upsell_text", 'Triggers automatically at the exact right point in the buy flow. Adds an average +£23 to every ticket order. 87% of buyers take the offer. Click "Pay" on the right to see it fire — exactly as your customers will.'),
        more: getText("ecosystem.feat_upsell_more", "Click Pay below to test it →")
      },
      {
        size: "std",
        mini: "bars",
        featured: false,
        icon: getText("ecosystem.feat_reporting_icon", "👍📈"),
        title: getText("ecosystem.feat_reporting_title", "Best-in-class reporting"),
        text: getText("ecosystem.feat_reporting_text", "Detailed insights on order patterns, customer LTV, prize cost, P&L per competition."),
        more: getText("ecosystem.feat_reporting_more", "See the dashboard →")
      },
      {
        size: "std",
        mini: null,
        featured: false,
        icon: getText("ecosystem.feat_builder_icon", "🏗️"),
        title: getText("ecosystem.feat_builder_title", "Competition Builder"),
        text: getText("ecosystem.feat_builder_text", "Create once, save templates, launch faster every time."),
        more: getText("ecosystem.feat_builder_more", "See template library →")
      },
      {
        size: "std",
        mini: null,
        featured: false,
        icon: getText("ecosystem.feat_payouts_icon", "⚡"),
        title: getText("ecosystem.feat_payouts_title", "Automated Payouts & Prize Management"),
        text: getText("ecosystem.feat_payouts_text", "Winner choice → instant cash, site credit, or tracked prize fulfilment. End-to-end automated."),
        more: getText("ecosystem.feat_payouts_more", "See the prize flow →")
      },
      {
        size: "std",
        mini: null,
        featured: false,
        icon: getText("ecosystem.feat_rng_icon", "✅"),
        title: getText("ecosystem.feat_rng_title", "RNG-Certified Draws"),
        text: getText("ecosystem.feat_rng_text", "GLI-certified RNG. Every result independently verifiable, full audit trail, live-stream mode."),
        more: getText("ecosystem.feat_rng_more", "See the certification →")
      },
      {
        size: "std",
        mini: null,
        featured: false,
        icon: getText("ecosystem.feat_notify_icon", "📱🔔"),
        title: getText("ecosystem.feat_notify_title", "Built-in Notifications"),
        text: getText("ecosystem.feat_notify_text", "Winner alerts, customer updates, direct marketing — no third-party email tool to wire up."),
        more: getText("ecosystem.feat_notify_more", "See the message flow →")
      }
    ]);
    const pressedIdx = ref(null);
    const MINI_SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "🔔", "⭐", "💎", "💰", "7️⃣", "🍉"];
    const miniSlotTitle = computed(() => getText("ecosystem.mini_slot_title", "LUCKY SLOTS"));
    const miniSlotSub = computed(() => getText("ecosystem.mini_slot_sub", "Match 3 to win"));
    const miniSlotSymbols = ref(rollMiniSlot());
    function rollMiniSlot() {
      return Array.from({ length: 9 }, () => MINI_SYMBOLS[Math.floor(Math.random() * MINI_SYMBOLS.length)]);
    }
    const miniSlotInterval = setInterval(() => {
      miniSlotSymbols.value = rollMiniSlot();
    }, 4e3);
    onUnmounted(() => clearInterval(miniSlotInterval));
    const walletCashLabel = computed(() => getText("ecosystem.wallet_cash_label", "Cash 68%"));
    const walletCreditLabel = computed(() => getText("ecosystem.wallet_credit_label", "Credit 32%"));
    const walletWithdrawLabel = computed(() => getText("ecosystem.wallet_withdraw_label", "Withdrawable"));
    const walletCashSub = computed(() => getText("ecosystem.wallet_cash_sub", "Cash wallet"));
    const walletPromoLabel = computed(() => getText("ecosystem.wallet_promo_label", "Promo / prize"));
    const walletCreditSub = computed(() => getText("ecosystem.wallet_credit_sub", "Site credit"));
    const vcocLabel = computed(() => getText("ecosystem.vcoc_label", "UK Voluntary Code"));
    const vcocValue = computed(() => getText("ecosystem.vcoc_value", "Mapped end-to-end · since May 2026"));
    const barHeights = [30, 42, 38, 55, 50, 72, 88, 100];
    const barsTrend = computed(() => getText("ecosystem.bars_trend", "↗ +34% MoM growth"));
    const checkoutLabel = computed(() => getText("ecosystem.checkout_label", "Your basket · STAR DRAWS"));
    const checkoutRow1Label = computed(() => getText("ecosystem.checkout_row1_label", "Friday Cash Draw × 5"));
    const checkoutRow1Price = computed(() => getText("ecosystem.checkout_row1_price", "£10.00"));
    const checkoutRow2Label = computed(() => getText("ecosystem.checkout_row2_label", "Instant Win — Scratch"));
    const checkoutRow2Price = computed(() => getText("ecosystem.checkout_row2_price", "£2.50"));
    const checkoutTotal = computed(() => getText("ecosystem.checkout_total", "£12.50"));
    const checkoutPayLabel = computed(() => getText("ecosystem.checkout_pay_label", "Pay £12.50 →"));
    const upsellTitle = computed(() => getText("ecosystem.upsell_title", "Wait — quick offer."));
    const upsellDesc = computed(() => getText("ecosystem.upsell_desc", "Add <strong>10 more tickets for just £8 extra</strong>. <strong>87%</strong> of buyers take this offer."));
    const upsellYesLabel = computed(() => getText("ecosystem.upsell_yes_label", "Add 10 · £20.50"));
    const upsellNoLabel = computed(() => getText("ecosystem.upsell_no_label", "No thanks"));
    const upsellMeta = computed(() => getText("ecosystem.upsell_meta", "A/B test winner · <strong>+38% AOV</strong> at checkout"));
    const upsellResultDefault = computed(() => getText("ecosystem.upsell_result_default", "Click Pay above to see the upsell trigger →"));
    computed(() => getText("ecosystem.upsell_result_triggered", "Smart upsell modal triggered…"));
    computed(() => getText("ecosystem.upsell_result_win", "🎉 Smart upsell live. Operator just banked an extra <strong>£8.00</strong>."));
    computed(() => getText("ecosystem.upsell_result_no", "No worries — that's exactly the kind of choice we <strong>A/B test</strong> for our operators."));
    computed(() => getText("ecosystem.upsell_result_rearm", "Click Pay to see the upsell trigger"));
    const upsellShown = ref(false);
    const upsellResultWinState = ref(false);
    const upsellResultText = ref(upsellResultDefault.value);
    let upsellRearmTimer = null;
    onUnmounted(() => clearTimeout(upsellRearmTimer));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        class: ["section reveal", { visible: unref(revealed) }],
        id: "ecosystem"
      }, _attrs))} data-v-5e9810c3><div class="center" data-v-5e9810c3><div class="eyebrow" data-v-5e9810c3><span class="dot" data-v-5e9810c3></span>${ssrInterpolate(eyebrow.value)}</div><h2 class="h2" data-v-5e9810c3>${ssrInterpolate(titleBefore.value)}<br data-v-5e9810c3><span class="grad-text" data-v-5e9810c3>${ssrInterpolate(titleKeyword.value)}</span></h2><p class="lead center" style="${ssrRenderStyle({ "margin": "18px auto 0" })}" data-v-5e9810c3>${ssrInterpolate(lead.value)}</p></div><div class="feature-grid" data-v-5e9810c3><!--[-->`);
      ssrRenderList(features.value, (f2, idx) => {
        _push(`<div class="${ssrRenderClass(["feature-card", f2.size, { featured: f2.featured, pressed: pressedIdx.value === idx }])}" data-v-5e9810c3>`);
        if (f2.size === "hero") {
          _push(`<!--[--><div data-v-5e9810c3>`);
          if (f2.featured) {
            _push(`<span class="badge" style="${ssrRenderStyle({ "position": "relative", "top": "0", "right": "0", "display": "inline-block", "margin-bottom": "14px" })}" data-v-5e9810c3>${ssrInterpolate(f2.badge)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="icon" data-v-5e9810c3>${ssrInterpolate(f2.icon)}</span><h4 data-v-5e9810c3>${ssrInterpolate(f2.title)}</h4><p data-v-5e9810c3>${ssrInterpolate(f2.text)}</p><a href="#game-studio" class="more" data-v-5e9810c3>${ssrInterpolate(f2.more)}</a></div><div data-v-5e9810c3><div class="mini-slot-preview" data-v-5e9810c3><div class="mini-slot-title" data-v-5e9810c3>${ssrInterpolate(miniSlotTitle.value)}</div><div class="mini-slot-sub" data-v-5e9810c3>${ssrInterpolate(miniSlotSub.value)}</div><div class="mini-slot-grid" data-v-5e9810c3><!--[-->`);
          ssrRenderList(miniSlotSymbols.value, (sym, i2) => {
            _push(`<div class="mini-slot-cell" data-v-5e9810c3>${ssrInterpolate(sym)}</div>`);
          });
          _push(`<!--]--></div><button class="mini-spin" data-v-5e9810c3>SPIN</button></div></div><!--]-->`);
        } else if (f2.size === "interactive") {
          _push(`<!--[--><div data-v-5e9810c3>`);
          if (f2.featured) {
            _push(`<span class="badge" style="${ssrRenderStyle({ "position": "relative", "top": "0", "right": "0", "display": "inline-block", "margin-bottom": "14px" })}" data-v-5e9810c3>${ssrInterpolate(f2.badge)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="icon" data-v-5e9810c3>${ssrInterpolate(f2.icon)}</span><h4 data-v-5e9810c3>${ssrInterpolate(f2.title)}</h4><p data-v-5e9810c3>${ssrInterpolate(f2.text)}</p><span class="more" data-v-5e9810c3>${ssrInterpolate(f2.more)}</span></div><div data-v-5e9810c3><div class="checkout-mock" data-v-5e9810c3><div class="checkout-mock-label" data-v-5e9810c3>${ssrInterpolate(checkoutLabel.value)}</div><div class="checkout-row" data-v-5e9810c3><span data-v-5e9810c3>${ssrInterpolate(checkoutRow1Label.value)}</span><span class="v" data-v-5e9810c3>${ssrInterpolate(checkoutRow1Price.value)}</span></div><div class="checkout-row" data-v-5e9810c3><span data-v-5e9810c3>${ssrInterpolate(checkoutRow2Label.value)}</span><span class="v" data-v-5e9810c3>${ssrInterpolate(checkoutRow2Price.value)}</span></div><div class="checkout-row total" data-v-5e9810c3><span data-v-5e9810c3>Total</span><span class="v" data-v-5e9810c3>${ssrInterpolate(checkoutTotal.value)}</span></div><button class="checkout-btn" data-v-5e9810c3>${ssrInterpolate(checkoutPayLabel.value)}</button><div class="${ssrRenderClass([{ shown: upsellShown.value }, "upsell-modal"])}" data-v-5e9810c3><div class="upsell-modal-icon" data-v-5e9810c3>🎁</div><div class="upsell-modal-title" data-v-5e9810c3>${ssrInterpolate(upsellTitle.value)}</div><div class="upsell-modal-desc" data-v-5e9810c3>${upsellDesc.value ?? ""}</div><div class="upsell-modal-buttons" data-v-5e9810c3><button class="upsell-btn primary" data-v-5e9810c3>${ssrInterpolate(upsellYesLabel.value)}</button><button class="upsell-btn secondary" data-v-5e9810c3>${ssrInterpolate(upsellNoLabel.value)}</button></div><div class="upsell-meta" data-v-5e9810c3>${upsellMeta.value ?? ""}</div></div></div><div class="${ssrRenderClass([{ win: upsellResultWinState.value }, "upsell-result-inline"])}" data-v-5e9810c3>${upsellResultText.value ?? ""}</div></div><!--]-->`);
        } else {
          _push(`<!--[-->`);
          if (f2.featured) {
            _push(`<span class="badge" data-v-5e9810c3>${ssrInterpolate(f2.badge)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="icon" data-v-5e9810c3>${ssrInterpolate(f2.icon)}</span><h4 data-v-5e9810c3>${ssrInterpolate(f2.title)}</h4><p data-v-5e9810c3>${ssrInterpolate(f2.text)}</p>`);
          if (f2.mini === "wallet") {
            _push(`<!--[--><div class="${ssrRenderClass([{ animate: unref(revealed) }, "wallet-split"])}" data-v-5e9810c3><div class="wallet-seg cash" data-v-5e9810c3>${ssrInterpolate(walletCashLabel.value)}</div><div class="wallet-seg credit" data-v-5e9810c3>${ssrInterpolate(walletCreditLabel.value)}</div></div><div class="wallet-labels" data-v-5e9810c3><span data-v-5e9810c3><strong data-v-5e9810c3>${ssrInterpolate(walletWithdrawLabel.value)}</strong> · ${ssrInterpolate(walletCashSub.value)}</span><span data-v-5e9810c3><strong data-v-5e9810c3>${ssrInterpolate(walletPromoLabel.value)}</strong> · ${ssrInterpolate(walletCreditSub.value)}</span></div><!--]-->`);
          } else if (f2.mini === "compliance") {
            _push(`<div class="vcoc-stamp" data-v-5e9810c3><div class="tick" data-v-5e9810c3>✓</div><div data-v-5e9810c3><div class="vcoc-stamp-label" data-v-5e9810c3>${ssrInterpolate(vcocLabel.value)}</div><div class="vcoc-stamp-value" data-v-5e9810c3>${ssrInterpolate(vcocValue.value)}</div></div></div>`);
          } else if (f2.mini === "bars") {
            _push(`<!--[--><div class="${ssrRenderClass([{ animate: unref(revealed) }, "mini-bars"])}" data-v-5e9810c3><!--[-->`);
            ssrRenderList(barHeights, (h2, i2) => {
              _push(`<div style="${ssrRenderStyle({ height: h2 + "%" })}" data-v-5e9810c3></div>`);
            });
            _push(`<!--]--></div><div class="chart-trend" style="${ssrRenderStyle({ "margin-top": "8px", "display": "inline-flex", "align-items": "center", "gap": "4px", "font-size": "12px", "font-weight": "700", "color": "var(--orange)" })}" data-v-5e9810c3>${ssrInterpolate(barsTrend.value)}</div><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="more" data-v-5e9810c3>${ssrInterpolate(f2.more)}</div><!--]-->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="grid-lure" data-v-5e9810c3><span class="arr" data-v-5e9810c3>👆</span>  ${ssrInterpolate(gridLureText.value)}  <span class="arr" data-v-5e9810c3>👆</span></div></section>`);
    };
  }
};
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Ecosystem/EcosystemFeatures.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const EcosystemFeatures = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-5e9810c3"]]);
const _sfc_main$g = {
  __name: "NextGenPlatform",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    const { sectionRef, revealed } = useReveal();
    function ft(key, fallback) {
      return getText(`convert.${key}`, fallback);
    }
    const eyebrow = computed(() => ft("eyebrow", "Built by marketers, not just developers"));
    const titleBefore = computed(() => ft("title_before", "Pretty doesn't pay your prize fund."));
    const titleKeyword = computed(() => ft("title_keyword", "Conversion does."));
    const lead = computed(() => ft("lead", "Most competition-site builders are agencies who ship a pretty design and walk away. CompEngine is built alongside conversion specialists who actually know how to turn visitors into entrants. Every flow — checkout, upsell, free entry, cart-abandonment — is tested for sell-through, not just speed."));
    const teamCalloutBold = computed(() => ft("team_callout_bold", "Built by a team blending marketing, conversion-rate optimisation, UX and engineering."));
    const teamCalloutText = computed(() => ft("team_callout_text", `Most "raffle website builders" are designers. We're operators with our own conversion data — and we ship the winning patterns to every site we power.`));
    const convertFeatures = computed(() => [
      {
        icon: ft("feat1_icon", "🎯"),
        title: ft("feat1_title", "A/B-tested checkout flows"),
        desc: ft("feat1_desc", "Every checkout button, label, and step has been tested across millions of real orders. Operators inherit the winning variants — not a blank template."),
        detail: ft("feat1_detail", '<strong>Winning variant example:</strong> a "Buy 10 tickets" primary button outperforms a generic "Add to cart" by 23% on conversion rate across our last 4M orders.'),
        compare: {
          leftValue: ft("feat1_compare_left_value", "1.9%"),
          leftLabel: ft("feat1_compare_left_label", '"Add to cart"'),
          leftMeta: ft("feat1_compare_left_meta", "Generic"),
          rightValue: ft("feat1_compare_right_value", "2.3%"),
          rightLabel: ft("feat1_compare_right_label", '"Buy 10 tickets"'),
          rightMeta: ft("feat1_compare_right_meta", "+23% lift")
        },
        expandHint: ft("feat1_expand_hint", "See the data")
      },
      {
        icon: ft("feat2_icon", "💡"),
        title: ft("feat2_title", "Smart upsell modals"),
        desc: ft("feat2_desc", '"Add 10 more tickets for £8", "Try our instant win", "Upgrade to bundle" — context-aware suggestions at exactly the right point in the buy flow.'),
        detail: ft("feat2_detail", "<strong>Average uplift per checkout:</strong> +£23 to ticket value when the bundle-suggestion modal fires post-cart. ~38% of buyers accept at least one upsell."),
        compare: {
          leftValue: ft("feat2_compare_left_value", "£42"),
          leftLabel: ft("feat2_compare_left_label", "Baseline order"),
          leftMeta: ft("feat2_compare_left_meta", "No upsell"),
          rightValue: ft("feat2_compare_right_value", "£65"),
          rightLabel: ft("feat2_compare_right_label", "With upsell"),
          rightMeta: ft("feat2_compare_right_meta", "+£23 avg")
        },
        expandHint: ft("feat2_expand_hint", "See the data")
      },
      {
        icon: ft("feat3_icon", "🔄"),
        title: ft("feat3_title", "Cart-abandonment automation"),
        desc: ft("feat3_desc", "Visitors who walk away with tickets in their basket get a nudge automatically — built in, not a £49/month add-on."),
        detail: ft("feat3_detail", "<strong>Recovery rate:</strong> ~14% of abandoned carts complete purchase within 24h when the automated email + push fires. That's ~£18k/month recovered for an average operator."),
        compare: null,
        expandHint: ft("feat3_expand_hint", "See the data")
      },
      {
        icon: ft("feat4_icon", "📲"),
        title: ft("feat4_title", "Facebook-ad-compliant landing pages"),
        desc: ft("feat4_desc", "Every operator site meets Facebook's strict prize-draw advertising rules out of the box. Unlock the largest paid-acquisition channel without getting your account suspended."),
        detail: ft("feat4_detail", "<strong>Why this matters:</strong> Facebook auto-suspends prize-draw sites that miss any of 14 specific compliance flags. CompEngine sites pass all 14 by default — operators run paid acquisition from day one."),
        compare: null,
        expandHint: ft("feat4_expand_hint", "See the data")
      },
      {
        icon: ft("feat5_icon", "🤝"),
        title: ft("feat5_title", "Referral & affiliate engine"),
        desc: ft("feat5_desc", "Built-in viral growth: unique codes, dual rewards for referrer and referee, fraud-prevention with IP tracking. No third-party tool to wire up."),
        detail: ft("feat5_detail", "<strong>Viral coefficient:</strong> referral-acquired customers spend ~41% more in their first 90 days than paid-traffic customers, and convert 2.1x faster on first order. Free acquisition, higher LTV."),
        compare: null,
        expandHint: ft("feat5_expand_hint", "See the data")
      },
      {
        icon: ft("feat6_icon", "📈"),
        title: ft("feat6_title", "Conversion-rate dashboard"),
        desc: ft("feat6_desc", "See which competitions convert, where users drop off, which traffic source pays back. The reporting most platforms simply don't offer."),
        detail: ft("feat6_detail", "<strong>What you see:</strong> per-competition funnel, traffic-source ROI, drop-off heatmaps, time-to-purchase distribution, and a single LTV chart by acquisition channel. Most operators run on gut feel. You won't."),
        compare: null,
        expandHint: ft("feat6_expand_hint", "See the data")
      }
    ]);
    const expandedIdx = ref([false, false, false, false, false, false]);
    const MONTHS = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"];
    const metricKeys = ["revenue", "conversion", "repeat"];
    const metrics = computed(() => ({
      revenue: {
        title: ft("metric_revenue_title", "Avg operator revenue, month-on-month"),
        pillLabel: ft("metric_revenue_pill", "+247%"),
        buttonLabel: ft("metric_revenue_button", "Revenue"),
        us: [15, 18, 24, 32, 41, 55, 72, 90, 108, 124, 138, 147],
        them: [15, 16, 17, 19, 20, 22, 23, 24, 25, 26, 27, 28],
        fmt: (v2) => "£" + v2 + "k",
        headlineEnd: 147,
        headlinePrefix: "£",
        headlineSuffix: "k",
        headlineDecimals: 0
      },
      conversion: {
        title: ft("metric_conversion_title", "Avg checkout conversion rate"),
        pillLabel: ft("metric_conversion_pill", "+139%"),
        buttonLabel: ft("metric_conversion_button", "Conversion %"),
        us: [1.8, 1.9, 2.1, 2.4, 2.7, 3, 3.3, 3.5, 3.8, 4, 4.2, 4.3],
        them: [1.5, 1.5, 1.6, 1.6, 1.7, 1.7, 1.8, 1.8, 1.8, 1.9, 1.9, 1.9],
        fmt: (v2) => v2.toFixed(1) + "%",
        headlineEnd: 4.3,
        headlinePrefix: "",
        headlineSuffix: "%",
        headlineDecimals: 1
      },
      repeat: {
        title: ft("metric_repeat_title", "90-day repeat-buyer rate"),
        pillLabel: ft("metric_repeat_pill", "+217%"),
        buttonLabel: ft("metric_repeat_button", "Repeat Buyers"),
        us: [12, 14, 17, 19, 22, 25, 28, 30, 33, 35, 37, 38],
        them: [11, 11, 12, 12, 12, 13, 13, 13, 14, 14, 14, 14],
        fmt: (v2) => v2 + "%",
        headlineEnd: 38,
        headlinePrefix: "",
        headlineSuffix: "%",
        headlineDecimals: 0
      }
    }));
    const legendUsLabel = computed(() => ft("legend_us", "CompEngine operators"));
    const legendThemLabel = computed(() => ft("legend_them", "Typical WordPress operator"));
    const chartMonth1 = computed(() => ft("chart_month1", "Month 1"));
    const chartMonth6 = computed(() => ft("chart_month6", "Month 6"));
    const chartMonth12 = computed(() => ft("chart_month12", "Month 12"));
    const activeMetric = ref("revenue");
    const currentMetric = computed(() => metrics.value[activeMetric.value]);
    const growthChartValue = ref("£0");
    const growthCanvas = ref(null);
    let growthChart = null;
    function tweenHeadline(fromVal, toVal, prefix, suffix, decimals, duration) {
      const start = performance.now();
      function tick(now) {
        const t3 = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t3, 3);
        const v2 = fromVal + (toVal - fromVal) * eased;
        growthChartValue.value = prefix + v2.toFixed(decimals) + suffix;
        if (t3 < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    function animateHeadlineIn() {
      const m2 = currentMetric.value;
      tweenHeadline(0, m2.headlineEnd, m2.headlinePrefix, m2.headlineSuffix, m2.headlineDecimals, 2400);
    }
    function buildGrowthChart() {
      if (!growthCanvas.value) return;
      const ctx = growthCanvas.value.getContext("2d");
      const lineGrad = ctx.createLinearGradient(0, 0, growthCanvas.value.width || 400, 0);
      lineGrad.addColorStop(0, "#5b7fc4");
      lineGrad.addColorStop(0.35, "#b297db");
      lineGrad.addColorStop(0.7, "#d97aa8");
      lineGrad.addColorStop(1, "#f4a558");
      const fillGrad = ctx.createLinearGradient(0, 0, 0, 220);
      fillGrad.addColorStop(0, "rgba(244,165,88,0.32)");
      fillGrad.addColorStop(1, "rgba(244,165,88,0)");
      growthChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: MONTHS,
          datasets: [
            {
              label: "CompEngine operators",
              data: metrics.value.revenue.us,
              borderColor: lineGrad,
              borderWidth: 3,
              backgroundColor: fillGrad,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 6,
              pointHoverBackgroundColor: "#f4a558",
              pointHoverBorderColor: "#1d1042",
              pointHoverBorderWidth: 2
            },
            {
              label: "Typical WordPress operator",
              data: metrics.value.revenue.them,
              borderColor: "rgba(178,151,219,0.55)",
              borderWidth: 2,
              borderDash: [6, 6],
              backgroundColor: "transparent",
              fill: false,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "#b297db",
              pointHoverBorderColor: "#1d1042",
              pointHoverBorderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          animation: { duration: 2400, easing: "easeOutCubic" },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#1d1042",
              borderColor: "#f4a558",
              borderWidth: 1,
              titleFont: { family: "Inter", weight: "700", size: 12 },
              bodyFont: { family: "Inter", size: 13 },
              padding: 12,
              callbacks: {
                title: (items) => "Month " + (items[0].dataIndex + 1),
                label: (ctx2) => ctx2.dataset.label + ": " + metrics.value[activeMetric.value].fmt(ctx2.parsed.y)
              }
            }
          },
          scales: {
            x: { display: false, grid: { display: false } },
            y: { display: false, grid: { color: "rgba(178,151,219,0.08)", drawBorder: false } }
          }
        }
      });
    }
    const statCards = computed(() => [
      { target: 47, prefix: "+", suffix: "%", decimals: 0, label: ft("stat1_label", "Avg checkout conversion"), vs: ft("stat1_vs", "vs typical WordPress raffle stack"), path: "M 0,32 L 40,28 L 80,24 L 120,18 L 160,12 L 200,4" },
      { target: 2.4, prefix: "", suffix: "x", decimals: 1, label: ft("stat2_label", "90-day repeat purchase rate"), vs: ft("stat2_vs", "CompEngine sites vs industry baseline"), path: "M 0,30 L 40,30 L 80,24 L 120,18 L 160,10 L 200,6" },
      { target: 23, prefix: "+£", suffix: "", decimals: 0, label: ft("stat3_label", "Avg ticket value uplift"), vs: ft("stat3_vs", "via smart upsell modals at checkout"), path: "M 0,34 L 40,28 L 80,30 L 120,22 L 160,14 L 200,8" }
    ]);
    const statsAnimated = ref(false);
    const statCounters = ref(["+0%", "0.0x", "+£0"]);
    function animateStatsAndSparks() {
      statsAnimated.value = true;
      statCards.value.forEach((card, i2) => {
        const startTime = performance.now();
        const delay = 300 + i2 * 200;
        function step(now) {
          const t3 = Math.max(0, Math.min((now - startTime - delay) / 1500, 1));
          const eased = 1 - Math.pow(1 - t3, 3);
          statCounters.value[i2] = card.prefix + (card.target * eased).toFixed(card.decimals) + card.suffix;
          if (t3 < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
    const tickerLiveLabel = computed(() => ft("ticker_live_label", "Live"));
    const BRANDS = ["BOLT", "APEX", "STAR DRAWS", "GOAT", "ZENITH", "NORTH", "BLAZE", "SUMMIT", "VYBE", "RUSH", "KINGS", "DAISY'S DRAWS", "PHAT STAX", "LUXE", "ANCHOR", "HORIZON", "BIG WINS", "LOCKDOWN", "ROYAL DRAWS", "CRAZY COW"];
    const ACTIONS = [
      { icon: "🎟️", t: ["just bought", "just snagged", "just secured"], v: [5, 10, 15, 20, 25, 50, 100], suffix: "tickets on" },
      { icon: "🎉", t: ["just won", "just claimed"], v: ["£250", "£500", "£100", "£1,200", "£450", "£75", "£2,500"], suffix: "on" },
      { icon: "✨", t: ["joined the wallet on", "signed up to"], v: [""], suffix: "" },
      { icon: "💰", t: ["withdrew", "cashed out"], v: ["£250", "£500", "£140", "£890"], suffix: "from" },
      { icon: "⚡", t: ["used an instant win on", "hit a scratchcard win on"], v: [""], suffix: "" }
    ];
    const NAMES = ["Sarah K", "James P", "Amira H", "Tom R", "Lia M", "Daniel B", "Sofia G", "Marcus T", "Aisha N", "Ben C", "Holly W", "Connor F", "Zara K", "Owen H", "Maddie L"];
    const TIME_OFFSETS = ["just now", "3s ago", "8s ago", "15s ago", "22s ago", "34s ago", "48s ago", "1m ago", "2m ago"];
    const activityItems = ref([]);
    let activityIdCounter = 0;
    let tickerStarted = false;
    let tickerIntervalHandle = null;
    let tickerKickoffHandle = null;
    function spawnActivity() {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
      const a2 = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
      const verb = a2.t[Math.floor(Math.random() * a2.t.length)];
      const val = a2.v[Math.floor(Math.random() * a2.v.length)];
      const time = TIME_OFFSETS[Math.floor(Math.random() * TIME_OFFSETS.length)];
      const id = ++activityIdCounter;
      activityItems.value.push({ id, icon: a2.icon, name, verb, val, suffix: a2.suffix, brand, time });
      setTimeout(() => {
        activityItems.value = activityItems.value.filter((item) => item.id !== id);
      }, 14500);
    }
    function startTicker() {
      if (tickerStarted) return;
      tickerStarted = true;
      spawnActivity();
      tickerKickoffHandle = setTimeout(spawnActivity, 1400);
      tickerIntervalHandle = setInterval(spawnActivity, 2400);
    }
    watch(revealed, (isRevealed) => {
      if (isRevealed) {
        animateHeadlineIn();
        animateStatsAndSparks();
        startTicker();
      }
    });
    onMounted(async () => {
      await nextTick();
      buildGrowthChart();
    });
    onUnmounted(() => {
      if (growthChart) growthChart.destroy();
      if (tickerIntervalHandle) clearInterval(tickerIntervalHandle);
      if (tickerKickoffHandle) clearTimeout(tickerKickoffHandle);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        class: ["section reveal", { visible: unref(revealed) }],
        id: "convert"
      }, _attrs))}><div class="center"><div class="eyebrow"><span class="dot"></span>${ssrInterpolate(eyebrow.value)}</div><h2 class="h2">${ssrInterpolate(titleBefore.value)}<br><span class="grad-text">${ssrInterpolate(titleKeyword.value)}</span></h2><p class="lead center" style="${ssrRenderStyle({ "margin": "18px auto 0" })}">${ssrInterpolate(lead.value)}</p></div><div class="activity-ticker"><span class="activity-ticker-label">${ssrInterpolate(tickerLiveLabel.value)}</span><div class="activity-list"><!--[-->`);
      ssrRenderList(activityItems.value, (item) => {
        _push(`<div class="activity-item"><span class="activity-item-icon">${ssrInterpolate(item.icon)}</span><span class="activity-item-text"><strong>${ssrInterpolate(item.name)}</strong> ${ssrInterpolate(item.verb)}`);
        if (item.val) {
          _push(`<strong style="${ssrRenderStyle({ "color": "var(--text-0)" })}">${ssrInterpolate(item.val)}</strong>`);
        } else {
          _push(`<!---->`);
        }
        _push(`${ssrInterpolate(item.suffix ? " " + item.suffix : "")} <span class="brand">${ssrInterpolate(item.brand)}</span></span><span class="activity-item-time">· ${ssrInterpolate(item.time)}</span></div>`);
      });
      _push(`<!--]--></div></div><div class="convert-block" style="${ssrRenderStyle({ "margin-top": "32px" })}"><div class="convert-grid"><div class="convert-features"><!--[-->`);
      ssrRenderList(convertFeatures.value, (f2, idx) => {
        _push(`<div class="${ssrRenderClass([{ expanded: expandedIdx.value[idx] }, "convert-feature expandable"])}"><div class="convert-feature-icon">${ssrInterpolate(f2.icon)}</div><div class="feature-body"><div class="convert-feature-title">${ssrInterpolate(f2.title)}</div><div class="convert-feature-desc">${ssrInterpolate(f2.desc)}</div><div class="convert-feature-detail"><span>${f2.detail ?? ""}</span>`);
        if (f2.compare) {
          _push(`<div class="compare-strip"><div class="compare-strip-side"><strong>${ssrInterpolate(f2.compare.leftValue)}</strong>${ssrInterpolate(f2.compare.leftLabel)}<div class="meta">${ssrInterpolate(f2.compare.leftMeta)}</div></div><div class="compare-strip-side ours"><strong>${ssrInterpolate(f2.compare.rightValue)}</strong>${ssrInterpolate(f2.compare.rightLabel)}<div class="meta">${ssrInterpolate(f2.compare.rightMeta)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="convert-feature-expand-hint"><span class="chev">▾</span> ${ssrInterpolate(f2.expandHint)}</div></div></div>`);
      });
      _push(`<!--]--></div><div class="growth-chart"><div class="chart-toggle"><!--[-->`);
      ssrRenderList(metricKeys, (m2) => {
        _push(`<button class="${ssrRenderClass([{ active: activeMetric.value === m2 }, "metric-btn"])}">${ssrInterpolate(metrics.value[m2].buttonLabel)}</button>`);
      });
      _push(`<!--]--></div><div class="growth-chart-header"><div><div class="growth-chart-title">${ssrInterpolate(currentMetric.value.title)}</div><div class="growth-chart-value">${ssrInterpolate(growthChartValue.value)}</div></div><span class="growth-chart-pill">${ssrInterpolate(currentMetric.value.pillLabel)}</span></div><canvas></canvas><div class="chart-legend"><div class="chart-legend-item"><span class="chart-legend-swatch"></span> ${ssrInterpolate(legendUsLabel.value)}</div><div class="chart-legend-item"><span class="chart-legend-swatch dashed"></span> ${ssrInterpolate(legendThemLabel.value)}</div></div><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "margin-top": "10px", "font-size": "11px", "color": "var(--text-3)", "letter-spacing": "0.05em" })}"><span>${ssrInterpolate(chartMonth1.value)}</span><span>${ssrInterpolate(chartMonth6.value)}</span><span>${ssrInterpolate(chartMonth12.value)}</span></div></div></div><div class="team-callout"><div class="team-callout-icons"><span class="team-avatar t1">MK</span><span class="team-avatar t2">CR</span><span class="team-avatar t3">UX</span><span class="team-avatar t4">EN</span></div><div><strong style="${ssrRenderStyle({ "color": "var(--text-0)" })}">${ssrInterpolate(teamCalloutBold.value)}</strong>  ${ssrInterpolate(teamCalloutText.value)}</div></div><div class="convert-stats"><!--[-->`);
      ssrRenderList(statCards.value, (card, i2) => {
        _push(`<div class="stat-card"><div class="stat-arrow">↗</div><div class="stat-value">${ssrInterpolate(statCounters.value[i2])}</div><div class="stat-label">${ssrInterpolate(card.label)}</div><div class="stat-vs">${ssrInterpolate(card.vs)}</div><svg class="stat-spark" viewBox="0 0 200 40" preserveAspectRatio="none">`);
        if (i2 === 0) {
          _push(`<defs><linearGradient id="growthLineGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#5b7fc4"></stop><stop offset="35%" stop-color="#b297db"></stop><stop offset="70%" stop-color="#d97aa8"></stop><stop offset="100%" stop-color="#f4a558"></stop></linearGradient></defs>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<path class="${ssrRenderClass([{ animate: statsAnimated.value }, "stat-spark-line"])}"${ssrRenderAttr("d", card.path)} fill="none" stroke="url(#growthLineGrad)" stroke-width="2.5" stroke-linecap="round"></path></svg></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Platform/NextGenPlatform.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = {
  __name: "CertifiedDraws",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText");
    const { sectionRef, revealed } = useReveal();
    function ft(key, fallback) {
      return getText(`cert.${key}`, fallback);
    }
    const eyebrow = computed(() => ft("eyebrow", "Independently verifiable · GLI-certified RNG · UK VCOC compliant"));
    const titleBefore = computed(() => ft("title_before", "Every winner."));
    const titleKeyword = computed(() => ft("title_keyword", "Cryptographically proven."));
    const lead = computed(() => ft("lead", "Every main prize winner is drawn by our GLI-certified random number generator. Each draw is logged to a tamper-evident SHA-256 hash chain you can verify yourself."));
    const explainerText = computed(() => ft("explainer_text", "<strong>How to test this yourself:</strong> Each card below lists the hashes recorded against a real draw. Click <strong>Copy</strong> on any hash, paste it into that card's <strong>Verify</strong> box, and we'll reveal the exact winner, ticket number, prize, and draw timestamp it was recorded against. Or click any hash row to auto-fill the verifier."));
    const verifyPlaceholder = computed(() => ft("verify_placeholder", "Paste a hash to reveal the winner…"));
    const verifyBtnLabel = computed(() => ft("verify_btn", "Verify"));
    const trySampleLabel = computed(() => ft("try_sample_label", "try a sample hash"));
    const verifyHintSuffix = computed(() => ft("verify_hint_suffix", "from this draw."));
    const hashChainLabel = computed(() => ft("hash_chain_label", "SHA-256 hash chain"));
    const certMiniLabel = computed(() => ft("cert_mini_label", "🔐 GLI-certified"));
    const verifiedTitle = computed(() => ft("verified_title", "Hash verified · winner record"));
    const DRAWS = [
      {
        title: "BMW M3 Competition Pack",
        meta: "Drawn 18 May 2026 · STAR DRAWS",
        image: "bmw",
        emoji: "🏎️",
        label: "BMW M3 · £75k prize",
        hashes: [
          { seq: 1, full: "a3f9b2c47e1d8f053a9c6b8d2e4f1a5c7d9b3e6f8c2a4d6e1f3b5a7c9d8e2f4c", winner: { name: "Sarah K.", ticket: "#04827", prize: "BMW M3 Competition Pack", timestamp: "18 May 2026 · 21:02:14 UTC", block: "#4,201" } },
          { seq: 2, full: "b1e2c8d4a5f3e7b9c1d6f2e8a4b7c9d5e3f1a8b6c4d2e9f7a3b5c8d1e6f4a2cd", winner: { name: "James P.", ticket: "#00193", prize: "£500 cash (instant win)", timestamp: "18 May 2026 · 21:03:02 UTC", block: "#4,202" } },
          { seq: 3, full: "c8d4e2f6a1b3c5d7e9f2a4b6c8d1e3f5a7b9c2d4e6f8a1b3c5d7e9f2a4b6c8e1", winner: { name: "Amira H.", ticket: "#11240", prize: "£250 site credit", timestamp: "18 May 2026 · 21:04:48 UTC", block: "#4,203" } }
        ]
      },
      {
        title: 'Apple iMac Pro 32"',
        meta: "Drawn 14 May 2026 · BLAZE",
        image: "imac",
        emoji: "🖥️",
        label: "Apple iMac · £4,999 prize",
        hashes: [
          { seq: 1, full: "f4a8c2e6b9d3f5a7c1b4e6d8f2a5c7b3e9d1f4a8c6b2e5d7f1a4c8b6e3d5f9a2", winner: { name: "Tom R.", ticket: "#08312", prize: 'Apple iMac Pro 32"', timestamp: "14 May 2026 · 19:30:11 UTC", block: "#3,847" } },
          { seq: 2, full: "b7d3f5a1c4e8b2d6f3a5c7b1e9d4f6a2c8b5e7d1f3a9c4b6e2d8f5a1c7b3e9d4", winner: { name: "Lia M.", ticket: "#02541", prize: "£200 cash", timestamp: "14 May 2026 · 19:31:02 UTC", block: "#3,848" } },
          { seq: 3, full: "c2e5b8d4f1a7c3e6b9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4", winner: { name: "Daniel B.", ticket: "#19874", prize: "12-month £200 site credit", timestamp: "14 May 2026 · 19:31:48 UTC", block: "#3,849" } }
        ]
      },
      {
        title: "Maldives Trip for Two",
        meta: "Drawn 10 May 2026 · KINGS",
        image: "maldives",
        emoji: "🏝️",
        label: "Maldives · £12k prize",
        hashes: [
          { seq: 1, full: "3d7f9a2c5e8b1d4f6a3c9e2b5d8f1a4c7e0b3d6f9a2c5e8b1d4f6a3c9e2b5d8f", winner: { name: "Sofia G.", ticket: "#07631", prize: "Maldives Trip for 2", timestamp: "10 May 2026 · 20:00:42 UTC", block: "#3,612" } },
          { seq: 2, full: "7b2e5d8a3c6f9b1d4e7a2c5f8b3d6e9a4c7f1b4e7d2a5c8f3b6e9d2a5c8f3b6e", winner: { name: "Marcus T.", ticket: "#03210", prize: "£1,000 cash", timestamp: "10 May 2026 · 20:01:33 UTC", block: "#3,613" } },
          { seq: 3, full: "4a8c1e5b2d7f3a6c9e4b1d8f5a2c7e0b3d6f9a4c7e2b5d8f1a4c7e0b3d6f9a4c", winner: { name: "Aisha N.", ticket: "#15893", prize: "£250 site credit", timestamp: "10 May 2026 · 20:02:21 UTC", block: "#3,614" } }
        ]
      },
      {
        title: "Tesla Model Y",
        meta: "Drawn 06 May 2026 · APEX",
        image: "tesla",
        emoji: "⚡",
        label: "Tesla Model Y · £52k prize",
        hashes: [
          { seq: 1, full: "9e3b7a1d5f8c2b6e4a9d7f1c3b8e2a5d6f9c4b1e7a3d8f5c2b6e9a4d1f7c3b8e", winner: { name: "Ben C.", ticket: "#23015", prize: "Tesla Model Y Long Range", timestamp: "06 May 2026 · 21:15:08 UTC", block: "#3,401" } },
          { seq: 2, full: "5c8a2f4d7b1e9c3a6f2d5b8e1c4a7f9d3b6e2c5a8f4d1b7e3c6a9f2d5b8e1c4a", winner: { name: "Holly W.", ticket: "#11402", prize: "£750 cash", timestamp: "06 May 2026 · 21:16:00 UTC", block: "#3,402" } }
        ]
      },
      {
        title: "Rolex Submariner Date",
        meta: "Drawn 02 May 2026 · LUXE",
        image: "rolex",
        emoji: "⌚",
        label: "Rolex · £10,950 prize",
        hashes: [
          { seq: 1, full: "e2a5b9c8d1f3a7b4e6c2d9f5a8b1c4e7d3f6a2b5c8e1d4f7a3b6c9e2d5f8a1b4", winner: { name: "Connor F.", ticket: "#06294", prize: "Rolex Submariner Date", timestamp: "02 May 2026 · 20:30:11 UTC", block: "#3,188" } },
          { seq: 2, full: "8f1d4a7b2e5c8d3f6a9b4e1c7d2f5a8b3e6c9d4f1a7b2e5c8d3f6a9b4e1c7d2f", winner: { name: "Zara K.", ticket: "#18027", prize: "£500 site credit", timestamp: "02 May 2026 · 20:31:04 UTC", block: "#3,189" } }
        ]
      },
      {
        title: "£25,000 Tax-Free Cash",
        meta: "Drawn 28 Apr 2026 · BIG WINS",
        image: "cash",
        emoji: "💰",
        label: "£25,000 · cash prize",
        hashes: [
          { seq: 1, full: "d6f3a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5", winner: { name: "Owen H.", ticket: "#09146", prize: "£25,000 tax-free", timestamp: "28 Apr 2026 · 21:00:18 UTC", block: "#3,002" } },
          { seq: 2, full: "a8b3e6c9d2f5a8b1c4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2", winner: { name: "Maddie L.", ticket: "#21477", prize: "£200 cash", timestamp: "28 Apr 2026 · 21:01:05 UTC", block: "#3,003" } },
          { seq: 3, full: "c4e7d3f6a9c2b5e8d1f4a7c3b6e9d2f5a8c1b4e7d3f6a9c2b5e8d1f4a7c3b6e9", winner: { name: "Charlie R.", ticket: "#14820", prize: "£100 site credit", timestamp: "28 Apr 2026 · 21:01:52 UTC", block: "#3,004" } }
        ]
      }
    ];
    function abbreviate(hash) {
      return hash.slice(0, 8) + "…" + hash.slice(-5);
    }
    const verifyInputs = reactive(DRAWS.map(() => ""));
    const verifyResults = reactive(DRAWS.map(() => ({ shown: false, success: false, message: "", winner: null })));
    const copyActive = reactive({});
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        class: ["section reveal", { visible: unref(revealed) }],
        id: "certified-draws"
      }, _attrs))}><div class="center"><div class="eyebrow"><span class="dot"></span>${ssrInterpolate(eyebrow.value)}</div><h2 class="h2">${ssrInterpolate(titleBefore.value)} <span class="grad-text">${ssrInterpolate(titleKeyword.value)}</span></h2><p class="lead center" style="${ssrRenderStyle({ "margin": "18px auto 0" })}">${ssrInterpolate(lead.value)}</p></div><div class="draws-explainer"><div class="draws-explainer-icon">🔐</div><div>${explainerText.value ?? ""}</div></div><div class="draws-grid"><!--[-->`);
      ssrRenderList(DRAWS, (draw, drawIdx) => {
        _push(`<div class="draw-card"><div class="${ssrRenderClass(["draw-image", draw.image])}"><span class="draw-image-emoji">${ssrInterpolate(draw.emoji)}</span><div class="draw-image-label">${ssrInterpolate(draw.label)}</div></div><div class="draw-card-body"><div class="draw-card-title">${ssrInterpolate(draw.title)}</div><div class="draw-card-meta">${ssrInterpolate(draw.meta)} · <strong>${ssrInterpolate(draw.hashes.length)} certified hashes</strong></div><div class="hash-list"><div class="hash-list-label">${ssrInterpolate(hashChainLabel.value)} <span class="cert-mini">${ssrInterpolate(certMiniLabel.value)}</span></div><!--[-->`);
        ssrRenderList(draw.hashes, (h2, hIdx) => {
          _push(`<div class="hash-row" title="Click to auto-fill"><span class="hash-seq">#${ssrInterpolate(h2.seq)}</span><code class="hash-text">${ssrInterpolate(abbreviate(h2.full))}</code><button class="${ssrRenderClass([{ copied: copyActive[`${drawIdx}-${hIdx}`] === "copied" }, "copy-btn"])}">${ssrInterpolate(copyActive[`${drawIdx}-${hIdx}`] === "copied" ? "Copied!" : copyActive[`${drawIdx}-${hIdx}`] === "fail" ? "Copy fail" : "Copy")}</button></div>`);
        });
        _push(`<!--]--></div><div class="verify-row"><div class="verify-input"><input type="text" class="verify-field"${ssrRenderAttr("placeholder", verifyPlaceholder.value)}${ssrRenderAttr("value", verifyInputs[drawIdx])} spellcheck="false"><button class="verify-btn">${ssrInterpolate(verifyBtnLabel.value)}</button></div><div class="verify-hint"> Or <a class="try-sample" href="#">${ssrInterpolate(trySampleLabel.value)}</a> ${ssrInterpolate(verifyHintSuffix.value)}</div><div class="${ssrRenderClass([{ shown: verifyResults[drawIdx].shown }, "verify-result"])}"><div class="${ssrRenderClass([{
          success: verifyResults[drawIdx].success,
          error: !verifyResults[drawIdx].success && verifyResults[drawIdx].shown
        }, "verify-result-inner"])}">`);
        if (verifyResults[drawIdx].success && verifyResults[drawIdx].winner) {
          _push(`<!--[--><div class="verify-result-tick">${ssrInterpolate(verifiedTitle.value)}</div><div class="verify-result-row"><span class="k">Winner</span><span class="v">${ssrInterpolate(verifyResults[drawIdx].winner.name)}</span></div><div class="verify-result-row"><span class="k">Ticket</span><span class="v">${ssrInterpolate(verifyResults[drawIdx].winner.ticket)}</span></div><div class="verify-result-row"><span class="k">Prize</span><span class="v">${ssrInterpolate(verifyResults[drawIdx].winner.prize)}</span></div><div class="verify-result-row"><span class="k">Draw timestamp</span><span class="v">${ssrInterpolate(verifyResults[drawIdx].winner.timestamp)}</span></div><div class="verify-result-row"><span class="k">Chain block</span><span class="v mono">${ssrInterpolate(verifyResults[drawIdx].winner.block)}</span></div><!--]-->`);
        } else if (verifyResults[drawIdx].shown) {
          _push(`<div class="verify-result-fail">${ssrInterpolate(verifyResults[drawIdx].message)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Draws/CertifiedDraws.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = {
  __name: "WhyOurFee",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText");
    const { sectionRef, revealed } = useReveal();
    function ft(key, fallback) {
      return getText(`fee.${key}`, fallback);
    }
    const eyebrow = computed(() => ft("eyebrow", "Why our pricing is what it is"));
    const titleBefore = computed(() => ft("title_before", "The cheapest platform isn't the best deal."));
    const titleKeyword = computed(() => ft("title_keyword", "The most expensive isn't either."));
    const lead = computed(() => ft("lead", "Below a certain price, platforms can't fund the engineering you'll need on draw night. Above it, you're paying for an agency markup. We're priced for the only thing that compounds your revenue — shipping the next feature, and the one after that."));
    const cheapIcon = computed(() => ft("cheap_icon", "⚠️"));
    const cheapTag = computed(() => ft("cheap_tag", "Suspiciously cheap"));
    const cheapH3 = computed(() => ft("cheap_h3", "When £0-per-order is the headline…"));
    const cheapP = computed(() => ft("cheap_p", "…ask where the engineering budget comes from. Somebody is paying for it. Eventually it'll be you."));
    const cheapItems = computed(() => [
      ft("cheap_li1", "Often venture-funded burn — fine until the runway ends"),
      ft("cheap_li2", `A "Pro tier" appears once you're operationally locked in`),
      ft("cheap_li3", "Skeleton support team, founder-replies-on-weekends model"),
      ft("cheap_li4", "No published independent pen-test budget"),
      ft("cheap_li5", "RNG certification renewals are an expense the cheap option skips"),
      ft("cheap_li6", "Changelog stalls 12 months after launch — count the dates")
    ]);
    const cheapBottom = computed(() => ft("cheap_bottom", "Cheap is expensive when the platform stops shipping."));
    const usIcon = computed(() => ft("us_icon", "✦"));
    const usTag = computed(() => ft("us_tag", "CompEngine — priced to keep shipping"));
    const usH3 = computed(() => ft("us_h3", "Your fee funds the next feature."));
    const usP = computed(() => ft("us_p", "And the one after that. Five years of consistent shipping. Every new feature included for every operator, automatically, the day it goes live."));
    const usItems = computed(() => [
      ft("us_li1", 'Every new feature included — never an upcharge, never a "Pro tier"'),
      ft("us_li2", "<strong>24 features shipped</strong> in the last 12 months, included for everyone"),
      ft("us_li3", "GLI recertification cycle funded — your seal stays current"),
      ft("us_li4", "Independent penetration test on a defined cycle"),
      ft("us_li5", "The team you talk to ships the next feature themselves"),
      ft("us_li6", "VCOC compliance updates automatic — no upgrade required")
    ]);
    const usBottom = computed(() => ft("us_bottom", "Your fee pays for the platform getting better while you sleep."));
    const expensiveIcon = computed(() => ft("expensive_icon", "↑"));
    const expensiveTag = computed(() => ft("expensive_tag", "Overpaying"));
    const expensiveH3 = computed(() => ft("expensive_h3", "When the headline is a high per-order fee…"));
    const expensiveP = computed(() => ft("expensive_p", "…you're funding the platform's agency overhead more than its engineering pipeline."));
    const expensiveItems = computed(() => [
      ft("expensive_li1", "Per-order rates much higher than ours, scaling painfully with success"),
      ft("expensive_li2", "Legacy infrastructure that hasn't been re-architected in years"),
      ft("expensive_li3", "Game library locked to fixed presets — operators all look identical"),
      ft("expensive_li4", "No Game Studio — your site looks like every other competitor's"),
      ft("expensive_li5", '"Closed-source as a security advantage" — auditors hate that argument'),
      ft("expensive_li6", "Per-customer onboarding overhead baked into your bill")
    ]);
    const expensiveBottom = computed(() => ft("expensive_bottom", "You're paying for their growth, not yours."));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        class: ["section reveal", { visible: unref(revealed) }],
        id: "why-fee"
      }, _attrs))}><div class="center"><div class="eyebrow"><span class="dot"></span>${ssrInterpolate(eyebrow.value)}</div><h2 class="h2">${ssrInterpolate(titleBefore.value)}<br><span class="grad-text">${ssrInterpolate(titleKeyword.value)}</span></h2><p class="lead center" style="${ssrRenderStyle({ "margin": "18px auto 0" })}">${ssrInterpolate(lead.value)}</p></div><div class="fee-grid"><div class="fee-col cheap"><div class="fee-col-tag"><span>${ssrInterpolate(cheapIcon.value)}</span>${ssrInterpolate(cheapTag.value)}</div><h3>${ssrInterpolate(cheapH3.value)}</h3><p>${ssrInterpolate(cheapP.value)}</p><ul><!--[-->`);
      ssrRenderList(cheapItems.value, (item, i2) => {
        _push(`<li>${item ?? ""}</li>`);
      });
      _push(`<!--]--></ul><div class="fee-col-bottom">${ssrInterpolate(cheapBottom.value)}</div></div><div class="fee-col us"><div class="fee-col-tag"><span>${ssrInterpolate(usIcon.value)}</span>${ssrInterpolate(usTag.value)}</div><h3>${ssrInterpolate(usH3.value)}</h3><p>${ssrInterpolate(usP.value)}</p><ul><!--[-->`);
      ssrRenderList(usItems.value, (item, i2) => {
        _push(`<li>${item ?? ""}</li>`);
      });
      _push(`<!--]--></ul><div class="fee-col-bottom">${ssrInterpolate(usBottom.value)}</div></div><div class="fee-col expensive"><div class="fee-col-tag"><span>${ssrInterpolate(expensiveIcon.value)}</span>${ssrInterpolate(expensiveTag.value)}</div><h3>${ssrInterpolate(expensiveH3.value)}</h3><p>${ssrInterpolate(expensiveP.value)}</p><ul><!--[-->`);
      ssrRenderList(expensiveItems.value, (item, i2) => {
        _push(`<li>${item ?? ""}</li>`);
      });
      _push(`<!--]--></ul><div class="fee-col-bottom">${ssrInterpolate(expensiveBottom.value)}</div></div></div></section>`);
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Fee/WhyOurFee.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = {
  __name: "ComparisonTable",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    const { sectionRef, revealed } = useReveal();
    function ct(key, fallback) {
      return getText(`cmp.${key}`, fallback);
    }
    const eyebrow = computed(() => ct("eyebrow", "Side by side"));
    const titleMain = computed(() => ct("title", "How we stack up."));
    const lead = computed(() => ct("lead", "Pick what you're considering. We'll show you the differences that actually move the needle."));
    const TABLES = {
      rafflex: {
        tabLabel: ct("tab_rafflex", "vs RaffleX"),
        name: ct("tab_rafflex_name", "RaffleX"),
        rows: [
          ["Years operating in this category", "5+ years", "4+ years"],
          ["Per-order fee", "5–10p", "17p"],
          ["Game customisation", "Game Studio — build your own", "7+ fixed presets"],
          ["Independent penetration test", "Yes — published", "Not published"],
          ["Separate Cash + Site Credit wallets", "Yes", "Not advertised"],
          ["RNG / draw certification", "GLI", "GLI Verified"],
          ["VCOC alignment in product", "Built in from launch", "Added recently"],
          ["Public order / ticket numbers (30d)", "245k orders / 13.25M tickets", "Not published"]
        ]
      },
      flat: {
        tabLabel: ct("tab_flat", "vs flat-fee platforms"),
        name: ct("tab_flat_name", "Other UK platforms with big flat fees"),
        rows: [
          ["Years operating in this category", "5+ years", "Newer entrants (typically <2 yrs)"],
          ["Entry pricing", "5–10p per order — pay only when you sell", "£499/month from day one, before a ticket is sold"],
          ["Pricing for small operators (<5k orders/mo)", "£25–£500/month", "£499/month flat"],
          ["Pricing for scaling operators (50k+ orders/mo)", "£2,000/month flat", "£1,299–£1,499/month flat"],
          ["Game customisation", "Game Studio — build your own", "Fixed reveal animations"],
          ["Wallet model", "Cash + Site Credit (separate)", "Single wallet (mixed funds)"],
          ["Track record at real volume", "245k orders / 13.25M tickets last 30d", "Limited public operating numbers"],
          ["UK VCOC signatory", "Yes — from launch", "Yes (typical)"]
        ]
      },
      wp: {
        tabLabel: ct("tab_wp", "vs WordPress + plugins"),
        name: ct("tab_wp_name", "WordPress + plugins"),
        rows: [
          ["Setup", "Hosted platform, zero plugins", "25+ plugins, fragile stack"],
          ["Performance", "Single-page app, instant browsing", "Plugin-throttled, full reloads"],
          ["Payment integration", "UK-licensed gateway, fully integrated", "Bolt-on payment plugin"],
          ["Compliance with UK VCOC", "System-enforced from launch", "Manual, plugin-dependent"],
          ["Hosting costs at scale", "Included", "£2k+/mo dedicated servers (real customer case)"],
          ["Security updates", "Continuous, managed", "You patch every plugin yourself"],
          ["Free-entry compliance", "Built in, automated", "Manual, hand-rolled"]
        ]
      }
    };
    const TAB_KEYS = ["rafflex", "flat", "wp"];
    const activeTab = ref("rafflex");
    const currentTable = computed(() => TABLES[activeTab.value]);
    const sourcesNote = computed(() => ct("sources", "Sources: rafflex.io homepage (May 2026); typical UK flat-fee platform pricing observed at May 2026; CompEngine internal numbers (May 2026 rolling-30-day)."));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        class: ["section reveal", { visible: unref(revealed) }],
        id: "comparison"
      }, _attrs))}><div class="center"><div class="eyebrow"><span class="dot"></span>${ssrInterpolate(eyebrow.value)}</div><h2 class="h2">${ssrInterpolate(titleMain.value)}</h2><p class="lead center" style="${ssrRenderStyle({ "margin": "18px auto 0" })}">${ssrInterpolate(lead.value)}</p></div><div style="${ssrRenderStyle({ "margin-top": "40px" })}"><div class="cmp-tabs"><!--[-->`);
      ssrRenderList(TAB_KEYS, (key) => {
        _push(`<button class="${ssrRenderClass([{ active: activeTab.value === key }, "cmp-tab"])}">${ssrInterpolate(TABLES[key].tabLabel)}</button>`);
      });
      _push(`<!--]--></div><div style="${ssrRenderStyle({ "overflow-x": "auto" })}"><table class="cmp-table"><thead><tr><th style="${ssrRenderStyle({ "width": "34%" })}">Feature</th><th style="${ssrRenderStyle({ "width": "33%", "color": "var(--orange)" })}">CompEngine</th><th style="${ssrRenderStyle({ "width": "33%" })}">${ssrInterpolate(currentTable.value.name)}</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(currentTable.value.rows, (row, i2) => {
        _push(`<tr><td>${ssrInterpolate(row[0])}</td><td class="us">${ssrInterpolate(row[1])}</td><td class="them">${ssrInterpolate(row[2])}</td></tr>`);
      });
      _push(`<!--]--></tbody></table><p style="${ssrRenderStyle({ "font-size": "13px", "color": "var(--text-3)", "margin-top": "14px" })}">${ssrInterpolate(sourcesNote.value)}</p></div></div></section>`);
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Comparison/ComparisonTable.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = {
  __name: "AIFeatures",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    const { sectionRef, revealed } = useReveal();
    function at(key, fallback) {
      return getText(`ai.${key}`, fallback);
    }
    const eyebrow = computed(() => at("eyebrow", "What's coming next"));
    const titleBefore = computed(() => at("title_before", "The AI roadmap is"));
    const titleKeyword = computed(() => at("title_keyword", "already being built."));
    const lead = computed(() => at("lead", "We're integrating machine learning into the parts of your business that move money: demand forecasting, customer segmentation, revenue attribution. Public release in phases — existing operators get every feature automatically."));
    const AI_CARDS = [
      { emoji: "🤖", title: at("card1_title", "Demand Forecasting"), text: at("card1_text", "Predict ticket demand per draw type, adjusting prize structures before you publish.") },
      { emoji: "🎯", title: at("card2_title", "Smart Targeting"), text: at("card2_text", "Segment customers by lifetime value and re-engage with dynamically generated offers.") },
      { emoji: "📊", title: at("card3_title", "Revenue Insights"), text: at("card3_text", "ML-attributed revenue per game type, acquisition channel, and promotional mechanic.") },
      { emoji: "✍️", title: at("card4_title", "AI Content Assist"), text: at("card4_text", "Competition titles, rules copy, and email subject lines — generated and A/B tested automatically.") }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        class: ["section reveal", { visible: unref(revealed) }]
      }, _attrs))} data-v-1f1f301e><div class="ai-block" data-v-1f1f301e><div class="center" data-v-1f1f301e><div class="eyebrow" data-v-1f1f301e><span class="dot" data-v-1f1f301e></span>${ssrInterpolate(eyebrow.value)}</div><h2 class="h2" data-v-1f1f301e>${ssrInterpolate(titleBefore.value)} <span class="grad-text" data-v-1f1f301e>${ssrInterpolate(titleKeyword.value)}</span></h2><p class="lead center" style="${ssrRenderStyle({ "margin": "14px auto 0" })}" data-v-1f1f301e>${ssrInterpolate(lead.value)}</p></div><div class="ai-grid" data-v-1f1f301e><!--[-->`);
      ssrRenderList(AI_CARDS, (card, i2) => {
        _push(`<div class="ai-card" data-v-1f1f301e><div class="ai-emoji" data-v-1f1f301e>${ssrInterpolate(card.emoji)}</div><h5 data-v-1f1f301e>${ssrInterpolate(card.title)}</h5><p class="ai-card-text" data-v-1f1f301e>${ssrInterpolate(card.text)}</p></div>`);
      });
      _push(`<!--]--></div><div style="${ssrRenderStyle({ "text-align": "center", "margin-top": "30px" })}" data-v-1f1f301e><span class="price-tag" style="${ssrRenderStyle({ "position": "static", "display": "inline-block" })}" data-v-1f1f301e>COMING SOON — included for all operators</span></div></div></section>`);
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Platform/AIFeatures.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const AIFeatures = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-1f1f301e"]]);
const _sfc_main$b = {
  __name: "PricingCards",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    const { sectionRef, revealed } = useReveal();
    function pt(key, fallback) {
      return getText(`pricing.${key}`, fallback);
    }
    const eyebrow = computed(() => pt("eyebrow", "Pricing"));
    const titleBefore = computed(() => pt("title_before", "Two tiers."));
    const titleKeyword = computed(() => pt("title_keyword", "No tricks."));
    const lead = computed(() => pt("lead", "Pay 5–10p per order while you're growing. Switch to flat-rate Enterprise when volume makes it cheaper. Most operators make that switch at around 20,000 orders per month."));
    const plans = computed(() => {
      const plan1Features = [];
      const plan2Features = [];
      for (let i2 = 1; i2 <= 10; i2++) {
        const f2 = getText(`pricing.plan1_feature${i2}`, "");
        if (f2 && f2.trim()) plan1Features.push(f2);
      }
      if (plan1Features.length === 0) {
        plan1Features.push(
          "All game types — including Game Studio",
          "Full analytics & reporting dashboard",
          "Personalised onboarding handover",
          "All future features included automatically",
          "1–2 week average launch time"
        );
      }
      for (let i2 = 1; i2 <= 10; i2++) {
        const f2 = getText(`pricing.plan2_feature${i2}`, "");
        if (f2 && f2.trim()) plan2Features.push(f2);
      }
      if (plan2Features.length === 0) {
        plan2Features.push(
          "Everything in Pay As You Go",
          "Fixed monthly cost — no per-order charges",
          "Dedicated account manager",
          "Priority 24/7 support",
          "Custom contract & SLA"
        );
      }
      return [
        {
          name: pt("plan1_name", "Pay As You Go"),
          price: pt("plan1_price", "5–10p"),
          priceSuffix: pt("plan1_price_suffix", "&nbsp;per order"),
          priceSub: pt("plan1_subtext", "No monthly minimum. Scale freely."),
          description: pt("plan1_description", "Pay only when customers order. Perfect from first launch through to ~20k orders/month."),
          features: plan1Features,
          popular: false,
          badge: "",
          buttonText: pt("plan1_button", "Get started"),
          action: pt("plan1_action", "calendly")
        },
        {
          name: pt("plan2_name", "Enterprise"),
          price: pt("plan2_price", "£2,000"),
          priceSuffix: pt("plan2_price_suffix", "&nbsp;/ month"),
          priceSub: pt("plan2_subtext", "or starts at 5p / order — whichever is lower."),
          description: pt("plan2_description", "A flat rate that makes financial planning simple. Locked in when volume means per-order is more expensive."),
          features: plan2Features,
          popular: true,
          badge: pt("plan2_badge", "Most operators"),
          buttonText: pt("plan2_button", "Book a demo"),
          action: pt("plan2_action", "calendly")
        }
      ];
    });
    onMounted(() => {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        class: ["section reveal", { visible: unref(revealed) }],
        id: "pricing"
      }, _attrs))}><div class="center"><div class="eyebrow"><span class="dot"></span>${ssrInterpolate(eyebrow.value)}</div><h2 class="h2">${ssrInterpolate(titleBefore.value)} <span class="grad-text">${ssrInterpolate(titleKeyword.value)}</span></h2><p class="lead center" style="${ssrRenderStyle({ "margin": "18px auto 0" })}">${ssrInterpolate(lead.value)}</p></div><div class="pricing-grid"><!--[-->`);
      ssrRenderList(plans.value, (plan, idx) => {
        _push(`<div class="${ssrRenderClass([{ popular: plan.popular }, "price-card"])}">`);
        if (plan.badge) {
          _push(`<div class="price-tag">${ssrInterpolate(plan.badge)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h3>${ssrInterpolate(plan.name)}</h3><p style="${ssrRenderStyle({ "font-size": "13px", "color": "var(--text-3)", "margin": "6px 0 0" })}">${ssrInterpolate(plan.description)}</p><div class="price"><span>${plan.price + plan.priceSuffix}</span></div><div class="price-tag-sub">${ssrInterpolate(plan.priceSub)}</div><ul><!--[-->`);
        ssrRenderList(plan.features, (feat, fi) => {
          _push(`<li>${ssrInterpolate(feat)}</li>`);
        });
        _push(`<!--]--></ul><button class="btn btn-orange" style="${ssrRenderStyle({ "width": "100%" })}">${ssrInterpolate(plan.buttonText)}</button></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Pricing/PricingCards.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = {
  __name: "FAQSection",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    const siteTexts = inject("siteTexts");
    const { sectionRef, revealed } = useReveal();
    function fq(key, fallback) {
      return getText(`faq.${key}`, fallback);
    }
    const eyebrow = computed(() => fq("eyebrow", "FAQ"));
    const titleBefore = computed(() => fq("title_before", "Questions we get"));
    const titleKeyword = computed(() => fq("title_keyword", "before every call."));
    const lead = computed(() => fq("lead", "If yours isn't here, it'll be answered in the first five minutes of the demo."));
    const FAQS_FALLBACK = [
      {
        question: 'What does "5–10p per order" actually mean?',
        answer: "Each time a customer places an order on your platform — buying tickets, entries, or a bundle — we charge between 5p and 10p. The exact rate depends on your volume tier. There's no monthly minimum, no setup fee, and no charge for page views, registrations, or anything that isn't an order. Most operators start at 10p and reach 5p within their first three months."
      },
      {
        question: "What happens when I need help?",
        answer: "You talk to the people who built the platform. We have no first-line support outsourcing — every person on the support team can read the code. On draw nights, there's someone monitoring in real time. Our average response time for urgent issues is under 8 minutes."
      },
      {
        question: "Can I customise the look and feel?",
        answer: "Yes — extensively. Game Studio lets you configure every visual and mechanical aspect of each game type. Beyond that, you control colours, typography, layout, and all copy. Your site doesn't have to look like any other competition platform on the market."
      },
      {
        question: "Is CompEngine compliant with the UK VCOC?",
        answer: "Yes. CompEngine was designed with VCOC compliance as a constraint, not an afterthought. Free-entry routes are built in and automated. Age verification is integrated. Wallet segregation (Cash vs Site Credit) is enforced at the platform level. When VCOC guidance changes, the update ships automatically to all operators."
      },
      {
        question: "What games can I offer?",
        answer: "Slots, Scratch Cards, Spin-the-Wheel, Bingo, Coin Drop, and Balloon Pop — each fully configurable in Game Studio. You can run multiple game types simultaneously, set different reveal mechanics per draw, and preview exactly how each game will look before you publish."
      },
      {
        question: "How does the wallet system work?",
        answer: "We operate two completely separate wallet balances per customer: Cash (withdrawable, funded by real money) and Site Credit (non-withdrawable, funded by bonuses and winnings you specify). The separation is enforced at the database level — it's impossible to accidentally mix them. This matters for VCOC compliance and for your own accounting."
      },
      {
        question: "What does GLI certification mean for my operators?",
        answer: "GLI (Gaming Laboratories International) is an independent testing body that verifies our RNG is statistically fair and that draw results can't be manipulated. The certification is renewed on a defined cycle — the cost is part of our operating budget, not an extra charge. You can display the GLI seal on your platform."
      },
      {
        question: "How long does it take to launch?",
        answer: "Most operators are live within 1–2 weeks of their onboarding call. The onboarding process covers domain setup, payment gateway connection, game configuration, and a test draw. We've done it in 4 days for operators with an urgent deadline."
      },
      {
        question: "Can I see my own data?",
        answer: "Yes — your analytics dashboard shows orders, revenue, ticket counts, game performance, customer lifetime value, and draw results in real time. You can export everything. You own your data. We don't aggregate it across operators or sell insights derived from it."
      }
    ];
    const faqs = computed(() => {
      var _a;
      if (siteTexts.loading || !((_a = siteTexts.data) == null ? void 0 : _a.faq)) {
        return FAQS_FALLBACK;
      }
      const faqData = siteTexts.data.faq;
      const questionKeys = Object.keys(faqData).filter((key) => /^faq\.q\d+$/.test(key)).sort((a2, b2) => {
        var _a2, _b;
        return parseInt(((_a2 = a2.match(/\d+/)) == null ? void 0 : _a2[0]) || "0") - parseInt(((_b = b2.match(/\d+/)) == null ? void 0 : _b[0]) || "0");
      });
      if (questionKeys.length === 0) return FAQS_FALLBACK;
      return questionKeys.map((qKey) => {
        var _a2;
        const num = (_a2 = qKey.match(/\d+/)) == null ? void 0 : _a2[0];
        return {
          question: faqData[qKey] || "",
          answer: faqData[`faq.a${num}`] || ""
        };
      });
    });
    const openIdx = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        class: ["section reveal", { visible: unref(revealed) }],
        id: "faq"
      }, _attrs))}><div class="center"><div class="eyebrow"><span class="dot"></span>${ssrInterpolate(eyebrow.value)}</div><h2 class="h2">${ssrInterpolate(titleBefore.value)} <span class="grad-text">${ssrInterpolate(titleKeyword.value)}</span></h2><p class="lead center" style="${ssrRenderStyle({ "margin": "14px auto 0" })}">${ssrInterpolate(lead.value)}</p></div><div class="faq-list"><!--[-->`);
      ssrRenderList(faqs.value, (item, i2) => {
        _push(`<div class="${ssrRenderClass([{ open: openIdx.value === i2 }, "faq-item"])}"><div class="faq-q"><span>${ssrInterpolate(item.question)}</span><span class="chev">+</span></div><div class="faq-a">${ssrInterpolate(item.answer)}</div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FAQ/FAQSection.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = {
  __name: "BookingSection",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText", (key, fallback = "") => fallback);
    const { sectionRef, revealed } = useReveal();
    function bt(key, fallback) {
      return getText(`cta.${key}`, fallback);
    }
    const eyebrow = computed(() => bt("eyebrow", "Get started today"));
    const titleBefore = computed(() => bt("title_before", "Ready to launch the UK's"));
    const titleKeyword = computed(() => bt("title_keyword", "fairest competition platform?"));
    const lead = computed(() => bt("lead", "30 minutes. A live demo on your brief. No sales deck, no NDAs, no obligation. Just the platform running with your prize, your game type, your brand — so you can see exactly what you'd be launching."));
    const btn1 = computed(() => bt("btn1", "Book a 30-min demo →"));
    const btn2 = computed(() => bt("btn2", "Talk to the team"));
    const subtext = computed(() => bt("subtext", "Typical response under 4 hours · No obligation · Cancel any time"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        ref_key: "sectionRef",
        ref: sectionRef,
        class: ["section reveal", { visible: unref(revealed) }],
        id: "booking"
      }, _attrs))}><div class="final-cta"><div class="eyebrow" style="${ssrRenderStyle({ "justify-content": "center" })}"><span class="dot"></span>${ssrInterpolate(eyebrow.value)}</div><h2 class="h2" style="${ssrRenderStyle({ "margin-top": "18px" })}">${ssrInterpolate(titleBefore.value)}<br><span class="grad-text">${ssrInterpolate(titleKeyword.value)}</span></h2><p class="lead center" style="${ssrRenderStyle({ "margin": "18px auto 0", "max-width": "600px" })}">${ssrInterpolate(lead.value)}</p><div style="${ssrRenderStyle({ "display": "flex", "gap": "14px", "justify-content": "center", "margin-top": "34px", "flex-wrap": "wrap" })}"><button class="btn btn-orange">${ssrInterpolate(btn1.value)}</button><button class="btn btn-ghost">${ssrInterpolate(btn2.value)}</button></div><p style="${ssrRenderStyle({ "font-size": "12px", "color": "var(--text-3)", "margin-top": "20px" })}">${ssrInterpolate(subtext.value)}</p></div></section>`);
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Booking/BookingSection.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = {
  __name: "MobileStickyBar",
  __ssrInlineRender: true,
  setup(__props) {
    const getText = inject("getText");
    const shown = ref(false);
    const barText = computed(() => getText("mobile_cta.text", "Launch your platform"));
    const barBtn = computed(() => getText("mobile_cta.btn", "Book a demo"));
    function updateVisibility() {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      const nearBottom = scrollY + viewHeight > docHeight - 700;
      shown.value = scrollY > 600 && !nearBottom;
    }
    onMounted(() => {
      window.addEventListener("scroll", updateVisibility, { passive: true });
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", updateVisibility);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["mobile-cta-bar", { shown: shown.value }]
      }, _attrs))}><div class="mobile-cta-text"><svg class="gear" viewBox="0 0 100 100" aria-hidden="true"><use href="#gear-logo"></use></svg><span>${ssrInterpolate(barText.value)}</span></div><button class="btn btn-orange">${ssrInterpolate(barBtn.value)}</button></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/CTA/MobileStickyBar.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "Home",
  __ssrInlineRender: true,
  setup(__props) {
    onMounted(() => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Competition Engine - Ultimate Competition Platform</title><meta name="description" content="Build, manage, and scale engaging competitions with Competition Engine — the ultimate competition platform built for operators. No code needed." head-key="description"${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Competition Engine - Ultimate Competition Platform"),
              createVNode("meta", {
                name: "description",
                content: "Build, manage, and scale engaging competitions with Competition Engine — the ultimate competition platform built for operators. No code needed.",
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
            _push2(`<div class="ce-home"${_scopeId}><div class="bg-fx"${_scopeId}></div><svg width="0" height="0" style="${ssrRenderStyle({ "position": "absolute" })}" aria-hidden="true"${_scopeId}><defs${_scopeId}><linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%"${_scopeId}><stop offset="0%" stop-color="#5b7fc4"${_scopeId}></stop><stop offset="22%" stop-color="#8a5fb8"${_scopeId}></stop><stop offset="45%" stop-color="#b297db"${_scopeId}></stop><stop offset="68%" stop-color="#d97aa8"${_scopeId}></stop><stop offset="85%" stop-color="#ec8a82"${_scopeId}></stop><stop offset="100%" stop-color="#f4a558"${_scopeId}></stop></linearGradient><symbol id="gear-logo" viewBox="0 0 100 100"${_scopeId}><path fill="none" stroke="url(#gearGrad)" stroke-width="3.5" stroke-linejoin="round" d="
                            M 50 4
                            L 56 4 L 58 14
                            A 36 36 0 0 1 65 16
                            L 71 8 L 76 12
                            L 73 21
                            A 36 36 0 0 1 79 25
                            L 88 22 L 92 27
                            L 86 35
                            A 36 36 0 0 1 88 42
                            L 96 44 L 96 50 L 96 56
                            L 88 58
                            A 36 36 0 0 1 86 65
                            L 92 73 L 88 78
                            L 79 75
                            A 36 36 0 0 1 73 79
                            L 76 88 L 71 92
                            L 65 84
                            A 36 36 0 0 1 58 86
                            L 56 96 L 50 96 L 44 96
                            L 42 86
                            A 36 36 0 0 1 35 84
                            L 29 92 L 24 88
                            L 27 79
                            A 36 36 0 0 1 21 75
                            L 12 78 L 8 73
                            L 14 65
                            A 36 36 0 0 1 12 58
                            L 4 56 L 4 50 L 4 44
                            L 12 42
                            A 36 36 0 0 1 14 35
                            L 8 27 L 12 22
                            L 21 25
                            A 36 36 0 0 1 27 21
                            L 24 12 L 29 8
                            L 35 16
                            A 36 36 0 0 1 42 14
                            L 44 4 Z
                        "${_scopeId}></path><circle cx="50" cy="50" r="32" fill="none" stroke="url(#gearGrad)" stroke-width="1.5" opacity="0.9"${_scopeId}></circle><circle cx="50" cy="50" r="28" fill="none" stroke="url(#gearGrad)" stroke-width="1" opacity="0.55"${_scopeId}></circle></symbol></defs></svg>`);
            _push2(ssrRenderComponent(_sfc_main$w, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$v, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$u, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(GameConfigurator, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(EcosystemFeatures, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$g, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$f, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$e, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$d, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(AIFeatures, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$b, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$a, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$8, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "ce-home" }, [
                createVNode("div", { class: "bg-fx" }),
                (openBlock(), createBlock("svg", {
                  width: "0",
                  height: "0",
                  style: { "position": "absolute" },
                  "aria-hidden": "true"
                }, [
                  createVNode("defs", null, [
                    createVNode("linearGradient", {
                      id: "gearGrad",
                      x1: "0%",
                      y1: "0%",
                      x2: "100%",
                      y2: "100%"
                    }, [
                      createVNode("stop", {
                        offset: "0%",
                        "stop-color": "#5b7fc4"
                      }),
                      createVNode("stop", {
                        offset: "22%",
                        "stop-color": "#8a5fb8"
                      }),
                      createVNode("stop", {
                        offset: "45%",
                        "stop-color": "#b297db"
                      }),
                      createVNode("stop", {
                        offset: "68%",
                        "stop-color": "#d97aa8"
                      }),
                      createVNode("stop", {
                        offset: "85%",
                        "stop-color": "#ec8a82"
                      }),
                      createVNode("stop", {
                        offset: "100%",
                        "stop-color": "#f4a558"
                      })
                    ]),
                    createVNode("symbol", {
                      id: "gear-logo",
                      viewBox: "0 0 100 100"
                    }, [
                      createVNode("path", {
                        fill: "none",
                        stroke: "url(#gearGrad)",
                        "stroke-width": "3.5",
                        "stroke-linejoin": "round",
                        d: "\n                            M 50 4\n                            L 56 4 L 58 14\n                            A 36 36 0 0 1 65 16\n                            L 71 8 L 76 12\n                            L 73 21\n                            A 36 36 0 0 1 79 25\n                            L 88 22 L 92 27\n                            L 86 35\n                            A 36 36 0 0 1 88 42\n                            L 96 44 L 96 50 L 96 56\n                            L 88 58\n                            A 36 36 0 0 1 86 65\n                            L 92 73 L 88 78\n                            L 79 75\n                            A 36 36 0 0 1 73 79\n                            L 76 88 L 71 92\n                            L 65 84\n                            A 36 36 0 0 1 58 86\n                            L 56 96 L 50 96 L 44 96\n                            L 42 86\n                            A 36 36 0 0 1 35 84\n                            L 29 92 L 24 88\n                            L 27 79\n                            A 36 36 0 0 1 21 75\n                            L 12 78 L 8 73\n                            L 14 65\n                            A 36 36 0 0 1 12 58\n                            L 4 56 L 4 50 L 4 44\n                            L 12 42\n                            A 36 36 0 0 1 14 35\n                            L 8 27 L 12 22\n                            L 21 25\n                            A 36 36 0 0 1 27 21\n                            L 24 12 L 29 8\n                            L 35 16\n                            A 36 36 0 0 1 42 14\n                            L 44 4 Z\n                        "
                      }),
                      createVNode("circle", {
                        cx: "50",
                        cy: "50",
                        r: "32",
                        fill: "none",
                        stroke: "url(#gearGrad)",
                        "stroke-width": "1.5",
                        opacity: "0.9"
                      }),
                      createVNode("circle", {
                        cx: "50",
                        cy: "50",
                        r: "28",
                        fill: "none",
                        stroke: "url(#gearGrad)",
                        "stroke-width": "1",
                        opacity: "0.55"
                      })
                    ])
                  ])
                ])),
                createVNode(_sfc_main$w),
                createVNode(_sfc_main$v),
                createVNode(_sfc_main$u),
                createVNode(GameConfigurator),
                createVNode(EcosystemFeatures),
                createVNode(_sfc_main$g),
                createVNode(_sfc_main$f),
                createVNode(_sfc_main$e),
                createVNode(_sfc_main$d),
                createVNode(AIFeatures),
                createVNode(_sfc_main$b),
                createVNode(_sfc_main$a),
                createVNode(_sfc_main$9),
                createVNode(_sfc_main$8)
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __vite_glob_0_15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<button${ssrRenderAttrs(mergeProps({ class: "inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</button>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DangerButton.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const DangerButton = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$5 = {
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Modal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/SecondaryButton.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
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
      _push(ssrRenderComponent(_sfc_main$5, {
        show: confirmingUserDeletion.value,
        onClose: closeModal
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h2 class="text-lg font-medium text-gray-900"${_scopeId}> Are you sure you want to delete your account? </h2><p class="mt-1 text-sm text-gray-600"${_scopeId}> Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. </p><div class="mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$T, {
              for: "password",
              value: "Password",
              class: "sr-only"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$R, {
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
            _push2(ssrRenderComponent(_sfc_main$U, {
              message: unref(form).errors.password,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-6 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, { onClick: closeModal }, {
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
                  createVNode(_sfc_main$T, {
                    for: "password",
                    value: "Password",
                    class: "sr-only"
                  }),
                  createVNode(_sfc_main$R, {
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
                  createVNode(_sfc_main$U, {
                    message: unref(form).errors.password,
                    class: "mt-2"
                  }, null, 8, ["message"])
                ]),
                createVNode("div", { class: "mt-6 flex justify-end" }, [
                  createVNode(_sfc_main$4, { onClick: closeModal }, {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/DeleteUserForm.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __vite_glob_0_17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
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
      _push(ssrRenderComponent(_sfc_main$T, {
        for: "current_password",
        value: "Current Password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$R, {
        id: "current_password",
        ref_key: "currentPasswordInput",
        ref: currentPasswordInput,
        modelValue: unref(form).current_password,
        "onUpdate:modelValue": ($event) => unref(form).current_password = $event,
        type: "password",
        class: "mt-1 block w-full",
        autocomplete: "current-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$U, {
        message: unref(form).errors.current_password,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$T, {
        for: "password",
        value: "New Password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$R, {
        id: "password",
        ref_key: "passwordInput",
        ref: passwordInput,
        modelValue: unref(form).password,
        "onUpdate:modelValue": ($event) => unref(form).password = $event,
        type: "password",
        class: "mt-1 block w-full",
        autocomplete: "new-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$U, {
        message: unref(form).errors.password,
        class: "mt-2"
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$T, {
        for: "password_confirmation",
        value: "Confirm Password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$R, {
        id: "password_confirmation",
        modelValue: unref(form).password_confirmation,
        "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
        type: "password",
        class: "mt-1 block w-full",
        autocomplete: "new-password"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$U, {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdatePasswordForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __vite_glob_0_18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
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
      _push(ssrRenderComponent(_sfc_main$T, {
        for: "name",
        value: "Name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$R, {
        id: "name",
        type: "text",
        class: "mt-1 block w-full",
        modelValue: unref(form).name,
        "onUpdate:modelValue": ($event) => unref(form).name = $event,
        required: "",
        autofocus: "",
        autocomplete: "name"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$U, {
        class: "mt-2",
        message: unref(form).errors.name
      }, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_sfc_main$T, {
        for: "email",
        value: "Email"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$R, {
        id: "email",
        type: "email",
        class: "mt-1 block w-full",
        modelValue: unref(form).email,
        "onUpdate:modelValue": ($event) => unref(form).email = $event,
        required: "",
        autocomplete: "username"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$U, {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Partials/UpdateProfileInformationForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __vite_glob_0_19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
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
      _push(ssrRenderComponent(_sfc_main$A, null, {
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
            _push2(ssrRenderComponent(_sfc_main$1, {
              "must-verify-email": __props.mustVerifyEmail,
              status: __props.status,
              class: "max-w-xl"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="bg-white p-4 shadow sm:rounded-lg sm:p-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, { class: "max-w-xl" }, null, _parent2, _scopeId));
            _push2(`</div><div class="bg-white p-4 shadow sm:rounded-lg sm:p-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, { class: "max-w-xl" }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [
                    createVNode(_sfc_main$1, {
                      "must-verify-email": __props.mustVerifyEmail,
                      status: __props.status,
                      class: "max-w-xl"
                    }, null, 8, ["must-verify-email", "status"])
                  ]),
                  createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [
                    createVNode(_sfc_main$2, { class: "max-w-xl" })
                  ]),
                  createVNode("div", { class: "bg-white p-4 shadow sm:rounded-lg sm:p-8" }, [
                    createVNode(_sfc_main$3, { class: "max-w-xl" })
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __vite_glob_0_16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
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
createServer(
  (page) => createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/About.vue": __vite_glob_0_0, "./Pages/Auth/ConfirmPassword.vue": __vite_glob_0_1, "./Pages/Auth/ForgotPassword.vue": __vite_glob_0_2, "./Pages/Auth/Login.vue": __vite_glob_0_3, "./Pages/Auth/Register.vue": __vite_glob_0_4, "./Pages/Auth/ResetPassword.vue": __vite_glob_0_5, "./Pages/Auth/VerifyEmail.vue": __vite_glob_0_6, "./Pages/Blog.vue": __vite_glob_0_7, "./Pages/BlogShow.vue": __vite_glob_0_8, "./Pages/Changelog.vue": __vite_glob_0_9, "./Pages/Changelog/Password.vue": __vite_glob_0_10, "./Pages/Contact.vue": __vite_glob_0_11, "./Pages/Dashboard.vue": __vite_glob_0_12, "./Pages/Documentation/Password.vue": __vite_glob_0_13, "./Pages/Documentation/Show.vue": __vite_glob_0_14, "./Pages/Home.vue": __vite_glob_0_15, "./Pages/Profile/Edit.vue": __vite_glob_0_16, "./Pages/Profile/Partials/DeleteUserForm.vue": __vite_glob_0_17, "./Pages/Profile/Partials/UpdatePasswordForm.vue": __vite_glob_0_18, "./Pages/Profile/Partials/UpdateProfileInformationForm.vue": __vite_glob_0_19 });
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
      }).use(plugin).use(_).use(SiteTextPluginSSR);
    }
  })
);
