import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';

import { RouterTestingModule } from '@angular/router/testing';
import { JwtService } from '../jwt.service';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [RouterTestingModule],
      providers: [JwtService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set an Item', () => {
    localStorage.setItem('access_token', 'u;p'); // u;p

    expect(localStorage.getItem('access_token')).toBeDefined(); // u;p .toBe('u;p')
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

