// --- Data Models & Local Storage sync ---
const users = JSON.parse(localStorage.getItem("users")) || {
  user1: { password: "password1", verified: false },
  verifiedUser: { password: "password2", verified: true }
};

const genres = {
  Fantasy: [
    { title: "Harry Potter", author: "J.K. Rowling", desc: "Wizarding world adventure.", poster: "https://covers.openlibrary.org/b/id/7984916-L.jpg", read: "https://openlibrary.org", watch: "https://primevideo.com", buy: "https://amazon.in" },
    { title: "Percy Jackson", author: "Rick Riordan", desc: "Greek mythology modern twist.", poster: "https://covers.openlibrary.org/b/id/8231856-L.jpg", read: "https://openlibrary.org", watch: "https://disneyplus.com", buy: "https://disneyplus.com" },
    { title: "The Hobbit", author: "J.R.R. Tolkien", desc: "A hobbit’s epic adventure.", poster: "https://covers.openlibrary.org/b/id/6979861-L.jpg", read: "https://openlibrary.org", watch: "https://primevideo.com", buy: "https://amazon.in" }
  ],
  Romance: [
    { title: "The Summer I Turned Pretty", author: "Jenny Han", desc: "A teen summer romance.", poster: "https://i.pinimg.com/736x/8a/29/ca/8a29cadab2d4329ac929388160296408.jpg", read: "https://archive.org", watch: "https://primevideo.com", buy: "https://amzn.in" },
    { title: "Pride and Prejudice", author: "Jane Austen", desc: "Classic love & society tale.", poster: "https://i.pinimg.com/736x/47/b5/47/47b547ad30201ad69099c2cb6faff682.jpg", read: "https://publicdomainlibrary.org", watch: "https://primevideo.com", buy: "https://amzn.in" },
    { title: "Me Before You", author: "Jojo Moyes", desc: "Heartbreaking modern romance.", poster: "https://i.pinimg.com/736x/eb/b7/5c/ebb75c0537592386b579e672ac0b545f.jpg", read: "", watch: "https://primevideo.com", buy: "https://amzn.in" }
  ],
  Horror: [
    { title: "Ghosts of The Silent Hills", author: "Anita Krishan", desc: "True hauntings and eerie tales.", poster: "https://m.media-amazon.com/images/I/91g4YHEkGkL.SL1500.jpg", read: "https://fliphtml5.com", buy: "https://amzn.in" }
  ],
  Education: [
    { title: "The Alchemist", author: "Paulo Coelho", desc: "A shepherd's journey to wisdom.", poster: "https://m.media-amazon.com/images/I/81ZtAPCqyGL.UF1000,1000_QL80.jpg", read: "https://icrrd.com", buy: "https://amzn.in" }
  ]
};

let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || []; // stored as {title,poster}
let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
let currentUser = localStorage.getItem("currentUser") || "";
let profileAvatars = JSON.parse(localStorage.getItem("profileAvatars")) || {}; // username => dataURL
let userDisplayNames = JSON.parse(localStorage.getItem("userDisplayNames")) || {}; // username => displayName

// Initialize
function initializeApp() {
  currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
    window.location.href = "auth.html"; // go to login/signup page
    return;
  }

  document.getElementById("profileName").textContent = userDisplayNames[currentUser] || currentUser;
  document.getElementById("currentUserInfo").textContent = `Logged in as: ${currentUser}`;
  const verifiedBadge = document.getElementById("verifiedBadge");
  if (users[currentUser] && users[currentUser].verified) {
    verifiedBadge.classList.remove("hidden");
  } else verifiedBadge.classList.add("hidden");

  // set avatar if exists
  const avatarUrl = profileAvatars[currentUser] || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop";
  document.getElementById("headerAvatar").src = avatarUrl;
  document.getElementById("avatarPreview").src = avatarUrl;

  showHome();
}

// --- SECTION CONTROLS ---
function hideAllSections() {
  document.querySelectorAll("main#mainPage > section").forEach(s => s.classList.add("hidden"));
}

function showHome() {
  hideAllSections();
  document.getElementById("homeSection").classList.remove("hidden");
}

function showGenres() {
  hideAllSections();
  document.getElementById("genresSection").classList.remove("hidden");
  const container = document.querySelector(".genres");
  container.innerHTML = "";

  for (let g in genres) {
    const btn = document.createElement("button");
    btn.textContent = g;
    btn.onclick = () => showBooks(g);
    container.appendChild(btn);
  }
}

