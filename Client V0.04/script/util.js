var util = {
    /* Copy from node.js */
    inherits : function(constructor, superConstructor) {
        constructor.super_ = superConstructor;
        constructor.prototype = Object.create(superConstructor.prototype, { constructor: { value: constructor, enumerable: false, writable: true, configurable: true } });
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
    ,createCanvas : function(id, className) {
        var el = document.createElement('canvas');
        if (id != undefined) el.id = id;
        if (className != undefined) el.className = className;
        return el;
    }
    ,createDiv : function(id, className) {
        var el = document.createElement('div');
        if (id != undefined) el.id = 'div-' + id;
        if (className != undefined) el.className = className;
        return el;
    }
};
var $ = function(selector, context) {
    context = context || document;
    if (selector[0] === "#") return document.getElementById(selector.substr(1));
    return context.querySelectorAll(selector);
};
$.remove = function(el) {
    el.parentNode.removeChild(el);
};
$.prepend = function(el, html) {
    el.innerHTML = html + el.innerHTML;
};
$.append = function(el, html) {
    el.innerHTML = el.innerHTML + html;
};
$.left = function(el, value) {
    el.style.left = value + 'px';
};
$.top = function(el, value) {
    el.style.top = value + 'px';
};
$.z = function(el, z) {
    el.style['z-index'] = z;
}
$.show = function(el) {
    el.style.display = 'block';
};
$.hide = function(el) {
    el.style.display = 'none';
};
