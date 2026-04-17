import BaseError from './base-error';

export default class ConflictError extends BaseError {
  constructor(message = 'Конфликт данных') {
    super(message, 409);
  }
}
