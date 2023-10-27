export interface IContact {
    id: string;
    name: string,
    phone?: string;
    age?: number;
    email?: string;
}

export interface IContactCardProps {
    contact: IContact;
    onEdit: (contact: IContact) => void;
    onDelete: (id: string) => void;
    showActions: boolean;
}

export interface IContactListProps {
    contacts: IContact[];
    dispatch: React.Dispatch<any>;
    showActions: boolean;
}

export interface IContactFormProps {
    onContactAdd: (newContact: IContact) => void;
}

export interface IContactEditProps {
    contact: IContact;
    onSave: (contact: IContact) => void;
    onCancel: () => void; 
    dispatch: React.Dispatch<{ type: string; payload: any }>;
}

export interface IContactDeleteProps {
    contact: IContact;
    onDelete: (contact: IContact) => void;
    onCancel: () => void; 
}

export interface INavProps {
    contacts: IContact[];
    dispatch: React.Dispatch<{ type: string; payload: any }>;
}
