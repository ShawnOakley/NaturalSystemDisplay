(function(exports) {
 
  var Utils = {};
 
  /**
   * Determines the size of the browser viewport.
   *
   * @returns {Object} The current browser viewport width and height.
   * @private
   */
  Utils.getViewportSize = function() {
 
    var d = {};
 
    if (typeof(window.innerWidth) !== 'undefined') {
      d.width = window.innerWidth;
      d.height = window.innerHeight;
    } else if (typeof(document.documentElement) !== 'undefined' &&
        typeof(document.documentElement.clientWidth) !== 'undefined') {
      d.width = document.documentElement.clientWidth;
      d.height = document.documentElement.clientHeight;
    } else if (typeof(document.body) !== 'undefined') {
      d.width = document.body.clientWidth;
      d.height = document.body.clientHeight;
    } else {
      d.width = undefined;
      d.height = undefined;
    }
    return d;
  };

  Utils._addEvent = function(target, eventType, handler) {
    
    if (target.addEventListener) { // W3C
      target.addEventListener(eventType, handler, false);
    } else if (target.attachEvent) { // IE
      target.attachEvent("on" + eventType, handler);
    }
  };

  Utils.extend = function(subClass, superClass) {
    function F() {}
    F.prototype = superClass.prototype;
    subClass.prototype = new F;
    subClass.prototype.constructor = subClass;
  };


 
  exports.Utils = Utils;
 
}(exports));