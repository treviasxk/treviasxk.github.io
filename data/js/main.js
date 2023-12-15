import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(supabaseUrl, supabaseKey)

window.onload = function(){
  includeHTML();
}


function includeHTML() {
  var z, i, elmnt, file;
  z = document.getElementsByTagName("div");
  for(i = 0; i < z.length; i++){
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");

    const urlParams = new URLSearchParams(window.location.search);
    let searchParams = new URLSearchParams(urlParams);

    if(searchParams.get("page") && file == "data/pages/home.html"){
      LoadPage(searchParams.get("page"), elmnt);
      return;
    }else
    if(searchParams.get("post") && file == "data/pages/home.html"){
      LoadPost(searchParams.get("post"), elmnt);
    }else{
    if(file){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
          if(this.readyState == 4) {
            if(this.status == 200) {
              elmnt.innerHTML = this.responseText;
              if(file == "data/pages/home.html")
                LoadAttribute(title);
            }
            if(this.status == 404) {elmnt.innerHTML = "<h1>Page not found.</h1>";}
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
}

async function LoadPage(page, content){
  var file = "data/pages/" + page + ".html";
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if(this.readyState == 4) {
      if(this.status == 200) {
        content.innerHTML = this.responseText;
        if(file == "data/pages/home.html")
          LoadAttribute(title);
      }
      if(this.status == 404) {content.innerHTML = "<h1>Page not found.</h1>";}
      content.removeAttribute("w3-include-html");
      includeHTML();
    }
  }
  xhttp.open("GET", file, true);
  xhttp.send();
}

async function LoadPost(id, content){
  content.removeAttribute("w3-include-html");
  const { data } = await supabase
  .from('posts')
  .select()
  .eq('id', id);
  if(data[0]){
    LoadAttribute(data[0].title + " - " + title);
    content.innerHTML = "<h2>" + data[0].title + "</h2><hr/>";
    content.innerHTML += data[0].content;
    content.innerHTML += '<p class="date">Date: '+ data[0].date +'</p>'
  }else{
    content.innerHTML = "<h1>Page not found.</h1>";
  }
}