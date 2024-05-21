import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContactosExternosComponent } from './modal-contactos-externos.component';

describe('ModalContactosExternosComponent', () => {
  let component: ModalContactosExternosComponent;
  let fixture: ComponentFixture<ModalContactosExternosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalContactosExternosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalContactosExternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
