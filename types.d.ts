export interface Video {
    caption: string;
    topic: string;
    video: {
      asset: {
        _id: string;
        url: string;
      };
    };
    _id: string;
    postedBy: {
      _id: string;
      userName: string;
      image: string;
      followers: IUser[];
    };
    likes: {
      postedBy: {
        _id: string;
        userName: string;
        image: string;
      };
    }[];
    comments: {
      comment: string;
      _key: string;
      postedBy: {
        _ref: string;
      };
    }[];
    views: {
      postedBy: {
        _id: string;
        userName: string;
        image: string;
      };
    }[];
    userId: string;
  }
  
  export interface IUser {
    _ref: any;
    _id: string;
    _type: string;
    userName: string;
    image: string;
    followers: IUser[];
  }