import React, { useState } from 'react';
import { useForm } from "react-hook-form";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import emailjs from 'emailjs-com';

import RefreshOutlined from '@material-ui/icons/RefreshOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import InfoIcon from '@material-ui/icons/Info';
import ChatIcon from '@material-ui/icons/Chat';

import Input from '../Input';
import Button from '../Button';

import { ContactFormContainer } from './styles';

type FormData = {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
};

const ContactForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmit = (data: FormData) => {
    const serviceID = 'service_jekgvx1';
    const templateID = 'template_go35emf';
    const userID = 'user_wlzu1KQ4lelekgwxR8bEW';


    emailjs.send(serviceID, templateID, {
      name: data.nome,
      assunto: data.assunto,
      mensagem: data.mensagem,
      email: data.email,
    }, userID)
      .then((result: { status: number }) => {

        setDisabled(true);

        if (result.status === 200) {
          toast.success('Mensagem enviada com sucesso.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }, (error: { text: string }) => {
        toast.error(`Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde. (${error.text})`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }).finally(() => {
        setDisabled(false);
      });
  };

  return (
    <ContactFormContainer
      onSubmit={handleSubmit(onSubmit)}
    >
      <ToastContainer />
      <Input
        placeholder="Nome Completo"
        type="text"
        {...register("nome")}
      >
        <AccountCircleIcon />
      </Input>

      <Input
        placeholder="E-mail"
        type="email"
        {...register("email")}
      >
        <EmailIcon />
      </Input>

      <Input
        placeholder="Assunto"
        type="text"
        {...register("assunto")}
      >
        <InfoIcon />
      </Input>

      <Input
        placeholder="Mensagem"
        isTextArea
        {...register("mensagem")}
      >
        <ChatIcon />
      </Input>

      <Button type="submit" disabled={disabled} className="send-message" txtColor="secondary-text">
        { !disabled
          ? 'Enviar mensagem'
          : <RefreshOutlined className="refresh-icon" />
        }
      </Button>
    </ContactFormContainer>
  );
};

export default ContactForm;
