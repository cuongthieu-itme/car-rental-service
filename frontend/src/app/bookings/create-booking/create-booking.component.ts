import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../core/services/booking.service';
import { VehicleService } from '../../core/services/vehicle.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateBookingComponent implements OnInit {
  form!: FormGroup;
  vehicleId = '';
  loading = false;
  vehicle: any = null;
  totalAmount: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.paramMap.get('vehicleId')!;
    this.form = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      note: [''],
    });
    // Fetch vehicle info for price
    this.vehicleService.getVehicleById(this.vehicleId).subscribe((vehicle) => {
      this.vehicle = vehicle;
    });
    // Recalculate totalAmount when dates change
    this.form.valueChanges.subscribe(() => this.calculateTotalAmount());
  }

  calculateTotalAmount() {
    if (!this.vehicle) return;
    const startStr = this.form.value.startDate;
    const endStr = this.form.value.endDate;
    if (!startStr || !endStr) {
      this.totalAmount = null;
      return;
    }
    // Compare yyyy-MM-dd strings directly
    if (endStr < startStr) {
      this.totalAmount = null;
      return;
    }
    // Calculate days (date only, ignore timezone)
    const start = new Date(startStr + 'T00:00:00');
    const end = new Date(endStr + 'T00:00:00');
    const days = Math.max(
      1,
      Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    );
    this.totalAmount = days * this.vehicle.pricePerDay;
  }

  submit() {
    if (this.form.invalid || !this.vehicle) return;
    this.loading = true;
    const startDate = this.form.value.startDate;
    const endDate = this.form.value.endDate;
    // Convert to ISO string (yyyy-MM-ddTHH:mm:ss.sssZ)
    const pickupDate = startDate ? new Date(startDate).toISOString() : '';
    const dropoffDate = endDate ? new Date(endDate).toISOString() : '';
    const bookingData = {
      vehicleId: this.vehicleId,
      pickupDate,
      dropoffDate,
      totalAmount: this.totalAmount,
      note: this.form.value.note,
    };
    this.bookingService.createBooking(bookingData).subscribe({
      next: () => this.router.navigate(['/bookings/my-bookings']),
      error: () => (this.loading = false),
    });
  }
}
