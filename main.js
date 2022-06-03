$(document).ready(  );
$(document).ready(function() {
    resizeObjects();
    imageSliderGoTo(imageSliderIndex);
});

$(window).resize( resizeObjects );

function resizeObjects() {
    $(".conImg").css('height', $(window).height() - $(".navbar").outerHeight());
}

$("#buttonFindMore").click(function() {
    $('html, body').stop(true, false).animate({
        scrollTop: $("#services").offset().top-$("#navbar").height()
    }, 1000);
});

$("#buttonLogo").stop(true, false).click(function() {
    $('html, body').stop(true, false).animate({
        scrollTop: $("#conImg").offset().top
    }, 1000);
});

$("#buttonServices, #buttonServicesSm").click(function() {
    $('html, body').stop(true, false).animate({
        scrollTop: $("#services").offset().top-$("#navbar").height()
    }, 1000);
});

$("#buttonDescription, #buttonDescriptionSm").click(function() {
    $('html, body').stop(true, false).animate({
        scrollTop: $("#description").offset().top-$("#navbar").height()
    }, 1000);
});

$("#buttonImages, #buttonImagesSm").click(function() {
    $('html, body').stop(true, false).animate({
        scrollTop: $("#images").offset().top-$("#navbar").height()
    }, 1000);
});

$("#buttonMap, #buttonMapSm").click(function() {
    $('html, body').stop(true, false).animate({
        scrollTop: $("#map").offset().top-$("#navbar").height()
    }, 1000);
});

$("#buttonContact, #buttonContactSm").click(function() {
    $('html, body').stop(true, false).animate({
        scrollTop: $("#contact").offset().top-$("#navbar").height()
    }, 1000);
});

$("#servicesMoreButton").click(function() {
    var $this = $(this); 
    var $content = $("#servicesToHide");
    var linkText = $this.text();

    $content.toggle(1000);

    if(linkText === "Show More"){
        linkText = "Show Less";
    } else {
        linkText = "Show More";
    };

    $this.text(linkText);
});

$("#descriptionMoreButton").click(function() {
    var $this = $(this); 
    var $content = $("#descriptionToHide");
    var linkText = $this.text();

    $content.toggle(1000);

    if(linkText === "Show More"){
        linkText = "Show Less";
    } else {
        linkText = "Show More";
    };

    $this.text(linkText);
});

var navbarIsOpen = false;
function openNavBar() {
    $(".navButSm").toggle(1000);
}

var maxWidth = window.matchMedia("(max-width: 1000px)");
myFunction(maxWidth);
maxWidth.addListener(myFunction);

function myFunction(x) {
    if (!x.matches) {
        $(".navButSm").hide();
    }
}

// slider

let imageSliderIndex = 0;
let imageSliderData = {
    "images": [
        "img/HousePhotos/house1.jpg",
        "img/HousePhotos/house2.jpg",
        "img/HousePhotos/house3.jpg",
        "img/HousePhotos/house4.jpg",
        "img/HousePhotos/house5.jpg",
        "img/HousePhotos/house6.jpg",
        "img/HousePhotos/house7.jpg",
        "img/HousePhotos/house8.jpg",
        "img/HousePhotos/house9.jpg",
        "img/HousePhotos/house10.jpg",
        "img/HousePhotos/house11.jpg",
        "img/HousePhotos/house12.jpg",
        "img/HousePhotos/house13.jpg",
        "img/HousePhotos/house14.jpg",
        "img/HousePhotos/house15.jpg",
        "img/HousePhotos/house16.jpg",
        "img/HousePhotos/house17.jpg",
        "img/HousePhotos/house18.jpg",
        "img/HousePhotos/house19.jpg",
        "img/HousePhotos/house20.jpg",
        "img/HousePhotos/house21.jpg",
        "img/HousePhotos/house22.jpg",
        "img/HousePhotos/house23.jpg",
        "img/HousePhotos/house24.jpg",
        "img/HousePhotos/house25.jpg",
        "img/HousePhotos/house26.jpg"
    ]
};

function imageSliderAdd(amount) {
    imageSliderIndex += amount;

    if (imageSliderIndex > (imageSliderData.images.length - 1)) {
        imageSliderIndex = imageSliderIndex % imageSliderData.images.length;
    } else if (imageSliderIndex < 0) {
        imageSliderIndex = Math.abs(imageSliderIndex + imageSliderData.images.length) % imageSliderData.images.length;
    }

    imageSliderGoTo(imageSliderIndex);
}

function imageSliderGoTo(index) {
    if (index > imageSliderData.images.length) {
        index = imageSliderData.images.length;
    } else if (index < 0) {
        index = 0;
    }

    imageSliderIndex = index;

    let imgElement = $("#imagesTab_img");

    if (imgElement) {
        imgElement.stop(true, false).animate({
            opacity: -1.0,
        }, 200, function() {
            imgElement.attr("src", imageSliderData.images[index]);

            imgElement.stop(true, false).animate({
                opacity: 1.0,
            }, 200);
        });
    }
}