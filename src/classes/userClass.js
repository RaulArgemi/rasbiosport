class Usuari {

    constructor(id_user, name_user, user_phone, user_email, user_address, user_role) {
      this.id_user = id_user;
      this.name_user  = name_user;
      this.user_phone = user_phone;
      this.user_email = user_email;
      this.user_address = user_address;
      this.user_role = user_role;
    }
  }
  
  module.exports = Usuari;
  