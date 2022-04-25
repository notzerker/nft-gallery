import { useState, useEffect } from "react";

function useCollections(initialResult) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    initialResult.forEach((data) => {
      if (!collections.includes(data.contract.address)) {
        collections.push(data.contract.address);
      }
    });
  }, [initialResult]);

  return collections;
}

export default useCollections;
