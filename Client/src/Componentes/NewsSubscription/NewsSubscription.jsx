import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewsSubscription = ({ closeSidebar }) => {
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
      }
      else{
       setUserSubscribed(false);
       return 
      }
    } catch (error) {
      //   if (error.response.data.error === "Debe iniciar sesión primero") {
      //     return navigate("/login");
      //   }
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
        window.alert("subscripto wachin");
      }
    } catch (error) {
    console.log(error)
      console.log(error.response.data.error);
      if (error.response.data.error === "Debe iniciar sesión primero") {
        window.alert("Debe iniciar sesión primero");
      
        closeSidebar();
        return navigate("/login");
      }
    }
  };
  
  const unsubscribeHandler = async () =>{
  try {
    const response = await axios.delete("/subscription",{},{withCredentials:true})
   if(response.status === 200){
    window.alert("te desubcribiste")
   }
  } catch (error) {
     console.log(error)
  }
  }

  useEffect(() => {
    findUserSubscribedHanlder();
  }, [userSubscribed]);

  return (
    <div className="px-4 py-2 mt-2">
 
      <h2 className="ml-2 mt-2 text-sm text-gray-400">
        {!userSubscribed ? (
          <h2 className="ml-2 text-sm text-gray-400">
       Do you want to receive the latest news in your email?
          </h2>
        ) : (
          <h2 className="ml-2 text-sm text-gray-400">
           Do you want to stop receiving news?
          </h2>
        )}
      </h2>
      {!userSubscribed ? (
        <span
          onClick={()=>subscriberHandler()}
          className="ml-2 text-xs text-gray-500 cursor-pointer border-b border-gray-400 border-solid border-1 hover:text-blue-500 hover:border-blue-500 "
        >
         Subscribe Here
        </span>
      ) : (
        <span onClick={unsubscribeHandler} className="ml-2 text-xs text-gray-500 cursor-pointer border-b border-gray-400 border-solid border-1 hover:text-blue-500 hover:border-blue-500 ">
         Click Here
        </span>
      )}
    </div>
  );
};

export default NewsSubscription;
