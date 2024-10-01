import { ContainerBuilder } from 'node-dependency-injection';

export const container = new ContainerBuilder();

require('./UserPermission/application');
require('./CountingRecordsOrder/application');
require('./ProductionModule/application');
require('./ProductionOrder/application');