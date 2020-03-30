import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Get user ID
        const id = res.locals.jwtPayload.userId;

        // user role from the database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send();
        }

        if (roles.indexOf(user.role) > -1) {
            next();
        } else {
            res.status(401).send()
        }
    }
}