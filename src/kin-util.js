(function($kin){

    isObject = $kin.isObject;
    isNewable = $kin.isNewable;

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

    $kin.checkCollision = checkCollision;
    $kin.checkValue = checkValue;
    $kin.partial = partial;

})(kin);
