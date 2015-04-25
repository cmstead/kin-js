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

    function checkCollision(key, obj){
        return key === 'constructor' || typeof obj[key] === 'undefined';
    }

    function checkValue(predicate, obj, message){
        if(!predicate(obj)){
            throw new Error(message);
        }
    }

    function partial(userFn){
        var sanitizedArgs = Array.prototype.slice.call(arguments, 1);

        return function(){
            var finalArgs = sanitizedArgs.concat(Array.prototype.slice.call(arguments, 0));
            return userFn.apply(null, finalArgs);
        };
    }

    function merge(receiver, provider){
        var providerKeys = Object.keys(provider),
            mergeMessage = 'Objects cannot be merged with key collisions',
            objectMessage = 'Merge values must be objects';

        checkValue(isObject, receiver, objectMessage);

        providerKeys.forEach(function(key){
            var predicate = partial(checkCollision, key);

            checkValue(predicate, receiver, mergeMessage);
            receiver[key] = provider[key];
        });

        return receiver;
    }

    function extend(receiver, provider){
        var newableError = 'Object for extension must be newable.',
            providerError = 'Extending object must be an appropriate object.';

        checkValue(isNewable, receiver, newableError);
        checkValue(isObject, provider, providerError);

        receiver.prototype = merge(receiver.prototype, provider);
        receiver.prototype.constructor = receiver;
    }

    function inherit(parentObj, childObj){
        var errorMessage = 'Inherit requires an uninitialized parent and a child object',
            childPrototype;

        checkValue(isNewable, parentObj, errorMessage);
        checkValue(isNewable, childObj, errorMessage);

        childPrototype = childObj.prototype;
        childObj.prototype = Object.create(parentObj.prototype);

        childObj.prototype = merge(childObj.prototype, childPrototype);
        childObj.prototype.constructor = childObj;

        return childObj;
    }

    function compose(objA, objB){
        var errorMessage = 'Composable values must be appropriate objects';

        checkValue(isObject, objA, errorMessage);
        checkValue(isObject, objB, errorMessage);

        function NewObj(){}
        NewObj.prototype = {};

        NewObj.prototype = merge(NewObj.prototype, objA);
        NewObj.prototype = merge(NewObj.prototype, objB);

        return NewObj;
    }

    return {
        compose: compose,
        extend: extend,
        inherit: inherit,
        merge: merge
    };
})();
