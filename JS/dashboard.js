"use strict"
//------------------------------- fire_base -----------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc,  getDoc  } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

//------------ Your web app's Firebase configuration -------------------
const firebaseConfig = {
  apiKey: "AIzaSyDB-XQdiHjT82q_r5MVNFgpyUsaU2WMvik",
  authDomain: "dckap-lms-project.firebaseapp.com",
  projectId: "dckap-lms-project",
  storageBucket: "dckap-lms-project.appspot.com",
  messagingSenderId: "1022626638467",
  appId: "1:1022626638467:web:2c8f79d5614281ac7b49b6"
};

//---------- Initialize Firebase -------------------------
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Create a Firestore instance

let id=0;
let name;
if(localStorage.getItem("userdetails"))
{
  var userDetailsString = localStorage.getItem("userdetails");
  var userDetails = JSON.parse(userDetailsString);
  id=userDetails.user_id;
  name = userDetails.username;
  console.log(name);
}
else
{
  setTimeout(()=>{
  window.location.href='./signup.html';
  } ,2000);
}

// ----------------- Username ---------------------

let u_name = document.querySelector(".u_name");

// ---------- Total points, Total quiz, total stars ------------------

let Total_Quiz=document.querySelector('.Total_Quiz');
let Total_Ponits = document.querySelector('.Total_Ponits');
let Total_Stars = document.querySelector('.Total_Stars')

const getRef = doc(db, 'Learning', `User=${id}`);
const getData = await getDoc(getRef);
const data = getData.data();

// -------- getting values from firebase -----------------

let Html_Complete_Module = data.Html_Complete_Module;
let Css_Complete_Module = data.Css_Complete_Module;
let Javascript_Complete_Module = data.Javascript_Complete_Module;
let Mysql_Complete_Module = data.Mysql_Complete_Module;
let Php_Complete_Module = data.Php_Complete_Module;
let validate_Quiz = Html_Complete_Module + Css_Complete_Module + Javascript_Complete_Module + Mysql_Complete_Module + Php_Complete_Module;

console.log(validate_Quiz);

async function fetchDataAndUpdateHTML() 
{
  try 
  {
    Total_Quiz.textContent = validate_Quiz * 5;
    Total_Ponits.textContent = validate_Quiz;
    Total_Stars.textContent = validate_Quiz * 5;
    localStorage.setItem('Total_Ponits', data.Html_Complete_Module);

    u_name.textContent = name;

    // ------------ chart ---------------

    new Chart(document.getElementById("bar_chart"), {
      type: 'bar',
      data: {
        labels: ["HTML", "CSS", "JavaScript", "MySQL", "PHP"],
        datasets: [{
          label: "Percentage of Completed Lessons",
          backgroundColor: [
            "#7e01c6", "#a124e9", "#C37AED", "#D995FD", "#F0BBFE"
          ],
          data: [
            data.Html_Total_Percentage, 
            data.Css_Total_Percentage, 
            data.Javascript_Total_Percentage, 
            data.Mysql_Total_Percentage, 
            data.Php_Total_Percentage
          ],
          borderWidth: 1,
          borderRadius: 5,
          hoverBorderWidth: 2,
          hoverBorderColor: "#c84e2a",
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
              stepSize: 10,
            },
            scaleLabel: {
              display: false,
              fontSize: 20,
              labelString: "Percentage"
            }
          }],
          xAxes: [{
            ticks: {
              fontSize: 14
            },
            scaleLabel: {
              display: false,
              fontSize: 20,
              labelString: "Courses Name"
            }
          }]
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Tracking Completed Lessons'
        },
      }
    });
  } 
  catch (error) 
  {
    console.error("Error fetching and updating data:", error); 
  }
}

fetchDataAndUpdateHTML(); // Call the function to fetch data and update HTML

// ----------------------------- Dark Mode --------------------------------------

const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");

let content = document.querySelector(".menu_content");

sidebarClose.addEventListener("click", () => {
  sidebar.classList.add("close", "hoverable");
  content.style.left = "1rem";
});

sidebarExpand.addEventListener("click", () => {
  sidebar.classList.remove("close", "hoverable");
  content.style.left = "1rem";
});

sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
    content.style.left = "1rem";
  }
});

sidebar.addEventListener("mouseleave", () => {
  if (
    sidebar.classList.contains("hoverable") &&
    sidebar.classList.contains("close")
  ) {
    content.style.left = "0rem";
  }
});

let Dckaplogo = document.querySelector(".DCKAPlOGO");
let bdy = document.querySelector(".body");
let dashboard_profile_content = document.querySelector(".dashboard_profile_content");
let total_points = document.querySelector(".total_points");
let total_quz = document.querySelector(".total_quz");
let total_star = document.querySelector(".total_star");
let pie_chart = document.querySelector(".pie_chart");

Dckaplogo.addEventListener("click",()=>{
  window.location.href='./index.html'
})

//---------------------------------------------- Function to toggle dark mode --------------------------------------------

function toggleDarkMode()
{
  dashboard_profile_content.classList.toggle("act2");
  bdy.classList.toggle("act");
  total_points.classList.toggle("act2");
  total_quz.classList.toggle("act2");
  total_star.classList.toggle("act2");
  pie_chart.classList.toggle("act2");
  const isDarkMode = body.classList.toggle("dark");
  Dckaplogo.src = body.classList.contains("dark")
    ? "./Assests/Dckapwhite.png"
    : "./Assests/Logodk.png";
  sessionStorage.setItem("darkMode", isDarkMode);
}

const storedDarkMode = sessionStorage.getItem("darkMode");
if (storedDarkMode === "true") 
{
  toggleDarkMode();
}
darkLight.addEventListener("click", toggleDarkMode);

// --------------------------------------------- Profile ----------------------------------------------

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

//------------------------------------------------- profile_drop ----------------------------------------------------------------

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
  windnameow.location.href = "./login.html";
});

//------------------ Certificate ----------------------------

document.querySelector(".profile_down").addEventListener("click", function () {
  localStorage.setItem("previous_location", window.location.href);
});

//---------------- Profile SHown --------------------------

var userDetailsString = localStorage.getItem("userdetails");
var userDetails = JSON.parse(userDetailsString);
try 
{
  const profileImg = document.querySelector(".profile");
  const mainprofileimg=document.querySelector(".profile_img")
  const docRef = doc(db, 'users_img', `${id}`);
  const docSnapimg = await getDoc(docRef);
  
  if (docSnapimg.exists()) 
  {
    const userDataimg = docSnapimg.data();
    profileImg.src = userDataimg.imageURL;
    mainprofileimg.src=userDataimg.imageURL
  } 
  else 
  {
    console.log("The image is not found in Firestore.");
  }
} 
catch (error) 
{
  console.error("Error getting document:", error);
  alert("Error getting user image. Please try again.");
}
  
window.addEventListener("load", async function () {
  const profileImg = document.querySelector(".profile");
  const mainprofileimg=document.querySelector(".profile_img")
  try 
  {
    const docRef = doc(db, 'users_img', `${id}`);
    const docSnapimg = await getDoc(docRef);
    mainprofileimg.src=userDataimg.imageURL
  
    if (docSnapimg.exists()) 
    {
      const userDataimg = docSnapimg.data();
      profileImg.src = userDataimg.imageURL;
    } 
    else 
    {
      console.log("The image is not found in Firestore.");
    }
  } 
  catch (error) 
  {
    console.error("Error getting document:", error);
    alert("Error getting user image. Please try again.");
  }
});