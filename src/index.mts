import { writeFile } from 'fs/promises';
import { render } from '@lit-labs/ssr';

import { readCsv } from './csv.mjs';
import { RootHtml } from './root.html.mjs';


const rendered = render(RootHtml(await readCsv(process.argv[2]!)));
const staticHtml = (await Promise.all(rendered)).join('');

await writeFile('docs/index.html', staticHtml);
