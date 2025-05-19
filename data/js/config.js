/*
    Software Developed by Trevias Xk
    Social Networks:     treviasxk
    Github:              https://github.com/treviasxk
*/

// Settings
var Title = "Trevias Xk";
var TotalPostsLoadInScroll = 20;    // Number of posts to load when scrolling
var MaxCharacteresPosts = 500;      // Maximum number of characters to display in the post list

// Menu
// Add the name of the html file you want as the page, and the title you want it to have. html pages are loaded from /data/pages/
// example "home": "Home" -> /data/pages/home.html
var Pages = {
    "home": "Home",
    "donate": "Donate",
    "contact": "Contact",
    "about": "About",
};

// Social Networks
// Available: github, x, linkedin, facebook, instagram
var SocialNetworks = {
    //example: "github": "https://github.com/treviasxk",
    "Github": "https://github.com/treviasxk",
    "X": "https://x.com/treviasxk",
    "Youtube": "https://youtube.com/treviasxk",
    "Twitch": "https://twitch.tv/treviasxk",
    "Kick": "https://kick.com/treviasxk",
}

// Supabase
var SupabaseUrl = "https://cyhgmlceqsfktdivwbgg.supabase.co";
var SupabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5aGdtbGNlcXNma3RkaXZ3YmdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2Mjc0NDUsImV4cCI6MjA1NTIwMzQ0NX0.LLExdL6Q0n87rzG8e6FAoNw0vhhoZTPraWIrN3jnRgk";