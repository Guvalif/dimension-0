import subprocess
from xml.etree.ElementTree import fromstring as xml_fromstring
from json import loads as json_loads
from gspread import authorize
from urllib.parse import quote
from google.oauth2.service_account import Credentials
from csv import writer


SPREADSHEET_ID = '1N4yco9qmRAMu7uS5pa-_vH55D2ZCahHIC-4wiFwxqGI'
WORKSHEET_NAME = 'STOCKS'


def get_service_account_from_keychain(label):
    result = subprocess.run(
        [ 'security', 'find-generic-password', '-l', label, '-w' ],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    hex_data = result.stdout.strip()
    raw_data = bytes.fromhex(hex_data).decode('utf-8')
    xml      = xml_fromstring(raw_data)
    json_str = xml.find('dict/string').text
    json     = json_loads(json_str)

    return json


def get_latest_stocks(credentials):
    client      = authorize(credentials)
    spreadsheet = client.open_by_key(SPREADSHEET_ID)
    worksheet   = spreadsheet.worksheet(WORKSHEET_NAME)

    header, *body = worksheet.get_all_values()

    yield [ 'century', 'rarity', 'number', 'color', 'stock', 'name', 'price', 'url' ]

    for row in body:
        url = f"https://www.wikihouse.com/dim0wiki/index.php?{quote(row[5].encode('euc-jp'))}"

        yield [ *row, url ]


def main(label):
    credentials = Credentials.from_service_account_info(
        get_service_account_from_keychain(label)
    ).with_scopes([
        'https://www.googleapis.com/auth/spreadsheets',
    ])

    stocks = get_latest_stocks(credentials)

    with open('stocks.csv', 'w') as csv_file:
        csv_writer = writer(csv_file)
        csv_writer.writerows(stocks)


if __name__ == '__main__':
    from sys import argv

    main(argv[1])
