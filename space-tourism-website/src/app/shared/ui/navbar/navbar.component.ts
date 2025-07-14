import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() isOpen = false;

  @Output() closeNavbar = new EventEmitter<void>(); // ✅ Emisor de evento

  links = [
    { label: 'Home', path: '/home' },
    { label: '01 Destination', path: '/destination' },
    { label: '02 Crew', path: '/crew' },
    { label: '03 Technology', path: '/technology' }
  ]

  selectedLink = this.links[0].label // Inicializar con el primer enlace

  setSelected(link: string) {
    const found = this.links.find(l => l.label === link)
    if(found) this.selectedLink = found.label;
  }

}
