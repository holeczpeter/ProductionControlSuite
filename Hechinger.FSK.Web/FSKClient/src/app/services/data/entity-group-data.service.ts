import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DeleteEntityGroup, EntityGroupModel, EntityGroupRelationModel, EntityGroupRelationTree, EnumModel, GetEntityGroupById, GetGroupTypes, Result, SaveEntityGroup } from '../../models/generated/generated';
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
  get(request: GetEntityGroupById): Observable<any> {
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

  getEntityRelationsByProducts(params: HttpParams): Observable<Array<EntityGroupRelationTree>> {
    return this.httpClient.get<Array<EntityGroupRelationTree>>('/EntityGroup/GetEntityRelationsByProducts', { params: params });
  }
  getOperationsForRelation(params: HttpParams): Observable<Array<EntityGroupRelationModel>> {
    return this.httpClient.get<Array<EntityGroupRelationModel>>('/EntityGroup/GetOperationsForRelation', { params: params });
  }
  getDefectsForRelation(params: HttpParams): Observable<Array<EntityGroupRelationModel>> {
    return this.httpClient.get<Array<EntityGroupRelationModel>>('/EntityGroup/GetDefectsForRelation', { params: params });
  }
}
