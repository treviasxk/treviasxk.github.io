/*
    Software Developed by Trevias Xk
    Social Networks:     treviasxk
    Github:              https://github.com/treviasxk
    Paypal:              trevias@live.com
*/


// Rederict to /
const params = window.location.search;
const path = window.location.pathname;
if(path == "/index.html")
    window.location.href= "/" + params;


var Loading = true;
supabase = null;
toastTimer = null;
supabaseUser = null;
ChangeTitle(title);


async function login(){
    if(Email && Password && Submit){
        if(Email.value == "" || Password.value == "")
            ShowToast("Please fill in all required fields");
        else{
            Email.disabled = true;
            Password.disabled = true;
            Submit.disabled = true;

            const { data, error } = await supabase.auth.signInWithPassword({
                email: Email.value,
                password: Password.value,
            })
            if(error == null){
                window.location.href='/';
            }else{
                Email.disabled = false;
                Password.disabled = false;
                Submit.disabled = false;
                Password.value = "";
                ShowToast("Username or password incorrect!");
            }
        }
    }
}


function ShowToast(text){
    clearInterval(toastTimer);
    if(Alert){
        Alert.style.visibility = "visible";
        Alert.innerText = text;
        Alert.style.opacity = "1";
    }
    toastTimer = setInterval(function (){
        Alert.style.opacity = "0";
        Alert.style.visibility = "hidden";
        clearInterval(toastTimer);
    }, 5000);
}


window.onload = async function(){
    includeHTML();
}


async function includeHTML(){
    const { data: { user } } = await supabase.auth.getUser();

    var z, i, content, page;
    z = document.getElementsByTagName("div");
    for(i = 0; i < z.length; i++){
        content = z[i];
        page = content.getAttribute("w3-include-html");

        const urlParams = new URLSearchParams(window.location.search);
        let searchParams = new URLSearchParams(urlParams);

        if(searchParams.get("post") && searchParams.get("post") != 0)
            if(page == "data/layout/appbar.html")
                page = "data/layout/appbar_backpage.html";

        if(searchParams.get("page") && page == "data/pages/home.html"){
            if(searchParams.get("page") == "blog")
                await LoadBlog(searchParams.get("page"), content, searchParams.get("row") ? searchParams.get("row") : 0)
            else
                await LoadPage(searchParams.get("page"), content);
            return;
        }else
        if(searchParams.get("post") && page == "data/pages/home.html"){
            await LoadPost(searchParams.get("post"), content);
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
                                ChangeTitle("Home");
                            }
                        }
                        if(this.status == 404) {LoadPage("404", content);}
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
    LoadSwipe();

    if(user){
        const urlParams = new URLSearchParams(window.location.search);
        let searchParams = new URLSearchParams(urlParams);

        var SignIn = document.getElementById("SignIn");
        if(SignIn){
            if(searchParams.get("post") && searchParams.get("post") == 0){
                SignIn.setAttribute("id","NoButton");
            }else{
                SignIn.setAttribute("onclick","window.location.href='?post=0';");
                SignIn.setAttribute("id","Edit");
            }
        }
    }
}



function LoadSwipe() {
    CloseScreenLoading();
    var content = document.getElementById('Content');
    if(!document.body.contains(document.getElementById('BackPage'))){
        swipedetect(content, (swipedir) => {
            if (swipedir =='right')
                OpenNavigation(true);
        });
        var navigate = document.getElementById('Navigate')
        swipedetect(navigate, (swipedir) => {
            if (swipedir =='left')
                OpenNavigation(false);
        });
    }else{
        swipedetect(content, (swipedir) => {
            if(swipedir =='right')
                BackPage();
        });
    }
};

function BackPage(){
    document.getElementById("Content").classList.add("SlideRight");
    setTimeout(function() {
        window.history.back();
    }, 200);
}

//Fechar ou abrir menu lateral
function OpenNavigation(Open){
    if(Open == false){
        Navigate.style.left = "0px";
        Content.style.top = "50px";
        Content.style.minHeight = "calc(100% - 50px)";
        Content.style.opacity = null;
        document.getElementById("AppBar").style.marginTop = "0px";

    }else{
        Navigate.style.left = "-100%";
        Content.style.top = "0px";
        Content.style.minHeight = "100%";
        Content.style.opacity = "0.2";
        if(!Loading)
        document.getElementById("AppBar").style.marginTop = "-50px";
    }
    
    if(Navigate.style.left == "0px"){
        Navigate.style.left = "-100%";
        if(Loading == false){
            document.body.style.overflowY = "visible";
        }
    }else{
        Navigate.style.left = "0px";
        document.body.style.overflowY = "hidden";
    }
}

