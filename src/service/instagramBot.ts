import { InstagramService } from "./instagram";
import { ImageService } from "./image";
import { DelayOptions } from "../types";
import { getCurrentDateKorean, getDayName, isFirstWeekdayOfMonth } from "../utils/date";
import { Logger } from "../utils/logger";
import { env } from "../constants/env";
import { sendWebhook } from "./webhook";
import { WebhookPostNotification } from "./webhook/notification";

const logger = new Logger();

export class InstagramBot {
    private instagramService: InstagramService;
    private imageService: ImageService;

    constructor(instagramService: InstagramService, imageService: ImageService) {
        this.instagramService = instagramService;
        this.imageService = imageService;

        this.instagramService.login(process.env.INSTAGRAM_USERNAME, process.env.INSTAGRAM_PASSWORD);
    }

    async postDaily({delay}: DelayOptions) {
        try {
            const date = new Date();

            // 매 달마다 트리거 되는 "이 달의 휴식" 이미지 업로드
            if(isFirstWeekdayOfMonth(date)) {
                await this.postMonthlyRestImage(date, delay);
            }

            // 매일 트리거 되는 급식 이미지 업로드
            await this.postMealImage(date, delay);

            WebhookPostNotification();
        } catch (error) {
            console.error(`일일 업로드 실패: ${error}`);
        }
    }

    private async postMonthlyRestImage(date: Date, delay?: number) {
        try {
            const restImage = await this.imageService.generateRestImage({delay: delay});
            const monthDate = `${date.getFullYear()}년 ${String(date.getMonth() + 1).padStart(2, '0')}월`;
            
            await this.instagramService.publishPhoto({
                file: restImage,
                caption: `이 달의 휴식 - ${monthDate}`,
                reason: 'monthly'
            });

            logger.info(`이 달의 휴식 이미지 업로드 성공`);
        } catch (error) {
            logger.error(`이 달의 휴식 이미지 업로드 실패: ${error}`);
            throw error;
        }
    };

    private async postMealImage(date: Date, delay?: number) {
        try {
            const mealImage = await this.imageService.generateMealImage({delay: delay});
            const formattedDate = getDayName(date, 'ko');
        
            await this.instagramService.publishPhoto({
                file: mealImage,
                caption: `${env.SCHOOL_NAME} 오늘의 정보\n\n${getCurrentDateKorean(date)}\n\n#급식표 #밥밥밥`,
            })

            logger.info(`급식 이미지 업로드 성공`);
        } catch (error) {
            logger.error(`급식 이미지 업로드 실패: ${error}`);
            throw error;
        }
    };
}