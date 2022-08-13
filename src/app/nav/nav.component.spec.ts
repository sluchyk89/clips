import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavComponent} from './nav.component';
import {of} from "rxjs";
import {AuthService} from "../services/auth.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let mockedAuthService = jasmine.createSpyObj(
    'AuthService',
    ['createUser', 'logout'],
    {
      isAuthenticated$: of(true),
    }
  )

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent],
      providers: [
        {provide: AuthService, useValue: mockedAuthService}
      ],
      imports:[
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
