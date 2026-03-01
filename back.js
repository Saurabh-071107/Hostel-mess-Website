
const loginForm = document.getElementById("loginForm");
const mainContent = document.getElementById("mainContent");
const loginPage = document.getElementById("loginPage");
const loginError = document.getElementById("loginError");
const logoutBtn = document.getElementById("logoutBtn");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "student" && password === "1234") {
    localStorage.setItem("loggedIn", "true");
    showMainPage();
  } else {
    loginError.textContent = "Invalid credentials! Try: student / 1234";
  }
});

function showMainPage() {
  loginPage.classList.add("hidden");
  mainContent.classList.remove("hidden");
}

if (localStorage.getItem("loggedIn") === "true") showMainPage();

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  location.reload();
});


function openTab(tabName) {
  document.querySelectorAll(".tabcontent").forEach(tab => tab.classList.remove("active"));
  document.getElementById(tabName).classList.add("active");
}

document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}
const fakeAnnouncements = [
  { text: "Urgent: Water supply off from 2–4 PM", type: "urgent" },
  { text: "Event: Cultural night on Friday!", type: "event" },
  { text: "Notice: Mess closed Sunday for maintenance.", type: "notice" }
];

const fakeMenu = [
  { day: "Mon", breakfast: " Idli", lunch: "  Dal & Rice", dinner: "  Paneer" },
  { day: "Tue", breakfast: " Puri Bhaji", lunch: "  Rajma", dinner: "  Fried Rice" },
  { day: "Wed", breakfast: " Panner Paratha", lunch: "  Curry ", dinner: "  Panner Rice" },
  { day: "Thrus", breakfast: " Aloo Paratha", lunch: "  Briyani", dinner: "  Sooya Rice" }
];

function loadFakeData() {
  const list = document.getElementById("announcementList");
  fakeAnnouncements.forEach(a => {
    const div = document.createElement("div");
div.className = `announcement ${a.type}`;

    div.textContent = a.text;
    list.appendChild(div);
  });

  const table = document.querySelector("table");
  fakeMenu.forEach(m => {
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>${m.day}</td>
  <td>${m.breakfast}</td>
  <td>${m.lunch}</td>
  <td>${m.dinner}</td>
`;

    table.appendChild(row);
  });
}
loadFakeData();

function submitMealRating() {
  const rating = document.getElementById("mealRating").value;
  const msg = document.getElementById("mealMessage");
  if (rating) {
   msg.textContent = `Thanks for rating: ${rating}`;
    localStorage.setItem("mealRating", rating);
  } else {
    msg.textContent = "Please select a rating!";
  }
}

const complaintForm = document.getElementById("complaintForm");
const complaintList = document.getElementById("complaintList");
let complaints = JSON.parse(localStorage.getItem("complaints")) || [];

function displayComplaints() {
  complaintList.innerHTML = "";
  complaints.forEach(c => {
    const li = document.createElement("li");
  li.textContent = `[${c.category}] ${c.issue} — Status: Submitted`;
    complaintList.appendChild(li);
  });
}

complaintForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const category = document.getElementById("complaintCategory").value;
  const issue = document.getElementById("complaintText").value;
  complaints.push({ category, issue });
  localStorage.setItem("complaints", JSON.stringify(complaints));
  displayComplaints();
  complaintForm.reset();
  alert("Complaint submitted!");
});
displayComplaints();

const feedbackForm = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");
let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

function displayFeedback() {
  feedbackList.innerHTML = "";
  feedbacks.forEach(f => {
    const li = document.createElement("li");
    li.textContent = `[${f.rating} - ${f.comment}]`;
    feedbackList.appendChild(li);
  });
}

feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const rating = document.getElementById("feedbackRating").value;
  const comment = document.getElementById("feedbackText").value;
  feedbacks.push({ rating, comment });
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  displayFeedback();
  feedbackForm.reset();
  alert("Feedback saved!");
});
displayFeedback();
window.onload = () => {
  if (!localStorage.getItem("alertShown")) {
    alert("📢 New Announcement: Hostel WiFi maintenance tonight at 11 PM!");
    localStorage.setItem("alertShown", "true");
  }
};