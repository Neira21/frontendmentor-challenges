import { Component } from '@angular/core';
import data from '../../shared/data/data.json';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-crew',
  standalone: true,
  imports: [NgClass],
  templateUrl: './crew.component.html',
  styleUrl: './crew.component.css'
})
export class CrewComponent {

  crews = data.crew;

  selectedCrew = this.crews[0];


  selectCrew(name: string) {
    const found = this.crews.find(d => d.name === name);
    if (found) this.selectedCrew = found;
  }

}
