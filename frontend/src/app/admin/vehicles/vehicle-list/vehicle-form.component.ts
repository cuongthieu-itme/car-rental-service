import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VehicleCategory } from '../../../core/models/vehicle-category.enum';
import { FuelType } from '../../../core/models/fuel-type.enum';
import { Vehicle } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Tên xe</label>
        <input
          formControlName="name"
          type="text"
          required
          placeholder="Nhập tên xe"
        />
      </div>
      <div class="form-group">
        <label>Mô tả</label>
        <textarea
          formControlName="description"
          required
          placeholder="Mô tả xe"
        ></textarea>
      </div>
      <div class="form-group">
        <label>Loại xe</label>
        <select formControlName="category">
          <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Giá/ngày</label>
        <input formControlName="pricePerDay" type="number" required min="0" />
      </div>
      <div class="form-group">
        <label>Giá/giờ</label>
        <input formControlName="pricePerHour" type="number" required min="0" />
      </div>
      <div class="form-group">
        <label>Vị trí</label>
        <input formControlName="location" type="text" required />
      </div>
      <div class="form-group">
        <label>Truyền động</label>
        <input formControlName="transmission" type="text" required />
      </div>
      <div class="form-group">
        <label>Nhiên liệu</label>
        <select formControlName="fuelType">
          <option *ngFor="let f of fuelTypes" [value]="f">{{ f }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Tiện ích (phân cách bởi dấu phẩy)</label>
        <input
          formControlName="features"
          type="text"
          placeholder="VD: GPS, Bluetooth, Camera"
        />
      </div>
      <div class="form-group">
        <label>Ảnh (URL)</label>
        <input formControlName="imageUrl" type="text" />
      </div>
      <div *ngIf="errorMessage" class="error">{{ errorMessage }}</div>
      <button type="submit" [disabled]="form.invalid || loading">
        {{ submitLabel }}
      </button>
      <button type="button" (click)="cancel.emit()" class="btn-cancel">
        Hủy
      </button>
    </form>
  `,
  styles: [
    `
      form {
        min-width: 480px;
        max-width: 600px;
        margin: 0 auto;
        background: #fff;
        border-radius: 14px;
        box-shadow: 0 4px 32px rgba(0, 0, 0, 0.14);
        padding: 36px 36px 24px 36px;
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
      textarea,
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
export class VehicleFormComponent implements OnInit {
  @Input() initialData?: Partial<Vehicle>;
  @Input() loading = false;
  @Input() errorMessage = '';
  @Input() submitLabel = 'Lưu';
  @Output() submitForm = new EventEmitter<Partial<Vehicle>>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  categories = Object.values(VehicleCategory);
  fuelTypes = Object.values(FuelType);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      pricePerDay: [0, [Validators.required, Validators.min(0)]],
      pricePerHour: [0, [Validators.required, Validators.min(0)]],
      location: ['', Validators.required],
      transmission: ['', Validators.required],
      fuelType: ['', Validators.required],
      features: [''],
      imageUrl: [''],
    });
  }

  ngOnInit() {
    if (this.initialData) {
      const patch = { ...this.initialData };
      if (patch.features && Array.isArray(patch.features)) {
        (patch as any).features = patch.features.join(', ');
      }
      this.form.patchValue(patch);
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const value = { ...this.form.value };
    value.features = value.features
      ? value.features.split(',').map((f: string) => f.trim())
      : [];
    this.submitForm.emit(value);
  }
}
