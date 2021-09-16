import { useHistory } from 'react-router-dom';

export default function ContactUs() {
  document.title = 'Contact us';
  useHistory().push('/ContactUs');

  return (
    <>
      <p>Contact Us</p>
    </>
  );
}
