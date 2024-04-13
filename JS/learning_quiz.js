"use strict"



//................................. Nav bar...................................//

const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

sidebarClose.addEventListener("click", () => {
  sidebar.classList.add("close", "hoverable");
});
sidebarExpand.addEventListener("click", () => {
  sidebar.classList.remove("close", "hoverable");
});

sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
});

//............................Dark_Mode......................................//

let Dckaplogo = document.querySelector(".DCKAPlOGO");
Dckaplogo.addEventListener("click",()=>{
  window.location.href='./index.html'
})
function toggleDarkMode() {

  const isDarkMode = body.classList.toggle("dark");
  document.body.classList.toggle("dark-mode");

 
  Dckaplogo.src = body.classList.contains("dark")
    ? "./Assests/Dckapwhite.png"
    : "./Assests/Logodk.png";
 

  sessionStorage.setItem("darkMode", isDarkMode);
}

const storedDarkMode = sessionStorage.getItem("darkMode");
if (storedDarkMode === "true") {
  toggleDarkMode();
}

darkLight.addEventListener("click", toggleDarkMode);



// ........................................Profile...........................................///

let profile_Dropdown = document.querySelector(".profile_bar_list");
let profile_navigate = document.querySelector(".profile");

profile_navigate.addEventListener("click", (event) => {
  event.stopPropagation();
  profile_Dropdown.style.display = "block";
});

document.addEventListener("click", (event) => {
  if (
    !profile_navigate.contains(event.target) &&
    !profile_Dropdown.contains(event.target)
  ) {
    profile_Dropdown.style.display = "none";
  }
});


//.....................................profile_drop.............................//

let profile_page = document.querySelector(".profile_down");
profile_page.addEventListener("click", () => {
  window.location.href = "./profile.html";
});

let Course_navigate = document.querySelector(".Course_Down");
Course_navigate.addEventListener("click", () => {
  window.location.href = "./Courses.html";
});

let Certi_page = document.querySelector(".profile_certicate");

Certi_page.addEventListener("click", () => {
  window.location.href = "./certificate.html";
});

let logout = document.querySelector(".log_out");

logout.addEventListener("click", () => {
  window.location.href = "./login.html";
});



