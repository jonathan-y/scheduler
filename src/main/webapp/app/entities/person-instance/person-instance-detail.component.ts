import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPersonInstance } from 'app/shared/model/person-instance.model';

@Component({
  selector: 'jhi-person-instance-detail',
  templateUrl: './person-instance-detail.component.html',
})
export class PersonInstanceDetailComponent implements OnInit {
  personInstance: IPersonInstance | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ personInstance }) => (this.personInstance = personInstance));
  }

  previousState(): void {
    window.history.back();
  }
}
