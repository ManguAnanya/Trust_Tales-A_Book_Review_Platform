const users = JSON.parse(localStorage.getItem("users")) || {
  user1: { password: "password1", verified: false },
  verifiedUser: { password: "password2", verified: true }
};

const genres = {
  Fantasy: [
    {
      title: "Harry Potter",
      author: "J.K. Rowling",
      desc: "Wizarding world adventure.",
      poster: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
      read: "https://kvongcmehsanalibrary.wordpress.com/wp-content/uploads/2021/07/harrypotter.pdf",
      watch: "https://www.primevideo.com/region/eu/detail/0N8WYH0W6L7Q0ODHGQCHMMRH4R/ref=atv_dp_share_cu_r",
      buy: "https://www.amazon.in/Harry-Potter-ChildrenS-Paperback-Boxed/dp/1408856778/ref=sr_1_1?crid=3FTENYLUEBLO9&dib=eyJ2IjoiMSJ9.6sN-5KQvOIr7QMfidlR1qzr0h97M-aR6n92dBCs3fXXlHshqYftwnY-3B-iQla2siyE9VpCYLZgmi4uur3Gcfrktx-X23QBSfX8Xrj_0aq49i_4drgWK6qyPAUpZyX3FqhMkGfPpjb46csDpdFd6CtlaM0UcSQZ7AZD5m8v2L5YKMVhFrEntCW99BhGiFE3AuuKO0c5vDDqmaZFGJ7tIWzn8Hrhn0mI8Ew44gP3aGwA.X6QZaD9uoQDYkI8H3ko6TlxipRUVHzF0AF3L_EsAhLs&dib_tag=se&keywords=harry+potter+books+set+1-8&qid=1758597104&sprefix=harry+potter%2Caps%2C267&sr=8-1"
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      desc: "A hobbit’s epic adventure.",
      poster: "https://covers.openlibrary.org/b/id/6979861-L.jpg",
      read: "https://openlibrary.org",
      watch: "https://primevideo.com",
      buy: "https://amazon.in"
    },
    {
      title: "Percy Jackson",
      author: "Rick Riordan",
      desc: "Greek mythology modern twist.",
      poster: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
      read: "https://openlibrary.org",
      watch: "https://disneyplus.com",
      buy: "https://amazon.in"
    },
  ],
  Romance: [
    {
      title: "The Summer I Turned Pretty",
      author: "Jenny Han",
      desc: "A teen summer romance.",
      poster: "tsitp.jpg",
      read: "https://archive.org/details/the-summer-i-turned-pretty-all-book/mode/2up",
      watch: "https://www.primevideo.com/detail/0KAW4T6OOSAPQJVCFDCOXNLGJU",
      buy: "https://amzn.in/d/inZ4FEI"
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      desc: "Classic love & society tale.",
      poster: "https://covers.openlibrary.org/b/OLID/OL3700132M-L.jpg",
      read: "https://www.gutenberg.org/files/1342/1342-h/1342-h.htm",
      watch: "https://www.primevideo.com/detail/0J7Y9UVDPJYTG6TM5CJB3KQAA7",
      buy: "https://amzn.in/d/aVLSteE"
    },
    {
      title: "The Great Gatsby",
      author: "F.Scott Fitzgerald",
      desc: "A millionaire's desperate pursuit of a lost love exposes the emptiness of the American Dream. ",
      poster: "https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
      read: "https://www.gutenberg.org/ebooks/64317",
      watch: "https://www.justwatch.com/in/movie/the-great-gatsby",
      buy: "https://www.amazon.in/Great-Gatsby-F-Scott-Fitzgerald/dp/0743273567",
    },
  ],
  Horror: [
    {
      title: "Ghosts of The Silent Hills",
      author: "Anita Krishan",
      desc: "Spine-chilling true tales from haunted hills and forests.",
      poster: "https://m.media-amazon.com/images/I/91g4YHEkGkL._SL1500_.jpg",
      read: "https://fliphtml5.com/okrlz/vvlf/basic",
      buy: "https://amzn.in/d/04lYvxK"
    }
  ],
  Education: [
    {
      title: "The Alchemist",
      author: "Paulo Coelho",
      desc: "Shepherd finds his treasure at home after a long, wise Egyptian quest",
      poster: "https://covers.openlibrary.org/b/OLID/OL24261278M-L.jpg",
      read: "https://icrrd.com/public/media/15-05-2021-084550The-Alchemist-Paulo-Coelho.pdf",
      buy: "https://amzn.in/d/eq3r0NV"
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      desc: "Practical guide on building good habits and breaking bad ones.",
      poster: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
      read: "https://archive.org/details/atomic-habits_202003",
      buy: "https://amzn.in/d/f0YkMwn"
    },
    {
      title: "The Catcher in the Rye",
      author: "J. D. Salinger",
      desc: "Teenage angst and alienation narrated by a young man in New York City.",
      poster: "https://covers.openlibrary.org/b/OLID/OL7822241M-L.jpg",
      read: "https://archive.org/details/catcherintherye_1951_salinger",
      buy: "https://amzn.in/d/1aC0eT2"
    },
    {
      title: "The Road",
      author: "Cormac McCarthy",
      desc: "A father and his son travel through a post-apocalyptic landscape, struggling to survive.",
      poster: "https://covers.openlibrary.org/b/OLID/OL26328791M-L.jpg",
      read: "https://archive.org/details/theroad_2010_mcCarthy",
      buy: "https://amzn.in/d/0yL3xGZ"
    },
   
  ],
  Adventure: [
    {
      title: "Treasure Island",
      author: "Robert Louis Stevenson",
      desc: "A swashbuckling tale of pirates and buried treasure.",
      poster: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
      read: "https://www.gutenberg.org/files/120/120-h/120-h.htm",
      buy: "https://amzn.in/d/3yEpBLF"
    },
    {
      title: "Journey to the Center of the Earth",
      author: "Jules Verne",
      desc: "A daring expedition deep beneath the earth’s crust.",
      poster: "https://covers.openlibrary.org/b/id/8773276-L.jpg",
      read: "https://www.gutenberg.org/files/3748/3748-h/3748-h.htm",
      buy: "https://amzn.in/d/5Mi4Awg"
    },
    {
      title: "Robinson Crusoe",
      author: "Daniel Defoe",
      desc: "The ultimate survival story of a castaway stranded on an island.",
      poster: "https://covers.openlibrary.org/b/id/8231886-L.jpg",
      read: "https://www.gutenberg.org/files/521/521-h/521-h.htm",
      buy: "https://amzn.in/d/4itns5J"
    },
    {
      title: "Life of Pi",
      author: "Yann Martel",
      desc: "A boy stranded at sea with a Bengal tiger on a lifeboat.",
      poster: "https://covers.openlibrary.org/b/id/8225636-L.jpg",
      read: "https://archive.org/details/lifeofpi0000mart",
      buy: "https://amzn.in/d/2YV4w0g"
    },
    {
      title: "The Call of the Wild",
      author: "Jack London",
      desc: "A sled dog’s struggle for survival in the Yukon wilderness.",
      poster: "https://covers.openlibrary.org/b/id/8232009-L.jpg",
      read: "https://www.gutenberg.org/files/215/215-h/215-h.htm",
      buy: "https://amzn.in/d/2rIfjJ0"
    },
    {
      title: "Around the World in Eighty Days",
      author: "Jules Verne",
      desc: "Phileas Fogg wagers he can circumnavigate the globe in 80 days.",
      poster: "https://covers.openlibrary.org/b/id/8232472-L.jpg",
      read: "https://www.gutenberg.org/files/103/103-h/103-h.htm",
      buy: "https://amzn.in/d/4mVZPmz"
    }
  ],
  Mystery: [
    {
      title: "The Hound of the Baskervilles",
      author: "Arthur Conan Doyle",
      desc: "Sherlock Holmes and Dr. Watson investigate a family curse on the moors of Devonshire.",
      poster: "https://covers.openlibrary.org/b/id/8228328-L.jpg",
      read: "https://www.gutenberg.org/files/2852/2852-h/2852-h.htm",
      buy: "https://amzn.in/d/6w3YjzP"
    },
    {
      title: "Gone Girl",
      author: "Gillian Flynn",
      desc: "A modern psychological thriller about the disappearance of Amy Dunne.",
      poster: "https://covers.openlibrary.org/b/id/8234517-L.jpg",
      read: "https://archive.org/details/gone-girl-gillian-flynn",
      buy: "https://amzn.in/d/3Lb0fIh"
    },
    {
      title: "The Da Vinci Code",
      author: "Dan Brown",
      desc: "A symbologist uncovers hidden codes within famous artworks while investigating a murder.",
      poster: "https://covers.openlibrary.org/b/id/240726-L.jpg",
      read: "https://archive.org/details/davincicode00brow",
      buy: "https://amzn.in/d/0ZsG1iT"
    },
    {
      title: "And Then There Were None",
      author: "Agatha Christie",
      desc: "Ten strangers are invited to an isolated island, only to be murdered one by one.",
      poster: "https://covers.openlibrary.org/b/id/8231996-L.jpg",
      read: "https://archive.org/details/in.ernet.dli.2015.185344",
      buy: "https://amzn.in/d/4cI32vQ"
    }
  ],
  Science: [
    {
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      desc: "Explores the nature of the universe, black holes, and the concept of time itself.",
      poster: "https://covers.openlibrary.org/b/id/240726-L.jpg",
      read: "https://archive.org/details/briefhistoryofti00step",
      buy: "https://amzn.in/d/0wC4E3o"
    },
    {
      title: "The Selfish Gene",
      author: "Richard Dawkins",
      desc: "A groundbreaking work that explains evolution from the perspective of genes.",
      poster: "https://covers.openlibrary.org/b/id/240726-L.jpg",
      read: "https://archive.org/details/selfishgene00dawk",
      buy: "https://amzn.in/d/9D3tS8o"
    },
    {
      title: "Cosmos",
      author: "Carl Sagan",
      desc: "A journey through the universe, science, and the human spirit of discovery.",
      poster: "https://covers.openlibrary.org/b/id/9259255-L.jpg",
      read: "https://archive.org/details/cosmoscarl00saga",
      buy: "https://amzn.in/d/0WkN8Xi"
    },
    {
      title: "On the Origin of Species",
      author: "Charles Darwin",
      desc: "The foundation of evolutionary biology, introducing the theory of natural selection.",
      poster: "https://covers.openlibrary.org/b/id/8231859-L.jpg",
      read: "https://www.gutenberg.org/files/2009/2009-h/2009-h.htm",
      buy: "https://amzn.in/d/0IdvDkM"
    },
    {
      title: "The Gene: An Intimate History",
      author: "Siddhartha Mukherjee",
      desc: "An exploration of the history, power, and potential of genetics.",
      poster: "https://covers.openlibrary.org/b/id/8232415-L.jpg",
      read: "https://archive.org/details/geneintimatehist0000mukh",
      buy: "https://amzn.in/d/2YWuwnp"
    },
    {
      title: "Astrophysics for People in a Hurry",
      author: "Neil deGrasse Tyson",
      desc: "An accessible introduction to the wonders of the universe.",
      poster: "https://covers.openlibrary.org/b/id/8232311-L.jpg",
      read: "https://archive.org/details/astrophysicsforp0000tyso",
      buy: "https://amzn.in/d/3kRzvjP"
    }
  ],
  Poetry: [
    {
      title: "The Sun and Her Flowers",
      author: "Rupi Kaur",
      desc: "A collection of poems about grief, self-abandonment, honoring roots, love, and empowerment.",
      poster: "https://covers.openlibrary.org/b/id/10918195-L.jpg",
      read: "https://archive.org/details/sun-her-flowers-rupi-kaur",
      buy: "https://amzn.in/d/0hGZnQd"
    },
    {
      title: "Milk and Honey",
      author: "Rupi Kaur",
      desc: "A collection of poetry about survival, love, loss, trauma, healing, and femininity.",
      poster: "https://covers.openlibrary.org/b/id/9251925-L.jpg",
      read: "https://archive.org/details/milk-honey-rupi-kaur",
      buy: "https://amzn.in/d/1o3P7O2"
    },
    {
      title: "Leaves of Grass",
      author: "Walt Whitman",
      desc: "A landmark in American poetry celebrating nature, love, friendship, and the human spirit.",
      poster: "https://covers.openlibrary.org/b/id/10548656-L.jpg",
      read: "https://www.gutenberg.org/files/1322/1322-h/1322-h.htm",
      buy: "https://amzn.in/d/7tRh5aP"
    },
    {
      title: "The Waste Land and Other Poems",
      author: "T. S. Eliot",
      desc: "One of the most important poems of the 20th century, exploring disillusionment and renewal.",
      poster: "https://covers.openlibrary.org/b/id/8232801-L.jpg",
      read: "https://archive.org/details/wastelandotherpo00elio",
      buy: "https://amzn.in/d/6p7d8Zf"
    },
    {
      title: "The Essential Rumi",
      author: "Rumi",
      desc: "A collection of mystical poems by the 13th-century Persian poet, celebrating love and spiritual longing.",
      poster: "https://covers.openlibrary.org/b/id/9251120-L.jpg",
      read: "https://archive.org/details/essentialrumi0000rumi",
      buy: "https://amzn.in/d/0p8c7Uu"
    }
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
      <img class="poster" src="${book.poster}" alt="${book.title}"
           onerror="this.onerror=null;this.src='https://covers.openlibrary.org/b/id/10909258-L.jpg';">
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
    el.innerHTML = `<img class="thumb" src="${item.poster}" alt="${item.title}" 
      onerror="this.onerror=null;this.src='https://covers.openlibrary.org/b/id/10909258-L.jpg';"> 
      <strong>${item.title}</strong> &nbsp; 
      <button onclick="openBookFromSaved('${escapeHtml(item.title)}')" class="ghost">Open</button> 
      <button onclick="removeSaved('${escapeHtml(item.title)}')" class="ghost">Remove</button>`;
    container.appendChild(el);
  });
}

