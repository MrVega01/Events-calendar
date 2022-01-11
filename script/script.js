// dyCalendarJS
dycalendar.draw({
  target: '#calendar',
  type: 'month',
  dayformat: 'full',
  highlighttoday: true,
  prevnextbutton: 'show',
})
// UX

//Getters
var calendarBox = document.querySelector('#calendar');
var calendar = calendarBox.querySelector('.dycalendar-body');
var dateInformation = calendarBox.querySelector('.prev-btn');
var nextButton = calendarBox.querySelector('.next-btn');

var form = document.querySelector(".formNewEvent");
var buttonCloseForm = form.querySelector('#closeForm');
var dateShow = form.querySelector("#basic-addon3");

var hourForm = form.querySelector("#basic-url");
var textForm = form.querySelector("#floatingTextarea2");

var radioSelection = document.getElementsByName("flexRadioDefault");
var radio1 = radioSelection[0];
var submitForm = form.querySelector("#submitForm");
var error = form.querySelector(".errorDiv");
var notify = document.querySelector(".notify");

var eventInformation = document.querySelector(".eventInformation");
var typeShow = document.querySelector('.select');

var searchButton = document.querySelector("#search");
var shadowSearch = document.querySelector(".shadowBox2");
var closeSearch = shadowSearch.querySelector('#closeSearch');
var daySearch = shadowSearch.querySelector('#daySearch');
var monthSearch = shadowSearch.querySelector('#monthSearch');
var yearSearch = shadowSearch.querySelector('#yearSearch');
var buttonSearch = shadowSearch.querySelector('#buttonSearch');
var errorSearch = shadowSearch.querySelector('.errorSearch');

var changeButton = document.querySelector('#changeView');

var viewButton = document.querySelector('.viewButton');
var viewBox = document.querySelector('.viewBox');
var closeViewButton = document.querySelector('#closeView');
var boxColumns = document.querySelector('#boxColumns');

//Events
calendarBox.addEventListener("click", update);
calendar.addEventListener("click", dayDetection);

buttonCloseForm.addEventListener("click", closeForm);
submitForm.addEventListener("click", formProcess);

window.addEventListener("load", chargeEvents);
typeShow.addEventListener("change", chargeEvents);
eventInformation.addEventListener("click", deleteCard);

searchButton.addEventListener("click", openSearch);
closeSearch.addEventListener("click", searchCanceled);
buttonSearch.addEventListener("click", search);

changeButton.addEventListener("click", changeView);

viewButton.addEventListener("click", fullView);
closeViewButton.addEventListener("click", closeView);
boxColumns.addEventListener("click", deleteCard);

//Functions
function update(e){
    e.preventDefault();
    setTimeout(function(){
    calendar = document.querySelector('.dycalendar-body');
    dateInformation = document.querySelector('.prev-btn');
    nextButton = document.querySelector('.next-btn');
    calendar.addEventListener("click", dayDetection);
  },200);
}

function dayDetection(e) {
  e.preventDefault();
  let day = e.target.innerHTML;
  if (day > 0 && day < 32) {
  let month = dateInformation.getAttribute("data-month");
  let year = dateInformation.getAttribute("data-year");

  var weekName = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
  var monthName = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
  let date = new Date(year,month,day);

  form.style.opacity = "1";
  form.style.zIndex = "2";
  dateShow.innerHTML = weekName[date.getDay()] + ' ' + monthName[date.getMonth()] + ' ' +  date.getDate() + ' ' + date.getFullYear();
  }
}

function closeForm(e){
  e.preventDefault();
  form.style.opacity = "0";
  form.style.zIndex = "-2";
  hourForm.value = '';
  textForm.value = '';
  radio1.checked = true;
}

