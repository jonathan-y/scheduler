import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRole, Role } from 'app/shared/model/role.model';
import { RoleService } from './role.service';
import { IPersonInstance } from 'app/shared/model/person-instance.model';
import { PersonInstanceService } from 'app/entities/person-instance/person-instance.service';

@Component({
  selector: 'jhi-role-update',
  templateUrl: './role-update.component.html',
})
export class RoleUpdateComponent implements OnInit {
  isSaving = false;
  personinstances: IPersonInstance[] = [];

  editForm = this.fb.group({
    id: [],
    title: [],
    weighting: [],
    personInstance: [],
  });

  constructor(
    protected roleService: RoleService,
    protected personInstanceService: PersonInstanceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ role }) => {
      this.updateForm(role);

      this.personInstanceService
        .query({ filter: 'role-is-null' })
        .pipe(
          map((res: HttpResponse<IPersonInstance[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPersonInstance[]) => {
          if (!role.personInstance || !role.personInstance.id) {
            this.personinstances = resBody;
          } else {
            this.personInstanceService
              .find(role.personInstance.id)
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

  updateForm(role: IRole): void {
    this.editForm.patchValue({
      id: role.id,
      title: role.title,
      weighting: role.weighting,
      personInstance: role.personInstance,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const role = this.createFromForm();
    if (role.id !== undefined) {
      this.subscribeToSaveResponse(this.roleService.update(role));
    } else {
      this.subscribeToSaveResponse(this.roleService.create(role));
    }
  }

  private createFromForm(): IRole {
    return {
      ...new Role(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      weighting: this.editForm.get(['weighting'])!.value,
      personInstance: this.editForm.get(['personInstance'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRole>>): void {
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
