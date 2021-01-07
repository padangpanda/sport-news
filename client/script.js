var baseUrl = 'http://localhost:3000'
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
    checkAuth()
})


