var servicefour = document.getElementById("srvce-4")
var servicefive = document.getElementById("srvce-5")
var servicesix = document.getElementById("srvce-6")
var serviceseven = document.getElementById("srvce-7")
var serviceeight = document.getElementById("srvce-8")

var viewMoreBtn = document.getElementById("view-more")

var standardPhone = window.matchMedia("(max-width: 700px)")
var phone_tablet = window.matchMedia("(min-width: 701px) and (max-width: 1023px)")
var tablet_laptop = window.matchMedia("(min-width: 1024px)")

function viewMoreServices(){
    if (standardPhone.matches) {
        servicefour.style.display = "block"
        servicefive.style.display = "block"
        servicesix.style.display = "block"
        serviceseven.style.display = "block"
        serviceeight.style.display = "block"
    } else if (phone_tablet.matches){
        servicefive.style.display = "block"
        servicesix.style.display = "block"
        serviceseven.style.display = "block"
        serviceeight.style.display = "block"
    } else{
        serviceseven.style.display = "block"
        serviceeight.style.display = "block"
    }
    viewMoreBtn.style.display = "none"
}

//Review Slider Functionality
// Reference: https://www.codingnepalweb.com/draggable-card-slider-html-css-javascript/
const reviewSection = document.querySelector(".review-section");
const reviewCarousel = document.querySelector(".review-carousel");
const firstReviewWidth = reviewCarousel.querySelector(".review").offsetWidth;
const btnsPrevNext = document.querySelectorAll(".review-section button");
const reviewCarouselChildren = [...reviewCarousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(reviewCarousel.offsetWidth / firstReviewWidth);

// Inserts copies of the review cards to make it appear as though it is infinitely scrolling.
// - Inserts duplicates of the last few review cards.
reviewCarouselChildren.slice(-cardPerView).reverse().forEach(review => {
    reviewCarousel.insertAdjacentHTML("afterbegin", review.outerHTML);
});
// - Insert duplicates of the first few review cards.
reviewCarouselChildren.slice(0, cardPerView).forEach(review => {
    reviewCarousel.insertAdjacentHTML("beforeend", review.outerHTML);
});

// Scrolls the carousel at an appropriate position to hide first few duplicate reviews.
reviewCarousel.classList.add("no-transition");
reviewCarousel.scrollLeft = reviewCarousel.offsetWidth;
reviewCarousel.scrollRight = reviewCarousel.offsetWidth;
reviewCarousel.classList.remove("no-transition");

// Event Listeners are added to allow scrolling to left and right using the buttons.
btnsPrevNext.forEach(buttons => {
    buttons.addEventListener("click", () => {
        reviewCarousel.scrollLeft += buttons.className == "prev-btn" ? -firstReviewWidth : firstReviewWidth;
        reviewCarousel.scrollRight += buttons.className == "next-btn" ? +firstReviewWidth : firstReviewWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    reviewCarousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = reviewCarousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    reviewCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    reviewCarousel.classList.remove("dragging");
}
const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(reviewCarousel.scrollLeft === 0) {
        reviewCarousel.classList.add("no-transition");
        reviewCarousel.scrollLeft = reviewCarousel.scrollWidth - (2 * reviewCarousel.offsetWidth);
        reviewCarousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(reviewCarousel.scrollLeft) === reviewCarousel.scrollWidth - reviewCarousel.offsetWidth) {
        reviewCarousel.classList.add("no-transition");
        reviewCarousel.scrollLeft = reviewCarousel.offsetWidth;
        reviewCarousel.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!reviewSection.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => reviewCarousel.scrollLeft += firstReviewWidth, 2500);
}
autoPlay();
reviewCarousel.addEventListener("mousedown", dragStart);
reviewCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
reviewCarousel.addEventListener("scroll", infiniteScroll);
reviewSection.addEventListener("mouseenter", () => clearTimeout(timeoutId));
reviewSection.addEventListener("mouseleave", autoPlay);