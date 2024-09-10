import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedEmailDialogComponent } from './detailed-email-dialog.component';

describe('DetailedEmailDialogComponent', () => {
  let component: DetailedEmailDialogComponent;
  let fixture: ComponentFixture<DetailedEmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedEmailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
