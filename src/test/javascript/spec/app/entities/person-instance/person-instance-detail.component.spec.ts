import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SchedulerTestModule } from '../../../test.module';
import { PersonInstanceDetailComponent } from 'app/entities/person-instance/person-instance-detail.component';
import { PersonInstance } from 'app/shared/model/person-instance.model';

describe('Component Tests', () => {
  describe('PersonInstance Management Detail Component', () => {
    let comp: PersonInstanceDetailComponent;
    let fixture: ComponentFixture<PersonInstanceDetailComponent>;
    const route = ({ data: of({ personInstance: new PersonInstance(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SchedulerTestModule],
        declarations: [PersonInstanceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PersonInstanceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonInstanceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load personInstance on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.personInstance).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
