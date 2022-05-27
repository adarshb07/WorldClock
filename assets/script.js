const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const day =['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let body = document.querySelector('body');
let showAddNewCountry = document.querySelectorAll('[data-btn="show-add-new"]');
let showCountryElement = document.querySelector('[data-show="search-menu"]');
let CurrentTimeElement = document.querySelector('[data-time="current-time"]');
function showTime()
{
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let meridies = 'AM';
    if(h>12)
    {
        h = h-12;
        meridies = 'PM';
    }
    if(h == 0)
    {
        h = 12;

    }
    h = (h<10)? '0'+h:h;
    m = (m<10)? '0'+m:m;
    s = (s<10)? '0'+s:s;
    CurrentTimeElement.textContent = `${h}:${m}:${s} ${meridies}`;
    s++;
}

function SetDate()
{
    const clock = new Date();
    let date = clock.getDate();
    let monthCount = clock.getMonth();
    let year = clock.getFullYear();
    let dayCount = clock.getDay();
    document.querySelector('[data-time="current-date"]').innerHTML = `${day[dayCount]}, ${date} ${month[monthCount]} ${year}`;
}
SetDate();
setInterval(showTime,1000);
function showAdd(){
    showCountryElement.style.display ="block"
    body.style.backgroundColor = "rgba(0,0,0,0.5)"
}
function closeSearch()
{
    console.log('hello');
    showCountryElement.style.display ="none";
    body.style.backgroundColor = "white";
}

let searchCountry = document.querySelector('[data-search="country"]');

let country = countries;

country.forEach(function(country){
    let option = document.createElement('option');
    option.textContent = country.capital+ ','+country.name;
    searchCountry.appendChild(option);
});