import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { CONTENT_API_END_POINT } from "@/utils/constant";
import { setContent } from "@/components/redux/contentSlice";

function useGetAllContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        const res = await axios.get(`${CONTENT_API_END_POINT}/write`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setContent(res.data.contents));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllContent();
  }, [dispatch]);
}
export default useGetAllContent;
