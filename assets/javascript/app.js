///////////////////////////////////////////////////
//          Global Variables
//////////////////////////////////////////////////
var secondCountDown;    //time counter 
var myTimer;            //timer handle
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
            answer:[2,"Arizona became the 48th state on February 14, 1912."]
        },
        {   question: "Which one of the following fish are found only in Arizona?",
            choices:["Desert Tilapia","Spring snaper","Navajo catfish","Arizona trout"],
            answer:[4,"The Arizona trout is found only in the Arizona"]
        },
        {   question: "When was the city of Phoenix established?",
            choices:["1866","1918","1905","1854"],
            answer:[1, "Phoenix originated in 1866 as a hay camp to supply Camp McDowell"]
        },
        {   question: "Where in Arizona was the famous labor leader Ceasar Chavez born?",
            choices:["Tucson","Buckeye","Yuma","Benson"],
            answer:[3,"The famous labor leader, Ceasar Estrada Chavez, was born in Yuma"]
        },
        {   question: "Which one of the following is a ghost town in Arizona?",
            choices:["Gillete","Bisbee","Cottonwood","Winslow"],
            answer:[1, "Gillette one of many ghost towns scattered throughout the state"]
        },
        {   question: "Where is the largest solar telescope in the world located?",
            choices:["Mount Lemmon","Picacho Peak","Fremont Peak","Kitt Peak"],
            answer:[4,"The world's largest solar telescope is located at Kitts Peak National Observatory in the city of Sells."]
        },
        {   question: "What is the oldest Indian settlement in the United state?",
            choices:["Canyon de Chelly","Oraibi","Montezuma Castle","Agua Fria"],
            answer:[2,"Oraibi is the oldest Indian settlement which was founded by Hopis Indians."]
        },
        {   question: "What is the state flower?",
            choices:["Ornge tree Blossom","saguaro cactus blossom","Palo verde tree blossom","Red bougainvillea flower"],
            answer:[2,"The saguaro cactus blossom is the official state flower"]
        },
        {   question: "What is the state's tree?",
            choices:["Saguaro","Vitex","Desert Willow","Palo Verde"],
            answer:[4,"The Palo verde is the official state tree"]
        },
        {   question: "What is the state's color?",
            choices:["Yellow and Green","Red and Blue","Blue and Gold","Turquoise and brown"],
            answer:[3,"Blue and Gold are the official state colors"]
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
        $(".timerDisplay").html("<h2>Game over!</h2><br><h3>You have:</h3>" + noResponse + " no response<br>" + correct + " correct<br>" + incorrect + " incorrect");
        $(".timerDisplay").show();
    }
    
    else 
    {   //still more questions. setup display
        var index = triviaGame.nextItem; //get the next question    
        $(".answer").hide(); //
        $(".card-header").text(triviaGame.items[index].question);

        //setup choices and show question 
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

    questionIndex = triviaGame.nextItem;
    console.log(questionIndex)
    answerIndex = triviaGame.items[questionIndex].answer[0];
    $(".detail-answer").html(triviaGame.items[questionIndex].answer[1]);
    console.log(answerIndex + "  " + checkedItem)

    if (checkedItem < 0 ) { // time expired without selection
        $(".status").html("No response.")
        noResponse++
    } else {
        if (checkedItem == answerIndex){
            $(".status").html("Correct!");
            correct++
        } else{
            $(".status").html("Dumb Ass");
            incorrect++
        };
    };
    checkedItem = -1; //reset chedked item to nothing
    $(".question").hide();
    $(".answer").show();
    waitTime = 2;
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
    if (waitTime > -1){
        if ( gameState==0 ){
            $(".timerDisplay").html("Time Remaining: "+ waitTime +" Seconds");
        }else{
            $(".timerDisplay").hide();
        }
    }else {
        stopTimer();
        changeGameState()
    }
    waitTime--;
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
    //showNextTrivia();
    gameState = 1;
    changeGameState()
});

$(".custom-control-input").on("click", function(){
    stopTimer();
    checkedItem = $(this).attr("id")[$(this).attr("id").length - 1];
    changeGameState();
});