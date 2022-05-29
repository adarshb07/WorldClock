const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const day =['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
let body = document.querySelector('body');
const country = countries;
let showAddNewCountry = document.querySelectorAll('[data-btn="show-add-new"]');
let showCountryElement = document.querySelector('[data-show="search-menu"]');
let CurrentTimeElement = document.querySelector('[data-time="current-time"]');
let CityList = document.querySelector('[data-city="list"]');
/* ------ Current Date and Time Start ------ */
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
/* ------ Current Date and Time End ------ */
SetDate();
setInterval(showTime,1000);

/* ------ Add New Country Model Start ------ */
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

// function searchCity(value)
// {
//     console.log(value);
// }
//Sort Object By Capital Name
country.sort((a,b)=>{
    return a.capital.localeCompare(b.capital);
});

// country.forEach(element => {
//     console.log(element.capital+', '+element.name);
// });
function ShowAllTimeZone()
{
    country.forEach(element => {
        if(element.capital == '')
        {
            let newElement = document.createElement('div');
            newElement.setAttribute('onclick','addCity(this)');
            newElement.classList.add('cities-items');
            newElement.innerHTML =`<h3>${element.name}</h3>`
            CityList.append(newElement);
        }
        else{
            let newElement = document.createElement('div');
            newElement.setAttribute('onclick','addCity(this)');
            newElement.classList.add('cities-items');
            newElement.innerHTML =`<h3>${element.capital}, ${element.name} </h3>`
            CityList.append(newElement);
        }
    });
    newElement='';
}
ShowAllTimeZone();

function addCity(val)
{
    let date= new Date();
    let index=0;
    let countryArr = val.textContent.split(',');
    console.log(countryArr[0]);
    if(countryArr.length == 1)
    {
        let index = country.map(element=>element.name).indexOf(countryArr[0]);
        console.log(index);
        console.log(country[index].timezones[0]);
    }
    else{
        let index = country.map(element=>element.capital).indexOf(countryArr[0]);
        console.log(index);
        console.log(country[index].timezones[0]);
    }
    console.log(date.toLocaleString('en-US', { timeZone: country[index].timezones[0] }));

}