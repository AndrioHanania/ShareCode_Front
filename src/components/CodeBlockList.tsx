import React from "react";
import "./CodeBlockList.css";
import { Link } from "react-router-dom";

export interface SimpleCodeBlock {
  id: number;
  name: string;
}

export interface CodeBlock {
  id: string;
  name: string;
  description: string;
  code: string;
  solution: string;
}

interface Props {
  codeBlocks: SimpleCodeBlock[];
}

const CodeBlockList: React.FC<Props> = ({ codeBlocks }) => {
  return (
    <div className="container">
      <h2 className="heading">Choose code block:</h2>
      <h3 className="subheading">(Enter session as mentor)</h3>
      <ul className="block-list">
        {codeBlocks.map((codeBlock) => (
          <li key={codeBlock.id} className="block-item">
            <Link
              to={{
                pathname: `/code-block/${codeBlock.id}`,
                search: "?isMentor=true",
              }}
              className="block-link"
            >
              {codeBlock.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CodeBlockList;
