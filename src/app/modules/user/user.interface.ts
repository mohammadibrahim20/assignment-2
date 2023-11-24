export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TUser = {
  userId: number;
  password: string;
  username: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: 'active' | 'deactivate';
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
};
