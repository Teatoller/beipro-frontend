export default function ConstCoAdmin() {
  const currRole = localStorage.getItem("roleAdmin");
  const userRole = currRole === "admin";
  return userRole;
}
