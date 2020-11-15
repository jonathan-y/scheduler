import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPersonInstance, PersonInstance } from 'app/shared/model/person-instance.model';
import { PersonInstanceService } from './person-instance.service';
import { PersonInstanceComponent } from './person-instance.component';
import { PersonInstanceDetailComponent } from './person-instance-detail.component';
import { PersonInstanceUpdateComponent } from './person-instance-update.component';

@Injectable({ providedIn: 'root' })
export class PersonInstanceResolve implements Resolve<IPersonInstance> {
  constructor(private service: PersonInstanceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersonInstance> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((personInstance: HttpResponse<PersonInstance>) => {
          if (personInstance.body) {
            return of(personInstance.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PersonInstance());
  }
}

export const personInstanceRoute: Routes = [
  {
    path: '',
    component: PersonInstanceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PersonInstances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PersonInstanceDetailComponent,
    resolve: {
      personInstance: PersonInstanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PersonInstances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PersonInstanceUpdateComponent,
    resolve: {
      personInstance: PersonInstanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PersonInstances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PersonInstanceUpdateComponent,
    resolve: {
      personInstance: PersonInstanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'PersonInstances',
    },
    canActivate: [UserRouteAccessService],
  },
];
