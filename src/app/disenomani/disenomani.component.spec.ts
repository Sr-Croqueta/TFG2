import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenomaniComponent } from './disenomani.component';

describe('DisenomaniComponent', () => {
  let component: DisenomaniComponent;
  let fixture: ComponentFixture<DisenomaniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisenomaniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisenomaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
