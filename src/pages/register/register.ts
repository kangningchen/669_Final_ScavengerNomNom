import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';
import { HomePage } from '../home/home'
import { TabsPage } from '../../pages/tabs/tabs';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private email: string = "";
  private password: string = "";
  private username: string = "";
  private errorMsg: string = "";
  private userPic: string= "../../assets/imgs/avatar.jpg";

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userDataService: UserDataProvider) {
    this.userDataService.getObservable().subscribe(update=> {
      this.getMessage(update);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  private registerUser():void {
    // simple non-empty check
    if (this.email == "" || this.password == "" || this.username == ""){
      this.errorMsg = "Some fields are missing.";
      return;
    }
    this.userDataService.createAccount(this.email, this.password, this.username, this.userPic);
    this.navCtrl.setRoot(TabsPage);

  }

  private getMessage(result: string):void {
    if (result != "success"){
      this.errorMsg = result;
    }
    else {
      this.navCtrl.setRoot(TabsPage);
    }

  }
  private  presentActionSheet(fileLoader) {
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

  private resetOrientation(srcBase64, srcOrientation, callback) {
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
    }


}
private changeProfilePic(src:any){
    this.userDataService.setUserPic(src);
    console.log("register:"+src);
    }
  }
