let profiles = ["Profile 1", "Profile 2", "Profile 3"];
let currentProfile = 0;

function updateCard() {
    document.getElementById("card").innerText = profiles[currentProfile];
}

function swipeLeft() {
    currentProfile++;
    if(currentProfile < profiles.length) updateCard();
}

function swipeRight() {
    currentProfile++;
    if(currentProfile < profiles.length) updateCard();
}
