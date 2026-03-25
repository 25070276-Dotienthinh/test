const events = [
  {
    title: "Concert Sơn Tùng",
    desc: "Show âm nhạc cực đỉnh",
    img: "https://picsum.photos/300/200?1",
    category: "Âm nhạc",
    date: "2026-04-15",
    location: "Hà Nội",
    price: "500.000đ"
  },
  {
    title: "Workshop Marketing",
    desc: "Học marketing",
    img: "https://picsum.photos/300/200?2",
    category: "Hội thảo",
    date: "2026-04-10",
    location: "TP.HCM",
    price: "200.000đ"
  },
  {
    title: "Tech Conference",
    desc: "Sự kiện công nghệ",
    img: "https://picsum.photos/300/200?3",
    category: "Công nghệ",
    date: "2026-04-12",
    location: "Hà Nội",
    price: "Miễn phí"
  },
  {
    title: "Vé BlackPink",
    desc: "Vé bán lại giá tốt",
    img: "https://picsum.photos/300/200?4",
    category: "Vé bán lại",
    date: "2026-04-20",
    location: "TP.HCM",
    price: "1.200.000đ"
  }
];

let currentCategory = "all";

// RENDER
function renderEvents(category = "all") {
  currentCategory = category;
  applyFilters();
}

// FILTER
function applyFilters() {
  const date = document.getElementById("filterDate").value;
  const location = document.getElementById("filterLocation").value;

  let filtered = events;

  if (currentCategory !== "all") {
    filtered = filtered.filter(e => e.category === currentCategory);
  }

  if (date) {
    filtered = filtered.filter(e => e.date === date);
  }

  if (location) {
    filtered = filtered.filter(e => e.location === location);
  }

  renderList(filtered);
}

// HIỂN THỊ
function renderList(data) {
  const list = document.getElementById("eventList");
  list.innerHTML = "";

  if (data.length === 0) {
    list.innerHTML = "<p>Không có sự kiện</p>";
    return;
  }

  data.forEach(e => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-img">
        <img src="${e.img}">
        <span class="tag">${e.category}</span>
      </div>

      <div class="info">
        <h4>${e.title}</h4>
        <p class="meta">📅 ${e.date}</p>
        <p class="meta">📍 ${e.location}</p>

        <div class="bottom">
          <span class="price">${e.price}</span>
          <button class="buy-btn">Xem</button>
        </div>
      </div>
    `;

    card.onclick = () => {
    localStorage.setItem("eventDetail", JSON.stringify(e));
    window.location.href = "detail.html";
    };

    list.appendChild(card);
  });
}

// MODAL
function openModal(t, d) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("title").innerText = t;
  document.getElementById("desc").innerText = d;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// LOGIN
function openLogin() {
  document.getElementById("login").style.display = "block";
}

function closeLogin() {
  document.getElementById("login").style.display = "none";
}

// NAVBAR
function openCreateEvent() {
  alert("Chức năng demo");
}

function openMyTickets() {
  alert("Cần backend 😄");
}

// LOAD
renderEvents();