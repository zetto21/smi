// 날짜 관련 함수를 위한 타입 정의
export type DateIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
const availableLang = ['ko', 'en'] as const;
export const dateName: {[key in string]: ReadonlyArray<string>} = {
    ko: ['일', '월', '화', '수', '목', '금', '토'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}

/**
 * 
 * @param date {Date} 날짜 객체
 * @param lang 변환될 요일 언어 (ex. ko, en)
 * @returns {string} 변환될 한글 용어
 */
export function getDayName(date: Date, lang: string): string {
    if(!availableLang.includes(lang as any)) {
        throw new Error('(getDatName) 지원하지 않는 언어입니다.');
    }
    return dateName[lang][date.getDay() as DateIndex];
}