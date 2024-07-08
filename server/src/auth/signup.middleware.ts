import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class SignupMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const response = await this.authService.registerUser(
      req.body.email,
      req.body.password,
    );
    if (response instanceof HttpException) {
      // There was an error
      throw response;
    } else {
      // successful
      next();
    }
  }
}
