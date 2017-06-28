/*!
 * Handsontable 0.19.0
 * Handsontable is a JavaScript library for editable tables with basic copy-paste compatibility with Excel and Google Docs
 *
 * Copyright (c) 2012-2014 Marcin Warpechowski
 * Copyright 2015 Handsoncode sp. z o.o. <hello@handsontable.com>
 * Licensed under the MIT license.
 * http://handsontable.com/
 *
 * Date: Fri Oct 02 2015 12:37:12 GMT+0200 (CEST)
 */
/*jslint white: true, browser: true, plusplus: true, indent: 4, maxerr: 50 */

window.Handsontable = {
  version: '0.19.0',
  buildDate: 'Fri Oct 02 2015 12:37:12 GMT+0200 (CEST)',
};
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Handsontable = f()}})(function(){var define,module,exports;return (function init(modules, cache, entry) {
  (function outer (modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require == "function" && require;
    var globalNS = JSON.parse('{"zeroclipboard":"ZeroClipboard","moment":"moment","pikaday":"Pikaday"}') || {};

    function newRequire(name, jumped){
      if(!cache[name]) {

        if(!modules[name]) {
          // if we cannot find the the module within our internal map or
          // cache jump to the current global require ie. the last bundle
          // that was added to the page.
          var currentRequire = typeof require == "function" && require;
          if (!jumped && currentRequire) return currentRequire(name, true);

          // If there are other bundles on this page the require from the
          // previous one is saved to 'previousRequire'. Repeat this as
          // many times as there are bundles until the module is found or
          // we exhaust the require chain.
          if (previousRequire) return previousRequire(name, true);

          // Try find module from global scope
          if (globalNS[name] && typeof window[globalNS[name]] !== 'undefined') {
            return window[globalNS[name]];
          }

          var err = new Error('Cannot find module \'' + name + '\'');
          err.code = 'MODULE_NOT_FOUND';
          throw err;
        }
        var m = cache[name] = {exports:{}};
        modules[name][0].call(m.exports, function(x){
          var id = modules[name][1][x];
          return newRequire(id ? id : x);
        },m,m.exports,outer,modules,cache,entry);
      }

      return cache[name].exports;
    }
    for(var i=0;i<entry.length;i++) newRequire(entry[i]);

    // Override the current require with this new one
    return newRequire;
  })(modules, cache, entry);

  return function() {
    return Handsontable;
  };
})
({1:[function(require,module,exports){
"use strict";
if (window.jQuery) {
  (function(window, $, Handsontable) {
    $.fn.handsontable = function(action) {
      var i,
          ilen,
          args,
          output,
          userSettings,
          $this = this.first(),
          instance = $this.data('handsontable');
      if (typeof action !== 'string') {
        userSettings = action || {};
        if (instance) {
          instance.updateSettings(userSettings);
        } else {
          instance = new Handsontable.Core($this[0], userSettings);
          $this.data('handsontable', instance);
          instance.init();
        }
        return $this;
      } else {
        args = [];
        if (arguments.length > 1) {
          for (i = 1, ilen = arguments.length; i < ilen; i++) {
            args.push(arguments[i]);
          }
        }
        if (instance) {
          if (typeof instance[action] !== 'undefined') {
            output = instance[action].apply(instance, args);
            if (action === 'destroy') {
              $this.removeData();
            }
          } else {
            throw new Error('Handsontable do not provide action: ' + action);
          }
        }
        return output;
      }
    };
  })(window, jQuery, Handsontable);
}

//# 
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableBorder: {get: function() {
      return WalkontableBorder;
    }},
  __esModule: {value: true}
});
var $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__,
    $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__,
    $___46__46__47__46__46__47__46__46__47_eventManager__,
    $__cell_47_coords__,
    $__overlay_47__95_base_46_js__;
var $__0 = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ = require("helpers/dom/element"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_element__}),
    getComputedStyle = $__0.getComputedStyle,
    getTrimmingContainer = $__0.getTrimmingContainer,
    innerWidth = $__0.innerWidth,
    innerHeight = $__0.innerHeight,
    offset = $__0.offset,
    outerHeight = $__0.outerHeight,
    outerWidth = $__0.outerWidth;
var stopImmediatePropagation = ($___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__ = require("helpers/dom/event"), $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__ && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__.__esModule && $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__ || {default: $___46__46__47__46__46__47__46__46__47_helpers_47_dom_47_event__}).stopImmediatePropagation;
var EventManager = ($___46__46__47__46__46__47__46__46__47_eventManager__ = require("eventManager"), $___46__46__47__46__46__47__46__46__47_eventManager__ && $___46__46__47__46__46__47__46__46__47_eventManager__.__esModule && $___46__46__47__46__46__47__46__46__47_eventManager__ || {default: $___46__46__47__46__46__47__46__46__47_eventManager__}).EventManager;
var WalkontableCellCoords = ($__cell_47_coords__ = require("cell/coords"), $__cell_47_coords__ && $__cell_47_coords__.__esModule && $__cell_47_coords__ || {default: $__cell_47_coords__}).WalkontableCellCoords;
var WalkontableOverlay = ($__overlay_47__95_base_46_js__ = require("overlay/_base.js"), $__overlay_47__95_base_46_js__ && $__overlay_47__95_base_46_js__.__esModule && $__overlay_47__95_base_46_js__ || {default: $__overlay_47__95_base_46_js__}).WalkontableOverlay;
var WalkontableBorder = function WalkontableBorder(wotInstance, settings) {
  if (!settings) {
    return;
  }
  this.eventManager = new EventManager(wotInstance);
  this.instance = wotInstance;
  this.wot = wotInstance;
  this.settings = settings;
  this.mouseDown = false;
  this.main = null;
  this.top = null;
  this.left = null;
  this.bottom = null;
  this.right = null;
  this.topStyle = null;
  this.leftStyle = null;
  this.bottomStyle = null;
  this.rightStyle = null;
  this.cornerDefaultStyle = {
    width: '5px',
    height: '5px',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: '#FFF'
  };
  this.corner = null;
  this.cornerStyle = null;
  this.createBorders(settings);
  this.registerListeners();
};
($traceurRuntime.createClass)(WalkontableBorder, {
  registerListeners: function() {
    var $__5 = this;
    this.eventManager.addEventListener(document.body, 'mousedown', (function() {
      return $__5.onMouseDown();
    }));
    this.eventManager.addEventListener(document.body, 'mouseup', (function() {
      return $__5.onMouseUp();
    }));
    for (var c = 0,
        len = this.main.childNodes.length; c < len; c++) {
      this.eventManager.addEventListener(this.main.childNodes[c], 'mouseenter', (function(event) {
        return $__5.onMouseEnter(event);
      }));
    }
  },
  onMouseDown: function() {
    this.mouseDown = true;
  },
  onMouseUp: function() {
    this.mouseDown = false;
  },
  onMouseEnter: function(event) {
    if (!this.mouseDown || !this.wot.getSetting('hideBorderOnMouseDownOver')) {
      return;
    }
    event.preventDefault();
    stopImmediatePropagation(event);
    var _this = this;
    var bounds = this.getBoundingClientRect();
    this.style.display = 'none';
    function isOutside(event) {
      if (event.clientY < Math.floor(bounds.top)) {
        return true;
      }
      if (event.clientY > Math.ceil(bounds.top + bounds.height)) {
        return true;
      }
      if (event.clientX < Math.floor(bounds.left)) {
        return true;
      }
      if (event.clientX > Math.ceil(bounds.left + bounds.width)) {
        return true;
      }
    }
    function handler(event) {
      if (isOutside(event)) {
        _this.eventManager.removeEventListener(document.body, 'mousemove', handler);
        _this.style.display = 'block';
      }
    }
    this.eventManager.addEventListener(document.body, 'mousemove', handler);
  },
  createBorders: function(settings) {
    this.main = document.createElement('div');
    var borderDivs = ['top', 'left', 'bottom', 'right', 'corner'];
    var style = this.main.style;
    style.position = 'absolute';
    style.top = 0;
    style.left = 0;
    for (var i = 0; i < 5; i++) {
      var position = borderDivs[i];
      var div = document.createElement('div');
      div.className = 'wtBorder ' + (this.settings.className || '');
      if (this.settings[position] && this.settings[position].hide) {
        div.className += ' hidden';
      }
      style = div.style;
      style.backgroundColor = (this.settings[position] && this.settings[position].color) ? this.settings[position].color : settings.border.color;
      style.height = (this.settings[position] && this.settings[position].width) ? this.settings[position].width + 'px' : settings.border.width + 'px';
      style.width = (this.settings[position] && this.settings[position].width) ? this.settings[position].width + 'px' : settings.border.width + 'px';
      this.main.appendChild(div);
    }
    this.top = this.main.childNodes[0];
    this.left = this.main.childNodes[1];
    this.bottom = this.main.childNodes[2];
    this.right = this.main.childNodes[3];
    this.topStyle = this.top.style;
    this.leftStyle = this.left.style;
    this.bottomStyle = this.bottom.style;
    this.rightStyle = this.right.style;
    this.corner = this.main.childNodes[4];
    this.corner.className += ' corner';
    this.cornerStyle = this.corner.style;
    this.cornerStyle.width = this.cornerDefaultStyle.width;
    this.cornerStyle.height = this.cornerDefaultStyle.height;
    this.cornerStyle.border = [this.cornerDefaultStyle.borderWidth, this.cornerDefaultStyle.borderStyle, this.cornerDefaultStyle.borderColor].join(' ');
    if (Handsontable.mobileBrowser) {
      this.createMultipleSelectorHandles();
    }
    this.disappear();
    if (!this.wot.wtTable.bordersHolder) {
      this.wot.wtTable.bordersHolder = document.createElement('div');
      this.wot.wtTable.bordersHolder.className = 'htBorders';
      this.wot.wtTable.spreader.appendChild(this.wot.wtTable.bordersHolder);
    }
    this.wot.wtTable.bordersHolder.insertBefore(this.main, this.wot.wtTable.bordersHolder.firstChild);
  },
  createMultipleSelectorHandles: function() {
    this.selectionHandles = {
      topLeft: document.createElement('DIV'),
      topLeftHitArea: document.createElement('DIV'),
      bottomRight: document.createElement('DIV'),
      bottomRightHitArea: document.createElement('DIV')
    };
    var width = 10;
    var hitAreaWidth = 40;
    this.selectionHandles.topLeft.className = 'topLeftSelectionHandle';
    this.selectionHandles.topLeftHitArea.className = 'topLeftSelectionHandle-HitArea';
    this.selectionHandles.bottomRight.className = 'bottomRightSelectionHandle';
    this.selectionHandles.bottomRightHitArea.className = 'bottomRightSelectionHandle-HitArea';
    this.selectionHandles.styles = {
      topLeft: this.selectionHandles.topLeft.style,
      topLeftHitArea: this.selectionHandles.topLeftHitArea.style,
      bottomRight: this.selectionHandles.bottomRight.style,
      bottomRightHitArea: this.selectionHandles.bottomRightHitArea.style
    };
    var hitAreaStyle = {
      position: 'absolute',
      height: hitAreaWidth + 'px',
      width: hitAreaWidth + 'px',
      'border-radius': parseInt(hitAreaWidth / 1.5, 10) + 'px'
    };
    for (var prop in hitAreaStyle) {
      if (hitAreaStyle.hasOwnProperty(prop)) {
        this.selectionHandles.styles.bottomRightHitArea[prop] = hitAreaStyle[prop];
        this.selectionHandles.styles.topLeftHitArea[prop] = hitAreaStyle[prop];
      }
    }
    var handleStyle = {
      position: 'absolute',
      height: width + 'px',
      width: width + 'px',
      'border-radius': parseInt(width / 1.5, 10) + 'px',
      background: '#F5F5FF',
      border: '1px solid #4285c8'
    };
    for (var prop$__7 in handleStyle) {
      if (handleStyle.hasOwnProperty(prop$__7)) {
        this.selectionHandles.styles.bottomRight[prop$__7] = handleStyle[prop$__7];
        this.selectionHandles.styles.topLeft[prop$__7] = handleStyle[prop$__7];
      }
    }
    this.main.appendChild(this.selectionHandles.topLeft);
    this.main.appendChild(this.selectionHandles.bottomRight);
    this.main.appendChild(this.selectionHandles.topLeftHitArea);
    this.main.appendChild(this.selectionHandles.bottomRightHitArea);
  },
  isPartRange: function(row, col) {
    if (this.wot.selections.area.cellRange) {
      if (row != this.wot.selections.area.cellRange.to.row || col != this.wot.selections.area.cellRange.to.col) {
        return true;
      }
    }
    return false;
  },
  updateMultipleSelectionHandlesPosition: function(row, col, top, left, width, height) {
    var handleWidth = parseInt(this.selectionHandles.styles.topLeft.width, 10);
    var hitAreaWidth = parseInt(this.selectionHandles.styles.topLeftHitArea.width, 10);
    this.selectionHandles.styles.topLeft.top = parseInt(top - handleWidth, 10) + 'px';
    this.selectionHandles.styles.topLeft.left = parseInt(left - handleWidth, 10) + 'px';
    this.selectionHandles.styles.topLeftHitArea.top = parseInt(top - (hitAreaWidth / 4) * 3, 10) + 'px';
    this.selectionHandles.styles.topLeftHitArea.left = parseInt(left - (hitAreaWidth / 4) * 3, 10) + 'px';
    this.selectionHandles.styles.bottomRight.top = parseInt(top + height, 10) + 'px';
    this.selectionHandles.styles.bottomRight.left = parseInt(left + width, 10) + 'px';
    this.selectionHandles.styles.bottomRightHitArea.top = parseInt(top + height - hitAreaWidth / 4, 10) + 'px';
    this.selectionHandles.styles.bottomRightHitArea.left = parseInt(left + width - hitAreaWidth / 4, 10) + 'px';
    if (this.settings.border.multipleSelectionHandlesVisible && this.settings.border.multipleSelectionHandlesVisible()) {
      this.selectionHandles.styles.topLeft.display = 'block';
      this.selectionHandles.styles.topLeftHitArea.display = 'block';
      if (this.isPartRange(row, col)) {
        this.selectionHandles.styles.bottomRight.display = 'none';
        this.selectionHandles.styles.bottomRightHitArea.display = 'none';
      } else {
        this.selectionHandles.styles.bottomRight.display = 'block';
        this.selectionHandles.styles.bottomRightHitArea.display = 'block';
      }
    } else {
      this.selectionHandles.styles.topLeft.display = 'none';
      this.selectionHandles.styles.bottomRight.display = 'none';
      this.selectionHandles.styles.topLeftHitArea.display = 'none';
      this.selectionHandles.styles.bottomRightHitArea.display = 'none';
    }
    if (row == this.wot.wtSettings.getSetting('fixedRowsTop') || col == this.wot.wtSettings.getSetting('fixedColumnsLeft')) {
      this.selectionHandles.styles.topLeft.zIndex = '9999';
      this.selectionHandles.styles.topLeftHitArea.zIndex = '9999';
    } else {
      this.selectionHandles.styles.topLeft.zIndex = '';
      this.selectionHandles.styles.topLeftHitArea.zIndex = '';
    }
  },
  appear: function(corners) {
    if (this.disabled) {
      return;
    }
    var isMultiple,
        fromTD,
        toTD,
        fromOffset,
        toOffset,
        containerOffset,
        top,
        minTop,
        left,
        minLeft,
        height,
        width,
        fromRow,
        fromColumn,
        toRow,
        toColumn,
        trimmingContainer,
        cornerOverlappingContainer,
        ilen;
    if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_TOP_LEFT_CORNER)) {
      ilen = this.wot.getSetting('fixedRowsTop');
    } else if (WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM) || WalkontableOverlay.isOverlayTypeOf(this.wot.cloneOverlay, WalkontableOverlay.CLONE_BOTTOM_LEFT_CORNER)) {
      ilen = this.wot.getSetting('fixedRowsBottom');
    } else {
      ilen = this.wot.wtTable.getRenderedRowsCount();
    }
    for (var i = 0; i < ilen; i++) {
      var s = this.wot.wtTable.rowFilter.renderedToSource(i);
      if (s >= corners[0] && s <= corners[2]) {
        fromRow = s;
        break;
      }
    }
    for (var i$__8 = ilen - 1; i$__8 >= 0; i$__8--) {
      var s$__9 = this.wot.wtTable.rowFilter.renderedToSource(i$__8);
      if (s$__9 >= corners[0] && s$__9 <= corners[2]) {
        toRow = s$__9;
        break;
      }
    }
    ilen = this.wot.wtTable.getRenderedColumnsCount();
    for (var i$__10 = 0; i$__10 < ilen; i$__10++) {
      var s$__11 = this.wot.wtTable.columnFilter.renderedToSource(i$__10);
      if (s$__11 >= corners[1] && s$__11 <= corners[3]) {
        fromColumn = s$__11;
        break;
      }
    }
    for (var i$__12 = ilen - 1; i$__12 >= 0; i$__12--) {
      var s$__13 = this.wot.wtTable.columnFilter.renderedToSource(i$__12);
      if (s$__13 >= corners[1] && s$__13 <= corners[3]) {
        toColumn = s$__13;
        break;
      }
    }
    if (fromRow === void 0 || fromColumn === void 0) {
      this.disappear();
      return;
    }
    isMultiple = (fromRow !== toRow || fromColumn !== toColumn);
    fromTD = this.wot.wtTable.getCell(new WalkontableCellCoords(fromRow, fromColumn));
    toTD = isMultiple ? this.wot.wtTable.getCell(new WalkontableCellCoords(toRow, toColumn)) : fromTD;
    fromOffset = offset(fromTD);
    toOffset = isMultiple ? offset(toTD) : fromOffset;
    containerOffset = offset(this.wot.wtTable.TABLE);
    minTop = fromOffset.top;
    height = toOffset.top + outerHeight(toTD) - minTop;
    minLeft = fromOffset.left;
    width = toOffset.left + outerWidth(toTD) - minLeft;
    top = minTop - containerOffset.top - 1;
    left = minLeft - containerOffset.left - 1;
    var style = getComputedStyle(fromTD);
    if (parseInt(style.borderTopWidth, 10) > 0) {
      top += 1;
      height = height > 0 ? height - 1 : 0;
    }
    if (parseInt(style.borderLeftWidth, 10) > 0) {
      left += 1;
      width = width > 0 ? width - 1 : 0;
    }
    this.topStyle.top = top + 'px';
    this.topStyle.left = left + 'px';
    this.topStyle.width = width + 'px';
    this.topStyle.display = 'block';
    this.leftStyle.top = top + 'px';
    this.leftStyle.left = left + 'px';
    this.leftStyle.height = height + 'px';
    this.leftStyle.display = 'block';
    var delta = Math.floor(this.settings.border.width / 2);
    this.bottomStyle.top = top + height - delta + 'px';
    this.bottomStyle.left = left + 'px';
    this.bottomStyle.width = width + 'px';
    this.bottomStyle.display = 'block';
    this.rightStyle.top = top + 'px';
    this.rightStyle.left = left + width - delta + 'px';
    this.rightStyle.height = height + 1 + 'px';
    this.rightStyle.display = 'block';
    if (Handsontable.mobileBrowser || (!this.hasSetting(this.settings.border.cornerVisible) || this.isPartRange(toRow, toColumn))) {
      this.cornerStyle.display = 'none';
    } else {
      this.cornerStyle.top = top + height - 4 + 'px';
      this.cornerStyle.left = left + width - 4 + 'px';
      this.cornerStyle.borderRightWidth = this.cornerDefaultStyle.borderWidth;
      this.cornerStyle.width = this.cornerDefaultStyle.width;
      this.cornerStyle.display = 'block';
      trimmingContainer = getTrimmingContainer(this.wot.wtTable.TABLE);
      if (toColumn === this.wot.getSetting('totalColumns') - 1) {
        cornerOverlappingContainer = toTD.offsetLeft + outerWidth(toTD) >= innerWidth(trimmingContainer);
        if (cornerOverlappingContainer) {
          this.cornerStyle.left = Math.floor(left + width - 3 - parseInt(this.cornerDefaultStyle.width) / 2) + 'px';
          this.cornerStyle.borderRightWidth = 0;
        }
      }
      if (toRow === this.wot.getSetting('totalRows') - 1) {
        cornerOverlappingContainer = toTD.offsetTop + outerHeight(toTD) >= innerHeight(trimmingContainer);
        if (cornerOverlappingContainer) {
          this.cornerStyle.top = Math.floor(top + height - 3 - parseInt(this.cornerDefaultStyle.height) / 2) + 'px';
          this.cornerStyle.borderBottomWidth = 0;
        }
      }
    }
    if (Handsontable.mobileBrowser) {
      this.updateMultipleSelectionHandlesPosition(fromRow, fromColumn, top, left, width, height);
    }
  },
  disappear: function() {
    this.topStyle.display = 'none';
    this.leftStyle.display = 'none';
    this.bottomStyle.display = 'none';
    this.rightStyle.display = 'none';
    this.cornerStyle.display = 'none';
    if (Handsontable.mobileBrowser) {
      this.selectionHandles.styles.topLeft.display = 'none';
      this.selectionHandles.styles.bottomRight.display = 'none';
    }
  },
  hasSetting: function(setting) {
    if (typeof setting === 'function') {
      return setting();
    }
    return !!setting;
  }
}, {});
;
window.WalkontableBorder = WalkontableBorder;

