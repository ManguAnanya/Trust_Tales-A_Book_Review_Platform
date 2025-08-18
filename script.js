// Users
let users = [];
let currentUser = null;

// Genres
const genres = ["Love Triangles", "Romance", "Thriller", "Horror", "Fantasy", "Sci-Fi", "Mystery", "Biography", "Classics", "Education"];

// Books Data
const booksData = {
  "Love Triangles": [
    {title:"The Summer I Turned Pretty", author:"Jenny Han", readLink:"https://www.pdfdrive.com/the-summer-i-turned-pretty-e194538609.html", watchLink:"https://www.primevideo.com/detail/0MRYK4XMS4LMR1Z5TMCNEPZQXR", buyLink:"https://www.amazon.in/Summer-I-Turned-Pretty/dp/1416968296"},
    {title:"Never Have I Ever", author:"Mindy Kaling", readLink:"https://www.pdfdrive.com/never-have-i-ever-e194540000.html", watchLink:"https://www.netflix.com/title/80211991", buyLink:"https://www.amazon.in/Never-Have-Ever/dp/B09XYZ"},
    {title:"XO, Kitty", author:"Jenny Han", readLink:"https://www.pdfdrive.com/xo-kitty-e194540001.html", watchLink:"https://www.netflix.com/title/81405344", buyLink:"https://www.amazon.in/XO-Kitty/dp/123456"},
    {title:"True Beauty", author:"Yaongyeon", readLink:"https://www.webtoons.com/en/romance/true-beauty/list?title_no=1436", watchLink:"https://www.netflix.com/title/81417185", buyLink:"https://www.amazon.in/True-Beauty/dp/123456"},
    {title:"My Life With Walter Boys", author:"Ali Novak", readLink:"https://www.pdfdrive.com/my-life-with-walter-boys-e194540002.html", watchLink:"#", buyLink:"https://www.amazon.in/My-Life-With-Walter-Boys/dp/0062018125"},
    {title:"To All the Boys I’ve Loved Before", author:"Jenny Han", readLink:"https://www.pdfdrive.com/to-all-the-boys-ive-loved-before-e194540003.html", watchLink:"https://www.netflix.com/title/81012345", buyLink:"https://www.amazon.in/To-All-the-Boys-Ive-Loved-Before/dp/0143132049"},
    {title:"Dumplin’", author:"Julie Murphy", readLink:"https://www.pdfdrive.com/dumplin-e194540004.html", watchLink:"https://www.netflix.com/title/81076543", buyLink:"https://www.amazon.in/Dumplin/dp/0147514892"},
    {title:"The Selection", author:"Kiera Cass", readLink:"https://www.pdfdrive.com/the-selection-e194540005.html", watchLink:"#", buyLink:"https://www.amazon.in/The-Selection/dp/0062059940"},
    {title:"Anna and the French Kiss", author:"Stephanie Perkins", readLink:"https://www.pdfdrive.com/anna-and-the-french-kiss-e194540006.html", watchLink:"#", buyLink:"https://www.amazon.in/Anna-and-the-French-Kiss/dp/0147514024"},
    {title:"The Summer of Chasing Mermaids", author:"Sarah Ockler", readLink:"https://www.pdfdrive.com/the-summer-of-chasing-mermaids-e194540007.html", watchLink:"#", buyLink:"https://www.amazon.in/The-Summer-of-Chasing-Mermaids/dp/0062071243"}
  ],
  "Romance": [
    {title:"Bridgerton", author:"Julia Quinn", readLink:"#", watchLink:"https://www.netflix.com/title/80232398", buyLink:"https://www.amazon.in/Bridgerton/dp/1501111101"},
    {title:"Pride and Prejudice", author:"Jane Austen", readLink:"#", watchLink:"#", buyLink:"https://www.amazon.in/Pride-and-Prejudice/dp/1503290565"},
    {title:"Outlander", author:"Diana Gabaldon", readLink:"#", watchLink:"https://www.starz.com/us/en/series/0e1ee20d-4b14-4d08-a36c-c276e2583b07", buyLink:"https://www.amazon.in/Outlander/dp/0440212561"},
    {title:"The Notebook", author:"Nicholas Sparks", readLink:"#", watchLink:"#", buyLink:"https://www.amazon.in/The-Notebook/dp/0446605239"},
    {title:"Me Before You", author:"Jojo Moyes", readLink:"#", watchLink:"https://www.netflix.com/title/70153404", buyLink:"https://www.amazon.in/Me-Before-You/dp/0143124544"},
    {title:"A Court of Thorns and Roses", author:"Sarah J. Maas", readLink:"#", watchLink:"#", buyLink:"https://www.amazon.in/A-Court-of-Thorns-and-Roses/dp/1619634448"},
    {title:"The Kiss Quotient", author:"Helen Hoang", readLink:"#", watchLink:"#", buyLink:"https://www.amazon.in/The-Kiss-Quotient/dp/0451490800"},
    {title:"Twilight Saga", author:"Stephenie Meyer", readLink:"#", watchLink:"https://www.netflix.com/title/70143860", buyLink:"https://www.amazon.in/Twilight/dp/0316015849"},
    {title:"It Ends With Us", author:"Colleen Hoover", readLink:"#", watchLink:"#", buyLink:"https://www.amazon.in/It-Ends-With-Us/dp/1501110365"},
    {title:"The Fault in Our Stars", author:"John Green", readLink:"#", watchLink:"#", buyLink:"https://www.amazon.in/The-Fault-in-Our-Stars/dp/014242417X"}
  ]
};

