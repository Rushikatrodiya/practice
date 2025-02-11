export type IUser = {
    username: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
    gender?: string;
    last_online: string;
  };
  export type Ifriend = {
    user: {
      username: string;
      images: {
        jpg: {
          image_url: string;
        };
      };
    };
    last_online: string;
    friends_since: string;
  };