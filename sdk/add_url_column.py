from csv import reader, writer
from urllib.parse import quote


def rows_gen(path):
    with open(path, 'r') as csv_file:
        csv_reader = reader(csv_file)

        yield [ 'century', 'rarity', 'number', 'color', 'stock', 'name', 'memo', 'url' ]

        next(csv_reader)

        for row in csv_reader:
            row.append(f"https://www.wikihouse.com/dim0wiki/index.php?{quote(row[5].encode('euc-jp'))}")

            yield row


def main(path):
    from os.path import splitext

    name, ext = splitext(path)

    with open(f'{name}.fix{ext}', 'w') as csv_file:
        csv_writer = writer(csv_file)
        csv_writer.writerows(rows_gen(path))


if __name__ == '__main__':
    from sys import argv

    main(argv[1])
