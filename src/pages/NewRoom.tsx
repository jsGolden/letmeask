import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { database } from '../services/firebase';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (!user) {
      toast.error('Você precisa estar logado para criar uma sala!');
      return;
    }

    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    try {
      const { key } = await roomRef.push({
        title: newRoom,
        authorId: user?.id,
      });
      toast.success('Sala criada com sucesso!');
      history.push(`/admin/rooms/${key}`);
    } catch {
      toast.error('Erro ao criar sala!');
    }
  }

  //if (!user) return <Redirect to="/" />;

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />

            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
