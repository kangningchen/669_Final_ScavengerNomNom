import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PostDataProvider } from "../../providers/post-data/post-data";
// import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the PostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {

  private title: string = "";
  private description: string = "";
  private location: any = "";
  private expiration: string = "";
  private images: string[] = [""];

  constructor(public navCtrl: NavController, public navParams: NavParams, private postDataService: PostDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailPage');
  }

  publish() {
    console.log(this.title, this.description, this.location, this.expiration);
    let timestamp = new Date();
    let expirationDate = new Date(this.expiration);
    this.postDataService.addPost(this.title, this.location, timestamp, expirationDate, this.description, this.images);
    this.navCtrl.push(HomePage);
  }

}
