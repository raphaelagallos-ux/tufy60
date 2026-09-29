const FORM_URL = "https://docs.google.com/forms/d/e/SEU_ID_DO_FORMULARIO/formResponse";

// Mapeie os nomes dos campos para os respectivos entry.ID obtidos no Passo 1
const ENTRY_IDS = {
  nome: "entry.123456789",
  presenca: "entry.987654321",
  acompanhantes: "entry.112233445"
};

const form = document.getElementById("rsvp-form");
const msgSucesso = document.getElementById("mensagem-sucesso");
const btnEnviar = document.getElementById("btn-enviar");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  btnEnviar.disabled = true;
  btnEnviar.textContent = "Gravando...";

  const formData = new FormData();
  formData.append(ENTRY_IDS.nome, form.nome.value);
  formData.append(ENTRY_IDS.presenca, form.presenca.value);
  formData.append(ENTRY_IDS.acompanhantes, form.acompanhantes.value);

  // Envio silencioso em segundo plano para o Google Forms
  fetch(FORM_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  })
  .then(() => {
    form.classList.add("hidden");
    msgSucesso.classList.remove("hidden");
  })
  .catch((err) => {
    console.error("Erro ao enviar confirmação:", err);
    alert("Ocorreu um erro ao enviar. Por favor, tente novamente.");
    btnEnviar.disabled = false;
    btnEnviar.textContent = "Confirmar Presença";
  });
});