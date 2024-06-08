


export interface TrackID {
    song:            Item;
    artists:         ArtistRelatedArtist[];
    artistsAlbums:   ArtistsAlbum[];
    artistTracks:    ArtistTrack[];
    artistRelated:   ArtistRelated[];
    recommendations: Recommendations;
    albumInfo:       AlbumInfo;
}

export interface AlbumInfo {
    album_type:             AlbumType;
    artists:                AlbumInfoArtist[];
    available_markets:      string[];
    copyrights:             Copyright[];
    external_ids:           AlbumInfoExternalIDS;
    external_urls:          ExternalUrls;
    genres:                 any[];
    href:                   string;
    id:                     string;
    images:                 Image[];
    label:                  string;
    name:                   string;
    popularity:             number;
    release_date:           string;
    release_date_precision: ReleaseDatePrecision;
    total_tracks:           number;
    tracks:                 Tracks;
    type:                   AlbumType;
    uri:                    string;
}

export enum AlbumType {
    Album = "ALBUM",
    AlbumTypeAlbum = "album",
    AlbumTypeSINGLE = "SINGLE",
    Single = "single",
}

export interface AlbumInfoArtist {
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

export interface Copyright {
    text: string;
    type: string;
}

export interface AlbumInfoExternalIDS {
    upc: string;
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

export interface Tracks {
    href:     string;
    items:    Item[];
    limit:    number;
    next:     null;
    offset:   number;
    previous: null;
    total:    number;
}

export interface Item {
    artists:           AlbumInfoArtist[];
    available_markets: string[];
    disc_number:       number;
    duration_ms:       number;
    explicit:          boolean;
    external_urls:     ExternalUrls;
    href:              string;
    id:                string;
    is_local:          boolean;
    name:              string;
    preview_url:       null | string;
    track_number:      number;
    type:              SongType;
    uri:               string;
    album?:            Album;
    external_ids?:     SongExternalIDS;
    popularity?:       number;
}

export interface Album {
    album_type:             AlbumType;
    artists:                AlbumInfoArtist[];
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           string;
    release_date_precision: ReleaseDatePrecision;
    total_tracks:           number;
    type:                   AlbumType;
    uri:                    string;
    album_group?:           AlbumType;
}

export interface SongExternalIDS {
    isrc: string;
}

export enum SongType {
    Track = "track",
}

export interface ArtistRelated {
    artists: ArtistRelatedArtist[];
}

export interface ArtistRelatedArtist {
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

export interface ArtistTrack {
    tracks: Item[];
}

export interface ArtistsAlbum {
    href:     string;
    items:    Album[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
}

export interface Recommendations {
    tracks: Item[];
    seeds:  Seed[];
}

export interface Seed {
    initialPoolSize:    number;
    afterFilteringSize: number;
    afterRelinkingSize: number;
    id:                 string;
    type:               string;
    href:               string;
}
