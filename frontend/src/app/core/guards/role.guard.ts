import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as string[];
    const userRole = this.authService.getUserRole();
    const isMainAdmin = this.authService.isMainAdmin();

    // Nếu là MAIN_ADMIN, cho phép vào mọi route
    if (isMainAdmin) return true;

    if (!requiredRoles || requiredRoles.length === 0) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    if (requiredRoles.includes(userRole)) return true;

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
