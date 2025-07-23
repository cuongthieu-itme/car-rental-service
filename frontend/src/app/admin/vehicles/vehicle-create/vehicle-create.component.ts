import { Component } from '@angular/core';
import { VehicleService } from '../../../core/services/vehicle.service';
import { VehicleFormComponent } from '../vehicle-list/vehicle-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle-create',
  standalone: true,
  imports: [CommonModule, VehicleFormComponent],
  template: `
    <div class="vehicle-create-modal-overlay">
      <app-vehicle-form
        [submitLabel]="'Tạo xe'"
        (submitForm)="onSubmit($event)"
        [loading]="loading"
        [errorMessage]="errorMessage"
        (cancel)="onCancel()"
      ></app-vehicle-form>
    </div>
  `,
  styleUrls: ['./vehicle-create.component.scss'],
})
export class VehicleCreateComponent {
  loading = false;
  errorMessage = '';

  constructor(private vehicleService: VehicleService) {}

  onSubmit(data: any) {
    this.loading = true;
    this.errorMessage = '';
    this.vehicleService.createVehicle(data).subscribe({
      next: () => window.location.reload(),
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Lỗi tạo xe';
        this.loading = false;
      },
    });
  }
  onCancel() {
    window.history.back();
  }
}
