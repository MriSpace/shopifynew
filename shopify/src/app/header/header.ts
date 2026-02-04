import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../common/services/auth';
import { CartService } from '../common/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ms-header-component',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class HeaderComponent {
  @Input() user: any = {};

  constructor(private router: Router, private auth: Auth, public cartService: CartService) { }

  logout() {
    this.auth.logout(); //  remove token + user from storage
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
