import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteEntityGroup, EntityGroupModel, EnumModel, GetGroupTypes, Result, SaveEntityGroup } from '../../models/generated/generated';
import { TreeItem } from '../../models/tree-item';

@Injectable({
  providedIn: 'root'
})
export class EntityGroupDataService {

  constructor(private readonly httpClient: HttpClient) { }

 
  save(request: SaveEntityGroup): Observable<Result> {
    return this.httpClient.post<Result>('/EntityGroup/Save', request)
  }
  delete(request: DeleteEntityGroup): Observable<Result> {
    return this.httpClient.post<Result>('/EntityGroup/Delete', request)
  }
  get(request: any): Observable<any> {
    return this.httpClient.get<any>('/EntityGroup/Get', {
      params:
      {
        id: request.id,
      }
    });
  }

  getAll(): Observable<Array<TreeItem<EntityGroupModel>>> {
    return this.httpClient.get<Array<TreeItem<EntityGroupModel>>>('/EntityGroup/GetAll');
  }
  getGroupTypes(request: GetGroupTypes): Observable<Array<EnumModel>> {
    return this.httpClient.get<Array<EnumModel>>('/EntityGroup/GetGroupTypes', {
      params:
      {
        isAll: request.isAll,
      }
    });
  }
}
