'use strict';

// BANKIST APP -mimimalist online banking

// Data
//using object rather than map cg data are coming from web api are like object
const account1 = {
    owner: 'Mohammad Ali Shuvo',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,


};

const account2 = {
    owner: 'Noushad Bhuiyan',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,

};

const account3 = {
    owner: 'A.K.M Miftahur Rahman Sarker',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'John Doe',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin ');

//display each movements on the list

// recieve a movement array
const displayMovements = function (movements, sort = false) {
    // console.log(containerMovements.innerHTML);
    containerMovements.innerHTML = '';

    // sorting functionality
    // orginal mov array ke sort na kore shallow copy er upor kaj korbo
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `<div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1
            } ${type}</div>
            <div class="movements__date"></div> 
            <div class="movements__value">${mov.toFixed(2)} ৳</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
        //using beforeend create each new element after the previous one, in inverted way
    });
    // console.log(containerMovements.innerHTML);
};

//calculate movement balence and print it

const calcPrintBalence = function (acc) {
    acc.balence = acc.movements.reduce(
        (acc, currValue, i, arr) => acc + currValue,
        0
    );

    labelBalance.textContent = `${acc.balence.toFixed(2)}৳`;
};

// calculate summary

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter((v) => v > 0)
        .reduce((acc, v) => acc + v, 0);
    labelSumIn.textContent = `${incomes.toFixed(2)}৳`;
    const out = acc.movements.filter((v) => v < 0).reduce((acc, v) => acc + v, 0);
    labelSumOut.textContent = `${Math.abs(out).toFixed(2)}৳`;
    const intRate = acc.interestRate / 100;
    const interest = acc.movements
        .filter((v) => v > 0)
        .map((v) => v * intRate)
        .filter((v) => v >= 1)
        .reduce((acc, v) => acc + v, 0);
    labelSumInterest.textContent = `${interest.toFixed(2)}৳`;
};

const TktoUsd = 0.012;

const USDmovements = account1.movements.map(
    (value) => value * TktoUsd

    //     function (valu, i) {
    //     //ekta new array return kore map each iteration e condition apply er pasapai

    //     // return valu * TktoUsd;
    //     // return 23 ba jai ditam same position e 23 add kore ekta rray return korto
    // }
);

// console.log(USDmovements);

// using map method another example

const movementsDesc = account1.movements.map(
    (value, i) =>
        `Movement ${i + 1}: You ${value > 0 ? 'deposited' : 'withdraw'} ${Math.abs(
            value
        )}`
);

// console.log(movementsDesc);

// compute user name
// const user = 'Mohammad Ali Shuvo' // MAS

// const shortForm = [];
// userNAme.forEach(function (v, i) {
//     shortForm.push(v[0].toUpperCase());

// })
// console.log(shortForm);

// console.log(shortForm.join(''));

// user NAme compute function
const createUserName = function (accs) {
    accs.forEach(function (acc) {
        // console.log(acc);
        //create a new property;

        // side effects - do some work without returning anything

        acc.userName = acc.owner
            .toLowerCase()
            .split(' ')
            .map((v) => v[0])
            .join('');
    });
};
createUserName(accounts);
// console.log(createUserName(accounts));
console.log(accounts);

//filter method
const deposite = account1.movements.filter(function (v) {
    return v >= 0;
});
console.log(deposite);

const withdraw = account1.movements.filter(function (v) {
    return v < 0;
});
console.log(withdraw);

// reduce method
//accumulator --> snowball
// console.log(account1.movements);
// const totalBalence = account1.movements.reduce((acc, currValue, i, arr) => acc + currValue, 0)
// console.log(acc, currValue);
//reduce method e ( accumulator(current sum of all the previous value) ,curren

//initial value of accumulator

// console.log(totalBalence);

//maximum/minimum value from movements

const maximumVal = account1.movements.reduce(function (acc, v, i) {
    return acc > v ? acc : v;
}, account1.movements[0]);
console.log(maximumVal);

//the magic of chainning method

const totalDepositUSD = account1.movements
    .filter((mov) => mov > 0)
    //   .map((mov,i,arr) => mov * TktoUsd) //in case of debugging we can use arr argument
    .map((mov, i, arr) => mov * TktoUsd)
    .reduce((acc, v) => acc + v, 0);

console.log(totalDepositUSD);

// Update The UI
const UpdateUi = function (currAcc) {
    //Display movements
    displayMovements(currAcc.movements);

    //Display balence
    calcPrintBalence(currAcc);

    //Display summary
    calcDisplaySummary(currAcc);
};

//find method
//retrieve first element from the array based on condition

const firstwithDraw = account1.movements.find((v) => v < 0);
console.log(firstwithDraw);

const account = accounts.find((v) => v.owner === 'Mohammad Ali Shuvo');

console.log(account);
//same functionality using for of loop
// for (const acc of accounts) {
//     if (acc.owner === 'Mohammad Ali Shuvo') {
//         console.log(acc);
//     }
// }
let currentAccount;
//login functionality

btnLogin.addEventListener('click', function (e) {
    //prevent from form submitting
    e.preventDefault();
    // console.log('Login');

    currentAccount = accounts.find(
        //eikhane filter use koiraow specific object paitam kintu filter new array banaiya tr vitor object take rakhbe kintu find direct element take return kore
        (v) => v.userName === inputLoginUsername.value
    );
    console.log(currentAccount);
    //  console.log(+'23');
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        console.log(`login successfull`);

        inputLoginUsername.value = inputLoginPin.value = '';
        //inputPin looses its focus by using blur
        inputLoginPin.blur();
        //display UI and welcome message
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]
            }`;

        containerApp.style.opacity = 100;

        UpdateUi(currentAccount);
    }
});

