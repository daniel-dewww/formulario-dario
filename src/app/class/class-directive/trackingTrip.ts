export class TrackingViaje {
    coordinatesEncoded?: CoordinateEncoded[];
    events?: Events[];
}

export class CoordinateEncoded {
    coordinateEncoded?: string;
    color?: string;
}

export class Coordinate {
    latitude?: number;
    longitude?: number;
}

export class Detail {
    bearing?: number;
    datetime?: string;
    destinationUuid?: string;
    signal?: number;
    speed?: number;
}

export class Events {
    coordinate?: Coordinate;
    detail?: Detail;
    type?: string;
}

export class TrackingDriver {
    coordinatesEncoded?: CoordinateEncoded;
    events?: Events[];
}