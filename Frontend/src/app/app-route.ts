import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewBufferComponent } from './view-buffer/view-buffer.component';


export const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'buffer',
    component: ViewBufferComponent,
    data: { },
  },
];
