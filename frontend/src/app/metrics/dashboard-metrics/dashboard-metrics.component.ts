import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MetricsService } from '../../core/services/metrics.service';
import { CommonModule } from '@angular/common';

interface AdminMetrics {
  totalUsers: number;
  totalBookings: number;
  totalRevenue: number;
  fleet: { total: number; byCategory: Record<string, number> };
}
interface AgentMetrics {
  bookingsHandled: number;
  vehiclesReturned: number;
  issuesReported: number;
}

@Component({
  selector: 'app-dashboard-metrics',
  templateUrl: './dashboard-metrics.component.html',
  styleUrls: ['./dashboard-metrics.component.scss'],
  imports: [CommonModule],
})
export class DashboardMetricsComponent implements OnInit {
  metrics: AdminMetrics | AgentMetrics | null = null;
  loading = true;
  error = '';
  role: string = '';

  constructor(
    private metricsService: MetricsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    if (this.role === 'ADMIN' || this.role === 'MAIN_ADMIN') {
      this.metricsService.getAdminMetrics().subscribe({
        next: (data) => {
          this.metrics = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Lỗi tải metrics admin';
          this.loading = false;
        },
      });
    } else if (this.role === 'AGENT') {
      this.metricsService.getAgentMetrics().subscribe({
        next: (data) => {
          this.metrics = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Lỗi tải metrics agent';
          this.loading = false;
        },
      });
    }
  }

  isAgentMetrics(metrics: any): metrics is AgentMetrics {
    return metrics && 'bookingsHandled' in metrics;
  }

  isAdminMetrics(metrics: any): metrics is AdminMetrics {
    return metrics && 'fleet' in metrics;
  }

  get bookingsHandled(): number | undefined {
    return this.isAgentMetrics(this.metrics)
      ? this.metrics.bookingsHandled
      : undefined;
  }
  get vehiclesReturned(): number | undefined {
    return this.isAgentMetrics(this.metrics)
      ? this.metrics.vehiclesReturned
      : undefined;
  }
  get issuesReported(): number | undefined {
    return this.isAgentMetrics(this.metrics)
      ? this.metrics.issuesReported
      : undefined;
  }
}
