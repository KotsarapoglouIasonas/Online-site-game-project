function hideshow(id,bid) {
  var d = document.getElementById(id);
  var b = document.getElementById(bid);
  if (d.style.display === "none") {
    d.style.display = "block";
    b.setAttribute("src","images/down_icon.png");
  } else {
    d.style.display = "none";
    b.setAttribute("src","images/right_icon.png");
  }
  

}