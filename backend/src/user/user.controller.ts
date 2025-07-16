/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from 'src/booking/booking.service';
import { CreateBookingDto } from '../booking/dto/create-booking.dto';
import { Roles } from '../commons/decorators/roles.decorator';
import { JwtAuthGuard } from '../commons/guards/jwt-auth.guard';
import { RolesGuard } from '../commons/guards/roles.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ReviewDto } from './dto/review.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('USER')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly bookingsService: BookingsService,
  ) {}

  @Post() // <-- This handles POST /bookings requests
  createBooking(@Req() req, @Body() createBookingDto: CreateBookingDto) {
    // You might want to get the user ID from req.user for the booking
    const userId = req.user.id;
    return this.bookingsService.create(userId, createBookingDto);
  }
  @Get('me')
  getProfile(@Req() req) {
    return this.userService.getMe(req.user.id);
  }

  @Patch('me')
  updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
    return this.userService.updateMe(req.user.id, dto);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')
  changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    console.log('🧾 req.user:', req.user); // Debug log
    return this.userService.changePassword(req.user.id, dto);
  }

  @Get('me/bookings')
  getMyBookings(@Req() req) {
    return this.userService.getRentalHistory(req.user.id);
  }

  @Post('reviews')
  leaveReview(@Req() req, @Body() dto: ReviewDto) {
    return this.userService.leaveReview(req.user.id, dto);
  }

  @Get('reviews')
  getReviews(@Req() req) {
    return this.userService.getMyReviews(req.user.id);
  }
}
