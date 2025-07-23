import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../../../core/models/vehicle.model';
import { VehicleFormComponent } from '../vehicle-list/vehicle-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-edit',
  standalone: true,
  imports: [CommonModule, VehicleFormComponent],
  template: `
    <div class="vehicle-edit-modal-overlay" *ngIf="vehicle">
      <app-vehicle-form
        [initialData]="vehicle"
        [submitLabel]="'Cập nhật'"
        (submitForm)="onSubmit($event)"
        [loading]="loading"
        [errorMessage]="errorMessage"
        (cancel)="onCancel()"
      ></app-vehicle-form>
    </div>
  `,
  styleUrls: ['./vehicle-edit.component.scss'],
})
export class VehicleEditComponent implements OnInit {
  vehicle: Vehicle | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.vehicleService.getVehicleById(id).subscribe({
      next: (v) => (this.vehicle = v),
      error: (err) =>
        (this.errorMessage = err?.error?.message || 'Không tìm thấy xe'),
    });
  }

  onSubmit(data: any) {
    if (!this.vehicle) return;
    this.loading = true;
    this.errorMessage = '';
    this.vehicleService.updateVehicle(this.vehicle.id, data).subscribe({
      next: () => window.location.reload(),
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Lỗi cập nhật xe';
        this.loading = false;
      },
    });
  }
  onCancel() {
    window.history.back();
  }
}
