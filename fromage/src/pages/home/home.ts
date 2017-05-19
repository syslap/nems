import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public user = {
    displayName: "",
    email: "",
    picture: ""
  };

  constructor(public navCtrl: NavController,
              public googlePlus: GooglePlus,
              public storage: Storage) {

  }

  ionViewDidLoad(){
    let env = this;
    env.storage.get('user')
      .then( function (data) {
        // user is previously logged and we have his data
        // we will let him access the app
        env.user = data;
      }, function (error) {
        //we don't have the user data so we will ask him to log in

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
