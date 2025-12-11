// Configuração do Supabase
const SUPABASE_URL = 'https://qxrjclgarktqyqfqxyzp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4cmpjbGdhcmt0cXlxZnF4eXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMjM2MjUsImV4cCI6MjA4MDc5OTYyNX0.RpjxZriW0zKwooCXC7RzKewPv79NRw5cWxyak1liw5Q';

// Inicializar o cliente Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
