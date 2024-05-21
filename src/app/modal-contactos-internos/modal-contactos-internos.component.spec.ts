import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContactosInternosComponent } from './modal-contactos-internos.component';

describe('ModalContactosInternosComponent', () => {
  let component: ModalContactosInternosComponent;
  let fixture: ComponentFixture<ModalContactosInternosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalContactosInternosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalContactosInternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
