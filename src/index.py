from datetime import datetime

from jinja2 import Template

from credentials import get_credentials_from_default
from stocks import get_latest_stocks


def main():
    credentials = get_credentials_from_default()

    update_date = datetime.now().strftime('%Y/%m/%d')
    stocks = get_latest_stocks(credentials)

    with open('template.html', 'r', encoding='utf-8') as f:
        template = Template(f.read())
        rendered = template.render(update_date=update_date, stocks=stocks)

        print(rendered)


if __name__ == '__main__':
    main()
