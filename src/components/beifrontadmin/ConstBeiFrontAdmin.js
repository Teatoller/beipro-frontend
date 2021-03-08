export default function ConstBeiFrontAdmin() {
  const currRole = localStorage.getItem("role");
  const userRole = currRole === "beistaff";
  return userRole;
}
