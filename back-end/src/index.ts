import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

createConnection()
    .then(async connection => {
        const app = express();

        app.use(cors());
        app.use(helmet());
        app.use(bodyParser.json());

        app.use("/", routes)

        app.listen(3001, () => {
            console.log("User Story Server started on port 3001")
        })
    })
    .catch(error => console.log(error));
