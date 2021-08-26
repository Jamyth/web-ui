import { spawn } from './spawn';
import { createConsoleLogger } from '@iamyth/logger';
import fs from 'fs-extra';
import path from 'path';
import './format';
import './lint';

const FilePath = {
    build: path.join(__dirname, '../dist'),
    src: path.join(__dirname, '../src'),
};

const logger = createConsoleLogger('TSC');

logger.task('TypeScript Compile');
spawn('tsc', ['-p', 'config/tsconfig.src.json'], 'Cannot Compile with tsc');

const supportedExtensions = ['.scss', '.css', '.json', '.jpg', '.png', '.gif', '.mp3', '.mp4', '.wmv', '.js'];
fs.copySync(FilePath.src, FilePath.build, {
    filter: (source) => {
        const extension = path.extname(source);
        // source may be a directory or a file under the directory.
        if (fs.statSync(source).isDirectory()) {
            return true;
        } else if (supportedExtensions.includes(extension)) {
            logger.info(`Asset (${extension}) copied from "${path.relative(FilePath.src, source)}"`);
            return true;
        } else {
            if (extension !== '.tsx' && extension !== '.ts') {
                logger.error(`Asset (${extension}) is unsupported, skipped "${path.relative(FilePath.src, source)}"`);
            }
            return false;
        }
    },
    dereference: true,
});
