const controller = {
  showHome: (req, res) => {
    res.render("home", {
      title: "Inicio",
    });
  },
  showLogin: (req, res) => {
    res.render("login", {
      title: "Iniciar sesión",
    });
  },
  showRegister: (req, res) => {
    res.render("register", {
      title: "Crea tu cuenta",
    });
  },
};

export default controller;
