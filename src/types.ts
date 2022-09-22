export type Planet = {
    koi_disposition?: K_disposition,
    koi_insol?: number,
    koi_prad?: number
}

export enum K_disposition {
    CONFIRMED = "CONFIRMED",
    FALSE_POSITIVE= "FALSE POSITIVE"
}