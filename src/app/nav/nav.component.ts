import {Component, OnInit} from '@angular/core';
import {ModalService} from "../servises/modal.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    public modal: ModalService,
    public auth: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  public openModal($event: Event): any {
    $event.preventDefault();
    this.modal.toggleModal('auth');
  }

}
