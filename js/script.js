const button = document.querySelector("#button");
button.addEventListener('openNav', addclose);

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}



/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}
window.onload = function() {
  currentYear();
};

function currentYear(){
  const date = new Date();
  const autoDate = document.querySelector('#autoDate');
  autoDate.textContent = date.getFullYear();
};

function addclose(e){
  this.onclickList.remove(openNav);
  this.onclickList.add(closeNav);
}
