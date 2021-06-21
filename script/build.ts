import { spawn } from './spawn';
import { createConsoleLogger } from '@iamyth/logger';
import './format';
import './lint';

const logger = createConsoleLogger('TSC');

logger.task('TypeScript Compile');
spawn('tsc', ['-p', 'config/tsconfig.src.json'], 'Cannot Compile with tsc');
