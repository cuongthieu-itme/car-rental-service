import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-booking-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="booking-edit-modal">
      <h3>Chỉnh sửa booking</h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Vehicle ID</label>
          <input formControlName="vehicleId" type="text" required />
        </div>
        <div class="form-group">
          <label>Ngày nhận</label>
          <input formControlName="pickupDate" type="datetime-local" required />
        </div>
        <div class="form-group">
          <label>Ngày trả</label>
          <input formControlName="dropoffDate" type="datetime-local" required />
        </div>
        <div class="form-group">
          <label>Tổng tiền</label>
          <input formControlName="totalAmount" type="number" required min="0" />
        </div>
        <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
        <button type="submit" [disabled]="form.invalid || loading">
          Cập nhật
        </button>
        <button type="button" (click)="cancel.emit()" class="btn-cancel">
          Hủy
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .booking-edit-modal {
        background: #fff;
        border-radius: 14px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
        padding: 32px 24px 18px 24px;
        min-width: 420px;
        max-width: 520px;
        margin: 40px auto;
        text-align: left;
      }
      h3 {
        text-align: center;
        color: #1976d2;
        margin-bottom: 18px;
      }
      .form-group {
        margin-bottom: 16px;
      }
      label {
        font-weight: 600;
        display: block;
        margin-bottom: 6px;
      }
      input {
        width: 100%;
        padding: 8px 10px;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 1rem;
      }
      .error {
        color: #e74c3c;
        margin-bottom: 12px;
      }
      button {
        margin-right: 8px;
      }
      .btn-cancel {
        background: #eee;
        color: #333;
      }
    `,
  ],
})
export class BookingEditComponent implements OnInit {
  @Input() booking: any;
  @Output() updated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private bookingService: BookingService) {
    this.form = this.fb.group({
      vehicleId: ['', Validators.required],
      pickupDate: ['', Validators.required],
      dropoffDate: ['', Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    if (this.booking) {
      this.form.patchValue({
        vehicleId: this.booking.vehicleId,
        pickupDate: this.booking.pickupDate?.slice(0, 16),
        dropoffDate: this.booking.dropoffDate?.slice(0, 16),
        totalAmount: this.booking.totalAmount,
      });
    }
  }

  onSubmit() {
    if (this.form.invalid || !this.booking) return;
    this.loading = true;
    this.errorMessage = '';
    this.bookingService
      .updateBookingStatus(this.booking.id, this.form.value)
      .subscribe({
        next: () => {
          this.updated.emit();
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Lỗi cập nhật booking';
          this.loading = false;
        },
      });
  }
}
