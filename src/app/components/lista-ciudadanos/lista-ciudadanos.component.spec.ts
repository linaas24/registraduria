import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCiudadanosComponent } from './lista-ciudadanos.component';

describe('ListaCiudadanosComponent', () => {
  let component: ListaCiudadanosComponent;
  let fixture: ComponentFixture<ListaCiudadanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCiudadanosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCiudadanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
