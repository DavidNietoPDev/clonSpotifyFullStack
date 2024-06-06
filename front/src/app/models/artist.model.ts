

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
