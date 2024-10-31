import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import path from 'path'

export const container = new ContainerBuilder();
let loader = new YamlFileLoader(container)

export const containerPromise = (async () => {
    try {
        await loader.load(path.resolve(__dirname, 'application.yml'));
        console.log("Contenedor cargado correctamente.");
        return container;
    } catch (error) {
        console.error("Error al cargar el contenedor:", error);
        throw error;
    }
})();