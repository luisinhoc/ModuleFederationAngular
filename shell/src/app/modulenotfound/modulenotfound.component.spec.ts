import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulenotfoundComponent } from './modulenotfound.component';

describe('ModulenotfoundComponent', () => {
  let component: ModulenotfoundComponent;
  let fixture: ComponentFixture<ModulenotfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulenotfoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulenotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
