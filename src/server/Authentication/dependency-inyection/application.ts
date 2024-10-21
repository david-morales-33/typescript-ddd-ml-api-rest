import { ContainerBuilder } from 'node-dependency-injection';

export const container = new ContainerBuilder();

require('./Shared/application')
require('./AuthenticationToken/application')
require('./AuthenticationUser/application')