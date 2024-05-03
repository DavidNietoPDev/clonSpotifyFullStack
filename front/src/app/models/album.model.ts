// export interface Album {
//     name:      string;
//     playcount: number;
//     url:       string;
//     artist:    Artist;
//     image:     Image[];
//     images:    string[];
//     mbid?:     string;
// }

// export interface Artist {
//     name: Name;
//     mbid: string;
//     url:  string;
// }

// export enum Name {
//     Extremoduro = "Extremoduro",
// }

// export interface Image {
//     "#text": string;
//     size:    Size;
// }

// export enum Size {
//     Extralarge = "extralarge",
//     Large = "large",
//     Medium = "medium",
//     Small = "small",
// }




export interface Album {
    albums: Albums;
}

export interface Albums {
    href:     string;
    items:    Item[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
}

export interface Item {
    album_type:             AlbumTypeEnum;
    artists:                Artist[];
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           string;
    release_date_precision: ReleaseDatePrecision;
    total_tracks:           number;
    type:                   AlbumTypeEnum;
    uri:                    string;
}

export enum AlbumTypeEnum {
    Album = "album",
    Compilation = "compilation",
    Single = "single",
}

export interface Artist {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name:          string;
    type:          ArtistType;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
}

export enum ArtistType {
    Artist = "artist",
}

export interface Image {
    height: number;
    url:    string;
    width:  number;
}

export enum ReleaseDatePrecision {
    Day = "day",
    Year = "year",
}
