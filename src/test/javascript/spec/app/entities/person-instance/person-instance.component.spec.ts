import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchedulerTestModule } from '../../../test.module';
import { PersonInstanceComponent } from 'app/entities/person-instance/person-instance.component';
import { PersonInstanceService } from 'app/entities/person-instance/person-instance.service';
import { PersonInstance } from 'app/shared/model/person-instance.model';

describe('Component Tests', () => {
  describe('PersonInstance Management Component', () => {
    let comp: PersonInstanceComponent;
    let fixture: ComponentFixture<PersonInstanceComponent>;
    let service: PersonInstanceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchedulerTestModule],
        declarations: [PersonInstanceComponent],
      })
        .overrideTemplate(PersonInstanceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonInstanceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonInstanceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PersonInstance(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.personInstances && comp.personInstances[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
