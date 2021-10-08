export interface Specialty {
    specialty_id: number;
    name: string;
}

export interface Doctor {
    id: number;
    display_name?: string;
    avatar?: string;
    language?: string | string[];
    clinic_name?: string;
    clinic_address?: string;
    rating?: number;
    distance?: number;
    specialty: Specialty[];

    [key: string]: any;
}