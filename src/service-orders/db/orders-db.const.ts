export const DB_ORDERS = [
  {
    id: 1,
    number: '000025',
    description: 'Revisión de medidor de electricidad',
    observations:
      'Se revisa el medidor de electricidad para verificar su correcto funcionamiento',
    type: 1,
    status: 'Pending',
    priority: 'Low',
    assignedUser: 2,
    destination: {
      addresses: {
        streetName: 'Ayacucho',
        streetNumber: '661',
        floor: '',
        departamentNumber: 'UF 1',
        city: 'Puerto Madryn',
        zipCode: 'U9120',
        state: 'Chubut',
        country: 'Argentina',
      },
      coordinate: {
        latitude: -42.755148,
        longitude: -65.037148,
      },
      referenceInfo: 'Mi casa',
    },
    creationTime: '2023-02-01T10:00:00.000Z',
    assignedTime: null,
    estimatedResolutionTime: '2023-02-03T15:00:00.000Z',
    resolutionTime: null,
    customer: 1,
    serviceDetail: {
      tipo_orden_servicio: 'REVISION',
      servicio: 'Mantenimiento Linea Electrificación',
      tipo_medidor: null,
      nro_medidor: null,
      tipo_transformador: 'TP005',
      nro_transfrmador: '000212587455',
    },
  },
  {
    id: 2,
    number: '0000335',
    description: 'Reparacion del medidor de agua',
    observations: 'Se debe cambiar panel frontal',
    type: 1,
    status: 'Done',
    priority: 'Medium',
    assignedUser: 1,
    destination: {
      addresses: {
        streetName: 'Don Bosco Nte.',
        streetNumber: '458',
        floor: '',
        departamentNumber: '',
        city: 'Puerto Madryn',
        zipCode: 'U9120',
        state: 'Chubut',
        country: 'Argentina',
      },
      coordinate: {
        latitude: -42.75676025696008,
        longitude: -65.04381043881882,
      },
      referenceInfo: 'Comisaria Segunda',
    },
    creationTime: '2023-02-04',
    assignedTime: null,
    estimatedResolutionTime: '2023-02-05T18:25:43.511Z',
    resolutionTime: null,
    customer: 2,
    serviceDetail: {
      tipo_orden_servicio: 'REPARACION',
      servicio: 'Reparación servicio provisión de agua',
      tipo_medidor: 'MOD45125',
      nro_medidor: '451278963322',
      tipo_transformador: null,
      nro_transfrmador: null,
    },
  },
  {
    id: 3,
    number: '0004335',
    description: 'Revision de fuga',
    observations: 'Revisión de fuga de agua en válvula de entrada',
    type: 1,
    status: 'Canceled',
    priority: 'Low',
    assignedUser: 1,
    destination: {
      addresses: {
        streetName: 'José Podesta',
        streetNumber: '252',
        floor: '',
        departamentNumber: '',
        city: 'Puerto Madryn',
        zipCode: 'U9120',
        state: 'Chubut',
        country: 'Argentina',
      },
      coordinate: {
        latitude: -42.761390796283074,
        longitude: -65.04397119355941,
      },
      referenceInfo: '',
    },
    creationTime: '2023-02-05',
    assignedTime: null,
    estimatedResolutionTime: '2023-02-05T18:25:43.511Z',
    resolutionTime: null,
    customer: 2,
    serviceDetail: {
      tipo_orden_servicio: 'REVISION',
      servicio: 'Reparación servicio provisión de agua',
      tipo_medidor: 'MOD4512',
      nro_medidor: '4512789634587',
      tipo_transformador: null,
      nro_transfrmador: null,
    },
  },
];