function openBookFromSaved(title) {
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
  const poster = document.getElementById("posterPreview").src;

  if (!title || !author) {
    alert("Please enter at least a title and an author.");
    return;
  }

  // Build book card
  const bookCard = document.createElement("div");
  bookCard.className = "book-card";

  bookCard.innerHTML = `
    <img src="${poster || 'placeholder.png'}" alt="${title}" class="book-poster"/>
    <div class="book-info">
      <h3>${title}</h3>
      <p class="author">by ${author}</p>
      <p class="desc">${desc || "No description provided."}</p>
      <div class="book-links">
        ${read ? `<a href="${read}" target="_blank">📖 Read</a>` : ""}
        ${watch ? `<a href="${watch}" target="_blank">🎬 Watch</a>` : ""}
        ${buy ? `<a href="${buy}" target="_blank">🛒 Buy</a>` : ""}
      </div>
    </div>
  `;

  // Append to "Saved" section
  document.querySelector("#savedSection .saved").appendChild(bookCard);

  // Optional: give XP for gamification
  if (typeof updateXP === "function") {
    updateXP(20); // +20 XP for adding a book
  }

  // Reset form
  document.getElementById("bookTitle").value = "";
  document.getElementById("bookAuthor").value = "";
  document.getElementById("bookDesc").value = "";
  document.getElementById("bookRead").value = "";
  document.getElementById("bookWatch").value = "";
  document.getElementById("bookBuy").value = "";
  document.getElementById("posterPreview").src = "";

  alert("Book added successfully! 🎉");
  showSaved(); // switch to Saved section
}

