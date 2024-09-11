import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserRequestsComponent } from './edit-user-requests.component';

describe('EditUserRequestsComponent', () => {
  let component: EditUserRequestsComponent;
  let fixture: ComponentFixture<EditUserRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
