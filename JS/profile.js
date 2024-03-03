const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));
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
Dckaplogo.addEventListener("click",()=>{
  window.location.href='./index.html'
})

// Function to toggle dark mode

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

// Profile Dropdown Work

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

// profile_drop

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

// Cancel Btn Navigation

let cancel_btn = document.querySelector(".cancel_btn");
cancel_btn.addEventListener("click", (e) => {
  let previousLocation = localStorage.getItem("previous_location");
  if (previousLocation) {
    window.location.href = previousLocation;
  } else {
    window.location.href = "./index.html";
  }
});


// Firebase Store
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
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
let id = localStorage.getItem("UserId");
console.log(id);

let inputName = document.querySelector("#fullNameInput");
let inputEmail = document.querySelector("#emailadd");
let inputgitUsername = document.querySelector("#gitinput");
let inputbioInfo = document.querySelector("#bioInput");
let inputlinkInfo = document.querySelector("#linkedInInput");

let Editbtn = document.querySelector(".Btn");

Editbtn.addEventListener("click", function () {
  if (Editbtn.textContent.trim() === "Edit") {
    Editbtn.innerHTML = "Save  <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' style='fill: white;transform: ;msFilter:;'><path d='M5 21h14a2 2 0 0 0 2-2V8l-5-5H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zM7 5h4v2h2V5h2v4H7V5zm0 8h10v6H7v-6z'></path></svg>";
    inputName.disabled = false;
    inputgitUsername.disabled = false;
    inputbioInfo.disabled = false;
    inputlinkInfo.disabled = false;
  } else {
    Editbtn.innerHTML =
      "Edit <svg class='svg' viewBox='0 0 512 512'><path d='M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z'></path></svg>";
    inputName.disabled = true;
    inputgitUsername.disabled = true;
    inputbioInfo.disabled = true;
    inputlinkInfo.disabled = true;

    // Save the input values to Firebase
    saveToFirebase(id);
  }
});

// Function to save input values to Firebase
function saveToFirebase(id) {
  const docRef = database.collection("users").doc(id);
  docRef
    .set({
      fullName: inputName.value,
      gitUsername: inputgitUsername.value,
      bioInfo: inputbioInfo.value,
      linkedIn: inputlinkInfo.value,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

document.querySelector(".Country label").addEventListener("click", function () {
  document.getElementById("countrySelect").disabled = false;
});

document
  .getElementById("countrySelect")
  .addEventListener("change", function () {
    var selectedCountry = this.value;
    console.log("Selected country:", selectedCountry);
  });

// Fetch data into Local storage

// let UserDetailsdataname=localStorage.getItem("username")
// let UserEmaildata=localStorage.getItem("email")

// inputName.value=UserDetailsdataname
// inputEmail.value=UserEmaildata

// var username = localStorage.getItem("username");
// var nameSpan = document.getElementById("fullName");
// if (username) {
//   nameSpan.innerHTML = username;
// } else {
//   nameSpan.innerHTML = "Guest";
// }

// Email fetch local storage

// var storedEmail = localStorage.getItem("email");
// var emailInput = document.getElementById("emailadd");
// emailInput.value = storedEmail;

// var username = localStorage.getItem("username");
// var nameSpan = document.getElementById("fullName");
// if (username) {
//   nameSpan.innerHTML = username;
// } else {
//   nameSpan.innerHTML = "Guest";
// }

const uploadButton = document.getElementById("uploadButton");
uploadButton.addEventListener("click", function () {
  fileInput.click();
});

const fileInput = document.getElementById("uploadInput");
const imageContainer = document.getElementById("imageContainer");
let previousImageDocId = null;

fileInput.addEventListener("change", async function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = async function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;

      const profileImg = document.querySelector(".profile");
      profileImg.src = e.target.result;

      while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
      }
      imageContainer.appendChild(img);

      try {
        const imagesRef = collection(database, "images");
        if (previousImageDocId) {
          await deleteDoc(doc(database, "images", previousImageDocId));
        }
        const newImageDocRef = await addDoc(imagesRef, {
          imageURL: e.target.result,
        });
        previousImageDocId = newImageDocRef.id;
        alert("Successfully uploaded image and data.");

        let UserProfileImg = localStorage.setItem("imageURL", e.target.result);

        const profileImg = document.querySelector(".profile");
        profileImg.src = UserProfileImg;
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    };
    reader.readAsDataURL(file);
  }
});

// Retrieve imageURL from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  const storedImageURL = localStorage.getItem("imageURL");

  if (storedImageURL) {
    const profileImg = document.querySelector(".profile");
    profileImg.src = storedImageURL;

    const profilemainimg = document.querySelector(".profile_img");
    profilemainimg.src = storedImageURL;
  }
});
