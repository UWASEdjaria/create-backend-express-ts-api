import dotenv from 'dotenv';
import app from './app';
dotenv.config();

class Server {
    private static PORT=process.env.PORT || 5000;
    static start(): void {
     app.listen(this.PORT, () =>{
    console.log('server is running on port:' + this.PORT);
});
 }}
 Server.start();
    
