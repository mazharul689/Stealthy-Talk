import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptImageComponent } from './encrypt-image.component';

describe('EncryptImageComponent', () => {
  let component: EncryptImageComponent;
  let fixture: ComponentFixture<EncryptImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncryptImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
