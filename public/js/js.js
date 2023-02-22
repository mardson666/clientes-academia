function sumir() {
  var x = document.getElementById("card");
  var y = document.getElementById('form')
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
  } else {
    x.style.display = "none";
    y.style.display = "block";
  }
};