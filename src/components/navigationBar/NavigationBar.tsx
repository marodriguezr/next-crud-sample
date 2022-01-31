import { useRouter } from "next/router";
import { Menubar } from "primereact/menubar";
import { useMemo } from "react";

export const NavigationBar = () => {
  const router = useRouter();

  const items = useMemo(
    () => [
      {
        label: "Inicio",
        icon: "pi pi-fw pi-home",
        command: () => {
          router.replace("/");
        },
      },
      {
        label: "Crear",
        icon: "pi pi-fw pi-plus",
        command: () => {
          router.push("/empleados/create");
        },
      },
      {
        label: "Administrar",
        icon: "pi pi-fw pi-pencil",
        command: () => {
          router.push("/empleados/manage");
        },
      },
    ],
    []
  );

  return (
    <>
      <Menubar model={items}></Menubar>
    </>
  );
};
