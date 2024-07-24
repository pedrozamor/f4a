"use client";

import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteRecipeIngredient } from "@/lib/recipes/actions";
import classes from "./DeleteIngredientButton.module.css";
import ConfirmModal from "./ConfirmModal";
import ErrorModal from "./ErrorModal";

export default function DeleteIngredientButton({
  recipeId,
  ingredientId,
  slug,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleDelete() {
    try {
      await deleteRecipeIngredient(recipeId, ingredientId, slug);
      closeModal();
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while deleting the ingredient."
      );
      setIsErrorModalOpen(true);
    }
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function closeErrorModal() {
    setIsErrorModalOpen(false);
  }

  return (
    <>
      <button type="button" className={classes.button} onClick={openModal}>
        <TrashIcon className={classes.deleteIcon} />
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleDelete}
        onCancel={closeModal}
        message="Are you sure you want to delete this ingredient?"
      />

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
        message={errorMessage}
      />
    </>
  );
}
