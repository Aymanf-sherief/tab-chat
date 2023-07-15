export type User = {
  id: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
};

export type UserMap = { [id: string]: User };
