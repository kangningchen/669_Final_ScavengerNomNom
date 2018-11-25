// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from "../../models/post";
import { PostManager } from '../../models/postManager';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
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

  constructor() {
    console.log('Hello PostDataProvider Provider');

    this.postManager = new PostManager();

    this.postObservable = Observable.create(observer => {
      this.postObserver = observer;
    });

  }

  public getPostList(): Post[] {
    let postList = this.postManager.getPostList();
    return postList;
  }

  public getPostObservable(): Observable<Post[]> {
    return this.postObservable;
  }

  private notifySubscribers(): void {
    let postList = this.postManager.getPostList();
    this.postObserver.next(postList);
  }

  public addPost(title: string, location: string, timestamp: Date, expirationDate: Date, description: string, images: string[]): void {
    this.postManager.addPost(title, location, timestamp, expirationDate, description, images);
    this.notifySubscribers();
  }

}
