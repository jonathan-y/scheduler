import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInstance } from 'app/shared/model/instance.model';

type EntityResponseType = HttpResponse<IInstance>;
type EntityArrayResponseType = HttpResponse<IInstance[]>;

@Injectable({ providedIn: 'root' })
export class InstanceService {
  public resourceUrl = SERVER_API_URL + 'api/instances';

  constructor(protected http: HttpClient) {}

  create(instance: IInstance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(instance);
    return this.http
      .post<IInstance>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(instance: IInstance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(instance);
    return this.http
      .put<IInstance>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IInstance>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IInstance[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(instance: IInstance): IInstance {
    const copy: IInstance = Object.assign({}, instance, {
      startingDate: instance.startingDate && instance.startingDate.isValid() ? instance.startingDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startingDate = res.body.startingDate ? moment(res.body.startingDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((instance: IInstance) => {
        instance.startingDate = instance.startingDate ? moment(instance.startingDate) : undefined;
      });
    }
    return res;
  }
}