function pushNewBook(title, author, desc, read, watch, buy, poster) {
  genres.Fantasy.push({ title, author, desc, read, watch, buy, poster });
  alert("Book added successfully!");
  ["bookTitle","bookAuthor","bookDesc","bookRead","bookWatch","bookBuy"].forEach(id => { if(document.getElementById(id)) document.getElementById(id).value = ""; });
  document.getElementById("posterPreview").src = "";
  showGenres();
}

// --- Poster preview ---
function previewPoster(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      document.getElementById("posterPreview").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
// --- Save & Reviews ---
function saveBook(title, poster) {
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

// Example XP & badges system
let profile = {
  xp: 0,
  badges: []
};

const badgeCatalog = [
  { id: "starter", label: "🌱", title: "Starter", unlockAt: 0 },
  { id: "reader", label: "📖", title: "Avid Reader", unlockAt: 100 },
  { id: "contributor", label: "✍️", title: "Contributor", unlockAt: 250 },
  { id: "curator", label: "📚", title: "Curator", unlockAt: 500 },
  { id: "legend", label: "🔥", title: "Legend", unlockAt: 1000 }
];

// Render badges
function renderBadges() {
  const container = document.getElementById("badgeContainer");
  container.innerHTML = "";
  badgeCatalog.forEach(b => {
    const earned = profile.xp >= b.unlockAt;
    const div = document.createElement("div");
    div.className = "badge " + (earned ? "" : "locked");
    div.title = b.title + (earned ? "" : " (Locked)");
    div.textContent = b.label;
    container.appendChild(div);
  });
}


// Update XP progress
function updateXP(xpToAdd = 0) {
  profile.xp += xpToAdd;
  const bar = document.getElementById("xpBar");
  const text = document.getElementById("xpText");

  let maxXP = 100;
  while (profile.xp >= maxXP) maxXP *= 2; // scaling levels

  bar.style.width = `${(profile.xp / maxXP) * 100}%`;
  text.textContent = `${profile.xp} / ${maxXP} XP`;

  renderBadges();
}

// Example: give XP when user adds a book
function addBook() {
  // your existing addBook logic...
  updateXP(20); // +20 XP for adding a book
}
// small utility
function escapeHtml(str){
  return String(str).replace(/'/g,"\\'").replace(/"/g,'\\"');
}
function openFeaturedBook(title) {
  for (let g in genres) {
    const book = genres[g].find(b => b.title === title);
    if (book) {
      showBooks(g); // go to that genre section

      // highlight the book card
      setTimeout(() => {
        const cards = document.querySelectorAll(".books .card h4");
        cards.forEach(el => {
          if (el.textContent === title) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.parentElement.classList.add("highlight");
            setTimeout(() => el.parentElement.classList.remove("highlight"), 2000);
          }
        });
      }, 300);

      return;
    }
  }
  alert(`Book "${title}" not found in genres.`);
}
function renderSaved() {
  const savedContainer = document.querySelector(".saved");
  savedContainer.innerHTML = "";

  if (savedBooks.length === 0) {
    savedContainer.innerHTML = "<p>No books saved yet.</p>";
    return;
  }

  savedBooks.forEach((book, index) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h4>${book.title}</h4>
      <p>by ${book.author}</p>
      <button onclick="removeSaved(${index})" class="remove-btn">❌ Remove</button>
    `;
    savedContainer.appendChild(div);
  });
}
function removeSaved(index) {
  savedBooks.splice(index, 1); // remove from array
  localStorage.setItem("savedBooks", JSON.stringify(savedBooks)); // update storage
  renderSaved(); // re-render the list
}