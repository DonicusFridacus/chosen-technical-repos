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