//Fechar tela de carregamento
function CloseScreenLoading(){
    Loading = false;
    document.body.style.overflowY = "visible";
    ScreenLoading.style.display = "none";
}

//Função pra detectar ação swipe
function swipedetect(el, callback){
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 100,
    restraint = 100,
    allowedTime = 200,
    elapsedTime,
    startTime,
    handleswipe = callback
    touchsurface.addEventListener('touchstart', (e) => {
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime()
    }, false)

    touchsurface.addEventListener('touchend', (e) => {
    var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX
        distY = touchobj.pageY - startY
        elapsedTime = new Date().getTime() - startTime
        if (elapsedTime <= allowedTime){
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
                swipedir = (distX < 0)? 'left' : 'right'
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){
                swipedir = (distY < 0)? 'up' : 'down'
            }
        }
        handleswipe(swipedir)
    }, false)
}

//Mostrar e esconder AppBar
var prevScrollpos = window.pageYOffset;
window.onscroll = () => {
    if(Loading == false){
        var currentScrollPos = window.pageYOffset;
        if(prevScrollpos >= currentScrollPos || prevScrollpos == 0){
            document.getElementById("AppBar").style.marginTop = "0px";
        }else{
            document.getElementById("AppBar").style.marginTop = "-50px";
        }
        prevScrollpos = currentScrollPos;
    }
    else{
        document.getElementById("AppBar").style.marginTop = "0";
    }
}

function ChangeTitle(newtitle, header){
    newtitle = newtitle[0].toUpperCase() + newtitle.slice(1);
    var elment = document.getElementById("Title");
    if(header)
        elment.innerText = header;
    else
        if(elment)
            elment.innerText = newtitle;
    if(newtitle != title)
        newtitle += " - " + title;
    document.title = newtitle;
}

async function LoadBlog(id, content, index = 0){
    content.removeAttribute("w3-include-html");
    var startpage = totalPosts * index;
    var endpage = totalPosts * (index + 1);

    var { data } = await supabase
    .from('blog')
    .select('id,title,date')
    .eq('pin', true)
    .order('id', { ascending: false });

    var dataPin = data;

    var { data } = await supabase
    .from('blog')
    .select('id,title,date')
    .eq('pin', false)
    .order('id', { ascending: false })
    .range(startpage, endpage);

    var afterContent = () =>{
        var card = document.getElementsByClassName("Card").item(0);

        for(i = 0; i < dataPin.length; i++)
            card.innerHTML += '<div id="Pin"></div><a class="Pin" href="?post=' +dataPin[i].id +'">'+dataPin[i].title+'</a><hr/><div class="CardDateTime">' + new Date(dataPin[0].date) + '</div></div>';

        for(i = 0; i < data.length; i++)
            card.innerHTML += '<a href="?post=' +data[i].id +'">'+data[i].title+'</a><hr/><div class="CardDateTime">' + new Date(data[0].date) + '</div></div>';

        var next = index;
        var back = index;
        back--;
        next++;

        if(back >= 0)
            card.innerHTML += '<a class="button" href="?page=blog&row=' + back + '">Back</a>';

        if(next == totalPosts)
            card.innerHTML += '<a href="?page=blog&row=' + next + '">Next</a>';
    }

    await LoadPage("blog", content, afterContent);
}

async function LoadPost(id, content){
    content.removeAttribute("w3-include-html");
    const { data, error } = await supabase
    .from('blog')
    .select()
    .eq('id', id);
    const { data: { user } } = await supabase.auth.getUser();


    var afterContent = ()=>{
        if(user)
            document.getElementById("SelectMode").style.display = "flex";
        if(id == 0){
            Editor.style.display = "block";
            Preview.style.display = "none";
            editorbtn.style.background = "var(--ShadowColor)";
            previewbtn.style.background = "var(--PanelBackground)";
        }else{
            ChangeTitle(data[0].title, "Post");
            document.getElementsByClassName("title").item(0).innerText = data[0].title;
            document.getElementsByClassName("content").item(0).innerHTML = data[0].content;
            document.getElementsByClassName("CardDateTime").item(0).innerText = new Date(data[0].date);
            if(user){
                const title = document.getElementById('titlepage');
                const textArea = document.getElementById('editor');
                const pin = document.getElementById('pinpost');
                pin.checked = data[0].pin;
                textArea.innerHTML = data[0].content;
                title.value = data[0].title;
                updateCounter();
            }
        }
        const quill = new Quill("#editor", {
            theme: "snow",
        });
    }
    

    if(data[0]){
        await LoadLayout("post", content, afterContent);
        document.getElementById("Content").classList.add("SlideLeft");
    }else{
        if(id == 0 && user){
            await LoadLayout("post", content, afterContent);
        }else
            await LoadPage("404", content);
    }
}

