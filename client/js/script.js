var baseUrl = 'http://localhost:3000'
let newsList = []
let weather = []
let countryCode = ''

$(document).ready(function(){
    checkAuth()
    ///check auth
    function checkAuth(){
        if(localStorage.access_token) {
            $('.bg-modal').hide()
            $('#auth-btn').hide()
            $('#navbar-sign').hide()
            $('#logout-btn').show()
            $('#navbar-homepage').show()
            $('#mycarousel').show()
            $('#mybody').show()
            $('#myfooter').show()

            let check = $('#country').val()
            if(!check){
                console.log("CHECK AJAX")
                countryCode = "id"
                $.ajax({
                    method: 'POST',
                    url: `${baseUrl}/news`,
                    data: { countryCode},
                    headers: {
                        access_token: localStorage.access_token
                    }     
                })
                .done(response => {
                    console.log(response)
                    console.log("HAAAAAAY")
                    getNews(response)
                    getWeather(response)
                })
                .fail(err => {
                    console.log("GAGAL")
                    console.log(err)
                })
                .always(() => {
                    console.log("always RUN")
                })
            }
        } else {
            $('#navbar-sign').show()
            $('#auth-btn').show()
            $('#logout-btn').hide()
            $('#navbar-homepage').hide()
            $('#mycarousel').hide()
            $('#mybody').hide()
            $('#myfooter').hide()
        }
// AKHIR IF ELSE
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

$('#auth-btn').click(function(){
    $('.bg-modal').show()

})
        // menutup form signin/signup
        $('.close-btn').click(function(){
            $('.bg-modal').hide()
        })
        
        /// sign up
        $('#signup-btn').click(function(event) {
            event.preventDefault()
            const email = $('#regemail').val()
            const password = $('#regpassword').val()
            console.log({email,password})
            
            $.ajax({
                method: 'POST',
                url: `${baseUrl}/register`,
                data: {
                    email: email,
                    password: password,
                }
            })
            .done(response => {
                console.log(response)
                $('#signIn').show()
            })
            .fail(err => {
                console.log(err)
            })
            .always(() => {
                console.log('always')
                $('#regemail').val('')
                $('#regpassword').val('')
                $('#regusername').val('')
            })
        })
        //signIn
        $('#signin-btn').click(function(event) {
            event.preventDefault()
            const email = $('#email').val()
            const password = $('#password').val()
            console.log({password,email})
        
            $.ajax({
                method: 'POST',
                url: `${baseUrl}/login`,
                data: {
                    email: email,
                    password: password,
                }
            })
            .done(response => {
                console.log(response)
                localStorage.setItem('access_token',response.access_token)
                checkAuth()
            })
            .fail(err => {
                console.log(err)
            })
            .always(() => {
                console.log('always')
                $('#email').val('')
                $('#password').val('')
            })
        })
        
        $('#logout-btn').click(function(event){
            event.preventDefault()
            localStorage.clear()
            console.log("SAATNYA LOGOUT")
            checkAuth()
        })

    }

    $('#logout-btn').click(function(event){
        event.preventDefault()
        localStorage.clear()
        checkAuth()
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          console.log('User signed out.');
        });
    })
})

function getWeather(response){
    $("#weather").empty()
    weather = response.contentWeather
    $('#weather').append(`<h3> Cuaca Hari Ini </h3>
    <table class="table table-bordered" style="text-align: center;">
    <thead class="thead-dark">
        <tr>
        <th scope="col">Location</th>
        <th scope="col">Temperature</th>
        <th scope="col">Condition</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td>${weather.location.name}</td>
        <td>${weather.current.temperature}</td>
        <td>${weather.current.weather_descriptions}</td>
        </tr>
    </tbody>
    </table>`)
}

function getNews(response){
    newsList = response.contentNews
    console.log(newsList, ">>>>>")
    let count = 0
    $("#news-list").empty()
    $("#best-carousel").empty()
    newsList.forEach(el => {
        count++
        if(el.urlToImage){
            $('#news-list').append(`<div class="col-4 d-flex align-items-stretch">
            <div class="card shadow p-3 mb-5 bg-white rounded card-news" style="width: 25rem;">
            <img src="${el.urlToImage}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title judul">${el.title}</h5><hr>
                <p class="card-text">${el.description}</p>
                <a href="${el.url}" class="btn-news btn-dark mt-auto">Read More</a>
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

function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token)

    $.ajax({
        method: 'POST',
        url:`http://localhost:3000/loginGoogle`,
        data: {id_token},
    })
    .done(response => {
        console.log(response)
        localStorage.setItem('access_token',response.access_token)
        checkAuth()
    })
    .fail((xhr,status) => {

    })
  }

 