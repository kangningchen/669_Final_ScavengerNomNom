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
                          childSnapshot.val().image,
                          childSnapshot.val().userId);
      // console.log('CommentSnap', childSnapshot.val().comments)
      // post.initComments(childSnapshot.val().comments);
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

  public getPostByUserId(userId: string): Post[] {
    let userPostList: Post[] = [];
    console.log(userId);
    for (let k in this.posts){
        if (this.posts[k]["userId"]==userId){
          userPostList.push(this.posts[k]);
        }
      }

    return userPostList;
  }

  public addPost(key: string,
                title: string,
                location: any = null,
                timestamp: string = "",
                expiration: string,
                description: string = "",
                image: string = "",
                userId: string= ""): Post {
    let post = new Post (key, title, location, timestamp, expiration, description, image, userId);
    this.posts[key] = post;
    console.log('hey', post);
    return post;
  }

  public removePost(post: Post): void {
    delete this.posts[post.getPostKey()];
  }

  public removePostByKey(key: string): void {
    delete this.posts[key];
  }


  // public updatePost(){}

}
