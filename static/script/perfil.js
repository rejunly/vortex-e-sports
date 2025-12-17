const supabase = window.supabaseClient;

const { data: { user } } = await supabase.auth.getUser();

AtualizarUI(user);

supabase.auth.onAuthStateChange((event, session) => {
  AtualizarUI(session?.user ?? null);
});

function AtualizarUI(user) {
  if (user) {
    console.log('Usuário logado:', user.email);
  } else {
    console.log('Não há nenhum perfil logado!');
  }
}
