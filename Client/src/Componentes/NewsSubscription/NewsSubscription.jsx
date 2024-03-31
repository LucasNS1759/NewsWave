import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";
import { unsubscribeHandler } from "../../helpers/functionUnsubscribe/unsubscribe";
import { useTranslation } from "react-i18next";

const NewsSubscription = ({ closeSidebar }) => {
  const { t } = useTranslation("global");

  const navigate = useNavigate();
  const [userSubscribed, setUserSubscribed] = useState("");

  const findUserSubscribedHanlder = async () => {
    try {
      const isSubscribed = await axios.get("/subscription", {
        withCredentials: true,
      });
      if (isSubscribed.data === true) {
        setUserSubscribed(true);
        return;
      } else {
        setUserSubscribed(false);
        return;
      }
    } catch (error) {
      if (error.response.data.error === "You must log in first") return;
      console.log(error);
    }
  };

  const subscriberHandler = async () => {
    try {
      const response = await axios.put(
        "/subscription",
        {},
        { withCredentials: true }
      );
      if (response.data) {
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
      if (error.response.data.error) {
        Swal({
          title: "oops something went wrong",
          text: error.response.data.error,
          icon: "warning",
          button: "login",
        }).then(() => {
          closeSidebar();
          return navigate("/login");
        });
      }
    }
  };

  useEffect(() => {
    findUserSubscribedHanlder();
  }, [userSubscribed]);

  return (
    <div className="px-4 py-2 mt-2">
      <h2 className="ml-2 mt-2 text-sm text-gray-400">
        {!userSubscribed ? (
          <h2 className="ml-2 text-sm text-gray-400">
            {t(
              "Component-NewsSubscription.Do you want to receive the latest news in your email?"
            )}
          </h2>
        ) : (
          <h2 className="ml-2 text-sm text-gray-400">
            {t(
              "Component-NewsSubscription.Do you want to stop receiving news?"
            )}
          </h2>
        )}
      </h2>
      {!userSubscribed ? (
        <span
          onClick={() => subscriberHandler()}
          className="ml-2 text-xs text-gray-500 cursor-pointer border-b border-gray-400 border-solid border-1 hover:text-blue-500 hover:border-blue-500 "
        >
          {t("Component-NewsSubscription.Subscribe Here")}
        </span>
      ) : (
        <span
          onClick={unsubscribeHandler}
          className="ml-2 text-xs text-gray-500 cursor-pointer border-b border-gray-400 border-solid border-1 hover:text-blue-500 hover:border-blue-500 "
        >
          {t("Component-NewsSubscription.Click Here")}
        </span>
      )}
    </div>
  );
};

export default NewsSubscription;
