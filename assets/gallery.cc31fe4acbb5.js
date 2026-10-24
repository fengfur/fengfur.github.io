'use strict';
(() => {
const dialog = document.querySelector('.story-dialog');
if (!dialog || typeof dialog.showModal !== 'function') return;
const links = [...document.querySelectorAll('[data-story]')];
const image = dialog.querySelector('.dialog-picture');
const title = dialog.querySelector('#dialog-title');
const description = dialog.querySelector('.dialog-description');
const descriptions = {
cats:'大貓帶小貓左右搖起來。從一個抬爪，開始今天的小小舞會。',
blanket:'小狗小貓分享毯子。有你在身邊，平凡的午後也很溫暖。',
seal:'小海豹醒來先看一眼海。讓海浪的聲音，陪今天慢慢開始。',
goose:'大白鵝月光湖畔醋意搖。湖面亮起月光，牠也有自己的舞步。'
};
let selected=0, opener=null;
function show(index){
selected=(index+links.length)%links.length;
const link=links[selected],source=link.querySelector('img');
title.textContent=link.querySelector('.poster-title').textContent;
description.textContent=descriptions[link.dataset.story];
image.src=source.getAttribute('src'); image.alt=source.alt;
image.width=source.width; image.height=source.height;
}
links.forEach((link,index)=>link.addEventListener('click',event=>{
if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
event.preventDefault();opener=link;show(index);dialog.showModal();dialog.querySelector('[data-close]').focus();
}));
dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
dialog.querySelector('[data-previous]').addEventListener('click',()=>show(selected-1));
dialog.querySelector('[data-next]').addEventListener('click',()=>show(selected+1));
dialog.addEventListener('keydown',event=>{
if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();show(selected+(event.key==='ArrowRight'?1:-1));}
});
dialog.addEventListener('click',event=>{
const bounds=dialog.getBoundingClientRect();
if(event.target===dialog&&(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom))dialog.close();
});
dialog.addEventListener('close',()=>{if(opener)opener.focus();});
})();


