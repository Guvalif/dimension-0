import { writeFileSync } from 'fs';
import { render } from '@lit-labs/ssr';

import { readCsv } from './csv.mjs';
import { RootHtml } from './root.html.mjs';


const rendered = render(RootHtml(await readCsv(process.argv[2]!)));
const staticHtml = (await Promise.all(rendered)).join('');

writeFileSync('docs/index.html', staticHtml);
