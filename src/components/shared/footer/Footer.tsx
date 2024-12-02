import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const footerNavData: {
    title: string;
    items: {
      title: string | JSX.Element;
      link: string;
    }[];
  }[] = [
    {
      title: "About ",
      items: [
        {
          title: "About Us",
          link: "/",
        },

        {
          title: "Careers",
          link: "/",
        },
        {
          title: "Awards & Recognition",
          link: "/",
        },
        {
          title: "Investor ",
          link: "/",
        },
        {
          title: "Franchise",
          link: "/",
        },
        {
          title: "Share Department",
          link: "/",
        },
      ],
    },
    {
      title: "Information",
      items: [
        {
          title: "Terms & Conditions",
          link: "/",
        },
        {
          title: "Payment Options",
          link: "/",
        },
        {
          title: "Privacy Policy",
          link: "/",
        },
        {
          title: "Return Policy",
          link: "/",
        },
        {
          title: "Franchise program",
          link: "/",
        },
      ],
    },
    {
      title: "Popular Categories",
      items: [
        {
          title: "Shirts",
          link: "/",
        },
        {
          title: "Trousers",
          link: "/",
        },
        {
          title: "T-Shirts",
          link: "/",
        },
        {
          title: "Pants",
          link: "/",
        },
        {
          title: "Jeans",
          link: "/",
        },
        {
          title: "Shoes",
          link: "/",
        },
      ],
    },
    {
      title: "Customer Service",
      items: [
        {
          title: "Contact Us",
          link: "/",
        },
        {
          title: "Order Status",
          link: "/",
        },
        {
          title: "Shipping & Delivery",
          link: "/",
        },
        {
          title: "Return Policy",
          link: "/",
        },
        {
          title: "FAQ",
          link: "/",
        },
      ],
    },
    {
      title: "Info",
      items: [
        {
          title: "60 Feet Road, Mirpur -2, Mirpur, Bangladesh, 1216",
          link: "/",
        },
        {
          title: (
            <div>
              <br />
            </div>
          ),
          link: "/",
        },
        {
          title: "Call us now: +880 1712454900",
          link: "/",
        },
        {
          title: "Email:waazirlifestyle@gmail.com",
          link: "/",
        },
      ],
    },
  ];
  return (
    <footer className="bg-secondary text-center text-white dark:bg-neutral-600 dark:text-neutral-200 lg:text-left ">
      <div className="grid lg:grid-cols-5 grid-cols-1 container">
        {footerNavData.map((item, i) => (
          <div key={i} className="p-4">
            <h1 className="text-xl font-semibold mb-4">{item.title}</h1>
            <ul>
              {item.items.map((subItem, i) => (
                <li key={i} className="mb-1">
                  <a href={subItem.link} className="hover:text-primary">
                    {subItem.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center my-4">
        <div className="flex gap-6">
          <a
            href="https://www.facebook.com/share/48A4c6vM2eeF4h6y/?mibextid=qi2Omg"
            target="_blank"
          >
            {" "}
            <FaFacebook className="text-2xl hover:text-primary" />
          </a>
          <a href="http://">
            {" "}
            <FaInstagram className="text-2xl hover:text-primary" />
          </a>
          <a href="http://">
            {" "}
            <FaYoutube className="text-2xl hover:text-primary" />
          </a>
        </div>
      </div>

      {/* <!--Copyright section--> */}
      <div className="bg-primary p-6 text-center text-white">
        <span>© 2024 Copyright:</span>
        One Store | develop by{" "}
        <a href="https://mominul.dev" target="blank" className="text-white">
          Mominul Islam
        </a>
      </div>
    </footer>
  );
};

export default Footer;
