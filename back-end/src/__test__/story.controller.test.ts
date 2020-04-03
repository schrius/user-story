import * as request from 'supertest';
import * as typeorm from 'typeorm';
import * as express from 'express';
import * as validate from "class-validator";
import StoryController from '../controllers/StoryController';

jest.mock('typeorm', () => ({
    getManager: jest.fn().mockReturnValue({
        findOneOrFail: jest.fn().mockResolvedValue({
            id: 1,
            username: 'test@test.com'
        }),
        save: jest.fn().mockResolvedValue('ok')
    }),
    getRepository: jest.fn().mockReturnValue({
        create: jest.fn().mockReturnValueOnce('ok'),
        update: jest.fn(),
        find: jest.fn().mockResolvedValueOnce('story'),
        createQueryBuilder: jest.fn().mockReturnValue({
            where: jest.fn().mockReturnValue({
                getMany: jest.fn().mockReturnValue('story')
            })
        })
    })
}));
jest.mock('../entity/Story', () => ({}));
jest.mock('../entity/User', () => ({}));
jest.mock('class-validator', () => ({
    validate: jest.fn().mockReturnValue(Promise.resolve([]))
}));

const app = express()
app.get("/liststory", StoryController.listAll);
app.get("/getbyuserid", (req, res, next) => {
    res.locals = {
        jwtPayload: {
            userId: 1
        }
    }
    next()
}, StoryController.getByUserId);
app.get("/newstory", (req, res, next) => {
    res.locals = {
        jwtPayload: {
            userId: 1
        }
    }
    req.body = {
        summary: 'test1',
        type: 'test2',
        complexity: 'low',
        cost: 300,
        estimatedHrs: 3,
        description: "test"
    }
    next()
}, StoryController.newStory);
app.get("/updatestatus", (req, res, next) => {
    req.params.id = "id"
    req.body = {
        status: 'test',
    }
    next()
}, StoryController.updateStoryStatus);

describe('Story Controller', () => {
    describe('listAll', () => {
        test('GET /liststory', () => {
            return request(app).get('/liststory').expect(200).then(
                res => {
                    expect(res.text).toEqual('story')
                }
            )
        })
    })

    describe('getByUserId', () => {
        test('GET /getbyuserid', () => {
            return request(app).get('/getbyuserid').expect(200).then(
                res => {
                    expect(res.text).toEqual('story')
                }
            )
        })
    })

    describe('newStory', () => {
        test('GET /newstory', () => {
            return request(app).get('/newstory').expect(201).then(
                res => {
                    expect(res.text).toEqual('Story created')
                }
            )
        })
    })

    describe('updateStoryStatus', () => {
        test('GET /updatestatus', () => {
            return request(app).get('/updatestatus').expect(200)
        })
    })
})