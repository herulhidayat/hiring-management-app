import Cookies from "js-cookie";
import { deleteItem } from "./localstorage.helper";

export default function logout() {
    deleteItem("token");
    deleteItem("user");
    Cookies.remove("authToken");
    window.location.href = "/login";
}