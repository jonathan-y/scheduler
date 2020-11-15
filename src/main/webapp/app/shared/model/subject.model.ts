import { IInstance } from 'app/shared/model/instance.model';
import { IPerson } from 'app/shared/model/person.model';

export interface ISubject {
  id?: number;
  code?: string;
  title?: string;
  instance?: IInstance;
  deliverers?: IPerson[];
}

export class Subject implements ISubject {
  constructor(
    public id?: number,
    public code?: string,
    public title?: string,
    public instance?: IInstance,
    public deliverers?: IPerson[]
  ) {}
}
