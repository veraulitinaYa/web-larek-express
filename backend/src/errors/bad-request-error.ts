import BaseError from './base-error';

export default class BadRequestError extends BaseError {
  constructor(message = 'Некорректные данные') {
    super(message, 400);
  }
}
