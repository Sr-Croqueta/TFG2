import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactosexternosComponent } from './contactosexternos.component';

describe('ContactosexternosComponent', () => {
  let component: ContactosexternosComponent;
  let fixture: ComponentFixture<ContactosexternosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactosexternosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactosexternosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
