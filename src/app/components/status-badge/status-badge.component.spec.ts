import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadgeComponent } from './status-badge.component';
import { BackgroundColor, STATUS, StatusCode, TextColor } from '../../constants';

const APPROVED = "Approuvé"
const VALIDATION = "Validation"
const CREATION = "Création"

describe('StatusBadgeComponent', () => {
  let component: StatusBadgeComponent;
  let fixture: ComponentFixture<StatusBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusBadgeComponent);
    component = fixture.componentInstance;
    component.statusCode = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render green theme with approved status', () => {
    component.statusCode = StatusCode.Approved;
    component.ngOnInit();
    expect(component.text).toEqual(APPROVED);
    expect(component.theme.backgroundColor).toEqual(BackgroundColor.Green);
    expect(component.theme.textColor).toEqual(TextColor.Green);
  });

  it('should render yellow theme with validation status', () => {
    component.statusCode = StatusCode.Validation;
    component.ngOnInit();
    expect(component.text).toEqual(VALIDATION);
    expect(component.theme.backgroundColor).toEqual(BackgroundColor.Yellow);
    expect(component.theme.textColor).toEqual(TextColor.Yellow);
  });

  it('should give default status creation', () => {
    component.statusCode = 99;
    component.ngOnInit();
    const status = STATUS.find(status => status.id === StatusCode.Creation)
    expect(component.myStatus).toEqual(status!);
    expect(component.text).toEqual(CREATION);
    expect(component.theme.backgroundColor).toEqual(BackgroundColor.Blue);
    expect(component.theme.textColor).toEqual(TextColor.Blue);
  });

});
