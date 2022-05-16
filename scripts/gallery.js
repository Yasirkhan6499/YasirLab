const slider_container = document.querySelector(".slider-container");
const slider = document.querySelector(".slider");
const slider_imgs = (document.querySelectorAll(".slider__img"));
const slider_btns = document.querySelectorAll(".gallery__btns");

let slider_imgs_arr = [];
const sliding_imgs_container = document.querySelector(".sliding-images");
const images_boxs = document.querySelectorAll(".gallery_pic-container");
const cancel_slider = document.querySelector(".cancel-btn");

const img_width = slider_imgs[1].clientWidth;
const img_height = slider_imgs[1].clientHeight;

let scrollX = 0;
let scrollY = 0; //these 2 vars will be used to turn off the scrolling
let isImageclicked = false;

let toMoveImage = 0;
let current_slide;
let next_img;

//*********Transition end code******************
function getTransitionEndEventName() {
    var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
     }
    let bodyStyle = document.body.style;
    for(let transition in transitions) {
        if(bodyStyle[transition] != undefined) {
            return transitions[transition];
        } 
    }
  }
  
  // using above code we can get Transition end event name
  let transitionEndEventName = getTransitionEndEventName(); //add this variable to add a transition end event listener

  function transitionNone(){
      // no images fade animations
      toMoveImage.style.transition = "none";
      toMoveImage.style.opacity = 1;

      //no slider animation
      slider.style.transition = "none";
      slider.style.transform = "translateX(-"+(toMoveImage.style.left)+")";

      next_img = toMoveImage; //next image will be set to the first img
      changeImgClasses(current_slide,next_img);
      console.log("transitionEnd");
      console.log(toMoveImage); 
      slider.removeEventListener(transitionEndEventName,transitionNone);
  }

  //**************************************************** */

//--------------- Adjusting the images position-------

adjustImagesPos();

function adjustImagesPos(){

    let space = -1; //if its 0, then the first left click will move the slider 2 images ahead
    let img_width = slider_imgs[0].clientWidth;
    console.log(slider_imgs[0]);
    slider_imgs.forEach(img=>{
        // console.log(img);
        img.style.left = (img_width * space) + "px";
        
        space++;
        console.log("reach");
    });
}

//--------set the width/height of the slider---
 setSliderWidth(img_width,img_height);

function setSliderWidth(width,height){
   slider_container.style.width = slider.style.width = width+"px";
   slider_container.style.height = slider.style.height = height+"px";
}

// ---------Adjusting the slider position----------
adjustSliderPos();

function adjustSliderPos(){

    slider.style.left = "-"+slider_imgs[1].style.left;

    let slider_posY = 
    (window.innerHeight - slider_imgs[0].clientHeight)/2;
    
  slider_container.style.top =  slider_posY+"px";

    if(window.innerWidth>=800){
        let slider_posX = 
        (window.innerWidth - slider_imgs[0].clientWidth)/2;
        console.log(slider_posX);
       slider_container.style.left =  (slider_posX-100)+"px";
    }
    else
   slider_container.style.left =  10+"vw";
    
}


window.addEventListener("resize",adjustSliderPos);


//--- adjusting slider buttons ------

adjustSliderBtns();

function adjustSliderBtns(){
    slider_btns.forEach(btn=>{
        btn.style.top = (img_height) / 2+"px";

    });

    // after setting the slider container and everything in position on the screen then hide it. 
    //and it will be only visible if an image in the grid has been clicked
    sliding_imgs_container.style.display = "none";
}

//--------- Slide Images on click ********

//left button
slider_btns[0].addEventListener("click",()=>{
   


     current_slide = document.querySelector(".current-slide");
     next_img = current_slide.nextElementSibling;
    
          //if last image, no transition, so that it quickly go to first image without notice
          if(current_slide.classList.contains("last-img")){
            toMoveImage = slider.querySelector(".first-img");
            slider.addEventListener(transitionEndEventName, transitionNone);

            
        }
       //-----------------------------------
      
    goToNextSlide(current_slide,next_img);

   
    //-disabled the button for short time
    slider_btns[0].disabled = true;
    setTimeout(()=>{
        slider_btns[0].disabled = false;
        },1000);

});

