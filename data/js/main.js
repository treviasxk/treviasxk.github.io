import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase = createClient(supabaseUrl, supabaseKey)

window.onload = function(){
  includeHTML();
}


function includeHTML() {
  var z, i, content, page;
  z = document.getElementsByTagName("div");
  for(i = 0; i < z.length; i++){
    content = z[i];
    page = content.getAttribute("w3-include-html");

    const urlParams = new URLSearchParams(window.location.search);
    let searchParams = new URLSearchParams(urlParams);

    if(searchParams.get("post"))
      if(page == "data/layout/appbar.html")
        page = "data/layout/appbar_backpage.html";

    if(searchParams.get("page") && page == "data/pages/home.html"){
      LoadPage(searchParams.get("page"), content);
      return;
    }else
    if(searchParams.get("post") && page == "data/pages/home.html"){
      LoadPost(searchParams.get("post"), content);
    }else{
    if(page){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
          if(this.readyState == 4) {
            var elmnt = content.parentNode;
            if(this.status == 200){
              content.innerHTML = this.responseText;
              if(page == "data/pages/home.html"){
                SelectMenuItem("home");
                LoadAttribute(title);
              }
            }
            if(this.status == 404) {content.innerHTML = "<h1>Page not found.</h1>";}
            for(const child of content.childNodes)
              elmnt.appendChild(child.cloneNode(true));
            content.remove();
      
            includeHTML();
          }
        }
        xhttp.open("GET", page, true);
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
      var elmnt = content.parentNode;
      if(this.status == 200) {

        content.innerHTML = this.responseText;

        SelectMenuItem(page);
        LoadAttribute(page);


        const urlParams = new URLSearchParams(window.location.search);
        let searchParams = new URLSearchParams(urlParams);
        if(searchParams.get("post")){
          if(elmnt)
            elmnt.setAttribute("class", "SlideLeft");
        }
      }
      if(this.status == 404) {content.innerHTML = "<h1>Page not found.</h1>";}

      for(const child of content.childNodes)
        elmnt.appendChild(child.cloneNode(true));
      content.remove();


      includeHTML();
    }
  }
  xhttp.open("GET", file, true);
  xhttp.send();
}

function SelectMenuItem(page){
  var navigate = document.querySelectorAll('.MenuItem');
  for(const child of navigate)
    if(child.getAttribute("href") == "?page=" + page || child.getAttribute("href") == "/" && page == "home")
      child.setAttribute("class", "MenuItemSeleteced");
}

async function LoadPost(id, content){
  content.removeAttribute("w3-include-html");
  const { data } = await supabase
  .from('posts')
  .select()
  .eq('id', id);
  if(data[0]){
    LoadAttribute(data[0].title);
    content.innerHTML = '<div class="Feed"><div class="Card">' + data[0].content + '<p class="CardDateTime">Date: '+ data[0].date + '</p></div></div>';
  }else{
    content.innerHTML = "<h1>Page not found.</h1>";
  }
}