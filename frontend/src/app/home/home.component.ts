import { CommonModule } from '@angular/common'; // Required for ngFor, ngIf
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import CommonModule for directives like ngFor
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // Mock data for "Our Best Offers" section
  cars = [
    {
      name: 'XE TOYOTA CAMRY',
      price: 45.9,
      imageUrl: 'https://placehold.co/300x200/cccccc/000000?text=Car+1',
    },
    {
      name: 'XE HONDA CIVIC',
      price: 38.0,
      imageUrl: 'https://placehold.co/300x200/cccccc/000000?text=Car+2',
    },
    {
      name: 'XE MAZDA CX-5',
      price: 38.5,
      imageUrl: 'https://placehold.co/300x200/cccccc/000000?text=Car+3',
    },
    {
      name: 'XE FORD EVEREST',
      price: 45.9,
      imageUrl: 'https://placehold.co/300x200/cccccc/000000?text=Car+4',
    },
    {
      name: 'XE NISSAN X-TRAIL',
      price: 38.0,
      imageUrl: 'https://placehold.co/300x200/cccccc/000000?text=Car+5',
    },
    {
      name: 'XE HYUNDAI TUCSON',
      price: 38.5,
      imageUrl: 'https://placehold.co/300x200/cccccc/000000?text=Car+6',
    },
  ];

  // Mock data for "What Says Customers" section
  testimonials = [
    {
      name: 'Anh Minh',
      quote:
        'Dịch vụ cho thuê xe rất tuyệt vời, xe sạch sẽ và nhân viên phục vụ nhiệt tình. Tôi sẽ quay lại sử dụng dịch vụ.',
      imageUrl: 'https://placehold.co/100x100/cccccc/000000?text=Minh',
    },
    {
      name: 'Chị Hương',
      quote:
        'Giá cả hợp lý, xe chất lượng tốt và quy trình thuê xe nhanh gọn. Rất hài lòng với dịch vụ này.',
      imageUrl: 'https://placehold.co/100x100/cccccc/000000?text=Huong',
    },
  ];

  // Form data for "Get In Touch" section
  contactForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };
  constructor(private router: Router) {}

  // Placeholder for form submission logic
  onSubmitContactForm(): void {
    console.log('Contact form submitted:', this.contactForm);
    // In a real application, you would send this data to your backend API
    alert('Tin nhắn đã được gửi! (Đây là hành động giả lập)');
    // Reset form or show success message
    this.contactForm = { name: '', email: '', phone: '', message: '' };
  }

  onBookNowClick() {
    this.router.navigate(['/auth/login']);
  }

  // Placeholder for navigation (e.g., for testimonial carousel)
  scrollTestimonials(direction: 'left' | 'right'): void {
    const container = document.querySelector('.testimonials-cards-container');
    if (container) {
      const scrollAmount = container.clientWidth / 2; // Scroll half the container width
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }
}
