import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Load dataset
df = pd.read_csv('S:\\tekwork\\hospital-resource-forecast\\backend\\hospital_resource_forecasting_dataset.csv')

# Remove null values
df.dropna(inplace=True)

# Encode categorical columns
encoder = LabelEncoder()

df['Disease_Type'] = encoder.fit_transform(df['Disease_Type'])
df['Season'] = encoder.fit_transform(df['Season'])
df['Emergency_Level'] = encoder.fit_transform(df['Emergency_Level'])

# Save cleaned dataset
df.to_csv("cleaned_dataset.csv", index=False)

print(df.head())