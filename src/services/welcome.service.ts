import {helloResponse} from '../interfaces/welcome.interface';

export const sayHello = () : helloResponse =>{
    return {
        message :('Hello world!')
    }
}