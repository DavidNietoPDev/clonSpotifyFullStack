export interface Categories {
    categories: CategoriesClass;
}

export interface CategoriesClass {
    href:     string;
    items:    Item[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
}

export interface Item {
    href:  string;
    id:    string;
    icons: Icon[];
    name:  string;
}

export interface Icon {
    height: number;
    url:    string;
    width:  number;
}
