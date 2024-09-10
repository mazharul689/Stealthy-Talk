import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEncryptedImageComponent } from './all-encrypted-image.component';

describe('AllEncryptedImageComponent', () => {
  let component: AllEncryptedImageComponent;
  let fixture: ComponentFixture<AllEncryptedImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllEncryptedImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEncryptedImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
