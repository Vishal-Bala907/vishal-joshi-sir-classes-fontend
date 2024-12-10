import SVG from "@/CommonComponent/SVG";
import { Cart, Href, ImagePath } from "@/Constant";
import { cartHeaderData } from "@/Data/Applications/Layout/HeaderData";
import { CartHeaderDataType } from "@/Types/LayoutTypes";
import Link from "next/link";
import { useState } from "react";
import { X } from "react-feather";
import { Badge, Button, Input, InputGroup } from "reactstrap";

const CartHeader = () => {
  const [show, setShow] = useState(false);
  const [defaultData, setDefaultData] =
    useState<CartHeaderDataType[]>(cartHeaderData);

  const incrementQty = (item: CartHeaderDataType) => {
    setDefaultData(
      defaultData.map((data) =>
        data.title === item.title ? { ...data, value: data.value + 1 } : data
      )
    );
  };

  const handleValue = (
    data: CartHeaderDataType,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numericValue = parseInt(e.target.value, 10) || 0;
    setDefaultData(
      defaultData.map((item) =>
        item.title === data.title ? { ...data, value: numericValue } : item
      )
    );
  };

  const decrementQty = (item: CartHeaderDataType) => {
    setDefaultData(
      defaultData.map((data) =>
        data.title === item.title
          ? { ...data, value: Math.max(0, data.value - 1) }
          : data
      )
    );
  };

  const handleDelete = (item: CartHeaderDataType) => {
    setDefaultData(defaultData.filter((data) => data.title !== item.title));
  };

  const orderTotal = defaultData.reduce(
    (total, item) => total + item.price * item.value,
    0
  );

  return (
    <li className="custom-dropdown">
      <a href={Href} onClick={() => setShow(!show)}>
        <SVG iconId="cart-icon" />
      </a>
      <Badge pill color="primary">
        {defaultData.length}
      </Badge>
      <div
        className={`custom-menu cart-dropdown py-0 overflow-hidden ${
          show ? "show" : ""
        }`}
      >
        <h3 className="title dropdown-title">{Cart}</h3>
        <ul className="pb-0">
          {defaultData.map((data, index) => (
            <li key={index}>
              <div className="d-flex">
                <img
                  className="img-fluid b-r-5 me-3 img-60"
                  src={`${ImagePath}/${data.image}`}
                  alt=""
                />
                <div className="flex-grow-1">
                  <span className="f-w-600">{data.title}</span>
                  <div className="qty-box">
                    <InputGroup>
                      <span
                        className="input-group-prepend"
                        onClick={() => decrementQty(data)}
                      >
                        <Button className="quantity-left-minus" type="button">
                          -
                        </Button>
                      </span>
                      <Input
                        className="input-number"
                        type="number"
                        name="quantity"
                        value={data.value}
                        onChange={(e) => handleValue(data, e)}
                      />
                      <span
                        className="input-group-prepend"
                        onClick={() => incrementQty(data)}
                      >
                        <Button className="quantity-right-plus" type="button">
                          +
                        </Button>
                      </span>
                    </InputGroup>
                  </div>
                  <h6 className="font-primary">${data.price * data.value}</h6>
                </div>
                <div className="close-circle">
                  <a
                    className="bg-danger"
                    href={Href}
                    onClick={() => handleDelete(data)}
                  >
                    <X />
                  </a>
                </div>
              </div>
            </li>
          ))}
          <li className="total">
            <h6 className="mb-0">
              Order Total :{" "}
              <span className="f-w-600">${orderTotal.toFixed(2)}</span>
            </h6>
          </li>
          <li className="text-center">
            <Link
              className="d-block mb-3 view-cart f-w-700 text-primary"
              href="/ecommerce/cart"
            >
              Go to your cart
            </Link>
            <Link
              className="btn btn-primary view-checkout text-white"
              href="/ecommerce/checkout"
            >
              Checkout
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default CartHeader;
