// ============================================
// ELEMENTOS DA PÁGINA
// ============================================
let card = document.querySelector(".card");
let loginButton = document.querySelector(".loginButton");
let cadastroButton = document.querySelector(".cadastroButton");

// ============================================
// NAVEGAÇÃO ENTRE LOGIN E CADASTRO
// ============================================
loginButton.onclick = () => {
    card.classList.add("loginActive");
    card.classList.remove("cadastroActive");
};

cadastroButton.onclick = () => {
    card.classList.add("cadastroActive");
    card.classList.remove("loginActive");
};

// ============================================
// FUNÇÕES DE FEEDBACK
// ============================================
function showFeedback(elementId, message, isError = false) {
    const feedbackEl = document.getElementById(elementId);
    feedbackEl.textContent = message;
    feedbackEl.className = `feedback-message ${isError ? 'error' : 'success'}`;
    feedbackEl.style.display = 'block';

    // Esconder mensagem após 5 segundos
    setTimeout(() => {
        feedbackEl.style.display = 'none';
    }, 5000);
}

function setButtonLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (isLoading) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.textContent = 'Carregando...';
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || button.textContent;
    }
}

// ============================================
// FUNÇÃO DE CADASTRO
// ============================================
async function handleCadastro(e) {
    e.preventDefault();

    const username = document.getElementById('cadastro-username').value.trim();
    const email = document.getElementById('cadastro-email').value.trim();
    const password = document.getElementById('cadastro-password').value;
    const confirmPassword = document.getElementById('cadastro-confirm-password').value;

    // Validações
    if (!username || !email || !password || !confirmPassword) {
        showFeedback('cadastro-feedback', 'Por favor, preencha todos os campos.', true);
        return;
    }

    if (password !== confirmPassword) {
        showFeedback('cadastro-feedback', 'As senhas não coincidem.', true);
        return;
    }

    if (password.length < 6) {
        showFeedback('cadastro-feedback', 'A senha deve ter pelo menos 6 caracteres.', true);
        return;
    }

    setButtonLoading('cadastro-btn', true);

    try {
        // Criar usuário no Supabase Auth (SEM confirmação de email)
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username
                },
                emailRedirectTo: undefined // Desabilita confirmação de email
            }
        });

        if (authError) throw authError;

        // Verificar se o usuário foi criado
        if (!authData.user) {
            throw new Error('Erro ao criar usuário');
        }

        // Inserir dados adicionais na tabela usuarios
        const { error: dbError } = await supabase
            .from('usuarios')
            .insert([
                {
                    id: authData.user.id,
                    email: email,
                    nome_usuario: username,
                    senha_hash: 'managed_by_auth' // Senha gerenciada pelo Supabase Auth
                }
            ]);

        if (dbError) {
            console.error('Erro ao inserir na tabela usuarios:', dbError);
            throw dbError;
        }

        showFeedback('cadastro-feedback', '✓ Conta criada com sucesso! Você pode fazer login agora.', false);

        // Limpar formulário
        document.getElementById('cadastro-form').reset();

        // Atualizar contador
        await carregarContadorExploradores();

        // Ir para tela de login após 2 segundos
        setTimeout(() => {
            card.classList.add("loginActive");
            card.classList.remove("cadastroActive");
        }, 2000);

    } catch (error) {
        console.error('Erro no cadastro:', error);

        let errorMessage = 'Erro ao criar conta. Tente novamente.';

        if (error.message.includes('already registered') || error.message.includes('User already registered')) {
            errorMessage = 'Este email já está cadastrado.';
        } else if (error.message.includes('duplicate key') || error.code === '23505') {
            errorMessage = 'Este nome de usuário já está em uso.';
        } else if (error.message.includes('Invalid email')) {
            errorMessage = 'Email inválido.';
        } else if (error.message) {
            // Mostrar mensagem de erro mais específica
            errorMessage = `Erro: ${error.message}`;
        }

        showFeedback('cadastro-feedback', errorMessage, true);
    } finally {
        setButtonLoading('cadastro-btn', false);
    }
}

// ============================================
// FUNÇÃO DE LOGIN
// ============================================
async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    // Validações
    if (!email || !password) {
        showFeedback('login-feedback', 'Por favor, preencha todos os campos.', true);
        return;
    }

    setButtonLoading('login-btn', true);

    try {
        // Autenticar com Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        // Atualizar último login
        await supabase
            .from('usuarios')
            .update({ ultimo_login: new Date().toISOString() })
            .eq('id', data.user.id);

        showFeedback('login-feedback', '✓ Login realizado com sucesso!', false);

        // Limpar formulário
        document.getElementById('login-form').reset();

        // Redirecionar após 1.5 segundos
        setTimeout(() => {
            // Aqui você pode redirecionar para a página principal do jogo
            window.location.href = HOME_URL;
        }, 1500);

    } catch (error) {
        console.error('Erro no login:', error);

        let errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';

        if (error.message.includes('Invalid login credentials')) {
            errorMessage = 'Email ou senha incorretos.';
        }

        showFeedback('login-feedback', errorMessage, true);
    } finally {
        setButtonLoading('login-btn', false);
    }
}

// ============================================
// CARREGAR CONTADOR DE EXPLORADORES
// ============================================
async function carregarContadorExploradores() {
    try {
        // Buscar total de usuários
        const { count, error } = await supabase
            .from('usuarios')
            .select('*', { count: 'exact', head: true });

        if (error) throw error;

        // Usar apenas o número real de usuários cadastrados
        const totalExploradores = count || 0;

        // Animar contadores
        const counters = document.querySelectorAll(".user-count");
        counters.forEach(counter => {
            setTimeout(() => {
                animateValue(counter, 0, totalExploradores, 2000);
            }, 500);
        });

    } catch (error) {
        console.error('Erro ao carregar contador:', error);
        // Em caso de erro, mostrar 0
        const counters = document.querySelectorAll(".user-count");
        counters.forEach(counter => {
            setTimeout(() => {
                animateValue(counter, 0, 0, 2000);
            }, 500);
        });
    }
}

// ============================================
// ANIMAÇÃO DO CONTADOR
// ============================================
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString('pt-BR');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar event listeners aos formulários
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleCadastro);
    }

    // Carregar contador de exploradores
    carregarContadorExploradores();
});