const INSTAGRAM_MAX_CAPTION_LENGTH = 2200;

const ERROR_MESSAGES = {
    EMPTY: '캡션이 비어있습니다.',
    NOT_STRING: '캡션은 문자열이어야 합니다.',
    TOO_LONG: `캡션은 ${INSTAGRAM_MAX_CAPTION_LENGTH}자를 넘을 수 없습니다.`,
    TOO_MANY_HASHTAGS: '캡션의 해시태그는 30개를 넘을 수 없습니다.',
} as const;

export function vaildateCaption(caption: string): boolean {
    captionIsNotEmpty(caption);
    captionIsString(caption);
    captionIsNotTooLong(caption);
    captionHasNotTooManyHashtags(caption);

    return true;
}

function captionIsNotEmpty(caption: string): void {
    if(!caption) {
        throw new Error(ERROR_MESSAGES.EMPTY);
    }
}

function captionIsString(caption: string): void {
    if(typeof caption !== 'string') {
        throw new Error(ERROR_MESSAGES.NOT_STRING);
    }
}

function captionIsNotTooLong(caption: string): void {
    if(caption.length > INSTAGRAM_MAX_CAPTION_LENGTH) {
        throw new Error(ERROR_MESSAGES.TOO_LONG);
    }
}

function captionHasNotTooManyHashtags(caption: string): void {
    const hashtagCount = (caption.match(/#/g) || []).length;
    if (hashtagCount > 30) {
        throw new Error(ERROR_MESSAGES.TOO_MANY_HASHTAGS);
    }
}