import {Injectable} from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {


 private modals: IModal[] = [];


  constructor() {
  }

  public isModalOpen(id: string): boolean {
    return Boolean(this.modals.find(modal => modal.id === id)?.visible);

  }

  public toggleModal(id: string): void {
    let modal = this.modals.find(modal => modal.id === id);
    if (modal) {
      modal.visible = !modal.visible;
    }
  }

  public register(id: string): void {
    this.modals.push({
      id: id,
      visible: false
    })
  }

  public unregister(id: string): void {
    this.modals = this.modals.filter(modal => modal.id !== id)
  }
}
