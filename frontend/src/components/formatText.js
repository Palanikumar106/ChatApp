import React from "react";
import DOMPurify from "dompurify"; // To sanitize HTML content

const FormatText = ({ message }) => {
  // Check if the message contains code block syntax (i.e. "```")
  if (message.includes("```")) {
    // If the message contains code block syntax, format it as a code block
    const codeContent = message.replace(/```/g, "");

    // Escape HTML tags inside code content to prevent it from being interpreted as HTML
    const escapedCode = DOMPurify.sanitize(codeContent, { ALLOWED_TAGS: [] }); // Remove all tags

    return (
      <pre
        style={{
          backgroundColor: "#f1f1f1",
          padding: "15px",
          borderRadius: "10px",
          fontSize: "14px", // Adjust the font size
          lineHeight: "1.5",
          overflowX: "auto",
          maxWidth: "80%", // Ensure it doesn't overflow
          wordWrap: "break-word", // Wrap long words
          whiteSpace: "pre-wrap", // Preserve line breaks
          margin: "10px 0",
        }}
      >
        <code
          style={{
            display: "block",
            fontFamily: "monospace",
            color: "#333",
          }}
        >
          {escapedCode} {/* Render escaped HTML code */}
        </code>
      </pre>
    );
  } else {
    // For regular messages, render as plain text, with sanitized HTML if it contains <strong> tags
    const sanitizedMessage = DOMPurify.sanitize(message);

    return (
      <div
        style={{
          display: "inline-block",
          padding: "12px",
          borderRadius: "10px",
          backgroundColor: "#d3d3d3", // Similar background color for non-code messages
          fontSize: "16px", // Ensure the font size is readable for small messages
          whiteSpace: "pre-wrap", // Preserve line breaks
          margin: "10px 0",
          fontFamily: "monospace", // Use a clean, modern font for readability
          color: "#333", // Dark text color for better contrast
        }}
        dangerouslySetInnerHTML={{
          __html: sanitizedMessage, // Render sanitized HTML content
        }}
      />
    );
  }
};

export default FormatText;
