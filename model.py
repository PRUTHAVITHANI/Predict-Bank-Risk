import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE
import logging
import joblib
import os

# Path to the extracted file
asc_file_path = r'D:\internship-2\dataset\SouthGermanCredit.asc'
csv_file_path = r'D:\internship-2\dataset\Credit.csv'

# Load the dataset
df = pd.read_table(asc_file_path, delim_whitespace=True, header=0)

df.to_csv(csv_file_path, index=False)

# Display the first few rows of the dataset
print(df.head())

df=df.rename(columns={'laufkont':'status', 'laufzeit':'duration', 'moral':'credit_history', 'verw':'purpose',
                      'hoehe':'amount', 'sparkont':'savings', 'beszeit':'employment_duration', 'rate':'installment_rate',
                      'famges':'personal_status_sex', 'buerge':'other_debtors', 'wohnzeit':'present_residence',
                      'verm':'property', 'alter':'age', 'weitkred':'other_installment_plans', 'wohn':'housing',
                      'bishkred':'number_credits', 'beruf':'job', 'pers':'people_liable', 'telef':'telephone',
                      'gastarb':'foreign_worker', 'kredit':'credit_risk'})

print(df.head())
print(df.columns)

# Display basic information about the dataset
print("\nBasic Information about the dataset:")
print(df.info())

# Display summary statistics of the dataset
print("\nSummary Statistics of the dataset:")
print(df.describe())

# Check for missing values
print("\nMissing values in the dataset:")
print(df.isnull().sum())

# import matplotlib.pyplot as plt
# import seaborn as sns

# # Set the aesthetic style of the plots
# sns.set(style="whitegrid")

# # Count the occurrences of each class in the 'kredit' column
# kredit_counts = df['credit_risk'].value_counts()

# # Plot the distribution of the 'kredit' variable
# plt.figure(figsize=(8, 6))
# sns.barplot(x=kredit_counts.index, y=kredit_counts.values, palette='viridis')
# plt.xlabel('Credit Risk')
# plt.ylabel('Number of People')
# plt.title('Distribution of Credit Risk (Good or Bad)')
# plt.xticks(ticks=[0, 1], labels=['Bad', 'Good'])
# plt.show()

# Define the features and target
X = df.drop('credit_risk', axis=1)
y = df['credit_risk']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalize numerical features using StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)


# Save the scaler
scaler_file_path = r'D:\internship-2\scaler.pkl'
joblib.dump(scaler, scaler_file_path)
logging.info(f'Scaler saved to {scaler_file_path}')


# Define the log file path
log_file_path = r'D:\internship-2\training_log.log'

# Ensure the directory exists
os.makedirs(os.path.dirname(log_file_path), exist_ok=True)

# Set up logging
logging.basicConfig(filename=log_file_path, level=logging.INFO, format='%(asctime)s:%(levelname)s:%(message)s')


# Handle class imbalance using SMOTE
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train_scaled, y_train)

# Initialize the classifiers
rf = RandomForestClassifier(random_state=42)

# Hyperparameter tuning for RandomForest using GridSearchCV
param_grid_rf = {
    'n_estimators': [100, 200, 300],
    'max_depth': [10, 20, 30],
    'min_samples_split': [2, 5, 10]
}

grid_search_rf = GridSearchCV(estimator=rf, param_grid=param_grid_rf, cv=5, scoring='accuracy', n_jobs=-1)
grid_search_rf.fit(X_train_res, y_train_res)
best_rf = grid_search_rf.best_estimator_

# Log the best parameters found by GridSearchCV
logging.info(f'Best parameters found for RandomForest: {grid_search_rf.best_params_}')

# Train the best estimator
best_rf.fit(X_train_res, y_train_res)
y_pred_rf = best_rf.predict(X_test_scaled)

# Evaluate and log the results
accuracy = accuracy_score(y_test, y_pred_rf)
class_report = classification_report(y_test, y_pred_rf)
conf_matrix = confusion_matrix(y_test, y_pred_rf)

logging.info(f'--- Random Forest (Best Estimator) ---')
logging.info(f'Accuracy: {accuracy}')
logging.info(f'Classification Report:\n{class_report}')
logging.info(f'Confusion Matrix:\n{conf_matrix}')

print('--- Random Forest (Best Estimator) ---')
print(f'Accuracy: {accuracy}')
print('Classification Report:\n', class_report)
print('Confusion Matrix:\n', conf_matrix)

# Save the trained model to a .pkl file
model_file_path = r'D:\internship-2\model.pkl'
joblib.dump(best_rf, model_file_path)
logging.info(f'Trained model saved to {model_file_path}')