import { Component } from '@angular/core';
import data from '../../shared/data/data.json';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [NgClass],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.css'
})
export class TechnologyComponent {
  techs = data.technology;

  selectedTech = this.techs[0];

  selectTech(name: string) {

    const found = this.techs.find(d => d.name === name);
    if (found) this.selectedTech = found;
  }


}