//# 
},{"cell/coords":5,"eventManager":40,"helpers/dom/element":44,"helpers/dom/event":45,"overlay/_base.js":11}],3:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableViewportColumnsCalculator: {get: function() {
      return WalkontableViewportColumnsCalculator;
    }},
  __esModule: {value: true}
});
var privatePool = new WeakMap();
var WalkontableViewportColumnsCalculator = function WalkontableViewportColumnsCalculator(viewportWidth, scrollOffset, totalColumns, columnWidthFn, overrideFn, onlyFullyVisible, stretchH) {
  privatePool.set(this, {
    viewportWidth: viewportWidth,
    scrollOffset: scrollOffset,
    totalColumns: totalColumns,
    columnWidthFn: columnWidthFn,
    overrideFn: overrideFn,
    onlyFullyVisible: onlyFullyVisible
  });
  this.count = 0;
  this.startColumn = null;
  this.endColumn = null;
  this.startPosition = null;
  this.stretchAllRatio = 0;
  this.stretchLastWidth = 0;
  this.stretch = stretchH;
  this.totalTargetWidth = 0;
  this.needVerifyLastColumnWidth = true;
  this.stretchAllColumnsWidth = [];
  this.calculate();
};
var $WalkontableViewportColumnsCalculator = WalkontableViewportColumnsCalculator;
($traceurRuntime.createClass)(WalkontableViewportColumnsCalculator, {
  calculate: function() {
    var sum = 0;
    var needReverse = true;
    var startPositions = [];
    var columnWidth;
    var priv = privatePool.get(this);
    var onlyFullyVisible = priv.onlyFullyVisible;
    var overrideFn = priv.overrideFn;
    var scrollOffset = priv.scrollOffset;
    var totalColumns = priv.totalColumns;
    var viewportWidth = priv.viewportWidth;
    for (var i = 0; i < totalColumns; i++) {
      columnWidth = this._getColumnWidth(i);
      if (sum <= scrollOffset && !onlyFullyVisible) {
        this.startColumn = i;
      }
      if (sum >= scrollOffset && sum + columnWidth <= scrollOffset + viewportWidth) {
        if (this.startColumn == null) {
          this.startColumn = i;
        }
        this.endColumn = i;
      }
      startPositions.push(sum);
      sum += columnWidth;
      if (!onlyFullyVisible) {
        this.endColumn = i;
      }
      if (sum >= scrollOffset + viewportWidth) {
        needReverse = false;
        break;
      }
    }
    if (this.endColumn === totalColumns - 1 && needReverse) {
      this.startColumn = this.endColumn;
      while (this.startColumn > 0) {
        var viewportSum = startPositions[this.endColumn] + columnWidth - startPositions[this.startColumn - 1];
        if (viewportSum <= viewportWidth || !onlyFullyVisible) {
          this.startColumn--;
        }
        if (viewportSum > viewportWidth) {
          break;
        }
      }
    }
    if (this.startColumn !== null && overrideFn) {
      overrideFn(this);
    }
    this.startPosition = startPositions[this.startColumn];
    if (this.startPosition == void 0) {
      this.startPosition = null;
    }
    if (this.startColumn !== null) {
      this.count = this.endColumn - this.startColumn + 1;
    }
  },
  refreshStretching: function(totalWidth) {
    if (this.stretch === 'none') {
      return;
    }
    var sumAll = 0;
    var columnWidth;
    var remainingSize;
    var priv = privatePool.get(this);
    var totalColumns = priv.totalColumns;
    for (var i = 0; i < totalColumns; i++) {
      columnWidth = this._getColumnWidth(i);
      sumAll += columnWidth;
    }
    this.totalTargetWidth = totalWidth;
    remainingSize = sumAll - totalWidth;
    if (this.stretch === 'all' && remainingSize < 0) {
      this.stretchAllRatio = totalWidth / sumAll;
      this.stretchAllColumnsWidth = [];
      this.needVerifyLastColumnWidth = true;
    } else if (this.stretch === 'last' && totalWidth !== Infinity) {
      this.stretchLastWidth = -remainingSize + this._getColumnWidth(totalColumns - 1);
    }
  },
  getStretchedColumnWidth: function(column, baseWidth) {
    var result = null;
    if (this.stretch === 'all' && this.stretchAllRatio !== 0) {
      result = this._getStretchedAllColumnWidth(column, baseWidth);
    } else if (this.stretch === 'last' && this.stretchLastWidth !== 0) {
      result = this._getStretchedLastColumnWidth(column);
    }
    return result;
  },
  _getStretchedAllColumnWidth: function(column, baseWidth) {
    var sumRatioWidth = 0;
    var priv = privatePool.get(this);
    var totalColumns = priv.totalColumns;
    if (!this.stretchAllColumnsWidth[column]) {
      this.stretchAllColumnsWidth[column] = Math.round(baseWidth * this.stretchAllRatio);
    }
    if (this.stretchAllColumnsWidth.length === totalColumns && this.needVerifyLastColumnWidth) {
      this.needVerifyLastColumnWidth = false;
      for (var i = 0; i < this.stretchAllColumnsWidth.length; i++) {
        sumRatioWidth += this.stretchAllColumnsWidth[i];
      }
      if (sumRatioWidth !== this.totalTargetWidth) {
        this.stretchAllColumnsWidth[this.stretchAllColumnsWidth.length - 1] += this.totalTargetWidth - sumRatioWidth;
      }
    }
    return this.stretchAllColumnsWidth[column];
  },
  _getStretchedLastColumnWidth: function(column) {
    var priv = privatePool.get(this);
    var totalColumns = priv.totalColumns;
    if (column === totalColumns - 1) {
      return this.stretchLastWidth;
    }
    return null;
  },
  _getColumnWidth: function(column) {
    var width = privatePool.get(this).columnWidthFn(column);
    if (width === undefined) {
      width = $WalkontableViewportColumnsCalculator.DEFAULT_WIDTH;
    }
    return width;
  }
}, {get DEFAULT_WIDTH() {
    return 50;
  }});
