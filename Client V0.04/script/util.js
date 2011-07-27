var util = {
    /* Copy from node.js */
    inherits : function(constructor, superConstructor) {
        constructor.super_ = superConstructor;
        constructor.prototype = Object.create(superConstructor.prototype, { constructor: { value: constructor, enumerable: false } });
    } 
    ,fix : function(float) {
        return typeof(float) === 'number' ? parseInt(float.toFixed()) : float;
    }
    ,objectLength : function(object) {
        var c = 0;
        for (var i in object) {
            if (object.hasOwnProperty(i)) ++c;
        }
        return c;
    }
    ,inObject : function(value, array) {
        for (var i in array) {
            if (array[i] === value) return i;
        }
        return undefined;
    }
    ,remove : function(el) {
        el.parentNode.removeChild(el);
    }
};
var $ = function(selector, context) {
    var result;
    context = context || document;
    if (selector[0] === "#") {
        result = context.querySelector(selector);
    } else {
        result = context.querySelectorAll(selector);
    }
    return result;
};
