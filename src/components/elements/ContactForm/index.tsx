import React, { useState } from 'react';

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
  const [values, setValues] = useState<FormData>({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
  });
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleChange = (event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({...values,[event.target.name] : event.target.value});
  }

  const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const serviceID = 'service_jekgvx1';
    const templateID = 'template_go35emf';
    const userID = 'user_wlzu1KQ4lelekgwxR8bEW';

    emailjs.send(serviceID, templateID, {
      nome: values.nome,
      assunto: values.assunto,
      mensagem: values.mensagem,
      email: values.email,
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

          setValues({
            nome: '',
            email: '',
            assunto: '',
            mensagem: '',
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
        setDisabled(false);
      });
  };

  return (
    <ContactFormContainer
      onSubmit={(e) => onSubmit(e)}
    >
      <ToastContainer />
      <Input
        placeholder="Nome Completo"
        type="text"
        name="nome"
        changeHandler={handleChange}
      >
        <AccountCircleIcon />
      </Input>

      <Input
        placeholder="E-mail"
        type="email"
        name="email"
        changeHandler={handleChange}
      >
        <EmailIcon />
      </Input>

      <Input
        placeholder="Assunto"
        type="text"
        name="assunto"
        changeHandler={handleChange}
      >
        <InfoIcon />
      </Input>

      <Input
        placeholder="Mensagem"
        isTextArea
        name="mensagem"
        changeHandler={handleChange}
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
