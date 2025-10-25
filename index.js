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
const jobDetailsContentEl = document.querySelector('.job-details__content');
const spinnerJobsDetailEl = document.querySelector('.spinner--job-details');
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

const clickHandler = (event) =>{
    event.preventDefault();
    const jobItemEl = event.target.closest('.job-item');
    //active job item
    document.querySelector('.job-item--active')?.classList.remove('job-item--active');
    jobItemEl.classList.add('job-item--active');
    jobDetailsContentEl.innerHTML='';
    spinnerJobDetailsEl.classList.add('spinner--visible');
    //fetch job item detail
    const jobItemId = jobItemEl.children[0].getAttribute('href');
    console.log(jobItemId);
    fetch(`https://bytegrad.com/course-assets/js/2/api/jobs/${jobItemId}`)
    .then(response=>{
        if(!response.ok){
            console.log('somthing went wrong');
            return;
        }
        return response.json();
    })
    .then(data =>{
        //show job Detail
        const {jobItem}=data;
        console.log(jobItem);
        
        spinnerJobDetailsEl.classList.remove('spinner--visible');
        const jobDetail =`
        <img src="${jobItem.coverImgURL}" alt="#" class="job-details__cover-img">

<a class="apply-btn" href="https://fictionalversonetworkswebsite.com" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>

<section class="job-info">
    <div class="job-info__left">
        <div class="job-info__badge">${jobItem.badgeLetters}</div>
        <div class="job-info__below-badge">
            <time class="job-info__time">${jobItem.daysAgo}d</time>
            <button class="job-info__bookmark-btn">
                <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
            </button>
        </div>
    </div>
    <div class="job-info__right">
        <h2 class="second-heading">${jobItem.title}</h2>
        <p class="job-info__company">Verso Networks</p>
        <p class="job-info__description">${jobItem.description}</p>
        <div class="job-info__extras">
            <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> ${jobItem.duration}</p>
            <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i> ${jobItem.salary}</p>
            <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i> ${jobItem.location}</p>
        </div>
    </div>
</section>

<div class="job-details__other">
    <section class="qualifications">
        <div class="qualifications__left">
            <h4 class="fourth-heading">Qualifications</h4>
            <p class="qualifications__sub-text">Other qualifications may apply</p>
        </div>
        <ul class="qualifications__list">
            <li class="qualifications__item">Node.js</li>
        </ul>
    </section>

    <section class="reviews">
        <div class="reviews__left">
            <h4 class="fourth-heading">Company reviews</h4>
            <p class="reviews__sub-text">Recent things people are saying</p>
        </div>
        <ul class="reviews__list">
            <li class="reviews__item">Only job I liked going to.</li>
        </ul>
    </section>
</div>

<footer class="job-details__footer">
    <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
</footer>
        `
        jobDetailsContentEl.innerHTML=jobDetail;

    })
    .catch(err => console.log(err));
        
      
};

jobListEl.addEventListener('click',clickHandler);



