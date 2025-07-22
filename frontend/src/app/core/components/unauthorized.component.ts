import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="unauth-container">
      <div class="icon-wrapper">
        <i class="fas fa-ban"></i>
      </div>
      <h2>Không có quyền truy cập</h2>
      <p>Bạn không đủ quyền để truy cập trang này.</p>
      <a [routerLink]="['/']" class="btn-home">
        <i class="fas fa-house-user"></i> Quay về trang chủ
      </a>
    </div>
  `,
  styles: [
    `
      .unauth-container {
        max-width: 400px;
        margin: 80px auto;
        background: #fff;
        border-radius: 14px;
        box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
        padding: 40px 28px 32px 28px;
        font-family: 'Inter', sans-serif;
        text-align: center;
      }
      .icon-wrapper {
        width: 70px;
        height: 70px;
        background: #ffe0b2;
        color: #ff9800;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        margin: 0 auto 18px auto;
        box-shadow: 0 2px 8px rgba(255, 152, 0, 0.08);
      }
      h2 {
        color: #e64a19;
        font-size: 2rem;
        margin-bottom: 12px;
        font-weight: 700;
      }
      p {
        color: #666;
        font-size: 1.1rem;
        margin-bottom: 28px;
      }
      .btn-home {
        display: inline-block;
        background: #e64a19;
        color: #fff;
        padding: 10px 28px;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        text-decoration: none;
        transition: background 0.2s;
        box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
      }
      .btn-home i {
        margin-right: 8px;
        font-size: 1.1em;
        vertical-align: middle;
      }
      .btn-home:hover {
        background: #ffe0b2;
        color: #e64a19;
      }
    `,
  ],
})
export class UnauthorizedComponent {}
