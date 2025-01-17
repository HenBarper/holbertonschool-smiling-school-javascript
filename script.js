$(document).ready(function(){
    let initialLoad = false;

    if (window.location.pathname === '/holbertonschool-smiling-school-javascript/homepage.html') {
        PopulateQuotes();
        PopulateTutorials();
        PopulateLatest();
    }
    if (window.location.pathname === '/holbertonschool-smiling-school-javascript/pricing.html') {
        PopulateQuotes();
    }
    if (window.location.pathname === '/holbertonschool-smiling-school-javascript/courses.html') {
        PopulateCourseCategories();
        PopulateCourses();
    }

    document.getElementById('select-keywords').addEventListener('input', PopulateCourses);
});

function changeTopic(option) {
    document.getElementById('select-topic').innerText = option;
    PopulateCourses();
}
function changeSort(option) {
    document.getElementById('select-sort-by').innerText = option;
    PopulateCourses();
}

function PopulateQuotes() {
    $.ajax({
        url: "https://smileschool-api.hbtn.info/quotes",
        method: "GET",
        success: function(response){
            const quoteCarousel = $('#quote-carousel');

            response.forEach(function makeCarouselItem(quote, index) {
                const carouselItem = $('<div>').addClass('carousel-item');
                const rowItem = $('<div>').addClass('row mx-auto align-items-center');
                const picDiv = $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center');
                const quoteImg = $('<img>').addClass('d-block align-self-center').attr('src', quote['pic_url']);
                const quoteDiv = $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0');
                const quoteTextDiv = $('<div>').addClass('quote-text');
                const quotePrg = $('<p>').addClass('text-white').text(quote['text']);
                const quoteeName = $('<h4>').addClass('text-white font-weight-bold').text(quote['name']);
                const quoteeTitle = $('<span>').addClass('text-white').text(quote['title']);
                
                quoteTextDiv.append(quotePrg, quoteeName, quoteeTitle);
                quoteDiv.append(quoteTextDiv);
                picDiv.append(quoteImg);
                rowItem.append(picDiv, quoteDiv);
                carouselItem.append(rowItem);
                quoteCarousel.append(carouselItem);

                if (index === 0) {
                    carouselItem.addClass('active');
                }
            });
            $('#loading-quotes').addClass('d-none');
            $('#quotes-container').removeClass('d-none');
        },
        error: function() {
            alert("Error loading quotes");
        }
    })
}

function PopulateTutorials() {
    $.ajax({
        url: "https://smileschool-api.hbtn.info/popular-tutorials",
        method: "GET",
        success: function(response){
            const quoteCarousel = $('#tutorial-carousel');
            

            response.forEach(function makeCarouselItem(tutorial, index) {
                // const carouselItem = $('<div>').addClass('carousel-item');
                // const rowItem = $('<div>').addClass('row align-items-center mx-auto');
                // const colItem = $('<div>').addClass('col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center');
                const card = $('<div>').addClass('card p-3');
                const thumbnail = $('<img>').addClass('card-img-top').attr('src', tutorial['thumb_url']);
                const cardOverlay = $('<div>').addClass('card-img-overlay text-center');
                const playButton = $('<img>').addClass('mx-auto my-auto play-overlay').attr('src', 'images/play.png').attr('width', '64px');
                const cardBody = $('<div>').addClass('card-body');
                const cardTitle = $('<h5>').addClass('card-title font-weight-bold').text(tutorial['title']);
                const cardPrg = $('<p>').addClass('card-text text-muted').text(tutorial['sub-title']);
                const creator = $('<div>').addClass('creator d-flex align-items-center');
                const creatorImg = $('<img>').addClass('rounded-circle').attr('src', tutorial['author_pic_url']).attr('width', '30px');
                const creatorName = $('<h6>').addClass('pl-3 m-0 main-color').text(tutorial['author']);
                const cardFooter = $('<div>').addClass('info pt-3 d-flex justify-content-between');
                const ratingDiv = $('<div>').addClass('rating d-flex');
                for(let i = 1; i < 6; i++){
                    if(i <= tutorial['star']) {
                        const fullStar = $('<img>').attr('src', 'images/star_on.png').attr('width', '15px').attr('height', '15px');
                        ratingDiv.append(fullStar);
                    }
                    else {
                        const emptyStar = $('<img>').attr('src', 'images/star_off.png').attr('width', '15px').attr('height', '15px');
                        ratingDiv.append(emptyStar);
                    }
                }
                const time = $('<span>').addClass('main-color').text(tutorial['duration']);
                
                cardFooter.append(ratingDiv, time); //1
                creator.append(creatorImg, creatorName); //2
                cardBody.append(cardTitle, cardPrg, creator, cardFooter); //3
                cardOverlay.append(playButton); //4
                card.append(thumbnail, cardOverlay, cardBody); //5
                // colItem.append(card); //6
                // rowItem.append(colItem); //7
                // carouselItem.append(rowItem); //8
                quoteCarousel.append(card);//9
                
                // if (index === 0) {
                //     console.log('adding active class');
                //     carouselItem.addClass('active');
                // }
            });
            $('#tutorial-carousel').slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                prevArrow: $('.prev1'),
                nextArrow: $('.next1'),
                responsive: [
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 2
                      }
                    },
                    {
                      breakpoint: 576,
                      settings: {
                        slidesToShow: 1
                      }
                    }
                  ]
              });
            $('#loading-tutorials').addClass('d-none');
            $('#tutorial-carousel').removeClass('d-none');
        },
        error: function() {
            alert("Error loading tutorials");
        }
    })
}

