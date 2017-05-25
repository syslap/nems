import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { TwitterConnect } from '@ionic-native/twitter-connect';

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
    public googlePlus: GooglePlus,
    public twitter: TwitterConnect) {

  }

  doGoogleLogin(){
    let that = this;
    let loading = this.loadingCtrl.create({});

    loading.present();
    this.googlePlus.login({})
      .then(function (user) {
        loading.dismiss();
        console.log(user);
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


  doTwitterLogin(){
    let env = this;
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    //Request for login
    env.twitter.login()
      .then(function(result) {
        //Get user data
        console.log(result);
        env.twitter.showUser()
          .then(function(user){
            //save the user data in NativeStorage
            console.log(user);
            env.storage.set('user',
              {
                name: user.name,
                userName: user.screen_name,
                followers: user.followers_count,
                picture: user.profile_image_url_https
              }).then(function() {
                loading.dismiss();
                nav.push(HomePage);
              })
          }, function(error){
            loading.dismiss();
          });
      }, function(error){
        loading.dismiss();
      });
  }

}
