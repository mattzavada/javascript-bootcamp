const createTipper = (tip) => {
  return (totalBill) => {
    return totalBill * tip;
  };
};

const tip18 = createTipper(0.18);
const tip20 = createTipper(0.2);
const tip22 = createTipper(0.22);
const totalAmount = 25;

console.log(`18%: $${tip18(totalAmount)}
20%: $${tip20(totalAmount)}
22%: $${tip22(totalAmount)}`);
