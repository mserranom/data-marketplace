import { getToken } from "../aws/login";
import { SERVER } from "../util/constants";

export default async function(endpoint, method = "GET", body) {
  return new Promise(async (resolve, reject) => {
    const token = await getToken();
    const params = {
      method: method,
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    };
    if (body) {
      params.body = body;
    }

    let response;
    try {
      response = await fetch(`${SERVER}${endpoint}`, params);
    } catch (err) {
      console.error(`fetch error requesting ${endpoint}, ${method} `);
      console.error(`* ` + err);
      reject(err);
      return;
    }

    if (response.ok) {
      const data = await response.json();
      resolve(data);
    } else {
      console.error(`backend error`);
      console.error(`* http_status=${response.status}`);
      const jsonResponse = await response.json();
      console.error(`* message=${jsonResponse.Message}`);
      reject(`* message=${jsonResponse.Message}`);
      return;
    }
  });
}
