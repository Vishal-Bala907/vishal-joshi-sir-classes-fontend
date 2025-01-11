import {
  CreateAccount,
  DontHaveAccount,
  EmailAddressLogIn,
  ForgotPassword,
  OrSignInWith,
  SignInAccount,
  SignUpAccount,
  Password,
  RememberPassword,
  SignIn,
  SignInToAccount,
  SignUp,
} from "@/Constant";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../public/assets/images/logo/logo1.png";
import imageTwo from "../../../public/assets/images/logo/logo-dark.png";
import { signUp } from "@/server/auth";
import { signIn } from "next-auth/react";

export const UserForm = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [signUpCheck, setSignUp] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const formSubmitHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (signUpCheck) {
      const result = await signUp(email, password, name);
      if (result?.status === "success") {
        setSignUp(false);
        toast.success("Success...");
      } else {
        toast.error("Invalid Data...");
      }
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/pages/dashboard",
    });
    // const result = await signIn(email, password);

    // console.log(result);

    // if (result.statusCode === 200) {
    //   toast.success("successfully Logged in Rediract......");
    //   router.push(result.url || "http://localhost:3000/dashboard");
    // } else {
    //   toast.error("Invalid Credentaial...");
    // }
    if (result?.ok) {
      console.log(result);
      toast.success("successfully Logged in Rediract......");
      router.push(result.url || "/dashboard");
      // create a room after successfull login
    } else {
      toast.error("Invalid Credentaial...");
    }
  };

  return (
    <div>
      <div>
        <Link className="logo" href="/dashboard/default">
          <Image
            width={91}
            height={27}
            className="img-fluid for-light"
            src={imageOne}
            alt="login page"
            priority
          />
          <Image
            width={91}
            height={27}
            className="img-fluid for-dark"
            src={imageTwo}
            alt="login page"
            priority
          />
        </Link>
      </div>
      <div className="login-main">
        <Form
          className="theme-form"
          onSubmit={(event) => formSubmitHandle(event)}
        >
          <h2 className="text-center">
            {signUpCheck ? SignUpAccount : SignInToAccount}
          </h2>
          {signUpCheck && (
            <FormGroup>
              <Label className="col-form-label">Name</Label>
              <Input
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="User name"
              />
            </FormGroup>
          )}
          <FormGroup>
            <Label className="col-form-label">{EmailAddressLogIn}</Label>
            <Input
              type="email"
              defaultValue={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Test123@gmail.com"
            />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">{Password}</Label>
            <div className="position-relative form-input">
              <Input
                type={show ? "text" : "password"}
                defaultValue={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Test@123"
              />
              <div className="show-hide" onClick={() => setShow(!show)}>
                <span className="show"> </span>
              </div>
            </div>
          </FormGroup>
          {!signUpCheck ? (
            <FormGroup className="mb-0 checkbox-checked">
              <FormGroup className="checkbox-solid-info" check>
                <Input id="checkbox1" type="checkbox" />
                <Label className="text-muted" htmlFor="checkbox1">
                  {RememberPassword}
                </Label>
              </FormGroup>
              <Link className="link" href={`/authentication/forget_password`}>
                {ForgotPassword}
              </Link>
              <div className="text-end mt-3">
                <Button type="submit" color="primary" block>
                  {SignIn}
                </Button>
              </div>
            </FormGroup>
          ) : (
            <FormGroup className="mb-0 checkbox-checked">
              <div className="text-end mt-3">
                <Button type="submit" color="primary" block>
                  {SignUp}
                </Button>
              </div>
            </FormGroup>
          )}
          {signUpCheck ? (
            <p className="mt-4 mb-0 text-center">
              {SignInAccount}
              <Button className="ms-2" onClick={() => setSignUp(false)}>
                {SignIn}
              </Button>
            </p>
          ) : (
            <p className="mt-4 mb-0 text-center">
              {DontHaveAccount}
              <Button className="ms-2" onClick={() => setSignUp(true)}>
                {CreateAccount}
              </Button>
            </p>
          )}
        </Form>
      </div>
    </div>
  );
};
