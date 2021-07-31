import { ResizableDirective } from './directive/resizable.directive';
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
import { PaperComponent } from './area/paper/paper.component';
import { InsertTextComponent } from './components/insert-object/insert-text/insert-text.component';
import { BasicObjComponent } from './components/insert-object/basic-obj/basic-obj.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ContenteditableValueAccessorModule } from '@tinkoff/angular-contenteditable-accessor';
import { FormsModule } from '@angular/forms';
import { DocumentStyleAreaComponent } from './area/document-style-area/document-style-area.component';
import { DocumentMainStyleAreaComponent } from './area/document-main-style-area/document-main-style-area.component';
import { BasicButtonComponent } from './components/button/basic-button/basic-button.component';
import { FontFamilyButtonComponent } from './components/button/font-family-button/font-family-button.component';
import { TextFamilyComponent } from './area/document-main-style-area/text-family/text-family.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BasicStyleButtonComponent } from './components/button/basic-style-button/basic-style-button.component';
import { StyleClassButtonComponent } from './components/button/style-class-button/style-class-button.component';
import { StyleClassDialogComponent } from './components/dialog/style-class-dialog/style-class-dialog.component';
import { ColorPickerModule } from '@iplab/ngx-color-picker';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    DocumentMainPageComponent,
    DocumentChooseAreaComponent,
    DocumentMainAreaComponent,
    DocumentInsertAreaComponent,
    DocumentHeaderAreaComponent,
    PaperComponent,
    InsertTextComponent,
    BasicObjComponent,
    ResizableDirective,
    DocumentStyleAreaComponent,
    DocumentMainStyleAreaComponent,
    BasicButtonComponent,
    FontFamilyButtonComponent,
    TextFamilyComponent,
    BasicStyleButtonComponent,
    StyleClassButtonComponent,
    StyleClassDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    DragDropModule,
    ContenteditableValueAccessorModule,
    FormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
