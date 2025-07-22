import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateBookingDto) {
    // Validate required fields
    if (
      !dto.pickupDate ||
      !dto.dropoffDate ||
      !dto.totalAmount ||
      !dto.vehicleId
    ) {
      throw new Error('Missing required booking fields');
    }
    // Validate date format
    const pickupDate = new Date(dto.pickupDate);
    const dropoffDate = new Date(dto.dropoffDate);
    if (isNaN(pickupDate.getTime()) || isNaN(dropoffDate.getTime())) {
      throw new Error('Invalid date format for pickupDate or dropoffDate');
    }
    return this.prisma.booking.create({
      data: {
        userId: userId,
        vehicleId: dto.vehicleId,
        pickupDate: pickupDate,
        dropoffDate: dropoffDate,
        totalAmount: dto.totalAmount,
      },
    });
  }

  async findMine(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        vehicle: true,
        payment: true,
        agent: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: { vehicle: true, agent: true, payment: true },
    });
  }

  async cancel(userId: string, bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (booking?.userId !== userId) throw new ForbiddenException();
    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED' },
    });
  }

  async updateStatus(bookingId: string, dto: UpdateStatusDto) {
    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: dto.status },
    });
  }

  async findPendingForApproval() {
    return this.prisma.booking.findMany({
      where: { status: 'PENDING' },
      include: { user: true, vehicle: true },
    });
  }

  async assignAgent(bookingId: string, agentId: string) {
    return this.prisma.booking.update({
      where: { id: bookingId },
      data: { agentId },
    });
  }
}
