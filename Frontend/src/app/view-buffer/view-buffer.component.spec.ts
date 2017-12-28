import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBufferComponent } from './view-buffer.component';

describe('ViewBufferComponent', () => {
  let component: ViewBufferComponent;
  let fixture: ComponentFixture<ViewBufferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBufferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
