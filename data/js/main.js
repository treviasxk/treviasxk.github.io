import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyArxSt_UwqzzkVeEf9ANDEcDypTKEmpHDI",
    authDomain: "treviasxk-7bcea.firebaseapp.com",
    databaseURL: "https://treviasxk-7bcea-default-rtdb.firebaseio.com",
    projectId: "treviasxk-7bcea",
    storageBucket: "treviasxk-7bcea.appspot.com",
    messagingSenderId: "57991335902",
    appId: "1:57991335902:web:ea336e43d3eeffeeb3574f",
    measurementId: "G-NHNG5YZC8S"
};

window.onload = function(){
  includeHTML();
}


function LoadPost(id, content){
  initializeApp(firebaseConfig);
  const dbRef = ref(getDatabase());
  get(child(dbRef, `posts/` + id)).then((snapshot) => {
  if(snapshot.exists()) {
      document.title = snapshot.val().title;
      content.innerHTML = snapshot.val().content;
  } else {
      content.innerHTML = "<h1>Page not found.</h1>";
  }
  }).catch((error) => {
    console.error(error);
  });
}



//writeUserData("treviasxk@live.com");
function writeUserData(email) {
  const db = getDatabase();
  set(ref(db, 'emails/email'), {
    emails: email,
  });
}


function includeHTML() {
  var z, i, elmnt, file, title, xhttp;
  z = document.getElementsByTagName("*");
  for(i = 0; i < z.length; i++){
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");

    const urlParams = new URLSearchParams(window.location.search);
    let searchParams = new URLSearchParams(urlParams);
    if(searchParams.has("post") && file == "data/pages/home.html"){
      LoadPost(searchParams.get("post"), elmnt);
    }else{
      if(file){
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
          if (this.readyState == 4) {
            if (this.status == 200) {
                elmnt.innerHTML = this.responseText;
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
}