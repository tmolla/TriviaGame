$(".btn").click(function(){
    $(".btn").hide();  
    $(".card").show();

    myTimer = setInterval(updateClock, 1000)

    $(".lead").show();
    secondCountDown = 29;
    updateClock()
    

});

var secondCountDown;
var myTimer;

function updateClock(){
    if (secondCountDown > -1) {
        $(".lead").html("Time Remaining: "+ secondCountDown +" Seconds");
    }
    else {
        stopClock();
    }
    secondCountDown--;
};
function stopClock(){
    clearInterval(myTimer);
}

function showAnswer(){

}

function getNextTrivaQuestion() {

}

$(document).ready(function(){
    //i = 29;
    $(".card").hide();
    $(".lead").hide();
    //myTimer = setInterval(updateClock, 1000)
    //console.log("set timer " + myTimer);
});

$(".custom-control-input").on("click", stopClock);