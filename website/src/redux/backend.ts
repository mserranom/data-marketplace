import { getToken } from "../aws/login";
import { SERVER } from "../util/constants";

import fetch, { RequestInit } from "node-fetch";

//TODO: strict typing overloading the endpoint, passin params as Map

export default async function(endpoint: string, method = "GET", body?: object) {
  return new Promise<any>(async (resolve, reject) => {
    const token = await getToken();
    const params: RequestInit = {
      method: method,
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      }
    };

    if (body) {
      if (typeof body === "string") {
        params.body = body;
      } else {
        params.body = JSON.stringify(body);
      }
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
