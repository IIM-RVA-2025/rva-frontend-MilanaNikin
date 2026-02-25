import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fakultet } from '../../models/fakultet';

@Injectable({
  providedIn: 'root'
})
export class FakultetService {

  private baseUrl = 'http://localhost:8082/fakultet';

  constructor(private http: HttpClient) { }

  // GET all
  getAll(): Observable<Fakultet[]> {
    return this.http.get<Fakultet[]>(this.baseUrl);
  }

  // GET by id
  getById(id: number): Observable<Fakultet> {
    return this.http.get<Fakultet>(`${this.baseUrl}/${id}`);
  }

  // GET by naziv
  getByNaziv(naziv: string): Observable<Fakultet[]> {
    return this.http.get<Fakultet[]>(`${this.baseUrl}/naziv/${naziv}`);
  }
  // GET by sediste
  getBySediste(sediste: string): Observable<Fakultet[]> {
    return this.http.get<Fakultet[]>(`${this.baseUrl}/sediste/${sediste}`);
  }

  // CREATE (POST)
  create(fakultet: Fakultet): Observable<Fakultet> {
    return this.http.post<Fakultet>(this.baseUrl, fakultet);
  }

  // UPDATE (PUT)
  update(fakultet: Fakultet): Observable<Fakultet> {
    return this.http.put<Fakultet>(`${this.baseUrl}/${fakultet.id}`, fakultet);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}