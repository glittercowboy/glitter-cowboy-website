from google.oauth2 import service_account
from googleapiclient.discovery import build

# Define constants
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = 'credentials.json'  # Update to point to the credentials file in the same directory
SPREADSHEET_ID = '1GXh110KyUTOvFdWOiKscMg9NvIIzQx9v5dijuXzKo_g'  # Your Spreadsheet ID
RANGE_NAME = 'Sheet1!A1:D10'  # Replace with the range where your data is located

# Authenticate using the service account credentials
credentials = service_account.Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)

# Connect to Google Sheets
service = build('sheets', 'v4', credentials=credentials)
sheet = service.spreadsheets()

# Read data from the spreadsheet
result = sheet.values().get(spreadsheetId=SPREADSHEET_ID, range=RANGE_NAME).execute()
rows = result.get('values', [])

# Print retrieved data
if not rows:
    print('No data found.')
else:
    print('Data from Spreadsheet:')
    for row in rows:
        print(row)
