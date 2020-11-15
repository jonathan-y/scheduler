import { IPersonInstance } from 'app/shared/model/person-instance.model';

export interface IRole {
  id?: number;
  title?: string;
  weighting?: number;
  personInstance?: IPersonInstance;
}

export class Role implements IRole {
  constructor(public id?: number, public title?: string, public weighting?: number, public personInstance?: IPersonInstance) {}
}
