import { Component } from '@angular/core';

import destinationsData from '../../shared/data/data.json';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.css'
})
export class DestinationComponent {
  destinations = destinationsData.destinations;

  selectedDestination = this.destinations[0]; // Por defecto: Moon


  selectDestination(name: string) {
    const found = this.destinations.find(d => d.name === name);
    if (found) this.selectedDestination = found;
  }

}