function showBooks(genre) {
  hideAllSections();
  document.getElementById("booksSection").classList.remove("hidden");
  document.getElementById("genreTitle").textContent = genre;
  const container = document.querySelector(".books");
  container.innerHTML = "";

  genres[genre].forEach(book => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${book.poster}" alt="${book.title}">
      <h4>${book.title}</h4>
      <p><em>${book.author}</em></p>
      <p>${book.desc}</p>
      <div class="card-actions">
        ${book.read ? `<button onclick="window.open('${book.read}')" title="Read">📖 Read</button>` : ''}
        ${book.watch ? `<button onclick="window.open('${book.watch}')" title="Watch">▶ Watch</button>` : ''}
        ${book.buy ? `<button onclick="window.open('${book.buy}')" title="Buy">🛒 Buy</button>` : ''}
        <button onclick="saveBook('${escapeHtml(book.title)}','${escapeHtml(book.poster)}')" title="Save">📌 Save</button>
      </div>
      <div class="card-actions">
        <button onclick="writeReview('${escapeHtml(book.title)}')">✍️ Review</button>
        <button onclick="readReviews('${escapeHtml(book.title)}')">📖 Reviews</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function showSaved() {
  hideAllSections();
  document.getElementById("savedSection").classList.remove("hidden");
  const container = document.querySelector(".saved");
  container.innerHTML = "";

  if (!savedBooks.length) {
    container.innerHTML = "<p>You haven't saved any books yet — find a gem in Genres.</p>"
    return;
  }

  savedBooks.forEach(item => {
    const el = document.createElement("p");
    el.innerHTML = `<img class="thumb" src="${item.poster}" alt="${item.title}"> <strong>${item.title}</strong> &nbsp; <button onclick="openBookFromSaved('${escapeHtml(item.title)}')" class="ghost">Open</button> <button onclick="removeSaved('${escapeHtml(item.title)}')" class="ghost">Remove</button>`;
    container.appendChild(el);
  });
}

function openBookFromSaved(title) {
  // find in genres and open genre view for that book (best-effort)
  for (let g in genres) {
    const match = genres[g].find(b => b.title === title);
    if (match) {
      showBooks(g);
      return;
    }
  }
  alert("Book not found in collection (it may be a custom add).");
}

function removeSaved(title) {
  savedBooks = savedBooks.filter(b => b.title !== title);
  localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
  showSaved();
}

function showAddBook() {
  hideAllSections();
  document.getElementById("addBookSection").classList.remove("hidden");
}

function showSettings() {
  hideAllSections();
  document.getElementById("settingsSection").classList.remove("hidden");

  // populate settings inputs
  document.getElementById("displayName").value = userDisplayNames[currentUser] || "";
  document.getElementById("verifiedToggle").value = users[currentUser] && users[currentUser].verified ? "true" : "false";
}

// --- Auth & misc ---
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "auth.html";
}


// --- Add Book ---
function addBook() {
  const title = document.getElementById("bookTitle").value.trim();
  const author = document.getElementById("bookAuthor").value.trim();
  const desc = document.getElementById("bookDesc").value.trim();
  const read = document.getElementById("bookRead").value.trim();
  const watch = document.getElementById("bookWatch").value.trim();
  const buy = document.getElementById("bookBuy").value.trim();
  const posterFile = document.getElementById("bookPoster").files[0];

  if (!title || !author) return alert("Please provide at least a title and an author.");

  if (posterFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const posterURL = e.target.result;
      pushNewBook(title, author, desc, read, watch, buy, posterURL);
    };
    reader.readAsDataURL(posterFile);
  } else {
    const posterURL = "https://via.placeholder.com/240x320?text=Book+Poster";
    pushNewBook(title, author, desc, read, watch, buy, posterURL);
  }
}

function pushNewBook(title, author, desc, read, watch, buy, poster) {
  // put new book into Fantasy by default
  genres.Fantasy.push({ title, author, desc, read, watch, buy, poster });
  alert("Book added successfully!");
  // clear form
  ["bookTitle","bookAuthor","bookDesc","bookRead","bookWatch","bookBuy"].forEach(id => { if(document.getElementById(id)) document.getElementById(id).value = ""; });
  document.getElementById("posterPreview").src = "";
  showGenres();
}

// --- Poster preview ---
function previewPoster(e) {
  const preview = document.getElementById("posterPreview");
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      preview.src = ev.target.result;
      preview.style.display = "block";
    }
    reader.readAsDataURL(e.target.files[0]);
  } else {
    preview.src = "";
    preview.style.display = "none";
  }
}

// --- Save & Reviews ---
function saveBook(title, poster) {
  // prevent duplicates
  if (!savedBooks.some(b => b.title === title)) {
    savedBooks.push({ title, poster });
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
    alert("Book saved successfully!");
  } else {
    alert("This book is already in your saved list.");
  }
}

function writeReview(title) {
  const review = prompt(`Write a review for "${title}":`);
  if (!review) return;
  if (!reviews[title]) reviews[title] = [];
  reviews[title].push(`${currentUser}: ${review}`);
  localStorage.setItem("reviews", JSON.stringify(reviews));
  alert("Review submitted successfully!");
}

function readReviews(title) {
  const list = reviews[title] || [];
  if (!list.length) {
    alert("No reviews yet.");
    return;
  }
  alert(`Reviews for "${title}":\n\n${list.join("\n\n")}`);
}

// --- Profile/avatar settings ---
function previewAvatar(e) {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = function(ev) {
      document.getElementById("avatarPreview").src = ev.target.result;
      document.getElementById("headerAvatar").src = ev.target.result;
      profileAvatars[currentUser] = ev.target.result;
      localStorage.setItem("profileAvatars", JSON.stringify(profileAvatars));
    }
    reader.readAsDataURL(e.target.files[0]);
  }
}

function saveProfile() {
  const displayName = document.getElementById("displayName").value.trim();
  const verified = document.getElementById("verifiedToggle").value === "true";
  if (displayName) {
    userDisplayNames[currentUser] = displayName;
    localStorage.setItem("userDisplayNames", JSON.stringify(userDisplayNames));
    document.getElementById("profileName").textContent = displayName;
  }
  users[currentUser] = users[currentUser] || { password: "" };
  users[currentUser].verified = verified;
  localStorage.setItem("users", JSON.stringify(users));
  alert("Profile saved.");
  document.getElementById("verifiedBadge").classList.toggle("hidden", !verified);
}

// small utility
function escapeHtml(str){
  return String(str).replace(/'/g,"\\'").replace(/"/g,'\\"');
}