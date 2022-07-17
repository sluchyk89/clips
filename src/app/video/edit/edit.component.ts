import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../servises/modal.service";
import IClip from "../../models/clip.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClipService} from "../../services/clip.service";

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
  isSubmission = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Updating clip.';

  constructor(
    private modal: ModalService,
    private clipService: ClipService) {
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

  async submit() {
    this.isSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Updating clip.';
    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value)
    } catch (err) {
      this.isSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Something went wrong. Pleace try again.';
      return
    }
    this.isSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Success!'
  }


  ngOnDestroy() {
    this.modal.unregister('editClip')
  }

}
