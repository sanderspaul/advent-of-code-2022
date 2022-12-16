import path from 'path';
import { readInputFileToStringArray } from '../../src/lib/utils';
import {
  createStackCollectionFromDiagramLines,
  executeProcedures,
  getStackDiagramLines,
  getStackProcedureLines,
  getTopStackCrates
} from './utils';

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

run();
