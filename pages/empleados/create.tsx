import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Empleado } from "../../src/ts/interfaces/empleado.interface";
import { Button } from "primereact/button";
import classNames from "classnames";
import { insertOne } from "../../src/services/empleados.service";

interface CreateProps {
  toast: React.MutableRefObject<any>;
}

const Create = ({ toast }: CreateProps) => {
  const [empleado, setEmpleado] = useState<Omit<Empleado, "id">>({
    nombre: "",
    correo: "",
    telefono: "",
  });

  const handleOnSubmit = async () => {
    await insertOne(empleado);
    toast.current.show({
      severity: "success",
      summary: "Empleado creado de forma exitosa.",
      life: 3000,
    });
    setEmpleado({ nombre: "", correo: "", telefono: "" });
  };

  //   const handleOnSubmit2 = useCallback(async () => {
  //     await insertOne(empleado);
  //     setIsSubmitted(true);
  //     router.replace("/empleados/manage");
  //   }, []);

  return (
    <>
      <Card className="p-fluid">
        <div className="p-field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={empleado.nombre}
            onChange={(e) => {
              setEmpleado((state) => ({ ...state, nombre: e.target.value }));
            }}
            autoFocus
            className={classNames({
              "p-invalid": !empleado.nombre,
            })}
          />
          {!empleado.nombre && (
            <small className="p-error">Nombre es requerido.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="correo">Correo</label>
          <InputText
            id="correo"
            value={empleado.correo}
            onChange={(e) => {
              setEmpleado((state) => ({ ...state, correo: e.target.value }));
            }}
            required
            autoFocus
            className={classNames({
              "p-invalid": !empleado.correo,
            })}
          />
          {!empleado.correo && (
            <small className="p-error">Correo es requerido.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="telefono">Telefono</label>
          <input
            value={empleado.telefono}
            onChange={(e) => {
              setEmpleado((state) => ({ ...state, telefono: e.target.value }));
            }}
          />
        </div>
        <div>
          <Button onClick={handleOnSubmit} label="Crear"></Button>
        </div>
      </Card>
    </>
  );
};

export default Create;
