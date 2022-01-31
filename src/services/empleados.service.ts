import { httpClient } from "../libraries/httpClient";
import { Empleado } from "../ts/interfaces/empleado.interface";

export const insertOne = async (empleado: Omit<Empleado, "id">) => {
    return (await httpClient.post("/", empleado)).data as Empleado;
};

export const findAllEmpleados = async () => {
    return (await httpClient.get("/")).data as Empleado[];
};

export const findOneEmpleadoById = async (id: any) => {
    return (await httpClient.get(`/${id}`)).data as Empleado;
};

export const updateOne = async (id: any, empleado: Omit<Empleado, "id">) => {
    return (await httpClient.put(`/${id}`, empleado)).data as Empleado;
};

export const deleteOne = async (id: any) => {
    return (await httpClient.delete(`/${id}`)).data as void;
};