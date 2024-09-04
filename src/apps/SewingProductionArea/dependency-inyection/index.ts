import { ContainerBuilder, YamlFileLoader } from 'node-dependency-injection';
import path from 'path'

const container = new ContainerBuilder();
const loader = new YamlFileLoader(container);

const env = 'dev'; // --------establecer entornos-------

console.log(path.resolve(__dirname, 'application.yaml'))

loader.load(path.resolve(__dirname, 'application.yaml'));

export default container;