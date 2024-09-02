"use client";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function BtnBackHistory() {
  return (
    <button
      type="button"
      title="back"
      onClick={() => history.back()}
      className="p-1"
    >
      <FaArrowLeft size={20} />
    </button>
  );
}

export default BtnBackHistory;
