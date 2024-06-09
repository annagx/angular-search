import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';
import { Observable } from 'rxjs';

const PATH = '/assets/data.json';

// providedIn: root fait en sorte que le service est disponible dans l'application
@Injectable({
  providedIn: 'root'
})

export class HttpService {
  
  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(PATH);
  }
}
