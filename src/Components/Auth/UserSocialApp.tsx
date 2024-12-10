import { toast } from "react-toastify";
import { FormGroup } from "reactstrap";

const UserSocialApp = () => {
  const handlesubmit = () => {
    toast.error("This is only demo purpose, click on the Sign In button to login.");
  };
  return (
    <FormGroup>
      <ul className='login-social'>
        <li>
          <span onClick={(handlesubmit)}>
            <i className='icon-linkedin' />
          </span>
        </li>
        <li>
          <span onClick={handlesubmit}>
            <i className='icon-twitter' />
          </span>
        </li>
        <li>
          <span onClick={handlesubmit}>
            <i className='icon-facebook' />
          </span>
        </li>
        <li>
          <span onClick={handlesubmit}>
            <i className='icon-instagram' />
          </span>
        </li>
      </ul>
    </FormGroup>
  );
};

export default UserSocialApp;
