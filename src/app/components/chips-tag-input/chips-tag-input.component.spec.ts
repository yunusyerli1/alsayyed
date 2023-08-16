import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsTagInputComponent } from './chips-tag-input.component';

describe('ChipsTagInputComponent', () => {
  let component: ChipsTagInputComponent;
  let fixture: ComponentFixture<ChipsTagInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChipsTagInputComponent]
    });
    fixture = TestBed.createComponent(ChipsTagInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
