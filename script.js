/* -------------------------
   Data & Storage Helpers
--------------------------*/

// Demo catalog
const BOOKS = [
  { id: 1,  title: "The Time Machine",         genre: "Fiction" },
  { id: 2,  title: "Sapiens",                   genre: "Non-Fiction" },
  { id: 3,  title: "A Brief History of Time",   genre: "Science" },
  { id: 4,  title: "The Art of War",            genre: "History" },
  { id: 5,  title: "Harry Potter",              genre: "Fantasy" },
  { id: 6,  title: "1984",                      genre: "Fiction" },
  { id: 7,  title: "Educated",                  genre: "Non-Fiction" },
  { id: 8,  title: "Cosmos",                    genre: "Science" },
  { id: 9,  title: "Guns, Germs, and Steel",    genre: "History" },
  { id: 10, title: "The Lord of the Rings",     genre: "Fantasy" },
];

const LS_KEYS = {
  users: "brp_users",
  current: "brp_current_user",
  reviews: "brp_reviews" // { [bookId]: Review[] }
};

function lsGet(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
function lsSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUsers() { return lsGet(LS_KEYS.users, []); }
function saveUsers(users) { lsSet(LS_KEYS.users, users); }

function setCurrentUser(username) { lsSet(LS_KEYS.current, username); }
function getCurrentUser() { return lsGet(LS_KEYS.current, null); }
function clearCurrentUser() { localStorage.removeItem(LS_KEYS.current); }

function getAllReviews() { return lsGet(LS_KEYS.reviews, {}); }
function saveAllReviews(map) { lsSet(LS_KEYS.reviews, map); }

function ensureReviewStore() {
  const map = getAllReviews();
  if (Object.keys(map).length === 0) {
    // Seed some random reviews
    const sampleUsers = ["Alice", "Bob", "Charlie", "Dora", "Evan", "Fiona"];
    const sampleTexts = [
      "Loved the pacing and ideas.",
      "Informative and engaging!",
      "A bit slow in the middle, but worth it.",
      "Fantastic world-building.",
      "Great read, would recommend.",
      "Classic—still relevant today."
    ];
    BOOKS.forEach(b => {
      const count = Math.floor(Math.random() * 3); // 0-2 reviews
      if (count > 0) {
        map[b.id] = Array.from({ length: count }).map((_, i) => ({
          id: `${b.id}-${Date.now()}-${i}`,
          user: sampleUsers[Math.floor(Math.random() * sampleUsers.length)],
          stars: 3 + Math.floor(Math.random() * 3), // 3-5
          text: sampleTexts[Math.floor(Math.random() * sampleTexts.length)],
          likes: [],
          dislikes: [],
          createdAt: Date.now() - Math.floor(Math.random() * 100000000),
        }));
      }
    });
    saveAllReviews(map);
  }
}

/* -------------------------
   Auth
--------------------------*/
function signup(username, password) {
  const users = getUsers();
  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    return { ok: false, msg: "Username already exists." };
  }
  users.push({ username, password }); // demo only (not secure)
  saveUsers(users);
  setCurrentUser(username);
  return { ok: true };
}

function login(username, password) {
  const users = getUsers();
  const u = users.find(u => u.username === username && u.password === password);
  if (!u) return { ok: false, msg: "Invalid username or password." };
  setCurrentUser(username);
  return { ok: true };
}

/* -------------------------
   UI Elements
--------------------------*/
const el = (id) => document.getElementById(id);

const signupPage  = el("signupPage");
const loginPage   = el("loginPage");
const appPage     = el("appPage");
const bookPage    = el("bookPage");

const helloUser   = el("helloUser");
const profileUser = el("profileUser");
const reviewCount = el("reviewCount");
const userBadge   = el("userBadge");

const bookList    = el("bookList");
const genreFilter = el("genreFilter");

const bookTitleHeader = el("bookTitleHeader");
const bookGenreHeader = el("bookGenreHeader");
const reviewsList     = el("reviewsList");

/* -------------------------
   Navigation / Views
--------------------------*/
function show(section) {
  // hide all
  [signupPage, loginPage, appPage, bookPage].forEach(s => s.classList.add("hidden"));
  section.classList.remove("hidden");
}

function switchToTab(tabId) {
  document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tabpanel").forEach(p => p.classList.add("hidden"));
  document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add("active");
  document.getElementById(tabId).classList.remove("hidden");
}

