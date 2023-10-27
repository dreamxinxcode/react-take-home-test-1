export interface IContact {
    id: string;
    name: string,
    phone?: string;
    age?: number;
    email?: string;
}

export interface IContactCardProps {
    contact: IContact;
}

export interface IContactListProps {
    contacts: IContact[];
}

