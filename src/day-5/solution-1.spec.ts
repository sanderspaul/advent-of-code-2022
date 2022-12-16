import { getTopStackCratesForInput } from './solution-1';
import { bulkTransferCrates } from './solution-2';
import {
  createStackCollectionFromDiagramLines,
  createStackCollectionFromLayers,
  createStackLayerFromString,
  executeProcedures,
  getStackDiagramLines,
  getTopStackCrates,
  parseTupleFromProcedure,
  transferSingleCrates
} from './utils';

const DIAGRAM_LINES = [
  '            [L] [M]         [M]    ',
  '        [D] [R] [Z]         [C] [L]',
  '        [C] [S] [T] [G]     [V] [M]',
  '[R]     [L] [Q] [B] [B]     [D] [F]',
  '[H] [B] [G] [D] [Q] [Z]     [T] [J]',
  '[M] [J] [H] [M] [P] [S] [V] [L] [N]',
  '[P] [C] [N] [T] [S] [F] [R] [G] [Q]',
  '[Z] [P] [S] [F] [F] [T] [N] [P] [W]'
];

describe('Creating crate stacks', () => {
  it('should convert a diagram line into an array representation', () => {
    expect(createStackLayerFromString(DIAGRAM_LINES[0])).toEqual([
      '',
      '',
      '',
      'L',
      'M',
      '',
      '',
      'M',
      ''
    ]);
  });

  it('should add each layer item to its corresponding index stack in a stack collection', () => {
    const layer = ['', '', '', 'L', 'M', '', '', 'M', ''];
    const collectionFromLayers = createStackCollectionFromLayers([layer]).map(
      (stack) => stack[0]
    );
    expect(collectionFromLayers).toEqual([
      undefined,
      undefined,
      undefined,
      'L',
      'M',
      undefined,
      undefined,
      'M',
      undefined
    ]);
  });

  it('should create stacks matching the a string representation', () => {
    const stacks = [
      ['Z', 'P', 'M', 'H', 'R'],
      ['P', 'C', 'J', 'B'],
      ['S', 'N', 'H', 'G', 'L', 'C', 'D'],
      ['F', 'T', 'M', 'D', 'Q', 'S', 'R', 'L'],
      ['F', 'S', 'P', 'Q', 'B', 'T', 'Z', 'M'],
      ['T', 'F', 'S', 'Z', 'B', 'G'],
      ['N', 'R', 'V'],
      ['P', 'G', 'L', 'T', 'D', 'V', 'C', 'M'],
      ['W', 'Q', 'N', 'J', 'F', 'M', 'L']
    ];
    expect(
      createStackCollectionFromDiagramLines(DIAGRAM_LINES.slice(0))
    ).toEqual(stacks);
  });
});

describe('Rearranging crates', () => {
  it('should move one crate from the top of stack 2 to stack 3', () => {
    const beforeStacks = [['T', 'F', 'A'], ['V', 'S', 'N'], ['B']];
    const afterStacks = [
      ['T', 'F', 'A'],
      ['V', 'S'],
      ['B', 'N']
    ];
    expect(transferSingleCrates(beforeStacks, 1, 2, 3)).toEqual(afterStacks);
  });

  it('should move two crates from the top of stack 2 to stack 3', () => {
    const beforeStacks = [['T', 'F', 'A'], ['V', 'S', 'N'], ['B']];
    const afterStacks = [['T', 'F', 'A'], ['V'], ['B', 'S', 'N']];
    expect(bulkTransferCrates(beforeStacks, 2, 2, 3)).toEqual(afterStacks);
  });

  it('should parse the tuple [7, 3, 9] from the procedure "move 7 from 3 to 9"', () => {
    expect(parseTupleFromProcedure('move 7 from 3 to 9')).toEqual([7, 3, 9]);
  });

  it('should move multiple crates between stacks according to procedures', () => {
    const beforeStacks = [['T', 'F', 'A'], ['V', 'S', 'N'], ['B']];
    const afterStacks = [
      ['T', 'F'],
      ['V', 'A'],
      ['B', 'S', 'N']
    ];
    const result = executeProcedures(
      ['move 2 from 2 to 3', 'move 1 from 1 to 2'],
      beforeStacks
    );
    expect(result).toEqual(afterStacks);
  });

  it('should return "XYZ" as the top crates of all stacks', () => {
    const stacks = [['T', 'U', 'X'], ['Y'], ['B', 'Z']];
    expect(getTopStackCrates(stacks)).toEqual('XYZ');
  });
});

describe('Parsing crates input data', () => {
  const INPUT_LINES = [
    '            [L] [M]         [M]    ',
    '        [D] [R] [Z]         [C] [L]',
    '        [C] [S] [T] [G]     [V] [M]',
    '[R]     [L] [Q] [B] [B]     [D] [F]',
    '[H] [B] [G] [D] [Q] [Z]     [T] [J]',
    '[M] [J] [H] [M] [P] [S] [V] [L] [N]',
    '[P] [C] [N] [T] [S] [F] [R] [G] [Q]',
    '[Z] [P] [S] [F] [F] [T] [N] [P] [W]',
    '1   2   3   4   5   6   7   8   9  ',
    '',
    'move 7 from 3 to 9'
    // 'move 5 from 8 to 9',
    // 'move 3 from 9 to 5'
  ];

  it('should return all lines containing crate string data', () => {
    const crateDataLines = [
      '            [L] [M]         [M]    ',
      '        [D] [R] [Z]         [C] [L]',
      '        [C] [S] [T] [G]     [V] [M]',
      '[R]     [L] [Q] [B] [B]     [D] [F]',
      '[H] [B] [G] [D] [Q] [Z]     [T] [J]',
      '[M] [J] [H] [M] [P] [S] [V] [L] [N]',
      '[P] [C] [N] [T] [S] [F] [R] [G] [Q]',
      '[Z] [P] [S] [F] [F] [T] [N] [P] [W]'
    ];
    expect(getStackDiagramLines(INPUT_LINES)).toEqual(crateDataLines);
  });

  it('should return "RBLMGVMD" for the input lines provided', () => {
    expect(getTopStackCratesForInput(INPUT_LINES)).toEqual('RBLMGVMD');
  });
});
