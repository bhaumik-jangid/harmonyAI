import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export default function DataFromJWT() {
  try {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found in cookies");
      return null;
    }

    const decodedToken = jwt.decode(token);
    if (!decodedToken || typeof decodedToken === "string") {
      console.error("Invalid token payload");
      return null;
    }

    return decodedToken; // Returns an object with user details
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}
