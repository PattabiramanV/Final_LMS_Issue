"use strict"

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
  if (sidebar.classList.contains("hoverable")) 
  {
    sidebar.classList.remove("close");
    content.style.left = "1rem";
  }
});

sidebar.addEventListener("mouseleave", () => {
  if (
    sidebar.classList.contains("hoverable") &&
    sidebar.classList.contains("close")
  ) 
  {
    content.style.left = "0rem";
  }
});

let Dckaplogo = document.querySelector(".DCKAPlOGO");
Dckaplogo.addEventListener("click",()=>{
  window.location.href='./index.html'
})
let bdy = document.querySelector(".body");
let html_btn = document.querySelector("#html_btn");
let css_btn = document.querySelector("#css_btn");
let js_btn = document.querySelector("#js_btn");
let mysql_btn = document.querySelector("#mysql_btn");
let php_btn = document.querySelector("#php_btn");

//---------------- Function to toggle dark mode ------------------------

function toggleDarkMode() 
{
  bdy.classList.toggle("act");
  html_btn.classList.toggle("act2");
  css_btn.classList.toggle("act2");
  js_btn.classList.toggle("act2");
  mysql_btn.classList.toggle("act2");
  php_btn.classList.toggle("act2");
  const isDarkMode = body.classList.toggle("dark");
  document.body.classList.toggle("dark-mode");
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

//------------------------------ Profile -----------------------------

let profile_Dropdown = document.querySelector(".profile_bar_list");
let profile_navigate = document.querySelector(".profile_img");

profile_navigate.addEventListener("click", (event) => {
  event.stopPropagation();
  profile_Dropdown.style.display = "block";
});

document.addEventListener("click", (event) => {
  if (
    !profile_navigate.contains(event.target) &&
    !profile_Dropdown.contains(event.target)
  ) 
  {
    profile_Dropdown.style.display = "none";
  }
});

//--------------- profile_drop ---------------------------

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

// -------------------------------- fire_base ---------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

//--------------- Your web app's Firebase configuration ------------------
const firebaseConfig = {
  apiKey: "AIzaSyDB-XQdiHjT82q_r5MVNFgpyUsaU2WMvik",
  authDomain: "dckap-lms-project.firebaseapp.com",
  projectId: "dckap-lms-project",
  storageBucket: "dckap-lms-project.appspot.com",
  messagingSenderId: "1022626638467",
  appId: "1:1022626638467:web:2c8f79d5614281ac7b49b6"
};

//-------------- Initialize Firebase ------------------------------------
const app = initializeApp(firebaseConfig);
const db = getFirestore(); // Create a Firestore instance

var userDetailsString = localStorage.getItem("userdetails");
var userDetails = JSON.parse(userDetailsString);
let id=userDetails.user_id;

// --------------- HTML Quiz -------------------

async function html_quiz_btn() 
{
  try 
  {
    const getRef = doc(db, 'Learning', `User=${id}`);
    const getData = await getDoc(getRef);
    const data = getData.data();
    const Html_Complete_Percentage = data.Html_Total_Percentage;
    console.log(Html_Complete_Percentage); // Output the value to debug

    const html_btn = document.querySelector("#html_btn");

    if (Html_Complete_Percentage === 100) 
    {
      document.querySelector(".html_lock").style.display = "none";
      html_btn.classList.add("class");
    }
    else
    {
      document.querySelector(".html_lock").style.display = "block";
      html_btn.classList.remove("class");
    }
    html_btn.addEventListener("click", () => {
      if (Html_Complete_Percentage === 100) 
      {
        localStorage.setItem('selectedQuiz', 'HTML_Overall_Quiz');
        
        localStorage.setItem('certificate_get', 'HTML_Overall_Quiz');

        window.location.href = './OverallQuiz.html';
        document.querySelector(".html_lock").style.display = "none"; // Use querySelector or access the first element of the collection
      } 
      else if (Html_Complete_Percentage < 100) 
      {
        document.getElementById("html_error").style.display = "block";
        setInterval(() => {
          document.getElementById("html_error").style.display = "none";
        }, 4000);
      }
    });
  } 
  catch (error) 
  {
    console.error("Error fetching and updating data:", error);
    return 0;
  }
}

// Call the quiz_btn function

html_quiz_btn();

// --------------- CSS Quiz -------------------

async function css_quiz_btn() 
{
  try 
  {
    const getRef = doc(db, 'Learning', `User=${id}`);
    const getData = await getDoc(getRef);
    const data = getData.data();
    const Css_Complete_Percentage = data.Css_Total_Percentage;
    console.log(Css_Complete_Percentage); // Output the value to debug

    const css_quiz = document.querySelector("#css_btn");

    if (Css_Complete_Percentage === 100) 
    {
      document.querySelector(".css_lock").style.display = "none";
      css_quiz.classList.add("class");
    }
    else
    {
      document.querySelector(".css_lock").style.display = "block";
      css_quiz.classList.remove("class");
    }

    css_quiz.addEventListener("click", () => {
      if (Css_Complete_Percentage === 100) 
      {
        localStorage.setItem('selectedQuiz', 'CSS_Overall_Quiz');

        
        localStorage.setItem('certificate_get', 'CSS_Overall_Quiz');
        
        window.location.href = './OverallQuiz.html';
        document.querySelector(".css_lock").style.display = "none"; // Use querySelector or access the first element of the collection
      } 
      else if (Css_Complete_Percentage < 100) 
      {
        document.getElementById("css_error").style.display = "block";
        setInterval(() => {
          document.getElementById("css_error").style.display = "none";
        }, 4000);
      }
    });
  } catch (error) {
    console.error("Error fetching and updating data:", error);
    return 0;
  }
}

// Call the quiz_btn function

css_quiz_btn();

// --------------- js Quiz -------------------

async function js_quiz_btn() 
{
  try 
  {
    const getRef = doc(db, 'Learning',`User=${id}`);
    const getData = await getDoc(getRef);
    const data = getData.data();
    const Javascript_Complete_Percentage = data.Javascript_Total_Percentage;
    console.log(Javascript_Complete_Percentage); // Output the value to debug

    const js_btn =document.querySelector("#js_btn");

    if (Javascript_Complete_Percentage === 100) 
    {
      document.querySelector(".js_lock").style.display = "none";
      js_btn.classList.add("class");
    }
    else
    {
      document.querySelector(".js_lock").style.display = "block";
      js_btn.classList.remove("class");
    }

    js_btn.addEventListener("click", () => {
      if (Javascript_Complete_Percentage === 100) 
      {
        localStorage.setItem('selectedQuiz', 'JavaScript_Overall_Quiz');
        
        
        localStorage.setItem('certificate_get', 'JavaScript_Overall_Quiz');

        window.location.href = './OverallQuiz.html';
        document.querySelector(".js_lock").style.display = "none"; // Use querySelector or access the first element of the collection
      } 
      else if (Javascript_Complete_Percentage < 100) 
      {
        document.getElementById("js_error").style.display = "block";
        setInterval(() => {
          document.getElementById("js_error").style.display = "none";
        }, 4000);
      }
    });
  } 
  catch (error) 
  {
    console.error("Error fetching and updating data:", error);
    return 0;
  }
}

// Call the quiz_btn function

js_quiz_btn();


// --------------- mysql Quiz -------------------


async function mysql_quiz_btn() 
{
  try 
  {
    const getRef = doc(db, 'Learning', `User=${id}`);
    const getData = await getDoc(getRef);
    const data = getData.data();
    const Mysql_Complete_Percentage = data.Mysql_Total_Percentage;
    console.log(Mysql_Complete_Percentage); // Output the value to debug

    const mysql_btn =document.querySelector("#mysql_btn");

    if (Mysql_Complete_Percentage === 100) 
    {
      document.querySelector(".mysql_lock").style.display = "none";
      mysql_btn.classList.add("class");
    }
    else
    {
      document.querySelector(".mysql_lock").style.display = "block";
      mysql_btn.classList.remove("class");
    }

    mysql_btn.addEventListener("click", () => {
      if (Mysql_Complete_Percentage === 100) 
      {
        localStorage.setItem('selectedQuiz', 'MySql_Overall_Quiz');
        localStorage.setItem('certificate_get', 'MySql_Overall_Quiz');
        window.location.href = './OverallQuiz.html';
        document.querySelector(".mysql_lock").style.display = "none"; // Use querySelector or access the first element of the collection
      } 
      else if (Mysql_Complete_Percentage < 100) 
      {
        document.getElementById("mysql_error").style.display = "block";
        setInterval(() => {
          document.getElementById("mysql_error").style.display = "none";
        }, 4000);
      }
    });
  } catch (error) {
    console.error("Error fetching and updating data:", error);
    return 0;
  }
}

// Call the quiz_btn function

mysql_quiz_btn();

// ------------------------------------ PHP Quiz -------------------------------------------------

async function php_quiz_btn() 
{
  try 
  {
    const getRef = doc(db, 'Learning', `User=${id}`);
    const getData = await getDoc(getRef);
    const data = getData.data();
    const Php_Complete_Percentage = data.Php_Total_Percentage;
    console.log(Php_Complete_Percentage); // Output the value to debug

    const php_btn = document.querySelector("#php_btn");

    if (Php_Complete_Percentage === 100) 
    {
      document.querySelector(".php_lock").style.display = "none";
      php_btn.classList.add("class");
    }
    else
    {
      document.querySelector(".php_lock").style.display = "block";
      php_btn.classList.remove("class");
    }

    php_btn.addEventListener("click", () => {
      if (Php_Complete_Percentage === 100) 
      {
        localStorage.setItem('selectedQuiz', 'PHP_Overall_Quiz');
        localStorage.setItem('certificate_get', 'PHP_Overall_Quiz');
        window.location.href = './OverallQuiz.html';
        document.querySelector(".php_lock").style.display = "none"; // Use querySelector or access the first element of the collection
      } 
      else if (Php_Complete_Percentage < 100) 
      {
        document.getElementById("php_error").style.display = "block";
        setInterval(() => {
          document.getElementById("php_error").style.display = "none";
        }, 4000);
      }
    });
  } catch (error) {
    console.error("Error fetching and updating data:", error);
    return 0;
  }
}

// Call the quiz_btn function

php_quiz_btn();


// ----------------------------------------- Cancel Navigation ------------------------------------------

document.querySelector(".profile_down").addEventListener("click", function () {
  localStorage.setItem("previous_location", window.location.href);
});

//----------- profile show ---------------------

try 
{
  const profileImg = document.querySelector(".profile_img");
  const docRef = doc(db, 'users_img', `${id}`);
  const docSnapimg = await getDoc(docRef);

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

window.addEventListener("load", async function () {
const profileImg = document.querySelector(".profile_img");
  try 
  {
    const docRef = doc(db, 'users_img', `${id}`);
    const docSnapimg = await getDoc(docRef);

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