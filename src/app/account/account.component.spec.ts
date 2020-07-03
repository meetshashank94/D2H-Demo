import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatFormFieldModule, MatListModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsComponent } from './../user-details/user-details.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PacksComponent } from './../packs/packs.component';
import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent, PacksComponent, UserDetailsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers : [ ],
      imports : [
                CommonModule,
                MatCardModule,
                MatInputModule,
                MatFormFieldModule,
                RouterTestingModule,
                FormsModule,
                MatListModule,
                ReactiveFormsModule,
                BrowserAnimationsModule,
                NgSelectModule,
                ToastrModule.forRoot()
              ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
