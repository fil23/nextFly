export type Place = {
  place: string;
  placeDescription: string;
  price: number;
};

export type TravelDay = {
  day: number;
  location: string;
  places: Place[];
  price: number;
};
export interface Travel {
    destination:string,
    n_passengers:number,
    start_date:Date,
    end_date:Date,
    badget:string | null,
}

export interface TravelSupa{
    title:string|null,
    destination:string|null,
    arrive_date:Date|null,
    departure_date:Date|null,
    n_travelers:number|null,
    badget:number|null,
    user_id:string|null,
    id_continent:number|null,
    id_travel_generated:string|null,
    profile_image:string|null,
}

export interface TravelsGenerated{
  travel:TravelDay[]|null
  user_id?:string|null
  created_at?:Date|null
}
