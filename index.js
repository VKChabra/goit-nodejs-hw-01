const contactsActions = require("./contacts");
const argv = require("yargs").argv;

const start = async ({ action, id, name, email, phone }) => {
  const { listContacts, getContactById, addContact, removeContact } =
    contactsActions;
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

start(argv);
