import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchedulerSharedModule } from 'app/shared/shared.module';
import { InstanceComponent } from './instance.component';
import { InstanceDetailComponent } from './instance-detail.component';
import { InstanceUpdateComponent } from './instance-update.component';
import { InstanceDeleteDialogComponent } from './instance-delete-dialog.component';
import { instanceRoute } from './instance.route';

@NgModule({
  imports: [SchedulerSharedModule, RouterModule.forChild(instanceRoute)],
  declarations: [InstanceComponent, InstanceDetailComponent, InstanceUpdateComponent, InstanceDeleteDialogComponent],
  entryComponents: [InstanceDeleteDialogComponent],
})
export class SchedulerInstanceModule {}
