import React from "react";
import { z } from "zod";

export const reactComponentSchema = z.custom<React.ComponentType>(
  (val) => {
    // Basic type check: must be a function or class constructor
    if (typeof val !== "function") return false;

    // Next step: try creating a React element to see if it’s a valid component
    try {
      const el = React.createElement(val);
      // If React.createElement didn’t throw, and returns a valid object,
      // then `val` acts like a component. We could also check isValidElement.
      return React.isValidElement(el);
    } catch {
      return false;
    }
  },
  {
    message: "Value must be a valid React component",
  },
);
