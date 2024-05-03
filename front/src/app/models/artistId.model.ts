export interface ArtistID {
    artistInfo:     ArtistInfoElement;
    albums:         Albums;
    relatedArtists: RelatedArtists;
    topTracks:      TopTracks;
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
    album_group?:           AlbumGroup;
    album_type:             AlbumGroup;
    artists:                ItemArtist[];
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           string;
    release_date_precision: ReleaseDatePrecision;
    total_tracks:           number;
    type:                   AlbumGroup;
    uri:                    string;
}

export enum AlbumGroup {
    Album = "album",
    Single = "single",
}

export interface ItemArtist {
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
}

export interface ArtistInfoElement {
    external_urls: ExternalUrls;
    followers:     Followers;
    genres:        string[];
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    popularity:    number;
    type:          ArtistType;
    uri:           string;
}

export interface Followers {
    href:  null;
    total: number;
}

export interface RelatedArtists {
    artists: ArtistInfoElement[];
}

export interface TopTracks {
    tracks: Track[];
}

export interface Track {
    album:             Item;
    artists:           ItemArtist[];
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
    type:              TrackType;
    uri:               string;
}

export interface ExternalIDS {
    isrc: string;
}

export enum TrackType {
    Track = "track",
}
