import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from './components/button/button.component';
import { DocumentMainPageComponent } from './page/document-main-page/document-main-page.component';
import { DocumentChooseAreaComponent } from './area/document-choose-area/document-choose-area.component';
import { DocumentMainAreaComponent } from './area/document-main-area/document-main-area.component';
import { DocumentInsertAreaComponent } from './area/document-insert-area/document-insert-area.component';
import { DocumentHeaderAreaComponent } from './area/document-header-area/document-header-area.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    DocumentMainPageComponent,
    DocumentChooseAreaComponent,
    DocumentMainAreaComponent,
    DocumentInsertAreaComponent,
    DocumentHeaderAreaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FlexLayoutModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
