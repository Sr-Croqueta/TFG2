import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisenocliComponent } from './disenocli.component';

describe('DisenocliComponent', () => {
  let component: DisenocliComponent;
  let fixture: ComponentFixture<DisenocliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisenocliComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisenocliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
