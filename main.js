/*
        ===============================
        useful Javascript code snippets
        ===============================
*/

/* code 1 - javascript for button press (see css as well) */

var button = document.getElementsByTagName("button");
button[0].addEventListener("click", clickedButton);

function clickedButton() {
    var button = document.getElementsByClassName("bigButton");
    button[0].classList.add('pressed');
    setTimeout (removePress, 500);
}

function removePress() {
    var button = document.getElementsByClassName("bigButton");
    button[0].classList.remove('pressed');
    explosion.play();
    explosion.addEventListener("ended", closeCall);
}

/* code 2 - javascript for creation of an array from a json file (see json as well) */

function createQuestionArray() {
    questionArray = [];
    fetch("./assets/questions.json")
    .then((res) => {
      return res.json();
    }).then ((jsonQuestions) => {
      questionArray = jsonQuestions;
    })
    .catch((err) => {
      console.error(err);
    });
  }

  /* code 3 - setting event timers for multiple buttons (see html as well, this was for a quiz) */

  document.querySelectorAll("button").forEach((b)=>b.addEventListener("click", buttonPressed));

  function buttonPressed(event){
    var button = event.target;
    var buttonPressed = button.innerText;
    event.preventDefault();
    answerButtons = document.getElementsByClassName("answerButton");
    if (buttonPressed === "START") {
      newHighScoreSound.pause();
      newHighScoreSound.currentTime = 0;
      crowdBooingSound.pause();
      crowdBooingSound.currentTime = 0;
      if (playSound) {
        standardButtonClickSound.play();
      }
      if (playingGame === false) {
        hideDiv.style.visibility = "visible";
        rulesButton.innerHTML = "";
        playingGame = true;
        startQuitDisplayed();
        setTimer();
        questionToAsk = Math.floor(Math.random() * questionsLeft);
        setTimeout(askQuestion, 1000);
      }
    } else if (buttonPressed === "SIMPLIFY") {
        if (playingGame && !easierFlag && playSound) {
          simplifyButtonSound.play();
        }
        simplifyButton.innerHTML = "";
        easierFlag = true;
        simplifyAnswers();
      } else if (buttonPressed === "QUIT") {
      if (playingGame === true) {
        playingGame = false;
        currentScore = 0;
        if (highScore > previousHighScore) {
          highScore = previousHighScore;
          if (highScore < 10) {
            document.getElementById("highScore").innerHTML = "Best 0"+highScore;
          } else {
            document.getElementById("highScore").innerHTML = "Best "+highScore;
          }
        }
        countdownSound.pause();
        countdownSound.currentTime = 0;
        crowdBooingSound.pause();
        crowdBooingSound.currentTime = 0;
        newHighScoreSound.pause();
        newHighScoreSound.currentTime = 0;
        if (playSound) {
          endGameSound.play();
        }
        playingGame = false;
        timeLeft = 0;
        simplifyButton.innerHTML = "";
        startButton.innerHTML = "";
        quitButton.innerHTML = "";
        setTimeout(endGame, 1500);
      }
    } else {
      simplifyButton.innerHTML = "";
      for (i=0; i<3; i++) {
        if (buttonPressed === answerButtons[i].innerText) {
          if (correctPos === i && playingGame) {
            incorrectPos = -1;
            if (playSound) {
              correctAnswerSound.play();
            }
            highlightAnswers();
            quitButton.innerHTML = "";
            setTimeout(contGame, 1500);
          } else if (correctPos !== i && answerArray[i] !== "" && playingGame) {
            incorrectPos = i;
            if (playSound) {
              incorrectAnswerSound.play();
            }
            highlightAnswers();
            playingGame = false;
            quitButton.innerHTML = "";
            setTimeout(endGame, 1500);
          }
        }
      }
    }
  }

  /* code 4 - javascript for creating a high score cookie */

  function checkCookie() {
    hiScoreCookie = document.cookie;
    if (hiScoreCookie === "") {
      alert("This site uses a cookie to store your high score. Please click OK to accept this cookie and play the quiz or close the browser tab to exit without setting a cookie.");
      document.cookie = "highScore=0; expires=Sat, 23 Nov 3000 12:00:00 UTC";
      highScore = 0;
    } else {
      partScoreCookie = document.cookie.split("=");
      setHiScore = partScoreCookie[1];
      getNumber = parseInt(setHiScore);
      highScore = getNumber;
      previousHighScore = highScore;
      if (highScore < 10) {
        document.getElementById("highScore").innerHTML = "Best 0"+highScore;
      } else {
        document.getElementById("highScore").innerHTML = "Best "+highScore;
      }
    }
  }