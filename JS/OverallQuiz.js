const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
// sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

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

// Profile

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
  windnameow.location.href = "./login.html";
});



// ---------------------Quiz_page


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getFirestore(); // Create a Firestore instance
var userDetailsString = localStorage.getItem("userdetails");
var userDetails = JSON.parse(userDetailsString);
let id = userDetails.user_id;
console.log(id);
let name = userDetails.username;
console.log(name);

// async function fetchQuizData(databaseName) {
//   try {
//     let quizDataCollection = collection(db, databaseName);
//     let quizDataSnapshot = await getDocs(quizDataCollection);
//     let quizData = quizDataSnapshot.docs.map(doc => doc.data());

//     // Sorting the quiz data
//     for (let i = 0; i < quizData.length - 1; i++) {
//       for (let j = i + 1; j < quizData.length; j++) {
//         if (parseInt(quizData[i].questionId) > parseInt(quizData[j].questionId)) {
//           let temp = quizData[i];
//           quizData[i] = quizData[j];
//           quizData[j] = temp;
//         }
//       }
//     }

//     return quizData;
//   } catch (error) {
//     console.error(`Error fetching ${databaseName} quiz data:`, error);
//     return [];
//   }
// }

async function fetchQuizData(databaseName) {
  try {
    let quizDataCollection = collection(db, databaseName);
    let quizDataSnapshot = await getDocs(quizDataCollection);
    return quizDataSnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error(`Error fetching ${databaseName} quiz data:`, error);
    return [];
  }
}

