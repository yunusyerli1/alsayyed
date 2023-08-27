import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDownloadComponent } from './list-download.component';

describe('ListDownloadComponent', () => {
  let component: ListDownloadComponent;
  let fixture: ComponentFixture<ListDownloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDownloadComponent]
    });
    fixture = TestBed.createComponent(ListDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
