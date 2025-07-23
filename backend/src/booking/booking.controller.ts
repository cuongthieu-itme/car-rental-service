/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../commons/decorators/roles.decorator';
import { JwtAuthGuard } from '../commons/guards/jwt-auth.guard';
import { RolesGuard } from '../commons/guards/roles.guard';
import { BookingsService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(req.user.id, dto);
  }

  @Post('admin')
  @Roles('ADMIN', 'MAIN_ADMIN')
  createByAdmin(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto.userId, dto);
  }

  @Get('mine')
  @Roles('USER')
  findMine(@Req() req) {
    return this.bookingsService.findMine(req.user.id);
  }

  @Get('pending')
  @Roles('ADMIN', 'MAIN_ADMIN', 'AGENT')
  findPending() {
    return this.bookingsService.findPendingForApproval();
  }

  @Patch(':id/status')
  @Roles('ADMIN', 'MAIN_ADMIN', 'AGENT')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.bookingsService.updateStatus(id, dto);
  }

  @Patch(':id/assign/:agentId')
  @Roles('ADMIN', 'MAIN_ADMIN')
  assignAgent(
    @Param('id') bookingId: string,
    @Param('agentId') agentId: string,
  ) {
    return this.bookingsService.assignAgent(bookingId, agentId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @Req() req) {
    return this.bookingsService.cancel(req.user.id, id);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.bookingsService.findById(id);
  }
}
