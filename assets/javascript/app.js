///////////////////////////////////////////////////
//          Global Variables
//////////////////////////////////////////////////
var waitTime = 0;       //default to 30 seconds
var gameState = 0       //0 question, 1 = answer
var timerHandle = 0;    // timer handle
var checkedItem = -1;   //index of the checked item
var correct = 0;
var incorrect = 0;
var noResponse = 0;

//Game object
var triviaGame = {
    nextItem: -1,
    items: [
        {   question: "When did Arizona became a state?",
            choices:["March 18 1841","February 14 1912","January 17 1900","June 9 1931"],
            answer:[2,"Arizona became the 48th state on February 14, 1912."],
            gif:"https://media.giphy.com/media/4NgFCBUHleihKnUdAW/giphy.gif"
        },
        {   question: "Which one of the following fish are found only in Arizona?",
            choices:["Desert Tilapia","Spring snaper","Navajo catfish","Arizona trout"],
            answer:[4,"The Arizona trout is found only in the Arizona"],
            gif:"https://media.giphy.com/media/8FiM3I7AFGIPG1eXwU/giphy.gif"
        },
        {   question: "When was the city of Phoenix established?",
            choices:["1866","1918","1905","1854"],
            answer:[1, "Phoenix originated in 1866 as a hay camp to supply Camp McDowell"],
            gif:"https://media.giphy.com/media/1nP8JEjACoZTsWlGf4/giphy.gif"
        },
        {   question: "Where in Arizona was the famous labor leader Ceasar Chavez born?",
            choices:["Tucson","Buckeye","Yuma","Benson"],
            answer:[3,"The famous labor leader, Ceasar Estrada Chavez, was born in Yuma"],
            gif:"https://media.giphy.com/media/3o6ZsTh5FgkrpvQbss/giphy.gif"
        },
        {   question: "Which one of the following is a ghost town in Arizona?",
            choices:["Gillete","Bisbee","Cottonwood","Winslow"],
            answer:[1, "Gillette is one of many ghost towns scattered throughout the state"],
            gif:"https://media.giphy.com/media/Az1CJ2MEjmsp2/giphy.gif"
        },
        {   question: "Where is the largest solar telescope in the world located?",
            choices:["Mount Lemmon","Picacho Peak","Fremont Peak","Kitt Peak"],
            answer:[4,"The world's largest solar telescope is located at Kitts Peak National Observatory in the city of Sells."],
            gif:"https://media.giphy.com/media/pz7LNMYN2dj0hgKaHj/giphy.gif"
        },
        {   question: "What is the oldest Indian settlement in the United state?",
            choices:["Canyon de Chelly","Oraibi","Montezuma Castle","Agua Fria"],
            answer:[2,"Oraibi is the oldest Indian settlement which was founded by Hopis Indians."],
            gif:"https://media.giphy.com/media/U55ixFBBfHBrG/giphy.gif"//"https://media.giphy.com/media/MKz58ZJqq2Hdu/giphy.gif"
        },
        {   question: "What is the state flower?",
            choices:["Ornge tree Blossom","saguaro cactus blossom","Palo verde tree blossom","Red bougainvillea flower"],
            answer:[2,"The saguaro cactus blossom is the official state flower"],
            gif:"https://media.giphy.com/media/42uBGsYHmj41mo7w7Z/giphy.gif"
        },
        {   question: "What is the state's tree?",
            choices:["Saguaro","Vitex","Desert Willow","Palo Verde"],
            answer:[4,"The Palo verde is the official state tree"],
            gif:"https://media.giphy.com/media/U85Z0lxOwDoys/giphy.gif"
        },
        {   question: "What is the state's color?",
            choices:["Yellow and Green","Red and Blue","Blue and Gold","Turquoise and brown"],
            answer:[3,"Blue and Gold are the official state colors"],
            gif:"https://media.giphy.com/media/3kLgUflMwlkZ9BuUtK/giphy.gif"
        },            
    ],

};



//function for displaying the next trivia question
function showNextTrivia(){
    triviaGame.nextItem++
    if (triviaGame.nextItem > triviaGame.items.length - 1) 
    {
        //game over. prepare for replay.
        $(".card").hide();
        $(".btn").show();
        triviaGame.nextItem = -1;

        var response = "";
        if (noResponse > 0 ){
            response =  response + noResponse + " no response<br>" 
        }
        if (correct > 0){
            response = response  + correct + " correct<br>";
        }
        if (incorrect > 0){
            response = response + incorrect + " incorrect<br>";
        };

        $(".timerDisplay").html("<h2>Game over!</h2><br><h3>You have:</h3><br>" + response); //+ correct + " correct<br>" + incorrect + " incorrect<br>" + noResponse + " no response");
        $(".timerDisplay").show();
    }

    else 
    {   //still more questions. setup display
        var index = triviaGame.nextItem; //get the next question    
        $(".answer").hide();
        $(".card-header").text(triviaGame.items[index].question); //the question

        //setup answer choices
        for (var i=0; i<4; i++)
        {
            $("label[for='customRadioInline" + (i+1) + "']" ).text(triviaGame.items[index].choices[i]);
            $("input[name='customRadioInline" + (i+1) + "']").prop('checked', false);
        }
        $(".question").show();

        //set timer and wait for answer
        waitTime = 5;
        setTimer();
    }
};



// function for evaluating the usre response and showing the correct asnwer
// if the game is over it shows end status
function showTheAnswer(){ 

    questionIndex = triviaGame.nextItem; //get next trivia question
    answerIndex = triviaGame.items[questionIndex].answer[0]; //get asnwer index
    $(".detail-answer").html(triviaGame.items[questionIndex].answer[1]); //get answer verbiage
    $(".card-img").removeAttr ("src");
    $(".card-img").attr("src",triviaGame.items[questionIndex].gif); //get associa


    if (checkedItem < 0 ) { // time expired without selection
        $(".status").html("No response.")
        noResponse++
    } else {
        if (checkedItem == answerIndex){
            $(".status").html("Correct!");
            correct++
        } else{
            $(".status").html("Incorrect");
            incorrect++
        };
    };
    checkedItem = -1; //reset chedked item to nothing
    $(".question").hide();
    $(".answer").show();
    waitTime = 3;
    setTimer()
}



function changeGameState(){
    if (gameState == 0){
        gameState = 1
        showTheAnswer();
    }else{
        gameState = 0;
        showNextTrivia();
    };
};



function setTimer(){
    timerHandle = setInterval(waitTimer, 1000);
};



function waitTimer(){
    if (waitTime > -1){ //if the wait time is not over show time remaining
        $(".timerDisplay").html("Time Remaining: "+ waitTime +" Seconds");
    }else {
        stopTimer();
        changeGameState()
    }
    waitTime--; //decrement wait time
};



function stopTimer(){
    clearInterval(timerHandle);
};



$(document).ready(function(){
    $(".card").hide();
});


$(".btn").on("click", function(){
    $(this).hide() //hide yourself
    if($(this).text() === "Start Game"){
        $(this).text("Start Again")
    };
    //intitalize some varibles
    gameState = 1;
    correct = 0;
    incorrect = 0;
    noResponse = 0;
    checkedItem = -1
    changeGameState()
});

//user choice listener
$(".custom-control-input").on("click", function(){
    stopTimer();
    checkedItem = $(this).attr("id")[$(this).attr("id").length - 1]; //save checked item index
    changeGameState();
});