import { Component, OnInit, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

import { ChannelPack } from './../models/channelPack';
import { IndividualChannels } from './../models/individualChannels';
import { AdditionalServices } from './../models/additionalServices';


import { SharedService } from '../services/sharedService';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.scss']
})
export class PacksComponent implements OnInit, OnChanges {

  subscription: Subscription;
  presentAccountBalance: number;
  packageCost: number;
  combinedPackCost: number;
  subscriptionForm: FormGroup;
  baseSubscriptiondata: any;
  basePackObj: ChannelPack;
  channelsFoundInForm: IndividualChannels[];
  servicesFoundInForm: AdditionalServices[];
  channelsAdded: FormControl;
  servicesAdded: FormControl;

  channelPacks: ChannelPack[] = [
    { id: 'Silver', viewValue: ['Zee', 'Sony', 'Star Plus'], price: 50 },
    { id: 'Gold', viewValue: ['Zee', 'Sony', 'Star Plus', 'Discovery', 'NatGeo'], price: 100 }
  ];

  channels: IndividualChannels[] = [
    { id: 0, viewValue: 'Zee', price: 10 },
    { id: 1, viewValue: 'Sony', price: 15 },
    { id: 2, viewValue: 'Star Plus', price: 20 },
    { id: 4, viewValue: 'Discovery', price: 10 },
    { id: 5, viewValue: 'NatGeo', 'price': 20 }
  ];

  services: AdditionalServices[] = [
    { id: 0, viewValue: 'LearnEnglish', price: 200 },
    { id: 1, viewValue: 'LearnCooking', price: 100 }
  ]


  constructor(private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private toastrService: ToastrService) {

    this.subscription = this.sharedService.getCurrentAccountBalance().subscribe(amount => {
      this.presentAccountBalance = amount;
    });

    this.subscriptionForm = this.formBuilder.group({
      basePack: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    });

  }
  
  ngOnChanges(): void {

    this.subscriptionForm.controls.basePack.valueChanges.subscribe(val => {
      this.combinedPackCost = 0;

      if (val) {

        this.basePackObj = this.channelPacks.find(o => o.id === val);

        if (this.subscriptionForm.controls.duration.value >= 3) {

          this.combinedPackCost = (this.combinedPackCost + this.basePackObj.price) * this.subscriptionForm.controls.duration.value;

          this.packageCost = this.combinedPackCost - this.calculateDiscount(10, this.combinedPackCost);
        }
        else {

          this.combinedPackCost = (this.combinedPackCost + this.basePackObj.price) * this.subscriptionForm.controls.duration.value;

          this.packageCost = this.combinedPackCost;
        }
      }
    });

    this.subscriptionForm.controls.duration.valueChanges.subscribe(val => {
      this.combinedPackCost = 0;

      if (val >= 3) {

        this.combinedPackCost = (this.combinedPackCost + this.basePackObj.price) * val;

        this.packageCost = this.combinedPackCost - this.calculateDiscount(10, this.combinedPackCost);
      }
      else {

        this.combinedPackCost = (this.combinedPackCost + this.basePackObj.price) * val;
        this.packageCost = this.combinedPackCost;
      }
    });
  }

  ngOnInit() {
    this.combinedPackCost = 0;
    this.channelsAdded = new FormControl([], Validators.required);
    this.servicesAdded = new FormControl([], Validators.required);

    this.ngOnChanges();
  }


  calculateDiscount(discount, combinedPackCost) {

    return combinedPackCost * discount / 100;

  }

  saveSubscription() {
    if (this.subscriptionForm.valid) {
      if (this.packageCost > this.presentAccountBalance) {
        this.toastrService.error('You do not have enough funds. Kindly recharge your account.');
        this.subscriptionForm.reset();
      }
      else {
        this.baseSubscriptiondata = this.subscriptionForm.getRawValue();
        this.sharedService.setCurrentAccountBalance(this.presentAccountBalance - this.packageCost);
        this.toastrService.info('Updated account balance is INR ' + this.presentAccountBalance + '.')
        this.toastrService.success(this.baseSubscriptiondata.basePack +' Channel pack subscribed for a duration of ' + this.baseSubscriptiondata.duration + ' month/s. An Email and SMS has been sent successfully.');
        this.subscriptionForm.reset();
      }

    }
  }

  addChannels() {
    this.channelsFoundInForm = [];
    let channelsCost;
    channelsCost = 0;

    let individualChannelsInForm = this.channelsAdded.value.replace(/\s/g, '');
    individualChannelsInForm = individualChannelsInForm.split(',');

    individualChannelsInForm.forEach(element => {
      this.channels.forEach(channel => {
        if (channel.viewValue.toLowerCase().replace(/\s/g, '') === element.toLowerCase()) {
          this.channelsFoundInForm.push(channel);
        }
      });
    });
    if (this.baseSubscriptiondata != undefined) {
      if (this.channelsFoundInForm.length != individualChannelsInForm.length) {
        this.toastrService.error('Enter correct channel name.');
      }
      else {
        this.channelsFoundInForm.forEach(channel => {
          channelsCost += channel.price;
        })
        if (this.presentAccountBalance < channelsCost) {
          this.channelsFoundInForm = [];
          this.channelsAdded.setValue([]);
          this.toastrService.error('You do not have enough funds. Kindly recharge your account.');
        }
        else {
          this.presentAccountBalance -= channelsCost;
          this.sharedService.setCurrentAccountBalance(this.presentAccountBalance);
          this.channelsAdded.setValue([]);
          this.toastrService.info('Updated acocunt balance is INR '+ this.presentAccountBalance +'.');
          this.toastrService.success('Additional Channels have added successfully.');
        }

      }
    }
    else {
      this.toastrService.error('Subscribe to a Channel pack first.');
      this.channelsAdded.setValue([]);

    }


  }

  addServices() {
    this.servicesFoundInForm = [];
    let servicesCost: number;
    servicesCost = 0;

    let additionalServicesInForm = this.servicesAdded.value.replace(/\s/g, '');
    additionalServicesInForm = additionalServicesInForm.split(',');

    additionalServicesInForm.forEach(element => {
      this.services.forEach(service => {
        if (service.viewValue.toLowerCase().replace(/\s/g, '') === element.toLowerCase()) {
          this.servicesFoundInForm.push(service);
        }
      });
    });

    if (this.baseSubscriptiondata != undefined) {
      if (this.servicesFoundInForm.length != additionalServicesInForm.length) {
        this.toastrService.error('Enter correct service name.')
      }
      else {
        this.servicesFoundInForm.forEach(service => {
          servicesCost += service.price;
        })
        if (this.presentAccountBalance < servicesCost) {
          this.servicesFoundInForm = [];
          this.servicesAdded.setValue([]);
          this.toastrService.error('You do not have enough funds. Kindly recharge your account.');
        }
        else {
          this.presentAccountBalance -= servicesCost;
          this.sharedService.setCurrentAccountBalance(this.presentAccountBalance);
          this.servicesAdded.setValue([]);
          this.toastrService.info('Updated acocunt balance is INR '+ this.presentAccountBalance +'.');
          this.toastrService.success('Additional Services have been added successfully.');
        }
      }
    }
    else {
      this.toastrService.error('Subscribe to a Channel pack first.');
      this.servicesAdded.setValue([]);

    }

  }

}
