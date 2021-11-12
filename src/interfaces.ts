export interface  ModelInterface {
    name: string | null;
    dob: string | null;
    parent: {
        label: string;
        value: number;
    } | null;
    alive: boolean;
    dod: string | null;
    blood_group: string | null;
    address: string | null;
    temporary_address: string | null;
    employed: boolean;
    occupation: string | null;
    phones: string[];
    max_qualification: string | null;
    married: boolean;
    male: boolean;
    aadhar: string | null;
    email: string | null;
    spouse: {
        name: string | null;
        dob: string | null;
        alive: boolean;
        dod: string | null;
        blood_group: string | null;
        address: string | null;
        temporary_address: string | null;
        employed: boolean;
        occupation: string | null;
        phones: string[];
        max_qualification: string | null;
        married: boolean;
        male: boolean;
        aadhar: string | null;
        email: string | null;
        fathers_name: string | null;
        mothers_name: string | null;
    } | null;
}