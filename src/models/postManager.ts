import { Post } from './post';

export class postManager {
    
    private posts: Object = {};
 
    public constructor () {

    }

    private getNextPostId() {
        let maxId = 0;
        for (let k in this.posts) {
            let postId = this.posts[k].getPostId();
            if ( postId > maxId) {
                maxId = postId;
            }
        }
        return ++maxId;
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

    public addPost(title: string): Post {
        let id = this.getNextPostId();
        let post = new Post (id, title);
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