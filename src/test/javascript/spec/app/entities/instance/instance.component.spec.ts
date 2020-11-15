import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SchedulerTestModule } from '../../../test.module';
import { InstanceComponent } from 'app/entities/instance/instance.component';
import { InstanceService } from 'app/entities/instance/instance.service';
import { Instance } from 'app/shared/model/instance.model';

describe('Component Tests', () => {
  describe('Instance Management Component', () => {
    let comp: InstanceComponent;
    let fixture: ComponentFixture<InstanceComponent>;
    let service: InstanceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchedulerTestModule],
        declarations: [InstanceComponent],
      })
        .overrideTemplate(InstanceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InstanceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InstanceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Instance(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.instances && comp.instances[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
