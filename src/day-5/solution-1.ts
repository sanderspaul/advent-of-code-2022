import path from 'path';
import { readInputFileToStringArray } from '../../src/lib/utils';
import {
  createStackCollectionFromDiagramLines,
  executeProcedures,
  getStackDiagramLines,
  getStackProcedureLines,
  getTopStackCrates
} from './utils';

export function getTopStackCratesForInput(input: string[]): string {
  const procedures = getStackProcedureLines(input);
  const collection = createStackCollectionFromDiagramLines(
    getStackDiagramLines(input)
  );
  const modified = executeProcedures(procedures, collection);

  return getTopStackCrates(modified);
}
