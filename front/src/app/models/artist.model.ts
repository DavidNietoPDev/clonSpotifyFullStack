// export interface Artist {
//     artistSearch:  ArtistSearch;
//     artistInfo:    ArtistInfo;
//     artistSimilar: ArtistSimilar[];
//     topTracks:     TopTrack[];
//     topAlbums:     TopAlbum[];
//     imagUrl:       string;
// }

// export interface ArtistInfo {
//     artist: ArtistInfoArtist;
// }

// export interface ArtistInfoArtist {
//     name:       string;
//     mbid:       string;
//     url:        string;
//     image:      Image[];
//     streamable: string;
//     ontour:     string;
//     stats:      Stats;
//     similar:    Similar;
//     tags:       Tags;
//     bio:        Bio;
// }

// export interface Bio {
//     links:     Links;
//     published: string;
//     summary:   string;
//     content:   string;
// }

// export interface Links {
//     link: Link;
// }

// export interface Link {
//     "#text": string;
//     rel:     string;
//     href:    string;
// }

// export interface Image {
//     "#text": string;
//     size:    Size;
// }

// export enum Size {
//     Empty = "",
//     Extralarge = "extralarge",
//     Large = "large",
//     Medium = "medium",
//     Mega = "mega",
//     Small = "small",
// }

// export interface Similar {
//     artist: SimilarArtist[];
// }

// export interface SimilarArtist {
//     name:  string;
//     url:   string;
//     image: Image[];
// }

// export interface Stats {
//     listeners: string;
//     playcount: string;
// }

// export interface Tags {
//     tag: Tag[];
// }

// export interface Tag {
//     name: string;
//     url:  string;
// }

// export interface ArtistSearch {
//     results: Results;
// }

// export interface Results {
//     "opensearch:Query":        OpensearchQuery;
//     "opensearch:totalResults": string;
//     "opensearch:startIndex":   string;
//     "opensearch:itemsPerPage": string;
//     artistmatches:             Artistmatches;
//     "@attr":                   ResultsAttr;
// }

// export interface ResultsAttr {
//     for: string;
// }

// export interface Artistmatches {
//     artist: ArtistmatchesArtist[];
// }

// export interface ArtistmatchesArtist {
//     name:       string;
//     listeners:  string;
//     mbid:       string;
//     url:        string;
//     streamable: string;
//     image:      Image[];
// }

// export interface OpensearchQuery {
//     "#text":     string;
//     role:        string;
//     searchTerms: string;
//     startPage:   string;
// }

// export interface ArtistSimilar {
//     name:          string;
//     mbid:          string;
//     match:         string;
//     url:           string;
//     image:         Image[];
//     streamable:    string;
//     imagesSimilar: string[];
// }

// export interface TopAlbum {
//     name:         string;
//     playcount:    number;
//     mbid?:        string;
//     url:          string;
//     artist:       TopAlbumArtist;
//     image:        Image[];
//     imagesAlbums: string[];
// }
// export interface TopAlbumArtist {
//     name: string;
//     mbid: string;
//     url:  string;
// }


// export interface TopTrack {
//     name:       string;
//     playcount:  string;
//     listeners:  string;
//     mbid:       string;
//     url:        string;
//     streamable: string;
//     artist:     TopTrackArtist;
//     image:      Image[];
//     "@attr":    TopTrackAttr;
//     images:     string[];
// }

// export interface TopTrackAttr {
//     rank: string;
// }

// export interface TopTrackArtist {
//     name: string;
//     mbid: string;
//     url:  string;
// }


export interface All {
    albums:    Albums;
    artists:   Artists;
    tracks:    Tracks;
    playlists: Playlists;
}

export interface Albums {
    href:     string;
    items:    AlbumElement[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
}

export interface AlbumElement {
    album_type:             AlbumTypeEnum;
    artists:                Owner[];
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
    Single = "single",
}

export interface Owner {
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    name?:         string;
    type:          OwnerType;
    uri:           string;
    display_name?: string;
}

export interface ExternalUrls {
    spotify: string;
}

export enum OwnerType {
    Artist = "artist",
    User = "user",
}

export interface Image {
    height: number | null;
    url:    string;
    width:  number | null;
}

export enum ReleaseDatePrecision {
    Day = "day",
    Year = "year",
}

export interface Artists {
    href:     string;
    items:    ArtistsItem[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
}

export interface ArtistsItem {
    external_urls: ExternalUrls;
    followers:     Followers;
    genres:        string[];
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    popularity:    number;
    type:          OwnerType;
    uri:           string;
}

export interface Followers {
    href:  null | string;
    total: number;
}

export interface Playlists {
    href:     string;
    items:    PlaylistsItem[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
}

export interface PlaylistsItem {
    collaborative: boolean;
    description:   string;
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    owner:         Owner;
    primary_color: null;
    public:        null;
    snapshot_id:   string;
    tracks:        Followers;
    type:          PurpleType;
    uri:           string;
}

export enum PurpleType {
    Playlist = "playlist",
}

export interface Tracks {
    href:     string;
    items:    TracksItem[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
}

export interface TracksItem {
    album:             AlbumElement;
    artists:           Owner[];
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
    preview_url:       null | string;
    track_number:      number;
    type:              FluffyType;
    uri:               string;
}

export interface ExternalIDS {
    isrc: string;
}

export enum FluffyType {
    Track = "track",
}
