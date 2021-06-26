import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { database } from "../services/firebase";
import toast, { ToastBar } from "react-hot-toast";

import { useRoom } from "../hooks/useRoom";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import { ModalConfirmDelete } from "../components/ModalConfirmDelete";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";

import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  const [currentDeleteQuestionId, setCurrentDeleteQuestionId] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  function handleQuestionClickDelete(questionId: string) {
    setCurrentDeleteQuestionId(questionId);
    setIsModalOpen(true);
  }

  async function handleDeleteQuestion() {
    const refPromise = database
      .ref(`rooms/${roomId}/questions/${currentDeleteQuestionId}`)
      .remove();

    setIsModalOpen(false);
    toast.promise(refPromise, {
      loading: "Deletando...",
      error: "Erro ao deletar!",
      success: "Deletado com sucesso!"
    })
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">

      <ModalConfirmDelete
        isOpen={isModalOpen}
        onClickDelete={handleDeleteQuestion}
        onClickCancel={() => setIsModalOpen(false)}
      />

      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Destacar pergunta" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => handleQuestionClickDelete(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}
