import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsTimelineComponent } from './news-timeline.component';

describe('NewsTimelineComponent', () => {
  let component: NewsTimelineComponent;
  let fixture: ComponentFixture<NewsTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
