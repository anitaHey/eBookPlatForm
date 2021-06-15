import { BasicObjComponent } from './../../components/insert-object/basic-obj/basic-obj.component';
import {
  Component, Input, OnInit, ViewChild, ComponentRef, ComponentFactoryResolver, ViewContainerRef
} from '@angular/core';
import { WindowServiceService } from "../../services/window-service.service";

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent {
  @Input() width: number = 1280;
  @Input() height: number = 720;

  @ViewChild("paperContainer", { read: ViewContainerRef })
  paperContainer!: ViewContainerRef;

  componentsArr = Array<ComponentRef<BasicObjComponent>>()

  constructor(private windowService: WindowServiceService, private CFR: ComponentFactoryResolver) {
    windowService.updateMainSize().then(res => this.updatePaperSize());

    windowService.isPaperSizeChange.subscribe((value) => {
      this.updatePaperSize();
    });
  }

  updatePaperSize() {
    var tem = this.windowService.getPaperSize();
    this.width = tem["width"];
    this.height = tem["height"];
  }

  createComponent(type: string) {
    let componentFactory = this.CFR.resolveComponentFactory(BasicObjComponent);

    let childComponentRef = this.paperContainer.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;

    this.componentsArr.push(childComponentRef);
  }
}
