import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = "https://dfmkiesijkrlfgqovkgy.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmbWtpZXNpamtybGZncW92a2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2MDQzODgsImV4cCI6MjAxODE4MDM4OH0.hfyPYOMyU7udufL9syI17e8VOGs7swbfe4gPE54aWqI"
const supabase = createClient(supabaseUrl, supabaseKey)

window.onload = function(){
  includeHTML();
}


function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("div");
  for(i = 0; i < z.length; i++){
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");

    const urlParams = new URLSearchParams(window.location.search);
    let searchParams = new URLSearchParams(urlParams);

    if(searchParams.get("post") && file == "data/pages/home.html"){
      LoadPost(searchParams.get("post"), elmnt);
    }else{
    if(file){      console.log(file);
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "<h1>Page not found.</h1>";}
            includeHTML();
            elmnt.removeAttribute("w3-include-html");
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
  }
}

async function LoadPost(id, content){
  const { data } = await supabase
  .from('posts')
  .select()
  .eq('id', id);
  if(data[0]){
    document.title = data[0].title + " - " + document.title;
    content.innerHTML = "<h2>" + data[0].title + "</h2><hr/>";
    content.innerHTML += data[0].content;
    content.innerHTML += '<p class="date">Date: '+ data[0].date +'</p>'
  }else{
    content.innerHTML = "<h1>Page not found.</h1>";
  }
}