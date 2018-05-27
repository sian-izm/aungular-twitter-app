// TOOD: Fix class name to Tweet
// First, I thought to define two class: SearchTweet and UserTimeline.
// Because those twitter api's pathes are respective.
export class SearchTweet {
  constructor(
    public fullname: string,
    public href: number,
    public date: string,
    public hashtags: any,
    public likes: number,
    public retweets: number,
    public text: string,
    public id: number,
  ) { }
}
