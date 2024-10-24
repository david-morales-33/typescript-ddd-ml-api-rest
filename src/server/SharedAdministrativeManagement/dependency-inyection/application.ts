import { ContainerBuilder } from 'node-dependency-injection';

export const container = new ContainerBuilder();

require('./Shared/application')
require('./Service/application');
require('./User/application')