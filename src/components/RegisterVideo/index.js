import React from "react";
import { createClient } from "@supabase/supabase-js";
import { StyledRegisterVideo } from "./styles";

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);
  return {
    values,
    handleChange: (evento) => {
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    },
  };
}

const PROJECT_URL = "https://vvyhkjartvujeskmsbtp.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2eWhramFydHZ1amVza21zYnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxODAwMDIsImV4cCI6MTk4Mzc1NjAwMn0.UEEC7vMoVLhKIObrfCnXyd-r5pxm2Ht1ex2J97yOy5k";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// Github Copilot (IA para desenvolvimento de códigos)
// get youtube thumbnail from video url
function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: {
      titulo:
        "Carreira em Tecnologia: TUDO que você precisa saber para entrar no MERCADO! ( Guia prático )",
      url: "https://www.youtube.com/watch?v=SGRUgwLIhos",
    },
  });
  const [formVisivel, setFormVisivel] = React.useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={(evento) => {
            evento.preventDefault();

            supabase
              .from("video")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: "Technology",
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });

            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Título do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  );
}
