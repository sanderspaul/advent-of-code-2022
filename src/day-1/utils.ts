import fs from 'fs';
import events from 'events';
import readline from 'readline';
import path from 'path';

function addAnotherElf(caloriesByElf: number[]): void {
  caloriesByElf.push(0);
}

function addCaloriesToLastElf(cals: number, calsByElf: number[]): void {
  const lastElfIndex = calsByElf.length - 1;
  const currentElfCalories = calsByElf[lastElfIndex];
  calsByElf[lastElfIndex] = currentElfCalories + cals;
}

export async function readCalorieTalliesFromFile() {
  const calorieTallies: number[] = [0];
  const rl = readline.createInterface({
    input: fs.createReadStream(path.resolve(__dirname, './input.txt')),
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    if (!line.length) {
      addAnotherElf(calorieTallies);
    } else {
      const addedCalories = parseInt(line, 10);
      addCaloriesToLastElf(addedCalories, calorieTallies);
    }
  });

  await events.once(rl, 'close');
  return calorieTallies;
}
