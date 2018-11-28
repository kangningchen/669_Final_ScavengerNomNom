export class Post {
  private key: string;
  private title: string;
  private location: any;
  private timestamp: string;
  private expiration: string;
  private description: string;
  private images: string[];
  private userId: string;


  public constructor ( key: string,
                       title: string,
                       location: any,
                       timestamp: string,
                       expiration: string,
                       description: string,
                       images: string[],
                       userId:string) {
    this.key = key;
    this.title = title;
    this.location = location;
    this.timestamp = timestamp;
    this.expiration = expiration;
    this.description = description;
    if (images.length > 0) {
        this.images = images.slice(0);
    } else {
        this.images = new Array<string>();
    };
    this.userId=userId
  }

  public initFromJSON(json: Object) {

  }

  public getPostKey(): string {
    return this.key;
  }

  public getPostTitle(): string {
    return this.title;
  }

  public setPostTitle(title: string): void {
    this.title = title;
  }

  public getLocation(): any {
    return this.location;
  }

  public setLocation(location: any): void {
    this.location = location;
  }

  public getPostTimestamp(): string {
    return this.timestamp;
  }

  public getExpiration(): string {
    return this.expiration;
  }

  public setExpiration(expiration: string): void {
    this.expiration = expiration;
  }

  public getPostDescription(): string {
    return this.description;
  }

  public setPostDescription(description: string): void {
    this.description = description;
  }

  public getPostImages(): string[] {
    return this.images;
  }

  public setPostImages(images: string[]): void {
    if (images.length > 0) {
      this.images = images.slice(0);
    } else {
      this.images = new Array<string>();
    }

  }
  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public getUserId(): string {
    return this.userId;
  }


}
