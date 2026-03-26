import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router';

function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);

  let message = "Something went wrong!";
  let status = "";
  let statusText = "";

  if (isRouteErrorResponse(error)) {
    // For router errors (404, etc.)
    status = error.status;
    statusText = error.statusText;
    message = error.data || "Page not found";
  } else if (error instanceof Error) {
    // For JS errors
    message = error.message;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{status ? `${status} - ${statusText}` : "Error"}</h1>
      <p>{message}</p>
    </div>
  );
}

export default ErrorBoundary;   