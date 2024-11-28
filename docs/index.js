const listingRequest = {};


function renderTotalPrice() {
  const totalPrice = Object
    .entries(listingRequest)
    .reduce((acc, [id, quantity]) => {
      const price = Number(u(id).data('price'));

      return acc + price * quantity;
    }, 0);

  u('#total-price').text(totalPrice.toLocaleString('ja-JP'));
}


function renderListingRequest() {
  return Object
    .entries(listingRequest)
    .filter(([_, quantity]) => quantity > 0)
    .map(([id, quantity]) => {
      const name = u(id).data('name');
      const century = u(id).data('century');
      const rarity = u(id).data('rarity');

      return `${quantity}x${name}| ${century} | ${rarity}`;
    })
    .join('\n');
}


document.addEventListener('DOMContentLoaded', () => {
  u('#stocks').on('change', (event) => {
    const $input = u(event.target);
    const id = $input.data('id');
    const value = Number(event.target.value);

    listingRequest[id] = value;

    renderTotalPrice();
  });

  u('#create-button').on('click', async () => {
    await navigator.clipboard.writeText(renderListingRequest());

    alert('出品リクエストをクリップボードにコピーしました\n(Google フォームなどに貼り付けてご利用ください)');
  });
});
