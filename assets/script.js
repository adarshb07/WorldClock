const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let body = document.querySelector('body');
const country = countries;
let showAddNewCountry = document.querySelectorAll('[data-btn="show-add-new"]');
let showCountryElement = document.querySelector('[data-show="search-menu"]');
let CurrentTimeElement = document.querySelector('[data-time="current-time"]');
let CityList = document.querySelector('[data-city="list"]');


let dataList = [];
let functionCounter = 0;
let TimeZoneSaver = [];
/* ------ Current Date and Time Start ------ */
function showTime() {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let meridies = 'AM';
    if (h > 12) {
        h = h - 12;
        meridies = 'PM';
    }
    if (h == 0) {
        h = 12;

    }
    h = (h < 10) ? '0' + h : h;
    m = (m < 10) ? '0' + m : m;
    s = (s < 10) ? '0' + s : s;
    CurrentTimeElement.textContent = `${h}:${m}:${s} ${meridies}`;
    s++;
}
function SetDate() {
    const clock = new Date();
    let date = clock.getDate();
    let monthCount = clock.getMonth();
    let year = clock.getFullYear();
    let dayCount = clock.getDay();
    document.querySelector('[data-time="current-date"]').innerHTML = `${day[dayCount]}, ${date} ${month[monthCount]} ${year}`;
}
/* ------ Current Date and Time End ------ */
SetDate();
setInterval(showTime, 1000);

/* ------ Add New Country Model Start ------ */
function showAdd() {
    showCountryElement.style.display = "block"
    body.style.backgroundColor = "rgba(0,0,0,0.5)"
}
function closeSearch() {
    showCountryElement.style.display = "none";
    body.style.backgroundColor = "white";
}

// function searchCity(value)
// {
//     console.log(value);
// }
//Sort Object By Capital Name
country.sort((a, b) => {
    return a.capital.localeCompare(b.capital);
});

// country.forEach(element => {
//     console.log(element.capital+', '+element.name);
// });
function ShowAllTimeZone() {
    country.forEach(element => {
        if (element.capital == '') {
            dataList.push(element.name)
            let newElement = document.createElement('div');
            newElement.setAttribute('onclick', 'addCity(this)');
            newElement.classList.add('cities-items');
            newElement.innerHTML = `<h3>${element.name}</h3>`
            CityList.append(newElement);
        }
        else {
            dataList.push(element.capital+', ' + element.name)
            let newElement = document.createElement('div');
            newElement.setAttribute('onclick', 'addCity(this)');
            newElement.classList.add('cities-items');
            newElement.innerHTML = `<h3>${element.capital}, ${element.name} </h3>`
            CityList.append(newElement);
        }
    });
    newElement = '';
}
ShowAllTimeZone();

function addCity(val) {
    let date = new Date();
    let index = 0;
    let countryArr = val.textContent.split(',');
    let addTimeZone = document.querySelector('[data-item="add-other-timeZone"]');
    // console.log(countryArr[0]);
    if (countryArr.length == 1) {
        index = country.map(element => element.name).indexOf(countryArr[0]);
        // console.log(index);
        console.log(country[index].timezones[0]);
    }
    else {
        index = country.map(element => element.capital).indexOf(countryArr[0]);
        console.log(index);
        console.log(country[index].timezones[0]);
    }
    // console.log(date.toLocaleString('en-US', { timeZone: country[index].timezones[0] }));

    let timezone = country[index].timezones[0];
    let newElement = document.createElement('div');
    newElement.classList.add('other-location');
    newElement.innerHTML = `
        <i class="ri-delete-bin-line del" onclick="remove(this)"></i>
        <h3 class="country-label">${timeZoneCountry(countryArr)}</h3>
        <h3 class="other-time" id="timer${functionCounter}"> ${OtherTime(timezone)} </h3>
        <h4 class="other-date" id="date${functionCounter}">${addDate(timezone)}<h4>
        <p class="Time-Diff">${getTimeDiff(timezone)}</p>`
    addTimeZone.append(newElement);

    showCountryElement.style.display = "none";
    body.style.backgroundColor = "white";
    function timeZoneCountry(countryArr) {
        if (countryArr.length == 1) {
            return countryArr[0];
        }
        else {
            return countryArr[0] + ', ' + countryArr[1];
        }
    }
    function OtherTime(TimeZone) {
        TimeZoneSaver.push(TimeZone);
        // console.log(TimeZone);
        let newDate = date.toLocaleString('en-US', { timeZone: TimeZone });
        let time = new Date(newDate);
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();
        let meridies = 'AM';
        if (h > 12) {
            h = h - 12;
            meridies = 'PM';
        }
        if (h == 0) {
            h = 12;
        }
        h = (h <= 9) ? '0' + h : h;
        m = (m <= 9) ? '0' + m : m;
        s = (s <= 9) ? '0' + s : s;
        return h + ':' + m + ' ' + ` <span class="meridies-other">${meridies}</span>`;
    }
    functionCounter++;
}

function OtherCountryTimeUpdator() {
    let timer = document.querySelectorAll('[id^="timer"]');
    timer.forEach(element => {
        let index = element.id.slice(5);
        let newDate = new Date().toLocaleString('en-US', { timeZone: TimeZoneSaver[index] });
        let time = new Date(newDate);
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();
        let meridies = 'AM';
        if (h > 12) {
            h = h - 12;
            meridies = 'PM';
        }
        if (h == 0) {
            h = 12;
        }
        h = (h <= 9) ? '0' + h : h;
        m = (m <= 9) ? '0' + m : m;
        s = (s <= 9) ? '0' + s : s;
        element.innerHTML = h + ':' + m + ` <span class="meridies-other">${meridies}</span>`;
    });
}
setInterval(OtherCountryTimeUpdator, 1000);

function addDate(TimeZone)
{
    let date = new Date();
    let newDate = date.toLocaleString('en-US', { timeZone: TimeZone });
    let time = new Date(newDate);
    let weekday = day[time.getDay()];
    let curMonth = month[time.getMonth()];
    let curDate = time.getDate();
    let curYear = time.getFullYear();

    return weekday+', '+curDate+' '+curMonth+' '+curYear;
}

function getTimeDiff(timezone)
{
    let date = new Date();
    let ch = date.getHours();
    let cm = date.getMinutes();
    let cdate = date.getDate();
    let cmonth = date.getMonth();
    let newDate = date.toLocaleString('en-US', { timeZone: timezone });
    let time = new Date(newDate);
    let h = time.getHours();
    let m = time.getMinutes();
    let od = time.getDate();
    let omonth = time.getMonth();

    if(cdate == od)
    {
        let hdiff = h - ch;
        let mdiff = m - cm;
        return `${hdiff} hr ${Math.abs(mdiff)} min`;
    }
    else
    {
        let hdiff = ch-h;
        let mdiff = cm-m;
        return `${hdiff} hr ${Math.abs(mdiff)} min`;
    }
}

function remove(element) {
    element.parentElement.remove();
    console.log('element removed');
}

let cityItem = document.getElementsByClassName('cities-items')
function searchCity(city){
   Array.from(cityItem).forEach(element => element.remove());
    city = city.toLowerCase();
    dataList.map(element =>{
        if(!city || element.toLowerCase().indexOf(city) !== -1)
        {
            dataList.push(element.capital+', ' + element.name)
            let newElement = document.createElement('div');
            newElement.setAttribute('onclick', 'addCity(this)');
            newElement.classList.add('cities-items');
            newElement.innerHTML = `<h3>${element}</h3>`
            CityList.append(newElement);
        }
    });
}