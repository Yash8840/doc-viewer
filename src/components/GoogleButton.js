import { useEffect } from "react";

const GoogleButton = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div
        id='g_id_onload'
        data-client_id='205989919059-bh97libljd5b3e7bb28kt7o9oklk9nki.apps.googleusercontent.com'
      />
      <div
        className='g_id_signin'
        data-type='standard'
        data-size='large'
        data-theme='outline'
        data-text='sign_in_with'
        data-shape='rectangular'
        data-logo_alignment='center'
      />
    </>
  );
};
export default GoogleButton