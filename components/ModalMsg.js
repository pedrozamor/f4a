"use client";

import { useState } from "react";

export default function ModalMsg({ msg }) {
  const [isModalOpen, setIsModalOpen] = useState(true);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <p>{msg}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
