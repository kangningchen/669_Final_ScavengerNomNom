import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PostDataProvider } from "../../providers/post-data/post-data";
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { UserDataProvider } from "../../providers/user-data/user-data";
// import { PostManager } from "../../models/postManager";
//
// /**
//  * Generated class for the EditPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */
//
const PLACEHOLDER_IMAGE: string = "../../assets/imgs/placeholder.png";

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  private postKey: string;
  private post:any;
  private image: string;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public postDataService:PostDataProvider,
              public camera: Camera) {
      this.postKey = this.navParams.get("key");
      // console.log(key);
      this.post = this.postDataService.getPost(this.postKey);
      this.image = this.post.getPostImage();

  }

  ionViewDidLoad() {
    // console.log(this.key);

  }

  update() {
    this.post.setPostImage(this.image);
    this.postDataService.updatePost(this.postKey);
    this.navCtrl.pop();
  }

  delete(){
    console.log(this.post);
    this.postDataService.removePost(this.post);
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
        // this.post.setPostImage('data:image/jpeg;base64,' + imageData);
        this.image = 'data:image/jpeg;base64,' + imageData;
      }
     }, (err) => {
      //  this.post.setPostImage(PLACEHOLDER_IMAGE);
       this.image = PLACEHOLDER_IMAGE;
       console.log(err);
     });
  }

  private clearImage(): void {
    this.image = "";
  }

}
