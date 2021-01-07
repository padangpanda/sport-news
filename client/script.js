const baseUrl = "http://localhost:3001"
let newsList = []
let countryCode = ''

$(document).ready(function(){
    let check = $('#country').val()
    if(!check){
        countryCode = "id"
        $.ajax({
            method: 'POST',
            url: `${baseUrl}/news`,
            data: { countryCode }     
        })
        .done(response => {
            getNews(response)
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log("always RUN")
        })
    }

    $("#search-btn").click(function(event){
        event.preventDefault()
        countryCode = $('#country').val()
        console.log(countryCode)
        $.ajax({
            method: 'POST',
            url: `${baseUrl}/news`,
            data: { countryCode }     
        })
        .done(response => {
           getNews(response)
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => {
            console.log("always RUN")
        })
    })

    $("#hello").click(function(event){
        event.preventDefault()
        console.log("MASUK")
        $(".mycarousel").hide()
    })
})

function getNews(response){
    newsList = response.articles
    let count = 0
    $("#news-list").empty()
    $("#best-carousel").empty()
    newsList.forEach(el => {
        count++
        if(el.urlToImage){
            $('#news-list').append(`<div class="col-4 d-flex align-items-stretch">
            <div class="card shadow p-3 mb-5 bg-white rounded" style="width: 25rem;">
            <img src="${el.urlToImage}" class="card-img-top">
            <div class="card-body align-items-stretch">
                <h5 class="card-title judul">${el.title}</h5><hr>
                <p class="card-text">${el.description}</p>
                <a href="${el.url}" class="btn btn-dark">Read More</a>
            </div>
            </div>
            </div>`)
            
            if(count <= 8 && count !== 1){
            $('#best-carousel').append(`<div class="carousel-item" data-interval="3000">
            <a href="${el.url}"><img src="${el.urlToImage}" class="d-block mycarousel mx-auto"></a>
            <div class="carousel-caption d-none d-md-block">
                <h5 class="carousel-text">${el.title}</h5>
                <p class="carousel-text">${el.description}</p>
            </div>
            </div>`)
            } else if (count === 1){
            $('#best-carousel').append(`<div class="carousel-item active" data-interval="3000">
            <a href="${el.url}"><img src="${el.urlToImage}" class="d-block mycarousel mx-auto"></a>
            <div class="carousel-caption d-none d-md-block">
                <h5 class="carousel-text">${el.title}</h5>
                <p class="carousel-text">${el.description}</p>
            </div>
            </div>`)
            }
        }
    })
}