const submitBtn = document.getElementById("submit-btn");
const userInput = document.getElementById("user-input");
const canvas = document.getElementById("canvas");
const reloadBtn = document.getElementById("reload");
const result = document.querySelector(".result");
let text = "";

function textGenerator() {
  let generatedText = "";
  //String.fromCharCode gives ASCII value from a given number
  //Total of 9 characters so loop of 3
  for (let i = 0; i < 3; i++) {
    //Capital letter 65-90
    generatedText += String.fromCharCode(randomNumber(65, 90));
    //Small letter 97-122
    generatedText += String.fromCharCode(randomNumber(97, 122));
    //Numbers 0 -9
    generatedText += String.fromCharCode(randomNumber(48, 57));
  }
  return generatedText;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawStringOnCanvas(string) {
  //getContext() function returns the drawing context that has all the drawing props and functions needed to drawon canvas
  let ctx = canvas.getContext("2d");
  //clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //array of text color
  const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
  //space between letters
  const letterSpace = 150 / string.length;
  //loop through string
  for (let i = 0; i < string.length; i++) {
    //Define initial space on X axis
    const xInitialSpace = 25;
    //Set font for canvas element
    ctx.font = "20px Arial";
    //set text color
    ctx.fillStyle = textColors[randomNumber(0, 1)];
    ctx.fillText(
      string[i],
      xInitialSpace + i * letterSpace,
      randomNumber(25, 40),
      100
    );
  }
}

function reloadText() {
  //clear input
  userInput.value = "";
  text = textGenerator();
  //Randomize the position of all characters
  text = [...text].sort(() => Math.random() - 0.5).join("");
  drawStringOnCanvas(text);
}

reloadBtn.addEventListener("click", reloadText);

window.onload = () => reloadText();

setTimeout(() => {
  submitBtn.addEventListener("click", () => {
    if (userInput.value === text) {
      result.innerText = "Correct";
      result.style.color = "#5cb85c";
    } else {
      result.innerText = "Incorrect";
      result.style.color = "#ff3333";
      reloadText();
    }
  });
}, 3000);
