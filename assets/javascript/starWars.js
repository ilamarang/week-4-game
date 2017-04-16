var selectedPlayer;
var defenderPlayer;
var selectedPlayerNotAvailable = "Please select your character and enemy";
var enemyNotAvailable = "Please select your enemy to start playing"
var emptyString = "";
var totalHits = 0

var playerList = {

    "chewbacca": {
        name: "chewbacca",
        imageLocation: "./assets/images/Chewbecca.jpg",
        basePoints: 100,
        attackingPower: 5


    },

    "darth": {
        name: "darth",
        imageLocation: "./assets/images/Darth.jpg",
        basePoints: 150,
        attackingPower: 8
    },

    "greedo": {
        name: "greedo",
        imageLocation: "./assets/images/Greedo.jpg",
        basePoints: 180,
        attackingPower: 3
    },

    "yoda": {
        name: "yoda",
        imageLocation: "./assets/images/Yoda.jpg",
        basePoints: 140,
        attackingPower: 15
    },

};

var displayPlayers = function(player) {
    console.log(player.name);
    var $columnDisplay = $("<div class='col-md-3 col-sm-6'>");
    var $thumbNailDisplay = $("<div class='col-xs-12 thumbnail text-center'>");
    var $responsiveImageDisplay = $("<img class='img-responsive' width='100%'>").attr("src", player.imageLocation).attr("id", player.name);
    var $captionDiv = $("<div class='caption'>")
    var $captionAttackingPower = $("<h4 class='text-center'>")
    $captionAttackingPower.html(player.basePoints);
    //$($responsiveImageDisplay).appendTo($($thumbNailDisplay)).appendTo($($columnDisplay)).appendTo($(".choosePlayers"));
    
    ($responsiveImageDisplay).appendTo($thumbNailDisplay).appendTo($columnDisplay);
    $captionAttackingPower.appendTo($captionDiv);
    $captionDiv.appendTo($columnDisplay);
    $columnDisplay.appendTo($(".choosePlayers"));

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
                        defenderPlayer = playerList[$(this).attr("id")];
                        $(".gameResult").html(emptyString);

                    } else {

                        $clonePlayer.appendTo($(".selectedPlayer"));
                        selectedPlayer = playerList[$(this).attr("id")];
                    }

                    $(this).parent().fadeOut();
                }

            });

            $(".attack").on("click", function() {

                    //Check if the enemy is available
                    //alert(selectedPlayer.name);
                    
                    if (typeof selectedPlayer === 'undefined') {
                        $(".gameResult").html(selectedPlayerNotAvailable);
                        return;

                    } else if (typeof defenderPlayer === 'undefined') {
                        $(".gameResult").html(enemyNotAvailable);
                        return;
                    }

                    //Start the game after verification
                    totalHits++;

                    selectedPlayer.basePoints = selectedPlayer.basePoints - defenderPlayer.attackingPower;
                    defenderPlayer.basePoints = defenderPlayer.basePoints - (totalHits * selectedPlayer.attackingPower);
                    $("#attackMessage").html("You attacked " + defenderPlayer.name + " for " + (totalHits * selectedPlayer.attackingPower)+ " damage");    

                    //$(".gameResult").html("Your character points " + selectedPlayer.basePoints);
                    $(".selectedPlayer h4").html(selectedPlayer.basePoints);    
                    $(".defenderPlayer h4").html(defenderPlayer.basePoints);    
                    });

            });