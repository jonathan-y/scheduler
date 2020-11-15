import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPersonInstance } from 'app/shared/model/person-instance.model';
import { PersonInstanceService } from './person-instance.service';
import { PersonInstanceDeleteDialogComponent } from './person-instance-delete-dialog.component';

@Component({
  selector: 'jhi-person-instance',
  templateUrl: './person-instance.component.html',
})
export class PersonInstanceComponent implements OnInit, OnDestroy {
  personInstances?: IPersonInstance[];
  eventSubscriber?: Subscription;

  constructor(
    protected personInstanceService: PersonInstanceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.personInstanceService.query().subscribe((res: HttpResponse<IPersonInstance[]>) => (this.personInstances = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPersonInstances();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPersonInstance): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPersonInstances(): void {
    this.eventSubscriber = this.eventManager.subscribe('personInstanceListModification', () => this.loadAll());
  }

  delete(personInstance: IPersonInstance): void {
    const modalRef = this.modalService.open(PersonInstanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.personInstance = personInstance;
  }
}
