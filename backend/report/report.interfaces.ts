export interface Friendly {
  id: string | number;
  fights: any;
  server: any;
}

export interface ReportResponse {
  enemies: object[];
  enemyPets: object[];
  exportedCharcters: any; // didn't actually see this on a response
  fights: object[];
  friendlies: Friendly[];
  friendlyPets: object[];
  gameVersion: number;
  lang: string;
  logVersion: number;
  owner: string;
  phases: any[];
  refresh?: boolean;
  title: string;
}


export interface Raid {
  [key: string]: Friendly
}
