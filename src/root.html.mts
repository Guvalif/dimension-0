import { html } from '@lit-labs/ssr';

import { type RowObject } from './csv.mjs';


function UpdateDate(): string {
  const now = new Date();

  return now.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}


function NameAnchor(name: string, url: string) {
  return html`<a href="${url}" target="_blank">${name}</a>`;
}


export function RootHtml(rows: Array<RowObject>) {
  return html`
    <!DOCTYPE html>

    <html lang="ja">

    <head>
      <!-- Basic Page Needs
      ========================================================================= -->
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Dimension-0 Stock Database</title>

      <!-- Styles
      ========================================================================= -->
      <link rel="stylesheet" href="bulma.min.css" />
    </head>

    <body>
      <section class="section">
        <div class="content">
          <blockquote>
            <ul>
              <li><b>${UpdateDate()}</b> 時点での情報です</li>
              <li>トレードなどをご希望の場合は、<a href="https://discord.com/channels/708764827522433074/710922077531537521" target="_blank">Discord</a> からご連絡ください</li>
              <li>レアリティにおける <b>SS</b> は銀箔版を意味します</li>
            </ul>
          </blockquote>
        </div>
      </section>

      <div style="display: flex; justify-content: center;">
        <table class="table is-striped">
          <thead>
            <tr>
              <th>センチュリー</th>
              <th>レアリティ</th>
              <th>カード No.</th>
              <th>大陸</th>
              <th>余剰枚数</th>
              <th>カード名</th>
              <th>メモ</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => html`
              <tr>
                <td>${row.century}</td>
                <td>${row.rarity}</td>
                <td>${row.number}</td>
                <td>${row.color}</td>
                <td>${row.stock}</td>
                <td>${NameAnchor(row.name, row.url)}</td>
                <td>${row.memo && html`<span class="tag is-info">${row.memo}</span>`}</td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    </body>

    </html>
  `;
}
