import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExternalIdComponent } from './add-external-id.component';

describe('AddExternalIdComponent', () => {
  let component: AddExternalIdComponent;
  let fixture: ComponentFixture<AddExternalIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExternalIdComponent]
    });
    fixture = TestBed.createComponent(AddExternalIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
