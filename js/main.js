// select all elements
const instrct = document.getElementById("instrct");    
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qimg = document.getElementById("qimg");
const choiceA= document.getElementById("A");
const choiceB= document.getElementById("B");
const choiceC= document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge= document.getElementById("timeGauge");
const timg = document.getElementById("timg");    
const progress= document.getElementById("progress");
const scoreDiv= document.getElementById("scoreContainer");  
const quizbox= document.getElementById("quizbox");  

    
// create our questions
let questions = [
  {
      question : "1). Select the property used to create space between the element’s border and inner content?",
      imgSrc : "img/quiz.svg",
      choiceA : "Padding",
      choiceB : "Spacing",
      choiceC : "Margin",
      correct : "A"
  },
   {
      question : "2). In CSS, Select the property used to set the spacing in between lines of text?",
      imgSrc : "img/quiz.svg",
      choiceA : "line-spacing",
      choiceB : "line-height",
      choiceC : "letter-spacing",
      correct : "B"
   },
    {
      question : "3). Select the correct option to open a link in a new browser window?",
      imgSrc : "img/quiz.svg",
      choiceA : "a href='url' target='new'",
      choiceB : "a href='url' target='_window'",
      choiceC : "a href='url' target='_blank'",
      correct : "C"
    },
    {
      question : "4). Select the correct option to create an e-mail link?",
      imgSrc : "img/quiz.svg",
      choiceA : "a href=mailto:xxx@yyy.com",
      choiceB : "a href='xxx@yyy.com'",
      choiceC : "Mail href='xxx@yyy.com'",
      correct : "A"
  },
    {
      question : "5). In CSS, choose the correct option to select this image by its id? (img id='mainpic' src='cat.png')",
      imgSrc : "img/quiz.svg",
      choiceA : "mainpic { }",
      choiceB : ".mainpic { }",
      choiceC : "#mainpic { }",
      correct : "C"
  },
    {
      question : "6). Which of the following methods removes the last element from an array and returns that element?",
      imgSrc : "img/quiz.svg",
      choiceA : "get( )",
      choiceB : "pop( )",
      choiceC : "last( )",
      correct : "B"
  },
    {
      question : "7). Select a function of Array object which returns a new array comprised of the current array /or its value(s)?",
      imgSrc : "img/quiz.svg",
      choiceA : "concat( )",
      choiceB : "pop( )",
      choiceC : "some( )",
      correct : "A"
  },
    {
      question : "8). Which of the following method of Boolean object returns a string depending upon the value of the object?",
      imgSrc : "img/quiz.svg",
      choiceA : "toSource( )",
      choiceB : "valueOf( )",
      choiceC : "toString( )",
      correct : "C"
  },
    {
      question : "9). Which of the following will return the type of the arguments passed to a function?",
      imgSrc : "img/quiz.svg",
      choiceA : "using getType function",
      choiceB : "using typeof operator",
      choiceC : "Both of the above",
      correct : "B"
  },
    {
      question : "10). Which of the following class centers tabs/pills?",
      imgSrc : "img/quiz.svg",
      choiceA : ".nav-justified",
      choiceB : ".nav-stacked",
      choiceC : ".nav Nav-pills",
      correct : "A"
  }
];

// create some variables
const lastQuestion = questions.length-1;
let runningQuestion = 0;

let count = 0;
const questionTime = 10; //10s
const gaugeWidth = 150; //150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

//render a question
function renderQuestion(){
    let q = questions[runningQuestion];    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qimg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
    
function startQuiz(){
instrct.style.display = "none";    
start.style.display = "none";
renderQuestion();
quiz.style.display = "block";
renderProgress();
renderCounter();
TIMER = setInterval(renderCounter,1000); // 1000ms
}

//render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

    timg.innerHTML = "<img src='img/timer1.svg'>";
function renderCounter(){
    
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++;
    }
    else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }
        else{
        // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
} 

// checkAnswer
function checkAnswer(answer){
    if(answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }
    else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }
    else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

//answer is correct
function answerIsCorrect(){
    
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

//answer is Wrong
function answerIsWrong(){
    
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block"; 
    
    //calculate the amount of question percent answered by the user
    const scorePercent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePercent 
     let img = (scorePercent >= 80) ? "img/rsltimg/5.png" : (scorePercent >= 60) ? "img/rsltimg/4.png" : (scorePercent >= 40) ? "img/rsltimg/3.png" : (scorePercent >= 20) ? "img/rsltimg/2.png" : "img/rsltimg/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>Your Result : "+ scorePercent +"%</p>";
    
    counter.style.animation = "none";
    timg.style.animation = "none";
    quiz.style.display = "none";
    
    var aTag = document.createElement('a');
    var a2Tag = document.createElement('a');
    
    aTag.setAttribute('href',"index.html");
    aTag.setAttribute('class',"home-page");
    aTag.textContent="Home";
    
    a2Tag.setAttribute('href',"quiz.html");
    a2Tag.setAttribute('class',"start-again");
    a2Tag.textContent="Start Quiz Again";
    
    scoreDiv.appendChild(aTag);
    scoreDiv.appendChild(a2Tag);
    
}




