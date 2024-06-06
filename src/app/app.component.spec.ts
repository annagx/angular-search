import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const PAGE_SIZE = 5;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, MatPaginator, MatPaginatorModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
});

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have the 'angular-desjardins' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('angular-desjardins');
  // });

  // it('should render header', () => {
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h2')?.textContent).toContain('Recherche');
  // });

  it('should have a non-null list of projects', () => {
    expect(component.dataSource).not.toBeNull();
  });

  it('should have a paginator', () => {
    expect(component.dataSource.paginator).not.toBeNull();
  });

  it('should return whole list of projects', () => {
    const projectsCount = component.dataSource.data.length;
    const keyupEvent = new KeyboardEvent('keyup');
    const input = fixture.debugElement.query(By.css(".search-input"));
    const inputElement = input.nativeElement;
    inputElement.value = '';
    inputElement.dispatchEvent(keyupEvent);
    expect(component.dataSource.filteredData.length).toEqual(projectsCount);
  });

  it('should return 0 project', () => {
    const keyupEvent = new KeyboardEvent('keyup');
    const input = fixture.debugElement.query(By.css(".search-input"));
    const inputElement = input.nativeElement;
    inputElement.value = 'Gestion Z';
    inputElement.dispatchEvent(keyupEvent);
    expect(component.dataSource.filteredData.length).toEqual(0);
  });

  it('should return more than one project', () => {
    const keyupEvent = new KeyboardEvent('keyup');
    const input = fixture.debugElement.query(By.css(".search-input"));
    const inputElement = input.nativeElement;
    inputElement.value = 'Gestion A';
    inputElement.dispatchEvent(keyupEvent);
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
    const input = fixture.debugElement.query(By.css(".search-input"));
    const inputElement = input.nativeElement;
    inputElement.value = 'Gestion A';
    button.addEventListener('click', () => component.applyFilter(inputElement.value));
    const mockClick = new MouseEvent('click');
    button.dispatchEvent(mockClick);
    expect(component.dataSource.filteredData.length).toEqual(2);
  });

  // it('should return 5 items per page', () => {
  //   component.ngAfterViewInit();
  //   expect(component.paginator.pageSize).toEqual(5);
  // });

  // it('should return right number of pages', () => {
  //   const numberPages = Math.ceil(component.dataSource.data.length/PAGE_SIZE);
  //   component.ngAfterViewInit();
  //   expect(component.paginator.pageSize).toEqual(numberPages);
  // });
});
