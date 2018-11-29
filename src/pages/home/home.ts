import { Component } from '@angular/core';
import { NavController, Checkbox } from 'ionic-angular';
import { Post } from '../../models/post';
// import { PostManager } from '../../models/postManager';
import { PostDetailPage } from '../post-detail/post-detail';
import { ViewDetailPage } from '../view-detail/view-detail';
import { PostDataProvider } from "../../providers/post-data/post-data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private postList: Post[];
  private filteredList: Post[];
  public aColor: string = "#f9f9f9";


  constructor(public navCtrl: NavController, private postDataService: PostDataProvider) {
    this.postDataService.getPostObservable().subscribe( postList => {
      this.postList = postList;
      this.filteredList = this.postList;
    });
    this.postList = this.postDataService.getPostList();
    this.filteredList = this.postList;
    
    
  }

  ngOnInit() {
    this.postList = this.postDataService.getPostList();
    
  }

  addPost() {
    this.navCtrl.push(PostDetailPage);
  }

  viewPost(postKey: string) {
    this.navCtrl.push(ViewDetailPage, {"postKey": postKey});
  }

  sortPost(cbox:Checkbox){
    if (cbox.checked != true){
      this.postList.sort(function(a,b){
        return new Date(Date.parse(a.timestamp)).getTime() - new Date(Date.parse(b.timestamp)).getTime();
      })}
      else{
    this.postList.sort(function(a,b){
      // console.log(b.expiration)
      return new Date(Date.parse(b.expiration)).getTime() - new Date(Date.parse(a.expiration)).getTime();
    })
  }}

  filterPost(cbox:Checkbox){
    if (cbox.checked != true){
      this.filteredList = this.postList
    }else{
    this.filteredList = this.postList.filter((post) => {
      return Date.parse(post.expiration) > Date.now();}
    );
}
}



}