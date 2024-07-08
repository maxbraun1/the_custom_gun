import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './session.serializer';
import { GoogleStrategy } from './strategies/google.strategy';
import { SignupMiddleware } from './signup.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    PrismaModule,
    EmailModule,
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SignupMiddleware)
      .forRoutes({ path: 'auth/signup', method: RequestMethod.POST });
  }
}
