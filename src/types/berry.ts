export interface Firmness {
    name:  'very-soft' | 'soft' | 'hard' | 'very-hard' | 'super-hard';
    url: string;
}

export interface Flavor {
    flavor: {
        name: string;
        url: string;
    };
    potency: number;
}

export interface Item {
    name: string;
    url: string;
}

export interface NaturalGiftType {
    name: string;
    url: string;
}

export interface Berry {
    id: number;
    name: string;
    growth_time: number;
    max_harvest: number;
    natural_gift_power: number;
    size: number;
    smoothness: number;
    soil_dryness: number;
    firmness: Firmness;
    flavors: Flavor[];
    item: Item;
    natural_gift_type: NaturalGiftType;
}
