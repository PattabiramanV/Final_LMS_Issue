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

darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    document.setI;
    darkLight.classList.replace("bx-sun", "bx-moon");
  } else {
    darkLight.classList.replace("bx-moon", "bx-sun");
  }
});

submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});

if (window.innerWidth < 768) {
  sidebar.classList.add("close");
} else {
  sidebar.classList.remove("close");
}



// Profile

let profile_Dropdown = document.querySelector(".profile_bar_list");
let profile_navigate = document.querySelector(".profile");

profile_navigate.addEventListener("click", (event) => {
    event.stopPropagation();
    profile_Dropdown.style.display = "block";
});

document.addEventListener("click", (event) => {
    if (!profile_navigate.contains(event.target) && !profile_Dropdown.contains(event.target)) {
        profile_Dropdown.style.display = "none"; 
    }
});

// profile_drop

let profile_page=document.querySelector(".profile_down")
 profile_page.addEventListener("click",()=>{
        window.location.href="/profile_user_page/profile.html"
})

let Course_navigate=document.querySelector(".Course_Down")
Course_navigate.addEventListener("click",()=>{
      window.location.href="/Profile_main_page/Courses.html"
})









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

let arr1=[

  {
      Question:'1.What is Full form of HTML?',
      Options: ['Hyper Text Markup Language','Hyper Text Makeup Language',
      'Hyper Text Mark Language','Hyper Test Markup Language'],
      Answers:['Hyper Text Markup Language','It specifies the title of the web page',
      'It defines a header for the document.','To define the structure of a web page',
      '<body>']
  
  },

  {
      Question:'2.What is the purpose of the &lt;title&gt; tag in HTML?',
      Options:['It defines the main heading of the document','It specifies the title of the web page',
      'It creates a hyperlink to another webpage',' It formats the text in bold']
   
  },
  {
      Question:`3.In HTML, what is the purpose of the &lt;head&gt; element?`,
      Options:['It contains the main content of the document.','It defines a header for the document.',
      'It provides metadata about the document.','It creates a navigation bar.' ]

  },
  {
      Question:'4.What is the purpose of HTML elements?',
      Options: ['To style the content','To define the structure of a web page',
      ' To execute scripts','To interact with databases']
  },
  {
      Question:'5.Which HTML tag is used to define the body of the HTML document?',
      Options:['<head>','<body>','<title>','<html>']
   
  }
   
]

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getFirestore, getDoc, getDocs, doc, setDoc, updateDoc, addDoc,  collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

let db=getFirestore(app);

let get_ref=doc(db,'Learning','0');
let get_data= await getDoc(get_ref);
let find_index=get_data.data().find_index;
let find_language=get_data.data().Find_Language_type;
let find_language_percentage=get_data.data()[find_language+'_Total_Percentage'];
let find_complete_module=get_data.data()[find_language + '_Complete_Module'];

async function quiz_mark_validate_Fun(){
//  alert("come to db")
  let ref=doc(db,`${find_language}_Content`,`0`);
  let data_ref=await getDoc(ref);
  let total_title=data_ref.data().left_headings;

  // console.log(find_language_percentage.Html_Total_Percentage+1);
  // console.log(total_title.length);

  let get_data= await updateDoc(
   get_ref,{
    [find_language+'_Total_Percentage']:Math.floor(find_language_percentage+1/total_title.length*100),
    [find_language+'_Complete_Module']:find_complete_module+1
   }
  )


}
let get_quiz=doc(db,`${find_language}_Quiz`,`${find_index}`)
let get_quiz_obj=await getDoc(get_quiz);
let Quiz_object=get_quiz_obj.data().Quiz_1  ;
// console.log(Quiz_object);
// console.log(get_quiz_obj.data());
// console.log(find_index);
//......................Firebse......daat...........Set.............//

// let get_quiz=doc(db,`${find_language}_Quiz`,`${find_index}`)
// let get_quiz_obj=await getDoc(get_quiz);
// let Quiz_object=get_quiz_obj.data().Quiz_1;
// console.log(Quiz_object);
// let id=0;
// let ref=doc(db,`${find_language}_Quiz`,`${id}`);
//  updateDoc(
//   ref,{
//     Quiz_1:arr1
//   }
// ).then(()=>{
//   alert("updatae sucessfull")
// })


