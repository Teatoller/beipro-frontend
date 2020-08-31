export default function BearerToken() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
  };
  return config;
}
