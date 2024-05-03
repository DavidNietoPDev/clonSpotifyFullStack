// export interface Tracks {
//     name:       string;
//     playcount:  string;
//     listeners:  string;
//     mbid?:      string;
//     url:        string;
//     streamable: string;
//     artist:     Artist;
//     image:      Image[];
//     "@attr":    Attr;
//     images:     string[];
// }

// export interface Attr {
//     rank: string;
// }

// export interface Artist {
//     name: string;
//     mbid: string;
//     url:  string;
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


export interface Track {
    tracks: Tracks;
}

export interface Tracks {
    href:     string;
    items:    Item[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
}

export interface Item {
    album:             Album;
    artists:           Artist[];
    available_markets: string[];
    disc_number:       number;
    duration_ms:       number;
    explicit:          boolean;
    external_ids:      ExternalIDS;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    is_local:          boolean;
    name:              string;
    popularity:        number;
    preview_url:       string;
    track_number:      number;
    type:              ItemType;
    uri:               string;
}

export interface Album {
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
    type:          ItemType;
    uri:           string;
}

export interface ExternalUrls {
    spotify: string;
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

export interface ExternalIDS {
    isrc: string;
}

export enum ItemType {
    Track = "track",
}

