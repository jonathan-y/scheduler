import { IPerson } from 'app/shared/model/person.model';
import { IInstance } from 'app/shared/model/instance.model';
import { IRole } from 'app/shared/model/role.model';

export interface IPersonInstance {
  id?: number;
  person?: IPerson;
  instance?: IInstance;
  role?: IRole;
}

export class PersonInstance implements IPersonInstance {
  constructor(public id?: number, public person?: IPerson, public instance?: IInstance, public role?: IRole) {}
}
