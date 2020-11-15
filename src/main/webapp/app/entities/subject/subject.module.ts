import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SchedulerSharedModule } from 'app/shared/shared.module';
import { SubjectComponent } from './subject.component';
import { SubjectDetailComponent } from './subject-detail.component';
import { SubjectUpdateComponent } from './subject-update.component';
import { SubjectDeleteDialogComponent } from './subject-delete-dialog.component';
import { subjectRoute } from './subject.route';

@NgModule({
  imports: [SchedulerSharedModule, RouterModule.forChild(subjectRoute)],
  declarations: [SubjectComponent, SubjectDetailComponent, SubjectUpdateComponent, SubjectDeleteDialogComponent],
  entryComponents: [SubjectDeleteDialogComponent],
})
export class SchedulerSubjectModule {}