//Transfer Money

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    // console.log(currentAccount);
    const amount = Number(inputTransferAmount.value);
    // console.log(inputTransferTo.value);

    const reciverAcc = accounts.find((v) => v.userName === inputTransferTo.value);
    console.log(amount, reciverAcc);

    inputTransferTo.value = inputTransferAmount.value = '';

    // console.log(amount, TransUserName);
    if (
        reciverAcc &&
        currentAccount.balence >= amount &&
        amount > 0 &&
        reciverAcc.userName != currentAccount.userName
    ) {
        //withdraw from sender at first
        console.log('Transfer valid');
        currentAccount.movements.push(-amount);
        console.log(currentAccount.movements);

        //add deposite to the reciever account
        reciverAcc.movements.push(amount);
        console.log(reciverAcc.movements);
        UpdateUi(currentAccount);
    } else {
        // notification dekhabo pore
        console.log('You have not sufficient money');
    }

    // add deposite to the transfer user account
});

//Request Loan Functionality using some method
// we get loan if atleast 1 deposite and 10% of loan amount exist on my balence

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movements.some((v) => v >= amount * 0.1)) {
        console.log(`You are eligible for loan`);

        currentAccount.movements.push(amount);
        console.log(currentAccount.movements);

        UpdateUi(currentAccount);
        inputLoanAmount.value = '';
        inputLoanAmount.blur();
    } else {
        //notification FIXME
        console.log(`not eligible`);
    }
});

// close account functionality  using find index method
// find index same as find but it return only index not whole thing

btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    console.log(inputClosePin.value);

    if (
        inputCloseUsername.value === currentAccount.userName &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const clsAccUser = accounts.findIndex(
            (v) => v.userName === inputCloseUsername.value
        );
        //indexof o kora jai but indexof findindex er moto complex query kora jai na just array te data thakle kaj kore like indexof(23)
        accounts.splice(clsAccUser, 1);


        // hide UI
        containerApp.style.opacity = 0;
        labelWelcome.textContent = 'Log in to get started';
        console.log(`Account close successfull`);

        console.log(accounts);
    } else {
        console.log(`please provide valid username`);
    }

    inputCloseUsername.value = inputClosePin.value = '';
    inputClosePin.blur();
});

let sorted = false;
//sort functionality
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);

    sorted = !sorted;
});

// include method - we can use include method if a certain array value exist on the array includes return true
//includes only test with value(equality ) not check condition
console.log(account1.movements.includes(200));
// to apply condition and check a certain property exist on the array or not usinng some method

//some method to check any deposite exist in the array or not
const anyDeposite = account1.movements.some((v) => v > 0);
console.log(anyDeposite);
const above5Thousands = account1.movements.some((v) => v > 5000);
console.log(above5Thousands);
//every method

//same as some but main diff is , in every method if all the element satisfy the condition then return true

