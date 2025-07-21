import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../core/services/user.service';
import { FormErrorComponent } from '../../shared/components/form-error.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  imports: [FormErrorComponent, ReactiveFormsModule, RouterModule],
})
export class ChangePasswordComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  changePassword() {
    if (this.form.invalid) return;
    this.loading = true;
    this.userService.changePassword(this.form.value).subscribe(() => {
      this.loading = false;
      this.form.reset();
      this.router.navigate(['/user/profile']);
    });
  }
}
