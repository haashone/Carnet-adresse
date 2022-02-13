import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnHandlersRenderComponent } from './btn-handlers-render.component';

describe('BtnHandlersRenderComponent', () => {
  let component: BtnHandlersRenderComponent;
  let fixture: ComponentFixture<BtnHandlersRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnHandlersRenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnHandlersRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
