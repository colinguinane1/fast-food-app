import Image from "next/image";

const Footer = () => {
  return (
    <div className="w-full h-fit p-4  text-white  bg-green-400  flex flex-col items-center justify-center">
      <Image
        src={"/burgerb-2-2.png"}
        width={80}
        height={80}
        alt={"logo"}
      ></Image>
      <h2 className="text-center py-2">
        Burger Blitz is not a real fast food chain. This website was created for
        the purposes of learning and improving{" "}
      </h2>
      <h3 className="flex gap-1">
        Visit my{" "}
        <a
          href="https://colin-g.me"
          target="_blank"
          className="font-bold flex items-center"
        >
          developer website{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-arrow-up-right stroke-white"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#2c3e50"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17 7l-10 10" />
            <path d="M8 7l9 0l0 9" />
          </svg>
        </a>
      </h3>
    </div>
  );
};

export default Footer;