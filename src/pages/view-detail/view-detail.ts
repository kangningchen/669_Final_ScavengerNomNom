import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostDataProvider } from "../../providers/post-data/post-data";
import { Post } from '../../models/post';
import { PostManager } from '../../models/postManager';



/**
 * Generated class for the ViewDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-detail',
  templateUrl: 'view-detail.html',
})
export class ViewDetailPage {
  private post: Post;
  private postList: Post[];
  private timeCounterInterval: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private postDataService: PostDataProvider) {
    let postKey = this.navParams.get("postKey");
    console.log("nav:"+postKey);
     
    this.post = this.postDataService.getPostByKey(postKey);
    this.getTimeRest();
    console.log(this.post);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDetailPage');
  }
  ionViewWillLeave() {
    clearInterval(this.timeCounterInterval);
  }
  public getTimeRest():any {
    var r = new Date(Date.parse(this.post.expiration)).getTime();
    this.timeCounterInterval = setInterval(() => {
      this.countDown(r);
      
    }, 1000);
  }
  public countDown(expiration: number):any {
      var now = new Date().getTime();
      var distance = expiration - now;
      console.log(distance);
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      window.document.getElementById("countDown").innerHTML = hours + "h "
      + minutes + "m " + seconds + "s ";
      console.log("here");
      if (distance < 0) {
        clearInterval(this.timeCounterInterval);
        window.document.getElementById("countDown").innerHTML = "EXPIRED";
      }
  }
}
