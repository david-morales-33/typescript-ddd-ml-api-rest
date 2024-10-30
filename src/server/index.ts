import { EnviromentConfig } from "./EnviromentConfig";
import { Server } from "./Server";

const env = new EnviromentConfig();
const BackendApp = new Server(env.SERVER_PORT);

BackendApp.listen().then().catch(error => { console.log(error) })