;
window.WalkontableViewportColumnsCalculator = WalkontableViewportColumnsCalculator;

//# 
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableViewportRowsCalculator: {get: function() {
      return WalkontableViewportRowsCalculator;
    }},
  __esModule: {value: true}
});
var privatePool = new WeakMap();
var WalkontableViewportRowsCalculator = function WalkontableViewportRowsCalculator(viewportHeight, scrollOffset, totalRows, rowHeightFn, overrideFn, onlyFullyVisible, horizontalScrollbarHeight) {
  privatePool.set(this, {
    viewportHeight: viewportHeight,
    scrollOffset: scrollOffset,
    totalRows: totalRows,
    rowHeightFn: rowHeightFn,
    overrideFn: overrideFn,
    onlyFullyVisible: onlyFullyVisible,
    horizontalScrollbarHeight: horizontalScrollbarHeight
  });
  this.count = 0;
  this.startRow = null;
  this.endRow = null;
  this.startPosition = null;
  this.calculate();
};
var $WalkontableViewportRowsCalculator = WalkontableViewportRowsCalculator;
($traceurRuntime.createClass)(WalkontableViewportRowsCalculator, {calculate: function() {
    var sum = 0;
    var needReverse = true;
    var startPositions = [];
    var priv = privatePool.get(this);
    var onlyFullyVisible = priv.onlyFullyVisible;
    var overrideFn = priv.overrideFn;
    var rowHeightFn = priv.rowHeightFn;
    var scrollOffset = priv.scrollOffset;
    var totalRows = priv.totalRows;
    var viewportHeight = priv.viewportHeight;
    var horizontalScrollbarHeight = priv.horizontalScrollbarHeight || 0;
    for (var i = 0; i < totalRows; i++) {
      var rowHeight = rowHeightFn(i);
      if (rowHeight === undefined) {
        rowHeight = $WalkontableViewportRowsCalculator.DEFAULT_HEIGHT;
      }
      if (sum <= scrollOffset && !onlyFullyVisible) {
        this.startRow = i;
      }
      if (sum >= scrollOffset && sum + rowHeight <= scrollOffset + viewportHeight - horizontalScrollbarHeight) {
        if (this.startRow === null) {
          this.startRow = i;
        }
        this.endRow = i;
      }
      startPositions.push(sum);
      sum += rowHeight;
      if (!onlyFullyVisible) {
        this.endRow = i;
      }
      if (sum >= scrollOffset + viewportHeight - horizontalScrollbarHeight) {
        needReverse = false;
        break;
      }
    }
    if (this.endRow === totalRows - 1 && needReverse) {
      this.startRow = this.endRow;
      while (this.startRow > 0) {
        var viewportSum = startPositions[this.endRow] + rowHeight - startPositions[this.startRow - 1];
        if (viewportSum <= viewportHeight - horizontalScrollbarHeight || !onlyFullyVisible) {
          this.startRow--;
        }
        if (viewportSum >= viewportHeight - horizontalScrollbarHeight) {
          break;
        }
      }
    }
    if (this.startRow !== null && overrideFn) {
      overrideFn(this);
    }
    this.startPosition = startPositions[this.startRow];
    if (this.startPosition == void 0) {
      this.startPosition = null;
    }
    if (this.startRow !== null) {
      this.count = this.endRow - this.startRow + 1;
    }
  }}, {get DEFAULT_HEIGHT() {
    return 23;
  }});
