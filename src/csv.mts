import { createReadStream } from 'fs';
import csv from 'csv-parser';


type Columns =
  | 'century'
  | 'rarity'
  | 'number'
  | 'color'
  | 'stock'
  | 'name'
  | 'price'
  | 'url';

export type RowObject = Record<Columns, string>;


export function readCsv(path: string): Promise<Array<RowObject>> {
  return new Promise((resolve) => {
    const result: Array<RowObject> = [];

    createReadStream(path)
      .pipe(csv())
      .on('data', (data) => {
        result.push(data);
      })
      .on('end', () => {
        resolve(result);
      });
  });
}
