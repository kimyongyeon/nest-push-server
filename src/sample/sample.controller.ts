import {
  Controller,
  Get,
  Post,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UsePipes
} from "@nestjs/common";
import { CreateCatDto, ListAllEntities } from "./sample.dto";
import { SampleService } from "./sample.service";
import { LoggingInterceptor } from "../common/logging.interceptor";
import { ValidationPipe } from "src/common/validation.pipe";

@Controller("sample")
// @UseInterceptors(LoggingInterceptor)
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get('forbidden')
  async findException() {
    throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
  }

  @Get('customForbidden')
  async findException2() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: "This is a custom message"
      },
      403
    );
  }

  @Get("/write")
  @HttpCode(204)
  @Header("Cache-Control", "none")
  write(@Query("sampleName") sampleName): string {
    return this.sampleService.write(sampleName);
  }

  @Get("edit")
  edit(@Query("sampleName") sampleName): string {
    return this.sampleService.edit(sampleName);
  }

  @Get("read")
  findquery(@Query("sampleName") sampleName): string {
    return this.sampleService.read(sampleName);
  }

  @Get("list")
  findAll(@Query("sampleName") sampleName): string {
    return this.sampleService.list() + "";
  }

  @Get("/redirect")
  @Redirect("https://nestjs.com", 301)
  redirect() {
    return;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createCatDto: CreateCatDto) {
    return `This action adds a new cat = ${createCatDto}`;
  }

  @Get()
  querySample(@Query(new ValidationPipe()) query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(":id")
  findOnes(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get(":id")
  findOne(@Param("id") id): string {
    return `This action returns a #${id} cat`;
  }
}