console.log(account1.movements.every((v) => v > 0));
//array te specific condition diya search deowar khetre some useful , r jodi emn hoi je proti ta value same condition pass korbe taile every
console.log(account1.movements.some((v) => v > 0));

//separate call back

const depositeVal = (v) => v > 0;
console.log(account1.movements.every(depositeVal));
console.log(account1.movements.some(depositeVal));
console.log(account1.movements.filter(depositeVal));

//flat and flat map
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
//sepearte this and put it in one array
//old way using destructor and spread operator
const [a, b, ...c] = arr;
console.log(a);
console.log(b);
console.log(c);
const spreaOp = [...a, ...b, ...c];
console.log(spreaOp);

//but it,s simple using flat  method that introduce in es2019 (not work in super old browser)
//flat : remove the nested array and put it in one array
console.log(arr.flat()); // no call back function

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// more we want to get deeper nested more flat value we have to set by default flat(1); [[]]
console.log(arrDeep.flat(2)); //2nd level nesting
// calculate all accounts balence , total bank balence
//--------flat-------
const totalBalence = accounts
    .map((v) => v.movements)
    .flat()
    .reduce((acc, v) => acc + v, 0);

console.log(totalBalence);

//flatMap method combine flat and map method together for better performance

//----------flatMAp---------
const totalBalence2 = accounts
    .flatMap((v) => v.movements)
    .flat()
    .reduce((acc, v) => acc + v, 0);

console.log(totalBalence2);

//flatmap is one level deep [[]] but if we want to go more depper we have to go with flat

//Short method
//String
const owners = ['shuvo', 'kamrul', 'noushad', 'adam', 'martha  '];
console.log(owners.sort());
//sort method mutated the orginal array
console.log(owners);

//Numbers

//sort work on string not number
console.log(account1.movements);
// console.log(account1.movements.sort());
//sort callback function rule
//return <0 a,b //descending keep order
//return >0 b,a //ascending switch order
// account1.movements.sort((a, b) => {
//     //imagine a and b are two consecutive numbers in the array
//     //lets short in ascending order (small->large)   -400 , so we have  to switch , we have to return something>0

//     if (a > b) {
//         return 1; //switch order
//     }
//     if (b > a) {
//         return -1; //keep order
//     }
// })
//ascending shorter way
// account1.movements.sort((a, b) => a - b)

// console.log(account1.movements);
// descending order(large-small)
// account1.movements.sort((a, b) => {

//     if (a > b) {
//         return -1; //keep order
//     }
//     if (b > a) {
//         return 1; //switch order
//     }

// })
// account1.movements.sort((a, b) => b - a)
// console.log(account1.movements);

console.log(account1.movements.slice());

// More ways to creatring and filling array
//empty arrays + fill methods
const arrFill = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8, 9));

//passing 1 argument create that length of array
const x = new Array(7);
console.log(x);
// x.fill(5);

//just like slice we can set the beginand end parameter
x.fill(1, 3, 5);
console.log(x);
//.fill(set property,start index,endindexconsiderlength like)
arrFill.fill(23, 1, 8);
arrFill.fill(5, 0, -8);
arrFill.fill(10, 8, -1);
console.log(arrFill);

//Array.from method

//generate array + fill this array dynamically , first parameter length of the array thn a call back function on each iteartion return value
const dynamicArr = Array.from({ length: 7 }, () => 1);
console.log(dynamicArr);

// rather than create array and thn fill use Array.from

const ar = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(ar);
const arrRandom = Array.from(
    { length: 100 },
    (_, i) => Math.floor(Math.random() * 6) + 1
);

console.log(arrRandom);
//practical example of array.from

//get the movements from the ui and calculate it
// dom element  pick kore array te store korte pari

labelBalance.addEventListener('click', function () {
    const movemntUI = Array.from(
        document.querySelectorAll('.movements__value'),
        (el) => Number(el.textContent.replace('৳', ''))
    );
    //another way without using from method just use spread operator
    const moveUi2 = [...document.querySelectorAll('.movements__value')];

    console.log(moveUi2);
    console.log(movemntUI);
});

console.log('------------------------Numbers and Date--------------------');
//-----------Numbers-----------
//js always shows decimal point in any numbers
console.log(23 === 23.0);

console.log(0.1 + 0.2 === 0.3);
//but js return false in that case due to fractional system
// string to number
console.log(Number('23'));
console.log(+'23');//+ here typr conversion convert string to num autmatically

