import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../servises/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  //providers: [ModalService]
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input()
  public modalId: string = "";

  constructor(public modal: ModalService, public el: ElementRef) {
  }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement)
  }

  public closeModal() {
    this.modal.toggleModal(this.modalId);
  }

  ngOnDestroy() {
    document.body.removeChild(this.el.nativeElement)
  }

}
