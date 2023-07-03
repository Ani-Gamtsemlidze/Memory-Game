"use strict";

const imagesList = [
  "./images/image-1.png",
  "./images/image-4.png",
  "./images/image-3.png",
  "./images/image-2.png",
  "./images/image-6.png",
  "./images/image-7.png",
  "./images/image-5.png",
  "./images/image-3.png",
  "./images/image-2.png",
  "./images/image-7.png",
  "./images/image-4.png",
  "./images/image-8.png",
  "./images/image-1.png",
  "./images/image-5.png",
  "./images/image-8.png",
  "./images/image-6.png",
];

let clickedImages = [];
let moveCount = 0;

let seconds = 0;
let timer;
let notMatchMove = 0;

const guessImagesClick = document.getElementsByClassName("fab");

const startButton = document.querySelector(".game-start-btn");
const resetButton = document.querySelector(".fa-redo-alt");

startButton.addEventListener("click", function () {
  startButton.style.display = "none";
  document.querySelector(".timer").style.display = "block";
  startTimer();

  for (let index = 0; index < guessImagesClick.length; index++) {
    guessImagesClick[index].addEventListener("click", function () {
      const imageSrc = imagesList[index];

      const firstImage = this.closest(".card").querySelector(".friends-img");
      firstImage.src = imageSrc;

      clickedImages.push(firstImage);

      if (clickedImages.length === 2) {
        movesCount();

        if (clickedImages[0].src === clickedImages[1].src) {
          console.log("matched");
          clickedImages = [];
        } else if (clickedImages[0].src !== clickedImages[1].src) {
          setTimeout(() => {
            notMatchMovesCount();

            clickedImages[0].src = "";
            clickedImages[1].src = "";

            clickedImages = [];
          }, 1000);
        }
      }
    });
  }
});

function movesCount() {
  setTimeout(() => {
    moveCount++;
    document.querySelector(".moves-selector").textContent = moveCount;
  }, 1000);
}

function notMatchMovesCount() {
  notMatchMove++;
  if (notMatchMove === 3) {
    document.querySelector(".star-3").style.fontWeight = "100";
  } else if (notMatchMove === 15) {
    document.querySelector(".star-2").style.fontWeight = "100";
  } else if (notMatchMove === 20) {
    document.querySelector(".star-1").style.fontWeight = "100";
  }
}

// timer function

function startTimer() {
  clearInterval(timer);

  timer = setInterval(function () {
    seconds++;
    document.getElementById("time").textContent = seconds;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  seconds = 0;
  document.getElementById("time").textContent = seconds;
}

resetButton.addEventListener("click", function () {
  resetGame();
});

function resetGame() {
  seconds = 0;
  document.getElementById("time").textContent = 0;
  document.getElementById("time").style.display = "none";

  setTimeout(() => {
    document.getElementById("time").style.display = "block";
    document.querySelector(".star-3").style.fontWeight = "900";
    document.querySelector(".moves-selector").textContent = 0;
    notMatchMove = 0;
    moveCount = 0;
  }, 1000);
}
