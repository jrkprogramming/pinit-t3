/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { useEffect, useState, useCallback, useContext } from "react";
import style from "./editPinModal.module.css";
import { api, type RouterOutputs } from "~/utils/api";
import router from "next/router";
interface ModalProps {
  id: string | undefined;
  name: string | undefined;
  address: string | undefined;
  city: string | undefined;
  description: string | undefined;
  lat: number | undefined;
  lng: number | undefined;
}

export default function Modal({
  id,
  name,
  address,
  city,
  description,
  lat,
  lng,
}: ModalProps) {
  const [showModal, setShowModal] = React.useState(false);
  const [formData, setFormData] = useState<ModalProps>({
    id: id as string,
    name: name as string,
    address: address as string,
    city: city as string,
    description: description as string,
    lat: lat as number,
    lng: lng as number,
  });

  const editPin = api.pin.edit.useMutation({
    onSuccess: async () => {
      await router.push(`/home`);
      window.location.reload();
    },
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editPin.mutate({
      id: formData.id || "",
      name: formData.name || "",
      address: formData.address || "",
      city: formData.city || "",
      description: formData.description || "",
      lng: Number(formData.lng),
      lat: Number(formData.lat),
    });
  };

  useEffect(() => {
    const handleMutationSuccess = async () => {
      if (editPin.isSuccess) {
        window.location.reload();
        await router.push(`/pinDetails/${id}`);
      }
    };

    void handleMutationSuccess();
  }, [editPin.isSuccess, id, router]);
  return (
    <>
      <button
        className={style.btn}
        type="button"
        onClick={() => setShowModal(true)}
      >
        EDIT
      </button>
      {showModal ? (
        <div className={style.modalContainer}>
          <div className={style.modalContent}>
            <div className={style.modalHeader}>
              <h3 className={style.modalTitle}>EDIT YOUR PIN</h3>
              <button
                className={style.closeButton}
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className={style.form}>
              <div>
                <label htmlFor="name">Name of Location</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <input
                type="hidden"
                name="lat"
                value={formData.lat || ""}
                onChange={handleChange}
              />
              <input
                type="hidden"
                name="lng"
                value={formData.lng || ""}
                onChange={handleChange}
              />

              <div className={style.buttonGroup}>
                <button
                  type="button"
                  className={`${style.button} ${style.cancelButton}`}
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className={`${style.button} ${style.saveButton}`}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
