var base = 'http://localhost:3000'
$(document).ready(function(){
    checkAuth()
 });
///check auth


 function checkAuth(){
    if(localStorage.access_token) {
        $('.bg-modal').hide()
        $('#auth-btn').hide()
        $('#logout-btn').show()
    }else{
        $('#auth-btn').show()
        $('#logout-btn').hide()
    }
}
// memunculkan form signin/signup
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
        url: `${base}/register`,
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
        url: `${base}/login`,
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
    checkAuth()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
})

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
