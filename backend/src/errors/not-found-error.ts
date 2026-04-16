import { BaseError } from "./base-error";

export class NotFoundError extends BaseError {
  constructor(message = 'Не найдено') {
    super(message, 404);
  }
}
