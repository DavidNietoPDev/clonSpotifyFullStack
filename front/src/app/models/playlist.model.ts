export interface PlayList {
    collaborative: boolean;
    description:   string;
    external_urls: PlayListExternalUrls;
    followers:     Followers;
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    owner:         Owner;
    primary_color: null;
    public:        boolean;
    snapshot_id:   string;
    tracks:        Tracks;
    type:          string;
    uri:           string;
}

export interface PlayListExternalUrls {
}

export interface Followers {
    href:  null;
    total: number;
}

export interface Image {
    height: number | null;
    url:    string;
    width:  number | null;
}

export interface Owner {
    display_name?: string;
    external_urls: OwnerExternalUrls;
    href:          string;
    id:            string;
    type:          OwnerType;
    uri:           string;
    name?:         string;
}

export interface OwnerExternalUrls {
    spotify: string;
}

export enum OwnerType {
    Artist = "artist",
    User = "user",
}

export interface Tracks {
    href:     string;
    items:    Track[];
    limit:    number;
    next:     null;
    offset:   number;
    previous: null;
    total:    number;
}

export interface Track {
    added_at:        Date;
    added_by:        Owner;
    is_local:        boolean;
    primary_color:   null;
    track:           Item | null;
    video_thumbnail: VideoThumbnail;
}

export interface Item {
    preview_url:       null | string;
    available_markets: string[];
    explicit:          boolean;
    type:              TrackType;
    episode:           boolean;
    track:             boolean;
    album:             Album;
    artists:           Owner[];
    disc_number:       number;
    track_number:      number;
    duration_ms:       number;
    external_ids:      ExternalIDS;
    external_urls:     OwnerExternalUrls;
    href:              string;
    id:                string;
    name:              string;
    popularity:        number;
    uri:               string;
    is_local:          boolean;
}

export interface Album {
    available_markets:      string[];
    type:                   AlbumTypeEnum;
    album_type:             AlbumTypeEnum;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           Date;
    release_date_precision: ReleaseDatePrecision;
    uri:                    string;
    artists:                Owner[];
    external_urls:          OwnerExternalUrls;
    total_tracks:           number;
}

export enum AlbumTypeEnum {
    Album = "album",
    Compilation = "compilation",
    Single = "single",
}

export enum ReleaseDatePrecision {
    Day = "day",
}

export interface ExternalIDS {
    isrc: string;
}

export enum TrackType {
    Track = "track",
}

export interface VideoThumbnail {
    url: null;
}