;
window.WalkontableViewportRowsCalculator = WalkontableViewportRowsCalculator;

//# 
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableCellCoords: {get: function() {
      return WalkontableCellCoords;
    }},
  __esModule: {value: true}
});
var WalkontableCellCoords = function WalkontableCellCoords(row, col) {
  if (typeof row !== 'undefined' && typeof col !== 'undefined') {
    this.row = row;
    this.col = col;
  } else {
    this.row = null;
    this.col = null;
  }
};
($traceurRuntime.createClass)(WalkontableCellCoords, {
  isValid: function(wotInstance) {
    if (this.row < 0 || this.col < 0) {
      return false;
    }
    if (this.row >= wotInstance.getSetting('totalRows') || this.col >= wotInstance.getSetting('totalColumns')) {
      return false;
    }
    return true;
  },
  isEqual: function(cellCoords) {
    if (cellCoords === this) {
      return true;
    }
    return this.row === cellCoords.row && this.col === cellCoords.col;
  },
  isSouthEastOf: function(testedCoords) {
    return this.row >= testedCoords.row && this.col >= testedCoords.col;
  },
  isNorthWestOf: function(testedCoords) {
    return this.row <= testedCoords.row && this.col <= testedCoords.col;
  },
  isSouthWestOf: function(testedCoords) {
    return this.row >= testedCoords.row && this.col <= testedCoords.col;
  },
  isNorthEastOf: function(testedCoords) {
    return this.row <= testedCoords.row && this.col >= testedCoords.col;
  }
}, {});
;
window.WalkontableCellCoords = WalkontableCellCoords;