function SelectMenuItem(page){
    var navigate = document.querySelectorAll('.MenuItem');
    for(const child of navigate)
      if(child.getAttribute("href") == "?page=" + page || child.getAttribute("href") == "/" && page == "home")
        child.setAttribute("class", "MenuItemSeleteced");
}

async function LoadPage(page, content, action = null){
    var file = "data/pages/" + page + ".html";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = async function(){
      if(this.readyState == 4) {
        var elmnt = content.parentNode;
        if(this.status == 200) {
          content.innerHTML = this.responseText;
          SelectMenuItem(page);
          ChangeTitle(page);

          const urlParams = new URLSearchParams(window.location.search);
          let searchParams = new URLSearchParams(urlParams);
          if(searchParams.get("post")){
            if(elmnt)
              elmnt.setAttribute("class", "SlideLeft");
          }
          action?.apply();
          CloseScreenLoading();
        }

        // Talvez remova
        if(this.status == 404){
            await LoadPage("404", content);
        }
                
        includeHTML();
      }
    }

    xhttp.open("GET", file, true);
    xhttp.send();
}

async function LoadLayout(page, content, action = null){
    var file = "data/layout/" + page + ".html";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState == 4) {
        var elmnt = content.parentNode;
        if(this.status == 200) {
          content.innerHTML += this.responseText;
          SelectMenuItem(page);
          ChangeTitle(page);
          action?.apply();
        }
      }
    }

    xhttp.open("GET", file, true);
    xhttp.send();
}

function updateCounter(){
    var textArea;
    textArea = document.getElementsByClassName('ql-editor').item(0);
    if(!textArea)
        textArea = document.getElementById('editor');
    const charCounter = document.getElementById('charCounter');
    const title = document.getElementById('titlepage');
    const pin = document.getElementById("pinpost");
    document.getElementsByClassName("title").item(0).innerHTML = pin.checked ? '<div id="Pin"></div>' : "";
    document.getElementsByClassName("title").item(0).innerHTML += title.value != "" ? title.value : "Title";

    document.getElementsByClassName("content").item(0).innerHTML = textArea.innerHTML != "" ? textArea.innerHTML : "Enter your text here...";
    document.getElementsByClassName("CardDateTime").item(0).innerHTML = new Date();
    charCounter.textContent = `${textArea.textContent.length}/5000`;
}

function OpenEditor(open){
    if(open){
        Editor.style.display = "block";
        Preview.style.display = "none";
        editorbtn.style.background = "var(--ShadowColor)";
        previewbtn.style.background = "var(--PanelBackground)";
    }else{
        Editor.style.display = "none";
        Preview.style.display = "block";
        editorbtn.style.background = "var(--PanelBackground)";
        previewbtn.style.background = "var(--ShadowColor)";
    }
}


async function Publish(){
    const textArea = document.getElementsByClassName('ql-editor').item(0);
    const title = document.getElementById('titlepage');
    const pin = document.getElementById('pinpost');
    const urlParams = new URLSearchParams(window.location.search);
    let searchParams = new URLSearchParams(urlParams);
    console.log("'"+title.value+"'");
    if(title.value.length < 5)
        ShowToast("The title cannot be less than 5 characteres!")
    else
    if(title.value == "")
        ShowToast("The title cannot be empty!")
    else
    if(searchParams.get("post") && searchParams.get("post") != 0){
        // update
        const id = searchParams.get("post");
        const { error } = await supabase
        .from('blog')
        .update({ title: title.value, content: textArea.innerHTML, pin: pin.checked})
        .eq('id', id)
        window.location.href='?post=' + id;
    }else{
        // insert
        const { data, error } = await supabase
        .from('blog')
        .insert([
          { title: title.value, content: textArea.innerHTML, pin: pin.checked},
        ])
        .select();
        window.location.href='?post=' + data[0].id;
    }
}

async function Delete(){
    const urlParams = new URLSearchParams(window.location.search);
    let searchParams = new URLSearchParams(urlParams);

    if(searchParams.get("post")){
        const response = await supabase
        .from('blog')
        .delete()
        .eq('id', searchParams.get("post"));
        window.location.href='?page=blog';
    }
}