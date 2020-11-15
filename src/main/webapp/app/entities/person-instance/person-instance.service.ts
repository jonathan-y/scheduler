import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPersonInstance } from 'app/shared/model/person-instance.model';

type EntityResponseType = HttpResponse<IPersonInstance>;
type EntityArrayResponseType = HttpResponse<IPersonInstance[]>;

@Injectable({ providedIn: 'root' })
export class PersonInstanceService {
  public resourceUrl = SERVER_API_URL + 'api/person-instances';

  constructor(protected http: HttpClient) {}

  create(personInstance: IPersonInstance): Observable<EntityResponseType> {
    return this.http.post<IPersonInstance>(this.resourceUrl, personInstance, { observe: 'response' });
  }

  update(personInstance: IPersonInstance): Observable<EntityResponseType> {
    return this.http.put<IPersonInstance>(this.resourceUrl, personInstance, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPersonInstance>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPersonInstance[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
