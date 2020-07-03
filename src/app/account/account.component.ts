import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SharedService } from '../services/sharedService';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  presentAccountBalance: number;
  rechargeAmount: number;
  subscription: Subscription;

  constructor(private sharedService: SharedService,
    private toastrService: ToastrService) {

    this.subscription = this.sharedService.getCurrentAccountBalance().subscribe(amount => {
      this.presentAccountBalance = amount;
    });

  }

  ngOnInit() {
    this.presentAccountBalance = 100;
    this.rechargeAmount = 500;

    this.sharedService.setCurrentAccountBalance(this.presentAccountBalance);
  }

  updateBalance() {
    this.presentAccountBalance += +this.rechargeAmount;
    this.sharedService.setCurrentAccountBalance(this.presentAccountBalance);
    this.toastrService.success('Account recharged successfully by INR ' + this.rechargeAmount + '. Current Account Balance is INR ' + this.presentAccountBalance + '.');
  }

  onlyNumber(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && charCode < 48 || charCode > 57) {
      return false;
    }
    else
      true;
  }

}
