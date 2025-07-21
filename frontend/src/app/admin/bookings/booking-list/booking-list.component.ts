import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  imports: [CommonModule],
})
export class BookingsListComponent implements OnInit {
  bookings: any[] = [];
  loading = true;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe((data) => {
      this.bookings = data;
      this.loading = false;
    });
  }

  cancelBooking(id: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.cancelBooking(id).subscribe(() => {
        this.bookings = this.bookings.map((b) =>
          b.id === id ? { ...b, status: 'CANCELLED' } : b
        );
      });
    }
  }

  viewBooking(id: string): void {
    // TODO: Implement view booking details logic
    console.log('View booking', id);
  }

  editBooking(id: string): void {
    // TODO: Implement edit booking logic
    console.log('Edit booking', id);
  }

  approveBooking(id: string): void {
    // TODO: Implement approve booking logic
    console.log('Approve booking', id);
  }

  rejectBooking(id: string): void {
    // TODO: Implement reject booking logic
    console.log('Reject booking', id);
  }

  deleteBooking(id: string): void {
    // TODO: Implement delete booking logic
    console.log('Delete booking', id);
  }
}
