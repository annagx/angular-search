import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { provideHttpClient } from '@angular/common/http';
import { Project } from '../interfaces/project';
import { PROJECTS } from '../constants';
import { of } from 'rxjs';

describe('HttpService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [HttpService, provideHttpClient()]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a value', () => {
    const result = service.getProjects();
    expect(result).not.toBeNull();
  });

  it('should return all projects', (done: DoneFn) => {
    spyOn(service, 'getProjects').and.returnValue(of(PROJECTS));
    service.getProjects().subscribe((result: Project[]) => {
      expect(result).toEqual(PROJECTS)
      done();
    });
  });

});
