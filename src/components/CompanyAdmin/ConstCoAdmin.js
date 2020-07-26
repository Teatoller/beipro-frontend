export default function ConstCoAdmin() {
  const currRole = localStorage.getItem("roleAdmin");
  const newLocal = currRole === "admin";
  return newLocal;
}
