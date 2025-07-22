import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormErrorComponent } from '../../shared/components/form-error.component';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormErrorComponent, CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;

    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        // Get user role from decoded JWT token
        const userRole = this.authService.getUserRole();
        switch (userRole) {
          case 'USER':
            // Fetch profile to check if name is updated
            this.userService.getProfile().subscribe({
              next: (profile) => {
                if (profile.name && profile.name !== 'Default Name') {
                  this.router.navigate(['/']);
                } else {
                  this.router.navigate(['/user/profile']);
                }
              },
              error: () => this.router.navigate(['/user/profile']),
            });
            break;
          case 'AGENT':
            this.router.navigate(['/agent/dashboard']);
            break;
          case 'ADMIN':
          case 'MAIN_ADMIN':
            this.router.navigate(['/admin/dashboard']);
            break;
          default:
            this.router.navigate(['/home']);
            break;
        }
      },
      error: (err) => {
        alert(
          'Đăng nhập thất bại: ' +
            (err.error?.message ||
              err.message ||
              'Đã xảy ra lỗi không xác định.')
        );
        this.loading = false;
      },
    });
  }
  goToRegister(): void {
    this.router.navigate(['auth/register']);
  }

  goToResetPassword(): void {
    this.router.navigate(['auth/forgot-password']);
  }
}
