function init(){
    roomPopup();
}

function roomPopup(){
    return prompt("Please Enter the room you wish to create/join", Math.floor((Math.random()*100000)));
}

init();