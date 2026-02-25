import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8082/student';
  private stdSaDepUrl = 'http://localhost:8082/studentSaDepartmana'

  constructor(private http: HttpClient) { }

  // GET all
  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  // GET by student sa departmana
  getStudentSaDepartmana(id: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.stdSaDepUrl}/${id}`);
  }

  // CREATE (POST)
  create(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student);
  }

  // UPDATE (PUT)
  update(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${student.id}`, student);
  }

  // DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}