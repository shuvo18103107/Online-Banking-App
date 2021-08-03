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
    owner: 'Abdullah',
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
const inputClosePin = document.querySelector('.form__input-- ');

//display each movements on the list

// recieve a movement array
const displayMovements = function (movements) {
    // console.log(containerMovements.innerHTML);
    containerMovements.innerHTML = '';
    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `<div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1
            } ${type}</div>
            <div class="movements__date"></div> 
            <div class="movements__value">${mov}</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
        //using beforeend create each new element after the previous one, in inverted way
    });
    // console.log(containerMovements.innerHTML);
};

displayMovements(account1.movements);
//calculate movement balence and print it

const calcPrintBalence = function (mov) {
    const totalBalence = mov.reduce(
        (acc, currValue, i, arr) => acc + currValue,
        0
    );

    labelBalance.textContent = `${totalBalence} Tk`;
};
calcPrintBalence(account1.movements);

// calculate summary 

const calcDisplaySummary = function (movement) {
    const incomes = movement.filter(v => v > 0).reduce((acc, v) => acc + v, 0)
    labelSumIn.textContent = `${incomes}৳`;
    const out = movement.filter(v => v < 0).reduce((acc, v) => acc + v, 0)
    labelSumOut.textContent = `${Math.abs(out)}৳`;

    const interest = movement.filter(v => v > 0).map(v => v * 1.2 / 100).filter(v => v >= 1).reduce((acc, v) => acc + v, 0)
    labelSumInterest.textContent = `${interest}৳`;
}

calcDisplaySummary(account1.movements)










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
