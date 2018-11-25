import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Post } from '../../models/post';
// import { PostManager } from '../../models/postManager';
import { PostDetailPage } from '../post-detail/post-detail';
import { PostDataProvider } from "../../providers/post-data/post-data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private postList: Post[];

  constructor(public navCtrl: NavController, private postDataService: PostDataProvider) {
    this.postDataService.getPostObservable().subscribe( postList => {
      this.postList = postList;
    });
    this.postList = this.postDataService.getPostList();
  }

  ngOnInit() {
    this.postList = this.postDataService.getPostList();
  }

  addPost() {
    this.navCtrl.push(PostDetailPage);
  }

}
