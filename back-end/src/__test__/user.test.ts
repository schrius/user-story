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
    /*
    await getRepository(User).insert({
        username: "NewUser2@g.com",
        roles: [UserRole.USER],
        password: "test",
        firstName: "test",
        lastName: "testl"
    });
    let user = await getRepository(User).findOne({where: {username: "NewUser2@g.com"}});

    expect(user.username).toBe("NewUser2@g.com")

    await getRepository(User).delete({username: "NewUser2@g.com"});
*/
} )