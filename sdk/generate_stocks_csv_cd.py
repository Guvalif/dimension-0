from gspread import authorize
from urllib.parse import quote
from google.auth import default
from csv import writer


SPREADSHEET_ID = '1N4yco9qmRAMu7uS5pa-_vH55D2ZCahHIC-4wiFwxqGI'
WORKSHEET_NAME = 'STOCKS'


def get_latest_stocks(credentials):
    client      = authorize(credentials)
    spreadsheet = client.open_by_key(SPREADSHEET_ID)
    worksheet   = spreadsheet.worksheet(WORKSHEET_NAME)

    header, *body = worksheet.get_all_values()

    yield [ 'century', 'rarity', 'number', 'color', 'stock', 'name', 'price', 'url' ]

    for row in body:
        url = f"https://www.wikihouse.com/dim0wiki/index.php?{quote(row[5].encode('euc-jp'))}"

        yield [ *row, url ]


def main():
    credentials, _ = default(scopes=[
        'https://www.googleapis.com/auth/spreadsheets',
    ])

    stocks = get_latest_stocks(credentials)

    with open('stocks.csv', 'w') as csv_file:
        csv_writer = writer(csv_file)
        csv_writer.writerows(stocks)


if __name__ == '__main__':
    main()
