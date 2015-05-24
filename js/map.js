function transitionToMap() {
    currentCivilization = undefined;
    transitionToSoundNamed("mapMusic");
    $("#mainDiv").fadeOut(625, function () {
        $("#mainDiv").replaceWith($("#mainDiv").data('map'));
        $("#mainDiv").fadeOut(0);
        $("#mainDiv").fadeIn(1250);
    });
}

function saveMap() {
    //Salvando o estado atual do mapa
    $("#mainDiv").data("map", $("#mainDiv").clone(true));
}

function updateMarkers() {
    var year = parseInt($("#slider").val());

    $(".MapMarker").each(function () {
        $(this).stop();
        var civilization = $(this).data("civilization");
        if (civilization.originYear <= year && civilization.endingYear > year) {
            $(this).fadeIn(125);
        } else {
            $(this).fadeOut(125);
        }
    });
}

//Faz o marcador do input range andar até a posição válida mais próxima
function snapToClosest() {
    var sliderValue = parseInt($("#slider").val());
    var closestDistance = 100000;
    var distance;
    var finalValue;

    //Comparação com os valores de início e queda das civilizações
    $(".MapMarker").each(function () {
        var civilization = $(this).data("civilization");

        if (civilization.originYear <= sliderValue) {
            distance = sliderValue - civilization.originYear;
        } else {
            distance = civilization.originYear - sliderValue;
        }

        if (distance < closestDistance) {
            finalValue = civilization.originYear;
            closestDistance = distance;
        }

        if (civilization.endingYear <= sliderValue) {
            distance = sliderValue - civilization.endingYear;
        } else {
            distance = civilization.endingYear - sliderValue;
        }

        if (distance < closestDistance) {
            finalValue = civilization.endingYear;
            closestDistance = distance;
        }
    });

    //Animação do marcador até o ponto definido
    var interval = setInterval(function () {
        if (finalValue > sliderValue) {
            var newVal = parseFloat($('#slider').val()) + 0.25;
        } else {
            var newVal = parseFloat($('#slider').val()) - 0.25;
        }

        $('#slider').val(newVal);
        
        //Chama o updateMarkers
        $('#slider').trigger("input");

        if (parseInt($('#slider').val()) == finalValue) {
            clearInterval(interval);
        }
        
    }, 1);


}

function selectMarker(marker) {
    //Estado atual do mapa é salvo
    saveMap();
    $(marker).css("pointer-events", "none");
    //Leitura da posição do marcador
    var origin = marker.position();

    var x = origin.left + marker.width() / 2;
    var y = origin.top + marker.height() / 2;

    //Setando o ponto de origem de Scale, faz o zoom ir na direção do marcador
    $('.Map').css({
        transformOrigin: "" + x + "px " + y + "px"
    });

    $('.Map').transition({
        scale: '5'
    }, 1250, "snap");

    marker.transition({
        scale: '5'
    }, 1250, "snap");

    $('.MapMarker').not(marker).fadeOut(100);

    transitionToCivilizationMenu(marker);
}

$(document).on('click', '.MapMarker', function () {
    selectMarker($(this));
});

$(document).on('input', '#slider', function () {
    updateMarkers();
});

$(document).on('change', '#slider', function () {
    snapToClosest();
});