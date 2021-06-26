import Modal from 'react-modal';

import "../styles/modal-confirm.scss";

import errorImg from '../assets/images/error.svg';

import { Button} from "../components/Button";

type ModalConfirmDeleteProps = Modal.Props & {
  onClickDelete?: () => any | Promise<any>;
  onClickCancel?: () => any | Promise<any>;
}

export function ModalConfirmDelete({
  onClickDelete,
  onClickCancel,
  isOpen
}: ModalConfirmDeleteProps) {

  return (
    <div id="modal-confirm">
      <Modal
        isOpen={isOpen}
        overlayClassName="modal-overlay"
        className="modal"
      >
        <img src={errorImg} alt="Confirmar exclusão" />
        <h2>Encerrar sala</h2>
        <p>Tem certeza que você deseja encerrar esta sala?</p>

        <div>
          <Button onClick={onClickCancel}>Cancelar</Button>
          <Button
            className="delete"
            onClick={onClickDelete}
          >
            Sim, encerrar
            </Button>
        </div>
      </Modal>
    </div>
  );
}
