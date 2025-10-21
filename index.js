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
const spinnerSearchEl =document.querySelector('.spinner--search');
const spinnerJobDetailsEl = document.querySelector('.spinner--job-details');
const jobNumberEl = document.querySelector('.count__number');
const numberEl = document.querySelector('.count__number');
const jobListEl = document.querySelector('.job-list--search');

//SEARCH COMPONENT

function searchSubmitHandler (event){
    jobListEl.innerHTML='';
    event.preventDefault();
    //get input search text
    const searchText = searchInputEl.value;
    const forbiddenPattern = /[0-9]/;
    const PatternMatch = forbiddenPattern.test(searchText);
    errorEl.textContent='you cant enter number in here !';
    if(PatternMatch===true){
        errorEl.classList.add('error--visible');
        setTimeout(timer=>{
            errorEl.classList.remove('error--visible');
        },3000);
    }
    searchInputEl.blur();
    spinnerSearchEl.classList.add('spinner--visible');
    async function fetchJobsJson() {
        spinnerSearchEl.classList.add('spinner--visible');
        const res = await fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`);
        const data = await res.json();
        const {jobItems}=data; 
        numberEl.textContent=jobItems.length;
        jobNumberEl.textContent=jobItems.length;
        spinnerSearchEl.classList.remove('spinner--visible');
        spinnerSearchEl.classList.add('spinner--hidden');
        jobItems.slice(0,7).forEach( job => {
            const jobItemHtml = `
            <li class="job-item">
                        <a class="job-item__link" href="${job.id}">
                            <div class="job-item__badge">${job.badgeLetters}</div>
                            <div class="job-item__middle">
                                <h3 class="third-heading">${job.title}</h3>
                                <p class="job-item__company">${job.company}</p>
                                <div class="job-item__extras">
                                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${job.duration}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${job.salary}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${job.location}</p>
                                </div>
                            </div>
                            <div class="job-item__right">
                                <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                                <time class="job-item__time">${job.daysAgo}d</time>
                            </div>
                        </a>
                    </li>
            `;
        
            jobListEl.insertAdjacentHTML('beforeend',jobItemHtml);
        });
        
        

        
    }
    
    fetchJobsJson();
}
    
    

searchFormEl.addEventListener('submit',searchSubmitHandler);
