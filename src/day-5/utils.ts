import { bulkTransferCrates } from './solution-2';

export type StackCollection = string[][];

export function cloneCollection(collection: StackCollection): StackCollection {
  return collection.map((stack) => [...stack]);
}

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

export function getStackProcedureLines(lines: string[]): string[] {
  return lines.filter((line) => line.includes('move'));
}

export function getTopStackCrates(stacks: StackCollection): string {
  return stacks.map((stack) => stack.slice(-1).pop()).join('');
}

export function getStackDiagramLines(lines: string[]): string[] {
  const start = lines.findIndex((line) => line.includes('['));
  const end = lines.findIndex((line) => line.match(/[0-9]/));
  return lines.slice(start, end);
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

export function transferSingleCrates(
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

export function executeProcedures(
  procedures: string[],
  collection: StackCollection
): StackCollection {
  const tuples: (ProcedureTuple | null)[] = procedures.map((p) =>
    parseTupleFromProcedure(p)
  );
  const result = tuples.reduce((prev, curr) => {
    if (curr) {
      const [crateMoveCount] = curr;
      const transferResult =
        crateMoveCount > 1
          ? bulkTransferCrates(prev, ...curr) // if multi-crate move
          : transferSingleCrates(prev, ...curr); // if single-crate move

      return transferResult;
    }
    return prev;
  }, collection);

  return result;
}
