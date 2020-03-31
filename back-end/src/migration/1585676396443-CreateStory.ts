import {MigrationInterface, QueryRunner, getRepository, getManager} from "typeorm";
import { Story } from '../entity/Story';
import { User } from '../entity/User';

export class CreateStory1585676396443 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const storyRepository = getRepository(Story);
        const userRepository = getRepository(User);
        var user1 = await userRepository.findOneOrFail(1);
        var user2 = await userRepository.findOneOrFail(2);
        var story1 = storyRepository.create({
            summary: "1 story createby 1",
            description: "des",
            type: "bugfix",
            complexity: "Low",
            estimateHrs: 3,
            cost: 300,
            status: null,
            user: user1
        })
        let story2 = storyRepository.create({
            summary: "2 story createby 1",
            description: "des",
            type: "bugfix",
            complexity: "Low",
            estimateHrs: 3,
            cost: 300,
            status: null,
            user: user1
        })
        let story3 = storyRepository.create({
            summary: "2 story createby 2",
            description: "des",
            type: "bugfix",
            complexity: "Low",
            estimateHrs: 3,
            cost: 300,
            status: null,
            user: user2
        })
        const entityManager = getManager();
       await entityManager.save([story1, story2, story3])
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
