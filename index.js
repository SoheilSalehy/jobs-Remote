//--Global--
const errorEl = document.querySelector('.error');
const bookmarks_Btn = document.querySelector('.bookmarks-btn');
const searchFormEl = document.querySelector('.search');
const searchInputEl = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__submit-btn');
const searchResultNumberEl = document.querySelector('.count__number u-bold');
const sortingIconEl = document.querySelector('.fa-solid fa-arrow-down-short-wide sorting__icon');
const sortByRelevantBtn = document.querySelector('.sorting__button sorting__button--relevant sorting__button--active');
const sortByRecentBtn = document.querySelector('.sorting__button sorting__button--recent');
const pagingBtn = document.querySelector('.pagination__button pagination__button--next');
const jobsToShow = document.querySelector('.job-details__content');

//SEARCH COMPONENT

function searchSubmitHandler (event){
    event.preventDefault();
    //get input search text
    const searchText = searchInputEl.value;
    const forbiddenPattern = /[0-9]/;
    const PatternMatch = forbiddenPattern.test(searchText);
    if(PatternMatch===true){
        errorEl.classList.add('error--visible');
        setTimeout(timer=>{
            errorEl.classList.remove('error--visible');
        },3000);
    }
    
}
searchFormEl.addEventListener('submit',searchSubmitHandler);

