import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

df = pd.read_csv("../preprocessing/cleaned_dataset.csv")

X = df[['Patient_Count','Disease_Type','Season','Occupancy_Rate','Available_Beds']]

y = df['ICU_Required']

X_train, X_test, y_train, y_test = train_test_split(
    X,y,test_size=0.2,random_state=42
)

model = RandomForestRegressor()

model.fit(X_train,y_train)

joblib.dump(model,"../models/icu_model.pkl")

print("ICU Model Trained")