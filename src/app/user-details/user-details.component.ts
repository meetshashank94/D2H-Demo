import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, Form, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SharedService } from '../services/sharedService';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetailForm: FormGroup;
  subscription: Subscription;
  presentAccountBalance: number;

  constructor(private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private toastrService: ToastrService
  ) {

    this.subscription = this.sharedService.getCurrentAccountBalance().subscribe(amount => {
      this.presentAccountBalance = amount;
    });

    this.userDetailForm = this.formBuilder.group({
      email: ['john@example.com', [Validators.required, Validators.email]],
      mobile: ['9999999999', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {

  }

  saveUserDetails() {
    if (this.userDetailForm.valid) {
      let userData = this.userDetailForm.getRawValue();
      this.toastrService.success('Email and phone has been updated succesfully.')
      this.userDetailForm.reset();
    }
  }

}
