import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IInstance } from 'app/shared/model/instance.model';
import { InstanceService } from './instance.service';
import { InstanceDeleteDialogComponent } from './instance-delete-dialog.component';

@Component({
  selector: 'jhi-instance',
  templateUrl: './instance.component.html',
})
export class InstanceComponent implements OnInit, OnDestroy {
  instances?: IInstance[];
  eventSubscriber?: Subscription;

  constructor(protected instanceService: InstanceService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.instanceService.query().subscribe((res: HttpResponse<IInstance[]>) => (this.instances = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInInstances();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IInstance): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInInstances(): void {
    this.eventSubscriber = this.eventManager.subscribe('instanceListModification', () => this.loadAll());
  }

  delete(instance: IInstance): void {
    const modalRef = this.modalService.open(InstanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.instance = instance;
  }
}
