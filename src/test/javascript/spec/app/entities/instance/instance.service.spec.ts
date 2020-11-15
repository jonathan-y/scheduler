import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { InstanceService } from 'app/entities/instance/instance.service';
import { IInstance, Instance } from 'app/shared/model/instance.model';

describe('Service Tests', () => {
  describe('Instance Service', () => {
    let injector: TestBed;
    let service: InstanceService;
    let httpMock: HttpTestingController;
    let elemDefault: IInstance;
    let expectedResult: IInstance | IInstance[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InstanceService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Instance(0, currentDate, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            startingDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Instance', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            startingDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startingDate: currentDate,
          },
          returnedFromService
        );

        service.create(new Instance()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Instance', () => {
        const returnedFromService = Object.assign(
          {
            startingDate: currentDate.format(DATE_TIME_FORMAT),
            studentCount: 1,
            load: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startingDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Instance', () => {
        const returnedFromService = Object.assign(
          {
            startingDate: currentDate.format(DATE_TIME_FORMAT),
            studentCount: 1,
            load: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startingDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Instance', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
