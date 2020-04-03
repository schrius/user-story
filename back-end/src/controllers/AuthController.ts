import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";
import config from "../config/config";

// Authorization controller
// handle all login request and return a jwt token
class AuthController {
    static login = async (req: Request, res: Response) => {
        let basicAuth = req.headers['authorization'];

        if (basicAuth) {
            let encodedAuth = basicAuth.split(' ');
            if (encodedAuth.length === 2 && /^Basic$/i.test(encodedAuth[0])) {
                let buf = Buffer.from(encodedAuth[1], 'base64').toString('ascii');
                let creds = buf.toString().split(':');

                let username = creds[0];
                let password = creds[1];

                const userRepository = getRepository(User);
                let user: User;

                try {
                    user = await userRepository.findOneOrFail({ where: { username } });
                    if (!user.validatePassword(password)) {
                        res.status(401).send();
                        return;
                    }
                } catch (error) {
                    res.status(404).send('invalid password');
                    return;
                }

                const token = jwt.sign(
                    { userId: user.id, username: user.username, roles: user.roles },
                    config.jwtSecret,
                    { expiresIn: "3h" }
                )
                // set token to cookies
                //res.cookie("access_token", newToken, { maxAge: 7200});
                res.send(token);
                return;
            }
        }
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area');
        res.status(400).send();
    };

    static changePassword = async (req: Request, res: Response) => {

        const id = res.locals.jwtPayload.userId;

        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(404).send();
        }

        const userRepository = getRepository(User);
        let user;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send();
        }

        if (!user.validatePassword(oldPassword)) {
            res.status(401).send();
            return;
        }

        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(403).send(errors);
            return;
        }

        user.hashPassword();
        userRepository.save(user);

        res.status(204).send();
    };
}
export default AuthController;