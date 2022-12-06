export interface ResponseException {
    timeStamp: string;
    httpCode: number;
    httpStatus: string;
    information: any;
}

export function getMessageError( error: any ): string {
    let message = '';
    const loginResponseException: ResponseException = error.error;

    if( Array.isArray( loginResponseException.information ) ) {
        message = loginResponseException.information[0].message;
    } else if( !Array.isArray( loginResponseException.information ) && loginResponseException.information ) {
        message = loginResponseException.information.message;
    } else {
        message = error.error.message;
    }
    return message;
}