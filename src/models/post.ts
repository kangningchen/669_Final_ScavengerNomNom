export class Post {

    location: any; 
    timestamp: any;
    expiration: any;
    description: string;
    image: string;

    public constructor (private id: number,
                        private title: string) {

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

    public getPostTimestamp(): any {
        return this.timestamp;
    }

    public getExpiration(): any {
        return this.expiration;
    }

    public setExpiration(expiration: any): void {
        this.expiration = expiration;
    }

    public getPostDescription(): string {
        return this.description;
    }

    public setPostDescription(description: string): void {
        this.description = description;
    }

    public getPostImage(): string {
        return this.image;
    }

    public setPostImage(image: string): void {
        this.image = image;
    }

}