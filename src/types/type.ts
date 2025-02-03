export  type User = {
    username : string,
    images: {
        jpg: {
          image_url: string;
        };
      },
    gender?:string,
    last_online:string
}

export type userTableProps = {
    onselect: (user: User) => void;
}

export type friend = {
    user: {
        username: string;
        images: {
            jpg: { image_url: string };
        };
    };
    last_online: string;
    friends_since?: string;
};


export type userDetailProp = {
    user: User,
    backbutton: () => void
}