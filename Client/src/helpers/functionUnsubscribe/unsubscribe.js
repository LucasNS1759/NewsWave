import Swal from "sweetalert";
import axios from "axios";

export const unsubscribeHandler = async () => {
    try {
      const response = await axios.delete(
        "/subscription",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        Swal({
          title: response.data.title,
          text: response.data.text,
          icon: "success",
          button: "ok",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };