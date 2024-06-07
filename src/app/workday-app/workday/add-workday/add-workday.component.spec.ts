import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkdayComponent } from './add-workday.component';

describe('AddWorkdayComponent', () => {
  let component: AddWorkdayComponent;
  let fixture: ComponentFixture<AddWorkdayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWorkdayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWorkdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
