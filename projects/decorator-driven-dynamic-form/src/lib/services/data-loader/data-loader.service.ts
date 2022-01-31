import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataLoaderService {

  private dataSources = new Map<string, Observable<any[]>>(); //used to return the same observable to stop async pipe from sending multiple http requests
  constructor(private httpClient: HttpClient) {}
  load(
    dataSource: URL | any[] | Observable<any[]>
  ): Observable<any[]> | Promise<any[]> {
    if (dataSource instanceof URL) {
      if (!this.dataSources.get(dataSource.href)) {
        this.dataSources.set(
          dataSource.href,
          this.httpClient.get<any[]>(dataSource.href)
        );
      }
      return this.dataSources.get(dataSource.href) || of([]);
    } else if (Array.isArray(dataSource)) {
      return of(dataSource);
    } else {
      return dataSource;
    }
  }
}
