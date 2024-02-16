/* eslint-disable @typescript-eslint/member-delimiter-style */
import { type User } from "../types.d";

interface Props {
  users: User[];
  showColor: boolean;
  deleteUser: (email: string) => void;
}

export default function UserList({ users, showColor, deleteUser }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? "#333" : "#555";
          const color = showColor ? backgroundColor : "transparent";
          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} alt="Photo del usuario" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.email);
                  }}>
                  Borrar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
