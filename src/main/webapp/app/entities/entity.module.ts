import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'person',
        loadChildren: () => import('./person/person.module').then(m => m.SchedulerPersonModule),
      },
      {
        path: 'instance',
        loadChildren: () => import('./instance/instance.module').then(m => m.SchedulerInstanceModule),
      },
      {
        path: 'person-instance',
        loadChildren: () => import('./person-instance/person-instance.module').then(m => m.SchedulerPersonInstanceModule),
      },
      {
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.SchedulerRoleModule),
      },
      {
        path: 'subject',
        loadChildren: () => import('./subject/subject.module').then(m => m.SchedulerSubjectModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SchedulerEntityModule {}