function formProcess(e){
  let hour = hourForm.value.replace(/\s+/g, '');
  let text = textForm.value.replace(/\s+/g, '');

  if (hour == '' || text == '') {
    error.innerHTML = 'Please, fill in all fields';
    error.classList.add("alert", "alert-danger", "my-2");
    setTimeout(function(){
      error.classList.remove("alert", "alert-danger", "my-2");
      error.innerHTML = '';
    },5000);
    return;
  }
  if (radioSelection[0].checked) {
    var eventType = radioSelection[0].value;
  }
  else if (radioSelection[1].checked) {
    var eventType = radioSelection[1].value;
  }
  else if (radioSelection[2].checked) {
    var eventType = radioSelection[2].value;
  }
  const cardInformation = {
    date: dateShow.innerHTML,
    hour: hourForm.value,
    text: textForm.value,
    type: eventType
  }
  if (localStorage.getItem("eventsArray")) {
    var eventsArray = JSON.parse(localStorage.getItem("eventsArray"));
    eventsArray.push(cardInformation);
  }
  else{
    var eventsArray = new Array(cardInformation);
  }
  localStorage.setItem("eventsArray", JSON.stringify(eventsArray));

  notify.innerHTML = 'The event has been created successfully';
  notify.classList.add("alert", "alert-success");
  setTimeout(function(){
    notify.classList.remove("alert", "alert-success");
    notify.innerHTML = '';
  },5000);
  chargeEvents(e);
  closeForm(e);
}
function openSearch(e){
  e.preventDefault()
  shadowSearch.style.opacity = "1";
  shadowSearch.style.zIndex = "2";
}
function searchCanceled(e){
  e.preventDefault();
  shadowSearch.style.opacity = "0";
  shadowSearch.style.zIndex = "-2";
  daySearch.value = '';
  monthSearch.value = '';
  yearSearch.value = '';
}
function search(e){
  e.preventDefault();
  if (daySearch.value != '' && daySearch.value > 0 && daySearch.value < 32 &&
      monthSearch.value != '' && monthSearch.value > 0 && monthSearch.value < 13 &&
      yearSearch.value != '' && yearSearch.value > 1899 && yearSearch.value < 10000) {

    dycalendar.draw({
      target: '#calendar',
      type: 'month',
      dayformat: 'full',
      highlighttoday: true,
      prevnextbutton: 'show',
      date: daySearch.value,
      month: monthSearch.value-1,
      year: yearSearch.value,
    });
    searchCanceled(e);
  }
  else {
    errorSearch.innerHTML = 'An error has occurred, fill in the fields correctly';
    errorSearch.classList.add("alert", "alert-danger", "my-2");
    setTimeout(function(){
      errorSearch.classList.remove("alert", "alert-danger", "my-2");
      errorSearch.innerHTML = '';
    },5000);
  }
}
function changeView(e){
  e.preventDefault();
  if (document.querySelector(".dycalendar-month-container")) {
    dycalendar.draw({
    target: '#calendar',
    dayformat: 'full',
    highlighttoday: true,
    prevnextbutton: 'show',
    })
  }
  else {
    dycalendar.draw({
      target: '#calendar',
      type: 'month',
      dayformat: 'full',
      highlighttoday: true,
      prevnextbutton: 'show',
    })
  }
}
function deleteCard(e){
  e.preventDefault();
  if (e.target.getAttribute("name") == "delete") {
    let id = e.target.getAttribute("id");
    let array = JSON.parse(localStorage.getItem("eventsArray"));
    array.splice(id,1);
    if (array.length == 0) {
      localStorage.clear();
      chargeEvents(e);
      return;
    }
    localStorage.setItem("eventsArray", JSON.stringify(array));
    chargeEvents(e);
    fullView(e);
  }
}
function closeView(e){
  e.preventDefault();
  viewBox.style.transform = "translate(100vw, 0)";
  document.body.style.overflowY = "auto";
  setTimeout(function(){
    viewBox.style.zIndex = -3;
  },500);
}
function fullView(e){
  e.preventDefault();
  viewBox.style.transform = "translate(0, 0)";
  viewBox.style.zIndex = 3;
  document.body.style.overflowY = "hidden";

  if (localStorage.getItem("eventsArray")) {
    boxColumns.innerHTML = ''
    let array = JSON.parse(localStorage.getItem("eventsArray"));
    for (var i = 0; i < array.length; i++) {
      let card = cardsFormat(array[i], i);
      boxColumns.innerHTML += '<div class="col-md-3">' + card + '</div>';
    }
  }
  else {
    let p = `<p>You don't have events created, click any date in the calendar for create a new event <span class="far fa-smile fa-fw"></span></p>`;
    boxColumns.innerHTML = p;
  }
}
function chargeEvents(e){
  e.preventDefault();

  //In case of having
  if (localStorage.getItem("eventsArray")) {
    eventInformation.innerHTML = ''
    let array = JSON.parse(localStorage.getItem("eventsArray"));

    //In case of be an event
    if (typeShow.value == "Events") {
      for (var i = 0; i < array.length; i++) {
        if (array[i].type == "Event") {
          let card = cardsFormat(array[i], i);
          eventInformation.innerHTML += card;
        }
      }
    }

    //In case of be a class
    else if (typeShow.value == "Classes") {
      for (var i = 0; i < array.length; i++) {
        if (array[i].type == "Class") {
          let card = cardsFormat(array[i], i);
          eventInformation.innerHTML += card;
        }
      }
    }

    //In case of be a reminder
    else if (typeShow.value == "Reminders") {
      for (var i = 0; i < array.length; i++) {
        if (array[i].type == "Reminder") {
          let card = cardsFormat(array[i], i);
          eventInformation.innerHTML += card;
        }
      }
    }

    //In case of be all
    else{
      let array = JSON.parse(localStorage.getItem("eventsArray"));
      for (var i = 0; i < array.length; i++) {
        let card = cardsFormat(array[i], i);
        eventInformation.innerHTML += card;
      }
    }
  }
  //In case of not have
  else {
    let p = `<p>You don't have events created, click any date in the calendar for create a new event <span class="far fa-smile fa-fw"></span></p>`;
    eventInformation.innerHTML = p;
  }
}
//Functions with much HTML
function cardsFormat(objectInformation, i){
  let html = `
  <div class="card mb-2 cardStyle">
  <div class="card-header">${objectInformation.type}</div>
  <div class="card-body">
    <h6 class="card-subtitle mb-2">${objectInformation.date} at ${objectInformation.hour}</h6>
    <p class="card-text">${objectInformation.text}</p>
    <a href="#"><span class="far fa-trash-alt fa-fw styleIcon" name="delete" id="${i}"></span></a>
  </div>
</div>
  `;
  return html;
}
