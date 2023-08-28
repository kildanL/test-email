export type TUser = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: TAddress;
};

export type TAddress = {
    street: string;
    suite: string;
    city: string;
};
