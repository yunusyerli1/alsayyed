import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFirstComponent } from './list-first.component';

describe('ListFirstComponent', () => {
  let component: ListFirstComponent;
  let fixture: ComponentFixture<ListFirstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFirstComponent]
    });
    fixture = TestBed.createComponent(ListFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
