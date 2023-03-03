function sumir() {
  var x = document.getElementById("table");
  var y = document.getElementById('form');
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
    
    document.getElementById('mudar').innerHTML = "cadastrar medição"
  } else {
    x.style.display = "none";
    y.style.display = "block";
    document.getElementById('mudar').innerHTML = "Ver medição"
  }
};
function mudar(){
  var x = document.getElementById("table");
  var y = document.getElementById('update');
 
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "none";
   
  }else {
    x.style.display = "none";
    y.style.display = "block";
  }
}