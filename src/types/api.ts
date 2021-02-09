export interface IDelivery {
  id: number;
  latitude: number;
  longitude: number;
  address: string;
  customer_name: string;
  requires_signature?: boolean;
  special_instructions?: string;
}

export interface ITrack {
  delivery_id: number;
  tracking_data: ITrackData[];
}

export interface ITrackData {
  latitude: number;
  longitude: number;
  battery_level: number;
  timestamp: number;
}
