import { ContainerBuilder } from 'node-dependency-injection';

export const container = new ContainerBuilder();

require('./service/application');