// console.log(Quiz_object.length);
let quiz_options=document.querySelectorAll("label");
let quiz_Question=document.getElementById("Quiz_question");
let next_btn=document.querySelector(".quiz_next_btn");
let previous_btn=document.querySelector(".previous_btn");
let submit_btn=document.querySelector('.quiz_sunmit_btn');
let form_radio_btn_4=document.forms.radio_4_btn_form;
let all_radio_btn=form_radio_btn_4.radio_value_1;

next_btn.addEventListener("click",function(){ Quiz_change_Fun(this)});
previous_btn.addEventListener("click",function(){ Quiz_change_Fun(this)});

let index=0;

let arr=[];
Quiz_content_show_Fun();

async function Quiz_change_Fun(value){

    radio_value_change_Fun();
   

if(value.innerHTML=='Next'&& all_radio_btn.value!=''){
    index++;
    console.log(all_radio_btn.value);
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

function Quiz_content_show_Fun(){
  console.log(index);
  quiz_Question.innerHTML=Quiz_object[index].Question;
  quiz_options[0].innerText=Quiz_object[index].Options[0];
  quiz_options[1].innerText=Quiz_object[index].Options[1];
  quiz_options[2].innerText=Quiz_object[index].Options[2];
  quiz_options[3].innerText=Quiz_object[index].Options[3];
}

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

function radio_value_change_Fun(){

    all_radio_btn[0].value=Quiz_object[index].Options[0];
    all_radio_btn[1].value=Quiz_object[index].Options[1];
    all_radio_btn[2].value=Quiz_object[index].Options[2];
    all_radio_btn[3].value=Quiz_object[index].Options[3];
}



let total_mark=0;
let main_quiz_div=document.querySelector('.bottom_content_quiz');
let Quiz_result_div=document.querySelector(".Answer_show_page");
let next_module_btn=document.querySelector("#next_module_btn");
let retry_btn=document.querySelector("#retry_btn");
let all_score_content=document.querySelectorAll(".score");

submit_btn.addEventListener("click",()=>{

    radio_value_change_Fun();
    if(arr.length==Quiz_object.length-1){
        arr.push(all_radio_btn.value);

    }
arr.forEach((user_choose_value)=>{

Quiz_object[0].Answers.forEach((Excat_answer)=>{

if(Excat_answer==user_choose_value){

    total_mark++;
    
        }

})


})

alert(`Total Mark:${total_mark}/5`);
console.log(arr);
console.log(total_mark);

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

    all_score_content[0].innerHTML=Quiz_object.length;
    all_score_content[1].innerHTML=total_mark;
    all_score_content[2].innerHTML=Math.floor(total_mark/Quiz_object.length*100);
    if(total_mark!=Quiz_object.length){
   next_module_btn.style.display='none';
   retry_btn.style.display='block';
   right_thumsup.classList.add("right_thumsup_class_list");
   thumsup_img.src="Assests/thumbs-up (2).png";
    }
    else{
        next_module_btn.style.display='block';
   retry_btn.style.display='none';
   quiz_mark_validate_Fun();
    }

}
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
    // Quiz_change_Fun();
button_showing_Fun()


});


next_module_btn.addEventListener("click",async()=>{
  let ref_data=doc(db,"Learning",`0`);
    let data_set=await updateDoc(
        ref_data,{
            find_index:find_index+1
        }
    )
    window.location.href="learning_content.html";
});



let left_side_bar=document.querySelectorAll(".navlink");

left_side_bar[0].addEventListener("click",()=>{
  window.location.href='index.html  '
});

left_side_bar[1].addEventListener("click",()=>{

  window.location.href='Learning.html  '
});
left_side_bar[2].addEventListener("click",()=>{

  window.location.href='Dashboard.html';
});
left_side_bar[3].addEventListener("click",()=>{

  window.location.href='Roadmap.html';
});

