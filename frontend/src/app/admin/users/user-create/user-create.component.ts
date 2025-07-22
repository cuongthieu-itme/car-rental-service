import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  UserFormComponent,
  UserFormData,
} from '../user-list/user-form.component';
import { environment } from '../../../../enviroment/enviroment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
  @Output() created = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  loading = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit(data: UserFormData) {
    this.loading = true;
    this.errorMessage = '';
    this.http.post(`${environment.apiUrl}/users/admin`, data).subscribe({
      next: () => {
        this.loading = false;
        this.created.emit();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Lỗi tạo user';
        this.loading = false;
      },
    });
  }
}
