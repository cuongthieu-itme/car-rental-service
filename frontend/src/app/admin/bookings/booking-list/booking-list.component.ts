import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
import { BookingCreateComponent } from './booking-create.component';
import { BookingEditComponent } from './booking-edit.component';
import { BookingDetailComponent } from './booking-detail.component';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  imports: [
    CommonModule,
    BookingCreateComponent,
    BookingEditComponent,
    BookingDetailComponent,
  ],
})
export class BookingsListComponent implements OnInit {
  bookings: any[] = [];
  loading = true;
  error = '';

  showCreate = false;
  showEdit = false;
  showDetail = false;
  selectedBooking: any = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.loading = true;
    this.error = '';
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Lỗi tải danh sách đặt xe';
        this.loading = false;
      },
    });
  }

  openCreate() {
    this.showCreate = true;
  }
  closeCreate(reload = false) {
    this.showCreate = false;
    if (reload) this.loadBookings();
  }

  viewBooking(id: string): void {
    this.selectedBooking = this.bookings.find((b) => b.id === id);
    this.showDetail = true;
  }
  closeDetail() {
    this.showDetail = false;
    this.selectedBooking = null;
  }

  editBooking(id: string): void {
    this.selectedBooking = this.bookings.find((b) => b.id === id);
    this.showEdit = true;
  }
  closeEdit(reload = false) {
    this.showEdit = false;
    this.selectedBooking = null;
    if (reload) this.loadBookings();
  }

  approveBooking(id: string): void {
    if (!confirm('Duyệt booking này?')) return;
    this.loading = true;
    this.bookingService.updateBookingStatus(id, 'CONFIRMED').subscribe({
      next: () => this.loadBookings(),
      error: (err) => {
        this.error = err?.error?.message || 'Lỗi duyệt booking';
        this.loading = false;
      },
    });
  }

  rejectBooking(id: string): void {
    if (!confirm('Từ chối booking này?')) return;
    this.loading = true;
    this.bookingService.updateBookingStatus(id, 'REJECTED').subscribe({
      next: () => this.loadBookings(),
      error: (err) => {
        this.error = err?.error?.message || 'Lỗi từ chối booking';
        this.loading = false;
      },
    });
  }

  cancelBooking(id: string): void {
    if (!confirm('Hủy booking này?')) return;
    this.loading = true;
    this.bookingService.cancelBooking(id).subscribe({
      next: () => this.loadBookings(),
      error: (err) => {
        this.error = err?.error?.message || 'Lỗi hủy booking';
        this.loading = false;
      },
    });
  }

  deleteBooking(id: string): void {
    if (!confirm('Xóa booking này?')) return;
    this.loading = true;
    this.bookingService.deleteBooking(id).subscribe({
      next: () => this.loadBookings(),
      error: (err) => {
        this.error = err?.error?.message || 'Lỗi xóa booking';
        this.loading = false;
      },
    });
  }
}
