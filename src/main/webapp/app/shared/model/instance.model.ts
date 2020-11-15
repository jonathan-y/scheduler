import { Moment } from 'moment';
import { IPersonInstance } from 'app/shared/model/person-instance.model';
import { ISubject } from 'app/shared/model/subject.model';

export interface IInstance {
  id?: number;
  startingDate?: Moment;
  studentCount?: number;
  load?: number;
  personInstance?: IPersonInstance;
  subjects?: ISubject[];
}

export class Instance implements IInstance {
  constructor(
    public id?: number,
    public startingDate?: Moment,
    public studentCount?: number,
    public load?: number,
    public personInstance?: IPersonInstance,
    public subjects?: ISubject[]
  ) {}
}
