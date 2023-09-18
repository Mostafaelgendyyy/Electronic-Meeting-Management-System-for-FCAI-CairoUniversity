const faders = document.querySelectorAll(".fade-up");
const fadersLeft = document.querySelectorAll(".fade-left");
const fadersRight = document.querySelectorAll(".fade-right");
const fadersIn = document.querySelectorAll(".fade-in");


const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px"
  };
const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return ;
        }else{
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        }
    })
}, appearOptions);


faders.forEach( faders =>{
    appearOnScroll.observe(faders);
})
fadersLeft.forEach( fadersLeft =>{
  appearOnScroll.observe(fadersLeft);
})
fadersRight.forEach( fadersRight =>{
  appearOnScroll.observe(fadersRight);
})
fadersIn.forEach( fadersIn =>{
  appearOnScroll.observe(fadersIn);
})

function openFileInput() {
  document.getElementById('fileInput').click();
}
