// models/User.d.ts
export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address?: { // Les champs optionnels sont marqués avec ?
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo?: {
            lat: string;
            lng: string;
        };
    };
    phone?: string;
    website?: string;
    company?: {
        name: string;
        catchPhrase?: string;
        bs?: string;
    };
};