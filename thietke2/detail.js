const data = JSON.parse(localStorage.getItem("eventDetail"));

if (data) {
  document.getElementById("detailTitle").innerText = data.title;
  document.getElementById("detailDesc").innerText = data.desc;
  document.getElementById("detailDate").innerText = data.date;
  document.getElementById("detailLocation").innerText = data.location;
  document.getElementById("detailPrice").innerText = data.price;
  document.getElementById("detailImg").src = data.img;
}