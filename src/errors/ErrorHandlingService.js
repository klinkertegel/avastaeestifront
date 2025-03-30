// ErrorHandlingService.js
import BusinessErrors from '../errors/BusinessErrors';
import HttpStatusCodes from '../errors/HttpStatusCodes';

class ErrorHandlingService {
    static errorMessages = {
        [BusinessErrors.CODE_INCORRECT_CREDENTIALS]: 'Vale kasutajanimi või parool',
        [BusinessErrors.CODE_USERNAME_EXISTS]: 'Kasutajanimi on juba võetud',
        [BusinessErrors.CODE_EMAIL_EXISTS]: 'Email on juba kasutusel',
        [BusinessErrors.CODE_LOCATION_EXISTS]: 'Asukoht on juba olemas',
        [BusinessErrors.CODE_NO_LOCATION_FOUND]: 'Asukohta ei leitud',
        [HttpStatusCodes.STATUS_FORBIDDEN]: 'Teil puudub ligipääs',
        [HttpStatusCodes.STATUS_NOT_FOUND]: 'Ressurssi ei leitud',
        'DEFAULT': 'Midagi läks valesti. Palun proovige uuesti.',
        'NETWORK_ERROR': 'Võrguühenduse viga. Palun kontrollige oma internetiühendust.',
        'SERVER_ERROR': 'Serveri viga. Palun proovige hiljem uuesti.'
    };

    static handleError(error) {
        console.error('Error occurred:', error);

        // Handle axios error responses
        if (error.response) {
            // Server responded with error status
            const statusCode = error.response.status;
            const businessErrorCode = error.response.data?.errorCode;

            if (businessErrorCode && this.errorMessages[businessErrorCode]) {
                return this.errorMessages[businessErrorCode];
            }

            if (this.errorMessages[statusCode]) {
                return this.errorMessages[statusCode];
            }

            if (statusCode >= 500) {
                return this.errorMessages.SERVER_ERROR;
            }
        } 
        // Handle network errors
        else if (error.request) {
            return this.errorMessages.NETWORK_ERROR;
        }

        // Handle all other errors
        return this.errorMessages.DEFAULT;
    }

    static isBusinessError(error, expectedCode) {
        return error.response?.data?.errorCode === expectedCode;
    }

    static isHttpError(error, expectedStatus) {
        return error.response?.status === expectedStatus;
    }
}

export default ErrorHandlingService;