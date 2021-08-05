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
    const incomes = acc.movements.filter(v => v > 0).reduce((acc, v) => acc + v, 0)
    labelSumIn.textContent = `${incomes}৳`;
    const out = acc.movements.filter(v => v < 0).reduce((acc, v) => acc + v, 0)
    labelSumOut.textContent = `${Math.abs(out)}৳`;
    const intRate = acc.interestRate / 100;
    const interest = acc.movements.filter(v => v > 0).map(v => v * intRate).filter(v => v >= 1).reduce((acc, v) => acc + v, 0)
    labelSumInterest.textContent = `${interest}৳`;
}











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
    calcDisplaySummary(currAcc)
}










//find method 
//retrieve first element from the array based on condition

const firstwithDraw = account1.movements.find(v => v < 0);
console.log(firstwithDraw);

const account = accounts.find(v => v.owner === 'Mohammad Ali Shuvo')

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

    currentAccount = accounts.find(v => v.userName === inputLoginUsername.value)
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {


        console.log(`login successfull`);

        inputLoginUsername.value = inputLoginPin.value = "";
        //inputPin looses its focus by using blur
        inputLoginPin.blur();
        //display UI and welcome message
        labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;

        containerApp.style.opacity = 100;


        UpdateUi(currentAccount)
    }
})


//Transfer Money 

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    // console.log(currentAccount);
    const amount = Number(inputTransferAmount.value);
    // console.log(inputTransferTo.value);

    const reciverAcc = accounts.find(v => v.userName === inputTransferTo.value);
    console.log(amount, reciverAcc);

    inputTransferTo.value = inputTransferAmount.value = "";

    // console.log(amount, TransUserName);
    if (reciverAcc && currentAccount.balence >= amount && amount > 0 && reciverAcc.userName != currentAccount.userName) {
        //withdraw from sender at first
        console.log('Transfer valid');
        currentAccount.movements.push(-amount);
        console.log(currentAccount.movements);

        //add deposite to the reciever account
        reciverAcc.movements.push(amount)
        console.log(reciverAcc.movements);
        UpdateUi(currentAccount);
    }
    else {

        // notification dekhabo pore 
        console.log('You have not sufficient money');
    }



    // add deposite to the transfer user account




})


// close account functionality  using find index method
// find index same as find but it return only index not whole thing

btnClose.addEventListener('click', function (e) {

    e.preventDefault();
    console.log(inputClosePin.value);


    if (inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin) {

        const clsAccUser = accounts.findIndex(v => v.userName === inputCloseUsername.value)
        //indexof o kora jai but indexof findindex er moto complex query kora jai na just array te data thakle kaj kore like indexof(23)
        accounts.splice(clsAccUser, 1)

        // hide UI
        containerApp.style.opacity = 0;
        console.log(`Account close successfull`);

        console.log(accounts);
    }
    else {
        console.log(`please provide valid username`);
    }

    inputCloseUsername.value = inputClosePin.value = "";
    inputClosePin.blur();
})


