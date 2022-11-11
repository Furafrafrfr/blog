import { Link } from "gatsby";
import React from "react";

export default function NotFound(): React.ReactNode {
  return (
    <div>
      404 Not NotFound. <Link to="/">Home</Link>
    </div>
  );
}
