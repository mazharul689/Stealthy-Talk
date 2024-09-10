import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecryptImageComponent } from './decrypt-image.component';

describe('DecryptImageComponent', () => {
  let component: DecryptImageComponent;
  let fixture: ComponentFixture<DecryptImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecryptImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecryptImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
