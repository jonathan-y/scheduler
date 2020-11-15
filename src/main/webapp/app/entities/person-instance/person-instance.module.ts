import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchedulerSharedModule } from 'app/shared/shared.module';
import { PersonInstanceComponent } from './person-instance.component';
import { PersonInstanceDetailComponent } from './person-instance-detail.component';
import { PersonInstanceUpdateComponent } from './person-instance-update.component';
import { PersonInstanceDeleteDialogComponent } from './person-instance-delete-dialog.component';
import { personInstanceRoute } from './person-instance.route';

@NgModule({
  imports: [SchedulerSharedModule, RouterModule.forChild(personInstanceRoute)],
  declarations: [
    PersonInstanceComponent,
    PersonInstanceDetailComponent,
    PersonInstanceUpdateComponent,
    PersonInstanceDeleteDialogComponent,
  ],
  entryComponents: [PersonInstanceDeleteDialogComponent],
})
export class SchedulerPersonInstanceModule {}
