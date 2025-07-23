import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vehicle-detail-modal">
      <div class="vehicle-detail-card">
        <h3>Chi tiết xe</h3>
        <div><b>Tên xe:</b> {{ vehicle?.name }}</div>
        <div><b>Mô tả:</b> {{ vehicle?.description }}</div>
        <div><b>Loại xe:</b> {{ vehicle?.category }}</div>
        <div>
          <b>Giá/ngày:</b> {{ vehicle?.pricePerDay | number : '1.0-0' }} đ
        </div>
        <div>
          <b>Giá/giờ:</b> {{ vehicle?.pricePerHour | number : '1.0-0' }} đ
        </div>
        <div><b>Vị trí:</b> {{ vehicle?.location }}</div>
        <div><b>Truyền động:</b> {{ vehicle?.transmission }}</div>
        <div><b>Nhiên liệu:</b> {{ vehicle?.fuelType }}</div>
        <div><b>Tiện ích:</b> {{ vehicle?.features?.join(', ') }}</div>
        <div *ngIf="vehicle?.imageUrl">
          <b>Ảnh:</b>
          <img
            [src]="vehicle?.imageUrl"
            alt="Ảnh xe"
            style="max-width:120px;max-height:80px;border-radius:6px;margin-left:8px;vertical-align:middle;"
          />
        </div>
        <button class="btn btn-secondary" (click)="close.emit()">Đóng</button>
      </div>
    </div>
  `,
  styles: [
    `
      .vehicle-detail-modal {
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
      .vehicle-detail-card {
        background: #fff;
        border-radius: 14px;
        box-shadow: 0 4px 32px rgba(0, 0, 0, 0.14);
        padding: 36px 36px 24px 36px;
        min-width: 480px;
        max-width: 600px;
        margin: 40px auto;
        text-align: left;
      }
      h3 {
        text-align: center;
        color: #ff5722;
        margin-bottom: 18px;
      }
      button {
        margin-top: 18px;
        width: 100%;
      }
    `,
  ],
})
export class VehicleDetailComponent {
  @Input() vehicle?: Vehicle;
  @Output() close = new EventEmitter<void>();
}
