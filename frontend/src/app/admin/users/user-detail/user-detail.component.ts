import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UserDetailData {
  email: string;
  name: string;
  phone?: string;
  role: string;
  isEmailVerified: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  @Input() user!: UserDetailData;
  @Output() close = new EventEmitter<void>();
}
