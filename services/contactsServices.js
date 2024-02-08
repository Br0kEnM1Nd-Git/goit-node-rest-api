const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join("db", "contacts.json");

const readFile = async (path) => {
  try {
    const resp = await fs.readFile(path);
    return resp;
  } catch (error) {
    console.log("Error:", error.message);
  }
};

const writeFile = async (path, data) => {
  try {
    await fs.writeFile(path, data);
  } catch (error) {
    console.log("Error:", error.message);
  }
};

async function listContacts() {
  const buffer = await readFile(contactsPath);
  const contactsList = JSON.parse(buffer);
  return contactsList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const foundContact = contacts.find(({ id }) => {
    if (id === contactId) return true;
    return false;
  });

  if (foundContact) return foundContact;

  return null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const foundContactIndex = contacts.findIndex(({ id }) => {
    if (id === contactId) return true;
    return false;
  });

  if (foundContactIndex < 0) return null;

  const deletedContact = contacts.splice(foundContactIndex, 1);

  const data = JSON.stringify(contacts);
  await writeFile(contactsPath, data);

  return deletedContact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newUser = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newUser);

  const data = JSON.stringify(contacts);
  await writeFile(contactsPath, data);

  return newUser;
}

async function updateContact(contactId, newBody) {
  const contacts = await listContacts();

  const foundContactIndex = contacts.findIndex(({ id }) => {
    if (id === contactId) return true;
    return false;
  });

  if (foundContactIndex < 0) return null;

  contacts[foundContactIndex] = { ...contacts[foundContactIndex], ...newBody };

  const data = JSON.stringify(contacts);
  await writeFile(contactsPath, data);

  return contacts[foundContactIndex];
}

module.exports = {
  contactsPath,
  readFile,
  writeFile,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
