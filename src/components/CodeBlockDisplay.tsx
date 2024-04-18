import React, { useEffect, useState } from "react";
import { CodeBlock } from "./CodeBlockList";
import io, { Socket } from "socket.io-client";

interface Props {
  codeBlock?: CodeBlock;
  isMentor: boolean;
  studentSessionId: string;
}

const CodeBlockDisplay: React.FC<Props> = ({
  codeBlock,
  isMentor,
  studentSessionId,
}) => {
  const [codeContent, setCodeContent] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const handleCodeChange = (event: React.ChangeEvent<HTMLDivElement>) => {
    // Logic to handle code change, if needed
    // For example, you can set the codeBlock state if you need to manage the code locally

    const newCode = event.target.textContent || "";
    console.log("new code update: " + newCode);
    console.log("socket: " + socket);
    console.log("isMentor: " + isMentor);
    //setCodeContent(newCode);///????????????????????????
    if (!isMentor && socket) {
      socket.emit("update-code", { newCode: newCode });
    }
  };

  const [sessionId, setSessionId] = useState<string>(studentSessionId);

  useEffect(() => {
    setCodeContent(codeBlock?.code || "");
  }, [codeBlock?.code]);

  const handleSockets = (isMentor: boolean) => {
    if (isMentor) return mentorSocket();
    else return studentSocket();
  };
  const mentorSocket = () => {
    const socket = io("http://localhost:3000/mentor-socket", {
      timeout: 10000, // Set a longer timeout
      transports: ["websocket", "polling"], // Explicitly set transports
      query: { codeBlockId: codeBlock?.id },
    });

    socket.on("mentor-session-connect", ({ msg, sessionId }) => {
      setSessionId(sessionId);
      console.log(msg);
    });

    socket.on("receive-update-code", ({ newCode }) => {
      setCodeContent(newCode);
      console.log("i am mentor updated from student with new code: " + newCode);
    });

    return socket;
  };
  const studentSocket = () => {
    const socket = io("http://localhost:3000/student-socket", {
      timeout: 10000, // Set a longer timeout
      transports: ["websocket", "polling"], // Explicitly set transports
      query: { sessionId },
    });

    //socket.emit("update-code", { newCode: "999" });//?????????????????

    socket.on("student-session-connect", ({ msg }) => {
      console.log(msg);
    });

    return socket;
  };

  useEffect(() => {
    if (codeBlock?.id !== undefined) {
      const handleSockets = (isMentor: boolean) => {
        if (isMentor) return mentorSocket();
        else return studentSocket();
      };

      const socket = handleSockets(isMentor);
      setSocket(socket);

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    }
  }, [codeBlock?.id]);

  return (
    <div>
      <p>{isMentor ? "Mentor" : "Student"} UI</p>
      {isMentor && <p>Read Only Mode</p>}
      {codeBlock ? (
        <div style={{ display: "inline-flex" }}>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "5px",
              width: "1000px", // Set the width to 400px
              height: "500px", // Set the max height to 300px
              overflow: "auto", // Add vertical scrollbar
              whiteSpace: "nowrap", // Prevent text from wrapping
            }}
          >
            <div
              contentEditable={!isMentor} // Make the div editable based on the readOnly prop
              onInput={handleCodeChange} // Handle code change if not read-only
              style={{
                display: "inline-block", // Make the inner div inline-block to enable horizontal scrolling

                whiteSpace: "pre-wrap",
                outline: "none",
                minWidth: "100%", // Ensure the inner div takes up the full width
                minHeight: "100%", // Ensure the inner div takes up the full width

                overflow: "auto", // Enable scrollbars if content overflows
              }}
              dangerouslySetInnerHTML={{ __html: codeContent }} // Set inner HTML with codeBlock content
            />
          </div>
          <p>
            sessionId:
            <br />
            {sessionId ?? "no connection yet"}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CodeBlockDisplay;
