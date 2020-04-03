import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";

class UserController{
    static listAll = async (req: Request, res: Response) => {
    //Get users from database
    const userRepository = getRepository(User);
    const users = await userRepository.find({
        select: ["id", "username", "firstName", "lastName", "roles"] 
    });

    res.send(users);
    };

    static getOneById = async (req: Request, res: Response) => {
    const id: number = <unknown>req.params.id as number;
    const userRepository = getRepository(User);
    try {
        const user = await userRepository.findOneOrFail(id, {
        select: ["username", "lastName"] 
        });
        res.send(user)
    } catch (error) {
        res.status(404).send("User not found");
    }
    };

    static newUser = async (req: Request, res: Response) => {
    let { username, password, role, lastName, firstName } = req.body;
    const userRepository = getRepository(User);

    let user = userRepository.create({
        username: username,
        password: password,
        lastName: lastName,
        roles: [role]
    })

    const errors = await validate(user);
    if (errors.length > 0) {
        res.status(400).send(errors);
        return;
    }

    user.hashPassword();
    try {
        await userRepository.insert(user);
    } catch (e) {
        res.status(409).send("username already in use");
        return;
    }

    res.status(201).send("User created");
    };

};

export default UserController;