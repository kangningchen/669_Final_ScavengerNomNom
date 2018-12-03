import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PostDataProvider } from "../../providers/post-data/post-data";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { Camera, CameraOptions } from '@ionic-native/camera';


const PLACEHOLDER_IMAGE: string = "../../assets/imgs/placeholder.png";
declare var google;
/**
 * Generated class for the PostDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {

  private title: string = "";
  private description: string = "";
  private location: any = "";
  private expiration: string = "";
  private image: string;
  private userId: string="";
  private userName: string = "";
  private user: any;
  private comments: Object= {};
  private postLocationText = "";
  private postLocationCoord:object = {};

  // google map api
  private GoogleAutocomplete:any;
  private autocompleteInput = "";
  private geocoder: any;
  private autocompleteItems: Array<object>;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private postDataService: PostDataProvider,
              private userDataService:UserDataProvider,
              private camera: Camera) {
    this.userDataService.getObservable().subscribe( user => {
      this.user = user;
    });
    this.userId = this.userDataService.getUserId();
    this.userName = this.userDataService.getUserName();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;
    this.autocompleteInput = "";
    this.autocompleteItems = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostDetailPage');
  }

  private publish() {
    console.log(this.userId);
    let timestamp = new Date().toISOString();
    this.postDataService.addPost(this.title, this.location, timestamp, this.expiration, this.description, this.image, this.userId, this.userName, this.comments);
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
        this.image = 'data:image/jpeg;base64,' + imageData;
      }
     }, (err) => {
       this.image = PLACEHOLDER_IMAGE;
       console.log(err);
     });
  }



  private updateSearchResults(): void {
    console.log(this.autocompleteInput);
    // From: https://ionicthemes.com/tutorials/about/ionic-2-google-maps-google-places-geolocation
    if (this.autocompleteInput == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocompleteInput },
    (predictions, status) => {
      this.autocompleteItems = [];

      predictions.forEach((prediction) => {
        this.autocompleteItems.push(prediction);
      });
    });
  }

  private selectPlace(place: any):void {
    this.autocompleteItems = [];
    this.geocoder.geocode({'placeId': place.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        console.log(results[0]);
        this.location = {
          description: place.description,
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
        this.autocompleteInput = place.description;
      }
    });

  }
  private clearImage(): void {
    this.image = "";
  }

}
