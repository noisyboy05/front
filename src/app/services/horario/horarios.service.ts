import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private API_SERVER="http://localhost:8080/horarios/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllHorarios(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }
}
