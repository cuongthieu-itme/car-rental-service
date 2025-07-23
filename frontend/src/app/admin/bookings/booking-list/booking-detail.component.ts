import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="booking-detail-modal">
      <div class="booking-detail-card">
        <h3>Chi tiết booking</h3>
        <div><b>ID:</b> {{ booking?.id }}</div>
        <div><b>Người dùng:</b> {{ booking?.user?.email || 'N/A' }}</div>
        <div><b>Xe:</b> {{ booking?.vehicle?.name || booking?.vehicleId }}</div>
        <div><b>Ngày nhận:</b> {{ booking?.pickupDate | date : 'short' }}</div>
        <div><b>Ngày trả:</b> {{ booking?.dropoffDate | date : 'short' }}</div>
        <div><b>Trạng thái:</b> {{ booking?.status }}</div>
        <div>
          <b>Tổng tiền:</b> {{ booking?.totalAmount | number : '1.2-2' }} đ
        </div>
        <button class="btn btn-secondary" (click)="close.emit()">Đóng</button>
      </div>
    </div>
  `,
  styles: [
    `
      .booking-detail-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.18);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .booking-detail-card {
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
      button {
        margin-top: 18px;
        width: 100%;
      }
    `,
  ],
})
export class BookingDetailComponent {
  @Input() booking: any;
  @Output() close = new EventEmitter<void>();
}
