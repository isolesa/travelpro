// images details
var gallery = [
    {country:"Serbia", class:"image1", smallImageSource:"assets/images/gallery/serbiaSmall.jpg", bigImageSource:"assets/images/gallery/serbiaBig.jpg"},
    {country:"Spain", class:"image2", smallImageSource:"assets/images/gallery/spainSmall.jpg", bigImageSource:"assets/images/gallery/spainBig.jpg"},
    {country:"France", class:"image3", smallImageSource:"assets/images/gallery/franceSmall.jpg", bigImageSource:"assets/images/gallery/franceBig.jpg"},
    {country:"Egypt", class:"image4", smallImageSource:"assets/images/gallery/egyptSmall.jpg", bigImageSource:"assets/images/gallery/egyptBig.jpg"},
    {country:"Italy", class:"image5", smallImageSource:"assets/images/gallery/italySmall.jpg", bigImageSource:"assets/images/gallery/italyBig.jpg"},
    {country:"Turkey", class:"image6", smallImageSource:"assets/images/gallery/turkeySmall.jpg", bigImageSource:"assets/images/gallery/turkeyBig.jpg"},
    {country:"Russia", class:"image7", smallImageSource:"assets/images/gallery/russiaSmall.jpg", bigImageSource:"assets/images/gallery/russiaBig.jpg"},
    {country:"Czech Republic", class:"image8", smallImageSource:"assets/images/gallery/czechrepublicSmall.jpg", bigImageSource:"assets/images/gallery/czechrepublicBig.jpg"},
    {country:"Austria", class:"image9", smallImageSource:"assets/images/gallery/austriaSmall.jpg", bigImageSource:"assets/images/gallery/austriaBig.jpg"}];
