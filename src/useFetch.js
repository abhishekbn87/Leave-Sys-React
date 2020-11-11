import { useState, useEffect } from "react";

export const useFetch = url => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const getProducts = async () => {
    const newData = await fetch(url).then(response => response.json());

    setData(newData);
    setLoading(false);
  };
  useEffect(() => {
    getProducts();
  }, [url]);

  return { loading, data };
};
