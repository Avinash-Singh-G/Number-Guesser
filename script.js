const msgEl = document.getElementById('msg');
const randomNum=getRandomNumber();
console.log(randomNum);

//random number generator
function getRandomNumber()
{
    return Math.floor(Math.random()*100) + 1;
}

//write what user speaks
function writeMessage(msg){
    msgEl.innerHTML=`
    <div>You said: </div>
    <span class="box">${msg}</span>
    `;
}

//check message is correct or not
function checkNumber(msg) {
    const num =+ msg;
    if(Number.isNaN(num))
    {
        msgEl.innerHTML+='<div>That is not a valid number</div>';
        return;
    }

    if(num>100 || num<1)
    {
        msgEl.innerHTML+='<div>Number out of range</div>';
        return;
    }

    if(num===randomNum)
    {
        document.body.innerHTML=`
        <h2>Congrats! You have guessed the number!<br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    }
    else if(num>randomNum)
    {
        msgEl.innerHTML+='<div>GO Lower</div>';
    }
    else
    {
        msgEl.innerHTML+='<div>GO Higher</div>';
    }
}

//capture the spoken word 
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

window.SpeechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start recognition
recognition.start(); 

//speak result
recognition.addEventListener('result', onSpeak);

//end speechrecognition
recognition.addEventListener('end', ()=>recognition.start());

document.body.addEventListener('click', (e)=>{
    if(e.target.id == 'play-again')
    {
        window.location.reload();
    }
})