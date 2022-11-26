import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContratosService {

  private API_SERVER="http://localhost:8080/contratos/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllContratos(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }
}
