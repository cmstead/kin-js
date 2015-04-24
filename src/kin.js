var kin = (function(){

    function inherit(parentObj){
        console.log(parentObj.prototype);
        throw new Error('Inherit requires a parent and a child object');
    }

    return {
        inherit: inherit
    };
})();
