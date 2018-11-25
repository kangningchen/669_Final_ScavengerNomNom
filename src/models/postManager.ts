import { Post } from './post';

export class PostManager {
  
  private posts: Object = {};
 
  public constructor () {

  }

  public initFromFirebase(snapshot): void {
    snapshot.forEach( childSnapshot => {
      let post = new Post (childSnapshot.val().id, childSnapshot.val().title, childSnapshot.val().location, childSnapshot.val().timestamp, childSnapshot.val().expiration, childSnapshot.val().description, childSnapshot.val().images);
      this.posts[childSnapshot.val().id] = post;
    });
  }

  private getNextPostId(): number {
    let maxId = -1;
    for (let k in this.posts) {
      let postId = this.posts[k].getPostId();
      if ( postId > maxId) {
        maxId = postId;
      }
    }
    return ++maxId;
  }

  public getPosts(): Object {
    return this.posts;
  }

  public getPostList(): Post[] {
    let postList: Post[] = [];
    for (let k in this.posts) {
      postList.push(this.posts[k]);
    }
    return postList;
  }

  public getPostById(id: number): Post {
    return this.posts[id];
  }

  public addPost(title: string,
                location: any = null,
                timestamp: string = "",
                expiration: string = "",
                description: string = "",
                images: string[]= new Array<string>()): Post {
    let id = this.getNextPostId();
    let post = new Post (id, title, location, timestamp, expiration, description, images);
    this.posts[id] = post;
    return post;
  }

  public removePost(post: Post): void {
    delete this.posts[post.getPostId()];
  }

  public removePostById(id: number): void {
    delete this.posts[id];
  }

}