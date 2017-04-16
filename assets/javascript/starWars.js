var selectedPlayer;
var defenderPlayer;
var selectedPlayerNotAvailable = "Please select your character and enemy";
var enemyNotAvailable = "Please select your enemy to start playing"
var emptyString = "";
var totalHits = 0;
var defenderBasePoints=0;


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
    console.log(player.basePoints);
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



    $(".attack").on("click", function() {

        //Check if the enemy is available
        //alert(selectedPlayer.name);
        
        if (typeof selectedPlayer === 'undefined' || selectedPlayer === null) {
            $(".gameResult").html(selectedPlayerNotAvailable);
            return;

        } else if (typeof defenderPlayer === 'undefined' || selectedPlayer === null) {
            $(".gameResult").html(enemyNotAvailable);
            return;
        }
        if (totalHits > 0 && selectedPlayer.basePoints < 0) {
            //$(".gameResult").html("Your character points " + selectedPlayer.basePoints);                        
            return;
        }
        if(selectedPlayer.basePoints < 0 || defenderPlayer.basePoints < 0) {
            return;
        }

        //Start the game after verification
        totalHits++;

        selectedPlayer.basePoints = selectedPlayer.basePoints - defenderPlayer.attackingPower;
        defenderPlayer.basePoints = defenderPlayer.basePoints - (totalHits * selectedPlayer.attackingPower);
        defenderBasePoints = defenderPlayer.basePoints;
        $("#attackMessage").html("You attacked " + defenderPlayer.name + " for " + (totalHits * selectedPlayer.attackingPower) + " damage");

        //$(".gameResult").html("Your character points " + selectedPlayer.basePoints);
        $(".selectedPlayer h4").html(selectedPlayer.basePoints);
        $(".defenderPlayer h4").html(defenderPlayer.basePoints);
        
        if(selectedPlayer.basePoints < 0) {
           $(".gameResult").html("Game Over - Please click Restart"); 
           $("#attackMessage").html("");
        }
        else if (defenderPlayer.basePoints < 0) {
            $(".gameResult").html("You won!! Please Restart or Choose another Enemy");    
            $("#attackMessage").html("");
            defenderBasePoints = 0;
        }
        console.log($(".choosePlayers").children().length);
        if($(".choosePlayers").children().length===0) {
             $(".gameResult").html("You have won all enemies! - Click Restart"); 
           $("#attackMessage").html("");

        }

    });

    $(".restart").on("click", function() {
        //Delete all child elements created
        $(".selectedPlayer").empty();
        $(".defenderPlayer").empty();
        $(".choosePlayers").empty();
        selectedPlayer = null;
        defenderPlayer = null;
        playerList["chewbacca"].basePoints = 100;
        playerList["darth"].basePoints = 150;
        playerList["greedo"].basePoints = 180;
        playerList["yoda"].basePoints = 140;

        totalHits = 0
        initialize();

    });

    document.getElementById("playerList").addEventListener("click", function(e) {
        
        if (e.target && e.target.matches("img.img-responsive")) {

            if ($(".defenderPlayer").children().length === 0 || (defenderBasePoints <=0)) {
                var $clonePlayer = $(e.srcElement).clone();

                if ($(".selectedPlayer").children().length > 0) {
                    if(!isEmpty(defenderPlayer))
                    {
                        if(defenderPlayer.basePoints<= 0) {
                            $(".defenderPlayer").empty();   
                            } 
                            else {
                                return;
                            }   
                    }

                    
                    $clonePlayer.appendTo($(".defenderPlayer"));
                    console.log($(e.srcElement).attr("id"));
                    defenderPlayer = playerList[$(e.srcElement).attr("id")];
                    $(".gameResult").html(emptyString);
                    var $captionAttackingPower = $("<h4 class='text-center'>")
                    $captionAttackingPower.html(defenderPlayer.basePoints);
                    $captionAttackingPower.appendTo($(".defenderPlayer"));

                } else {

                    $clonePlayer.appendTo($(".selectedPlayer"));
                    selectedPlayer = playerList[$(e.srcElement).attr("id")];
                    var $captionAttackingPower = $("<h4 class='text-center'>")
                    $captionAttackingPower.html(selectedPlayer.basePoints);
                    $captionAttackingPower.appendTo($(".selectedPlayer"));
                }

                $(e.srcElement).parent().fadeOut();
            }
        }

    });

    var isEmpty = function(obj) {
  for (var key in obj)
    if(obj.hasOwnProperty(key))
      return false;
  return true;
}

});