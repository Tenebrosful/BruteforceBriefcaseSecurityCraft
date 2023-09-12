import robot from "robotjs";

// @TODO : Find a way to locate buttons automatically to adapt the coordinates to the screen size and GUI size

/**
 * @type {{x: number, y: number}[]}
 */
const upButton = [
  { x: 1200, y: 600 },
  { x: 1250, y: 600 },
  { x: 1300, y: 600 },
  { x: 1350, y: 600 },
];

/**
 * @type {{x: number, y: number}}
 */
const validButton = { x: 1450, y: 660 };

function addUnit() {
  robot.moveMouse(upButton[3].x, upButton[3].y);
  robot.mouseClick();
}

function addTens() {
  robot.moveMouse(upButton[2].x, upButton[2].y);
  robot.mouseClick();
  addUnit();
}

function addHundreds() {
  robot.moveMouse(upButton[1].x, upButton[1].y);
  robot.mouseClick();
  addTens();
}

function addThousands() {
  robot.moveMouse(upButton[0].x, upButton[0].y);
  robot.mouseClick();
  addHundreds();
}

function changeNumber(number) {
  if (number % 1000 === 0) addThousands();
  else if (number % 100 === 0) addHundreds();
  else if (number % 10 === 0) addTens();
  else addUnit();
}

const startingTime = Date.now();

// @TODO : Find a way to stop the program earlier if we need to force stop it

for (let code = 0; code < 10000; code++) {
  console.log(code);
  if (code !== 0) changeNumber(code);

  robot.moveMouse(validButton.x, validButton.y)
  robot.mouseClick();

  if (robot.getPixelColor(validButton.x, validButton.y) === "c6c6c6") {
    console.log("Ended ! Code found : " + code);
    console.log("Time spend: " + (Date.now() - startingTime) / 1000 + " seconds at" + code / ((Date.now() - startingTime) / 1000) + " code / second");
    break;
  }
}