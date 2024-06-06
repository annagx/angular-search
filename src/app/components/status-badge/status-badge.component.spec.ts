import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusBadgeComponent } from './status-badge.component';
import { BackgroundColor, TextColor } from '../../constants';

const APPROVED = "Approuvé"
const VALIDATION = "Validation"

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
    component.statusCode = 0;
    component.ngOnInit();
    expect(component.text).toEqual(APPROVED);
    expect(component.backgroundColor).toEqual(BackgroundColor.Green);
    expect(component.textColor).toEqual(TextColor.Green);
  });

  it('should render yellow theme with validation status', () => {
    component.statusCode = 1;
    component.ngOnInit();
    expect(component.text).toEqual(VALIDATION);
    expect(component.backgroundColor).toEqual(BackgroundColor.Yellow);
    expect(component.textColor).toEqual(TextColor.Yellow);
  });

});
