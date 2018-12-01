import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PostDataProvider } from "../../providers/post-data/post-data";
import { Post } from '../../models/post';
import { PostManager } from '../../models/postManager';
import { Comment } from '../../models/comment';
import { UserDataProvider } from "../../providers/user-data/user-data";



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
  private postKey: string;
  private post: Post;
  private postList: Post[];
  private timeCounterInterval: any;
  private countDownString = "";
  private commentText: string = "";
  private commentatorId: string;
  private commentatorUserName: string;
  private commentatorAvatar: string = "../../assets/imgs/avatar.jpg";
  private commentList: Comment[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private postDataService: PostDataProvider,
              private userDataService: UserDataProvider) {
    this.postKey = this.navParams.get("postKey");
    console.log("nav:", this.postKey);
    this.post = this.postDataService.getPostByKey(this.postKey);
    this.postDataService.getCommentObservable().subscribe( commentList => {
      this.commentList = commentList });
    this.commentList = this.post.getCommentList();
  
    this.commentatorId = this.userDataService.getUserId();
    console.log('commentatorId:', this.commentatorId);
    this.commentatorUserName = this.userDataService.getUserName();
    if (this.commentatorUserName == undefined) {
      this.commentatorUserName = "Anonymous";
    }
    console.log('commentatorUserName:', this.commentatorUserName);

    this.getTimeRest();
    console.log('Is comments here?', this.post);

  }

  ngOnInit() {
    this.getCommentList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDetailPage');
  }

  ionViewWillLeave() {
    clearInterval(this.timeCounterInterval);
  }

  public getTimeRest():any {
    var r = new Date(Date.parse(this.post.getExpiration())).getTime();
    this.timeCounterInterval = setInterval(() => {
      this.countDown(r);
      
    }, 1000);
  }

  public countDown(expiration: number):any {
    var now = new Date().getTime();
    var distance = expiration - now;

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.countDownString = hours + "h "
    + minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(this.timeCounterInterval);
      this.countDownString = "EXPIRED";
    }
  }

  public getCommentList(): void {
    this.commentList = this.postDataService.getCommentList(this.postKey);
  }

  public addComment(commentatorId: string, 
                    commentatorUserName: string, 
                    commentatorAvatar: string,
                    commentText: string) {
    let timestamp = new Date().toISOString();
    this.postDataService.addComment(this.postKey,
                                    this.commentatorId,
                                    this.commentatorUserName,
                                    this.commentatorAvatar,
                                    timestamp,
                                    this.commentText);
  }
}
