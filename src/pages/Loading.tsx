import { Spinner } from '../components/Spinner';

import '../styles/loading.scss';
import logoImg from "../assets/images/logo.svg";

export function Loading() {
  return (
    <div id="page-loading">
      <img src={logoImg} alt="Letmeask" />
      <Spinner />
      <h1>Carregando...</h1>
    </div>
  );
}
