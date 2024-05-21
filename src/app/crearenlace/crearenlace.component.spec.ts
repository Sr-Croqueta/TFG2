import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearenlaceComponent } from './crearenlace.component';

describe('CrearenlaceComponent', () => {
  let component: CrearenlaceComponent;
  let fixture: ComponentFixture<CrearenlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearenlaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearenlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
