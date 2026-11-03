export const routes = [
  { id: 'R1', mode: 'Minibus Taxi', from: 'Soweto', to: 'Johannesburg CBD', fare: 24, status: 'Operating' },
  { id: 'R2', mode: 'Rea Vaya', from: 'Thokoza Park', to: 'Park Station', fare: 18, status: 'Delayed' },
  { id: 'R3', mode: 'Gautrain', from: 'Park Station', to: 'Sandton', fare: 38, status: 'Operating' },
  { id: 'R4', mode: 'Metrobus', from: 'Braamfontein', to: 'Rosebank', fare: 21, status: 'Operating' },
];
export const routeGroup = mode => mode === 'Minibus Taxi' ? 'Taxi' : mode === 'Gautrain' ? 'Rail' : 'Bus/BRT';
