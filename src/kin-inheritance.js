(function($kin){

    isObject = $kin.isObject;
    isNewable = $kin.isNewable;
    checkCollision = $kin.checkCollision;
    checkValue = $kin.checkValue;
    partial = $kin.partial;

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


    $kin.compose = compose;
    $kin.extend = extend;
    $kin.inherit = inherit;
    $kin.merge = merge;
})(kin);
