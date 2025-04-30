let fname = document.getElementById('fname')
let lname = document.getElementById('lname')
let email = document.getElementById('email')
let pswd = document.getElementById('pswd')
let cpswd = document.getElementById('cpswd')

let users = JSON.parse(localStorage.getItem('user')) || []

function saveToLocal() {
    localStorage.setItem('user', JSON.stringify(users))
}


fname.addEventListener('keypress', () => {
    if (fname.value.length < 3) {
        fname.style.border = '1px solid red'

        document.getElementById('fnameval').innerText = 'Pls enter a correct name'
    } else {
        document.getElementById('fnameval').style.display = ' none'
        fname.style.border = '1px solid green'

    }

})

lname.addEventListener('keypress', () => {
    if (lname.value.length < 3) {
        lname.style.border = '1px solid red'
        document.getElementById('lnameval').innerText = 'Pls enter a correct name'
    } else {
        lname.style.border = '1px solid green'
        document.getElementById('lnameval').style.display = ' none'
    }

})

let mailreg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let paswdreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

email.addEventListener('keypress', () => {

    if ((mailreg.test(email.value))) {
        document.getElementById('emailval').textContent = ''
        email.style.border = '1px solid green'

    } else if (!(mailreg.test(email.value))) {
        document.getElementById('emailval').textContent = 'invalid mail'
        email.style.border = '1px solid red'

    }
})

pswd.addEventListener('keypress', () => {

    if (paswdreg.test(pswd.value)) {
        document.getElementById('pasval').textContent = ''
        pswd.style.border = '1px solid green'
    } else {
        document.getElementById('pasval').textContent = 'pls enter a valid password'
        pswd.style.border = '1px solid red'

    }
})

cpswd.addEventListener('input', () => {

    if (pswd.value === cpswd.value) {
        document.getElementById('cpassval').textContent = ''
        pswd.style.border = '1px solid green'
    } else {
        document.getElementById('cpassval').textContent = 'pls enter a valid password'
        pswd.style.border = '1px solid red'

    }
})


function sign() {
    if (!(fname.value && lname.value && email.value && pswd.value && cpswd.value)) {
        alert('okay')
    } else {
        users.push({
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            pswd: pswd.value

        })

        saveToLocal()

        alert('login succesfuly')
        window.location.href = 'members.html'
        // accesingLocalStorage()
    }



}
document.getElementById('login').addEventListener('click', () => {
    document.getElementById('signupdiv').style.display = 'none'
    document.getElementById('logindiv').style.display = 'block'

})
document.getElementById('sign').addEventListener('click', () => {
    document.getElementById('signupdiv').style.display = 'block'
    document.getElementById('logindiv').style.display = 'none'

})
let loginemail = document.getElementById('loginemail')
let loginpswd = document.getElementById('loginpswd')

function Login() {
    let savedUsers = JSON.parse(localStorage.getItem('user')) || [];
    // console.log(savedUsers);

    let foundData = savedUsers.find(user => user.email === loginemail.value && user.pswd === loginpswd.value)

    window.location.href = 'members.html'
    if (foundData) {
        alert('okay')
        // accesingLocalStorage()
    } else {
        alert('damn')
    }

}



  // For demonstration: Fetch external data 
  async function fetchExternalData() {
    try {
      const response = await fetch('data.json');
      const data = await response.json();
      console.log('External data loaded:', data);
    } catch (error) {
      console.error('Error loading external data:', error);
    }
  }
  
  // Call fetch function
  fetchExternalData();

