export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TUser = {
  userId: string;
  username: string;
  password: string;
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
