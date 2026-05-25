import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv("../preprocessing/cleaned_dataset.csv")

X = df[['Patient_Count','Disease_Type','Season','Occupancy_Rate','Available_Beds']]

y = df['Emergency_Level']

X_train, X_test, y_train, y_test = train_test_split(
    X,y,test_size=0.2,random_state=42
)

model = RandomForestClassifier()

model.fit(X_train,y_train)

joblib.dump(model,"../models/emergency_model.pkl")

print("Emergency Model Trained")