import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { UserEntity } from './user.entity';
import { UpdateProfileInfoDto } from './dto/update-profile-info.dto';
import { UpdateDefaultBillingDto } from './dto/update-default-billing.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/public/:username')
  getPublicUser(@Param('username') username) {
    return this.usersService.getPublicUser(username);
  }

  @Get('user')
  async getUser(@Request() req) {
    if (!req.user) {
      return null;
    }
    const user = await this.usersService.getSingleUser(req.user.email);
    return new UserEntity(user);
  }

  @SkipThrottle()
  @Post('checkUsername')
  checkUsername(@Body() body: { username: string }) {
    if (!body.username) throw new BadRequestException();
    return this.usersService.checkUsername(body.username);
  }

  @Post('checkEmail')
  checkEmail(@Body() body: { email: string }) {
    if (!body.email) throw new BadRequestException();
    return this.usersService.checkEmail(body.email);
  }

  @SkipThrottle({ 'per-second': false })
  @Post('update')
  @UseGuards(AuthenticatedGuard)
  async updateUser(@Body() body: UpdateUserDto, @Request() req) {
    return await this.usersService.updateUser(body, req.user);
  }

  @Post('update-profile')
  @UseGuards(AuthenticatedGuard)
  async updateProfile(@Body() body: UpdateProfileInfoDto, @Request() req) {
    return await this.usersService.updateProfile(body, req.user);
  }

  @Get('default-billing')
  @UseGuards(AuthenticatedGuard)
  async getDefaultBilling(@Request() request) {
    return await this.usersService.getDefaultBilling(request.user.id);
  }

  @Get('default-ffl')
  @UseGuards(AuthenticatedGuard)
  async getDefaultFFL(@Request() request) {
    return await this.usersService.getDefaultFFL(request.user.id);
  }

  @Put('default-billing')
  @UseGuards(AuthenticatedGuard)
  async updateDefaultBilling(
    @Body() body: UpdateDefaultBillingDto,
    @Request() request,
  ) {
    const user = await this.usersService.updateDefaultBilling(
      body,
      request.user.id,
    );
    return new UserEntity(user);
  }

  @Put('default-ffl')
  @UseGuards(AuthenticatedGuard)
  async updateDefaultFFL(@Body() body: { ffl_id: string }, @Request() request) {
    const user = await this.usersService.updateDefaultFFL(
      body.ffl_id,
      request.user.id,
    );
    return new UserEntity(user);
  }
}
