import { Text } from "@mantine/core";
import { USER_WITH_GOOGLE } from "@redux/actions/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function GoogleCallback() {
  const dispatch = useDispatch();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const user = JSON.parse(params.user);

    dispatch({
      type: USER_WITH_GOOGLE,
      profile: user,
      token: user.token,
    });

    window.close();
  }, []);
  return (
    <Text>authentication with google succeeded, the page will close soon.</Text>
  );
}

export default GoogleCallback;
