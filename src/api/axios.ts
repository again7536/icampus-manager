import { Course } from "@/types";
import axios from "axios";

// top-level await is usable above ES2022
const axiosInstance = await (async () => {
  const getCookie = () =>
    chrome.cookies.get({
      name: "xn_api_token",
      url: "https://canvas.skku.edu/",
    });

  let cookie = await getCookie();
  // fetch token if cookie does not exist.
  if (!cookie) {
    const { data } = await axios.get<Course[]>(
      "https://canvas.skku.edu/api/v1/users/self/favorites/courses"
    );

    // parse data from embeded form.
    const { data: dom } = await axios.get(
      `https://canvas.skku.edu/courses/${data[0].id}/external_tools/5`
    );
    const parser = new DOMParser();
    const $html = parser.parseFromString(dom, "text/html");
    const $form = $html.querySelector("form");

    if (!$form) throw Error("Error: could not fetch cookie");

    const jsonFormData = Object.fromEntries(new FormData($form));
    await axios.post("https://canvas.skku.edu/learningx/lti/learnstatus", jsonFormData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    cookie = await getCookie();
  }

  const instance = axios.create({
    baseURL: "https://canvas.skku.edu/",
    headers: { Authorization: `Bearer ${cookie?.value}` },
    withCredentials: true,
  });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
})();

export default axiosInstance;
