import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Post } from '../../models/post';
// import { PostManager } from '../../models/postManager';
import { PostDetailPage } from '../post-detail/post-detail';
import { EditPage } from '../edit/edit';

import { PostDataProvider } from "../../providers/post-data/post-data";
import { UserDataProvider } from "../../providers/user-data/user-data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private postList: Post[];
  private user: any;
  private userId:string;

  constructor(public navCtrl: NavController, private postDataService: PostDataProvider, private userDataService:UserDataProvider) {
    this.postDataService.getPostObservable().subscribe( postList => {
      this.postList = postList;
    });
    this.postList = this.postDataService.getPostList();

    this.userDataService.getObservable().subscribe( user => {
      this.user = user;
    });
    this.userId = this.userDataService.getUserId();

  }

  ngOnInit() {
    this.postList = this.postDataService.getPostList();
    this.userId = this.userDataService.getUserId();
  }

  addPost() {
    this.navCtrl.push(PostDetailPage);
  }

  editPost(key:string){
    this.navCtrl.push(EditPage,{"key":key});

  }
}
