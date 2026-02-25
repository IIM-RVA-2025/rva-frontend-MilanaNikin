import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departman } from '../../models/departman';

@Injectable({
  providedIn: 'root'
})
export class DepartmanService {

  private baseUrl = 'http://localhost:8082/departman';
  private depSaFaksUrl = 'http://localhost:8082/departmanSaFakulteta'

  constructor(private http: HttpClient) { }

  // GET all
  getAll(): Observable<Departman[]> {
    return this.http.get<Departman[]>(this.baseUrl);
  }

  // GET by departman sa fakulteta
  getDepartmanSaFakulteta(id: number): Observable<Departman[]> {
    return this.http.get<Departman[]>(`${this.depSaFaksUrl}/${id}`);
  }

  // CREATE (POST)
  create(departman: Departman): Observable<Departman> {
    return this.http.post<Departman>(this.baseUrl, departman);
  }

  // UPDATE (PUT)
  update(departman: Departman): Observable<Departman> {
    return this.http.put<Departman>(`${this.baseUrl}/${departman.id}`, departman);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}