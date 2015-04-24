describe('kin.js', function(){

    var parentObj,
        childObj;

    beforeEach(function(){
        function parentBase(){}
        parentBase.prototype = {};

        function childBase(){}
        childBase.prototype = {};

        parentObj = parentBase;
        childObj = childBase;
    });

    describe('inherit', function(){

        it('should throw an error when no arguments are passed', function(){
            function testFn(){
                kin.inherit();
            }

            expect(testFn).toThrow();
        });

        it('should throw an error when one argument is passed', function(){
            function testFn(){
                kin.inherit(parentObj);
            }

            expect(testFn).toThrow();
        });

    });

});
