import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPerson, Person } from 'app/shared/model/person.model';
import { PersonService } from './person.service';
import { IPersonInstance } from 'app/shared/model/person-instance.model';
import { PersonInstanceService } from 'app/entities/person-instance/person-instance.service';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject/subject.service';

type SelectableEntity = IPersonInstance | ISubject;

@Component({
  selector: 'jhi-person-update',
  templateUrl: './person-update.component.html',
})
export class PersonUpdateComponent implements OnInit {
  isSaving = false;
  personinstances: IPersonInstance[] = [];
  subjects: ISubject[] = [];

  editForm = this.fb.group({
    id: [],
    fte: [],
    personInstance: [],
    competencies: [],
  });

  constructor(
    protected personService: PersonService,
    protected personInstanceService: PersonInstanceService,
    protected subjectService: SubjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ person }) => {
      this.updateForm(person);

      this.personInstanceService
        .query({ filter: 'person-is-null' })
        .pipe(
          map((res: HttpResponse<IPersonInstance[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPersonInstance[]) => {
          if (!person.personInstance || !person.personInstance.id) {
            this.personinstances = resBody;
          } else {
            this.personInstanceService
              .find(person.personInstance.id)
              .pipe(
                map((subRes: HttpResponse<IPersonInstance>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPersonInstance[]) => (this.personinstances = concatRes));
          }
        });

      this.subjectService.query().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects = res.body || []));
    });
  }

  updateForm(person: IPerson): void {
    this.editForm.patchValue({
      id: person.id,
      fte: person.fte,
      personInstance: person.personInstance,
      competencies: person.competencies,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const person = this.createFromForm();
    if (person.id !== undefined) {
      this.subscribeToSaveResponse(this.personService.update(person));
    } else {
      this.subscribeToSaveResponse(this.personService.create(person));
    }
  }

  private createFromForm(): IPerson {
    return {
      ...new Person(),
      id: this.editForm.get(['id'])!.value,
      fte: this.editForm.get(['fte'])!.value,
      personInstance: this.editForm.get(['personInstance'])!.value,
      competencies: this.editForm.get(['competencies'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerson>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: ISubject[], option: ISubject): ISubject {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
