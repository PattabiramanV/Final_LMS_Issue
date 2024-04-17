"use strict";

// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  getDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDB-XQdiHjT82q_r5MVNFgpyUsaU2WMvik",
  authDomain: "dckap-lms-project.firebaseapp.com",
  projectId: "dckap-lms-project",
  storageBucket: "dckap-lms-project.appspot.com",
  messagingSenderId: "1022626638467",
  appId: "1:1022626638467:web:2c8f79d5614281ac7b49b6",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

var userDetailsString = localStorage.getItem("userdetails");
var userDetails = JSON.parse(userDetailsString);
let id = userDetails.user_id;
console.log(id);

// Nav bar Functionality Collaspse and Expand

const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));
let content = document.querySelector(".menu_content");
let searchIcon = document.querySelector("#Sicon");
let headings = document.querySelectorAll("#headings");
let Dckaplogo = document.querySelector(".DCKAPlOGO");

Dckaplogo.addEventListener("click", () => {
  window.location.href = "./index.html";
});

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

// Function to toggle dark mode

function toggleDarkMode() {
  const isDarkMode = body.classList.toggle("dark");
  document.body.classList.toggle("dark-mode");
  headings.forEach((heading) => {
    if (isDarkMode) {
      heading.style.color = "white";
    } else {
      heading.style.color = "#b95233";
    }
    Dckaplogo.src = body.classList.contains("dark")
      ? "./Assests/Dckapwhite.png"
      : "./Assests/Logodk.png";
    sessionStorage.setItem("darkMode", isDarkMode);
  });
}

const storedDarkMode = sessionStorage.getItem("darkMode");
if (storedDarkMode === "true") {
  toggleDarkMode();
}

darkLight.addEventListener("click", toggleDarkMode);

// Profile Dropdown Functionality

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

// local storage store the previous location

document.querySelector(".profile_down").addEventListener("click", function () {
  localStorage.setItem("previous_location", window.location.href);
});

// Explore button Functionality

let Explorebtn = document.querySelectorAll(".read-more");
console.log();
Explorebtn.forEach(async (btn) => {
  let ref = doc(database, "Learning", `User=${id}`);
  let get_data = await getDoc(ref);
  let find_language = 0;

  btn.addEventListener("click", async (e) => {
    if (btn == Explorebtn[0]) {
      find_language = "Html";
    } else if (btn == Explorebtn[1]) {
      find_language = "Css";
    } else if (btn == Explorebtn[2]) {
      find_language = "Javascript";
    } else if (btn === Explorebtn[3]) {
      find_language = "Mysql";
    } else {
      find_language = "Php";
    }
    let find_language_unlock_module =
      get_data.data()[find_language + "_unlock_total_module"];

    let data_get = await updateDoc(ref, {
      Find_Language_type: find_language,
      find_index: find_language_unlock_module,
    });
    window.location.href = "./learning_content.html";
  });
});

// Enroll Course Container Functionality

let Progressbarconatiner = document.querySelector(".progressing_bar");

try {
  let userRef = doc(database, "Learning", `User=${id}`);
  let userData = await getDoc(userRef);

  // Check if the user data exists

  const languages = ["Html", "Css", "Javascript", "Mysql", "Php"];

  languages.forEach((language) => {

    const userLearningData = userData.data()[`${language}_Complete_Module`];
  
language=language.toLowerCase();

    if (userLearningData >= 1) {
      const completedCourseContainer = document.createElement("div");
      completedCourseContainer.classList.add("Progress_bar");
      completedCourseContainer.innerHTML=`
      <div class=progress_language> <img src="./Assests/${language}.webp" class=enroll_img></div>
      <hr>
      <div class="progress_status">
          <p class="enroll_language">${language}</p>
          <div class="percentage">
            <p class="progress">In Progress</p>
            <span class="percentage_cal">0%</span>
          </div>
        </div>
      `
      // Append the completed course container to the DOM
      Progressbarconatiner.style.display = "block";
      listcourse.style.marginTop = "0px";  
      progress_container.append(completedCourseContainer);  
    } else {
      console.log(`User's ${language}_Complete_Module is not greater than 1`);
    }
  });

  // percenatge functionality

  let percentages = document.querySelectorAll(".percentage_cal");
  percentages.forEach((enroll_div, index) => {
    let courcename =
      enroll_div.parentElement.parentElement.firstElementChild.innerHTML;

    if (courcename == "Html") {
      percentages[index].innerHTML =
        userData.data().Html_Total_Percentage + "%";
    }
    if (courcename == "Css") {
      percentages[index].innerHTML = userData.data().Css_Total_Percentage + "%";
    }
    if (courcename == "Php") {
      percentages[index].innerHTML = userData.data().Php_Total_Percentage + "%";
    }
    if (courcename == "Javascript") {
      percentages[index].innerHTML =
        userData.data().Javascript_Total_Percentage + "%";
    }
    if (courcename == "Mysql") {
      percentages[index].innerHTML =
        userData.data().Mysql_Total_Percentage + "%";
    }
  });
} catch (error) {
  console.error("Error fetching user data:", error);
}

// profile Img retrieving in firebase

try {
  const profileImg = document.querySelector(".profile");
  const docRef = doc(database, "users_img", `${id}`);
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
  const ProfileMainImg = this.document.querySelector(".profile_img");

  try {
    const docRef = doc(database, "users_img", `${id}`);
    const docSnapimg = await getDoc(docRef);

    if (docSnapimg.exists()) {
      const userDataimg = docSnapimg.data();
      profileImg.src = userDataimg.imageURL;
      ProfileMainImg.src = userDataimg.imageURL;
    } else {
      console.log("The image is not found in Firestore.");
    }
  } catch (error) {
    console.error("Error getting document:", error);
    alert("Error getting user image. Please try again.");
  }
});


