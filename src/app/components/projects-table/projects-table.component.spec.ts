import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsTableComponent } from './projects-table.component';
import { HttpService } from '../../services/http.service';
import { PROJECTS } from '../../constants';
import { Project } from '../../interfaces/project';
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
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should call applyFilter function', () => {
    const applyFilterSpy = spyOn(component, 'applyFilter').and.callThrough();
    const keydownEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const input = fixture.debugElement.query(By.css("#search-input")).nativeElement;
    input.dispatchEvent(keydownEvent);
    expect(applyFilterSpy).toHaveBeenCalled();
  });

  it('should return complete list of projects', () => {
    const projectsCount = component.dataSource.data.length;
    const keydownEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const input = fixture.debugElement.query(By.css("#search-input")).nativeElement;
    input.value = '';
    input.dispatchEvent(keydownEvent);
    expect(component.dataSource.filteredData.length).toEqual(projectsCount);
  });

  it('should return 0 project', () => {
    const keydownEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const input = fixture.debugElement.query(By.css("#search-input"));
    const inputElement = input.nativeElement;
    inputElement.value = 'abcd';
    inputElement.dispatchEvent(keydownEvent);
    expect(component.dataSource.filteredData.length).toEqual(0);
  });

  it('should ignore case and return projects containing string', () => {
    const keydownEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const input = fixture.debugElement.query(By.css("#search-input")).nativeElement;
    input.value = 'gestion a';
    input.dispatchEvent(keydownEvent);
    expect(component.dataSource.filteredData.length).toEqual(2);
  });

  it('should ignore leading and trailing spaces and return projects containing string', () => {
    const keydownEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    const input = fixture.debugElement.query(By.css("#search-input")).nativeElement;
    input.value = '   Gestion A ';
    input.dispatchEvent(keydownEvent);
    expect(component.dataSource.filteredData.length).toEqual(2);
  });

  it('should call applyFilter function', () => {
    const applyFilterSpy = spyOn(component, 'applyFilter').and.callThrough();
    const button = fixture.debugElement.query(By.css(".button-container")).nativeElement;
    const mockClick = new MouseEvent('click');
    button.dispatchEvent(mockClick);
    expect(applyFilterSpy).toHaveBeenCalled();
  });

  it('should ignore case and return projects containing string', () => {
    const button = fixture.debugElement.query(By.css(".button-container")).nativeElement;
    const input = fixture.debugElement.query(By.css("#search-input")).nativeElement;
    input.value = 'gestion a';
    const mockClick = new MouseEvent('click');
    button.dispatchEvent(mockClick);
    expect(component.dataSource.filteredData.length).toEqual(2);
  });

  it('should ignore leading and trailing spaces, and return projects containing string', () => {
    const button = fixture.debugElement.query(By.css(".button-container")).nativeElement;
    const input = fixture.debugElement.query(By.css("#search-input")).nativeElement;
    input.value = '  Gestion A   ';
    const mockClick = new MouseEvent('click');
    button.dispatchEvent(mockClick);
    expect(component.dataSource.filteredData.length).toEqual(2);
  });

  it('should ignore leading and trailing spaces and return project containing string', () => {
    const button = fixture.debugElement.query(By.css(".button-container")).nativeElement;
    const input = fixture.debugElement.query(By.css("#search-input")).nativeElement;
    input.value = ' 12345 ';
    const mockClick = new MouseEvent('click');
    button.dispatchEvent(mockClick);
    expect(component.dataSource.filteredData.length).toEqual(1);
  });

  it('should return all projects', (done: DoneFn) => {
    spyOn(service, 'getProjects').and.returnValue(of(PROJECTS));
    service.getProjects().subscribe((result: Project[]) => {
      component.dataSource.data = result;
      expect(component.dataSource.data.length).toBeGreaterThan(0);
      done();
    });
  });

});

