export default function ConstFrontAdmin() {
    const currRole = localStorage.getItem("role");
  const newLocal = currRole === "staff";
  return newLocal;
}
