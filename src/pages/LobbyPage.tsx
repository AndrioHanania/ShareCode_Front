import React, { useEffect, useState } from "react";
import CodeBlockList, { SimpleCodeBlock } from "../components/CodeBlockList";
import axios from "axios";

const LobbyPage: React.FC = () => {
  const [codeBlocks, setCodeBlocks] = useState<SimpleCodeBlock[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/code-blocks/")
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
