import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private baseUrl = 'http://localhost:8082/status';

  constructor(private http: HttpClient) { }

  // GET all
  getAll(): Observable<Status[]> {
    return this.http.get<Status[]>(this.baseUrl);
  }

  // GET by id
  getById(id: number): Observable<Status> {
    return this.http.get<Status>(`${this.baseUrl}/${id}`);
  }

  // CREATE (POST)
  create(status: Status): Observable<Status> {
    return this.http.post<Status>(this.baseUrl, status);
  }

  // UPDATE (PUT)
  update(status: Status): Observable<Status> {
    return this.http.put<Status>(`${this.baseUrl}/${status.id}`, status);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}