export interface IChatListItemProps {
  title: string;
}

export interface IRegisterUserValues {
  displayName: string;
  email: string;
  password: string;
  file?: File;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ICurrentUser {
  email: string | null;
  uid: string | null;
  displayName: string | null;
  photo: string | null;
  // accessToken: string | null;
  refreshToken: string | null;
}
