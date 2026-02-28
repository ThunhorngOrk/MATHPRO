var content = document.getElementById('content');

const content1 = document.getElementById('content-1');
const conntent1_1 = document.getElementById('content-1-1');
const content1_2 = document.getElementById('content-1-2');
const content1_3 = document.getElementById('content-1-3');
const content1_4 = document.getElementById('content-1-4');
const content2 = document.getElementById('content-2');
const content3 = document.getElementById('content-3');

const rect1 = content1.getBoundingClientRect();
const rect1_1 = conntent1_1.getBoundingClientRect();
const rect1_2 = content1_2.getBoundingClientRect();
const rect1_3 = content1_3.getBoundingClientRect();
const rect1_4 = content1_4.getBoundingClientRect();
const rect2 = content2.getBoundingClientRect();
const rect3 = content3.getBoundingClientRect();

const y1 = rect1.top + window.scrollY;
const y1_1 = rect1_1.top + window.scrollY;
const y1_2 = rect1_2.top + window.scrollY;
const y1_3 = rect1_3.top + window.scrollY;
const y1_4 = rect1_4.top + window.scrollY;
const y2 = rect2.top + window.scrollY;
const y3 = rect3.top + window.scrollY;

const menu1 = document.getElementById('menu-1');
const menu1_1 = document.getElementById('menu-1-1');
const menu1_2 = document.getElementById('menu-1-2');
const menu1_3 = document.getElementById('menu-1-3');
const menu1_4 = document.getElementById('menu-1-4');
const menu2 = document.getElementById('menu-2');
const menu3 = document.getElementById('menu-3');

window.addEventListener('scroll', contentPosition);
function contentPosition(event) {
    if(window.scrollY >= 650){
        content.style.top = window.scrollY - 650 + 'px';
    } else {
        content.style.top = '0px';
    }

    if(window.scrollY >= y1 && window.scrollY < y2){
        menu1.classList.add('text-black');
    } else {
        menu1.classList.remove('text-black');
    }

    if(window.scrollY >= y1_1 && window.scrollY < y1_2){
        menu1_1.classList.add('text-black');
    } else {
        menu1_1.classList.remove('text-black');
    }

    if(window.scrollY >= y1_2 && window.scrollY < y1_3){
        menu1_2.classList.add('text-black');
    } else {
        menu1_2.classList.remove('text-black');
    }

    if(window.scrollY >= y1_3 && window.scrollY < y1_4){
        menu1_3.classList.add('text-black');
    } else {
        menu1_3.classList.remove('text-black');
    }

    if(window.scrollY >= y1_4 && window.scrollY < y2){
        menu1_4.classList.add('text-black');
    } else {
        menu1_4.classList.remove('text-black');
    }

    if(window.scrollY >= y2 && window.scrollY < y3){
        menu2.classList.add('text-black');
    }
    else {
        menu2.classList.remove('text-black');
    }

    if(window.scrollY >= y3){
        menu3.classList.add('text-black');
    } else {
        menu3.classList.remove('text-black');
    }
}


// const element = document.getElementById('me');
// const rect = element.getBoundingClientRect();
// const y = rect.top + window.scrollY;
// console.log(y);



