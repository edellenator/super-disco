const textBlockEl = document.querySelectorAll(".text");
const saveBtnEl = document.querySelectorAll(".saveBtn");
const currentTime = document.getElementById("currentDay");
const hourText = document.querySelectorAll(".hourtext");
const selectTextBox = document.querySelector('.text');

var textArray = [];

// header clock to set current time
var headerClock = function () {
    var now = moment().format('MMMM Do YYYY, h:mm:ss a');
    currentTime.textContent = now
}

// refresh current time to continually update time each second
setInterval(headerClock, 1000);
headerClock();

// dynamically generate hour text on left column of scheduler
var setHourText = function () {
    for (var i = 0; i < hourText.length; i++) {
        var setHour = 9 + parseInt([i]);
        // console.log(setHour);
        var setTime = moment().set('hour', setHour).set('second', 0).format('h a');
        // console.log(setTime)
        hourText[i].textContent=setTime;
        hourText[i].setAttribute('data-hour', setHour);
    };
    
};

setHourText();


// set text block color based on time left hand column

var textBlockColor = function () {
     for (var i = 0; i < hourText.length; i++){
        var now = moment()
        var timeBlock = moment().hour(parseHour)
        var parseHour = parseInt(moment(hourText[i].textContent, ['h a']).format('H'));
           if (moment(timeBlock).isSame(now)) {
               textBlockEl[i].classList += " present";
               textBlockEl[i].classList.remove("past", "future");
           }
           else if (moment(timeBlock).isBefore(now)) {
            textBlockEl[i].classList += " past";
            textBlockEl[i].classList.remove("future", "present");
           }

           else if (moment(timeBlock).isAfter(now)) {
            textBlockEl[i].classList += " future";
            textBlockEl[i].classList.remove("past", "present");
           };
    
    };   
};

//check each minute if the time block color should be updated
setInterval(textBlockColor(),1000 * 60);

// make text content of html element editable
var textBlockEdit = function (index) {
    return function() {
        console.log('you clicked on text area' + index);
        textBlockEl[index].setAttribute('contenteditable', 'true');
    }
};

for (var i = 0; i < textBlockEl.length; i++) {
    textBlockEl[i].addEventListener('click', textBlockEdit(i))
};


// remove editable attribute from html element and save text content push it in to an array. Save array to local storage
var textBlockSave = function (index) {
    return function() {
        console.log('you clicked button #' + index)
        if (textBlockEl[index].getAttribute('contenteditable')){
            textBlockEl[index].removeAttribute('contenteditable')
        }
        var updatedTextArray = []

        for (var i = 0; i < textBlockEl.length; i++) {
            updatedTextArray.push(textBlockEl[i].textContent)
        }
        textArray = updatedTextArray

        setStorage()
    }
}

var setStorage = function () {
        localStorage.setItem('timeblocktext', JSON.stringify(textArray));
};

var getStorage = function() {
    console.log('the window is loaded')
    var retrievedText = localStorage.getItem('timeblocktext')
    if(!retrievedText) {
        return false
    };
    console.log(retrievedText);
    retrievedText = JSON.parse(retrievedText);
    console.log(retrievedText);

    for (var i = 0; i < textBlockEl.length; i++) {
        textBlockEl[i].textContent = retrievedText[i];
    }
}

for (var i = 0; i < saveBtnEl.length; i++) {
    saveBtnEl[i].addEventListener('click', textBlockSave(i))
};

// put saved local storage info in to text content of scheduler
window.addEventListener('load', getStorage())