import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrotiendaComponent } from './registrotienda.component';

describe('RegistrotiendaComponent', () => {
  let component: RegistrotiendaComponent;
  let fixture: ComponentFixture<RegistrotiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrotiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrotiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
