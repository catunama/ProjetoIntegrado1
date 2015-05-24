$(document).on("click", "#soundButton.Active", function () {
    $(this).removeClass("Active");
    $(this).addClass("Inactive");
    createjs.Sound.setVolume(0);
});

$(document).on("click", "#soundButton.Inactive", function () {
    $(this).removeClass("Inactive");
    $(this).addClass("Active");
    createjs.Sound.setVolume(1);
});

function fadeVolumeDown(volume, completion) {
    var volumeDown = setInterval(function () {
        var currentVolume = createjs.Sound.getVolume();
        currentVolume -= 0.1;

        if (currentVolume <= volume) {
            completion();
            clearInterval(volumeDown);
        } else {
            createjs.Sound.setVolume(currentVolume);
        }

    }, 200);
}

function fadeVolumeUp(volume) {
    var volumeDown = setInterval(function () {
        var currentVolume = createjs.Sound.getVolume();
        currentVolume += 0.1;

        if (currentVolume >= volume) {
            clearInterval(volumeDown);
        } else {
            createjs.Sound.setVolume(currentVolume);
        }

    }, 200);
}

function transitionToSoundNamed(name) {

    fadeVolumeDown(0, function () {
        createjs.Sound.stop();
        createjs.Sound.play(name);
        fadeVolumeUp(1);
    });
}