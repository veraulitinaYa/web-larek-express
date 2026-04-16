import { BaseError } from "./base-error";

export class InternalServerError extends BaseError {
  constructor(message = 'Ошибка сервера') {
    super(message, 500);
  }
}