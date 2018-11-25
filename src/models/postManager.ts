import { Post } from './post';

export class PostManager {
  
  private posts: Object = {};
 
  public constructor () {

  }

  public initFromFirebase(snapshot): void {
    snapshot.forEach( childSnapshot => {
      let post = new Post(childSnapshot.key,
                          childSnapshot.val().title,
                          childSnapshot.val().location, 
                          childSnapshot.val().timestamp, 
                          childSnapshot.val().expiration, 
                          childSnapshot.val().description, 
                          childSnapshot.val().images);
      this.posts[childSnapshot.key] = post;
    });
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

  public getPostByKey(key: string): Post {
    return this.posts[key];
  }

  public addPost(key: string,
                title: string,
                location: any = null,
                timestamp: string = "",
                expiration: string = "",
                description: string = "",
                images: string[]= new Array<string>()): Post {
    let post = new Post (key, title, location, timestamp, expiration, description, images);
    this.posts[key] = post;
    return post;
  }

  public removePost(post: Post): void {
    delete this.posts[post.getPostKey()];
  }

  public removePostByKey(key: string): void {
    delete this.posts[key];
  }

}