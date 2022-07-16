import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  isDragover = false;
  file: File | null = null;
  nextStep = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  storeFile($event: Event) {
    this.isDragover = false;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || !(this.file.type === 'video/mp4' || this.file.type === 'video/webm')) {
        return
    }
    this.nextStep = true;
  }

}
