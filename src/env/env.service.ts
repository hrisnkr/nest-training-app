import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvService {
  public async getALL(): Promise<Record<string, string>> {
    return Promise.resolve(process.env);
  }

  public async getEnv(id: string): Promise<string | undefined> {
    return Promise.resolve(process.env[id]);
  }

  public async setEnv(id: string, value: unknown): Promise<string> {
    switch (typeof value) {
      case 'string':
        break;
      case 'undefined':
        value = delete process.env[id];
        return '';
      default:
        value = JSON.stringify(value);
    }

    const result = (process.env[id] = value as string);
    return Promise.resolve(result);
  }
}
