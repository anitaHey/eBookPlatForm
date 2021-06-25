import { PaperManagementService } from './../../services/paper-management.service';
import { BasicObjComponent } from './../../components/insert-object/basic-obj/basic-obj.component';
import {
  Component, Input, HostListener, ViewChild, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ElementRef, Renderer2
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
  page !: number;
  currentNode !: ComponentRef<PaperComponent>;

  @ViewChild("paperContainer", { read: ViewContainerRef })
  paperContainer!: ViewContainerRef;

  componentsArr = Array<ComponentRef<BasicObjComponent>>()

  constructor(private windowService: WindowServiceService, private CFR: ComponentFactoryResolver, private element: ElementRef, private renderer: Renderer2, private paperManagementService: PaperManagementService) {
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
    childComponent.page = this.page;

    this.componentsArr.push(childComponentRef);
  }

  @HostListener('mousedown', ['$event'])
  public onMouseDown(evt: MouseEvent): void {
    let node = this.element.nativeElement.querySelector(".object_focus");
    if(node != null)
      this.renderer.removeClass(node, "object_focus");
      this.paperManagementService.setCurrentFocusObj(null);
  }
}
