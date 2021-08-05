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
            <div class="movements__value">${mov} ৳</div>
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

    labelBalance.textContent = `${acc.balence}৳`;
};

// calculate summary

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter((v) => v > 0)
        .reduce((acc, v) => acc + v, 0);
    labelSumIn.textContent = `${incomes}৳`;
    const out = acc.movements.filter((v) => v < 0).reduce((acc, v) => acc + v, 0);
    labelSumOut.textContent = `${Math.abs(out)}৳`;
    const intRate = acc.interestRate / 100;
    const interest = acc.movements
        .filter((v) => v > 0)
        .map((v) => v * intRate)
        .filter((v) => v >= 1)
        .reduce((acc, v) => acc + v, 0);
    labelSumInterest.textContent = `${interest}৳`;
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
    const amount = Number(inputLoanAmount.value);
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
