import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { validate } from "class-validator";
import { Story } from '../entity/Story'
import { User } from '../entity/User';

class StoryController{
    static listAll = async (req: Request, res: Response) => {
        const storyRepository = getRepository(Story);
        const story = await storyRepository.find();
        res.send(story)
    }

    static getByUserId = async (req: Request, res: Response ) => {
        const id = res.locals.jwtPayload.userId;
        const storyRepository = getRepository(Story);
        try {
            const story = await storyRepository
                    .createQueryBuilder()
                    .where("story.createdBy = :id", {id: id})
                    .getMany()
            res.send(story);
        } catch (error) {
            res.status(404).send("Story not found");
        }
    }

    static newStory = async (req: Request, res: Response) => {
        let { summary, type, complexity, cost, estimateHrs, description} = req.body;
        const id = res.locals.jwtPayload.userId;
        const manager = getManager();
        try {
            const user = await manager.findOneOrFail(User, id)
            const story = manager.create(Story, {
                summary: summary,
                type: type,
                complexity: complexity,
                cost: cost,
                estimateHrs: estimateHrs,
                description: description,
                status: null,
                user: user
            })

            const errors = await validate(story);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            try {
                await manager.insert(Story,story);
            } catch (e) {
                res.status(409).send("story already exist")
                return;
            }
        }   catch (e) {
            res.status(404).send("invalid user")
            return;
        }
        res.status(201).send("Story created");
    };

    static updateStoryStatus = async (req: Request, res: Response) => {
        const id = req.params.id;
        const { status } = req.body;

        const storyRepository = getRepository(Story);
        try {
            await storyRepository.update(id, { status: status});
        } catch (error) {
            res.status(404).send("update status failed");
            return;
        }
    };
};

export default StoryController;