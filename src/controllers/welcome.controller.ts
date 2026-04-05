import {Request,Response} from 'express';
import {sayHello} from '../services/welcome.service'

export const welcomeController = (req:Request,res:Response)=>{
    const data = sayHello();
    res.status(200).json(data);
}
