import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatCardModule, MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { PacksComponent } from './packs.component';

describe('PacksComponent', () => {
  let component: PacksComponent;
  let fixture: ComponentFixture<PacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacksComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        MatCardModule,
        MatListModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
