const textBlockEl = document.querySelectorAll(".text");
const saveBtnEl = document.querySelector(".saveBtn");
const currentTime = document.getElementById("currentDay");
const hourText = document.querySelectorAll(".hourtext");


var headerClock = function () {
    var now = moment().format('MMMM Do YYYY, h:mm:ss a');
    currentTime.textContent = now
}

setInterval(headerClock, 1000);
headerClock();

var setHourText = function () {
    // var setHour = 9;
    //     var setTime = moment().set('hour', setHour).set('second', 0).format('h a')
    //     console.log(setTime)
    for (var i = 0; i < hourText.length; i++) {
        var setHour = 21 + parseInt([i]);
        // console.log(setHour);
        var setTime = moment().set('hour', setHour).set('second', 0).format('h a');
        // console.log(setTime)
        hourText[i].textContent=setTime;
        hourText[i].setAttribute('data-hour', setHour);
    };
    
};

setHourText();




 var textBlockColor = function () {
     //  var setHour = moment().hour(parseHour);
     //  console.log(setHour);
    //  var hour = moment().hour();
    //  console.log(hour);
     
    //  console.log(parseHour);
    //  console.log(hourPlusOne);
     for (var i = 0; i < hourText.length; i++){
        var parseHour = parseInt(moment(hourText[i].textContent, ['h a']).format('H'));
           if (moment().format('h a') === hourText[i].textContent) {
               textBlockEl[i].classList += " present";
               textBlockEl[i].classList.remove("past", "future");
           }
           else if (moment().hour() < moment().hour(parseHour)) {
            textBlockEl[i].classList += " future";
            textBlockEl[i].classList.remove("past", "present");
           }

           else if (moment().hour() > moment().hour(parseHour)) {
            textBlockEl[i].classList += " past";
            textBlockEl[i].classList.remove("future", "present");
           }
    
    }
    
     

}

textBlockColor()



