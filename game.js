new p5();
let analyzer, peakDetect, fft;
let soundCollect;
let soundHitEnemy;
let img;
let beatWidth = 10;
let gameStart = false;
let gameEnd = false;
let timer = 0;
let Counter = 0;
let charLifes = 5;
let posX = 1;
let posY = 1;

let charAttack = false;
let charAttackDirection = "";

let mobAttack = false;
let mobAttackDirection = "";

let bossAttack = false;
let bossAttackDirection = "";

let mobX = 4;
let mobY = 3;
let mobMoveArray = ["left", "right", "up", "down"];
let mobMoveArrayTwo = ["left", "right", "up", "down"];
let mobAliveOne = 5;
let bossLifes = 5;

let counterChar = 0;
let counterMob = 0;
let counterBlock = 0;

let coinsX = 9;
let coinsY = 3;
let coinCollect = 0;
let PortalOpen = false;
let nextLevel = false;
let screenmusic = true;
let Endmusic = true;

let randomMobMove;
let firstmobmove = false;
let firstbossmove = false;
let score = 0;
let firstJump = false;

let color1 = "#d0a1ed"; //#f75262
let color2 = "#bc85de"; // #fca660

let color3 = "#a7e1f2";
let color4 = "#a7cff2";

window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);

let level = 1;
let levelOne = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 0, 0],
  [0, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 0, 0],
  [0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  [0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0],
  [0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 2, 1, 0, 0],
  [0, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 2, 0, 0],
  [0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0],
  [0, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
  [0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

portalXOne = 2;
portalYOne = 12;
portalXTwo = 3;
portalYTwo = 12;

let levelTwo = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let bossX = 6;
let bossY = 7;

let charLeft = true;
let charRight = false;

let colorPixelLeft;
let colorPixelRight;
let colorPixelUp;
let colorPixelDown;

let colorMobPixelLeft;
let colorMobPixelRight;
let colorMobPixelUp;
let colorMobPixelDown;

let colorBossPixelLeft;
let colorBossPixelLeftBottom;
let colorBossPixelRight;
let colorBossPixelRightBottom;
let colorBossPixelUp;
let colorBossPixelUpRight;
let colorBossPixelDown;
let colorBossPixelDownRight;

function preload() {
  songStartScreen = loadSound("files/trash.mp3");
  songEndScreen = loadSound("files/what_is_love.mp3");
  songLvlOne = loadSound("files/u_got_that.mp3");
  songLvlTwo = loadSound("files/dmc.mp3");
  soundCollect = loadSound("files/collect.wav");
  soundHitEnemy = loadSound("files/enemy_hit.wav");
  soundHitChar = loadSound("files/char_hit.wav");
  soundHitBlock = loadSound("files/hit.wav");
  soundPortal = loadSound("files/portal.wav");
}

function setup() {
  var p5canvas = createCanvas(1000, 700);
  p5canvas.parent("p5canvas");
  frameRate(300);
  createCanvas(1000, 700);
  imgCharLeft = loadImage("img/CharRight.png");
  imgCharRight = loadImage("img/CharLeft.png");
  imgEnemyLvlOne = loadImage("img/enemy.png");
  imgView = loadImage("img/viewpoint.png");
  coinImg = loadImage("img/coin.png");
  StartIMG = loadImage("img/background.png");
  WinningIMG = loadImage("img/background_winner.png");
  LoserIMG = loadImage("img/background_lose.png");
  portalImg = loadImage("img/portal.png");
  bossImg = loadImage("img/boss.png");
  bossImgAttack = loadImage("img/BossAttack.png");
  mobImgAttack = loadImage("img/MobAttack.png");
  charImgAttack = loadImage("img/CharAttack.png");

  heartBeatFull = loadImage("img/life_full.svg");
  heartBeatFour = loadImage("img/life_four.svg");
  heartBeatThree = loadImage("img/life_three.svg");
  heartBeatTwo = loadImage("img/life_two.svg");
  heartBeatOne = loadImage("img/life_one.svg");

  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  analyzer.setInput(songLvlOne);
  analyzer.setInput(songLvlTwo);
  peakDetect = new p5.PeakDetect();
}

function coin(coinsX, coinsY, scale) {
  image(coinImg, coinsX * 50, coinsY * 50, scale * 50, scale * 50);
}

function lvlOne() {
  for (i = 0; i < levelOne.length; i++) {
    for (j = 0; j < 20; j++) {
      if (levelOne[i][j] === 0) {
        noFill();
      } else if (levelOne[i][j] === 1) {
        if (timer % 2 === 0) {
          fill(color1);
        } else {
          fill(color2);
        }
      } else if (levelOne[i][j] === 2) {
        if (timer % 2 === 0) {
          fill(color2);
        } else {
          fill(color1);
        }
      }
      rect(j * 50, i * 50, 50, 50);
    }
  }

  colorPixelLeft = levelOne[posY][posX - 1];
  colorPixelRight = levelOne[posY][posX + 1];
  colorPixelUp = levelOne[posY - 1][posX];
  colorPixelDown = levelOne[posY + 1][posX];

  colorMobPixelLeft = levelOne[mobY][mobX - 1];
  colorMobPixelRight = levelOne[mobY][mobX + 1];
  colorMobPixelUp = levelOne[mobY - 1][mobX];
  colorMobPixelDown = levelOne[mobY + 1][mobX];
}

function lvlTwo() {
  for (i = 0; i < levelTwo.length; i++) {
    for (j = 0; j < 20; j++) {
      if (levelTwo[i][j] === 0) {
        noFill();
      } else if (levelTwo[i][j] === 1) {
        if (timer % 2 === 0) {
          fill(color3);
        } else {
          fill(color4);
        }
      } else if (levelTwo[i][j] === 2) {
        if (timer % 2 === 0) {
          fill(color4);
        } else {
          fill(color3);
        }
      }
      rect(j * 50, i * 50, 50, 50);
    }
  }

  colorPixelLeft = levelTwo[posY][posX - 1];
  colorPixelRight = levelTwo[posY][posX + 1];
  colorPixelUp = levelTwo[posY - 1][posX];
  colorPixelDown = levelTwo[posY + 1][posX];

  colorMobPixelLeft = levelTwo[mobY][mobX - 1];
  colorMobPixelRight = levelTwo[mobY][mobX + 1];
  colorMobPixelUp = levelTwo[mobY - 1][mobX];
  colorMobPixelDown = levelTwo[mobY + 1][mobX];

  colorBossPixelLeft = levelTwo[bossY][bossX - 1];
  colorBossPixelLeftBottom = levelTwo[bossY + 1][bossX - 1];
  colorBossPixelRight = levelTwo[bossY][bossX + 2];
  colorBossPixelRightBottom = levelTwo[bossY + 1][bossX + 2];
  colorBossPixelUp = levelTwo[bossY - 1][bossX];
  colorBossPixelUpRight = levelTwo[bossY - 1][bossX + 1];
  colorBossPixelDown = levelTwo[bossY + 2][bossX];
  colorBossPixelDownRight = levelTwo[bossY + 2][bossX + 1];
}

function CharacterLeft(posX, posY, scale) {
  image(imgCharRight, posX * 50, posY * 50, scale * 50, scale * 50);
}

function CharacterRight(posX, posY, scale) {
  image(imgCharLeft, posX * 50, posY * 50, scale * 50, scale * 50);
}

function smallEnemy(mobX, mobY, mobScale) {
  image(imgEnemyLvlOne, mobX * 50, mobY * 50, mobScale * 50, mobScale * 50);
}

function boss(bossX, bossY, bossScale) {
  image(bossImg, bossX * 50, bossY * 50, bossScale * 100, bossScale * 100);
}

function heartbeat(heartX, heartY, heartScale) {
  if (charLifes === 5) {
    image(heartBeatFull, heartX, heartY, heartScale, heartScale);
  } else if (charLifes === 4) {
    image(heartBeatFour, heartX, heartY, heartScale, heartScale);
  } else if (charLifes === 3) {
    image(heartBeatThree, heartX, heartY, heartScale, heartScale);
  } else if (charLifes === 2) {
    image(heartBeatTwo, heartX, heartY, heartScale, heartScale);
  } else if (charLifes === 1) {
    image(heartBeatOne, heartX, heartY, heartScale, heartScale);
  }
}

function keyPressed() {
  if (keyIsDown(32) && gameStart === false && level === 1) {
    gameStart = true;
    songLvlOne.loop();
  }

  if (
    (peakDetect.isDetected && keyCode === 87) ||
    (peakDetect.isDetected && keyCode === 83) ||
    (peakDetect.isDetected && keyCode === 65) ||
    (peakDetect.isDetected && keyCode === 68)
  ) {
    score = score + 10;
  }

  if (
    (keyCode === 87 || keyCode === 38) &&
    gameStart === true &&
    firstJump === false &&
    colorPixelUp != 0
  ) {
    if (
      (posY - 1 === mobY && posX === mobX) ||
      (posY - 2 === bossY && posX === bossX) ||
      (posY - 2 === bossY && posX === bossX + 1)
    ) {
      //  console.log("UP DIE!!");
      charAttack = true;
      charAttackDirection = "up";
    } else {
      // GO UP
      posY = posY - 1;
    }
    firstJump = true;
  }

  if (
    (keyCode === 83 || keyCode === 40) &&
    gameStart === true &&
    firstJump === false &&
    colorPixelDown != 0
  ) {
    if (
      (posY + 1 === mobY && posX === mobX) ||
      (posY + 1 === bossY && posX === bossX) ||
      (posY + 1 === bossY && posX === bossX + 1)
    ) {
      //  console.log("DOWN DIE!!");
      charAttack = true;
      charAttackDirection = "left";
    } else {
      // GO DOWN
      posY = posY + 1;
    }
    firstJump = true;
  }

  if (
    (keyCode === 65 || keyCode === 37) &&
    gameStart === true &&
    firstJump === false &&
    colorPixelLeft != 0
  ) {
    if (
      (posX - 1 === mobX && posY === mobY) ||
      (posX - 1 === bossX + 1 && posY === bossY) ||
      (posX - 1 === bossX + 1 && posY === bossY + 1)
    ) {
      //  console.log("LEFT DIE!!");
      charAttack = true;
      charAttackDirection = "left";
    } else {
      // GO LEFT
      posX = posX - 1;
    }
    firstJump = true;
    charRight = false;
    charLeft = true;
  }

  if (
    (keyCode === 68 || keyCode === 39) &&
    gameStart === true &&
    firstJump === false &&
    colorPixelRight != 0
  ) {
    if (
      (posX + 1 === mobX && posY === mobY) ||
      (posX + 1 === bossX && posY === bossY) ||
      (posX + 1 === bossX && posY === bossY + 1)
    ) {
      //  console.log("RIGHT DIE!!");
      charAttack = true;
      charAttackDirection = "right";
    } else {
      // GO Right
      posX = posX + 1;
    }
    firstJump = true;
    charRight = true;
    charLeft = false;
  }

  if (keyCode === 13 && gameEnd === true) {
    textSize(16);
    score = 0;
    charLifes = 5;
    bossLifes = 5;
    mobAliveOne = 5;
    Counter = 0;
    gameEnd = false;
    gameStart = false;
    mobX = 4;
    mobY = 3;
    timer = 0;
    posX = 1;
    posY = 1;
    bossX = 6;
    bossY = 7;
    level = 1;
    coinsX = 9;
    coinsY = 3;
    coinCollect = 0;
    screenmusic = true;
    songStartScreen.play();
    screenmusic = false;
    songEndScreen.stop();
  }
}

function draw() {
  clear();
  if (level === 2 && nextLevel === false) {
    songLvlOne.stop();
    songLvlTwo.play();
    nextLevel = true;
  }
  if (gameStart === false) {
    image(StartIMG, 0, 0, 1000, 700);
  }

  if (gameStart === false && screenmusic === true) {
    songStartScreen.play();
    screenmusic = false;
  }

  if (gameEnd === true && Endmusic === true) {
    songEndScreen.play();
    Endmusic = false;
  }

  if (gameStart === true) {
    background("black");
    fft.analyze();
    peakDetect.update(fft);
    songStartScreen.stop();

    if (level === 1) {
      lvlOne();
    } else if (level === 2) {
      lvlTwo();
    }

    // HITS

    if (charAttack === true && mobAttack === false && level === 1) {
      mobAliveOne = mobAliveOne - 1;
      soundHitEnemy.play();
      console.log("hero attacked mob");
      //   image(charImgAttack, posX * 50, posY * 50 - 50, 100, 50);
      score = score + 100;
      counterChar = 100;
    }

    if (charAttack === true && bossAttack === false && level === 2) {
      bossLifes = bossLifes - 1;
      soundHitEnemy.play();
      console.log("hero attacked Boss");
      score = score + 200;
      counterChar = 100;
    }

    if (charAttack === false && mobAttack === true && level === 1) {
      charLifes = charLifes - 1;
      console.log("mob attacked");
      soundHitChar.play();
      mobAttack = false;
      counterMob = 100;
    }

    if (charAttack === false && bossAttack === true && level === 2) {
      charLifes = charLifes - 1;
      console.log("boss attacked");
      soundHitChar.play();
      bossAttack = false;
      counterMob = 100;
    }

    if (
      (charAttack === true && mobAttack === true) ||
      (charAttack === true && bossAttack === true)
    ) {
      console.log("Blocked");
      soundHitBlock.play();
      charAttack = false;
      mobAttack = false;
      bossAttack = false;
      counterBlock = 100;
    }

    if (coinCollect != 6) {
      coin(coinsX, coinsY, 1);
    }

    if (posX === coinsX && posY === coinsY) {
      soundCollect.play();
    }

    if (posX === coinsX && posY === coinsY && coinCollect === 0) {
      coinCollect = 1;
      score = score + 66;
      coinsX = 17;
      coinsY = 1;
    } else if (posX === coinsX && posY === coinsY && coinCollect === 1) {
      coinCollect = 2;
      score = score + 66;
      coinsX = 14;
      coinsY = 5;
    } else if (posX === coinsX && posY === coinsY && coinCollect === 2) {
      coinCollect = 3;
      score = score + 66;
      coinsX = 15;
      coinsY = 10;
    } else if (posX === coinsX && posY === coinsY && coinCollect === 3) {
      coinCollect = 4;
      score = score + 66;
      coinsX = 2;
      coinsY = 9;
    } else if (posX === coinsX && posY === coinsY && coinCollect === 4) {
      coinCollect = 5;
      score = score + 66;
      coinsX = 4;
      coinsY = 10;
    } else if (posX === coinsX && posY === coinsY && coinCollect === 5) {
      coinCollect = 6;
      score = score + 66;
      coinsX = 0;
      coinsY = 0;
    }

    // MOB

    if (
      gameStart === true &&
      randomMobMove === "right" &&
      colorMobPixelRight != 0 &&
      firstmobmove === false
    ) {
      if (mobX + 1 === posX && mobY === posY) {
        //  console.log("RIGHT HERO DIE!!");
        mobAttack = true;
        mobAttackDirection = "right";
      } else {
        // GO right
        mobX = mobX + 1;
      }
      firstmobmove = true;
    } else {
      randomMobMove = random(mobMoveArray);
    }
    if (
      gameStart === true &&
      randomMobMove === "left" &&
      colorMobPixelLeft != 0 &&
      firstmobmove === false
    ) {
      if (mobX - 1 === posX && mobY === posY) {
        // console.log("Left HERO DIE!!");
        mobAttack = true;
        mobAttackDirection = "left";
      } else {
        // GO LEFT
        mobX = mobX - 1;
      }
      firstmobmove = true;
    } else {
      randomMobMove = random(mobMoveArray);
    }
    if (
      gameStart === true &&
      randomMobMove === "up" &&
      colorMobPixelUp != 0 &&
      firstmobmove === false
    ) {
      if (mobY - 1 === posY && mobX === posX) {
        //  console.log("UP HERO DIE!!");
        mobAttack = true;
        mobAttackDirection = "up";
      } else {
        // GO UP
        mobY = mobY - 1;
      }
      firstmobmove = true;
    } else {
      randomMobMove = random(mobMoveArray);
    }
    if (
      gameStart === true &&
      randomMobMove === "down" &&
      colorMobPixelDown != 0 &&
      firstmobmove === false
    ) {
      if (mobY + 1 === posY && mobX === posX) {
        //   console.log("DOWN HERO DIE!!");
        mobAttack = true;
        mobAttackDirection = "down";
      } else {
        // GO DOWN
        mobY = mobY + 1;
      }
      firstmobmove = true;
    } else {
      randomMobMove = random(mobMoveArray);
    }

    // BOSS

    if (bossLifes != 0 && level === 2) {
      boss(bossX, bossY, 1);
    } else if (bossLifes === 0 && level === 2) {
      bossX = 1;
      bossY = 1;
    }

    // BOSS HITS

    if (bossLifes === 4 && charAttack === true && level === 2) {
      bossX = 2;
      bossY = 2;
      console.log("One");
      charAttack = false;
    }

    if (bossLifes === 3 && charAttack === true && level === 2) {
      bossX = 7;
      bossY = 7;
      console.log("Two");
      charAttack = false;
    }

    if (bossLifes === 2 && charAttack === true && level === 2) {
      bossX = 4;
      bossY = 7;
      console.log("Three");
      charAttack = false;
    }

    if (bossLifes === 1 && charAttack === true && level === 2) {
      bossX = 2;
      bossY = 2;
      console.log("Four");
      charAttack = false;
    }

    if (
      gameStart === true &&
      level === 2 &&
      randomMobMove === "right" &&
      colorBossPixelRight != 0 &&
      colorBossPixelRightBottom != 0 &&
      firstbossmove === false
    ) {
      //right
      if (
        (bossX + 2 === posX && bossY === posY) ||
        (bossX + 2 === posX && bossY + 1 === posY)
      ) {
        console.log("BOSS ATTACK RIGHT");
        bossAttack = true;
        bossAttackDirection = "right";
      } else {
        bossX = bossX + 1;
      }
      firstbossmove = true;
    } else {
      randomMobMove = random(mobMoveArrayTwo);
    }

    if (
      gameStart === true &&
      level === 2 &&
      randomMobMove === "left" &&
      colorBossPixelLeft != 0 &&
      colorBossPixelLeftBottom != 0 &&
      firstbossmove === false
    ) {
      if (
        (bossX - 1 === posX && bossY === posY) ||
        (bossX - 1 === posX && bossY + 1 === posY)
      ) {
        console.log("BOSS ATTACK LEFT");
        bossAttack = true;
        bossAttackDirection = "left";
      } else {
        //left
        bossX = bossX - 1;
      }
      firstbossmove = true;
    } else {
      randomMobMove = random(mobMoveArrayTwo);
    }

    if (
      gameStart === true &&
      randomMobMove === "up" &&
      level === 2 &&
      colorBossPixelUp != 0 &&
      colorBossPixelUpRight != 0 &&
      firstbossmove === false
    ) {
      if (
        (bossX === posX && bossY - 1 === posY) ||
        (bossX + 1 === posX && bossY - 1 === posY)
      ) {
        console.log("BOSS ATTACK UP");
        bossAttack = true;
        bossAttackDirection = "up";
      } else {
        //Up
        bossY = bossY - 1;
      }
      firstbossmove = true;
    } else {
      randomMobMove = random(mobMoveArrayTwo);
    }

    if (
      gameStart === true &&
      level === 2 &&
      randomMobMove === "down" &&
      colorBossPixelDown != 0 &&
      colorBossPixelDownRight != 0 &&
      firstbossmove === false
    ) {
      if (
        (bossX === posX && bossY + 2 === posY) ||
        (bossX + 1 === posX && bossY + 2 === posY)
      ) {
        console.log("BOSS ATTACK DOWN");
        bossAttack = true;
        bossAttackDirection = "down";
      } else {
        //Down
        bossY = bossY + 1;
      }
      firstbossmove = true;
    } else {
      randomMobMove = random(mobMoveArrayTwo);
    }

    if (peakDetect.isDetected) {
      beatWidth = 100;
      timer++;
      firstJump = false;
      randomMobMove = random(mobMoveArray);
      randomMobMove = random(mobMoveArrayTwo);
      firstmobmove = false;
      firstbossmove = false;
    } else {
      beatWidth *= 0.99;
    }

    fill("black");

    if (mobAliveOne != 0) {
      smallEnemy(mobX, mobY, 1);
    } else {
      mobX = 1;
      mobY = 1;
    }

    if (PortalOpen === true) {
      image(portalImg, portalXOne * 50, portalYOne * 50, 50, 50);
      image(portalImg, portalXTwo * 50, portalYTwo * 50, 50, 50);
    }

    if (charLeft === true) {
      CharacterLeft(posX, posY, 1, 1);
    } else {
      CharacterRight(posX, posY, 1, 1);
    }

    if (mobAliveOne === 4 && charAttack === true) {
      mobX = 12;
      mobY = 3;
      charAttack = false;
    }

    if (mobAliveOne === 3 && charAttack === true) {
      mobX = 17;
      mobY = 3;
      charAttack = false;
    }

    if (mobAliveOne === 2 && charAttack === true) {
      mobX = 15;
      mobY = 9;
      charAttack = false;
    }

    if (mobAliveOne === 1 && charAttack === true) {
      mobX = 4;
      mobY = 6;
      charAttack = false;
    }

    if (mobAliveOne === 0 && charAttack === true) {
      charAttack = false;
    }

    if (bossLifes === 0 && level === 2) {
      gameEnd = true;
      charAttack = false;
    }

    if (coinCollect === 6 && mobAliveOne === 0) {
      // left Bottom
      PortalOpen = true;
    }

    if (
      (posX === 2 && posY === 12 && PortalOpen === true) ||
      (posX === 3 && posY === 12 && PortalOpen === true)
    ) {
      level = 2;
    }
    if (level === 2) {
      PortalOpen = false;
    }

    image(imgView, posX * 50 - 975, posY * 50 - 975, 2000, 2000);

    fill(color1);
    text("BEAT " + timer, 20, 30);
    text("Score: " + score, width - 100, 30);
    fill(color2);

    fill("white");
    fill(color2);
    if (counterChar > 0) {
      console.log(counterChar);
      fill(208, 161, 237, counterChar);
      text("Hero attacked", width / 2 - 35, 490 + counterChar);

      if (frameCount % 2 == 0) {
        counterChar--;
      }
    }
    if (counterMob > 0) {
      console.log(counterMob);
      fill(167, 225, 242, counterMob);
      text("Enemy attacked", width / 2 - 35, 480 + counterMob);

      if (frameCount % 2 == 0) {
        counterMob--;
      }
    }
    if (counterBlock > 0) {
      console.log(counterBlock);
      fill(255, 255, 255, counterBlock);
      text("BLOCKED", width / 2 - 35, 470 + counterBlock);

      if (frameCount % 2 == 0) {
        counterBlock--;
      }
    }
    imageMode(CENTER);
    heartbeat(width / 2, height - 80, beatWidth + 30);
    imageMode(CORNER);
  }

  if (charLifes === 0) {
    gameEnd = true;
    charLifes = 0;
  }

  if (gameEnd === true && bossLifes === 0) {
    background("black");
    image(WinningIMG, 0, 0, 1000, 700);
    fill(color1);
    textSize(50);
    text(score, 440, 650);
    textSize(10);
    songLvlTwo.stop();
    songLvlOne.stop();
  }

  if (gameEnd === true && charLifes === 0) {
    background("black");
    image(LoserIMG, 0, 0, 1000, 700);
    songLvlTwo.stop();
    songLvlOne.stop();
  }
}
