import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { FormErrorComponent } from '../../shared/components/form-error.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    FormErrorComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  saving = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });

    this.userService
      .getProfile()
      .subscribe((data) => this.form.patchValue(data));
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;
    this.successMessage = null;
    this.errorMessage = null;
    this.userService.updateProfile(this.form.value).subscribe({
      next: () => {
        this.saving = false;
        this.successMessage = 'Cập nhật hồ sơ thành công!';
      },
      error: (err) => {
        this.saving = false;
        this.errorMessage = 'Có lỗi xảy ra khi cập nhật hồ sơ.';
      },
    });
  }

  logout() {
    // Implement your logout logic here, e.g., call a service and redirect
    // For now, just reload the page or navigate to login
    window.location.href = '/login';
  }
}
