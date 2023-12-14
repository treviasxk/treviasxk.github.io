window.onload = function(){
  includeHTML();
}

function includeHTML() {
  var z, i, elmnt, file, title, xhttp;
  z = document.getElementsByTagName("*");
  var post = false;
  for(i = 0; i < z.length; i++){
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");
    if(file == "data/pages/home.html"){
      const urlParams = new URLSearchParams(window.location.search);
      let searchParams = new URLSearchParams(urlParams);
      if(searchParams.has("post")){
          post = true;
          file = "data/pages/posts/" + searchParams.get("post") + ".html";
      }
    }
    if(file){
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
              elmnt.innerHTML = this.responseText;
              if(post){
                  elmnt.innerHTML += '<p class="date">Last Modified: '+ document.lastModified +'</p>';
                  title = document.getElementById("title");
                  if(title)
                    document.title = title.innerText + " - " + document.title;
              }
          }
          if (this.status == 404) {elmnt.innerHTML = "<h1>Page not found.</h1>";}
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}