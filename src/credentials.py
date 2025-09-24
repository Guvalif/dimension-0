from json import loads as json_loads
import subprocess
from xml.etree.ElementTree import fromstring as xml_fromstring

from google.auth import default
from google.oauth2.service_account import Credentials


def get_credentials_from_default() -> Credentials:
    credentials, _ = default(scopes=[
        'https://www.googleapis.com/auth/spreadsheets',
    ])

    return credentials


def get_credentials_from_keychain(label: str) -> Credentials:
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

    return Credentials.from_service_account_info(json).with_scopes([
        'https://www.googleapis.com/auth/spreadsheets',
    ])
