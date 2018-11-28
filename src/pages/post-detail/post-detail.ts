import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PostDataProvider } from "../../providers/post-data/post-data";
import { UserDataProvider } from "../../providers/user-data/user-data";

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
  private userId: string="";
  private user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private postDataService: PostDataProvider,private userDataService:UserDataProvider) {
    this.userDataService.getObservable().subscribe( user => {
      this.user = user;
    });
    this.userId = this.userDataService.getUserId();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailPage');
  }

  publish() {
    console.log(this.userId);
    let timestamp = new Date().toISOString();
    this.postDataService.addPost(this.title, this.location, timestamp, this.expiration, this.description, this.images,this.userId);
    this.navCtrl.push(HomePage);
  }

}
