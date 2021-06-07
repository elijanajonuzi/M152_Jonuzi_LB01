const splash=document.querySelector(".splash");

document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
        splash.classList.add('display-none')
    },2000);
})

// Higher number = more zoom
let scaleAmount = 1;

function scrollZoom() {
    const images = document.querySelectorAll("[data-scroll-zoom]");
    let scrollPosY = 0;
    scaleAmount = scaleAmount / 100;

    const observerConfig = {
        rootMargin: "0% 0% 0% 0%",
        threshold: 0
    };

    // Create separate IntersectionObservers and scroll event listeners for each image so that we can individually apply the scale only if the image is visible
    images.forEach(image => {
        let isVisible = false;
        const observer = new IntersectionObserver((elements, self) => {
            elements.forEach(element => {
                isVisible = element.isIntersecting;
            });
        }, observerConfig);

        observer.observe(image);

        // Set initial image scale on page load
        image.style.transform = `scale(${1 + scaleAmount * percentageSeen(image)})`;

        // Only fires if IntersectionObserver is intersecting
        window.addEventListener("scroll", () => {
            if (isVisible) {
                scrollPosY = window.pageYOffset;
                image.style.transform = `scale(${1 +
                scaleAmount * percentageSeen(image)})`;
            }
        });
    });

    // Calculates the "percentage seen" based on when the image first enters the screen until the moment it leaves
    function percentageSeen(element) {
        const parent = element.parentNode;
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const elPosY = parent.getBoundingClientRect().top + scrollY;
        const borderHeight = parseFloat(getComputedStyle(parent).getPropertyValue('border-bottom-width')) + parseFloat(getComputedStyle(element).getPropertyValue('border-top-width'));
        const elHeight = parent.offsetHeight + borderHeight;

        if (elPosY > scrollY + viewportHeight) {
            // If we haven't reached the image yet
            return 0;
        } else if (elPosY + elHeight < scrollY) {
            // If we've completely scrolled past the image
            return 100;
        } else {
            // When the image is in the viewport
            const distance = scrollY + viewportHeight - elPosY;
            let percentage = distance / ((viewportHeight + elHeight) / 100);
            percentage = Math.round(percentage);

            return percentage;
        }
    }
}

scrollZoom();


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);

resize();

function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}
function reposition(event) {
    coord.x = event.clientX - canvas.offsetLeft;
    coord.y = event.clientY - canvas.offsetTop ;
}
function start(event) {
    document.addEventListener("mousemove", draw);
    reposition(event);
}
function stop() {
    document.removeEventListener("mousemove", draw);
}
function draw(event) {
    debugger;
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.moveTo(coord.x , coord.y);
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}