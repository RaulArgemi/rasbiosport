class Usuari {

    constructor(id_user, name_user, user_phone, user_email, user_address, user_role) {
      this.id = id_user;
      this.name = name_user;
      this.phone = user_phone;
      this.email = user_email;
      this.address = user_address;
      this.role = user_role;
    }
  }
  
  module.exports = Usuari;
  