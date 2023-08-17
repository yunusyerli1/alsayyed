import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeightComponent } from './add-weight.component';

describe('AddWeightComponent', () => {
  let component: AddWeightComponent;
  let fixture: ComponentFixture<AddWeightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWeightComponent]
    });
    fixture = TestBed.createComponent(AddWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
