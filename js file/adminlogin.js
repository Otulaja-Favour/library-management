let regex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let signupName = document.getElementById('signupName');
let signupEmail = document.getElementById('signupEmail');
let signupPassword = document.getElementById('signupPassword');

let allAdminUser = JSON.parse(localStorage.getItem('admins')) || []

function saveAdminToLocal(){
    localStorage.setItem('admins', JSON.stringify(allAdminUser))
}


  
signupName.addEventListener('keypress', ()=>{
    if(signupName.value.length < 3){
        signupName.style.border = '1px solid red'
        document.getElementById('signupNameError').innerText = 'pls input a valid name';
     document.getElementById('signupNameError').style.color = 'red'

    }else{
        signupName.style.border = '1px solid green'
        document.getElementById('signupNameError').style.display = 'none'
    }
})

signupEmail.addEventListener('keypress', ()=>{
    if(!(regex.test(signupEmail.value))){
        signupEmail.style.border = '1px solid red'
        document.getElementById('signupEmailError').innerText = 'pls input a valid email';
     document.getElementById('signupEmailError').style.color = 'red'

    }else{
        signupEmail.style.border = '1px solid green'
        document.getElementById('signupEmailError').style.display = 'none'
    }
})

signupPassword.addEventListener('keypress', ()=>{
    if(signupPassword.value.length < 6){
     document.getElementById('signupPasswordError').innerText = 'Password not strong enough'   
     document.getElementById('signupPasswordError').style.color = 'red'

    }else{
        document.getElementById('signupPasswordError').innerText = 'Cool !'  
        document.getElementById('signupPasswordError').style.color = 'green'
    }
})

function handleSignup(){
if(signupEmail.value && signupName.value && signupPassword.value){
    alert('login successfully')
    allAdminUser.push({
        name: signupName.value,
        Email: signupEmail.value,
        password: signupPassword.value
    })
    saveAdminToLocal()
    window.location.href = '../html files/admin.html'
}else{
    let errors = document.querySelectorAll('.error-message')
    errors.forEach(error =>{
        error.innerHTML = 'please fill in the empty space'
        error.style.color = 'red'
    })
}

}

document.getElementById('loginadmins').addEventListener('click', ()=>{
    document.getElementById('signupForm').style.display = 'none'
    document.getElementById('loginForm').style.display = 'block'

})
document.getElementById('signupadmin').addEventListener('click', ()=>{
    document.getElementById('signupForm').style.display = 'block'
    document.getElementById('loginForm').style.display = 'none'

})



function handleLogin() {
    let loginMail = document.getElementById('loginEmail');
    let loginPassword = document.getElementById('loginPassword');

    let adminSavedData = JSON.parse(localStorage.getItem('admins')) || [];
    let adminFoundData = adminSavedData.find(adminstrators => 
        adminstrators.password === loginPassword.value && adminstrators.Email === loginMail.value
    );

    if (adminFoundData) {
        alert(`Welcome back, ${adminFoundData.name}!`);
    } else {
        alert('Invalid email or password. Please try again.');
        let errors = document.querySelectorAll('.error-message')
    errors.forEach(error =>{
        error.innerHTML = 'please fill in the empty space'
        error.style.color = 'red'
    })
    }
}

