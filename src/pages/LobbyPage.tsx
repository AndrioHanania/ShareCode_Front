import React, { useEffect, useState } from "react";
import CodeBlockList, { SimpleCodeBlock } from "../components/CodeBlockList";
import axios from "axios";
import { serverURL } from "../constans";

const LobbyPage: React.FC = () => {
  const [codeBlocks, setCodeBlocks] = useState<SimpleCodeBlock[]>([]);

  useEffect(() => {
    axios
      .get(serverURL + "/api/code-blocks/")
      .then((response) => {
        setCodeBlocks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <CodeBlockList codeBlocks={codeBlocks} />
    </div>
  );
};

export default LobbyPage;
