import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Put,
  Body,
} from '@nestjs/common';
import { EnvService } from './env.service';

@Controller('env')
export class EnvController {
  constructor(private readonly envService: EnvService) {}

  @Get()
  public async getAll(): Promise<Record<string, string>> {
    return this.envService.getALL();
  }

  @Get('/:id')
  public async getEnv(@Param('id') id: string): Promise<string> {
    const value = await this.envService.getEnv(id);
    if (typeof value != 'string') {
      throw new NotFoundException('ENV not found');
    }
    return value;
  }

  @Put('/:id')
  public async setEnv(
    @Param('id') id: string,
    @Body('value') value: string,
  ): Promise<string> {
    const result = await this.envService.setEnv(id, value);

    if (typeof result != 'string') {
      throw new NotFoundException('ENV not found');
    }
    return result;
  }
}
