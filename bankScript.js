'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// GrinBank APP

// Data
const account1 = {
  owner: "Harshit Bisht",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-07-26T17:01:17.194Z",
    "2020-07-28T23:36:17.929Z",
    "2020-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Divya Shah",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "INR",
  locale: "hi",
};

const account3 = {
  owner: 'Anurag Parmar',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account4 = {
  owner: 'Ayush Khampa',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
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
const btnAddMoney = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const btnSignup = document.querySelector('.signup');
const btnSignout = document.querySelector('.logout');
const btnclose = document.querySelector('.closing--btn');
const signin = document.querySelector('.btn');
const houver = document.querySelectorAll('.hover');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__inputPin');
const signup = document.querySelector('.operation--signup');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const pin = document.querySelector('.form--pin');
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Modal Window 

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


// Restricting Pin 

pin.oninput = () => {
  if(pin.value.length > pin.maxLength ) pin.value = pin.value.slice(0,pin.maxLength);
};

let timer;
let sorted;


signin.addEventListener('click',function(e) {
  e.preventDefault();
  const firstName = document.querySelector('.form__input--firstName').value;
  const Pin = Number(document.querySelector('.form--pin').value);
  const lastName = document.querySelector('.form__input--lastName').value;

  const accountNo = accounts.length +1;
  const newAccount = {
    owner: firstName +" " + lastName,
    interestRate: 1,
    movements: [],
    pin:Pin,
    currency: "INR",
    locale:"hi",
    movementsDates:[],

    userName: firstName[0].toLowerCase() + lastName[0].toLowerCase()
  };
  newAccount.movements.push(1000);
  newAccount.movementsDates.push(new Date().toISOString());
  accounts.push(newAccount);

  document.querySelector('.form__input--firstName').value = "";
  document.querySelector('.form--pin').value = "";
  document.querySelector('.form__input--lastName').value = "";
  closeModal();

});

// // signup closing 
// btnclose.addEventListener('click',function(e) {
//   e.preventDefault();
//   signup.style.display = "none";
// })

//Sorting Function

const sortFunc = function(e) {
  e.preventDefault();
  displayMov(currAcc, !sorted);
  sorted = !sorted;
};

// Transfer Function 
const transferFnc = function(e) {
  e.preventDefault();
  const transferTo = inputTransferTo.value;
  const amt =Number(inputTransferAmount.value);
  const user = accounts.find(mov => mov.userName === transferTo);
  const totalAmt = currAcc.movements.reduce((currAcc,mov) => currAcc+mov,0);
  if(user && amt>0 && amt < totalAmt) {
    currAcc.movements.push(amt*-1);
    currAcc.movementsDates.push(new Date().toISOString());
    user.movements.push(amt);
    user.movementsDates.push(new Date().toISOString());
    inputTransferTo.value = inputTransferAmount.value = "";
    updateUI(currAcc);
  }
  
};

// Add Money Function
const addMoney = function(e) {
  e.preventDefault();
  const amt = Number(inputLoanAmount.value);
  const realBalance = currAcc.movements.reduce(function(acc,curr,i) {
    return acc+ curr;
  },0);
  const valid = realBalance>=amt? true:false;
  if(valid) {
    currAcc.movements.push(amt);
    currAcc.movementsDates.push(new Date().toISOString());
  }
  inputLoanAmount.value = "";
  updateUI(currAcc);
};

// Closing Account Function
const closingAccFnc = function(e) {
  e.preventDefault();
  
  const inputName = inputCloseUsername.value;
  const inputPin = Number(inputClosePin.value);
  const index = accounts.findIndex(
    acc => acc.userName === currAcc.userName
  );
  
    if(inputName === currAcc.userName && inputPin === currAcc.pin) {
      accounts.splice(index,1);
      updateUI(currAcc);
      containerApp.style.opacity = 0;
      inputLoginUsername.style.display = "block";
      inputLoginPin.style.display = "block";
      btnLogin.style.display = "block";
      btnSignup.style.display="block";
      btnSignout.style.display="none";


      
    }
    inputCloseUsername.value = inputClosePin.value = '';
    labelWelcome.textContent = 'Log in to get started';

};

// signout
btnSignout.addEventListener('click',function(e) {
  e.preventDefault();
  clearInterval(timer);
  inputLoginUsername.style.display = "block";
  inputLoginPin.style.display = "block";
  btnLogin.style.display = "block";
  btnSignup.classList.remove('hide');
  btnSignout.classList.add('hide');
  containerApp.style.opacity = 0;
  labelWelcome.textContent = 'Log in to get started';
  document.removeEventListener('click',logInFunction);
  document.removeEventListener('click',sortFunc);
  document.removeEventListener('click',transferFnc);
  document.removeEventListener('click',addMoney);
  document.removeEventListener('click',closingAccFnc);


})


// User Name implimentation
const createUsername = function(account) {account.forEach(elm => {
  elm.userName = elm.owner.toLowerCase().split(" ").map(curr => curr[0]).join('');
})} 

createUsername(accounts);


// log in Function
let currAcc;
const logInFunction = function(e) {
  e.preventDefault();
  
  const Uname = inputLoginUsername.value;
  const Pin = inputLoginPin.value;
  let alerter=0;
  accounts.forEach(function(mov) {
    if(mov.userName === Uname && mov.pin === Number(Pin)) {
      inputLoginUsername.style.display = "none";
      btnSignup.classList.add('hide');
      btnSignout.classList.remove('hide');
      inputLoginPin.style.display = "none";
      btnLogin.style.display = "none";
      containerApp.style.opacity = 100;
      labelWelcome.textContent = `Welcome back, ${
        mov.owner.split(' ')[0]
      }`;
      currAcc = mov;
      alerter=1;

      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();

      updateUI(mov);  
      
      setTimer();

      const date = new Intl.DateTimeFormat(mov.locale).format(new Date());
      labelDate.textContent = date;

      }
  });
  if(alerter===0)alert('Wrong username or password⚠️');


};

// Log in 
btnLogin.addEventListener('click',logInFunction);




// Sorting 
btnSort.addEventListener('click',sortFunc);



// Transfer Money 
btnTransfer.addEventListener('click',transferFnc);

  

// Add Money
btnAddMoney.addEventListener('click',addMoney);

  

// Closing Account 
btnClose.addEventListener('click',closingAccFnc);


//Formating Dates

const formatDates = function(date,locale) {
  const calDaysPass = (day1,day2)=> Math.round((Math.abs(day1 - day2)) / (1000*60*60*24));
  
  const dayPass = calDaysPass(new Date(), date);

  if(dayPass === 0) return "Today";
  else if(dayPass === 1) return "Yesterday";
  else if(dayPass < 7) return `${dayPass} day ago`;

  return new Intl.DateTimeFormat(locale).format(date);

};

//Format Currency
const formatCurr = function(value,locale,currency) {
  return new Intl.NumberFormat(locale,{
    style:"currency",
    currency:currency,
  }).format(Math.abs(value));
};






// Displaying Movements
const displayMov = function(mov,sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? mov.movements.slice().sort((a, b) => a - b)
    : mov.movements;


movs.forEach(function(elm,i) {
  let type = elm > 0 ?'deposit':'withdrawal';
  let displayDate = formatDates(new Date(mov.movementsDates[i]),mov.locale);
  let value = formatCurr(elm,mov.locale,mov.currency);
  let html = `<div class="movements__row">
  <div class="movements__type movements__type--${type}"> ${i+1} ${type}</div>
  <div class="movements__date">${displayDate}</div>
  <div class="movements__value">${value}</div>
</div>`;

containerMovements.insertAdjacentHTML('afterbegin', html);


});


};

// Displaying currBalance
const currBalance = function (allMov) {
  const balance = allMov.movements.reduce((acc,elm) => acc+elm,0 );
  const totalBalance = formatCurr(balance,allMov.locale,allMov.currency);
  labelBalance.textContent = `${totalBalance}`;
  
  const inValue = allMov.movements.filter(curr => curr>0).reduce((acc,mov) => acc+mov,0).toFixed(2);
  const totalIn = formatCurr(inValue,allMov.locale,allMov.currency);
  labelSumIn.textContent =` ${totalIn}`;

  const out = Math.abs(allMov.movements.filter(curr => curr<0).reduce((acc,mov) => acc+Math.abs(mov),0)).toFixed(2);
  const totalOut = formatCurr(out,allMov.locale,allMov.currency);
  labelSumOut.textContent = `${totalOut}`;

  labelSumInterest.textContent = `${allMov.interestRate} %`;
};
// Update UI
const updateUI = function (acc) {
  // Display movements
  displayMov(acc);

  currBalance(acc);
  setTimer();
  sorted = false;
};


// Timer 
const setTimer = function () {
  let time = 300;
  // Timer Function
  const timerFunction = function() {
  let hour = String(Math.trunc(time/60)).padStart(2,0);
  let min = String(time %60).padStart(2,0);
  labelTimer.textContent = `${hour}:${min}`;
  

  if(time === 0) {
    clearInterval(timer);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Log in to get started."

  }
  time--;
};  

  if(timer) clearInterval(timer);
  timerFunction();
  timer = setInterval(timerFunction,1000);
};