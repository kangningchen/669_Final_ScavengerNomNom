import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PostDataProvider } from "../../providers/post-data/post-data";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { Camera, CameraOptions } from '@ionic-native/camera';


const PLACEHOLDER_IMAGE: string = "../../assets/imgs/placeholder.png";

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
  private image: string;
  private userId: string="";
  private userName: string = "";
  private user: any;
  private comments: Object= {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private postDataService: PostDataProvider,
              private userDataService:UserDataProvider,
              private camera: Camera) {
    this.userDataService.getObservable().subscribe( user => {
      this.user = user;
    });
    this.userId = this.userDataService.getUserId();
    this.userName = this.userDataService.getUserName();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailPage');
  }

  private publish() {
    console.log(this.userId);
    let timestamp = new Date().toISOString();
    this.postDataService.addPost(this.title, this.location, timestamp, this.expiration, this.description, this.image, this.userId, this.userName, this.comments);
    this.navCtrl.pop();
  }

  private takePic(){
    console.log('triggered');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      if (imageData) {
        this.image = 'data:image/jpeg;base64,' + imageData;
      }
     }, (err) => {
       this.image = PLACEHOLDER_IMAGE;
       console.log(err);
     });
  }



  private searchPlace(): void {

  }
  private clearImage(): void {
    this.image = "";
  }

}