async function initializeQuiz() {
  let selectedQuiz = localStorage.getItem("selectedQuiz");
  let allQuizData;

  if (
    selectedQuiz === "HTML_Overall_Quiz" ||
    selectedQuiz === "CSS_Overall_Quiz" ||
    selectedQuiz === "JavaScript_Overall_Quiz" ||
    selectedQuiz === "PHP_Overall_Quiz" ||
    selectedQuiz === "MySql_Overall_Quiz"
  ) {
    allQuizData = await fetchQuizData(selectedQuiz);
    allQuizData.sort((a, b) => a.questionId - b.questionId);
  } else {
    console.error("Invalid or missing selectedQuiz in localStorage");
    return;
  }

  let quizContainer = document.getElementById("quiz");
  let resultContainer = document.getElementById("result");
  let submitButton = document.getElementById("submit");
  let backButton = document.getElementById("submit_btn");
  let retryButton = document.getElementById("retry");
  let retryButton2 = document.getElementById("retry2");
  let showAnswerButton = document.getElementById("showAnswer");
  let div_get = document.getElementById("diva");
  let marks = document.createElement("p");
  marks.className = "marks";
  div_get.appendChild(marks);

  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];

  function saveQuizState() {
    sessionStorage.setItem("currentQuestion", currentQuestion);
    sessionStorage.setItem("score", score);
    sessionStorage.setItem(
      "incorrectAnswers",
      JSON.stringify(incorrectAnswers)
    );
  }

  function retrieveQuizState() {
    let storedQuestion = sessionStorage.getItem("currentQuestion");
    let storedScore = sessionStorage.getItem("score");
    let storedIncorrectAnswers = JSON.parse(
      sessionStorage.getItem("incorrectAnswers")
    );

    if (
      storedQuestion !== null &&
      storedScore !== null &&
      storedIncorrectAnswers !== null
    ) {
      currentQuestion = parseInt(storedQuestion);
      score = parseInt(storedScore);
      incorrectAnswers = storedIncorrectAnswers;
    }
  }

  function clearQuizState() {
    sessionStorage.removeItem("currentQuestion");
    sessionStorage.removeItem("score");
    sessionStorage.removeItem("incorrectAnswers");
  }

  let Quiz_div = document.createElement("div");
  Quiz_div.className = "Quiz_div_1";

  
  function displayQuestion() {
    let questionData = allQuizData[currentQuestion];
    // let questionId = questionData.questionId;

    let question_Div = document.createElement("div");
    question_Div.className = "question_div";

    let questionElement = document.createElement("p");
    questionElement.className = "question";
    questionElement.innerHTML = `${questionData.questionId} . ${questionData.question}`;
    // questionElement.innerHTML = `${questionId} . ${questionData.question.replace(
    //   /[""]/g,
    //   ""
    // )}`; // Removing double quotes


    let options_Div = document.createElement("div");
    options_Div.className = "options_div";

    let optionsElement = document.createElement("div");
    optionsElement.className = "options";

    for (let i = 0; i < questionData.options.length; i++) {
      let option = document.createElement("label");
      option.className = "option";

      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.value = questionData.options[i];
      // radio.value = questionData.options[i].replace(/[" "]/g, ''); // Removing double quotes

      radio.checked = false;
      for (let j = 0; j < incorrectAnswers.length; j++) {
        if (
          incorrectAnswers[j].question === questionData.question &&
          incorrectAnswers[j].incorrectAnswer === questionData.options[i]
        ) {
          radio.checked = true;
          break;
        }
      }

      let optionText = document.createTextNode(questionData.options[i]);

      option.appendChild(radio);
      option.appendChild(optionText);
      // optionsElement_1.appendChild(optionsElement)
      options_Div.appendChild(optionsElement)
      optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = "";
    Quiz_div.innerHTML = "";


    quizContainer.appendChild(Quiz_div);
    Quiz_div.append(question_Div);
    question_Div.appendChild(questionElement);
    Quiz_div.appendChild(options_Div);


    if (currentQuestion > 0) {
      backButton.style.display = "block";
    } else {
      backButton.style.display = "none";
    }
  }

  function checkAnswer() {
    let selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      let answer = selectedOption.value;
      if (answer === allQuizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: allQuizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: allQuizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      if (currentQuestion < allQuizData.length) {
        displayQuestion();
      } else {
        displayResult();
        if (score === allQuizData.length) {
          let submitButton = document.createElement("button");
          submitButton.textContent = "certificate";
          retryButton.style.display = "none";
          retryButton2.style.display = "none";
          showAnswerButton.style.display = "none";
          submitButton.addEventListener("click", function () {
            resetQuizState();

            let generate_certificate = document.querySelector(
              ".generating_certificate"
            );
            generate_certificate.style.display = "block";
          });

          function resetQuizState() {
            sessionStorage.removeItem("currentQuestion");
            sessionStorage.removeItem("score");
            sessionStorage.removeItem("incorrectAnswers");
          }

          let certificate_button = document.querySelector(".butlist");
          certificate_button.appendChild(submitButton);
        }
        // else{

        // }
      }
      score = Math.max(allQuizData.length - incorrectAnswers.length, 0);
      saveQuizState();
    }
  }
  function goBack() {
    if (currentQuestion > 0) {
      if (
        allQuizData[currentQuestion - 1].answer ===
        allQuizData[currentQuestion - 1].options.find(
          (option) => option === allQuizData[currentQuestion - 1].answer
        )
      ) {
        score--;
      }
      currentQuestion--;
      sessionStorage.setItem("currentQuestion", currentQuestion);
      sessionStorage.setItem("score", score);
      displayQuestion();
    }
  }

  function showAnswer() {
    quizContainer.style.display = "none";
    submitButton.style.display = "none";
    backButton.style.display = "none";
    retryButton2.style.display = "inline-block";
    retryButton.style.display = "none";
    showAnswerButton.style.display = "none";
    marks.style.display = "none";

    let displayedIncorrectAnswers = [];
    let incorrectAnswersHtml = "";

    for (let i = 0; i < incorrectAnswers.length; i++) {
      if (!displayedIncorrectAnswers.includes(incorrectAnswers[i].question)) {
        incorrectAnswersHtml += `
          <p>
            <strong>Question No ${i + 1}:</strong> ${
          incorrectAnswers[i].question
        }<br>
            <strong>Your Answer:</strong> ${
              incorrectAnswers[i].incorrectAnswer
            }<br>
            <strong>Correct Answer:</strong> ${
              incorrectAnswers[i].correctAnswer
            }
          </p>
        `;
        displayedIncorrectAnswers.push(incorrectAnswers[i].question);
      }
    }
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${allQuizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }

  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    clearQuizState();
    quizContainer.style.display = "block";
    submitButton.style.display = "inline-block";
    backButton.style.display = "inline-block";
    retryButton.style.display = "none";
    retryButton2.style.display = "none";
    showAnswerButton.style.display = "none";
    marks.style.display = "none";
    resultContainer.innerHTML = "";
    displayQuestion();
  }

  function displayResult() {
    quizContainer.style.display = "none";
    submitButton.style.display = "none";
    backButton.style.display = "none";
    retryButton.style.display = "inline-block";
    showAnswerButton.style.display = "inline-block";
    marks.style.display = "block";
    score = Math.min(score, allQuizData.length);
    marks.textContent = `You scored ${score} out of ${allQuizData.length} !`;
  }

  retrieveQuizState();

  submitButton.addEventListener("click", checkAnswer);
  backButton.addEventListener("click", goBack);
  retryButton.addEventListener("click", retryQuiz);
  retryButton2.addEventListener("click", retryQuiz);
  showAnswerButton.addEventListener("click", showAnswer);

  displayQuestion();
  // initializeQuiz();
}

initializeQuiz();

//  Generate Certificate

let certificate_get = localStorage.getItem("certificate_get");

