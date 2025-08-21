import axios from "axios";

export async function createUser(email, password) {
  const response = await axios.post(
    "http://blogchethanspoojarycom.local/wp-json/wp-auth/v1/register",
    {
      username: email,
      email: email,
      password: password,
    }
  );

  console.log("Response: ", response);
}
