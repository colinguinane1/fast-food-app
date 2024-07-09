interface EmptyCartProps {
  toggleCartVisible: () => any;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ toggleCartVisible }) => {
  return (
    <div className="flex flex-col items-center gap-10 py-10 text-3xl">
      Your cart is empty! 😢
      <a href="./order">
        <button
          onClick={toggleCartVisible}
          className="bg-green-500 text-white p-2 px-4 rounded-full text-lg font-extrabold "
        >
          Order Now
        </button>
      </a>
    </div>
  );
};

export default EmptyCart;
