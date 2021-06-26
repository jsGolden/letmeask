import { useRef } from 'react';
import toast from 'react-hot-toast';
import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const spanRef = useRef<HTMLSpanElement | null>(null);

  function copyRoomCodeToClipboard() {
    const tempInput = document.createElement("input");
    tempInput.value = props.code;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    toast.success('Código copiado para área de transferência!');
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span ref={spanRef}>Sala #{props.code}</span>
    </button>
  )
}
