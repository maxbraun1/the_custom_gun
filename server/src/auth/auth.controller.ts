import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { LocalSignupDTO } from './dto/local-signup.dto';
import { AuthResponseUserDTO } from './dto/auth-response-user.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Req() request) {
    return new AuthResponseUserDTO(request.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signup')
  async signupUser(@Request() req, @Body() body: LocalSignupDTO) {
    return await this.authService.finishSignup(
      body.first_name,
      body.last_name,
      body.username,
      req.user.id,
    );
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  handleLogin() {
    return null;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  handleRedirect(@Request() request, @Res() res) {
    if (request.user.account_status === 'pending') {
      return res.redirect(
        process.env.CLIENT_BASE_URL + '/login?next=complete-info',
      );
    } else {
      return res.redirect(process.env.CLIENT_BASE_URL + '/login?next=none');
    }
  }

  @Get('getUser')
  @UseGuards(AuthenticatedGuard)
  getUser(@Request() req) {
    return this.authService.getUser(req.user.id);
  }

  @Get('logout')
  logout(@Request() req, @Res() res) {
    req.logout((err) => {
      if (err) console.log(err);
    });
    const domain = process.env.DEV ? {} : { domain: 'thecustomgun.com' };
    req.session.destroy(function () {
      res
        .status(200)
        .clearCookie('connect.sid', { path: '/', ...domain })
        .json({ status: 'Success' });
    });
  }

  @UseGuards(AuthenticatedGuard)
  @Post('verify')
  verifyEmail(@Body() body, @Req() request) {
    return this.authService.verifyEmail(body.code, request.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('check-password')
  checkPassword(@Body() body, @Req() request) {
    return this.authService.checkPassword(body.password, request.user.id);
  }

  @Get('request_verification')
  @UseGuards(AuthenticatedGuard)
  async createNewVerificationEmail(@Req() request) {
    await this.authService.createVerificationEmail(
      request.user.id,
      request.user.email,
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Post('reset-password')
  resetPassword(@Body() body, @Req() request) {
    return this.authService.resetPassword(
      body.currentPassword,
      body.newPassword,
      request.user.id,
    );
  }

  @Post('reset-password-external')
  resetPasswordExternal(@Body() body) {
    return this.authService.resetPasswordExternal(body.code, body.password);
  }

  @Post('request-password-reset')
  sendPasswordResetEmail(@Body() body) {
    return this.authService.sendPasswordResetEmail(body.email);
  }
}
