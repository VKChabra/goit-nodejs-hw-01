const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const rewriteContacts = (data) =>
  fs.writeFile(contactsPath, data, (err) => {
    if (err) console.log(err);
  });

async function listContacts() {
  const contacts = await getAllContacts();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await getAllContacts();
  const contactById = contacts.find((contact) => contact.id === `${contactId}`);
  if (!contactById) throw new Error(`Contact with ${contactId} not found`);
  console.log(contactById);
}

async function removeContact(contactId) {
  const contacts = await getAllContacts();
  const contactToRemoveIndex = contacts.findIndex(
    (contact) => contact.id === `${contactId}`
  );
  if (contactToRemoveIndex === -1)
    throw new Error(`Contact with ${contactId} not found`);

  const filteredContacts = contacts.filter(
    (_, index) => index !== contactToRemoveIndex
  );
  rewriteContacts(JSON.stringify(filteredContacts));
  console.log(contacts[contactToRemoveIndex]);
}

async function addContact(name = null, email = null, phone = null) {
  const contacts = await getAllContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  const updatedContacts = JSON.stringify([...contacts, newContact]);
  rewriteContacts(updatedContacts);
  console.log(newContact);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
