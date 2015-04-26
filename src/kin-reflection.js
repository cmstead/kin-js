var kin = (function(){
    function isObject(obj){
        var isObj = typeof obj === 'object',
            isNull = obj === null,
            isArray = isObj && !isNull && obj.toString() === '[object Array]';

        return isObj && !isNull && !isArray;
    }

    function isNewable(obj){
        var isFunction = typeof obj === 'function',
            hasPrototype = isFunction && typeof obj.prototype === 'object',
            hasConstructor = hasPrototype && typeof obj.prototype.constructor === 'function';

        return hasConstructor;
    }

    return {
        isObject: isObject,
        isNewable: isNewable
    };
})();
