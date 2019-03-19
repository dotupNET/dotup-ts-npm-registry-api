/*
 * File generated by Test generator (dotup.dotup-vscode-test-generator)
 * Date: 2019-03-19 07:57:58
*/
import { expect } from 'chai';
import { NpmApi } from '../src/NpmApi';
import * as fs from 'fs';
import * as path from 'path';

describe('Test class NpmApi', () => {

  it('NpmApi-getInfo', async () => {
    // Arguments
    const packageName1 = 'dotup-ts-types';

    // Method call
    const npmApi = new NpmApi();
    const result = await npmApi.getInfo(packageName1);

    // Expect result
    expect(result).to.be.not.undefined;
  });

  it('NpmApi-getVersion', async () => {
    // Arguments
    const packageName2 = 'dotup-ts-types';

    // Method call
    const npmApi = new NpmApi();
    const result = await npmApi.getVersion(packageName2);

    // Expect result
    expect(result).equals('0.0.19');
  });

  it('NpmApi-update', async () => {
    // Arguments
    const api = new NpmApi();
    const p = path.join(process.cwd(),'test', 'package.json');
    const content = fs.readFileSync(p, 'utf-8');
    const json = JSON.parse(content);

    // Method call
    await api.updateDependencies(json);

    // Expect result
    expect(json['devDependencies']['dotup-ts-logger']).equals('~0.0.13');
    expect(json['dependencies']['dotup-ts-types']).equals('^0.0.19');
  });

});
