

/**
* JavaScript has a number of built-in object types, such as:
* Math, Date, Object, Function, Boolean, Symbol, Array, Map, Set, Promise, JSON, etc.
*/


/** 
 * Constructor functions:
 * 
 * To use a constructor function, I must prepend it with the operator new.
 * 
 * 
 * Math is an exception. We use static methods instead of constructor functions.
 */

// Custom constructor is a funciton setting up this properties and 
// then I call the function with new.


function Icecream(flavor) {
    this.flavor = flavor;
    this.meltIt = function() {
        console.log(`The ${this.flavor} icecream has melted`);
    }
}

let kiwiIcecream = new Icecream('kiwi');

kiwiIcecream.meltIt();

/**
 * Comparing string objects
 * 
 */
plum1 = new String("plum");
plum2 = new String("plum");

console.log(plum1==plum2);
console.log(plum1===plum2);
console.log(plum1.valueOf() == plum2.valueOf());

/**
 * A RegExp object is another built-in object in JavaScript. It's used to pattern-match strings using what's known as "Regular Expressions". Regular Expressions exist in many languages, not just JavaScript.

In JavaScript, you can built an instance of the RegExp constructor using new RegExp. 

Alternatively, you can use a pattern literal instead of RegExp. Here's an example of using /d/ as a pattern literal, passed-in as an argument to the match method on a string.
 * 
 */

console.log("abcd".match(/d/)); // ['d', index: 3, input: 'abcd', groups: undefined]
console.log("abcd".match(/a/)); // ['a', index: 0, input: 'abcd', groups: undefined]

/**
 * Instead of using Array, Function, and RegExp constructors, 
 * you should use their array literal, 
 * function literal, and pattern literal varieties: 
 * [], () {}, and /()/.
 * 
 * 
 * However, when building objects of other built-in types, we can use the constructor.
 */

new Date();
new Error();
new Map();
new Set();
new WeakSet();
new WeakMap();
new Promise(()=>{});

/**
 * Classes
 * 
 */

class Animal {

}

class Cat extends Animal {
    constructor(){
        super();
        this.noise = "meow";
    }
}

var result = new Animal();
console.log(result.noise);

/**
 * De-structuring properties
 */

let {PI} = Math;
console.log(PI);

let a1 = [1,2,3]
let [a,b,c] = a1
console.log(a+","+b+","+c);

let {flavor} = kiwiIcecream;
console.log("Destructured flavor from icecream: "+ flavor);


/**
 * Iterables
 */

console.log(Object.entries(kiwiIcecream));

console.log(kiwiIcecream["flavor"]);

var drone = {
    speed: 15,
    color: "orange"
  }
console.log(drone["speed"]);


/** for-in and for-of loops */

/* for-in loops over all the object
properteis, inherited and the own object */

const car = {
    engine: true
}

const sportsCar = Object.create(car);
sportsCar.speed = "fast";

console.log("SportsCar: ", sportsCar);

console.log("---- for in loop ")
//for-in loop
for (prop in sportsCar) {
    console.log(prop + ": " + sportsCar[prop]);
}
console.log("---- for of loop ")
//for-of loop
for (prop of Object.keys(sportsCar)) {
    console.log(prop + ": " + sportsCar[prop]);
}


/**
 * Template literal
 * 
 */

console.log(`${1+1+1} calc inline`);


function scopeTest() {
    console.log(x);
}
var x = 33;
scopeTest();

function count(...food) {
    console.log(food.length)
}
count("Burgers", "Fries", null);

const letter = 'a';
// letter = 'b';
