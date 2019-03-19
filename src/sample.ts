import { NpmApi } from './NpmApi';
import * as fs from 'fs';
import * as path from 'path';

export class Sample {

  async run(): Promise<void> {
    const api = new NpmApi();
    const info = await api.getInfo('dotup-ts-types');
    const version = await api.getVersion('dotup-ts-types');

    const p = path.join(process.cwd(),'test', 'package.json');
    const content = fs.readFileSync(p, 'utf-8');
    const json = JSON.parse(content);

    await api.updateDependencies(json);

    fs.writeFileSync(p, JSON.stringify(json, undefined, 2));
    console.log(json);

  }

  runSomethingElse() {
    console.log('Here we are again!');
  }

}

const sample = new Sample();
sample.run();
