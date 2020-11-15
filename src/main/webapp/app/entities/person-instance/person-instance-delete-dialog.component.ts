import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersonInstance } from 'app/shared/model/person-instance.model';
import { PersonInstanceService } from './person-instance.service';

@Component({
  templateUrl: './person-instance-delete-dialog.component.html',
})
export class PersonInstanceDeleteDialogComponent {
  personInstance?: IPersonInstance;

  constructor(
    protected personInstanceService: PersonInstanceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.personInstanceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('personInstanceListModification');
      this.activeModal.close();
    });
  }
}
