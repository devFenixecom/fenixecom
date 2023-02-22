import { useState } from 'react';

const MyPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [productPrice, setProductPrice] = useState(25);
  const [markup, setMarkup] = useState(1);

  const gateway = 0.06;
  const yampi = 0.05;
  const recommendedPrice = markup * productPrice;
  const fixedCost = productPrice * yampi + gateway;
  const marketingCost = fixedCost * gateway + fixedCost;
  const finalPrice = fixedCost + marketingCost;
  const profit = fixedCost - productPrice;
  const estimatedProfit = profit * quantity;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">


        <div className="mb-4">
          <label className="block text-zinc-900 font-bold mb-2" htmlFor="quantity">
            Custo do produto
          </label>
          <input
            className="shadow text-zinc-900 bg-zinc-200 appearance-none border rounded w-full py-2 px-3 text-gray-00 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"

            type="number"
            min="0.01"
            step="0.01"
            value={productPrice}
            onChange={(e) => setProductPrice(Number(e.target.value))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-zinc-900 font-bold mb-2" htmlFor="quantity">
            Markup
          </label>
          <input
            className="shadow text-zinc-900 bg-zinc-200 appearance-none border rounded w-full py-2 px-3 text-gray-00 leading-tight focus:outline-none focus:shadow-outline"
            id="markup"

            type="number"
            min="0.01"
            step="0.01"
            value={markup}
            onChange={(e) => setMarkup(Number(e.target.value))}
          />
        </div>


        <div className="mb-6">
          <label className="block text-gray-900 font-bold mb-2" htmlFor="price">
            Markup: {markup} Yampi: {yampi} gateway: {gateway}
          </label>

          <label className="block text-gray-900 font-bold mb-2" htmlFor="price">
            Preço:

          </label>

          <p className="text-gray-300 text-base">Custo fixo R$  {fixedCost.toFixed(2)}</p>
        </div>

        <div className="mb-4">
          <label className="block text-zinc-900 font-bold mb-2" htmlFor="quantity">
            Vendeu?
          </label>
          <input
            className="shadow text-zinc-900 bg-zinc-200 appearance-none border rounded w-full py-2 px-3 text-gray-00 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>


        <div className="flex items-center justify-between">
          <div className="w-1/2">
            <p className="text-gray-700 text-base">V venda:</p>
            <p className="text-gray-700 text-base">R$ {recommendedPrice.toFixed(2)}</p>
          </div>
          <div className="w-1/2">
            <p className="text-gray-700 text-base">Lucro</p>
            <p className="text-gray-700 text-base">R$ {estimatedProfit.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