//Right button
slider_btns[1].addEventListener("click",()=>{
   

    current_slide = document.querySelector(".current-slide");
    next_img = current_slide.previousElementSibling;
    console.log("prev_img : ",next_img);
   
         //if first image, no transition, so that it quickly go to first image without notice
         if(current_slide.classList.contains("first-img")){
           toMoveImage = slider.querySelector(".last-img");
           slider.addEventListener(transitionEndEventName, transitionNone);
   
       }
      //-----------------------------------
      
   goToNextSlide(current_slide,next_img);

     //-disabled the button for short time
     slider_btns[1].disabled = true;
     setTimeout(()=>{
         slider_btns[1].disabled = false;
         },1000);
});



function goToNextSlide(current_slide,next_img){
    amounttoMoveImage = next_img.style.left;
    console.log("amounToMove: ",amounttoMoveImage);
    console.log(amounttoMoveImage);

   
    slider.style.transition = "1.5s ease-in-out";
    slider.style.transform = "translateX(-"+(amounttoMoveImage)+")";

    animatePics(current_slide,next_img); //fade animate the current and the next pic
    
    changeImgClasses(current_slide,next_img);
}

function changeImgClasses(){
    current_slide.classList.remove("current-slide");
    next_img.classList.add("current-slide");
    

    if(toMoveImage && toMoveImage.classList.contains("last-img")) //its just a cheat, something was not working thats why.
    slider.firstElementChild.classList.remove("current-slide"); 
}

////fade animate the current and the next pic
function animatePics(current_slide,next_img){
    current_slide.style.transition = "opacity 2.5s ease-in-out";
    next_img.style.transition = "opacity 2s ease-in-out";
    current_slide.style.opacity = "0";
    next_img.style.opacity = "1";
}


//-- put the slider elements in the sliding_imgs_arr except the first and last

adjustElementsInSliderArr();

function adjustElementsInSliderArr(){
    for(let i=1,j=0; i<slider_imgs.length-1; i++){

        slider_imgs_arr[j] = slider_imgs[i];

        j++;
        
    }
}
//-------------------------------------------

  //-----------when an image is clicked show the slider and turn off the scrolling----

  imageClicked(); 

  function imageClicked(){
      for(let i=0; i<images_boxs.length; i++){
          images_boxs[i].addEventListener("click",()=>{
            
              

            sliding_imgs_container.style.display = "inline-block";
           goToSelectedImage(i);

            adjustSliderPos(); //when the slider is shown, adjust its position in the middel of the screen

            turnOffScrolling(); //Turn off scrolling 
        });
      }
    
  }
//------------- Turn off scrolling when clicked---------
  function turnOffScrolling(){
      scrollX = window.scrollX || document.documentElement.scrollLeft;
      scrollY = window.scrollY || document.documentElement.scrollTop;

  
      isImageclicked = true;
  }

  window.addEventListener("scroll", ()=>{
     if(isImageclicked){
         window.scrollTo(scrollX,scrollY);
     }
  });

  //------------------------------------------

  //---- The slider will go to the selected image before getting visible on screen

  function goToSelectedImage(img_clicked_num){
     current_slide=slider_imgs_arr[0];
     next_img = slider_imgs_arr[img_clicked_num]; 

   console.log("slider_img_arr : ",slider_imgs_arr[0])
     goToNextSlide(current_slide,next_img);

     
  }

  // --- Cancel button to hide the slider_images---
  closeSliderImagesContainer();

  function closeSliderImagesContainer(){

    //--- remove the current slide class from the current image
    
    if(current_slide){
    current_slide.classList.remove("current-slide");
    console.log("current",current_slide);
    }

    // then hide the slider container
      cancel_slider.addEventListener("click",()=>{
        if(next_img){
            next_img.classList.remove("current-slide");
            console.log("current",next_img);
            }

      sliding_imgs_container.style.display = "none"

           //---- user can start scrolling again---
           isImageclicked = false;
          

    });

 
  }

  