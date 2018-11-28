import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PostDataProvider } from "../../providers/post-data/post-data";
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
@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  private post:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public postDataService:PostDataProvider) {
      let key = this.navParams.get("key");
      // console.log(key);
      this.post=this.postDataService.getPost(key);

  }

  ionViewDidLoad() {
    // console.log(this.key);

  }

  update() {

    this.postDataService.updatePost(this.post.key,this.post);
    this.navCtrl.push(HomePage);
  }

  delete(){
    console.log(this.post);
    this.postDataService.removePost(this.post);
    this.navCtrl.push(HomePage);
}
}
