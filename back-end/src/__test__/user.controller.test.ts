import * as typeorm from 'typeorm';
import * as express from 'express';
import * as request from 'supertest';
import * as validate from 'class-validator';
import * as User from '../entity/User';
import UserController from '../controllers/UserController';

jest.mock('../entity/User', () => ({}));
jest.mock('class-validator', () => ({
    validate: jest.fn().mockReturnValue(Promise.resolve([]))
}));
jest.mock('typeorm', () => ({
    getRepository: jest.fn().mockReturnValue({
        find: jest.fn().mockResolvedValue({username: 'testuser'}),
        findOneOrFail: jest.fn().mockResolvedValue({username: 'testuser'}),
        insert: jest.fn().mockResolvedValue('ok'),
        create: jest.fn().mockReturnValue({
            hashPassword: jest.fn()
        })
    })
}))
const app = express()
app.get("/listall", UserController.listAll);
app.get("/getoncebyid", UserController.getOneById);
app.post("/newuser", (req, res, next) => {
    req.body = {
        username: "test",
        password: "test",
        firstName: "test",
        lastName: "test",
        role: "User"
    }
    next();
}, UserController.newUser);


describe('UserController', () => {
    describe('listall', () => {
        test('GET /listall', () => {
            return request(app).get('/listall').expect(200).then(res => {
                expect(JSON.parse(res.text)).toEqual({username: 'testuser'})
            })
        })
    }
    )
    describe('getOncById', () => {
        test('GET /getoncebyid', () => {
            return request(app).get('/getoncebyid').query({id: "1"}).expect(200).then(res => {
                expect(JSON.parse(res.text)).toEqual({username: 'testuser'})
            })
        })
    })
    describe('newUser', () => {
        test('POST /newuser', () => {
            return request(app).post('/newuser').expect(201).then(res => {
                expect(res.text).toEqual("User created")
            })
        })
    })
})

