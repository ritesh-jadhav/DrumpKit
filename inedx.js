
let audio_volume = 0.6 ;
//Unflash -> API
var image_url;
const api_call = () => {
    const URL="https://api.unsplash.com/photos/random?query=drum"
    fetch(URL, {
        headers : {
            'Authorization' : 'Client-ID P8wyUwFjcIBxgHOlZzG05lc-LYLp3lG9o1xO9xTU7x4'
        }
    }).then(res => res.json())
    .then(res => {
      image_url = res.urls.small;
      change_background(image_url);
    })
    .catch(error => console.log(error))
}
api_call();

//function to change background
    const change_background = (image_src) =>{
        let container_style = document.getElementsByClassName('container')[0].style;
        let bg_color = getComputedStyle(document.documentElement).getPropertyValue("--background_low");
        container_style.background = `linear-gradient(300deg,${bg_color},${bg_color}),url(${image_src})`
       container_style.backgroundSize='cover';
       container_style.backgroundPosition='center';
    }
//change backgroun button listner
const bg_changer=document.getElementById('util_button-bakground').addEventListener('click',()=>{
    api_call();
})
//select drum element and attach listner
const handleDrumClick = (event) => {
    var innerHTML = event.target.innerHTML;
    animate(innerHTML);
    makeSound(innerHTML);
}
//button animation -> adding css class dynamically
const animate = (key) => {
    const currentKey = document.querySelector(`.${key}`);
    currentKey.classList.add('pressed');
    setTimeout(() => {
        currentKey.classList.remove('pressed');
    }, 250);
}
//play music
const playMusic = (path) => {
    const audio = new Audio(path);
    audio.volume=audio_volume;
    audio.play();
}
//keyboard 
document.addEventListener('keypress',(event)=>{
    const triggeredKey =event.key;
    animate(triggeredKey);
    makeSound(triggeredKey);
})
//select sound
const makeSound = (key) => {
    switch (key) {
        case 'w':
            playMusic("sounds/sound-1.mp3");
            break;
        case 'a':
            playMusic("sounds/sound-2.mp3");
            break; 
        case 's':
            playMusic("sounds/sound-3.mp3");
            break; 
        case 'd':
            playMusic("sounds/sound-4.mp3");
            break;
         case 'j':
            playMusic("sounds/sound-5.mp3");
            break;
        case 'k':
            playMusic("sounds/sound-6.mp3");
            break; 
        case 'l':
            playMusic("sounds/sound-7.mp3");
            break;
        default:
            console.log('wrong button!!');
    }
}
// selecting the all drum element
var drums = document.querySelectorAll(".drum")
for (let i = 0; i < drums.length; i++) {
    drums[i].addEventListener("click", handleDrumClick)
}
// music volume
const slider =document.getElementById('volume__slider');
slider.oninput = (event) => {
    audio_volume= event.target.value / 100 ;
}

// start automusic
let auto_music_id ;
let auto_music_on = false;
const start_auto_music = () => {
    let letters=["w","a","s","d","j","k","l"];
    auto_music_id = setInterval(() => {
    const currentKey = letters[Math.floor(Math.random()*letters.length)];
   makeSound(currentKey);
    animate(currentKey);

    }, 200);
}
const automusic_button = document.getElementById('util_button-auto');
automusic_button.addEventListener('click',()=>{
   if(auto_music_on){
       clearInterval(auto_music_id);
       auto_music_on=false;
       automusic_button.innerHTML="Start Auto Music";
       automusic_button.classList.remove('auto_music_on');
   }else{
    start_auto_music();
    auto_music_on=true;
    automusic_button.innerHTML="Stop Auto Music";
    automusic_button.classList.add('auto_music_on');
    }
})
//change theme feature
var current_theme ="theme_1";

const changeTheme=(theme)=>{
    let root = document.documentElement
    if(theme==="theme_1"){
    root.style.setProperty( '--background',theme_1_background)
    root.style.setProperty( '--background',theme_1_background_low)
    root.style.setProperty( '--text',theme_1_text)
    }else{
        root.style.setProperty( '--background',theme_2_background)
        root.style.setProperty( '--background',theme_2_background_low)
        root.style.setProperty( '--text',theme_2_text)
    }
}
const theme_changer = document.getElementById('util_button-theme');
theme_changer.addEventListener('click',(event)=>{
    theme_changer.classList.add('change_theme_pressed');
    setTimeout(() => {
        theme_changer.classList.remove('change_theme_pressed');
        
    }, 200);
    if(current_theme=="theme_1")
    {
        changeTheme("theme_2");
        current_theme ="theme_2";
    }else{
        changeTheme("theme_1");
        current_theme ="theme_1";
    }
})
//theme 1
const theme_1_background = "#091921";
const theme_1_background_low = "rgba(9,25,33,0.8)";
const theme_1_text = "#00fff1";


//theme 2
const theme_2_background = "#f7c340";
const theme_2_background_low = "rgba(247,195,64,0.85)";
const theme_2_text = "#2d2d2d";