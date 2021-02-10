console.log('testing:');
// Инициализация DOM элементов
const citiesSelect = document.querySelector('#cities-select');
const shopsSelect = document.querySelector('#shops-select');
const workersSelect = document.querySelector('#workers-select');
const brigadesSelect = document.querySelector('#brigades-select');
const btnSendCookie = document.querySelector('#btn-send-cookie');

// Данные для работы
//******************
const data = {
  Moscow: {
    first: ['Ivanov', 'Petrov'],
    second: ['Sidorov', 'Kozlov'],
  },
  SaintPetersburg: {
    first1: ['Mamaev', 'Sosnov'],
    second1: ['Сидоров', 'Козлов'],
    third1: ['Mamaev', 'Козлов'],
  },
  Kaluga: {
    first2: ['Максимов', 'Дмитриев'],
    second2: ['Николаев', 'Леонтьев'],
  },
};

const brigades = ['8:00 - 20:00', '20:00 - 8:00'];
//***************

//Установление дефолтных значений в выпадающие списки
//***************************
let cities = Object.keys(data);
addOptions(citiesSelect, cities);
let defaultShop = Object.keys(data[cities[0]]);
addOptions(shopsSelect, defaultShop);
let defaultWorker = Object.values(data[cities[0]][defaultShop[0]]);
addOptions(workersSelect, defaultWorker);
//**************************

//Это для куков, при условии что пользователь сразу отправит куки, не изменяя значения формы (дефолтные куки)
//********************
let selectedCity = document.querySelector('#cities-select').value;
let selectedShop = document.querySelector('#shops-select').value;
let selectedWorker = document.querySelector('#workers-select').value;
let brigade = document.querySelector('#brigades-select').value;
let workShift = document.querySelector('input[name="work-shift"]:checked')
  .value;

//********************

// вызов функции, определяющей время
addBrigaders(new Date().getHours());

// слушатель изменения "Города"
citiesSelect.addEventListener('change', function () {
  shopsSelect.length = 0;
  workersSelect.length = 0;
  let shops = Object.keys(data[this.value]);
  addOptions(shopsSelect, shops);
  let defaultWorker = Object.values(data[this.value][shops[0]]);
  addOptions(workersSelect, defaultWorker);
  selectedCity = this.value;
});

// слушатель изменения "Цеха"
shopsSelect.addEventListener('change', function () {
  workersSelect.length = 0;
  let workers = data[selectedCity][this.value];
  addOptions(workersSelect, workers);
  selectedShop = this.value;
});

// слушатель изменения "Сотрудника"
workersSelect.addEventListener('change', function () {
  selectedWorker = this.value;
});


// Отправка формы и ее данных в куки
btnSendCookie.addEventListener('click', function () {
  workShift = document.querySelector('input[name="work-shift"]:checked').value;
  sendCookie();
  console.log('Check cookie please..');
});

// Функция определения времени
function addBrigaders(currentHour) {
  let trigger = 7 < currentHour && currentHour < 20 ? 0 : 1;
  brigadesSelect.add(new Option(brigades[trigger]));
}
// Функция наполнения списков
function addOptions(select, arr) {
  for (let i = 0; i < arr.length; i++) {
    select.add(new Option(arr[i]));
  }
}

// Функция отправки куков
function sendCookie() {
  // Чистим куки
  //***********
  var mydate = new Date();
  mydate.setTime(mydate.getTime() - 1);
  document.cookie = 'CookieForTest=; expires=' + mydate.toGMTString();
  //***********
  
  //Перезаписываем
  let forCookie = [
    { city: selectedCity },
    { shop: selectedShop },
    { worker: selectedWorker },
    { brigades: brigade },
    { workShift: workShift },
  ];
  document.cookie =
    'CookieForTest=' +
    JSON.stringify(forCookie) +
    '; expires=' +
    new Date(Date.now() + 7 * 86400000).toGMTString();
}
