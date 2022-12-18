import { getCheckIfServerBooted } from "../../Logic/API/GET/get";
import { API_URL } from "../../env";
import axios from "axios";

const ServiceUnavailable = () => {
  return axios.get(`${API_URL}/serverAlive`);
};

export default ServiceUnavailable;
