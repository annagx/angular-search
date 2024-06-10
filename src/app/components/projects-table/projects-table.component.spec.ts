import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTableComponent } from './projects-table.component';
import { HttpService } from '../../services/http.service';
import { PROJECTS } from '../../constants';
import { Project } from '../../interfaces/project';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

describe('ProjectsTableComponent', () => {
  let component: ProjectsTableComponent;
  let fixture: ComponentFixture<ProjectsTableComponent>;
  let service: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsTableComponent],
      providers: [HttpService, provideHttpClient()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsTableComponent);
    service = TestBed.inject(HttpService);
    component = fixture.componentInstance;
    component.ngOnInit();
    component.dataSource.data = PROJECTS;
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a non-null list of projects', () => {
    expect(component.dataSource).not.toBeNull();
  });

  it('should have a paginator', () => {
    expect(component.dataSource.paginator).not.toBeNull();
  });

  it('should return complete list of projects', () => {
    const projectsCount = component.dataSource.data.length;
    const keyupEvent = new KeyboardEvent('keyup');
    const input = fixture.debugElement.query(By.css(".search-input")).nativeElement;
    input.value = '';
    input.dispatchEvent(keyupEvent);
    expect(component.dataSource.filteredData.length).toEqual(projectsCount);
  });

  it('should return 0 project', () => {
    const keyupEvent = new KeyboardEvent('keyup');
    const input = fixture.debugElement.query(By.css(".search-input"));
    const inputElement = input.nativeElement;
    inputElement.value = 'abcd';
    inputElement.dispatchEvent(keyupEvent);
    expect(component.dataSource.filteredData.length).toEqual(0);
  });

  it('should ignore case and return more than one project', () => {
    const keyupEvent = new KeyboardEvent('keyup');
    const input = fixture.debugElement.query(By.css(".search-input")).nativeElement;
    input.value = 'gestion a';
    input.dispatchEvent(keyupEvent);
    expect(component.dataSource.filteredData.length).toEqual(2);
  });

  it('should ignore leading and trailing spaces and return more than one project', () => {
    const keyupEvent = new KeyboardEvent('keyup');
    const input = fixture.debugElement.query(By.css(".search-input")).nativeElement;
    input.value = '   gestion a ';
    input.dispatchEvent(keyupEvent);
    expect(component.dataSource.filteredData.length).toEqual(2);
  });

  it('should call applyFilter function', () => {
    const button = fixture.debugElement.query(By.css(".button-container")).nativeElement;
    button.addEventListener('click', () => component.applyFilter(''));
    const mockClick = new MouseEvent('click');
    const applyFilterSpy = spyOn(component, 'applyFilter').and.callThrough();
    button.dispatchEvent(mockClick);
    expect(applyFilterSpy).toHaveBeenCalled();
  });

  it('should return more than one project', () => {
    const button = fixture.debugElement.query(By.css(".button-container")).nativeElement;
    const input = fixture.debugElement.query(By.css(".search-input")).nativeElement;
    input.value = ' gestion a';
    button.addEventListener('click', () => component.applyFilter(input.value));
    const mockClick = new MouseEvent('click');
    button.dispatchEvent(mockClick);
    expect(component.dataSource.filteredData.length).toEqual(2);
  });

  it('should return a project', () => {
    const button = fixture.debugElement.query(By.css(".button-container")).nativeElement;
    const input = fixture.debugElement.query(By.css(".search-input")).nativeElement;
    input.value = ' 12345';
    button.addEventListener('click', () => component.applyFilter(input.value));
    const mockClick = new MouseEvent('click');
    button.dispatchEvent(mockClick);
    expect(component.dataSource.filteredData.length).toEqual(1);
  });

  it('should return value from observable', () => {
    component.dataSource = new MatTableDataSource();
    spyOn(service, 'getProjects').and.returnValue(of(PROJECTS));
    service.getProjects().subscribe((result: Project[]) => {
      component.dataSource.data = result;
    });
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

});

