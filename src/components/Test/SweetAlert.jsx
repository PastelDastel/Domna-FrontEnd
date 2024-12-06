import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const SweetAlert = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Dati inviati:", data);
    Swal.fire({
      icon: "success",
      title: "Salvato con successo!",
      text: "Il corso è stato aggiornato correttamente.",
      confirmButtonColor: "#f7a8a9",
    });
    onClose(); // Chiude il modal dopo il successo
  };

  return (
    <div className={`modal ${isOpen ? "show" : ""}`} style={{ display: isOpen ? "block" : "none" }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modifica Corso</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
              {/* Colonna 1 */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Titolo: <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    {...register("title", { required: "Il titolo è obbligatorio" })}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Istruttore: <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control ${errors.instructor ? "is-invalid" : ""}`}
                    {...register("instructor", { required: "L'istruttore è obbligatorio" })}
                  />
                  {errors.instructor && <div className="invalid-feedback">{errors.instructor.message}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Durata: <span className="text-danger">*</span></label>
                  <select
                    className={`form-select ${errors.duration ? "is-invalid" : ""}`}
                    {...register("duration", { required: "La durata è obbligatoria" })}
                  >
                    <option value="">Seleziona la durata</option>
                    <option value="monthly">Mensile</option>
                    <option value="3months">3 Mesi</option>
                    <option value="6months">6 Mesi</option>
                    <option value="1year">1 Anno</option>
                  </select>
                  {errors.duration && <div className="invalid-feedback">{errors.duration.message}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Sezione: <span className="text-danger">*</span></label>
                  <select
                    className={`form-select ${errors.section ? "is-invalid" : ""}`}
                    {...register("section", { required: "La sezione è obbligatoria" })}
                  >
                    <option value="">Seleziona la sezione</option>
                    <option value="DOMNA">DOMNA</option>
                    <option value="DOMNA + Live">DOMNA + Live</option>
                  </select>
                  {errors.section && <div className="invalid-feedback">{errors.section.message}</div>}
                </div>
              </div>

              {/* Colonna 2 */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Prezzo: <span className="text-danger">*</span></label>
                  <input
                    type="number"
                    className={`form-control ${errors.price ? "is-invalid" : ""}`}
                    {...register("price", { required: "Il prezzo è obbligatorio" })}
                  />
                  {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Nome della categoria: <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control ${errors.category ? "is-invalid" : ""}`}
                    {...register("category", { required: "Il nome della categoria è obbligatorio" })}
                  />
                  {errors.category && <div className="invalid-feedback">{errors.category.message}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Descrizione:</label>
                  <textarea
                    className="form-control"
                    {...register("description")}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Vantaggi:</label>
                  <div className="custom-checkbox-group">
                    {["Preparazione", "Pancia piatta", "Tonifica", "Anticellulite", "LIVE", "Bonus video decontrazione"].map(
                      (benefit, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            id={`benefit-${index}`}
                            className="custom-checkbox"
                            {...register(`benefits.${index}`)}
                          />
                          <label htmlFor={`benefit-${index}`}>{benefit}</label>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Stripe Price ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("stripePriceId")}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Vantaggi Esclusi:</label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("excludedBenefits")}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Annulla
            </button>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit(onSubmit)}>
              Salva Modifiche
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SweetAlert;
