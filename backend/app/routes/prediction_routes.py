from fastapi import APIRouter
from app.schemas.prediction_schema import PredictionInput

import joblib
import numpy as np

router = APIRouter()

# Load models

bed_model = joblib.load("app/models/bed_model.pkl")
icu_model = joblib.load("app/models/icu_model.pkl")
oxygen_model = joblib.load("app/models/oxygen_model.pkl")
doctor_model = joblib.load("app/models/doctor_model.pkl")
medicine_model = joblib.load("app/models/medicine_model.pkl")
emergency_model = joblib.load("app/models/emergency_model.pkl")

@router.post("/predict")

def predict(data:PredictionInput):

    features = np.array([[
        data.patient_count,
        data.disease_type,
        data.season,
        data.occupancy_rate,
        data.available_beds
    ]])

    beds = int(bed_model.predict(features)[0])

    icu = int(icu_model.predict(features)[0])

    oxygen = int(oxygen_model.predict(features)[0])

    doctors = int(doctor_model.predict(features)[0])

    medicine = int(medicine_model.predict(features)[0])

    emergency = int(emergency_model.predict(features)[0])

    return {

        "Beds Required": beds,
        "ICU Required": icu,
        "Oxygen Required": oxygen,
        "Doctors Required": doctors,
        "Medicine Units": medicine,
        "Emergency Level": emergency
    }