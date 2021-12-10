var playing = false;
var score;
var trialsLeft; 
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'pineapple', 'watermelon']; //array for random fruits
var step;
var action; //used mfor setInterval
$(function(){
    //Click on start reset button
    $("#startreset").click(function(){
        //are we playing?
        if(playing == true){
            //reload page
            location.reload();
        }else{ 
            //we are not playing
            playing = true; //game is initiated
            //set score to 0
            score = 0; //set score to 0
            $("#scorevalue").html(score);
            //show trials left
            $("#trialsLeft").show();
            trialsLeft = 3
            addHearts();
            //hide game over box
            $("#gameOver").hide();
            //change button text to reset game
            $("#startreset").html("Reset Game");
            startAction ();
        }
    });


    $('#fruit1').mouseover(function(){
        score++;
        $("#scorevalue").html(score); //update score
//      document.getElementById("sliceSound").play(); //for play sound
        $("#sliceSound")[0].play();//jquery selector for play sound
//        //without animation, stop fruit and hide it
//        stopAction();
//        //send new fruit
//        startAction();
        //hide fruit through animation
        clearInterval(action);//stop fruit
        $("#fruit1").hide("explode", 500); //slice fruit ; this method work in jquery ui
        setTimeout(startAction, 500); //will take 500 mili seconds
    });
        
//slice a fruit
    //play sound
    //explolde fruit

    //function
    function addHearts(){
        $("#trialsLeft").empty();//for removing hearts
        for(i=0; i< trialsLeft; i++){
            $("#trialsLeft").append('<img src="images/heart.png" class="life">');
        }
    }
    //start sending fruits
    function startAction(){
    //    $("#fruitsContainer").append('<img src="images/apple.png" class="fruit"</img>') //other method to show fruit
        //gennere a fruit
        $("#fruit1").show();
        chooseFruit(); //choose a random fruit
        $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
        //generate a random step
        step = 1 + Math.round(5*Math.random()); //change step
        //Move fruits down by one step every 10ms
        action = setInterval(function(){
            $("#fruit1").css('top', $("#fruit1").position().top + step);//Move fruits down by one step
            //check if the fruit is too low
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                //check if we have trials left
                if(trialsLeft > 1){
                    //gennere a fruit
                    $("#fruit1").show();
                    chooseFruit(); //choose a random fruit
                    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50}); //random position
                    //generate a random step
                    step = 1 + Math.round(5*Math.random()); //change step
                    //reduce trials by one
                    trialsLeft --;
                    //populate trialsLeft Box
                    addHearts();
                }else{//game over
                    playing = false; //we are not playing anymore
                    $("#startreset").html("Start Game"); //change button to start Game
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Your score is ' + score + '</p>');
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        }, 10);
    }
    //generate a random fruit
    function chooseFruit(){
    //    $("#fruit1").attr('src', 'images/apple.png'); //attr means attribute
        $("#fruit1").attr('src', 'images/' + fruits[Math.round(8*Math.random())] + '.png'); //for random fruits 
    }
    //random number between 0 and 8 an drandom postion
    //resized time width 100 px height

    //Stop dropping fruits
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
});