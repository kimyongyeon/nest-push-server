import { Controller, Get, Render, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    this.logger.debug("/ :: index ");
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): string {
    return this.appService.getHello() + " test";
  }

  @Get('index')
  @Render('index')
  root() {
    return { message: 'Hello Rendering world!' };
  }
}
