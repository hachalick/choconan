"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

function BtnForwardHistory() {
  return (
    <button
      type="button"
      title="back"
      onClick={() => history.forward()}
      className="p-1 mr-auto"
    >
      <FaArrowRight size={20} />
    </button>
  );
}

export default BtnForwardHistory;
