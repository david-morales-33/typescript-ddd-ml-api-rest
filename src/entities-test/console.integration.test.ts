import { SQLServerConfigFactory } from "../contexts/SewingProductionAreaManagement/Shared/infrastructure/persistence/SQLServer/SQLServerConfigFactory";
import { EnviromentConfig } from "../server/EnviromentConfig";

const config = SQLServerConfigFactory.createConfig();

console.log(config)