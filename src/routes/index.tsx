import { useEffect } from "react";
import toast from "react-hot-toast";

import {
  BrowserRouter,
  Switch,
  Route,
  useHistory,
  RouteProps
} from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

import { Loading } from '../pages/Loading';

import { Home } from "../pages/Home";
import { Room } from "../pages/Room";
import { NewRoom } from "../pages/NewRoom";
import { AdminRoom } from "../pages/AdminRoom";

function PrivateRoute({ ...rest }: RouteProps) {
  const history = useHistory();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      history.push('/');
      toast.error('Você precisa estar logado para acessar esta página');
    }
  }, [history, isLoading, user]);

  if (isLoading)
    return <Loading />

  return <Route {...rest} />
}

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />

        <PrivateRoute path="/admin/rooms/:id" component={AdminRoom}/>
      </Switch>
    </BrowserRouter>
  );
}

