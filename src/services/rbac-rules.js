const rules = {
  visitor: {
    static: ["depots:list", "welcome:visit"]
  },
  staff: {
    static: [
      "front-admin:list",
      "front-admin:create",
      "profile:getSelf",
      "welcome:visit",
      "depots:visit"
    ],
    dynamic: {
      "front-admin:edit": ({ staff }) => {
        if (!staff) return false;
        return staff;
      }
    }
  },
  admin: {
    static: [
      "company-admin:list",
      "company-admin:create",
      "company-admin:edit",
      "company-admin:delete",
      "company-admin:get",
      "profile:getSelf",
      "welcome:visit",
      "depots:visit"
    ]
  }
};

export default rules;
