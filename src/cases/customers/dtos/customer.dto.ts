export interface stateDTO {
    id?: string;
    name: string;
    ibge: string;
    acronym: string;
}

export interface cityDTO {
    id?: string;
    name: string;
    ibge: string;
    state: stateDTO;
}
export interface CustomerDTO {
    id?: string;
    name: string;
    address?: string;
    zipcode?: string;
    city?: cityDTO;
}