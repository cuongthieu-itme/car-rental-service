import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../../core/services/metrics.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  loading = true;

  constructor(private metricsService: MetricsService, private router: Router) {}

  ngOnInit(): void {
    this.metricsService.getAdminMetrics().subscribe((data) => {
      this.stats = data;
      this.loading = false;
    });
  }

  onStatCardClick(type: string) {
    switch (type) {
      case 'users':
        this.router.navigate(['/admin/users']);
        break;
      case 'vehicles':
        this.router.navigate(['/admin/vehicles']);
        break;
      case 'bookings':
        this.router.navigate(['/admin/bookings']);
        break;
      case 'revenue':
        this.router.navigate(['/admin/metrics']);
        break;
    }
  }
}
