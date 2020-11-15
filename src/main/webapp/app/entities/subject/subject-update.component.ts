import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISubject, Subject } from 'app/shared/model/subject.model';
import { SubjectService } from './subject.service';
import { IInstance } from 'app/shared/model/instance.model';
import { InstanceService } from 'app/entities/instance/instance.service';

@Component({
  selector: 'jhi-subject-update',
  templateUrl: './subject-update.component.html',
})
export class SubjectUpdateComponent implements OnInit {
  isSaving = false;
  instances: IInstance[] = [];

  editForm = this.fb.group({
    id: [],
    code: [],
    title: [],
    instance: [],
  });

  constructor(
    protected subjectService: SubjectService,
    protected instanceService: InstanceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subject }) => {
      this.updateForm(subject);

      this.instanceService.query().subscribe((res: HttpResponse<IInstance[]>) => (this.instances = res.body || []));
    });
  }

  updateForm(subject: ISubject): void {
    this.editForm.patchValue({
      id: subject.id,
      code: subject.code,
      title: subject.title,
      instance: subject.instance,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subject = this.createFromForm();
    if (subject.id !== undefined) {
      this.subscribeToSaveResponse(this.subjectService.update(subject));
    } else {
      this.subscribeToSaveResponse(this.subjectService.create(subject));
    }
  }

  private createFromForm(): ISubject {
    return {
      ...new Subject(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      title: this.editForm.get(['title'])!.value,
      instance: this.editForm.get(['instance'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubject>>): void {
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

  trackById(index: number, item: IInstance): any {
    return item.id;
  }
}
