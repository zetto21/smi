import chalk from "chalk";

const requireEnv = [
    'SCHOOL_NAME',
    'INSTAGRAM_USERNAME',
    'INSTAGRAM_PASSWORD',
    'INTERVAL',
]

export function vaildateEnv() {
    for (const env of requireEnv) {
        if (!process.env[env]) {
            throw new Error(`환경변수 ${chalk.red(env)}이(가) 설정되지 않았습니다.`);
        }
    }
}