function PopulateLatest() {
    $.ajax({
        url: "https://smileschool-api.hbtn.info/latest-videos",
        method: "GET",
        success: function(response){
            const quoteCarousel = $('#latest-carousel');
            

            response.forEach(function makeCarouselItem(tutorial, index) {
                const card = $('<div>').addClass('card p-3');
                const thumbnail = $('<img>').addClass('card-img-top').attr('src', tutorial['thumb_url']);
                const cardOverlay = $('<div>').addClass('card-img-overlay text-center');
                const playButton = $('<img>').addClass('mx-auto my-auto play-overlay').attr('src', 'images/play.png').attr('width', '64px');
                const cardBody = $('<div>').addClass('card-body');
                const cardTitle = $('<h5>').addClass('card-title font-weight-bold').text(tutorial['title']);
                const cardPrg = $('<p>').addClass('card-text text-muted').text(tutorial['sub-title']);
                const creator = $('<div>').addClass('creator d-flex align-items-center');
                const creatorImg = $('<img>').addClass('rounded-circle').attr('src', tutorial['author_pic_url']).attr('width', '30px');
                const creatorName = $('<h6>').addClass('pl-3 m-0 main-color').text(tutorial['author']);
                const cardFooter = $('<div>').addClass('info pt-3 d-flex justify-content-between');
                const ratingDiv = $('<div>').addClass('rating d-flex');
                for(let i = 1; i < 6; i++){
                    if(i <= tutorial['star']) {
                        const fullStar = $('<img>').attr('src', 'images/star_on.png').attr('width', '15px').attr('height', '15px');
                        ratingDiv.append(fullStar);
                    }
                    else {
                        const emptyStar = $('<img>').attr('src', 'images/star_off.png').attr('width', '15px').attr('height', '15px');
                        ratingDiv.append(emptyStar);
                    }
                }
                const time = $('<span>').addClass('main-color').text(tutorial['duration']);
                
                cardFooter.append(ratingDiv, time); //1
                creator.append(creatorImg, creatorName); //2
                cardBody.append(cardTitle, cardPrg, creator, cardFooter); //3
                cardOverlay.append(playButton); //4
                card.append(thumbnail, cardOverlay, cardBody); //5
                quoteCarousel.append(card);//9
            });
            $('#latest-carousel').slick({
                slidesToShow: 3.99,
                slidesToScroll: 1,
                prevArrow: $('.prev2'),
                nextArrow: $('.next2'),
                responsive: [
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 2
                      }
                    },
                    {
                      breakpoint: 576,
                      settings: {
                        slidesToShow: 1
                      }
                    }
                  ]
              });
            $('#loading-latest').addClass('d-none');
            $('#latest-carousel').removeClass('d-none');
        },
        error: function() {
            alert("Error loading tutorials");
        }
    })
}

function PopulateCourseCategories() {
    $.ajax({
        url: "https://smileschool-api.hbtn.info/courses",
        method: "GET",
        success: function(response){
            const topicChoices = $('#topic-choices');
            const sortChoices = $('#sort-choices');
            response['topics'].forEach(function addTopics(data) {
                let inputString = data;
                let capitalizedString = inputString.charAt(0).toUpperCase() + inputString.slice(1);

                console.log('data: ' + data);
                let newTopic = `<a class="dropdown-item" href="#" onclick="changeTopic('${capitalizedString}')">${capitalizedString}</a>`
                topicChoices.append(newTopic);
            });
            response['sorts'].forEach(function addSorts(data) {
                let inputString = data;
                let splitString = inputString.split('_');

                let capitalizedWords = splitString.map(splitString => splitString.charAt(0).toUpperCase() + splitString.slice(1));
                let resultString = capitalizedWords.join(' ');

                let newSort = `<a class="dropdown-item" href="#" onclick="changeSort('${resultString}')">${resultString}</a>`
                sortChoices.append(newSort);
            });
        },
        error: function() {
            alert("Error loading course categories.");
        }
    })
}