/* -------------------------
   Rendering: Books & Reviews
--------------------------*/
function renderBooks() {
  const filter = genreFilter.value;
  const items = BOOKS.filter(b => !filter || b.genre === filter);

  bookList.innerHTML = "";
  items.forEach(b => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <span class="tag">${b.genre}</span>
      <h4>${b.title}</h4>
      <button data-open="${b.id}">Open</button>
    `;
    card.querySelector("button").addEventListener("click", () => openBook(b.id));
    bookList.appendChild(card);
  });
}

function openBook(bookId) {
  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return;
  bookTitleHeader.textContent = book.title;
  bookGenreHeader.textContent = `Genre: ${book.genre}`;
  bookPage.dataset.bookId = String(bookId);
  renderReviews(bookId);
  show(bookPage);
}

function renderReviews(bookId) {
  const map = getAllReviews();
  const list = map[bookId] ?? [];
  list.sort((a,b) => b.createdAt - a.createdAt);

  reviewsList.innerHTML = "";
  if (list.length === 0) {
    reviewsList.innerHTML = `<p class="muted">No reviews yet. Be the first!</p>`;
    return;
  }

  const current = getCurrentUser();
  list.forEach(r => {
    const wrap = document.createElement("div");
    wrap.className = "review-card";
    const liked = current && r.likes.includes(current);
    const disliked = current && r.dislikes.includes(current);

    wrap.innerHTML = `
      <div class="review-head">
        <div class="review-meta">
          <strong>${r.user}</strong> • <span class="stars">${"⭐".repeat(r.stars)}</span>
        </div>
        <div class="review-meta">${new Date(r.createdAt).toLocaleString()}</div>
      </div>
      <p>${r.text}</p>
      <div class="likes">
        <button class="likeBtn ${liked ? "active" : ""}" data-id="${r.id}">👍 <span>${r.likes.length}</span></button>
        <button class="dislikeBtn ${disliked ? "active" : ""}" data-id="${r.id}">👎 <span>${r.dislikes.length}</span></button>
      </div>
    `;

    // Like / Dislike handlers
    const likeBtn = wrap.querySelector(".likeBtn");
    const dislikeBtn = wrap.querySelector(".dislikeBtn");

    likeBtn.addEventListener("click", () => toggleReaction(bookId, r.id, "like"));
    dislikeBtn.addEventListener("click", () => toggleReaction(bookId, r.id, "dislike"));

    reviewsList.appendChild(wrap);
  });
}

function toggleReaction(bookId, reviewId, type) {
  const user = getCurrentUser();
  if (!user) return;

  const map = getAllReviews();
  const list = map[bookId] ?? [];
  const r = list.find(x => x.id === reviewId);
  if (!r) return;

  const isLike = type === "like";
  const mineInLikes = r.likes.includes(user);
  const mineInDislikes = r.dislikes.includes(user);

  if (isLike) {
    // toggle like
    if (mineInLikes) {
      r.likes = r.likes.filter(u => u !== user);
    } else {
      r.likes.push(user);
      // remove dislike if present
      if (mineInDislikes) r.dislikes = r.dislikes.filter(u => u !== user);
    }
  } else {
    // toggle dislike
    if (mineInDislikes) {
      r.dislikes = r.dislikes.filter(u => u !== user);
    } else {
      r.dislikes.push(user);
      if (mineInLikes) r.likes = r.likes.filter(u => u !== user);
    }
  }

  map[bookId] = list;
  saveAllReviews(map);
  renderReviews(bookId);
}

/* -------------------------
   Add Review + Profile stats
--------------------------*/
function submitReview(bookId, stars, text) {
  const user = getCurrentUser();
  if (!user) return;

  const map = getAllReviews();
  const list = map[bookId] ?? [];

  list.push({
    id: `${bookId}-${user}-${Date.now()}`,
    user,
    stars: Number(stars),
    text,
    likes: [],
    dislikes: [],
    createdAt: Date.now(),
  });

  map[bookId] = list;
  saveAllReviews(map);
  updateProfile();
  renderReviews(bookId);
}

function countUniqueBooksReviewedBy(user) {
  const map = getAllReviews();
  const bookIds = Object.keys(map).map(k => Number(k));
  const unique = new Set();
  bookIds.forEach(id => {
    if ((map[id] || []).some(r => r.user === user)) unique.add(id);
  });
  return unique.size;
}

function badgeForCount(n) {
  if (n >= 50) return { name: "Platinum", cls: "platinum" };
  if (n >= 30) return { name: "Gold", cls: "gold" };
  if (n >= 20) return { name: "Silver", cls: "silver" };
  if (n >= 10) return { name: "Bronze", cls: "bronze" };
  return { name: "None", cls: "" };
}

function updateProfile() {
  const user = getCurrentUser();
  if (!user) return;
  profileUser.textContent = user;
  helloUser.textContent = `Hi, ${user}!`;
  const count = countUniqueBooksReviewedBy(user);
  reviewCount.textContent = String(count);
  const badge = badgeForCount(count);
  userBadge.textContent = badge.name;
  userBadge.className = `badge ${badge.cls}`.trim();
}

/* -------------------------
   Event Wiring
--------------------------*/
window.addEventListener("DOMContentLoaded", () => {
  // Seed reviews on first run
  ensureReviewStore();

  // Auth nav links
  document.getElementById("goLogin").addEventListener("click", (e) => {
    e.preventDefault(); show(loginPage);
  });
  document.getElementById("goSignup").addEventListener("click", (e) => {
    e.preventDefault(); show(signupPage);
  });

  // Signup
  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const u = document.getElementById("signupUser").value.trim();
    const p = document.getElementById("signupPass").value;
    if (!u || !p) return;
    const res = signup(u, p);
    if (!res.ok) { alert(res.msg); return; }
    // go to app
    show(appPage);
    switchToTab("profileTab");
    updateProfile();
    renderBooks();
  });

  // Login
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const u = document.getElementById("loginUser").value.trim();
    const p = document.getElementById("loginPass").value;
    const res = login(u, p);
    if (!res.ok) { alert(res.msg); return; }
    show(appPage);
    switchToTab("profileTab");
    updateProfile();
    renderBooks();
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    clearCurrentUser();
    show(loginPage);
  });

  // Tabs
  document.querySelectorAll(".tab").forEach(btn => {
    btn.addEventListener("click", () => {
      switchToTab(btn.dataset.tab);
    });
  });

  // Genre filter
  genreFilter.addEventListener("change", renderBooks);

  // Back from book page
  document.getElementById("backToBooks").addEventListener("click", () => {
    show(appPage);
    switchToTab("booksTab");
  });

  // Submit review
  document.getElementById("reviewForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const bookId = Number(bookPage.dataset.bookId);
    const stars = document.getElementById("reviewStars").value;
    const text = document.getElementById("reviewText").value.trim();
    if (!stars || !text) return;
    submitReview(bookId, stars, text);
    e.target.reset();
  });

  // Auto-login if user exists
  const current = getCurrentUser();
  if (current) {
    show(appPage);
    switchToTab("profileTab");
    updateProfile();
    renderBooks();
  } else {
    show(signupPage);
  }

  // Handle adding new book
document.getElementById("addBookForm").addEventListener("submit", function(e){
  e.preventDefault();
  const title = document.getElementById("newBookTitle").value.trim();
  const genre = document.getElementById("newBookGenre").value;

  if(!title || !genre) return;

  const newBook = {
    id: Date.now(),  // unique ID
    title: title,
    genre: genre
  };

  books.push(newBook); // add to books array
  localStorage.setItem("books", JSON.stringify(books)); // save in storage

  alert("📚 Book added successfully!");
  document.getElementById("addBookForm").reset();
  renderBooks(); // refresh book list
});
let books = JSON.parse(localStorage.getItem("books")) || [
  {id:1, title:"The Time Machine", genre:"Fiction"},
  {id:2, title:"Sapiens", genre:"Non-Fiction"},
  {id:3, title:"A Brief History of Time", genre:"Science"},
  {id:4, title:"The Art of War", genre:"History"},
  {id:5, title:"Harry Potter", genre:"Fantasy"},
  {id:6, title:"1984", genre:"Fiction"},
  {id:7, title:"Educated", genre:"Non-Fiction"},
  {id:8, title:"Cosmos", genre:"Science"},
  {id:9, title:"Guns, Germs, and Steel", genre:"History"},
  {id:10, title:"Lord of the Rings", genre:"Fantasy"}
];

});
