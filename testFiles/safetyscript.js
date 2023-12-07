$(document).ready(function(){
    PopulateQuotes();
    PopulateTutorials();
});

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
    console.log('1');
    $.ajax({
        url: "https://smileschool-api.hbtn.info/popular-tutorials",
        method: "GET",
        success: function(response){
            console.log('2');
            const quoteCarousel = $('#tutorial-carousel');

            response.forEach(function makeCarouselItem(tutorial, index) {
                console.log('loop: ' + index);
                const carouselItem = $('<div>').addClass('carousel-item');
                console.log('4');
                const rowItem = $('<div>').addClass('row align-items-center mx-auto');
                console.log('5');
                const colItem = $('<div>').addClass('col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center');
                console.log('6');
                const card = $('<div>').addClass('card');
                console.log('7');
                const thumbnail = $('<img>').addClass('card-img-top').attr('src', tutorial['thumb_url']);
                console.log('8');
                const cardOverlay = $('<div>').addClass('card-img-overlay text-center');
                console.log('9');
                const playButton = $('<img>').addClass('align-self-center play-overlay').attr('src', 'images/play.png').attr('width', '64px');
                console.log('10');
                const cardBody = $('<div>').addClass('card-body');
                console.log('11');
                const cardTitle = $('<h5>').addClass('card-title font-weight-bold').text(tutorial['title']);
                console.log('12');
                const cardPrg = $('<p>').addClass('card-text text-muted').text(tutorial['sub-title']);
                console.log('13');
                const creator = $('<div>').addClass('creator d-flex align-items-center');
                console.log('14');
                const creatorImg = $('<img>').addClass('rounded-circle').attr('src', tutorial['author_pic_url']).attr('width', '30px');
                console.log('15');
                const creatorName = $('<h6>').addClass('pl-3 m-0 main-color').text(tutorial['author']);
                console.log('16');
                const cardFooter = $('<div>').addClass('info pt-3 d-flex justify-content-between');
                console.log('17');
                const ratingDiv = $('<div>').addClass('rating');
                console.log('18');
                for(let i = 1; i < 6; i++){
                    console.log('i: ' + i);
                    if(i <= tutorial['star']) {
                        const fullStar = $('<img>').attr('src', 'images/star_on.png').attr('width', '15px');
                        ratingDiv.append(fullStar);
                    }
                    else {
                        const emptyStar = $('<img>').attr('src', 'images/star_off.png').attr('width', '15px');
                        ratingDiv.append(emptyStar);
                    }
                }
                console.log('19');
                const time = $('<span>').addClass('main-color').text(tutorial['duration']);
                console.log('20');
                
                cardFooter.append(ratingDiv, time); //1
                console.log('21');
                creator.append(creatorImg, creatorName); //2
                console.log('22');
                cardBody.append(cardTitle, cardPrg, creator, cardFooter); //3
                console.log('23');
                cardOverlay.append(playButton); //4
                console.log('24');
                card.append(thumbnail, cardOverlay, cardBody); //5
                console.log('25');
                colItem.append(card); //6
                console.log('26');
                rowItem.append(colItem); //7
                console.log('27');
                carouselItem.append(rowItem); //8
                console.log('28');
                quoteCarousel.append(carouselItem);//9
                console.log('29');
                
                if (index === 0) {
                    console.log('adding active class');
                    carouselItem.addClass('active');
                }
                console.log('30');
            });
            console.log('31');
            $('#loading-tutorials').addClass('d-none');
            console.log('32');
            $('#tutorial-carousel').removeClass('d-none');
            console.log('33');
        },
        error: function() {
            alert("Error loading tutorials");
        }
    })
    console.log('34');
}