import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SchedulerTestModule } from '../../../test.module';
import { InstanceUpdateComponent } from 'app/entities/instance/instance-update.component';
import { InstanceService } from 'app/entities/instance/instance.service';
import { Instance } from 'app/shared/model/instance.model';

describe('Component Tests', () => {
  describe('Instance Management Update Component', () => {
    let comp: InstanceUpdateComponent;
    let fixture: ComponentFixture<InstanceUpdateComponent>;
    let service: InstanceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchedulerTestModule],
        declarations: [InstanceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(InstanceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(InstanceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(InstanceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Instance(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Instance();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
