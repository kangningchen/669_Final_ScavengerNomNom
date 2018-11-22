export class Post {
  private id: number;
  private title: string;
  private location: any; 
  private timestamp: Date;
  private expiration: Date;
  private description: string;
  private images: string[];

  public constructor ( id: number,
                       title: string,
                       location: any,
                       timestamp: Date,
                       expiration: Date,
                       description: string,
                       images: string[]) {
    this.id = id;
    this.title = title;
    this.location = location;
    this.timestamp = timestamp;
    this.expiration = expiration;
    this.description = description;
    if (images.length > 0) {
        this.images = images.slice(0);
    } else {
        this.images = new Array<string>();
    }

  }

  public initFromJSON(json: Object) {

  }
  public getPostId(): number {
    return this.id;
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

  public getPostTimestamp(): Date {
    return this.timestamp;
  }

  public getExpiration(): Date {
    return this.expiration;
  }

  public setExpiration(expiration: Date): void {
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

}