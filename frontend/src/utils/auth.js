export const getRole = () => localStorage.getItem("role"); // "admin" | "student"
export const isAdmin = () => getRole() === "admin";


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
