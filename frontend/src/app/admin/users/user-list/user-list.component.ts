import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../enviroment/enviroment';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
  profilePhoto?: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserEditComponent,
    UserCreateComponent,
    UserDetailComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  isLoading = false;
  errorMessage = '';

  showEdit = false;
  showDetail = false;
  selectedUser: User | null = null;
  showCreate = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.http.get<User[]>(`${environment.apiUrl}/users/admin`).subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message || 'Lỗi tải danh sách người dùng';
        this.isLoading = false;
      },
    });
  }

  onSearch() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredUsers = this.users.filter(
      (u) =>
        u.email.toLowerCase().includes(term) ||
        (u.name && u.name.toLowerCase().includes(term)) ||
        (u.phone && u.phone.includes(term))
    );
  }

  confirmDelete(user: User) {
    if (!confirm(`Bạn chắc chắn muốn xóa user ${user.email}?`)) return;
    this.isLoading = true;
    this.http.delete(`${environment.apiUrl}/users/admin/${user.id}`).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Lỗi xóa user';
        this.isLoading = false;
      },
    });
  }

  openEdit(user: User) {
    this.selectedUser = user;
    this.showEdit = true;
  }

  closeEdit(reload = false) {
    this.showEdit = false;
    this.selectedUser = null;
    if (reload) this.loadUsers();
  }

  openDetail(user: User) {
    this.selectedUser = user;
    this.showDetail = true;
  }

  closeDetail() {
    this.showDetail = false;
    this.selectedUser = null;
  }

  openCreate() {
    this.showCreate = true;
  }
  closeCreate(reload = false) {
    this.showCreate = false;
    if (reload) this.loadUsers();
  }
}
