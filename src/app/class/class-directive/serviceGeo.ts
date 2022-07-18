import { CoordenadasLatLng } from '../typesKeyword';
import { GenericObject } from '../genericObject';
import { Favorite } from '../favorite';

export class ResponseGeoAutocomplete {
  containsCoordinate?: boolean;
  coordinate?: Coordinate;
  mainText?: string;
  provider?: string;
  referenceId?: string;
  secondaryText?: string;
  zone?: GenericObject; // id + description
  
  
  favorito?: boolean; 
  favoritoJson?: Favorite; 
}


export class Coordinate {
  latitude?: CoordenadasLatLng;
  longitude?: CoordenadasLatLng
}

export class RequestGeoAutocomplete {
  key_word?: string;
  longitude?: CoordenadasLatLng;
  latitude?: CoordenadasLatLng
}

export class RequestGeoReferenceId {
  provider?: string;
  referenceId?: string;
}

export class CoordinateAutocomplete {
  mainText?: string;
  secondaryText?: string;
  latitude?: CoordenadasLatLng;
  longitude?: CoordenadasLatLng;
  zone?: GenericObject; // id + description;
}


export class RequestDriverTracking {
  driver_uuid?: string;
  date_start?: string;
  date_finish?: string
}

