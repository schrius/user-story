import * as request from 'supertest';
import * as typeorm from 'typeorm';
import config from "../config/config";
import * as express from 'express';
import * as User from "../entity/User";
import * as validate from "class-validator";
import AuthController from '../controllers/AuthController';

jest.mock('typeorm');
jest.mock('../entity/User', () => ({}));
jest.mock('class-validator', () => ({
    validate: jest.fn().mockReturnValue(Promise.resolve([]))
}));

const app = express()
app.get("/login", AuthController.login);
app.get("/changepassword",
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        req.body = {
            oldPassword: 'test1',
            newPassword: 'test2'
        }
        res.locals = {
            jwtPayload: {
                userId: 1
            }
        }
        next()
    }, AuthController.changePassword)

describe('AuthController', () => {
    describe('login', () => {
        test('Should be 400', () => {
            return request(app).get('/login').expect('WWW-Authenticate', 'Basic realm="Secure Area').expect(400)
        })
        test('Should be 200', () => {
            (typeorm as any).getRepository.mockReturnValueOnce({
                findOneOrFail: () => Promise.resolve({
                    id: 1,
                    username: 'test',
                    roles: 'test',
                    password: 'test',
                    validatePassword: jest.fn(() => true),
                }),
            });
            const dummyPassword = Buffer.from("test:test").toString('base64')
            return request(app).get('/login')
                .set('authorization', 'Basic ' + dummyPassword)
                .expect(200)
                .then(res => {
                    expect(res).toHaveProperty('text')
                })
        })
    })

    describe('changePassword', () => {
        test('Should be 204', () => {
            (typeorm as any).getRepository.mockReturnValueOnce({
                findOneOrFail: () => Promise.resolve({
                    id: 1,
                    username: 'test',
                    roles: 'test',
                    password: 'test',
                    validatePassword: jest.fn(() => true),
                    hashPassword: jest.fn()
                }),
                save: jest.fn()
            });
            return request(app).get('/changepassword').expect(204)

        })
    })
});
