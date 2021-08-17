'use strict';

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are 
eating too much or too little.
Eating too much means the dog's current food portion is larger than the 
recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% 
above and 10% below the recommended portion (see hint).
Your tasks:
1. Loop over the 'dogs' array containing dog objects, and for each dog, calculate 
the recommended food portion and add it to the object as a new property. Do 
not create a new array, simply loop over the array. Forumla: 
recommendedFood = weight ** 0.75 * 28. (The result is in grams of 
food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too 
little. Hint: Some dogs have multiple owners, so you first need to find Sarah in 
the owners array, and so this one is a bit tricky (on purpose) �
3. Create an array containing all owners of dogs who eat too much 
('ownersEatTooMuch') and an array with all owners of dogs who eat too little 
('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and 
Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat 
too little!"
5. Log to the console whether there is any dog eating exactly the amount of food 
that is recommended (just true or false)
6. Log to the console whether there is any dog eating an okay amount of food 
(just true or false)
7. Create an array containing the dogs that are eating an okay amount of food (try 
to reuse the condition used in 6.)
8. Create a shallow copy of the 'dogs' array and sort it by recommended food 
portion in an ascending order (keep in mind that the portions are inside the 
array's objects �
*/
const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1

dogs.forEach(function (v, i) {
    v.recomFoodPortion = Math.trunc(v.weight ** 0.75 * 28);
});

console.log(dogs);

//2
const sarahDog = dogs.find((v) => v.owners.some((v) => v === 'Sarah'));

console.log(
    `Sarah's Dog is eating too ${sarahDog.curFood > sarahDog.recomFoodPortion ? ' much' : 'little'
    }`
);
//3

const ownersEatTooMuch = dogs
    .filter((v) => v.curFood > v.recomFoodPortion)
    .flatMap((v) => v.owners);
console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
    .filter((v) => v.curFood < v.recomFoodPortion)
    .map((v) => v.owners)
    .flat(); // also can use flatMAp
console.log(ownersEatTooLittle);

//4.
console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too little`);
//5

const isGetexactAmountFood = dogs.some((v) => v.curFood === v.recomFoodPortion);
console.log(isGetexactAmountFood);
//6

const checkOkamountFood = (v) =>
    v.curFood > v.recomFoodPortion * 0.9 && v.curFood < v.recomFoodPortion * 1.1;

const isgetanyOkamountFood = dogs.some((v) => checkOkamountFood(v));
console.log(isgetanyOkamountFood);

//7

console.log(dogs.filter((v) => checkOkamountFood(v)));

//8
const recomArray = dogs
    .slice()
    .sort((a, b) => a.recomFoodPortion - b.recomFoodPortion);

// const recomArray = dogs.slice().map(v => Number(v.recomFoodPortion)).sort((a, b) => a - b);
console.log(recomArray);
