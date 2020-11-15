import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPersonInstance, PersonInstance } from 'app/shared/model/person-instance.model';
import { PersonInstanceService } from './person-instance.service';

@Component({
  selector: 'jhi-person-instance-update',
  templateUrl: './person-instance-update.component.html',
})
export class PersonInstanceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected personInstanceService: PersonInstanceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personInstance }) => {
      this.updateForm(personInstance);
    });
  }

  updateForm(personInstance: IPersonInstance): void {
    this.editForm.patchValue({
      id: personInstance.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const personInstance = this.createFromForm();
    if (personInstance.id !== undefined) {
      this.subscribeToSaveResponse(this.personInstanceService.update(personInstance));
    } else {
      this.subscribeToSaveResponse(this.personInstanceService.create(personInstance));
    }
  }

  private createFromForm(): IPersonInstance {
    return {
      ...new PersonInstance(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersonInstance>>): void {
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
}
