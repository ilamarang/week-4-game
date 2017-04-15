var selectedPlayer;
var defenderPlayer;

var playerList = {

    "chewbacca": {
        name: "chewbacca",
        imageLocation: "./assets/images/Chewbecca.jpg",
        basePoints: 100,
        attackingPower: 5,
        hits:0

    },

    "darth": {
        name: "darth",
        imageLocation: "./assets/images/Darth.jpg",
        basePoints: 150,
        attackingPower: 8,
        hits:0
    },

    "greedo": {
        name: "greedo",
        imageLocation: "./assets/images/Greedo.jpg",
        basePoints: 180,
        attackingPower: 3,
        hits:0
    },

    "yoda": {
        name: "yoda",
        imageLocation: "./assets/images/Yoda.jpg",
        basePoints: 140,
        attackingPower: 15,
        hits:0
    },

};

var displayPlayers = function(player) {
    console.log(player.name);
    var $columnDisplay = $("<div class='col-md-3 col-sm-6'>");
    var $thumbNailDisplay = $("<div class='col-xs-12 thumbnail text-center'>");
    var $responsiveImageDisplay = $("<img class='img-responsive' width='100%'>").attr("src", player.imageLocation).attr("id",player.name);

    //$($responsiveImageDisplay).appendTo($($thumbNailDisplay)).appendTo($($columnDisplay)).appendTo($(".choosePlayers"));
    $responsiveImageDisplay.appendTo($thumbNailDisplay).appendTo($columnDisplay);

    $columnDisplay.appendTo($(".choosePlayers"))
}

var initialize = function() {

    //Build the list of all players and display them in the appropriate section.
    for (var key in playerList) {
        if (playerList.hasOwnProperty(key)) {
            displayPlayers(playerList[key]);
        }
    }
}

$(document).ready(function() {


    initialize();

    $(".img-responsive").on("click", function() {
        
        if ($(".defenderPlayer").children().length === 0) {
            var $clonePlayer = $(this).clone();
            if ($(".selectedPlayer").children().length > 0) {
                $clonePlayer.appendTo($(".defenderPlayer"));
                console.log($(this).attr("id"));
                

            } else {

                $clonePlayer.appendTo($(".selectedPlayer"));
                selectedPlayer = playerList[$(this).attr("id")];
            }

            $(this).parent().fadeOut();
        }
        
    });

    $(".attack").on("click", function() {
        
        //Check if the enemy is available
        alert(selectedPlayer.name);
        $(".gameResult").innerHTML = "Hello";

    });

});