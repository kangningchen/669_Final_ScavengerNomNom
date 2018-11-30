export class Comment {
  private key: string;
  private userId: string;
  private username: string;
  private avatar: string;
  private timestamp: string;
  private text: string
 
  public constructor ( key: string,
                       userId: string,
                       username: string,
                       avatar: string,
                       timestamp: string,
                       text:string) {
    this.key = key;
    this.userId = userId;
    this.username = username;
    this.avatar = avatar;
    this.timestamp = timestamp;
    this.text = text;
  }


  public getCommentKey(): string {
    return this.key;
  }

  public getCommentUserId(): string {
    return this.userId;
  }

  public getCommentUsername(): string {
    return this.username;
  }

  public getCommentAvatar(): string {
    return this.avatar;
  }

  public getCommentTimestamp(): string {
    return this.timestamp;
  }

  public getCommentText(): string {
    return this.text;
  }
  
}