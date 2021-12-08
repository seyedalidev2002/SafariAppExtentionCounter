// browser.runtime.sendMessage({ message: "INIT" });

var scroll_speed = 800;


function is_touch_device() {
    try { document.createEvent("TouchEvent"); return true; } catch (e) { return false; }
}




var splist, posf;



splist = [1, 2, 3];
let c = ["#663fa6", "#ffffff", "#663fa6", "#ffffff", "#101010", "#663fa6", "#ffffff"];
let pos = ["20px", "20px"];
let f = 0;
scroll_speed = 800;
const icon = '<svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="64px" height="64px"><path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"/></svg>';

posf = f;

let innerString = '<div id="fly_btn">' + icon + '</div><div class="a_ib">';

innerString += '</div>';
let content = document.createElement('div');
content.innerHTML = '<style>#fly div svg{height:26px;color:' + c[3] + ' !important}#fly{position:fixed;bottom:' + pos[0] + ';left:' + pos[1] + ';padding:0!important;width:50px;margin:0;height:50px;z-index: 1000000;transition: bottom .1s linear;}#fly_btn{position: absolute;z-index: 1000000;height:50px;width:50px;background-color: ' + c[0] + '!important; color:' + c[1] + '!important; border-radius:50%; box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.15); user-select: none;display: flex;justify-content: center;align-items: center;}#fly_btn #svg1,#fly.open #fly_btn svg:nth-child(2){display:inline;}#ac4.fullscreen svg:nth-child(2),#ac4 svg:nth-child(1){display:inline;}#ac4.fullscreen svg:nth-child(1),#ac4 svg:nth-child(2){display:none;}#fly_btn svg:nth-child(2),#fly.open #fly_btn #svg1{display:none;}::-webkit-scrollbar{display: none;}.a_ib{position:absolute;overflow:auto;display:flex;flex-direction:row;flex-wrap:nowrap;overflow-x:auto;gap:5px;bottom:calc(100% + 10px);padding:5px!important;left:calc(5px - ' + pos[1] + ');width:calc(100vw - 10px);opacity:0;visibility:hidden;background-color:' + c[4] + '!important;border-radius:50px;box-shadow:0 5px 20px #101010;transition:all .3s ease-in-out}.a_ib div{display:inline-flex;justify-content:center;align-items:center;width:46px;flex:0 0 auto;height:46px;padding:0!important;color:' + c[3] + ';background-color:' + c[2] + '!important;border-radius:50%;box-shadow:0 5px 20px rgb(0 0 0 / 15%)}#fly.open .a_ib{opacity:1;visibility:visible}</style>' +
    '<div id="fly">' + innerString + '</div>';
document.body.appendChild(content);
var fbtn = document.getElementById("fly_btn");

fbtn.onclick = async function() {
    browser.runtime.sendMessage({ message: "INC" });

};
if (is_touch_device()) {
    fbtn.addEventListener("touchstart", startTouch, false);
    fbtn.addEventListener("touchmove", moveTouch, false);
    fbtn.addEventListener("touchend", endTouch, false);
}








// Swipe Up / Down / Left / Right
var initialX = null;
var initialY = null;
var diffX = null;
var diffY = null;
var locked2 = false;
var locked1 = false;

function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {
    let el = e.currentTarget;
    if (initialX === null || initialY === null) return;
    var currentX = e.touches[0].clientX;
    var currentY = e.touches[0].clientY;
    diffX = initialX - currentX;
    diffY = initialY - currentY;
    if (locked1) diffY = 0;
    if (locked2) diffX = 0;
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if ((Math.abs(diffX) - Math.abs(diffY)) > 10) locked1 = true;
        if (diffX > 0 && diffX < 135) { el.style.right = (Math.abs(diffX)) + 'px'; } else if (!posf && diffX > -135) { el.style.left = (Math.abs(diffX)) + 'px'; }
    } else {
        if ((Math.abs(diffY) - Math.abs(diffX)) > 10) locked2 = true;
        if (diffY > 0 && diffY < 135) { el.style.bottom = (Math.abs(diffY)) + 'px'; }
    }
    e.preventDefault();
};

function endTouch(e) {
    var el = e.currentTarget;
    locked1 = locked2 = false;
    if (posf) el.style.right = "0px";
    else el.style.left = "0px";
    el.style.bottom = "0px";
    if (diffX > 130 || diffX < -130) aFunctions["ac" + splist[2]]();
    if (diffY > 130) aFunctions["ac" + splist[1]]();
    diffX = null;
    diffY = null;
}