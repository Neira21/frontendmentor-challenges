import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'destination',
    loadComponent: () => import('./pages/destination/destination.component').then(m => m.DestinationComponent)
  },
  {
    path: 'crew',
    loadComponent: () => import('./pages/crew/crew.component').then(m => m.CrewComponent)
  },
  {
    path: 'technology',
    loadComponent: () => import('./pages/technology/technology.component').then(m => m.TechnologyComponent)
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
