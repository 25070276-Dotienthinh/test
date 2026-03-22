let currentDate = new Date();
let isLoggedIn = false;

// CLOCK
setInterval(()=>{
    let now = new Date();
    clock.innerText = now.toLocaleTimeString();
    dateNow.innerText = now.toLocaleDateString("vi-VN");
},1000);

// DATA EVENT
const events = {
    "2026-3-21":[
        {time:"19:00", title:"Concert", price:"500k"}
    ]
};

// CALENDAR
function renderCalendar(){
    let cal = document.getElementById("calendar");
    cal.innerHTML="";

    let y = currentDate.getFullYear();
    let m = currentDate.getMonth();

    monthYear.innerText = `Tháng ${m+1}/${y}`;

    let first = new Date(y,m,1).getDay();
    if(first===0) first=7;

    let total = new Date(y,m+1,0).getDate();

    for(let i=1;i<first;i++){
        cal.innerHTML += "<div></div>";
    }

    for(let i=1;i<=total;i++){
        let d = document.createElement("div");
        d.className="day";
        d.innerText=i;

        d.onclick=()=>selectDay(i,m,y,d);

        cal.appendChild(d);
    }
}

renderCalendar();

function prevMonth(){
    currentDate.setMonth(currentDate.getMonth()-1);
    renderCalendar();
}

function nextMonth(){
    currentDate.setMonth(currentDate.getMonth()+1);
    renderCalendar();
}

// SELECT DAY
function selectDay(day,m,y,el){
    document.querySelectorAll(".day").forEach(d=>d.classList.remove("active"));
    el.classList.add("active");

    selectedDate.innerText = `${day}/${m+1}/${y}`;
}

// LOGIN UI
function openModal(){ modal.style.display="flex"; }
function showRegister(){ loginForm.style.display="none"; registerForm.style.display="block"; }
function showLogin(){ loginForm.style.display="block"; registerForm.style.display="none"; }

// API LOGIN
async function handleRegister(){
    let username = regUser.value;
    let password = regPass.value;

    await fetch("http://localhost:3000/register",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({username,password})
    });

    alert("Đăng ký thành công");
    showLogin();
}

async function handleLogin(){
    let username = loginUser.value;
    let password = loginPass.value;

    let res = await fetch("http://localhost:3000/login",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({username,password})
    });

    if(res.status!==200){
        alert("Sai tài khoản");
        return;
    }

    let data = await res.json();

    isLoggedIn = true;
    userBox.innerHTML = `<b>${data.username}</b>`;
    modal.style.display="none";
}