//Parsint - identify number from a string- but string should be start with number otherwise not work
//2nd parameter is base base10- 0-9 - sometimes it help to unencessary bug
console.log(Number.parseInt('100px', 10));
console.log(Number.parseInt('px100', 10));
console.log(Number.parseFloat('2.5rem', 10));
console.log(Number.parseInt('2.5rem', 10));

// we can check if any value is a number or not a number (NAN hole true noile false)

console.log(Number.isNaN('shuvo'));
console.log(Number.isNaN(+'20x'));
// use isfinite rather than isnan to check a value is number or nan
//best way to checking a value is number or not 
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20x'));
console.log(Number.isFinite(23 / 0));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23.0 / 0));

//Remainder Operator
// simply returns a remainder from a division
console.log(5 % 2);
console.log(8 % 3);

// it is useful to checking even odd
console.log(5 % 2);
console.log(6 % 2);
const isEven = n => n % 2 === 0;

console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(15));
//nodelist to array convert using arrayform
console.log([...document.querySelectorAll('.movements__row')]);

// labelBalance.addEventListener('click', function () {
//     Array.from(document.querySelectorAll('.movements__row')).forEach(
//         function (v, i) {
//             //0 2 4 6 8
//             if (i % 2 === 0) {
//                 v.style.backgroundColor = 'orangered'
//             }
//             if (i % 3 === 0) {
//                 // 0 3 6 9 12
//                 v.style.backgroundColor = 'blue'
//             }

//         }
//     )
// })

//BigINT - special type of int introduce in es2020
// numbers are represent in js 64 bit(53 store number rest sign and decimal point)
console.log(2 ** 53 - 1); //buggest number that js can safely represent
console.log(Number.MAX_SAFE_INTEGER);
//unsafe numbers but some unsafe num still can be represent
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);
console.log(2 ** 53 + 5);

console.log((2 ** 89 - 1));
//suppose we get a large number from database or a web api then for representation we can use BigInt
console.log(4589745213698521452136974589632145n);
//operation use case of bigINT
console.log(100000n + 500000n);
console.log(100048478123654789412257999999999912478515n * 100000000000n);
//big int never work with normal num
const huge = 444444445799999999999n;
const num = 23;
// console.log(huge * num); //show error
console.log(huge * BigInt(num));
//math operation also not work in bigInt
//but in comparison we can work with bigInt and normal num
// exception
console.log(huge > num); //true
console.log(huge === num);//cg one is bigint and another one is num so return false
console.log(20n == '20');

//string e big int use korle big int string e convert hoi
console.log(huge + 'Is really big');

//Division
console.log(10 / 3);// normally 3.33333333333
console.log(10n / 3n);// but in bigint cut the decimal and return the closes 3n

//Math and rounding

console.log(`-----------------MAth and Rounding-------------`);
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));
console.log(Math.max(5, 10, '100', 25, 99));//100 type cohertion
console.log(Math.max(5, 10, '100px', 25, 99));//NAN cannot parese thats why
console.log(Math.min(5, 10, 100, 25, 99, -25, 0, -50));
console.log(Math.PI * Number.parseFloat('10px') ** 2);
console.log(Math.random());//random num between 0 and 1
console.log(Math.trunc(Math.random() * 6 + 1));
//gives a random num that stays between min and max
const randomInt = (min, max) => Math.trunc(Math.random() * (max - min) + min)

console.log(randomInt(5, 100));

//rounding int 
console.log(Math.trunc(23.9));
console.log(Math.round(23.9)); //24 .5 er por next num ta nei round trunc decimal part ta kate num check kore na
console.log(Math.ceil(23.1));//ceil point er porer value tai nibe .1 thakleow round .5 er theke nei ceil .1 thekei nei next value
console.log(Math.ceil(23.9));
console.log(Math.floor(23.9));
console.log(Math.floor(23.9));
//floor is just like trunc but floor neg number e ceil er moto kaj kore
console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.1));// -24

// so for all situation better use floor rather then trunc

// rounding decimals
console.log(+(2.7).toFixed(0)); // 3 //tofixed always returns string not a number
console.log(+(2.7).toFixed(5));// 2.70000 decimal er por 5 ta point fixed korlo
console.log(+(2.458963).toFixed(2));  //2.46 // result string ke number e convert kore nite hobe
