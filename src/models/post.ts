export class Post {

    location: any; 
    timestamp: Date;
    expiration: Date;
    description: string;
    images: string[];

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
        this.images = images;
    }

}