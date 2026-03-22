let isLoggedIn = false;
let selectedDay = null;

// DATA GIỐNG ẢNH
const events = {
    21: [
        {
            time: "19:00",
            title: "Concert Cực Hot",
            price: "500.000đ"
        },
        {
            time: "09:00",
            title: "Workshop Vẽ Pastel",
            price: "Miễn phí"
        }
    ]
};

// CLOCK
setInterval(() => {
    let now = new Date();
    document.getElementById("clock").innerText =
        now.toLocaleTimeString();
    document.getElementById("dateNow").innerText =
        now.toLocaleDateString("vi-VN");
}, 1000);

// CALENDAR
function renderCalendar() {
    let cal = document.getElementById("calendar");
    cal.innerHTML = "";

    for (let i = 1; i <= 31; i++) {
        let div = document.createElement("div");
        div.className = "day";
        div.innerText = i;

        if (events[i]) {
            let dot = document.createElement("div");
            dot.className = "dot";
            div.appendChild(dot);
        }

        div.onclick = () => selectDay(i, div);

        cal.appendChild(div);
    }
}

renderCalendar();

// SELECT DAY
function selectDay(day, el) {
    document.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
    el.classList.add("active");

    selectedDay = day;

    document.getElementById("selectedDate").innerText =
        `21/03/2026`.replace("21", day);

    let list = document.getElementById("eventList");
    list.innerHTML = "";

    if (!events[day]) {
        list.innerHTML = "Không có sự kiện";
        return;
    }

    events[day].forEach(e => {
        let card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <div class="event-time">${e.time}</div>
            <div class="event-title">${e.title}</div>
            <div>${e.price}</div>
            <button class="event-btn">CHI TIẾT & ĐẶT VÉ</button>
        `;

        card.onclick = () => openEvent(e);

        list.appendChild(card);
    });
}

// CLICK EVENT
function openEvent(e) {
    if (!isLoggedIn) {
        alert("Bạn cần đăng nhập!");
        return;
    }
    localStorage.setItem("event", JSON.stringify(e));
    window.location.href = "event.html";
}

// LOGIN
function login() {
    isLoggedIn = true;
    document.getElementById("userBox").innerHTML =
        "Alex Nguyen<br><small>Thành viên Kim cương</small>";
}