//# 
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  WalkontableCellRange: {get: function() {
      return WalkontableCellRange;
    }},
  __esModule: {value: true}
});
var $___46__46__47_cell_47_coords__;
var WalkontableCellCoords = ($___46__46__47_cell_47_coords__ = require("cell/coords"), $___46__46__47_cell_47_coords__ && $___46__46__47_cell_47_coords__.__esModule && $___46__46__47_cell_47_coords__ || {default: $___46__46__47_cell_47_coords__}).WalkontableCellCoords;
var WalkontableCellRange = function WalkontableCellRange(highlight, from, to) {
  this.highlight = highlight;
  this.from = from;
  this.to = to;
};
var $WalkontableCellRange = WalkontableCellRange;
($traceurRuntime.createClass)(WalkontableCellRange, {
  isValid: function(wotInstance) {
    return this.from.isValid(wotInstance) && this.to.isValid(wotInstance);
  },
  isSingle: function() {
    return this.from.row === this.to.row && this.from.col === this.to.col;
  },
  getHeight: function() {
    return Math.max(this.from.row, this.to.row) - Math.min(this.from.row, this.to.row) + 1;
  },
  getWidth: function() {
    return Math.max(this.from.col, this.to.col) - Math.min(this.from.col, this.to.col) + 1;
  },
  includes: function(cellCoords) {
    var topLeft = this.getTopLeftCorner();
    var bottomRight = this.getBottomRightCorner();
    if (cellCoords.row < 0) {
      cellCoords.row = 0;
    }
    if (cellCoords.col < 0) {
      cellCoords.col = 0;
    }
    return topLeft.row <= cellCoords.row && bottomRight.row >= cellCoords.row && topLeft.col <= cellCoords.col && bottomRight.col >= cellCoords.col;
  },
  includesRange: function(testedRange) {
    return this.includes(testedRange.getTopLeftCorner()) && this.includes(testedRange.getBottomRightCorner());
  },
  isEqual: function(testedRange) {
    return (Math.min(this.from.row, this.to.row) == Math.min(testedRange.from.row, testedRange.to.row)) && (Math.max(this.from.row, this.to.row) == Math.max(testedRange.from.row, testedRange.to.row)) && (Math.min(this.from.col, this.to.col) == Math.min(testedRange.from.col, testedRange.to.col)) && (Math.max(this.from.col, this.to.col) == Math.max(testedRange.from.col, testedRange.to.col));
  },
  overlaps: function(testedRange) {
    return testedRange.isSouthEastOf(this.getTopLeftCorner()) && testedRange.isNorthWestOf(this.getBottomRightCorner());
  },
  isSouthEastOf: function(testedCoords) {
    return this.getTopLeftCorner().isSouthEastOf(testedCoords) || this.getBottomRightCorner().isSouthEastOf(testedCoords);
  },
  isNorthWestOf: function(testedCoords) {
    return this.getTopLeftCorner().isNorthWestOf(testedCoords) || this.getBottomRightCorner().isNorthWestOf(testedCoords);
  },
  expand: function(cellCoords) {
    var topLeft = this.getTopLeftCorner();
    var bottomRight = this.getBottomRightCorner();
    if (cellCoords.row < topLeft.row || cellCoords.col < topLeft.col || cellCoords.row > bottomRight.row || cellCoords.col > bottomRight.col) {
      this.from = new WalkontableCellCoords(Math.min(topLeft.row, cellCoords.row), Math.min(topLeft.col, cellCoords.col));
      this.to = new WalkontableCellCoords(Math.max(bottomRight.row, cellCoords.row), Math.max(bottomRight.col, cellCoords.col));
      return true;
    }
    return false;
  },
  expandByRange: function(expandingRange) {
    if (this.includesRange(expandingRange) || !this.overlaps(expandingRange)) {
      return false;
    }
    var topLeft = this.getTopLeftCorner();
    var bottomRight = this.getBottomRightCorner();
    var topRight = this.getTopRightCorner();
    var bottomLeft = this.getBottomLeftCorner();
    var expandingTopLeft = expandingRange.getTopLeftCorner();
    var expandingBottomRight = expandingRange.getBottomRightCorner();
    var resultTopRow = Math.min(topLeft.row, expandingTopLeft.row);
    var resultTopCol = Math.min(topLeft.col, expandingTopLeft.col);
    var resultBottomRow = Math.max(bottomRight.row, expandingBottomRight.row);
    var resultBottomCol = Math.max(bottomRight.col, expandingBottomRight.col);
    var finalFrom = new WalkontableCellCoords(resultTopRow, resultTopCol),
        finalTo = new WalkontableCellCoords(resultBottomRow, resultBottomCol);
    var isCorner = new $WalkontableCellRange(finalFrom, finalFrom, finalTo).isCorner(this.from, expandingRange),
        onlyMerge = expandingRange.isEqual(new $WalkontableCellRange(finalFrom, finalFrom, finalTo));
    if (isCorner && !onlyMerge) {
      if (this.from.col > finalFrom.col) {
        finalFrom.col = resultBottomCol;
        finalTo.col = resultTopCol;
      }
      if (this.from.row > finalFrom.row) {
        finalFrom.row = resultBottomRow;
        finalTo.