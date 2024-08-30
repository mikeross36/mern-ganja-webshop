import { useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { useAppContext } from "../hooks";
import { ESelectedPage } from "../types";

const sendEmail = import.meta.env.VITE_FORM_SUBMIT;

export default function Contact() {
  const { setSelectedPage } = useAppContext();
  const contactRef = useRef(null);
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const isValid = await trigger();
    if (!isValid) e.preventDefault();
  };

  return (
    <motion.section
      className="contact"
      id="contact"
      ref={contactRef}
      onViewportEnter={() => setSelectedPage(ESelectedPage.contact)}
    >
      <div className="contact__bcg"></div>
      <form
        action={sendEmail}
        method="POST"
        target="_blank"
        className="contact__form"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          className="form__input"
          placeholder="name..."
          autoComplete="off"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <p className="input__error">
            {errors.name.type === "required" && "This field is required!"}
          </p>
        )}
        <input
          type="email"
          className="form__input"
          placeholder="email..."
          autoComplete="off"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.email && (
          <p className="input__error">
            {errors.email.type === "required" && "This field is required!"}
            {errors.email.type === "pattern" && "Invalid email!"}
          </p>
        )}
        <textarea
          className="form__textarea"
          placeholder="message..."
          cols={30}
          rows={10}
          {...register("message", { required: true, maxLength: 2000 })}
        />
        {errors.message && (
          <p className="input__error">
            {errors.message.type === "required" && "This field is required"}
            {errors.message.type === "maxLength" && "Max length is 2000 chars!"}
          </p>
        )}
        <Button type="submit" className="button button--mid">
          SEND
        </Button>
      </form>
      {/* <div className="contact__container">
        <div className="image"></div>
        <div className="left">
          <h1>Ga</h1>
        </div>
        <div className="right">
          <div className="right__wrapper">
            <h1>nja</h1>
            <p>
              Web
              <span>shop</span>
            </p>
          </div>
        </div>
      </div> */}
    </motion.section>
  );
}
