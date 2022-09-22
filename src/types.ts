type Planet = {
    koi_disposition?: K_disposition,
    koi_insol?: number | undefined,
    koi_prad?: number | undefined
}

enum K_disposition {
    CONFIRMED = "CONFIRMED",
    FALSE_POSITIVE= "FALSE POSITIVE"
}