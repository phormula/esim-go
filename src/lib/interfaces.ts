export interface Bundle {
  name: string;
  description: string;
  countries: Country[];
  dataAmount: number;
  duration: number;
  speed: string[];
  autostart: boolean;
  roamingEnabled: BundleCountry[];
  imageUrl: string;
  price: number;
  groups: string[];
}

export interface Country {
  name: string;
  region: string;
  iso: string;
}

export interface BundleCountry {
  country: Country;
  networks: Network[];
}

interface Network {
  name: string;
  brandName: string;
  speeds: string[];
}
