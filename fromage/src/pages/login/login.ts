import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public googlePlus: GooglePlus) {

  }

  doGoogleLogin(){
    let that = this;
    let loading = this.loadingCtrl.create({});

    this.googlePlus.login({})
      .then(function (user) {
        loading.present();
        that.navCtrl.push(HomePage);
        console.log(user);
      }, function (error) {
        loading.dismiss();
        console.log(error);
      });
  }

  doGoogleLogout(){
    let that = this;
    this.googlePlus.logout()
      .then(function (response) {
        that.storage.remove('user');
        that.navCtrl.push(LoginPage);
      },function (error) {
        console.log(error);
      })
  }
}
