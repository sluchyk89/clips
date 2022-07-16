import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {v4 as uuid} from 'uuid';
import {last} from "rxjs";


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  isDragover = false;
  file: File | null = null;
  nextStep = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Your clip is being uploaded.';
  isSubmission = false;
  showPercentage = false;

  percentage = 0;

  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3)
    ],
    nonNullable: true
  })

  uploadForm = new FormGroup({
    title: this.title
  })

  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  storeFile($event: Event) {
    this.isDragover = false;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || !(this.file.type === 'video/mp4' || this.file.type === 'video/webm')) {
      return
    }
    this.title.setValue(
      this.file.name.replace(/\.[^/.]+$/, '')
    )
    this.nextStep = true;
  }

  uploadFile() {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your clip is being uploaded.';
    this.isSubmission = true;
    this.showPercentage = true;
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;
    const task = this.storage.upload(clipPath, this.file);

    task.percentageChanges().subscribe(progress => {
      this.percentage = progress as number / 100
    })

    task.snapshotChanges().pipe(
      last()
    ).subscribe({
      next: (snapshot) => {
        this.alertColor = 'green';
        this.alertMsg = 'Success! Your clip is ready to shear with others!';
        this.showPercentage = false;
      },
      error: (error) => {
        this.alertColor = 'red';
        this.alertMsg = 'Upload failed! Please try again later.';
        this.isSubmission = false;
        this.showPercentage = false;
        console.error(error)
      }
    })
  }

}
