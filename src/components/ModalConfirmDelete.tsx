import Modal from 'react-modal';

import "../styles/modal-confirm.scss";

import errorImg from '../assets/images/error.svg';
import trashImg from '../assets/images/trash.svg';

import { Button} from "../components/Button";

type iconsType = "error" | "trash";

type ModalConfirmDeleteProps = Modal.Props & {
  onClickDelete?: () => any | Promise<any>;
  onClickCancel?: () => any | Promise<any>;
  title: string;
  subtitle: string;
  icon: iconsType;
  cancelButtonText: string;
}

const icons = {
  error: errorImg,
  trash: trashImg
}

export function ModalConfirmDelete({
  title,
  subtitle,
  icon,
  cancelButtonText = 'Sim',
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
        <img src={icons[icon]} alt="Confirmar exclusão" />
        <h2>{title}</h2>
        <p>{subtitle}</p>

        <div>
          <Button onClick={onClickCancel}>Cancelar</Button>
          <Button
            className="delete"
            onClick={onClickDelete}
          >
            {`${cancelButtonText}`}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
