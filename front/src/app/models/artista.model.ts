// export interface Artista {
//     artistas: ArtistaElement[];
// }

// export interface ArtistaElement {
//     name:        string;
//     listeners:   string;
//     mbid:        string;
//     url:         string;
//     streamable:  string;
//     image:       Image[];
//     imageArtist: string[];
// }

// export interface Image {
//     "#text": string;
//     size:    Size;
// }

// export enum Size {
//     Extralarge = "extralarge",
//     Large = "large",
//     Medium = "medium",
//     Mega = "mega",
//     Small = "small",
// }

export interface Artista {
    artists: Artists;
}

export interface Artists {
    href:     string;
    items:    Item[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
}

export interface Item {
    external_urls: ExternalUrls;
    followers:     Followers;
    genres:        string[];
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    popularity:    number;
    type:          Type;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href:  null;
    total: number;
}

export interface Image {
    height: number;
    url:    string;
    width:  number;
}

export enum Type {
    Artist = "artist",
}
