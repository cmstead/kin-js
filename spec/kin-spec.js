describe('kin.js', function(){

    var parentObj,
        childObj;

    beforeEach(function(){
        function parentBase(){}
        parentBase.prototype = {
            'parentProp': function(){}
        };

        function childBase(){}
        childBase.prototype = {
            'childProp': function(){}
        };

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

        it('should return a newable object that inherits from the parent', function(){
            var NewObj = kin.inherit(parentObj, childObj),
                objInstance = new NewObj();

            expect(objInstance instanceof parentObj).toBe(true);
        });

        it('should return a newable object that inherits from the child', function(){
            var NewObj = kin.inherit(parentObj, childObj),
                objInstance = new NewObj();

            expect(objInstance instanceof childObj).toBe(true);
        });

        it('should return a newable object that has all properties of both objects', function(){
            var NewObj = kin.inherit(parentObj, childObj),
                objInstance = new NewObj(),
                hasProps = objInstance.parentProp !== undefined &&
                           objInstance.parentProp !== undefined;

            expect(hasProps).toBe(true);
        });

    });

    describe('merge', function(){

        it('should throw an error if there is a merge collision', function(){
            var objA = { 'test': 'foo' },
                objB = { 'test': 'bar' },
                error = new Error('Objects cannot be merged with key collisions');

            function testFn(){
                kin.merge(objA, objB);
            }

            expect(testFn).toThrow(error);
        });

        it('should throw an error if receiver object is unmergeable', function(){
            var error = new Error('Merge values must be objects');

            function testFn(){
                kin.merge(null, {});
            }

            expect(testFn).toThrow(error);
        });

        it('should merge the two objects if there is no collision', function(){
            var objA = { 'test1': 'foo' },
                objB = { 'test2': 'bar' },
                expectedValue = {
                    'test1': 'foo',
                    'test2': 'bar'
                },
                result = kin.merge(objA, objB);

            expect(JSON.stringify(result)).toBe(JSON.stringify(expectedValue));
        });


    });

    describe('extend', function(){

        it('should throw an error if extendable object is not extensible', function(){
            var error = new Error('Object for extension must be newable.');

            function testFn(){
                kin.extend({}, {});
            }

            expect(testFn).toThrow(error);
        });

        it('should throw an error if extension object is no acceptable', function(){
            var error = new Error('Extending object must be an appropriate object.');

            function testFn(){
                kin.extend(childObj, null);
            }

            expect(testFn).toThrow(error);
        });

        it('should merge object properties into newable object prototype', function(){
            var extensionObj = { 'test': 'foo' };

            kin.extend(childObj, extensionObj);

            expect(childObj.prototype.test).toBe('foo');
        });

    });

    describe('compose', function(){

        it('should throw an error if first object is unacceptable', function(){
            var error = new Error('Composable values must be appropriate objects');

            function testFn(){
                kin.compose(null, null);
            }

            expect(testFn).toThrow(error);
        });

        it('should throw an error if second object is unacceptable', function(){
            var error = new Error('Composable values must be appropriate objects');

            function testFn(){
                kin.compose({}, null);
            }

            expect(testFn).toThrow(error);
        });

        it('should return a newable object', function(){
            var NewObj = kin.compose({}, {});

            expect(typeof new NewObj()).toBe('object');
        });

        it('should return a newable object with merged properties from objA', function(){
            var NewObj = kin.compose({ 'test1': 'foo' }, {});

            expect(NewObj.prototype.test1).toBe('foo');
        });

        it('should return a newable object with merged properties from objA', function(){
            var NewObj = kin.compose({ 'test1': 'foo' }, { 'test2': 'bar' });

            expect(NewObj.prototype.test2).toBe('bar');
        });

    });

});