//............................Firebase import link............................//

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
import { getFirestore, getDoc, getDocs, doc, setDoc, updateDoc, addDoc,  collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let db=getFirestore(app);

//.....................................localstorage get user id.................//
var userDetailsString = localStorage.getItem("userdetails");

var userDetails = JSON.parse(userDetailsString);
let id=userDetails.user_id;

//...................................get data in the Firebase.....................// 

let get_ref=doc(db,'Learning',`User=${id}`);
let get_data= await getDoc(get_ref);
let find_index=get_data.data().find_index;
let find_language=get_data.data().Find_Language_type;
let find_language_percentage=get_data.data()[find_language+'_Total_Percentage'];
let find_complete_module=get_data.data()[find_language + '_Complete_Module'];
let find_language_unlock_module=get_data.data()[find_language+'_unlock_total_module'];


//...................Quiz percentage store in the Firebase..........................//

async function quiz_mark_percentage_store_firebase_Fun(){

  let ref=doc(db,`${find_language}_Content`,`0`);
  let data_ref=await getDoc(ref);
  let total_title=data_ref.data().left_headings;

total_title=total_title.length-1;

if(find_index==find_language_unlock_module){

  let get_data= await updateDoc(
   get_ref,{
    [find_language+'_Total_Percentage']:Math.floor(find_language_percentage+find_complete_module+1/total_title*100),
    [find_language+'_Complete_Module']:find_complete_module+1
   }
  )
  }

}


//.............................Get Quiz particular topic data in the firebase..............//

let get_quiz=doc(db,`${find_language}_Quiz`,`${find_index}`)
let get_quiz_obj=await getDoc(get_quiz);

let Quiz_object=get_quiz_obj.data().Quiz_1  ;

//..................................get Quiz element from html file.................//

let quiz_options=document.querySelectorAll("label");
let quiz_Question=document.getElementById("Quiz_question");
let next_btn=document.querySelector(".quiz_next_btn");
let previous_btn=document.querySelector(".previous_btn");
let submit_btn=document.querySelector('.quiz_sunmit_btn');
let form_radio_btn_4=document.forms.radio_4_btn_form;
let all_radio_btn=form_radio_btn_4.radio_value_1;
let Ex_no=document.querySelector("strong");
Ex_no.innerHTML=find_index;

//..........................get  Answer showpage element form html file.........//

let total_mark=0;
let main_quiz_div=document.querySelector('.bottom_content_quiz');
let Quiz_result_div=document.querySelector(".Answer_show_page");
let next_module_btn=document.querySelector("#next_module_btn");
let retry_btn=document.querySelector("#retry_btn");
let all_score_content=document.querySelectorAll(".score");

let index = 0;
let arr = [];



Quiz_content_show_Fun();
button_showing_Fun();
//..................................Quiz next and previous btn function.......//

next_btn.addEventListener("click",function(){ Quiz_change_Fun(this)});
previous_btn.addEventListener("click",function(){ Quiz_change_Fun(this)});

async function Quiz_change_Fun(value){

    radio_value_change_Fun();
   
if(value.innerHTML=='Next'&& all_radio_btn.value!=''){
    index++;
  
    document.querySelector(".Answer_show_page").classList.add("Answer_show_page_classlist")
    arr.push(all_radio_btn.value);
    form_radio_btn_4.reset();

 
}
else if(index!=0 && value.innerHTML=='Previous'){
    
index--;
let value=arr[arr.length-1];

let pre_index=Quiz_object[index].Options.indexOf(value);

all_radio_btn[pre_index].checked=true;
arr.pop();

}

Quiz_content_show_Fun();

button_showing_Fun();

}

//.........................Quiz question and option change function............//

function Quiz_content_show_Fun(){

  quiz_Question.innerHTML=Quiz_object[index].Question;
  quiz_options[0].innerText=Quiz_object[index].Options[0];
  quiz_options[1].innerText=Quiz_object[index].Options[1];
  quiz_options[2].innerText=Quiz_object[index].Options[2];
  quiz_options[3].innerText=Quiz_object[index].Options[3];
}

//...............................Button showing function in the Quiz div........//

function button_showing_Fun(){

    next_btn.style.display='block';
    previous_btn.style.display='block';
    submit_btn.style.display='none';
    next_btn.parentElement.style.justifyContent='space-between';

    if(index==Quiz_object.length-1){
        next_btn.style.display='none';
        submit_btn.style.display='block'
    }
    else if(index==0){
        previous_btn.style.display='none';
        next_btn.parentElement.style.justifyContent='end';

    }

};

//...........................radio button value change function..................//

function radio_value_change_Fun(){

    all_radio_btn[0].value=Quiz_object[index].Options[0];
    all_radio_btn[1].value=Quiz_object[index].Options[1];
    all_radio_btn[2].value=Quiz_object[index].Options[2];
    all_radio_btn[3].value=Quiz_object[index].Options[3];
}


//.................................submit button function in the quiz......//
submit_btn.addEventListener("click",()=>{

    radio_value_change_Fun();
    if(arr.length==Quiz_object.length-1){
        arr.push(all_radio_btn.value);

    }
    console.log(arr);
    console.log(Quiz_object[0].Answers);

arr.forEach((user_choose_value)=>{

Quiz_object[0].Answers.forEach((Excat_answer)=>{

if(Excat_answer==user_choose_value){
console.log(Excat_answer);
    total_mark++;
    
        }

})


})


form_radio_btn_4.reset();
arr=[];
validate_quiz_fun();


});

//............................Quiz_Answer_page................................//
let right_thumsup=document.querySelector(".right_thumsup");
let thumsup_img=document.querySelector("#thumsup_img");

function validate_quiz_fun(){

    Quiz_result_div.classList.add("Answer_show_page_classlist");
    main_quiz_div.classList.add("bootm_content_quiz_classlist");
let all_P_tag=document.querySelectorAll(".result_show_content");

    all_score_content[0].innerHTML = Quiz_object.length;

    all_score_content[1].innerHTML = total_mark;
    
    all_score_content[2].innerHTML = Math.floor(total_mark/Quiz_object.length*100);

  if (total_mark != Quiz_object.length) {
    next_module_btn.style.display = 'none';
    retry_btn.style.display = 'block';
    right_thumsup.classList.add("right_thumsup_class_list");
    thumsup_img.src = "./Assests/wrong_img.jpg";

    all_P_tag[0].innerHTML = "You don't get 100%. So you not eligible for go the next module."
    all_P_tag[1].innerHTML = 'When you complete the quiz without wrong you will be move next module. '
  }

  else {
    next_module_btn.style.display = 'block';
    retry_btn.style.display = 'none';
    right_thumsup.classList.remove("right_thumsup_class_list");
    thumsup_img.src = "./Assests/right_img.jpg";
    all_P_tag[0].innerHTML = 'Sucessfully complete the exercise and you eligible for go the next module.'
    all_P_tag[1].innerHTML = 'Congralation you unlocked the first exercise.'

   quiz_mark_percentage_store_firebase_Fun();
    }

}

//.................................Retry button function in the quiz......//

retry_btn.addEventListener("click",()=>{

    index=0;
    arr=[];
     total_mark=0;

    Quiz_result_div.classList.remove("Answer_show_page_classlist");
    main_quiz_div.classList.remove("bootm_content_quiz_classlist");
    previous_btn.style.display='none';
    submit_btn.style.display='none';
    next_btn.style.display='block';
    quiz_Question.innerText=Quiz_object[index].Question;
quiz_options[0].innerText=Quiz_object[index].Options[0];
quiz_options[1].innerText=Quiz_object[index].Options[1];
quiz_options[2].innerText=Quiz_object[index].Options[2];
quiz_options[3].innerText=Quiz_object[index].Options[3];
 
button_showing_Fun()


});

//...............................next module button function in the quiz......//

next_module_btn.addEventListener("click",async()=>{
index=0;
arr=[];
  // SessionStorage_Data_Set_Fun(arr,index)
if(find_index==find_language_unlock_module){

  find_language_unlock_module=find_language_unlock_module+1
  }

      let ref_data=doc(db,"Learning",`User=${id}`);
  
      let data_set=await updateDoc(
          ref_data,{
              find_index:find_language_unlock_module,
              [find_language+'_unlock_total_module']:find_language_unlock_module
          }
      )
    window.location.href="learning_content.html";
});






//........................... Local storage get profile Img.....................//


try {
  const profileImg = document.querySelector(".profile");
  const docRef = doc(db, 'users_img', `${id}`);
  const docSnapimg = await getDoc(docRef);

  if (docSnapimg.exists()) {
      const userDataimg = docSnapimg.data();
      profileImg.src = userDataimg.imageURL;
  } else {
      console.log("The image is not found in Firestore.");
  }
} catch (error) {
  console.error("Error getting document:", error);
  alert("Error getting user image. Please try again.");
}

window.addEventListener("load", async function () {
  const profileImg = document.querySelector(".profile");

  try {
    const docRef = doc(db, 'users_img', `${id}`);
    const docSnapimg = await getDoc(docRef);

    if (docSnapimg.exists()) {
      const userDataimg = docSnapimg.data();
      profileImg.src = userDataimg.imageURL;
    } else {
      console.log("The image is not found in Firestore.");
    }
  } catch (error) {
    console.error("Error getting document:", error);
    alert("Error getting user image. Please try again.");
  }
});
