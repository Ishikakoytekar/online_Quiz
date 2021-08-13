const qNo=document.querySelector(".qno");
const qText=document.querySelector(".qtext");
const optionContainer=document.querySelector(".option-container");
const homeBox=document.querySelector(".home-box");
const quizBox=document.querySelector(".quiz");
const resultBox=document.querySelector(".result-box");
let qCounter=0;
let currentQ;
let availableQ=[];
let availableOptions=[];
let correctAns = 0;
let attempt = 0;

function setAvailableQ(){               //push q in array
    const totalQ=quiz.length;
    for(let i=0; i<totalQ; i++){
        availableQ.push(quiz[i])
    }
}

function getNewQ(){         //random q
    qNo.innerHTML="Question"+" "+(qCounter + 1);

    //get random q
    const qIndex= availableQ[Math.floor(Math.random() * availableQ.length)];
    currentQ=qIndex;
    qText.innerHTML=currentQ.q;
    //get positions of q
    const temp=availableQ.indexOf(qIndex);
    //remove qindex so q does not repeat
    availableQ.splice(temp,1);
    //get options
     //push options in array
    const  optionLen=currentQ.options.length
    for(let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }
    optionContainer.innerHTML = '';
    let animationDelay =0.2;
    //cretating options 
    for(let i=0; i<optionLen; i++){
        const optionIndex= availableOptions[Math.floor(Math.random() * availableOptions.length)];    //random options
        //get position option 
        const temp1=availableOptions.indexOf(optionIndex);
         //remove optionindex so options does not repeat
        availableOptions.splice(temp1,1);

        const option = document.createElement("div");
        option.innerHTML = currentQ.options[optionIndex];
        option.id=optionIndex;
        option.style.animationDelay=animationDelay + 's';
        animationDelay=animationDelay+0.15;
        option.className="option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick","getResult(this)");
    }
   

    qCounter++;
}

//get result
function getResult(element){
    const id = parseInt(element.id);
    //comparing id and getting correct option
    if(id==currentQ.answer){
        element.classList.add("correct");   //green color
        correctAns++;
        console.log("correct:"+correctAns)
    }
    else{
        element.classList.add("wrong");   //red color

        //if ans is incorrect show correct ans
        const optionLen =optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id == currentQ.answer)){
                optionContainer.children[i].classList.add("correct");
            }
        }
            
        
    }
    attempt++;
    unclickableOptions();
}
//restrict user to click more than 1 option
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");

    }

}
function quizResult(){
//resultBox.querySelector(".total-q").innerHTML=quiz.length;
    resultBox.querySelector(".total-score").innerHTML=correctAns + "/" + quiz.length;
}
function quizOver(){
    //hide quiz box
    quizBox.classList.add("hide");
    //show result box
    resultBox.classList.remove("hide");
   quizResult();
   //resultB();
}

function next(){
    if(qCounter == quiz.length){
        console.log("quiz over");
        quizOver();
    }
    else{
        getNewQ();
    }
}


function resultB(){
    //hide home box
    homeBox.classList.add("hide");
    //show result box
    resultBox.classList.remove("hide");
}
function resetQuiz(){
    qCounter=0;
    correctAns=0;
    attempt=0;
}
function exit(){
   window.close();
}
function home(){
    //hide result box
    resultBox.classList.add("hide");
    //show gome box
    homeBox.classList.remove("hide");
    resetQuiz();
}
function startQuiz(){
    //hide home box
    homeBox.classList.add("hide");
    //show quiz box
    quizBox.classList.remove("hide");
    setAvailableQ();
    getNewQ();
}
window.onload=function(){
    setAvailableQ();
    getNewQ();
    
}

