# kin-js
Kin.js is an object inheritance, composition, introspection and reflection library

##Here's the hitlist:

*kin.inherit*

- Accepts a definition for a parent and child object
- Updates the child object with the prototype of the parent
- Merges the properties of the child object into the prototype of the new object
- Sets the constructor to the child constrcutor function
- Returns a new, fully inherited object which news up to an instance of both the parent and the child
- Throws an error property key collision
- Throws an error if either provided object has no prototype or prototype.constructor

*kin.extend*

- Accepts a defition for a core object and an object containing exptension properties
- Creates a new object that is a child of the original definition object
- Throws an error on property key collision
- Throws an error if parent object has no prototype or prototype.constructor
- Throws an error if extension object is an array
- Throws an error if extension object is not an object

*kin.merge*

- Accepts two object pointers
- Merges values from second object into first
- Throws an error if either object is unacceptable (array or non-object)

*kin.compose*

- Accepts two objects
- Composes the two objects into a new instantiable object
- Combines constructors if available
- Does not inherit from either original object
- Throws an error on property key collision
- Throws an error if object is an array

*kin.reflect*

- Accepts any object type
- Returns object type and handles special typing for arrays and null

*kin.introspect*

- Accepts any object type
- Returns JSON object containing introspection data including
    - Function argument list
    - Function argument count
    - Properties keyed by keyname
    - Property type