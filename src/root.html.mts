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


function Price(price: string) {
  return Number(price).toLocaleString('ja-JP');
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
      <style>
        .table td, .table th {
          vertical-align: middle;
        }
      </style>

      <!-- Scripts
      ========================================================================= -->
      <script src="umbrella.min.js"></script>
      <script src="index.js"></script>
    </head>

    <body>
      <section class="section">
        <div class="content">
          <blockquote class="columns">
            <ul class="column is-half">
              <li><b>${UpdateDate()}</b> 時点での情報です</li>
              <li>レアリティにおける <b>SS</b> は銀箔版を意味します</li>
              <li>購入をご希望の場合は、<a href="https://forms.gle/8CXNAGahFkHPWV8u9" target="_blank">Google フォーム</a> からご連絡ください</li>
              <ul class="my-1">
                <li>振込手数料や送料に関しては、ご負担のほどよろしくお願いいたします</li>
              </ul>
              <li>トレードをご希望の場合は、<a href="https://discord.com/channels/708764827522433074/710922077531537521" target="_blank">Discord</a> からご連絡ください</li>
            </ul>
            <div class="column is-half is-flex">
              <div style="width: 50%;" class="is-flex is-justify-content-center is-align-items-center">
                <span class="tag is-primary is-light is-size-6">合計<b id="total-price" class="mx-1">0</b>円</span>
              </div>
              <div style="width: 50%;" class="is-flex is-justify-content-center is-align-items-center">
                <button id="create-button" class="button is-primary">出品リクエストを作成する</button>
              </div>
            </div>
          </blockquote>
        </div>
      </section>

      <div class="is-flex is-justify-content-center">
        <table class="table is-striped">
          <thead>
            <tr>
              <th class="is-hidden-mobile">センチュリー</th>
              <th class="is-hidden-mobile">レアリティ</th>
              <th class="is-hidden-mobile">カード No.</th>
              <th class="is-hidden-mobile">大陸</th>
              <th>カード名</th>
              <th>価格 (円)</th>
              <th>余剰枚数</th>
              <th>希望枚数</th>
            </tr>
          </thead>
          <tbody id="stocks">
            ${rows.map((row, index) => html`
              <tr
                id="stock-${index}"
                data-century="${row.century}"
                data-rarity="${row.rarity}"
                data-name="${row.name}"
                data-price="${row.price}"
              >
                <td class="is-hidden-mobile">${row.century}</td>
                <td class="is-hidden-mobile">${row.rarity}</td>
                <td class="is-hidden-mobile">${row.number}</td>
                <td class="is-hidden-mobile">${row.color}</td>
                <td>${NameAnchor(row.name, row.url)}</td>
                <td>${Price(row.price)}</td>
                <td>${row.stock}</td>
                <td>
                  <input
                    class="input" type="number" min="0" max="${row.stock}" value="0"
                    data-id="#stock-${index}"
                  />
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    </body>

    </html>
  `;
}