// --- New feature data ---
let readLater = [];
let reviews = {};

// Render genres
const genresPage = document.getElementById("genresPage");
genres.forEach(g => {
  const card = document.createElement("div");
  card.className = "card";
  card.onclick = () => showBooks(g);
  card.innerHTML = `<img src="${g.toLowerCase().replace(' ','_')}.jpg" alt="${g}"><h3>${g}</h3>`;
  genresPage.appendChild(card);
});

// Show books of selected genre
function showBooks(genre) {
  document.getElementById("introPage").style.display = "none";
  document.getElementById("genresPage").style.display = "none";
  document.getElementById("booksPage").style.display = "block";
  document.getElementById("genreTitle").textContent = genre;

  const container = document.getElementById("booksContainer");
  container.innerHTML = "";
  booksData[genre].forEach(book => {
    const id = book.title.replace(/\s+/g,'-'); // safe id
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${genre.toLowerCase().replace(' ','_')}.jpg" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <a href="${book.readLink}" target="_blank">📖 Read Book</a>
      <a href="${book.watchLink}" target="_blank">🎬 Watch Series</a>
      <a href="${book.buyLink}" target="_blank">🛒 Buy Book</a>
      <button onclick="addToReadLater('${book.title}')">📌 Read Later</button>
      <button onclick="likeBook('${book.title}')">👍 Like</button>
      <button onclick="dislikeBook('${book.title}')">👎 Dislike</button>
      <textarea id="review-${id}" placeholder="Write a review..."></textarea>
      <button onclick="submitReview('${book.title}')">Submit Review</button>
      <div id="reviews-${id}" class="reviews"></div>
    `;
    container.appendChild(card);
  });
}

// Back to genres
function backToGenres() {
  document.getElementById("booksPage").style.display = "none";
  document.getElementById("settingsPage").style.display = "none"; // <-- NEW
  document.getElementById("genresPage").style.display = "grid";
  document.getElementById("introPage").style.display = "block";
}

// Intro to genres
function showGenres() {
  document.getElementById("introPage").style.display = "none";
  document.getElementById("genresPage").style.display = "grid";
}

// --- New Features ---

// Read Later
function addToReadLater(title) {
  if (!readLater.includes(title)) {
    readLater.push(title);
    alert(title + " added to Read Later!");
  }
}
function openSettings() {
  document.getElementById("genresPage").style.display = "none";
  document.getElementById("booksPage").style.display = "none";
  document.getElementById("introPage").style.display = "none";
  document.getElementById("settingsPage").style.display = "block";

  const list = document.getElementById("readLaterList");
  list.innerHTML = "";
  if (readLater.length === 0) {
    list.innerHTML = "<p>No books saved yet.</p>";
  } else {
    readLater.forEach(book => {
      const p = document.createElement("p");
      p.textContent = "📌 " + book;
      list.appendChild(p);
    });
  }

  // NEW: Add "Go back to Genres" button
  const backBtn = document.createElement("button");
  backBtn.textContent = "⬅ Back to Genres";
  backBtn.onclick = backToGenres;
  list.appendChild(backBtn);
}

// Likes
function likeBook(title) { alert("You liked " + title + "!"); }
function dislikeBook(title) { alert("You disliked " + title + "!"); }

// Reviews
function submitReview(title) {
  const id = title.replace(/\s+/g,'-');
  const input = document.getElementById(`review-${id}`);
  const text = input.value;
  if (text.trim() === "") return;
  if (!reviews[title]) reviews[title] = [];
  reviews[title].push(text);

  const div = document.getElementById(`reviews-${id}`);
  div.innerHTML = reviews[title].map(r => `<p>⭐ ${r}</p>`).join("");
  input.value = "";
}

// Login popup
function openLogin() { document.getElementById("loginPopup").style.display = "flex"; }
function closeLogin() { document.getElementById("loginPopup").style.display = "none"; }
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if(!username || !password){ alert("Enter username and password"); return; }
  let user = users.find(u => u.username===username);
  if(!user) user = {username,password,badge:"New"} , users.push(user);
  currentUser = user;
  alert("Logged in as "+currentUser.username);
  closeLogin();
}
