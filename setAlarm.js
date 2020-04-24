showAlarms();
let timeOut;
// let timeSpan;
function ringging(){
    let audio=new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');
    audio.play();
    //timeSpan = setInterval(ringging,3000);

}
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    let addDate = document.getElementById('addDate');
    let addTime = document.getElementById('addTime');
    let addTitle = document.getElementById('addTitle');
    setalarm = new Date(addDate.value+' '+addTime.value);
    now = new Date();
    let timeToAlarm = setalarm-now;
    if(timeToAlarm>=0){
        let alarm = localStorage.getItem('alarm');
        if (alarm == null)
            alarmObj = [];
        else
            alarmObj = JSON.parse(alarm);
        let myObj = {
            title: addTitle.value,
            Date: addDate.value,
            Time: addTime.value
        }
        alarmObj.push(myObj);
        localStorage.setItem('alarm', JSON.stringify(alarmObj));
    }
        addTitle.value = '';
        addTime.value = '';
        addDate.value = '';
        showAlarms();
        setAlarm();
});

function setAlarm() {
    let alarm = localStorage.getItem('alarm');
    if (alarm == null)
        alarmObj = [];
    else
        alarmObj = JSON.parse(alarm);
    alarmObj.forEach(function (elements) {
        setalarm = new Date(elements.Date+' '+elements.Time);
        now = new Date();
        let timeToAlarm = setalarm-now;
        if(timeToAlarm>=0){
            timeOut = setTimeout(ringging,timeToAlarm);
       }
    });
   

}

function showAlarms() {
    let alarm = localStorage.getItem('alarm');
    if (alarm == null)
        alarmObj = [];
    else
        alarmObj = JSON.parse(alarm);
    let html = '';
    alarmObj.forEach(function (elements, index) {
        html += `
        <div class="setAlarm my-2 mx-2 card" style="width: 18rem;">
            
            <div class="card-body">
              <p class="card-title"> ${elements.title}</p>
              <p class="card-text">${elements.Date}</p>
              <p class="card-text">${elements.Time}</p>
              <button id=${index} onclick="deleteAlarm(this.id)" class="btn btn-primary">Delete Alarm</button>
               <button id=${index} class="btn btn-primary">Stop Alarm</button>
            </div>
          </div>
        `;
    });
    let alarmEln = document.getElementById('alarm');
    if (alarmObj.length != 0)
        alarmEln.innerHTML = html;
    else
        alarmEln.innerHTML = '<b>** Nothing to show Alarm</b>';
}

function deleteAlarm(index) {
    let alarm = localStorage.getItem('alarm');
    let alarmObj = [];
    alarmObj = JSON.parse(alarm);
   
    clearTimeout(timeOut);

    alarmObj.splice(index, 1);
    localStorage.setItem('alarm', JSON.stringify(alarmObj))

    showAlarms();
};

// function stopAlarm() {
//     console.log(timeSpan);
//     clearInterval(timeSpan);
// }

let inputVal = document.getElementById('inputVal');
inputVal.addEventListener('input', function () {
    let setAlarm = document.getElementsByClassName('setAlarm');
    Array.from(setAlarm).forEach(function (element) {
        let cardTxt1 = element.getElementsByTagName('p')[0].innerText;
		let cardTxt2 = element.getElementsByTagName('p')[1].innerText;
		let cardTxt3 = element.getElementsByTagName('p')[2].innerText;
        if (cardTxt1.includes(inputVal.value) || cardTxt2.includes(inputVal.value) || cardTxt3.includes(inputVal.value))
            element.style.display = 'block';
        else
            element.style.display = 'none';
    })
});

function updateClock(){
    let currentTime= new Date();
    let currentHour= currentTime.getHours();
    let currentMinute= currentTime.getMinutes();
    let currentSeconds= currentTime.getSeconds();

    currentHour =(currentHour<10?"0":"") +currentHour;
    currentMinute =(currentMinute<10?"0":"") +currentMinute;
    currentSeconds =(currentSeconds<10?"0":"") +currentSeconds;

    let timeOfDay = ( currentHour<12) ? "AM" : "PM" ;

    currentHour = ( currentHour>12) ? currentHour-12 : currentHour;
    currentHour = ( currentHour==0) ? 12 : currentHour;

    let currentTimestr = currentHour+":"+currentMinute+":"+currentSeconds+" "+timeOfDay;

    document.getElementById("clock").innerHTML = currentTimestr;
}

