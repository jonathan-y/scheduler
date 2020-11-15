import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IInstance, Instance } from 'app/shared/model/instance.model';
import { InstanceService } from './instance.service';
import { IPersonInstance } from 'app/shared/model/person-instance.model';
import { PersonInstanceService } from 'app/entities/person-instance/person-instance.service';

@Component({
  selector: 'jhi-instance-update',
  templateUrl: './instance-update.component.html',
})
export class InstanceUpdateComponent implements OnInit {
  isSaving = false;
  personinstances: IPersonInstance[] = [];

  editForm = this.fb.group({
    id: [],
    startingDate: [],
    studentCount: [],
    load: [],
    personInstance: [],
  });

  constructor(
    protected instanceService: InstanceService,
    protected personInstanceService: PersonInstanceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ instance }) => {
      if (!instance.id) {
        const today = moment().startOf('day');
        instance.startingDate = today;
      }

      this.updateForm(instance);

      this.personInstanceService
        .query({ filter: 'instance-is-null' })
        .pipe(
          map((res: HttpResponse<IPersonInstance[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPersonInstance[]) => {
          if (!instance.personInstance || !instance.personInstance.id) {
            this.personinstances = resBody;
          } else {
            this.personInstanceService
              .find(instance.personInstance.id)
              .pipe(
                map((subRes: HttpResponse<IPersonInstance>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPersonInstance[]) => (this.personinstances = concatRes));
          }
        });
    });
  }

  updateForm(instance: IInstance): void {
    this.editForm.patchValue({
      id: instance.id,
      startingDate: instance.startingDate ? instance.startingDate.format(DATE_TIME_FORMAT) : null,
      studentCount: instance.studentCount,
      load: instance.load,
      personInstance: instance.personInstance,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const instance = this.createFromForm();
    if (instance.id !== undefined) {
      this.subscribeToSaveResponse(this.instanceService.update(instance));
    } else {
      this.subscribeToSaveResponse(this.instanceService.create(instance));
    }
  }

  private createFromForm(): IInstance {
    return {
      ...new Instance(),
      id: this.editForm.get(['id'])!.value,
      startingDate: this.editForm.get(['startingDate'])!.value
        ? moment(this.editForm.get(['startingDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      studentCount: this.editForm.get(['studentCount'])!.value,
      load: this.editForm.get(['load'])!.value,
      personInstance: this.editForm.get(['personInstance'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInstance>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPersonInstance): any {
    return item.id;
  }
}
