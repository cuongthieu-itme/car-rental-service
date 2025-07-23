import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../../../core/models/vehicle.model';
import { VehicleFormComponent } from './vehicle-form.component';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VehicleFormComponent,
    VehicleDetailComponent,
  ],
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss'],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  searchTerm = '';
  isLoading = false;
  errorMessage = '';

  showEdit = false;
  showCreate = false;
  showDetail = false;
  selectedVehicle: Vehicle | null = null;

  ngOnInit(): void {
    this.loadVehicles();
  }

  constructor(private vehicleService: VehicleService) {}

  loadVehicles() {
    this.isLoading = true;
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.filteredVehicles = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Lỗi tải danh sách xe';
        this.isLoading = false;
      },
    });
  }

  onSearch() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredVehicles = this.vehicles.filter(
      (v) =>
        v.name.toLowerCase().includes(term) ||
        v.description.toLowerCase().includes(term) ||
        v.location.toLowerCase().includes(term)
    );
  }

  confirmDelete(vehicle: Vehicle) {
    if (!confirm(`Bạn chắc chắn muốn xóa xe ${vehicle.name}?`)) return;
    this.isLoading = true;
    this.vehicleService.deleteVehicle(vehicle.id).subscribe({
      next: () => this.loadVehicles(),
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Lỗi xóa xe';
        this.isLoading = false;
      },
    });
  }

  openEdit(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.showEdit = true;
  }
  closeEdit(reload = false) {
    this.showEdit = false;
    this.selectedVehicle = null;
    if (reload) this.loadVehicles();
  }

  openCreate() {
    this.showCreate = true;
  }
  closeCreate(reload = false) {
    this.showCreate = false;
    if (reload) this.loadVehicles();
  }

  openDetail(vehicle: Vehicle) {
    this.selectedVehicle = vehicle;
    this.showDetail = true;
  }
  closeDetail() {
    this.showDetail = false;
    this.selectedVehicle = null;
  }

  handleCreateVehicle(data: Partial<Vehicle>) {
    this.isLoading = true;
    this.errorMessage = '';
    this.vehicleService.createVehicle(data).subscribe({
      next: () => this.closeCreate(true),
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Lỗi tạo xe';
        this.isLoading = false;
      },
    });
  }

  handleUpdateVehicle(data: Partial<Vehicle>) {
    if (!this.selectedVehicle) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.vehicleService.updateVehicle(this.selectedVehicle.id, data).subscribe({
      next: () => this.closeEdit(true),
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Lỗi cập nhật xe';
        this.isLoading = false;
      },
    });
  }
}
