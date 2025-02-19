/*
    Software Developed by Trevias Xk
    Social Networks:     treviasxk
    Github:              https://github.com/treviasxk
    Paypal:              trevias@live.com
*/

window.addEventListener("load", function() {
    CheckSession
}, false); 

async function CheckSession() {
    const { data: { session }, } = await supabase.auth.getSession();
    Authenticated = session ? session.user.aud == "authenticated" : false;
}

function EmbedContent(markdown) {
    let html = markdown;

    // Img
    var regex = /https?:\/\/[^\s"'<>]+?\.(jpe?g|png|gif)(\?[^"\s]*)?/g;
    var match = markdown.match(regex);
    
    if(match)
    for(const item in match)
        html = html.replaceAll("<p>" + match[item] + "</p>", `<img src="${match[item]}"></img>`)
    
    // video
    var regex = /https?:\/\/[^\s]+\.(mkv|mp4|webm)(\?[^\s<>]*)?/g;
    var match = markdown.match(regex);
    
    if(match)
    for(const item in match)
        html = html.replaceAll("<p>" + match[item] + "</p>", `<video autoplay="" muted="" loop="" disablepictureinpicture="" width="100%" controls><source src="${match[item]}"></video>`)

    // Youtube
    regex = /(?:https?:\/\/)?(?:www\.)?youtu(be\.com\/watch\?v=|\.be\/)([a-zA-Z0-9_-]+)/g;
    match = markdown.match(regex);

    if(match)
    for(const item in match){
        var id = match[item].replace("youtu.be/","").replace("youtube.com/watch?v=","").replace("https://","").replace("www.","");
        html = html.replaceAll("<p>" +match[item] + "</p>", `<iframe width="100%" height="415" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    }
    return html; // Return original string if no match is found
}

async function Login(){
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

async function Publish(){
    const textArea = document.getElementsByClassName('ql-editor').item(0);
    const title = document.getElementById('titlepage');
    const pin = document.getElementById('pinpost');
    const urlParams = new URLSearchParams(window.location.search);
    let searchParams = new URLSearchParams(urlParams);

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

function SearchPost(event){
    if(event.key == "Enter" && searchParams.get("page") == "blog")
        if(search.value != "")
            window.location.href = '/?page=blog&q=' + search.value;
        else
        window.location.href = '/?page=blog';
}


function RefreshContent(){
    var textArea;
    textArea = document.getElementsByClassName('ql-editor').item(0);
    if(!textArea)
        textArea = document.getElementById('editor');
    const title = document.getElementById('titlepage');
    const pin = document.getElementById("pinpost");
    document.getElementsByClassName("title").item(0).innerHTML = pin.checked ? '<div id="Pin"></div>' : "";
    document.getElementsByClassName("title").item(0).innerHTML += title.value != "" ? title.value : "Title";


    var content = EmbedContent(textArea.innerHTML);
    document.getElementsByClassName("content").item(0).innerHTML = content;
    document.getElementsByClassName("CardDateTime").item(0).innerHTML = new Date();
}
