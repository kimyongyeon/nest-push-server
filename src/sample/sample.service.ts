import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sample } from './sample.entity';
import { Cron, Interval, SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from 'cron';

@Injectable()
export class SampleService {

    private readonly logger = new Logger(SampleService.name);

    private sampleList: string[];

    constructor(
        private readonly schedulerRegistry: SchedulerRegistry,
        private readonly scheduler: SchedulerRegistry
    ) {
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

    jobStop() {
        const job = this.schedulerRegistry.getCronJob('notifications');
        job.stop();
        console.log(job.lastDate());
    }

    addCronJob(name: string, seconds: string) {
        
        const job = new CronJob(`${seconds} * * * * *`, () => {
            this.logger.warn(`time (${seconds}) for job ${name} to run!`);
        });

        this.scheduler.addCronJob(name, job);
        job.start();

        this.logger.warn(
            `job ${name} added for each minute at ${seconds} seconds!`,
        );
    }

    deleteCron(name: string) {
        this.scheduler.deleteCronJob(name);
        this.logger.warn(`job ${name} deleted!`);
    }

    getCrons() {
        const jobs = this.scheduler.getCronJobs();
        jobs.forEach((value, key, map) => {
            let next;
            try {
                next = value.nextDates().toDate();
            } catch (e) {
                next = 'error: next fire date is in the past!';
            }
            this.logger.log(`job: ${key} -> next: ${next}`);
        });
    }

    // @Cron('45 * * * * *')
    handleCron() {
        this.logger.debug('Called when the current second is 45');
    }

    // @Interval(10000)
    handleInterval() {
        this.logger.debug('Called every 10 seconds');
    }

    @Cron('* * 8 * * *', {
        name: 'notifications',
    })
    triggerNotifications() { }

}
