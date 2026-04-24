import { User } from "@prisma/client";
import { IUserSession } from "../interfaces/auth.interface";

declare global {
    namespace Express {
        interface Request {
            user: IUserSession ;
        }
    }
}