import { useEffect, useState } from "react";
import axios from "axios";

export const useCustomFetch = (
  url: string,
  sendedData: Object,
  isUserIdFromUrl: string = ""
) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post(url, sendedData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [isUserIdFromUrl]);

  return { data, loading, error };
};
