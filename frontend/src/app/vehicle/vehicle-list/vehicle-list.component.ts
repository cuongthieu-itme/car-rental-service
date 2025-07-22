// src/app/components/vehicle-list/vehicle-list.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from '../vehicle.model';
import { VehicleService } from './vehicle.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule], // HttpClientModule is needed here for the service
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  /**
   * Loads all vehicles from the backend using the VehicleService.
   */
  loadVehicles(): void {
    this.loading = true;
    this.error = null;
    this.vehicleService.getAllVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load vehicles:', err);
        this.error = 'Failed to load vehicles. Please try again later.';
        this.loading = false;
      },
    });
  }

  /**
   * Placeholder for viewing vehicle details.
   * In a real app, this would navigate to a detail page.
   * @param vehicle The vehicle object to view.
   */
  viewDetails(vehicle: Vehicle): void {
    alert(`Viewing details for: ${vehicle.name} (ID: ${vehicle.id})`);
    // Implement Angular Router navigation here:
    // this.router.navigate(['/vehicles', vehicle.id]);
  }

  /**
   * Placeholder for booking a vehicle.
   * In a real app, this would navigate to a booking form or open a modal.
   * @param vehicle The vehicle object to book.
   */
  bookVehicle(vehicle: Vehicle): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/bookings/create', vehicle.id]);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  // Removed editVehicle and deleteVehicle methods as they are not for user view
}
