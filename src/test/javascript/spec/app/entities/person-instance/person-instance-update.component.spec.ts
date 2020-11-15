import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SchedulerTestModule } from '../../../test.module';
import { PersonInstanceUpdateComponent } from 'app/entities/person-instance/person-instance-update.component';
import { PersonInstanceService } from 'app/entities/person-instance/person-instance.service';
import { PersonInstance } from 'app/shared/model/person-instance.model';

describe('Component Tests', () => {
  describe('PersonInstance Management Update Component', () => {
    let comp: PersonInstanceUpdateComponent;
    let fixture: ComponentFixture<PersonInstanceUpdateComponent>;
    let service: PersonInstanceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchedulerTestModule],
        declarations: [PersonInstanceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PersonInstanceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PersonInstanceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonInstanceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PersonInstance(123);
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
        const entity = new PersonInstance();
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
