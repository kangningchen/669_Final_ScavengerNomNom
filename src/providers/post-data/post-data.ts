// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from "../../models/post";
import { PostManager } from '../../models/postManager';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import firebase from 'firebase';
/*
  Generated class for the PostDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostDataProvider {

  private postManager: PostManager;
  private postObservable: Observable<Post[]>;
  private postObserver: Observer<Object>;
  private db: any;


  constructor() {
    console.log('Hello PostDataProvider Provider');

    this.postManager = new PostManager();

    this.postObservable = Observable.create(observer => {
      this.postObserver = observer;
    });

    this.db = firebase.database();
    let postRef = this.db.ref('/posts');

    postRef.on('value', snapshot => {
      this.postManager.initFromFirebase(snapshot);
      this.notifySubscribers();
    });
  }


  public getPostList(): Post[] {
    let postList = this.postManager.getPostList();
    return postList;
  }

  public getPostByKey(key: string): Post {
    let post = this.postManager.getPostByKey(key);
    return post;
  }

  public getPostObservable(): Observable<Post[]> {
    return this.postObservable;
  }

  private notifySubscribers(): void {
    let postList = this.postManager.getPostList();
    this.postObserver.next(postList);
  }

  public addPost(title: string, location: string, timestamp: string, expiration: string, description: string, image: string, userId:string
  ): void {

    let postRef = this.db.ref('/posts');
    let postDataRef = postRef.push();
    let key = postDataRef.getKey();
    let post = this.postManager.addPost(key,
                                        title,
                                        location,
                                        timestamp,
                                        expiration,
                                        description,
                                        image,
                                        userId);
    postDataRef.set(post);
    this.notifySubscribers();
  }

  public getPost(key:string){
    return this.postManager.getPostByKey(key);
  }

  public removePost(post:any){
    this.postManager.removePost(post);
    this.notifySubscribers();
  }

  public updatePost(key:string, post: Post): void {
    let parentRef = this.db.ref('/posts');
    let childRef = parentRef.child(key);
    childRef.set({key:key,
                 title:post.getPostTitle(),
                 location:post.getLocation(),
                 timestamp:post.getPostTimestamp(),
                 expiration:post.getExpiration(),
                 description:post.getPostDescription(),
                 image:post.getPostImage(),
                 userId:post.getUserId()
       });
  }

}
