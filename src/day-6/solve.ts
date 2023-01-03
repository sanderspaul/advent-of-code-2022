import path from 'path';
import { readInputFileToString } from '../../src/lib/utils';
import { findPacketStart } from './solution-1';
import { findMessageStart } from './solution-2';

function run() {
  readInputFileToString(path.resolve(__dirname, './input.txt'), (err, data) => {
    if (!err) {
      console.log('start of first packet: ', findPacketStart(data));
      console.log('start of first message packet', findMessageStart(data));
    }
  });
}

run();
