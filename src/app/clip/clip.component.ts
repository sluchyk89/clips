import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss']
})
export class ClipComponent implements OnInit {

  id = '';

  constructor(public rout: ActivatedRoute) {
    this.rout.params.subscribe((params:Params) => {
       this.id = params.id
    });
  }

  ngOnInit(): void {
  }

}
