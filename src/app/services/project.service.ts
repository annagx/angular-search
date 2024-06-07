import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';

const PATH = '/assets/data.json';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  
  constructor(private http: HttpClient) {}

  // Retourner l'observable
  getProjects() {
    return this.http.get<Project[]>(PATH);
  }
}
