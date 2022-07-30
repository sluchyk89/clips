import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import videojs from "video.js";

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ClipComponent implements OnInit {

  id = '';
  @ViewChild('videoPlayer', {static: true}) target?: ElementRef
  player?: videojs.Player

  constructor(public rout: ActivatedRoute) {

  }

  ngOnInit(): void {
    console.log(this.target)
    this.player = videojs(this.target?.nativeElement)
    this.rout.params.subscribe((params: Params) => {
      this.id = params.id
    });
  }

}
