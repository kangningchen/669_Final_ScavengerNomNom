// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from "../../models/post";
import { PostManager } from '../../models/postManager';
import { Comment } from '../../models/comment';
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
  private commentObservable: Observable<Comment[]>;
  private commentObserver: Observer<Object>;
  private db: any;


  constructor() {
    console.log('Hello PostDataProvider Provider');

    this.postManager = new PostManager();

    this.postObservable = Observable.create(observer => {
      this.postObserver = observer;
    });

    this.commentObservable = Observable.create(observer => {
      this.commentObserver = observer;
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

  public getCommentObservable(): Observable<Comment[]> {
    return this.commentObservable;
  }

  private notifySubscribers(): void {
    let postList = this.postManager.getPostList();
    this.postObserver.next(postList);
  }

  private notifyCommentSubscribers(postKey): void {
    let post = this.postManager.getPostByKey(postKey);
    let commentList = post.getCommentList();
    this.commentObserver.next(commentList);
  }

  public addPost(title: string, 
                 location: string, 
                 timestamp: string, 
                 expiration: string, 
                 description: string, 
                 image: string, 
                 userId:string,
                 comments: Object): void {

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

  public updatePost(postKey:string): void {
    let post = this.postManager.getPostByKey(postKey);
    let parentRef = this.db.ref('/posts');
    let childRef = parentRef.child(postKey);
    childRef.set({key: postKey,
                 title: post.getPostTitle(),
                 location: post.getLocation(),
                 timestamp: post.getPostTimestamp(),
                 expiration: post.getExpiration(),
                 description: post.getPostDescription(),
                 image: post.getPostImage(),
                 userId: post.getUserId(),
                 comments: post.getComments()
       });
    this.notifySubscribers();
  }

  public getCommentList(postKey: string) {
    let post = this.postManager.getPostByKey(postKey);
    let commentList = post.getCommentList();
    return commentList;
  }

  public addComment(postKey: string,
                    commentatorId: string,
                    commentatorUserName: string,
                    commentatorAvatar: string,
                    commentTimestamp: string,
                    commentText: string): void {
    let post = this.postManager.getPostByKey(postKey);
    let commentRef = this.db.ref('/posts/' + postKey + '/comments');
    let commentDataRef = commentRef.push();
    let commentKey = commentDataRef.getKey();
    post.addComment(commentKey, commentatorId, commentatorUserName, 
                    commentatorAvatar, commentTimestamp, commentText);
    console.log('added comment!!:', post.getComments())
    this.updatePost(postKey);
    this.notifyCommentSubscribers(postKey);
    this.notifySubscribers();
  }

}
