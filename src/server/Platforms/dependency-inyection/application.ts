import { ContainerBuilder } from 'node-dependency-injection';

export const container = new ContainerBuilder();

require('./Shared/application');
require('./ProductionModule/application');
require('./ProductionSchedule/application')
require('./ProductionModuleEvent/application');
require('./Operation/application');
require('./Menu/application')