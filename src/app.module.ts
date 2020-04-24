import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { EnvModule } from './env/env.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [TodoModule, EnvModule],
})
export class AppModule {}
