import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private readonly baseUrl = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  createBooking(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  createBookingAdmin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin`, data);
  }

  getMyBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mine`);
  }

  getBookingById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAllBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pending`);
  }

  cancelBooking(id: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/cancel`, {});
  }

  updateBookingStatus(id: string, status: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/status`, { status });
  }

  deleteBooking(id: string): Observable<any> {
    // Nếu có API xóa thật sự, dùng DELETE, nếu không thì update status thành CANCELLED
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
