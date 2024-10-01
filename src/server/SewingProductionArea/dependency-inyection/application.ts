import { ContainerBuilder } from 'node-dependency-injection';
import path from 'path'

export const container = new ContainerBuilder();

import './CountingRecordsOrder/application';