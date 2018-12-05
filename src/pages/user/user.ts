import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EditPage } from '../edit/edit';
import { ViewDetailPage } from  '../view-detail/view-detail';
import { Post } from '../../models/post';

import { PostDataProvider } from "../../providers/post-data/post-data";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoginPage } from '../login/login';
// import { UserDataProvider } from "../../providers/user-data/user-data";
// import { PostManager } from "../../models/postManager";
//
// /**
//  * Generated class for the EditPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */
const PLACEHOLDER_IMAGE: string = "../../assets/imgs/placeholder.png";

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  private postKey: string;
  private post:any;
  private image: string;
  private profilePic: string="../../assets/imgs/avatar.jpg";
  private userPostList: Post[];
  private userId:string;
  private userName: string;
  private userPic: any;
  private processing:boolean;
  private uploadImage: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public postDataService:PostDataProvider,
              public userDataService: UserDataProvider,
              public camera: Camera) {
      // this.postKey = this.navParams.get("key");
      // // console.log(key);
      // this.post = this.postDataService.getPost(this.postKey);
      // this.image = this.post.getPostImage();
      this.userId = this.userDataService.getUserId();
      this.userName = this.userDataService.getUserName();
      this.userPic=this.userDataService.getUserPic();
      this.postDataService.getUserPostListObservable().subscribe( userPostList => {
        this.userPostList = userPostList });

     this.userPostList = this.postDataService.getPostListByUserId(this.userId);
  }

  ionViewDidLoad() {

  }
  presentActionSheet(fileLoader) {
      fileLoader.click();
      var that = this;
      fileLoader.onchange = function () {
        var file = fileLoader.files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
          that.processing = true;
          that.getOrientation(fileLoader.files[0], function (orientation) {
            if (orientation > 1) {
              that.resetOrientation(reader.result, orientation, function (resetBase64Image) {
                that.userPic = resetBase64Image;
              });
            } else {
              that.userPic = reader.result;
            }
            // console.log(that.profilePic)
            that.changeProfilePic(that.userPic);
          });

          // that.changeProfilePic(that.profilePic);
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    }
  imageLoaded(){
    this.processing = false;
  }
  getOrientation(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e:any) {

      var view = new DataView(e.target.result);
      if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
      var length = view.byteLength, offset = 2;
      while (offset < length) {
        var marker = view.getUint16(offset, false);
        offset += 2;
        if (marker == 0xFFE1) {
          if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
          var little = view.getUint16(offset += 6, false) == 0x4949;
          offset += view.getUint32(offset + 4, little);
          var tags = view.getUint16(offset, little);
          offset += 2;
          for (var i = 0; i < tags; i++)
            if (view.getUint16(offset + (i * 12), little) == 0x0112)
              return callback(view.getUint16(offset + (i * 12) + 8, little));
        }
        else if ((marker & 0xFF00) != 0xFF00) break;
        else offset += view.getUint16(offset, false);
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file);
  }
  resetOrientation(srcBase64, srcOrientation, callback) {
    var img = new Image();

    img.onload = function () {
      var width = img.width,
        height = img.height,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext("2d");

      // set proper canvas dimensions before transform & export
      if (4 < srcOrientation && srcOrientation < 9) {
        canvas.width = height;
        canvas.height = width;
      } else {
        canvas.width = width;
        canvas.height = height;
      }

      // transform context before drawing image
      switch (srcOrientation) {
        case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
        case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
        case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
        case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
        case 7: ctx.transform(0, -1, -1, 0, height, width); break;
        case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
        default: break;
      }

      // draw image
      ctx.drawImage(img, 0, 0);

      // export base64
      callback(canvas.toDataURL());
    };

    img.src = srcBase64;
  }

  changeProfilePic(src:any){
    // this.profilePic=
    this.userPic=src;
    console.log("userchange:"+src);
    this.userDataService.setUserPic(this.userPic);
  }

  changeDisplayName(){

  }
  viewPost(key:string){
    this.navCtrl.push(ViewDetailPage, {"postKey": key});
  }

  editPost(key:string){
    this.navCtrl.push(EditPage,{"postKey":key});
  }
  // update() {
  //   this.post.setPostImage(this.image);
  //   this.postDataService.updatePost(this.postKey);
  //   this.navCtrl.pop();
  // }
  //
  // delete(){
  //   console.log(this.post);
  //   this.postDataService.removePost(this.post);
  //   this.navCtrl.pop();
  // }

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

  public logOut() : void {
       this.userDataService.logOut();
       this.navCtrl.setRoot(LoginPage);
    }

}
