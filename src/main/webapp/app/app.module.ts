import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { SchedulerSharedModule } from 'app/shared/shared.module';
import { SchedulerCoreModule } from 'app/core/core.module';
import { SchedulerAppRoutingModule } from './app-routing.module';
import { SchedulerHomeModule } from './home/home.module';
import { SchedulerEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    SchedulerSharedModule,
    SchedulerCoreModule,
    SchedulerHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SchedulerEntityModule,
    SchedulerAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class SchedulerAppModule {}
