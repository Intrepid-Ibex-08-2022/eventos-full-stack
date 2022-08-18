import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhotoPrincipalComponent } from './fhotoPrincipal.component';

describe('EventComponent', () => {
  let component: FhotoPrincipalComponent;
  let fixture: ComponentFixture<FhotoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FhotoPrincipalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FhotoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