var cities = ["Beograd","Pančevo","Subotica","Kragujevac","Niš"];
$(document).ready(function(){
    // hero home animation
    $("#about").animate({opacity:"1"},2000);
    // gallery
    var images = document.createElement("div");
    images.classList.add("images");
    document.querySelector("#gallery").appendChild(images);
    for(image in gallery){
        var img = document.createElement("img");
        img.setAttribute("src",gallery[image].smallImageSource);
        img.setAttribute("alt",gallery[image].country);
        img.classList.add("gallerySmallImage","noSelect");
        document.querySelector(".images").appendChild(img);
    }
    var galleryModal = document.createElement("div");
    galleryModal.setAttribute("id","galleryModal");
    var galleryModalExit = document.createElement("div");
    galleryModalExit.setAttribute("id","galleryModalExit");
    var galleryModalImages = document.createElement("div");
    galleryModalImages.setAttribute("id","galleryModalImages");
    document.querySelector("#mainHeader").appendChild(galleryModal);
    document.querySelector("#galleryModal").appendChild(galleryModalExit);
    document.querySelector("#galleryModal").appendChild(galleryModalImages);
    $(".gallerySmallImage").on("click",function(){
        for(image in gallery){
            if($(this).attr("alt") === gallery[image].country){
                var img = document.createElement("img");
                img.setAttribute("src",gallery[image].bigImageSource);
                img.setAttribute("alt",gallery[image].country);
                img.classList.add(gallery[image].class);
                document.querySelector("#galleryModalImages").appendChild(img);
                $("#galleryModal").css("display","block");
                $("#galleryModal").animate({backgroundColor:"rgba(0,0,0,0.9)"},600);
                $("html").css("overflow-y","hidden");
                $("#galleryModalImages img").css("display","block");
                $("#galleryModalImages img").addClass("animated jackInTheBox").animate({opacity:"1"},500);
                $("#galleryModalExit").addClass("animated fadeInRight");
            }
        }
    });
    $("#galleryModal").on("click",function(event){
        if(event.target.tagName === "IMG") return;
        else{
            $("#galleryModal").animate({backgroundColor:"rgba(0,0,0,0)"},1300);
            $("html").css("overflow-y","scroll");
            $("#galleryModalImages img").removeClass("jackInTheBox").animate({opacity:"0"},500);
            $("#galleryModalImages img").animate({opacity:"0"},500);
            $("#galleryModalExit").addClass("fadeOutRight");
            setTimeout(function(){
                $("#galleryModal").css("display","none");
                document.querySelector("#galleryModalImages").removeChild(document.querySelector("#galleryModalImages").childNodes[0]);
                $("#galleryModalExit").removeClass("fadeOutRight");
            },500);
        }
    });
    // responsive navigation
    $(window).resize(function(){
        if($(window).width() > 900){
            $("#mainNav > ul").show();
            $(this).next().children().removeClass("opacity");}
        if($(window).width() <= 900){
            $("#mainNav > ul").hide();
            if($("#mainNav > ul").css("height") == "220px"){
                $("#mainNav > ul").hide();
                $("#mainNav > ul").children().removeClass("opacity");}
            else{
                $("#mainNav > ul").hide();
                $("#mainNav > ul").children().addClass("opacity");}}
    });
    // nav animation
    if($(window).width() <= 900) $("#mainNav > ul").hide();
    $("#btnResponsive").on("click",function(){
        $(this).next().animate({"height":"toggle"},"medium","easeOutBounce");
        if($(this).next().children().hasClass("opacity")) $(this).next().children().removeClass("opacity");
        else $(this).next().children().addClass("opacity");
    });
    // author animation
    $("#author").css("display", "none");
    $("#authorImage").hide();
    var authorAnimation = anime({
        targets:".authorSvg",
        d:[
            {value:"M2160,0 2160,0 1660,2160 2160,4320 2160,4320 2160,2160z"},
            {value:"M2160,0 0,0 570,2160 0,4320 2160,4320 2160,2160z"},
            {value:"M2160,0 0,0 0,2160 0,4320 2160,4320 2160,2160z"}
        ],
        easing:"easeInOutCirc",
        duration:1200,
        loop:false,
        autoplay:false});
    $("#btnAuthor").on("click",function(){
        $("#author").css("display", "block");
        authorAnimation.restart();
        $("#authorSvg").addClass("pointer");
        $("#btnBack").addClass("animated block flipInY delay-1s");
        $("#authorTitle").addClass("block");
        $("#help").addClass("animated block flipInX delay-1s");
        $("#authorImage").addClass("animated flex flipInX delay-1s");
        setTimeout(function(){$("html").css("overflow-y","hidden");},800);
        setTimeout(function(){$("#authorBackground").animate({opacity:"1"},900);},1100);
    });
    $("#btnBack").on("click",function(){
        authorAnimation.reverse();
        authorAnimation.play();
        $("#authorSvg").removeClass("pointer");
        $("#btnBack").removeClass("flipInY delay-1s");
        $("#btnBack").addClass("fadeOutRight animeDuration");
        $("#help").removeClass("flipInX delay-1s");
        $("#help").addClass("fadeOutRight animeDuration");
        $("#authorImage").removeClass("flipInX delay-1s");
        $("#authorImage").addClass("fadeOutRight");
        $("#authorBackground").animate({"opacity":"0"},100);
        setTimeout(function(){$("html").css("overflow-y", "auto");},100);
        setTimeout(function(){
            $("#btnBack").removeClass("animated block fadeOutRight animeDuration");
            $("#help").removeClass("animated block fadeOutRight animeDuration");
            $("#authorImage").removeClass("animated flex fadeOutRight");
            $("#author").css("display", "none");
        },1200);
    });
    // forms validation
    var ddlCity = document.createElement("select");
    ddlCity.setAttribute("id","ddlCity");
    ddlCity.setAttribute("name","ddlCity");
    document.querySelector("#ddlCityCont").appendChild(ddlCity);
    var content = "<option value=\"0\">Unesite grad</option>";
    cities.forEach(function(city){
        content += "<option value=\"" + city + "\">" + city + "</option>";
    });
    ddlCity.innerHTML += content;
    document.querySelector("#btnSubmitLogin").addEventListener("click",validationLogin);
    document.querySelector("#btnSubmitRegistration").addEventListener("click",validationRegistration);
    // Catching data from forms
    var selectedGender = [];
    var tbFirstName = document.querySelector("#tbFirstName");
    var tbLastName = document.querySelector("#tbLastName");
    var tbEmailLogin = document.querySelector("#tbEmailLogin");
    var tbEmailRegistration = document.querySelector("#tbEmailRegistration");
    var tbPasswordLogin = document.querySelector("#tbPasswordLogin");
    var tbPasswordRegistration = document.querySelector("#tbPasswordRegistration");
    var rbGender = document.getElementsByName("gender");
    // Regular Expresions
    var regExpFirstLastName = /^[A-ZČĆŽŠĐ][a-zčćžšđ]{2,15}(\s[A-ZČĆŽŠĐ][a-zčćžšđ]{2,15})*$/
    var regExpEmail = /^[a-z]+(\.[a-z]+)+(\.[1-9][0-9]{0,3}\.(0[0-9]|1[0-8]))?\@ict\.edu\.rs$/;
    var regExpPassword = /^(?=.*[A-ZŠĐČĆa-zžšđčć])(?=.*\d)(?=.*[@$!%*#?&])[A-ZŽŠĐČĆa-zžšđčć\d@$!%*#?&]{8,}$/;
    function validationLogin(){
        var loginErrors = [];
        // email
        var trEmailLoginParent = tbEmailLogin.parentElement.parentElement;
        var trEmailErrorLogin = trEmailLoginParent.nextElementSibling;
        if(!regExpEmail.test(tbEmailLogin.value)){
            trEmailErrorLogin.children[0].innerHTML = "<h6 class=\"error\">Mora biti u formatu školskog e-maila (ict.edu.rs).</h6>";
            trEmailErrorLogin.classList.remove("invisible");
            trEmailErrorLogin.children[0].classList.add("animated","pulse");
            tbEmailLogin.style.border = "2px solid red";
            loginErrors.push("E-mail is not correct.");
        }
        else{
            trEmailErrorLogin.classList.add("invisible");
            trEmailErrorLogin.children[0].classList.remove("animated","pulse");
            tbEmailLogin.style.border = "2px solid transparent";
        }
        // password
        var trPasswordLoginParent = tbPasswordLogin.parentElement.parentElement;
        var trPasswordErrorLogin = trPasswordLoginParent.nextElementSibling;
        if(!regExpPassword.test(tbPasswordLogin.value)){
            trPasswordErrorLogin.children[0].innerHTML = "<h6 class=\"error\">Mora da sadrži bar jedno malo slovo, veliko slovo, broj i spec. karakter (8 karaktera min.).</h6>";
            trPasswordErrorLogin.classList.remove("invisible");
            trPasswordErrorLogin.children[0].classList.add("animated","pulse");
            tbPasswordLogin.style.border = "2px solid red";
            loginErrors.push("Password is not correct!");
        }
        else{
            trPasswordErrorLogin.classList.add("invisible");
            trPasswordErrorLogin.children[0].classList.remove("animated","pulse");
            tbPasswordLogin.style.border = "2px solid transparent";
        }
        if(!loginErrors.length){
            $("#btnSubmitLogin").animate({backgroundColor:"",color:"#000000"},200);
            return true;
        }
        else{
            $("#btnSubmitLogin").animate({backgroundColor:"red",color:"white"},200);
            return false;
        }
    };
    function validationRegistration(){
        var registrationErrors = [];
        // first name
        var trFirstNameParent = tbFirstName.parentElement.parentElement;
        var trFirstNameError = trFirstNameParent.nextElementSibling;
        if(!regExpFirstLastName.test(tbFirstName.value)){
            trFirstNameError.children[0].innerHTML = "<h6 class=\"error\">Mora početi velikim slovom (3 karaktera min./16 max.)</h6>";
            trFirstNameError.classList.remove("invisible");
            trFirstNameError.children[0].classList.add("animated","pulse");
            tbFirstName.style.border = "2px solid red";
            registrationErrors.push("First name is not correct.");
        }
        else{
            trFirstNameError.classList.add("invisible");
            tbFirstName.style.border = "2px solid transparent";
            trFirstNameError.children[0].classList.remove("animated","pulse");
        }
        // last name
        var trLastNameParent = tbLastName.parentElement.parentElement;
        var trLastNameError = trLastNameParent.nextElementSibling;
        if(!regExpFirstLastName.test(tbLastName.value)){
            trLastNameError.children[0].innerHTML = "<h6 class=\"error\">Mora početi velikim slovom (3 karaktera min./16 max.)</h6>";
            trLastNameError.classList.remove("invisible");
            trLastNameError.children[0].classList.add("animated","pulse");
            tbLastName.style.border = "2px solid red";
            registrationErrors.push("Last name is not correct.");
        }
        else{
            trLastNameError.classList.add("invisible");
            trLastNameError.children[0].classList.remove("animated","pulse");
            tbLastName.style.border = "2px solid transparent";
        }
        // email
        var trEmailRegistrationParent = tbEmailRegistration.parentElement.parentElement;
        var trEmailErrorRegistration = trEmailRegistrationParent.nextElementSibling;
        if(!regExpEmail.test(tbEmailRegistration.value)){
            trEmailErrorRegistration.children[0].innerHTML = "<h6 class=\"error\">Mora biti u formatu školskog e-maila (ict.edu.rs).</h6>";
            trEmailErrorRegistration.classList.remove("invisible");
            trEmailErrorRegistration.children[0].classList.add("animated","pulse");
            tbEmailRegistration.style.border = "2px solid red";
            registrationErrors.push("E-mail is not correct.");
        }
        else{
            trEmailErrorRegistration.classList.add("invisible");
            trEmailErrorRegistration.children[0].classList.remove("animated","pulse");
            tbEmailRegistration.style.border = "2px solid transparent";
        }
        // password
        var trPasswordRegistrationParent = tbPasswordRegistration.parentElement.parentElement;
        var trPasswordErrorRegistration = trPasswordRegistrationParent.nextElementSibling;
        if(!regExpPassword.test(tbPasswordRegistration.value)){
            trPasswordErrorRegistration.children[0].innerHTML = "<h6 class=\"error\">Mora da sadrži bar jedno malo slovo, veliko slovo, broj i spec. karakter (8 karaktera min.).</h6>";
            trPasswordErrorRegistration.classList.remove("invisible");
            trPasswordErrorRegistration.children[0].classList.add("animated","pulse");
            tbPasswordRegistration.style.border = "2px solid red";
            registrationErrors.push("Password is not correct.");
        }
        else{
            trPasswordErrorRegistration.classList.add("invisible");
            trPasswordErrorRegistration.children[0].classList.remove("animated","pulse");
            tbPasswordRegistration.style.border = "2px solid transparent";
        }
        // gender
        var trGenderParent = rbGender[0].parentElement.parentElement.parentElement;
        var trGenderError = trGenderParent.nextElementSibling;
        var rbGenderLength = rbGender.length;

        for(var i = 0; i < rbGenderLength; i++){
            if(rbGender[i].checked){
                selectedGender.push(rbGender[i].value);
                break;
            }
        }
        if(selectedGender.length === 0){
            trGenderError.children[0].innerHTML = "<h6 class=\"error\">Morate izabrati pol.</h6>";
            trGenderError.classList.remove("invisible");
            trGenderError.children[0].classList.add("animated","pulse");
            registrationErrors.push("Gender is not correct.");
        }
        else{
            trGenderError.classList.add("invisible");
            trGenderError.children[0].classList.remove("animated","pulse");
        }
        // city
        var trddlCityParent = ddlCity.parentElement.parentElement;
        var trddlCityError = trddlCityParent.nextElementSibling;
        if(ddlCity.value === "0"){
            trddlCityError.children[0].innerHTML = "<h6 class=\"error\">Morate izabrati grad.</h6>";
            trddlCityError.classList.remove("invisible");
            trddlCityError.children[0].classList.add("animated","pulse");
            ddlCity.style.border = "2px solid red";
            registrationErrors.push("City is not correct.");
        }
        else{
            trddlCityError.classList.add("invisible");
            trddlCityError.children[0].classList.remove("animated","pulse");
            ddlCity.style.border = "2px solid transparent";
        }
        if(!registrationErrors.length){
            $("#btnSubmitRegistration").animate({backgroundColor:"",color:"#000000"},200);
            return true;
        }
        else{
            $("#btnSubmitRegistration").animate({backgroundColor:"red",color:"white"},200);
            return false;
        }
    };
    // form animation
    var formAnimation = anime({
        targets:".registerStart",
        d:[
            {value:"M945,4320 2160,4320 2160,0 945,0 1155,2160z"}
        ],
        easing:"easeInOutCubic",
        duration:300,
        loop:false,
        autoplay:false});
    var loginAnimation = anime({
        targets:".loginAnimation",
        d:[
            {value:"M-624.0999999999999,1500.5a1374.1,1374.1 0 1,0 2748.2,0a1374.1,1374.1 0 1,0 -2748.2,0"},
            {value:"M-948.3,1503.9a1698.3,1698.3 0 1,0 3396.6,0a1698.3,1698.3 0 1,0 -3396.6,0"},
        ],
        easing:"easeInOutCirc",
        duration:800,
        loop:false,
        autoplay:false});
    var registerAnimation = anime({
        targets:".registerAnimation",
        d:[
            {value:"M-624.0999999999999,1500.5a1374.1,1374.1 0 1,0 2748.2,0a1374.1,1374.1 0 1,0 -2748.2,0"},
            {value:"M-948.3,1503.9a1698.3,1698.3 0 1,0 3396.6,0a1698.3,1698.3 0 1,0 -3396.6,0"},
        ],
        easing:"easeInOutCirc",
        duration:800,
        loop:false,
        autoplay:false});
    function loginSuccess(){
        $(".loginAnimation").css({"opacity":"1","fill":"#FEF3E2"});
        $("#loginAnimation").css("z-index","4");
        loginAnimation.restart();
        $(".registerAnimation").css({"opacity":"0","fill":"#000000"});
        $("#registerAnimation").css("z-index","-1");
        $("#loginAnimation").removeClass("firstTimeClicked");
        $("#btnSubmitRegistration").animate({backgroundColor:"",color:"#000000"},200);
        $(".loginC").html("<div class=\"ok\"></div><div class=\"congrats\"><p>Čestitamo!</br>Uspešno ste se prijavili!</p></div>");
        setTimeout(function(){
            $(".loginC").css("display","block");
            $(".loginC").addClass("animated flipInX");
        },250);
        $(".registerC").html("");
        $(".registerC").css("display","none");
        $(".registerC").removeClass("animated flipInX");

    }
    function registerSuccess(){
        console.log(selectedGender[0]);
        $(".registerAnimation").css({"opacity":"1","fill":"#FEF3E2"});
        $("#registerAnimation").css("z-index","4");
        registerAnimation.restart();
        $(".loginAnimation").css({"opacity":"0","fill":"#000000"});
        $("#loginAnimation").css("z-index","-1");
        $("#loginAnimation").removeClass("firstTimeClicked");
        $("#btnSubmitLogin").animate({backgroundColor:"",color:"#000000"},200);
        if(selectedGender[0] == "female") $(".registerC").html("<div class=\"ok\"></div><div class=\"congrats\"><p>Poštovana " + tbFirstName.value + ",</br>čestitamo!</br>Uspešno ste se registrovali!</p></div>");
        else $(".registerC").html("<div class=\"ok\"></div><div class=\"congrats\"><p>Poštovani " + tbFirstName.value + ",</br>čestitamo!</br>Uspešno ste se registrovali!</p></div>");
        setTimeout(function(){
            $(".registerC").css("display","block");
            $(".registerC").addClass("animated flipInX");
        },250);
        $(".loginC").html("");
        $(".loginC").css("display","none");
        $(".loginC").removeClass("animated flipInX");
    }
    $("#tbFirstName, #tbLastName, #tbEmailRegistration, #tbPasswordRegistration, .rbGender, #ddlCity, #btnSubmitRegistration").on("click",function(event){
        var flag = false;
        if($(".registerStart").attr("d") == "M1215,4320 2160,4320 2160,0 1215,0 1005,2160z"){
            formAnimation.restart();
            flag = true;
        }
        if(event.target.id === "btnSubmitRegistration"){
            if(validationRegistration()){
                registerSuccess();
            }
            else if(flag){
                console.log("netacno");
                $(".registerAnimation").animate({opacity:"0.3"},200);
                registerAnimation.restart();
                $(".loginAnimation").css({"opacity":"0","fill":"#000000"});
                $("#loginAnimation").css("z-index","-1");
                $("#loginAnimation").removeClass("firstTimeClicked");
                $("#btnSubmitLogin").animate({backgroundColor:"",color:"#000000"},200);
                $(".loginC").html("");
                $(".loginC").css("display","none");
                $(".loginC").removeClass("animated flipInX");
            }
        }
        else if(flag){
            $(".registerAnimation").animate({opacity:"0.3"},200);
            registerAnimation.restart();
            $(".loginAnimation").css({"opacity":"0","fill":"#000000"});
            $("#loginAnimation").css("z-index","-1");
            $("#loginAnimation").removeClass("firstTimeClicked");
            $("#btnSubmitLogin").animate({backgroundColor:"",color:"#000000"},200);
            $(".loginC").html("");
            $(".loginC").css("display","none");
            $(".loginC").removeClass("animated flipInX");
        }
        else $("#btnSubmitRegistration").animate({backgroundColor:"",color:"#000000"},200);
    });
    $("#tbEmailLogin, #tbPasswordLogin, #btnSubmitLogin").on("click",function(event){
        var flag = false;
        if($(".registerStart").attr("d") == "M945,4320 2160,4320 2160,0 945,0 1155,2160z"){
            formAnimation.reverse();
            formAnimation.play();
            flag = true;
        }
        if(event.target.id === "btnSubmitLogin"){
            if(validationLogin()){
                loginSuccess();
            }
            else if(flag || $("#loginAnimation").hasClass("firstTimeClicked")){
                console.log("netacno");
                $(".loginAnimation").animate({opacity:"0.3"},200);
                loginAnimation.restart();
                $(".registerAnimation").css({"opacity":"0","fill":"#000000"});
                $("#registerAnimation").css("z-index","-1");
                $("#loginAnimation").removeClass("firstTimeClicked");
                $("#btnSubmitRegistration").animate({backgroundColor:"",color:"#000000"},200);
                $(".registerC").html("");
                $(".registerC").css("display","none");
                $(".registerC").removeClass("animated flipInX");
            }
        }
        else if(flag || $("#loginAnimation").hasClass("firstTimeClicked")){
            console.log("nije btn");
            $(".loginAnimation").animate({opacity:"0.3"},200);
            loginAnimation.restart();
            $(".registerAnimation").css({"opacity":"0","fill":"#000000"});
            $("#registerAnimation").css("z-index","-1");
            $("#loginAnimation").removeClass("firstTimeClicked");
            $("#btnSubmitRegistration").animate({backgroundColor:"",color:"#000000"},200);
            $(".registerC").html("");
            $(".registerC").css("display","none");
            $(".registerC").removeClass("animated flipInX");
        }
        else $("#btnSubmitLogin").animate({backgroundColor:"",color:"#000000"},200);
    });
    // smooth scroll
    $("a[href*=\"#\"]").not("[href=\"#\"]").not("[href=\"#0\"]").click(function(event){
        if($(window).width() <= 900) $("#mainNav > ul").animate({"height":"toggle"},"medium","easeOutBounce");
        if($("#mainNav > ul").children().hasClass("opacity")) $("#mainNav > ul").children().removeClass("opacity");
        else $("#mainNav > ul").children().addClass("opacity");
        if(location.pathname.replace(/^\//,"") == this.pathname.replace(/^\//,"") && location.hostname == this.hostname){
            var target = $(this.hash);
            target = target.length ? target : $("[name=\"" + this.hash.slice(1) + "]");
            if(target.length){
                event.preventDefault();
                $("html,body").animate({scrollTop: target.offset().top},1000,function(){
                    var $target = $(target);
                    $target.focus();
                    if($target.is(":focus")) return false;
                    else{
                        $target.attr('tabindex','-1');
                        $target.focus();
                    };});}}
    });
    // changing color on scroll
    var scrollPosition = 0;
    var animationStartPosition = $("#heroHome").height() + 1;
    var animationEndPosition = $(document).height();
    var startColorHeader = new $.Color("rgb(255,255,255)");
    var endColorHeader = new $.Color("rgb(0,0,0)");
    var startColorFont = new $.Color("rgb(250,175,8)");
    var endColorFont = new $.Color("rgb(250,175,8)");
    var startColorLogo = new $.Color("rgb(250, 175, 8)");
    var endColorLogo = new $.Color("rgb(255,255,255)");
    var startColorPalm = new $.Color("rgb(255,255,255)");
    var endColorPalm = new $.Color("rgb(250, 175, 8)");
    $(document).scroll(function(){
        scrollPosition = $(this).scrollTop();
        if(scrollPosition >= animationStartPosition && scrollPosition <= animationEndPosition){
            var percentScrolled = scrollPosition / (animationEndPosition - animationStartPosition);
            var redHeader = startColorHeader.red() + ((endColorHeader.red() - startColorHeader.red()) * percentScrolled);
            var greenHeader = startColorHeader.green() + ((endColorHeader.green() - startColorHeader.green()) * percentScrolled);
            var blueHeader = startColorHeader.blue() + ((endColorHeader.blue() - startColorHeader.blue()) * percentScrolled);
            var redFont = startColorFont.red() + ((endColorFont.red() - startColorFont.red()) * percentScrolled);
            var greenFont = startColorFont.green() + ((endColorFont.green() - startColorFont.green()) * percentScrolled);
            var blueFont = startColorFont.blue() + ((endColorFont.blue() - startColorFont.blue()) * percentScrolled);
            var redLogo = startColorLogo.red() + ((endColorLogo.red() - startColorLogo.red()) * percentScrolled);
            var greenLogo = startColorLogo.green() + ((endColorLogo.green() - startColorLogo.green()) * percentScrolled);
            var blueLogo = startColorLogo.blue() + ((endColorLogo.blue() - startColorLogo.blue()) * percentScrolled);
            var redPalm = startColorPalm.red() + ((endColorPalm.red() - startColorPalm.red()) * percentScrolled);
            var greenPalm = startColorPalm.green() + ((endColorPalm.green() - startColorPalm.green()) * percentScrolled);
            var bluePalm = startColorPalm.blue() + ((endColorPalm.blue() - startColorPalm.blue()) * percentScrolled);
            var newColorHeader = new $.Color(redHeader,greenHeader,blueHeader);
            var newColorFont = new $.Color(redFont,greenFont,blueFont);
            var newColorLogo = new $.Color(redLogo,greenLogo,blueLogo);
            var newColorPalm = new $.Color(redPalm,greenPalm,bluePalm);
            $("#mainHeader").animate({
                backgroundColor:newColorHeader,
                color:newColorFont},0);
            $(".logoPath").css("fill",newColorLogo);
            $(".palm").css("fill",newColorPalm);
        }
        else if(scrollPosition > animationEndPosition){
            $("#mainHeader").animate({
                backgroundColor:endColorHeader,
                color:endColorFont},0);
            $(".logoPath").css("fill",endColorLogo);
            $(".palm").css("fill",endColorPalm);
        }
        else if(scrollPosition < animationStartPosition){
            $("#mainHeader").animate({
                backgroundColor:startColorHeader,
                color:startColorFont},0);
            $(".logoPath").css("fill",startColorLogo);
            $(".palm").css("fill","rgb(31,100,10)");
        }
    });
});