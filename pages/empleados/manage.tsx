import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import {
  deleteOne,
  findAllEmpleados,
  updateOne,
} from "../../src/services/empleados.service";
import { Empleado } from "../../src/ts/interfaces/empleado.interface";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import classNames from "classnames";
import { omit } from "lodash";
import { confirmDialog } from "primereact/confirmdialog";

interface ManageProps {
  toast: React.MutableRefObject<any>;
}

export default function Manage({ toast }: ManageProps) {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado>({
    id: "",
    correo: "",
    nombre: "",
    telefono: "",
  });
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  useEffect(() => {
    handleFindAllEmpleados();
  }, []);

  const handleFindAllEmpleados = () => {
    findAllEmpleados().then((res) => {
      setEmpleados(res);
    });
  };

  const handleDeleteOneEmpleado = (id: number) => {
    deleteOne(id).then(() => {
      handleFindAllEmpleados();
      toast.current.show({
        severity: "success",
        summary: "Empleado eliminado de forma exitosa.",
        life: 3000,
      });
    });
  };

  const handleUpdateOneEmpleado = () => {
    updateOne(selectedEmpleado.id, omit(selectedEmpleado, "id")).then(() => {
      handleFindAllEmpleados();
      setIsUpdateDialogOpen(false);
      toast.current.show({
        severity: "success",
        summary: "Empleado modificado de forma exitosa.",
        life: 3000,
      });
      setSelectedEmpleado({
        id: "",
        correo: "",
        nombre: "",
        telefono: "",
      });
    });
  };

  const onDeleteButtonClick = (id: number) => {
    confirmDialog({
      message: "¿Está seguro de continuar?",
      header: "Confirmación",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDeleteOneEmpleado(id),
      acceptLabel: "Eliminar",
      rejectLabel: "Cancelar",
    });
  };

  const onUpdateButtonClick = (empleado: Empleado) => {
    setSelectedEmpleado(empleado);
    setIsUpdateDialogOpen(true);
  };

  const tableOptionsBodyTemplate = (rowData: Empleado) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => {
            onUpdateButtonClick(rowData);
          }}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => {
            onDeleteButtonClick(rowData.id);
          }}
        />
      </>
    );
  };

  const updateDialogFooterTemplate = () => {
    return (
      <div>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          onClick={() => setIsUpdateDialogOpen(false)}
          className="p-button-text"
        />
        <Button
          label="Modificar"
          icon="pi pi-check"
          onClick={() => handleUpdateOneEmpleado()}
          autoFocus
        />
      </div>
    );
  };

  return (
    <>
      <div className="pl-2 pr-2 pb-2">
        <DataTable value={empleados} responsiveLayout="scroll">
          <Column field="id" header="Id"></Column>
          <Column field="nombre" header="Nombre"></Column>
          <Column field="correo" header="Correo"></Column>
          <Column field="telefono" header="Teléfono"></Column>
          <Column body={tableOptionsBodyTemplate} header="Opciones"></Column>
        </DataTable>
      </div>
      <Dialog
        className="p-fluid"
        header="Modificar empleado"
        visible={isUpdateDialogOpen}
        style={{ width: "50vw" }}
        footer={updateDialogFooterTemplate()}
        onHide={() => setIsUpdateDialogOpen(false)}
      >
        <div className="p-field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={selectedEmpleado.nombre}
            onChange={(e) => {
              setSelectedEmpleado((state) => ({
                ...state,
                nombre: e.target.value,
              }));
            }}
            required
            autoFocus
            className={classNames({
              "p-invalid": !selectedEmpleado.nombre,
            })}
          />
          {!selectedEmpleado.nombre && (
            <small className="p-error">Nombre es requerido.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="correo">Correo</label>
          <InputText
            id="correo"
            value={selectedEmpleado.correo}
            onChange={(e) => {
              setSelectedEmpleado((state) => ({
                ...state,
                correo: e.target.value,
              }));
            }}
            required
            autoFocus
            className={classNames({
              "p-invalid": !selectedEmpleado.correo,
            })}
          />
          {!selectedEmpleado.correo && (
            <small className="p-error">Correo es requerido.</small>
          )}
        </div>
        <div className="p-field">
          <label htmlFor="telefono">Telefono</label>
          <input
            value={selectedEmpleado.telefono}
            onChange={(e) => {
              setSelectedEmpleado((state) => ({
                ...state,
                telefono: e.target.value,
              }));
            }}
          />
        </div>
      </Dialog>
    </>
  );
}
