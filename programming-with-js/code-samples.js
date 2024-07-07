/** Data structures
 * 
 * Native DS: Ojbect, Array, Map and Set
 * 
 */

console.log("\n//---------- Array --------------")
//  ForEach:
const veggies = ['onion', 'garlic', 'potato'];
veggies.forEach( function(veggie, index) {
    console.log(`${index}. ${veggie}`);
})

//  Filter:
const nums = [0,10,20,30,40,50];
nums.filter( function(num) {
 return num > 20;
})

//  Map:
let r = [0,10,20,30,40,50].map(
    function(num) {
        return num / 10;
    });
console.log(r);


console.log("\n//---------- Map --------------")
let bestBoxers = new Map();
bestBoxers.set(1, "The Champion");
bestBoxers.set(2, "The Runner-up");
bestBoxers.set(3, "The third place");

console.log(bestBoxers);


console.log("\n//---------- Set --------------")
const repetitiveFruits = ['apple','pear','apple','pear','plum', 'apple'];
const uniqueFruits = new Set(repetitiveFruits);
console.log(uniqueFruits);



/**
 * Spread operator '...', unpack an array of arguments to a function. 
 * I can declare a list of undefined number of arguments for a function.
 * 
 */
// Concat arrays
console.log("\n//---------- Spread Operator --------------")
const fruits = ['apple', 'pear', 'plum']
const berries = ['blueberry', 'strawberry']
const fruitsAndBerries = [...fruits, ...berries] // concatenate
console.log(fruitsAndBerries); // outputs a single array

// Join objects
const flying = { wings: 2 }
const car = { wheels: 4 }
const flyingCar = {...flying, ...car}
console.log(flyingCar) // {wings: 2, wheels: 4}

// Add items to an array
let veggies2 = ['onion', 'parsley'];
let veggies3 = [...veggies2, 'carrot', 'beetroot'];
console.log(veggies3);

//Convert string to an array
const greeting = "Hello";
const arrayOfChars = [...greeting];
console.log(arrayOfChars); //  ['H', 'e', 'l', 'l', 'o']

// Clone an object
const car1 = {
    speed: 200,
    color: 'yellow'
}
const car2 = {...car1}
car1.speed = 201
console.log(car1.speed, car2.speed)

// Clone an array
const fruits1 = ['apples', 'pears']
const fruits2 = [...fruits1]
fruits1.pop()
console.log(fruits1, "not", fruits2)


/**
 * Rest operator
 * 
 */
console.log("\n//---------- Rest Operator --------------")
const[ valfirst, valsecond, valthird, ...arrOthers] = ['a','b','c','d','e','f','g']
console.log(valfirst);
console.log(valsecond);
console.log(arrOthers);
