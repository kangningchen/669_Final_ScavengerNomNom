import { Component } from '@angular/core';
import { NavController, Checkbox } from 'ionic-angular';
import { Post } from '../../models/post';
// import { PostManager } from '../../models/postManager';
import { PostDetailPage } from '../post-detail/post-detail';
import { EditPage } from '../edit/edit';
import { ViewDetailPage } from '../view-detail/view-detail';
import { PostDataProvider } from "../../providers/post-data/post-data";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { TabsPage } from '../tabs/tabs';
import { LocationDataProvider } from "../../providers/location-data/location-data";
import { Geoposition } from '@ionic-native/geolocation'; 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  private postList: Post[];
  private userPostList: Post[];
  private user: any;
  private userId:string;
  private filteredList: Post[];
  public aColor: string = "#f9f9f9";
  private currentLat: number;
  private currentLon: number;

  constructor(public navCtrl: NavController,
    private postDataService: PostDataProvider,
    private userDataService: UserDataProvider,
    private locationDataService: LocationDataProvider) {
    this.postDataService.getPostObservable().subscribe( postList => {
      this.postList = postList;
      this.postList.sort(function(a,b){
        return new Date(Date.parse(b.getPostTimestamp())).getTime() - new Date(Date.parse(a.getPostTimestamp())).getTime();})
      this.filteredList = this.postList;
    });
    this.postDataService.getUserPostListObservable().subscribe( userPostList => {
      this.userPostList = userPostList });
    this.postList = this.postDataService.getPostList();
    this.userId = this.userDataService.getUserId();
    this.filteredList = this.postList;
    this.locationDataService.getObservable().subscribe(newLocation => {
      this.currentLat = newLocation.coords.latitude;
      this.currentLon = newLocation.coords.longitude;
      for (var i = 0; i < this.filteredList.length; i++){
        let distance = this.filteredList[i].getLocation().calculateDistance(this.currentLat, this.currentLon);
        this.filteredList[i].setDistance(distance);
      }
      console.log(this.filteredList);
    });
  }

  ngOnInit() {
    this.postList = this.postDataService.getPostList();
    this.userId = this.userDataService.getUserId();

  }
  ionViewDidLoad(){
    this.sortPost(null);
  }
  addPost() {
    this.navCtrl.push(PostDetailPage);
  }

  editPost(key:string){
    this.navCtrl.push(EditPage,{"postKey":key});
  }

  viewPost(postKey: string) {
    this.navCtrl.push(ViewDetailPage, {"postKey": postKey});
  }

  sortPost(cbox:Checkbox){
    if (cbox == null || cbox.checked != true){
      this.filteredList.sort(function(a,b){
        return new Date(Date.parse(b.getPostTimestamp())).getTime() - new Date(Date.parse(a.getPostTimestamp())).getTime();
      });
    } else{
      this.filteredList.sort(function(a,b){
        // console.log(b.expiration)
        return new Date(Date.parse(b.getExpiration())).getTime() - new Date(Date.parse(a.getExpiration())).getTime();
      });
  }}

  filterPost(cbox:Checkbox){
    if (cbox.checked != true){
      this.filteredList = this.postList
    } else{
      this.filteredList = this.postList.filter((post) => {
        return Date.parse(post.getExpiration()) > Date.now();
      });
    }
  }



}
