import { Request, Response } from "express";
import { getRepository, getManager } from "typeorm";
import { validate } from "class-validator";
import { Story } from '../entity/Story'
import { User } from '../entity/User';

// Story Controller
// handle new story creation, update story status and list stories
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
        let { summary, type, complexity, cost, estimatedHrs, description} = req.body;
        const id = res.locals.jwtPayload.userId;
        const manager = getManager();
        const storyRepository = getRepository(Story);
        try {
            const user = await manager.findOneOrFail(User, id)
            console.log(user)
            const story = storyRepository.create({
                summary: summary,
                type: type,
                complexity: complexity,
                cost: parseInt(cost),
                estimatedHrs: parseInt(estimatedHrs),
                description: description,
                status: null,
                user: user
            })
            console.log(story)
            const errors = await validate(story);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            try {
                await manager.save(Story,story);
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
        console.log(req.params)
        const id = req.params.id;
        const { status } = req.body;
        console.log(req.body)
        const storyRepository = getRepository(Story);
        try {
            await storyRepository.update(id, { status: status});
        } catch (error) {
            res.status(404).send("update status failed");
            return;
        }
        res.status(200).send()
    };
};

export default StoryController;