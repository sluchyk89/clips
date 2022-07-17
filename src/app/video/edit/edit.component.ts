import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../servises/modal.service";
import IClip from "../../models/clip.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: IClip | null = null;

  clipID = new FormControl('', {
    nonNullable: true
  })

  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  })

  constructor(private modal: ModalService) {
  }

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnChanges() {
    if (!this.activeClip) {
      return
    }
    this.clipID.setValue(this.activeClip.docID as string)
    this.title.setValue(this.activeClip.title)
  }


  ngOnDestroy() {
    this.modal.unregister('editClip')
  }

}
