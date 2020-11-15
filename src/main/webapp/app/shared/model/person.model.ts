import { IPersonInstance } from 'app/shared/model/person-instance.model';
import { ISubject } from 'app/shared/model/subject.model';

export interface IPerson {
  id?: number;
  fte?: number;
  personInstance?: IPersonInstance;
  competencies?: ISubject[];
}

export class Person implements IPerson {
  constructor(public id?: number, public fte?: number, public personInstance?: IPersonInstance, public competencies?: ISubject[]) {}
}
