import BaseError from './base-error';

export default class InternalServerError extends BaseError {
  constructor(message = 'Ошибка сервера') {
    super(message, 500);
  }
}
