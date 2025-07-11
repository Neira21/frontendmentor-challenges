import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isNavbarOpenMobile=false;
  toogleNavbar() {
    this.isNavbarOpenMobile = !this.isNavbarOpenMobile;
  }

}
