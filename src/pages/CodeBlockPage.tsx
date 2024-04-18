import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import CodeBlockDisplay from "../components/CodeBlockDisplay";
import { CodeBlock } from "../components/CodeBlockList";
import axios from "axios";

const CodeBlockPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const queryParams = new URLSearchParams(location.search);
  const isMentor = queryParams.get("isMentor") === "true";
  const [codeBlock, setCodeBlock] = useState<CodeBlock>();

  useEffect(() => {
    if (!studentEnterSession && id && !isMentor) navigate("/code-block/");
    else fetchCodeBlock(id || "0");
  }, []);

  const fetchCodeBlock = (codeBlockId: string) => {
    if (codeBlockId != "0")
      axios
        .get(`http://localhost:3000/api/code-blocks/${codeBlockId}`)
        .then((response) => {
          setCodeBlock(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const fetchCodeBlockIdBySessionId = async (sessionId: string) => {
    if (sessionId != "0") {
      const codeBlockId = await axios
        .get(`http://localhost:3000/api/sessions/${sessionId}`)
        .then((response) => {
          return response.data.codeBlockId;
        })
        .catch((error) => {
          console.error(error);
          return null;
        });
      return codeBlockId;
    } else return null;
  };

  const [sessionId, setSessionId] = useState<string>("");
  const [studentEnterSession, setStudentEnterSession] =
    useState<boolean>(false);

  const handleSessionIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionId(e.target.value);
  };

  const handleEnterSession = async () => {
    const codeBlockId = await fetchCodeBlockIdBySessionId(sessionId);
    console.log("out");

    if (codeBlockId) {
      console.log("innn");
      await fetchCodeBlock(codeBlockId);
      navigate(location.pathname + codeBlockId);
      setStudentEnterSession(true);
    }
  };

  return (
    <div>
      {isMentor || studentEnterSession ? (
        <CodeBlockDisplay
          codeBlock={codeBlock}
          isMentor={isMentor}
          studentSessionId={sessionId}
        />
      ) : (
        <div>
          <h2>Enter session as student</h2>
          <label htmlFor="sessionId">Session ID: </label>
          <input
            type="text"
            value={sessionId}
            onChange={handleSessionIdChange}
          />
          <button onClick={handleEnterSession}>Enter Session</button>
        </div>
      )}

      {/* {isMentor ? (
        // Mentor UI
        <CodeBlockDisplay codeBlock={codeBlock} readOnly={isMentor} />
      ) : // Student UI
      !studentEnterSession ? (
        <div>
          <label htmlFor="sessionId">Session ID: </label>
          <input
            type="text"
            value={sessionId}
            onChange={handleSessionIdChange}
          />
          <button onClick={handleEnterSession}>Enter</button>
        </div>
      ) : (
        <CodeBlockDisplay codeBlock={codeBlock} readOnly={isMentor} />
      )} */}
    </div>
  );
};

export default CodeBlockPage;
