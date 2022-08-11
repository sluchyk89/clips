import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TabComponent} from './tab.component';
import {By} from "@angular/platform-browser";

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have .hidden class', () => {
    // tree possible selectors
    // first solution the best one
    const element = fixture.debugElement.query(By.css('.hidden'));
    const element2 = fixture.nativeElement.querySelector('.hidden');
    const element3 = document.querySelector('.hidden');

    expect(element).toBeTruthy();
  })
});
