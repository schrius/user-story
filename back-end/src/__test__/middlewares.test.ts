
import { checkJwt } from '../middlewares/checkJwt';
import * as express from 'express';
import * as request from 'supertest';
import { checkRole } from '../middlewares/checkRole';
import { UserRole } from "../entity/User";
import * as typeorm from "typeorm";
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn().mockReturnValue("Test"),
    sign: jest.fn().mockReturnValue("TestToken")
}));

(typeorm as any).getRepository = jest.fn();

const app = express()

app.get("/", checkJwt, (req, res) => {
    res.status(200).send("OK");
})

afterAll(() => {
    jest.clearAllMocks();
})

app.get("/admin", 
    (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.locals = {
            jwtPayload: {
                userId: 1
            }
        }
        next()
    },
    checkRole(UserRole.ADMIN),
    (req, res) => {
        res.status(200).send("OK");
    })

describe("Test checkJwt", () => {
    test("Should response 400", async () => {
        const res = await request(app).get("/")
        expect(res.statusCode).toBe(400)
    })

    test("Should response 200 and OK", async () => {
        const res = await request(app).get("/").set('authorization', 'Bearer TestToken')
        expect(res.statusCode).toBe(200)
        expect(res.text).toEqual("OK")
        expect(res.headers.token).toEqual('TestToken')
    })
})

describe("Test checkRole", () => {
    test("Should be 200", async () => {
        (typeorm as any).getRepository.mockReturnValue({
            findOneOrFail: () => Promise.resolve({ roles: [UserRole.ADMIN] })
        })
        const res = await request(app).get("/admin")
        expect(res.statusCode).toBe(200)
    })

    test("Should be 401", async () => {
        (typeorm as any).getRepository.mockReturnValue({
            findOneOrFail: () => Promise.resolve({ roles: [UserRole.USER] })
        })
        const res = await request(app).get("/admin")
        expect(res.statusCode).toBe(401)
    })
})
