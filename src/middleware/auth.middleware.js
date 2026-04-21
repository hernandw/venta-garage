import jwt from "jsonwebtoken";

export const estaAutenticado = (req, res, next) => {
  const { token } = req.cookies; //Extraemos el token de la cookie

  if (!token) {
    return res.status(401).redirect("/login"); //No hay token lo dirige a login
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.usuario = decoded;
    next();//Pase libre
  } catch (error) {
    res.clearCookie("token");
    return res.status(403).redirect("/login");
  }
};
