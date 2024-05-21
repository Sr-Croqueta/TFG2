import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosinternosComponent } from './contactosinternos.component';

describe('ContactosinternosComponent', () => {
  let component: ContactosinternosComponent;
  let fixture: ComponentFixture<ContactosinternosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactosinternosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactosinternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
