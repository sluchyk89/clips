import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import videojs from "video.js";

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss']
})
export class ClipComponent implements OnInit {

  id = '';
  player?: videojs.Player
  @ViewChild('videoPlayer', {static: true}) target?: ElementRef

  constructor(public rout: ActivatedRoute) {
    this.player = videojs(this.target?.nativeElement)
    this.rout.params.subscribe((params: Params) => {
      this.id = params.id
    });
  }

  ngOnInit(): void {
  }

}
