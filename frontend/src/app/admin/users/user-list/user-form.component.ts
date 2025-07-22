import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface UserFormData {
  id?: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  isEmailVerified: boolean;
  password?: string;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="user-form">
      <div class="form-group">
        <label>Email</label>
        <input formControlName="email" type="email" [readonly]="editMode" />
        <div
          class="form-error"
          *ngIf="form.get('email')?.invalid && form.get('email')?.touched"
        >
          Email không hợp lệ
        </div>
      </div>
      <div class="form-group">
        <label>Tên</label>
        <input formControlName="name" type="text" />
        <div
          class="form-error"
          *ngIf="form.get('name')?.invalid && form.get('name')?.touched"
        >
          Tên không được để trống
        </div>
      </div>
      <div class="form-group">
        <label>Số điện thoại</label>
        <input formControlName="phone" type="text" />
      </div>
      <div class="form-group">
        <label>Role</label>
        <select formControlName="role">
          <option value="USER">USER</option>
          <option value="AGENT">AGENT</option>
          <option value="ADMIN">ADMIN</option>
          <option value="MAIN_ADMIN">MAIN_ADMIN</option>
        </select>
      </div>
      <div class="form-group">
        <label>Xác thực email</label>
        <input type="checkbox" formControlName="isEmailVerified" />
      </div>
      <div class="form-group" *ngIf="!editMode">
        <label>Mật khẩu</label>
        <input formControlName="password" type="password" />
        <div
          class="form-error"
          *ngIf="form.get('password')?.invalid && form.get('password')?.touched"
        >
          Mật khẩu tối thiểu 6 ký tự
        </div>
      </div>
      <div class="form-actions">
        <button
          class="btn btn-primary"
          type="submit"
          [disabled]="form.invalid || loading"
        >
          {{ loading ? 'Đang lưu...' : editMode ? 'Cập nhật' : 'Tạo mới' }}
        </button>
        <button class="btn btn-secondary" type="button" (click)="cancel.emit()">
          Hủy
        </button>
      </div>
      <div *ngIf="errorMessage" class="form-error">{{ errorMessage }}</div>
    </form>
  `,
  styles: [
    `
      .user-form {
        max-width: 400px;
        margin: 0 auto;
      }
      .form-group {
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
      }
      label {
        font-weight: 500;
        margin-bottom: 6px;
      }
      input,
      select {
        padding: 8px 10px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 15px;
      }
      .form-error {
        color: #e53935;
        font-size: 0.98em;
        margin-top: 4px;
      }
      .form-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 18px;
      }
      .btn {
        padding: 8px 18px;
        border-radius: 6px;
        border: none;
        font-size: 15px;
        cursor: pointer;
        font-weight: 600;
      }
      .btn-primary {
        background: #ff5722;
        color: #fff;
      }
      .btn-secondary {
        background: #888;
        color: #fff;
      }
      .btn:disabled {
        background: #ccc;
        color: #888;
        cursor: not-allowed;
      }
    `,
  ],
})
export class UserFormComponent implements OnInit {
  @Input() editMode = false;
  @Input() initialData?: UserFormData;
  @Input() loading = false;
  @Input() errorMessage = '';
  @Output() submitForm = new EventEmitter<UserFormData>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phone: [''],
      role: ['USER', Validators.required],
      isEmailVerified: [false],
      password: ['', [Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if (this.editMode && this.initialData) {
      this.form.patchValue({ ...this.initialData });
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const value = { ...this.form.value };
    if (this.editMode) delete value.password;
    this.submitForm.emit(value);
  }
}
