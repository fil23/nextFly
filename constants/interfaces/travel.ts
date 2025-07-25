export interface Travel {
    destination:string,
    n_passengers:number,
    start_date:Date,
    end_date:Date,
    badget:string | null,
}

export interface TravelSupa{
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
  travel:string|null
  user_id?:string|null
  created_at?:Date|null
}
