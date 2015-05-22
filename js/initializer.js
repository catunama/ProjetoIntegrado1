var preload = new createjs.LoadQueue(true);
var line;
var civilizations = [];

//Uso da biblioteca PreloadJS, para um carregamento prévio de todas as mídias usadas
function loadAssets() {
    //O manifest é uma lista de mídias que serão carregadas
    var imgManifest = [];

    //Cada erro que ocorrer será lidado com a função handleError
    preload.on("error", handleError);

    //A cada item carregado, este evento aciona handleProgress
    preload.on("progress", handleProgress);

    //Cada uma das imagens possui um path e são obtidas pelo seu id posteriormente
    //preloadjs.getResult("id")

    var img = {
        src: "seta.png",
        id: "seta"
    };
    imgManifest.push(img);

    img = {
        src: "mapNavIcon.png",
        id: "mapNavItem"
    };
    imgManifest.push(img);

    img = {
        src: "cultureNavIcon.png",
        id: "cultureNavItem"
    };
    imgManifest.push(img);

    img = {
        src: "bg.png",
        id: "bg"
    };
    imgManifest.push(img);

    //Mídia variável, lida de cada uma das civilizações cadastradas
    $.each(civilizations, function () {
        //Fundo para os botões
        img = {
            src: "Civilizacoes/" + this.name + "/menu.png",
            id: "menu" + this.name
        };
        imgManifest.push(img);

        //Textura de background da pagina inicial da civilização
        img = {
            src: "Civilizacoes/" + this.name + "/menuBackground.png",
            id: "menuBackground" + this.name
        };

        imgManifest.push(img);

        //Textura de background da teogonia da civilização
        img = {
            src: "Civilizacoes/" + this.name + "/Teogonia/teogonyBackground.png",
            id: "teogonyBackground" + this.name
        };

        imgManifest.push(img);


        //Botões
        img = {
            src: "Civilizacoes/" + this.name + "/Cosmogonia/Botao.png",
            id: "cosmogonyButton" + this.name
        };
        imgManifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Teogonia/Botao.png",
            id: "teogonyButton" + this.name
        };
        imgManifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/Botao.png",
            id: "cultureButton" + this.name
        };
        imgManifest.push(img);

        //Botões cultura
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/ManifestacaoCultural.png",
            id: "culturalManifestationButton" + this.name
        };
        imgManifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/MetodoDeSubsistencia.png",
            id: "subsistenceMethodButton" + this.name
        };
        imgManifest.push(img);
        img = {
            src: "Civilizacoes/" + this.name + "/Cultura/EstruturaSocial.png",
            id: "socialStructureButton" + this.name
        };
        imgManifest.push(img);

        //Botoes de navegação
        img = {
            src: "Civilizacoes/" + this.name + "/mainNavItem.png",
            id: "mainNavItem" + this.name
        };
        imgManifest.push(img);

        //Imagens dos Deuses
        $.each(this.gods, function () {
            img = {
                src: "Civilizacoes/" + this.civilization.name + "/Teogonia/" + this.name + ".png",
                id: this.name
            };
            imgManifest.push(img);
        });
    });

    preload.loadManifest(imgManifest, true, "Conteudo/");
}

function handleComplete() {
    $("#progress").fadeOut();
    $("#mainDiv").fadeIn();
    $("#mainDiv *").fadeIn();
    $("#MenuButton").fadeIn();
    updateMarkers();
}

function handleError() {
    console.log("erro");
}

//Animação da barra de carregamento de acordo com o progress informado no evento
function handleProgress(event) {
    line.animate(event.progress, function () {
        if (event.progress == 1)
            handleComplete();
    });
}

$(document).ready(function () {

    //Leitura do XML
    $.ajax({
        type: "GET",
        url: "Conteudo/Civilizacoes.xml",
        dataType: "xml",
        success: parseXML
    });

    //Elementos iniciais são escondidos e só reaparecem após o carregamento
    $("#mainDiv").fadeOut(10);
    $("#mainDiv *").fadeOut(10);
    $("#MenuButton").fadeOut(10);

    //ponto de transformação do menu mudado para o canto esquerdo
    $('#menuDiv').css({
        transformOrigin: "0px 0px"
    });
    $("#menuDiv").transition({
        scale: "0"
    }, 0);

    //Uso da biblioteca progressBar para a criação de uma barra de carregamento em SVG
    line = new ProgressBar.Line('#progress', {
        color: '#FCB03C'
    });
});

function parseXML(xml) {

    //Para cada civilização lida no XML, é criado um objeto Civilization e este é salvo no array civilizations
    $(xml).find("Civilization").each(function () {
        var civilization = new Civilization($(this));
        civilizations.push(civilization);
    });

    //Carregamento de arquivos, feito aqui pois depende dos objetos Civilization 
    loadAssets();


    $.each(civilizations, function () {
        //Criação do marcador de mapa
        $("#mapDiv").append("<img src='Conteudo/Civilizacoes/" + this.name + "/MarcadorMapa.png' alt='Cidade " + this.name + "' id='" + this.name + "' class='MapMarker'/>");

        var marker = $("#" + this.name);

        //Posicionamento de acordo com os dados do XML
        marker.css("top", this.mapMarker.topSpace);
        marker.css("left", this.mapMarker.leftSpace);

        marker.data("civilization", this);

        //Criação do ícone no menu
        $("#menuUl").append("<li id='menuRow" + this.name + "' class='menuRow'><p><img src='Conteudo/Civilizacoes/" + this.name + "/MarcadorMapa.png' class='menuIcon'/>" + this.name + "</p>");

        $("#menuRow" + this.name).data("civilization", this);


    });

    civilizations = [];

    $("#menuDiv").mCustomScrollbar({
        theme: "dark-thin"
    });

    //Ícones de marcadores no mapa são carregados
    updateMarkers(); //map.js
}