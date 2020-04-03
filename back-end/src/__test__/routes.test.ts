import { createConnection, getConnection, getRepository } from "typeorm";
import { User, UserRole} from '../entity/User';

beforeAll(() => {
    return createConnection()
})

afterAll(() => {
    let conn = getConnection();
    return conn.close();
});

test("store and fetch", async () => {
    
} )