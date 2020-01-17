import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample } from './sample.entity';

@Injectable()
export class SampleService {

    private sampleList: string[];

    constructor() {
        this.sampleList = ["사나", "효리", "아이유", "홍진영"];
     }

    list() {
        return this.sampleList;
    }

    read(sampleName: string) {
        return this.sampleList[sampleName];
    }

    write(sampleData: string): string {
        let result = this.sampleList.push(sampleData)
        return result + " success";
    }

    edit(sampleName: string): string {
        return "edit complete: " + sampleName;
    }

}
