from dataclasses import dataclass
from typing import Generator
from urllib.parse import quote

from google.oauth2.service_account import Credentials
from gspread import authorize


SPREADSHEET_ID = '1N4yco9qmRAMu7uS5pa-_vH55D2ZCahHIC-4wiFwxqGI'
WORKSHEET_NAME = 'STOCKS'


@dataclass
class Stock:
    century:   str
    rarity:    str
    number:    str
    color:     str
    surplus:   str
    name:      str
    condition: str
    price:     str
    url:       str


def get_latest_stocks(credentials: Credentials) -> Generator[Stock, None, None]:
    client      = authorize(credentials)
    spreadsheet = client.open_by_key(SPREADSHEET_ID)
    worksheet   = spreadsheet.worksheet(WORKSHEET_NAME)

    _, *body = worksheet.get_all_values()

    for row in body:
        url = f"https://www.wikihouse.com/dim0wiki/index.php?{quote(row[5].encode('euc-jp'))}"

        yield Stock(
            century   = row[0],
            rarity    = row[1],
            number    = row[2],
            color     = row[3],
            surplus   = row[4],
            name      = row[5],
            condition = row[6],
            price     = row[7],
            url       = url,
        )
