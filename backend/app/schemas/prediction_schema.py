from pydantic import BaseModel

class PredictionInput(BaseModel):

    patient_count:int
    disease_type:int
    season:int
    occupancy_rate:float
    available_beds:int