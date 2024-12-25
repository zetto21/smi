import {exec} from 'child_process';
import { Logger } from '../utils/logger';
import { promisify } from 'util';
import fs from 'fs';
import { DelayOptions } from '../types';

const asyncExec = promisify(exec);
const logger = new Logger();

type ImageServiceResponse = Buffer<ArrayBufferLike>;

export class ImageService {
    public async generateMealImage({delay}: DelayOptions): Promise<ImageServiceResponse> {
        try {
            await asyncExec(`python3 src/scripts/generate_meal_image.py ${delay}`);
            logger.info(`급식 이미지 생성 성공`);

            return await fs.readFileSync('meal.png');
        } catch (error) {
            logger.error(`급식 이미지 생성 실패`);
            throw error;
        }
    }

    public async generateRestImage({delay}: DelayOptions): Promise<ImageServiceResponse> {
        try {
            await asyncExec(`python3 src/scripts/generate_rest_image.py ${delay}`);
            logger.info(`휴식 이미지 생성 성공`);

            return await fs.readFileSync('rest.png');
        } catch (error) {
            logger.error(`휴식 이미지 생성 실패`);
            throw error;
        }
    }
}