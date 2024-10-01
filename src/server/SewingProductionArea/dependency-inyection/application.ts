import { ContainerBuilder } from 'node-dependency-injection';

export const container = new ContainerBuilder();

// import './CountingRecordsOrder/application';
require('./CountingRecordsOrder/application');
require('./ProductionModule/application');