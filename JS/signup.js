


"use strict";


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDB-XQdiHjT82q_r5MVNFgpyUsaU2WMvik",
    authDomain: "dckap-lms-project.firebaseapp.com",
    projectId: "dckap-lms-project",
    storageBucket: "dckap-lms-project.appspot.com",
    messagingSenderId: "1022626638467",
    appId: "1:1022626638467:web:2c8f79d5614281ac7b49b6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  import { getFirestore,getDocs,setDoc,doc,collection,getDoc,addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";




let db=getFirestore(app);


let username = document.getElementById("user");
let email_box = document.getElementById("mail_id");
let create_password = document.getElementById("create_ps");
let confirmPassword = document.getElementById("create_conps") 
let sign_up_btn = document.getElementById("sign_up_btn");
let otp_random;

// --------tooltip-----
let min_length = document.getElementById("minimum_len")
let lowercase = document.getElementById("Low")
let uppercase = document.getElementById("upp")
let number = document.getElementById("num")
let symbol = document.getElementById("spcl")



// ----------------ToolTip-----------
create_password.addEventListener("keyup", (event) => {
  event.preventDefault();
  document.querySelector(".tool").style.display = "block";


  if (create_password.value.length >= 8) {
    min_length.classList.remove("invalid");
    min_length.classList.add("valid");
  }
  else {
    min_length.classList.remove("valid");
    min_length.classList.add("invalid");
  }
  var lowercase_letters = /[a-z]/g;
  if (create_password.value.match(lowercase_letters)) {

    lowercase.classList.remove("invalid");
    lowercase.classList.add("valid");
  }
  else {
    lowercase.classList.remove("valid");
    lowercase.classList.add("invalid");
  }
  var uppercase_letters = /[A-Z]/g;
  if (create_password.value.match(uppercase_letters)) {
    uppercase.classList.remove("invalid");
    uppercase.classList.add("valid");
  }
  else {
    uppercase.classList.remove("valid");
    uppercase.classList.add("invalid");
  }
  var Num_value = /[0-9]/g;
  if (create_password.value.match(Num_value)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  }
  else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  var symb = /[ ""!"#$%&'()*+,-./:;<=>?@^_`~{}|]/g;

  if (create_password.value.match(symb)) {
    symbol.classList.remove("invalid");
    symbol.classList.add("valid");
  }
  else {
    symbol.classList.remove("valid");
    symbol.classList.add("invalid");
  }


})
confirmPassword.addEventListener("click",()=>{
  document.querySelector(".tool").style.display = "none";
   
})

// ------------form submit---------

sign_up_btn.addEventListener("click", form_submit);
 async function form_submit(event) {

    event.preventDefault();
    var usernameValue = username.value; //inputbox values
    var emailValue = email_box.value;
    var createPasswordValue = create_password.value;
    var confirmpassvalue= confirmPassword.value


    var passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[A-Za-z\d!@#$%&]{8,}$/;
    var nameRegex = /[a-z]{3,}/g;
    var mailRegex = /([a-z0-9.+-]+)@[a-zA-Z0-9.+]+/; 

    var invalid_name = document.querySelector(".invalid_name");
    var invalid_mail = document.querySelector(".invalid_mail");
    var invalid_password = document.querySelector(".invalid_password");
    var invalid_conpassword = document.querySelector(".invalid_conpassword")

    if (!usernameValue.match(nameRegex)) {
        invalid_name.innerHTML = 'Enter a username.';
        invalid_name.style.color = "red";
        invalid_name.style.visibility = "visible"
        setTimeout(() => {
          invalid_name.style.visibility = "hidden"
        }, 2000);
        return;
    }

    if (!mailRegex.test(emailValue)) {
        invalid_mail.innerHTML = ' Enter a email.';
        invalid_mail.style.color = "red";
        invalid_mail.style.visibility = "visible"
        setTimeout(() => {
          invalid_mail.style.visibility = "hidden"
            
        }, 2000);
        return;
    }
    let emailcheckvalue=emailValue
    let emailExists = await checkIfEmailExists(emailcheckvalue);
    if (emailExists) {
      alert("Email already exists. Please login instead.");
      window.location.href="./login.html"
      return;
  }

    if (!passwordCriteria.test(createPasswordValue)) {
        invalid_password.innerHTML = 'Enter a password.';
        invalid_password.style.color = "red";
        invalid_password.style.visibility = "visible"
        setTimeout(() => {
          invalid_password.style.visibility = "hidden"
        }, 2000);
        return;
    }
    if (createPasswordValue !== confirmpassvalue) {
      invalid_conpassword.innerHTML = ' password should not match';
      invalid_conpassword.style.color = "red";
      invalid_conpassword.style.visibility="visible"
      setTimeout(() => {
        invalid_conpassword.style.visibility = "hidden";
      }, 2000);
       return;
    }

  

// --------otp generating-----------
let mail_id_inputbox = document.getElementById("mail_id");
let username_inputbox = document.getElementById("user").value;
 document.querySelector(".container").style.display = "block";
 document.querySelector("#sign_up").style.display="none";
 document.querySelector(".side_image").style.display="none"
    otp_random=Math.floor(Math.random()*100000);
    console.log(otp_random);
    let mail_msg= `Hi ${username_inputbox} Welcome to our website,please verify your email by entering the otp mentioned below
            OTP : <b>${otp_random}</b>`
            Email.send({
              SecureToken : "3530e414-b30b-4087-819e-ce07fc9da7b5",
              To : mail_id_inputbox.value,
              From : "dckaplms@gmail.com",
              Subject : "Verify OTP",
              Body : mail_msg
          }).then(
            // message => alert(message)
          )
          .catch(err => alert(err));
          }
          async function checkIfEmailExists(email) {
            const querySnapshot = await getDocs(collection(db, "SignUp_details"));
            return querySnapshot.docs.some(doc => doc.data().email === email);
        }


  // -------otp verify button-----
  let getref=collection(db,"SignUp_details");
  let getdata =await  getDocs(getref);
  let id=getdata.size;


let otp_btn=document.getElementById("otp_btn")
let otp_inputbox=document.getElementById("otp_value")
otp_btn.addEventListener("click", verified)

 function verified (event){
  event.preventDefault();
   
  if(otp_inputbox.value==" ")
  {
    alert("Enter a OTP")
  }
  if(otp_inputbox.value == otp_random)
  {
    let ref=doc(db,"SignUp_details",`${++id}`)
    let userData = {
      username: username.value,
      email: email_box.value,
      password: create_password.value,
      confirmPassword:confirmPassword.value,
      user_id:id
  };
     setDoc(ref, userData)
         .then(() => {
            //  alert("Account created successfully");
            
         })
    
  document.querySelector(".container").style.display = "none";
  document.getElementById('loadingOverlay').style.visibility = 'visible';

  setTimeout(() => {
    window.location.href = './login.html';
}, 1000);

localStorage.setItem('userdetails',JSON.stringify(userData));
// let storedlocaldata=localStorage.getItem('userData')
// let storedparseddata=JSON.parse(storedlocaldata)
     
  }
  else{
    alert("invalid")
  }
  
 }

// ------password icon-----
let passEyeIcon = document.querySelector("#passIcon")
let conEyeIcon = document.querySelector("#conIcon")

  passEyeIcon.addEventListener("click",()=>{
    if (create_password.type == "password") {
      create_password.type = "text"
      passEyeIcon.className = "fa-solid fa-eye"

    }
    else{
      create_password.type = "password"
      passEyeIcon.className = "fa-solid fa-eye-slash"
    }
  })

  conEyeIcon.addEventListener("click",()=>{
    if (confirmPassword.type == "password") {
      confirmPassword.type = "text"
      conEyeIcon.className = "fa-solid fa-eye"

    }
    else{
      confirmPassword.type = "password"
      conEyeIcon.className = "fa-solid fa-eye-slash"
    }
  })

// -----------already have an account login----------
let exist_login = document.getElementById("underline_btn");

exist_login.addEventListener("click",()=>{

  let loader=document.querySelector("#loadingOverlay");
  loader.style.visibility='visible';

  setTimeout(()=>{
    window.location.href='login.html';

  },1000);
  
});

