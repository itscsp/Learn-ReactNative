import axios from "axios";
const BE_URL = `https://rncource-b97e8-default-rtdb.firebaseio.com`

export async function storeTransaction(data) {
  axios.post(
    `${BE_URL}/transaction.json`,
    data
  );
}


export async function fetchTransaction() {
   const response =  await axios.get(
       `${BE_URL}/transaction.json`,
  );

  return response
}