if (certificate_get === "HTML_Overall_Quiz") {
  // // ------------------- html -----------------
  const canvas = document.getElementById("canva");
  const ctx = canvas.getContext("2d");
  const name_input = document.getElementById("name");
  const downloadBtn = document.getElementById("download_btn");

  const image = new Image();
  image.src = "./Assests/without_username_html_certificate.png";
  image.className = "gen_cer";
  image.onload = () => {
    drawImage();
  };

  function drawImage() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.font = "30px HK Grotesk";
    ctx.fillStyle = "#ff914d";
    ctx.fillText(`${name}`, 40, 176);
  }

  downloadBtn.addEventListener("click", () => {
    downloadBtn.href = canvas.toDataURL("image/png");
    downloadBtn.download = "Certificate.png";
    // alert("Successfully downloaded");
    window.location.href = "./certificate.html";
  });
} else if (certificate_get === "CSS_Overall_Quiz") {
  // // ------------------- css
  const canvas2 = document.getElementById("canva");
  const ctx2 = canvas2.getContext("2d");
  const name_input2 = document.getElementById("name");
  const downloadBtn2 = document.getElementById("download_btn");

  const image2 = new Image();
  image2.src = "./Assests/without_username_css_certificate.png";
  image2.className = "gen_cer";
  image2.onload = () => {
    drawImage();
  };

  function drawImage() {
    ctx2.drawImage(image2, 0, 0, canvas2.width, canvas2.height);
    ctx2.font = "30px HK Grotesk";
    ctx2.fillStyle = "#ff914d";
    ctx2.fillText(`${name}`, 40, 176);
  }

  downloadBtn2.addEventListener("click", () => {
    downloadBtn2.href = canvas2.toDataURL("image/png");
    downloadBtn2.download = "Certificate.png";
    // alert("Successfully downloaded");
    window.location.href = "./certificate.html";
  });
}

// // ------------------- js
else if (certificate_get === "JavaScript_Overall_Quiz") {
  const canvas3 = document.getElementById("canva");
  const ctx3 = canvas3.getContext("2d");
  const name_input3 = document.getElementById("name");
  const downloadBtn3 = document.getElementById("download_btn");

  const image3 = new Image();
  image3.src = "./Assests/without_username_js_certificate.png";
  image3.className = "gen_cer";
  image3.onload = () => {
    drawImage();
  };

  function drawImage() {
    ctx3.drawImage(image3, 0, 0, canvas3.width, canvas3.height);
    ctx3.font = "30px HK Grotesk";
    ctx3.fillStyle = "#ff914d";
    ctx3.fillText(`${name}`, 40, 176);
  }


  downloadBtn3.addEventListener("click", () => {
    downloadBtn3.href = canvas3.toDataURL("image/png");
    downloadBtn3.download = "Certificate.png";
    // alert("Successfully downloaded");
    window.location.href = "./certificate.html";
  });
}
// // ------------------- mysql -----------------------------------
else if (certificate_get === "MySql_Overall_Quiz") {
  const canvas4 = document.getElementById("canva");
  const ctx4 = canvas4.getContext("2d");
  const name_input4 = document.getElementById("name");
  const downloadBtn4 = document.getElementById("download_btn");

  const image4 = new Image();
  image4.src = "./Assests/without_username_mysql_certificate.png";
  image4.className = "gen_cer";
  image4.onload = () => {
    drawImage();
  };

  function drawImage() {
    ctx4.drawImage(image4, 0, 0, canvas4.width, canvas4.height);
    ctx4.font = "30px HK Grotesk";
    ctx4.fillStyle = "#ff914d";
    ctx4.fillText(`${name}`, 40, 176);
  }


  downloadBtn4.addEventListener("click", () => {
    downloadBtn4.href = canvas4.toDataURL("image/png");
    downloadBtn4.download = "Certificate.png";
    // alert("Successfully downloaded");
    window.location.href = "./certificate.html";
  });


} else if (certificate_get === "PHP_Overall_Quiz"){

  const canvas5 = document.getElementById("canva");
  const ctx5 = canvas5.getContext("2d");
  const downloadBtn5 = document.getElementById("download_btn");

  const image5 = new Image();
  image5.src = "./Assests/without_username_php_certificate.png";
  image5.className = "gen_cer";
  image5.onload = () => {
    drawImage();
  };

  function drawImage() {
    ctx5.drawImage(image5, 0, 0, canvas5.width, canvas5.height);
    ctx5.font = "30px HK Grotesk";
    ctx5.fillStyle = "#ff914d";
    ctx5.fillText(`${name}`, 40, 176);
  }


  downloadBtn5.addEventListener("click", () => {
    downloadBtn5.href = canvas5.toDataURL("image/png");
    downloadBtn5.download = "Certificate.png";
    // alert("Successfully downloaded");
    window.location.href = "./certificate.html";
  });



};


// Profile_Img shown in firebase

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





// when i click the it will go to home page

// let Dckaplogo = document.querySelector(".DCKAPlOGO");
Dckaplogo.addEventListener("click",()=>{
  window.location.href='./index.html'
})