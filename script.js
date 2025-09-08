// Genres & Books
const genres = {
  Fantasy: [
    {title: "Harry Potter", author: "J.K. Rowling", desc: "Wizarding world adventure.", poster: "https://covers.openlibrary.org/b/id/7984916-L.jpg", read: "https://openlibrary.org", watch: "https://primevideo.com", buy: "https://amazon.in"},
    {title: "Percy Jackson", author: "Rick Riordan", desc: "Greek mythology modern twist.", poster: "https://covers.openlibrary.org/b/id/8231856-L.jpg", read: "https://openlibrary.org", watch: "https://disneyplus.com", buy: "https://amazon.in"},
    {title: "The Hobbit", author: "J.R.R. Tolkien", desc: "A hobbit’s epic adventure.", poster: "https://covers.openlibrary.org/b/id/6979861-L.jpg", read: "https://openlibrary.org", watch: "https://primevideo.com", buy: "https://amazon.in"},
  ],
  Romance: [
    {title: "The Summer I Turned Pretty", author: "Jenny Han", desc: "A teen summer romance.", poster: "https://i.pinimg.com/736x/8a/29/ca/8a29cadab2d4329ac929388160296408.jpg", read: "https://archive.org/details/the-summer-i-turned-pretty-all-book/mode/2up", watch: "https://www.primevideo.com/region/eu/detail/0KAW4T6OOSAPQJVCFDCOXNLGJU/ref=atv_dp_share_cu_r", buy: "https://amzn.in/d/inZ4FEI"},
    {title: "Pride and Prejudice", author: "Jane Austen", desc: "Classic love & society tale.", poster: "https://i.pinimg.com/736x/47/b5/47/47b547ad30201ad69099c2cb6faff682.jpg", read: "https://publicdomainlibrary.org/en/ebooks/pride-prejudice?gad_source=1&gad_campaignid=22461318658&gbraid=0AAAAA_TPsDgpP9Jxr4e1abU2phNd09gKG&gclid=Cj0KCQjw8KrFBhDUARIsAMvIApZva8DMqBq3ud7-HPbX_OrWGYiu53HQifP8TFqPx_UYwSWaNMU_058aAkWXEALw_wcB#formats", watch: "https://www.primevideo.com/region/eu/detail/0J7Y9UVDPJYTG6TM5CJB3KQAA7/ref=atv_dp_share_cu_r", buy: "https://amzn.in/d/aVLSteE"},
    {title: "Me Before You", author: "Jojo Moyes", desc: "Heartbreaking modern romance.", poster: "https://i.pinimg.com/736x/eb/b7/5c/ebb75c0537592386b579e672ac0b545f.jpg", read: "https://icrrd.com/public/media/14-05-2021-091024Me-Before-You.pdf", watch: "https://www.primevideo.com/region/eu/detail/0KEL156SFVHYA27IZCVBP04Q7J/ref=atv_dp_share_cu_r", buy: "https://amzn.in/d/cVffzpI"},
  ],
  Horror: [
    {title: "Ghosts of The Silent Hills: Stories based on true hauntings", author: "Anita Krishan", desc: "Ghosts of the Silent Hills: spine-chilling true tales from haunted hills and forests.", poster:"https://m.media-amazon.com/images/I/91g4YHEkGkL._SL1500_.jpg" ,read: "https://fliphtml5.com/okrlz/vvlf/basic",buy: "https://amzn.in/d/04lYvxK" },
  ],
  Education: [
    {title: "The Alchemist", author: "Paulo Coelho", desc: "Shepherd finds his treasure at home after a long, wise Egyptian quest", poster:"https://m.media-amazon.com/images/I/81ZtAPCqyGL._UF1000,1000_QL80_.jpg", read: "https://icrrd.com/public/media/15-05-2021-084550The-Alchemist-Paulo-Coelho.pdf", buy:"https://amzn.in/d/eq3r0NV"},
  ]
};

let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || [];
let reviews = JSON.parse(localStorage.getItem("reviews")) || {};
let currentUser = "";

// Login
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (!user || !pass) return alert("Enter username & password");

  currentUser = user;
  localStorage.setItem("currentUser", user);

  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("mainPage").classList.remove("hidden");
  document.getElementById("profileName").textContent = user;
  showHome();
}

function logout() {
  document.getElementById("loginPage").classList.remove("hidden");
  document.getElementById("mainPage").classList.add("hidden");
}

// Show sections
function showHome() { hideAll(); document.getElementById("homeSection").classList.remove("hidden"); }
function showGenres() {
  hideAll();
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
  hideAll();
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
      <button onclick="window.open('${book.read}')">Read</button>
      <button onclick="window.open('${book.watch}')">Watch</button>
      <button onclick="window.open('${book.buy}')">Buy</button>
      <button onclick="saveBook('${book.title}')">Save</button>
      <button onclick="writeReview('${book.title}')">✍ Review</button>
      <button onclick="readReviews('${book.title}')">📖 Reviews</button>
    `;
    container.appendChild(card);
  });
}

function showSaved() {
  hideAll();
  document.getElementById("savedSection").classList.remove("hidden");
  const container = document.querySelector(".saved");
  container.innerHTML = savedBooks.map(b => `<p>📌 ${b}</p>`).join("");
}
function showAddBook() { hideAll(); document.getElementById("addBookSection").classList.remove("hidden"); }
function showSettings() { hideAll(); document.getElementById("settingsSection").classList.remove("hidden"); }
function hideAll() { document.querySelectorAll("section").forEach(sec => sec.classList.add("hidden")); document.getElementById("mainPage").classList.remove("hidden"); }

// Add Book
function addBook() {
  const title = document.getElementById("bookTitle").value;
  const author = document.getElementById("bookAuthor").value;
  const desc = document.getElementById("bookDesc").value;
  const read = document.getElementById("bookRead").value;
  const watch = document.getElementById("bookWatch").value;
  const buy = document.getElementById("bookBuy").value;
  const posterFile = document.getElementById("bookPoster").files[0];
  let posterURL = "https://via.placeholder.com/200x300?text=Book";
  if (posterFile) posterURL = URL.createObjectURL(posterFile);
  genres["Fantasy"].push({title, author, desc, read, watch, buy, poster: posterURL});
  alert("Book added!");
  showGenres();
}
function previewPoster(e) { document.getElementById("posterPreview").src = URL.createObjectURL(e.target.files[0]); }

// Save
function saveBook(title) {
  if (!savedBooks.includes(title)) savedBooks.push(title);
  localStorage.setItem("savedBooks", JSON.stringify(savedBooks));
  alert("Saved!");
}

// Reviews
function writeReview(title) {
  const review = prompt(`Write a review for ${title}:`);
  if (!review) return;
  if (!reviews[title]) reviews[title] = [];
  reviews[title].push(`${currentUser}: ${review}`);
  localStorage.setItem("reviews", JSON.stringify(reviews));
}
function readReviews(title) {
  const list = reviews[title] || [];
  alert(list.length ? list.join("\n") : "No reviews yet.");
}
