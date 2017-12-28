import { OverlayContainer } from '@angular/cdk/overlay';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RelativeTimeFilterPipe } from './relative-time-filter.pipe';
import { MatCardModule } from '@angular/material';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';

import { ClipboardModule } from 'ngx-clipboard';
import { APP_ROUTES } from './app-route';
import { RouterModule, Routes } from '@angular/router';
import { ViewBufferComponent } from './view-buffer/view-buffer.component';
import { HomeComponent } from './home/home.component';
import { MatTabsModule } from '@angular/material';
import { TimeAgoPipe } from 'time-ago-pipe';
import { MatExpansionModule, AccordionItem } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material';
import { MatRadioModule } from '@angular/material';
import 'hammerjs';

import { MasonryModule } from 'angular2-masonry';

@NgModule({
  declarations: [
    AppComponent,
    RelativeTimeFilterPipe,
    ViewBufferComponent,
    HomeComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    ClipboardModule,
    MatExpansionModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatRadioModule,
    RouterModule.forRoot(APP_ROUTES),


    MasonryModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
  ],
})
export class AppModule {

  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
  }
}