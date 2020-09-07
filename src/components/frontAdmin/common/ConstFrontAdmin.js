export default function ConstFrontAdmin() {
  const currRole = localStorage.getItem("role");
  const userRole = currRole === "staff";
  return userRole;
}
