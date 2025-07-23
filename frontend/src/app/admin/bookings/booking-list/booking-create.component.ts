import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../core/services/booking.service';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../../../core/models/vehicle.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment/enviroment';

interface User {
  id: string;
  email: string;
  name?: string;
}

@Component({
  selector: 'app-booking-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="booking-create-modal">
      <h3>Thêm booking mới</h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label>Chọn người dùng</label>
          <select formControlName="userId" required>
            <option value="" disabled selected>-- Chọn user --</option>
            <option *ngFor="let u of users" [value]="u.id">
              {{ u.email }} ({{ u.name }})
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Chọn xe</label>
          <select formControlName="vehicleId" required>
            <option value="" disabled selected>-- Chọn xe --</option>
            <option *ngFor="let v of vehicles" [value]="v.id">
              {{ v.name }} ({{ v.category }})
            </option>
          </select>
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
          Tạo booking
        </button>
        <button type="button" (click)="cancel.emit()" class="btn-cancel">
          Hủy
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .booking-create-modal {
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
      input,
      select {
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
export class BookingCreateComponent implements OnInit {
  @Output() created = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  form: FormGroup;
  loading = false;
  errorMessage = '';
  vehicles: Vehicle[] = [];
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private vehicleService: VehicleService,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      userId: ['', Validators.required],
      vehicleId: ['', Validators.required],
      pickupDate: ['', Validators.required],
      dropoffDate: ['', Validators.required],
      totalAmount: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => (this.vehicles = data),
      error: () => (this.vehicles = []),
    });
    this.http.get<User[]>(`${environment.apiUrl}/users/admin`).subscribe({
      next: (data) => (this.users = data),
      error: () => (this.users = []),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    this.bookingService.createBookingAdmin(this.form.value).subscribe({
      next: () => {
        this.created.emit();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Lỗi tạo booking';
        this.loading = false;
      },
    });
  }
}
