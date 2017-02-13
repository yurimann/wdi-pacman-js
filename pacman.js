// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var dotsLeft = 240;
var level = 1
var bonus_points = false;




// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '      powerPellets: ' + powerPellets + '      Dots Left: ' + dotsLeft + '      level: ' + level );
}

function displayEdibility(ghost) {
    if (ghost.edible === true) {
      return "(Edible)";
    }
    else {
      return "(Inedible)";
    }

}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (dotsLeft > 10){
    console.log('(t) Eat 10 Dots');
  }
  if (dotsLeft > 100){
    console.log('(h) Eat 100 Dots');
  }
  console.log('(r) Eat remaining Dots');
  if (powerPellets > 0){
    console.log('(p) Eat Power Pellet');
  };
  console.log('(1) Eat Inky ' + displayEdibility(inky) );
  console.log('(2) Eat Blinky ' + displayEdibility(blinky));
  console.log('(3) Eat Pinky ' + displayEdibility(pinky));
  console.log('(4) Eat Clyde ' + displayEdibility(clyde));
  randomizer();
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


function gameOver() {
 if (lives === 0) {
   process.exit();
 }
}

// function highScore() {
//   var high_score = localStorage.getItem("high_score");
//     if (high_score !== null){
//       if (score > high_score){
//         localStorage.setItem("high_score: ", score);
//       }
//     }else {
//       localStorage.setItem("high_score: ", score);
//     }
// }

// Menu Options
function eatDot(choice) {
  console.log('\nChomp!');
  switch(choice) {
    case 't':
      dotsLeft -=10;
      score +=100;
      break;
    case 'h':
      dotsLeft -=100;
      score +=1000;
      break;
    case 'r':
      score = score + (dotsLeft * 10);
      dotsLeft = 0;
      break;
    default:
      score += 10;
      dotsLeft--;
    }
    levelChecker();
}
// ALLOWS FOR LEVELING UP
function levelChecker(){
  if (dotsLeft === 0 && powerPellets === 0){
    powerPellets = 4;
    dotsLeft = 240;
    ghosts.forEach(function(ghost) {
      ghost.edible = false;
    });
    level ++;
  }
}
// Function to eat inedible ghosts
function eatGhost(selection) {
  if (ghosts[selection-1].edible === false) {
    lives --;
    console.log(ghosts[selection-1].name + " just ate you!");
    gameOver();
  }
  else {
    console.log(ghosts[selection-1].name + " " +ghosts[selection-1].character + " just got eaten!" );
    ghostsRemaining --;
    switch(ghostsRemaining){
      case 3:
        score += 200;
        break;
      case 2:
        score += 400;
        break;
      case 1:
        score += 800;
        break;
      case 0:
        score += 1600;
        break;
    }

    ghosts[selection-1].edible = false;
      }
}

function eatPowerPellet() {
  if (ghostsRemaining < 4){
    console.log("Eat all the ghosts first!")
  }
  else{
    ghosts.forEach(function(ghost){
    ghost.edible = true;
  });
  powerPellets --;
  ghostsRemaining = 4
  score += 50;
  levelChecker();
  }
}

//BONUS POINTS
function bonusSelector(level){
  switch(level) {
    case 1:
      return "Cherry";
      break;
    case 2:
      return "Strawberry";
      break;
    case 3:
    case 4:
      return "Orange";
      break;
    case 5:
    case 6:
      return "Apple";
      break;
    case 7:
    case 8:
      return "Pineapple";
      break;
    case 9:
    case 10:
      return "Galaxian Spaceship";
      break;
    case 3:
    case 4:
      return "Bell";
      break;
    default:
      return "Key";
  }
}

function randomizer(){
  var bonus = Math.floor(Math.random() * 2);
    if (bonus === 1){
      console.log('(5) Eat ' + bonusSelector(level));
      bonus_points = true;
  }
}

function getBonus(level){
    if (bonus_points === true){
      switch (level) {
        case 1:
          score += 100;
          break;
        case 2:
          score += 300;
          break;
        case 3:
        case 4:
          score += 500;
          break;
        case 5:
        case 6:
          score += 700;
          break;
        case 7:
        case 8:
          score += 1000;
          break;
        case 9:
        case 10:
          score += 2000;
          break;
        case 11:
        case 12:
          score += 3000;
          break;
        default:
          score += 5000;
      }

    }
    else {
      console.log("NO BONUSES YET COMPADRE!");

    }
    bonus_points = false;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'p':
      if (powerPellets > 0){
        eatPowerPellet();
      }
      else {
        console.log("\nYou're out of power pellets!");
      }
      break;
    case 't':
      eatDot('t');
      break;
    case 'h':
      eatDot('h');
      break;
    case 'r':
      eatDot('r');
      break;
    case '1':
      eatGhost(1);
      break;
    case '2':
      eatGhost(2);
      break;
    case '3':
      eatGhost(3);
      break;
    case '4':
      eatGhost(4);
      break;
    case '5':
      getBonus(level);
      break;
    case 'd':
      eatDot();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
