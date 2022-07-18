import { IdVehicle } from '../typesKeyword';
import { StandarNames } from '../placeHolderAutocomplete';
import { TipoVehiculos, EstadosConductor, ColorHexEstadoConductor } from '../enum/enumEstados';

export class ContadorVehiculo {
  cantidad?: number;
  vehicleTypeId?: TipoVehiculos;
}

export class MovilesxVehiculo {
  estadoConductor?: StandarNames;
  // idEstadoConductor: number;
  colorEstadoConductor?: ColorHexEstadoConductor;
  cantidad?: number;
  movilesxVehiculo?: ContadorVehiculo[];
}

export function fnInitLstMovilesxVehiculo(): MovilesxVehiculo[]{
  return [
    {estadoConductor: StandarNames.tittle_Libre , colorEstadoConductor: ColorHexEstadoConductor.LIBRE,cantidad: 0,
      movilesxVehiculo:[{cantidad: 0, vehicleTypeId: TipoVehiculos.VAN},
        {cantidad: 0, vehicleTypeId: TipoVehiculos.SEDAN},
        {cantidad: 0, vehicleTypeId: TipoVehiculos.MOTO}]
    },
    // {estadoConductor: StandarNames.tittle_EnServicio , idEstadoConductor: EstadosConductor.ENSERVICIO,  colorEstadoConductor: ColorHexEstadoConductor.ENSERVICIO,cantidad: 0,
    //   movilesxVehiculo:[{cantidad: 0, vehicleTypeId: TipoVehiculos.VAN},
    //     {cantidad: 0, vehicleTypeId: TipoVehiculos.SEDAN},
    //     {cantidad: 0, vehicleTypeId: TipoVehiculos.MOTO}]
    // },
    {estadoConductor: StandarNames.tittle_Ocupado , colorEstadoConductor: ColorHexEstadoConductor.OCUPADO,cantidad: 0,
      movilesxVehiculo:[{cantidad: 0, vehicleTypeId: TipoVehiculos.VAN},
        {cantidad: 0, vehicleTypeId: TipoVehiculos.SEDAN},
        {cantidad: 0, vehicleTypeId: TipoVehiculos.MOTO}]
    },
    // {estadoConductor: StandarNames.tittle_FinJornada , idEstadoConductor: EstadosConductor.DESCONECTADO,  colorEstadoConductor: ColorHexEstadoConductor.DESCONECTADO,cantidad: 0,
    //   movilesxVehiculo:[{cantidad: 0, vehicleTypeId: TipoVehiculos.VAN},
    //     {cantidad: 0, vehicleTypeId: TipoVehiculos.SEDAN},
    //     {cantidad: 0, vehicleTypeId: TipoVehiculos.MOTO}]
    // },
    {estadoConductor: StandarNames.tittle_Asignado , colorEstadoConductor: ColorHexEstadoConductor.ASSIGNED,cantidad: 0,
      movilesxVehiculo:[{cantidad: 0, vehicleTypeId: TipoVehiculos.VAN},
        {cantidad: 0, vehicleTypeId: TipoVehiculos.SEDAN},
        {cantidad: 0, vehicleTypeId: TipoVehiculos.MOTO}]
    },
    {estadoConductor: StandarNames.tittle_Abordo , colorEstadoConductor: ColorHexEstadoConductor.BOARD,cantidad: 0,
      movilesxVehiculo:[{cantidad: 0, vehicleTypeId: TipoVehiculos.VAN},
        {cantidad: 0, vehicleTypeId: TipoVehiculos.SEDAN},
        {cantidad: 0, vehicleTypeId: TipoVehiculos.MOTO}]
    }
  ];
}