import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User, UserRole } from "../entity/User";


// check token privallege 
export const checkRole = (reqRole: UserRole) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Get user ID
        const id = res.locals.jwtPayload.userId;
        // user role from the database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send(id);
        }
        if (user.roles.includes(reqRole)) {
            next();
        } else {
            res.status(401).send();
        }
    }
}