import { Controller, Get, Post, HttpCode, Header, Redirect, Query, Param, Body } from '@nestjs/common';
import { CreateCatDto, ListAllEntities } from './sample.dto';
import { SampleService } from './sample.service';

@Controller('sample')
export class SampleController {

    constructor(private readonly sampleService: SampleService) { }

    @Get('/write')
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    write(@Query('sampleName') sampleName): string {
        return this.sampleService.write(sampleName);
    }

    @Get('edit')
    edit(@Query('sampleName') sampleName): string {
        return this.sampleService.edit(sampleName);
    }

    @Get('read')
    findquery(@Query('sampleName') sampleName): string {
        return this.sampleService.read(sampleName);
    }

    @Get('list')
    findAll(@Query('sampleName') sampleName): string {
        return this.sampleService.list() + "";
    }

    @Get('/redirect')
    @Redirect('https://nestjs.com', 301)
    redirect() {
        return;
    }

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        return 'This action adds a new cat';
    }   

    @Get()
    querySample(@Query() query: ListAllEntities) {
        return `This action returns all cats (limit: ${query.limit} items)`;
    }

    @Get(':id')
    findOnes(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }

    @Get(':id')
    findOne(@Param('id') id): string {
        return `This action returns a #${id} cat`;
    }


}
