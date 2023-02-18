const fs = require("fs");

enum Shape {
  Rock = 0,
  Paper = 1,
  Scissors = 2,
}

const lookupTable = {
  A: Shape.Rock,
  B: Shape.Paper,
  C: Shape.Scissors,
};

const encryptedLookupTable = {
  X: Shape.Rock,
  Y: Shape.Paper,
  Z: Shape.Scissors,
};

// Input is of form "A X"
function strategyLineToPlays(
  line: string
  // maybe add an encryption table here
): [Shape, Shape] {
  const [token1, token2] = line.split(" ");
  return [lookupTable[token1], encryptedLookupTable[token2]];
}

enum RPSOutcome {
  PlayerOneWon,
  PlayerTwoWon,
  Draw,
}

function evaluateWinnerRPS(play: [Shape, Shape]): RPSOutcome {
  if (play[0] == play[1]) {
    return RPSOutcome.Draw;
  } else {
    // Some fucked shit
    if ((((play[0] + 2) % 3) as Shape) == play[1]) {
      return RPSOutcome.PlayerOneWon;
    } else {
      return RPSOutcome.PlayerTwoWon;
    }
  }
}

function readInput(): string[] {
  const data = fs.readFileSync("./input", "utf8");
  return data.split("\n");
}

// Note: Player 2 is me.
function solution(inputLines: string[]) {
  let totalScore1 = 0;
  let totalScore2 = 0;

  inputLines.forEach((play: string) => {
    console.log(play);
    const parsedPlay = strategyLineToPlays(play);
    let player1Score = 0;
    let player2Score = 0;
    // The actual shape played affects score
    player1Score += parsedPlay[0].valueOf() + 1;
    player2Score += parsedPlay[1].valueOf() + 1;

    // Add for winner
    const outcome = evaluateWinnerRPS(parsedPlay);
    if (outcome == RPSOutcome.PlayerOneWon) {
      player1Score += 6;
    } else if (outcome == RPSOutcome.PlayerTwoWon) {
      player2Score += 6;
    } else {
      player1Score += 3;
      player2Score += 3;
    }

    console.log(player1Score, player2Score);
    totalScore1 += player1Score;
    totalScore2 += player2Score;
  });
  console.log(totalScore1, totalScore2);
}

// Note: Player 2 is me.
function solution2(inputLines: string[]) {
  let totalScore1 = 0;
  let totalScore2 = 0;
  // Play strategy X Y Z => what move to play
  const offsetTable = {
    X: 2,
    Y: 0,
    Z: 1,
  };

  inputLines.forEach((play: string) => {
    console.log(play);
    // Note: for this solution, only play 1 is valid.
    let parsedPlay = strategyLineToPlays(play);
    const play1 = parsedPlay[0];

    const play2 = (parsedPlay[0].valueOf() + offsetTable[play.split(' ')[1]]) % 3 as Shape;

    // reassign to the actual values.
    parsedPlay = [play1, play2];
    let player1Score = 0;
    let player2Score = 0;
    // The actual shape played affects score
    player1Score += parsedPlay[0].valueOf() + 1;
    player2Score += parsedPlay[1].valueOf() + 1;

    // Add for winner
    const outcome = evaluateWinnerRPS(parsedPlay);
    if (outcome == RPSOutcome.PlayerOneWon) {
      player1Score += 6;
    } else if (outcome == RPSOutcome.PlayerTwoWon) {
      player2Score += 6;
    } else {
      player1Score += 3;
      player2Score += 3;
    }

    console.log(player1Score, player2Score);
    totalScore1 += player1Score;
    totalScore2 += player2Score;
  });
  console.log(totalScore1, totalScore2);
}

// console.log(evaluateWinnerRPS([Shape.Rock, Shape.Scissors]));
// console.log(evaluateWinnerRPS([Shape.Paper, Shape.Paper]));

// solution("A X\nA Z".split('\n'));

const input = readInput();
solution(input);
solution2(input);
