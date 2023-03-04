import { IUsuario } from "types-prestamista";

export const usuarios: IUsuario[] = [
    {
      nombres: "Juan",
      apellidos: "Perez",
      celular: "999999999",
      online: true,
      roles: [
        {
          nombre: "ADMIN",
        },
      ],
      foto: "https://picsum.photos/200/300",
      documento: "12345678",
      correo: "juanperez@gmail.com",
      estado: true,
      nombreUsuario: "juanperez",
      password: "123456",
      codigo: "123456",
    },
    {
      nombres: "Maria",
      apellidos: "Gomez",
      celular: "999888777",
      online: false,
      roles: [
        {
          nombre: "AGENTE",
        },
      ],
      foto: "https://picsum.photos/200/300",
      documento: "87654321",
      correo: "mariagomez@gmail.com",
      estado: true,
      nombreUsuario: "mariagomez",
      password: "123456",
      codigo: "654321",
    },
    {
      nombres: "Pedro",
      apellidos: "Rodriguez",
      celular: "888777666",
      online: true,
      roles: [
        {
          nombre: "AGENTE",
        },
      ],
      foto: "https://picsum.photos/200/300",
      documento: "56789123",
      correo: "pedrorodriguez@gmail.com",
      estado: true,
      nombreUsuario: "pedrorodriguez",
      password: "123456",
      codigo: "987654",
    },
    {
      nombres: "Luisa",
      apellidos: "Martinez",
      celular: "777666555",
      online: false,
      roles: [
        {
          nombre: "AGENTE",
        },
      ],
      foto: "https://picsum.photos/200/300",
      documento: "98765432",
      correo: "luisamartinez@gmail.com",
      estado: true,
      nombreUsuario: "luisamartinez",
      password: "123456",
      codigo: "123789",
    },
    {
      nombres: "David",
      apellidos: "Garcia",
      celular: "666555444",
      online: true,
      roles: [
        {
          nombre: "AGENTE",
        },
      ],
      foto: "https://picsum.photos/200/300",
      documento: "23456789",
      correo: "davidgarcia@gmail.com",
      estado: true,
      nombreUsuario: "davidgarcia",
      password: "123456",
      codigo: "456789",
    },
    {
      nombres: "Ana",
      apellidos: "Sanchez",
      celular: "555444333",
      online: false,
      roles: [
        {
          nombre: "AGENTE",
        },
      ],
      foto: "https://picsum.photos/200/300",
      documento: "54321987",
      correo: "anasanchez@gmail.com",
      estado: true,
      nombreUsuario: "anasanchez",
      password: "123456",
      codigo: "987654",
    },
]