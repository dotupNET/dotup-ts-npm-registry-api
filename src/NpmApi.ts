// tslint:disable-next-line: no-submodule-imports
import { HttpClient } from 'typed-rest-client/HttpClient';
import { NpmInfo } from './NpmInfo';
import { NpmVersion } from './NpmVersion';
import { StringProperty } from './types';

/**
 * https://github.com/nodesource/npmsearch#api
 */
export class NpmApi {

  async getInfo(packageName: string): Promise<NpmInfo> {
    const client = new HttpClient('dotup');
    const url = `https://registry.npmjs.com/${packageName}`;
    const result = await client.get(url);
    const body = await result.readBody();

    return <NpmInfo>JSON.parse(body);
  }

  async getVersion(packageName: string): Promise<string> {
    const info = await this.getInfo(packageName);

    return info['dist-tags']['latest'];
  }

  async updateDependencies(packageJson: NpmVersion): Promise<void> {
    await this.updatePackages(packageJson.dependencies);
    await this.updatePackages(packageJson.devDependencies);
  }

  private async updatePackages(packages: StringProperty): Promise<void> {
    if (packages === undefined) {
      return;
    }
    const deps = Object.keys(packages);
    for (const dep of deps) {      
      const version = await this.getVersion(dep);
      const sem = packages[dep].match(/^\^|^~|^\*/);
      if (sem) {
        packages[dep] = `${sem[0]}${version}`;        
      } else {
        packages[dep] = version;                
      }
    }
  }

}
