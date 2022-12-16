import path from 'path';
import { readInputFileToStringArray } from '../../src/lib/utils';

type StackCollection = string[][];

export function createStackLayerFromString(str: string): string[] {
  let layer: string[] = [];
  for (let i = 0; i <= str.length; i = i + 4) {
    layer = [...layer, str.slice(i, i + 4).replace(/\[|\]|\s/gi, '')];
  }
  return layer;
}

export function createStackCollectionFromLayers(
  layers: string[][]
): StackCollection {
  const collection: StackCollection = Array.from(
    { length: layers[0].length },
    () => Array(0)
  );
  layers.forEach((layer) => {
    layer.forEach((crate, i) => {
      if (crate) {
        collection[i].unshift(crate);
      }
    });
  });
  return collection;
}

export function createStackCollectionFromDiagramLines(
  lines: string[]
): StackCollection {
  return createStackCollectionFromLayers(
    lines.map((line) => createStackLayerFromString(line))
  );
}

export function cloneCollection(collection: StackCollection): StackCollection {
  return collection.map((stack) => [...stack]);
}

export function transferCrates(
  stacks: StackCollection,
  count: number,
  fromStack: number,
  toStack: number
): StackCollection {
  const collection: StackCollection = cloneCollection(stacks);
  for (let index = 0; index < count; index++) {
    const crate = collection[fromStack - 1]?.pop();
    if (crate) {
      collection[toStack - 1].push(crate);
    }
  }
  return collection;
}

type ProcedureTuple = [number, number, number];

export function parseTupleFromProcedure(
  procedure: string
): ProcedureTuple | null {
  const match = procedure.match(/move\s([0-9]+)\sfrom\s([0-9]+)\sto\s([0-9]+)/);
  if (match) {
    const [, count, from, to] = match;
    return [parseInt(count, 10), parseInt(from, 10), parseInt(to, 10)];
  }
  return null;
}

export function executeProcedures(
  procedures: string[],
  collection: StackCollection
): StackCollection {
  const tuples: (ProcedureTuple | null)[] = procedures.map((p) =>
    parseTupleFromProcedure(p)
  );
  const result = tuples.reduce((prev, curr) => {
    if (curr) {
      const transferResult = transferCrates(prev, ...curr);

      return transferResult;
    }
    return prev;
  }, collection);

  return result;
}

export function getTopStackCrates(stacks: StackCollection): string {
  return stacks.map((stack) => stack.slice(-1).pop()).join('');
}

export function getStackDiagramLines(lines: string[]): string[] {
  const start = lines.findIndex((line) => line.includes('['));
  const end = lines.findIndex((line) => line.match(/[0-9]/));
  return lines.slice(start, end);
}

export function getStackProcedureLines(lines: string[]): string[] {
  return lines.filter((line) => line.includes('move'));
}

export function getTopStackCratesForInput(input: string[]): string {
  const procedures = getStackProcedureLines(input);
  const collection = createStackCollectionFromDiagramLines(
    getStackDiagramLines(input)
  );
  const modified = executeProcedures(procedures, collection);

  return getTopStackCrates(modified);
}

export function run() {
  readInputFileToStringArray(
    path.resolve(__dirname, './input.txt'),
    (err, data) => {
      if (!err) {
        const collection = createStackCollectionFromDiagramLines(
          getStackDiagramLines(data)
        );
        const procedures = getStackProcedureLines(data);
        console.log(
          `Top crates after procedures are: ${getTopStackCrates(
            executeProcedures(procedures, collection)
          )}`
        );
      }
    }
  );
}
