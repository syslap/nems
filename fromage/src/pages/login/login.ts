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

    loading.present();
    this.googlePlus.login({})
      .then(function (user) {
        loading.dismiss();
        that.storage.set('user', {
          name: user.displayName,
          email: user.email,
          picture: user.imageUrl
        }).then(function(){
            that.navCtrl.push(HomePage);
          }, function (error) {
            console.log(error);
          })
      }, function (error) {
        loading.dismiss();
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
