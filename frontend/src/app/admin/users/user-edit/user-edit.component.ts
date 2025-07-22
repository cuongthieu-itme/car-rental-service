import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  UserFormComponent,
  UserFormData,
} from '../user-list/user-form.component';
import { environment } from '../../../../enviroment/enviroment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  template: `
    <div class="user-edit-modal">
      <h3>Cập nhật người dùng</h3>
      <app-user-form
        [editMode]="true"
        [initialData]="user"
        [loading]="loading"
        [errorMessage]="errorMessage"
        (submitForm)="onSubmit($event)"
        (cancel)="cancel.emit()"
      ></app-user-form>
    </div>
  `,
  styles: [
    `
      .user-edit-modal {
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
        padding: 28px 24px 18px 24px;
        max-width: 480px;
        margin: 40px auto;
      }
      h3 {
        text-align: center;
        color: #ff5722;
        margin-bottom: 18px;
      }
    `,
  ],
})
export class UserEditComponent {
  @Input() user!: UserFormData;
  @Output() updated = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit(data: UserFormData) {
    this.loading = true;
    this.errorMessage = '';
    this.http
      .patch(`${environment.apiUrl}/users/admin/${this.user.id}`, data)
      .subscribe({
        next: () => {
          this.loading = false;
          this.updated.emit();
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Lỗi cập nhật user';
          this.loading = false;
        },
      });
  }
}
