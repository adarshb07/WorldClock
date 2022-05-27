let showAddNewCountry = document.querySelectorAll('[data-btn="show-add-new"]');
let showCountryElement = document.querySelector('[data-show="search-menu"]');
let body = document.querySelector('body');
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