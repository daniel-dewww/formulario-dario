import { CostCenter } from './company.class';
export interface Product {
    id?: string;
    areaid?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
    costCenter?: CostCenter[];
}

