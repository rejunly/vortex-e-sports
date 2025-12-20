import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Configuração do Supabase
const SUPABASE_URL = "https://qxrjclgarktqyqfqxyzp.supabase.co";
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cmpjbGdhcmt0cXlxZnF4eXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMjM2MjUsImV4cCI6MjA4MDc5OTYyNX0.RpjxZriW0zKwooCXC7RzKewPv79NRw5cWxyak1liw5Q';

// 👉 CRIAR o cliente Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function carregarPerfil() {
  const { data: { user }, error } =
    await supabase.auth.getUser()

  if (error) {
    console.error(error)
    window.alert("Erro ao buscar usuário")
    return
  }

  if (!user) {
    window.alert("Nenhum usuário logado")
    return
  }

  console.log(user)
  let nome = user.user_metadata.username;
  let nome_print = document.querySelector(".nome_usuario");

  let email = user.user_metadata.email;
  let email_print = document.querySelector(".email_usuario")
  nome_print.innerHTML = nome
  email_print.innerHTML = email 
}

carregarPerfil()
