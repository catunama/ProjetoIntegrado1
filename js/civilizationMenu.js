var currentCivilization;

function transitionToCivilizationMenu(marker) {
    //marker pois inicialmente a navegação se dava apenas no mapa,
    //mas pode ser qualquer objeto que tenha uma civilização em seu data
    currentCivilization = marker.data("civilization");
    var civilizationName = currentCivilization.name;

    //Aqui os botões do menu são ativados
    $(".menuRow").removeClass("Disabled");
    //E o botão da civilização exibida desativado
    $("#menuRow" + civilizationName).addClass("Disabled");


    $("#mainDiv").fadeOut(625, function () {
        initNavController(); //navigation

        //Reajuste do zoom do mapa
        $('#mainDiv').transition({
            scale: '1'
        }, 0);

        //Objetos são retirados, mainDiv será reestrutrada
        $("#mainDiv").empty();

        //Background específico de cada civilização
        $("#mainDiv").css("background-image", "url('" + $(preload.getResult('menuBackground' + civilizationName)).attr('src') + "')");

        //ContentDiv é utilizada para manter o conteúdo dentro da folha
        //Ela é sempre redimensionada de acordo com a imagem da folha
        $("#mainDiv").append("<div id='contentDiv'></div>");

        //Folha
        var bg = preload.getResult('bg')
        $(bg).attr("id", "bg");
        $("#mainDiv").prepend(bg);

        //Conteúdo em si
        $("#contentDiv").append("<div id='civilizationMenuDiv'></div>");

        var menuBg = preload.getResult("menu" + civilizationName);
        $(menuBg).attr("id", "civilizationMenuImg");
        $("#civilizationMenuDiv").append(menuBg).fadeOut(0);

        $("#mainDiv").fadeIn(625, function () {
            var width = $("#bg").width();
            var height = $("#bg").height();
            $("#contentDiv").css("width", "" + width);
            $("#contentDiv").css("height", "" + height);
            $("#civilizationMenuDiv").fadeIn("fast");
            addCivilizationButtons();

        });
    });
}

function addCivilizationButtons() {
    var cosmogonyButton = preload.getResult("cosmogonyButton" + currentCivilization.name);
    $(cosmogonyButton).css("top", currentCivilization.cosmogonyButton.topSpace);
    $(cosmogonyButton).css("left", currentCivilization.cosmogonyButton.leftSpace);
    $(cosmogonyButton).css("max-height", currentCivilization.cosmogonyButton.height);
    $(cosmogonyButton).attr("id", "cosmogonyButton");
    $(cosmogonyButton).attr("class", "CivilizationButton");

    var teogonyButton = preload.getResult("teogonyButton" + currentCivilization.name);
    $(teogonyButton).css("top", currentCivilization.teogonyButton.topSpace);
    $(teogonyButton).css("left", currentCivilization.teogonyButton.leftSpace);
    $(teogonyButton).css("max-height", currentCivilization.teogonyButton.height);
    $(teogonyButton).attr("id", "teogonyButton");
    $(teogonyButton).attr("class", "CivilizationButton");

    var cultureButton = preload.getResult("cultureButton" + currentCivilization.name);
    $(cultureButton).css("top", currentCivilization.cultureButton.topSpace);
    $(cultureButton).css("left", currentCivilization.cultureButton.leftSpace);
    $(cultureButton).css("max-height", currentCivilization.cultureButton.height);
    $(cultureButton).attr("id", "cultureButton");
    $(cultureButton).attr("class", "CivilizationButton");

    $(cultureButton).hide().appendTo("#civilizationMenuDiv");
    $(teogonyButton).hide().appendTo("#civilizationMenuDiv");
    $(cosmogonyButton).hide().appendTo("#civilizationMenuDiv");

    var divWidth = $("#civilizationMenuDiv").width();

    var buttonWidth = $(".CivilizationButton").width();

    var percentage = (buttonWidth / divWidth) * 100;

    $(".CivilizationButton").animate({
        maxWidth: "" + percentage + "%"
    });

    $(".CivilizationButton").fadeIn();

}

$(window).on("resize", function () {
    //Redimensionamento de contentDiv de acordo com a imagem
    var width = $("#bg").width();
    var height = $("#bg").height();
    $("#contentDiv").css("width", "" + width);
    $("#contentDiv").css("height", "" + height);
});

//Transições para cada tela
$(document).on('click', '#cultureButton', function () {
    transitionToCivilizationCulture();
});

$(document).on('click', '#cosmogonyButton', function () {
    //cosmogonia pendente
    transitionToCivilizationTeogony();
});

$(document).on('click', '#teogonyButton', function () {
    transitionToCivilizationTeogony();
});