import { Injectable, InternalServerErrorException } from '@nestjs/common';

/**
 * Service responsible for handling security misconfigurations.
 * It contains two methods to handle error handling, one broken and one fixed.
 * The broken method does not handle the error properly and exposes the stack trace to the user.
 * The fixed method handles the error properly and does not send any internal error details to the user.
 */
@Injectable()
export class SecurityMisconfigurationService {
  async brokenErrorHandling(): Promise<any> {
    try {
      throw new Error('user should not see the stack trace of this error');
    } catch (e) {
      const parsedError = e as Error;
      return {
        message: parsedError.message,
        stack: parsedError.stack,
      };
    }
  }

  fixedErrorHandling(): Promise<void> {
    try {
      throw new Error('user should not see the stack trace of this error');
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
