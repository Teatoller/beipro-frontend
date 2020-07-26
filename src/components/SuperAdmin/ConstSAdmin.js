export default function ConstSAdmin() {
  const currRole = localStorage.getItem("roleSadmin");
  const newLocal = currRole === "superadmin";
  return newLocal;
}