function PopulateCourses() {
    $('#loading-courses').removeClass('d-none');
    $('#course-container').addClass('d-none');
    const keySelect = document.getElementById('select-keywords');
    const topicSelect = document.getElementById('select-topic');
    const sortBySelect = document.getElementById('select-sort-by');

    $.ajax({
        url: "https://smileschool-api.hbtn.info/courses",
        method: "GET",
        success: function(response){
            const courseZone = $('#course-zone');

            const parentElement = document.getElementById("course-zone");

            if (parentElement) {
                while (parentElement.firstChild) {
                    parentElement.removeChild(parentElement.firstChild);
                }
            }
            let counter = 0;
            let courseArray = [];
            response['courses'].forEach(function makeCarouselItem(data, index) {
                if ((data['topic'] === topicSelect.textContent) || (topicSelect.textContent === "All")) {
                    const lowerCaseSearchString = keySelect.value.toLowerCase();
                    const lowerCaseArray = data['keywords'].map(function(item) {
                        return item.toLowerCase();
                    })
                    if (keySelect.value === '' || lowerCaseArray.includes(lowerCaseSearchString)) {
                        counter += 1;
                        const courseCol = $('<div>').addClass('col-12 col-sm-4 col-lg-3 d-flex justify-content-center');
                        const card = $('<div>').addClass('card p-3');
                        const thumbnail = $('<img>').addClass('card-img-top').attr('src', data['thumb_url']);
                        const cardOverlay = $('<div>').addClass('card-img-overlay text-center');
                        const playButton = $('<img>').addClass('mx-auto my-auto play-overlay').attr('src', 'images/play.png').attr('width', '64px');
                        const cardBody = $('<div>').addClass('card-body');
                        const cardTitle = $('<h5>').addClass('card-title font-weight-bold').text(data['title']);
                        const cardPrg = $('<p>').addClass('card-text text-muted').text(data['sub-title']);
                        const views = $('<p>').addClass('card-text text-muted').text('views: ' + data['views']);
                        const publd = $('<p>').addClass('card-text text-muted').text('Published: ' + (data['published_at'] - 1586700000));
                        const kw = $('<p>').addClass('card-text text-muted').text('Keywords: ' + data['keywords']);
                        const topic = $('<p>').addClass('card-text text-muted').text('Topic: ' + data['topic']);
                        const creator = $('<div>').addClass('creator d-flex align-items-center');
                        const creatorImg = $('<img>').addClass('rounded-circle').attr('src', data['author_pic_url']).attr('width', '30px');
                        const creatorName = $('<h6>').addClass('pl-3 m-0 main-color').text(data['author']);
                        const cardFooter = $('<div>').addClass('info pt-3 d-flex justify-content-between');
                        const ratingDiv = $('<div>').addClass('rating d-flex');
                        for(let i = 1; i < 6; i++){
                            if(i <= data['star']) {
                                const fullStar = $('<img>').attr('src', 'images/star_on.png').attr('width', '15px').attr('height', '15px');
                                ratingDiv.append(fullStar);
                            }
                            else {
                                const emptyStar = $('<img>').attr('src', 'images/star_off.png').attr('width', '15px').attr('height', '15px');
                                ratingDiv.append(emptyStar);
                            }
                        }
                        const time = $('<span>').addClass('main-color').text(data['duration']);
                        
                        cardFooter.append(ratingDiv, time);
                        creator.append(creatorImg, creatorName);
                        cardBody.append(cardTitle, cardPrg, views, publd, kw, topic, creator, cardFooter); 
                        cardOverlay.append(playButton);
                        card.append(thumbnail, cardOverlay, cardBody); 
                        courseCol.append(card);
                        if (sortBySelect.textContent === 'Most Popular') {
                            courseArray.push([courseCol, data['star']]);
                            courseArray.sort((a, b) => b[1] - a[1]);
                        }
                        else if (sortBySelect.textContent === 'Most Recent') {
                            courseArray.push([courseCol, data['published_at']]);
                            courseArray.sort((a, b) => b[1] - a[1]);
                        }
                        else if (sortBySelect.textContent === 'Most Viewed') {
                            courseArray.push([courseCol, data['views']]);
                            courseArray.sort((a, b) => b[1] - a[1]);
                        }
                    }
                }
            });
            courseArray.forEach(function addItems(courses, index) {
                courseZone.append(courses[0]);
            });
            $('.video-count').text(counter + ' videos')

            $('#loading-courses').addClass('d-none');
            $('#course-container').removeClass('d-none');
        },
        error: function() {
            alert("Error loading courses");
        }
    })
}