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
    user_created:string|null,
    id_continent:number|null,
    travel_generated:string|null,
    profile_image:string|null,
}