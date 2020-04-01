import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

// check jwt token
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {    
    if (req.headers["authorization"]) {
        const bearerToken = req.headers["authorization"].split(' ');
        if (bearerToken.length === 2) {
            let scheme = <string>bearerToken[0];
            let token = <string>bearerToken[1];
            if (/^Bearer$/i.test(scheme)) {
                let jwtPayload;

                try {
                    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
                    res.locals.jwtPayload = jwtPayload;
                } catch (error) {
                    // unauthorized
                    res.status(401).send();
                    return;
                }

                const { userId, username } = jwtPayload;
                const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
                    // expired in 3 hour
                    expiresIn: "3h"
                });

                res.setHeader("token", newToken);
                next();
                return;
            }
        }
    }

    res.status(401).send();
    return;
};