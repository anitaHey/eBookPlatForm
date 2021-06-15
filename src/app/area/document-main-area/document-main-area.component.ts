import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { PaperComponent } from '../../area/paper/paper.component';
import { PaperManagementService } from './../../services/paper-management.service';

@Component({
  selector: 'app-document-main-area',
  templateUrl: './document-main-area.component.html',
  styleUrls: ['./document-main-area.component.css'],
})
export class DocumentMainAreaComponent {
  @ViewChild("addPaper", { read: ViewContainerRef, static: false })
  paperContainer!: ViewContainerRef;

  constructor(private paperService: PaperManagementService, private CFR: ComponentFactoryResolver) {

  }

  ngAfterContentInit(): void {
    this.paperService.addPaperCalled$.subscribe(
      () => this.createNewPaper(),
    );
  }

  createNewPaper() {
    let componentFactory = this.CFR.resolveComponentFactory(PaperComponent);
    let childComponentRef = this.paperContainer.createComponent(componentFactory);

    this.paperService.addNewPaper(childComponentRef);
  }
}
